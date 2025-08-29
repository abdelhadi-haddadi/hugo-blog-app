+++
title = "Python map"
date = 2025-08-29T20:10:01.564+01:00
draft = false
description = "Python map tutorial presents the Python built-in map() function. The Python map() function applies a function to every item of iterable(s) and returns an iterator object."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python map

last modified January 29, 2024

Python map tutorial presents the Python built-in map function.

## Python map() function

Python map built-in function applies the given
function on every item of iterable(s) and returns an iterator object.

map(function, iterable, ...)

It is possible to pass more than one iterable to the map function.
The function must take as many parameters as there are iterables.

## Python map example

The following example uses Python map on
a list of integers.

python_map.py
  

#!/usr/bin/python

def square(x):

    return x * x

nums = [1, 2, 3, 4, 5]

nums_squared = map(square, nums)

for num in nums_squared:

    print(num)

We define a list of integers and apply the square
function on each element of the list with map.

def square(x):

    return x * x

The square function squares its parameter.

nums = [1, 2, 3, 4, 5]

We define a list of integers.

nums_squared = map(square, nums)

The map function applies the square
function on each element of the nums list.

for num in nums_squared:

    print(num)

We loop over the returned iterable and print the elements.

$ ./python_map.py
1
4
9
16
25

## Python map equivalent

The following example shows a custom equivalent to Python 3 map
function.

mymap_fun.py
  

#!/usr/bin/python

def square(x):

    return x * x

def mymap(func, iterable):

    for i in iterable:
        yield func(i)

nums = [1, 2, 3, 4, 5]

nums_squared = mymap(square, nums)

for num in nums_squared:

    print(num)

The mymap does the same thing as Python 3
map.

## Python map with lambda

The next example creates an anonymous function inside
map with lambda operator.

python_map_lambda.py
  

#!/usr/bin/python

nums = [1, 2, 3, 4, 5]

nums_squared = map(lambda x: x*x, nums)

for num in nums_squared:
    print(num)

The code example squares the elements of a list with
map and anonymous function created with
lambda.

## Python map with multiple iterables

We have mentioned earlier that we can pass multiple iterables
into map.

python_map_iterables.py
  

#!/usr/bin/python

def multiply(x, y):

    return x * y

nums1 = [1, 2, 3, 4, 5]
nums2 = [6, 7, 8, 9, 10]

mult = map(multiply, nums1, nums2)

for num in mult:
    print(num)

In the code example have two iterables holding integers. The values from
both iterables are multiplied.

def multiply(x, y):

    return x * y

The function must take two parameters since there are two iterables passed
to map.

$ ./python_map_iterables.py
6
14
24
36
50

## Python map multiple functions

In the next example, we show how to use multiple functions
in Python map.

python_map_multiple_funcs.py
  

#!/usr/bin/python

def add(x):
    return x + x

def square(x):
    return x * x

nums = [1, 2, 3, 4, 5]

for i in nums:

    vals = list(map(lambda x: x(i), (add, square)))

    print(vals)

In the example, we apply add and square
functions on the list of integer values.

for i in nums:

    vals = list(map(lambda x: x(i), (add, square)))

    print(vals)

We go through the elements in the for loop. In each cycle, we
create a list of two values, which are computed by applying
the add and square functions on
the value.

$ ./python_map_multiple_funcs.py
[2, 1]
[4, 4]
[6, 9]
[8, 16]
[10, 25]

The first value is formed by addition, the second
one by multiplication.

## Python list comprehension

The functionality of Python map can be achieved with Python list
comprehensions as well.

python_list_comprehension.py
  

#!/usr/bin/python

def square(x):

    return x * x

nums = [1, 2, 3, 4, 5]

nums_squared = [square(num) for num in nums]

for num in nums_squared:

    print(num)

The example creates a list of squared values from a list of integers with Python
list comprehension.

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have worked with the Python map function.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).