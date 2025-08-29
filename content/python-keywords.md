+++
title = "Python keywords"
date = 2025-08-29T20:03:06.624+01:00
draft = false
description = "Python keywords chapter shows how to use Python keywords. It presents the list of keywords and gives code examples."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../operators/)
[Next](../functions/)

# Python keywords

last modified October 18, 2023

In this part of the Python programming tutorial, we cover keywords in Python language.

## Python keyword

Python keyword is a special word that forms the vocabulary of the Python
language. It is a reserved word that cannot be used as an identifier.

## Python keywords list

The following is a list of keywords for the Python programming language.

False               def                 if                  raise
None                del                 import              return
True                elif                in                  try
and                 else                is                  while
as                  except              lambda              with
assert              finally             nonlocal            yield
break               for                 not
class               from                or
continue            global              pass

Python is a dynamic language. It changes during time. The list of keywords
may change in the future.

keywords.py
  

#!/usr/bin/env python

# keywords.py

import sys
import keyword

print("Python version: ", sys.version_info)
print("Python keywords: ", keyword.kwlist)

This script prints the version of Python and its actual keyword list.

$ ./keywords.py
Python version:  sys.version_info(major=3, minor=5, micro=2, releaselevel='final', serial=0)
Python keywords:  ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class',
'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global',
'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
'try', 'while', 'with', 'yield']

The output show the list of Python keywords for Python 3.5.2.

## Python control flow

The while keyword is a basic keyword for controlling the
flow of the program. The statements inside the while loop are executed
until the expression evaluates to False.

while_kwd.py
  

#!/usr/bin/env python

# while_kwd.py

numbers = [22, 34, 12, 32, 4]
mysum = 0

i = len(numbers)

while i != 0:

   i -= 1
   mysum = mysum + numbers[i]

print("The sum is:", mysum)

In our script we want to calculate the sum of all values in the numbers list.
We utilize the while loop. We determine the length of the list.
The while loop is executed over and over again, until the i
is equal to zero. In the body of the loop, we decrement the counter and calculate
the sum of values.

$ ./while_kwd.py
The sum is: 104

The sum of values is 104.

The break keyword is used to interrupt the cycle if needed.

break_kwd.py
  

#!/usr/bin/env python

# break_kwd.py

import random

while True:

    val = random.randint(1, 30)
    print(val, end=" ")

    if val == 22:
        break

print()

In our example, we print random integer numbers. If the number equals to 22,
the cycle is interrupted with the break keyword.

$ ./break_kwd.py
14 14 30 16 16 20 23 15 17 22

The next example shows the continue keyword. It is used
to interrupt the current cycle, without jumping out of the whole cycle.
It initiates a new cycle.

continue_kwd.py
  

#!/usr/bin/env python

# continue_kwd.py

num = 0

while num &lt; 1000:

      num = num + 1

      if num % 2 == 0:
         continue

      print(num, end=" ")

In the example we print all numbers smaller than 1000 that cannot be
divided by number 2 without a remainder.

The if keyword is a common control flow keyword. It is used to
determine which statements are going to be executed.

if_kwd.py
  

#!/usr/bin/env python

# if_kwd.py

age = 17

if age &gt; 18:

    print("Driving licence issued")
else:

    print("Driving licence not permitted")

The if keyword tests if the the person is older than 18.
If the condition is met, the driving license is issued. The else
keyword is optional. The statement after the else keyword is executed,
unless the condition is True.

Next we see how we can combine the statements using the
elif keyword.

elif_kwd.py
  

#!/usr/bin/env python

# elif_kwd.py

name = "Luke"

if name == "Jack":
    print("Hello Jack!")

elif name == "John":
    print("Hello John!")

elif name == "Luke":
    print("Hello Luke!")

else:
    print("Hello there!")

If the first test evaluates to False, we continue with the next one.
If none of the tests is True, the else statement is executed.

$ ./elif_kwd.py
Hello Luke!

The for keyword is used to iterate over items of a
collection in order that they appear in the container.

for_kwd.py
  

#!/usr/bin/env python

# for_kwd.py

lyrics = """\
Are you really here or am I dreaming
I can't tell dreams from truth
for it's been so long since I have seen you
I can hardly remember your face anymore
"""

for i in lyrics:

    print(i, end=" ")

In the example, we have a lyrics variable having a strophe of a song.
We iterate over the text and print the text character by character.
The comma in the print statement prevents from printing each character on a new line.

$ ./for_kwd.py
A r e   y o u   r e a l l y   h e r e   o r   a m   I   d r e a m i n g
I   c a n ' t   t e l l   d r e a m s   f r o m   t r u t h
f o r   i t ' s   b e e n   s o   l o n g   s i n c e   I   h a v e   s e e n   y o u
I   c a n   h a r d l y   r e m e m b e r   y o u r   f a c e   a n y m o r e

## Python Boolean expressions

First we introduce keywords that work with boolean values and expressions:
is, or, and, and not.

objects.py
  

#!/usr/bin/env python

# objects.py

print(None == None)
print(None is None)

print(True is True)

print([] == [])
print([] is [])

print("Python" is "Python")

The == operator tests for equality. The is keyword
tests for object identity. Whether we are talking about the same object.
Note that multiple variables may refer to the same object.

$ ./objects.py
True
True
True
True
False
True

The output might be surprising for you. In Python language, there is only
one None and one True object. That is why True
is equal and also identical to True. There is only one truth out there, anyway.
The empty list [] is equal to another empty list []; but they are
not identical. Python has put them into two different memory locations. They are two distinct objects.
Hence the is keyword returns False. On the other hand, "Python" is "Python"
returns True. This is because of optimization. If two string literals are
equal, they have been put to same memory location. A string is an immutable
entity and therefore, no harm can be done.

The not keyword negates a boolean value.

not_kwd.py
  

#!/usr/bin/env python

# not_kwd.py

grades = ["A", "B", "C", "D", "E", "F"]

grade = "L"

if grade not in grades:
    print("unknown grade")

In our example we test, whether the grade value is from the
list of possible grades.

$ ./not_kwd.py
unknown grade

The keyword and is used if all conditions in a
boolean expression must be met.

and_kwd.py
  

#!/usr/bin/env python

# and_kwd.py

sex = "M"
age = 26

if age &lt; 55 and sex == "M":
    print("a young male")

In our example, we test if two conditions are met. The "a young male" string
is printed to the console if variable age is less than 55 and
variable sex is equal to "M".

$ ./and_kwd.py
a young male

The keyword or is used if at least one condition must be met.

or_kwd.py
  

#!/usr/bin/env python

# or_kwd.py

name = "Jack"

if (name == "Robert" or name == "Frank" or name == "Jack"
      or name == "George" or name == "Luke"):
    print("This is a male")

If at least one of the expressions is true, the print statement is executed.

When we work with and/or keywords in Python programming language, short
circuit evaluation takes place. *Short circuit evaluation* means that the second
argument is only evaluated if the first argument does not suffice to determine the
value of the expression: when the first argument of and evaluates to false, the
overall value must be false; and when the first argument of or evaluates to true,
the overall value must be true.

A typical example follows.

short_circuit.py
  

#!/usr/bin/env python

# short_circuit.py

x = 10
y = 0

if (y != 0 and x/y &lt; 100):
    print("a small value")

The first part of the expression evaluates to false. The second part of
the expression is not evaluated. Otherwise, we would get a
ZeroDivisionError.

## Python modules

The following keywords are used with modules. Modules are files in which we
organize our Python code.

The import keyword is used to import other modules
into a Python script.

import_kwd.py
  

#!/usr/bin/env python

# import_kwd.py

import math

print(math.pi)

We use the import keyword to import the math module into the namespace of
our script. We print the PI value.

We use the as keyword if we want to give a module a
different alias.

as_kwd.py
  

#!/usr/bin/env python

# as_kwd.py

import random as rnd

for i in range(10):
    print (rnd.randint(1, 10), end=" ")

print()

In this case, we import the random module. We print ten random
integer numbers. We give the random module a different alias, namely
rnd. In the script we reference the module with the
new alias.

$ ./as_kwd.py
1 2 5 10 10 8 2 9 7 2

The from keyword is used for importing a specific
variable, class, or a function from a module.

from_kwd.py
  

#!/usr/bin/env python

# from_kwd.py

from sys import version

print(version)

From the sys module, we import the version variable. If we
want to print it, we do not need to use the module name. The version
variable was imported directly to our namespace and we can reference it directly.

$ ./from_kwd.py
3.7.0 (v3.7.0:1bf9cc5093, Jun 27 2018, 04:59:51) [MSC v.1914 64 bit (AMD64)]

## Python functions

Here we describe keywords associated with functions.
The def keyword is used to create a new user defined
function. Functions are objects in which we organize our code.

def_kwd.py
  

#!/usr/bin/env python

# def_kwd.py

def root(x):

    return x * x

a = root(2)
b = root(15)

print(a, b)

The example demonstrates a new simple function. The function calculates
the square of a number. The return key is closely
connected with a function definition; it exits the
function and returns a value. The value is then assigned to the
a and b variables.

The lambda keyword creates a new anonymous function.
An anonymous function is not bound to a specific name.

lambda_kwd.py
  

#!/usr/bin/env python

# lambda_kwd.py

a = lambda x: x * x

for i in (1, 2, 3, 4, 5):

    print(a(i), end=" ")

print()

As you can see in the previous example, we do not create a new
function with a def keyword. Instead of that we
use an inline function on the fly.

$ ./lambda_kwd.py
1 4 9 16 25

If we want to access variables defined outside functions, we use the
global keyword.

global_kwd.py
  

#!/usr/bin/env python

# global_kwd.py

x = 15

def function():

    global x
    x = 45

function()
print(x)

Normally, assigning to x variable inside a function, we create a new local
variable, which is valid only in that function. But if we use the global
keyword, we change a variable ouside the function definition.

$ ./global_kwd.py
45

## Python exceptions

Next we work with keywords that are used with exception handling.

$ cat films
Fargo
Aguirre, der Zorn Gottes
Capote
Grizzly man
Notes on a scandal

This is a file, containing some film titles. In the code example,
we are going to read it.

try_except_finally.py
  

#!/usr/bin/env python

# try_except_finally.py

f = None

try:

    f = open('films', 'r')

    for i in f:

        print(i, end="")

except IOError:

    print("Error reading file")

finally:

    if f:
        f.close()

We try to read a films file. If no exception occurs, we print the contents
of the file to the console. There might be an exception. For example, if we
provided an incorrect file name. In such a case a IOError
exception is raised. The except keyword catches the
exception and executes its block of code. The finally keyword is
always executed in the end. We use it to clean up our resources.

In the next example, we show how to create a user defined exception
using the raise keyword.

raise_kwd.py
  

#!/usr/bin/env python

# raise_kwd.py

class YesNoException(Exception):

   def __init__(self):

       print('This is not a yes or no answer')

answer = 'y'

if (answer != 'yes' and answer != 'no'):
    raise YesNoException

else:
    print('Correct value')

In the example, we expect only yes/no values. For other possibilities,
we raise an exception.

$ ./raise_kwd.py
This is not a yes or no answer
Traceback (most recent call last):
  File "./raise_kwd.py", line 15, in &lt;module&gt;
    raise YesNoException
__main__.YesNoException

## Other keywords

The del keyword deletes objects.

del_kwd.py
  

#!/usr/bin/env python

# del_kwd.py

a = [1, 2, 3, 4]

print(a)
del a[:2]
print(a)

In our example, we have a list of four integer numbers. We delete the
first numbers from the list. The outcome is printed to the console.

$ ./del_kwd.py
[1, 2, 3, 4]
[3, 4]

The pass keyword does nothing. It is a very handy
keyword in some situations.

def function():
    pass

We have a function. This function is not implemented yet. (It will be later.)
The body of the function must not be empty. So we can use a pass keyword here,
instead of printing something like "function not implemented yet", or similar.

The assert keyword is used for debugging purposes.
We can use it for testing conditions that are obvious to us. For example,
we have a program that calculates salaries. We know that the salary cannot
be less than zero. So we might put such an assertion to the code. If the
assertion fails, the interpreter complains.

assert_kwd.py
  

#!/usr/bin/env python

# assert_kwd.py

salary = 3500
salary -= 3560 # a mistake was done

assert salary &gt; 0

During the execution of the program a mistake was done. The salary
becomes a negative number.

$ ./assert_kwd.py
Traceback (most recent call last):
  File "./assert_kwd.py", line 8, in &lt;module&gt;
    assert salary &gt; 0
AssertionError

The execution of the script fails with the AssertionError.

The class keyword is used to create new user defined objects.

class_kwd.py
  

#!/usr/bin/env python

# class_kwd.py

class Square:

    def __init__(self, x):
        self.a = x

    def area(self):
        print(self.a * self.a)

sq = Square(12)
sq.area()

In the code example, we create a new Square class. Then we instantiate
the class and create an object. We compute the area of the square object.

The exec keyword executes Python code dynamically.

exec_kwd.py
  

#!/usr/bin/env python

# exec_kwd.py

exec("for i in [1, 2, 3, 4, 5]: print(i, end=' ')")

We print five numbers from a list using a for loop; all within
the exec keyword.

$ ./exec_kwd.py
1 2 3 4 5

Next, we mention the in keyword. The keyword tests
whether a value is present in a sequence.

in_kwd.py
  

#!/usr/bin/env python

# in_kwd.py

print(4 in (2, 3, 5, 6))

for i in range(25):
    print(i, end=" ")

print()

In this example, the in keyword tests if the number four is in the tuple.
The second usage is traversing a tuple in  a for loop. The built-in function
range returns integers 0 .. 24.

$ ./in_kwd.py
False
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24

The yield keyword is used with generators.

yield_kwd.py
  

#!/usr/bin/env python

# yield_kwd.py

def gen():

    x = 11
    yield x

it = gen()

print(it.__next__())

The yield keyword exits the generator and returns a value.

$ ./yield_kwd.py
11

In this part of the Python tutorial, we have covered Python keywords.

[Contents](..)
[Previous](../operators/)
[Next](../functions/)