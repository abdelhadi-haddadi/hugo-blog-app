+++
title = "PyMySQL"
date = 2025-08-29T20:09:59.347+01:00
draft = false
description = "PyMySQL tutorial shows how to program MySQL in Python with PyMySQL module. PyMySQL examples connect to MySQL and execute SQL statements."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyMySQL

last modified January 29, 2024

PyMySQL tutorial shows how to program MySQL in Python with PyMySQL module.

## PyMySQL

*PyMySQL* is a pure-Python MySQL client library, based on PEP 249. Most
public APIs are compatible with mysqlclient and MySQLdb. PyMySQL works with
MySQL 5.5+ and MariaDB 5.5+.

MySQL is a leading open source database management system. It is a
multiuser, multithreaded database management system. MySQL is especially
popular on the web.

cities_mysql.sql
  

USE testdb;
DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), population INT);
INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

In the tutorial, we use the cities table.

## PyMySQL installation

$ sudo pip3 install pymysql

We use the pip3 tool to install PyMySQL.

## PyMySQL version example

In the following example, we get the version of MySQL.

version.py
  

#!/usr/bin/python

import pymysql

con = pymysql.connect('localhost', 'user7',
    's$cret', 'testdb')

try:

    with con.cursor() as cur:

        cur.execute('SELECT VERSION()')

        version = cur.fetchone()

        print(f'Database version: {version[0]}')

finally:

    con.close()

In MySQL, we can use SELECT VERSION to get the version of MySQL.

import pymysql

We import the pymysql module.

con = pymysql.connect('localhost', 'user7',
    's$cret', 'testdb')

We connect to the database with connect. We pass four parameters:
the hostname, the MySQL user name, the password, and the database name.

with con.cursor() as cur:

Using the with keyword, the Python interpreter automatically
releases the resources. It also provides error handling. We get a cursor
object, which is used to traverse records from the result set.

cur.execute('SELECT VERSION()')

We call the execute function of the cursor and execute the SQL
statement.

version = cur.fetchone()

The fetchone function fetches the next row of a query
result set, returning a single sequence, or None when no
more data is available.

print(f'Database version: {version[0]}')

We print the version of the database.

finally:

    con.close()

The pymysql module does not implement the automatic handling of the
connection resource; we need to explicitly close the connection with
close in the finally clause.

$ ./version.py
Database version: 10.3.23-MariaDB-1

## PyMySQL fetchAll

The fetchAll method retrieves all (remaining) rows of a query
result, returning them as a sequence of sequences.

fetch_all.py
  

#!/usr/bin/python

import pymysql

con = pymysql.connect('localhost', 'user7',
    's$cret', 'testdb')

try:

    with con.cursor() as cur:

        cur.execute('SELECT * FROM cities')

        rows = cur.fetchall()

        for row in rows:
            print(f'{row[0]} {row[1]} {row[2]}')

finally:

    con.close()

In the example, we retrieve all cities from the database table.

cur.execute('SELECT * FROM cities')

This SQL statement selects all data from the cities table.

rows = cur.fetchall()

The fetchall function gets all records. It returns a result set.
Technically, it is a tuple of tuples. Each of the inner tuples represent a row
in the table.

for row in rows:
    print(f'{row[0]} {row[1]} {row[2]}')

We print the data to the console, row by row.

$ ./fetch_all.py
1 Bratislava 432000
2 Budapest 1759000
3 Prague 1280000
4 Warsaw 1748000
5 Los Angeles 3971000
6 New York 8550000
7 Edinburgh 464000
8 Berlin 3671000

## PyMySQL dictionary cursor

The default cursor returns the data in a tuple of tuples. When we use a
dictionary cursor, the data is sent in a form of Python dictionaries. This way
we can refer to the data by their column names.

dictionary_cursor.py
  

#!/usr/bin/python

import pymysql
import pymysql.cursors

con = pymysql.connect(host='localhost',
        user='user7',
        password='s$cret',
        db='testdb',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)

try:

    with con.cursor() as cur:

        cur.execute('SELECT * FROM cities')

        rows = cur.fetchall()

        for row in rows:
            print(row['id'], row['name'])

finally:

    con.close()

In this example, we get the first rows of the cities table using the dictionary
cursor.

con = pymysql.connect(host='localhost',
    user='user7',
    password='s$cret',
    db='testdb',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor)

In the connect function, we pass the
pymysql.cursors.DictCursor value to the cursorclass
parameter.

for row in rows:
    print(row['id'], row['name'])

We refer to the data by column names of the cities table.

## PyMySQL column headers

Next we will show how to print column headers with the data from the database
table.

column_headers.py
  

#!/usr/bin/python

import pymysql

con = pymysql.connect('localhost', 'user7',
    's$cret', 'testdb')

try:

    with con.cursor() as cur:

        cur.execute('SELECT * FROM cities')

        rows = cur.fetchall()

        desc = cur.description

        print(f'{desc[0][0]:&lt;8} {desc[1][0]:&lt;15} {desc[2][0]:&gt;10}')

        for row in rows:
            print(f'{row[0]:&lt;8} {row[1]:&lt;15} {row[2]:&gt;10}')

finally:

    con.close()

The column names are considered to be the metadata. They are obtained from the
cursor object.

desc = cur.description

The description attribute of the cursor returns information about
each of the result columns of a query.

print(f'{desc[0][0]:&lt;8} {desc[1][0]:&lt;15} {desc[2][0]:&gt;10}')

Here we print and format the table column names.

for row in rows:
    print(f'{row[0]:&lt;8} {row[1]:&lt;15} {row[2]:&gt;10}')

We traverse and print the data.

$ ./column_headers.py 
id       name            population
1        Bratislava          432000
2        Budapest           1759000
3        Prague             1280000
4        Warsaw             1748000
5        Los Angeles        3971000
6        New York           8550000
7        Edinburgh           464000
8        Berlin             3671000

## PyMySQL escaping parameters

The parameters passed to the execute method are escaped for 
security reasons; this is to prevent SQL injection attacks.

escaped.py
  

#!/usr/bin/python

import pymysql

con = pymysql.connect('localhost', 'user7', 
    's$cret', 'testdb')

# user input
myid = 4

try: 

    with con.cursor() as cur:

            
        cur.execute('SELECT * FROM cities WHERE id=%s', myid) 
        
        cid, name, population  = cur.fetchone()
        print(cid, name, population)

finally:

    con.close()

In the example, we get the row with the specified Id.

cur.execute('SELECT * FROM cities WHERE id=%s', myid) 

We use a placeholder identified by the %s marker.
Before the SQL statement is executed, the values are bound to their
placeholders.

$ ./escaped.py 
4 Warsaw 1748000

## PyMySQL affected rows

The rowcount is a read-only cursor attribute which specifies the
number of rows that was produced by the the last  SELECT, UPDATE, or
INSERT statement.

affected_rows.py
  

#!/usr/bin/python

import pymysql

con = pymysql.connect('localhost', 'user7',
   's$cret', 'testdb')

try:

    with con.cursor() as cur:

        cur.execute('SELECT * FROM cities WHERE id IN (1, 2, 3)')

        print(f'The query affected {cur.rowcount} rows')

finally:

    con.close()

In the example, we have a SELECT statement that selects three rows.

print(f'The query affected {cur.rowcount} rows')

We build a message that shows the number of affected rows.

$ ./affected_rows.py
The query affected 3 rows

## PyMySQL insert row

A new row is inserted with the INSERT INTO SQL statement.

insert_row.py
  

#!/usr/bin/python

import pymysql

con = pymysql.connect('localhost', 'user7', 
    's$cret', 'testdb')

city = (9, 'Kiev', 2887000)

try: 

    with con.cursor() as cur:

        cur.execute('INSERT INTO cities VALUES(%s, %s, %s)', 
            (city[0], city[1], city[2])) 
        con.commit()

        print('new city inserted')

finally:

    con.close()

In the example, we insert a new city into the table.

cur.execute('INSERT INTO cities VALUES(%s, %s, %s)', 
    (city[0], city[1], city[2])) 
con.commit()

In pymysql, the autocommit is off by default. We need to call 
commit to execute the changes.

## Source

[PyMySQL documentation](https://pymysql.readthedocs.io/en/latest/)

In this article we have have been programming MySQL database in Python
with PyMySQL module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).