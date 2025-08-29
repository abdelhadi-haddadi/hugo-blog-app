+++
title = "Python create dictionary"
date = 2025-08-29T20:07:53.301+01:00
draft = false
description = "Python create dictionary tutorial shows how to create dictionaries in Python. There are several ways how dictionaries can be formed in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python create dictionary

last modified January 29, 2024

Python create dictionary tutorial shows how to create dictionaries in Python. 

There are several ways how dictionaries can be formed in Python. We demonstrate 
them in the following examples.

## Python dictionary

Python *dictionary* is an unordered collection of key-value pairs. It
is mutable and can contain mixed types.  The keys in a dictionary must be
immutable objects like strings or numbers. They must also be unique within a
dictionary. 

## Python create empty dictionary

One way to create a dictionary is to form an empty dictionary and later add 
new pairs.

empty.py
  

#!/usr/bin/python

capitals = {}

capitals["svk"] = "Bratislava"
capitals["deu"] = "Berlin"
capitals["dnk"] = "Copenhagen"

print(capitals)

The example creates a new empty dictionary and adds new keys and 
values. 

$ ./empty.py 
{'svk': 'Bratislava', 'dnk': 'Copenhagen', 'deu': 'Berlin'}

Alternatively, we can create a new empty dictionary with the dict
function.

empty2.py
  

#!/usr/bin/python

capitals = dict()

capitals.update([('svk', 'Bratislava'), ('deu', 'Berlin'), ('dnk', 'Copenhagen')])

print(capitals)

An empty dictionary is created with dict and new values 
are added with update

## Python create dictionary with literal notation

A common way of creating dictionaries is the literal notation. The dictionary 
elements are specified within the {} brackets, separated by comma. 
The key and values are separated by colon.

literals.py
  

#!/usr/bin/python

cities = { 'Bratislava': 432000, 'Budapest': 1759000, 'Prague': 1280000, 
    Warsaw': 1748000, 'Los Angeles': 3971000, 'Edinburgh': 464000, 
    'Berlin': 3671000 }

print(cities['Bratislava'])
print(cities)

The example creates a dictionary of cities with literal notation.

## Python dictionary fromkeys

The fromkeys  is a class method to create a new dictionary with 
keys from an iterable and values set to a value.

fromkeys.py
  

data = ['coins', 'pens', 'books', 'cups'];

items = dict.fromkeys(data, 0)

print(items)

items['coins'] = 13
items['pens'] = 4
items['books'] = 39
items['cups'] = 7

print(items)

The example creates a new dictionary from a list of values. Each element 
is initialized to zero. Later, each item is assigned a new integer value. 

$ ./from_keys.py 
{'coins': 0, 'pens': 0, 'books': 0, 'cups': 0}
{'coins': 13, 'pens': 4, 'books': 39, 'cups': 7}

## List of tuples to create a dictionary

A list of tuples can be passed to the dict function to 
create a new dictionary.

from_list_of_tuples.py
  

#!/usr/bin/python

data = [('Bratislava', 432000), ('Budapest', 1759000), ('Prague', 1280000), 
    ('Warsaw', 1748000), ('Los Angeles', 3971000), ('Edinburgh', 464000), 
    ('Berlin', 3671000)]

cities = dict(data)

print(cities['Bratislava'])
print(cities['Los Angeles'])
print(cities)

The example creates a list with nested tuples. The list is passed to the 
dict.

## Passing params to dict

Another way to create a dictionary is to pass parameters to the dict
function.

pass_params.py
  

#!/usr/bin/python

cities = dict(Bratislava = 432000, Budapest = 1759000, Prague = 1280000, 
    Warsaw = 1748000, Los_Angeles = 3971000, Edinburgh = 464000, Berlin = 3671000)

print(cities['Bratislava'])
print(cities)

This approach has a limitation; Los Angeles must be joined with an underscore.

## Using zip with dict

The zip function takes iterables (zero or more), aggregates them and returns 
an iterator of tuples based on the iterable objects.

from_two_lists.py
  

#!/usr/bin/python

keys = ['coins', 'pens', 'books', 'cups'];
vals = [13, 4, 39, 7];

items = dict(zip(keys, vals))

print(items)

The example joins two lists with zip and passes the iterable 
to the dict.

## Python dictionary comprehension

New dictionaries can be derived from existing dictionaries using *dictionary comprehension*. 
A dictionary comprehension is a syntactic construct which creates a dictionary based on 
existing dictionary. 

comprehension.py
  

#!/usr/bin/python

capitals = { "Bratislava": 424207, "Vilnius": 556723, "Lisbon": 564657,
             "Riga": 713016, "Jerusalem": 780200, "Warsaw": 1711324,
             "Budapest": 1729040, "Prague": 1241664, "Helsinki": 596661,
             "Yokyo": 13189000, "Madrid": 3233527 }

capitals2 = { key:val for key, val in capitals.items() if val &lt; 1000000 }

print(capitals2)

In the example, we create a new dictionary from an existing dictionary.

capitals = { "Bratislava": 424207, "Vilnius": 556723, "Lisbon": 564657,
           "Riga": 713016, "Jerusalem": 780200, "Warsaw": 1711324,
           "Budapest": 1729040, "Prague": 1241664, "Helsinki": 596661,
           "Yokyo": 13189000, "Madrid": 3233527 }

We have a dictionary of capitals. The capital in a key and the population is
the value.

capitals = { key:val for key, val in capitals.items() if val &lt; 1000000 }

A new dictionary is created using a dictionary comprehension. It contains
capitals that have a population smaller than one million.

$ ./comprehension.py
{'Bratislava': 424207, 'Vilnius': 556723, 'Jerusalem': 780200, 'Riga': 713016,
    'Lisbon': 564657, 'Helsinki': 596661}

These capitals have a population smaller than one million.

## Source

[Python data structures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have practiced creating dictionaries in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).