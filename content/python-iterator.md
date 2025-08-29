+++
title = "Python iterator"
date = 2025-08-29T20:08:45.363+01:00
draft = false
description = "Python iterator tutorial shows how to use iterators in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python iterator

last modified January 29, 2024

Python iterator tutorial shows how to use iterators in Python.

## Iterator

Iteration is the process of looping through the items in a collection.
Iterable is an object that can be iterated over.
Iterator is an object which allows traversing through all the
elements of a collection, regardless of its specific implementation. It produces
successive values from its associated iterable.

In Python, an iterator is an object which implements the iterator protocol. The
iterator protocol consists of two methods. The __iter__  method,
which must return the iterator object, and the next method, which
returns the next element from a sequence. The iter built-in
function is used to obtain an iterator from an iterable.

If all the values from an iterator have been returned already, a subsequent call
of the next function raises the StopIteration
exception.

Iterators have several advantages:

    - cleaner code

    - ability to work with infinite sequences

    - saving resources

Python has several built-in objects, which implement the iterator protocol. For
example lists, tuples, strings, dictionaries or files.

## Python iterator simple example

The following simple example uses an iterator from a string object.

simple_it.py
  

#!/usr/bin/python

text = "falcon"

it = iter(text)

print(next(it))
print(next(it))
print(next(it))
print(next(it))
print(next(it))
print(next(it))

In the code example, we use a built-in iterator on a string. In Python a string
is an immutable sequence of characters.

it = iter(text)

The iter function returns an iterator on object.

print(next(it))

The next function returns the next element from the iterable.

$ ./simple_it.py
f
a
l
c
o
n

## Python iterator and for loop

The for loop is a common way of working with iterators in Python. The for loop
does the following:

    - calls iter to obtain an iterator

    - calls next repeatedly to get the next item from iterable

    - terminates the loop when next raises StopIteration

for e in vals:
   print(e)

The loop body is executed once for each item next returns.
The variable e is set to the given item for each iteration.

for_loop.py
  

#!/usr/bin/python

text = "an old falcon"

for val in text:
    print(val, end=" ")

print()

In the example, we go through the text using the for loop. We print each character
and put a space between them.

$ ./for_loop.py
a n   o l d   f a l c o n

## The list, tuple, and set builtins

When we use the list, tuple, and set
built-in functions on an iterable, we force the iterator to return all items.
Note that some iterables can be very large.

list_tuple_set.py
  

#!/usr/bin/python

text = "an old falcon"

data = list(text)
print(data)

data2 = tuple(text)
print(data2)

data3 = set(text)
print(data3)

In the example, we use the list, tuple, and
set builtins to produce a list, a tuple, and a set of characters
from the given text.

$ ./list_tuple_set.py
['a', 'n', ' ', 'o', 'l', 'd', ' ', 'f', 'a', 'l', 'c', 'o', 'n']
('a', 'n', ' ', 'o', 'l', 'd', ' ', 'f', 'a', 'l', 'c', 'o', 'n')
{'f', 'd', 'n', 'o', 'a', ' ', 'c', 'l'}

## Python iterator read lines

When we use iterators to read data from files, we can get the next line without
reading the whole file into memory. This way we save system resources.

words.txt
  

blue
sky
cloud
winter
blow
water
falcon

This is the words.txt file.

read_data_iterator.py
  

#!/usr/bin/python

with open('words.txt', 'r') as f:

    for line in f:
        print(line.rstrip())

The open function returns a file object, which is an iterator.
We can use it in a for loop. With the usage of an iterator, the code is cleaner.

$ ./read_data_iterator.py
blue
sky
cloud
winter
blow
water
falcon

## Python custom iterator

To create a custom iterator, it must implement the iterator protocol: 
the __iter__ and __next__ functions.

inf_seq.py
  

#!/usr/bin/python

class InfSeq:

   def __init__(self):
       
      self.x = 0

   def __next__(self):
   
      self.x += 1
      return self.x ** self.x

   def __iter__(self):
       
      return self

infseq = InfSeq()
n = 0

for e in infseq:

   print(e)
   n += 1
   
   if n &gt; 10:
      break

In the code example, we create a sequence of numbers 1, 4, 27, 256, ... .
This demonstrates that with iterators, we can work with infinite sequences. 

def __iter__(self):
    
    return self

The for statement calls the __iter__ function on the container
object. The function returns an iterator object that defines the method
__next__, which accesses elements one at a time.

def next(self):

    self.x += 1
    return self.x ** self.x

The next function returns the next element of a sequence. 

if n &gt; 10:
    break

Because we are working with an infinite sequence, we must interrupt the for 
loop at some point.

$ ./inf_seq.py 
1
4
27
256
3125
46656
823543
16777216
387420489
10000000000
285311670611

## StopIteration

The iteration process is terminated by raising the StopIteration
exception.

random_words.py
  

#!/usr/bin/python

import random

class RandomWord:

    def __init__(self):

        self.words = ['sky', 'blue', 'cloud', 'milk', 'cosmos',
            'rainbow', 'drop', 'new', 'stop']

    def __iter__(self):
        return self

    def __next__(self):

        random_word = random.choice(self.words)

        if random_word == 'stop':

            raise StopIteration  

        else:
            return random_word

rw = RandomWord()

for word in rw:
    print(word)

In the code example, we have a custom iterator which produces random words. 
We raise the StopIteration exception when the stop word is picked.

$ ./random_words.py 
sky
blue
new
drop
milk
drop
milk
drop
blue

## Source

[Python Iterator object](https://wiki.python.org/moin/Iterator)

In this article we have worked with iterators in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).