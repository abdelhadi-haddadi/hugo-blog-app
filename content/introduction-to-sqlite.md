+++
title = "Introduction to SQLite"
date = 2025-08-29T19:52:54.746+01:00
draft = false
description = "This part of the SQLite tutorial is an introduction to SQLite database. We provide basic description of SQLite and related definitions."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../tool/)

# Introduction to SQLite

last modified July 6, 2020 

This is SQLite tutorial. It covers the SQLite database engine, sqlite3 command 
line tool and the SQL language covered by the database engine. It is an 
introductory tutorial for the beginners. It covers SQLite version 3.16.2.

## SQLite database

*SQLite* is an embedded relational database engine. Its developers call it a 
self-contained, serverless, zero-configuration and transactional SQL database engine. 
It is very popular and there are hundreds of millions copies worldwide in use today. 
SQLite is used in the Solaris 10 and Mac OS operating systems and by iPhone and Skype. 
The Qt4 library has built-in support for SQLite as well as the Python and PHP languages. 
Many popular applications use SQLite internally such as Firefox, Google Chrome, or Amarok. 

SQLite implements most of the SQL-92 standard for SQL. The SQLite engine is not a 
standalone process. Instead, it is statically or dynamically linked into the 
application. The SQLite library is small. It can require less than 300 KiB.
An SQLite database is a single ordinary disk file that can be located anywhere in 
the directory hierarchy. It is a cross platform file. It can be used on various 
operating systems, both 32 and 64 bit architectures. SQLite was written in the C 
programming language. It has bindings for many languages, including C++, Java, C#, 
Python, Perl, Ruby, Visual Basic, and Tcl. The source code of SQLite is in public domain.

## Definitions

A *relational database* is a collection of data organised in tables. There are 
relations among the tables. The tables are formally described. They consist of rows 
and columns. *SQL* (Structured Query Language) is a database computer language 
designed for managing data in relational database management systems.
A *table* is a set of values that is organised using a model of vertical columns 
and horizontal rows. The columns are identified by their names. 
A *schema* of a database system is its structure described in a formal language. 
It defines the tables, the fields, relationships, views, indexes, procedures, functions, 
queues, triggers, and other elements.
A database *row* represents a single, implicitly structured data item in a table. 
It is also called a tuple or a record. 

A *column* is a set of data values of a particular simple type, one for each row 
of the table. The columns provide the structure according to which the rows are composed.
A *field* is a single item that exists at the intersection between one row and one column.
A * primary key* uniquely identifies each record in the table. A *foreign key* 
is a referential constraint between two tables. The foreign key identifies
a column or a set of columns in one (referencing) table that refers to a column 
or set of columns in another (referenced) table. A *trigger* is a procedural 
code that is automatically executed in response to certain events on a particular table 
in a database. A *view* is a specific look on data in from one or more tables. 
It can arrange data in some specific order, highlight or hide some data.
A view consists of a stored query accessible as a virtual table composed of the result 
set of a query. Unlike ordinary tables a view does not form part of the physical schema. 
It is a dynamic, virtual table computed or collated from data in the database. 

A *transaction* is an atomic unit of database operations against the data in 
one or more databases. The effects of all the SQL statements in a transaction can be 
either all committed to the database or all rolled back. 

An SQL *result set* is a set of rows from a database returned by the SELECT statement.
It also contains meta-information about the query such as the column names and the 
types and sizes of each column. An *index* is a data structure that improves the 
speed of data retrieval operations on a database table. 

## Installing SQLite from sources

To get the newest version of SQLite, we can install SQLite from sources.
The installation is easy and takes only a while. The following instructions
build and install SQLite on Linux.

$ sudo apt-get install libreadline-dev

To enable history of commands in sqlite command line tool, we need to 
install the readline development library.

$ wget https://www.sqlite.org/2017/sqlite-autoconf-3160200.tar.gz

From the SQLite download page, we get the recent sources. These are sources for
SQLite version 3.16.2.

$ tar -xzvf sqlite-autoconf-3160200.tar.gz

We unpack the compressed files.

$ cd sqlite-autoconf-3160200/

We go to the sqlite-autoconf-3160200 directory.

$ ./configure

We run the configure script. It tells us if we have everything
ready for building SQLite.

$ make

With make, we build SQLite.

$ sudo make install

With sudo make install, we install SQLite on the system. 

$ which sqlite3
/usr/local/bin/sqlite3

By default, the SQLite command line tool is installed into /usr/local/bin directory.

$ sqlite3
SQLite version 3.16.2 2017-01-06 16:32:41
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite&gt; 

The /usr/local/bin directory is in the PATH variable, so we can
run sqlite3 without the full path.

## Tables used

 

Here we will list the most important tables that are used throughout the tutorial.
The .read command of the sqlite3 tool is used to execute 
the SQL statements from a file. 

sqlite&gt; .read cars.sql

Here we execute the SQL statements located in the cars.sql file.

cars.sql
  

-- SQL for the Cars table

BEGIN TRANSACTION;
DROP TABLE IF EXISTS Cars;

CREATE TABLE Cars(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);
INSERT INTO Cars VALUES(1, 'Audi', 52642);
INSERT INTO Cars VALUES(2, 'Mercedes', 57127);
INSERT INTO Cars VALUES(3, 'Skoda', 9000);
INSERT INTO Cars VALUES(4, 'Volvo', 29000);
INSERT INTO Cars VALUES(5, 'Bentley', 350000);
INSERT INTO Cars VALUES(6, 'Citroen', 21000);
INSERT INTO Cars VALUES(7, 'Hummer', 41400);
INSERT INTO Cars VALUES(8, 'Volkswagen', 21600);
COMMIT;

This is the Cars table.

orders.sql
  

-- SQL for the Orders table

BEGIN TRANSACTION;
DROP TABLE IF EXISTS Orders;

CREATE TABLE Orders(Id INTEGER PRIMARY KEY, 
                 OrderPrice INTEGER CHECK(OrderPrice&gt;0), Customer TEXT);
INSERT INTO Orders(OrderPrice, Customer) VALUES(1200, "Williamson");
INSERT INTO Orders(OrderPrice, Customer) VALUES(200, "Robertson");
INSERT INTO Orders(OrderPrice, Customer) VALUES(40, "Robertson");
INSERT INTO Orders(OrderPrice, Customer) VALUES(1640, "Smith");
INSERT INTO Orders(OrderPrice, Customer) VALUES(100, "Robertson");
INSERT INTO Orders(OrderPrice, Customer) VALUES(50, "Williamson");
INSERT INTO Orders(OrderPrice, Customer) VALUES(150, "Smith");
INSERT INTO Orders(OrderPrice, Customer) VALUES(250, "Smith");
INSERT INTO Orders(OrderPrice, Customer) VALUES(840, "Brown");
INSERT INTO Orders(OrderPrice, Customer) VALUES(440, "Black");
INSERT INTO Orders(OrderPrice, Customer) VALUES(20, "Brown");
COMMIT;

This is the Orders table.

friends.sql
  

-- SQL for the Friends table

BEGIN TRANSACTION;
DROP TABLE IF EXISTS Friends;

CREATE TABLE Friends(Id INTEGER PRIMARY KEY, Name TEXT UNIQUE NOT NULL, 
                     Sex TEXT CHECK(Sex IN ('M', 'F')));
INSERT INTO Friends VALUES(1, 'Jane', 'F');
INSERT INTO Friends VALUES(2, 'Thomas', 'M');
INSERT INTO Friends VALUES(3, 'Franklin', 'M');
INSERT INTO Friends VALUES(4, 'Elisabeth', 'F');
INSERT INTO Friends VALUES(5, 'Mary', 'F');
INSERT INTO Friends VALUES(6, 'Lucy', 'F');
INSERT INTO Friends VALUES(7, 'Jack', 'M');
COMMIT;

This is the Friends table.

customers_reservations.sql
  

BEGIN TRANSACTION;
DROP TABLE IF EXISTS Reservations;
DROP TABLE IF EXISTS Customers;

CREATE TABLE IF NOT EXISTS Customers(CustomerId INTEGER PRIMARY KEY, Name TEXT);
INSERT INTO Customers(Name) VALUES('Paul Novak');
INSERT INTO Customers(Name) VALUES('Terry Neils');
INSERT INTO Customers(Name) VALUES('Jack Fonda');
INSERT INTO Customers(Name) VALUES('Tom Willis');

CREATE TABLE IF NOT EXISTS Reservations(Id INTEGER PRIMARY KEY, 
    CustomerId INTEGER, Day TEXT);
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-22-11');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-28-11');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-29-11');
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-29-11');
INSERT INTO Reservations(CustomerId, Day) VALUES(3, '2009-02-12');
COMMIT;

These are the Customers and Reservations tables.

authors_books.sql
  

-- SQL for the Authors &amp; Books tables

BEGIN TRANSACTION;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Authors;

CREATE TABLE Authors(AuthorId INTEGER PRIMARY KEY, Name TEXT);
INSERT INTO Authors VALUES(1, 'Jane Austen');
INSERT INTO Authors VALUES(2, 'Leo Tolstoy');
INSERT INTO Authors VALUES(3, 'Joseph Heller');
INSERT INTO Authors VALUES(4, 'Charles Dickens');

CREATE TABLE Books(BookId INTEGER PRIMARY KEY, Title TEXT, AuthorId INTEGER, 
    FOREIGN KEY(AuthorId) REFERENCES Authors(AuthorId));
INSERT INTO Books VALUES(1,'Emma',1);
INSERT INTO Books VALUES(2,'War and Peace',2);
INSERT INTO Books VALUES(3,'Catch XII',3);
INSERT INTO Books VALUES(4,'David Copperfield',4);
INSERT INTO Books VALUES(5,'Good as Gold',3);
INSERT INTO Books VALUES(6,'Anna Karenia',2);
COMMIT;

These are thee Authors and the Books tables. 

## Sources

The SQLite's [documentation](http://sqlite.org/docs.html) was
used to create this tutorial.

This chapter was an introduction to the SQLite database. 

[Contents](..)
[Next](../tool/)