+++
title = "Creating, dropping, and altering tables in SQLite"
date = 2025-08-29T19:52:55.890+01:00
draft = false
description = "In this part of the SQLite tutorial, we will be creating, dropping, and altering tables. We use SQL statements that define the database schema."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../tool/)
[Next](../expressions/)

# Creating, dropping, and altering tables in SQLite

last modified July 6, 2020 

In this part of the SQLite tutorial, we will cover the data definition 
language (DDL) of the SQLite database. The *DDL* consists 
of SQL statements that define the database schema. The *schema* 
is the database structure described in a formal language. In relational 
databases, the schema defines the tables, views, indexes, relationships, and triggers.

The SQLite supports the following three DDL statements:

    - CREATE

    - ALTER TABLE

    - DROP

In SQLite, the CREATE statement is used to create tables, indexes, 
views, and triggers. The ALTER TABLE statement changes the structure of a 
table. The DROP statement removes tables, indexes, views, or triggers. 

## SQLite create table

The CREATE statement is used to create tables. It is also used to 
create indexes, views, and triggers.

To create a table, we give a name to a table and to its columns. 
Each column can have one of these data types:

    - NULL — The value is a NULL value

    - INTEGER — a signed integer

    - REAL — a floating point value

    - TEXT — a text string

    - BLOB — a blob of data

sqlite&gt; CREATE TABLE Testing(Id INTEGER);
sqlite&gt; .schema Testing
CREATE TABLE Testing(Id INTEGER);

We create a simple Testing table with the CREATE TABLE 
statement. The .schema command shows the formal definition of the table. 

sqlite&gt; CREATE TABLE Testing(Id INTEGER);
Error: table Testing already exists

If we try to create a table that already exists, we get an error. Therefore,
the CREATE TABLE statement has an optional IF NOT EXISTS 
clause. With this clause nothing is done and we receive no error.

sqlite&gt; CREATE TABLE IF NOT EXISTS Testing(Id INTEGER);

We get no error message for trying to create a table that already exists.

The CREATE TABLE ... AS statement enables to 
create a new table based on a SELECT statement.

sqlite&gt; CREATE TABLE Cars2 AS SELECT * FROM Cars;

The above statement creates an identical table to the Cars 
table using a specific SELECT statement.

sqlite&gt; ATTACH DATABASE 'test2.db' AS test2;
sqlite&gt; .databases
main: /home/janbodnar/tmp/test.db
test2: /home/janbodnar/tmp/test2.db

We add a new database to the current database connection with the ATTACH DATABASE
statement. The first database is called main and the new database is called
test2. 

sqlite&gt; CREATE TABLE test2.Cars(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);
sqlite&gt; INSERT INTO test2.Cars VALUES(1, 'Porsche', 107699);
sqlite&gt; SELECT * FROM main.Cars WHERE Id=1;
1           Audi        52642     
sqlite&gt; SELECT * FROM test2.Cars WHERE Id=1;
1           Porsche     107699   

Since we have two databases it is mandatory to specify the database name if we 
want to create a table in the test2 database. The database name precedes
the table name. In this case, if the database name is not specified, the main 
is automatically chosen.

sqlite&gt; CREATE TEMPORARY TABLE Cars(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);
sqlite&gt; INSERT INTO temp.Cars VALUES (1, 'Kia', 24300);
sqlite&gt; .databases
main: /home/janbodnar/tmp/test.db
temp: 
test2: /home/janbodnar/tmp/test2.db
sqlite&gt; SELECT * FROM temp.Cars WHERE Id=1;
Id          Name        Price     
----------  ----------  ----------
1           Kia         24300     
sqlite&gt; 

With the TEMPORARY keyword, we create a temporary database. A temporary
database is destroyed each time the database connection is closed. The name of
the temporary database is temp.

## SQLite drop table

The DROP statement is used to delete a table from a database.

sqlite&gt; .tables
Authors       Cars2         Orders        temp.Cars   
Books         Customers     Reservations  test2.Cars  
Cars          Friends       Testing     
sqlite&gt; DROP TABLE Testing;
sqlite&gt; .tables
Authors       Cars          Customers     Orders        temp.Cars   
Books         Cars2         Friends       Reservations  test2.Cars  

We show the available tables with the .tables command. 
The DROP TABLE statement removes the Testing table 
from the database. 

sqlite&gt; DROP TABLE Testing;
Error: no such table: Testing

Trying to drop a table that does not exist leads to an error. With the
IF EXISTS clause we can avoid this error.

sqlite&gt; DROP TABLE IF EXISTS Testing;

This statement will drop the Testing table only if it exists. 

sqlite&gt; DROP TABLE IF EXISTS test2.Cars;

This SQL statement deletes the Cars table from the test2
database.

## SQLite ALTER TABLE

SQLite supports a limited subset of the ALTER TABLE statement. 
This statement in SQLite allows a user to rename a table or to add a new 
column to an existing table. It is not possible to rename a column, remove 
a column, or add or remove constraints from a table. 

sqlite&gt; CREATE TABLE Names(Id INTEGER, Name TEXT);

Let us create a table called Names that we want to rename. 

sqlite&gt; ALTER TABLE Names RENAME TO NamesOfFriends;

We rename the table to NamesOfFriends.

sqlite&gt; .schema NamesOfFriends
CREATE TABLE "NamesOfFriends"(Id INTEGER, Name TEXT);

We verify the schema of the renamed table.

Say we wanted to add a new column to the table. 

sqlite&gt; ALTER TABLE NamesOfFriends ADD COLUMN Email TEXT;

The SQL statement adds a new column named Email to the table.

sqlite&gt; .schema NamesOfFriends
CREATE TABLE "NamesOfFriends"(Id INTEGER, Name TEXT, Email TEXT);

Here we see the new structure of the table. 

In this part of the SQLite tutorial, we were creating, dropping, and altering tables. 

[Contents](..)
[Previous](../tool/)
[Next](../expressions/)