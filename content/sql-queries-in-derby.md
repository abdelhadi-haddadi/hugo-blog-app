+++
title = "SQL queries in Derby"
date = 2025-08-29T19:52:39.663+01:00
draft = false
description = "In this chapter of the Apache Derby tutorial, we cover the SQL language understood by Derby."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../ij/)
[Next](../jdbc/)

# SQL queries in Derby

last modified July 6, 2020 

In this chapter we work with the SQL understood by the Derby 
database engine. It is a quick list of the most important SQL 
statements present inDerby.

*SQL (Structured Query Language)* is a database computer language designed 
for managing data in relational database management systems. Derby supports only
a limited set of SQL statements. Some important statements known from other
database systems are missing. Derby implements an SQL-92 core subset, 
as well as some SQL-99 features.

## Dropping tables

The DROP TABLE statement removes a table from the database.

ij&gt; DROP TABLE AUTHORS;
0 rows inserted/updated/deleted
ij&gt; DROP TABLE BOOKS;
0 rows inserted/updated/deleted

Supposing that we have previously created the AUTHORS and BOOKS tables,
we are going to drop them and create again. The DROP TABLE SQL statement drops the 
table from the database. Note that the DROP TABLE IF EXISTS statement 
does not exist in Derby.

## Creating tables

The CREATE TABLE statement creates a new table.

ij&gt; CREATE TABLE AUTHORS(ID BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
&gt; (START WITH 1, INCREMENT BY 1), NAME VARCHAR(25));
0 rows inserted/updated/deleted

We create an AUTHORS with two columns: ID and NAME. 
In the ID column we will place big integers, in the NAME column 
strings with up to 25 characters. 
A PRIMARY KEY uniquely identifies each record in the table. Each author is 
a unique personality. Even if there are authors with the same name, each of them is 
in a separate row in the AUTHORS table. Only one column in a table can 
have this constraint. 

The GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1) creates 
and identity column. Identity column is a column that stores numbers that increment 
by one with each insertion. Identity columns are sometimes called autoincrement columns. 

ij&gt; CREATE TABLE BOOKS(ID BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
&gt; (START WITH 1, INCREMENT BY 1), AUTHOR_ID BIGINT, TITLE VARCHAR(150), 
&gt; FOREIGN KEY(AUTHOR_ID) REFERENCES AUTHORS(ID));
0 rows inserted/updated/deleted

We create a BOOKS table with three columns. The FOREIGN KEY 
specifies that the values in the AUTHOR_ID column must match the values in 
the ID column of the AUTHORS table. Foreign keys provide a way 
to enforce the referential integrity of a database. Each book was written by one or
more authors. So in the BOOKS table for the AUTHOR_ID column we 
can have only values that are present in the AUTHORS table. 

## Inserting rows

The INSERT statement is used to create one or more rows in the database
table.

ij&gt; INSERT INTO AUTHORS(NAME) VALUES('Jack London');
ij&gt; INSERT INTO AUTHORS(NAME) VALUES('Honore de Balzac');
ij&gt; INSERT INTO AUTHORS(NAME) VALUES('Lion Feuchtwanger');
ij&gt; INSERT INTO AUTHORS(NAME) VALUES('Emile Zola');
ij&gt; INSERT INTO AUTHORS(NAME) VALUES('Truman Capote');

We add five rows to the AUTHORS table using the 
INSERT INTO SQL statement.

ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(1, 'Call of the Wild');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(1, 'Martin Eden');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(2, 'Old Goriot');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(2, 'Cousin Bette');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(3, 'Jew Suess');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(4, 'Nana');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(4, 'The Belly of Paris');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(5, 'In Cold blood');
ij&gt; INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(5, 'Breakfast at Tiffany');

We insert eight rows into the BOOKS table.

ij&gt; SELECT NAME, TITLE FROM AUTHORS, BOOKS
&gt; WHERE AUTHORS.ID = BOOKS.AUTHOR_ID;
NAME                     |TITLE
-------------------------------------------------
Jack London              |Call of the Wild
Jack London              |Martin Eden
Honore de Balzac         |Old Goriot
Honore de Balzac         |Cousin Bette
Lion Feuchtwanger        |Jew Suess
Emile Zola               |Nana
Emile Zola               |The Belly of Paris
Truman Capote            |In Cold blood
Truman Capote            |Breakfast at Tiffany

9 rows selected

The above SQL query joins the two tables. It assigns each book title
to an author.

## Queries

Queries are used to look up data from the database tables. The SELECT
statement is the main statement to perform queries. 

### Limiting data output

Limiting data output is essential since many databases have thousands
even millions of rows. Derby does not support the LIMIT clause known from
other databases. Derby 10.7 introduced FETCH and OFFSET clauses 
that do the same thing. 

ij&gt; SELECT * FROM BOOKS FETCH FIRST 4 ROWS ONLY;
ID         |AUTHOR_ID  |TITLE
-------------------------------------------------
1          |1          |Call of the Wild
2          |1          |Martin Eden
3          |2          |Old Goriot
4          |2          |Cousin Bette

In the first example, we have fetched only the first 4 rows from the 
BOOKS table.

ij&gt; SELECT * FROM BOOKS OFFSET 4 ROWS;
ID         |AUTHOR_ID  |TITLE
-----------------------------------------------
5          |3          |Jew Suess
6          |4          |Nana
7          |4          |The Belly of Paris
8          |5          |In Cold blood
9          |5          |Breakfast at Tiffany

With the OFFSET cluase, we skip the first four rows and display the rest.

ij&gt; SELECT * FROM BOOKS OFFSET 4 ROWS FETCH NEXT 3 ROWS ONLY;
ID         |AUTHOR_ID  |TITLE
-----------------------------------------------------------------
5          |3          |Jew Suess
6          |4          |Nana
7          |4          |The Belly of Paris

3 rows selected

We can select a portion of the rows using the combination of OFFSET 
and FETCH clauses. 

### Selecting specific rows with the WHERE clause

The WHERE clause can be used to filter the results. It provides a 
selection criteria to select only specific rows from the data.

ij&gt; SELECT * FROM CARS WHERE PRICE &gt; 40000;
ID         |NAME                          |PRICE      
------------------------------------------------------
1          |Audi                          |52642      
2          |Mercedes                      |57127      
5          |Bentley                       |350000     
7          |Hummer                        |41400

4 rows selected

With the WHERE clause we only select the cars which have
a price higher than 40000. 

ij&gt; SELECT NAME FROM CARS WHERE NAME LIKE '%en';
NAME                          
------------------------------
Citroen                       
Volkswagen                    

2 rows selected

With a LIKE clause we select specific car names that fit the
search pattern. In our case it is cars that end in 'en' characters.

ij&gt; SELECT * FROM CARS WHERE ID IN (2, 5, 7);
ID         |NAME                          |PRICE      
------------------------------------------------------
2          |Mercedes                      |57127      
5          |Bentley                       |350000     
7          |Hummer                        |41400      

3 rows selected

The IN clause can be used to select rows from a specific range of values.
The above SQL statement returns rows that have IDs equal to 2, 5, and 7. 

ij&gt; SELECT * FROM CARS WHERE PRICE BETWEEN 20000 AND 50000;
ID         |NAME                          |PRICE      
------------------------------------------------------
4          |Volvo                         |29000      
6          |Citroen                       |21000      
7          |Hummer                        |41400      
8          |Volkswagen                    |21600      

4 rows selected

We select cars that cost in the range 20000 and 50000. For this
we use the BETWEEN AND keywords following the 
WHERE clause.

### Ordering data

Ordering data can be done with the ORDER BY clause.

ij&gt; SELECT * FROM CARS ORDER BY PRICE;
ID         |NAME                          |PRICE      
------------------------------------------------------
3          |Skoda                         |9000       
6          |Citroen                       |21000      
8          |Volkswagen                    |21600      
4          |Volvo                         |29000      
7          |Hummer                        |41400      
1          |Audi                          |52642      
2          |Mercedes                      |57127      
5          |Bentley                       |350000     

8 rows selected

We order the cars by price. The default order type is ascending 
order.  

ij&gt; SELECT * FROM CARS ORDER BY PRICE DESC;
ID         |NAME                          |PRICE      
------------------------------------------------------
5          |Bentley                       |350000     
2          |Mercedes                      |57127      
1          |Audi                          |52642      
7          |Hummer                        |41400      
4          |Volvo                         |29000      
8          |Volkswagen                    |21600      
6          |Citroen                       |21000      
3          |Skoda                         |9000  

To order data in descending order, we add the DESC keyword. 

## Derby functions

Derby supports a few useful functions. These built-in functions are 
expressions in which an SQL keyword or special operator executes some operation. 

### Aggregate functions

Aggregate functions evaluate an expression over a set of rows. Whereas the other built-in 
functions operate on a single expression, aggregates operate on a set of values and reduce 
them to a single scalar value. Built-in aggregates can calculate the minimum, maximum, 
sum, count, and average of an expression over a set of values as well as count rows. 

ij&gt; SELECT COUNT(ID) FROM AUTHORS;
1          
-----------
5   

The COUNT is an aggregate function that counts the number of 
rows accessed in an expression. There are five authors in the AUTHORS table.

ij&gt; SELECT MIN(PRICE) AS "PRICE", MAX(PRICE) AS "MAX",
&gt; AVG(PRICE) AS "AVG", SUM(PRICE) AS "SUM" FROM CARS;
PRICE      |MAX        |AVG        |SUM        
-----------------------------------------------
9000       |350000     |72721      |581769      

1 row selected

In the above query we use other four functions: MAX, MIN, 
AVG, and SUM. The AS clause gives a 
label for a column.

### Date and time functions

Date and time functions work with date and time

ij&gt; VALUES CURRENT_DATE;
1
----------
2017-03-15

ij&gt; VALUES CURRENT SCHEMA;
1
--------------------------
USER12  

The VALUES CURRENT_DATE returns the current date.

ij&gt; VALUES CURRENT_TIME;
1       
--------
17:22:49

The VALUES CURRENT_TIME returns the current time.

ij&gt; VALUES CURRENT_TIMESTAMP;
1                            
-----------------------------
2017-03-15 17:29:49.987 

The VALUES CURRENT_TIMESTAMP returns the current timestamp,
i.e., the current date and time as one value.

### String functions

Derby contains functions that work with strings.

ij&gt; VALUES LENGTH('Wonderful day');
1          
-----------
13         

1 row selected

The LENGTH function returns the number of characters
in a string.

ij&gt; VALUES UPPER('derby');
1    
-----
DERBY

1 row selected
ij&gt; VALUES LOWER('Derby');
1    
-----
derby

1 row selected

The UPPER function converts characters to upper case and
LOWER to lower case.

ij&gt; VALUES SUBSTR('blueberries', 5);        
1          
-----------
berries 

The SUBSTR returns the part of a string. The first parameter
is the string and the second is the starting position. The first position's
index is 1. 

ij&gt; VALUES SUBSTR('blueberries', 1, 4);
1   
----
blue

The third parameter is optional; it provides the length of the substring to 
be returned.

### Math functions

Derby contains a few math functions.

ij&gt; VALUES ABS(-4);
1          
-----------
4    

ABS returns the absolute value of a numeric expression.

ij&gt; VALUES CEIL(3.4), CEIL(3.8);
1                       
------------------------
4.0                     
4.0   

The CEIL functions rounds the specified number up.

ij&gt; VALUES FLOOR(3.4), FLOOR(3.8);
1                       
------------------------
3.0                     
3.0   

The FLOOR functions rounds the specified number down.

ij&gt; VALUES COS(0.6), SIN(0.6);
1                       
------------------------
0.8253356149096783      
0.5646424733950354

The COS and SIN are trigonometric cos and sin 
functions.

ij&gt; VALUES RADIANS(180), DEGREES(3.141592653589793);
1                       
------------------------
3.141592653589793       
180.0  

The RADIANS function converts degrees to radians and the 
DEGREES function converts radians to degrees.

ij&gt; VALUES SQRT(16.0);
1                       
------------------------
4.0 

The SQRT function returns the square root 
of a floating point number.

## Updating and deleting data

Now we will concern ourselves with updating and deleting data in
the CARS table. 

ij&gt; UPDATE CARS SET PRICE=58000 WHERE ID=2;
1 row inserted/updated/deleted

The UPDATE statement is used to modify data in a database table.
The PRICE of a Mercedes car is set to 58000.

ij&gt; SELECT * FROM CARS WHERE ID=2;
ID         |NAME                          |PRICE      
------------------------------------------------------
2          |Mercedes                      |58000      

1 row selected

The subsequent SELECT statement confirms the modification of the data.

ij&gt; CREATE TABLE CARS2(ID BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
&gt; (START WITH 1, INCREMENT BY 1), NAME VARCHAR(30), PRICE INT); 

For the next case, we create a new CARS2 table. 

ij&gt; INSERT INTO CARS2(NAME, PRICE) SELECT NAME, PRICE FROM CARS;
8 rows inserted/updated/deleted

We insert all the rows from the CARS table into the 
CARS2 table, thus copying all data. 

ij&gt; SELECT * FROM CARS2;
ID         |NAME                          |PRICE      
------------------------------------------------------
1          |Audi                          |52642      
2          |Mercedes                      |58000      
3          |Skoda                         |9000       
4          |Volvo                         |29000      
5          |Bentley                       |350000     
6          |Citroen                       |21000      
7          |Hummer                        |41400      
8          |Volkswagen                    |21600      

8 rows selected

We check the CARS2 table and see that all data was copying OK. 

ij&gt; DELETE FROM CARS2 WHERE ID=8;
1 row inserted/updated/deleted

We used the DELETE FROM statement to delete a rown in the table.

ij&gt; DELETE FROM CARS2;
7 rows inserted/updated/deleted

The DELETE FROM statement without the WHERE clause 
deletes all rows in the table. 

ij&gt; DROP TABLE CARS2;
0 rows inserted/updated/deleted

The DROP TABLE statement deletes the table completly 
from the database.

## RENAME statements

The RENAME statement belongs to the data definition 
language of the SQL. 

ij&gt; RENAME TABLE CARS TO MYCARS;

The RENAME TABLE statement allows us to rename an existing table. We
rename a FRIENDS table to MYFRIENDS. 

ij&gt; RENAME COLUMN MYCARS.ID TO CID;

The RENAME COLUMN statement renames a particular table column.

In the chapter, we have worked with the basics of the SQL language in Derby.

[Contents](..)
[Previous](../ij/)
[Next](../jdbc/)