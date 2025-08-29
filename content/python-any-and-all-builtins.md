+++
title = "Python any & all builtins"
date = 2025-08-29T20:07:37.651+01:00
draft = false
description = "Python any & all functions tutorial shows how to work with any and all builtins in Python language."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python any &amp; all builtins

last modified January 29, 2024

In this article we show how to work with any and all
builtins in Python.

## Python any

The any builtin function returns True if any element
of the iterable is true. If the iterable is empty, it returns
False.

def any(it):
  for el in it:
      if el:
          return True
  return False

The any is equivalent to the above code.

vals = [False, False, True, False, False]

if any(vals):
    print('There is a truthy value in the list')
else:
    print('There is no truthy value in the list')

With the any function, we check if there is any truthy
value in the list.

## Python any practical example

Our next goal is to find out if there are some users older than the
specified age.

users_age.py
  

#!/usr/bin/python

from datetime import datetime, date
from dateutil.relativedelta import relativedelta

users = [
  {'name': 'John Doe', 'date_of_birth': '1987-11-08', 'active': True},
  {'name': 'Jane Doe', 'date_of_birth': '1996-02-03', 'active': True},
  {'name': 'Robert Brown', 'date_of_birth': '1977-12-12', 'active': True},
  {'name': 'Lucia Smith', 'date_of_birth': '2002-11-17', 'active': False},
  {'name': 'Patrick Dempsey', 'date_of_birth': '1994-01-04', 'active': True}
]

user_dts = [datetime.strptime(user['date_of_birth'], "%Y-%m-%d") for user in users]

val = 40
today = datetime.now()
data = [relativedelta(today, dt).years &gt; val for dt in user_dts]

if any(data):
    print(f'There are users older than {val}')
else:
    print(f'There are no users older than {val}')

We have a list of users. Each user is represented as a dictionary. One of the keys of
the dictionary is the date of birth.

user_dts = [datetime.strptime(user['date_of_birth'], "%Y-%m-%d") for user in users]

With a Python list comprehension, we create a list of user datetime objects.
With the strptime function, we transform the
date_of_birth string values into datetime objects.

val = 40

We want to find out if there is any user older than forty.

today = datetime.now()

We get the current date and time.

data = [relativedelta(today, dt).years &gt; val for dt in user_dts]

With another list comprehension, we create a list of boolean values. The
relativedelta function calculates the years between the current
datetime and the user's birthday datetime. If the difference in years is greater
than the given value (40), the expression returns True; False otherwise.

if any(data):
    print(f'There are users older than {val}')
else:
    print(f'There are no users older than {val}')

We pass the created list of boolean values to the any function.

$ ./users_age.py
There are users older than 40

There is at least one user older than forty.

## Python all

The all builtin function returns True
if all elements of the iterable are true (or if the iterable is empty).

def all(it):
    for el in it:
        if not el:
            return False
    return True

The all is equivalent to the above code.

vals = [True, False, True, True, True]

if all(vals):
    print('All values are truthy')
else:
    print('All values are not thruthy')

With the all function, we check if all values are truthy.

## Python all practical example

We want to find out if all users are active.

users_active.py
  

#!/usr/bin/python

users = [
  {'name': 'John Doe', 'occupation': 'gardener', 'active': True},
  {'name': 'Jane Doe', 'occupation': 'teacher', 'active': True},
  {'name': 'Robert Brown', 'occupation': 'driver', 'active': True},
  {'name': 'Lucia Smith', 'occupation': 'hair dresser', 'active': False},
  {'name': 'Patrick Dempsey', 'occupation': 'programmer', 'active': True}
]

if all([user['active'] for user in users]):
    print('All users are active')
else:
    print('There are inactive users')

We have a list of users. The users have the active property.

if all([user['active'] for user in users]):
    print('All users are active')
else:
    print('There are inactive users')

With the all function we check, if all users are active.

$ ./users_active.py
There are inactive users

## Source

[Python built-in functions](https://docs.python.org/3/library/functions.html)

In this article we have worked with the any and all
builtin functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).