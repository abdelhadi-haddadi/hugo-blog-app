+++
title = "Python control flow"
date = 2025-08-29T20:07:52.184+01:00
draft = false
description = "Python control flow tutorial shows how to control program flow in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python control flow

last modified January 29, 2024

In this article we show how to control the flow of a Python program.

## Control flow

When a Python program is run, the code is executed from top to bottom. The flow
of the program can be altered with various keywords, including
if/else, for, while, and match.

The control flow structures can be used to executed code conditionally or
multiple times.

## The if statement

The if keyword is used to check if an expression is true. If it is
true, a statement is then executed. The statement can be a single statement or a
compound statement. A compound statement consists of multiple statements
enclosed by the block.

main.py
  

#!/usr/bin/python

import random

r = random.randint(-5, 5)

print(r)

if r &gt; 0:
    print('The r variable is positive')

A random number is generated. If the number is greater than zero, we print a
message to the terminal.

r = random.randint(-5, 5)

We generate a random integer between -5 .. 5.

if r &gt; 0:
    print('The r variable is positive')

Using the if keyword, we check if the generated number is greater
than zero. The if keyword is followed by an expression that evaluates to a
boolean value. If the boolean value is True then the block is executed. In our
case, the string *The r variable is positive* is printed to the terminal.
If the random value is negative, nothing is done.

## The else statement

We can use the else keyword to create a simple branch. If the expression
following the if keyword evaluates to False, the block following
the else keyword is automatically executed.

main.py
  

#!/usr/bin/python

import random

r = random.randint(-5, 5)

print(r)

if r &gt; 0:
    print('The r variable is positive')
else:
    print('The r variable is negative or zero')

Either the block following the if keyword is executed or the block following the
else keyword.

## The elif statement

We can create multiple branches using the elif keyword. It tests
for another condition if and only if the previous condition was not met. Note
that we can use multiple elif keywords in our tests.

main.py
  

#!/usr/bin/python

import random

r = random.randint(-5, 5)

print(r)

if r &gt; 0:
    print('The r variable is positive')
elif r == 0:
    print('The r variable is zero')
else:
    print('The r variable is negative')

If the first condition evaluates to True, e.g. the entered value is
less than zero, the first block is executed and the remaining two blocks are
skipped. If the first condition is not met, then the second condition following
the elif keywords is checked. If the second condition evaluates to
True, the second block is executed. If not, the third block
following the else keyword is executed. The else block is always executed if the
previous conditions were not met.

## The while statement

The while keyword is used to create a cycle. The statements inside
the while loop are executed until the expression evaluates to
False.

main.py
  

#!/usr/bin/python

numbers = [22, 34, 12, 32, 4]
mysum = 0

i = len(numbers)

while i != 0:

    i -= 1
    mysum = mysum + numbers[i]

print("The sum is:", mysum)

We want to calculate the sum of all values in the numbers list. We utilize the
while loop. We determine the length of the list. The while loop is executed over
and over again, until the i is equal to zero. In the body of the loop, we
decrement the counter and calculate the sum of values.

$ ./main.py
The sum is: 104

## The break statement

The break keyword is used to interrupt the cycle if needed.

main.py
  

#!/usr/bin/python

import random

while True:

    val = random.randint(1, 30)
    print(val, end=" ")

    if val == 22:
        break

print()

In our example, we print random integer numbers. If the number equals to 22, the
cycle is interrupted with the break keyword. The while True creates
an endless cycle. The break is used to jump out of this endless
cycle.

$ ./main.py
20 9 27 28 1 12 3 3 13 15 29 27 8 13 17 29 8 1 22 

## The continue statement

The continue statement is used to interrupt the current cycle
without jumping out of the whole cycle. It initiates a new cycle.

main.py
  

#!/usr/bin/python

num = 0

while num &lt; 1000:

    num = num + 1

    if num % 2 == 0:
        continue

    print(num, end=" ")

print()

In the example we print all numbers smaller than 1000 that cannot be divided by
number 2 without a remainder.

## The for statement

The for/in keywords are used to iterate over items of a collection
in order that they appear in the container.

main.py
  

#!/usr/bin/python

lyrics = """
Are you really here or am I dreaming
I can't tell dreams from truth
for it's been so long since I have seen you
I can hardly remember your face anymore
"""

for i in lyrics:

    print(i, end=" ")

In the example, we have a lyrics variable having a strophe of a song. We iterate
over the text and print the text character by character. The comma in the print
statement prevents from printing each character on a new line.

$ ./main.py

 A r e   y o u   r e a l l y   h e r e   o r   a m   I   d r e a m i n g 
 I   c a n ' t   t e l l   d r e a m s   f r o m   t r u t h 
 f o r   i t ' s   b e e n   s o   l o n g   s i n c e   I   h a v e   s e e n   y o u 
 I   c a n   h a r d l y   r e m e m b e r   y o u r   f a c e   a n y m o r e 

The for statement has a rich syntax and it is covered in [Python for loop](/python/python-forloop/) in a more detail.

## Pattern match

Pattern matching is a powerful control flow construct that allows us to compare
a value against a series of patterns and executing code based on which pattern
matches. It is a much more advanced construct than the if/else
statements.

Pattern matching has a complex syntax and is covered in a [Python pattern match](/python/pattern-match/).

main.py
  

#!/usr/bin/python

grades = ['A', 'B', 'C', 'D', 'E', 'F', 'FX']

for grade in grades:

    match grade:
        case 'A' | 'B' | 'C' | 'D' | 'E' | 'F':
            print('passed')
        case 'FX':
            print('failed')

We have a list of grades. For A throug F grades, we pass the example. For the FX
grade, we fail the exam.

grades = ['A', 'B', 'C', 'D', 'E', 'F', 'FX']

We define a list of grades.

for grade in grades:

First, we go over the list with a for loop.

match grade:
    case 'A' | 'B' | 'C' | 'D' | 'E' | 'F':
        print('passed')
    case 'FX':
        print('failed')

In each for cycle, we match a value agains the given patterns. The first case
branch matches against several values separated with |. In the 
second branch, we match agains single value 'FX'.

$ ./main.py  
passed
passed
passed
passed
passed
passed
failed

## Source

[More Control Flow Tools - language reference](https://docs.python.org/3/tutorial/controlflow.html)

In this article we have worked with program control flow in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).