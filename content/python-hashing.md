+++
title = "Python hashing"
date = 2025-08-29T20:08:39.795+01:00
draft = false
description = "Python hashing tutorial explains the hashing concept in Python. We explain hash tables and Python hashable objects."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python hashing

last modified January 29, 2024

Python hashing tutorial explains the hashing concept in Python. We explain hash
tables and Python hashable objects.

## Hash table

Hash tables are used to implement map and set data structures in many common
programming languages, such as C++, Java, and Python. Python uses hash tables
for dictionaries and sets. A hash table is an unordered collection of
key-value pairs, where each key is unique. Hash tables offer a combination of
efficient lookup, insert and delete operations. These are the best properties of
arrays and linked lists.

## Hashing

Hashing is the process of using an algorithm to map data of any size
to a fixed length. This is called a hash value. Hashing is used to create high
performance, direct access data structures where large amount of data is to be
stored and accessed quickly. Hash values are computed with hash functions.

## Python hashable

An object is hashable if it has a hash value which never changes during its
lifetime. (It can have different values during multiple invocations of Python
programs.) A hashable object needs a __hash__ method. In order to
perform comparisons, a hashable needs an __eq__  method.

**Note: ** Hashable objects which compare equal must have the same
hash value.

Hashability makes an object usable as a dictionary key and a set member, because
these data structures use the hash value internally. Python immutable built-in
objects are hashable; mutable containers (such as lists or dictionaries) are
not. Objects which are instances of user-defined classes are hashable by
default. They all compare unequal (except with themselves), and their hash value
is derived from their id.

**Note: ** If a class does not define an __eq__ method
it should not define a __hash__ operation either; if it defines __eq__
but not __hash__, its instances will not be usable as items in hashable collections.

## Python hash function

The hash function returns the hash value of the object if it has one.
Hash values are integers. They are used to quickly compare dictionary keys during
a dictionary lookup. Objects can implement the __hash__ method.

## Python immutable builtins are hashable

Python immutable builtins, such as integers, strings, or tuples, are hashable.

builtin_hashables.py
  

#!/usr/bin/python

val = 100

print(val.__hash__())
print("falcon".__hash__())
print((1,).__hash__())

The example prints the values of three hashables: an integer, a string, and a
tuple.

## Python custom hashable example I

Python custom objects are hashable by default. Their hash is
derived from their Id.

custom_object.py
  

#!/usr/bin/python

class User:

    def __init__(self, name, occupation):

        self.name = name
        self.occupation = occupation

u1 = User('John Doe', 'gardener')
u2 = User('John Doe', 'gardener')

print('hash of user 1')
print(hash(u1))

print('hash of user 2')
print(hash(u2))

if (u1 == u2):
    print('same user')
else:
    print('different users')

In the example, we have two instances of a User.

u1 = User('John Doe', 'gardener')
u2 = User('John Doe', 'gardener')

We have two instances with the same data.

print('hash of user 1')
print(hash(u1))

The hash function returns the hash value of the
object. The default implementation is derived from the Id of the object.

$ python custom_object.py
hash of user 1
-9223371894419573195
hash of user 2
142435202673
different users

Even though the user details are the same, the comparison yields differet objects.
In order to change it, we need to implement the __eq__ method.

## Python custom hashable example II

In the second example, we implement a custom __eq__ method.

custom_object2.py
  

#!/usr/bin/python

class User:

    def __init__(self, name, occupation):

        self.name = name
        self.occupation = occupation

    def __eq__(self, other):

        return self.name == other.name \
            and self.occupation == other.occupation

    def __str__(self):
        return f'{self.name} {self.occupation}'

u1 = User('John Doe', 'gardener')
u2 = User('John Doe', 'gardener')

if (u1 == u2):
    print('same user')
    print(f'{u1} == {u2}')
else:
    print('different users')

# users = {u1, u2}
# print(len(users))

Now the comparison returns the expected output for us; however, we cannot
insert the objects into a Python set; it would result in
TypeError: unhashable type: 'User'. In order to change this,
we implement the __hash__ method.

## Python custom hashable example III

In the third example, we implement the __eq__ and
the __hash__ methods.

custom_object3.py
  

#!/usr/bin/python

class User:

    def __init__(self, name, occupation):

        self.name = name
        self.occupation = occupation

    def __eq__(self, other):

        return self.name == other.name \
            and self.occupation == other.occupation

    def __hash__(self):
        return hash((self.name, self.occupation))

    def __str__(self):
        return f'{self.name} {self.occupation}'

u1 = User('John Doe', 'gardener')
u2 = User('John Doe', 'gardener')

users = {u1, u2}

print(len(users))

if (u1 == u2):
    print('same user')
    print(f'{u1} == {u2}')
else:
    print('different users')

print('------------------------------------')

u1.occupation = 'programmer'

users = {u1, u2}

print(len(users))

if (u1 == u2):
    print('same user')
    print(f'{u1} == {u2}')
else:
    print('different users')

The example compares two objects that have custom implementation
of the __eq__ and __hash__ methods.
The objects can be inserted into a Python set and when an attribute is later
changed, we get the expected output.

def __hash__(self):
    return hash((self.name, self.occupation))

The implementation of the __hash__ function returns a hash 
value computed with the hash function from a tuple of attributes.

$ python custom_object3.py
1
same user
John Doe gardener == John Doe gardener
------------------------------------
2
different users

In the fourth example, we add a mutable object to our custom class.
This results in un unexpected output.

**Note:** If a class defines mutable objects and implements an
__eq__ method, it should not implement __hash__, since the
implementation of hashable collections requires that a key's hash value is
immutable.

custom_object4.py
  

#!/usr/bin/python

class User:

    def __init__(self, name, occupation, colours):

        self.name = name
        self.occupation = occupation
        self.colours = colours

    def __eq__(self, other):

        return self.name == other.name \
            and self.occupation == other.occupation

    def __hash__(self):
        return hash((self.name, self.occupation))

    def __str__(self):
        return f'{self.name} {self.occupation} {self.colours}'

u1 = User('John Doe', 'gardener', ['steelblue', 'green', 'red'])
u2 = User('John Doe', 'gardener', ['steelblue', 'green', 'red'])

s1 = {u1, u2}
print(len(s1))

if (u1 == u2):
    print('same user')
    print(f'{u1} == {u2}')
else:
    print('different users')

print('-----------------------')

u1.colours[1] = 'blue'

s2 = {u1, u2}
print(len(s2))

if (u1 == u2):
    print('same user')
    print(f'{u1} == {u2}')
else:
    print('different users')

In the example, we have a list as an attribute. A list is a mutable object and
it has consequences for the hashing algorithm.

u1.colours[1] = 'blue'

We change an element of a list of the first user. However, this is not
reflected.

$ custom_object4.py
1
same user
John Doe gardener ['steelblue', 'green', 'red'] == John Doe gardener ['steelblue', 'green', 'red']
-----------------------
1
same user
John Doe gardener ['steelblue', 'blue', 'red'] == John Doe gardener ['steelblue', 'green', 'red']

The output still says that the objects are equal.

 -->

## Python @dataclass decorator

Since Python 3.7, we have the dataclass decorator, which
automatically generates some boilerplate code.

The dataclass decorator has a frozen argument (False by default).
If specified, the fields will be frozen (i.e. read-only). If
eq is set to True, which it is by default then the
__hash__ method is implemented and object instances will be
hashable.

decorator.py
  

#!/usr/bin/python

from dataclasses import dataclass

@dataclass(frozen=True)
class User:

    name: str
    occupation: str

u1 = User('John Doe', 'gardener')
u2 = User('John Doe', 'gardener')

if (u1 == u2):
    print('same user')
    print(f'{u1} == {u2}')
else:
    print('different users')

users = {u1, u2}
print(len(users))

The example uses the @dataclass decorator.

$ python decorator.py
same user
User(name='John Doe', occupation='gardener') == User(name='John Doe', occupation='gardener')
1

## Source

[Python hash function - language reference](https://docs.python.org/3/library/functions.html#hash)

In this article we have covered hashing in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).