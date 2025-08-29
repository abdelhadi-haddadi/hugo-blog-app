+++
title = "Retrieving data with PHP in PostgreSQL"
date = 2025-08-29T19:52:50.319+01:00
draft = false
description = "In this chapter of the PostgreSQL PHP tutorial, we read data from the database using."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../intro/)
[Next](../images/)

# Retrieving data with PHP in PostgreSQL

last modified July 6, 2020 

There are several functions to read data from a database.
The data can be fetched as an enumerated array, as an object or
as an associated array. 

There are three steps to retrieve data from a database. First we define
an SQL SELECT statement. The statement is executed with the pg_query
function. (In case of prepared statements, we would use pg_execute function.)
We receive a result set object. Using the result set, we fetch the data with
pg_fetch_row, pg_fetch_assoc or 
pg_fetch_object functions.

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

$query = "SELECT * FROM cars LIMIT 5"; 

$rs = pg_query($con, $query) or die("Cannot execute query: $query\n");

while ($row = pg_fetch_row($rs)) {
  echo "$row[0] $row[1] $row[2]\n";
}

pg_close($con); 

?&gt;

We get 5 cars from the cars table and print them to 
the console. 

$query = "SELECT * FROM cars LIMIT 5";

This is the SQL to fetch 5 rows of cars. 

$rs = pg_query($con, $query) or die("Cannot execute query: $query\n");

The query is executed with the pg_query function.
The function returns a result set. 

while ($row = pg_fetch_row($rs)) {
  echo "$row[0] $row[1] $row[2]\n";
}

The pg_fetch_row function returns an array of
string values. We can use array index notation to get the
array fields. When there are no more rows, the function returns
false and the while loop terminates.

$ php retrieve1.php
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000

Example output.

In the second example, we will fetch data with the 
pg_fetch_assoc function. 

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

$query = "SELECT * FROM cars LIMIT 5"; 

$rs = pg_query($con, $query) or die("Cannot execute query: $query\n");

while ($row = pg_fetch_assoc($rs)) {
    echo $row['id'] . " " . $row['name'] . " " . $row['price'];
    echo "\n";
}

pg_close($con);

?&gt;

The pg_fetch_assoc function fetches a row as an associative array.
The keys of the associative array are the column names.

while ($row = pg_fetch_assoc($rs)) {
    echo $row['id'] . " " . $row['name'] . " " . $row['price'];
    echo "\n";
}

The id, name, and price are the 
keys to the returned associative array.

In the last example, we will fetch the data with the pg_fetch_object 
function. It returns an object with properties that correspond to the 
fetched row's field names.

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die("Could not connect to server\n"); 

$query = "SELECT * FROM cars LIMIT 5"; 

$rs = pg_query($con, $query) or die("Cannot execute query: $query\n");

while ($ro = pg_fetch_object($rs)) {
    echo $ro-&gt;id . " ";
    echo $ro-&gt;name . " ";
    echo $ro-&gt;price . " ";
    echo "\n";
}

pg_close($con); 

?&gt;

We select five cars from the cars table.

while ($ro = pg_fetch_object($rs)) {
    echo $ro-&gt;id . " ";
    echo $ro-&gt;name . " ";
    echo $ro-&gt;price . " ";
    echo "\n";
}

The column names are the object properties, which hold
the values. 

We have finished reading data using pg_fetch_row, pg_fetch_assoc,
and pg_fetch_object functions.

[Contents](..)
[Previous](../intro/)
[Next](../images/)