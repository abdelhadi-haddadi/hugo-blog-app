+++
title = "Python YAML"
date = 2025-08-29T20:11:15.529+01:00
draft = false
description = "Python YAML tutorial shows how to work with the YAML in Python. We use the pyyaml module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python YAML

last modified January 29, 2024

In this article we show how to work with the the YAML format in Python. We use
the pyyaml module.

## YAML format

YAML (YAML Ain't Markup Language) is a human-readable data-serialization
language. It is commonly used for configuration files, but it is also used in
data storage (e.g. debugging output) or transmission (e.g. document headers).

YAML natively supports three basic data types: scalars (such as strings, integers, and floats), 
lists, and associative arrays.

The official recommended filename extension for YAML files has been .yaml.
There are two modules in Python for YAML: PyYAML and ruamel.yaml. In this article we 
use the former.

## PyYAML

PyYAML is a YAML parser and emitter for Python.

$ pip install pyyaml

The module is installed with pip.

## YAML files

In this article we use the following YAML files:  

items.yaml
  

raincoat: 1
coins: 5
books: 23
spectacles: 2
chairs: 12
pens: 6

We have a couple of scalar values. 

data.yaml
  

cities:
  - Bratislava
  - Kosice
  - Trnava
  - Moldava
  - Trencin
---
companies:
  - Eset
  - Slovnaft
  - Duslo Sala
  - Matador Puchov

We have two documents in data.yaml. Documents are separated 
with ---.

## Python YAML read

In the first example, we read a YAML file.

read_yaml.py
  

#!/usr/bin/python

import yaml

with open('items.yaml') as f:
    
    data = yaml.load(f, Loader=yaml.FullLoader)
    print(data)

We open the items.yaml file and load the contents
with the yaml.load method. The data is printed 
to the console. 

$ python read_yaml.py
{'raincoat': 1, 'coins': 5, 'books': 23, 'spectacles': 2, 'chairs': 12, 'pens': 6}

The PyYAML module transforms the scalar values into a Python dictionary.

## Python YAML read documents

Multiple YAML documents are read with load_all.

read_docs.py
  

#!/usr/bin/python

import yaml

with open('data.yaml') as f:
    
    docs = yaml.load_all(f, Loader=yaml.FullLoader)

    for doc in docs:
        
        for k, v in doc.items():
            print(k, "-&gt;", v)

The example reads both documens from the data.yaml file. 

$ python read_docs.py
cities -&gt; ['Bratislava', 'Kosice', 'Trnava', 'Moldava', 'Trencin']
companies -&gt; ['Eset', 'Slovnaft', 'Duslo Sala', 'Matador Puchov']

## Python YAML dump

The dump method  serializes a Python object into a YAML stream.

dumping.py
  

#!/usr/bin/python

import yaml

users = [{'name': 'John Doe', 'occupation': 'gardener'},
         {'name': 'Lucy Black', 'occupation': 'teacher'}]

print(yaml.dump(users))

In the example, we have a list of dictionaries. We serialize the list 
into YAML format with the dump method.

$ python dumping.py
- name: John Doe
  occupation: gardener
- name: Lucy Black
  occupation: teacher

## Python YAML write

The following example writes Python data into a YAML file.   

writing.py
  

#!/usr/bin/python

import yaml

users = [{'name': 'John Doe', 'occupation': 'gardener'},
         {'name': 'Lucy Black', 'occupation': 'teacher'}]

with open('users.yaml', 'w') as f:
    
    data = yaml.dump(users, f)

The example writes a list of dictionaries into a users.yaml file.

data = yaml.dump(users, f)

We write the data with the dump method. The first parameter 
is the data, the second is the file object.

## Python YAML sorting keys

We can sort keys with the dump's sort_keys
parameter.

sort_keys.py
  

#!/usr/bin/python

import yaml

with open('items.yaml') as f:
    
    data = yaml.load(f, Loader=yaml.FullLoader)
    print(data)

    sorted = yaml.dump(data, sort_keys=True)
    print(sorted)

The example reads data from the items.yaml file and 
sorts the data by keys in the YAML output.

$ python sort_keys.py
{'raincoat': 1, 'coins': 5, 'books': 23, 'spectacles': 2, 'chairs': 12, 'pens': 6}
books: 23
chairs: 12
coins: 5
pens: 6
raincoat: 1
spectacles: 2

## Tokens

We can work with a lower-level API when parsing YAML files.
The scan method scans a YAML stream and produces scanning tokens.

tokens.py
  

#!/usr/bin/python

import yaml

with open('items.yaml') as f:
    
    data = yaml.scan(f, Loader=yaml.FullLoader)

    for token in data:
        print(token)

The example scans the YAML file and prints the tokens.

$ python tokens.py
StreamStartToken(encoding=None)
BlockMappingStartToken()
KeyToken()
ScalarToken(plain=True, style=None, value='raincoat')
ValueToken()
ScalarToken(plain=True, style=None, value='1')
KeyToken()
ScalarToken(plain=True, style=None, value='coins')
ValueToken()
ScalarToken(plain=True, style=None, value='5')
KeyToken()
ScalarToken(plain=True, style=None, value='books')
ValueToken()
ScalarToken(plain=True, style=None, value='23')
KeyToken()
ScalarToken(plain=True, style=None, value='spectacles')
ValueToken()
ScalarToken(plain=True, style=None, value='2')
KeyToken()
ScalarToken(plain=True, style=None, value='chairs')
ValueToken()
ScalarToken(plain=True, style=None, value='12')
KeyToken()
ScalarToken(plain=True, style=None, value='pens')
ValueToken()
ScalarToken(plain=True, style=None, value='6')
BlockEndToken()
StreamEndToken()

## Source

[PyYAML Documentation](https://pyyaml.org/wiki/PyYAMLDocumentation)

In this article we have worked with the YAML format in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).