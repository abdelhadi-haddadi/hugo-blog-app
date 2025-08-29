+++
title = "Python predicate"
date = 2025-08-29T20:09:55.998+01:00
draft = false
description = "Python predicate tutorial shows how to use predicates in several Python predicate examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python predicate

last modified January 29, 2024

In this article we explain and use predicates in Python.

## Predicate

Predicate in general meaning is a statement about something that is
either true or false. In programming, predicates represent single argument
functions that return a boolean value.

## Predicate simple example

The following is a simple example using a predicate function.

simple.py
  

#!/usr/bin/python

def ispos(n):
    return n &gt; 0

vals = [-3, 2, 7, 9, -1, 0, 2, 3, 1, -4, 6]

fres = filter(ispos, vals)

print(list(fres))

We have a list of values. Using the filter function, we filter out 
positive numbers.

def ispos(n):
    return n &gt; 0

The ispos is a simple predicate, which returns true for all values 
that are greater than zero.

fres = filter(ispos, vals)

The filter function takes the predicate as its first argument.
It returns an iterable of values that satisfy the condition.

print(list(fres))

We turn the iterable into a list with the list built-in function.

$ ./simple.py 
[2, 7, 9, 2, 3, 1, 6]

## Anymomous predicate

Anonymous predicates can be created with lambda.

anon.py
  

#!/usr/bin/python

vals = [-3, 2, 7, 9, -1, 0, 2, 3, 1, -4, 6]

fres = filter(lambda e: e &lt; 0, vals)

print(list(fres))

In the example, we filter out all elements that are negative using a lambda 
function.

$ ./anon.py 
[-3, -1, -4]

## Python list comprehension predicate

A predicate can be used in a Python list comprehension. 

list_com.py
  

#!/usr/bin/python

def is_vowel(c):

    vowels = 'aeiou'

    if c in vowels:
        return True
    else:
        return False

sentence = 'There are eagles in the sky.'

vowels = [c for c in sentence if is_vowel(c)]
print(vowels)

The example filters out all vowels from a sentence. 

def is_vowel(c):

    vowels = 'aeiou'

    if c in vowels:
        return True
    else:
        return False

The  function is a predicate. It returns True for a vowel character.

vowels = [c for c in sentence if is_vowel(c)]

The logic of the if condition is delegated to the 
is_vowel predicate. 

$ ./list_com.py
['e', 'e', 'a', 'e', 'e', 'a', 'e', 'i', 'e']

## Predicates with more_itertools

The external more_itertools module contains plenty of functions 
for working on iterables. Many of them accept predicates as arguments.

simple.py
  

#!/usr/bin/python

from more_itertools import locate

def pfn(n):
    return n &gt; 0 and n % 2 == 0

vals = [-3, 2, 7, 9, -1, 0, 2, 3, 1, -4, 6]

idx = list(locate(vals, pfn))

vals2 = [vals[e] for e in idx]

print(vals2)

The example uses the locate function to find all values that
satisfy the given condition; in our case, that are greater that zero and
divisible by two.

idx = list(locate(vals, pfn))

We pass the values and the predicate function as parameters to the
locate.

vals2 = [vals[e] for e in idx]

Since the function returns indexes, we turn them into values using a list
comprehension.

$ ./locate.py 
[2, 2, 6]

## Source

[Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html)

In this article we have used predicates in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).