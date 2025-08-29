+++
title = "SQLite views, triggers, transactions"
date = 2025-08-29T19:52:57.005+01:00
draft = false
description = "In this part of the SQLite tutorial, we will cover views, triggers, trasactions."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../sqlitefunctions/)

# SQLite views, triggers, transactions

last modified July 6, 2020 

In this part of the SQLite tutorial, we will mention views, 
triggers, and transactions.

## SQLite views

A view is a specific look on data in from one or more tables. 
It can arrange data in some specific order or highlight or hide some data. 
A view consists of a stored query accessible as a virtual table composed 
of the result set of a query. Unlike ordinary tables, a view does not 
form part of the physical schema. It is a dynamic, virtual table computed 
or collated from data in the database.

In the next example, we create a simple view. 

sqlite&gt; SELECT * FROM Cars;
Id           Name         Price     
-----------  -----------  ----------
1            Audi         52642     
2            Mercedes     57127     
3            Skoda        9000      
4            Volvo        29000     
5            Bentley      350000    
6            Citroen      21000     
7            Hummer       41400     
8            Volkswagen   21600  

This is our data, upon which we create the view. 

sqlite&gt; CREATE VIEW CheapCars AS SELECT Name FROM Cars WHERE Price &lt; 30000;
sqlite&gt; SELECT * FROM CheapCars;
Name       
-----------
Skoda      
Volvo      
Citroen    
Volkswagen 

The CREATE VIEW statement is used to create a view. 

sqlite&gt; .tables
Books         CheapCars     Friends       Names         Reservations
Cars          Customers     Log           Orders        Testing     
sqlite&gt; DROP VIEW CheapCars;
sqlite&gt; .tables
Books         Customers     Log           Orders        Testing     
Cars          Friends       Names         Reservations

Technically a view is a virtual table. So we can list all views with a 
.tables command. To remove a view, we use the 
DROP VIEW statement.  

## SQLite triggers

*Triggers* are database operations that are automatically performed when a 
specified database event occurs. 

In the following example, we will use the Friends table and 
create a new Log table.

sqlite&gt; CREATE TABLE Log(Id INTEGER PRIMARY KEY, OldName TEXT, 
   ...&gt; NewName TEXT, Date TEXT);

The Log table has a column for the old name and for the new name
of a friend. It also has a column for a timestamp.

CREATE TRIGGER mytrigger UPDATE OF Name ON Friends
BEGIN
INSERT INTO Log(OldName, NewName, Date) VALUES (old.Name, new.Name, datetime('now'));
END;

We create a trigger called mytrigger with the CREATE TRIGGER 
statement. This trigger will launch an INSERT statement whenever we update 
the Name column of the Friends table. 
The INSERT statement will insert the old name, the new name, and the time 
stamp into the Log table. The old and new are 
references to the row being modified.

sqlite&gt; SELECT name, tbl_name FROM sqlite_master WHERE type='trigger';
name         tbl_name   
-----------  -----------
mytrigger    Friends   

To list available triggers and their corresponding tables, we query the
sqlite_master table.

sqlite&gt; SELECT * FROM Friends;
Id          Name        Sex       
----------  ----------  ----------
1           Jane        F         
2           Thomas      M         
3           Franklin    M         
4           Elisabeth   F         
5           Mary        F         
6           Lucy        F         
7           Jack        M  

This is our data. 

Next, we are going to update one row of the Friends table. 

sqlite&gt; UPDATE Friends SET Name='Frank' WHERE Id=3;

We update the third row of the table. The trigger is launched. 

sqlite&gt; SELECT * FROM Log;
Id           OldName      NewName     Date               
-----------  -----------  ----------  -------------------
1            Franklin     Frank       2014-11-18 10:58:46

We check the Log table. This log confirms the update operation 
we performed. 

## SQLite transactions

A *transaction* is an atomic unit of database operations against the data
in one or more databases. The effects of all the SQL statements in a transaction
can be either all committed to the database or all rolled back.

In SQLite, any command other than SELECT starts an implicit transaction. 
Manual transactions are started with the BEGIN TRANSACTION statement
and finished with the COMMIT or ROLLBACK statements.

BEGIN TRANSACTION;
CREATE TABLE Test(Id INTEGER NOT NULL);
INSERT INTO Test VALUES(1);
INSERT INTO Test VALUES(2);
INSERT INTO Test VALUES(3);
INSERT INTO Test VALUES(NULL);
COMMIT;

Here we have a sample transaction. A transaction begins with 
BEGIN TRANSACTION and ends with COMMIT. 

We have a NOT NULL constraint set on the Id column. Thus, the fourth insert 
will not succeed. SQLite manages transactions on a case-by-case basis. For some errors, 
it reverts all changes. For others, it reverts only the last statement and leaves
other changes intact. In our case, the table is created and the first three 
inserts are written into the table. The fourth one is not. 

Say, we already had an empty table named Test. Executing the above transaction 
would fail completely. No changes would be written. If we changed the 
CREATE TABLE statement into CREATE TABLE IF NOT EXISTS, 
the first three statements would execute. 

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS Test(Id INTEGER NOT NULL);
INSERT INTO Test VALUES(11);
INSERT INTO Test VALUES(12);
INSERT INTO Test VALUES(13);
INSERT INTO Test VALUES(NULL);
ROLLBACK;

A transaction can end with a COMMIT or a ROLLBACK statement.
The ROLLBACK reverts all changes. 

In this part of the SQLite tutorial, we have worked with views, triggers, and 
transactions in SQLite. 

[Contents](..)
[Previous](../sqlitefunctions/)