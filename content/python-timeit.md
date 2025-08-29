+++
title = "Python timeit"
date = 2025-08-29T20:11:04.708+01:00
draft = false
description = "Python timeit tutorial shows how to use the timeit module to measure the execution time of small code snippets in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python timeit

last modified February 16, 2025

In this article, we show how to use the timeit module in Python to
measure the execution time of small code snippets. The timeit
module is particularly useful for performance testing and optimization, as it
provides accurate timing results by running the code multiple times.

The timeit module is part of Python's standard library, so no
additional installation is required.

## Basic Usage of timeit

The timeit module provides the timeit function, which
can be used to measure the execution time of a statement. The function has the
following parameters:

- stmt: The statement to be timed (default is pass).

- setup: Code to run before executing the statement (default is pass).

- timer: A timeit.Timer object (usually has a sensible default).

- number: The number of times to execute the statement (default is 1,000,000).

### Example: Timing a Simple Statement

The following example demonstrates how to time a simple arithmetic operation.

main.py
    

import timeit

# Time the execution of the statement "5 + 5"
stm = "5 + 5"
print(timeit.timeit(stmt=stm, number=50_000_000))

In this program, the timeit.timeit function is used to measure the
execution time of the statement 5 + 5 over 50 million iterations.

$ python main.py
0.7231783000170253

### Example: Timing Exponentiation

The following example compares the execution time of two methods for calculating
exponentiation: using the ** operator and the pow
function.

main.py
    

import timeit

# Time the execution of the statement "3 ** 3"
stm = "3 ** 3"
print(timeit.timeit(stmt=stm, number=50_000_000))

# Time the execution of the statement "pow(3, 3)"
stm = "pow(3, 3)"
print(timeit.timeit(stmt=stm, number=50_000_000))

In this program, the timeit.timeit function is used to measure the
execution time of the statements 3 ** 3 and pow(3, 3)
over 50 million iterations.

$ python main.py
0.6393674000282772
3.6729515999904834

## Comparing Loops: for vs while

The following example compares the execution time of a for loop and
a while loop.

main.py
    

import timeit

# Define a function with a for loop
mycode = ''' 
def fn(): 
    for e in range(10000): 
        print(e)
'''

# Define a function with a while loop
mycode2 = ''' 
def fn():
    i = 0
    while i &lt; 10000:
        print(i)
        i += 1
'''

# Time the execution of the for loop
print(timeit.timeit(stmt=mycode, number=5_000_000))

# Time the execution of the while loop
print(timeit.timeit(stmt=mycode2, number=5_000_000))

In this program, the timeit.timeit function is used to measure the
execution time of a for loop and a while loop over 5
million iterations.

$ python main.py
0.44675440003629774
0.4859266999992542

## Using a Decorator for Timing

The following example demonstrates how to create a decorator using the
timeit module to measure the execution time of functions.

main.py
    

import timeit

# Define a decorator for timing functions
def time_it(fn):
    def wrapper(*args, **kwargs):
        t0 = timeit.default_timer()
        fn(*args, **kwargs)
        t1 = timeit.default_timer()
        print("{0:.10f} seconds".format(t1 - t0))
    return wrapper

# Apply the decorator to functions
@time_it
def fstring_fn(vals):
    print("fstring_fn:", f"{vals[0]} {vals[1]} {vals[2]} {vals[3]} {vals[4]}")

@time_it
def format_fn(vals):
    print("format_fn:", "{0} {1} {2} {3} {4}".format(*vals))

@time_it
def oldschool_fn(vals):
    print("oldschool_fn:", "%s %s %s %s %s" % vals)

# Test data
data = ('sky', 'pen', 23.0, -11, True)

# Call the decorated functions
fstring_fn(data)
print('---------------')
format_fn(data)
print('---------------')
oldschool_fn(data)

In this program, the time_it decorator is used to measure the
execution time of three functions: fstring_fn,
format_fn, and oldschool_fn.

$ python main.py
fstring_fn: sky pen 23.0 -11 True
0.0002156000 seconds
---------------
format_fn: sky pen 23.0 -11 True
0.0002937000 seconds
---------------
oldschool_fn: sky pen 23.0 -11 True
0.0003093000 seconds

## Source

[Python timeit - Documentation](https://docs.python.org/3/library/timeit.html)

In this article, we have shown how to use the timeit module in
Python to measure the execution time of small code snippets. The
timeit module is a powerful tool for performance testing and
optimization.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).