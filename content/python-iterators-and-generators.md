+++
title = "Python iterators and generators"
date = 2025-08-29T20:03:05.518+01:00
draft = false
description = "Iterators and Generators in Python of the Python tutorial shows how to use iterators and generators in Python, using several practical examples."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../exceptions/)
[Next](../introspection/)

# Python iterators and generators

last modified October 18, 2023

In this part of the Python tutorial, we work with interators and generators.
*Iterator* is an object which allows a programmer to traverse through 
all the elements of a collection, regardless of its specific implementation.

In Python, an iterator is an object which implements the 
iterator protocol. The iterator protocol consists of 
two methods. The __iter__ method, which must return 
the iterator object, and the next method, which returns 
the next element from a sequence. 

Iterators have several advantages:

    - Cleaner code

    - Iterators can work with infinite sequences

    - Iterators save resources

Python has several built-in objects, which implement the iterator protocol. 
For example lists, tuples, strings, dictionaries
or files. 

iterator.py
  

#!/usr/bin/env python

# iterator.py

str = "formidable"

for e in str:
   print(e, end=" ")

print()

it = iter(str)

print(next(it))
print(next(it))
print(next(it))

print(list(it))

In the code example, we show a built-in iterator on a string. In Python a 
string is an immutable sequence of characters. The iter function 
returns an iterator on object. We can also use the list
or tuple functions on iterators.  

$ ./iterator.py 
f o r m i d a b l e
f
o
r
['m', 'i', 'd', 'a', 'b', 'l', 'e']

## Python reading lines

By saving system resources we mean that when working with iterators, we 
can get the next element in a sequence without keeping the entire dataset in memory.

read_data.py
  

#!/usr/bin/env python

# read_data.py

with open('data.txt', 'r') as f:

    while True:

        line = f.readline()
    
        if not line: 
            break
            
        else: 
            print(line.rstrip())

This code prints the contents of the data.txt file. Instead of
using a while loop, we can apply an iterator, which simplifies our task.

read_data_iterator.py
  

#!/usr/bin/env python

# read_data_iterator.py

with open('data.txt', 'r') as f:

    for line in f:
        print(line.rstrip())

The open function returns a file object, which is an iterator. 
We can use it in a for loop. With the usage of an iterator, the code is cleaner. 

## Python iterator protocol

In the following example, we create a custom object that implements
the iterator protocol.

iterator_protocol.py
  

#!/usr/bin/env python

# iterator_protocol.py

class Seq:

   def __init__(self):
       
      self.x = 0

   def __next__(self):
   
      self.x += 1
      return self.x**self.x

   def __iter__(self):
       
      return self

s = Seq()
n = 0

for e in s:

   print(e)
   n += 1
   
   if n &gt; 10:
      break

In the code example, we create a sequence of numbers 1, 4, 27, 256, ... . 
This demonstrates that with iterators, we can work with infinite sequences. 

def __iter__(self):
    
    return self

The for statement calls the __iter__ function on the 
container object. The function returns an iterator object that defines the 
method __next__, which accesses elements in the container one at a time.

 def next(self):
    self.x += 1
    return self.x**self.x

The next  method returns the next element of a sequence. 

if n &gt; 10:
    break

Because we are working with an infinite sequence, we must 
interrupt the for loop. 

$ ./iterator.py 
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

The loop can be interrupted in another way. In the class definition we must 
raise a StopIteration exception. In the following 
example, we redo our previous example. 

stopiter.py
  

#!/usr/bin/env python

# stopiter.py

class Seq14:
    
   def __init__(self):
      self.x = 0

   def __next__(self):
       
      self.x += 1
      
      if self.x &gt; 14:
         raise StopIteration
     
      return self.x ** self.x

   def __iter__(self):
      return self

s = Seq14()

for e in s:
   print(e)

The code example will print first 14 numbers of a sequence. 

if self.x &gt; 14:
    raise StopIteration

The StopIteration exception will cease the for loop. 

$ ./stop_iter.py 
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
8916100448256
302875106592253
11112006825558016

## Python generators

*Generator* is a special routine that can 
be used to control the iteration behaviour of a loop. A generator is similar 
to a function returning an array. A generator has parameters, it can be called 
and it generates a sequence of numbers. But unlike functions, which *return* 
a whole array, a generator *yields* one value at a time.
This requires less memory. 

Generators in Python:

    - Are defined with the def keyword

    - Use the yield keyword

    - May use several yield keywords

    - Return an iterator

Let's look at an generator example. 

simple_generator.py
  

#!/usr/bin/env python

# simple_generator.py

def gen():

   x, y = 1, 2
   yield x, y
   
   x += 1
   yield x, y

g = gen()

print(next(g))
print(next(g))

try:
   print(next(g))
   
except StopIteration:
   print("Iteration finished")

The program creates a very simple generator.

def gen():

   x, y = 1, 2
   yield x, y
   
   x += 1
   yield x, y

A generator is defined with a def 
keyword, just like normal functions. We use two yield keywords 
inside the body of a generator. The yield keyword exits the
generator and returns a value.  Next time the next
function of an iterator is called, we continue on the line following the yield 
keyword. Note that the local variables are preserved throughout the iterations. 
When there is nothing left to yield, a StopIteration 
exception is raised. 

$ ./generator.py 
(1, 2)
(2, 2)
Iteration finished

The following example we calculates Fibonacci numbers. The first number of 
the sequence is 0, the second number is 1, and each subsequent number is equal 
to the sum of the previous two numbers of the sequence itself.

fibonacci_gen.py
  

#!/usr/bin/env python

# fibonacci_gen.py

import time

def fib():
    
   a, b = 0, 1

   while True:
      yield b
      
      a, b = b, a + b

g = fib()

try:
   for e in g:
      print(e)
      
      time.sleep(1)
            
except KeyboardInterrupt:
   print("Calculation stopped")

The script continuously prints Fibonacci numbers to the console. 
It is terminated with Ctrl + C key combination.

## Python generator expression

Generator expression is similar to a list comprehension. The difference is 
that a generator expression returns a generator, not a list. 

generator_expression.py
  

#!/usr/bin/env python

# generator_expression.py

n = (e for e in range(50000000) if not e % 3)

i = 0

for e in n:
    print(e)
    
    i += 1
    
    if i &gt; 100:
        raise StopIteration

The example calculates values that can be divided by 3 without a remainder. 

n = (e for e in range(50000000) if not e % 3)

A generator expression is created with round brackets. Creating a list comprehension
in this case would be very inefficient because the example would occupy a lot of memory
unnecessarily. Insted of this, we create a generator expression, which generates values
lazily on demand.

i = 0

for e in n:
    print(e)
    
    i += 1
    
    if i &gt; 100:
        raise StopIteration

In the for loop, we generate 100 values with a generator. We have done this without 
extensive usage of memory.

In the next example, we create a grep-like utility in Python using generator
expression.

roman_empire.txt
  

The Roman Empire (Latin: Imperium Rōmānum; Classical Latin: [ɪmˈpɛ.ri.ũː roːˈmaː.nũː] 
Koine and Medieval Greek: Βασιλεία τῶν Ῥωμαίων, tr. Basileia tōn Rhōmaiōn) was the 
post-Roman Republic period of the ancient Roman civilization, characterized by government 
headed by emperors and large territorial holdings around the Mediterranean Sea in Europe, 
Africa and Asia. The city of Rome was the largest city in the world c. 100 BC – c. AD 400, 
with Constantinople (New Rome) becoming the largest around AD 500,[5][6] and the Empire's 
populace grew to an estimated 50 to 90 million inhabitants (roughly 20% of the world's 
population at the time).[n 7][7] The 500-year-old republic which preceded it was severely 
destabilized in a series of civil wars and political conflict, during which Julius Caesar 
was appointed as perpetual dictator and then assassinated in 44 BC. Civil wars and executions 
continued, culminating in the victory of Octavian, Caesar's adopted son, over Mark Antony and 
Cleopatra at the Battle of Actium in 31 BC and the annexation of Egypt. Octavian's power was 
then unassailable and in 27 BC the Roman Senate formally granted him overarching power and 
the new title Augustus, effectively marking the end of the Roman Republic.

We use this text file.

generator_expression.py
  

#!/usr/bin/env python

# gen_grep.py

import sys

def grep(pattern, lines):
    return ((line, lines.index(line)+1) for line in lines if pattern in line)

file_name = sys.argv[2]
pattern = sys.argv[1]

with open(file_name, 'r') as f:
    lines = f.readlines()
    
    for line, n in grep(pattern, lines):
        print(n, line.rstrip())

The example reads data from a file and prints lines that contain the specified
pattern and their line numbers.

def grep(pattern, lines):
    return ((line, lines.index(line)+1) for line in lines if pattern in line)

The grep-like utility uses this generator expression. The expression goes through
the list of lines and picks those, which contain the patter. It calculates the
index of the line in the list, which is its line number in the file.

with open(file_name, 'r') as f:
    lines = f.readlines()
    
    for line, n in grep(pattern, lines):
        print(n, line.rstrip())

We open the file for reading and call the grep function on 
the data. The function returns a generator, which is traversed with the for loop.

$ ./gen_grep.py Roman roman_empire.txt 
1 The Roman Empire (Latin: Imperium Rōmānum; Classical Latin: [ɪmˈpɛ.ri.ũː roːˈmaː.nũː]
3 post-Roman Republic period of the ancient Roman civilization, characterized by government
13 then unassailable and in 27 BC the Roman Senate formally granted him overarching power and
14 the new title Augustus, effectively marking the end of the Roman Republic.

There are four lines that contain the 'Roman' word in the file.

In this chapter, we have covered iterators and generators in Python.

[Contents](..)  
[Previous](../exceptions/)
[Next](../introspection/)