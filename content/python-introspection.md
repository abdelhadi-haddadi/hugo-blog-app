+++
title = "Python introspection"
date = 2025-08-29T20:08:44.251+01:00
draft = false
description = "Introspection in Python tutorial covers introspection, which is the ability to determine the type of an object at runtime."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python introspection

last modified January 29, 2024

In this article we talk about introspection in Python.

*Introspection* is an act of self examination. In computer programming,
introspection is the ability to determine type or properties of objects at
runtime. Python programming language has a large support of introspection.
Everything in Python is an object. Every object in Python may have attributes
and methods. By using introspection, we can dynamically inspect Python objects.

## Python dir function

The dir function returns a sorted list of attributes and methods
belonging to an object.

&gt;&gt;&gt; dir(())
['__add__', '__class__', '__contains__', '__delattr__', '__doc__', '__eq__',
'__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__',
'__getslice__', '__gt__', '__hash__', '__init__', '__iter__', '__le__',
'__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__',
'__reduce_ex__', '__repr__', '__rmul__', '__setattr__', '__sizeof__',
'__str__', '__subclasshook__', 'count', 'index']

Here we see an output of the dir function for a tuple object.

&gt;&gt;&gt; print(().__doc__)
tuple() -&gt; empty tuple
tuple(iterable) -&gt; tuple initialized from iterable's items

If the argument is a tuple, the return value is the same object.

Our investigation showed that there is a __doc__ attribute
for a tuple object.

direx.py
  

#!/usr/bin/python

# direx.py

import sys

class MyObject:

   def __init__(self):
      pass

   def examine(self):
      print(self)

o = MyObject()

print(dir(o))
print(dir([]))
print(dir({}))
print(dir(1))
print(dir())
print(dir(len))
print(dir(sys))
print(dir("String"))

The example examines several objects using the dir function:
a user defined object, native data types, a function, a string, or a number.

Without any argument, dir returns names in the current scope.

&gt;&gt;&gt; dir()
['__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__']
&gt;&gt;&gt; import sys
&gt;&gt;&gt;import math, os
&gt;&gt;&gt; dir()
['__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', 'math', 'sys']

We execute the dir function before and after we include some
modules.

## Python type function

The type function returns the type of an object.

typefun.py
  

#!/usr/bin/python

# typefun.py

import sys

def function():
    pass

class MyObject:

   def __init__(self):
      pass

o = MyObject()

print(type(1))
print(type(""))
print(type([]))
print(type({}))
print(type(()))
print(type(object))
print(type(function))
print(type(MyObject))
print(type(o))
print(type(sys))

The example prints various types of objects to the console screen.

$ ./typefun.py
&lt;class 'int'&gt;
&lt;class 'str'&gt;
&lt;class 'list'&gt;
&lt;class 'dict'&gt;
&lt;class 'tuple'&gt;
&lt;class 'type'&gt;
&lt;class 'function'&gt;
&lt;class 'type'&gt;
&lt;class '__main__.MyObject'&gt;
&lt;class 'module'&gt;

## The id function

The id returns a special id of an object.

idfun.py
  

#!/usr/bin/python

# idfun.py

import sys

def fun(): pass

class MyObject:

   def __init__(self):
      pass

o = MyObject()

print(id(1))
print(id(""))
print(id({}))
print(id([]))
print(id(sys))
print(id(fun))
print(id(MyObject))
print(id(o))
print(id(object))

The code example prints ids of various objects, both built-in and custom.

$ ./idfun.py
10914368
139696088742576
139696087935944
139696065155784
139696088325640
139696088244296
21503992
139696087910776
10738720

## Python sys module

The sys module provides access to system specific variables and
functions used or maintained by the interpreter and to functions that interact
strongly with the interpreter. The module allows us to query about the Python
environment.

&gt;&gt;&gt; import sys &gt;&gt;&gt; sys.version '3.11.1 (tags/v3.11.1:a7a450f,
Dec  6 2022, 19:58:39) [MSC v.1934 64 bit (AMD64)]' &gt;&gt;&gt; sys.platform
'win32' &gt;&gt;&gt; sys.path ['',
'C:\\Users\\Jano\\AppData\\Local\\Programs\\Python\\Python311\\python311.zip',
'C:\\Users\\Jano\\AppData\\Local\\Programs\\Python\\Python311\\Lib',
'C:\\Users\\Jano\\AppData\\Local\\Programs\\Python\\Python311\\DLLs',
'C:\\Users\\Jano\\AppData\\Local\\Programs\\Python\\Python311',
... ']

In the above code we examine the Python version, platform, and search path
locations.

We can also use the dir function to get a full list of variables
and functions of the sys module.

&gt;&gt;&gt; sys.executable
'C:\\Users\\Jano\\AppData\\Local\\Programs\\Python\\Python311\\python.exe'
&gt;&gt;&gt; sys.argv
['']
&gt;&gt;&gt; sys.byteorder
'little'

The example presents executable, argv, and
byteorder attributes of the sys module.

&gt;&gt;&gt; sys.executable
'C:\\Users\\Jano\\AppData\\Local\\Programs\\Python\\Python311\\python.exe'

The executable is a string giving the name of the executable binary for
the Python interpreter, on systems where this makes sense.

&gt;&gt;&gt; sys.argv
['']

This gives a list of command line arguments passed to a Python script.

&gt;&gt;&gt; sys.byteorder
'little'

The byteorder is an indicator of the native byte order. This will have the value
'big' on big-endian (most-significant byte first) platforms, and 'little' on
little-endian (least-significant byte first) platforms.

## Other introspection

Next we show various other ways of inspecting Python objects.

attrs.py
  

#!/usr/bin/python

# attr.py

def fun():
    pass

print(hasattr(object, '__doc__'))
print(hasattr(fun, '__doc__'))
print(hasattr(fun, '__call__'))

print(getattr(object, '__doc__'))
print(getattr(fun, '__doc__'))

The hasattr function checks if an object has an attribute. The
getattr function returns the contents of an attribute if there are
some.

$ ./attr.py
True
True
True
The most base type
None

The isinstance function checks if an objects is an instance
of a specific class.

&gt;&gt;&gt; print(isinstance.__doc__)
Return whether an object is an instance of a class or of a subclass thereof.

A tuple, as in ``isinstance(x, (A, B, ...))``, may be given as the target to
check against. This is equivalent to ``isinstance(x, A) or isinstance(x, B)
or ...`` etc.

We can get the describtion of a function interactively.

instance.py
  

#!/usr/bin/python

# instance.py

class MyObject:

   def __init__(self):
      pass

o = MyObject()

print(isinstance(o, MyObject))
print(isinstance(o, object))
print(isinstance(2, int))
print(isinstance('str', str))

As we know, everything is an object in Python; even numbers and strings. The
object is a base type of all objects in Python.

$ ./instance.py
True
True
True
True

The issubclass function checks if a specific class is a derived
class of another class.

subclass.py
  

#!/usr/bin/python

# subclass.py

class Object:

   def __init__(self):
      pass

class Wall(Object):

   def __init__(self):
      pass

print(issubclass(Object, Object))
print(issubclass(Object, Wall))
print(issubclass(Wall, Object))
print(issubclass(Wall, Wall))

In our code example, the Wall class is a subclass of the
Object class. Object and Wall are
also subclasses of themselves. The Object class is not a
subclass of class Wall.

$ ./subclass.py
True
False
True
True

The __doc__ attribute gives some documentation about an object and
the __name__ attribute holds the name of the object.

namedoc.py
  

#!/usr/bin/python

# namedoc.py

def noaction():
   '''A function, which does nothing'''
   pass

funcs = [noaction, len, str]

for i in funcs:

   print(i.__name__)
   print(i.__doc__)
   print("-" * 75)

In our example, we create a list of three functions: one custom and two native.
We go through the list and print the __name__ and
the __doc__ attributes.

$ ./namedoc.py
noaction
A function, which does nothing
---------------------------------------------------------------------------
len
Return the number of items in a container.
---------------------------------------------------------------------------
str
str(object='') -&gt; str
str(bytes_or_buffer[, encoding[, errors]]) -&gt; str

Create a new string object from the given object. If encoding or
errors is specified, then the object must expose a data buffer
that will be decoded using the given encoding and error handler.
Otherwise, returns the result of object.__str__() (if defined)
or repr(object).
encoding defaults to sys.getdefaultencoding().
errors defaults to 'strict'.
---------------------------------------------------------------------------

Finally, there is also a callable function. The function checks if
an object is a callable object (a function).

callable.py
  

#!/usr/bin/python

# callable.py

class Car:

    def setName(self, name):
        self.name = name

def fun():
    pass

c = Car()

print(callable(fun))
print(callable(c.setName))
print(callable([]))
print(callable(1))

In the code example we check if three objects are callables.

print(callable(fun))
print(callable(c.setName))

The fun function and the setName method are callables.
(A method is a function bound to an object.)

$ ./callable.py
True
True
False
False

## Source

[Python inspect module](https://docs.python.org/3/library/inspect.html)

In this article we have talked about introspection in Python. More tools for
doing introspection can be found in the inspect module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).