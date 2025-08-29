+++
title = "MySQL insert, update and delete"
date = 2025-08-29T20:03:44.193+01:00
draft = false
description = "In this chapter of the MySQL tutorial, we will be inserting, updating and deleting data."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../expressions/)
[Next](../select/)

# MySQL insert, update and delete

last modified January 10, 2023 

In this part of the MySQL tutorial, we will insert, update and delete 
data from MySQL tables. We will use the INSERT, 
DELETE and UPDATE statements. 
These statements are part of the SQL Data Manipulation Language, *DML*.

## Inserting data

The INSERT statement is used to insert data into tables. 

We will create a new table, where we will do our examples. 

mysql&gt; CREATE TABLE Books(Id INTEGER PRIMARY KEY, Title VARCHAR(100),
    -&gt; Author VARCHAR(60));

We create a new table Books, with Id, Title 
and Author columns. 

mysql&gt; INSERT INTO Books(Id, Title, Author) VALUES(1, 'War and Peace', 
    -&gt; 'Leo Tolstoy');

This is the classic INSERT SQL statement. We have specified all 
column names after the table name and all values after the VALUES 
keyword. We add our first row into the table. 

mysql&gt; SELECT * FROM Books;
+----+---------------+-------------+
| Id | Title         | Author      |
+----+---------------+-------------+
|  1 | War and Peace | Leo Tolstoy |
+----+---------------+-------------+

We have inserted our first row into the Books table. 

mysql&gt; INSERT INTO Books(Title, Author) VALUES ('The Brothers Karamazov',
    -&gt; 'Fyodor Dostoyevsky');

We add a new title into the Books table. We have omitted the 
Id column. The Id column has AUTO_INCREMENT attribute. 
This means that MySQL will increase the Id column automatically. The value by 
which the AUTO_INCREMENT column is increased is controlled by 
auto_increment_increment system variable.
By default it is 1. 

mysql&gt; SELECT * FROM Books;
+----+------------------------+--------------------+
| Id | Title                  | Author             |
+----+------------------------+--------------------+
|  1 | War and Peace          | Leo Tolstoy        |
|  2 | The Brothers Karamazov | Fyodor Dostoyevsky |
+----+------------------------+--------------------+

Here is what we have in the Books table. 

mysql&gt; INSERT INTO Books VALUES(3, 'Crime and Punishment',
    -&gt; 'Fyodor Dostoyevsky');

In this SQL statement, we did not specify any column names after 
the table name. In such a case, we have to supply all values.

mysql&gt; REPLACE INTO Books VALUES(3, 'Paradise Lost', 'John Milton');
Query OK, 2 rows affected (0.00 sec)

The REPLACE statement is a MySQL extension to the SQL
standard. It inserts a new row or replaces the old row if it collides
with an existing row. In our table, there is a row with Id=3. 
So our previous statement replaces it with a new row. There is a message 
that two rows were affected. One row was deleted and one was inserted. 

mysql&gt; SELECT * FROM Books WHERE Id=3;
+----+---------------+-------------+
| Id | Title         | Author      |
+----+---------------+-------------+
|  3 | Paradise Lost | John Milton |
+----+---------------+-------------+

This is what we have now in the third column. 

We can use the INSERT and SELECT statements 
together in one statement. 

mysql&gt; CREATE TABLE Books2(Id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    -&gt; Title VARCHAR(100), Author VARCHAR(60)) type=MEMORY;

First, we create a temporary table called Books2 in memory.

mysql&gt; INSERT INTO Books2 SELECT * FROM Books;
Query OK, 3 rows affected (0.00 sec)
Records: 3  Duplicates: 0  Warnings: 0

Here we insert all data into the Books2 that we select from 
the Books table. 

mysql&gt; SELECT * FROM Books2;
+----+------------------------+--------------------+
| Id | Title                  | Author             |
+----+------------------------+--------------------+
|  1 | War and Peace          | Leo Tolstoy        |
|  2 | The Brothers Karamazov | Fyodor Dostoyevsky |
|  3 | Paradise Lost          | John Milton        |
+----+------------------------+--------------------+

We verify it. All OK.

mysql&gt; INSERT INTO Books(Title, Author) VALUES ('The Insulted and Humiliated',
    -&gt; 'Fyodor Dostoyevsky'), ('Cousin Bette', 'Honore de Balzac');
Query OK, 2 rows affected (0.00 sec)
Records: 2  Duplicates: 0  Warnings: 0

We can insert more than one row into the table with the INSERT statement.
Here we show how. 

We can insert data from a file on the filesystem. First, we dump data from
the Books table in a books.csv file. 

mysql&gt; SELECT * INTO OUTFILE '/tmp/books.csv'
    -&gt; FIELDS TERMINATED BY ','
    -&gt; LINES TERMINATED BY '\n'
    -&gt; FROM Books;

We write data from the Books table into the 
books.csv file. The data will be in a CSV format.

$ cat /tmp/books.csv 
1,War and Peace,Leo Tolstoy
2,The Brothers Karamazov,Fyodor Dostoyevsky
3,Paradise Lost,John Milton
4,The Insulted and Humiliated,Fyodor Dostoyevsky
5,Cousin Bette,Honore de Balzac

We show the contents of the books.csv file. 

mysql&gt; TRUNCATE Books;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; SELECT * FROM Books;
Empty set (0.00 sec)

We delete all data from the table. 

mysql&gt; LOAD DATA INFILE '/tmp/books.csv'    
    -&gt; INTO TABLE Books    
    -&gt; FIELDS TERMINATED BY ','    
    -&gt; LINES TERMINATED BY '\n';

We use the LOAD DATA INFILE syntax to populate the 
Books table from the books.csv file. 

mysql&gt; SELECT * FROM Books;
+----+-----------------------------+--------------------+
| Id | Title                       | Author             |
+----+-----------------------------+--------------------+
|  1 | War and Peace               | Leo Tolstoy        |
|  2 | The Brothers Karamazov      | Fyodor Dostoyevsky |
|  3 | Paradise Lost               | John Milton        |
|  4 | The Insulted and Humiliated | Fyodor Dostoyevsky |
|  5 | Cousin Bette                | Honore de Balzac   |
+----+-----------------------------+--------------------+

All OK.

We can load data from XML files as well. First, we write data from the
Books table into an XML file. 

$ mysql -uroot -p --xml -e 'SELECT * FROM mydb.Books' &gt; books.xml

The mysql monitor has an --xml option, which 
enables us to dump data in XML format. The -e option executes 
a statement and quits the monitor. 

$ cat books.xml 
&lt;?xml version="1.0"?&gt;

&lt;resultset statement="SELECT * FROM mydb.Books
" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
  &lt;row&gt;
    &lt;field name="Id"&gt;1&lt;/field&gt;
    &lt;field name="Title"&gt;War and Peace&lt;/field&gt;
    &lt;field name="Author"&gt;Leo Tolstoy&lt;/field&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;field name="Id"&gt;2&lt;/field&gt;
    &lt;field name="Title"&gt;The Brothers Karamazov&lt;/field&gt;
    &lt;field name="Author"&gt;Fyodor Dostoyevsky&lt;/field&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;field name="Id"&gt;3&lt;/field&gt;
    &lt;field name="Title"&gt;Paradise Lost&lt;/field&gt;
    &lt;field name="Author"&gt;John Milton&lt;/field&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;field name="Id"&gt;4&lt;/field&gt;
    &lt;field name="Title"&gt;The Insulted and Humiliated&lt;/field&gt;
    &lt;field name="Author"&gt;Fyodor Dostoyevsky&lt;/field&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;field name="Id"&gt;5&lt;/field&gt;
    &lt;field name="Title"&gt;Cousin Bette&lt;/field&gt;
    &lt;field name="Author"&gt;Honore de Balzac&lt;/field&gt;
  &lt;/row&gt;
&lt;/resultset&gt;

This is our XML file. 

mysql&gt; LOAD XML INFILE '/home/vronskij/programming/mysql/books.xml' INTO TABLE Books;

We load data from the XML file. Note that LOAD XML statement
is available for MySQL 5.5 and newer.

## Deleting data

In MySQL, we can delete data using the DELETE and TRUNCATE 
statements. The TRUNCATE statement is a MySQL extension to the 
SQL specification. First, we are going to delete one row from a table. 
We will use the Books2 table that we have created previously.

mysql&gt; DELETE FROM Books2 WHERE Id=1;

We delete a row with Id=1.

mysql&gt; SELECT * FROM Books2;
+----+------------------------+--------------------+
| Id | Title                  | Author             |
+----+------------------------+--------------------+
|  2 | The Brothers Karamazov | Fyodor Dostoyevsky |
|  3 | Paradise Lost          | John Milton        |
+----+------------------------+--------------------+

We verify the data. 

mysql&gt; DELETE FROM Books2;
mysql&gt; TRUNCATE Books2;

These two SQL statements delete all data in the table.

## Updating data

The UPDATE statement is used to change the value
of columns in selected rows of a table.

mysql&gt; SELECT * FROM Books;
+----+-----------------------------+--------------------+
| Id | Title                       | Author             |
+----+-----------------------------+--------------------+
|  1 | War and Peace               | Leo Tolstoy        |
|  2 | The Brothers Karamazov      | Fyodor Dostoyevsky |
|  3 | Paradise Lost               | John Milton        |
|  4 | The Insulted and Humiliated | Fyodor Dostoyevsky |
|  5 | Cousin Bette                | Honore de Balzac   |
+----+-----------------------------+--------------------+

We recreate the table Books. These are the rows. 

Say we wanted to change 'Leo Tolstoy' to 'Lev Nikolayevich Tolstoy' table.
The following statement shows, how to accomplish this.

mysql&gt; UPDATE Books SET Author='Lev Nikolayevich Tolstoy'
    -&gt; WHERE Id=1;

The SQL statement sets the author column to 'Lev Nikolayevich Tolstoy'
for the column with Id=1.

mysql&gt; SELECT * FROM Books WHERE Id=1;
+----+---------------+--------------------------+
| Id | Title         | Author                   |
+----+---------------+--------------------------+
|  1 | War and Peace | Lev Nikolayevich Tolstoy |
+----+---------------+--------------------------+

The row is correctly updated. 

In this part of the MySQL tutorial, we have inserted, deleted, and updated data in 
database tables. 

[Contents](..) 
[Previous](../expressions/)
[Next](../select/)