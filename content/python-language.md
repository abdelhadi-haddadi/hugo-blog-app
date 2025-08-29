+++
title = "Python language"
date = 2025-08-29T20:03:06.613+01:00
draft = false
description = "This chapter of the Python tutorial introduces Python language. We show how to execute our first Python program."
image = "images/pythonlogo.png"
imageBig = "images/pythonlogo.png"
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../interactivepython/)

# Python language

last modified October 18, 2023

In this part of the Python programming tutorial, we talk about the Python programming 
language in general. We show how to execute our first Python program.

## Goal

The goal of this tutorial is to get you started with the Python 
programming language. Python is a great language to learn. It is an 
ideal language for those who are new to programming. After reading 
this tutorial, you will be confident to continue your own studies.
You can create scripts, web sites, games, or desktop applications in Python. 
Even if you do not want to become a programmer, Python may be a great 
tool for occasional programmers or hobbyists. 

## Python

![pythonlogo.png](images/pythonlogo.png)

Python is a general-purpose, dynamic, object-oriented programming language. 
The design purpose of the Python language emphasizes programmer productivity 
and code readability. Python was initially developed by *Guido van Rossum*. 
It was first released in 1991. Python was inspired by ABC, Haskell, Java, Lisp, Icon,
and Perl  programming languages. Python is a high-level, general purpose, 
multi-platform, interpreted language. 

Python is a minimalistic language. One of its most visible features is that it 
does not use semicolons nor brackets; Python uses indentation instead. 

There are two main branches of Python currently: Python 2.x and Python 3.x. Python 3.x
breaks backward compatibility with previous releases of Python. It was created to
correct some design flaws of the language and make it more clean. 
This tutorial covers Python 3.x version. Today, Python is maintained by a large group 
of volunteers worldwide. Python is open source software. 

Python supports several programming styles. It does not force a programmer to a specific 
paradigm. It supports procedural, object oriented, and functional programming. 

The official web site for the Python programming language is 
[python.org](http://python.org)

## Python implementations

Formally, Python programming language is a specification. There are three main implementations
of Python: CPython, IronPython, and Jython. CPython is implemented in C language. It is the
most widely used implementation of Python. When people talk about Python language, they
mostly mean CPython. IronPython is implemented in C#. It is part of the .NET framework. 
Similarly, Jython is an implementation of the Python language in Java. Jython
program is translated into the Java bytecode and executed by the JVM (Java Virtual Machine).
In this tutorial, we work with CPython.

 
## Popularity

 
 

Python belongs to the most popular programming languages.
Several surveys put Python to top ten languages. Some very popular Python projects include
a distributed source management tool Mercurial, a Django web framework, a PyQt GUI library,
or a package management utility called Yum.

 

## Python scripts

Every script in the Unix starts with a *shebang*. The shebang is the first two 
characters in the script: #!. The shebang is followed by the 
path to the interpreter, which will execute our script. Shebangs do not work on Windows;
but it it a good practice to include them even on Windows, since we might expect our
programs to be run on Unix, too.

simple.py
  

#!/usr/bin/env python

# simple.py

print("The Python tutorial")

This is our first Python script. The script will print "The Python tutorial" 
string to the console. Python scripts have .py extension. 

$ which python
/usr/bin/python

We can find out the path to the Python interpreter using the 
which command. 

Python scripts can be run in two ways. 

$ python first.py
The Python tutorial

Python script is given as an argument to the interpreter. 

$ chmod +x first.py 
$ ./first.py 
The Python tutorial

We use the chmod command to make the file executable. 
The program is launched.

The next example shows a simple Ruby script. 

simple.rb
  

#!/usr/bin/ruby

# simple.rb

fruits = ["orange", "apple", "pear", "kiwi"]
fruits.each {|fruits| puts fruits}

Note the shebang and the path to the Ruby interpreter. 

$ ./ruby.rb 
orange
apple
pear
kiwi

Finally, we show a small Perl script. 

simple.pl
  

#!/usr/bin/perl

# simple.pl

$perl = "Practical Extraction and Report Language\n";

print $perl;

Now the concept should be clear. 

## Python reading input

The input function reads a line from input, converts it to a 
string (stripping a trailing newline), and returns that. The function takes
an optional argument, which is written to standard output without a trailing newline, if
present.

read_input.py
  

#!/usr/bin/env python

# read_input.py

name = input("Enter your name:")
print("Hello", name)

The example prints a prompt and reads a name from the console.
Then it prints a greeting to the console.

$ ./read_input.py 
Enter your name:Peter
Hello Peter

## Python command line arguments

Python programs can receive command line arguments. The sys.argv contains
a list of command line arguments passed to a Python script. The argv[0] is 
the script name; the remaining elements are arguments passed to the script.

command_line_arguments.py
  

#!/usr/bin/env python

# command_line_arguments.py

import sys

print("Script name:", sys.argv[0])
print("Arguments:", end=" ")

for arg in sys.argv[1:]:
    print(arg, end=" ")

print()

The example prints the command line arguments passed to the script.

import sys

We import the sys module, which has the argv variable.

print("Script name:", sys.argv[0])

The name of the program is printed.

for arg in sys.argv[1:]:
    print(arg, end=" ")

We go through the list of arguments stored in sys.argv and
print them to the console. With the end option we append a new
space to the end instead of a new line.

print()

At the end, a new line is printed to the console.

$ ./command_line_arguments.py 1 2 3
Script name: ./command_line_arguments.py
Arguments: 1 2 3 

This is a sample output of the example.

In this chapter, we have introduced Python language.

[Contents](..)  
[Next](../interactivepython/)