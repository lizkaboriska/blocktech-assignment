const express = require("express");
const bodyParser = require('body-parser')
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

app.get("/orders", (req, res) => {
  connection.query("SELECT * FROM Orders", (err, rows) => {
    if (err) throw err;
    const responseData = rows.map((row) => ({
      ...row,
      currencyFrom: row.currency_from,
      currencyTo: row.currency_to
    }));
    res.json(responseData);
  });
});

app.post("/orders", async (req, res) => {
  const data = req.body;

  if (data.side === 'BUY') {
    connection.query(
      `
        SELECT
          *
        FROM
          Orders
        WHERE
          side = ?
        AND
          currency_from = ?
        AND
          currency_to = ?
        AND
          price <= ?
        ORDER BY
          price ASC;
      `,
      ['SELL', data.currencyFrom, data.currencyTo, data.price],
      (err, rows) => matchOrders(err, rows, data)
    );
  } else {
    connection.query(
      `
        SELECT
          *
        FROM
          Orders
        WHERE
          side = ?
        AND
          currency_from = ?
        AND
          currency_to = ?
        AND
          price >= ?
        ORDER BY
          price DESC;
      `,
      ['BUY', data.currencyFrom, data.currencyTo, data.price],
      (err, rows) => matchOrders(err, rows, data)
    );
  }

  res.json(req.body);
});

const matchOrders = (_err, rows, data) => {
  const ordersToDelete = [];
  let orderToUpdate = undefined;
  let amountLeft = data.size;

    
  for (const order of rows) {
    if (amountLeft >= order.size) {
      amountLeft -= order.size;
      ordersToDelete.push(order);
    } else {
      orderToUpdate = {...order, size: order.size - amountLeft};
      amountLeft = 0;
      break;
    }
  }

  if (amountLeft) {
    connection.query(
      'INSERT INTO Orders SET ?',
      {
        price: data.price,
        size: amountLeft,
        side: data.side,
        currency_to: data.currencyTo,
        currency_from: data.currencyFrom
      },
      function (error) {
        if (error) throw error;
      }
    );
  }

  if (ordersToDelete.length) {
    connection.query(
      'DELETE FROM Orders WHERE order_id IN (?);',
      [ordersToDelete.map(({order_id}) => order_id)],
      function (error) {
        if (error) throw error;
      }
    );
  }

  if (orderToUpdate) {
    connection.query('UPDATE Orders SET size = ? WHERE order_id = ?', [orderToUpdate.size, orderToUpdate.order_id], function (error, results, fields) {
      if (error) throw error;
    });
  }
}

app.listen(5000, () => console.log("listening on port 5000"));