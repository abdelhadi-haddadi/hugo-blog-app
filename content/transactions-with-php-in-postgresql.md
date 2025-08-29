+++
title = "Transactions with PHP in PostgreSQL"
date = 2025-08-29T19:52:50.322+01:00
draft = false
description = "In this part of the PostgreSQL PHP tutorial, we work with database transactions."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../meta/)

# Transactions with PHP in PostgreSQL

last modified July 6, 2020 

In this chapter, we will work with transactions. First, we provide some
basic definitions. Then we will a sample program that uses a transaction.

A *transaction* is an atomic unit of database operations 
against the data in one or more databases. SQL statements in a transaction can 
be either all committed to the database or all rolled back. SQL statements
are put into transactions for data safety and integrity.

In PostgreSQL PHP each SQL statement is committed to the database after
it is executed. This is not true for all language bindings. For example
in Python's psycopg2 module all changes must be explicitly committed with
a commit method by default. 

In direct SQL, a transaction is started with BEGIN TRANSACTION 
statement and ended with END TRANSACTION, COMMIT statement. 
In PostgreSQL these statements are BEGIN and COMMIT. 
In some drivers these statements are omitted. They are handled by the driver. 
In PHP there are no such methods and the we must use the direct SQL. 
(In PHP PDO there are such methods.)

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n"); 

pg_query("BEGIN") or die("Could not start transaction\n");

$res1 = pg_query("DELETE FROM cars WHERE id IN (1, 9)");
$res2 = pg_query("INSERT INTO cars VALUES (1, 'BMW', 36000), (9, 'Audi', 52642)");

if ($res1 and $res2) {
    echo "Commiting transaction\n";
    pg_query("COMMIT") or die("Transaction commit failed\n");
} else {
    echo "Rolling back transaction\n";
    pg_query("ROLLBACK") or die("Transaction rollback failed\n");;
}

pg_close($con); 

?&gt;

We have our cars table. We want to swap the first row with the last row. 
We do it in two steps. First we delete the two rows. Then we insert them
with their id's exchanged. These two operations need to be placed in a transaction.
If the first step succeeded and the second failed, the data would be corrupted. 
Therefore we need to have all done or nothing done.

pg_query("BEGIN") or die("Could not start transaction\n");

We start a new transaction by issuing the BEGIN statement. 

$res1 = pg_query("DELETE FROM cars WHERE id IN (1, 9)");
$res2 = pg_query("INSERT INTO cars VALUES (1, 'BMW', 36000), (9, 'Audi', 52642)");

These are the two SQL statements that modify our table. Both
pg_query functions return true or false boolean value
indicating whether the SQL command failed or not. 

if ($res1 and $res2) {
    echo "Commiting transaction\n";
    pg_query("COMMIT") or die("Transaction commit failed\n");
} else {
    echo "Rolling back transaction\n";
    pg_query("ROLLBACK") or die("Transaction rollback failed\n");;
}

If both function calls return true, we commit the transaction
with the COMMIT statement. Otherwise we rollback the changes 
with the ROLLBACK statement. 

$ php transaction.php
Commiting transaction

testdb=# SELECT * FROM cars ORDER BY id;
 id |    name    | price  
----+------------+--------
  1 | BMW        |  36000
  2 | Mercedes   |  57127
  3 | Skoda      |   9000
  4 | Volvo      |  29000
  5 | Bentley    | 350000
  6 | Citroen    |  21000
  7 | Hummer     |  41400
  8 | Volkswagen |  21606
  9 | Audi       |  52642
(9 rows)

The rows were successfully swapped. 

In this part of the PostgreSQL PHP tutorial, we have mentioned transactions.

[Contents](..)
[Previous](../meta/)