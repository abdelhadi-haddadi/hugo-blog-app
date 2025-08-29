+++
title = "Python list remove"
date = 2025-08-29T20:08:49.879+01:00
draft = false
description = "Python list remove tutorial shows how to delete list elements in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list remove

last modified January 29, 2024

In this article we show how to remove list elements in Python.

A *list* is an ordered collection of values. It is a mutable collection. 
The list elemetns can be accessed by zero-based indexes.

It is possible to delete list elements with remove,
pop, and clear functions and the del
keyword.

## Python list remove

The remove function removes the first occurrence of the given
value. It raises ValueError  if the value is not present.

main.py
  

#!/usr/bin/python

words = ["sky", "cup", "new", "war", "wrong", "crypto", "forest",
         "water", "cup"]

print(words)

words.remove("cup")
print(words)

words.remove("cup")
print(words)

The program defines a list of words. We delete two words from the list.

$ ./main.py 
['sky', 'cup', 'new', 'war', 'wrong', 'crypto', 'forest', 'water', 'cup']
['sky', 'new', 'war', 'wrong', 'crypto', 'forest', 'water', 'cup']
['sky', 'new', 'war', 'wrong', 'crypto', 'forest', 'water']

## Python list pop

The pop function removes and returns the element at the given
index. If the index is not explicitly defined, it defaults to the last. The
function raises IndexError if list is empty or the index is out of
range.

main.py
  

#!/usr/bin/python

words = ["sky", "cup", "new", "war", "wrong", "crypto", "forest",
         "water", "cup"]

w = words.pop(0)
print(f'{w} has been deleted')

w = words.pop()
print(f'{w} has been deleted')

print(words)

In the program, we delete two words with pop. We print the deleted 
words to the console.

$ ./main.py 
sky has been deleted
cup has been deleted
['cup', 'new', 'war', 'wrong', 'crypto', 'forest', 'water']

## Python list clear

The clear method deletes all items in the list.

main.py
  

#!/usr/bin/python

words = ["sky", "cup", "new", "war", "wrong", "crypto", "forest",
         "water", "cup"]

print(f'there are {len(words)} words in the list')

words.clear()

print(f'there are {len(words)} words in the list')

The program uses the clear function. It also counts the number of 
list elements with len.

$ ./main.py 
there are 9 words in the list
there are 0 words in the list

## Python list del

Alternatively, we can also use the del keyword to delete an element 
at the given index.

main.py
  

#!/usr/bin/python

words = ["sky", "cup", "new", "war", "wrong", "crypto", "forest",
         "water", "cup"]

del words[0]
del words[-1]

print(words)

vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
del vals[0:4]

print(vals)

In the program, we delete elemetns with del.

del words[0]
del words[-1]

We delete the first and the last element of the list.

vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
del vals[0:4]

Here, we delete a range of integers.

$ ./main.py 
['cup', 'new', 'war', 'wrong', 'crypto', 'forest', 'water']
[4, 5, 6, 7, 8, 9, 10]

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have shown how to delete list element in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).