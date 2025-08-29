+++
title = "Python format Function"
date = 2025-08-29T20:08:32.871+01:00
draft = false
description = "Complete guide to Python's format function covering basic usage, formatting options, and practical examples of string formatting."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python format Function

Last modified April 11, 2025

This comprehensive guide explores Python's format function, which
provides versatile string formatting capabilities. We'll cover basic usage,
format specifications, and practical examples of text formatting.

## Basic Definitions

The format function formats values into strings using specified
format codes. It's the built-in implementation of the string format method.

Key characteristics: works with all Python data types, supports positional and
named arguments, and provides extensive formatting options for numbers, dates,
and custom objects.

## Basic String Formatting

Here's simple usage showing how format handles different data types
with positional and named placeholders.

basic_format.py
  

# Positional arguments
print(format("Hello, {}!", "world"))  # Hello, world!

# Named arguments
print(format("Coordinates: {lat}, {lon}", lat="37.7749", lon="-122.4194"))

# Formatting numbers
print(format("Value: {:.2f}", 3.14159))  # Value: 3.14

# Multiple values
print(format("{} + {} = {}", 2, 3, 5))  # 2 + 3 = 5

This example shows basic string formatting with positional and named arguments.
The format specifier {:.2f} rounds the number to 2 decimal places.

The function is similar to the string format method but called as
a standalone function. It's useful when you need to format values dynamically.

## Number Formatting

The format function provides extensive options for number
formatting including precision, alignment, and different number bases.

number_formatting.py
  

# Floating point precision
print(format("Pi: {:.4f}", 3.1415926535))  # Pi: 3.1416

# Percentage
print(format("Completion: {:.1%}", 0.756))  # Completion: 75.6%

# Hexadecimal
print(format("Hex: 0x{:X}", 255))  # Hex: 0xFF

# Thousands separator
print(format("Population: {:,}", 1000000))  # Population: 1,000,000

# Scientific notation
print(format("Distance: {:.2e} km", 149600000))  # Distance: 1.50e+08 km

These examples demonstrate various number formatting options. The format
specifications after the colon control how values are displayed.

Note how X produces uppercase hex, while x would
produce lowercase. The comma adds thousand separators based on locale.

## Alignment and Padding

The format function can align text and add padding with various
characters. This is useful for creating tables or fixed-width output.

alignment.py
  

# Right alignment
print(format("{:&gt;10}", "right"))    # '     right'

# Center alignment
print(format("{:^10}", "center"))  # '  center  '

# Left alignment
print(format("{:&lt;10}", "left"))    # 'left      '

# Custom padding
print(format("{:*^20}", "title"))  # '*******title********'

# Number alignment
print(format("{:=10}", -42))       # '-      42'

These examples show different text alignment options. The &gt;,
^, and &lt; symbols control right, center, and left
alignment respectively.

The padding character can be specified before the alignment symbol. The
= alignment places the sign leftmost for numbers.

## Date and Time Formatting

The format function works with datetime objects through their
__format__ method, providing flexible date formatting.

datetime_formatting.py
  

from datetime import datetime

now = datetime.now()

# Standard date formats
print(format("Today is {:%Y-%m-%d}", now))
print(format("Time: {:%H:%M:%S}", now))

# Custom formats
print(format("Day of year: {:%j}", now))
print(format("Week number: {:%U}", now))
print(format("AM/PM: {:%p}", now))

This demonstrates datetime formatting using format codes. The codes after the
colon are the same as those used in strftime.

The format function delegates to the datetime's __format__ method,
which interprets these format codes to produce the desired output.

## Custom Object Formatting

You can make custom objects work with format by implementing the
__format__ special method. This example creates a Temperature class.

custom_format.py
  

class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __format__(self, format_spec):
        if format_spec == 'F':
            return f"{self.celsius * 9/5 + 32:.1f}°F"
        elif format_spec == 'K':
            return f"{self.celsius + 273.15:.1f}K"
        else:
            return f"{self.celsius:.1f}°C"

temp = Temperature(25)
print(format("Temperature: {}", temp))        # 25.0°C
print(format("Temperature: {:F}", temp))     # 77.0°F
print(format("Temperature: {:K}", temp))     # 298.1K

The Temperature class implements __format__ to support different
temperature scale outputs. The format specifier after the colon determines the
output format.

This pattern is useful when you want to provide multiple string representations
of an object that can be selected at formatting time.

## Best Practices

- **Use f-strings for simple cases:** Prefer f-strings in Python 3.6+ for readability

- **Implement __format__:** For custom objects that need formatting

- **Document format codes:** Clearly document supported format specifications

- **Consider localization:** Use locale-aware formatting for numbers/dates

- **Reuse format strings:** Store complex format strings as constants

## Source References

- [Python format() Documentation](https://docs.python.org/3/library/functions.html#format)

- [Format Specification Mini-Language](https://docs.python.org/3/library/string.html#format-specification-mini-language)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).