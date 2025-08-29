+++
title = "Python add list element"
date = 2025-08-29T20:07:35.403+01:00
draft = false
description = "Python add list element tutorial shows how to add elements to a list in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python add list element

last modified January 29, 2024

In this article we show how to add elements to a list in Python.

## Python list

In Python, a list is an ordered collection of values. A list can contain various
types of values. A list is a mutable container, which means that we can add
values, delete values, or modify existing values.

The values of a list are called items or elements of the list. A list can
contain duplicate elements. Each occurrence is considered a distinct item. 

There are several ways of adding elements to list in Python:

     - append method

     - insert method

     - extend method

     - assignment operation

## Python add list element with append

The append method adds an item to the end of the list.

append_method.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4]

vals.append(5)
vals.append(6)

print(vals)

We have a list of integer values. We add new elements to the list with
append.

vals.append(5)
vals.append(6)

Two values are added at the end of the list. The append is a 
built-in method of the list container.

$ ./append_method.py 
[1, 2, 3, 4, 5, 6]

## Python add list element with insert

The insert method inserts an element at the specified position. The
first argument of the function is the index of the element before which to
insert. 

insert_method.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4]

vals.insert(0, -1)
vals.insert(1, 0)
vals.insert(len(vals), 5)

print(vals)

In the example, we insert three new elements to a list.

vals.insert(0, -1)

We insert the -1 value at the beginning of the list. Remember that Python lists
are indexed from 0.

vals.insert(len(vals), 5)

We insert the 5 value at the end of the list. This is equivalent to
append. To get the lenght of the list, we use the len
method.

$ ./insert_method.py 
[-1, 0, 1, 2, 3, 4, 5]

## Python add list element with extend

The extend method appends all the items from the specified
iterable. 

extend_method.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4]
nums = [5, 6, 7]

vals.extend(nums)

print(vals)

In the example, we add elements from the nums list to the
vals list.

$ ./extend_method.py 
[1, 2, 3, 4, 5, 6, 7]

## Python add list element with assignment

We can add new elements with the assignment operation.

assignment.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4]

vals[len(vals):] = [5]
vals[len(vals):] = [6]

print(vals)

The value on the right side of the assignment must be an iterable.

$ ./assignment.py 
[1, 2, 3, 4, 5, 6]

## Source

[Python data structures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have shown how to add elements to a list in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).