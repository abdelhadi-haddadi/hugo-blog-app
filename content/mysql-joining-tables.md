+++
title = "MySQL joining tables"
date = 2025-08-29T20:03:47.586+01:00
draft = false
description = "In this part of the MySQL tutorial we will be joining database tables."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../exportimport/)
[Next](../functions/)

# MySQL joining tables

last modified January 10, 2023 

In this part of the MySQL tutorial, we will join tables in MySQL.

The real power and benefits from relational databases come from joining tables.
The SQL JOIN clause combines records from two or more tables in a 
database. There are basically two types of joins: INNER and OUTER.

In this part of the tutorial, we will work with Customers 
and Reservations tables. 

mysql&gt; SELECT * FROM Customers;
+------------+-------------+
| CustomerId | Name        |
+------------+-------------+
|          1 | Paul Novak  |
|          2 | Terry Neils |
|          3 | Jack Fonda  |
|          4 | Tom Willis  |
+------------+-------------+

These are values from the Customers table.

mysql&gt; SELECT * FROM Reservations;
+----+------------+------------+
| Id | CustomerId | Day        |
+----+------------+------------+
|  1 |          1 | 2009-11-22 |
|  2 |          2 | 2009-11-28 |
|  3 |          2 | 2009-11-29 |
|  4 |          1 | 2009-11-29 |
|  5 |          3 | 2009-12-02 |
+----+------------+------------+

These are values from the Reservations tables.

The Customers and Reservations have both a 
CustomerId column. It is the relationship column. If it has the 
same name in both tables, we can use USING (CustomerId) syntax. 
If the name differs, say we had CustomerId and CId, 
we would use the ON Customers.CustomerId = Reservations.CId syntax.

## MySQL inner joins

The inner join is the most common type of joins. It is the default 
join also. The inner join selects only those records from database tables 
that have matching values. We have three types of *INNER JOINS*:
INNER JOIN, NATURAL INNER JOIN, and 
CROSS INNER JOIN. The INNER keyword can be omitted.

### INNER JOIN

mysql&gt; SELECT Name, Day FROM Customers AS C JOIN Reservations 
    -&gt; AS R ON C.CustomerId=R.CustomerId;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Paul Novak  | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
+-------------+------------+
5 rows in set (0.00 sec)

In this SELECT statement, we have selected all customers 
that have made some reservations. Paul Novak and Terry Neils made two 
reservations. Jack Fonda has made one. Tom Willis is missing, he has 
not yet made any reservations. Note that we have omitted the 
INNER keyword.

The statement is equivalent to the following one:

mysql&gt; SELECT Name, Day FROM Customers, Reservations
    -&gt; WHERE Customers.CustomerId=Reservations.CustomerId;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Paul Novak  | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
+-------------+------------+

We get the same data.

### CROSS INNER JOIN

The CROSS INNER JOIN combines all records
from one table with all records from another table. This type of join
has little practical value. It is also called a Cartesian product of records.

mysql&gt; SELECT Name, Day FROM Customers CROSS JOIN Reservations;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Paul Novak  | 2009-11-28 |
| Paul Novak  | 2009-11-29 |
| Paul Novak  | 2009-11-29 |
| Paul Novak  | 2009-12-02 |
| Terry Neils | 2009-11-22 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Terry Neils | 2009-11-29 |
| Terry Neils | 2009-12-02 |
| Jack Fonda  | 2009-11-22 |
...

The same result can be achieved with the following SQL statement:

SELECT Name, Day FROM Customers, Reservations;

## MySQL outer joins

An *outer join* does not require each record in the two joined 
tables to have a matching record. There are three types of outer joins.
Left outer joins, right outer joins, and full outer joins.
MySQL does not support full outer joins at the time of the tutorial
creation.

As we have already stated above, the inner joins are the most common ones.
Outer joins may be useful to find out orphaned records. Is a person a 
customer if he has not made any reservations? Is a reservation valid
if we cannot match it with a customer?

### LEFT OUTER JOIN

The LEFT OUTER JOIN returns all values from the left table, even
if there is no match with the right table. In such rows, there will be 
NULL values. In other words, left outer join returns all the values 
from the left table, plus matched values from the right table. Note that the 
OUTER keyword can be omitted. 

mysql&gt; SELECT Name, Day FROM Customers LEFT JOIN Reservations
    -&gt; ON Customers.CustomerId=Reservations.CustomerId;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Paul Novak  | 2009-11-29 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
| Tom Willis  | NULL       |
+-------------+------------+

Here we have all customers with their reservations, plus a customer, 
who has no reservation. There is NULL value in his row. 

We can use the USING keyword to achieve the same result.
This is because the relationship column has the same name in both tables.
The SQL statement will be less verbose.

mysql&gt; SELECT Name, Day FROM Customers LEFT JOIN Reservations
    -&gt; USING (CustomerId);
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Paul Novak  | 2009-11-29 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
| Tom Willis  | NULL       |
+-------------+------------+

Same result, with shorter SQL statement.

### RIGHT OUTER JOIN

RIGHT OUTER JOIN and RIGHT JOIN are the same.
It gives all the records match in both tables and all possibilities 
of the right table. Orphaned right records show NULL on the left.

mysql&gt; SELECT Name, Day FROM Customers RIGHT JOIN
    -&gt; Reservations USING (CustomerId);
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Paul Novak  | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
+-------------+------------+

This is an output for the right join of two tables. All the
records of the table on the right side (Reservations) have a
matching record on the left side (Customers). 

## MySQL natural joins

A natural join links all columns in two tables with the same name.
In our ustomers and Reservations tables, 
we have a column named CustomerId.

### NATURAL INNER JOIN

The NATURAL INNER JOIN automatically uses all the matching 
column names for the join. In our tables, we have a column named 
CustomerId in both tables.

mysql&gt; SELECT Name, Day FROM Customers NATURAL JOIN Reservations;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Paul Novak  | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
+-------------+------------+

We get the same data. The SQL statement is less verbose. 

### NATURAL LEFT OUTER JOIN

The NATURAL LEFT OUTER JOIN gives all the matching records
from the tables and all other records on the left table. It automatically 
uses all the matching column names for the join.

mysql&gt; SELECT Name, Day FROM Customers 
    -&gt; NATURAL LEFT JOIN Reservations;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Paul Novak  | 2009-11-29 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
| Tom Willis  | NULL       |
+-------------+------------+

Same result, but with fewer key strokes.

### NATURAL RIGHT OUTER JOIN

The NATURAL RIGHT OUTER JOIN gives all the matching records
from the tables and all other records on the right table. It automatically uses 
matching column names for the join.

mysql&gt; SELECT Name, Day FROM Customers
    -&gt; NATURAL RIGHT JOIN Reservations;
+-------------+------------+
| Name        | Day        |
+-------------+------------+
| Paul Novak  | 2009-11-22 |
| Terry Neils | 2009-11-28 |
| Terry Neils | 2009-11-29 |
| Paul Novak  | 2009-11-29 |
| Jack Fonda  | 2009-12-02 |
+-------------+------------+

## Quick recap

Next we will create two small tables to recap what we have learned here.

mysql&gt; CREATE TABLE AA(A INTEGER);
mysql&gt; CREATE TABLE BB(B INTEGER);
mysql&gt; INSERT INTO AA VALUES(1);
mysql&gt; INSERT INTO AA VALUES(2);
mysql&gt; INSERT INTO AA VALUES(3);
mysql&gt; INSERT INTO AA VALUES(4);
mysql&gt; INSERT INTO BB VALUES(3);
mysql&gt; INSERT INTO BB VALUES(4);
mysql&gt; INSERT INTO BB VALUES(5);
mysql&gt; INSERT INTO BB VALUES(6);

mysql&gt; SELECT * FROM AA;
+------+
| A    |
+------+
|    1 |
|    2 |
|    3 |
|    4 |
+------+

mysql&gt; SELECT * FROM BB;
+------+
| B    |
+------+
|    3 |
|    4 |
|    5 |
|    6 |
+------+

We have created and populated two tables with numerical data. 
Table AA has two unique numbers (1, 2), table BB 
has also two unique numbers (5, 6). They share two numbers (3, 4).

### INNER JOIN

mysql&gt; SELECT * FROM AA JOIN BB ON A = B;
+------+------+
| A    | B    |
+------+------+
|    3 |    3 |
|    4 |    4 |
+------+------+

This is a INNER JOIN on both tables. We 
get only the matching values from both tables.

### LEFT OUTER JOIN

mysql&gt; SELECT * FROM AA LEFT JOIN BB ON A = B;
+------+------+
| A    | B    |
+------+------+
|    1 | NULL |
|    2 | NULL |
|    3 |    3 |
|    4 |    4 |
+------+------+

This is a LEFT OUTER JOIN on both tables. We 
get the matching values plus the values from the left table 
that do not have a mathing record.

### RIGHT OUTER JOIN

mysql&gt; SELECT * FROM AA RIGHT JOIN BB ON A = B;
+------+------+
| A    | B    |
+------+------+
|    3 |    3 |
|    4 |    4 |
| NULL |    5 |
| NULL |    6 |
+------+------+

This is a RIGHT OUTER JOIN on both tables. We 
get the matching values plus the values from the right table 
that do not have a matching record.

In this part of the MySQL tutorial, we were joining tables.

[Contents](..) 
[Previous](../exportimport/)
[Next](../functions/)