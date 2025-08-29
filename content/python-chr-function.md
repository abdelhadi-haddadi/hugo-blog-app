+++
title = "Python chr Function"
date = 2025-08-29T20:07:47.664+01:00
draft = false
description = "Complete guide to Python's chr function covering unicode code points, ASCII conversion, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python chr Function

Last modified April 11, 2025

This comprehensive guide explores Python's chr function, which
returns a string representing a character from an integer Unicode code point.
We'll cover ASCII conversion, Unicode handling, and practical examples.

## Basic Definitions

The chr function returns a string representing a character whose
Unicode code point is the integer passed to it. It's the inverse of ord.

Key characteristics: accepts integers from 0 to 1,114,111 (0x10FFFF in base 16).
Raises ValueError for out-of-range values. Returns a single-character
string.

## Basic ASCII Conversion

Here's simple usage with ASCII values showing how chr converts
integer code points to their corresponding characters.

basic_chr.py
  

# Convert ASCII values to characters
print(chr(65))    # 'A'
print(chr(97))    # 'a'
print(chr(48))    # '0'

# Special characters
print(chr(36))    # '$'
print(chr(10))    # '\n' (newline)

This example shows chr with common ASCII values. Each integer
corresponds to a specific character in the ASCII table.

Note that ASCII values range from 0 to 127. chr works with all
valid Unicode code points, not just ASCII.

## Unicode Characters

chr can handle any valid Unicode code point, not just ASCII.
This example demonstrates various Unicode characters.

unicode_chr.py
  

# Common symbols
print(chr(8364))  # '€' (Euro sign)
print(chr(9829))  # '♥' (Heart symbol)

# Non-Latin scripts
print(chr(20013)) # '中' (Chinese character)
print(chr(1488))  # 'א' (Hebrew aleph)

# Emoji
print(chr(128512)) # '😀' (Grinning face)

These examples show chr with various Unicode code points. The
function can represent characters from any writing system supported by Unicode.

The last example demonstrates that chr works with emoji characters
as well, which have higher code point values.

## Error Handling

The chr function raises ValueError when used with
invalid code points. This example shows proper error handling.

errors.py
  

try:
    print(chr(-1))
except ValueError as e:
    print(f"Error: {e}")  # chr() arg not in range(0x110000)

try:
    print(chr(1114112))  # 0x10FFFF + 1
except ValueError as e:
    print(f"Error: {e}")  # chr() arg not in range(0x110000)

try:
    print(chr("A"))
except TypeError as e:
    print(f"Error: {e}")  # an integer is required

These examples demonstrate chr's behavior with invalid inputs.
Negative numbers, values above 1,114,111, and non-integers all raise errors.

The valid range for chr is 0 to 1,114,111 (0x10FFFF in hexadecimal).

## Generating Character Sequences

chr is often used to generate sequences of characters from their
code points. This example creates alphabet sequences.

sequences.py
  

# Generate uppercase alphabet
uppercase = [chr(i) for i in range(65, 91)]
print(''.join(uppercase))  # ABCDEFGHIJKLMNOPQRSTUVWXYZ

# Generate lowercase alphabet
lowercase = [chr(i) for i in range(97, 123)]
print(''.join(lowercase))  # abcdefghijklmnopqrstuvwxyz

# Generate digits
digits = [chr(i) for i in range(48, 58)]
print(''.join(digits))     # 0123456789

This example uses list comprehensions with chr to generate
character sequences. The ranges correspond to ASCII values for letters and digits.

This technique is useful for generating test data or creating character sets
for validation purposes.

## Working with Binary Data

chr can be used to convert byte values to their corresponding
characters when working with binary data.

binary.py
  

# Convert bytes to characters
data = [72, 101, 108, 108, 111]  # ASCII codes for "Hello"
message = ''.join(chr(byte) for byte in data)
print(message)  # "Hello"

# Handle non-printable characters
control_chars = [chr(i) for i in range(0, 32)]
print(control_chars)  # Contains '\t', '\n', etc.

This example demonstrates using chr to convert numeric byte values
to their character representations. This is useful when processing raw byte data.

Note that some characters (like control characters) may not be printable but
still have valid representations.

## Best Practices

- **Validate inputs:** Check values are within 0-1,114,111 range

- **Use with ord:** Remember chr and ord are inverses

- **Handle errors:** Catch ValueError when input range is uncertain

- **Document encoding:** Be explicit about character encoding expectations

- **Consider readability:** For ASCII, sometimes literals are clearer than chr

## Source References

- [Python chr() Documentation](https://docs.python.org/3/library/functions.html#chr)

- [Unicode Standard](https://unicode.org/standard/standard.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).