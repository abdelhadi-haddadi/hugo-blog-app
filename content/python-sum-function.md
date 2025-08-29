+++
title = "Python sum Function"
date = 2025-08-29T20:10:52.370+01:00
draft = false
description = "Complete guide to Python's sum function covering iterables, start values, and practical examples of summation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sum Function

Last modified April 11, 2025

This comprehensive guide explores Python's sum function, which
returns the total of all items in an iterable. We'll cover numeric types,
start values, and practical examples of summation operations.

## Basic Definitions

The sum function adds all items in an iterable from left to right
and returns the total. It takes an optional start parameter which
defaults to 0.

Key characteristics: works with any iterable containing addable items (numbers,
lists, tuples). The start value determines the initial value for
the summation.

## Basic Numeric Summation

Here's simple usage with different numeric types showing how sum
handles lists of integers, floats, and mixed numbers.

basic_sum.py
  

# Summing integers
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))  # 15

# Summing floats
prices = [9.99, 14.95, 4.50]
print(sum(prices))   # 29.44

# Mixed numeric types
mixed = [10, 3.5, 2.5, 4]
print(sum(mixed))    # 20.0

This example shows sum with different numeric iterables. It
handles integers, floats, and mixed types automatically converting the result.

The mixed type example returns 20.0 (float) because Python promotes the result
to the most precise numeric type in the sequence.

## Using the Start Parameter

The optional start parameter allows setting an initial value for
the summation. This is useful for accumulators or when summing non-zero based
sequences.

start_param.py
  

# Basic start value
numbers = [1, 2, 3]
print(sum(numbers, 10))  # 16 (10 + 1 + 2 + 3)

# Concatenating lists
lists = [[1, 2], [3, 4], [5, 6]]
print(sum(lists, []))    # [1, 2, 3, 4, 5, 6]

# Building strings
words = ["Hello", " ", "World"]
print(sum(words, ""))    # "Hello World"

The first example shows numeric summation with a start value. The other examples
demonstrate creative uses of start for list concatenation and
string building.

Note that while these techniques work, specialized methods like
''.join() for strings are often more readable and efficient.

## Summing Custom Objects

You can sum custom objects by implementing the __add__ method.
This example creates a Money class that can be summed.

custom_sum.py
  

class Money:
    def __init__(self, amount):
        self.amount = amount
    
    def __add__(self, other):
        return Money(self.amount + other.amount)
    
    def __radd__(self, other):
        return self.__add__(other)
    
    def __repr__(self):
        return f"Money({self.amount})"

transactions = [Money(100), Money(50), Money(25)]
total = sum(transactions, Money(0))
print(total)  # Money(175)

The Money class implements __add__ and __radd__ to
support summation. We provide Money(0) as the start value for proper
initialization.

This pattern is useful for financial applications or any domain where you need
to sum custom numeric-like objects.

## Error Handling

The sum function raises TypeError when used with
non-addable types. This example shows proper error handling.

errors.py
  

try:
    print(sum(["a", "b", "c"]))
except TypeError as e:
    print(f"Error: {e}")  # unsupported operand type(s) for +: 'int' and 'str'

class NoAdd:
    pass

try:
    print(sum([NoAdd(), NoAdd()]))
except TypeError as e:
    print(f"Error: {e}")  # unsupported operand type(s) for +: 'int' and 'NoAdd'

These examples demonstrate sum's behavior with unsupported types.
Strings and objects without __add__ raise TypeError.

To make a class work with sum, implement __add__
as shown in the previous example.

## Performance Considerations

This example compares sum performance with alternative methods
for summing numbers.

performance.py
  

import timeit
import numpy as np

def test_sum():
    return sum(range(1000))

def test_for_loop():
    total = 0
    for i in range(1000):
        total += i
    return total

def test_numpy():
    return np.sum(np.arange(1000))

print("sum():", timeit.timeit(test_sum, number=10000))
print("for loop:", timeit.timeit(test_for_loop, number=10000))
print("numpy:", timeit.timeit(test_numpy, number=10000))

This benchmarks different summation methods. sum is generally
fastest for built-in types. For very large datasets, NumPy can be faster.

The for loop approach is typically slower, demonstrating why sum
is preferred for most cases.

## Best Practices

- **Use for readability:** Prefer sum over manual loops

- **Set proper start:** Always specify start value for non-numeric types

- **Consider alternatives:** Use ''.join() for strings, numpy for large datasets

- **Handle errors:** Catch TypeError when input types are uncertain

- **Document behavior:** Clearly document __add__ implementation

## Source References

- [Python sum() Documentation](https://docs.python.org/3/library/functions.html#sum)

- [Python __add__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__add__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).