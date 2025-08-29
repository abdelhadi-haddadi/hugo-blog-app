+++
title = "Python all Function"
date = 2025-08-29T20:07:36.544+01:00
draft = false
description = "Complete guide to Python's all function covering truthiness checks, iteration, and practical examples of boolean evaluation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python all Function

Last modified April 11, 2025

This comprehensive guide explores Python's all function, which
checks if all elements in an iterable are truthy. We'll cover basic usage,
empty iterables, practical examples, and performance considerations.

## Basic Definitions

The all function returns True if all elements in the
iterable are true (or if the iterable is empty). It's equivalent to a series
of and operations between all elements.

Key characteristics: works with any iterable, uses Python's truthiness rules,
short-circuits on first False, and returns True for
empty iterables.

## Basic Usage with Lists

Here's simple usage with different lists showing how all evaluates
truthiness of elements according to Python's rules.

basic_all.py
  

# All elements are true
print(all([True, 1, "hello"]))  # True

# One false element
print(all([True, 0, "hello"]))  # False

# Empty list
print(all([]))                  # True

# Mixed types
print(all([1, "a", [1], {1}]))  # True
print(all([1, "", [1], {1}]))    # False

This example shows all with different list configurations. Note
how it handles empty lists (returns True) and various truthy/falsy
values.

The function follows Python's truthiness rules: 0, empty strings, empty
containers are False, while other values are True.

## Data Validation

all is commonly used for data validation. This example checks if
all numbers in a list meet certain criteria.

validation.py
  

numbers = [10, 20, 30, 40, 50]

# Check if all numbers are positive
print(all(n &gt; 0 for n in numbers))  # True

# Check if all numbers are even
print(all(n % 2 == 0 for n in numbers))  # True

# Add an odd number
numbers.append(51)
print(all(n % 2 == 0 for n in numbers))  # False

This demonstrates using all with generator expressions for
efficient validation. The generator is memory efficient as it evaluates
lazily.

Note how all short-circuits - it stops checking at the first
False value it encounters, making it efficient for validation.

## Working with Dictionaries

all can check dictionary keys, values, or items. This example
shows different ways to use it with dictionaries.

dict_all.py
  

user = {
    'name': 'Alice',
    'age': 30,
    'active': True,
    'email': 'alice@example.com'
}

# Check all keys are non-empty strings
print(all(isinstance(k, str) and k for k in user.keys()))  # True

# Check all values are truthy
print(all(user.values()))  # True

# Check specific condition on values
print(all(v &gt; 0 if isinstance(v, int) else True for v in user.values()))  # True

# Add a false value
user['active'] = False
print(all(user.values()))  # False

When used with dictionaries, all checks the iterable view you
provide (keys, values, or items). The examples show different validation
patterns.

The generator expression in the third example demonstrates conditional checks
that only apply to certain types of values.

## Combining with map()

all pairs well with map() for applying a function
to all elements before checking their truthiness.

map_all.py
  

strings = ["hello", "world", "python"]

# Check all strings start with lowercase
print(all(map(lambda s: s[0].islower(), strings)))  # True

# Check all strings are longer than 3 characters
print(all(map(lambda s: len(s) &gt; 3, strings)))      # True

# Add a short string
strings.append("hi")
print(all(map(lambda s: len(s) &gt; 3, strings)))      # False

# With a custom function
def is_valid_email(email):
    return '@' in email and '.' in email.split('@')[-1]

emails = ["user@example.com", "admin@domain.org"]
print(all(map(is_valid_email, emails)))  # True

This shows how map can transform elements before all
checks them. The combination is memory efficient as both work with iterators.

The last example demonstrates using a named function for more complex
validation logic while maintaining readability.

## Performance Considerations

This example compares all performance with alternative methods
for checking conditions across iterables.

performance.py
  

import timeit

data = [True] * 1000 + [False]

def test_all():
    return all(data)

def test_for_loop():
    for item in data:
        if not item:
            return False
    return True

def test_list_comprehension():
    return len([x for x in data if not x]) == 0

print("all():", timeit.timeit(test_all, number=10000))
print("for loop:", timeit.timeit(test_for_loop, number=10000))
print("list comprehension:", timeit.timeit(test_list_comprehension, number=10000))

all is generally the fastest approach as it's implemented in C
and short-circuits at the first False value.

The list comprehension is least efficient as it builds the entire list before
checking, even if the first element is False.

## Best Practices

- **Use for readability:** Prefer all over manual loops for clarity

- **Leverage short-circuiting:** Place most likely-to-fail checks first

- **Combine with generators:** For memory efficiency with large datasets

- **Document expectations:** Clearly state what "all" means in your context

- **Consider any() counterpart:** Use when you need "at least one" rather than "all"

## Source References

- [Python all() Documentation](https://docs.python.org/3/library/functions.html#all)

- [Python Truth Value Testing](https://docs.python.org/3/library/stdtypes.html#truth-value-testing)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).