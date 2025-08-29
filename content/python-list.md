+++
title = "Python list"
date = 2025-08-29T20:08:48.750+01:00
draft = false
description = "Python list tutorial shows how to work with a list collection in Python. Python list is an ordered collection of elements."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list

last modified January 29, 2024

In this article we show how to work with a Python list collection.

## Python list definition

A list is an ordered collection of values. It can contain various
types of values. A list is a mutable container. This means that we can add
values, delete values, or modify existing values.

Python list represents a mathematical concept of a finite sequence. Values of a
list are called items or elements of the list. A list can contain the same value
multiple times. Each occurrence is considered a distinct item.

## Python simple list

List elements can be accessed by their index. The first element has index 0, the
last one has index -1.

simple.py
  

#!/usr/bin/python

# simple.py

nums = [1, 2, 3, 4, 5]

print(nums[0])
print(nums[-1])
print(nums)

This is a simple list having five elements. The list is delimited by square
brackets []. The elements of a list are separated by a comma
character. The contents of a list are printed to the console.

nums = [1, 2, 3, 4, 5]

The right side of the assignment is a Python list literal. It creates a list
containing five elements.

$ ./simple.py
1
5
[1, 2, 3, 4, 5]

Lists can contain elements of various data types.

various_types.py
  

#!/usr/bin/python

# various_types.py

class Being:
    pass

objects = [1, -2, 3.4, None, False, [1, 2], "Python", (2, 3), Being(), {}]
print(objects)

In the example, we create an objects list. It contains numbers, a boolean value,
another list, a string, a tuple, a custom object, and a dictionary.

$ ./various_types.py
[1, -2, 3.4, None, False, [1, 2], 'Python', (2, 3),
    &lt;__main__.Being instance at 0x7f653577f6c8&gt;, {}]

## Python list initialization

Sometimes we need to initialize a list in advance to
have a particular number of elements.

initialization.py
  

#!/usr/bin/python

n1 = [0 for i in range(15)]
n2 = [0] * 15

print(n1)
print(n2)

n1[0:10] = [10] * 10

print(n1)

In this example we initialize two lists using a list comprehension and a *
operator.

n1 = [0 for i in range(15)]
n2 = [0] * 15

These two lists are initialized to fifteen zeros.

n1[0:10] = [10] * 10

First ten values are replaced with 10s.

$ ./initialization.py
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0]

## Python list function

The list function creates a list from an iterable object. An
iterable may be either a sequence, a container that supports iteration, or an
iterator object.  If no parameter is specified, a new empty list is created.

list_fun.py
  

#!/usr/bin/python

# list_fun.py

a = []
b = list()

print(a == b)

print(list((1, 2, 3)))
print(list("ZetCode"))
print(list(['Ruby', 'Python', 'Perl']))

In the example, we create an empty list, a list from a tuple,
a string, and another list.

a = []
b = list()

These are two ways to create an empty list.

print(a == b)

The line prints True. This confirms that a and
b are equal.

print(list((1, 2, 3)))

We create a list from a Python tuple.

print(list("ZetCode"))

This line produces a list from a string.

print(list(['Ruby', 'Python', 'Perl']))

Finally, we create a copy of a list of strings.

$ ./list_fun.py
True
[1, 2, 3]
['Z', 'e', 't', 'C', 'o', 'd', 'e']
['Ruby', 'Python', 'Perl']

## Python list operations

The following code shows some basic list operations.

list_oper.py
  

#!/usr/bin/python

# list_oper.py

n1 = [1, 2, 3, 4, 5]
n2 = [3, 4, 5, 6, 7]

print(n1 == n2)
print(n1 + n2)

print(n1 * 3)

print(2 in n1)
print(2 in n2)

We define two lists of integers. We use a few operators on these lists.

print(n1 == n2)

The contents of the lists are compared with the ==
operator. The line prints False since the elements are different.

print(n1 + n2)

The n1 and n2 lists are added to form a
new list. The new list has all elements of both the lists.

print(n1 * 3)

We use the multiplication operator on the list. It repeats the elements
n times; three times in our case.

print(2 in n1)

We use the in operator to find out whether the value is present
in the list. It returns a boolean True or False.

$ ./lists.py
False
[1, 2, 3, 4, 5, 3, 4, 5, 6, 7]
[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
True
False

## Python sequence functions

Sequence functions can be used on any sequence types, including lists.

sequence_funs.py
  

#!/usr/bin/python

# sequence_funs.py

n = [1, 2, 3, 4, 5, 6, 7, 8]

print("There are {0} items".format(len(n)))
print("Maximum is {0}".format(max(n)))
print("Minimum is {0}".format(min(n)))
print("The sum of values is {0}".format(sum(n)))

In the example above, we have four functions: len, max,
min, and sum.

print("There are {0} items".format(len(n)))

The len function returns the size of the list. The number of
elements of the list.

print("Maximum is {0}".format(max(n)))
print("Minimum is {0}".format(min(n)))

The max and min functions return the maximum
and the minimum of the list.

print("The sum of values is {0}".format(sum(n)))

The sum function calculates the sum of the numbers
of the n list.

$ ./sequence_funs.py
There are 8 items
Maximum is 8
Minimum is 1
The sum of values is 36

## Python adding list elements

This section will show how elements are added to a Python list.

adding.py
  

#!/usr/bin/python

# adding.py

langs = []

langs.append("Python")
langs.append("Perl")
print(langs)

langs.insert(0, "PHP")
langs.insert(2, "Lua")
print(langs)

langs.extend(("JavaScript", "ActionScript"))
print(langs)

We have three methods to add new elements to a list: append,
insert, and extend.

langs = []

An empty list is created.

langs.append("Python")
langs.append("Perl")

The append method adds an item at the end of the list;
we append two strings.

langs.insert(0, "PHP")
langs.insert(2, "Lua")

The insert method places an element at a specific position
indicated by the index number. The "PHP" string is inserted at the
first position, the "Lua" string at the third position. Note that
list index numbers start from zero.

langs.extend(("JavaScript", "ActionScript"))

The extend method adds a sequence of values to the end of a list.
In our case two strings of a Python tuple are appended at the end of our list.

$ ./adding.py
['Python', 'Perl']
['PHP', 'Python', 'Lua', 'Perl']
['PHP', 'Python', 'Lua', 'Perl', 'JavaScript', 'ActionScript']

## Python list IndexError

The IndexError is raised when a list subscript is out of range.

index_error.py
  

#!/usr/bin/python

# index_error.py

n = [1, 2, 3, 4, 5]

try:

    n[0] = 10
    n[6] = 60

except IndexError as e:

    print(e)

In the script we have defined a list of five integers. These elements have
indexes 0, 1, 2, 3, and 4. Using a bigger index leads to an error.

n[6] = 60

Index 6 is out of range for our list. An IndexError is thrown.

except IndexError as e:

    print(e)

We catch the error using the except clause. In the body of the
clause, we print the error message.

$ ./index_error.py
list assignment index out of range

## Python list TypeError

If an index of a tuple is not a plain integer a TypeError
is thrown.

type_error.py
  

#!/usr/bin/python

# type_error.py

n = [1, 2, 3, 4, 5]

try:
    print(n[1])
    print(n['2'])

except TypeError as e:

    print("Error in file {0}".format( __file__))
    print("Message: {0}".format(e))

This example throws a TypeError.

print(n['2'])

A list index must be an integer. Other types end in error.

except TypeError as e:

    print("Error in file {0}".format( __file__))
    print("Message: {0}".format(e))

In the except block, we print the name of the file, where the exception has
occurred and the message string.

$ ./typeerror.py
2
Error in file ./typeerror.py
Message: list indices must be integers, not str

## Python list remove elements

Previously we have added items to a list. Now we be removing them from a list.

removing.py
  

#!/usr/bin/python

# removing.py

langs = ["Python", "Ruby", "Perl", "Lua", "JavaScript"]
print(langs)

lang = langs.pop(3)
print("{0} was removed".format(lang))

lang = langs.pop()
print("{0} was removed".format(lang))

print(langs)

langs.remove("Ruby")
print(langs)

The pop method removes and returns an element with a specified
index or the last element if the index number is not given. The
remove method removes a particular item from a list.

lang = langs.pop(3)
print("{0} was removed".format(lang))

We take away the element which has index 3. The pop method returns
the name of the removed element; it is printed to the console.

lang = langs.pop()
print("{0} was removed".format(lang))

The last element from the list, namely "JavaScript" string, is
removed from the list.

langs.remove("Ruby")

This line removes a "Ruby" string from the langs list.

['Python', 'Ruby', 'Perl', 'Lua', 'JavaScript']
Lua was removed
JavaScript was removed
['Python', 'Ruby', 'Perl']
['Python', 'Perl']

From the ouput of the script we can see the effects of the described methods.

A del keyword can be used to delete list elements as well.

removing2.py
  

#!/usr/bin/python

# removing2.py

langs = ["Python", "Ruby", "Perl", "Lua", "JavaScript"]
print(langs)

del langs[1]
print(langs)

#del langs[15]

del langs[:]
print(langs)

We have a list of strings. We use the del keyword to delete
list elements.

del langs[1]

We remove the second string from the list. It is the "Ruby" string.

#del langs[15]

We can delete only existing elements. If we uncomment the code line, we
receive an IndexError message.

del langs[:]

Here we remove all the remaining elements from the list. The [:]
characters refer to all items of a list.

$ ./removing2.py
['Python', 'Ruby', 'Perl', 'Lua', 'JavaScript']
['Python', 'Perl', 'Lua', 'JavaScript']
[]

## Python modify list elements

In the next example we be modifying list elements.

modifying.py
  

#!/usr/bin/python

# modifying.py

langs = ["Python", "Ruby", "Perl"]

langs.pop(2)
langs.insert(2, "PHP")
print(langs)

langs[2] = "Perl"
print(langs)

In the example we modify the third element of the langs list twice.

langs.pop(2)
langs.insert(2, "PHP")

One way to modify an element is to remove it and place a different
element at the same position.

langs[2] = "Perl"

The other method is more straightforward. We assign a new element at a given
position. Now there is "Perl" string at the third position again.

$ ./modifying.py
['Python', 'Ruby', 'PHP']
['Python', 'Ruby', 'Perl']

## Python copy list

There are several ways how we can copy a list in Python. We will mention a few
of them.

copying.py
  

#!/usr/bin/python

# copying.py

import copy

w = ["Python", "Ruby", "Perl"]

c1 = w[:]
c2 = list(w)
c3 = copy.copy(w)
c4 = copy.deepcopy(w)
c5 = [e for e in w]

c6 = []

for e in w:
    c6.append(e)

c7 = []
c7.extend(w)

print(c1, c2, c3, c4, c5, c6, c7)

We have a list of three strings. We make a copy of the list
seven times.

import copy

We import the copy module which has two methods for copying.

c1 = w[:]

A list is copied using the slice syntax.

c2 = list(w)

The list function creates a copy of a list when it takes
a list as a parameter.

c3 = copy.copy(w)
c4 = copy.deepcopy(w)

The copy method produces a shallow copy of a list. The
deepcopy produces a deep copy of a list.

c5 = [e for e in w]

A copy of a string is created using list comprehension.

c6 = []

for e in w:
    c6.append(e)

A copy created by a for loop.

c7 = []
c7.extend(w)

The extend method can be used to create a copy
too.

$ ./copying.py
['Python', 'Ruby', 'Perl'] ['Python', 'Ruby', 'Perl'] ['Python', 'Ruby', 'Perl']
['Python', 'Ruby', 'Perl'] ['Python', 'Ruby', 'Perl'] ['Python', 'Ruby', 'Perl']
['Python', 'Ruby', 'Perl']

Seven copies of a string list were created using different techniques.

## Python indexing list elements

Elements in a Python list can be accessed by their index. Index numbers are
integers; they start from zero. Indexes can be negative; negative indexes refer
to elements from the end of the list. The first item in a list has index 0, the
last item has -1.

indexing.py
  

#!/usr/bin/python

# indexing.py

n = [1, 2, 3, 4, 5, 6, 7, 8]

print(n[0])
print(n[-1])
print(n[-2])

print(n[3])
print(n[5])

We can access an element of a list by its index. The index is placed between the
square brackets [] after the name of the list.

print(n[0])
print(n[-1])
print(n[-2])

These three lines print the first, the last and the last but one item of the
list.

print(n[3])
print(n[5])

The two lines print the fourth and sixth element of the list.

$ ./indexing.py
1
8
7
4
6

The index(e, start, end) method looks for a particular element and
returns its lowest index. The start and end are optional parameters that limit the
search to given boundaries.

indexing2.py
  

#!/usr/bin/python

# indexing2.py

n = [1, 2, 3, 4, 1, 2, 3, 1, 2]

print(n.index(1))
print(n.index(2))

print(n.index(1, 1))
print(n.index(2, 2))

print(n.index(1, 2, 5))
print(n.index(3, 4, 8))

A code example with the index method.

print(n.index(1))
print(n.index(2))

These two lines print the indexes of the leftmost 1, 2 values of
the n list.

print(n.index(1, 1))
print(n.index(2, 2))

Here we search for values 1 and 2 after specified indexes.

print(n.index(1, 2, 5))

Here we search for value 1 between values with indexes 2 and 5.

$ ./indexing2.py
0
1
4
5
4
6

## Python slice list

List slicing is an operation that extracts certain elements from a list and
forms them into another list. Possibly with different number of indices and
different index ranges.

The syntax for list slicing is as follows:

[start:end:step]

The start, end, step parts of the syntax are integers. Each of them is optional.
They can be both positive and negative. The value having the end index is not
included in the slice.

slice.py
  

#!/usr/bin/python

# slice.py

n = [1, 2, 3, 4, 5, 6, 7, 8]

print(n[1:5])
print(n[:5])
print(n[1:])
print(n[:])

We create four slices from a list of eight integers.

print(n[1:5])

The first slice has values with indexes 1, 2, 3, and 4.
The newly formed list is [2, 3, 4, 5].

print(n[:5])

If the start index is omitted then a default value is assumed, which is 0.
The slice is [1, 2, 3, 4, 5].

print(n[1:])

If the end index is omitted, the -1 default value is taken. In such a case a
slice takes all values to the end of the list.

print(n[:])

Even both indexes can be left out. This syntax creates a copy of a list.

$ ./slice.py
[2, 3, 4, 5]
[1, 2, 3, 4, 5]
[2, 3, 4, 5, 6, 7, 8]
[1, 2, 3, 4, 5, 6, 7, 8]

The third index in a slice syntax is the step. It allows us to take every
n-th value from a list.

slice2.py
  

#!/usr/bin/python

# slice2.py

n = [1, 2, 3, 4, 5, 6, 7, 8]

print(n[1:9:2])
print(n[::2])
print(n[::1])
print(n[1::3])

We form four new lists using the step value.

print(n[1:9:2])

Here we create a slice having every second element from the n list, starting from
the second element, ending in the eighth element. The new list has the following
elements: [2, 4, 6, 8].

print(n[::2])

Here we build a slice by taking every second value from the beginning to the end
of the list.

print(n[::1])

This creates a copy of a list.

print(n[1::3])

The slice has every third element, starting from the second element to the end
of the list.

$ ./slice2.py
[2, 4, 6, 8]
[1, 3, 5, 7]
[1, 2, 3, 4, 5, 6, 7, 8]
[2, 5, 8]

Indexes can be negative numbers. Negative indexes refer to values from the end
of the list. The last element has index -1, the last but one has index -2 etc.
Indexes with lower negative numbers must come first in the syntax. This means
that we write [-6, -2] instead of [-2, -6]. The latter returns an empty list.

slice3.py
  

#!/usr/bin/python

# slice3.py

n = [1, 2, 3, 4, 5, 6, 7, 8]

print(n[-4:-1])
print(n[-1:-4])

print(n[-5:])
print(n[-6:-2:2])
print(n[::-1])

In this script, we form five lists. We also use negative index numbers.

print(n[-4:-1])
print(n[-1:-4])

The first line returns [5, 6, 7], the second line returns an empty list.
Lower indexes must come before higher indexes.

print(n[::-1])

This creates a reversed list.

$ ./slice3.py
[5, 6, 7]
[]
[4, 5, 6, 7, 8]
[3, 5]
[8, 7, 6, 5, 4, 3, 2, 1]

The above mentioned syntax can be used in assignments. There must be an
iterable on the right side of the assignment.

slice4.py
  

#!/usr/bin/python

# slice4.py

n = [1, 2, 3, 4, 5, 6, 7, 8]

n[0] = 10
n[1:3] = 20, 30
n[3::1] = 40, 50, 60, 70, 80

print(n)

We have a list of eight integers. We use the slice syntax to replace the
elements with new values.

## Python loop list

This section will point out three basic ways to traverse a list in Python.

traverse.py
  

#!/usr/bin/python

# traverse.py

n = [1, 2, 3, 4, 5]

for e in n:
    print(e, end=" ")

print()

The first one is the most straightforward way to traverse a list.

n = [1, 2, 3, 4, 5]

We have a numerical list. There are five integers in the list.

for e in n:
    print(e, end=" ")

Using the for loop, we go through the list one by one
and print the current element to the console.

$ ./traverse.py
1 2 3 4 5

This is the output of the script. The integers are printed to the
terminal.

The second example is a bit more verbose.

traverse2.py
  

#!/usr/bin/python

# traverse2.py

n = [1, 2, 3, 4, 5]

i = 0
s = len(n)

while i &lt; s:

    print(n[i], end=" ")
    i = i + 1

print()

We are traversing the list using the while loop.

i = 0
l = len(n)

First, we need to define a counter and find out the size of the list.

while i &lt; s:

    print(n[i], end=" ")
    i = i + 1

With the help of these two numbers, we go through the list and
print each element to the terminal.

The enumerate built-in function gives us both the
index and the value of a list in a loop.

traverse3.py
  

#!/usr/bin/python

# traverse3.py

n = [1, 2, 3, 4, 5]

print(list(enumerate(n)))

for e, i in enumerate(n):
    print("n[{0}] = {1}".format(e, i))

In the example, we print the values and
the indexes of the values.

$ ./traverse3.py
[(0, 1), (1, 2), (2, 3), (3, 4), (4, 5)]
n[0] = 1
n[1] = 2
n[2] = 3
n[3] = 4
n[4] = 5

## Python count list elements

Sometimes it is important to count list elements. For this, Python has the
count method.

counting.py
  

#!/usr/bin/python

# counting.py

n = [1, 1, 2, 3, 4, 4, 4, 5]

print(n.count(4))
print(n.count(1))
print(n.count(2))
print(n.count(6))

In this example, we count the number of occurrences of a few numbers
in the n list.

n = [1, 1, 2, 3, 4, 4, 4, 5]

We have a list of integer numbers. Integers 1 and 4 are present multiple times.

print(n.count(4))
print(n.count(1))
print(n.count(2))
print(n.count(6))

Using the count method, we find out the occurrence
of 4, 1, 2, and 6 numbers.

$ ./counting.py
3
2
1
0

Number 4 is present 3 times, 1 twice, 2 once, and 6 is not
present in the list.

## Python nested lists

It is possible to nest lists into another lists. With a nested list a new
dimension is created. To access nested lists one needs additional square
brackets [].

nested.py
  

#!/usr/bin/python

# nested.py

nums = [[1, 2], [3, 4], [5, 6]]

print(nums[0])
print(nums[1])
print(nums[2])

print(nums[0][0])
print(nums[0][1])

print(nums[1][0])
print(nums[2][1])

print(len(nums))

In the example, we have three nested lists having two elements each.

print(nums[0])
print(nums[1])
print(nums[2])

Three nested lists of the nums list are printed to the console.

print(nums[0][0])
print(nums[0][1])

Here we print the two elements of the first nested list. The
nums[0] refers to the first nested list; the
nums[0][0] refers to the first element of the first nested list,
namely 1.

print(len(nums))

The line prints 3. Each nested list is counted as one element. Its inner
elements are not taken into account.

$ ./nested.py
[1, 2]
[3, 4]
[5, 6]
1
2
3
6
3

The second example has additional dimensions.

nested2.py
  

#!/usr/bin/python

# nested2.py

nums = [[1, 2, [3, 4, [5, 6]]]]

print(nums[0])
print(nums[0][2])
print(nums[0][2][2])

print(nums[0][0])
print(nums[0][2][1])
print(nums[0][2][2][0])

In the example, the [5, 6] list is nested into [3, 4, ...] list, the
[3, 4, [4, 6]] is nested into the [1, 2, ...] list which is finally an
element of the nums list.

print(nums[0])
print(nums[0][2])
print(nums[0][2][2])

These three lines print the nested lists to the console.

print(nums[0][0])
print(nums[0][2][1])
print(nums[0][2][2][0])

Here three elements are accessed. Additional square brackets []
are needed when referring to inner lists.

$ ./nested2.py
[1, 2, [3, 4, [5, 6]]]
[3, 4, [5, 6]]
[5, 6]
1
4
5

## Python sort list

In this section we sort list elements. Python has a built-in list method
sort and sorted function for doing sorting.

sorting.py
  

#!/usr/bin/python

# sorting.py

n = [3, 4, 7, 1, 2, 8, 9, 5, 6]
print(n)

n.sort()
print(n)

n.sort(reverse=True)
print(n)

In the code example, we have a list of unsorted integers. We sort the elements
using the sort method. The method sorts the elements in-place; the
original list is modified.

n.sort()

The sort method sorts the elements in ascending order.

n.sort(reverse=True)

With the reverse parameter set to True, the list is sorted in a
descending order.

$ ./sorting.py
[3, 4, 7, 1, 2, 8, 9, 5, 6]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
[9, 8, 7, 6, 5, 4, 3, 2, 1]

In the output we can see the original list, the sorted list in ascending and
descending orders.

If we do not want to change the original list, we can use the
sorted function. This function creates a new sorted list.

sorting2.py
  

#!/usr/bin/python

# sorting2.py

n = [3, 4, 1, 7, 2, 5, 8, 6]

print(n)
print(sorted(n))
print(n)

In the example, we use the sorted function
to sort the elements of a list.

$ ./sorting2.py
[3, 4, 1, 7, 2, 5, 8, 6]
[1, 2, 3, 4, 5, 6, 7, 8]
[3, 4, 1, 7, 2, 5, 8, 6]

From the output of the script we can see that the original
list is not modified.

The sort method has an optional key parameter. The
parameter specifies a function to be called on each list element prior to making
comparisons.

sorting3.py
  

#!/usr/bin/python

# sorting3.py

words = ["big", "Blue", "seven", "glass",
         "Green", "after", "Anctartica"]

words.sort()
print(words)

words.sort(key=str.lower)
print(words)

The example produces a case-sensitive and case-insensitive string comparison.

words.sort(key=str.lower)

To create a case-insensitive comparison, we add the str.lower
function to the key parameter.

$ ./sorting3.py
['Anctartica', 'Blue', 'Green', 'after', 'big', 'glass', 'seven']
['after', 'Anctartica', 'big', 'Blue', 'glass', 'Green', 'seven']

We need to do additional work if we want to sort Unicode strings.

sorting_locale.py
  

#!/usr/bin/python

import locale
from functools import cmp_to_key

w = [u'zem', u'štebot', u'rum', u'železo', u'prameň', u"sob"]
locale.setlocale(locale.LC_COLLATE, ('sk_SK', 'UTF8'))

w.sort(key=cmp_to_key(locale.strcoll))

for e in w:
    print(e)

We have a list of six unicode strings. We change the locale settings to sort the
strings according to current language option.

import locale
from functools import cmp_to_key

We import the locale module and the cmp_to_key conversion
function.

w = [u'zem', u'štebot', u'rum', u'železo', u'prameň', u"sob"]

This is a list of six strings. The strings are in Slovak language and have
some diacritical marks. They play role in sorting the characters correctly.

locale.setlocale(locale.LC_COLLATE, ('sk_SK', 'UTF8'))

We set the locale settings for the Slovak language.

w.sort(key=cmp_to_key(locale.strcoll))

We sort the list. The locale.strcoll compares two strings according
to the current LC_COLLATE setting. The cmp_to_key
function transform an old-style comparison function to a
key-function.

for e in w:
    print(e)

We print the sorted words to the console.

$ ./sorting_locale.py
prameň
rum
sob
štebot
zem
železo

The elements were correctly sorted. The specifics of the Slovak alphabet were
taken into account.

## Python reverse list elements

We can reverse elements in a list in a few ways in Python. Reversing elements
should not be confused with sorting in a reverse way.

reversing.py
  

#!/usr/bin/python

# reversing.py

a1 = ["bear", "lion", "tiger", "eagle"]
a2 = ["bear", "lion", "tiger", "eagle"]
a3 = ["bear", "lion", "tiger", "eagle"]

a1.reverse()
print(a1)

it = reversed(a2)
r = list()

for e in it:
    r.append(e)

print(r)

print(a3[::-1])

In the example, we have three identical string lists. We reverse the elements in
three different ways.

a1.reverse()

The first way is to use the reverse method.

it = reversed(a2)
r = list()

for e in it:
    r.append(e)

The reversed function returns a reverse iterator. We use the
iterator in a for loop and create a new reversed list.

print(a3[::-1])

The third way is to reverse the list using the slice syntax, where the step
parameter is set to -1.

$ ./reversing.py
['eagle', 'tiger', 'lion', 'bear']
['eagle', 'tiger', 'lion', 'bear']
['eagle', 'tiger', 'lion', 'bear']

All the three lists were reversed OK.

## Python list comprehension

A *list comprehension* is a syntactic construct which creates a list
based on existing list. The syntax was influenced by mathematical notation of
sets. The Python syntax was inspired by the Haskell programming language.

L = [expression for variable in sequence [if condition]]

The above pseudo code shows the syntax of a list comprehension. A list
comprehension creates a new list. It is based on an existing list. A for loop
goes through the sequence. For each loop an expression is evaluated if the
condition is met. If the value is computed it is appended to the new list. The
condition is optional.

List comprehensions provide a more concise way to create lists in situations
where map and filter and/or nested loops could be used.

list_comprehension.py
  

#!/usr/bin/python

# list_comprehension.py

a = [1, 2, 3, 4, 5, 6, 7, 8, 9]

b = [e for e in a if e % 2]
print(b)

In the example we have defined a list of numbers. With the help of the list
comprehension, we create a new list of numbers that cannot be divided by 2
without a remainder.

a = [1, 2, 3, 4, 5, 6, 7, 8, 9]

```
b = [e for e in a if e % 2]

```

Here we have the list comprehension. In the for e in a loop
each element of a list is taken. Then a if e % 2 condition
is tested. If the condition is met, an expression is evaluated. In our
case the expression is a pure e which takes the element as
it is. Finally, the element is appended to the list.

$ ./list_comprehension.py
[1, 3, 5, 7, 9]

he numbers in a list cannot be divided by 2, without a remainder.

In the second example we compare a list comprehension to a traditional
for loop.

list_comprehension2.py
  

#!/usr/bin/python

# list_comprehension2.py

lang = "Python"

a = []

for e in lang:
    a.append(ord(e))

b = [ord(e) for e in lang]

print(a)
print(b)

In the example we have a string. We want to create a list of the ASCII integer
codes of the letters of the string.

a = []

for e in lang:
    a.append(ord(e))

We create such a list with the for loop.

b = [ord(e) for e in lang]

Here the same is produced using a list comprehension. Note that the if condition
was omitted. It is optional.

$ ./list_comprehension2.py
[80, 121, 116, 104, 111, 110]
[80, 121, 116, 104, 111, 110]

Check [Python list comprehensions](/python/listcomprehensions/)
for more details.

## Python map and filter functions

The map and filter functions are mass functions that
work on all list items. They are part of the functional programming built into
the Python language.

Today, it is recommended to use list comprehensions instead of these
functions where possible.

map_fun.py
  

#!/usr/bin/python

# map_fun.py

def to_upper(s):

    return s.upper()

words = ["stone", "cloud", "dream", "sky"]

words2 = list(map(to_upper, words))
print(words2)

The map function applies a particular function to every
element of a list.

def to_upper(s):

    return s.upper()

This is the definition of the function that will be applied
to every list element. It calls the upper string
method on a given string.

words = ["stone", "cloud", "dream", "sky"]

```
words2 = map(to_upper, words)
print(words2)

```

The map function applies the to_upper
function to every string element of the words list. A new list is formed and
returned back. We print it to the console.

$ ./map_fun.py
['STONE', 'CLOUD', 'DREAM', 'SKY']

Every item of the list is in capital letters.

The filter function constructs a list from those elements of
the list for which a function returns true.

filter_fun.py
  

#!/usr/bin/python

# filter_fun.py

def positive(x):
    return x &gt; 0

n = [-2, 0, 1, 2, -3, 4, 4, -1]

print(list(filter(positive, n)))

An example demonstrating the filter function.
It will create a new list having only positive values. It will
filter out all negative values and 0.

def positive(x):
    return x &gt; 0

This is the definition of the function used by the filter
function. It returns True or False. Functions that
return a boolean value are called *predicates*.

$ ./filter_fun.py
[1, 2, 4, 4]

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have described Python list collection.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).