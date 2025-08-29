+++
title = "SQLite join tables"
date = 2025-08-29T19:52:54.742+01:00
draft = false
description = "In this part of the SQLite tutorial, we will be joining tables. We will join tables using inner and outer joins."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../constraints/)
[Next](../sqlitefunctions/)

# SQLite join tables

last modified July 6, 2020 

In this part of the SQLite tutorial, we will join tables in SQLite.

The real power and benefits from relational databases come from joining tables.
The SQL JOIN clause combines records from two or more tables in a database.
There are basically two types of joins: INNER and OUTER.

In this part of the tutorial, we will work with Customers and 
Reservations tables. 

sqlite&gt; SELECT * FROM Customers;
CustomerId  Name       
----------  -----------
1           Paul Novak 
2           Terry Neils
3           Jack Fonda 
4           Tom Willis 

These are values from the Customers table.

sqlite&gt; SELECT * FROM Reservations;
Id  CustomerId  Day       
--  ----------  ----------
1   1           2009-22-11
2   2           2009-28-11
3   2           2009-29-11
4   1           2009-29-11
5   3           2009-02-12

These are values from the Reservations table.

## SQLite inner joins

The inner join is the most common type of join. It is the default join also. 
The inner join selects only those records from database tables that have matching 
values. We have three types of INNER JOINS: INNER JOIN, 
NATURAL INNER JOIN and CROSS INNER JOIN. 
The INNER keyword can be omitted.

### INNER JOIN

sqlite&gt; SELECT Name, Day FROM Customers AS C JOIN Reservations
   ...&gt; AS R ON C.CustomerId=R.CustomerId;
Name         Day        
-----------  -----------
Paul Novak   2009-22-11 
Terry Neils  2009-28-11 
Terry Neils  2009-29-11 
Paul Novak   2009-29-11 
Jack Fonda   2009-02-12 

In this SELECT statement, we have selected all customers that 
have made some reservations. Note that we have omitted the INNER keyword.

The statement is equivalent to the following one:

sqlite&gt; SELECT Name, Day FROM Customers, Reservations
   ...&gt; WHERE Customers.CustomerId = Reservations.CustomerId;
Name        Day        
----------  -----------
Paul Novak  2009-22-11 
Terry Neil  2009-28-11 
Terry Neil  2009-29-11 
Paul Novak  2009-29-11 
Jack Fonda  2009-02-12

We get the same data.

### NATURAL INNER JOIN

The NATURAL INNER JOIN automatically uses all the matching 
column names for the join. In our tables, we have a column named 
CustomerId in both tables.

sqlite&gt; SELECT Name, Day FROM Customers NATURAL JOIN Reservations;
Name         Day       
-----------  ----------
Paul Novak   2009-22-11
Terry Neils  2009-28-11
Terry Neils  2009-29-11
Paul Novak   2009-29-11
Jack Fonda   2009-02-12

We get the same data. The SQL statement is less verbose. 

### CROSS INNER JOIN

The CROSS INNER JOIN combines all records
from one table with all records from another table. This type of join
has little practical value. It is also called a cartesian product of records.

sqlite&gt; SELECT Name, Day FROM Customers CROSS JOIN Reservations;
Name         Day       
-----------  ----------
Paul Novak   2009-22-11
Paul Novak   2009-28-11
Paul Novak   2009-29-11
Paul Novak   2009-29-11
Paul Novak   2009-02-12
Terry Neils  2009-22-11
Terry Neils  2009-28-11
Terry Neils  2009-29-11
Terry Neils  2009-29-11
Terry Neils  2009-02-12
...

The same result can be achieved with the following SQL statement:

sqlite&gt; SELECT Name, Day FROM Customers, Reservations;

## SQLite outer joins

An *outer join* does not require each record in the two joined tables to 
have a matching record. There are three types of outer joins: left outer joins, 
right outer joins, and full outer joins. SQLite only supports left outer joins. 

### LEFT OUTER JOIN

The LEFT OUTER JOIN returns all values from the left table, even
if there is no match with the right table. In such rows there will be 
NULL values. In other words, left outer join returns all the values 
from the left table, plus matched values from the right table. Note that the 
OUTER keyword can be omitted. 

sqlite&gt; SELECT Name, Day FROM Customers LEFT JOIN Reservations
   ...&gt; ON Customers.CustomerId = Reservations.CustomerId;
Name         Day        
-----------  -----------
Paul Novak   2009-22-11 
Paul Novak   2009-29-11 
Terry Neils  2009-28-11 
Terry Neils  2009-29-11 
Jack Fonda   2009-02-12 
Tom Willis   NULL  

Here we have all customers with their reservations and a customer who has no
reservation. There is a NULL value in his row. 

We can use the USING keyword to achieve the same result. The SQL 
statement will be less verbose.

sqlite&gt; SELECT Name, Day FROM Customers LEFT JOIN Reservations
   ...&gt; USING (CustomerId);
Name         Day        
-----------  -----------
Paul Novak   2009-22-11 
Paul Novak   2009-29-11 
Terry Neils  2009-28-11 
Terry Neils  2009-29-11 
Jack Fonda   2009-02-12 
Tom Willis   NULL

We have the same result, with a shorter SQL statement.

### NATURAL LEFT OUTER JOIN

The NATURAL LEFT OUTER JOIN automatically uses all the 
matching column names for the join.

sqlite&gt; SELECT Name, Day FROM Customers NATURAL LEFT OUTER JOIN Reservations;
Name         Day       
-----------  ----------
Paul Novak   2009-22-11
Paul Novak   2009-29-11
Terry Neils  2009-28-11
Terry Neils  2009-29-11
Jack Fonda   2009-02-12
Tom Willis   NULL  

We have the same output but we have used fewer key strokes.

In this part of the SQLite tutorial, we were joining tables.

[Contents](..)
[Previous](../constraints/)
[Next](../sqlitefunctions/)