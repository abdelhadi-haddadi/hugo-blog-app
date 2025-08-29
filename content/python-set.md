+++
title = "Python set"
date = 2025-08-29T20:10:22.024+01:00
draft = false
description = "Python set tutorial presents the Python set collection. We show how to create sets and perform operations on them."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python set

last modified January 29, 2024

Python set tutorial presents the Python set collection. We show how to create
sets and perform operations on them.

## Python set

A Python set is an unordered collection of data with no duplicate
elements. A set supports operations like union, intersection, or difference,
known from Mathematics.

## Python set literal

It is possible to create sets with literal notation. We use curly brackets to
define a set in Python and the elements are separated with the comma character.

python_set_literal.py
  

#!/usr/bin/python

nums = { 1, 2, 2, 2, 3, 4 }

print(type(nums))
print(nums)

The example creates a Python set with literal notation.

nums = { 1, 2, 2, 2, 3, 4 }

A set is a collection of unique elements; even though we have
provided value 2 three times, the set will contain only one 2.

$ ./python_set_literal.py
&lt;class 'set'&gt;
{1, 2, 3, 4}

## Python set function

The Python set function creates a new set whose elements
are taken from an iterable. An iterable is an object we can iterate over; such
as a string or a list.

python_set_fun.py
  

#!/usr/bin/python

seasons = ["spring", "summer", "autumn", "winter"]

myset = set(seasons)

print(myset)

In the example, we create a set from a list with the set
built-in function.

$ ./python_set_fun.py
{'summer', 'autumn', 'winter', 'spring'}

## Python set membership testing

The in and not in operators test for
the existence of an element in the set.

python_set_membership.py
  

#!/usr/bin/python

words = { "spring", "table", "cup", "bottle", "coin" }

word = 'cup'

if (word in words):
    print("{0} is present in the set".format(word))
else:
    print("{0} is not present in the set".format(word))

word = 'tree'

if (word not in words):
    print("{0} is not present in the set".format(word))
else:
    print("{0} is present in the set".format(word))

We check if two words are present in the set with the membership
operators.

$ ./python_set_membership.py
cup is present in the set
tree is not present in the set

## Python set built-in functions

There are several built-in Python functions, such as len, or
min, that can be used on Python sets.

python_set_builtins.py
  

#!/usr/bin/python

nums = { 21, 11, 42, 29, 22, 71, 18 }

print(nums)

print("Number of elements: {0}".format(len(nums)))
print("Minimum: {0}".format(min(nums)))
print("Maximum: {0}".format(max(nums)))
print("Sum: {0}".format(sum(nums)))

print("Sorted elements:")

print(sorted(nums))

In the example we apply five built-in functions on a set of
integer values.

print("Number of elements: {0}".format(len(nums)))

The len method returns the number of elements in the set.

print("Minimum: {0}".format(min(nums)))

The min method returns the minimum value in the set.

print("Maximum: {0}".format(max(nums)))

The max method returns the maximum value in the set.

print("Sum: {0}".format(sum(nums)))

The sum method returns the summation of values in the set.

print(sorted(nums))

Finally, with the sorted method, we can create a sorted list
from the set, which is unordered.

$ ./python_set_builtins.py
{71, 42, 11, 18, 21, 22, 29}
Number of elements: 7
Minimum: 11
Maximum: 71
Sum: 214
Sorted elements:
[11, 18, 21, 22, 29, 42, 71]

## Python set iteration

A Python set can be iterated with a for loop.

python_set_iteration.py
  

#!/usr/bin/python

words = { "spring", "table", "cup", "bottle", "coin" }

for word in words:

    print(word)

In the example, we go through the set and print its elements
one by one.

$ ./python_set_iteration.py
table
cup
coin
spring
bottle

## Python set add

The Python set add method adds a new element to the
set.

python_set_add.py
  

#!/usr/bin/python

words = { "spring", "table", "cup", "bottle", "coin" }

words.add("coffee")

print(words)

We have a set of words. We add a new word with the add
method.

$ ./python_set_add.py
{'table', 'coffee', 'coin', 'spring', 'bottle', 'cup'}

## Python set update

The Python set update method adds one or more iterables
to the set.

python_set_update.py
  

#!/usr/bin/python

words = { "spring", "table", "cup", "bottle", "coin" }

words.add("coffee")

print(words)

words2 = { "car", "purse", "wind" }
words3 = { "nice", "prime", "puppy" }

words.update(words2, words3)

print(words)

We have three sets of words. We add the second and third set to the
first set with the update method.

$ ./python_set_update.py
{'spring', 'bottle', 'cup', 'coin', 'purse', 'wind', 'nice', 'car',
 'table', 'prime', 'puppy'}

## Python set remove

Python has two basic methods for removing elements: remove and
discard. The remove method removes the specified
element from the set and raises KeyError if the element is not in
the set. The discard method removes an element from the set and does
nothing if the element to be removed is not in the set.

python_set_remove.py
  

#!/usr/bin/python

words = { "spring", "table", "cup", "bottle", "coin" }

words.discard("coin")
words.discard("pen")

print(words)

words.remove("cup")

try:
    words.remove("cloud")
except KeyError as e:
    pass

print(words)

In the example, we delete set elements with remove and
discard.

try:
    words.remove("cloud")
except KeyError as e:
    pass

If we did not catch the KeyError, the script would terminate
without executing the last statement.

$ ./python_set_remove.py
{'table', 'cup', 'bottle', 'spring'}
{'table', 'bottle', 'spring'}

## Python set pop &amp; clear

The pop method removes and returns an arbitrary element
from the set. The clear method removes all elements from
the set.

python_set_remove2.py
  

#!/usr/bin/python

words = { "spring", "table", "cup", "bottle", "coin", "pen", "water" }

print(words.pop())
print(words.pop())

print(words)

words.clear()

print(words)

In the example, we delete and print two random elements and show the
remaining elements. Then we remove all elements from the set with clear.

$ ./python_set_remove2.py
water
pen
{'cup', 'spring', 'table', 'bottle', 'coin'}
set()

## Python set operations

With Python sets we can perform specific operations: union, intersection,
difference, and symmetric difference.

python_set_operations.py
  

#!/usr/bin/python

set1 = { 'a', 'b', 'c', 'c', 'd' }
set2 = { 'a', 'b', 'x', 'y', 'z' }

print("Set 1:", set1)
print("Set 2:", set2)
print("intersection:", set1.intersection(set2))
print("union:", set1.union(set2))
print("difference:", set1.difference(set2))
print("symmetric difference:", set1.symmetric_difference(set2))

The example shows four set operations.

print("intersection:", set1.intersection(set2))

The intersection method carries out the intersection operation, which
returns elements that are both in set1 and set2.

print("union:", set1.union(set2))

The union method  carries out the union operation,
which returns all elements from both sets.

print("difference:", set1.difference(set2))

The difference method carries out the difference operation, which
returns elements that are in the set1 but not in set2.

print("symmetric difference:", set1.symmetric_difference(set2))

The symmetric_difference method carries out the symmetric
difference operation, which returns elements that are in set1 or
set2, but not in both.

$ ./python_set_operations.py
Set 1: {'c', 'b', 'a', 'd'}
Set 2: {'y', 'b', 'a', 'x', 'z'}
intersection: {'b', 'a'}
union: {'b', 'a', 'z', 'c', 'x', 'y', 'd'}
difference: {'c', 'd'}
symmetric difference: {'z', 'c', 'x', 'y', 'd'}

It is possible to perform these operations using &amp;, |, -, and ^
operators.

python_set_operations2.py
  

#!/usr/bin/python

set1 = { 'a', 'b', 'c', 'c', 'd' }
set2 = { 'a', 'b', 'x', 'y', 'z' }

print("Set 1:", set1)
print("Set 2:", set2)
print("intersection:", set1 &amp; set2)
print("union:", set1 | set2)
print("difference:", set1 - set2)
print("symmetric difference:", set1 ^ set2)

The example shows four set operations using operators.

## Subsets and supersets

If all elements of set A are contained withing set B, A is called a subset of
B and B a superset of A.

python_subset_superset.py
  

#!/usr/bin/python

set1 = { 'a', 'b', 'c', 'd', 'e' }
set2 = { 'a', 'b', 'c' }
set3 = {'x', 'y', 'z' }

if (set2.issubset(set1)):
    print("set2 is a subset of set1")

if (set1.issuperset(set2)):
    print("set1 is a superset of set2")

if (set2.isdisjoint(set3)):
    print("set2 and set3 have no common elements")

In the example, we use issubset, issuperset,
and isdisjoint methods.

if (set2.issubset(set1)):
    print("set1 is a subset of set2")

With the issubset method we check if set2 is a subset
of s1.

if (set1.issuperset(set2)):
    print("set1 is a superset of set2")

With the issuperset method we check if set1 is a
superset of s2.

if (set2.isdisjoint(set3)):
    print("set2 and set3 have no common elements")

With the isdisjoint method we check if set2 and
set3 have no common elements.

$ ./python_subset_superset.py
set1 is a subset of set2
set1 is a superset of set2
set2 and set3 have no common elements

## Python immutable sets

Immutable sets (sets that cannot be modified) are created with the
frozenset function.

&gt;&gt;&gt; s1 = frozenset(('blue', 'green', 'red'))
&gt;&gt;&gt; s1
frozenset({'red', 'green', 'blue'})
&gt;&gt;&gt; s1.add('brown')
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in &lt;module&gt;
AttributeError: 'frozenset' object has no attribute 'add'

There is an error when we try to add a new element to a frozen set.

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have worked with the Python set collection.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).