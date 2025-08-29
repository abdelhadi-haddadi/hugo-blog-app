+++
title = "Python next Function"
date = 2025-08-29T20:08:58.965+01:00
draft = false
description = "Complete guide to Python's next function covering iterators, generators, and practical examples of manual iteration."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python next Function

Last modified April 11, 2025

This comprehensive guide explores Python's next function, which
retrieves the next item from an iterator. We'll cover basic usage, iteration
protocol, generators, and practical examples of manual iteration control.

## Basic Definitions

The next function retrieves the next item from an iterator by
calling its __next__ method. It's fundamental to Python's
iteration protocol and works with all iterable objects.

Key characteristics: raises StopIteration when exhausted, accepts
a default value to return instead, and is used implicitly in for loops. It
advances the iterator state with each call.

## Basic Iterator Usage

Here's simple usage with different iterable types showing how next
retrieves items one at a time from various iterators.

basic_next.py
  

# With list iterator
numbers = [1, 2, 3]
iter_numbers = iter(numbers)
print(next(iter_numbers))  # 1
print(next(iter_numbers))  # 2
print(next(iter_numbers))  # 3

# With string iterator
text = "abc"
iter_text = iter(text)
print(next(iter_text))     # 'a'

This example shows next with different iterators. Each call
retrieves the next item in sequence. The iterator remembers its position.

Note that we first create an iterator object using iter() before
using next. This is required for all built-in iterables.

## Default Value Handling

next can accept a default value to return instead of raising
StopIteration. This example demonstrates graceful handling.

default_next.py
  

colors = ['red', 'green', 'blue']
iter_colors = iter(colors)

print(next(iter_colors, 'end'))  # 'red'
print(next(iter_colors, 'end'))  # 'green'
print(next(iter_colors, 'end'))  # 'blue'
print(next(iter_colors, 'end'))  # 'end' (default returned)
print(next(iter_colors, 'end'))  # 'end' (default returned)

The second parameter to next specifies a default value when the
iterator is exhausted. This prevents StopIteration exceptions.

This pattern is useful when you need to handle the end of iteration without
try/except blocks, especially in loops or generator expressions.

## Generator Functions

Generators are a common use case for next. This example shows
manual iteration control over a generator function.

generator_next.py
  

def count_up_to(max):
    count = 1
    while count &lt;= max:
        yield count
        count += 1

counter = count_up_to(3)
print(next(counter))  # 1
print(next(counter))  # 2
print(next(counter))  # 3
print(next(counter, "Done"))  # "Done"

The generator function count_up_to yields values until reaching
its maximum. Each next call resumes execution until the next
yield.

Generators maintain their local state between calls, making them memory
efficient for large or infinite sequences.

## Custom Iterator Class

You can create custom iterators by implementing the iterator protocol. This
example shows a class with __next__ method.

custom_next.py
  

class SquareNumbers:
    def __init__(self, max):
        self.max = max
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current &gt;= self.max:
            raise StopIteration
        self.current += 1
        return self.current ** 2

squares = SquareNumbers(3)
print(next(squares))  # 1
print(next(squares))  # 4
print(next(squares))  # 9
print(next(squares, "No more squares"))  # "No more squares"

The SquareNumbers class implements both __iter__ and
__next__, making it a proper iterator. Each call to next
invokes __next__.

This pattern gives full control over iteration behavior and is useful for
creating custom sequence-like objects.

## Error Handling

This example demonstrates proper error handling when using next
with iterators that might be exhausted.

error_handling.py
  

data = ['a', 'b']
iter_data = iter(data)

try:
    print(next(iter_data))  # 'a'
    print(next(iter_data))  # 'b'
    print(next(iter_data))  # Raises StopIteration
except StopIteration:
    print("Reached end of iteration")

# Alternative with default value
iter_data = iter(data)
print(next(iter_data, None))  # 'a'
print(next(iter_data, None))  # 'b'
print(next(iter_data, None))  # None

The first approach uses try/except to catch StopIteration, which
is raised when the iterator has no more items. The second uses a default value.

Choose between these approaches based on whether reaching the end is an
expected case (use default) or exceptional condition (use try/except).

## Best Practices

- **Prefer for loops:** Use next only when manual control is needed

- **Use default values:** When iterator exhaustion is expected

- **Document behavior:** Clearly document custom iterator protocols

- **Consider itertools:** For advanced iteration patterns

- **Reset carefully:** Remember iterators are single-use

## Source References

- [Python next() Documentation](https://docs.python.org/3/library/functions.html#next)

- [Python Iterator Types](https://docs.python.org/3/library/stdtypes.html#iterator-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).