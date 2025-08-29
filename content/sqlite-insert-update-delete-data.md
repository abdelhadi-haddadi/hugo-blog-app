+++
title = "SQLite insert, update, delete data"
date = 2025-08-29T19:52:53.641+01:00
draft = false
description = "In this part of the SQLite tutorial, we will be inserting, updating, and deleting data. We use the INSERT INTO, DELETE, and UPDATE statements."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../expressions/)
[Next](../select/)

# SQLite insert, update, delete data

last modified July 6, 2020 

In this part of the SQLite tutorial, we will insert, update and delete 
data from SQLite tables. We will use the INSERT, DELETE, 
and UPDATE statements. These statements are part of the SQL Data Manipulation 
Language (DML).

## SQLite insert data

The INSERT statement is used to insert data into tables. 
We will create a new table in which to execute our examples. 

sqlite&gt; DROP TABLE IF EXISTS Cars;
sqlite&gt; CREATE TABLE Cars(Id INTEGER PRIMARY KEY, Name TEXT,
   ...&gt; Price INTEGER DEFAULT 'Not available');

We create a new table Cars with Id, Name, 
and Price columns. 

sqlite&gt; INSERT INTO Cars(Id, Name, Price) VALUES(1, 'Audi', 52642);

This is the classic INSERT statement. We have specified all 
column names after the table name and all values after the VALUES 
keyword. The first row is added into the table. 

sqlite&gt; INSERT INTO Cars(Name, Price) VALUES('Mercedes', 57127);

We add a new car into the Cars table. We have omitted the 
Id column. The Id column is defined as 
INTEGER PRIMARY KEY and such columns are auto-incremented in 
SQLite. This means the SQLite library will add a new Id itself.

sqlite&gt; .headers on
sqlite&gt; SELECT * FROM Cars;
Id|Name|Price
1|Audi|52642
2|Mercedes|57127

Here is what we have in the Cars table at the moment. 

sqlite&gt; INSERT INTO Cars VALUES(3, 'Skoda', 9000);

In this SQL statement, we did not specify any column names after the table name. 
In such a case, we have to supply all values.

sqlite&gt; .nullvalue NULL

The .nullvalue command tells the SQLite to show 
NULL values as NULL. SQLite shows empty strings for 
NULL values by default. 

sqlite&gt; INSERT INTO Cars(Id) VALUES(4);

The INSERT statement omits the last 2 columns. Such columns are 
filled with the default value or NULL if there is no default value. 
The Name column does not have a default value, so there is a 
NULL value. In the CREATE TABLE statement, we 
have specified the Price column to have the 'Not available' default value.

sqlite&gt; SELECT * FROM Cars WHERE Id=4;
Id|Name|Price
4|NULL|Not available

In the second column we have a NULL value. The third has the 
default 'Not available' string.

sqlite&gt; INSERT INTO Cars VALUES(4, 'Volvo', 29000);
Error: UNIQUE constraint failed: Cars.Id

Say we want to put all information into the fourth column. Trying to insert new
data into existing row produces the following error: *UNIQUE constraint failed: Cars.Id*. 

sqlite&gt; INSERT OR REPLACE INTO Cars VALUES(4, 'Volvo', 29000);

In such a case we can use the INSERT OR REPLACE statement. The same could 
be accomplished with the UPDATE statement. 

sqlite&gt; SELECT * FROM Cars WHERE Id=4;
Id|Name|Price
4|Volvo|29000 

Now we have all information in the fourth row.

sqlite&gt; INSERT OR FAIL INTO Cars VALUES(4, 'Bentley', 350000);
Error: UNIQUE constraint failed: Cars.Id

The INSET OR FAIL INTO statement is equal to the INSERT INTO statement.
It is just a bit more specific that it fails in case of an error.

sqlite&gt; INSERT OR IGNORE INTO Cars VALUES(4, 'Bentley', 350000);
sqlite&gt; SELECT * FROM Cars WHERE Id=4;
Id|Name|Price
4|Volvo|29000

The INSERT OR IGNORE INTO statement ignores the error message. The SELECT 
statement shows that the last two statements did not modify the fourth row.

Since SQLite version 3.7.11 it is possible to insert multiple rows using one
INSERT statement. 

sqlite&gt; CREATE TEMP TABLE Ints(Id INTEGER PRIMARY KEY, Val INTEGER);

We will use a one-column Ints table to show a multi-row 
INSERT statement. The table's lone column stores integers.

sqlite&gt; INSERT INTO Ints(Val) VALUES (1), (3), (5), (6), (7), (8), (6), (4), (9);

We insert nine rows into the table in one shot. The rows follow the 
VALUES keyword and are separated by a comma character. 

sqlite&gt; SELECT * FROM Ints;
Id|Val
1|1
2|3
3|5
4|6
5|7
6|8
7|6
8|4
9|9

These are the contents of the Ints table.

We can use the INSERT and SELECT statements 
together in one statement. 

sqlite&gt; CREATE TABLE Cars2(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);

First, we create a new table called Cars2. 

sqlite&gt; INSERT INTO Cars2 SELECT * FROM Cars;

Here we insert all data from the Cars table into the 
Cars2 table.

sqlite&gt; SELECT * FROM Cars2;
Id|Name|Price
1|Audi|52642
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000

We verify it. 

## SQLite delete data

The DELETE keyword is used to delete data from tables. 
First, we are going to delete one row from a table. 
We will use the Cars2 table which we have created previously.

sqlite&gt; DELETE FROM Cars2 WHERE Id=1;

We delete a row with Id 1.

sqlite&gt; SELECT * FROM Cars2;
Id|Name|Price
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000

We verify that the first row is missing.

sqlite&gt; DELETE FROM Cars2;

This SQL statement deletes all data in the table.

sqlite&gt; SELECT Count(Id) AS '# of cars' FROM Cars2;
# of cars      
---------------
0  

This SQL statement confirms that there are no rows in the 
Cars2 table now.

sqlite&gt; .read cars.sql
sqlite&gt; SELECT * FROM Cars;
1|Audi|52642
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000
5|Bentley|350000
6|Citroen|21000
7|Hummer|41400
8|Volkswagen|21600

With the .read meta command, we create a new Cars 
table. (The SQL for the table can be found in the first chapter of this tutorial.)

With the LIMIT clause, it is possible to restrict the
number of deleted rows. Five rows were deleted and three rows are left.

-->

## SQLite update data

The UPDATE statement is used to modify a subset of the values 
stored in zero or more rows of a database table.

Say we wanted to change 'Skoda' to 'Skoda Octavia' in our 
Cars table. The following statement shows how to accomplish this:

sqlite&gt; .read cars.sql
sqlite&gt; UPDATE Cars SET Name='Skoda Octavia' WHERE Id=3;

The SQL statement sets the name of a car to 'Skoda Octavia'
for the column with Id=3.

sqlite&gt; SELECT * FROM Cars WHERE Id=3;
3|Skoda Octavia|9000

The row is correctly updated. 

In this part of the SQLite tutorial, we have inserted, deleted, and updated data in 
database tables. 

[Contents](..)
[Previous](../expressions/)
[Next](../select/)