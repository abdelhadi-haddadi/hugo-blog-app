+++
title = "pyDAL"
date = 2025-08-29T20:09:58.239+01:00
draft = false
description = "pyDAL tutorial shows how to use the pyDAL database abstraction layer to program databases in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# pyDAL

last modified January 29, 2024

The pyDAL tutorial shows how to use the pyDAL database abstraction layer 
to program databases in Python. We use SQLite in our code examples.

## pyDAL

*pyDAL* is a pure Python Database Abstraction Layer. The pyDAL 
module dynamically generates the SQL in the specified dialect for the 
database back end. The resulting code will be portable among 
different types of databases.

## pyDAL installation

$ sudo pip3 install pyDAL

We use the pip3 tool to install pyDAL.

## pyDAL create database table

In the following example, we create a database table.

create_table.py
  

#!/usr/bin/python

from pydal import DAL, Field

db = DAL('sqlite://test.db', folder='dbs')

try:
    db.define_table('cars', Field('name'), Field('price', type='integer'))
    db.cars.insert(name='Audi', price=52642)
    db.cars.insert(name='Skoda', price=9000)
    db.cars.insert(name='Volvo', price=29000)
    db.cars.insert(name='Bentley', price=350000)
    db.cars.insert(name='Citroen', price=21000)
    db.cars.insert(name='Hummer', price=41400)
    db.cars.insert(name='Volkswagen', price=21600)

finally:

    if db:
        db.close()

The example creates a cars table with seven rows.

db = DAL('sqlite://test.db', folder='dbs')

DAL represents a database connection. It takes a database
connection string as the first parameter. We connect to an SQLite database.

db.define_table('cars', Field('name'), Field('price', type='integer'))

A database table is defined with define_table. It is 
created if it does not exist. It has two fields: name and price. An id 
field is automatically generated.

db.cars.insert(name='Audi', price=52642)

We insert a new row into the table with insert. The method
is called on the cars table of a db connection.

$ ls dbs
c95cf9bab36fcb04c2424cdf9be0f6e3_cars.table  sql.log  test.db

In addition to the test.db database, we have a migration
file with the .table extension and a log file. 

## pyDAL drop table

A database table is removed with drop.

drop_table.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    cars = db.define_table('cars', Field('name'), Field('price', 'integer'))

    cars.drop()

finally:

    if db:
        db.close() 

In the example, we delete the cars table using the drop
method.

## pyDAL select rows

Table rows are selected with select.

select_all_rows.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    db.define_table('cars', Field('name'), Field('price'))

    rows = db().select(db.cars.ALL)

    for row in rows:
        print("{} {} {}".format(row['id'], row['name'], row['price']))

finally:

    if db:
        db.close()      

In the example, we retrieve all rows from the cars table.

rows = db().select(db.cars.ALL)

We fetch all rows with the select method. 
The db.cars.ALL tells to select all columns from the table.

for row in rows:
    print("{} {} {}".format(row['id'], row['name'], row['price']))

We go throught each of the rows and print its fields.

$ ./select_all_cars.py 
1 Audi 52642
2 Skoda 9000
3 Volvo 29000
4 Bentley 350000
5 Citroen 21000
6 Hummer 41400
7 Volkswagen 21600

## pyDAL ordering

The following example shows how to order data with pyDAL.

order_by.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db')
    db.define_table('cars', Field('name'), Field('price', 'integer'))

    rows = db(db.cars).select(orderby=db.cars.price)

    for row in rows:
        print("{} {} {}".format(row['id'], row['name'], row['price']))

    print("**************************************")        

    rows = db(db.cars).select(orderby=~db.cars.price)

    for row in rows:
        print("{} {} {}".format(row['id'], row['name'], row['price']))

finally:

    if db:
        db.close()         

The example prints all rows from the table and orders them by price
in ascending and descending order.

rows = db(db.cars).select(orderby=db.cars.price)

Ordering is done with the orderby parameter of the 
select method.

rows = db(db.cars).select(orderby=~db.cars.price)

To order by descending order, we use the tilda character.

$ ./order_by.py 
5 Citroen 21000
7 Volkswagen 21600
3 Volvo 29000
4 Bentley 350000
6 Hummer 41400
1 Audi 52642
2 Skoda 9000
**************************************
2 Skoda 9000
1 Audi 52642
6 Hummer 41400
4 Bentley 350000
3 Volvo 29000
7 Volkswagen 21600
5 Citroen 21000

## pyDAL limit data output

The data output can be limited with limitby parameter
of the select method.

limit_by.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    db.define_table('cars', Field('name'), Field('price', 'integer'))

    rows = db(db.cars).select(limitby=(2, 5))

    for row in rows:
        print("{} {} {}".format(row['id'], row['name'], row['price']))

finally:

    if db:
        db.close() 

In the code example, we limit the output to three rows with offset 2.

$ ./limit_by.py 
3 Volvo 29000
4 Bentley 350000
5 Citroen 21000

## pyDAL count rows

With count, we can get the number of rows in the table.

count_rows.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    db.define_table('cars', Field('name'), Field('price', 'integer'))

    n = db(db.cars.id).count()

    print("There are {} rows in the table".format(n))

finally:

    if db:
        db.close()     

In the example, we print the number of rows in the cars
table.

$ ./count_rows.py 
There are 7 rows in the table

We have seven rows in the table.

## pyDAL JSON output

We can get the data in JSON format with as_json.

json_output.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    db.define_table('cars', Field('name'), Field('price', 'integer'))

    rows = db(db.cars).select()
    print(rows.as_json())

finally:

    if db:
        db.close()        

The example shows all rows in JSON format.

$ ./json_output.py 
[{"id": 1, "price": 52642, "name": "Audi"}, 
{"id": 2, "price": 9000, "name": "Skoda"}, 
{"id": 3, "price": 29000, "name": "Volvo"}, 
{"id": 4, "price": 350000, "name": "Bentley"}, 
{"id": 5, "price": 21000, "name": "Citroen"}, 
{"id": 6, "price": 41400, "name": "Hummer"}, 
{"id": 7, "price": 21600, "name": "Volkswagen"}]

## pyDAL last SQL

The SQL that was last executed by pyDAL can be found with 
_lastsql.

lastsql.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    db.define_table('cars', Field('name'), Field('price', 'integer'))

    # we ignore the result
    db(db.cars.id).select(db.cars.name, db.cars.price)

    print(db._lastsql)

finally:

    if db:
        db.close()      

In the example, we print the SQL executed by pyDAL when doing a select
statement.

$ ./lastsql.py 
('SELECT "cars"."name", "cars"."price" FROM "cars" WHERE ("cars"."id" IS NOT NULL);', 0.0005686283111572266)

This SQL was generated by pyDAL.

## pyDAL execute raw SQL

We can execute raw SQL with the executesql method.

raw_sql.py
  

#!/usr/bin/python

from pydal import DAL, Field

try:

    db = DAL('sqlite://test.db', folder='dbs')
    db.define_table('cars', Field('name'), Field('price', 'integer'))

    data = db.executesql('SELECT * FROM cars WHERE id=6')[0]

    print(data)

finally:

    if db:
        db.close() 

In the example, we execute an SQL SELECT statement with executesql.

$ ./raw_sql.py 
(6, 'Hummer', '41400')

## Source

[Python pyDAL documentation](https://pydal.readthedocs.io/en/latest/)

In this article we have used pyDAL to work with an SQLite database.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).