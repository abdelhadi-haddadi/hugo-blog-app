+++
title = "CakePHP database"
date = 2025-08-29T20:04:12.440+01:00
draft = false
description = "CakePHP database tutorial shows how to program databases in PHP with CakePHP's database package."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# CakePHP database

last modified February 16, 2025

CakePHP database tutorial shows how to program databases in PHP with
CakePHP's database package.

## CakePHP database

CakePHP database is a flexible and powerful Database abstraction library with a
familiar PDO-like API. The library helps programmers build queries, prevent SQL
injections, inspect and alter schemas, and with debug and profile queries sent
to the database.

CakePHP database supports MySQL/MariaDB, PostgresSQL, SQLite, and Microsoft SQL Server.

## MariaDB database

In this article we work with MariaDB database

countries_mariadb.sql
  

DROP TABLE IF EXISTS countries;
CREATE TABLE countries(id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population INT);

INSERT INTO countries(name, population) VALUES('China', 1382050000);
INSERT INTO countries(name, population) VALUES('India', 1313210000);
INSERT INTO countries(name, population) VALUES('USA', 324666000);
INSERT INTO countries(name, population) VALUES('Indonesia', 260581000);
INSERT INTO countries(name, population) VALUES('Brazil', 207221000);
INSERT INTO countries(name, population) VALUES('Pakistan', 196626000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Bangladesh', 162099000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Russia', 146838000);
INSERT INTO countries(name, population) VALUES('Japan', 126830000);

These SQL commands create a countries table.

## Install CakePHP database

$ composer require cakephp/database

CakePHP database is installed with the above command.

## CakePHP execute

The execute executes a query.

version.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$stm = $conn-&gt;execute('SELECT VERSION()');
$version = $stm-&gt;fetch()[0];

echo $version . "\n";

The example prints the version of the MariaDB database.

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

A new MySQL driver is created. We provide the database name, username, and password.

$conn = new Connection([
    'driver' =&gt; $driver,
]);

A connection object is created.

$ php version.php
10.1.36-MariaDB

## CakePHP fetch

The fetch method returns the next row for the result set
after executing the SQL statement. Rows can be fetched to contain columns
as names or positions. If no  rows are left in result set, it returns false.

fetch_rows.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$stm = $conn-&gt;execute('SELECT * FROM countries');

while ($row = $stm-&gt;fetch('assoc')) {
    echo "{$row['id']} {$row['name']}  {$row['population']}\n";
}

The example fetches all rows from the countries table.

$stm = $conn-&gt;execute('SELECT * FROM countries');

A query is executed with execute.

while ($row = $stm-&gt;fetch('assoc')) {
    echo "{$row['id']} {$row['name']}  {$row['population']}\n";
}

We fetch all rows with fetch in a while loop.

$ php fetch_rows.php
1 China  1382050000
2 India  1313210000
3 USA  324666000
4 Indonesia  260581000
5 Brazil  207221000
6 Pakistan  196626000
7 Nigeria  186988000
8 Bangladesh  162099000
9 Nigeria  186988000
10 Russia  146838000
11 Japan  126830000

## CakePHP insert

A new row is added to the database with insert.

insert_row.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$conn-&gt;insert('countries', ['name' =&gt; 'Ethiopia', 'population' =&gt; 102403196]);

The example inserts a new row into the countries table.

## Parametrized queries

Parametrized queries guard against SQL injection attacks. The
execute method takes the values to be bound in the second
parameter and the types of the values in the third parameter.

parametrized.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$stm = $conn-&gt;execute('SELECT * FROM countries WHERE id = :id',
    ['id' =&gt; 1], ['id' =&gt; 'integer']);

$row = $stm-&gt;fetch();

echo "$row[0] $row[1] $row[2]\n";

The example selects a specific row using parametrized query.

$stm = $conn-&gt;execute('SELECT * FROM countries WHERE id = :id',
    ['id' =&gt; 1], ['id' =&gt; 'integer']);

The :id is a placeholder that is bound with the value specified
in the second argument. The type of the argument to be bound is given in the
third parameter.

$ php parametrized.php
1 China 1382050000

## CakePHP Query builder

Query builder provides a convenient, fluent interface for creating
and running database queries. It is an abstraction over low-level details of
running SQL statements. It shields the programmer from the intricacies of
the process.

query_builder.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$query = $conn-&gt;newQuery();
$query-&gt;select(['id', 'name']);
$query-&gt;from('countries');
$query-&gt;where(['id &gt;' =&gt; 4])-&gt;andWhere(['id &lt;' =&gt; 10]);

$rows = $query-&gt;execute();

foreach ($rows as $row) {
    echo "{$row[0]} {$row[1]}\n";
}

The example retrieves rows from the countries table with
Ids greather than 4 and lower than 10.

$query = $conn-&gt;newQuery();

A query builder is created with newQuery.

$query-&gt;select(['id', 'name']);
$query-&gt;from('countries');
$query-&gt;where(['id &gt;' =&gt; 4])-&gt;andWhere(['id &lt;' =&gt; 10]);

The query is built with fluent method calls.

$ php query_builder.php
5 Brazil
6 Pakistan
7 Nigeria
8 Bangladesh
9 Nigeria

## Counting rows

A number of commonly used functions can be created with the func method.

count_rows.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$query = $conn-&gt;newQuery();
$query-&gt;select(['count'  =&gt; $query-&gt;func()-&gt;count('*')]);
$query-&gt;from('countries');

$stm = $query-&gt;execute();
$n = $stm-&gt;fetch()[0];

echo "There are {$n} countries in the table\n";

The example counts the number of rows in the table.

$ php count_rows.php
There are 12 countries in the table

## CakePHP in expression

The in expression allows to create IN SQL clause.

in_expr.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Cake\Database\Connection;
use Cake\Database\Driver\Mysql;

$driver = new Mysql([
    'database' =&gt; 'mydb',
    'username' =&gt; 'root',
    'password' =&gt; 's$cret',
]);

$conn = new Connection([
    'driver' =&gt; $driver,
]);

$query = $conn-&gt;newQuery();
$query-&gt;select(['id', 'name', 'population']);
$query-&gt;from('countries');

$query-&gt;where(function ($exp) {
    return $exp
        -&gt;in('id', [2, 4, 6, 8, 10]);
});

$rows = $query-&gt;execute();

foreach ($rows as $row) {
    echo "{$row[0]} {$row[1]} {$row[2]}\n";
}

The example selects rows from the given array of Ids utilizing 
in expression.

$ php in_expr.php
2 India 1313210000
4 Indonesia 260581000
6 Pakistan 196626000
8 Bangladesh 162099000
10 Russia 146838000

## Source

[CakePHP Database Basics](https://book.cakephp.org/4/en/orm/database-basics.html)

In this article we have worked with CakePHP database library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.