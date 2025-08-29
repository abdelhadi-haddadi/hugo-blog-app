+++
title = "Python bytearray Function"
date = 2025-08-29T20:07:45.445+01:00
draft = false
description = "Complete guide to Python's bytearray function covering creation, manipulation, and practical examples of mutable byte sequences."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python bytearray Function

Last modified April 11, 2025

This comprehensive guide explores Python's bytearray function, which
creates a mutable sequence of bytes. We'll cover creation methods, manipulation
techniques, and practical examples of working with binary data.

## Basic Definitions

The bytearray function returns a mutable array of bytes. Unlike
bytes objects, bytearray can be modified after
creation.

Key characteristics: mutable sequence of integers (0-255), supports common
sequence operations, and can be converted to/from bytes and strings with
specified encodings.

## Creating bytearray Objects

Here are different ways to create bytearray objects using various
source types and initialization methods.

create_bytearray.py
  

# Empty bytearray
empty = bytearray()
print(empty)  # bytearray(b'')

# From iterable of integers
nums = bytearray([65, 66, 67])
print(nums)   # bytearray(b'ABC')

# From bytes object
original = b'hello'
mutable = bytearray(original)
print(mutable)  # bytearray(b'hello')

# From string with encoding
text = bytearray('Python', 'utf-8')
print(text)    # bytearray(b'Python')

# With size and fill value
zeros = bytearray(5)
print(zeros)   # bytearray(b'\x00\x00\x00\x00\x00')

This example shows five creation methods. The first creates an empty bytearray.
The second converts integers to corresponding bytes. The third copies bytes.

The fourth demonstrates string encoding conversion. The fifth creates a
pre-sized bytearray filled with null bytes. All methods produce mutable objects.

## Modifying bytearray Content

This example demonstrates how to modify a bytearray by changing individual
bytes, slicing, and using various methods.

modify_bytearray.py
  

data = bytearray(b'Hello World')

# Modify single byte
data[0] = 74  # 'J'
print(data)   # bytearray(b'Jello World')

# Modify slice
data[6:11] = b'Python'
print(data)   # bytearray(b'Jello Python')

# Append bytes
data.extend(b'!')
print(data)   # bytearray(b'Jello Python!')

# Insert bytes
data.insert(5, 32)  # space
print(data)   # bytearray(b'Jello  Python!')

# Remove bytes
del data[0]
print(data)   # bytearray(b'ello  Python!')

The example shows various mutation operations. We modify single bytes using
indexing, replace slices, extend with new bytes, insert at positions, and
delete bytes.

All operations happen in-place since bytearray is mutable. This differs from
bytes objects which would require creating new objects for each change.

## Working with Encodings

Bytearrays often interact with text encodings. This example shows conversion
between strings and bytearrays with different encodings.

encodings.py
  

# String to bytearray
text = "Привет"
utf8 = bytearray(text, 'utf-8')
print(utf8)  # bytearray(b'\xd0\x9f\xd1\x80\xd0\xb8\xd0\xb2\xd0\xb5\xd1\x82')

# Bytearray to string
decoded = utf8.decode('utf-8')
print(decoded)  # Привет

# Different encodings
latin1 = bytearray(text, 'latin1', errors='replace')
print(latin1)  # bytearray(b'??????')

# Hex representation
hex_data = bytearray.fromhex('48656c6c6f')
print(hex_data)  # bytearray(b'Hello')

The example demonstrates encoding conversions. We create bytearrays from
Unicode strings using UTF-8 and Latin-1 encodings, then decode back to strings.

The fromhex method shows creating bytearrays from hexadecimal
representations. Note how different encodings handle non-ASCII characters
differently.

## Binary Data Manipulation

Bytearrays are ideal for binary data processing. This example shows practical
binary operations like bit manipulation and file I/O.

binary_ops.py
  

# Create sample binary data
data = bytearray([0b01010101, 0b10101010])

# Bitwise operations
data[0] &amp;= 0b00001111  # Mask upper bits
print(bin(data[0]))    # 0b101

# XOR operation
data[1] ^= 0b11111111
print(bin(data[1]))    # 0b1010101

# File operations
with open('binary.dat', 'wb') as f:
    f.write(data)

with open('binary.dat', 'rb') as f:
    loaded = bytearray(f.read())

print(loaded == data)  # True

This demonstrates low-level binary operations. We perform bit masking and XOR
operations directly on bytearray elements. The example also shows file I/O.

Bytearrays are particularly useful for protocols and formats where you need to
modify binary data after reading it from a file or network connection.

## Performance Comparison

This example compares bytearray performance with alternatives like bytes and
lists for common operations.

performance.py
  

import timeit

def test_bytearray():
    data = bytearray(1000)
    for i in range(len(data)):
        data[i] = i % 256

def test_bytes():
    data = bytes(1000)
    # Can't modify - would need to create new objects

def test_list():
    data = [0] * 1000
    for i in range(len(data)):
        data[i] = i % 256

print("bytearray:", timeit.timeit(test_bytearray, number=1000))
print("list:", timeit.timeit(test_list, number=1000))

The benchmark shows bytearray's efficiency for mutable byte operations. It's
optimized for this use case compared to alternatives like lists of integers.

For read-only operations, bytes objects would be faster, but bytearray provides
the best balance when mutability is required.

## Best Practices

- **Use for mutable data:** When you need to modify binary data after creation

- **Prefer bytes for constants:** Immutable data should use bytes objects

- **Specify encodings:** Always explicitly specify encodings when converting text

- **Consider memoryview:** For zero-copy slicing of large bytearrays

- **Handle errors:** Use error handlers when decoding uncertain data

## Source References

- [Python bytearray() Documentation](https://docs.python.org/3/library/functions.html#bytearray)

- [Python bytearray Objects](https://docs.python.org/3/library/stdtypes.html#bytearray-objects)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).