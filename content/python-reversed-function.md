+++
title = "Python reversed Function"
date = 2025-08-29T20:10:17.548+01:00
draft = false
description = "Complete guide to Python's reversed function covering sequences, custom objects, and practical examples of reverse iteration."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python reversed Function

Last modified April 11, 2025

This comprehensive guide explores Python's reversed function, which
returns a reverse iterator for sequences. We'll cover built-in sequences, custom
objects, and practical examples of reverse iteration.

## Basic Definitions

The reversed function returns a reverse iterator object that
accesses elements in reverse order. It works with any object that implements
__reversed__ or supports sequence protocol (__len__
and __getitem__).

Key characteristics: returns an iterator (not a list), preserves original
sequence, works with strings, lists, tuples, and custom sequences. It's
memory efficient as it doesn't create a new sequence.

## Basic Sequence Usage

Here's simple usage with different sequence types showing how reversed
handles lists, tuples, and strings.

basic_reversed.py
  

# With lists
numbers = [1, 2, 3, 4, 5]
print(list(reversed(numbers)))  # [5, 4, 3, 2, 1]

# With tuples
colors = ('red', 'green', 'blue')
print(tuple(reversed(colors))) # ('blue', 'green', 'red')

# With strings
text = "hello"
print(''.join(reversed(text))) # "olleh"

This example shows reversed with different sequence types. Note
that we convert the iterator to a concrete type (list, tuple, string) for
display. The original sequences remain unchanged.

For strings, we use join to combine the reversed characters
back into a string. The reversed function works with any
sequence that supports indexing.

## Custom Objects with __reversed__

You can make custom objects work with reversed by implementing
the __reversed__ special method. This example creates a CountDown
class.

custom_reversed.py
  

class CountDown:
    def __init__(self, start):
        self.start = start
    
    def __reversed__(self):
        n = 1
        while n &lt;= self.start:
            yield n
            n += 1
    
    def __iter__(self):
        n = self.start
        while n &gt; 0:
            yield n
            n -= 1

print("Normal iteration:")
for x in CountDown(5):
    print(x)  # 5, 4, 3, 2, 1

print("Reversed iteration:")
for x in reversed(CountDown(5)):
    print(x)  # 1, 2, 3, 4, 5

The CountDown class implements both __iter__ and __reversed__.
Normal iteration counts down, while reversed iteration counts up.

This demonstrates how to customize reverse iteration behavior for your objects.
The __reversed__ method should return an iterator.

## Range Objects

The reversed function works efficiently with range objects,
creating a reverse iterator without generating all numbers in memory.

range_reversed.py
  

# Forward range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Reversed range
for i in reversed(range(5)):
    print(i)  # 4, 3, 2, 1, 0

# Large range (memory efficient)
large_range = reversed(range(1, 1000001))
print(next(large_range))  # 1000000
print(next(large_range))  # 999999

This example shows how reversed works with range objects. The
reverse iteration is memory efficient, especially with large ranges.

The range object implements __reversed__ specially to provide
this efficient reverse iteration without storing all numbers.

## Error Handling

The reversed function raises TypeError when used with
non-sequence types. This example shows proper error handling.

errors.py
  

try:
    print(list(reversed(42)))
except TypeError as e:
    print(f"Error: {e}")  # 'int' object is not reversible

class NoReverse:
    pass

try:
    print(list(reversed(NoReverse())))
except TypeError as e:
    print(f"Error: {e}")  # 'NoReverse' object is not reversible

These examples demonstrate reversed's behavior with unsupported
types. Non-sequence objects and objects without __reversed__ or
sequence protocol raise TypeError.

To make a class work with reversed, implement either
__reversed__ or the sequence protocol as shown earlier.

## Performance Considerations

This example compares reversed performance with alternative
methods for reverse iteration.

performance.py
  

import timeit

def test_reversed():
    return list(reversed([1, 2, 3, 4, 5]))

def test_slice():
    return [1, 2, 3, 4, 5][::-1]

def test_manual():
    lst = [1, 2, 3, 4, 5]
    return [lst[i] for i in range(len(lst)-1, -1, -1)]

print("reversed():", timeit.timeit(test_reversed, number=1000000))
print("slice:", timeit.timeit(test_slice, number=1000000))
print("manual:", timeit.timeit(test_manual, number=1000000))

This benchmarks different reverse iteration methods. reversed is
generally fastest for iteration. Slicing creates a new list but is fast for
small sequences.

The manual approach is slower and less readable, demonstrating why
reversed is preferred for iteration scenarios.

## Best Practices

- **Use for iteration:** Prefer reversed over slicing when you only need to iterate

- **Implement __reversed__:** For custom sequence types that support reverse iteration

- **Consider slicing:** When you need a reversed copy of the sequence

- **Handle errors:** Catch TypeError when input type is uncertain

- **Document behavior:** Clearly document __reversed__ implementation

## Source References

- [Python reversed() Documentation](https://docs.python.org/3/library/functions.html#reversed)

- [Python __reversed__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__reversed__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).