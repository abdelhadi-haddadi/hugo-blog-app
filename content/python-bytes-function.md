+++
title = "Python bytes Function"
date = 2025-08-29T20:07:45.459+01:00
draft = false
description = "Complete guide to Python's bytes function covering creation, conversion, and practical examples of working with binary data."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python bytes Function

Last modified April 11, 2025

This comprehensive guide explores Python's bytes function, which
creates an immutable sequence of bytes. We'll cover creation methods,
conversion from strings, and practical examples of binary data handling.

## Basic Definitions

The bytes function returns an immutable bytes object representing
a sequence of bytes in the range 0 &lt;= x &lt; 256. It's similar to bytearray but
immutable.

Key characteristics: immutable sequence of integers (0-255), supports most
sequence operations, used for binary data handling, and encoding/decoding.

## Creating Empty Bytes

The simplest way to create a bytes object is by specifying its length. This
creates a zero-filled bytes object of the given size.

empty_bytes.py
  

# Create empty bytes of length 5
empty_bytes = bytes(5)
print(empty_bytes)  # b'\x00\x00\x00\x00\x00'
print(type(empty_bytes))  # &lt;class 'bytes'&gt;
print(len(empty_bytes))  # 5

This example creates a bytes object of length 5 filled with null bytes (0x00).
The b'' prefix indicates a bytes literal in Python.

Bytes objects support standard sequence operations like indexing, slicing,
and length checking, as shown in the example.

## From Iterable of Integers

You can create bytes from an iterable of integers (0-255). This is useful for
creating specific byte patterns.

iterable_bytes.py
  

# Create bytes from list of integers
byte_values = bytes([65, 66, 67, 68, 69])
print(byte_values)  # b'ABCDE'

# Create bytes from range
range_bytes = bytes(range(65, 70))
print(range_bytes)  # b'ABCDE'

# Hex values
hex_bytes = bytes([0x41, 0x42, 0x43])
print(hex_bytes)  # b'ABC'

Each integer in the iterable must be in the 0-255 range. Values outside this
range will raise ValueError.

The ASCII values 65-69 correspond to uppercase letters A-E, so the bytes object
displays them as characters when printable.

## From Strings with Encoding

Bytes objects can be created from strings by specifying an encoding. This is
essential for text serialization and network communication.

string_bytes.py
  

# UTF-8 encoded bytes
text = "Hello, world!"
utf8_bytes = bytes(text, encoding='utf-8')
print(utf8_bytes)  # b'Hello, world!'

# Different encodings
utf16_bytes = bytes(text, encoding='utf-16')
print(utf16_bytes)  # b'\xff\xfeH\x00e\x00l\x00...'

# Using encode() method (preferred)
encoded = text.encode('ascii')
print(encoded)  # b'Hello, world!'

The encoding parameter specifies how to convert characters to bytes. UTF-8 is
the most common encoding, but others like ASCII or UTF-16 are also available.

Note that the encode() method is generally preferred over
bytes() for string encoding, as shown in the last example.

## Bytes from Bytearray

You can create immutable bytes from a mutable bytearray. This is useful when
you need to freeze a modifiable byte sequence.

bytearray_bytes.py
  

# Create mutable bytearray
mutable_data = bytearray(b'Hello')
mutable_data[0] = 74  # 'J' in ASCII

# Convert to immutable bytes
immutable_bytes = bytes(mutable_data)
print(immutable_bytes)  # b'Jello'

# Attempting to modify bytes raises TypeError
try:
    immutable_bytes[0] = 72
except TypeError as e:
    print(f"Error: {e}")  # 'bytes' object does not support item assignment

This example shows conversion from mutable bytearray to immutable bytes. The
resulting bytes object cannot be modified, unlike the original bytearray.

The TypeError demonstrates the immutability of bytes objects, which is a key
difference from bytearray.

## Hex String to Bytes

This example shows how to convert hexadecimal strings to bytes objects, a
common task in cryptographic operations and binary protocols.

hex_bytes.py
  

# From hex string using bytes.fromhex()
hex_str = "48656c6c6f"  # "Hello" in hex
hex_bytes = bytes.fromhex(hex_str)
print(hex_bytes)  # b'Hello'

# With spaces in hex string
spaced_hex = "48 65 6c 6c 6f"
spaced_bytes = bytes.fromhex(spaced_hex)
print(spaced_bytes)  # b'Hello'

# Convert back to hex
back_to_hex = hex_bytes.hex()
print(back_to_hex)  # '48656c6c6f'

The fromhex() class method creates bytes from a hexadecimal string.
Spaces are ignored, making it easier to read longer hex strings.

The hex() method converts bytes back to a hexadecimal string,
completing the round-trip conversion.

## Best Practices

- **Use for binary data:** Prefer bytes over strings for binary data

- **Specify encoding:** Always specify encoding when converting strings

- **Consider memoryview:** For large data to avoid copying

- **Immutable nature:** Remember bytes objects cannot be modified

- **Document encodings:** Clearly document encoding choices

## Source References

- [Python bytes() Documentation](https://docs.python.org/3/library/functions.html#bytes)

- [Python Bytes Objects](https://docs.python.org/3/library/stdtypes.html#bytes)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).