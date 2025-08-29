+++
title = "Python SQLite"
date = 2025-08-29T20:10:26.518+01:00
draft = false
description = "Python SQLite tutorial shows how to create database programs in Python and SQLite database. We work with the sqlite3 module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python SQLite

last modified January 29, 2024

This is a Python programming tutorial for the SQLite database. It covers the
basics of SQLite programming with the Python language. ZetCode has a complete
*e-book* for Python SQLite: [Python SQLite e-book](/ebooks/sqlitepython/).

Source code for the examples is available at the author's 
[https://github.com/janbodnar/Python-SQLite-Examples](https://github.com/janbodnar/Python-SQLite-Examples)
repository.

To work with this tutorial, we must have Python language, SQLite database,
pysqlite language binding and the sqlite3 command line tool
installed on the system.

For working with the SQLite database, we can install the sqlite3
or the SQLite browser GUI.

$ python
Python 3.9.0 (default, Oct  5 2020, 20:56:51)
[GCC 10.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
&gt;&gt;&gt; import sqlite3
&gt;&gt;&gt; sqlite3.version
'2.6.0'
&gt;&gt;&gt; sqlite3.sqlite_version
'3.33.0'

In the shell, we launch the Python interactive interpreter. We can see the
Python version. In our case it is Python 3.9.0. The sqlite.version
is the version of the pysqlite 2.6.0, which is the binding of the
Python language to the SQLite database. The sqlite3.sqlite_version
gives us the version of the SQLite database library. In our case the version is
3.33.0.

## SQLite

SQLite is an embedded relational database engine. The documentation calls
it a self-contained, serverless, zero-configuration and transactional SQL
database engine. It is very popular with hundreds of millions
copies worldwide in use today. Several programming languages have built-in
support for SQLite including Python and PHP.

## Creating SQLite database

Now we are going to use the sqlite3 command line tool to create
a new database.

$ sqlite3 ydb.db
SQLite version 3.33.0 2020-08-14 13:23:32
Enter ".help" for usage hints.
sqlite&gt;

We provide a parameter to the sqlite3 tool; ydb.db is
a database name. It is a file on our disk. If it is present, it is opened. If
not, it is created.

sqlite&gt; .tables
sqlite&gt; .exit
$ ls
ydb.db

The .tables command gives a list of tables in the ydb.db
database. There are currently no tables. The .exit command
terminates the interactive session of the sqlite3 command line tool.
The ls Unix command shows the contents of the current working
directory. We can see the ydb.db file. All data will be stored
in this single file.

## Python SQLite version example

In the first code example, we will get the version of the SQLite database.

version.py
  

#!/usr/bin/python

import sqlite3
import sys

con = None

try:
    con = sqlite3.connect('ydb.db')

    cur = con.cursor()
    cur.execute('SELECT SQLITE_VERSION()')

    data = cur.fetchone()[0]

    print(f"SQLite version: {data}")

except sqlite3.Error as e:

    print(f"Error {e.args[0]}")
    sys.exit(1)

finally:

    if con:
        con.close()

In the above Python script we connect to the previously created
ydb.db database. We execute an SQL statement which returns the
version of the SQLite database.

import sqlite3

We import the sqlite3 module.

con = None

We initialise the con variable to None. In case we
could not create a connection to the database (for example the disk is full), we
would not have a connection variable defined. This would lead to an error in the
finally clause.

con = sqlite3.connect('ydb.db')

We connect to the ydb.db database. The connect
method returns a connection object.

cur = con.cursor()
cur.execute('SELECT SQLITE_VERSION()')

From the connection, we get the cursor object. The cursor is used to traverse
the records from the result set. We call the execute method of
the cursor and execute the SQL statement.

data = cur.fetchone()[0]

We fetch the data. Since we retrieve only one record, we call the
fetchone method.

print(f"SQLite version: {data}")

We print the data that we have retrieved to the console.

except sqlite3.Error as e:

    print(f"Error {e.args[0]}")
    sys.exit(1)

In case of an exception, we print an error message and
exit the script with an error code 1.

finally:

    if con:
        con.close()

In the final step, we release the resources.

In the second example, we again get the version of the SQLite
database. This time we will use the with keyword.

version2.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute('SELECT SQLITE_VERSION()')

    data = cur.fetchone()[0]

    print(f"SQLite version: {data}")

The script returns the current version of the SQLite database. With the use of
the with keyword. The code is more compact.

with con:

With the with keyword, the Python interpreter
automatically releases the resources. It also provides
error handling.

$ ./version2.py
SQLite version: 3.33.0

## Python SQLite execute

We create a cars table and insert several rows to it.
We use execute.

create_table.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()

    cur.execute("DROP TABLE IF EXISTS cars;")
    cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")
    cur.execute("INSERT INTO cars VALUES(1,'Audi',52642)")
    cur.execute("INSERT INTO cars VALUES(2,'Mercedes',57127)")
    cur.execute("INSERT INTO cars VALUES(3,'Skoda',9000)")
    cur.execute("INSERT INTO cars VALUES(4,'Volvo',29000)")
    cur.execute("INSERT INTO cars VALUES(5,'Bentley',350000)")
    cur.execute("INSERT INTO cars VALUES(6,'Citroen',21000)")
    cur.execute("INSERT INTO cars VALUES(7,'Hummer',41400)")
    cur.execute("INSERT INTO cars VALUES(8,'Volkswagen',21600)")

The above script creates a cars table and inserts eight rows into
the table.

cur.execute("DROP TABLE IF EXISTS cars;")

We drop the table if it already exists.

cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")

This SQL statement creates a new cars table. The table has
three columns.

cur.execute("INSERT INTO cars VALUES(1,'Audi',52642)")
cur.execute("INSERT INTO cars VALUES(2,'Mercedes',57127)")

These two lines insert two cars into the table. Using the with
keyword, the changes are automatically committed. Otherwise, we would have
to commit them manually.

sqlite&gt; .mode column
sqlite&gt; .headers on

We verify the written data with the sqlite3 tool. First we modify
the way the data is displayed in the console. We use the column mode and turn on
the headers.

sqlite&gt; select * from cars;
id          name        price
----------  ----------  ----------
1           Audi        52642
2           Mercedes    57127
3           Skoda       9000
4           Volvo       29000
5           Bentley     350000
6           Citroen     21000
7           Hummer      41400
8           Volkswagen  21600

This is the data that we have written to the cars table.

## Python SQLite executemany

We are going to create the same table. This time using the convenience
executemany method.

create_table2.py
  

#!/usr/bin/python

import sqlite3

cars = (
    (1, 'Audi', 52642),
    (2, 'Mercedes', 57127),
    (3, 'Skoda', 9000),
    (4, 'Volvo', 29000),
    (5, 'Bentley', 350000),
    (6, 'Hummer', 41400),
    (7, 'Volkswagen', 21600)
)

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()

    cur.execute("DROP TABLE IF EXISTS cars")
    cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")
    cur.executemany("INSERT INTO cars VALUES(?, ?, ?)", cars)

The program drops the cars table if it exists and recreates it.

cur.execute("DROP TABLE IF EXISTS cars")
cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")

The first SQL statement drops the cars table if it exists. The second
SQL statement creates the cars table.

cur.executemany("INSERT INTO cars VALUES(?, ?, ?)", cars)

We insert eight rows into the table using the convenience executemany
method. The first parameter of this method is a parameterized SQL statement. The
second parameter is the data, in the form of tuple of tuples.

## Python SQLite executescript

We provide another way to create our cars table with
executescript. We commit the changes manually and provide our own
error handling.

create_table3.py
  

#!/usr/bin/python

import sqlite3
import sys

con = None

try:
    con = sqlite3.connect('ydb.db')

    cur = con.cursor()

    cur.executescript("""
        DROP TABLE IF EXISTS cars;
        CREATE TABLE cars(id INT, name TEXT, price INT);
        INSERT INTO cars VALUES(1,'Audi',52642);
        INSERT INTO cars VALUES(2,'Mercedes',57127);
        INSERT INTO cars VALUES(3,'Skoda',9000);
        INSERT INTO cars VALUES(4,'Volvo',29000);
        INSERT INTO cars VALUES(5,'Bentley',350000);
        INSERT INTO cars VALUES(6,'Citroen',21000);
        INSERT INTO cars VALUES(7,'Hummer',41400);
        INSERT INTO cars VALUES(8,'Volkswagen',21600);
        """)

    con.commit()

except sqlite3.Error as e:

    if con:
        con.rollback()

    print(f"Error {e.args[0]}")
    sys.exit(1)

finally:

    if con:
        con.close()

In the above script we (re)create the cars table using the
executescript method.

cur.executescript("""
    DROP TABLE IF EXISTS cars;
    CREATE TABLE cars(id INT, name TEXT, price INT);
    INSERT INTO cars VALUES(1,'Audi',52642);
    INSERT INTO cars VALUES(2,'Mercedes',57127);
...

The executescript method allows us to execute the whole SQL code in
one step.

con.commit()

Without the with keyword, the changes must be committed using the
commit method.

except sqlite.Error as e:

    if con:
        con.rollback()

    print(f"Error {e.args[0]}")
    sys.exit(1)

In case of an error, the changes are rolled back and an error message is printed
to the terminal.

## Python SQLite check database existence

It is not possible to check the existence of the database file using the
connect method. The method simply connects to the database, if the
given file exists. If it does not exist, the database file is created. The
existence of the database file can be checked with the standard
os.path.exist function.

db_exists.py
  

#!/usr/bin/python

import os
import sqlite3

if not os.path.exists('ydb.db'):

    con = sqlite3.connect('ydb.db')

    with con:

        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS cars")
        cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")
        cur.execute("INSERT INTO cars VALUES(1,'Audi', 52642)")
        cur.execute("INSERT INTO cars VALUES(2,'Mercedes', 57127)")
        cur.execute("INSERT INTO cars VALUES(3,'Skoda',9000)")
        cur.execute("INSERT INTO cars VALUES(4,'Volvo',29000)")
        cur.execute("INSERT INTO cars VALUES(5,'Bentley', 350000)")
        cur.execute("INSERT INTO cars VALUES(6,'Citroen',21000)")
        cur.execute("INSERT INTO cars VALUES(7,'Hummer',41400)")
        cur.execute("INSERT INTO cars VALUES(8,'Volkswagen', 21600)")

else:

    con = sqlite3.connect('ydb.db')

    with con:

        cur = con.cursor()
        cur.execute("SELECT * FROM cars")
        rows = cur.fetchmany(2)

        print(rows)

In the script we check for the existence of the ydb.db file. If it
does not exist, it is created and a new table is generated. If it already
exists, we retrieve two rows from the table.

if not os.path.exists('test.db'):

  con = sqlite3.connect('test.db')
  ...

We check for the existence of the ydb.db file using the
os.path.exists method. The database file is created if it does not
exist.

else:

  con = sqlite3.connect('ydb.db')
  ...

If the database file already exists, we connect to it and later fetch some data.

$ ls
db_exists.py
$ ./db_exists.py
$ ./db_exists.py
[(1, 'Audi', 52642), (2, 'Mercedes', 57127)]

In a directory that does not contain a ydb.db  file we launch the
script twice. On the first execution the database is created and a
cars  table is generated. On the second execution we
fetch and print two rows from the cars table.

## Python SQLite lastrowid

Sometimes, we need to determine the id of the last inserted
row. In Python SQLite, we use the lastrowid attribute
of the cursor object.

lastrowid.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect(':memory:')

with con:

    cur = con.cursor()
    cur.execute("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT);")
    cur.execute("INSERT INTO friends(name) VALUES ('Tom');")
    cur.execute("INSERT INTO friends(name) VALUES ('Rebecca');")
    cur.execute("INSERT INTO friends(name) VALUES ('Jim');")
    cur.execute("INSERT INTO friends(name) VALUES ('Robert');")

    last_row_id = cur.lastrowid

    print(f"The last Id of the inserted row is {last_row_id}")

We create a friends table in memory. The Id is automatically
incremented.

cur.execute("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT);")

In SQLite, INTEGER PRIMARY KEY column is auto incremented.
There is also an AUTOINCREMENT keyword. When used in
INTEGER PRIMARY KEY AUTOINCREMENT a slightly different algorithm
for Id creation is used.

cur.execute("INSERT INTO friends(name) VALUES ('Tom');")
cur.execute("INSERT INTO friends(name) VALUES ('Rebecca');")
cur.execute("INSERT INTO friends(name) VALUES ('Jim');")
cur.execute("INSERT INTO friends(name) VALUES ('Robert');")

When using auto-increment, we have to explicitly state the column names,
omitting the one that is auto-incremented. The four statements insert four
rows into the friends table.

last_row_id = cur.lastrowid

Using the lastrowid we get the last inserted row id.

$ ./lastrowid.py
The last Id of the inserted row is 4

We see the output of the program.

## Python SQLite retrieve data with fetchall

The fetchall method fetches all (or all remaining) rows of a query
result set and returns a list of tuples.

fetch_all.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute("SELECT * FROM cars")

    rows = cur.fetchall()

    for row in rows:
        print(f"{row[0]} {row[1]} {row[2]}")

In this example, we retrieve all data from the cars table.

cur.execute("SELECT * FROM cars")

This SQL statement selects all data from the cars table.

rows = cur.fetchall()

The fetchall method gets all records. It returns a result set.
Technically, it is a tuple of tuples. Each of the inner tuples represent a row
in the table.

for row in rows:
    print(f"{row[0]} {row[1]} {row[2]}")

We print the data to the console, row by row.

$ ./fetch_all.py
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

## Python SQLite fetchone

The fetchone returns the next row of a query result set, returning
a single tuple, or None when no more data is available.

fetch_one.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute("SELECT * FROM cars")

    while True:

        row = cur.fetchone()

        if row == None:
            break

        print(f"{row[0]} {row[1]} {row[2]}")

In this script we connect to the database and fetch the rows of the
cars table one by one.

while True:

We access the data from the while loop. When we read the last row,
the loop is terminated.

row = cur.fetchone()

if row == None:
    break

The fetchone method returns the next row from the table. If there
is no more data left, it returns None. In this case we break the
loop.

print(f"{row[0]} {row[1]} {row[2]}")

The data is returned in the form of a tuple. Here we select records from the
tuple. The first is the Id, the second is the car name and the third is the
price of the car.

$ ./fetch_one.py
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

## Python SQLite dictionary cursor

The default cursor returns the data in a tuple of tuples. When we use a
dictionary cursor, the data is sent in the form of Python dictionaries. This way
we can refer to the data by their column names.

dictionary_cursor.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    con.row_factory = sqlite3.Row

    cur = con.cursor()
    cur.execute("SELECT * FROM cars")

    rows = cur.fetchall()

    for row in rows:
        print(f"{row['id']} {row['name']} {row['price']}")

In this example, we print the contents of the cars table using the
dictionary cursor.

con.row_factory = sqlite.Row

We select a dictionary cursor. Now we can access records by the names of
columns.

for row in rows:
    print(f"{row['id']} {row['name']} {row['price']}")

The data is accessed by the column names.

## Python SQLite parameterized statements

Now we will concern ourselves with parameterized queries. When we
use parameterized queries, we use placeholders instead of directly
writing the values into the statements. Parameterized queries increase
security and performance.

The Python sqlite3 module supports two types of placeholders:
question marks and named placeholders.

### Parameterized statements with question marks

In the first example we use the syntax of question marks.

parameterized_query.py
  

#!/usr/bin/python

import sqlite3

uId = 1
uPrice = 62300

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute("UPDATE cars SET price=? WHERE id=?", (uPrice, uId))

    print(f"Number of rows updated: {cur.rowcount}")

We update a price of one car. In this code example, we use the question
mark placeholders.

cur.execute("UPDATE cars SET price=? WHERE id=?", (uPrice, uId))

The question marks ? are placeholders for values. The values are
added to the placeholders.

print(f"Number of rows updated: {cur.rowcount}")

The rowcount property returns the number of updated
rows. In our case one row was updated.

### Parameterized statements with named placeholders

The second example uses parameterized statements with
named placeholders.

named_placeholders.py
  

#!/usr/bin/python

import sqlite3

uId = 4

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute("SELECT name, price FROM cars WHERE Id=:Id", {"Id": uId})

    row = cur.fetchone()
    print(f"{row[0]}, {row[1]}")

We select a name and a price of a car using named placeholders.

cur.execute("SELECT name, price FROM cars WHERE Id=:Id", {"Id": uId})

The named placeholders start with a colon character.

## Python SQLite insert image

In this section, we are going to insert an image to the SQLite database. Note
that some people argue against putting images into databases. Here we only show
how to do it. We do not dwell into technical issues of whether to save images in
databases or not.

sqlite&gt; CREATE TABLE images(id INTEGER PRIMARY KEY, data BLOB);

For this example, we create a new table called images. For the images, we use
the BLOB data type, which stands for Binary Large Objects.

insert_image.py
  

#!/usr/bin/python

import sqlite3
import sys

def readImage():

    fin = None

    try:
        fin = open("sid.jpg", "rb")
        img = fin.read()
        return img

    except IOError as e:

        print(e)
        sys.exit(1)

    finally:

        if fin:
            fin.close()

con = None

try:
    con = sqlite3.connect('ydb.db')

    cur = con.cursor()

    data = readImage()
    binary = sqlite3.Binary(data)
    cur.execute("INSERT INTO images(data) VALUES (?)", (binary,) )

    con.commit()

except sqlite3.Error as e:

    if con:
        con.rollback()

    print(e)
    sys.exit(1)

finally:

    if con:
        con.close()

In this script, we read an image from the current working directory and write it
into the images table of the SQLite ydb.db database.

try:
    fin = open("sid.jpg", "rb")
    img = fin.read()
    return img

We read binary data from the filesystem. We have a JPG image called
sid.jpg.

binary = sqlite3.Binary(data)

The data is encoded using the SQLite Binary object.

cur.execute("INSERT INTO images(data) VALUES (?)", (binary,) )

This SQL statement is used to insert the image into the database.

## Python SQLite read image

In this section, we are going to perform the reverse operation: we read an image
from the database table.

read_image.py
  

#!/usr/bin/python

import sqlite3
import sys

def writeImage(data):

    fout = None

    try:
        fout = open('sid2.jpg','wb')
        fout.write(data)

    except IOError as e:

        print(e)
        sys.exit(1)

    finally:

        if fout:
            fout.close()

con = None

try:
    con = sqlite3.connect('ydb.db')

    cur = con.cursor()
    cur.execute("SELECT data FROM images LIMIT 1")
    data = cur.fetchone()[0]

    writeImage(data)

except sqlite3.Error as e:

    print(e)
    sys.exit(1)

finally:

    if con:
        con.close()

We read image data from the images table and write it
to another file, which we call sid2.jpg.

try:
    fout = open('sid2.jpg','wb')
    fout.write(data)

We open a binary file in a writing mode. The data from the database is written
to the file.

cur.execute("SELECT data FROM images LIMIT 1")
data = cur.fetchone()[0]

These two lines select and fetch data from the images table. We
obtain the binary data from the first row.

## Python SQLite metadata

Metadata is information about the data in the database.
Metadata in a SQLite contains information about the tables
and columns, in which we store data. Number of rows affected
by an SQL statement is a metadata. Number of rows and columns returned
in a result set belong to metadata as well.

Metadata in SQLite can be obtained using the PRAGMA command.
SQLite objects may have attributes, which are metadata. Finally, we can
also obtain specific metatada from querying the SQLite system
sqlite_master table.

column_names.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()

    cur.execute('PRAGMA table_info(cars)')

    data = cur.fetchall()

    for d in data:
        print(f"{d[0]} {d[1]} {d[2]}")

In this example, we issue the PRAGMA table_info(tableName) command,
to get some metadata info about our cars table.

cur.execute('PRAGMA table_info(cars)')

The PRAGMA table_info(tableName) command returns one row for each
column in the cars table. Columns in the result set include the
column order number, column name, data type, whether or not the column can be
NULL, and the default value for the column.

for d in data:
    print(f"{d[0]} {d[1]} {d[2]}")

From the provided information, we print the column order number, column name
and column data type.

$ ./column_names.py
0 id INT
1 name TEXT
2 price INT

In the following example we print all rows from the cars table with
their column names.

column_names2.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute('SELECT * FROM cars')

    col_names = [cn[0] for cn in cur.description]

    rows = cur.fetchall()

    print(f"{col_names[0]:3} {col_names[1]:10} {col_names[2]:7}")

    for row in rows:
        print(f"{row[0]:&lt;3} {row[1]:&lt;10} {row[2]:7}")

We print the contents of the cars table to the console. Now, we
include the names of the columns too. The records are aligned with the column
names.

col_names = [cn[0] for cn in cur.description]

We get the column names from the description property
of the cursor object.

print(f"{col_names[0]:3} {col_names[1]:10} {col_names[2]:7}")

This line prints three column names of the cars table.

for row in rows:
    print(f"{row[0]:&lt;3} {row[1]:&lt;10} {row[2]:7}")

We print the rows using the for loop. The data is aligned with the column names.

$  ./column_names2.py
id  name       price
1   Audi         62300
2   Mercedes     57127
3   Skoda         9000
4   Volvo        29000
5   Bentley     350000
6   Hummer       41400
7   Volkswagen   21600

In our last example related to the metadata, we will
list all tables in the ydb.db database.

list_tables.py
  

#!/usr/bin/python

import sqlite3

con = sqlite3.connect('ydb.db')

with con:

    cur = con.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")

    rows = cur.fetchall()

    for row in rows:
        print(row[0])

The code example prints all available tables in the current database to the
terminal.

cur.execute("SELECT name FROM sqlite_master WHERE type='table'")

The table names are stored inside the system sqlite_master table.

$ ./list_tables.py
cars
images

These were the tables on our system.

## Python SQLite data export

We can dump data in an SQL format to create a simple backup of
our database tables.

export_table.py
  

#!/usr/bin/python

import sqlite3

cars = (
    (1, 'Audi', 52643),
    (2, 'Mercedes', 57642),
    (3, 'Skoda', 9000),
    (4, 'Volvo', 29000),
    (5, 'Bentley', 350000),
    (6, 'Hummer', 41400),
    (7, 'Volkswagen', 21600)
)

def writeData(data):

    f = open('cars.sql', 'w')

    with f:
        f.write(data)

con = sqlite3.connect(':memory:')

with con:

    cur = con.cursor()

    cur.execute("DROP TABLE IF EXISTS cars")
    cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")
    cur.executemany("INSERT INTO cars VALUES(?, ?, ?)", cars)
    cur.execute("DELETE FROM cars WHERE price &lt; 30000")

    data = '\n'.join(con.iterdump())

    writeData(data)

In the above example, we recreate the cars table in the memory. We
delete some rows from the table and dump the current state of the table into a
cars.sql file. This file can serve as a current backup of the
table.

def writeData(data):

    f = open('cars.sql', 'w')

    with f:
        f.write(data)

The data from the table is being written to the file.

con = sqlite3.connect(':memory:')

We create a temporary table in the memory.

cur.execute("DROP TABLE IF EXISTS cars")
cur.execute("CREATE TABLE cars(id INT, name TEXT, price INT)")
cur.executemany("INSERT INTO cars VALUES(?, ?, ?)", cars)
cur.execute("DELETE FROM cars WHERE price &lt; 30000")

These lines create a cars table, insert values and delete rows,
where the price is less than 30000 units.

data = '\n'.join(con.iterdump())

The con.iterdump returns an iterator to dump the database in an
SQL text format. The built-in join function takes the iterator and
joins all the strings in the iterator separated by a new line. This data is
written to the cars.sql file in the
writeData function.

$ cat cars.sql
BEGIN TRANSACTION;
CREATE TABLE cars(id INT, name TEXT, price INT);
INSERT INTO "cars" VALUES(1,'Audi',52643);
INSERT INTO "cars" VALUES(2,'Mercedes',57642);
INSERT INTO "cars" VALUES(5,'Bentley',350000);
INSERT INTO "cars" VALUES(6,'Hummer',41400);
COMMIT;

The contents of the dumped in-memory cars table.

## Python SQLite import data

Now we are going to perform a reverse operation. We will import
the dumped table back into memory.

import_table.py
  

#!/usr/bin/python

import sqlite3

def readData():

    f = open('cars.sql', 'r')

    with f:

        data = f.read()

        return data

con = sqlite3.connect(':memory:')

with con:

    cur = con.cursor()

    sql = readData()
    cur.executescript(sql)

    cur.execute("SELECT * FROM cars")

    rows = cur.fetchall()

    for row in rows:
        print(row)

In this script, we read the contents of the cars.sql file
and execute it. This will recreate the dumped table.

def readData():

    f = open('cars.sql', 'r')

    with f:

        data = f.read()

        return data

Inside the readData method we read the contents of
the cars.sql table.

cur.executescript(sql)

We call the executescript method to launch the SQL script.

cur.execute("SELECT * FROM cars")

rows = cur.fetchall()

for row in rows:
    print(row)

We verify the data.

$ ./import_table.py
(1, 'Audi', 52643)
(2, 'Mercedes', 57642)
(5, 'Bentley', 350000)
(6, 'Hummer', 41400)

The output shows that we have successfully recreated the saved cars table.

## Python SQLite transactions

A transaction is an atomic unit of database operations against the data in one
or more databases. The effects of all the SQL statements in a transaction can be
either all committed to the database or all rolled back.

 Python sqlite3 module by default issues a BEGIN statement
implicitly before a Data Modification Language (DML) statement
(i.e. INSERT/UPDATE/DELETE/REPLACE).

The sqlite3 used to implicitly commit an open transaction before
DDL statements. This is no longer the case.

Manual transactions are started with the BEGIN TRANSACTION statement
and finished with the COMMIT or ROLLBACK statements.

SQLite supports three non-standard transaction levels: DEFERRED,
IMMEDIATE and EXCLUSIVE. Python SQLite module
also supports an autocommit mode, where  all changes to the tables are immediately
effective.

no_commit.py
  

#!/usr/bin/python

import sqlite3
import sys

con = None

try:
    con = sqlite3.connect('ydb.db')
    
    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS friends")
    cur.execute("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)")
    cur.execute("INSERT INTO friends(name) VALUES ('Tom')")
    cur.execute("INSERT INTO friends(name) VALUES ('Rebecca')")
    cur.execute("INSERT INTO friends(name) VALUES ('Jim')")
    cur.execute("INSERT INTO friends(name) VALUES ('Robert')")

    #con.commit()

except sqlite3.Error as e:

    if con:
        con.rollback()

    print(e)
    sys.exit(1)

finally:

    if con:
        con.close()

We create a friends table and try to fill it with data. However, as
we will see, the data is not committed.

#con.commit()

The commit method is commented. If we uncomment the line, the data
will be written to the table.

sqlite&gt; .tables
cars     friends  images
sqlite&gt; SELECT COUNT(id) FROM friends;
COUNT(id)
----------
0
sqlite&gt;

The table is created but the data is not written to the
table.

### Python SQLite autocommit

In the autocommit mode, an SQL statement is executed immediately.

autocommit.py
  

#!/usr/bin/python

import sqlite3
import sys

con = None

try:
    con = sqlite3.connect('ydb.db', isolation_level = None)
    
    cur = con.cursor()

    cur.execute("DROP TABLE IF EXISTS friends")
    cur.execute("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)")
    cur.execute("INSERT INTO friends(name) VALUES ('Tom')")
    cur.execute("INSERT INTO friends(name) VALUES ('Rebecca')")
    cur.execute("INSERT INTO friends(name) VALUES ('Jim')")
    cur.execute("INSERT INTO friends(name) VALUES ('Robert')")

except sqlite3.Error as e:

    print(e)
    sys.exit(1)

finally:

    if con:
        con.close()

In this example, we connect to the database in the autocommit mode.

con = sqlite3.connect('ydb.db', isolation_level = None)

We have an autocommit mode, when we set the isolation_level to
None.

$ ./autocommit.py

sqlite&gt; SELECT * FROM friends;
id          name
----------  ----------
1           Tom
2           Rebecca
3           Jim
4           Robert

The data was successfully committed to the friends table.

## Source

[Python sqlite3 — DB-API 2.0 interface for SQLite](https://docs.python.org/3/library/sqlite3.html)

This was Python SQLite tutorial.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).