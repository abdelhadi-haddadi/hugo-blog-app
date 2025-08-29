+++
title = "Python sort list"
date = 2025-08-29T20:10:25.372+01:00
draft = false
description = "Python sort list tutorial shows how to sort list elements in Python language. The tutorial provides numerous examples to demonstrate sorting in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sort list

last modified September 16, 2024

In this article we show how to  sort list elements in Python language.

## Sorting

In computer science, sorting is arranging elements in an ordered sequence. Over
the years, several algorithms were developed to perform sorting on data,
including merge sort, quick sort, selection sort, or bubble sort. (The other
meaning of sorting is categorizing; it is grouping elements with similar
properties.)

The opposite of sorting, rearranging a sequence of elements in a random or
meaningless order, is called *shuffling*.

Data can be sorted alphabetically or numerically. The *sort key*
specifies the criteria used to perform the sort. It is possible to sort objects
by multiple keys. For instance, when sorting users, the names of the users could
be used as primary sort key, and their occupation as the secondary sort key.

## Sorting order

A standard order is called the ascending order: a to z, 0 to 9. The reverse
order is called the  descending order: z to a, 9 to 0. For dates and times,
ascending means that earlier values  precede later ones e.g. 1/1/2020 will sort
ahead of 1/1/2021.

## Stable sort

A stable sort is one where the initial order of equal elements is
preserved. Some sorting algorithms are naturally stable, some are unstable. For
instance, the merge sort and the bubble sort are stable sorting algorithms. On
the other hand, heap sort and quick sort are examples of unstable sorting
algorithms.

Consider the following values: 3715593. A stable
sorting produces the following: 1335579. The ordering
of the values 3 and 5 is kept. An unstable sorting may produce the following:
1335579.

Python uses the timsort algorithm. It is a hybrid stable sorting algorithm,
derived from merge  sort and insertion sort. It was implemented by Tim Peters
in 2002 for use in the  Python programming language.

## Python sort functions

Python has two basic function for sorting lists: sort and
sorted. The sort sorts the list in place, while the
sorted returns a new sorted list from the items in iterable. Both
functions have the same options: key and reverse. The
key takes a function which will be used on each value in the list
being sorted to determine the resulting order. The reverse
option can reverse the comparison order.

Both functions produce stable sorting.

## Python sort list in-place

The sort function of the list container modifies the original list
when doing the sorting.

inplace_sort.py
  

#!/usr/bin/python

words = ['forest', 'wood', 'tool', 'arc', 'sky', 'poor', 'cloud', 'rock']
vals = [2, 1, 0, 3, 4, 6, 5, 7]

words.sort()
print(words)

vals.sort()
print(vals)

In the example, we sort the list of strings and integers. The original lists
are modified.

$ ./inplace_sort.py
['arc', 'cloud', 'forest', 'poor', 'rock', 'sky', 'tool', 'wood']
[0, 1, 2, 3, 4, 5, 6, 7]

## Python sorted example

The sorted function does not modify the original list; rather, it
creates a new modified list.

sorted_fun.py
  

#!/usr/bin/python

words = ['forest', 'wood', 'brisk', 'tree', 'sky', 'cloud', 'rock', 'falcon']

sorted_words = sorted(words)
print('Original:', words)
print('Sorted:', sorted_words)

The example creates a new sorted list of words from the original list, which is
intact.

$ ./sorted_fun.py
Original: ['forest', 'wood', 'brisk', 'tree', 'sky', 'cloud', 'rock', 'falcon']
Sorted: ['brisk', 'cloud', 'falcon', 'forest', 'rock', 'sky', 'tree', 'wood']

## Python sort list in ascending/descending order

The ascending/descending order is controlled with the reverse
option.

asc_desc.py
  

#!/usr/bin/python

words = ['forest', 'wood', 'tool', 'arc', 'sky', 'poor', 'cloud', 'rock']

words.sort()
print(words)

words.sort(reverse=True)
print(words)

The example sorts the list of words in ascending and descending order.

$ ./asc_desc.py
['arc', 'cloud', 'forest', 'poor', 'rock', 'sky', 'tool', 'wood']
['wood', 'tool', 'sky', 'rock', 'poor', 'forest', 'cloud', 'arc']

## Python sort list of dates

In the next example, we sort a list of dates.

sort_date.py
  

#!/usr/bin/python

from datetime import datetime

values = ['8-Nov-19', '21-Jun-16', '1-Nov-18', '7-Apr-19']
values.sort(key=lambda d: datetime.strptime(d, "%d-%b-%y"))

print(values)

The anonymous function uses the strptime function, which
creates a datetime object from the given string. Effectively, the sort
function sorts datetime objects.

If you are not familiar with the lambda keyword, learn more about anonymous
functions  in [Python lambda tutorial](/python/lambda/).

$. /sort_date.py
['21-Jun-16', '1-Nov-18', '7-Apr-19', '8-Nov-19']

## Python sort list by element index

A Python list can have nested iterables. In such cases, we
can choose the elements which should be sorted.

sort_elem_idx.py
  

#!/usr/bin/python

vals = [(4, 0), (0, -2), (3, 5), (1, 1), (-1, 3)]

vals.sort()
print(vals)

vals.sort(key=lambda e: e[1])
print(vals)

The example sorts the nested tuples initally by their first
elements, then by their second.

vals.sort(key=lambda e: e[1])

By providing an anonymous function which returns the second element
of the tuple, we sort the tuples by their second values.

$ ./sort_elem_idx.py
[(-1, 3), (0, -2), (1, 1), (3, 5), (4, 0)]
[(0, -2), (4, 0), (1, 1), (-1, 3), (3, 5)]

## Python sort list by sum of nested list

Say we have nested lists which all have some various rankings.
The final ranking is the sum of all the values.

sort_sum.py
  

#!/usr/bin/python

data = [[10, 11, 12, 13], [9, 10, 11, 12], [8, 9, 10, 11], [10, 9, 8, 7],
    [6, 7, 8, 9], [5, 5, 5, 1], [5, 5, 5, 5], [3, 4, 5, 6], [10, 1, 1, 2]]

data.sort()
print(data)

data.sort(key=sum)
print(data)

By default, the sorting functions sort by the first value of the nested lists.
To achieve our goal, we pass the built-in sum function to the
key option.

$ ./sort_sum.py
[[3, 4, 5, 6], [5, 5, 5, 1], [5, 5, 5, 5], [6, 7, 8, 9], [8, 9, 10, 11], [9, 10, 11, 12], [10, 1, 1, 2], [10, 9, 8, 7], [10, 11, 12, 13]]
[[10, 1, 1, 2], [5, 5, 5, 1], [3, 4, 5, 6], [5, 5, 5, 5], [6, 7, 8, 9], [10, 9, 8, 7], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13]]

The example shows the default and the custom sorting.

## Python sort list of localized strings

For locale aware sorting, we can use the locale.strxfrm
for the key function.

locale_sort.py
  

import locale

words = ['zem', 'čučoriedka', 'drevo', 'hrozno', 'hora', 'džem', 'element',
         'štebot', 'cesta', 'černice', 'ďateľ', 'rum', 'železo', 'prameň', 'sob',
         'chobot', 'chmel', 'cmar', 'džús', 'dzekať']

locale.setlocale(locale.LC_COLLATE, ('sk_SK', 'UTF8'))

words.sort(key=locale.strxfrm)

for word in words:
    print(word)

The example sorts Slovak words.

$ ./locale_sort.py
cesta
cesta
cmar
černice
čučoriedka
ďateľ
drevo
dzekať
džem
džús
element
hora
hrozno
chmel
chobot
prameň
rum
sob
štebot
zem
železo

**Note:** the resulting order of the Slovak words is not entirely
correct. The letter ď goes after d. It depends on how well the language is
supported.

## Python sort list of dictionaries

When sorting dictionaries, we can choose the property by which the sorting
is performed.

sort_dict.py
  

#!/usr/bin/python

users = [
  {'name': 'John Doe', 'date_of_birth': 1987},
  {'name': 'Jane Doe', 'date_of_birth': 1996},
  {'name': 'Robert Brown', 'date_of_birth': 1977},
  {'name': 'Lucia Smith', 'date_of_birth': 2002},
  {'name': 'Patrick Dempsey', 'date_of_birth': 1994}
]

users.sort(reverse=True, key=lambda e: e['date_of_birth'])

for user in users:
    print(user)

We have a list of users. Each user is represented by a dictionary.

users.sort(reverse=True, key=lambda e: e['date_of_birth'])

In the anonymous function, we choose the date_of_birth property.

$ ./sort_dict.py
{'name': 'Lucia Smith', 'date_of_birth': 2002}
{'name': 'Jane Doe', 'date_of_birth': 1996}
{'name': 'Patrick Dempsey', 'date_of_birth': 1994}
{'name': 'John Doe', 'date_of_birth': 1987}
{'name': 'Robert Brown', 'date_of_birth': 1977}

The users are sorted by their date of birth in descending order.

## Python sort list of grades

There are various grading systems around the world.  Our example contains
grades such as A+ or C- and these  cannot be ordered lexicographically. We use
a dictionary where each grade has its given value.

grades.py
  

#!/usr/bin/python

data = 'A+ A A- B+ B B- C+ C C- D+ D'
grades = { grade: idx for idx, grade in enumerate(data.split()) }

def mc(e):
    return grades.get(e[1])

students = [('Anna', 'A+'), ('Jozef', 'B'), ('Rebecca', 'B-'), ('Michael', 'D+'),
    ('Zoltan', 'A-'), ('Jan', 'A'), ('Michelle', 'C-'), ('Sofia', 'C+')]

print(grades)

students.sort(key=mc)
print(students)

# from operator import itemgetter
# students.sort(key=lambda e: itemgetter(e[1])(grades))

We have a list of students. Each student has a name and a grade in a nested
tuple.

data = 'A+ A A- B+ B B- C+ C C- D+ D'
grades = { grade: idx for idx, grade in enumerate(data.split()) }

We build the dictionary of grades. Each grade has its value. The grades will
be sorted by their dictionary value.

def mc(e):
    return grades.get(e[1])

The key function simply returns the value of the grade.

# from operator import itemgetter
# students.sort(key=lambda e: itemgetter(e[1])(grades))

This solution uses an anonymous function.

$ ./grades.py
{'A+': 0, 'A': 1, 'A-': 2, 'B+': 3, 'B': 4, 'B-': 5, 'C+': 6, 'C': 7, 'C-': 8, 'D+': 9, 'D': 10}
[('Anna', 'A+'), ('Jan', 'A'), ('Zoltan', 'A-'), ('Jozef', 'B'), ('Rebecca', 'B-'), ('Sofia', 'C+'), ('Michelle', 'C-'), ('Michael', 'D+')]

## Python sort list by string length

Sometimes, we need to sort the strings by their length.

sort_by_len.py
  

#!/usr/bin/python

def w_len(e):
  return len(e)

words = ['forest', 'wood', 'tool', 'sky', 'poor', 'cloud', 'rock', 'if']

words.sort(reverse=True, key=w_len)

print(words)

In this example, we do not use an anonymous function.

def w_len(e):
  return len(e)

The w_len function returns the length of each of the elements.

$ ./sort_by_len.py
['forest', 'cloud', 'wood', 'tool', 'poor', 'rock', 'sky', 'if']

The words are ordered by their length in descending order.

## Python sort list by case

By default, the strings with uppercase first letters are sorted before
the other strings. We can sort strings regardless of their case as well.

case_sorting.py
  

#!/usr/bin/python

text = 'Today is a beautiful day. Andy went fishing.'
words = text.replace('.', '')

sorted_words = sorted(words.split(), key=str.lower)
print('Case insensitive:', sorted_words)

sorted_words2 = sorted(words.split())
print('Case sensitive:', sorted_words2)

By providing the str.lower function to the key
attribute, we perform a case insensitive sorting.

$ ./case_sorting.py
Case insensitive: ['a', 'Andy', 'beautiful', 'day', 'fishing', 'is', 'Today', 'went']
Case sensitive: ['Andy', 'Today', 'a', 'beautiful', 'day', 'fishing', 'is', 'went']

## Python sort list by lastname

In the following example, we sort the names by last name.

sort_by_lastname.py
  

#!/usr/bin/python

names = ['John Doe', 'Jane Doe', 'Robert Brown', 'Robert Novak',
    'Lucia Smith', 'Patrick Dempsey', 'George Marshall', 'Alan Brooke',
    'Harold Andras', 'Albert Doe']

names.sort()
names.sort(key=lambda e: e.split()[-1])

for name in names:
    print(name)

We have a list of names. Each name consists of a first name and last name.
In addition, there are several users with the same last name. In such a case,
we want them to be sorted by their first names.

names.sort()
names.sort(key=lambda e: e.split()[-1])

First, we sort the names by their first names. Then we sort the names by their
last name. To do so, we split each string and choose the last string (it has
index -1.) Since Python's sort algorithm is stable, the first sorting is
remembered and we get the expected output.

$ ./sort_by_lastname.py
Harold Andras
Alan Brooke
Robert Brown
Patrick Dempsey
Albert Doe
Jane Doe
John Doe
George Marshall
Robert Novak
Lucia Smith

The names are sorted by their last names. The Doe users are correctly sorted by
their first names.

## Python sort list of namedtuples

In the next example, we sort namedtuples.

namedtuple_sort.py
  

#!/usr/bin/python

from typing import NamedTuple

class City(NamedTuple):
    id: int
    name: str
    population: int

c1 = City(1, 'Bratislava', 432000)
c2 = City(2, 'Budapest', 1759000)
c3 = City(3, 'Prague', 1280000)
c4 = City(4, 'Warsaw', 1748000)
c5 = City(5, 'Los Angeles', 3971000)
c6 = City(6, 'Edinburgh', 464000)
c7 = City(7, 'Berlin', 3671000)

cities = [c1, c2, c3, c4, c5, c6, c7]

cities.sort(key=lambda e: e.name)

for city in cities:
    print(city)

The City namedtuple has three attributes: id,
name, and population. The example sorts the
namedtuples by their names.

cities.sort(key=lambda e: e.name)

The anonymous function returns the name property of the namedtuple.

$ ./namedtuple_sort.py
City(id=7, name='Berlin', population=3671000)
City(id=1, name='Bratislava', population=432000)
City(id=2, name='Budapest', population=1759000)
City(id=6, name='Edinburgh', population=464000)
City(id=5, name='Los Angeles', population=3971000)
City(id=3, name='Prague', population=1280000)
City(id=4, name='Warsaw', population=1748000)

## The itemgetter and attrgetter functions

Python provides the itemgetter and attrgetter
convenience functions to make accessor functions easier and faster. They are 
located in the operator module.

helpers.py
  

#!/usr/bin/python

from typing import NamedTuple
from operator import itemgetter, attrgetter

class City(NamedTuple):
    id: int
    name: str
    population: int

c1 = City(1, 'Bratislava', 432000)
c2 = City(2, 'Budapest', 1759000)
c3 = City(3, 'Prague', 1280000)
c4 = City(4, 'Warsaw', 1748000)
c5 = City(5, 'Los Angeles', 3971000)
c6 = City(6, 'Edinburgh', 464000)
c7 = City(7, 'Berlin', 3671000)

cities = [c1, c2, c3, c4, c5, c6, c7]

sorted_cities = sorted(cities, key=attrgetter('name'))

for city in sorted_cities:
    print(city)

print('---------------------')

sorted_cities = sorted(cities, key=itemgetter(2))

for city in sorted_cities:
    print(city)

We sort a list of cities using sorted and the helper functions.

sorted_cities = sorted(cities, key=attrgetter('name'))

We pass the attribute name by which we sort the cities.

sorted_cities = sorted(cities, key=itemgetter(2))

In case of itemgetter, we pass the attribute's index.

$ ./named_tuple_sort.py
City(id=7, name='Berlin', population=3671000)
City(id=1, name='Bratislava', population=432000)
City(id=2, name='Budapest', population=1759000)
City(id=6, name='Edinburgh', population=464000)
City(id=5, name='Los Angeles', population=3971000)
City(id=3, name='Prague', population=1280000)
City(id=4, name='Warsaw', population=1748000)
---------------------
City(id=1, name='Bratislava', population=432000)
City(id=6, name='Edinburgh', population=464000)
City(id=3, name='Prague', population=1280000)
City(id=4, name='Warsaw', population=1748000)
City(id=2, name='Budapest', population=1759000)
City(id=7, name='Berlin', population=3671000)
City(id=5, name='Los Angeles', population=3971000)

## Python sort list by multiple sort criteria

The following example sorts a list of students by two sorting criteria.

multi_sort.py
  

#!/usr/bin/python

from typing import NamedTuple

class Student(NamedTuple):
    id: int
    name: str
    grade: str
    age: int

s1 = Student(1, 'Patrick', 'A', 21)
s2 = Student(2, 'Lucia', 'B', 19)
s3 = Student(3, 'Robert', 'C', 19)
s4 = Student(4, 'Monika', 'A', 22)
s5 = Student(5, 'Thomas', 'D', 20)
s6 = Student(6, 'Petra', 'B', 18)
s6 = Student(7, 'Sofia', 'A', 18)
s7 = Student(8, 'Harold', 'E', 22)
s8 = Student(9, 'Arnold', 'B', 23)

students = [s1, s2, s3, s4, s5, s6, s7, s8]
students.sort(key=lambda s: (s.grade, s.age))

for student in students:
    print(student)

We sort the students by grades and then by age. The sorting is in asceding
order.

students.sort(key=lambda s: (s.grade, s.age))

To do the sorting, we pass the lambda function a tuple of sorting attributes.

$ ./multiple_sort.py
Student(id=7, name='Sofia', grade='A', age=18)
Student(id=1, name='Patrick', grade='A', age=21)
Student(id=4, name='Monika', grade='A', age=22)
Student(id=2, name='Lucia', grade='B', age=19)
Student(id=9, name='Arnold', grade='B', age=23)
Student(id=3, name='Robert', grade='C', age=19)
Student(id=5, name='Thomas', grade='D', age=20)
Student(id=8, name='Harold', grade='E', age=22)

We may want to sort the data by multiple criteria with various ordering types. 

The first solution is to wrap the key in a class which defines the ordering
type.

multi_sort2.py
  

#!/usr/bin/python

from typing import NamedTuple

class negate:
    def __init__(self, obj):
        self.obj = obj

    def __eq__(self, other):
        return other.obj == self.obj

    def __lt__(self, other):
        return other.obj &lt; self.obj

class Student(NamedTuple):
    id: int
    name: str
    grade: str
    age: int

s1 = Student(1, 'Patrick', 'A', 21)
s2 = Student(2, 'Lucia', 'B', 19)
s3 = Student(3, 'Robert', 'C', 19)
s4 = Student(4, 'Monika', 'A', 22)
s5 = Student(5, 'Thomas', 'D', 20)
s6 = Student(6, 'Petra', 'B', 18)
s6 = Student(7, 'Sofia', 'A', 18)
s7 = Student(8, 'Harold', 'E', 22)
s8 = Student(9, 'Arnold', 'B', 23)

students = [s1, s2, s3, s4, s5, s6, s7, s8]
students.sort(key=lambda s: (s.grade, negate(s.age)))

for student in students:
    print(student)

The example sorts students by grade in asceding order and then by age in
descending order.

students.sort(key=lambda s: (s.grade, negate(s.age)))

The second key is wrapped with negate.

$ ./multi_sort2.py
Student(id=4, name='Monika', grade='A', age=22)
Student(id=1, name='Patrick', grade='A', age=21)
Student(id=7, name='Sofia', grade='A', age=18)
Student(id=9, name='Arnold', grade='B', age=23)
Student(id=2, name='Lucia', grade='B', age=19)
Student(id=3, name='Robert', grade='C', age=19)
Student(id=5, name='Thomas', grade='D', age=20)

Another solution is to sort the list twice.

multi_sort3.py
  

#!/usr/bin/python

from typing import NamedTuple
from operator import attrgetter

def multi_sort(data, specs):

    for key, reverse in reversed(specs):
        data.sort(key=attrgetter(key), reverse=reverse)
    return data

class Student(NamedTuple):
    id: int
    name: str
    grade: str
    age: int

s1 = Student(1, 'Patrick', 'A', 21)
s2 = Student(2, 'Lucia', 'B', 19)
s3 = Student(3, 'Robert', 'C', 19)
s4 = Student(4, 'Monika', 'A', 22)
s5 = Student(5, 'Thomas', 'D', 20)
s6 = Student(6, 'Petra', 'B', 18)
s6 = Student(7, 'Sofia', 'A', 18)
s7 = Student(8, 'Harold', 'E', 22)
s8 = Student(9, 'Arnold', 'B', 23)

students = [s1, s2, s3, s4, s5, s6, s7, s8]

multi_sort(students, (('grade', False), ('age', True)))

for student in students:
    print(student)

First, the students are sorted by grades in ascending order, then
they are sorted by age in descending order.

def multi_sort(data, specs):

    for key, reverse in reversed(specs):
        data.sort(key=attrgetter(key), reverse=reverse)
    return data

The multi_sort function applies all the sorting specs on the list.

$ ./multi_sort3.py
Student(id=4, name='Monika', grade='A', age=22)
Student(id=1, name='Patrick', grade='A', age=21)
Student(id=7, name='Sofia', grade='A', age=18)
Student(id=9, name='Arnold', grade='B', age=23)
Student(id=2, name='Lucia', grade='B', age=19)
Student(id=3, name='Robert', grade='C', age=19)
Student(id=5, name='Thomas', grade='D', age=20)
Student(id=8, name='Harold', grade='E', age=22)

## Sorting poker cards

The following example sorts a deck of Poker cards. 

main.py
  

import random
from itertools import groupby

def create_deck():

    signs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    symbols = ['♠', '♥', '♦', '♣']  # spades, hearts, diamonds, clubs

    deck = [f'{si}{sy}' for si in signs for sy in symbols]

    return deck

def by_poker_order(card):

    poker_order = "2 3 4 5 6 7 8 9 10 J Q K A"

    return poker_order.index(card[:-1])

def by_suit(card):

    return card[-1]

deck = create_deck()
random.shuffle(deck)

# Sort by poker order and then by suit
deck.sort(key=by_poker_order)
deck.sort(key=by_suit)

for k, g in groupby(deck, key=lambda c: c[-1]):
    print(k, list(g))

The code example creates a deck of cards. It groups the cards by suit and sorts 
them.

def create_deck():

    signs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    symbols = ['♠', '♥', '♦', '♣']  # spades, hearts, diamonds, clubs

    deck = [f'{si}{sy}' for si in signs for sy in symbols]

    return deck

The create_deck method creates a deck of Poker cards. There are 
thirteen signs and four suits. 

def by_poker_order(card):

    poker_order = "2 3 4 5 6 7 8 9 10 J Q K A"

    return poker_order.index(card[:-1])

The method returns the index of the sign of a card. This is used in sorting
cards.

def by_suit(card):

    return card[-1]

The by_suit method is used to sort cards by the suit. It returns 
the suit character from the hand; it is the last character.

random.shuffle(deck)

The cards are randomly reorganized with random.shuffle.

deck.sort(key=by_poker_order)
deck.sort(key=by_suit)

We sort the deck by Poker order and then by suit. 

for k, g in groupby(deck, key=lambda c: c[-1]):
    print(k, list(g))

We form four groups by suit using groupby function.

$ ./main.py
♠ ['2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠', 'A♠']
♣ ['2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣', 'A♣']
♥ ['2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥', 'A♥']
♦ ['2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦', 'A♦']

## Python sort list of custom complex objects - bags of coins

We have a custom object, a namedtuple, which has a specific way to sort it.

**Note: ** According to the Python documentation, the sort and
sorted use only the __lt__ magic method when doing sorting. So we
need to implement only this method. However, the PEP8 recommends to implement all six operations
(__eq__ , __ne__ , __lt__ , __le__ , __gt__,
__ge__) for safety and code completeness.

The total_ordering decorator from the functools module helps to reduce
the boilerplate. The total_ordering requires the __eq__ and one of the
remaining methods to be implemented.

sort_coins.py
  

#!/usr/bin/python

from typing import NamedTuple
from functools import total_ordering

# a gold coin equals to two silver and six bronze coins

class Coin(NamedTuple):

    rank: str

@total_ordering
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

    def __str__(self):

        return f'Pouch with: {self.bag}'

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

def create_pouches():

    p1 = Pouch()

    p1.add(Coin('g'))
    p1.add(Coin('b'))
    p1.add(Coin('s'))

    p2 = Pouch()

    p2.add(Coin('g'))
    p2.add(Coin('s'))

    p3 = Pouch()

    p3.add(Coin('b'))
    p3.add(Coin('s'))
    p3.add(Coin('s'))

    p4 = Pouch()

    p4.add(Coin('b'))
    p4.add(Coin('s'))

    p5 = Pouch()

    p5.add(Coin('g'))
    p5.add(Coin('s'))
    p5.add(Coin('s'))
    p5.add(Coin('b'))
    p5.add(Coin('b'))
    p5.add(Coin('b'))

    p6 = Pouch()

    p6.add(Coin('b'))
    p6.add(Coin('b'))
    p6.add(Coin('b'))
    p6.add(Coin('b'))
    p6.add(Coin('b'))

    p7 = Pouch()
    p7.add(Coin('g'))

    p8 = Pouch()
    p8.add(Coin('g'))
    p8.add(Coin('g'))
    p8.add(Coin('s'))

    bag = [p1, p2, p3, p4, p5, p6, p7, p8]

    return bag

bag = create_pouches()
bag.sort()

for e in bag:
    print(e)

In the example, we sort pouches of coins. There are three types
of coins: gold, silver, and bronze. One gold coin equals to two silver
and six bronze coins. (Therefore, one silver coin equals to three bronze coins.)

class Coin(NamedTuple):

    rank: str

Our custom object is a namedtuple, which has one attribute: rank.

@total_ordering
class Pouch:

    def __init__(self):
        self.bag = []

    def add(self, coin):

        self.bag.append(coin)
...

The Pouch has an internal self.bag list for storing its coins.
In the class, we have two comparison methods: __lt__ and __eq__.
The @total_ordering decorator supplies the rest.

def __lt__(self, other):

    val1, val2 = self.__evaluate(other)

    if val1 &lt; val2:
        return True
    else:
        return False

The __lt__ method is used by the Python sorting functions
to compare two objects. We have to compute the value of all coins in
two pouches and compare them.

def __str__(self):

    return f'Pouch with: {self.bag}'

The __str__ gives the human-readable representation
of the Pouch object.

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

The __evaluate method calculates the values of
the two pouches. It returns both values to the __lt__
for comparison.

def create_pouches():

    p1 = Pouch()

    p1.add(Coin('g'))
    p1.add(Coin('b'))
    p1.add(Coin('s'))

    p2 = Pouch()

    p2.add(Coin('g'))
    p2.add(Coin('s'))
...

In the create_pouches function we create eight pouches with various
amounts of coins.

bag.sort()

for e in bag:
    print(e)

We sort the bag of pouches and then print the elements of the sorted bag.

$ ./coins.py
Pouch with: [Coin(rank='b'), Coin(rank='s')]
Pouch with: [Coin(rank='b'), Coin(rank='b'), Coin(rank='b'), Coin(rank='b'), Coin(rank='b')]
Pouch with: [Coin(rank='g')]
Pouch with: [Coin(rank='b'), Coin(rank='s'), Coin(rank='s')]
Pouch with: [Coin(rank='g'), Coin(rank='s')]
Pouch with: [Coin(rank='g'), Coin(rank='b'), Coin(rank='s')]
Pouch with: [Coin(rank='g'), Coin(rank='s'), Coin(rank='s'), Coin(rank='b'), Coin(rank='b'), Coin(rank='b')]
Pouch with: [Coin(rank='g'), Coin(rank='g'), Coin(rank='s')]

This is the output. The pouch with two gold coins and one silver coin is the most
valuable.

## Source

[Python datastructures - language reference](https://docs.python.org/3/tutorial/datastructures.html)

In this article we have covered sorting operations on lists in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).