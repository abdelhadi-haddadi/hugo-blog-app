+++
title = "MySQL create, alter, drop table"
date = 2025-08-29T20:03:49.810+01:00
draft = false
description = "MySQL create, alter, drop table shows how to work with CREATE, DROP, and ALTER statements in MySQL."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../datatypes/)
[Next](../expressions/)

# MySQL create, alter, drop table

last modified January 10, 2023 

In this part of the MySQL tutorial, we will be creating, altering, 
and dropping tables. 

We will use the following SQL statements:

  - CREATE TABLE

  - ALTER TABLE

  - DROP TABLE

The CREATE, ALTER, and DROP 
statements are not limited to tables. We can use them
to create other database objects like events, triggers, views, functions or
procedures. These statements are part of the Data Definition Language (DDL) 
of the SQL specification.

## CREATE and DROP statements

The CREATE statement is used to create tables. It is also 
used to create indexes, views, events, routines, and triggers.

To create a table, we give a name to a table and to its columns. Each column 
has a data type. We have covered various MySQL data types in the previous 
chapter. Choosing the correct datatype for the columns is part of the initial 
design of the database. 

mysql&gt; CREATE TABLE Testing(Id INTEGER);

We create a simple Testing table with the CREATE TABLE statement. 
The table name is Testing. The table has one column called Id. 
And column's datatype is INTEGER.

mysql&gt; SHOW CREATE TABLE Testing;
+---------+------------------------------------------
| Table   | Create Table                                                                                
+---------+------------------------------------------
| Testing | CREATE TABLE `Testing` (
  `Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 |
+---------+------------------------------------------
1 row in set (0.00 sec)

Using the SHOW CREATE TABLE statement, we can see the exact SQL statement
to create a specific table. There are also some defaults. These are chosen if
we do not provide some explicit attributes. The default MySQL engine is InnoDB if
not specified otherwise. (This applies to MySQL 5.5+). The default charset it latin1.

mysql&gt; SHOW TABLES LIKE 'T%';
+---------------------+
| Tables_in_mydb (T%) |
+---------------------+
| Testing             |
+---------------------+

Created, non-temporary tables can be shown using the SHOW TABLES
syntax. We can restrict the tables shown using the LIKE clause.
In our case, we show all tables that begin with T.

mysql&gt; DROP TABLE Testing;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; SHOW TABLES LIKE 'T%';
Empty set (0.00 sec)

The DROP TABLE statement drops a table from the database. 

mysql&gt; CREATE TABLE Testing(Id INT NOT NULL) ENGINE=MEMORY CHARACTER SET='utf8'
    -&gt; COLLATE='utf8_slovak_ci';

We recreate the Testing table. The INT is a synonym 
for INTEGER. The database engine is explicitly set to MEMORY. 
We also specify the character set and collation. 

## ALTER TABLE statement

The ALTER TABLE statement changes the structure of an 
existing table. It is possible to add a new column, delete a column, 
rename column and table or change the type of the table. In the following 
examples, we will demonstrate some of the possibilities.

mysql&gt; ALTER TABLE Testing RENAME TO TestTable;

mysql&gt; SHOW TABLES LIKE 'T%';
+---------------------+
| Tables_in_mydb (T%) |
+---------------------+
| TestTable           |
+---------------------+

We use the RENAME TO clause to rename the 
Testing table to TestTable.

mysql&gt; ALTER TABLE TestTable ADD iValues INT;

We add a new column named iValues to the table. 

mysql&gt; SHOW COLUMNS FROM TestTable;
+---------+---------+------+-----+---------+-------+
| Field   | Type    | Null | Key | Default | Extra |
+---------+---------+------+-----+---------+-------+
| Id      | int(11) | NO   |     | NULL    |       |
| iValues | int(11) | YES  |     | NULL    |       |
+---------+---------+------+-----+---------+-------+

The statement shows available columns in the table. We see the newly 
added column. 

It is possible to add constraints to the table.

mysql&gt; ALTER TABLE TestTable ADD PRIMARY KEY (Id);

We add a PRIMARY KEY constraint to the TestTable.

mysql&gt; DESCRIBE TestTable;
+---------+---------+------+-----+---------+-------+
| Field   | Type    | Null | Key | Default | Extra |
+---------+---------+------+-----+---------+-------+
| Id      | int(11) | NO   | PRI | NULL    |       |
| iValues | int(11) | YES  |     | NULL    |       |
+---------+---------+------+-----+---------+-------+

The DESCRIBE is a synonym for SHOW COLUMNS FROM.
We can see under the Key column that the primary key constraint is set 
for the Id column. 

mysql&gt; ALTER TABLE TestTable CHANGE COLUMN iValues iValues1 INT;

In this SQL statement we change the column name from 
iValues to iValues1.

mysql&gt; ALTER TABLE TestTable MODIFY COLUMN iValues1 MEDIUMINT;

mysql&gt; DESCRIBE TestTable;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| Id       | int(11)      | NO   | PRI | NULL    |       |
| iValues1 | mediumint(9) | YES  |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+

We use the above SQL statement to modify the column definition. 
We change the column datatype from INTEGER to 
MEDIUMINTEGER.

mysql&gt; ALTER TABLE TestTable DROP COLUMN iValues1;

mysql&gt; DESCRIBE TestTable;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| Id    | int(11) | NO   | PRI | NULL    |       |
+-------+---------+------+-----+---------+-------+

In our last example, we drop an existing column from 
the table. 

In this part of the MySQL tutorial, we were creating, altering and dropping
tables. 

[Contents](..)
[Previous](../datatypes/)
[Next](../expressions/)