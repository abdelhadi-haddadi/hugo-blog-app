+++
title = "Python list slice"
date = 2025-08-29T20:08:49.859+01:00
draft = false
description = "Python list slice tutorial shows create list slices in Python. A list slice is a portion of elements of a list."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list slice

last modified January 29, 2024

In this article we show how to create list slices in Python.

A list is an mutable, ordered collection of values. The list elements can be
accessed by zero-based indexes.

A list slice is a portion of elements of a list.

## Python slice syntax

List slicing is an operation that extracts certain elements from a list and
forms them into another list. Possibly with different number of indices and
different index ranges.

The indexes are zero-based. They can be negative.

The syntax for list slicing is as follows:

[start:end:step]

The start, end, step parts of the syntax are integers. Each of them is optional.
They can be both positive and negative. The value having the end index is not
included in the slice.

We include all elements up to the end index, not including the element with
index end.

## Python list slice start/end

The start index is the beginning index; the end index is the ending index of
a slice.

main.py
  

#!/usr/bin/python

vals = [-2, -1, 0, 1, 2, 3, 4, 5, 6]

last = len(vals)

s1 = vals[0:5]
print(s1)

s2 = vals[2:last]
print(s2)

The program creates two slices.

last = len(vals)

With the len function, we get the size of the list. Since the end
index of a slice is not included, it can be used in the slice syntax.

s1 = vals[0:5]

We create a list slice with start=0 and end=5. The elements with indexes 0, 1,
2, 3 and 4 are included in the slice.

s2 = vals[2:last]

The second slice has elements with indexex 2..last-1.

$ ./main.py
[-2, -1, 0, 1, 2]
[0, 1, 2, 3, 4, 5, 6]

## Python list slice omit indexes

All three indexes of the slice syntax can be ommitted. If we omit the start
index, the slice is created from the first element. If we omit the end index,
the slice is generated up to the last element. If we omit the step, than the
default step is 1.

main.py
  

#!/usr/bin/python

vals = [-2, -1, 0, 1, 2, 3, 4, 5, 6]

s1 = vals[:3]
print(s1)

s2 = vals[3:]
print(s2)

s3 = vals[:]
print(s3)

s4 = vals[::]
print(s4)

In the program, we omit the indexes.

s1 = vals[:3]

We create a slice from the beginning up to the third element.

s2 = vals[3:]
print(s2)

A slice from the fourth element to the last element is created.

s3 = vals[:]

Here we create a copy of the list.

s4 = vals[::]

Here we also create a copy of the list.

$ ./main.py
[-2, -1, 0]
[1, 2, 3, 4, 5, 6]
[-2, -1, 0, 1, 2, 3, 4, 5, 6]
[-2, -1, 0, 1, 2, 3, 4, 5, 6]

## Python slice negative indexes

Indexes can be negative numbers. Negative indexes refer to values from the end
of the list. The last element has index -1, the last but one has index -2 etc.
Indexes with lower negative numbers must come first in the syntax. This means
that we write [-6, -2] instead of [-2, -6]. The latter returns an empty list. 

main.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4, 5, 6, 7, 8]

print(vals[-4:-1])
print(vals[:-2])
print(vals[-1:-4])

The program uses negative start/end indexes.

print(vals[-4:-1])

We create a slice from the fourt index from the end to the penultimate index.

$ ./main.py 
[5, 6, 7]
[1, 2, 3, 4, 5, 6]
[]

## Python list slice step

The third index in a slice syntax is the step. It allows us to take every n-th
value from a list.

main.py
  

#!/usr/bin/python

vals = [-2, -1, 0, 1, 2, 3, 4, 5, 6]

print(vals[1:9:2])
print(vals[::2])
print(vals[::1])
print(vals[1::3])

We form four new lists using the step value.

print(vals[1:9:2])

Here we create a slice having every second element from the n list, starting
from the second element, ending in the eighth element. The new list has the
following elements: [-1, 1, 3, 5].

print(vals[::2])

Here we build a slice by taking every second value from the beginning to the end
of the list.

print(vals[::1])

This creates a copy of a list.

print(vals[1::3])

The slice has every third element, starting from the second element to the end
of the list.

$ ./main.py
[-1, 1, 3, 5]
[-2, 0, 2, 4, 6]
[-2, -1, 0, 1, 2, 3, 4, 5, 6]
[-1, 2, 5]

## Python list slice negative step

With a negative step, we take every nth element from the end. The start index 
must be greater than the end index.

main.py
  

#!/usr/bin/python

vals = [-2, -1, 0, 1, 2, 3, 4, 5, 6]

print(vals[5:0:-2])
print(vals[::-2])
print(vals[::-1])

The program uses negative step.

print(vals[5:0:-2])

We create a slice from the sixth element to the first element, skipping every 
second element.

print(vals[::-2])

This creates a slice of every second element from the end to the beginning.

print(vals[::-1])

This line creates a copy of the list with reversed elements.

$ ./main.py 
[3, 1, -1]
[6, 4, 2, 0, -2]
[6, 5, 4, 3, 2, 1, 0, -1, -2]

## Python list slice assignments

The slice syntax can be used with assignments.

main.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4, 5, 6, 7, 8]

vals[0] = 10
vals[1:3] = 20, 30
vals[3::1] = 40, 50, 60, 70, 80

print(vals)

We have a list of eight integers. We use the slice syntax to replace the
elements with new values. 

$ ./main.py 
[10, 20, 30, 40, 50, 60, 70, 80]

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have covered list slice operations in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).