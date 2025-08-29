+++
title = "MySQL SELECT statement"
date = 2025-08-29T20:03:48.704+01:00
draft = false
description = "MySQL SELECT shows how to retrie data in MySQL with SELECT statement."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../datamanipulation/)
[Next](../subqueries/)

# MySQL SELECT statement

last modified January 10, 2023 

This part of the MySQL tutorial will be covering the SELECT statement 
understood by the MySQL in detail.

## Retrieving data

The following SQL statement is one of the most common ones. It is also one 
of the most expensive ones. 

mysql&gt; SELECT * FROM Cars;
+----+------------+--------+
| Id | Name       | Cost   |
+----+------------+--------+
|  1 | Audi       |  52642 |
|  2 | Mercedes   |  57127 |
|  3 | Skoda      |   9000 |
|  4 | Volvo      |  29000 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+
8 rows in set (0.00 sec)

Here we retrieve all data from the Cars table. 

### Selecting specific columns

We can use the SELECT statement to retrieve specific columns. 
The column names follow the SELECT word. 

mysql&gt; SELECT Name, Cost FROM Cars;
+------------+--------+
| Name       | Cost   |
+------------+--------+
| Audi       |  52642 |
| Mercedes   |  57127 |
| Skoda      |   9000 |
| Volvo      |  29000 |
| Bentley    | 350000 |
| Citroen    |  21000 |
| Hummer     |  41400 |
| Volkswagen |  21600 |
+------------+--------+
8 rows in set (0.00 sec) 

We retrieve the Name and the Cost columns. The column 
names are separated by commas. 

### Renaming column names

We can rename the column names of the returned result set. For this, we use the
AS clause. 

mysql&gt; SELECT Name, Cost AS Price FROM Cars;
+------------+--------+
| Name       | Price  |
+------------+--------+
| Audi       |  52642 |
| Mercedes   |  57127 |
| Skoda      |   9000 |
| Volvo      |  29000 |
| Bentley    | 350000 |
| Citroen    |  21000 |
| Hummer     |  41400 |
| Volkswagen |  21600 |
+------------+--------+
8 rows in set (0.00 sec)

Say we wanted to name the column price rather than cost. With the above 
SQL statement, we have accomplished this. 

## Limiting data output

As we mentioned above, retrieving all data is expensive when dealing with 
large amounts of data. We can use the LIMIT clause to limit the 
data amount returned by the statement. 

mysql&gt; SELECT * FROM Cars LIMIT 4;
+----+----------+-------+
| Id | Name     | Cost  |
+----+----------+-------+
|  1 | Audi     | 52642 |
|  2 | Mercedes | 57127 |
|  3 | Skoda    |  9000 |
|  4 | Volvo    | 29000 |
+----+----------+-------+
4 rows in set (0.00 sec) 

The LIMIT clause limits the number of rows returned to 4. 

With two arguments, the LIMIT returns rows beginning from an
offset value.

mysql&gt; SELECT * FROM Cars LIMIT 2, 4;
+----+---------+--------+
| Id | Name    | Cost   |
+----+---------+--------+
|  3 | Skoda   |   9000 |
|  4 | Volvo   |  29000 |
|  5 | Bentley | 350000 |
|  6 | Citroen |  21000 |
+----+---------+--------+
4 rows in set (0.00 sec)   

The first value is the offset and the second is the number of rows to be
returned. Here we select all data from max four rows, and we begin with 
the third row. 

mysql&gt; SELECT * FROM Cars LIMIT 4 OFFSET 2;
+----+---------+--------+
| Id | Name    | Cost   |
+----+---------+--------+
|  3 | Skoda   |   9000 |
|  4 | Volvo   |  29000 |
|  5 | Bentley | 350000 |
|  6 | Citroen |  21000 |
+----+---------+--------+
4 rows in set (0.00 sec)

To be compatible with PostgreSQL database, MySQL has also the OFFSET 
keyword. The above code is equivalent to the previous example. 

## Ordering data

We use the ORDER BY clause to sort the returned data set. 
The ORDER BY clause is followed by the column on which 
we do the sorting.  The ASC keyword sorts the data
in ascending order, the DESC in descending order. 

mysql&gt; SELECT Name, Cost FROM Cars ORDER BY Cost DESC;
+------------+--------+
| Name       | Cost   |
+------------+--------+
| Bentley    | 350000 |
| Mercedes   |  57127 |
| Audi       |  52642 |
| Hummer     |  41400 |
| Volvo      |  29000 |
| Volkswagen |  21600 |
| Citroen    |  21000 |
| Skoda      |   9000 |
+------------+--------+
8 rows in set (0.00 sec)

In the above SQL statement, we select name, cost columns from the 
Cars table and sort it by the cost of the cars in descending 
order. So the most expensive cars come first. 

## Selecting specific rows with the WHERE clause

In the following examples, we are going to use the 
Orders table. 

mysql&gt; SELECT * FROM Orders;
+----+------------+------------+
| Id | OrderPrice | Customer   |
+----+------------+------------+
|  1 |       1200 | Williamson |
|  2 |        200 | Robertson  |
|  3 |         40 | Robertson  |
|  4 |       1640 | Smith      |
|  5 |        100 | Robertson  |
|  6 |         50 | Williamson |
|  7 |        150 | Smith      |
|  8 |        250 | Smith      |
|  9 |        840 | Brown      |
| 10 |        440 | Black      |
| 11 |         20 | Brown      |
+----+------------+------------+
11 rows in set (0.00 sec)

Here we see all the data from the Orders table. 

Next, we want to select a specific row.

mysql&gt; SELECT * FROM Orders WHERE Id=6;
+----+------------+------------+
| Id | OrderPrice | Customer   |
+----+------------+------------+
|  6 |         50 | Williamson |
+----+------------+------------+
1 row in set (0.00 sec)

The above SQL statement selects a row which has Id 6.

mysql&gt; SELECT * FROM Orders WHERE Customer="Smith";
+----+------------+----------+
| Id | OrderPrice | Customer |
+----+------------+----------+
|  4 |       1640 | Smith    |
|  7 |        150 | Smith    |
|  8 |        250 | Smith    |
+----+------------+----------+
3 rows in set (0.00 sec)

The above SQL statement selects all orders created by Smith customer. 

We can use the LIKE keyword to look for a specific pattern 
in the data.

mysql&gt; SELECT * FROM Orders WHERE Customer LIKE "B%";
+----+------------+----------+
| Id | OrderPrice | Customer |
+----+------------+----------+
|  9 |        840 | Brown    |
| 10 |        440 | Black    |
| 11 |         20 | Brown    |
+----+------------+----------+
3 rows in set (0.00 sec)

This SQL statement selects all orders from customers whose names begin
with B character. 

## Removing duplicate items

The DISTINCT keyword is used to select only unique items
from the result set. 

mysql&gt; SELECT Customer FROM Orders WHERE Customer LIKE 'B%';
+----------+
| Customer |
+----------+
| Brown    |
| Black    |
| Brown    |
+----------+
3 rows in set (0.00 sec)

This time we have selected customers whose names begin with B character.
We can see that Brown is mentioned twice. To remove duplicates, we use the
DISTINCT keyword.

mysql&gt; SELECT DISTINCT Customer FROM Orders WHERE Customer LIKE 'B%';
+----------+
| Customer |
+----------+
| Brown    |
| Black    |
+----------+
2 rows in set (0.00 sec)

This is the correct solution. 

Say we wanted to figure out, how many orders were placed by Brown customer.
We would utilize the COUNT() function.

mysql&gt; SELECT COUNT(Customer) AS "Orders by Brown" FROM Orders WHERE Customer="Brown";
+-----------------+
| Orders by Brown |
+-----------------+
|               2 |
+-----------------+
1 row in set (0.00 sec)

The customer has placed two orders. 

## Grouping data

The GROUP BY clause is used to combine database 
records with identical values into a single record. It is often used 
with the aggregation functions.

Say we wanted to find out, the sum of each customers' orders. 

mysql&gt; SELECT SUM(OrderPrice) AS Total, Customer FROM Orders GROUP BY Customer;
+-------+------------+
| Total | Customer   |
+-------+------------+
|   440 | Black      |
|   860 | Brown      |
|   340 | Robertson  |
|  2040 | Smith      |
|  1250 | Williamson |
+-------+------------+
5 rows in set (0.00 sec)

 

The SUM() keyword returns the total sum of 
a numeric column. The GROUP BY clause divides the 
total sum among the customers. So we can see that Black has ordered items for
440 or Smith for 2040.

We cannot use the WHERE clause when aggregate functions were
used. We use the HAVING clause instead.

mysql&gt; SELECT SUM(OrderPrice) AS Total, Customer FROM Orders
    -&gt; GROUP BY Customer HAVING SUM(OrderPrice)&gt;1000;
+-------+------------+
| Total | Customer   |
+-------+------------+
|  2040 | Smith      |
|  1250 | Williamson |
+-------+------------+
2 rows in set (0.00 sec)

 

The above SQL statement selects customers whose total orders where 
greater than 1000 units. 

## Selecting data into a file

The SELECT statement can be used to write data from tables
to a file. 

mysql&gt; SELECT * INTO OUTFILE '/tmp/cars.txt'
    -&gt; FIELDS TERMINATED BY ','
    -&gt; LINES TERMINATED BY '\n'
    -&gt; FROM Cars;
Query OK, 8 rows affected (0.00 sec)

We write data from the Cars table into a cars.txt 
file. The output file is a CSV (Comma Separated Values) file.
Note that this operation is error prone, we can easily
run into permission denied errors. 

$ cat /tmp/cars.txt 
1,Audi,52642
2,Mercedes,57127
3,Skoda,9000
4,Volvo,29000
5,Bentley,350000
6,Citroen,21000
7,Hummer,41400
8,Volkswagen,21600

We can do the opposite operation; load the data from the
file into the table.

mysql&gt; DELETE FROM Cars;
Query OK, 8 rows affected (0.00 sec)

mysql&gt; SELECT * FROM Cars;
Empty set (0.00 sec)

We delete all the rows from the Cars table.

mysql&gt; LOAD DATA INFILE '/tmp/cars.txt' 
    -&gt; INTO TABLE Cars
    -&gt; FIELDS TERMINATED BY ','
    -&gt; LINES TERMINATED BY '\n';
Query OK, 8 rows affected (0.00 sec)
Records: 8  Deleted: 0  Skipped: 0  Warnings: 0

mysql&gt; SELECT *  FROM Cars;
+----+------------+--------+
| Id | Name       | Cost   |
+----+------------+--------+
|  1 | Audi       |  52642 |
|  2 | Mercedes   |  57127 |
|  3 | Skoda      |   9000 |
|  4 | Volvo      |  29000 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+
8 rows in set (0.00 sec)

We use the LOAD DATA INFILE statement to load
the data back into the table. We verify that the data was
loaded correctly.

In this part of the MySQL tutorial, we mentioned the SQL 
SELECT statement in more detail. 

[Contents](..) 
[Previous](../datamanipulation/)
[Next](../subqueries/)