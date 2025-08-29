+++
title = "Python package"
date = 2025-08-29T20:09:49.206+01:00
draft = false
description = "Python package tutorial shows how to organize Python code with packages. Packages are collection of Python modules."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python package

last modified January 29, 2024

In this article we cover Python packages.

A Python *package* is a collection of modules which have a common purpose. 
Package directories must have one special file called __init__.py. 
(Since Python 3.3, __init__.py is no longer required to define 
package directories.) A Python module is a single Python file.

When we deal with large projects containing hundreds or thousands of modules,
using packages is crucial. For example, we could put all database related
modules in a database package and user interface code in ui package. 

Built-in packages available in predefined directories; for instance, 
/usr/lib/python3.5 on Debian Linux or 
C:\Users\Jano\AppData\Local\Programs\Python\Python36-32\Lib\site-packages.

Third-party packages are installed into predefined directories such as 
/usr/local/lib/python3.5/dist-packages on Debian Linux or 
C:\Users\Jano\AppData\Local\Programs\Python\Python36-32\libs on Windows.

## Python package management

Python packages are managed with the Python package manager pip.

$ sudo pip3 install arrow

For instance, the arrow library is installed with the above command.

$ sudo pip3 uninstall arrow

To uninstall arrow, we use the above command.

## Python package with empty __init__.py

In the first example, we create a simple package in Python.

$ tree
.
├── mymath
│   ├── __init__.py
│   └── mfuns.py
└── myprog.py

In our current working directory we have a mymath directory 
and a myprog.py script. The mymath contains 
the __init__.py file, which marks the mymath directory
as a package directory. 

The mymath directory has two files: the __init__.py file makes 
constants a Python package directory and the mfuns.py is a Python module. 

__init__.py
  

The __init__.py is blank. It can contain some code but it can be
also empty.

mfuns.py
  

def mycube(x):

   return x * x * x 

In the mfuns.py module, we have a definition of a cube
function.

myprog.py
  

#!/usr/bin/python

# myprog.py

from mymath.mfuns import mycube

print(mycube(3))

In the myprog.py program, we import the mycube
function from th mymath.mfuns module. The module name and the
package name is separated with a dot character.

## Python importing function in __init__.py

In the next example, we have some code in the __init__.py file.

$ tree
.
├── mymath
│   ├── __init__.py
│   └── mfuns.py
└── myprog.py

We have the same directory structure.

__init__.py
  

from .mfuns import mycube

In the __init__.py file, we import the mycube function. 
As a consequence, we do not have to specify the module name when we refer to 
the mycube function from the mymath package.

mfuns.py
  

def mycube(x):

   return x * x * x 

In the mfuns.py module, we have a definition of a cube function.

myprog.py
  

#!/usr/bin/python

# myprog.py

from mymath import mycube

print(mycube(3))

In the myprog.py program, we import the mycube function. 
This time we have omitted the module name. 

## Python package without __init__.py

Since Python 3.3 it is possible to define package directories without using
the __init__.py file.

read.py
constants/
    data.py 

In our current working directory we have a constants directory 
and a read.py script. 

data.py
  

colours = ('yellow', 'blue', 'red', 'orange', 'brown')
names = ('Jack', 'Jessica', 'Robert', 'Lucy', 'Tom')

The data.py module has two tuples.

read.py
  

#!/usr/bin/python

# read.py

from constants.data import colours
import constants.data as mydata

print(colours)
print(mydata.names)

In the read.py script we import the tuples and print
them to the terminal. 

$ ./read.py 
('yellow', 'blue', 'red', 'orange', 'brown')
('Jack', 'Jessica', 'Robert', 'Lucy', 'Tom')

## Python arrow package

The *arrow* is a third-party library for working with date and time
in Python. 

$ ls /usr/local/lib/python3.5/dist-packages/arrow
api.py  arrow.py  factory.py  formatter.py  __init__.py  
locales.py  parser.py  __pycache__  util.py

The library is installed in the arrow directory, under the dist-packages
in Debian Linux. The library is installed with the pip package manager.
As we can see, the library is a collection of Python modules.

## Python subpackages

We can also create subpackages. To access subpackages, we use the dot operator. 

$ tree
.
├── constants
│ ├── __init__.py
│ ├── data.py
│ └── numbers
│     ├── __init__.py
│     └── myintegers.py
└── read.py

constants/__init__.py
  

```
from .data import names

```

This is the __init__.py file in the 
constants directory. We import the names tuple.

constants/data.py
  

names = ('Jack', 'Jessica', 'Robert', 'Lucy', 'Tom')

This is the data.py module in the 
constants directory. It contains the names tuple.

numbers/__init__.py
  

from .myintegers import myintegers

The __init__.py file in the numbers package has 
this one line. 

numbers/myintegers.py
  

myintegers = (2, 3, 45, 6, 7, 8, 9)

The integers module defines a tuple of seven integers. This tuple will 
be accessed from the read.py script. 

read.py
  

#!/usr/bin/python

# read.py

from constants import names
from constants.numbers import myintegers

print(names)
print(myintegers)

This is the read.py program. We import the names 
tuple from the constants package and the myintegers
tuple from the constants.numbers subpackage.

$ ./read.py 
('Jack', 'Jessica', 'Robert', 'Lucy', 'Tom')
(2, 3, 45, 6, 7, 8, 9)

The from package import * construct in a __init__.py 
file could cause problems on some older operating systems. Therefore a 
special variable __all__ has been introduced. This variable 
controls what objects will be imported from a package. 

-->

## Source

[Python packages - language reference](https://docs.python.org/3/tutorial/modules.html#packages)

In this article we have covered Python packages.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).