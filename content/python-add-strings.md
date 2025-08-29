+++
title = "Python add strings"
date = 2025-08-29T20:07:35.400+01:00
draft = false
description = "Python add string tutorial shows how to concatenate strings in Python. We can add strings with + operator, __add__ method, join method, or string formatting."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python add strings

last modified January 29, 2024

Python add string tutorial shows how to concatenate strings in Python. 

In Python, a string is an ordered sequence of Unicode characters. 

There are several ways of adding strings in Python:

     - + operator

     - __add__ method

     - join method

     - formatting strings

## Python add strings with + operator

The easiest way of concatenating strings is to use the + or the
+= operator. The + operator is used both for adding
numbers and strings; in programming we say that the operator is overloaded. 

add_string.py
  

#!/usr/bin/python

a = 'old'
b = ' tree'

c = a + b
print(c)

Two strings are added using the + operator. 

$ ./add_string.py 
old tree

In the second example, we use the compound addition operator. 

add_string2.py
  

#!/usr/bin/python

msg = 'There are'

msg += ' three falcons'
msg += ' in the sky'

print(msg)

The example builds a message with the += operator. 

$ ./add_string2.py 
There are three falcons in the sky

## Python add strings with join

The string join method concatenates any number of strings provided 
in an iterable (tuple, list). We specify the character by which the strings 
are joined.

add_string_join.py
  

#!/usr/bin/python

msg = ' '.join(['There', 'are', 'three', 'eagles', 'in', 'the', 'sky'])
print(msg)

In the example, we form a message by joining seven words. The words are joined 
with a single space character.

$ ./add_string_join.py
There are three eagles in the sky

## Python add strings with string formatting

We can build Python strings with string formatting. The variables are expanded 
in the {} characters inside the string.

format_str.py
  

#!/usr/bin/python

w1 = 'two'
w2 = 'eagles'

msg = f'There are {w1} {w2} in the sky'
print(msg)

We build a message with Python's fstring.

$ ./format_str.py 
There are two eagles in the sky

## Python add strings with __add_ method

Another possibility to add strings is to use the special __add__
dunder method.

add_string3.py
  

#!/usr/bin/python

s1 = "and old"
s2 = " falcon"

s3 = s1.__add__(s2)
print(s3)

The example adds two strings with __add__.

## Source

[Python common string operations](https://docs.python.org/3/library/string.html)

In this article we have shown several ways to add strings in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).