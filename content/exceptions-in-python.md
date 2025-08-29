+++
title = "Exceptions in Python"
date = 2025-08-29T20:03:04.382+01:00
draft = false
description = "Exceptions in Python chapter of the Python tutorial presents exceptions. An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../packages/)
[Next](../itergener/)

# Exceptions in Python

last modified October 18, 2023

In this part of the Python tutorial, we talk about exceptions in Python.

Errors detected during execution are called exceptions. During the execution of
our application, many things might go wrong. A disk might get full and we cannot
save our file. An Internet connection might go down and our application tries to
connect to a site. All these might result in a crash of our application. To
prevent this, we must cope with all possible errors that might occur. For this,
we can use the exception handling.

## Catching exceptions in Python

In Python, we have the following syntax to deal with exceptions:

try:
   # do something

except ValueError:
   # handle ValueError exception

except (IndexError, ZeroDivisionError):
   # handle multiple exceptions
   # IndexError and ZeroDivisionError

except:
   # handle all other exceptions

finally:
   # cleanup resources

The code where we expect an exception is written in the try block.
The except keyword catches specified or remaining exceptions in
the program. The optional finally block is always executed; it is
used to cleanup resources such as opened files or database connections.

## ZeroDivisionError

It is not possible to divide by zero. If we try to do this, a
ZeroDivisionError is raised and the script is interrupted.

**Note:** The following examples demonstrate how 
the exceptions work in Python. It is more straightforward to 
ensure that the divisor is not zero rather than catch 
ZeroDivisionError.

zero_division.py
  

#!/usr/bin/env python

# zero_division.py

def input_numbers():

    a = float(input("Enter first number:"))
    b = float(input("Enter second number:"))
    return a, b

x, y = input_numbers()
print(f"{x} / {y} is {x/y}")

In this script, we get two numbers from the console. We divide these two numbers.
If the second number is zero, we get an exception.

Enter first number:3
Enter second number:0
Traceback (most recent call last):
    File "C:/Users/Jano/PycharmProjects/Simple/simple.py", line 14, in &lt;module&gt;
    print(f"{x} / {y} is {x/y}")
ZeroDivisionError: float division by zero

We could handle this in two ways.

zero_division2.py
  

#!/usr/bin/env python

# zero_division2.py

def input_numbers():

    a = float(input("Enter first number:"))
    b = float(input("Enter second number:"))
    return a, b

x, y = input_numbers()

while True:

    if y != 0:

        print(f"{x} / {y} is {x/y}")
        break

    else:

        print("Cannot divide by zero")
        x, y = input_numbers()

First, we simply check that y value is not zero. If the
y value is zero, we print a warning message and repeat the input
cycle again. This way we handled the error and the script is not interrupted.

$ ./zero_division2.py
Enter first number:4
Enter second number:0
Cannot divide by zero
Enter first number:5
Enter second number:0
Cannot divide by zero
Enter first number:5
Enter second number:6
5.0 / 6.0 is 0.8333333333333334

The other way is to use exceptions.

zero_division3.py
  

#!/usr/bin/env python

# zerodivision3.py

def input_numbers():

    a = float(input("Enter first number:"))
    b = float(input("Enter second number:"))
    return a, b

x, y = input_numbers()

try:
    print(f"{x} / {y} is {x/y}")

except ZeroDivisionError:

    print("Cannot divide by zero")
    x, y = input_numbers()

We place the code where we expect an exception after try keyword.
The except keyword catches the exception if it is raised.
The exception type is specified after the except keyword.

except ValueError:
    pass
except (IOError, OSError):
    pass

To handle more exceptions, we can either use more except keywords or place
the exception names inside a tuple.

## ValueError

ValueError is raised when a built-in operation or function receives
an argument that has the right type but an inappropriate value, and the situation
is not described by a more precise exception.

value_error.py
  

#!/usr/bin/env python

# value_error.py

def read_age():

    age = int(input("Enter your age: "))

    if age &lt; 0 or age &gt; 130:
        raise ValueError("Invalid age")

    return age

try:
    val = read_age()
    print(f"Your age is {val}")

except ValueError as e:
    print(e)

In the example, we have a function that read age as input from
the user. When the user provides incorrect value, we raise
a ValueError exception.

if age &lt; 0 or age &gt; 130:
    raise ValueError("Invalid age")

return age

Negative age makes no sense and there has not been recorded a person
older than 130 years in modern times.

## Python multiple exceptions

It is possible to catch multiple exceptions in one except
clause.

multiple_exceptions.py
  

#!/usr/bin/env python

# multiple_exceptions.py

import os

try:

    os.mkdir('newdir')
    print('directory created')

    raise RuntimeError("Runtime error occurred")

except (FileExistsError, RuntimeError) as e:
    print(e)

The code example catches two exceptions in one except statement:
FileExistsError and RuntimeError.

os.mkdir('newdir')

A new directory is created with the os.mkdir method. If the directory
already exists, a FileExistsError is triggered.

raise RuntimeError("Runtime error occurred")

We manually rase a runtime exception with the raise keyword.

## Python exception argument

The exception can have an associated value which indicates the detailed cause of
the error. The value is placed after the as keyword.

exception_as.py
  

#!/usr/bin/env python

# exception_argument.py

try:
    a = (1, 2, 3, 4)
    print(a[5])

except IndexError as e:

    print(e)
    print("Class:", e.__class__)

From the exception object, we can get the error message or the class name.

$ ./exception_as.py
tuple index out of range
Class: &lt;class 'IndexError'&gt;

## Python hierarchy of exceptions

The exceptions are organized in a hierarchy, being Exception
the parent of all exceptions.

interrupt.py
  

#!/usr/bin/env python

# interrupt.py

try:
    while True:
       pass

except KeyboardInterrupt:

    print("Program interrupted")

The script starts and endless cycle. If we press Ctrl+C,
we interrupt the cycle. Here, we caught the KeyboardInterrupt
exception.

Exception
  BaseException
    KeyboardInterrupt

interrupt2.py
  

```
#!/usr/bin/env python

# interrupt2.py

try:
    while True:
        pass

except BaseException:

    print("Program interrupted")

```

This example works too. The BaseException also catches the
keyboard interruption; among other exceptions. This is not a good practice, however.
We should catch specific exceptions in our except clauses.

## Python user defined exceptions

We can create our own exceptions if we want. We do it by defining a
new exception class.

user_defined.py
  

#!/usr/bin/env python

# user_defined.py

class BFoundEx(Exception):

    def __init__(self, value):
        self.par = value

    def __str__(self):
        return f"BFoundEx: b character found at position {self.par}"

string = "There are beautiful trees in the forest."

pos = 0

for i in string:

    try:

        if i == 'b':
            raise BFoundEx(pos)
        pos = pos + 1

    except BFoundEx as e:
        print(e)

In our code example, we have created a new exception. The exception is derived
from the base Exception class. If we find any occurrence of
letter b in a string, we raise our exception.

$ ./user_defined.py
'BFoundEx: b character found at position 10'

## The cleanup

There is a finally keyword, which is always executed.
No matter if the exception is raised or not.
It is often used to do some cleanup of resources in a program.

cleanup.py
  

#!/usr/bin/env python

# cleanup.py

f = None

try:

    f = open('data.txt', 'r')
    contents = f.readlines()

    for line in contents:
        print(line.rstrip())

except IOError:

    print('Error opening file')

finally:

    if f:
        f.close()

In our example, we try to open a file. If we cannot open the file, an
IOError is raised. In case we opened the file, we
want to close the file handler. For this, we use the finally keyword.
In the finally block we check if the file is opened. If it is opened,
we close it. This is a common programming construct when we work with databases.
There we similarly cleanup the opened database connections.

## Stack trace

Stack trace shows the call stack (the stack of functions that were
called up to that point) at the time an uncaught exception was thrown. The
Python traceback
module provides a standard interface to extract, format, and print stack traces
of Python programs. It exactly mimics the behavior of the Python interpreter
when it prints a stack trace.

stacktrace_ex.py
  

#!/usr/bin/env python

# stacktrace_ex.py

import traceback

def myfun():

    def myfun2():

        try:
            3 / 0

        except ZeroDivisionError as e:

            print(e)
            print("Class:", e.__class__)

            for line in traceback.format_stack():
                print(line.strip())

    myfun2()

def test():
    myfun()

test()

In the example, we have a division by zero exception in the nested
myfun2 function.

for line in traceback.format_stack():

The format_stack extracts the raw traceback from the current
stack frame and formats it into a list of tuples. We traverse the list of tuples
with a for loop.

$ ./stacktrace_ex.py
division by zero
Class: &lt;class 'ZeroDivisionError'&gt;
File "C:/Users/Jano/PycharmProjects/Simple/simple.py", line 30, in &lt;module&gt;
    test()
File "C:/Users/Jano/PycharmProjects/Simple/simple.py", line 27, in test
    myfun()
File "C:/Users/Jano/PycharmProjects/Simple/simple.py", line 23, in myfun
    myfun2()
File "C:/Users/Jano/PycharmProjects/Simple/simple.py", line 20, in myfun2
    for line in traceback.format_stack():

In the program, we can see the call stack—the order of called functions that
lead to the error.

In this chapter, we have covered exceptions in Python.

[Contents](..)
[Previous](../packages/)
[Next](../itergener/)