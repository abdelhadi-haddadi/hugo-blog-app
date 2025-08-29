+++
title = "Knex.js tutorial"
date = 2025-08-29T20:01:27.271+01:00
draft = false
description = "Understand how to use Knex.js in JavaScript for database programming, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Knex.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to program databases in JavaScript with Knex.js.

## Knex.js

Knex.js is a JavaScript query builder for relational databases
including PostgreSQL, MySQL, SQLite3, and Oracle. It can be used with callbacks
and promises. It supports transactions and connection pooling.

In this article we work with MySQL.

## Setting up Knex.js

First, we install Knex.js.

$ npm init -y

We initiate a new Node application.

$ npm i knex mysql2

We install Knex.js and the MySQL driver. There are two drivers available:
mysql and mysql2; we have chosen the latter.

## Database version with Knex.js

In the first example, we figure out the version of MySQL.

version.js
  

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'user12',
        password: 's$cret',
        database: 'mydb'
    }
}

const knex = require('knex')(options);

knex.raw("SELECT VERSION()").then(
    (version) =&gt; console.log((version[0][0]))
).catch((err) =&gt; { console.log( err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

The example returns the version of MySQL.

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'user12',
        password: 's$cret',
        database: 'mydb'
    }
}

These are the connection options for MySQL.

const knex = require('knex')(options);

We load Knex.js and provide the connection options.

knex.raw("SELECT VERSION()").then(
    (version) =&gt; console.log((version[0][0]))
).catch((err) =&gt; { console.log( err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

With the raw function, we execute the SQL statement. If the
statement runs OK, we print the output. Otherwise, we log the error. In the end,
we close the database connection with destroy.

$ node version.js 
TextRow { 'VERSION()': '5.7.22-0ubuntu0.16.04.1' }

## Knex.js creating table

In the second example, we create a new database table.

create_table.js
  

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'user12',
        password: 's$cret',
        database: 'mydb'
    }
}

const knex = require('knex')(options);

knex.schema.createTable('cars', (table) =&gt; {
    table.increments('id')
    table.string('name')
    table.integer('price')
}).then(() =&gt; console.log("table created"))
    .catch((err) =&gt; { console.log(err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

A new table is created with the Knex.js schema createTable
function. We define the schema to contain three columns: id, name, and price.

## Knex.js inserting data

Next, we are going to insert some data into the created table.

insert_cars.js
  

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'user12',
        password: 's$cret',
        database: 'mydb'
    }
}

const knex = require('knex')(options);

const cars = [
    { name: 'Audi', price: 52642 },
    { name: 'Mercedes', price: 57127 },
    { name: 'Skoda', price: 9000 },
    { name: 'Volvo', price: 29000 },
    { name: 'Bentley', price: 350000 },
    { name: 'Citroen', price: 21000 },
    { name: 'Hummer', price: 41400 },
    { name: 'Volkswagen', price: 21600 },
]

knex('cars').insert(cars).then(() =&gt; console.log("data inserted"))
    .catch((err) =&gt; { console.log(err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

We select the cars table with knex('cars)
and insert eight rows with insert method.

## Knex.js selecting all rows

In the following example, we select all rows from the cars table.

select_cars.js
  

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'user12',
        password: 's$cret',
        database: 'mydb'
    }
}

const knex = require('knex')(options);

knex.from('cars').select("*")
    .then((rows) =&gt; {
        for (row of rows) {
            console.log(`${row['id']} ${row['name']} ${row['price']}`);
        }
    }).catch((err) =&gt; { console.log( err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

We select all rows with the select function. This time we have
chosen the table with the from function. Then we go through the
returned array of rows and print the three fields.

$ node select_cars.js 
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

## Knex.js restricting output with WHERE

The SQL WHERE clause is used to define the condition to be met for the rows to
be returned.

select_where.js
  

const options = {
    client: 'mysql2',
    connection: "mysql://root:andrea@localhost:3306/mydb"
}

const knex = require('knex')(options);

knex.from('cars').select("name", "price").where('price', '&gt;', '50000')
    .then((rows) =&gt; {
        for (row of rows) {
            console.log(`${row['name']} ${row['price']}`);
        }
    })
    .catch((err) =&gt; { console.log( err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

The example returns cars whose price is higher than 50000. 

const options = {
    client: 'mysql2',
    connection: "mysql://user12:s$cret@localhost:3306/mydb"
}

This time we have provided a connection URL.

knex.from('cars').select("name", "price").where('price', '&gt;', '50000')

We have selected two columns with select and added
a WHERE clause with the where function.

$ node select_where.js 
Audi 52642
Mercedes 57127
Bentley 350000

Three cars are more expensive than 50000.

## Knex.js ordering rows

We can order data with orderBy function.

order_cars.js
  

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'user12',
        password: 's$cret',
        database: 'mydb'
    }
}

const knex = require('knex')(options);

knex.from('cars').select('name', 'price').orderBy('price', 'desc')
    .then((rows) =&gt; {
        for (row of rows) {
            console.log(`${row['name']} ${row['price']}`);
        }
    }).catch((err) =&gt; { console.log( err); throw err })
    .finally(() =&gt; {
        knex.destroy();
    });

The example selects all cars and orders them by price in descending order.

$ node order_cars.js 
Bentley 350000
Mercedes 57127
Audi 52642
Hummer 41400
Volvo 29000
Volkswagen 21600
Citroen 21000
Skoda 9000

## Source

[Knex.js Guide](https://knexjs.org/guide/)

In this article we have worked with the Knex.js library. We have
created a few command line programs that interacted with MySQL.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)