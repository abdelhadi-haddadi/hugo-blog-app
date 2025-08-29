+++
title = "Python len Function"
date = 2025-08-29T20:08:47.609+01:00
draft = false
description = "Complete guide to Python's len function covering strings, lists, dictionaries, custom objects, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python len Function

Last modified April 11, 2025

This comprehensive guide explores Python's len function, which
returns the number of items in a container. We'll cover built-in types, custom
objects, and practical examples of counting elements in various data structures.

## Basic Definitions

The len function returns the length (number of items) of an object.
It works with sequences (strings, lists, tuples) and collections (dictionaries,
sets). The argument must be a sequence or collection.

Key characteristics: returns integer count of items, raises TypeError for
non-sequence types, and calls __len__ method for custom objects.
It's a fundamental operation for container types.

## Basic Sequence Usage

Here's simple usage with different sequence types showing how len
counts elements in strings, lists, and tuples.

basic_len.py
  

# With strings
print(len("hello"))    # 5 (characters)
print(len(""))         # 0 (empty string)

# With lists
print(len([1, 2, 3])) # 3 (elements)
print(len([]))         # 0 (empty list)

# With tuples
print(len((1, 2)))     # 2 (elements)
print(len(()))         # 0 (empty tuple)

This example shows len with different sequence types. For strings,
it counts characters. For lists and tuples, it counts elements. Empty sequences
return 0.

The function provides a consistent way to get size information across different
sequence types, making code more generic and reusable.

## Dictionary and Set Usage

len also works with mapping and set types. This example demonstrates
usage with dictionaries and sets.

dict_set_len.py
  

# With dictionaries
print(len({"a": 1, "b": 2}))  # 2 (key-value pairs)
print(len({}))                 # 0 (empty dict)

# With sets
print(len({1, 2, 3}))         # 3 (elements)
print(len(set()))             # 0 (empty set)

# With frozen sets
print(len(frozenset([1, 2]))) # 2 (elements)

For dictionaries, len counts key-value pairs. For sets, it counts
unique elements. Frozen sets behave like regular sets for length calculation.

This demonstrates len's versatility across different collection
types in Python's standard library.

## Custom Objects with __len__

You can make custom objects work with len by implementing the
__len__ special method. This example creates a custom container.

custom_len.py
  

class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item):
        self.items.append(item)
    
    def __len__(self):
        return len(self.items)
    
    def __repr__(self):
        return f"ShoppingCart({self.items})"

cart = ShoppingCart()
cart.add_item("Apple")
cart.add_item("Banana")
print(len(cart))  # 2

The ShoppingCart class implements __len__ to return its item count.
When we call len on a ShoppingCart instance, Python uses this method.

This pattern is common for custom container classes where the concept of size or
length applies (collections, buffers, etc.).

## Error Handling

The len function raises TypeError when used with
non-sequence types. This example shows proper error handling.

errors.py
  

try:
    print(len(42))
except TypeError as e:
    print(f"Error: {e}")  # object of type 'int' has no len()

class NoLen:
    pass

try:
    print(len(NoLen()))
except TypeError as e:
    print(f"Error: {e}")  # object of type 'NoLen' has no len()

These examples demonstrate len's behavior with unsupported types.
Numbers and objects without __len__ raise TypeError.

To make a class work with len, implement __len__
as shown in the previous example.

## Performance Considerations

This example compares len performance with alternative methods
for getting container sizes.

performance.py
  

import timeit

def test_len():
    return len([1, 2, 3, 4, 5])

def test_count():
    return [1, 2, 3, 4, 5].count(None)

def test_loop():
    count = 0
    for _ in [1, 2, 3, 4, 5]:
        count += 1
    return count

print("len():", timeit.timeit(test_len, number=1000000))
print("count():", timeit.timeit(test_count, number=1000000))
print("Loop:", timeit.timeit(test_loop, number=1000000))

This benchmarks different size-checking methods. len is optimized
and fastest for built-in types. Counting or looping is slower and unnecessary.

The results demonstrate why len is preferred for getting container
sizes in Python.

## Best Practices

- **Use for readability:** Prefer len over manual counting

- **Implement __len__:** For custom container types

- **Check emptiness:** Use if not container rather than len(container) == 0

- **Handle errors:** Catch TypeError when input type is uncertain

- **Document behavior:** Clearly document __len__ implementation

## Source References

- [Python len() Documentation](https://docs.python.org/3/library/functions.html#len)

- [Python __len__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__len__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).