+++
title = "Python filter list"
date = 2025-08-29T20:08:30.651+01:00
draft = false
description = "Python list filter tutorial shows how to filter lists in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python filter list

last modified January 29, 2024

Python list filter tutorial shows how to filter lists in Python.

## Filtering

A filtering operation  processes a data structure (e.g. a list) and produces a
new data structure containing exactly those elements for which the given
predicate returns true.

A predicate is a single-argument function which returns a boolean value.

## Python filter list with list comprehension

A list comprehension is a syntactic construct which creates a list
based on existing list. 

A list comprehension creates a new list. It is based on
an existing list. A for loop goes through the sequence. For each loop an
expression is evaluated if the condition is met. If the value is computed it is
appended to the new list. The condition is optional.

list_compr.py
  

#!/usr/bin/python

a = [-2, 1, -4, 2, 0, -1, 12, -3]

b = [e for e in a if e &gt; 0]
print(b)

We have a list of integers. We create a new list of positive integers.

b = [e for e in a if e &gt; 0]

To filter out positive numbers, we use an if condition, which is applied on
each of the elements; the elements are included into the new list only if they
satisfy the condition.

$ ./list_compr.py
[1, 2, 12]

Even numbers are integers that are exactly divisible by 2. Odd numbers are whole
numbers that cannot be divided exactly into pairs.

list_compr2.py
  

#!/usr/bin/python

a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

b = [e for e in a if e % 2]
print(b)

The example creates a new filtered list of odd values. To get an odd number,
we utilize the % operator.

$ ./list_compr2.py
[1, 3, 5, 7, 9, 11]

We can filter values by their data types.

list_compr3.py
  

#!/usr/bin/python

a = ['a', 4, 'c', 12, 'e', 3, 'd']

b = [e for e in a if type(e) == int]
c = [e for e in a if type(e) == str]

print(b)
print(c)

In the example, we have a list that is a mix of integers and strings. We
separate the integers and strings into two new lists.

b = [e for e in a if type(e) == int]

We use the type built-in function to determine the data type of a
value.

$ ./list_compr3.py
[4, 12, 3]
['a', 'c', 'e', 'd']

We can have multiple conditions in a list comprehension.

list_compr4.py
  

#!/usr/bin/python

a = [9, -2, 5, 14, 22, -11, 7, -19, 23]

b = [e for e in a if e % 2 == 0 if e &gt; 0]
print(b)

The example filters out all positive values that are also evens.

$ ./list_compr4.py
[14, 22]

## Python filter list with filter function

The filter is a built-in function which returns iterator from those
elements of iterable that satisfy the given predicate. The function predates 
list comprehensions; it is generally recommended to use list comprehensions.

filter_fun.py
  

#!/usr/bin/python

words = ['sky', 'cloud', 'wood', 'forest', 'tie', 'nice', 'cup']

filtered = filter(lambda e: len(e) == 3, words)
print(list(filtered))

With the filter function, we find out all words that have three 
characters.

filtered = filter(lambda e: len(e) == 3, words)

As a predicate, we have an anonymous function which checks for the length of 
the current element.

print(list(filtered))

The filter function returns an iterator; in order to view the
elements, we pass the iterator to the list function.

$ ./filter_fun.py 
['sky', 'tie', 'cup']

## Python filter list with custom algorithm

The following example uses a custom algorithm to filter a list.

custom_filter.py
  

#!/usr/bin/python

vals = [-1, 2, 0, 11, 9, -3, -4, 3]
positive = []

for val in vals:
    if val &gt; 0:
        positive.append(val)

print(positive)

We use a for loop and a single if condition to filter out all positive values.

$ ./custom_filter.py 
[2, 11, 9, 3]

## Source

[Python data structures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have filtered lists in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).