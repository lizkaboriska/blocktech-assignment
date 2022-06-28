const express = require('express');
const bodyParser = require('body-parser')
const orderList = require('./order-list');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

app.get('/get-orders', (req, res) => {
  res.json(orderList);
});

app.post('/add-order', (req, res) => {
  res.json(req.body);
});