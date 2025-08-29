+++
title = "SQLite constraints"
date = 2025-08-29T19:52:53.636+01:00
draft = false
description = "In this part of the SQLite tutorial, we will mention SQLite constraints."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../select/)
[Next](../joins/)

# SQLite constraints

last modified July 6, 2020 

In this part of the SQLite tutorial, we will work with constraints.

*Constraints* are placed on columns. They limit the data that can be
inserted into tables. 

In SQLite, we have the following constraints:

    - NOT NULL

    - UNIQUE

    - PRIMARY KEY

    - FOREIGN KEY

    - CHECK

    - DEFAULT

## SQLite NOT NULL constraint

A column with a NOT NULL constraint cannot have 
NULL values. 

sqlite&gt; CREATE TABLE People(Id INTEGER, LastName TEXT NOT NULL, 
   ...&gt; FirstName TEXT NOT NULL, City TEXT);

We create two columns with NOT NULL constraints.  

sqlite&gt; INSERT INTO People VALUES(1, 'Hanks', 'Robert', 'New York');
sqlite&gt; INSERT INTO People VALUES(2, NULL, 'Marianne', 'Chicago');
Error: People.LastName may not be NULL

The first INSERT statement succeeds, while the second fails. 
The error says that the LastName column may not be NULL. 

## SQLite UNIQUE constraint

The UNIQUE constraint ensures that all data are unique in a column. 

sqlite&gt; CREATE TABLE Brands(Id INTEGER, BrandName TEXT UNIQUE);

Here we create a table Brands. The BrandName column is 
set to be UNIQUE. There cannot be two brands with a same name. 

sqlite&gt; INSERT INTO Brands VALUES(1, 'Coca Cola');
sqlite&gt; INSERT INTO Brands VALUES(2, 'Pepsi');
sqlite&gt; INSERT INTO Brands VALUES(3, 'Pepsi');
Error: column BrandName is not unique

We get an error 'column BrandName is not unique'. There can only be one Pepsi brand. 

Note that a PRIMARY KEY constraint automatically has a 
UNIQUE constraint defined on it.

## SQLite Primary key constraint

The PRIMARY KEY constraint uniquely identifies each record in a 
database table. There can be more UNIQUE columns, but only one primary 
key in a table. Primary keys are important when designing database tables. 
Primary keys are unique IDs. We use them to refer to table rows. Primary keys 
become foreign keys in other tables when creating relations among
tables. Due to to a 'long-standing coding oversight', primary keys can be 
NULL in SQLite. This is not the case with other databases. 

sqlite&gt; DROP TABLE Brands;
sqlite&gt; CREATE TABLE Brands(Id INTEGER PRIMARY KEY, BrandName TEXT);

The Id column of the Brands table becomes a 
PRIMARY KEY. 

sqlite&gt; INSERT INTO Brands(BrandName) VALUES('Coca Cola');
sqlite&gt; INSERT INTO Brands(BrandName) VALUES('Pepsi');
sqlite&gt; INSERT INTO Brands(BrandName) VALUES('Sun');
sqlite&gt; INSERT INTO Brands(BrandName) VALUES('Oracle');
sqlite&gt; SELECT * FROM Brands;
Id          BrandName 
----------  ----------
1           Coca Cola 
2           Pepsi     
3           Sun       
4           Oracle   

In SQLite if a column is INTEGER and PRIMARY KEY, 
it is also auto-incremented.

## SQLite Foreign key constraint

A FOREIGN KEY in one table points to a PRIMARY KEY in 
another table. It is a referential constraint between two tables. The foreign key 
identifies a column or a set of columns in one (referencing) table that refers to 
a column or set of columns in another (referenced) table.

The SQLite documentation calls the referenced table the parent table
and the referencing table the child table. The parent key is the column
or set of columns in the parent table that the foreign key constraint refers
to. This is normally, but not always, the primary key of the parent table.
The child key is the column or set of columns in the child table that are
constrained by the foreign key constraint and which hold the REFERENCES
clause.

We demonstrate this constraint using two tables: Authors and 
Books.

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

This is SQL to create the Books and the Authors tables. 
The AuthorId column of the Books table has a foreign 
key constraint. It references to the primary key of the Authors table. 

In SQLite, foreign keys are not enforced by default. To enforce the foreign key, 
the library must be compiled with proper flags, it must be at least version 3.6.19, 
and the pragma key for foreign keys must be set. 

sqlite&gt; PRAGMA foreign_keys=1;

The foreign key is enforced with the PRAGMA statement.

sqlite&gt; DELETE FROM Authors WHERE AuthorId=1;
Error: foreign key constraint failed

Trying to delete an author who still has books in the Books table
leads to an error. The author is not deleted.

sqlite&gt; DELETE FROM Books WHERE AuthorId=1;
sqlite&gt; DELETE FROM Authors WHERE AuthorId=1;
sqlite&gt; SELECT * FROM Authors;
AuthorId         Name              
---------------  ------------------
2                Leo Tolstoy       
3                Joseph Heller     
4                Charles Dickens 

In order to delete an author, we have to delete his books in the Books
table.

It is possible to define what action will be taken when a foreign
constraint has to be enforced. The default action is RESTRICT which 
means that the deletion or update is not allowed. 

CREATE TABLE Books(BookId INTEGER PRIMARY KEY, Title TEXT, AuthorId INTEGER, 
    FOREIGN KEY(AuthorId) REFERENCES Authors(AuthorId) ON DELETE CASCADE);

We modify the schema of the Books table where we add the
ON DELETE CASCADE action. This action means that the operation
is propagated from the parent's table (Authors) to the child
table (Books). 

sqlite&gt; SELECT Name, Title FROM Authors NATURAL JOIN Books;
Name             Title             
---------------  ------------------
Jane Austen      Emma              
Leo Tolstoy      War and Peace     
Joseph Heller    Catch XII         
Charles Dickens  David Copperfield 
Joseph Heller    Good as Gold      
Leo Tolstoy      Anna Karenia      
sqlite&gt; DELETE FROM Authors WHERE AuthorId=2;
sqlite&gt; SELECT Name, Title FROM Authors NATURAL JOIN Books;
Name             Title             
---------------  ------------------
Jane Austen      Emma              
Joseph Heller    Catch XII         
Charles Dickens  David Copperfield 
Joseph Heller    Good as Gold   

Deleting an author also deletes his books.

## SQLite Check constraint

A CHECK clause imposes a validity constraint on a relational database's data.  
The check is executed when adding or updating data to the column in question.

sqlite&gt; .schema Orders
CREATE TABLE Orders(Id INTEGER PRIMARY KEY, OrderPrice INTEGER CHECK(OrderPrice&gt;0), 
Customer TEXT);

We look at the definition of the Orders table. We see a CHECK constraint 
imposed on the OrderPrice column. Naturally, the price of an order must 
be a positive value. 

sqlite&gt; INSERT INTO Orders(OrderPrice, Customer) VALUES(-10, 'Johnson');
Error: constraint failed

If we try to insert an invalid value, we get an error saying 'constraint failed'.

## SQLite Default constraint

The DEFAULT constraint inserts a default value into the column if
no value is available.

sqlite&gt; CREATE TABLE Hotels(Id INTEGER PRIMARY KEY, Name TEXT, 
   ...&gt; City TEXT DEFAULT 'not available');

To demonstrate the DEFAULT constraint, we create a 
Hotels table. The City column has a default 
'not available' value. 

sqlite&gt; INSERT INTO Hotels(Name, City) VALUES('Kyjev', 'Bratislava');
sqlite&gt; INSERT INTO Hotels(Name) VALUES('Slovan');
sqlite&gt; .width 3 8 17
sqlite&gt; SELECT * FROM Hotels;
Id   Name      City             
---  --------  -----------------
1    Kyjev     Bratislava       
2    Slovan    not available 

In the first statement we provide both the hotel name and the city name. 
In the second statement, we provide only the hotel name. SQLite puts
the default value there, the 'not available' text. 

In this part of the SQLite tutorial, we have covered constraints supported
by SQLite database.

[Contents](..)
[Previous](../select/)
[Next](../joins/)