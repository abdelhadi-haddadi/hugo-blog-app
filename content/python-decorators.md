+++
title = "Python decorators"
date = 2025-08-29T20:10:01.574+01:00
draft = false
description = "Python decorators tutorial shows how to use decorators in Python. Decorators extend and modify the behavior of a callable without permanently modifying the callable itself."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python decorators

last modified March 21, 2024

In this article we show how to use decorator functions in Python.

Python functions are first-class citizens. This means that functions have equal
status with other objects in Python. Functions can be assigned to variables,
stored in collections, created and deleted dynamically, or passed as arguments.

A *nested function*, also called an inner function, is a function defined
inside another function.

Python decorator extends and modifies the behavior of a callable
without modifying the callable itself. Decorators are functions which decorate
(or wrap) other functions and execute code before and after the wrapped function
runs.

Python decorators are often used in logging, authentication and authorization, 
timing, and caching. 

## Simple example

In the next example, we create a simple decorator example.

main.py
  

#!/usr/bin/python

def enclose(fun):

    def wrapper():

        print("***************************")
        fun()
        print("***************************")

    return wrapper

def myfun():
    print("myfun")

enc = enclose(myfun)
enc()

The enclose function is a decorator which extends the decorated 
function by adding star symbols to its output.

def enclose(fun):
...

The enclose function takes a function as a parameter.

def wrapper():

    print("***************************")
    fun()
    print("***************************")

return wrapper

The wrapper decorates the passed function with stars. The wrapper
function is returned.

def myfun():
    print("myfun")

This is a regular function to be decorated.

enc = enclose(myfun)
enc()

The myfun is passed to the enclose function, in 
which it is extended. The wrapper function is returned and called. 

$ python main.py
***************************
myfun
***************************

This is the output. The decorator adds the stars before and after the output 
of the regular function.

## Using the @ symbol

Python allows to use the @ symbol to mark the method to be
decorated with a decorator. 

main.py
  

#!/usr/bin/python

def enclose(fun):

    def wrapper():

        print("***************************")
        fun()
        print("***************************")

    return wrapper

@enclose
def myfun():
    print("myfun")

myfun()

Functionally, the example is equivalent to the previous one. Only different
syntax is used.

## Decorating functions with parameters

The following examples show how to decorate functions which take parameters.

main.py
  

#!/usr/bin/python

def enclose(fun):

    def wrapper(val):

        print("***************************")
        fun(val)
        print("***************************")

    return wrapper

@enclose
def myfun(val):
    print(f"myfun with {val}")

myfun('falcon')

In this code example, the regular function takes one argument.

main.py
  

#!/usr/bin/python

def enclose(fun):

    def wrapper(*args, **kwargs):

        print("***************************")
        fun(*args, **kwargs)
        print("***************************")

    return wrapper

@enclose
def myfun(name, age):
    print(f'{name} is {age} years old')

myfun(name='Peter', age=32)
myfun('Roman', 29)

This example shows how to deal with variable number of parameters using the 
*args, **kwargs syntax.

## Modifying data

The decorator function can modify the data of the decorated function.

main.py
  

#!/usr/bin/python

def uppercase(fun):

    def wrapper():

        res = fun()
        modified = res.upper()

        return modified
    return wrapper

@uppercase
def gen_message():
    return 'Hello there!'

msg = gen_message()
print(msg)

The @uppercase decorator changes the returned text to uppercase.

def uppercase(fun):

    def wrapper():

        res = fun()
        modified = res.upper()

        return modified
    return wrapper

Inside the wrapper function the text is modified and returned.

$ python main.py
HELLO THERE!

## Multiple stacked decorators

It is possible to apply multiple decorators on a function.

main.py
  

#!/usr/bin/python

def strong(fun):

    def wrapper():
        return f'&lt;strong&gt;{fun()}&lt;/strong&gt;'
    return wrapper

def em(fun):

    def wrapper():
        return f'&lt;em&gt;{fun()}&lt;/em&gt;'

    return wrapper

@strong
@em
def message():
    return 'This is some message'

print(message())

In the example, we apply two HTML tags on a text.

$ python main.py
&lt;strong&gt;&lt;em&gt;This is some message&lt;/em&gt;&lt;/strong&gt;

## Timing example

In the following example, we apply a timer decorator on a function.

main.py
  

#!/usr/bin/python

import time
import math
import sys

sys.set_int_max_str_digits(maxdigits=90000)

def timer(func):

    def wrapper(*args, **kwargs):

        begin = time.time()

        f = func(*args, **kwargs)

        end = time.time()
        print("Total time taken in : ", func.__name__, end - begin)

        return f

    return wrapper

@timer
def factorial(num):

    return math.factorial(num)

f = factorial(4580)
print(f)

The example calculates how long the factorial function runs using 
a decorator.

begin = time.time()

Before the function is run, we get the start time.

end = time.time()
print("Total time taken in : ", func.__name__, end - begin)

After the function is run, we get the end time and print the difference.

## The functools @wraps decorator

After applying the decorator function, the __name__, __doc__, 
and __module__ attributes of the original function are lost. 
This makes debugging awkward. To fix this, we can use the functool's 
@wraps decorator.

main.py
  

#!/usr/bin/python

from functools import wraps

def enclose(fun):

    @wraps(fun)
    def wrapper():
        '''This is wrapper function'''

        print("***************************")
        fun()
        print("***************************")

    return wrapper

@enclose
def myfun():
    '''this is myfun()''' 
    print("myfun")

myfun()

print(myfun.__name__)
print(myfun.__doc__)

In the example, we apply the @wraps decorator on the wrapper 
function. The name and the docstring of the original function (myfun)
are kept. 

$ python main.py
***************************
myfun
***************************
myfun
this is myfun()

## The class decorator

It is possible to use classes as decorators. For this, we need to implement 
the __call__ magic function.

main.py
  

#!/usr/bin/python

import functools

class CountCalls:

    def __init__(self, fun):

        functools.update_wrapper(self, fun)
        self.fun = fun
        self.num_of_calls = 0

    def __call__(self, *args, **kwargs):

        self.num_of_calls += 1
        print(f"Call {self.num_of_calls} of {self.fun.__name__} fun")
        return self.fun(*args, **kwargs)

@CountCalls
def hello():
    print("Hello there!")

hello()
hello()
hello()

In the example, we use a class decorator to count the calls of a regular function.

def __init__(self, fun):

    functools.update_wrapper(self, fun)
    self.fun = fun
    self.num_of_calls = 0

We call the update_wrapper function. It has the same purpose as 
the @wraps decorator; i.e. it keeps the metadata of the original
function (__name__ or __doc__). We keep the reference 
to the original function and set the num_of_calls variable.

def __call__(self, *args, **kwargs):

    self.num_of_calls += 1
    print(f"Call {self.num_of_calls} of {self.fun.__name__} fun")
    return self.fun(*args, **kwargs)

We increase the num_of_calls variable, print a message, and call
the original function, passing it possible arguments.

$ python main.py
Call 1 of hello fun
Hello there!
Call 2 of hello fun
Hello there!
Call 3 of hello fun
Hello there!

## The @staticmethod decorator

Python has the @staticmethod built-in decorator, which creates 
a static method in Python class. A static method belongs to a class and is
called without creating an instance.

main.py
  

#!/usr/bin/python

class Math:

    @staticmethod
    def abs(x):
        
        if x &lt; 0:
            return -x
        return x

print(Math.abs(3))
print(Math.abs(-3))

In the example, we create a static abs method using the 
@staticmethod decorator. The method is called by specifying the 
class name and using the dot operator: Math.abs.

## Flask decorators

Popular Python framework Flask uses decorators. For instance, the 
@app.route is used to define routes. 

main.py
  

#!/usr/bin/python

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello there!'

In the example, the hello function is mapped to the root page
using Flask's @app.route decorator.

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have worked with Python decorators.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).