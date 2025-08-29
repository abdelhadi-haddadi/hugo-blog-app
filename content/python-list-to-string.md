+++
title = "Python list to string"
date = 2025-08-29T20:08:49.862+01:00
draft = false
description = "Python list to string tutorial shows how to convert a list to a string in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list to string

last modified January 29, 2024

Python list to string tutorial shows how to convert a list to a string in
Python.

To turn a list of elements into a single string in Python, we will utilize 
the join, map, str functions and the 
string concatenation operator. 

The join function returns a string which is the concatenation of
the strings in the given iterable. The map function return an
iterator that applies the given function to every item of iterable, yielding the
results. The str function transforms the given object to a string.

Python uses the + operator to concatenate strings.

## Python list to string examples

In the first example, we transform the list to a string with the
join function.

list2string.py
  

#!/usr/bin/python

words = ['a', 'visit', 'to', 'London']

slug  = '-'.join(words)
print(slug)

In the example, we create a slug from a list of words.

$ ./list2string.py 
a-visit-to-London

In the next example, we use the join function and the Python list 
comprehension.

list2string2.py
  

#!/usr/bin/python

words = ['There', 'are', 3, 'chairs', 'and', 2, 'lamps', 'in', 
    'the', 'room']

msg  = ' '.join(str(word) for word in words)

print(msg)

Not all elements in the words list are strings; therefore, we need 
to transform the integers to strings before applying the join
function. For this, we use the Python list comprehension construct.

$ ./list2string2.py 
There are 3 chairs and 2 lamps in the room    

Alternatively, we can also use the map function.

list2string3.py
  

#!/usr/bin/python

words = ['There', 'are', 3, 'chairs', 'and', 2, 'lamps', 'in', 
    'the', 'room']

msg  = ' '.join(map(str, words))
print(msg)

We apply the str function on each element of the list with the 
map function. Then we join all the elements with join.

$ ./list2string3.py 
There are 3 chairs and 2 lamps in the room

Finally, we use a string concatenation operator to transform a list to a string.

list2string4.py
  

#!/usr/bin/python

words = ['There', 'are', 3, 'chairs', 'and', 2, 'lamps', 'in', 
    'the', 'room']

msg = ''

for word in words:

    msg += f'{word} '

print(msg)

We go through all the elements of the list in a for loop. We build the string
using the string concatenation operator. (In our case the +=
compound operator.)

$ ./list2string4.py 
There are 3 chairs and 2 lamps in the room 

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have converted lists to strings in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).