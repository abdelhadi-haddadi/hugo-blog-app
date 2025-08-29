+++
title = "Python int Function"
date = 2025-08-29T20:08:43.134+01:00
draft = false
description = "Complete guide to Python's int function covering number conversion, base handling, and practical examples of integer conversion."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python int Function

Last modified April 11, 2025

This comprehensive guide explores Python's int function, which
converts values to integers. We'll cover numeric conversion, base handling,
error cases, and practical examples of integer conversion.

## Basic Definitions

The int function returns an integer object constructed from a
number or string. It can handle different numeric bases and truncates floats.

Key characteristics: converts strings/numbers to integers, handles base
conversion (2-36), truncates floats (no rounding), and raises ValueError
for invalid inputs.

## Basic Numeric Conversion

Here's simple usage with different numeric types showing how int
handles various input formats and truncates floating-point numbers.

basic_int.py
  

# With integers
print(int(10))      # 10
print(int(-10))     # -10

# With floats
print(int(3.14))    # 3 (truncates)
print(int(-3.99))   # -3 (truncates)

# With boolean
print(int(True))    # 1
print(int(False))   # 0

This example shows int with different numeric types. For floats,
it truncates the decimal part without rounding. Booleans convert to 1 or 0.

Note that int doesn't round numbers - it simply removes everything
after the decimal point, effectively truncating towards zero.

## String Conversion

The int function can convert strings to integers, optionally
specifying a base. This example demonstrates various string conversions.

string_conversion.py
  

# Decimal strings
print(int("42"))        # 42
print(int("  -42  "))   # -42 (whitespace ignored)

# Different bases
print(int("1010", 2))   # 10 (binary)
print(int("FF", 16))    # 255 (hexadecimal)
print(int("22", 8))     # 18 (octal)

# With base 0 (auto-detect from prefix)
print(int("0b1010", 0)) # 10
print(int("0xFF", 0))   # 255

String conversion handles leading/trailing whitespace and supports different
bases. Base 0 auto-detects from prefixes (0b, 0o, 0x).

For base conversions, the string must represent a valid number in that base,
otherwise ValueError is raised.

## Error Handling

The int function raises ValueError for invalid
conversions. This example shows proper error handling techniques.

error_handling.py
  

# Invalid string conversion
try:
    print(int("3.14"))
except ValueError as e:
    print(f"Error: {e}")  # invalid literal for int()

# Invalid base
try:
    print(int("FF"))  # missing base for hex
except ValueError as e:
    print(f"Error: {e}")

# Custom error handling
def safe_int(value, default=0):
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

print(safe_int("42"))    # 42
print(safe_int("abc"))   # 0

These examples demonstrate int's behavior with invalid inputs.
The safe_int function shows how to implement graceful fallback.

Always validate or handle exceptions when converting user input or untrusted
data to integers.

## Custom Objects with __int__

You can make custom objects work with int by implementing the
__int__ special method. This example creates a Money class.

custom_int.py
  

class Money:
    def __init__(self, dollars, cents):
        self.dollars = dollars
        self.cents = cents
    
    def __int__(self):
        return self.dollars
    
    def __repr__(self):
        return f"${self.dollars}.{self.cents:02d}"

m = Money(10, 99)
print(int(m))  # 10

The Money class implements __int__ to return its dollar value.
When we call int on a Money instance, Python uses this method.

This pattern is useful for objects that have a natural integer representation,
like monetary amounts, quantities, or counts.

## Performance Considerations

This example compares int performance with alternative conversion
methods and different input types.

performance.py
  

import timeit

def test_int_float():
    return int(3.14)

def test_int_str():
    return int("42")

def test_floor():
    import math
    return math.floor(3.14)

print("int(float):", timeit.timeit(test_int_float, number=1000000))
print("int(str):", timeit.timeit(test_int_str, number=1000000))
print("math.floor:", timeit.timeit(test_floor, number=1000000))

This benchmarks different integer conversion approaches. int is
generally fastest for direct numeric conversion. String parsing adds overhead.

For float truncation, int is faster than math.floor
but behaves differently with negative numbers.

## Best Practices

- **Use for type conversion:** Convert strings/numbers to integers when needed

- **Specify base explicitly:** For non-decimal strings, always include base

- **Handle errors:** Catch ValueError when input is uncertain

- **Implement __int__:** For custom objects that have integer representation

- **Prefer int over eval:** Safer alternative for string conversion

## Source References

- [Python int() Documentation](https://docs.python.org/3/library/functions.html#int)

- [Python __int__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__int__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).