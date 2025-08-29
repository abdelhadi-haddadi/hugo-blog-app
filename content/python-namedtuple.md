+++
title = "Python namedtuple"
date = 2025-08-29T20:08:57.803+01:00
draft = false
description = "Python namedtuple tutorial shows how to work with namedtuples in Python. The Python namedtuple is an immutable container type, whose values can be accessed with indexes and named attributes."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python namedtuple

last modified January 29, 2024

Python namedtuple tutorial shows how to work with namedtuples in Python. 

## Python namedtuple

Python namedtuple is an immutable container type, whose values can be accessed
with indexes and named attributes. It has functionality like tuples with 
additional features. A named tuple is created with the collections.namedtuple
factory function.

Named tuples are essentially easy-to-create, immutable, lightweight object types.
Named tuples can be used to make the code more clean and Pythonic. They
are similar to records in other languages (C#, Java).

## Python namedtuple basic example

The following is a simple example with a namedtuple.

basic.py
  

#!/usr/bin/python

from collections import namedtuple

City = namedtuple('City' , 'name population')

c1 = City('Bratislava', 432000)
c2 = City('Budapest', 1759000)

print(c1)
print(c2)

The example create city namedtuples.

from collections import namedtuple

First, we import the namedtuple type from the collections
module.

City = namedtuple('City' , 'name population')

We define the namedtuple. The first argument is the name for the namedtuple. The second 
argument are the field names. These can be specified in a string 'name population' or 
in a list ['name', 'population'].

c1 = City('Bratislava', 432000)
c2 = City('Budapest', 1759000)

Here we create two namedtuple objects.

$ ./basic.py 
City(name='Bratislava', population=432000)
City(name='Budapest', population=1759000)

## Python namedtuple accessing

The namedtuples can be accessed using indexing and their named 
attributes.

accessing.py
  

#!/usr/bin/python

from collections import namedtuple

City = namedtuple('City' , 'name population')

c1 = City('Bratislava', 432000)
c2 = City('Budapest', 1759000)

print(c1[0])
print(c1[1])

print(c2.name)
print(c2.population)

In the example, we demonstrate both ways.

$ ./accessing.py 
Bratislava
432000
Budapest
1759000

## Python namedtuple unpacking

The unpacking is storing iterable elements into variables or function 
arguments.

unpacking.py
  

#!/usr/bin/python

from collections import namedtuple

City = namedtuple('City' , 'name population')

c1 = City('Bratislava', 432000)
c2 = City('Budapest', 1759000)

name, population = c1
print(f'{name}: {population}')

print('----------------------')

print(c2)
print(*c2, sep=': ')

In the example, we unpack our namedtuples.

name, population = c1

Here we unpack the c1 namedtuple into two variables.

print(*c2, sep=': ')

Here we unpack the c2 namedtuple with the * operator 
into print function arguments, which are joined with the given
separator into the final output.

$ ./unpacking.py 
Bratislava: 432000
----------------------
City(name='Budapest', population=1759000)
Budapest: 1759000

unpacking2.py
  

```
#!/usr/bin/python

from collections import namedtuple

City = namedtuple('City' , 'name population')

d = { 'name': 'Bratislava', 'population': 432000}

c = City(**d)
print(c)

```

With the ** operator, we can unpack a dictionary 
into arguments of a namedtuple.

## Python namedtuple subclassing

Since namedtuples are built on top of regular classes, we can  
add functionality to them.

subclassing.py
  

#!/usr/bin/python

from collections import namedtuple
from math import sqrt

class Point(namedtuple('Point', 'x y')):

    __slots__ = ()

    @property
    def hypot(self):
        return sqrt((self.x ** 2 + self.y ** 2))

    def __str__(self):
        return f'Point: x={self.x}  y={self.y}  hypot={self.hypot}'

p = Point(5, 5)
print(p.hypot)
print(p)

We have a Point namedtuple. We add the hypot property 
to it.

$ ./subclassing.py 
7.0710678118654755
Point: x=5  y=5  hypot=7.0710678118654755

## Python typing.NamedTuple

Since Python 3.6, we can use the typing.NamedTuple to 
create a namedtuple.

named_tuple.py
  

#!/usr/bin/python

from typing import NamedTuple

class City(NamedTuple):
    name: str
    population: int

c1 = City('Bratislava', 432000)
c2 = City('Budapest', 1759000)

print(c1)
print(c2)

In the example, we have a City class that inherits from the 
typing.NamedTuple. The attributes have typehints.

## Python namedtuple defaults

The defaults parameter can be used to provide default 
values to fields.

defaults.py
  

#!/usr/bin/python

from collections import namedtuple
from math import sqrt

class Point(namedtuple('Point', 'x y', defaults=[1, 1])):

    __slots__ = ()

    @property
    def hypot(self):
        return sqrt((self.x ** 2 + self.y ** 2))

    def __str__(self):
        return f'Point: x={self.x}  y={self.y}  hypot={self.hypot}'

p1 = Point(5, 5)
print(p1)

p2 = Point()
print(p2)

The default value for x and y is 1. 

$ ./defaults.py 
Point: x=5  y=5  hypot=7.0710678118654755
Point: x=1  y=1  hypot=1.4142135623730951

## Python namedtuple helpers

Python provides several helper methods for a namedtuple.

helpers.py
  

#!/usr/bin/python

from typing import NamedTuple

class Point(NamedTuple):

    x: int = 1
    y: int = 1

p = Point(5, 5)

print(p._fields)
print(p._field_defaults)
print(p._asdict())

The _fields is a tuple of strings listing the field names.
The _field_defaults is a dictionary mapping field names to 
default values. The _asdict method returns a new ordered dictionary, 
which maps field names to their corresponding values.

$ ./helpers.py 
('x', 'y')
{'x': 1, 'y': 1}
OrderedDict([('x', 5), ('y', 5)])

## Python namedtuple - serialize to JSON

The _asdict method can be used to serialize namedtuples into 
JSON format.

json_output.py
  

#!/usr/bin/python

from typing import NamedTuple
import json

class City(NamedTuple):
    name: str
    population: int

c1 = City('Bratislava', 432000)
c2 = City('Budapest', 1759000)
c3 = City('Prague', 1280000)
c4 = City('Warsaw', 1748000)

cities = [c1, c2, c3, c4]

print(json.dumps(c1._asdict()))

json_string = json.dumps([city._asdict() for city in cities])
print(json_string)

With the help of the json.dumps method, we serialize 
a single city and a list of cities.

$ ./json_output.py 
{"name": "Bratislava", "population": 432000}
[{"name": "Bratislava", "population": 432000}, {"name": "Budapest", "population": 1759000}, 
{"name": "Prague", "population": 1280000}, {"name": "Warsaw", "population": 1748000}]

## Python namedtuple sort

In the following example, we sort a list of namedtuples.

sorting.py
  

#!/usr/bin/python

from typing import NamedTuple

class City(NamedTuple):
    id: int
    name: str
    population: int

c1 = City(1, 'Bratislava', 432000)
c2 = City(2, 'Budapest', 1759000)
c3 = City(3, 'Prague', 1280000)
c4 = City(4, 'Warsaw', 1748000)
c5 = City(5, 'Los Angeles', 3971000)
c6 = City(6, 'Edinburgh', 464000)
c7 = City(7, 'Berlin', 3671000)

cities = [c1, c2, c3, c4, c5, c6, c7]

cities.sort(key=lambda e: e.name)

for city in cities:
    print(city)

With the help of the sort method and the 
lambda function, we sort cities by their name.

$ ./sorting.py 
City(id=7, name='Berlin', population=3671000)
City(id=1, name='Bratislava', population=432000)
City(id=2, name='Budapest', population=1759000)
City(id=6, name='Edinburgh', population=464000)
City(id=5, name='Los Angeles', population=3971000)
City(id=3, name='Prague', population=1280000)
City(id=4, name='Warsaw', population=1748000)

The cities are sorted by their names in ascending order.

## Python namedtuple _make helper

The _make is method that makes a new instance of 
a namedtuple from an existing sequence or iterable.

making.py
  

#!/usr/bin/python

from collections import namedtuple

City = namedtuple('City' , 'name population')

c1 = City._make(('Bratislava', 432000))
c2 = City._make(('Budapest', 1759000))

print(c1)
print(c2)

The example creates City namedtuples from tuples with the help 
of the _make method.

## Python namedtuple - read CSV data

Python namedtuples are helpful when we read CSV data.

cities.csv
  

Bratislava, 432000
Budapest, 1759000
Prague, 1280000
Warsaw, 1748000
Los Angeles, 3971000
New York, 8550000
Edinburgh, 464000
Berlin, 3671000

We have this CSV file.

read_csv.py
  

#!/usr/bin/python

from collections import namedtuple
import csv

City = namedtuple('City' , 'name population')

f = open('cities.csv', 'r')

with f:

    reader = csv.reader(f)
    
    for city in map(City._make, reader):
        print(city)

We use the map and the _make functions to 
create clean code. 

$ ./read_csv.py 
City(name='Bratislava', population=' 432000')
City(name='Budapest', population=' 1759000')
City(name='Prague', population=' 1280000')
City(name='Warsaw', population=' 1748000')
City(name='Los Angeles', population=' 3971000')
City(name='New York', population=' 8550000')
City(name='Edinburgh', population=' 464000')
City(name='Berlin', population=' 3671000')

## Python namedtuple - read SQLite database

In the following example, we use a namedtuple to read data 
from SQLite database.

cities.sql
  

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, 
  population INTEGER);

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

These are SQL statements to create the cities table.

$ sqlite3 ydb.db
SQLite version 3.31.1 2020-01-27 19:55:54
Enter ".help" for usage hints.
sqlite&gt; .read cities.sql

With the sqlite3 command line tool, we generate the SQLite 
database and the cities table.

read_sql.py
  

#!/usr/bin/python

from typing import NamedTuple
import sqlite3 as sqlite

class City(NamedTuple):
    
    id: int
    name: str
    population: int

con = sqlite.connect('ydb.db')

with con:

    cur = con.cursor()

    cur.execute('SELECT * FROM cities')
    
    for city in map(City._make, cur.fetchall()):
        print(city)

We read all data from the cities table and 
transform each table row into a City namedtuple.

## Source

[Python collections - language reference](https://docs.python.org/3/library/collections.html)

In this article we have worked with Python namedtuple.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).