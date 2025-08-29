+++
title = "Python get current working directory"
date = 2025-08-29T20:08:35.116+01:00
draft = false
description = "Python get current working directory tutorial shows ways how to find out the current working directory in Python. Current working directory is a full path wheare a program is executed."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python get current working directory

last modified January 29, 2024

Python get current working directory tutorial shows ways how to find out the
current working directory in Python. 

Current working directory is a full path wheare a program is executed.

$ pwd
/janbodnar/Documents/prog/python/getcwd

We can find out the current working directory with the pwd command.

There are several ways of finding the current working directory in Python. 
We can use the following methods:

     - os.getcwd

     - pathlib.Path.cwd

     - os.path

## Get current working directory with os.getcwd

The os.getcwd returns a string representing the current working
directory.

os_getcwd.py
  

#!/usr/bin/python

import os

w_dir = os.getcwd()
print(w_dir)

The program prints the current working directory with os.getcwd.

$ ./os_getcwd.py 
/janbodnar/Documents/prog/python/getcwd

## Get current working directory with Path.cwd

The Path.cwd returns a new path object representing the current
directory.

path_cwd.py
  

#!/usr/bin/python

from pathlib import Path

work_dir = Path.cwd()
print(work_dir)

The program prints the current working directory with Path.cwd.

## Get current working directory with os.path

The __file__ is a special Python build-in variable which contains
the path to the currently running script. Since Python 3.9, the value is an
absolute path. In earlier versions, the path could be relative. 

When traversing file system hierarchy, we can use the . for 
current working directory, and the .. for parent directory.

os_path.py
  

#!/usr/bin/python

import os

print(os.path.dirname(os.path.normpath(__file__)))
print(os.path.abspath('.'))

The os.path.dirname returns the directory name of the given path.
The normpath method normalizes a pathname by collapsing redundant
separators and up-level references. The path.abspath returns a
normalized absolutized version of the given pathname.

## Source

[Python os module - language reference](https://docs.python.org/3/library/os.html)

In this article we have shown ways of finding the current working directory 
in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).