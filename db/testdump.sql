CREATE TABLE Orders(
       order_id INT PRIMARY KEY AUTO_INCREMENT, 
       price DECIMAL(10,2), 
       size INT,
       currency_from VARCHAR(10),
       currency_to VARCHAR(10),
       side ENUM('BUY', 'SELL')
);

INSERT INTO Orders(
       price, 
       size,
       currency_from,
       currency_to,
       side) 
VALUES(
       300,
       200,
       'USD',
       'BTC',
       'SELL'
);

INSERT INTO Orders(
       price, 
       size,
       currency_from,
       currency_to,
       side) 
VALUES(
       200,
       100,
       'USD',
       'BTC',
       'BUY'
);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;