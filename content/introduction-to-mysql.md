+++
title = "Introduction to MySQL"
date = 2025-08-29T20:03:46.449+01:00
draft = false
description = "This is an introductory chapter of the MySQL database. We introduce the MySQL database system, give some common database definitions, and show the tables used in this tutorial."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../installation/)

# Introduction to MySQL

last modified January 10, 2023 

This is MySQL tutorial. It covers the MySQL database, various mysql 
command line tools and the SQL language covered by the database 
engine. It is an introductory tutorial for the beginners. 

## MySQL database

MySQL is a leading open source database management system. It is a multi-user, 
multithreaded database management system. MySQL is especially popular on the web. 
It is one of the parts of the very popular LAMP platform. Linux, Apache, MySQL and
PHP. MySQL database is available on most important OS platforms. It runs on BSD Unix, 
each day. MySQL comes in two versions: MySQL server system and MySQL embedded system.
The MySQL server software and the client libraries are dual-licensed: GPL version 2 and proprietary
license.

The development of MySQL began in 1994 by a Swedish company MySQL AB. 
Sun Microsystems acquired MySQL AB in 2008. Sun was bought by Oracle
in 2010. 

MySQL, PostgreSQL, Firebird, SQLite, Derby, and HSQLDB are the most well known
open source database systems. 

MySQL is developed in C/C++. Except for C/C++, APIs exist for PHP, Python, Java,
C#, Eiffel, Ruby, Tcl or Perl. 

## MariaDB

MariaDB is a community-developed fork of MySQL, intended to remain free under the GNU GPL. 
It is notable for being led by the original developers of MySQL, who forked it due to 
concerns over its acquisition by Oracle. MariaDB intends to maintain high compatibility 
with MySQL, ensuring a "drop-in" replacement capability with library binary equivalency 
and exact matching with MySQL APIs and commands.

## Definitions

A *relational database* is a collection of data organised in tables. There 
are relations among the tables. The tables are formally described. They consist of 
rows and columns. *SQL* (Structured Query Language)  is a database computer 
language designed for managing data in relational database management systems.
A *table* is a set of values that is organised using a model of vertical 
columns and horizontal rows. The columns are identified by their names. 
A *schema* of a database system is its structure described in a formal 
language. It defines the tables, the fields, relationships, views, indexes, 
procedures, functions, queues, triggers, and other elements.

A database *row* represents a single, implicitly structured data item 
in a table. It is also called a tuple or a record. A *column* is a set of 
data values of a particular simple type, one for each row of the table.
The columns provide the structure according to which the rows are composed.
A *field* is a single item that exists at the intersection between one row 
and one column. A * primary key* uniquely identifies each record in the table. 
A *foreign key* is a referential constraint between two tables. The foreign 
key identifies a column or a set of columns in one (referencing) table that refers 
to a column or set of columns in another (referenced) table.

A *trigger* is a procedural code that is automatically executed in response 
to certain events on a particular table in a database. A *view* is a specific 
look on data in from one or more tables. It can arrange data in some specific order, 
highlight or hide some data. A view consists of a stored query accessible as a virtual 
table composed of the result set of a query. Unlike ordinary tables a view does not 
form part of the physical schema. It is a dynamic, virtual table computed or collated 
from data in the database. 

A *transaction* is an atomic unit of database operations against the data in one 
or more databases. The effects of all the SQL statements in a transaction can be either 
all committed to the database or all rolled back. 

An SQL *result set* is a set of rows from a database, returned by the 
SELECT statement. It also contains meta-information about the query such as 
the column names, and the types and sizes of each column as well. An *index* is a 
data structure that improves the speed of data retrieval operations on a database table. 

## Tables used

 

Here we will list all the tables that are used throughout the tutorial.

cars.sql
  

-- SQL for the Cars table

USE mydb;
CREATE TABLE IF NOT EXISTS Cars(Id INTEGER PRIMARY KEY, Name VARCHAR(50), 
Cost INTEGER);
INSERT INTO Cars VALUES(1,'Audi',52642);
INSERT INTO Cars VALUES(2,'Mercedes',57127);
INSERT INTO Cars VALUES(3,'Skoda',9000);
INSERT INTO Cars VALUES(4,'Volvo',29000);
INSERT INTO Cars VALUES(5,'Bentley',350000);
INSERT INTO Cars VALUES(6,'Citroen',21000);
INSERT INTO Cars VALUES(7,'Hummer',41400);
INSERT INTO Cars VALUES(8,'Volkswagen',21600);

This is a Cars table.

customers_reservations.sql
  

-- SQL for the Customers, Reservations tables

USE mydb;

CREATE TABLE IF NOT EXISTS Customers(CustomerId INTEGER AUTO_INCREMENT 
    PRIMARY KEY, Name VARCHAR(55));
INSERT INTO Customers(Name) VALUES('Paul Novak');
INSERT INTO Customers(Name) VALUES('Terry Neils');
INSERT INTO Customers(Name) VALUES('Jack Fonda');
INSERT INTO Customers(Name) VALUES('Tom Willis');

CREATE TABLE IF NOT EXISTS Reservations(Id INTEGER AUTO_INCREMENT
    PRIMARY KEY, CustomerId INTEGER, Day DATE);
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-11-22');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-11-28');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-11-29');
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-11-29');
INSERT INTO Reservations(CustomerId, Day) VALUES(3, '2009-12-2');

These are Customers and Reservations tables.

books.sql
  

-- SQL for the Books table

USE mydb;

CREATE TABLE IF NOT EXISTS Books(Id INTEGER PRIMARY KEY, 
    Title VARCHAR(100), Author VARCHAR(60));
INSERT INTO Books VALUES(1,'War and Peace','Leo Tolstoy');
INSERT INTO Books VALUES(2,'The Brothers Karamazov','Fyodor Dostoyevsky');
INSERT INTO Books VALUES(3,'Paradise Lost','John Milton');
INSERT INTO Books VALUES(4,'Crime and Punishment','Fyodor Dostoyevsky');
INSERT INTO Books VALUES(5,'Cousin Bette','Honore de Balzac');

This is a Books table.

This was an introduction to the MySQL database system.

[Contents](..) 
[Next](../installation/)