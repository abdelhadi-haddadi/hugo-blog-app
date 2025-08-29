+++
title = "Python re.fullmatch() Function"
date = 2025-08-29T20:10:08.346+01:00
draft = false
description = "Comprehensive tutorial on Python's re.fullmatch function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.fullmatch() Function

last modified April 20, 2025

## Introduction to re.fullmatch

The re.fullmatch function is a powerful tool in Python's
re module. It checks if the entire string matches the
regular expression pattern.

Unlike re.search which looks for matches anywhere in the
string, re.fullmatch requires the entire string to match.
This makes it ideal for validation tasks.

The function returns a match object if the pattern matches the whole
string, or None if it doesn't. It accepts both compiled
patterns and pattern strings.

## Basic Syntax

The syntax for re.fullmatch is straightforward:

re.fullmatch(pattern, string, flags=0)

The pattern is the regular expression to match. The
string is the text to check. Optional flags
modify matching behavior.

## Basic Full Match Example

Let's start with a simple example of validating a string format.

basic_fullmatch.py
  

#!/usr/bin/python

import re

pattern = r'hello'
text1 = "hello"
text2 = "hello world"

match1 = re.fullmatch(pattern, text1)
match2 = re.fullmatch(pattern, text2)

print(f"Text1 match: {match1 is not None}")
print(f"Text2 match: {match2 is not None}")

This example shows how re.fullmatch differs from other
matching functions. Only the exact match succeeds.

match1 = re.fullmatch(pattern, text1)

This returns a match object because "hello" exactly matches the pattern.
The entire string must conform to the pattern.

match2 = re.fullmatch(pattern, text2)

This returns None because "hello world" contains extra
characters not in the pattern. The match must be exact.

## Validating Email Format

re.fullmatch is perfect for validating structured data.
Here's an email validator.

email_validation.py
  

#!/usr/bin/python

import re

email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
emails = ["user@example.com", "invalid.email", "name@domain.co.uk"]

for email in emails:
    if re.fullmatch(email_pattern, email):
        print(f"Valid email: {email}")
    else:
        print(f"Invalid email: {email}")

This demonstrates using re.fullmatch for input validation.
The pattern must match the entire string to be considered valid.

## Matching Whole Numbers

Here's how to validate that a string contains only digits.

number_validation.py
  

#!/usr/bin/python

import re

numbers = ["123", "45.67", "1000", "abc123"]
pattern = r'^\d+$'

for num in numbers:
    if re.fullmatch(pattern, num):
        print(f"Valid number: {num}")
    else:
        print(f"Invalid number: {num}")

The pattern ^\d+$ ensures the string contains only one
or more digits from start to end. No other characters are allowed.

## Using with Compiled Patterns

For better performance with repeated use, compile the pattern first.

compiled_pattern.py
  

#!/usr/bin/python

import re

date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$')
dates = ["2023-12-25", "12/25/2023", "2023-13-01"]

for date in dates:
    if date_pattern.fullmatch(date):
        print(f"Valid date: {date}")
    else:
        print(f"Invalid date: {date}")

Compiled patterns have a fullmatch method that works
just like the module-level function. This is more efficient for
repeated validations.

## Password Strength Checker

Combine multiple conditions to validate password strength.

password_checker.py
  

#!/usr/bin/python

import re

password_pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&amp;])[A-Za-z\d@$!%*?&amp;]{8,}$'
passwords = ["Weak1", "Strong@123", "noSpecialChar1"]

for pwd in passwords:
    if re.fullmatch(password_pattern, pwd):
        print(f"Strong password: {pwd}")
    else:
        print(f"Weak password: {pwd}")

This pattern requires at least one uppercase, lowercase, digit, and
special character, with minimum length of 8. re.fullmatch
ensures the entire password meets all requirements.

## Hex Color Code Validation

Validate CSS-style hex color codes with re.fullmatch.

color_validation.py
  

#!/usr/bin/python

import re

color_pattern = r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
colors = ["#FF5733", "#abc", "#123456", "#ghijkl"]

for color in colors:
    if re.fullmatch(color_pattern, color):
        print(f"Valid color: {color}")
    else:
        print(f"Invalid color: {color}")

The pattern matches both 3-digit and 6-digit hex color codes. The
^ and $ anchors ensure no extra characters
are present.

## Time Format Validation

Validate 24-hour time format with optional seconds.

time_validation.py
  

#!/usr/bin/python

import re

time_pattern = r'^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'
times = ["13:45", "23:59:59", "25:00", "12:60"]

for time in times:
    if re.fullmatch(time_pattern, time):
        print(f"Valid time: {time}")
    else:
        print(f"Invalid time: {time}")

This pattern validates hours (00-23), minutes (00-59), and optional
seconds (00-59). re.fullmatch ensures the entire string
conforms to the time format.

## Best Practices

When using re.fullmatch, follow these best practices:

- Use for validation tasks where the entire string must match

- Prefer compiled patterns when validating multiple strings

- Combine with other regex features like lookaheads for complex rules

- Always use raw strings (r'') for patterns

- Consider readability when creating complex patterns

## Performance Considerations

re.fullmatch is optimized for its specific use case.
For simple validations, it's often the most efficient approach.

When validating many strings against the same pattern, compiling
the pattern first provides better performance. The difference is
most noticeable in tight loops.

## Source

[Python re.fullmatch() documentation](https://docs.python.org/3/library/re.html#re.fullmatch)

This tutorial covered the essential aspects of Python's re.fullmatch
function. Mastering full pattern matching will make your validation code
more robust and efficient.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).