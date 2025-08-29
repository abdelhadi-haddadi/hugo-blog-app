+++
title = "Doctrine DBAL QueryBuilder"
date = 2025-08-29T19:53:06.152+01:00
draft = false
description = "Doctrine DBAL QueryBuilder tutorial shows how to program databases in PHP with Doctrine's QueryBuilder. Doctrine Database Abstraction Layer (DBAL) is an abstraction layer that sits on top of PDO"
image = ""
imageBig = ""
categories = ["doctrine"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Doctrine DBAL QueryBuilder

last modified January 9, 2023

Doctrine DBAL QueryBuilder tutorial shows how to program databases in PHP
with Doctrine's QueryBuilder.

## Doctrine

Doctrine is a set of PHP libraries primarily focused on providing 
persistence services in PHP. Its main projects are an object-relational mapper 
(ORM) and the database abstraction layer (DBAL).
Doctrine is an open source project made available for free under the MIT license.

## Doctrine QueryBuilder

Doctrine QueryBuilder provides a convenient, fluent interface 
to creating and running database queries. It is an abstraction over low-level 
details of running SQL statements. It shields the programmer from the intricacies
of the process.

Doctrine has two kinds of query builders; one for the ORM and one for 
the DBAL. In this tutorial, we present the DBAL's QueryBuilder.

Doctrine Database Abstraction Layer (DBAL) is an abstraction layer that sits
on top of PDO and offers an intuitive and flexible API for communicating
with the most popular relational databases.     

## PostgreSQL database

In this tutorial, we work with PostgreSQL database.

cars_postgre.sql
  

-- cars.sql for PostgreSQL database

DROP TABLE IF EXISTS cars;
CREATE TABLE cars(id SERIAL PRIMARY KEY, name VARCHAR(255), price INT);
INSERT INTO cars(name, price) VALUES('Audi',52642);
INSERT INTO cars(name, price) VALUES('Mercedes',57127);
INSERT INTO cars(name, price) VALUES('Skoda',9000);
INSERT INTO cars(name, price) VALUES('Volvo',29000);
INSERT INTO cars(name, price) VALUES('Bentley',350000);
INSERT INTO cars(name, price) VALUES('Citroen',21000);
INSERT INTO cars(name, price) VALUES('Hummer',41400);
INSERT INTO cars(name, price) VALUES('Volkswagen',21600);

These SQL commands create a cars table.

## Doctrine installation

We install Doctrine and some helper tools.

$ composer req doctrine/dbal

We install Doctrine. Note that the DBAL layer is included in the doctrine/dbal
package.

$ composer req symfony/var-dumper
$ composer req tightenco/collect

We install Symfony's dumper and Laravel collections. We will be using 
them in our examples.

$ composer dumpautoload

We generate a list of all classes that need to be included in the project.
The composer re-reads the composer.json file to build 
up the list of files to autoload.

## Bootstrapping Doctrine CLI examples

We create a bootstrap file that will be included in all examples.    

bootstrap.php
  

&lt;?php

require_once "vendor/autoload.php";

use Doctrine\DBAL\DriverManager;

$attrs = ['driver' =&gt; 'pdo_pgsql', 'host' =&gt; 'localhost', 'dbname' =&gt; 'testdb', 
    'port' =&gt; 5432, 'user' =&gt; 'postgres', 'password' =&gt; 's$cret'];

$conn = DriverManager::getConnection($attrs);

In the bootstrap file, we include the autoloading file and set up the 
connection to the PostgreSQL database.

## Getting PostgreSQL version

In the first example, we get the version of PostgreSQL.    

version.php
  

&lt;?php

require_once "bootstrap.php";

$queryBuilder = $conn-&gt;createQueryBuilder();
$queryBuilder = $queryBuilder-&gt;select('version()');

$version = $queryBuilder-&gt;execute()-&gt;fetchColumn(0);
echo $version . "\n";

The example prints the version of the PostgreSQL database. 

$queryBuilder = $conn-&gt;createQueryBuilder();

From the connection object, we create a query builder with createQueryBuilder().

$queryBuilder = $queryBuilder-&gt;select('version()');

We execute the version() function with select().

$version = $queryBuilder-&gt;execute()-&gt;fetchColumn(0);

We execute the query and fetch the result with fetchColumn().
Notice the chaining of the method calls; this is called fluent API.

$ php version.php
PostgreSQL 11.1, compiled by Visual C++ build 1914, 64-bit

This is the output.

## Doctrine QueryBuilder fetchall

The fetchall() method returns all rows from the table.

featch_all.php
  

&lt;?php

require_once "bootstrap.php";

$queryBuilder = $conn-&gt;createQueryBuilder();
$queryBuilder-&gt;select('*')-&gt;from('cars');

$stm = $queryBuilder-&gt;execute();
$data = $stm-&gt;fetchAll();

$coll = collect($data);
$sorted = $coll-&gt;sortBy('price');

$sorted-&gt;each(function($item, $key) {
    echo sprintf("Id: %d Name: %s Price: %d\n", $item['id'], $item['name'], $item['price']);
});

The example retrieves all rows from the cars table.

$queryBuilder-&gt;select('*')-&gt;from('cars');

We select all rows from the cars table. The select()
takes the column names to show as parameters.

$stm = $queryBuilder-&gt;execute();
$data = $stm-&gt;fetchAll();

We execute the query and fetch all rows with fetchAll().

        
$coll = collect($data);
$sorted = $coll-&gt;sortBy('price');

We use Laravel collection to sort the data. 

$sorted-&gt;each(function($item, $key) {
    echo sprintf("Id: %d Name: %s Price: %d\n", $item['id'], $item['name'], $item['price']);
});

The sorted data is printed to the console.

$ php fetch_all.php
Id: 3 Name: Skoda Price: 9000
Id: 6 Name: Citroen Price: 21000
Id: 8 Name: Volkswagen Price: 21600
Id: 4 Name: Volvo Price: 29000
Id: 7 Name: Hummer Price: 41400
Id: 1 Name: Audi Price: 52642
Id: 2 Name: Mercedes Price: 57127
Id: 5 Name: Bentley Price: 350000

This is the output. The data is sorted by the price column.

## Doctrine QueryBuilder table alias

We can give aliases to database tables. This is useful when the table 
names are long and when we work with multiple tables.    

table_alias.php
  

&lt;?php

require_once "bootstrap.php";

$queryBuilder = $conn-&gt;createQueryBuilder();

$queryBuilder = $queryBuilder-&gt;select('*')-&gt;from('cars', 'c')
    -&gt;where('c.price &lt; 30000');

$selected = $queryBuilder-&gt;execute()-&gt;fetchAll();
dump($selected);

The example prints all cars with prices lower than 30000.

$queryBuilder = $queryBuilder-&gt;select('*')-&gt;from('cars', 'c')
    -&gt;where('c.price &lt; 30000');

We have given the cars table alias c. 
Later, we refer to the table via the alias.

dump($selected);

We output the data with dump().

$ php table_alias.php
array:4 [
    0 =&gt; array:3 [
    "id" =&gt; 3
    "name" =&gt; "Skoda"
    "price" =&gt; 9000
    ]
    1 =&gt; array:3 [
    "id" =&gt; 4
    "name" =&gt; "Volvo"
    "price" =&gt; 29000
    ]
    2 =&gt; array:3 [
    "id" =&gt; 6
    "name" =&gt; "Citroen"
    "price" =&gt; 21000
    ]
    3 =&gt; array:3 [
    "id" =&gt; 8
    "name" =&gt; "Volkswagen"
    "price" =&gt; 21600
    ]
]

There are four cars with prices lower than 30000. The output is nicely formatted
with Symfony's dumper. The output is also coloured on a terminal.

## Doctrine QueryBuilder setParameter

The setParameter() is used to set the parameter 
to the query placeholders. Doctrine supports positional and named 
parameters. 

Parameterized queries are used to protect the code against SQL injections
and make the queries more efficient.    

fetch_column.php
  

&lt;?php

require_once "bootstrap.php";

$id = 6;

$queryBuilder = $conn-&gt;createQueryBuilder();

$queryBuilder = $queryBuilder-&gt;select('name')-&gt;from('cars')
    -&gt;where('id = ?')-&gt;setParameter(0, $id);

$car_name = $queryBuilder-&gt;execute()-&gt;fetchColumn(0);
echo $car_name . "\n";

In the example, we get the row with Id 6. We use a parameterized 
query to fetch the column.

$queryBuilder = $queryBuilder-&gt;select('name')-&gt;from('cars')
    -&gt;where('id = ?')-&gt;setParameter(0, $id);

The placeholder is identified with the ? character. This 
type is called positional parameter. With setParameter()
we map the value to the placeholder.

$ php fetch_column.php
Citroen

This is the output.

## Doctrine QueryBuilder orderBy

The data can be orderd with orderBy(). Sometimes we do 
not have control over how data is sent to us; in such cases, we can 
use Laravel Collections to sort the data, like we have done in the 
fetch all example.

order_by.php
  

&lt;?php

require_once "bootstrap.php";

$queryBuilder = $conn-&gt;createQueryBuilder();
$queryBuilder
    -&gt;select('*')
    -&gt;from('cars')
    -&gt;orderBy('name', 'desc');

$stm = $queryBuilder-&gt;execute();
$data = $stm-&gt;fetchAll();

$coll = collect($data);

$coll-&gt;each(function($item, $key) {
    echo sprintf("id: %d name: %s price: %d\n", $item['id'], $item['name'], $item['price']);
});

The example retrieves all rows from the cars table 
and sorts them by the car name in descending order.

$queryBuilder
    -&gt;select('*')
    -&gt;from('cars')
    -&gt;orderBy('name', 'desc');

The data is selected and ordered.

$ php order_by.php
id: 4 name: Volvo price: 29000
id: 8 name: Volkswagen price: 21600
id: 3 name: Skoda price: 9000
id: 2 name: Mercedes price: 57127
id: 7 name: Hummer price: 41400
id: 6 name: Citroen price: 21000
id: 5 name: Bentley price: 350000
id: 1 name: Audi price: 52642

## Doctrine QueryBuilder where in

The following example shows how to build a query with WHERE IN 
clause.

where_in.php
  

&lt;?php

require_once "bootstrap.php";

use Doctrine\DBAL\Connection;

$ids = [2, 4, 6];

$queryBuilder = $conn-&gt;createQueryBuilder();

$queryBuilder-&gt;select('*')-&gt;from('cars')
    -&gt;where('id IN (?)')-&gt;setParameter(0, $ids, Connection::PARAM_INT_ARRAY);
$cars = $queryBuilder-&gt;execute()-&gt;fetchAll();

$data = collect($cars);

$data-&gt;each(function ($e) {
    dump($e);
});

The example prints cars with the specified ids: 2, 4, and 6.

$queryBuilder-&gt;select('*')-&gt;from('cars')
    -&gt;where('id IN (?)')-&gt;setParameter(0, $ids, Connection::PARAM_INT_ARRAY);

We need to tell Doctrine that we use an array as parameter with 
Connection::PARAM_INT_ARRAY flag.

$ php where_in.php
array:3 [
    "id" =&gt; 2
    "name" =&gt; "Mercedes"
    "price" =&gt; 57127
]
array:3 [
    "id" =&gt; 4
    "name" =&gt; "Volvo"
    "price" =&gt; 29000
]
array:3 [
    "id" =&gt; 6
    "name" =&gt; "Citroen"
    "price" =&gt; 21000
]

This is the output.

## Doctrine QueryBuilder combining WHERE clauses

We can combine WHERE clauses by adding andWhere().

and_where.php
  

&lt;?php

require_once "bootstrap.php";

$minPrice = 10000;
$maxPrice = 50000;

$queryBuilder = $conn-&gt;createQueryBuilder();
$queryBuilder
    -&gt;select('*')
    -&gt;from('cars')
    -&gt;where('price &gt; ?')
    -&gt;andWhere('price &lt; ?')
    -&gt;setParameter(0, $minPrice)
    -&gt;setParameter(1, $maxPrice);

$stm = $queryBuilder-&gt;execute();
$data = $stm-&gt;fetchAll();

$coll = collect($data);

$coll-&gt;each(function($item, $key) {
    echo sprintf("id: %d name: %s price: %d\n", $item['id'], $item['name'], $item['price']);
});

The example shows all cars with prices between the given minimum and maximum price.

$ php and_where.php
id: 4 name: Volvo price: 29000
id: 6 name: Citroen price: 21000
id: 7 name: Hummer price: 41400
id: 8 name: Volkswagen price: 21600

There are four cars that satisfy the conditions.

## Doctrine QueryBuilder insert row

A new row is inserted with insert() and values().

insert_row.php
  

&lt;?php

require_once "bootstrap.php";

$name = 'Oldsmobile';
$price = 28800;

$queryBuilder = $conn-&gt;createQueryBuilder();

$queryBuilder = $queryBuilder-&gt;insert('cars')
    -&gt;values(['name' =&gt; '?', 'price' =&gt; '?'])
    -&gt;setParameters([0 =&gt; $name, 1 =&gt; $price]);
$queryBuilder-&gt;execute();

$sql = $queryBuilder-&gt;getSQL();
echo "Executed: $sql\n";

The example inserts a new car into the cars table.

$queryBuilder = $queryBuilder-&gt;insert('cars')
    -&gt;values(['name' =&gt; '?', 'price' =&gt; '?'])
    -&gt;setParameters([0 =&gt; $name, 1 =&gt; $price]);

Multiple parameters can be specified with setParameters().

$sql = $queryBuilder-&gt;getSQL();

The getSQL() gets the SQL statement generated by 
Doctrine.

$ php insert_row.php
Executed: INSERT INTO cars (name, price) VALUES(?, ?)

The output shows the generated SQL statement.

## Doctrine QueryBuilder delete

The data is deleted with delete().

delete_rows.php
  

&lt;?php

require_once "bootstrap.php";

$name = 'Oldsmobile';
$price = 26600;

$queryBuilder = $conn-&gt;createQueryBuilder();

$queryBuilder = $queryBuilder-&gt;delete('cars')
    -&gt;where('id IN (1, 2, 3)');

$n = $queryBuilder-&gt;execute();

echo "The query deleted $n rows\n";

The example deletes rows with ids 1, 2, and 3.

$n = $queryBuilder-&gt;execute();

The execute()
method returns the number of deleted rows.

$ php delete_rows.php
The query deleted 3 rows

This is the output.

## Doctrine QueryBuilder update row

A row is updated with udpate() and set().

udpate_row.php
  

&lt;?php

require_once "bootstrap.php";

$name = 'Oldsmobile';
$price = 26600;

$queryBuilder = $conn-&gt;createQueryBuilder();

$queryBuilder = $queryBuilder-&gt;update('cars')
    -&gt;set('price', $queryBuilder-&gt;createNamedParameter($price))
    -&gt;where('id = 9');

$queryBuilder-&gt;execute();

$sql = $queryBuilder-&gt;getSQL();
echo "Executed: $sql\n";

The example updates the price of a car with Id 9.

## Symfony Doctrine example

The following example is a simple Symfony web application. 
Symfony uses Doctrine for persistence.

$ composer create-project symfony/skeleton symfapp
$ cd symfapp

We create a new Symfony skeleton application.

$ composer require symfony/orm-pack

We install Doctrine.

$ composer require maker --dev
$ composer require server --dev

We install the maker and server components.

config/packages/doctrine.yaml
  

doctrine:
    dbal:
        # configure these for your database server
        driver: pdo_pgsql
        charset: utf8

We configure Doctrine to use PostgreSQL. By default, Symfony has 
configuration for MySQL.

.env
  

...
DATABASE_URL=pgsql://postgres:s$cret@127.0.0.1:5432/testdb

In the .env file, we set up the DATABASE_URL.

$ php bin/console doctrine:query:sql "select version()"
array(1) {
    [0]=&gt;
    array(1) {
    ["version"]=&gt;
    string(58) "PostgreSQL 11.1, compiled by Visual C++ build 1914, 64-bit"
    }
}

We verify the PostgreSQL setup.

$ php bin/console make:controller HomeController

With maker, we create a new controller.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Doctrine\DBAL\Connection;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
    * @Route("/home", name="home")
    */
    public function index(Connection $conn)
    {
        $queryBuilder = $conn-&gt;createQueryBuilder();
        $data = $queryBuilder-&gt;select('*')-&gt;from('cars')-&gt;execute()-&gt;fetchAll();

        return $this-&gt;json($data);
    }
}

The index() method returns all rows from the database table.
Note that for simplicity reasons, we have put the query builder in the controller.
In production applications, there should also be a service layer and a repository.

return $this-&gt;json($data);

The data is sent back to the client in JSON format.

$ php bin/console server:run

We run the development server.

$ curl localhost:8000/home
[{"id":4,"name":"Volvo","price":29000},{"id":5,"name":"Bentley","price":350000},
{"id":6,"name":"Citroen","price":21000},{"id":7,"name":"Hummer","price":41400},
{"id":8,"name":"Volkswagen","price":21600},{"id":9,"name":"Oldsmobile","price":26600}]

With curl, we generate a request to the application.

In this article, we have worked with Doctrine QueryBuilder and PostgreSQL 
database.