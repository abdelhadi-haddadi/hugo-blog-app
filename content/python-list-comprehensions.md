+++
title = "Python list comprehensions"
date = 2025-08-29T20:08:51.115+01:00
draft = false
description = "Python list comprehensions tutorial shows how to use Python list comprehensions. List comprehensions provide a concise way to create lists."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list comprehensions

last modified January 29, 2024

In this article we will learn to use Python list comprehensions. 

## Python list comprehension

A list comprehension is a syntactic construct which creates a list
based on existing list. List comprehensions provide a concise way to create
lists. It is a common requirement to make new lists where each element is the
result of some operations applied to each member of another sequence or
iterable, or to create a subsequence of those elements that satisfy a certain
condition.

## Python list comprehension usage

A list comprehension can be used to:

- transform a list

- filter a list

The syntax of a list comprehension was influenced by mathematical notation of
sets. The Python syntax was inspired by the Haskell programming language.

S = {x² : x in {0 ... 16}}

This is a mathematical notation for creating a set of integer values.

L = [expression [if condition] for variable in sequence [if condition]]

The above pseudo code shows the syntax of a list comprehension. It consists of 
three parts: a for loop, optional conditions, and an expression. A for 
loop goes through the sequence. For each loop an expression is evaluated 
if the condition is met. If the value is computed it is appended to the new list. 
There can be multiple for loops and if conditions.

## Python list comprehension transforming list

The following example transforms a list into another list with the help 
of the list comprehension.

multiply_elements.py
  

#!/usr/bin/python

a = [1, 2, 3, 4, 5, 6]

b = [e * 2 for e in a]
print(b)

In the first example, we create a new list from an existing list
by multiplying each element by 2. 

b = [e * 2 for e in a]

Each of the elements of the a list is multiplied by 2 and
the result is added to the new b list.

$ ./multiply_elements.py 
[2, 4, 6, 8, 10, 12]

Each of the elements was multiplied by two.

## Calculating Fahrenheit temperatures from Celsius

We have a list of temperatures in Celsius. We want to
create a new list of temperatures expressed in 
Fahrenheit temperature. 

fahrenheit_celsius.py
  

#!/usr/bin/python

celsius = [22, 28, 33, 42, 52]

fahr = [e * 9/5 + 32 for e in celsius]
print(fahr)

The example creates a new list of Fahrenheit temperatures calculated
from a list of Celsius temperatures.

fahr = [e * 9/5 + 32 for e in celsius]

The calculation is done in the third, expression part of the 
Python list comprehension.

$ ./fahrenheit_celsius.py 
[71.6, 82.4, 91.4, 107.6, 125.6]

## Python list comprehension filtering list

In the following example, we are going to filter a list with 
a list comprehension.

filter_positive.py
  

#!/usr/bin/python

a = [-4, 2, 0, -1, 12, -3]

b = [e for e in a if e &gt; 0]
print(b)

We have a list of integers. We create a new list where we only
include positive integers.

b = [e for e in a if e &gt; 0]

To include only positive numbers, we use an if condition,
which is applied on each of the elements; the elements are included
into the new list only if they satisfy the condition.

$ ./filter_positive.py 
[2, 12]

The next example filters elements by their type.

filter_by_type.py
  

#!/usr/bin/python

a = ['a', 2, 'c', 12, 3, 'd']

b = [e for e in a if type(e) == int]
c = [e for e in a if type(e) == str]

print(b)
print(c)

We have a list of elements, which are integers and strings.
We create two new lists; one having only integers and one only
strings.

b = [e for e in a if type(e) == int]

Here we create a list b, which will contain only integer
values. The type function is used to determine the type
of the element.

$ ./filter_by_type.py 
[2, 12, 3]
['a', 'c', 'd']

## Python list comprehension predicate

A *predicate* is a function that returns boolean value.
If the condition is too complex, we can put it into a predicate.

predicate.py
  

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

The  function is a predicate. It returns 
True for a vowel character.

vowels = [c for c in sentence if is_vowel(c)]

The logic of the if condition is delegated to the 
is_vowel predicate. 

$ ./predicate.py
['e', 'e', 'a', 'e', 'e', 'a', 'e', 'i', 'e']

## The if condition in front

The if condition can be placed in the front as well.
This way the data can be transformed. 

infront.py
  

#!/usr/bin/python

data = ["even" if i % 2 == 0 else "odd" for i in range(7)]
print(data)

In the example, we transform the values into "even"
and "odd" values using the list comprehension.

$ ./infront.py
['even', 'odd', 'even', 'odd', 'even', 'odd', 'even']

## Python list comprehension multiple if conditions

It is possible to use multiple if conditions in the Python list comprehensions.

multiple_conditions.py
  

#!/usr/bin/python

a = [9, 2, 18, 14, 22, 11, 7, 19, 23]

b = [e for e in a if e &gt; 10 if e &lt; 20]
print(b)

We create a new list of integers from list a, which are
greater than 10 and lower than 20.

b = [e for e in a if e &gt; 10 if e &lt; 20]

In this list comprehension, we use two if conditions.

$ ./multiple_conditions.py 
[18, 14, 11, 19]

## Python list comprehension multiple for loops

It is possible to have multiple for loops in a Python list comprehension.

multiple_for_loops.py
  

#!/usr/bin/python

a = [1, 2, 3]
b = ['A', 'B', 'C']

c = [ str(i) + j for i in a for j in b]
print(c)

The example creates a Cartesian product of two lists.

c = [ str(i) + j for i in a for j in b]

Two for loops are used to create a Cartesian product.

$ ./multiple_for_loops.py 
['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C']

The next example shows how to flatten a Python list.

flatten_list.py
  

#!/usr/bin/python

nums = [[1, 2, 3], [3, 4, 5], [6, 7, 8]]

c = [ e for num in nums for e in num]
print(c)

The nums list is a list of nested lists. We flatten
the list with a list comprehension.

c = [ e for num in nums for e in num]

The first loop goes through the outer list; the second
for loop goes through the nested lists.

$ ./flatten_list.py 
[1, 2, 3, 3, 4, 5, 6, 7, 8]

## Python nested list comprehensions

The initial expression in a Python list comprehension can be 
another list comprehension.

nested_list_comprehension.py
  

#!/usr/bin/python

M1 = [[1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]]

M1_tr = [[row[i] for row in M1] for i in range(3)]
print(M1_tr)

The example defines a matrix and a list comprehension creates
a transposed matrix from the original matrix.

$ ./nested_list_comprehension.py 
[[1, 4, 7], [2, 5, 8], [3, 6, 9]]

## Sieve of Eratosthenes

Sieve of Eratosthenes is an ancient algorithm to compute prime numbers. A prime
number (or a prime) is a natural number greater than 1 that has no positive
divisors other than 1 and itself. The algorithm iteratively marks as composite
(i.e., not prime) the multiples of each prime, starting with the multiples of 2.

sieve_of_eratosthenes.py
  

#!/usr/bin/python

no_primes = [j for i in range(2, 8) for j in range(i*2, 100, i)]
primes = [e for e in range(2, 100) if e not in no_primes]
print (primes)

The example computes prime numbers up to 100.

no_primes = [j for i in range(2, 8) for j in range(i*2, 100, i)]

First, we create a list of numbers that are not primes.

primes = [e for e in range(2, 100) if e not in no_primes]

Prime numbers are simply these numbers that are not included
in the no_primes list.

$ ./sieve_of_eratosthenes.py 
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have presented the Python list comprehensions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).