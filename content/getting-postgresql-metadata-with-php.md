+++
title = "Getting PostgreSQL metadata with PHP"
date = 2025-08-29T19:52:49.205+01:00
draft = false
description = "In this part of the PostgreSQL PHP tutorial, we work with database metadata."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../images/)
[Next](../trans/)

# Getting PostgreSQL metadata with PHP

last modified July 6, 2020 

Metadata is information about the data in the database. 
Metadata in PostgreSQL contains information about the tables 
and columns, in which we store data. Number of rows affected 
by an SQL statement is metadata. Number of rows and columns returned 
in a result set belong to metadata as well.

There is an experimental function pg_meta_data, which returns 
table definition for a table name as an array.

## Columns and rows

As we have already stated, the number of columns and rows in a result
set is considered to be metadata. 

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

$query = "SELECT Name, Price FROM Cars LIMIT 4"; 
$rs = pg_query($con, $query) or die (pg_last_error($con)); 

$num_rows = pg_num_rows($rs);
$num_cols = pg_num_fields($rs);

echo "There are $num_rows rows and $num_cols columns in the query\n";

pg_close($con); 

?&gt;

In the above example, we get the number of rows and columns returned
by a query. 

$query = "SELECT Name, Price FROM Cars LIMIT 4"; 

From the SQL query we can see that we select 2 columns and 4 rows.
The query could be created also dynamically.

$num_rows = pg_num_rows($rs);
$num_cols = pg_num_fields($rs);

The pg_num_rows function returns the number of rows in a 
PostgreSQL result resource. The pg_num_rows function 
returns the number of columns (fields) in a PostgreSQL result resource.

$ php colsrows.php
There are 4 rows and 2 columns in the query.

Example output.

## Column headers

Next we will show, how to print column headers with the data
from a database table.

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

$query = "SELECT id, name, price FROM cars LIMIT 5"; 
$rs = pg_query($con, $query) or die (pg_last_error($con)); 

$fname1 = pg_field_name($rs, 0);
$fname2 = pg_field_name($rs, 1);
$fname3 = pg_field_name($rs, 2);

printf("%3s  %-10s %8s\n", $fname1, $fname2, $fname3);

while ($row = pg_fetch_row($rs)) {
  printf("%3s  %-10s %8s\n", $row[0], $row[1], $row[2]);
}

pg_close($con); 

?&gt;

In this program, we select 5 rows from the cars table
with the column names. 

$fname1 = pg_field_name($rs, 0);
$fname2 = pg_field_name($rs, 1);
$fname3 = pg_field_name($rs, 2);

The pg_field_name function returns the name of
the column (field) for the specified column number.

printf("%3s  %-10s %8s\n", $fname1, $fname2, $fname3);

We print the column headers. We do some formatting with the
printf function.

$ php column_headers.php 
 id  name          price
  1  Audi          52642
  2  Mercedes      57127
  3  Skoda          9000
  4  Volvo         29000
  5  Bentley      350000

Ouput of the program. 

## Affected rows

In the following example, we will find out how many changes have
been done by a particular SQL command.

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

$query = "DROP TABLE IF EXISTS friends"; 
pg_query($con, $query) or die("Cannot execute query: $query\n");

$query = "CREATE TABLE friends(id INT, name TEXT)"; 
pg_query($con, $query) or die("Cannot execute query: $query\n");

$query = "INSERT INTO friends VALUES (1, 'Jane'), (2, 'Thomas')"
    . ", (3, 'Beky'), (4, 'Robert'), (5, 'Lucy')"; 
$res = pg_query($con, $query) or die("Cannot execute query: $query\n");

$ar = pg_affected_rows($res);
echo "The query has affected $ar rows\n";

$query = "DELETE FROM friends WHERE id IN (3, 4, 5)";
$res = pg_query($con, $query) or die("Cannot execute query: $query\n");

$ar = pg_affected_rows($res);
echo "The query has affected $ar rows\n";

pg_close($con);

?&gt;

We create a friends table. In the last SQL command, we delete three
rows. We have one INSERT and one DELETE statement 
for which we can call the pg_affected_rows to get the number 
of affected rows. 

$query = "INSERT INTO friends VALUES (1, 'Jane'), (2, 'Thomas')"
    . ", (3, 'Beky'), (4, 'Robert'), (5, 'Lucy')"; 

We insert five rows into the friends table.

$ar = pg_affected_rows($res);
echo "The query has affected $ar rows\n";

The pg_affected_rows function returns the number of
rows affected by the last SQL statement. 

$ php affected_rows.php
The query has affected 5 rows
The query has affected 3 rows

The INSERT statement has created five rows, the DELETE statement 
has removed 3 rows. 

## Table metadata

There is an experimental pg_meta_data. 
It returns metadata for each column of a database table.

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

$ary = pg_meta_data($con, 'cars');
var_dump($ary);

pg_close($con); 

?&gt;

The example prints metadata about table columns of the cars table. 

$ary = pg_meta_data($con, 'cars');

The pg_meta_data returns metadata information for the
cars table. It returns an array.

var_dump($ary);

The var_dump function dumps information about a variable.
In our case it is the returned array of metadata information.

$ php metadata.php
array(3) {
  ["id"]=&gt;
  array(6) {
    ["num"]=&gt;
    int(1)
    ["type"]=&gt;
    string(4) "int4"
    ["len"]=&gt;
    int(4)
    ["not null"]=&gt;
    bool(true)
...

Excerpt from the example output.

In this part of the PostgreSQL PHP tutorial, we have worked with database
metadata. 

[Contents](..)
[Previous](../images/)
[Next](../trans/)