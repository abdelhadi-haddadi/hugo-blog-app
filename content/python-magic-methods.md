+++
title = "Python magic methods"
date = 2025-08-29T20:08:53.363+01:00
draft = false
description = "Python Magic Methods tutorial describes what Python magic methods are and shows how to use them."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python magic methods

last modified March 14, 2024

In this article we introduce Python magic methods are and show how to use them. 
We cover some common magic methods.

Python magic methods are special methods that add functionality to
our custom classes. They are surrounded by double underscores (e.g. __add__()).
(Magic methods are also called dunder methods.)

There are many magic methods in Python. Most of them are used for very specific
situations. We will mention some of the more popular methods.

## The __add__ method

The __add__ method is used to implement addition operation.
In Python, numbers are not primitive literals but objects. The num + 4
expression is equivalent to num.__add__(4).

main.py
  

#!/usr/bin/python

class MyDict(dict):

    def __add__(self, other):

        self.update(other)
        return MyDict(self)

a = MyDict({'de': 'Germany'})
b = MyDict({'sk': 'Slovakia'})

print(a + b)

In the example, we have a custom dictionary that implements the
addition operation with __add__.

class MyDict(dict):

def __add__(self, other):

    self.update(other)
    return MyDict(self)

The custom dictionary inherits from the built-in dict.
The __add__ method adds two dictionaries with the update
method and returns the newly created dictionary.

a = MyDict({'de': 'Germany'})
b = MyDict({'sk': 'Slovakia'})

We create two simple dictionaries.

print(a + b)

We add the two dictionaries.

$ ./main.py
{'de': 'Germany', 'sk': 'Slovakia'}

## The __init__ and __str__ methods

The __init__ method is used to initialize objects. This method is
used to implement the constructor of the object. The
__str__ gives a human-readable output of the object.

main.py
  

#!/usr/bin/python

class Person:

    def __init__(self, name, occupation):

        self.name = name
        self.occupation = occupation

    def __str__(self):

        return f'{self.name} is a {self.occupation}'

p = Person('John Doe', 'gardener')
print(p)

In the example, we have a Person class with two attributes: name
and occupation.

def __init__(self, name, occupation):

    self.name = name
    self.occupation = occupation

In the __init__ method we set the instance variables to the values
that are passed to the constructor.

def __str__(self):

    return f'{self.name} is a {self.occupation}'

The __str__ method gives a nice short output of the object.

$ ./main.py
John Doe is a gardener

## The __repr__ method

The __repr__ method is called by the built-in function
repr. It is used on the Python shell when it evaluates
an expression that returns an object.

The __str__ is used to give a human-readable version of
the object and the __repr__ a complete representation of
the object. The output of the latter is also more suited for developers.

If  __str__ implementation is missing then the
__repr__ method is used as fallback.

def __repr__(self):
    return '&lt;{0}.{1} object at {2}&gt;'.format(
      self.__module__, type(self).__name__, hex(id(self)))

The default implementation of the __repr__ method 
for an object looks like the above code.

main.py
  

#!/usr/bin/python

class Person:

    def __init__(self, name, occupation):
        
        self.name = name
        self.occupation = occupation

    def __str__(self):

        return f'{self.name} is a {self.occupation}'

    def __repr__(self):

        return f'Person{{name: {self.name}, occupation: {self.occupation}}}'

p = Person('John Doe', 'gardener')

print(p)
print(repr(p))

The example implements both the __str__ and the 
__repr__ methods. 

$ ./main.py
John Doe is a gardener
Person{name: John Doe, occupation: gardener}

## The __format__ method

The __format__ method gives us more control over how an object is
formatted within an f-string. It allows us to define custom formatting behavior
based on the format specifier provided within the f-string.

main.py
  

#!/usr/bin/python

from dataclasses import dataclass

@dataclass
class User:
    name: str
    occupation: str

    def __format__(self, spec):
        return f'User(name={self.name}{spec} occupation={self.occupation})'

u1 = User('John Doe', 'gardener')
u2 = User('Roger Roe', 'driver')
u3 = User('Lucia Smith', 'teacher')

print(f'{u1:-}')
print(f'{u2:;}')
print(f'{u3:#}')

We define a data object with a custom __format__ method. 

def __format__(self, spec):
    return f'{self.name} {spec} {self.occupation}'

The method places the provided specifier between the fields of the object.

$ python main.py
User(name=John Doe- occupation=gardener)
User(name=Roger Roe; occupation=driver)
User(name=Lucia Smith# occupation=teacher)

## The __len__ and the __getitem__ methods

The __len__ method returns the length of the container.
The method is called when we use the built-in len method on the object.
The __getitem__ method defines the item access ([]) operator.

main.py
  

#!/usr/bin/python

import collections
from random import choice

Card = collections.namedtuple('Card', ['suit', 'rank'])

class FrenchDeck:

    ranks = [str(i) for i in range(2, 11)] + list('JQKA')
    suits = ["heart", "clubs", "spades", "diamond"]

    def __init__(self):
        self.total = [Card(suit, rank)
                           for suit in self.suits for rank in self.ranks]

    def __len__(self):
        return len(self.total)

    def __getitem__(self, index):
        return self.total[index]

deck = FrenchDeck()

print(deck[0])
print(len(deck))
print(choice(deck))

The methods are used to implement a french card deck.

Card = collections.namedtuple('Card', ['suit', 'rank'])

We use a named tuple to define a Card class. The namedtuple
is a factory function for making a tuple class. Each card has a suit and a rank.

def __len__(self):
    return len(self.total)

The __len__ method returns the number of cards in the deck (52).

def __getitem__(self, index):
    return self.total[index]

The __getitem__ implements the indexing operation.

print(deck[0])

We get the first card of the deck. This calls the __getitem__.

print(len(deck))

This calls the __len__ method.

$ ./main.py
Card(suit='heart', rank='2')
52
Card(suit='diamond', rank='A')

## The __int__ and __index__ methods

The __int__ method is called to implement the built-in
int function. The __index__ method implements type
conversion to an int when the object is used in a slice expression and the
built-in hex, oct, and bin
functions.

main.py
  

#!/usr/bin/python

class Char:

    def __init__(self, val):
        self.val = val

    def __int__(self):
        return ord(self.val)

    def __index__(self):
        return ord(self.val)

c1 = Char('a')

print(int(c1))
print(hex(c1))
print(bin(c1))
print(oct(c1))

In the example we create a custom Char class which implements
the int, hex, bin, and oct
functions.

$ ./char_ex.py
97
0x61
0b1100001
0o141

## The __eq__, __lt__ and __gt__ methods

The __eq__ implements the == operator.
The __lt__ implements the &lt; operator and the 
__gt__ implements the &gt; operator.

main.py
  

#!/usr/bin/python

import collections

Coin = collections.namedtuple('coin', ['rank'])

# a gold coin equals to two silver and six bronze coins

class Pouch:

    def __init__(self):
        self.bag = []

    def add(self, coin):

        self.bag.append(coin)

    def __eq__(self, other):

        val1, val2 = self.__evaluate(other)

        if val1 == val2:
            return True
        else:
            return False

    def __lt__(self, other):

        val1, val2 = self.__evaluate(other)

        if val1 &lt; val2:
            return True
        else:
            return False

    def __gt__(self, other):

        val1, val2 = self.__evaluate(other)

        if val1 &gt; val2:
            return True
        else:
            return False

    def __str__(self):

        return str(self.bag)

    def __evaluate(self, other):

        val1 = 0
        val2 = 0

        for coin in self.bag:

            if coin.rank == 'g':
                val1 += 6

            if coin.rank == 's':
                val1 += 3

            if coin.rank == 'b':
                val1 += 1

        for coin in other.bag:

            if coin.rank == 'g':
                val2 += 6

            if coin.rank == 's':
                val2 += 3

            if coin.rank == 'b':
                val2 += 1

        return val1, val2

pouch1 = Pouch()

pouch1.add(Coin('g'))
pouch1.add(Coin('g'))
pouch1.add(Coin('s'))

pouch2 = Pouch()

pouch2.add(Coin('g'))
pouch2.add(Coin('s'))
pouch2.add(Coin('s'))
pouch2.add(Coin('b'))
pouch2.add(Coin('b'))
pouch2.add(Coin('b'))

print(pouch1)
print(pouch2)

if pouch1 == pouch2:
    print('Pouches have equal value')

elif pouch1 &gt; pouch2:
    print('Pouch 1 is more valueable than Pouch 2')
else:
    print('Pouch 2 is more valueable than Pouch 1')

We have a pouch that can contain gold, silver, and bronze 
coins. A gold coin equals to two silver and six bronze coins.
In the example, we implement the three comparison operators
for the pouch object using the Python magic methods.

def __eq__(self, other):

    val1, val2 = self.__evaluate(other)

    if val1 == val2:
        return True
    else:
        return False

In the __eq__ method, we first evaluate the values of 
the two pouches. Then we compare them and return a boolean result.

def __evaluate(self, other):

    val1 = 0
    val2 = 0

    for coin in self.bag:

        if coin.rank == 'g':
            val1 += 6

        if coin.rank == 's':
            val1 += 3

        if coin.rank == 'b':
            val1 += 1

    for coin in other.bag:

        if coin.rank == 'g':
            val2 += 6

        if coin.rank == 's':
            val2 += 3

        if coin.rank == 'b':
            val2 += 1

    return val1, val2

The __evaluate method calculates the values 
of the two pouches. It goes through the coins of the pouch 
and adds a value according to the rank of the coin.

pouch1 = Pouch()

pouch1.add(Coin('g'))
pouch1.add(Coin('g'))
pouch1.add(Coin('s'))

We create the first pouch and add three coins to it.

if pouch1 == pouch2:
    print('Pouches have equal value')

elif pouch1 &gt; pouch2:
    print('Pouch 1 is more valueable than Pouch 2')
else:
    print('Pouch 2 is more valueable than Pouch 1')

We compare the pouches with the comparison operators.

## 2D vector example

In the following example, we introduce a couple of other magic methods,
including __sub__, __mul__, 
and __abs__.

main.py
  

#!/usr/bin/python

import math

class Vec2D:

    def __init__(self, x, y):

        self.x = x
        self.y = y

    def __add__(self, other):
        return Vec2D(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vec2D(self.x - other.x, self.y - other.y)

    def __mul__(self, other):
        return self.x * other.x + self.y * other.y

    def __abs__(self):
        return math.sqrt(self.x ** 2 + self.y ** 2)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __str__(self):
        return f'({self.x}, {self.y})'

    def __ne__(self, other):
        return not self.__eq__(other)  

u = Vec2D(0, 1)
v = Vec2D(2, 3)
w = Vec2D(-1, 1)

a = u + v
print(a)

print(a == w)

a = u - v
print(a)

a = u * v

print(a)
print(abs(u))
print(u == v)
print(u != v)

In the example, we have a Vec2D class. We can compare, add,
subtract, and multiply vectors. We can also calculate the lenght of a 
vector.

$ ./main.py
(2, 4)
False
(-2, -2)
3
1.0
False 
True

## Source

[Python documentation](https://docs.python.org/3/contents.html)

In this article we have worked with Python magic methods.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).