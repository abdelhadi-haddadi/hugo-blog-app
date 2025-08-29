+++
title = "Python enum"
date = 2025-08-29T20:08:27.355+01:00
draft = false
description = "Python enum tutorial shows how to work with enumerations in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python enum

last modified March 15, 2024

In this article we show how to work with enumerations in Python. Enumeration is
a data type introduced in Python 3.4.

An enumeration is a set of symbolic names bound to unique, constant values.
Enumerations can be used to create simple custom data types which include things
such as seasons, weeks, types of weapons in a game, planets, grades, or days. By
convention, enumeration names begin with an uppercase letter and are singular.

The enum module is used for creating enumerations in Python.
Enumerations are created with the class keyword or with the
functional API.

There are specific derived enumerations enum.IntEnum,
enum.IntFlag, and enum.Flag.

## Simple example

The following is a simple example of a Python enumeration.

main.py
  

#!/usr/bin/python

from enum import Enum

class Season(Enum):
    SPRING = 1
    SUMMER = 2
    AUTUMN = 3
    WINTER = 4

seas = Season.SPRING
print(seas)

if seas == Season.SPRING:
    print("Spring")

print(list(Season))

In the example, we have a Season enumeration which has
four distinct values: SPRING, SUMMER, AUTUMN, and WINTER. To access a member, 
we specify the enumeration name followed by a dot and the member name.

class Season(Enum):
    SPRING = 1
    SUMMER = 2
    AUTUMN = 3
    WINTER = 4

The Season enumeration is created with the class
keyword. We inherit from the enum.Enum base class. We explicity set
numbers to the enumeration values.

seas = Season.SPRING
print(seas)

An enumeration value is assigned to a variable and it is printed to the console.

if seas == Season.SPRING:
    print("Spring")

The Season.SPRING is used in an if expression.

print(list(Season))

With the list built-in function, we get the list of all possible values 
for the Season enum.

$ python main.py
Season.SPRING
Spring
[&lt;Season.SPRING: 1&gt;, &lt;Season.SUMMER: 2&gt;, &lt;Season.AUTUMN: 3&gt;, &lt;Season.WINTER: 4&gt;]

## Simple example II

The next example presents some other basic functionality of a Python enum.

main.py
  

#!/usr/bin/python

from enum import Enum

class Season(Enum):
    SPRING = 1
    SUMMER = 2
    AUTUMN = 3
    WINTER = 4

seas = Season.SPRING

print(seas)
print(isinstance(seas, Season))
print(type(seas))
print(repr(seas))

print(Season['SPRING'])
print(Season(1))

Again, we deal with a Season enumeration created with the class.

print(seas)

Here we print a human readable string representation of a Season member.

print(isinstance(seas, Season))

With the isinstance method, we check if the variable has a value of 
Season type.

print(type(seas))

The type function prints the type of the variable.

print(repr(seas))

The repr function provides more information about the enum.

print(Season['SPRING'])
print(Season(1))

Member of an enumeration can be accessed by item name and index. 

$ python main.py
Season.SPRING
True
&lt;enum 'Season'&gt;
&lt;Season.SPRING: 1&gt;
Season.SPRING
Season.SPRING

## Functional creation

Python enums can be created with functional API.

main.py
  

#!/usr/bin/python

from enum import Enum

Season = Enum('Season', 'SPRING SUMMER AUTUMN WINTER', start=1)

seas = Season.SUMMER
print(seas)

if seas == Season.SUMMER:
    print("Summer")

There are several ways how we can specify the values with functional API.
In later examples, we will use other functional ways.

Season = Enum('Season', 'SPRING SUMMER AUTUMN WINTER', start=1)

Here the values are specified in a string, separated by space.
The start provides the initial value.

$ python main.py
Season.SUMMER
Summer

## Enum iteration

We can iterate over Python enums.

main.py
  

#!/usr/bin/python

from enum import Enum

Season = Enum('Season', ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'], start=5)

for season in Season:
    print(season)

for season in Season:
    print(season.name, season.value)

In this example, we create a Season enum where the values are 
set in a list of strings.

for season in Season:
    print(season)

We iterate over enum members in a for loop. 

for season in Season:
    print(season.name, season.value)

Here we print their names and values. 

$ python main.py
Season.SPRING
Season.SUMMER
Season.AUTUMN
Season.WINTER
SPRING 5
SUMMER 6
AUTUMN 7
WINTER 8

## Automatic values

Python enum values can be automatically set with the auto
function.

main.py
  

#!/usr/bin/python

from enum import Enum, auto

class Season(Enum):
    SPRING = auto()
    SUMMER = auto()
    AUTUMN = auto()
    WINTER = auto()

for season in Season:
    print(season.value)

We have a Season enum where its members get a value 
with auto function.

$ python main.py
1
2
3
4

## Unique member values

The member values of a Python enum can be enforced to be unique 
with the @unique decorator.

main.py
  

#!/usr/bin/python

from enum import Enum, unique

@unique
class Season(Enum):
    SPRING = 1
    SUMMER = 2
    AUTUMN = 3
    WINTER = 3
    # WINTER = 4

for season in Season:
    print(season)

The example fails with the ValueError: duplicate values found in &lt;enum 'Season'&gt;: WINTER -&gt; AUTUMN
 error, because the AUTUMN and WINTER members have the same value. If we comment out the 
@unique decorator, the example prints three members; the WINTER is ignored.

## The __members__ attribute

The special attribute __members__ is a read-only ordered 
mapping of names to members.

main.py
  

#!/usr/bin/python

from enum import Enum

Season = Enum('Season', [('SPRING', 1), ('SUMMER', 2), 
    ('AUTUMN', 3), ('WINTER', 4)])

for name, member in Season.__members__.items():
    print(name, member)

In the example, we use the __members__ property. 
The enumeration members are created with a list of tuples using 
functional API.

$ python main.py
SPRING Season.SPRING
SUMMER Season.SUMMER
AUTUMN Season.AUTUMN
WINTER Season.WINTER

## The enum.Flag

 
The enum.Flag is a base class for creating enumerated
constants that can be combined using the bitwise operations without losing
their Flag membership.

main.py
  

#!/usr/bin/python

from enum import Flag, auto

class Perm(Flag):
    EXECUTE = auto()
    WRITE = auto()
    READ = auto()

print(list(Perm))
print(Perm.READ | Perm.WRITE)

The example shows how the Flag can be used 
on permissions.

$ python main.py
[&lt;Perm.EXECUTE: 1&gt;, &lt;Perm.WRITE: 2&gt;, &lt;Perm.READ: 4&gt;]
Perm.READ|WRITE

## Enum with a static method

The following example presents an enumeration with a custom static method.

main.py
  

#!/usr/bin/python

from enum import Enum
import random

class Day(Enum):
    Monday = 0
    Tuesday = 1
    Wednesday = 2
    Thursday = 3
    Friday = 4
    Saturday = 5
    Sunday = 6

    @staticmethod
    def random_day():
        return random.choice(list(Day))

rdays = [Day.random_day() for _ in range(10)]

for e in rdays:
    print(e)

The example creates a random list of days. 

class Day(Enum):
    Monday = 0
    Tuesday = 1
    Wednesday = 2
    Thursday = 3
    Friday = 4
    Saturday = 5
    Sunday = 6

    @staticmethod
    def random_day():
        return random.choice(list(Day))

We define a Day enumeration. The random_day static 
method returns a random choice from the keys of the enumeration.

rdays = [Day.random_day() for _ in range(10)]

With a list comprehension, we create a list of ten random days. 

$ python main.py
Day.Thursday
Day.Wednesday
Day.Monday
Day.Sunday
Day.Saturday
Day.Sunday
Day.Friday
Day.Sunday
Day.Monday
Day.Monday

We have a coin with two enum values: HEADS and TAILS.

main.py
  

from enum import Enum
import random

class Coin(Enum):
    HEADS = 0
    TAILS = 1

    @staticmethod
    def toss():
        return random.choice(list(Coin))

for _ in range(15):
    print(f'{Coin.toss()}', end=' ')

In the example, we toss a coin fifteen times.

@staticmethod
def toss():
    return random.choice(list(Coin))

The static toss method returns one of the values randomly.

$ python main.py
Coin.TAILS Coin.TAILS Coin.HEADS Coin.HEADS Coin.TAILS Coin.HEADS Coin.TAILS ...

## Using pattern matching

The match/case keywords can be used with enums to create concise 
code.

main.py
  

#!/usr/bin/python

from enum import Enum
import random

class Day(Enum):
    Monday = 0
    Tuesday = 1
    Wednesday = 2
    Thursday = 3
    Friday = 4
    Saturday = 5
    Sunday = 6

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
representations. For each option, we have a specific case arm.

$ python main.py
monday
friday
thursday
sunday

## Source

[Python enum - language reference](https://docs.python.org/3/library/enum.html)

In this article we have worked with Python enumerations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).