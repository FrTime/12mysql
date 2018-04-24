# Bamazon App

## Running the App

#### Before running the app, the *bamazon.sql* file must be used to create a local SQL database.


#### The app is initialized by installing the needed packets in node with *>'npm i'*.  The app can then be run through node with *>'node bamazon.js'*.

![](images/npm_i.png)
![](images/node_run.png)

## Navigating the App

#### When a user logs in to the Bamazon app, they greeted with an Inquirer menu that is used to navigate the service.

![](images/menu.png)

#### Selecting 'Display items' will log a table of the available inventory, including:
1. The item ID
1. The product name
1. The department
1. The price
1. The available stock

![](images/display.png)

#### Selecting 'Purchase items" prompts the user to enter the ID of the item to purchase as well as the quantity.

![](images/purchase.png)

#### Purchasing an item removes the selected quantity from inventory unless the transaction will cause the available stock to go negative.  After making a purchase, the SQL table is updated to reflect the new quantity.

![](images/low_stock.png)
