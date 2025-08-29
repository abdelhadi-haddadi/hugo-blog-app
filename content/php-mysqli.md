+++
title = "PHP mysqli"
date = 2025-08-29T20:04:33.562+01:00
draft = false
description = "PHP mysqli tutorial shows how to program MySQL in PHP with mysqli extension."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP mysqli

last modified February 16, 2025

PHP mysqli tutorial shows how to program MySQL in PHP with mysqli extension.

## MySQL

MySQL is a leading open source database management system. It is a multiuser,
multithreaded database management system. MySQL is especially popular on the
web. It is one of the parts of the very popular *LAMP* platform. Linux,
Apache, MySQL, and PHP. Currently MySQL is owned by Oracle. MySQL database is
available on most important OS platforms. It runs on BSD Unix, Linux, Windows,
or Mac OS.

## PHP mysqli

The MySQLi Extension (MySQL Improved) is a relational database driver used
in the PHP scripting language to provide an interface with MySQL databases.
It provides both object oriented and procedural APIs. Other ways to interact
with MySQL are: PDO and ORM solutions.

The pdo_mysql PHP Data Objects module is a database abstraction
layer for PHP applications. This module is beneficial if we write portable
database PHP scripts.

There are also ORM solutions for working with MySQL in PHP such as Doctrine
or Eloquent.

$ sudo apt install php8.1-mysql

We install the php8.1-mysql module. A
/etc/php/8.1/mods-available/mysqli.ini is created during
installation, where the extension is enabled.

## PHP mysqli version

In the following example, we determine the version of the MySQL database.

version.php
  

&lt;?php

$con = new mysqli("localhost", "dbuser", "passwd", "mydb");

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$res = $con-&gt;query("SELECT VERSION()");

if ($res) {

    $row = $res-&gt;fetch_row();
    echo $row[0];
}

$res-&gt;close();
$con-&gt;close();

The example prints the version of MySQL.

$con = new mysqli("localhost", "dbuser", "passwd", "mydb");

A connection to the database is created. The mysqli class
takes the hostname, username, password, and database name as arguments.

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

The connect_errno contains the error code value if the
connection attempt failed. It has zero if no error occurred.
The connect_error method returns the string
description of the last connect error.

$res = $con-&gt;query("SELECT VERSION()");

The query method performs a query on the database.
The SELECT VERSION statement returns the version of MySQL.

if ($res) {

    $row = $res-&gt;fetch_row();
    echo $row[0];
}

The fetch_row returns a result row as an enumerated array.
Our result contains only one value.

$res-&gt;close();
$con-&gt;close();

In the end, we release the resources.

$ php version.php
8.0.29-0ubuntu0.22.04.2

The mysqli driver also supports procedural style of programming.

version2.php
  

&lt;?php

$con = mysqli_connect("localhost", "dbuser", "passwd", "mydb");

if (mysqli_connect_errno()) {

    printf("connection failed: %s\n", mysqli_connect_error());
    exit();
}

$query = "SELECT VERSION()";

$res = mysqli_query($con, $query);

if ($res) {

    $row = mysqli_fetch_row($res);
    echo $row[0];
}

mysqli_free_result($res);
mysqli_close($con);

The example returns the version of MySQL with procedural functions.

## PHP mysqli create table

The following example creates a new database table. A table is created with the
CREATE TABLE statement. Rows are added to the table with the
INSERT INTO statements.

create_table.php
  

&lt;?php

$host = "localhost";
$user = "dbuser";
$passwd = "passwd";
$db = "mydb";

function execute_query($query, $con)
{
    $res = $con-&gt;query($query);

    if (!$res) {

        echo "failed to execute query: $query\n";
    } else {
        echo "Query: $query executed\n";
    }

    if (is_object($res)) {

        $res-&gt;close();
    }
}

$con = new mysqli($host, $user, $passwd, $db);

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$query = "DROP TABLE IF EXISTS cars";
execute_query($query, $con);

$query = "CREATE TABLE cars(id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), price INT)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Audi', 52642)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Mercedes', 57127)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Skoda', 9000)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Volvo', 29000)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Bentley', 350000)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Citroen', 21000)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Hummer', 41400)";
execute_query($query, $con);

$query = "INSERT INTO cars(name, price) VALUES('Volkswagen', 21600)";
execute_query($query, $con);

$con-&gt;close();

The example creates the cars table with eight rows.

## PHP mysqli prepared statements

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements increase security
and performance. In mysqli, the prepare function prepares an SQL
statement for execution.

prepared_statement.php
  

&lt;?php

$host = "localhost";
$user = "dbuser";
$passwd = "passwd";
$db = "mydb";

$con = new mysqli($host, $user, $passwd, $db);

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$id = 3;

$query = "SELECT id, name, price FROM cars WHERE id = ?";

if ($stmt = $con-&gt;prepare($query)) {

    $stmt-&gt;bind_param('i', $id);

    $stmt-&gt;execute();
    $stmt-&gt;bind_result($row_id, $name, $price);
    $stmt-&gt;fetch();

    echo "$row_id $name $price\n";

    $stmt-&gt;close();
} else {

    echo "failed to fetch data\n";
}

$con-&gt;close();

The example selects a specific row from the table. It uses a prepared
statement.

$query = "SELECT id, name, price FROM cars WHERE id = ?";

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements are faster and guard
against SQL injection attacks. The ? is a placeholder, which will
be filled later. In our case we have one value: an integer id.

$stmt-&gt;bind_param('i', $id);

The value of the $id variable is bound to the placeholder with the
bind_param method. The first parameter specifies the variable type;
it is integer in our case.

$stmt-&gt;execute();

The statement is executed.

$stmt-&gt;bind_result($row_id, $name, $price);

The bind_result binds the returned values to the specified
variables.

echo "$row_id $name $price\n";

We print the variables to the terminal.

$con-&gt;close();

We close the statement.

$ php prepared_statement.php
3 Skoda 9000

## PHP mysqli fetch_row

The fetch_row method fetches one row of data from the result set
and returns it as an enumerated array. Each column is stored in an array
offset starting from 0. Each subsequent call to this function will return
the next row within the result set, or NULL if there are no more rows.

fetch_rows.php
  

&lt;?php

$host = "localhost";
$user = "dbuser";
$passwd = "passwd";
$db = "mydb";

$con = new mysqli($host, $user, $passwd, $db);

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$query = "SELECT * FROM cars";

if ($res = $con-&gt;query($query)) {

    printf("Select query returned %d rows.\n", $res-&gt;num_rows);

    while ($row = $res-&gt;fetch_row())
    {
        printf("%s %s %s\n", $row[0], $row[1], $row[2]);
    }

    $res-&gt;close();
} else {

    echo "failed to fetch data\n";
}

$con-&gt;close();

The example returns all rows from the cars table.

$query = "SELECT * FROM cars";

This SELECT query selects all rows from the table.

if ($res = $con-&gt;query($query)) {

We execute the SELECT query with the query method.

printf("Select query returned %d rows.\n", $res-&gt;num_rows);

The number of returned rows is stored in the num_rows attribute.

while ($row = $res-&gt;fetch_row())
{
    printf("%s %s %s\n", $row[0], $row[1], $row[2]);
}

With the fetch_row in a while loop, we fetch all rows
from the table.

$ php fetch_rows.php
Select query returned 8 rows.
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

## PHP mysqli fetch_assoc

The fetch_assoc returns an associative array of strings
representing the fetched row in the result set. Each key in the array represents
the name of one of the result set's columns or NULL if there are no
more rows in result set.

fetch_rows2.php
  

&lt;?php

$host = "localhost";
$user = "dbuser";
$passwd = "passwd";
$db = "mydb";

$con = new mysqli($host, $user, $passwd, $db);

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$query = "SELECT * FROM cars";

if ($res = $con-&gt;query($query)) {

    printf("Select query returned %d rows.\n", $res-&gt;num_rows);

    while ($row = $res-&gt;fetch_assoc())
    {
        printf("%s %s %s\n", $row['id'], $row['name'], $row['price']);
    }

    $res-&gt;close();
} else {

    echo "failed to fetch data\n";
}

$con-&gt;close();

The example returns all rows from the cars table.

while ($row = $res-&gt;fetch_assoc())
{
    printf("%s %s %s\n", $row['id'], $row['name'], $row['price']);
}

When we use fetch_assoc, we refer to the columns via
array notation.

## PHP mysqli fetch_object

The fetch_object returns an object with string properties
that correspond to the fetched row or NULL if there are no more
rows in resultset.

fetch_rows3.php
  

&lt;?php

$host = "localhost";
$user = "dbuser";
$passwd = "passwd";
$db = "mydb";

$con = new mysqli($host, $user, $passwd, $db);

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$query = "SELECT * FROM cars";

if ($res = $con-&gt;query($query)) {

    printf("Select query returned %d rows.\n", $res-&gt;num_rows);

    while ($row = $res-&gt;fetch_object())
    {
        printf("%s %s %s\n", $row-&gt;id, $row-&gt;name, $row-&gt;price);
    }

    $res-&gt;close();
} else {

    echo "failed to fetch data\n";
}

$con-&gt;close();

The example returns all rows from the cars table.

while ($row = $res-&gt;fetch_object())
{
    printf("%s %s %s\n", $row-&gt;id, $row-&gt;name, $row-&gt;price);
}

When we use fetch_object, we refer to the columns via
object access notation.

## PHP mysqli column names

The next example prints column names with the data from
the database table. We refer to column names as meta data.

column_names.php
  

&lt;?php

$host = "localhost";
$user = "dbuser";
$passwd = "passwd";
$db = "mydb";

$con = new mysqli($host, $user, $passwd, $db);

if ($con-&gt;connect_errno) {

    printf("connection failed: %s\n", $con-&gt;connect_error());
    exit();
}

$query = "SELECT * FROM cars";

if ($res = $con-&gt;query($query)) {

    $num_rows = $res-&gt;num_rows;
    $num_fields = $res-&gt;field_count;

    printf("Select query returned %d rows.\n", $num_rows);
    printf("Select query returned %d columns.\n", $num_fields);

    $fields = $res-&gt;fetch_fields();

    while ($row = $res-&gt;fetch_row()) {

        for ($i = 0; $i &lt; $num_fields; $i++) {

            echo $fields[$i]-&gt;name . ": " . $row[$i] . "\n";
        }

        echo "*******************************\n";
    }

    $res-&gt;close();
} else {

    echo "failed to fetch data\n";
}

$con-&gt;close();

The example prints all rows of the cars table with
the column headers.

$num_rows = $res-&gt;num_rows;
$num_fields = $res-&gt;field_count;

The num_rows attribute returns the number of rows in the result.
The field_count returns the number of fields in the result.

$fields = $res-&gt;fetch_fields();

The fetch_fields method returns an array of objects
representing the fields in a result set. These are the column names.

while ($row = $res-&gt;fetch_row()) {

    for ($i = 0; $i &lt; $num_fields; $i++) {

        echo $fields[$i]-&gt;name . ": " . $row[$i] . "\n";
    }

    echo "*******************************\n";
}

We show the column names and the data.

$ php column_names.php
Select query returned 8 rows.
Select query returned 3 columns.
id: 1
name: Audi
price: 52642
*******************************
id: 2
name: Mercedes
price: 57127
*******************************
id: 3
name: Skoda
price: 9000
*******************************
...

## Source

[MySQL Improved Extension - PHP manual](https://www.php.net/manual/en/book.mysqli.php)

This was PHP mysqli tutorial. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.