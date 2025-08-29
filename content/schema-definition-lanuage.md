+++
title = "Schema Definition Lanuage"
date = 2025-08-29T19:52:52.532+01:00
draft = false
description = "In this part of the SQLAlchemy tutorial, we describe the Schema Definition language of SQLAlchemy."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../rawsql/)
[Next](../exprlang/)

# Schema Definition Lanuage

last modified July 6, 2020 

In this part of the SQLAlchemy tutorial, we describe
the Schema Definition Language of SQLAlchemy.

SQLAlchemy schema metadata is a comprehensive system of describing and inspecting 
database schemas. The core of SQLAlchemy's query and object mapping operations is 
supported by database metadata.

Metadata is information about the data in the database; for instance information about the tables
and columns, in which we store data.

## Representing a table

The Table class is used to represent a database 
table.

schema.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import (create_engine, Table, Column, Integer, 
    String, MetaData)
    
meta = MetaData()
cars = Table('Cars', meta,
     Column('Id', Integer, primary_key=True),
     Column('Name', String),
     Column('Price', Integer)
)

print "The Name column:"
print cars.columns.Name
print cars.c.Name

print "Columns: "
for col in cars.c:
    print col
    
print "Primary keys:"
for pk in cars.primary_key:
    print pk    

print "The Id column:"
print cars.c.Id.name
print cars.c.Id.type
print cars.c.Id.nullable
print cars.c.Id.primary_key

In the example, we use the Schema Definition Language to describe 
a simple table.

from sqlalchemy import (create_engine, Table, Column, Integer, 
    String, MetaData)

The Table, Column, Integer,
String, and MetaData are classes needed for
the table definition.

meta = MetaData()

The MetaData is a container of Table objects
as well as an optional binding to an engine or connection.

cars = Table('Cars', meta,
     Column('Id', Integer, primary_key=True),
     Column('Name', String),
     Column('Price', Integer)
)

We create a metadata definition of a Cars table. The table
has three columns, defined with the Column class.
The datatypes of columns are defined with the Integer
and String classes.

print cars.columns.Name
print cars.c.Name

We access the Name column. The columns are available through
the columns or c property.

for col in cars.c:
    print col

In this for loop, we print all the column names of the table.

for pk in cars.primary_key:
    print pk    

We print primary keys in the table.

print cars.c.Id.name
print cars.c.Id.type
print cars.c.Id.nullable
print cars.c.Id.primary_key

Here we print four properties of the Id column:
its name, type, whether it is nullable and whether
it has a primary key.

$ ./schema.py 
The Name column:
Cars.Name
Cars.Name
Columns: 
Cars.Id
Cars.Name
Cars.Price
Primary keys:
Cars.Id
The Id column:
Id
INTEGER
False
True

This is the output of the example.

## The reflect() method

The reflect method automatically creates Table entries in 
the MetaData object for any table available in the database but not yet 
present in the MetaData.

schema_reflect.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import (create_engine, Table, Column, Integer, 
    String, MetaData)
    
eng = create_engine("mysql://testuser:test623@localhost/testdb")

meta = MetaData()
meta.reflect(bind=eng)

for table in meta.tables:
    print table

In the example, we use the reflect method to print
all the table names in the database.

meta = MetaData()
meta.reflect(bind=eng)

The reflect method is bound to the created engine.
The MetaData is filled with Table objects.

for table in meta.tables:
    print table

The Table objects are accessible through tables
property, which is a dictionary of Table objects. The table
names are keys of the dictionary.

$ ./schema_reflect.py 
Images
Cars
Books
Testing
Authors

This is the output of the example.

## Inspector

The *Inspector* performs low-level database schema inspection.
An Inspector is created with the inspect method.

schema_inspector.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine, inspect
    
eng = create_engine("mysql://testuser:test623@localhost/testdb")
    
insp = inspect(eng)
print insp.get_table_names()
print insp.get_columns("Cars")
print insp.get_primary_keys("Cars")    
print insp.get_schema_names()

In the example, we do some metadata reflection using the inspector.

insp = inspect(eng)

The inspector object is created with the inspect method.
The method takes an engine as a parameter.

print insp.get_table_names()

The get_table_names gets the names of the available
tables.

print insp.get_columns("Cars")

The get_columns gets the names of the columns
of the Cars table.

print insp.get_primary_keys("Cars")

The get_primary_keys gets the primary keys
of the Cars table.

print insp.get_schema_names()

The get_schema_names returns all the schema names.

$ ./schema_inspector.py 
[u'Authors', u'Books', u'Cars', u'Images', u'Testing']
[{'default': None, 'autoincrement': False, 'type': INTEGER(display_width=11), 'name': u'Id', 'nullable': False}, 
{'default': None, 'type': TEXT(), 'name': u'Name', 'nullable': True}, 
{'default': None, 'autoincrement': False, 'type': INTEGER(display_width=11), 'name': u'Price', 'nullable': True}]
[u'Id']
['information_schema', 'testdb']

This is the output of the example.

This part of the SQLAlchemy tutorial was dedicated to schema metadata.

[Contents](..)
[Previous](../rawsql/)
[Next](../exprlang/)