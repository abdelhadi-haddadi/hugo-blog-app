+++
title = "Python for loop"
date = 2025-08-29T20:10:01.580+01:00
draft = false
description = "Python for loop tutorials shows how to create loops in Python with the for statement. A loop is a sequence of instructions that is continually repeated until a certain condition is reached."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python for loop

last modified January 29, 2024

Python for loop tutorial shows how to create loops in Python with 
for statement.

## Python loop definition

A loop is a sequence of instructions that is continually repeated until 
a certain condition is reached. For instance, we have a collection of items and we 
create a loop to go through all elements of the collection. Loops in Python can
be created with for or while statements.

## Python for statement

Python for statement iterates over the items of any sequence (such
as a list or a string), in the order that they appear in the sequence. 

for var in sequence:
   do_statement(s)

The above is the general syntax of the Python for statement.

## Python for loop with string

The following example uses Python for statement
to go through a string.

for_loop_string.py
  

#!/usr/bin/python

word = "cloud"

for let in word:
    
    print(let)

We have a string defined. With the for loop, 
we print the letters of the word one by one to the terminal.

$ ./for_loop_string.py 
c
l
o
u
d

## Python for loop else

The for loop has an optional else statement which is
executed when the looping has finished.

for_loop_else.py
  

#!/usr/bin/python

words = ["cup", "star", "monkey", "bottle", "paper", "door"]

for word in words:
    
    print(word)
else:

    print("Finished looping")    

We go over the list of words with a for loop. When the iteration
is over, we print the "Finished looping" message which is located in the 
body following the else keyword.

$ ./for_loop_else.py 
cup
star
monkey
bottle
paper
door
Finished looping

## Python for loops with range

Python range function generates a list of numbers.

range(n)

The function generates numbers 0...n-1.

range(start, stop, [step])

The function generates a sequence of numbers; it begins with start
and ends with stop, which is not included in the sequence.
The step is the increment and defaults to 1 if not provided.

With the help of the range function, we can
repeat a code block n times.

repeating_statement.py
  

#!/usr/bin/python

for i in range(1, 6):
    
    print(f"Statement executed {i}")

The code example executes the code block five times.

$ ./repeating_statement.py 
Statement executed 1
Statement executed 2
Statement executed 3
Statement executed 4
Statement executed 5

In the next example we generate two sequences 
of integers with for loop.

for_loop_range.py
  

#!/usr/bin/python

for n in range(1, 11):
    
    print(n, end=' ')
    
print()    

for n in range(0, 11, 2):
    
    print(n, end=' ')    
    
print()  

The example prints two sequences of integers: 1, 2, ...10 and 0, 2, ...10.

$ ./for_loop_range.py 
1 2 3 4 5 6 7 8 9 10 
0 2 4 6 8 10 

## Python looping over a tuple and list

With Python for loop, we can easily traverse Python tuples and lists.

for_loop_tuple_list.py
  

#!/usr/bin/python

nums = (1, 2, 3, 4, 5, 6)   
words = ["cup", "star", "monkey", "bottle"]

for n in nums:
    
    print(n, end=' ')

print()

for word in words:
    
    print(word, end=' ')
    
print()    

The code example prints the elements of a tuple and a list.

$ ./for_loop_tuple_list.py 
1 2 3 4 5 6 
cup star monkey bottle 

## Python looping with index

Sometimes we need to get the index of the element as well; for this we
can use the enumerate function.

for_loop_index.py
  

#!/usr/bin/python

words = ("cup", "star", "monkey", "bottle", "paper", "door")

for idx, word in enumerate(words):
    
    print(f"{idx}: {word}")

With the help of the enumerate function, we print
the element of the list with its index.

$ ./for_loop_index.py 
0: cup
1: star
2: monkey
3: bottle
4: paper
5: door

## Python looping over a dictionary

In the following example, we loop over a Python dictionary.

for_loop_dictionary.py
  

#!/usr/bin/python

data = { "de": "Germany", "sk": "Slovakia", "hu": "Hungary", "ru": "Russia" }    

for k, v in data.items():
    
    print(f"{k} is an abbreviation for {v}")

The code example prints the keys and the values of the Python dictionary.

$ ./for_loop_dictionary.py 
sk is an abbreviation for Slovakia
ru is an abbreviation for Russia
hu is an abbreviation for Hungary
de is an abbreviation for Germany

## Python nested for loop

It is possible to nest a for loop into another loop.

for_loop_nested.py
  

#!/usr/bin/python

nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for i in nums:
    
    for e in i:
        
        print(e, end=' ')
    
    print()

We have a two-dimensional list of integers. We loop over the 
elements with two for loops.

$ ./for_loop_nested.py 
1 2 3 
4 5 6 
7 8 9 

## Python for loop with zip

The zip function creates an iterator from the given iterables.

for_loop_zip.py
  

#!/usr/bin/python

words1 = ["cup", "bottle", "table", "rock", "apple"]
words2 = ["trousers", "nail", "head", "water", "pen"]

for w1, w2 in zip(words1, words2):
    
    print(w1, w2)

In the example, we iterate over two lists in one for loop.

$ ./for_loop_zip.py 
cup trousers
bottle nail
table head
rock water
apple pen

## Python looping custom iterable

In the next example we loop over a custom iterable.

for_loop_custom_iterable.py
  

#!/usr/bin/python

import random

def myrandom(x):
    
    i = 0
    
    while i &lt; x:
        
        r = random.randint(0, 100)
        
        yield r
        
        i = i + 1

for r in myrandom(5):
    
    print(r)

The code example creates a generator function that yields
random integers. With the for loop we generate five random
integers.

$ ./for_loop_custom_iterable.py 
14
43
53
44
70

## Python for loop with break

The break statement terminates the for loop.

for_loop_break.py
  

#!/usr/bin/python

import random
import itertools 

for i in itertools.count():
    
   val = random.randint(1, 30)
   print(val)

   if val == 22:
      break

In the example, we create an endless for loop. We generate and print
random numbers from 1...29. If the generated number equals to 22, the for 
loop is ended with the break keyword.

$ ./for_loop_break.py 
7
27
2
27
7
9
3
25
15
22

## Python for loop with continue

The continue keyword is used to interrupt the current cycle, 
without jumping out of the whole loop. It initiates a new cycle.

for_loop_continue.py
  

#!/usr/bin/python

num = 0

for num in range(1000):
    
   num = num + 1
   
   if num % 2 == 0:
      continue
      
   print(num, end=' ')
   
print() 

We print all numbers smaller than 1000 that cannot be divided by number 2
without a remainder.

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have worked with Python for loops.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).