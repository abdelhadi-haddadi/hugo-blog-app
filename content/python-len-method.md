+++
title = "Python __len__ Method"
date = 2025-08-29T20:08:17.244+01:00
draft = false
description = "Complete guide to Python's __len__ method covering sequence protocol, custom containers, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __len__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __len__ method, the
special method that enables objects to define their length. We'll cover basic
usage, sequence protocol, custom containers, and practical examples.

## Basic Definitions

The __len__ method returns the length (number of items) of an
object. It's called by the built-in len() function and should
return a non-negative integer.

Key characteristics: it must be implemented for sequence and mapping types,
should be efficient (O(1) complexity), and return an integer ≥ 0. The method
enables objects to work with Python's built-in functions and operators.

## Basic __len__ Implementation

Here's a simple class implementing __len__ to demonstrate its
basic usage. The method allows instances to work with the len()
function.

basic_len.py
  

class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item):
        self.items.append(item)
    
    def __len__(self):
        return len(self.items)

cart = ShoppingCart()
cart.add_item("Apple")
cart.add_item("Banana")
print(len(cart))  # Output: 2

This example shows a shopping cart class that tracks items. The __len__
method delegates to the length of the internal items list. When len()
is called on a cart instance, Python invokes __len__.

The implementation should be fast since len() is often used in
performance-critical code. Python expects __len__ to return quickly.

## Implementing a Fixed-Size Container

__len__ can return a fixed value for containers with predetermined
size. This example shows a fixed-size queue that always reports the same length.

fixed_size.py
  

class FixedQueue:
    def __init__(self, size):
        self.size = size
        self._items = [None] * size
        self._pointer = 0
    
    def enqueue(self, item):
        self._items[self._pointer] = item
        self._pointer = (self._pointer + 1) % self.size
    
    def __len__(self):
        return self.size

queue = FixedQueue(5)
queue.enqueue("A")
queue.enqueue("B")
print(len(queue))  # Always returns 5

This fixed-size queue maintains a constant capacity. The __len__
method returns the predetermined size rather than the current item count.

This pattern is useful when the logical size differs from physical storage size.
The method reflects the container's design rather than its current state.

## Custom Collection with Lazy Evaluation

For collections with expensive length calculations, __len__ can
implement caching or lazy evaluation to optimize performance.

lazy_length.py
  

class LargeDataset:
    def __init__(self, data_source):
        self.data_source = data_source
        self._length = None
    
    def __len__(self):
        if self._length is None:
            print("Calculating length...")
            self._length = sum(1 for _ in self.data_source)
        return self._length

data = LargeDataset(open('large_file.txt'))
print(len(data))  # Calculates on first call
print(len(data))  # Uses cached value

This class represents a large dataset where calculating the length is expensive.
The __len__ method caches the result after the first computation.

The lazy evaluation pattern is valuable for resources like files or database
queries where length determination requires significant computation or I/O.

## Implementing a Bitmask

For non-traditional collections, __len__ can return logical rather
than physical size. This example shows a bitmask class reporting active bits.

bitmask.py
  

class Bitmask:
    def __init__(self, size):
        self.size = size
        self.mask = 0
    
    def set_bit(self, position):
        self.mask |= (1 &lt;&lt; position)
    
    def __len__(self):
        return bin(self.mask).count('1')

mask = Bitmask(8)
mask.set_bit(2)
mask.set_bit(5)
print(len(mask))  # Returns 2 (bits set)

This bitmask class counts set bits as its length. The __len__
method converts the mask to binary and counts '1' characters.

This demonstrates how __len__ can represent logical size in domain-
specific ways. The method provides a consistent interface regardless of internal
representation.

## Tree Structure with Recursive Length

For recursive data structures, __len__ can implement recursive
counting. This example shows a tree node class that counts all descendants.

tree_length.py
  

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []
    
    def add_child(self, node):
        self.children.append(node)
    
    def __len__(self):
        return 1 + sum(len(child) for child in self.children)

root = TreeNode("Root")
child1 = TreeNode("Child1")
child2 = TreeNode("Child2")
grandchild = TreeNode("Grandchild")
child1.add_child(grandchild)
root.add_child(child1)
root.add_child(child2)
print(len(root))  # Returns 4 (root + 2 children + 1 grandchild)

This tree implementation counts all nodes in the hierarchy. Each node contributes
1 plus the length of its children. The recursion handles arbitrary depth.

For very deep structures, consider iterative implementations to avoid stack
overflow. The method provides intuitive size reporting for nested data.

## Best Practices

- **Return integers only:** The method must return an integer ≥ 0

- **Ensure O(1) complexity:** len() should be fast

- **Be consistent:** Length should match iteration behavior

- **Document behavior:** Clarify what length represents

- **Consider __bool__:** Empty containers should be falsy

## Source References

- [Python __len__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__len__)

- [Collections.abc.Sized](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sized)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).