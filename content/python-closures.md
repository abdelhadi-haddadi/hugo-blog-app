+++
title = "Python closures"
date = 2025-08-29T20:10:00.444+01:00
draft = false
description = "Python closures tutorial shows how to use closure functions in Python. Closures are nested functions that retain access to their outer scope."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python closures

last modified January 29, 2024

Python closures tutorial shows how to use closure functions in Python.

Python functions are first-class citizens. This means that functions have equal
status with other objects in Python. Functions can be assigned to variables,
stored in collections, created and deleted dynamically, or passed as arguments.

A *nested function*, also called an inner function, is a function defined
inside another function.

nested_fun.py
  

#!/usr/bin/python

def main():

    def build_message(name):

        msg = f'Hello {name}'
        return msg

    name = input("Enter your name: ")
    msg = build_message(name)

    print(msg)

if __name__ == "__main__":
    main()

The build_message is a nested function. It is defined and invoked
inside its outer main function.

## Python closures

A closure is a nested function which has access to a free variable
from an enclosing function that has finished its execution. Three characteristics
of a Python closure are:

    - it is a nested function

    - it has access to a free variable in outer scope

    - it is returned from the enclosing function

A *free variable* is a variable that is not bound in the local scope.
In order for closures to work with immutable variables such as numbers and
strings, we have to use the nonlocal keyword.

Python closures help avoiding the usage of global values and provide some form
of data hiding. They are used in Python decorators.

## Python simple closure example

The following is a simple example of a Python closure.

simple_closure.py
  

#!/usr/bin/python

def make_printer(msg):

    msg = "hi there"

    def printer():
        print(msg)

    return printer

myprinter = make_printer("Hello there")
myprinter()
myprinter()
myprinter()

In the example, we have a make_printer function, which creates
and returns a function. The nested printer function is the
closure.

myprinter = make_printer("Hello there")

The make_printer function returns a printer function
and assigns it to the myprinter variable. At this moment, it has
finished its execution. However, the printer closure still has
access to the msg variable.

$ ./simple_closure.py
hi there
hi there
hi there

## Python closure with nonlocal keyword

The nonlocal keyword allows us to modify a variable with immutable
type in the outer function scope.

counter.py
  

#!/usr/bin/python

def make_counter():

    count = 0
    def inner():

        nonlocal count
        count += 1
        return count

    return inner

counter = make_counter()

c = counter()
print(c)

c = counter()
print(c)

c = counter()
print(c)

The example creates a counter function.

def make_counter():

    count = 0
    def inner():

        nonlocal count
        count += 1
        return count

    return inner

By using the nonlocal keyword, the count variable
becomes a *free variable*. Now we can modify it.

$ ./counter.py
1
2
3

## Python closures vs classes

Python closures can be an alternate solution to small classes.

summer.py
  

#!/usr/bin/python

class Summer():

    def __init__(self):
        self.data = []

    def __call__(self, val):

        self.data.append(val)
        _sum = sum(self.data)

        return _sum

summer = Summer()

s = summer(1)
print(s)

s = summer(2)
print(s)

s = summer(3)
print(s)

s = summer(4)
print(s)

We have a Summer class, which sums values passed to the object.

def __init__(self):
    self.data = []

The data is kept in the object attribute and is created in the constructor.

def __call__(self, val):

    self.data.append(val)
    _sum = sum(self.data)

    return _sum

Each time the instance is called, the value is appended and the sum is calculated
and returned.

The following is an alternate solution with Python closure.

summer2.py
  

#!/usr/bin/python

def make_summer():

    data = []

    def summer(val):

        data.append(val)
        _sum = sum(data)

        return _sum

    return summer

summer = make_summer()

s = summer(1)
print(s)

s = summer(2)
print(s)

s = summer(3)
print(s)

s = summer(4)
print(s)

We have the same functionality with a Python closure.

def make_summer():

    data = []

    def summer(val):

        data.append(val)
        _sum = sum(data)

        return _sum

    return summer

Because the data is a list which is mutable, we do not have to
use the nonlocal keyword.

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have worked with Python closures.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).