+++
title = "Python __reversed__ Method"
date = 2025-08-29T20:08:22.888+01:00
draft = false
description = "Complete guide to Python's __reversed__ method covering reverse iteration, custom sequences, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __reversed__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __reversed__ method, the
special method that enables reverse iteration over sequences. We'll cover basic
usage, custom sequence implementation, and practical examples.

## Basic Definitions

The __reversed__ method returns an iterator that yields items in
reverse order. It is called by the built-in reversed() function.

Key characteristics: it should return an iterator object, is optional for sequence
types, and provides more efficient reverse iteration than slicing for some types.
It enables custom reverse iteration behavior.

## Basic __reversed__ Implementation

Here's a simple implementation showing how __reversed__ works with
a custom sequence class. The method returns a reverse iterator.

basic_reversed.py
  

class MySequence:
    def __init__(self, data):
        self.data = data
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, index):
        return self.data[index]
    
    def __reversed__(self):
        return reversed(self.data)

seq = MySequence([1, 2, 3, 4, 5])
for item in reversed(seq):
    print(item)

This example shows a sequence class implementing __reversed__ by
delegating to the built-in reversed() function. The output would
print numbers from 5 down to 1.

The class also implements __len__ and __getitem__,
making it a proper sequence. __reversed__ enhances its capabilities.

## Custom Reverse Iterator

For more control, you can create a custom reverse iterator class instead of
using the built-in reversed().

custom_iterator.py
  

class ReverseIterator:
    def __init__(self, sequence):
        self.sequence = sequence
        self.index = len(sequence)
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index -= 1
        return self.sequence[self.index]

class MySequence:
    def __init__(self, data):
        self.data = data
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, index):
        return self.data[index]
    
    def __reversed__(self):
        return ReverseIterator(self)

seq = MySequence([10, 20, 30, 40])
for item in reversed(seq):
    print(item)

This implementation shows a dedicated ReverseIterator class that
handles the reverse iteration logic. It maintains an index that counts down.

The iterator implements both __iter__ and __next__,
making it a proper iterator. This approach offers maximum flexibility.

## Reversing a Linked List

__reversed__ is particularly useful for data structures where
reverse iteration isn't as simple as counting backwards through indices.

linked_list.py
  

class Node:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, value):
        if not self.head:
            self.head = Node(value)
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = Node(value)
    
    def __iter__(self):
        current = self.head
        while current:
            yield current.value
            current = current.next
    
    def __reversed__(self):
        values = list(self)
        return reversed(values)

lst = LinkedList()
lst.append(1)
lst.append(2)
lst.append(3)

for item in reversed(lst):
    print(item)

This linked list implementation shows how __reversed__ can work with
non-indexed sequences. It converts the list to a Python list first.

For large linked lists, a more efficient approach would be to implement a proper
reverse iterator that traverses the list without creating a temporary list.

## Reversing with Slice Syntax

For sequences that support slicing, __reversed__ can leverage this
for a concise implementation.

slice_reversed.py
  

class MyRange:
    def __init__(self, start, stop):
        self.start = start
        self.stop = stop
    
    def __len__(self):
        return max(0, self.stop - self.start)
    
    def __getitem__(self, index):
        if index &lt; 0:
            index += len(self)
        if 0 &lt;= index &lt; len(self):
            return self.start + index
        raise IndexError("Index out of range")
    
    def __reversed__(self):
        return self[::-1]

r = MyRange(1, 6)
for num in reversed(r):
    print(num)

This range-like class implements __reversed__ using Python's slice
syntax. The [::-1] slice creates a reverse view of the sequence.

The slice approach is concise but may not be the most efficient for very large
sequences, as it creates a new sequence object in memory.

## Reversing a Custom Collection

For more complex collections, __reversed__ can implement custom
reverse iteration logic that doesn't rely on indices.

custom_collection.py
  

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []
    
    def add_child(self, node):
        self.children.append(node)

class Tree:
    def __init__(self, root):
        self.root = root
    
    def __reversed__(self):
        def traverse(node):
            for child in reversed(node.children):
                yield from traverse(child)
            yield node.value
        return traverse(self.root)

root = TreeNode(1)
child1 = TreeNode(2)
child2 = TreeNode(3)
root.add_child(child1)
root.add_child(child2)
child1.add_child(TreeNode(4))
child1.add_child(TreeNode(5)))

tree = Tree(root)
for value in reversed(tree):
    print(value)

This tree structure implements reverse depth-first traversal using
__reversed__. It recursively yields children in reverse order.

The implementation uses a nested generator function to handle the recursive
traversal. This pattern is common for complex data structures.

## Best Practices

- **Return an iterator:** Ensure __reversed__ returns an iterator object

- **Maintain consistency:** Reversed order should match expectations

- **Consider efficiency:** Optimize for large sequences

- **Document behavior:** Clearly document the reversal order

- **Implement both directions:** Provide __iter__ and __reversed__

## Source References

- [Python __reversed__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__reversed__)

- [Python Sequence Types Docs](https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).