+++
title = "Python TOML"
date = 2025-08-29T20:11:04.712+01:00
draft = false
description = "Python TOML tutorial shows how to work with the TOML in Python. We use the built-in tomllib module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python TOML

last modified January 29, 2024

In this article we show how to work with TOML configuration file format in
Python. We use the tomllib module, which was introduced in Python
3.11.

## TOML format

YAML (Tom's Obvious Minimal Language) is a human-readable
data-serialization language. It is a minimal configuration file format that is
easy to read. 

TOML supports the following types:

  - key/value pairs

  - arrays

  - tables

  - inline tables

  - arrays of tables

  - ints and floats

  - booleans

  - dates and times

TOML files have the .toml extension.

## Python tomllib module

This tomllib provides an interface for parsing TOML. It does not
support writing to TOML files.

The module defines two functions. The tomllib.load parses TOML from
a file. The tomllib.loads parses TOML from a string.

The following is a TOML to Python data conversion table.

  TOMLPython

  tabledict
  stringstr
  integerint
  floatfloat
  booleanbool
  local date-timedatetime.datetime
  local datedatetime.date
  local timedatetime.time
  arraylist

## Python TOML simple example

The following is a simple TOML example.

simple.py
  

#!/usr/bin/python

import tomllib

source = """
name = "John Doe"
occupation = "gardener"
"""

data = tomllib.loads(source)

for e in data.items():
    print(e)

print('----------------------------')

for e in data.keys():
    print(e)

print('----------------------------')

for e in data.values():
    print(e)

In the program, we load TOML data from a string and print the loaded pairs, keys
and values.

source = """
name = "John Doe"
occupation = "gardener"
"""

In the TOML string, we define two key/value pairs.

data = tomllib.loads(source)

We load TOML data from the string with tomllib.loads.

for e in data.items():
  print(e)

We iterate over the pairs using the items method.

for e in data.keys():
  print(e)

We iterate over the keys using the keys method.

for e in data.values():
  print(e)

Finally, we loop over the values using the values method.

$ ./simple.py
('name', 'John Doe')
('occupation', 'gardener')
----------------------------
name
occupation
----------------------------
John Doe
gardener

## Python TOML read from file

We use the tomllib.load method to parse TOML from a file.

data.toml
  

# Simple TOML document

title = "Simple document"

[data]
enabled = true
words = ['sky', 'note', 'cup', 'toast', 'falcon']
vals = [2, 3, 1, 6, 5, 3, 9]

We have a TOML file.

title = "Simple document"

This is a TOML key/value pair.

[data]
enabled = true
words = ['sky', 'note', 'cup', 'toast', 'falcon']
vals = [2, 3, 1, 6, 5, 3, 9]

This is a TOML table.

read_file.py
  

#!/usr/bin/python

import tomllib

fname = 'data.toml'

with open(fname, 'rb') as f:
    
    data = tomllib.load(f)

    title = data.get('title')
    print(title)

    enabled = data.get('data')['enabled']
    print(enabled)

    words = data.get('data')['words']
    print(words)

    vals = data['data']['vals']
    print(vals)

We read the TOML data from a file.

data = tomllib.load(f)

We load the TOML data.

title = data.get('title')

We get the value of a pair with get.

enabled = data.get('data')['enabled']

From the TOML table called data, we get the enabled
value.

words = data.get('data')['words']
print(words)

From the same table, we get the words array.

$ ./read_file.py
Simple document
True
['sky', 'note', 'cup', 'toast', 'falcon']
[2, 3, 1, 6, 5, 3, 9]

## TOML array on multiple lines

TOML arrays can span multiple lines.

multiple.toml
  

words = [
  "small",
  "cup",
  "forest",
  "toast",
  "mold"
]

We define a words array.

multiple.py
  

#!/usr/bin/python

import tomllib

fname = 'multiple.toml'

with open(fname, 'rb') as f:

    data = tomllib.load(f)
    print(data['words'])
    print(data['words'][0])
    print(data['words'][1])

We parse the TOML file and print the array values.

$ ./multiple.py
['small', 'cup', 'forest', 'toast', 'mold']
small
cup

## Python TOML type conversion

In the next example we show the TOML to Python type conversion.

types.toml
  

married = false
dob = 1999-09-20
weight = 58.5
siblings = 2
favcols = ['red', 'blue']

We have a few pairs with different types.

dtypes.py
  

#!/usr/bin/python

import tomllib

fname = 'types.toml'

with open(fname, 'rb') as f:

    data = tomllib.load(f)
    
    print(type(data['married']))
    print(type(data['dob']))
    print(type(data['weight']))
    print(type(data['siblings']))
    print(type(data['favcols']))

We parse the pairs and print the Python data type of each value. We use the 
built-in type function.

$ ./dtypes.py
&lt;class 'bool'&gt;
&lt;class 'datetime.date'&gt;
&lt;class 'float'&gt;
&lt;class 'int'&gt;
&lt;class 'list'&gt;

## Python TOML decode error

A TOMLDecodeError is raised if a TOML document is invalid.

decode_error.py
  

#!/usr/bin/python

import tomllib

source = """
name = "John Doe"
occupation: "gardener"
"""

try:
    data = tomllib.loads(source)
    name = data['name']
    occupation = data['occupation']

    print(name)
    print(occupation)

except tomllib.TOMLDecodeError as e:
    print('Invalid TOML document')
    print(e)

In the example, we parse an invalid TOML document in a string.

$ ./decode_error.py
Invalid TOML document
Expected '=' after a key in a key/value pair (at line 3, column 11)

## Source

[Python tomllib — Parse TOML files](https://docs.python.org/3/library/tomllib.html)

In this article we have worked with the TOML format in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).