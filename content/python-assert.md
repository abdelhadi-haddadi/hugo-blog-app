+++
title = "Python assert"
date = 2025-08-29T20:07:39.846+01:00
draft = false
description = "Python assert tutorial shows how to work with assertions in Python. We define assertions, explain the difference between assertions and exceptions and show their relation to unit tests."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python assert

last modified January 29, 2024

In this article we show how to work with assertions in Python. We define
assertions, explain the difference between assertions and exceptions and show
their relation to unit tests.

## Assertions

Assertions are internal self-checks in the code; they are suited for developers
to find bugs as soon as possible. The purpose of the assertions is to detect
problems early in the program, where the cause is clear, and avoid them to pop
up as a side-effect of some other operation.

Assertions should not be used for data processing or validation, because they
are turned off in production. Some programming languages, such as Go, do not use
assertions. Other languages have assert statements but they are used less often
(Java).

**Note: ** Go designers explain that developers should think more
about proper error handling and reporting. Go has assertions in Unit tests only.

## Assertions vs exceptions

Assertions are boolean expressions that must be true for the code to be correct.
Assertion failures result in code correction. Exceptions are indications about
non-typical  situations that can occur at runtime. Exceptions may not result in
fixing the code.  For instance, if the Internet connection is down, or the file
permissions are not sufficient, the user has to deal with them. Assertions
should not be used for handling runtime errors.

## Design by contract

Design by contract, or programming by contract, is a software development
practice in which developers define formal, precise and verifiable interface
specifications for software components. The specifications are divided into
preconditions, postconditions and invariants.

A precondition is a predicate that must always be true prior to the execution of
a piece of code. A poscondition is a predicate that must always be true after
the execution of a piece of code. An invariant is a property which remains
unchanged after all operations.

The design by contract approach was developed in the 1980s and was inspired
by business contracts.

## Assertions and unit tests

Assertions and unit tests overlap in some areas, but there are some differences.
Assertions are assumptions about the internal state of the program, while unit
tests examine the external behavior of a module. Unit tests work with test data,
while assertions do not.

Assert statements are used in unit tests. Classic assertions are assumptions
about something which is true, while in unit tests, developers often test for
false conditions.

## Python assert

The assert statement is a convenient way to insert debugging
assertions into a Python program. The assert statements are removed with
the -O, -OO options and the PYTHONOPTIMIZE
variable.

The Python assert statement consists of a boolean condition and an
optional error message, separated by comma.

## Python assert examples

The following examples show the usage of the Python assert statement.

precondition.py
  

#!/usr/bin/python

def info(age, name):

    assert age &gt;= 18 and age &lt;= 65, 'age value must be between values 18 and 65'

    print(f'{name} is {age} years old')

age = 84
name = 'Peter'

info(age, name)

In the example, we have a precondition about the age value.

$ ./precondition.py
Traceback (most recent call last):
  File "./precondition.py", line 14, in &lt;module&gt;
    info(age, name)
  File "./precondition.py", line 6, in info
    assert age &gt;= 18 and age &lt;= 65, 'age value must be between values 18 and 65'
AssertionError: age value must be between values 18 and 65

The program fails because the precondition was not valid.

postcondition.py
  

#!/usr/bin/python

def do_discount(price, discount):

    discounted_price = price - discount * price
    assert 0 &lt; discounted_price &lt; price, 'discounted price must be greater than zero and lower than original price'

    return discounted_price

price = 120
discount = 0.2

dis_price = do_discount(price, discount)
print(dis_price)

The second example has a postcondition about a discounted price. It has to be
greater than zero and lower than the original price.

## Python assertions in unit tests

Python has several popular unit test frameworks, including pytest,
unittest, and nose. While pytest and
nose use the assert statement, unittest
favours functions such as assertEqual and assertLess.

### Pytest example

The following example shows the usage of the pytest framework.

algo.py
  

def max(values):

  _max = values[0]

  for val in values:
      if val &gt; _max:
          _max = val

  return _max

def min(values):

  _min = values[0]

  for val in values:
      if val &lt; _min:
          _min = val

  return _min

We have two algorithms in a module.

min_max_test.py
  

#!/usr/bin/python

import algo

def test_min():
    values = (2, 3, 1, 4, 6)

    val = algo.min(values)
    assert val == 1

def test_max():
    values = (2, 3, 1, 4, 6)

    val = algo.max(values)
    assert val == 6

We pass test data to the tested algo functions.
We check the expected values with the assert statement.

$ pytest-3 min_max_test.py
============================================================= test session starts =============================================================
platform linux -- Python 3.7.6, pytest-4.6.9, py-1.8.1, pluggy-0.13.0
rootdir: /root/Documents/prog/python/assert
collected 2 items

min_max_test.py ..

We run the tests.

### Unittest example

Now we test the same module with unittest.

min_max_test.py
  

#!/usr/bin/python

import unittest
import algo

class SimpleTest(unittest.TestCase):

    def test_min(self):
        values = (2, 3, 1, 4, 6)

        val = algo.min(values)
        self.assertEqual(val, 1)

    def test_max(self):
        values = (2, 3, 1, 4, 6)

        val = algo.max(values)
        self.assertEqual(val, 6)

if __name__ == '__main__':
    unittest.main()

In the example, we use the assertEqual assertions.

$ ./min_max_test.py
..
----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK

We run the tests.

## Source

[Python assert statement - language reference](https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement)

In this article we have worked with Python assert statement and explained
assertions in general.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).