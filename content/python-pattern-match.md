+++
title = "Python pattern match"
date = 2025-08-29T20:09:52.205+01:00
draft = false
description = "Python pattern match tutorial shows how to do pattern matching in Python. Pattern matching was introduced in Python 3.10."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python pattern match

last modified January 29, 2024

In this article we show how to use pattern matching in Python.

Pattern matching is done with match/case keywords. It was
introduced in Python 3.10 under the name *structural pattern matching*.

Pattern matching is a powerful control flow construct that allows us to compare
a value against a series of patterns and then execute code based on which
pattern matches. It is a much more advanced construct than the if/else
statements or the classic switch statements.

In if/else or switch statements, each individual condition is called a branch; 
in pattern matching, the term *arm* is used instead.

## Python pattern match literals

In the first example, we match againts simple literal values.

hello.py
  

#!/usr/bin/python

langs = ['russian', 'slovak', 'german',
         'swedish', 'hungarian', 'french', 'spanish']

print('say hello')

for lang in langs:
    match lang:
        case 'russian':
            print('привет')
        case 'hungarian':
            print('szia')
        case 'french':
            print('salut')
        case 'spanish':
            print('hola')
        case 'slovak':
            print('ahoj')
        case 'german':
            print('hallo')
        case 'swedish':
            print('Hallå')

We have a list of languages. We go through the list and say hello for each 
language. 

for lang in langs:
    match lang:

The match keywords is followed by the option we are matching and 
a colon.

case 'russian':
    print('привет')

Each arm is started with a case, an option, and a colon.

$ ./first.py 
say hello
привет
ahoj
hallo
Hallå
szia
salut
hola

## Python pattern match multiple options

We can have multiple options for a single line with |.

grades.py
  

#!/usr/bin/python

grades = ['A', 'B', 'C', 'D', 'E', 'F', 'FX']

for grade in grades:

    match grade:
        case 'A' | 'B' | 'C' | 'D' | 'E' | 'F':
            print('passed')
        case 'FX':
            print('failed')

We have a list of grades. For A throug F grades, we pass the example. For the 
FX grade, we fail the exam.

$ ./grades.py 
passed
passed
passed
passed
passed
passed
failed

## Python pattern match wildcard

We can use the wildcard character _ for values that do not match
any specific pattern, or it also can be utilized for all other patterns. 

factorial.py
  

#!/usr/bin/python

def factorial(n):
    match n:
        case 0 | 1:
            return 1
        case _:
            return n * factorial(n - 1)

for i in range(17):
    print(i, factorial(i))

We create a factorial function with match/case.

match n:
    case 0 | 1:
        return 1
    case _:
        return n * factorial(n - 1)

For values 0 and 1, we return 1. For all other values, we recursively call the
factorial function.

$ ./factorial.py 
0 1
1 1
2 2
3 6
4 24
5 120
6 720
7 5040
8 40320
9 362880
10 3628800
11 39916800
12 479001600
13 6227020800
14 87178291200
15 1307674368000
16 20922789888000

## Python pattern match guards

Guards in the form of if conditions can be executed on an arm.

guards.py
  

#!/usr/bin/python

import random

n = random.randint(-5, 5)

match n:
    case n if n &lt; 0:
        print(f"{n}: negative value")
    case n if n == 0:
        print(f"{n}: zero")
    case n if n &gt; 0:
        print(f"{n}: positive value")

The example chooses a random integer. With match/case we determine, 
if the value is negative, zero, or positive. 

case n if n &lt; 0:
    print(f"{n}: negative value")

This arm is executed if the n is less than zero.

## Python matter match objects

We can use pattern matching on Python objects.

objects.py
  

from dataclasses import dataclass

@dataclass
class Cat:
    name: str

@dataclass
class Dog:
    name: str

@dataclass
class Person:
    name: str

data = [Cat('Missy'), Dog('Jasper'), Dog('Ace'), Person('Peter'), 'Jupiter']

for e in data:
    match e:
        case Cat(name) | Dog(name):
            print(f'{name} is a pet')
        case Person(name):
            print(f'{name} is a human')
        case _:
            print(f'unknown')

We have three classes: Cat, Dog, and
Person. With match/case we check, what type of class we have. 

case Cat(name) | Dog(name):
    print(f'{name} is a pet')

This arm checks either for a cat or for a dog. 

case Person(name):
    print(f'{name} is a human')

This arm checks for a person object.

case _:
    print(f'unknown')

For an object that we cannot identify, we use the wildcard.

$ ./objects.py 
Missy is a pet
Jasper is a pet
Ace is a pet
Peter is a human
unknown

In the next example, we work with Point objects.

points.py
  

#!/usr/bin/python

from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

def check(p):
    match p:
        case Point(x=0, y=0):
            print("Origin")
        case Point(x, y) if y == 0:
            print(f"on x axis")
        case Point(x, y) if x == 0:
            print(f"on y axis")
        case Point(x, y) if x &gt; 0 and y &gt; 0:
            print("Q I")
        case Point(x, y) if x &lt; 0 and y &gt; 0:
            print("Q II")
        case Point(x, y) if x &lt; 0 and y &lt; 0:
            print("Q III")
        case Point(x, y) if x &gt; 0 and y &lt; 0:
            print("Q IV")
        case _:
            print("Not a point")

points = [Point(3, 0), Point(0, 0), Point(-4, -5), Point(-4, 0), Point(0, 5),
          Point(4, 8), Point(-5, 3), Point(6, -4)]

for p in points:
    check(p)

Depending on the coordinates, we assign the point objects to the origin, x and 
y axis, or one of the four quadrants. 

$ ./points.py 
on x axis
Origin
Q III
on x axis
on y axis
Q I
Q II
Q IV

## Python pattern match enums

Pattern matching can be effectively used with enums.

enum.py
  

#!/usr/bin/python

from enum import Enum
import random

Day = Enum('Day', 'Monday Tuesday Wednesday Thursday Friday Saturday Sunday')

days = [Day.Monday, Day.Tuesday, Day.Wednesday,
        Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday]

res = random.sample(days, 4)

for e in res:

    match e:
        case Day.Monday:
            print("monday")
        case Day.Tuesday:
            print("tuesday")
        case Day.Wednesday:
            print("wednesay")
        case Day.Thursday:
            print("thursday")
        case Day.Friday:
            print("friday")
        case Day.Saturday:
            print("saturday")
        case Day.Sunday:
            print("sunday")

In the example, we define a Day enumeration. 

days = [Day.Monday, Day.Tuesday, Day.Wednesday,
    Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday]

res = random.sample(days, 4)

We randomly choose four days from a list.

for e in res:

    match e:
        case Day.Monday:
            print("monday")
        case Day.Tuesday:
            print("tuesday")
        case Day.Wednesday:
            print("wednesay")
        case Day.Thursday:
            print("thursday")
        case Day.Friday:
            print("friday")
        case Day.Saturday:
            print("saturday")
        case Day.Sunday:
            print("sunday")

We check the four chosen values and print their corresponding string
representations.

$ ./enums.py 
friday
monday
thursday
tuesday

## Python pattern match tuples

In the following example, we match tuples.

tuples.py
  

#!/usr/bin/python

users = [
    ('John', 'Doe', 'gardener'),
    ('Jane', 'Doe', 'teacher'),
    ('Roger', 'Roe', 'driver'),
    ('Martin', 'Molnar', 'programmer'),
    ('Robert', 'Kovac', 'shopkeeper'),
    ('Tomas', 'Novy', 'programmer'),
]

for user in users:
    match user:
        case (fname, lname, 'programmer'):
            print(f'{fname} {lname} is a programmer')
        case (fname, lname, 'teacher'):
            print(f'{fname} {lname} is a teacher')
        case (fname, lname, 'gardener'):
            print(f'{fname} {lname} is a gardener')
        case _:
            print(user)

We have a list of tuples. Each tuple is a person and his profession. We match 
against the profession. 

case (fname, lname, 'programmer'):
    print(f'{fname} {lname} is a programmer')

This arm binds the name of the person to fname and
lname variables and matches against the 'programmer' value. 

$ ./tuples.py
John Doe is a gardener
Jane Doe is a teacher
('Roger', 'Roe', 'driver')
Martin Molnar is a programmer
('Robert', 'Kovac', 'shopkeeper')
Tomas Novy is a programmer

## Python pattern match maps

In the next example, we do pattern matching with maps.

maps.py
  

#!/usr/bin/python

users = [
    {'name': 'Paul', 'cols': ['red', 'blue', 'salmon']},
    {'name': 'Martin', 'cols': ['blue']},
    {'name': 'Lucia', 'cols': ['pink', 'brown']},
    {'name': 'Jan', 'cols': ['blue', 'green']},
]

for user in users:
    match user:
        case {'name':name, 'cols': cols}:
            print(f'favourite colours of {name}:')
            for col in cols:
                print(col)

We have a list of users represented as maps. 

case {'name':name, 'cols': cols}:
    print(f'favourite colours of {name}:')
    for col in cols:
        print(col)

The case arm matches against a map and prints each user's favourite
colours.

$ ./maps.py 
favourite colours of Paul:
red
blue
salmon
favourite colours of Martin:
blue
favourite colours of Lucia:
pink
brown
favourite colours of Jan:
blue
green

## Source

[PEP 622 – Structural Pattern Matching](https://peps.python.org/pep-0622/)

In this article we have worked with Python pattern matching.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).