+++
title = "Python reverse"
date = 2025-08-29T20:10:17.543+01:00
draft = false
description = "Python reverse tutorial shows how to reverse Python sequences."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python reverse

last modified January 29, 2024

In this article we show how to reverse Python sequences.

When we reverse items, we change their order. Note that reversing should not be
confused with sorting in descending order.

A Python list has a reverse function. The [::-1]
slice operation to reverse a Python sequence.
The reversed built-in function returns a reverse iterator.
The object's __reversed__ magic method is called by the
reversed built-in to implement reverse iteration.

## Python reverse list

In the first example, we reverse a Python list with the reverse
method and the [::-1] operator.

reverse_list.py
  

#!/usr/bin/python

nums = [2, 7, 8, 9, 1, 0]
nums.reverse()

print(nums)

rev_nums = nums[::-1]
print(rev_nums)

The reverse method reverses the list in place.
The nums[::-1] creates a new copy of the list where the
elements are reversed.

$ ./reverse_list.py
[0, 1, 9, 8, 7, 2]

## Python reversed function

The reversed built-in function returns a reverse iterator.

reversed_fun.py
  

#!/usr/bin/python

words = ['forest', 'wood', 'sky', 'rock']

for word in reversed(words):
    print(word)

word = 'forest'

for e in reversed(word):
    print(e, end=' ')

print()

for e in reversed(range(1, 10, 2)):
    print(e)

In the example, we use the reversed function on a list,
word, and a range.

$ ./reversed_fun.py
rock
sky
wood
forest
t s e r o f
9
7
5
3
1

## Python custom reverse string function

In the following example, we create a custom string reverse function.

custom_string_reverse.py
  

#!/usr/bin/python

def reverse_string(word):

    rev = ''
    n = len(word)

    while n &gt; 0:
        n -= 1
        rev += word[n]
    return rev

word = 'forest'

print(reverse_string('forest'))

Note that this is for demonstrational purposes; this implementation is slow.

def reverse_string(word):

    rev = ''
    n = len(word)

    while n &gt; 0:
        n -= 1
        rev += word[n]
    return rev

In the function, we use a while loop to build the new string in
reverse order.

## Python __reversed__ method

The __reversed__ magic method implementation should
return a new iterator object that iterates over all the objects in the
container in reverse order.

reversed_magic.py
  

#!/usr/bin/python

class Vowels:

    def __init__(self):

        self.vowels = ['a', 'e', 'i', 'o', 'u', 'y']

    def __len__(self):
        return len(self.vowels)

    def __getitem__(self, e):
        return self.vowels[e]

    def __reversed__(self):
        for e in self.vowels[::-1]:
            yield e

vowels = Vowels()

print('normal order:')
for vowel in vowels:
    print(vowel, end=' ')

print()

print('reversed order:')
for vowel in reversed(vowels):
    print(vowel, end=' ')

print()

In the example, we implement the __reversed__ method in a
Vowels object.

$ ./reversed_magic.py
normal order:
a e i o u y
reversed order:
y u o i e a

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have done reversing operations in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).