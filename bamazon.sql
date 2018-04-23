DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(13,4) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sunglasses", "accessories", 25.00, 100),
("earrings", "accessories", 15.00, 250),
("pants", "clothing", 50.00, 30),
("shirts", "clothing", 20.00, 50),
("paper", "office", 5.00, 1000),
("staples", "office", 2.50, 5000),
("plates", "kitchen", 7.50, 100),
("pans", "kitchen", 15.00, 60),
("chew toys", "pets", 15.00, 100),
("dog food", "pets", 25.00, 30);