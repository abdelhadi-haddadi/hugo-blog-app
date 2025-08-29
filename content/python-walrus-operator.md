+++
title = "Python walrus operator"
date = 2025-08-29T20:10:02.656+01:00
draft = false
description = "Python walrus operator tutorial shows how to use walrus operator in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python walrus operator

last modified January 29, 2024

Python walrus operator tutorial shows how to use walrus operator in Python.

Python 3.8 introduced a new walrus operator :=. The name of the 
operator comes from the fact that is resembles eyes and tusks of a walrus of 
its side.

The walrus operator creates an *assignment expression*. The operator 
allows us to assign a value to a variable inside a Python expression. It is a
convenient operator which makes our code more compact.

print(is_new := True)

We can assign and print a variable in one go.

is_new = True
print(is_new)

Without the walrus operator, we have to create two lines. 

## Python walrus read input

In the following example, we use the walrus operator in a while loop.

read_words.py
  

#!/usr/bin/python

words = []

while (word := input("Enter word: ")) != "quit":
    words.append(word)

print(words)

We ask the user to write words, which are appended to a list. 

$ ./read_words.py
Enter word: cloud
Enter word: falcon
Enter word: rock
Enter word: quit
['cloud', 'falcon', 'rock']

## Python walrus with if condition

Suppose that all our words must have at least three characters.

test_length.py
  

#!/usr/bin/python

words = ['falcon', 'sky', 'ab', 'water', 'a', 'forest']

for word in words:
    if ((n := len(word)) &lt; 3):
        print(f'warning, the word {word} has {n} characters')

In the example, we use the walrus operator to test the length of a word. 
If a word has less than three characters, a warning is issued. We determine 
and assign the length of a word in one shot.

$ ./test_length.py
warning, the word ab has 2 characters
warning, the word a has 1 characters

## Python walrus reading file

In the next example, we use the walrus operator to read a file. 

words.txt
  

falcon
sky
cloud
water
rock
forest

We have some words in the words.txt file.

read_file.py
  

#!/usr/bin/python

with open('words.txt', 'r') as f:

    while line := f.readline():

        print(line.rstrip())

The example reads the file using the readline method. 
The walrus operator makes the code shorter.

## Python walrus traverse container

In the following example, we use the walrus operator when traversing a list of 
dictionaries.

traversing.py
  

#!/usr/bin/python

users = [ 
    {'name': 'John Doe', 'occupation': 'gardener'},
    {'name': None, 'occupation': 'teacher'}, 
    {'name': 'Robert Brown', 'occupation': 'driver'}, 
    {'name': None, 'occupation': 'driver'}, 
    {'name': 'Marta Newt', 'occupation': 'journalist'} 
] 
  
for user in users:  
    if ((name := user.get('name')) is not None): 
        print(f'{name} is a {user.get("occupation")}') 

In the example, we have None values in the dictionaries. We 
print all users who have name specified.

$ ./traversing.py
John Doe is a gardener
Robert Brown is a driver
Marta Newt is a journalist

There are three users who have their names specified.

## Python walrus with regex

In the following example, we use the walrus operator in a regular expression.

search.py
  

#!/usr/bin/python

import re

data = 'There is a book on the table.'

pattern = re.compile(r'book')

if match := pattern.search(data):
    print(f'The word {pattern.pattern} is at {match.start(), match.end()}') 
else:
    print(f'No {pattern.pattern} found')

We search for a pattern and assign the match (if found) to a variable in one go.

$ ./search.py
The word book is at (11, 15)

The word book was found at the given indexes.

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have worked with the Python walrus operator.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).