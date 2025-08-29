+++
title = "Python filter Function"
date = 2025-08-29T20:08:29.532+01:00
draft = false
description = "Complete guide to Python's filter function covering basic usage, lambda functions, custom predicates, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python filter Function

Last modified April 11, 2025

This comprehensive guide explores Python's filter function, which
filters elements from an iterable based on a predicate function. We'll cover
basic usage, lambda functions, custom predicates, and practical examples.

## Basic Definitions

The filter function constructs an iterator from elements of an
iterable for which a function returns true. It's a built-in function that
supports functional programming patterns in Python.

Key characteristics: takes a function and iterable as arguments, returns a
filter object (iterator), and only includes elements where the function
returns a truthy value. If function is None, it filters out falsy values.

## Basic Filter Usage

Here's simple usage with different numeric types showing how filter
works with a basic predicate function.

basic_filter.py
  

def is_even(n):
    return n % 2 == 0

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = filter(is_even, numbers)

print(list(filtered))  # [2, 4, 6, 8, 10]

This example shows filter with a simple predicate function that
checks for even numbers. The filter object is converted to a list for display.

The is_even function returns True for even numbers, so only even
numbers from the original list are included in the result.

## Filter with Lambda Functions

Lambda functions are commonly used with filter for concise
one-off predicates. This example filters strings longer than 5 characters.

lambda_filter.py
  

words = ["apple", "banana", "cherry", "date", "elderberry"]
long_words = filter(lambda x: len(x) &gt; 5, words)

print(list(long_words))  # ['banana', 'cherry', 'elderberry']

The lambda function checks each word's length. Only words longer than 5
characters pass through the filter. This demonstrates inline predicate usage.

Lambdas are ideal for simple conditions where defining a separate function
would be unnecessary. The syntax is compact and readable for basic filters.

## Filtering None Values

When None is passed as the function argument, filter removes all
falsy values from the iterable. This example shows this behavior.

none_filter.py
  

mixed_values = [0, 1, False, True, "", "hello", None, [], [1,2,3]]
truthy_values = filter(None, mixed_values)

print(list(truthy_values))  # [1, True, 'hello', [1, 2, 3]]

With None as the function, filter removes all falsy values:
0, False, empty strings, None, and empty lists. Only truthy values remain.

This is a concise way to clean data by removing empty or invalid entries
without writing explicit condition checks.

## Custom Object Filtering

You can filter custom objects by defining appropriate predicate functions.
This example filters products by price and category.

object_filter.py
  

class Product:
    def __init__(self, name, price, category):
        self.name = name
        self.price = price
        self.category = category
    
    def __repr__(self):
        return f"{self.name} (${self.price})"

products = [
    Product("Laptop", 999, "Electronics"),
    Product("Shirt", 29, "Clothing"),
    Product("Phone", 699, "Electronics"),
    Product("Pants", 49, "Clothing"),
    Product("Tablet", 299, "Electronics")
]

affordable_electronics = filter(
    lambda p: p.price &lt; 500 and p.category == "Electronics",
    products
)

print(list(affordable_electronics))  # [Tablet ($299)]

The lambda function checks both price and category attributes. Only products
matching both conditions are included in the filtered result.

This demonstrates how filter can work with complex conditions
on custom objects, making it useful for data processing applications.

## Chaining Filter Operations

Filter operations can be chained for more complex filtering logic. This example
shows multiple filters applied sequentially.

chained_filter.py
  

numbers = range(1, 101)

# Filter multiples of 3
multiples_of_3 = filter(lambda x: x % 3 == 0, numbers)

# From those, filter numbers ending with 0
result = filter(lambda x: str(x).endswith('0'), multiples_of_3)

print(list(result))  # [30, 60, 90]

The first filter selects multiples of 3 from 1 to 100. The second filter
then selects numbers from this result that end with 0. Only numbers meeting
both criteria are included.

Chaining filters can make complex filtering logic more readable by breaking
it into simple steps. Each filter focuses on one specific condition.

## Best Practices

- **Use for clarity:** Prefer filter when the intent is clearly to select elements

- **Combine with map:** Often used together with map for data pipelines

- **Consider comprehensions:** List comprehensions may be more readable for simple cases

- **Document predicates:** Clearly document complex filter conditions

- **Handle memory:** Be mindful that filter returns an iterator, not a list

## Source References

- [Python filter() Documentation](https://docs.python.org/3/library/functions.html#filter)

- [Python Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html#iterators)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).