+++
title = "Python memoryview Function"
date = 2025-08-29T20:08:54.467+01:00
draft = false
description = "Complete guide to Python's memoryview function covering buffer protocol, memory efficiency, and practical examples with binary data."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python memoryview Function

Last modified April 11, 2025

This comprehensive guide explores Python's memoryview function, which
provides a memory-efficient way to access the buffer protocol of objects. We'll
cover binary data handling, memory efficiency, and practical examples.

## Basic Definitions

The memoryview function returns a memory view object that exposes
the buffer protocol of an object without copying its memory. It allows direct
access to an object's memory.

Key characteristics: works with bytes-like objects (bytes, bytearray, array.array),
supports slicing and indexing, and enables zero-copy operations. It's ideal for
large binary data processing.

## Basic Usage with Bytes

Here's simple usage with bytes showing how memoryview provides
access to the underlying data without creating copies.

basic_memoryview.py
  

data = b'Python memoryview'
mv = memoryview(data)

# Access elements
print(mv[0])  # 80 (ASCII 'P')
print(mv[7])  # 109 (ASCII 'm')

# Slicing
print(mv[7:13].tobytes())  # b'memory'

This example shows basic memoryview operations on bytes. We can
access individual bytes as integers or create slices without copying data.

The tobytes() method converts the slice back to bytes when needed.
Memory views maintain the original data's structure efficiently.

## Modifying Data with Bytearray

Memory views can modify mutable objects like bytearray. This example demonstrates
in-place modification of binary data.

modify_data.py
  

data = bytearray(b'Python is great!')
mv = memoryview(data)

# Modify through memoryview
mv[7:9] = b'was'
print(data)  # bytearray(b'Python was great!')

# Change single byte
mv[0] = 112  # lowercase 'p'
print(data)  # bytearray(b'python was great!')

The example shows how memoryview enables direct modification of
the underlying bytearray. Changes made through the view affect the original.

This is particularly useful for large datasets where copying would be expensive.
The memory view provides a window into the original data structure.

## Working with Arrays

Memory views work efficiently with array.array objects. This example demonstrates
numeric array processing without data copying.

array_processing.py
  

import array

numbers = array.array('i', [10, 20, 30, 40, 50])
mv = memoryview(numbers)

# Access elements
print(mv[2])  # 30

# Modify through view
mv[1:4] = array.array('i', [25, 35, 45])
print(numbers)  # array('i', [10, 25, 35, 45, 50])

The example shows how memoryview can efficiently process numeric
arrays. The view maintains the array's type ('i' for signed integers here).

This approach is memory-efficient for large numeric datasets, avoiding the
overhead of creating intermediate copies during processing.

## Image Processing Example

This practical example demonstrates using memoryview for efficient
image pixel manipulation without copying the entire image data.

image_processing.py
  

def invert_colors(image_data):
    mv = memoryview(image_data)
    for i in range(len(mv)):
        mv[i] = 255 - mv[i]
    return mv

# Simulate image data (RGBA pixels)
pixels = bytearray([100, 150, 200, 255, 50, 75, 100, 255])
inverted = invert_colors(pixels)
print(list(inverted))  # [155, 105, 55, 0, 205, 180, 155, 0]

The example shows a simple image processing operation (color inversion) using
memoryview. The operation is performed in-place on the pixel data.

For real images, this approach avoids the memory overhead of creating modified
copies of large image buffers during processing.

## Memory Efficiency Comparison

This example compares memory usage between direct slicing and memoryview slicing,
demonstrating the memory efficiency advantage.

memory_efficiency.py
  

import sys

large_data = bytearray(10_000_000)  # 10MB of zeros

# Traditional slicing (creates copy)
slice_copy = large_data[1_000_000:9_000_000]
print(f"Slice copy size: {sys.getsizeof(slice_copy)/1_000_000:.2f} MB")

# Memoryview slicing (no copy)
mv = memoryview(large_data)
mv_slice = mv[1_000_000:9_000_000]
print(f"Memoryview slice size: {sys.getsizeof(mv_slice)/1_000_000:.2f} MB")

The example clearly shows the memory advantage of memoryview. The
traditional slice creates an 8MB copy, while the memoryview slice is tiny.

This demonstrates why memoryview is essential for large data
processing where memory efficiency is critical.

## Best Practices

- **Use for large data:** Ideal for processing large binary datasets efficiently

- **Prevent memory leaks:** Release memory views when done using mv.release()

- **Type awareness:** Be mindful of the underlying data type format

- **Mutable vs immutable:** Only modify mutable objects (bytearray, arrays)

- **Context managers:** Use with blocks for automatic resource management

## Source References

- [Python memoryview Documentation](https://docs.python.org/3/library/stdtypes.html#memoryview)

- [Python Buffer Protocol Documentation](https://docs.python.org/3/c-api/buffer.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).