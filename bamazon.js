// Setting the needed package requirements
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

// Setting the connection to the local 'bamazon' mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // Enter your root password below
  password: "wenerdotzosoDan520",
  database: "bamazon"
});

// Defining the functions that the user will call while navigating the inquirer menu
var bamazon = {
  dbConnect: function() {
    connection.connect(function(err) {
      if (err) throw err;
      console.log(`Connected to the 'bamazon' database.\n`);
      bamazon.inquiries.welcome();
    });
  },

  dbDisplayProducts: function() {
    var table = new Table({
      chars: {
        top: "═",
        "top-mid": "╤",
        "top-left": "╔",
        "top-right": "╗",
        bottom: "═",
        "bottom-mid": "╧",
        "bottom-left": "╚",
        "bottom-right": "╝",
        left: "║",
        "left-mid": "╟",
        mid: "─",
        "mid-mid": "┼",
        right: "║",
        "right-mid": "╢",
        middle: "│"
      },
      head: ["Item Id", "Product Name", "Department", "Price", "In Stock"]
    });
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      for (let index of results) {
        var data = index;
        table.push([
          data.item_id,
          data.product_name,
          data.department_name,
          data.price,
          data.stock_quantity
        ]);
      }
      console.log(`${table.toString()}\n`);
      bamazon.inquiries.welcome();
    });
  },

  inquiries: {
    welcome: function() {
      inquirer
        .prompt([
          {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Display items", "Purchase items", "Exit"]
          }
        ])
        .then(function(inq) {
          if (inq.action === "Display items") {
            bamazon.dbDisplayProducts();
          } else if (inq.action === "Purchase items") {
            bamazon.inquiries.purchase();
          } else if (inq.action === "Exit") {
            console.log("Thank you for shopping with Bamazon!\n");
            connection.end();
          } else {
            console.log("Error exists between monitor and chair.\n");
          }
        });
    },
    purchase: function() {
      inquirer
        .prompt([
          {
            type: "input",
            name: "item",
            message:
              "Please enter the ID of the item that you would like to purchase:",
            validate: function validate(id) {
              if (isNaN(id)) {
                return "Please enter a valid number.\n";
              } else return true;
            }
          },
          {
            type: "input",
            name: "qty",
            message:
              "Please enter the quantity of the selected item that you would like to purchase:",
            validate: function validate(qty) {
              if (isNaN(qty)) {
                return "Please enter a valid number.\n";
              } else return true;
            }
          }
        ])
        .then(function(inq) {
          var userID = inq.item;
          var userQty = inq.qty;
          console.log(`You have selected item ID '${userID}'.`);
          console.log(`You have selected a quantity of '${userQty}'.\n`);
          console.log("Checking Bamazon stock...");
          connection.query(
            `SELECT * FROM products WHERE item_id = '${userID}'`,
            function(err, res) {
              if (err) throw err;
              if (res[0].stock_quantity >= userQty) {
                console.log(
                  `Thank you for your purchase of ${userQty} ${
                    res[0].product_name
                  }!`
                );
                console.log(
                  `You will be charged a total of $${userQty * res[0].price}.`
                );
                var newQty = res[0].stock_quantity - userQty;
                bamazon.inquiries.update(userID, newQty);
              } else {
                console.log("Insufficient stock! Please make another request.");
                bamazon.inquiries.welcome();
              }
            }
          );
        });
    },
    update: function(userID, newQty) {
      connection.query(
        `UPDATE products SET stock_quantity= ${newQty} WHERE item_id= ${userID}`
      );
      console.log(`New quantity of ${newQty}.`);
      bamazon.inquiries.welcome();
    }
  }
};

bamazon.dbConnect();
