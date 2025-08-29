+++
title = "Python ord Function"
date = 2025-08-29T20:09:02.796+01:00
draft = false
description = "Complete guide to Python's ord function covering character encoding, ASCII values, Unicode code points, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python ord Function

Last modified April 11, 2025

This comprehensive guide explores Python's ord function, which
returns the Unicode code point of a character. We'll cover ASCII values,
Unicode handling, and practical examples of character encoding.

## Basic Definitions

The ord function returns an integer representing the Unicode
code point of a character. It's the inverse of chr function.

Key characteristics: accepts a single character string (length 1), returns
an integer between 0 and 1,114,111 (0x10FFFF in base 16). Raises TypeError
for invalid inputs.

## Basic ASCII Usage

Here's simple usage with ASCII characters showing how ord
returns their numeric values.

basic_ord.py
  

# Uppercase letters
print(ord('A'))  # 65
print(ord('B'))  # 66

# Lowercase letters
print(ord('a'))  # 97
print(ord('b'))  # 98

# Digits
print(ord('0'))  # 48
print(ord('9'))  # 57

# Special characters
print(ord(' '))  # 32 (space)
print(ord('!'))  # 33

This example shows ord with common ASCII characters. The values
match standard ASCII encoding where 'A' is 65, 'a' is 97, and '0' is 48.

Note that uppercase and lowercase letters have different code points, with
lowercase letters having higher values than their uppercase counterparts.

## Unicode Characters

ord works with any Unicode character, not just ASCII. This
example demonstrates with various Unicode symbols.

unicode_ord.py
  

# Common symbols
print(ord('€'))  # 8364 (Euro sign)
print(ord('¥'))  # 165 (Yen sign)

# Emoji
print(ord('😊')) # 128522 (Smiling face)

# Chinese character
print(ord('中')) # 20013

# Mathematical symbols
print(ord('∑'))  # 8721

These examples show ord with Unicode characters beyond ASCII.
The function returns their unique code points in the Unicode standard.

This demonstrates Python's full Unicode support, where each character has
a unique numeric identifier regardless of language or symbol type.

## Error Handling

The ord function raises TypeError when used
incorrectly. This example shows common error cases.

errors.py
  

try:
    print(ord(''))  # Empty string
except TypeError as e:
    print(f"Error: {e}")  # ord() expected a character, but string of length 0 found

try:
    print(ord('ab'))  # String longer than 1 character
except TypeError as e:
    print(f"Error: {e}")  # ord() expected a character, but string of length 2 found

try:
    print(ord(65))  # Not a string
except TypeError as e:
    print(f"Error: {e}")  # ord() expected string of length 1, but int found

These examples demonstrate ord's strict input requirements.
It only accepts single-character strings and rejects all other input types.

Proper error handling is important when processing user input that will be
passed to ord to avoid program crashes.

## Character Analysis

This example shows how ord can be used to analyze character
properties like case, digit status, or special characters.

analysis.py
  

def char_info(c):
    code = ord(c)
    print(f"Character: {c}")
    print(f"Code point: {code}")
    print(f"Uppercase: {65 &lt;= code &lt;= 90}")
    print(f"Lowercase: {97 &lt;= code &lt;= 122}")
    print(f"Digit: {48 &lt;= code &lt;= 57}")
    print(f"Control char: {code &lt; 32 or code == 127}")

char_info('A')
char_info('z')
char_info('5')
char_info('\n')

This function uses ord to get a character's code point and
then checks various ranges to determine its properties.

Such analysis is useful for text processing, validation, or implementing
custom character classification logic beyond Python's built-in methods.

## Custom Encoding Conversion

This example demonstrates using ord to convert text to
custom numeric representations.

encoding.py
  

def text_to_codes(text, base=16):
    return [hex(ord(c)) if base == 16 else str(ord(c)) for c in text]

print(text_to_codes("Hello"))  # ['0x48', '0x65', '0x6c', '0x6c', '0x6f']
print(text_to_codes("Python", 10))  # ['80', '121', '116', '104', '111', '110']

def create_cipher_key(text):
    return {c: ord(c) * 2 for c in text}

print(create_cipher_key("secret"))  # {'s': 230, 'e': 202, 'c': 198, 'r': 216, 't': 232}

The first function converts text to hexadecimal or decimal code points.
The second creates a simple cipher key by doubling each character's value.

These examples show practical applications of ord in text
processing, encoding, and simple cryptography operations.

## Best Practices

- **Validate input length:** Ensure strings are length 1 before passing to ord

- **Combine with chr:** Use ord/chr pairs for character transformations

- **Handle Unicode:** Remember ord works with all Unicode characters

- **Document encoding:** Clarify if working with ASCII or Unicode values

- **Error handling:** Catch TypeError when processing unknown input

## Source References

- [Python ord() Documentation](https://docs.python.org/3/library/functions.html#ord)

- [Python Unicode HOWTO](https://docs.python.org/3/howto/unicode.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).