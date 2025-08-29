+++
title = "Python Packages"
date = 2025-08-29T20:09:50.975+01:00
draft = false
description = "Python packages tutorial shows how to work with packages in Python. Packages are namespace containers for modules."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Packages

last modified March 15, 2024

Python packages tutorial shows how to work with packages in Python. Packages
are namespace containers for modules.

## Python Package

A Python package is a collection of Python modules. Packages help organize
related modules into a single directory hierarchy. Packages are created by
adding a special __init__.py file to a directory.

## Creating a Simple Package

This example shows how to create a basic Python package.

mypackage/__init__.py
  

# This file makes the directory a Python package
version = '1.0'

main.py
  

```
#!/usr/bin/python

import mypackage

print(mypackage.version)

```

We create a package called mypackage with an __init__.py
file. The file can be empty or contain initialization code.

## Package with Modules

This example shows a package with multiple modules.

mypackage/greet.py
  

def say_hello():
    print("Hello from greet module")

main.py
  

```
#!/usr/bin/python

from mypackage.greet import say_hello

say_hello()

```

We add a greet.py module to our package and import its function
in main.py.

## Importing Package Contents

Different ways to import package contents.

main.py
  

#!/usr/bin/python

import mypackage.greet
from mypackage import greet
from mypackage.greet import say_hello

mypackage.greet.say_hello()
greet.say_hello()
say_hello()

The example shows three ways to import and use package contents.

## __all__ in __init__.py

Using __all__ to control what gets imported with from package import *.

mypackage/__init__.py
  

__all__ = ['greet']

main.py
  

```
#!/usr/bin/python

from mypackage import *

greet.say_hello()

```

The __all__ list defines which modules are imported when using
from package import *.

## Subpackages

Creating and using subpackages.

mypackage/subpkg/__init__.py
  

# Subpackage initialization

mypackage/subpkg/utils.py
  

```
def helper():
    print("Helper function from utils")

```

main.py
  

```
#!/usr/bin/python

from mypackage.subpkg.utils import helper

helper()

```

We create a subpackage subpkg with its own __init__.py
and a utils.py module.

## Installing Packages with pip

Installing third-party packages using pip.

Terminal
  

$ pip install requests
$ pip install numpy pandas --user
$ pip install -r requirements.txt

The example shows common pip commands for installing Python packages.

## Creating a Setup.py

Creating a distributable package with setup.py.

setup.py
  

from setuptools import setup, find_packages

setup(
    name="mypackage",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'requests&gt;=2.25.1',
    ],
)

The setup.py file defines package metadata and dependencies.

## Relative Imports

Using relative imports within a package.

mypackage/subpkg/mod.py
  

from ..greet import say_hello

def mod_func():
    say_hello()
    print("From mod module")

The example shows how to use relative imports with .. notation.

## Namespace Packages

Creating namespace packages without __init__.py files.

ns_pkg/pkg1/mod1.py
  

def ns_func():
    print("Namespace package function")

main.py
  

```
#!/usr/bin/python

from ns_pkg.pkg1.mod1 import ns_func

ns_func()

```

Python 3.3+ supports namespace packages that don't require __init__.py.

##  Package Data Files

Including non-Python files in packages.

setup.py
  

from setuptools import setup

setup(
    name="mypackage",
    version="1.0",
    package_data={
        'mypackage': ['data/*.txt'],
    },
)

The example shows how to include data files in your package distribution.

## Source

[Python Packages Documentation](https://docs.python.org/3/tutorial/modules.html#packages)

In this article we have worked with Python packages.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).