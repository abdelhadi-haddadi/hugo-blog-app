+++
title = "Python __index__ Method"
date = 2025-08-29T20:08:13.890+01:00
draft = false
description = "Complete guide to Python's __index__ method covering integer conversion, indexing operations, and sequence protocols."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __index__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __index__ method, the
special method used for integer conversion in indexing operations. We'll cover
basic usage, sequence protocols, custom number types, and practical examples.

## Basic Definitions

The __index__ method is a special method that returns an integer
representation of an object. It's used when an object needs to be converted to
an integer for indexing operations.

Key characteristics: it must return an integer, is called by operator.index(),
and is used in slicing and indexing operations. It provides lossless integer
conversion unlike __int__.

## Basic __index__ Implementation

Here's a simple implementation showing how __index__ enables objects
to be used as indices in sequences like lists or tuples.

basic_index.py
  

class MyIndex:
    def __init__(self, value):
        self.value = value
    
    def __index__(self):
        return self.value

idx = MyIndex(3)
my_list = [10, 20, 30, 40, 50]
print(my_list[idx])  # Output: 40

This example shows how an object with __index__ can be used directly
as a list index. The method returns the stored integer value when needed for
indexing.

The __index__ method is called implicitly when the object is used
in an indexing context, converting it to a suitable integer index.

## Using __index__ with Slicing

__index__ is also used in slice operations, allowing custom objects
to be used as slice indices.

slicing.py
  

class SliceIndex:
    def __init__(self, value):
        self.value = value
    
    def __index__(self):
        return self.value

start = SliceIndex(1)
stop = SliceIndex(4)
my_list = [0, 10, 20, 30, 40, 50]
print(my_list[start:stop])  # Output: [10, 20, 30]

This demonstrates how objects with __index__ can be used in slice
notation. Both start and stop positions are converted to integers automatically.

The slice operation calls __index__ on both slice bounds before
performing the slice, enabling custom index types in slicing.

## Difference Between __index__ and __int__

While similar, __index__ and __int__ serve different
purposes. __index__ is specifically for lossless integer conversion.

index_vs_int.py
  

class Number:
    def __init__(self, value):
        self.value = value
    
    def __index__(self):
        print("__index__ called")
        return self.value
    
    def __int__(self):
        print("__int__ called")
        return self.value + 0.5  # Not a pure integer

num = Number(5)
print(operator.index(num))  # Uses __index__
print(int(num))            # Uses __int__

This shows the different behavior between the two methods. __index__
must return an exact integer, while __int__ can perform conversions.

__index__ is preferred in indexing contexts as it guarantees proper
integer values, while __int__ is for general number conversion.

## Custom Number Types with __index__

__index__ allows custom number types to integrate with Python's
indexing system, making them behave like built-in integers in sequences.

custom_number.py
  

class BinaryNumber:
    def __init__(self, binary_str):
        self.binary = binary_str
    
    def __index__(self):
        return int(self.binary, 2)

binary = BinaryNumber('1101')  # 13 in decimal
my_list = [i*10 for i in range(20)]
print(my_list[binary])  # Output: 130
print(operator.index(binary))  # Output: 13

This binary number class converts its value to an integer when used as an index.
The __index__ method handles the binary-to-decimal conversion.

This pattern is useful for custom numeric types that need to work with Python's
sequence protocols while maintaining their own internal representation.

## Using __index__ with NumPy Arrays

NumPy arrays and other scientific Python libraries use __index__ for
array indexing, allowing custom index types to work with these libraries.

numpy_index.py
  

import numpy as np

class ArrayIndex:
    def __init__(self, value):
        self.value = value
    
    def __index__(self):
        return self.value * 2  # Custom index transformation

arr = np.arange(0, 100, 10)  # [0, 10, 20, ..., 90]
idx = ArrayIndex(3)
print(arr[idx])  # Output: 60 (uses value 6 as index)

This example shows how a custom index type can be used with NumPy arrays. The
__index__ method transforms the index value before array access.

NumPy calls __index__ when processing array indices, enabling
custom index transformations while maintaining array access performance.

## Best Practices

- **Return integers only:** __index__ must return an integer

- **Keep it lossless:** Conversion should preserve all information

- **Prefer over __int__ for indexing:** Use __index__ in sequence contexts

- **Implement for custom sequences:** If your class needs integer conversion

- **Consider performance:** __index__ should be fast for indexing

## Source References

- [Python __index__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__index__)

- [operator.index() Documentation](https://docs.python.org/3/library/operator.html#operator.index)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).