+++
title = "Raw SQL"
date = 2025-08-29T19:52:52.528+01:00
draft = false
description = "In this part of the SQLAlchemy tutorial, work with raw SQL."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../intro/)
[Next](../schema/)

# Raw SQL

last modified July 6, 2020 

In this part of the SQLite tutorial, we work with raw SQL. SQLAlchemy
is not a pure ORM toolkit. It also allows to execute raw SQL statements when
needed.

## Scalar data

 

In the first example, we connect to an in-memory SQLite database
and execute a simple SQL statement.

scalar_data.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine

eng = create_engine('sqlite:///:memory:')

with eng.connect() as con:
    
    rs = con.execute('SELECT 5')
        
    data = rs.fetchone()[0]
    
    print "Data: %s" % data  

The example prints a value returned by the SELECT
statement.

eng = create_engine('sqlite:///:memory:')

The create_engine method creates an Engine, which is
used to deliver SQL statements to the database. The method
takes a connection string as a parameter. We will connect to 
an in-memory SQLite database.

with eng.connect() as con:

With the connect method, we connect to the database specified
in the connection string.

rs = con.execute('SELECT 5')

With the connection's execute method, we deliver a simple 
SELECT SQL statement.

data = rs.fetchone()[0]

With the fetchone method, we retrieve a single row.
From this row, we get the scalar value.

print "Data: %s" % data 

The value is printed to the console.

$ ./scalar_data.py 
Data: 5

We execute the script.

## PostgreSQL version

In the next example, we connect to the PostgreSQL database and
print its version.

postgres_version.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine

eng = create_engine('postgresql:///testdb')
con = eng.connect()

rs = con.execute("SELECT VERSION()")
print rs.fetchone()

con.close()

To select the version of the database, we use the SELECT VERSION SQL
command.

eng = create_engine('postgresql:///testdb')

We connect to the testdb database in PostgreSQL. We do not include
the user name and the password in the connection string. This is because PostgreSQL
allows to connect without authentication on local connections in its trust
authentication policy.

rs = con.execute("SELECT VERSION()")
print rs.fetchone()

We execute the SQL command and print the returned data to the console.

$ ./postgres_version.py 
(u'PostgreSQL 9.3.9 on x86_64-unknown-linux-gnu, compiled by gcc (Ubuntu 4.8.4-2ubuntu1~14.04) 4.8.4, 64-bit',)

This is a sample output.

## Creating a database table

In the following example, we are going to create a table and
fill it with data. 

raw_create_table.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.sql import text

eng = create_engine("mysql://testuser:test623@localhost/testdb")

with eng.connect() as con:

    con.execute(text('DROP TABLE IF EXISTS Cars'))
    con.execute(text('''CREATE TABLE Cars(Id INTEGER PRIMARY KEY, 
                 Name TEXT, Price INTEGER)'''))

    data = ( { "Id": 1, "Name": "Audi", "Price": 52642 },
             { "Id": 2, "Name": "Mercedes", "Price": 57127 },
             { "Id": 3, "Name": "Skoda", "Price": 9000 },
             { "Id": 4, "Name": "Volvo", "Price": 29000 },
             { "Id": 5, "Name": "Bentley", "Price": 350000 },
             { "Id": 6, "Name": "Citroen", "Price": 21000 },
             { "Id": 7, "Name": "Hummer", "Price": 41400 },
             { "Id": 8, "Name": "Volkswagen", "Price": 21600 }
    )
    
    for line in data:
        con.execute(text("""INSERT INTO Cars(Id, Name, Price) 
            VALUES(:Id, :Name, :Price)"""), **line)

A Cars table is created with backend-neutral way of binding parameters.

eng = create_engine("mysql://testuser:test623@localhost/testdb")

We will connect to the MySQL database. We use a specific MySQL connection
string.

for line in data:
    con.execute(text("""INSERT INTO Cars(Id, Name, Price) 
        VALUES(:Id, :Name, :Price)"""), **line)

Using the for loop, we insert the data to the database table.
Databases use different bind parameter constructs. With the text 
function, we use a backend-neutral way to bind parameters.

$ mysql -u testuser -p
mysql&gt; USE testdb;
mysql&gt; SELECT * FROM Cars;
+----+------------+--------+
| Id | Name       | Price  |
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
8 rows in set (0.00 sec)

We verify the data.

## Column names

The following example prints the column names of the Cars table.

raw_column_names.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.sql import text

eng = create_engine('sqlite:///:memory:')

with eng.connect() as con:

    con.execute(text('''CREATE TABLE Cars(Id INTEGER PRIMARY KEY,
        Name TEXT, Price INTEGER)'''))
    rs = con.execute(text('SELECT * FROM Cars'))

    print rs.keys()

The example creates a database table in memory and prints its column names.

rs = con.execute(text('SELECT * FROM Cars'))

In the SELECT statement, we select all columns.

print rs.keys()

The keys method returns the names of the columns.

$ ./raw_column_names.py 
[u'Id', u'Name', u'Price']

This is the output of the example.

In this part of the SQLite tutorial, we executed raw SQL statements with 
SQLAlchemy.

[Contents](..)
[Previous](../intro/)
[Next](../schema/)