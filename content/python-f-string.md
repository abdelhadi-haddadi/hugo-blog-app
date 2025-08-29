+++
title = "Python f-string"
date = 2025-08-29T20:08:32.893+01:00
draft = false
description = "Python f-string tutorial shows how to format strings in Python with f-string. Python f-strings provide a faster, more readable, concise, and less error prone way of formatting strings in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python f-string

last modified May 11, 2025

This Python f-string tutorial demonstrates how to format strings efficiently
using f-strings, the preferred approach for string interpolation in modern
Python. With f-strings, developers can create dynamic and readable output in a
concise and intuitive way.

Python f-string is a powerful and flexible string formatting method
introduced in Python 3.6. Unlike older formatting techniques such as
%-based formatting and str.format(), f-strings are
faster, more readable, and less prone to errors. They simplify string
manipulation while maintaining excellent performance.

An f-string is denoted by the f prefix and allows embedded
expressions inside curly brackets {}. These expressions are
evaluated at runtime, making f-strings a great choice for constructing dynamic
strings. For example:

name = "Alice"
age = 30
print(f"Hello, my name is {name} and I am {age} years old.")

In this example, Python automatically replaces {name} and
{age} with their corresponding values. This feature makes f-strings
more intuitive compared to older approaches, improving code readability.

F-strings also support format specifiers that control numerical precision,
alignment, and padding. Format specifiers are added after a colon
(:) inside the curly brackets. For instance,
f'{price:.3f}' ensures that the floating-point number stored in
price is rounded to three decimal places:

price = 19.98765
formatted_price = f"{price:.3f}"
print(formatted_price) # Output: 19.988

Beyond basic formatting, f-strings enable advanced operations such as inline
calculations, function calls, and even conditional expressions. This versatility
makes them suitable for a wide range of applications in Python development, from
constructing log messages to formatting financial data.

Using f-strings enhances code efficiency and readability while reducing the
complexity of string manipulations. They are now considered the best practice
for formatting strings in Python, replacing older methods in most use cases.

## Python string formatting

The following example demonstrates three different ways to format strings in
Python. It shows the evolution from the oldest percent-style formatting, to
the more modern str.format() method, and finally to the concise
and powerful f-string syntax introduced in Python 3.6.

main.py
  

#!/usr/bin/python

name = 'Peter'
age = 23

print('%s is %d years old' % (name, age))
print('{} is {} years old'.format(name, age))
print(f'{name} is {age} years old')

The example formats a string using two variables.

print('%s is %d years old' % (name, age))

This is the oldest option. It uses the % operator
and classic string format specifies such as %s and %d.

print('{} is {} years old'.format(name, age))

Since Python 3.0, the format function was introduced to provide
advance formatting options.

print(f'{name} is {age} years old')

Python f-strings are available since Python 3.6. The string has the f
prefix and uses {} to evaluate variables.

$ python main.py
Peter is 23 years old
Peter is 23 years old
Peter is 23 years old

## Expressions

The example below demonstrates how you can include expressions directly inside
an f-string. Any valid Python expression can be placed within the curly braces,
allowing you to perform calculations or manipulate data inline as you format
your output.

main.py
  

#!/usr/bin/python

bags = 3
apples_in_bag = 12

print(f'There are total of {bags * apples_in_bag} apples')

Here, the expression bags * apples_in_bag is evaluated inside the
f-string, and its result is inserted into the output. This makes f-strings
very flexible for dynamic string construction.

$ python main.py
There are total of 36 apples

## Using dictionaries

F-strings can also access values from dictionaries. You can reference dictionary
keys directly within the curly braces, making it easy to display structured
data in your output.

main.py
  

#!/usr/bin/python

user = {'name': 'John Doe', 'occupation': 'gardener'}

print(f"{user['name']} is a {user['occupation']}")

In this example, the f-string retrieves the values associated with the
'name' and 'occupation' keys from the dictionary and
inserts them into the output string.

$ python main.py
John Doe is a gardener

## The f-string debug option

Python 3.8 introduced a handy feature for debugging: the self-documenting
expression. By adding an equals sign (=) after an expression in an
f-string, Python will print both the expression and its value, making it easier
to trace calculations and variable states.

main.py
  

#!/usr/bin/python

import math

x = 0.8

print(f'{math.cos(x) = }')
print(f'{math.sin(x) = }')

This example outputs both the expression and its result, which is especially
useful for debugging or logging intermediate values in your code.

$ python main.py
math.cos(x) = 0.6967067093471654
math.sin(x) = 0.7173560908995228

## Multiline f-strings

F-strings can span multiple lines, making it easy to format longer messages or
blocks of text. You can use triple quotes to create a multiline f-string and
embed variables or expressions on any line.

main.py
  

#!/usr/bin/python

name = 'John Doe'
occupation = 'gardener'
age = 34

msg = f'''name: {name}
age: {age}
occupation: {occupation}'''

print(msg)

This example constructs a multiline string that includes several variables.
Multiline f-strings are useful for generating formatted reports or messages.

$ python main.py
name: John Doe
age: 34
occupation: gardener

## Calling functions

You can call functions directly inside f-strings. This allows you to display
the result of a function call inline, making your output more dynamic and
reducing the need for temporary variables.

main.py
  

#!/usr/bin/python

def mymax(x, y):

    return x if x &gt; y else y

a = 3
b = 4

print(f'Max of {a} and {b} is {mymax(a, b)}')

Here, the mymax function is called inside the f-string, and its
return value is included in the output. This technique is helpful for
presenting computed results directly in your strings.

$ python main.py
Max of 3 and 4 is 4

## The f-string objects

F-strings can also display objects. If the object defines a __str__
or __repr__ method, Python will use that method to convert the
object to a string for display. This makes it easy to show custom objects in
your output.

main.py
  

#!/usr/bin/python

class User:
    def __init__(self, name, occupation):
        self.name = name
        self.occupation = occupation

    def __repr__(self):
        return f"{self.name} is a {self.occupation}"

u = User('John Doe', 'gardener')

print(f'{u}')

In this example, the User class defines a __repr__
method. When the object is used in an f-string, Python calls this method to
produce the string representation.

$ python main.py
John Doe is a gardener

## The __format__ method

The __format__ method allows you to customize how your objects are
formatted within f-strings. By defining this method, you can control the output
based on the format specifier provided in the f-string, enabling advanced and
flexible formatting for your custom classes.

main.py
  

#!/usr/bin/python

from dataclasses import dataclass

@dataclass
class User:
    name: str
    occupation: str

    def __format__(self, spec):
        return f'User(name={self.name}{spec} occupation={self.occupation})'

u1 = User('John Doe', 'gardener')
u2 = User('Roger Roe', 'driver')
u3 = User('Lucia Smith', 'teacher')

print(f'{u1:-}')
print(f'{u2:;}')
print(f'{u3:#}')

In this example, the __format__ method inserts the format specifier
between the object's fields. This approach is useful for custom display logic in
complex applications.

$ python main.py
User(name=John Doe- occupation=gardener)
User(name=Roger Roe; occupation=driver)
User(name=Lucia Smith# occupation=teacher)

## Escaping characters

Sometimes you need to include special characters, such as curly braces or quotes,
in your f-strings. To do this, you must escape them. Curly braces are escaped by
doubling them, and single quotes can be escaped with a backslash.

main.py
  

#!/usr/bin/python

print(f'Python uses {{}} to evaluate variables in f-strings')
print(f'This was a \'great\' film')

The first line shows how to display curly braces in the output, while the second
line demonstrates escaping a single quote. Proper escaping ensures your strings
are displayed as intended.

$ python main.py
Python uses {} to evaluate variables in f-strings
This was a 'great' film

## Python f-string format datetime

F-strings can be used to format date and time objects. By providing a format
specifier after a colon, you can control the output of datetime
objects, such as displaying the date, time, weekday, or other components in a
custom format.

main.py
  

#!/usr/bin/python

import datetime

now = datetime.datetime.now()

print(f'{now:%Y-%m-%d %H:%M}')
print(f'{now:%A}')
print(f'{now:%a}')
print(f'{now:%B}')
print(f'{now:%j}')
print(f'{now:%w}')

This example shows several ways to format the current date and time using
f-strings. The format codes after the colon follow the conventions of the
strftime method.

$ python main.py
2024-03-13 11:38
Wednesday
Wed
March
073
3

## Nested expressions

You can nest expressions inside f-strings, including using variables as format
specifiers. This allows for highly dynamic formatting, such as switching between
different date formats or other output styles at runtime.

main.py
  

#!/usr/bin/python

from datetime import datetime

today = datetime.now().date()

spec1 = '%d.%m.%y'
spec2 = '%y/%m/%d'

print(f'{today:{spec1}}')
print(f'{today:{spec2}}')

Here, the format specifier is stored in a variable and then used inside the
f-string. This technique is useful for creating flexible and reusable formatting
code.

$ python main.py
16.03.24
24/03/16

## Formatting floats

F-strings make it easy to control the number of decimal places when displaying
floating point numbers. You can specify the precision directly after the colon,
ensuring your output is as precise or as concise as you need.

main.py
  

#!/usr/bin/python

val = 12.3

print(f'{val:.2f}')
print(f'{val:.5f}')

The first line prints the value with two decimal places, while the second line
shows five decimal places. This is especially useful for financial or scientific
applications where precision matters.

$ python main.py
12.30
12.30000

## Thousands separators

You can use f-strings to add thousands separators to large numbers, making them
easier to read. Both underscores and commas are supported as grouping characters,
which is helpful for displaying financial, statistical, or scientific data.

main.py
  

#!/usr/bin/python

val = 1_200_400_001

print(val)
print(f'{val:_}')
print(f'{val:,}')

The output shows the number in its raw form, with underscores, and with commas.
This makes it much easier to interpret large values at a glance.

$ python main.py
1200400001
1_200_400_001
1,200,400,001

## Percentage

F-strings can also be used to display percentages. By using the percent format
specifier (%), you can easily convert a decimal value to a
percentage, and you can control the number of decimal places shown.

main.py
  

#!/usr/bin/python

val = 1/7.0

print(f'{val}')
print(f'{val:.2%}')

The first line prints the raw decimal value, while the second line displays it
as a percentage with two decimal places. This is useful for reports and data
analysis.

$ python main.py 
0.14285714285714285
14.29%

## Format width

You can set the width of formatted values in f-strings, which is useful for
aligning columns in tables or reports. You can also specify fill characters, such
as zeros, to pad values that are shorter than the desired width.

main.py
  

#!/usr/bin/python

for x in range(1, 11):
    print(f'{x:02} {x*x:3} {x*x*x:4}')

This example prints three columns: the first is zero-padded to two digits, the
second is right-aligned to three spaces, and the third is right-aligned to four
spaces. This approach is ideal for creating neatly formatted tables.

$ python main.py
01   1    1
02   4    8
03   9   27
04  16   64
05  25  125
06  36  216
07  49  343
08  64  512
09  81  729
10 100 1000

## Justifying strings

F-strings allow you to justify strings to the left, right, or center within a
given width. This is controlled by the &gt;, &lt;, and
^ characters after the colon. Justification is useful for aligning
text in tables or output.

main.py
  

#!/usr/bin/python

words = ['sky', 'fork', 'small', 'cup', 'car', 'war']

for word in words:
    print(f'|{word:&gt;20}|')

for word in words:
    print(f'|{word:^20}|')

for word in words:
    print(f'|{word:&lt;20}|')

The first loop right-aligns each word, the second centers it, and the third
left-aligns it. Each output line is exactly 20 characters wide, making it easy
to create aligned columns of text.

$ python main.py
|                 sky|
|                fork|
|               small|
|                 cup|
|                 car|
|                 war|
|        sky         |
|        fork        |
|       small        |
|        cup         |
|        car         |
|        war         |
|sky                 |
|fork                |
|small               |
|cup                 |
|car                 |
|war                 |

## Numeric notations

F-strings can display numbers in a variety of notations, including hexadecimal,
octal, binary, and scientific notation. This is useful for debugging, data
analysis, or when working with different numeric systems.

main.py
  

#!/usr/bin/python

val = 300

# hexadecimal lower
print(f'{val:x}')

# hexadecimal upper
print(f'{val:X}')

# octal
print(f'{val:o}')

# binary
print(f'{val:b}')

# scientific
print(f'{val:e}')

This example prints the same value in several different notations, showing how
easy it is to switch between formats using f-strings.

$ python main.py
12c
12C
454
100101100
3.000000e+02

## Formatting Bytes and Bytearrays with F-Strings

Python's f-strings support direct formatting of bytes and
bytearray objects, allowing for efficient representation of binary
data in string output. This is useful when working with encoded data, network
packets, or file processing.

main.py
  

#!/usr/bin/python

data = b'\x48\x65\x6c\x6c\x6f'  # Byte sequence representing "Hello"
byte_array = bytearray([72, 101, 108, 108, 111])  # Equivalent bytearray

print(f"Bytes (hex): {data.hex()}")  # Output: 48656c6c6f
print(f"Bytearray (ASCII): {byte_array.decode()}")  # Output: Hello

F-strings enable direct conversion of bytes objects into
hexadecimal representation using hex, while
bytearray supports decoding into readable text using
decode. These methods enhance the usability of binary data in
formatted output.

## Formatting Enums

Python's Enum class allows defining symbolic constants, and
f-strings provide an intuitive way to format and display their values. Enums can
be represented by their names or assigned values.

main.py
  

#!/usr/bin/python

from enum import Enum

class Status(Enum):
    SUCCESS = 1
    FAILURE = 2
    PENDING = 3

status = Status.SUCCESS

print(f"Status name: {status.name}")  # Output: SUCCESS
print(f"Status value: {status.value}")  # Output: 1

Using f-strings, enum members can be dynamically formatted by accessing their
.name and .value attributes, ensuring meaningful
output in applications requiring structured constants.

## Unicode and Special Characters

Python f-strings fully support Unicode, which means you can easily include
non-ASCII characters, accented letters, and even emojis in your formatted
output. This is especially useful for internationalization or when you want
to display special symbols in your strings.

main.py
  

#!/usr/bin/python

name = "Zoë"
emoji = "\U0001F600"  # 😀
print(f"User: {name} {emoji}")

In this example, the f-string combines a name with an accented character and
an emoji. F-strings handle these characters natively, ensuring correct
rendering and output in your terminal or application.

## Formatting Numbers: Leading Zeros and Digit Grouping

F-strings provide powerful options for formatting numbers. You can pad
numbers with leading zeros to ensure fixed-width output, or use commas as
thousands separators to make large numbers easier to read. These features
are especially helpful for reports, tables, or any output where alignment
and clarity matter.

main.py
  

#!/usr/bin/python

number = 42
big_number = 1234567

print(f"{number:05}")      # Output: 00042 (5-digit width, zero-padded)
print(f"{big_number:,}")   # Output: 1,234,567 (comma as a thousands separator)

Padding with zeros ensures numbers line up in columns, while grouping digits
with commas improves readability for large values. The colon (:)
inside the curly braces lets you specify these formatting options directly in
the f-string.

## Using List Comprehensions and Lambdas

F-strings can evaluate any valid Python expression inside the curly braces.
This includes list comprehensions and lambda functions, allowing you to
generate and display dynamic content on the fly. This feature is useful for
quickly showing computed results or summaries without extra code.

main.py
  

#!/usr/bin/python

nums = [1, 2, 3]
print(f"Squares: {[x**2 for x in nums]}")  # List comprehension inside f-string

add = lambda a, b: a + b
print(f"Sum: {add(5, 7)}")  # Lambda function execution inside f-string

By embedding expressions like list comprehensions or lambda calls, you can
produce concise, readable output that reflects real-time calculations or
data transformations, all within a single f-string.

## Dynamic Width and Precision with Variables

F-strings allow you to dynamically set the width and precision of your formatted
output by using variables instead of hardcoded values. This provides great
flexibility when you need to adjust formatting based on runtime conditions or
user preferences.

main.py
  

#!/usr/bin/python

value = 123.456789
width = 10
precision = 3

# Dynamic width and precision using variables
print(f"Fixed format:    {value:{width}.{precision}f}")

# Adjust precision based on the value
large_value = 12345.6789
precision = 1 if large_value &gt; 10000 else 3
print(f"Adaptive format: {large_value:.{precision}f}")

The first example uses variables for both width and precision, allowing you to
control formatting parameters programmatically. The second example demonstrates
how to change the precision based on the value's magnitude, which is useful for
keeping output consistent when values have different scales.

$ python main.py
Fixed format:       123.457
Adaptive format: 12345.7

## Custom Fill Characters and Alignments

F-strings support custom fill characters for padding when aligning text. Instead
of just spaces or zeros, you can use any character to fill the extra space,
which is useful for creating visual separators or decorative output.

main.py
  

#!/usr/bin/python

title = "TITLE"

# Center with asterisks
print(f"{title:*^30}")

# Right-align with dashes
print(f"{title:-&gt;30}")

# Left-align with dots
print(f"{title:.&lt;30}")

# Numbers can use custom fill characters too
number = 42
print(f"{number:#&gt;10}")

The syntax is {value:fill_char align width}, where fill_char is any
single character, align is one of ^ (center), &gt;
(right), or &lt; (left), and width is the total field width. This
gives you precise control over how your output appears.

$ python main.py
************TITLE************
------------------------TITLE
TITLE........................
########42

## Formatting Numbers with Sign Control

F-strings offer precise control over how positive and negative numbers are
displayed, including whether to show the plus sign for positive numbers. This
is important for financial reports, scientific notation, and any context where
the sign of a number matters.

main.py
  

#!/usr/bin/python

positive = 42
negative = -42
zero = 0

# Always show the sign (+ or -)
print(f"Always show sign:  {positive:+d} {negative:+d} {zero:+d}")

# Only show the - sign for negative numbers (default)
print(f"Default behavior:  {positive:d} {negative:d} {zero:d}")

# Show space for positive, - for negative (useful for alignment)
print(f"Space for positive: {positive: d} {negative: d} {zero: d}")

# Combine with width for aligned columns
print(f"Aligned column:    {positive:+5d} {negative:+5d} {zero:+5d}")

The + flag ensures that both positive and negative signs are shown,
which is useful for data that could be either positive or negative. The space
flag ( ) reserves space for the sign but only shows it for negative
values, helping maintain column alignment while reducing clutter.

$ python main.py
Always show sign:  +42 -42 +0
Default behavior:  42 -42 0
Space for positive:  42 -42  0
Aligned column:    +42   -42    +0

## Formatting Complex Numbers

F-strings can also format complex numbers, allowing you to control the display
of their real and imaginary parts. You can specify precision for both parts
independently if needed, though standard float formatting options apply.

main.py
  

#!/usr/bin/python

c = 3.14159 + 2.71828j

# Default formatting
print(f"Default: {c}")

# Format with precision for both parts
print(f"Precision: {c:.2f}")

# Accessing real and imaginary parts separately
print(f"Real: {c.real:.3f}, Imaginary: {c.imag:.3f}j")

The .2f specifier in {c:.2f} applies to both the real
and imaginary parts of the complex number. You can also access and format the
.real and .imag attributes individually for more granular
control.

$ python main.py
Default: (3.14159+2.71828j)
Precision: (3.14+2.72j)
Real: 3.142, Imaginary: 2.718j

## Nested F-Strings

F-strings can be nested, meaning an f-string can be part of an expression
inside another f-string. This allows for complex, dynamic string constructions,
though it's important to maintain readability by not overusing deep nesting.

main.py
  

#!/usr/bin/python

name = "there"
precision = 2
value = 3.14159

# Nested f-string to dynamically set precision
print(f"Hello, {name}! Value: {value:.{precision}f}")

# Another example with a conditional expression
price = 49.99
print(f"Item: {"Book"}, Price: ${f"{price:.2f}" if price &gt; 0 else "Free"}")

In the first example, {precision} inside {value:.{precision}f}
demonstrates how an inner f-string expression can define a format specifier for
an outer one. The second example shows an f-string used within a conditional
expression inside the main f-string.

$ python main.py
Hello, there! Value: 3.14
Item: Book, Price: $49.99

## Source

[Python f-string - language reference](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)

In this article we have worked with Python f-strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).