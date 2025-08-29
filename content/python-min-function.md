+++
title = "Python min Function"
date = 2025-08-29T20:08:56.675+01:00
draft = false
description = "Complete guide to Python's min function covering basic usage, key functions, custom objects, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python min Function

Last modified April 11, 2025

This comprehensive guide explores Python's min function, which
returns the smallest item in an iterable or among arguments. We'll cover basic
usage, key functions, custom objects, and practical examples.

## Basic Definitions

The min function returns the smallest item from an iterable or
among two or more arguments. It can work with any comparable objects.

Key characteristics: accepts iterable or multiple arguments, optional key
function for custom comparison, and default value for empty iterables.
Works with numbers, strings, and custom objects implementing comparison.

## Basic Numeric Usage

Here's simple usage with numbers showing how min finds the
smallest value in different scenarios.

basic_min.py
  

# With multiple arguments
print(min(10, 20, 5))    # 5

# With an iterable
numbers = [15, 8, 42, 4]
print(min(numbers))      # 4

# With mixed types (works if comparable)
print(min(3.14, 2, 5.5)) # 2

This example shows min with different numeric inputs. It works
with both separate arguments and iterables. The function returns the smallest
value found.

Note that mixed numeric types (int and float) work because Python can compare
them. However, comparing incompatible types raises TypeError.

## Using Key Functions

The min function accepts a key parameter for custom comparisons.
This example finds the shortest string and the dictionary item with lowest value.

key_min.py
  

words = ["apple", "banana", "cherry", "date"]
print(min(words, key=len))  # 'date'

students = [
    {"name": "Alice", "score": 85},
    {"name": "Bob", "score": 72},
    {"name": "Charlie", "score": 90}
]
print(min(students, key=lambda x: x["score"]))
# {'name': 'Bob', 'score': 72}

The first example finds the shortest string using len as key.
The second finds the student with lowest score using a lambda function.

Key functions transform items before comparison but return the original items.
This is powerful for complex comparisons without modifying data.

## Custom Objects with __lt__

You can make custom objects work with min by implementing the
__lt__ special method. This example creates a Product class.

custom_min.py
  

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __lt__(self, other):
        return self.price &lt; other.price
    
    def __repr__(self):
        return f"Product({self.name}, ${self.price})"

products = [
    Product("Laptop", 999),
    Product("Phone", 699),
    Product("Tablet", 399)
]

print(min(products))  # Product(Tablet, $399)

The Product class implements __lt__ to compare by price. When we
call min on a list of Products, Python uses this method.

This pattern is useful for objects where the natural ordering isn't obvious.
The key parameter offers an alternative without modifying the class.

## Handling Empty Iterables

The min function raises ValueError for empty
iterables. This example shows proper error handling with default values.

empty_min.py
  

empty_list = []

# Raises ValueError
try:
    print(min(empty_list))
except ValueError as e:
    print(f"Error: {e}")  # min() arg is an empty sequence

# With default value
print(min(empty_list, default="No items"))  # 'No items'
print(min([], default=None))               # None

These examples demonstrate min's behavior with empty sequences.
The default parameter provides a safe alternative to exception handling.

When working with potentially empty data, always consider using default or
explicit checks to avoid runtime errors.

## Performance Considerations

This example compares min performance with alternative methods
for finding minimum values.

performance.py
  

import timeit
import random

numbers = [random.randint(1, 1000) for _ in range(10000)]

def test_min():
    return min(numbers)

def test_sorted():
    return sorted(numbers)[0]

def test_manual():
    min_val = numbers[0]
    for num in numbers[1:]:
        if num &lt; min_val:
            min_val = num
    return min_val

print("min():", timeit.timeit(test_min, number=1000))
print("sorted()[0]:", timeit.timeit(test_sorted, number=1000))
print("Manual loop:", timeit.timeit(test_manual, number=1000))

This benchmarks different minimum-finding approaches. min is
optimized for this task and generally fastest. Sorting is much slower as it
processes all elements.

The manual loop is close to min but less readable. Built-in
functions are preferred for both performance and clarity.

## Best Practices

- **Use for readability:** Prefer min over manual loops

- **Implement __lt__:** For custom types needing natural ordering

- **Use key functions:** For complex comparisons without modifying data

- **Handle empty cases:** Use default parameter or explicit checks

- **Document behavior:** Clearly document comparison logic

## Source References

- [Python min() Documentation](https://docs.python.org/3/library/functions.html#min)

- [Python __lt__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__lt__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).