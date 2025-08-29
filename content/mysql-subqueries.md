+++
title = "MySQL subqueries"
date = 2025-08-29T20:03:48.707+01:00
draft = false
description = "This part of the MySQL tutorial covers subqueries."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../select/)
[Next](../constraints/)

# MySQL subqueries

last modified January 10, 2023 

In this part of the MySQL tutorial, we will mention subqueries in MySQL. 

A *subquery* is a query in a query. It is also called an inner query or 
a nested query. A subquery can be used anywhere an expression is allowed. 
It is a query expression enclosed in parentheses. Subqueries can be used
with SELECT, INSERT, UPDATE, or 
DELETE statements.

There is more than one way to execute an SQL task. Many subqueries can be 
replaced by SQL joins. SQL joins are usually faster. 

In this chapter, we will be using the following tables:

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

The data from the Cars table.

mysql&gt; SELECT * FROM Customers; SELECT * FROM Reservations;
+------------+-------------+
| CustomerId | Name        |
+------------+-------------+
|          1 | Paul Novak  |
|          2 | Terry Neils |
|          3 | Jack Fonda  |
|          4 | Tom Willis  |
+------------+-------------+
4 rows in set (0.00 sec)

+----+------------+------------+
| Id | CustomerId | Day        |
+----+------------+------------+
|  1 |          1 | 2009-11-22 |
|  2 |          2 | 2009-11-28 |
|  3 |          2 | 2009-11-29 |
|  4 |          1 | 2009-11-29 |
|  5 |          3 | 2009-12-02 |
+----+------------+------------+
5 rows in set (0.00 sec)

We recapitulate what we have in the Customers and 
Reservations tables. Subqueries are often performed 
on tables, which have some relationship. 

### Subquery with the INSERT statement

We want to create a copy of the Cars table. Into another 
table called Cars2. We will create a subquery for this.

mysql&gt; CREATE TABLE Cars2(Id INT NOT NULL PRIMARY KEY, 
    -&gt; Name VARCHAR(50) NOT NULL, Cost INT NOT NULL);

We create a new Cars2 table with the same columns and 
datatypes as the Cars table. To find out how a table was 
created, we can use the SHOW CREATE TABLE statement. 

mysql&gt; INSERT INTO Cars2 SELECT * FROM Cars;

This is a simple subquery. We insert all rows from the 
Cars table into the Cars2 table. 

mysql&gt; SELECT * FROM Cars2;
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

The data was copied to a new Cars2 table. 

### Scalar subqueries

A scalar subquery returns a single value. 

mysql&gt; SELECT Name FROM Customers WHERE 
    -&gt; CustomerId=(SELECT CustomerId FROM Reservations WHERE Id=5);
+------------+
| Name       |
+------------+
| Jack Fonda |
+------------+

The query enclosed in parentheses is the subquery. It returns one 
single scalar value. The returned value is then used in the outer query. 
In this scalar subquery, we return the name of the customer from the 
Customers table, whose reservation has Id equal to 5 in the 
Reservations table. 

### Table subqueries

A table subquery returns a result table of zero or more rows. 

mysql&gt; SELECT Name FROM Customers WHERE CustomerId IN    
    -&gt; (SELECT DISTINCT CustomerId FROM Reservations);
+-------------+
| Name        |
+-------------+
| Paul Novak  |
| Terry Neils |
| Jack Fonda  |
+-------------+

The above query returns the names of the customers, who made some
reservations. The inner query returns customer Ids from the 
Reservations table. We use the IN predicate 
to select those names of customers, who have their CustomerId 
returned from the inner select query. 

mysql&gt; SELECT DISTINCT Name FROM Customers JOIN Reservations
    -&gt; ON Customers.CustomerId=Reservations.CustomerId;
+-------------+
| Name        |
+-------------+
| Paul Novak  |
| Terry Neils |
| Jack Fonda  |
+-------------+

The previous subquery can be rewritten using SQL join. 

### Correlated subqueries

A correlated subquery is a subquery that uses values from the outer query in 
its WHERE clause. The subquery is evaluated once for each row 
processed by the outer query.

mysql&gt; SELECT Name FROM Cars WHERE Cost &lt;
    -&gt; (SELECT AVG(Cost) FROM Cars);
+------------+
| Name       |
+------------+
| Audi       |
| Mercedes   |
| Skoda      |
| Volvo      |
| Citroen    |
| Hummer     |
| Volkswagen |
+------------+

In the above correlated subquery, we return all cars that cost below the
average price of all cars in the table. 

### Subqueries with EXISTS, NOT EXISTS

If a subquery returns any values, then the predicate EXISTS returns
TRUE, and NOT EXISTS FALSE. 

mysql&gt; SELECT Name FROM Customers WHERE EXISTS
    -&gt; (SELECT * FROM Reservations WHERE
    -&gt; Customers.CustomerId=Reservations.CustomerId);
+-------------+
| Name        |
+-------------+
| Paul Novak  |
| Terry Neils |
| Jack Fonda  |
+-------------+

In the above SQL statement we select all customers' names, which 
have an entry in the Reservations table. 

mysql&gt; SELECT Name FROM Customers WHERE NOT EXISTS    
    -&gt; (SELECT * FROM Reservations WHERE 
    -&gt; Customers.CustomerId=Reservations.CustomerId);
+------------+
| Name       |
+------------+
| Tom Willis |
+------------+

In this query, we return all customers that do not have an 
entry in the Reservations table. Both SQL queries are
correlated queries. 

This part of the MySQL tutorial was dedicated to MySQL subqueries.

[Contents](..) 
[Previous](../select/)
[Next](../constraints/)