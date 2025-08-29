+++
title = "Python Funcy"
date = 2025-08-29T20:08:34.006+01:00
draft = false
description = "Python Funcy tutorial shows how to use the Funcy library for functional programming tasks in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Funcy

last modified February 15, 2025

In this article we show how to use the funcy library in Python.
Funcy provides a collection of functional programming utilities that make it
easier to work with collections, dictionaries, and functions.

The funcy library is particularly useful for tasks like filtering,
transforming, and combining data in a functional style.

## Distinct

The following example demonstrates how to use the distinct function
to remove duplicate elements from a list.

main.py
  

from funcy import distinct

words = ['sky', 'war', 'water', 'war', 'sky', 'cup', 'cup', 'atom']

distilled = distinct(words)
print(list(distilled))

In this program, the distinct function is used to remove duplicate
elements from the words list.

distilled = distinct(words)

The distinct function returns an iterator of unique elements from
the input list.

$ python main.py
['sky', 'war', 'water', 'cup', 'atom']

## Split

The following example demonstrates how to use the split function to
divide a list into two parts based on a condition.

main.py
  

from funcy import split

values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens, odds = split(lambda e: e % 2 == 0, values)

print(list(evens))
print(list(odds))

In this program, the split function is used to divide the
values list into even and odd numbers.

evens, odds = split(lambda e: e % 2 == 0, values)

The split function divides the list into two parts based on the
condition provided.

$ python main.py
[2, 4, 6, 8, 10]
[1, 3, 5, 7, 9]

## Flatten

The following example demonstrates how to use the flatten function
to flatten a nested list.

main.py
  

from funcy import flatten

nested_list = [[1, 2], [3, 4], [5]]
flat_list = flatten(nested_list)
print(list(flat_list))

In this program, the flatten function is used to flatten the
nested_list into a single list.

flat_list = flatten(nested_list)

The flatten function returns an iterator of elements from the
nested list.

$ python main.py
[1, 2, 3, 4, 5]

## Merge With

The following example demonstrates how to use the merge_with
function to merge multiple dictionaries and combine their values.

main.py
  

from funcy import merge_with

# Sales data for different stores and online
store1_sales = {
    'Product A': 120,
    'Product B': 80
}
store2_sales = {
    'Product A': 150,
    'Product C': 60
}
online_sales = {
    'Product B': 110,
    'Product C': 90
}

# Merge sales data, summing up sales for each product
total_sales = merge_with(sum, store1_sales, store2_sales, online_sales)

print(total_sales)

In this program, the merge_with function is used to merge multiple
dictionaries and sum their values.

total_sales = merge_with(sum, store1_sales, store2_sales, online_sales)

The merge_with function merges the dictionaries and applies the
sum function to combine values for the same keys.

$ python main.py
{'Product A': 270, 'Product B': 190, 'Product C': 150}

## Walk Values &amp; Walk Keys

The following example demonstrates how to use the walk_values and
walk_keys functions to transform dictionary values and keys.

main.py
  

from funcy import walk_values, walk_keys

# Sample data with inconsistent text cases
data = {
    'Name': 'Alice',
    'Email': 'ALICE@EXAMPLE.COM',
    'City': 'NeW YoRk'
}

# Normalize the text to lowercase
normalized_values = walk_values(str.lower, data)
print("Normalized values:", normalized_values)

# Normalize the text to lowercase
normalized_keys = walk_keys(str.lower, data)
print("Normalized keys:", normalized_keys)

In this program, the walk_values and walk_keys
functions are used to normalize dictionary values and keys to lowercase.

normalized_values = walk_values(str.lower, data)

The walk_values function applies the str.lower
function to all values in the dictionary.

normalized_keys = walk_keys(str.lower, data)

The walk_keys function applies the str.lower function
to all keys in the dictionary.

$ python main.py
Normalized values: {'Name': 'alice', 'Email': 'alice@example.com', 'City': 'new york'}
Normalized keys: {'name': 'Alice', 'email': 'ALICE@EXAMPLE.COM', 'city': 'NeW YoRk'}

## Split By

The following example demonstrates how to use the split_by function
to split a list into two parts based on a condition.

main.py
  

from collections import namedtuple
from funcy import split_by

City = namedtuple('City' , 'id name population')

c1 = City(1, 'Bratislava', 432000)
c2 = City(2, 'Budapest', 1759000)
c3 = City(3, 'Prague', 1280000)
c4 = City(4, 'Warsaw', 1748000)
c5 = City(5, 'Los Angeles', 3971000)
c6 = City(6, 'Edinburgh', 464000)
c7 = City(7, 'Presov', 82930)
c8 = City(8, 'Kosice', 228000)
c9 = City(9, 'Zilina', 81220)

cities = [c1, c2, c3, c4, c5, c6, c7, c8, c9]
cities.sort(key=lambda c: c.population)

low_pop, high_pop = split_by(lambda c: c.population &lt; 1000_000, cities)
print(list(low_pop))
print(list(high_pop))

In this program, the split_by function is used to split the
cities list into two parts based on population.

low_pop, high_pop = split_by(lambda c: c.population &lt; 1000_000, cities)

The split_by function splits the list into two parts based on the condition provided.

$ python main.py
[City(id=7, name='Presov', population=82930), City(id=9, name='Zilina', population=81220), 
 City(id=8, name='Kosice', population=228000), City(id=6, name='Edinburgh', population=464000), 
 City(id=1, name='Bratislava', population=432000)]
[City(id=3, name='Prague', population=1280000), City(id=4, name='Warsaw', population=1748000), 
 City(id=2, name='Budapest', population=1759000), City(id=5, name='Los Angeles', population=3971000)]

## Select Keys &amp; Select Values

The following example demonstrates how to use the select_keys and
select_values functions to filter dictionary keys and values.

main.py
  

from funcy import select_keys, select_values

animals = {'donkeys': 3, 'horses': 2, 'chickens': 15,
           'dogs': 2, 'cats': 5, 'elephants': 2}

res = select_values(lambda e: e &gt; 2, animals)
print(res)

res = select_keys(lambda e: e.startswith('do'), animals)
print(res)

res = {k: v for k, v in filter(lambda e: e[1] &gt; 2, animals.items())}
print(res)

res = {k: v for k, v in filter(
    lambda e: e[0].startswith('do'), animals.items())}
print(res)

In this program, the select_values and select_keys
functions are used to filter dictionary values and keys.

res = select_values(lambda e: e &gt; 2, animals)

The select_values function filters dictionary values based on the
condition provided.

res = select_keys(lambda e: e.startswith('do'), animals)

The select_keys function filters dictionary keys based on the
condition provided.

$ python main.py
{'donkeys': 3, 'chickens': 15, 'cats': 5}
{'donkeys': 3, 'dogs': 2}
{'donkeys': 3, 'chickens': 15, 'cats': 5}
{'donkeys': 3, 'dogs': 2}

## Count By

The following example demonstrates how to use the count_by function
to count occurrences of values in a list.

main.py
  

from dataclasses import dataclass
from funcy import count_by

@dataclass
class User:
    name: str
    age: int
    occupation: str

users = [
    User(name='Alice', age=25, occupation='pilot'),
    User(name='Bob', age=30, occupation='driver'),
    User(name='Charlie', age=35, occupation='teacher'),
    User(name='David', age=40, occupation='teacher'),
    User(name='Paul', age=44, occupation='teacher'),
    User(name='Eva', age=25, occupation='driver'),
    User(name='Frank', age=30, occupation='teacher'),
    User(name='Mary', age=31, occupation='accountant')
]

# Count users by age group
occupation_counts = count_by(lambda user: user.occupation, users)

print(dict(occupation_counts))

In this program, the count_by function is used to count the number
of users in each occupation.

occupation_counts = count_by(lambda user: user.occupation, users)

The count_by function counts occurrences of values based on the
function provided.

$ python main.py
{'pilot': 1, 'driver': 2, 'teacher': 4, 'accountant': 1}

## Function Composition

The following example demonstrates how to use the rcompose and
compose functions to compose multiple functions.

main.py
  

from funcy import rcompose, compose

def square(x):
    return x * x

def increment(x):
    return x + 1

def cube(x):
    return x * x * x

val = 5

fchain = rcompose(square, increment, cube)
print(fchain(val))
print(cube(increment(square(val))))

print('---------------------------------------------')

fchain = compose(square, increment, cube)
print(fchain(val))
print(square(increment(cube(val))))

In this program, the rcompose and compose functions
are used to compose multiple functions.

fchain = rcompose(square, increment, cube)

The rcompose function composes functions in reverse order (right-to-left).

fchain = compose(square, increment, cube)

The compose function composes functions in order (left-to-right).

$ python main.py
17576
17576
---------------------------------------------
15876
15876

## Source

[Python Funcy - documentation](https://funcy.readthedocs.io/en/stable/)

In this article we have shown how to use the funcy library for
functional programming tasks in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).