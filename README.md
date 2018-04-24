# Bamazon App

## Running the App

#### Before running the app, the *bamazon.sql* file must be used to create a local SQL database.


#### The app is initialized by installing the needed packets in node with *>'npm i'*.  The app can then be run through node with *>'node bamazon.js'*.

![](https://raw.githubusercontent.com/FrTime/12mysql/master/images/npm_i.PNG)
![](https://raw.githubusercontent.com/FrTime/12mysql/master/images/node_run.PNG)

## Navigating the App

#### When a user logs in to the Bamazon app, they greeted with an Inquirer menu that is used to navigate the service.

![](https://raw.githubusercontent.com/FrTime/12mysql/master/images/menu.PNG)

#### Selecting 'Display items' will log a table of the available inventory, including:
1. The item ID
1. The product name
1. The department
1. The price
1. The available stock

![](https://raw.githubusercontent.com/FrTime/12mysql/master/images/display.PNG)

#### Selecting 'Purchase items" prompts the user to enter the ID of the item to purchase as well as the quantity.

![](https://raw.githubusercontent.com/FrTime/12mysql/master/images/purchase.PNG)

#### Purchasing an item removes the selected quantity from inventory unless the transaction will cause the available stock to go negative.  After making a purchase, the SQL table is updated to reflect the new quantity.

![](https://raw.githubusercontent.com/FrTime/12mysql/master/images/low_stock.PNG)
