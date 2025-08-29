+++
title = "Python operator Module"
date = 2025-08-29T20:09:02.805+01:00
draft = false
description = "Python operator tutorial shows how to use the operator module for working with operators in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python operator Module

last modified February 15, 2025

In this article, we show how to use the operator module in Python.
The operator module provides functions corresponding to the
operators of Python. It is particularly useful when you need to use operators as
function arguments, such as with map or filter.

The operator module is part of Python's standard library, so no
additional installation is required.

## Basic Usage of operator

The following example demonstrates how to use the operator module
to perform arithmetic operations.

main.py
    

import operator

a = 10
b = 3

print("Addition:", operator.add(a, b))
print("Subtraction:", operator.sub(a, b))
print("Multiplication:", operator.mul(a, b))
print("Division:", operator.truediv(a, b))

In this program, the operator.add, operator.sub,
operator.mul, and operator.truediv functions are
used to perform the respective arithmetic operations.

$ python main.py
Addition: 13
Subtraction: 7
Multiplication: 30
Division: 3.3333333333333335

## Comparison Operators

The following example demonstrates how to use the operator module
to perform comparisons.

main.py
    

import operator

a = 10
b = 3

print("Equal:", operator.eq(a, b))
print("Not Equal:", operator.ne(a, b))
print("Greater Than:", operator.gt(a, b))
print("Less Than:", operator.lt(a, b))
print("Greater Than or Equal:", operator.ge(a, b))
print("Less Than or Equal:", operator.le(a, b))

In this program, the operator.eq, operator.ne,
operator.gt, operator.lt, operator.ge,
and operator.le functions are used to perform the respective
comparisons.

$ python main.py
Equal: False
Not Equal: True
Greater Than: True
Less Than: False
Greater Than or Equal: True
Less Than or Equal: False

## Logical Operators

The following example demonstrates how to use the operator module
to perform logical operations.

main.py
    

import operator

account_balance = 1000

withdrawal_amount = 500
deposit_amount = 200

if operator.ge(account_balance, withdrawal_amount):
    print("Withdrawal successful. New balance:", account_balance - withdrawal_amount)
else:
    print("Insufficient balance for withdrawal.")

if operator.ge(account_balance, deposit_amount):
    print("Deposit successful. New balance:", account_balance + deposit_amount)
else:
    print("Error: Deposit amount exceeds account balance.")

if operator.eq(account_balance, 0):
    print("Account balance is zero.")
else:
    print("Account balance is not zero.")

if operator.ne(account_balance, 0):
    print("Account balance is not zero.")
else:
    print("Account balance is zero.")

In this example, we use the operator module to perform various
comparisons on the account balance.

We use these operators to check if the account balance is sufficient for certain
transactions, such as withdrawals and deposits. We also use them to check if the
account balance is zero or not zero.

$ python main.py
And: 2
Or: 11
Not: -11

## Bitwise Operators

The following example demonstrates how to use the operator module
to perform bitwise operations.

main.py
    

import operator

READ = 0b0001  # 1
WRITE = 0b0010  # 2
EXECUTE = 0b0100  # 4

user_permissions = READ | WRITE

has_read = operator.and_(user_permissions, READ) != 0
print("Has read permission:", has_read)

has_execute = operator.and_(user_permissions, EXECUTE) != 0
print("Has execute permission:", has_execute)

user_permissions = operator.or_(user_permissions, EXECUTE)
print("Added execute permission:", bin(user_permissions))

user_permissions = operator.and_(user_permissions, operator.not_(WRITE))
print("Removed write permission:", bin(user_permissions))

user_permissions = operator.xor(user_permissions, READ)
print("Toggled read permission:", bin(user_permissions))

In this program, we use the operator module to manipulate flags and
permissions in a hypothetical user permissions system with bitwise operators.

READ = 0b0001  # 1
WRITE = 0b0010  # 2
EXECUTE = 0b0100  # 4

We define some permissions as bit masks.

has_read = operator.and_(user_permissions, READ) != 0
print("Has read permission:", has_read)

We check if the user has read permission.

has_execute = operator.and_(user_permissions, EXECUTE) != 0
print("Has execute permission:", has_execute)

Here we check if the user has execute permission.

user_permissions = operator.or_(user_permissions, EXECUTE)
print("Added execute permission:", bin(user_permissions))

We add execute permission to the user.

user_permissions = operator.and_(user_permissions, operator.not_(WRITE))
print("Removed write permission:", bin(user_permissions))

We remove write permission from the user.

user_permissions = operator.xor(user_permissions, READ)
print("Toggled read permission:", bin(user_permissions))

Finally, we toggle read permission (if the user has it, remove it; if not, add
it).

$ python main.py
Has read permission: True
Has execute permission: False
Added execute permission: 0b111
Removed write permission: 0b0
Toggled read permission: 0b1

## Retrieving Items from Objects

The operator module provides methods for accessing elements in
sequences and dictionaries.

main.py
    

import operator

my_list = [1, 2, 3, 4, 5]
get_second = operator.itemgetter(1)
print(get_second(my_list))

my_dict = {'a': 10, 'b': 20, 'c': 30}
get_value = operator.itemgetter('b')
print(get_value(my_dict))

The example demonstrates the use of operator.itemgetter to extract
specific items from a list and a dictionary.

get_second = operator.itemgetter(1)
print(get_second(my_list))

The operator.itemgetter(1) creates a callable that fetches the item
at index 1 from its operand. The get_second(my_list) calls this
callable with my_list as the argument. It retrieves the second element from
my_list, which is 2.

get_value = operator.itemgetter('b')
print(get_value(my_dict))

The operator.itemgetter('b') creates a callable that fetches the
value associated with the key 'b' from its operand. The
get_value(my_dict) calls this callable with my_dict as
the argument. It retrieves the value associated with the key 'b', which is 20.

## Sorting with itemgetter

Sorting a list of tuples based on a specific element is a common task. The
itemgetter function extracts a specific index from each tuple,
making it easy to sort based on that value.

main.py
    

from operator import itemgetter

students = [("John", 85), ("Jane", 90), ("Dave", 80)]
sorted_students = sorted(students, key=itemgetter(1), reverse=True)
print(sorted_students)

The example sorts the list of tuples by the second tuple item.

$ python main.py
[("Jane", 90), ("John", 85), ("Dave", 80)]

## Mapping with methodcaller

The methodcaller function is useful when applying the same
method to a list of objects. Instead of using a lambda function, we can use
methodcaller to call methods like upper on each
element in a list.

main.py
    

from operator import methodcaller

words = ["an", "old", "falcon"]
upper_words = list(map(methodcaller("upper"), words))
print(upper_words)

The example applies the upper method on each element of the list.

$ python main.py
["AN", "OLD", "FALCON"]

## Filtering with attrgetter

When working with objects, filtering elements based on attributes can be
simplified using attrgetter. Instead of using a lambda function to
access an attribute, attrgetter provides a cleaner and more
readable approach.

main.py
    

from operator import attrgetter

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

people = [Person("Alice", 30), Person("Bob", 25), Person("Charlie", 35)]
adults = list(filter(lambda p: attrgetter("age")(p) &gt;= 30, people))
print([(p.name, p.age) for p in adults])

In the example we filter the users by age; we select all that are older or 
equal to 30.

$ python main.py
[("Alice", 30), ("Charlie", 35)]

## Source

[Python operator - Documentation](https://docs.python.org/3/library/operator.html)

In this article, we have shown how to use the operator module in
Python for working with operators. The operator module is a useful
tool for any Python programmer.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).