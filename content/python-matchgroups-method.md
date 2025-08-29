+++
title = "Python Match.groups() Method"
date = 2025-08-29T20:10:10.610+01:00
draft = false
description = "Comprehensive tutorial on Python's Match.groups method with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Match.groups() Method

last modified April 20, 2025

## Introduction to Match.groups

The Match.groups method is part of Python's re module.
It returns all captured groups from a regular expression match as a tuple.

Groups are created in regex patterns using parentheses. They allow extracting
specific parts of matched text. The groups method provides
access to all captured groups at once.

This method is called on a match object returned by functions like
search or match. It's essential for working
with complex pattern matches.

## Basic Syntax

The syntax for Match.groups is simple:

match.groups(default=None)

The optional default parameter specifies what to return for
non-participating groups. By default, it returns None for these.

## Basic Groups Example

Let's start with a simple example of capturing groups in a date string.

basic_groups.py
  

#!/usr/bin/python

import re

text = "Date: 2023-12-25"
pattern = re.compile(r'(\d{4})-(\d{2})-(\d{2})')

match = pattern.search(text)
if match:
    print("All groups:", match.groups())
    print("Year:", match.group(1))
    print("Month:", match.group(2))
    print("Day:", match.group(3))

This example shows how to capture year, month, and day from a date string.
The groups method returns all three captured groups.

pattern = re.compile(r'(\d{4})-(\d{2})-(\d{2})')

The pattern defines three capturing groups for year, month, and day.
Each group captures a specific part of the date format.

print("All groups:", match.groups())

This prints all captured groups as a tuple. The output would be
('2023', '12', '25') for our example text.

## Groups with Optional Parts

When some groups are optional, groups handles them gracefully.

optional_groups.py
  

#!/usr/bin/python

import re

texts = [
    "Product: Laptop, Price: $999",
    "Product: Mouse, Price: $49, Discount: 10%",
    "Product: Keyboard"
]

pattern = re.compile(r'Product: (\w+)(?:, Price: \$(\d+))?(?:, Discount: (\d+)%)?')

for text in texts:
    match = pattern.search(text)
    if match:
        print(f"Text: '{text}'")
        print("Groups:", match.groups())

This shows how groups handles optional parts in patterns.
Non-matching groups return None in the tuple.

## Using Default Values

We can specify default values for non-participating groups.

default_groups.py
  

#!/usr/bin/python

import re

text = "Name: John"
pattern = re.compile(r'Name: (\w+)(?:, Age: (\d+))?')

match = pattern.search(text)
if match:
    print("Groups with None:", match.groups())
    print("Groups with defaults:", match.groups('N/A'))

The second group is optional and doesn't match. We provide 'N/A' as
default value instead of None.

## Named Groups Example

groups works with both numbered and named groups.

named_groups.py
  

#!/usr/bin/python

import re

text = "User: johndoe, ID: 12345"
pattern = re.compile(r'User: (?P&lt;username&gt;\w+), ID: (?P&lt;userid&gt;\d+)')

match = pattern.search(text)
if match:
    print("All groups:", match.groups())
    print("Username:", match.group('username'))
    print("User ID:", match.group('userid'))

Named groups appear in the same order as they were defined in the pattern.
The groups method returns them in the tuple.

## Nested Groups

For nested groups, groups returns all groups in order.

nested_groups.py
  

#!/usr/bin/python

import re

text = "Coordinates: (40.7128, -74.0060)"
pattern = re.compile(r'\(((\d+\.\d+), ([-+]?\d+\.\d+))\)')

match = pattern.search(text)
if match:
    print("All groups:", match.groups())
    print("Full coordinates:", match.group(1))
    print("Latitude:", match.group(2))
    print("Longitude:", match.group(3))

This example shows how nested groups work. The outer group captures
the complete coordinate pair, while inner groups capture each number.

## Groups in Repeated Patterns

When using repeating groups, groups captures only the last match.

repeating_groups.py
  

#!/usr/bin/python

import re

text = "aaa bbb ccc"
pattern = re.compile(r'((\w+)\s*)+')

match = pattern.search(text)
if match:
    print("All groups:", match.groups())
    print("Full match:", match.group(0))
    print("Last word:", match.group(2))

The repeating group only captures the last iteration ('ccc').
To capture all matches, use findall instead.

## Non-Capturing Groups

Non-capturing groups don't appear in the groups result.

noncapturing_groups.py
  

#!/usr/bin/python

import re

text = "2023-12-25"
pattern = re.compile(r'(\d{4})(?:-(\d{2})(?:-(\d{2}))?)')

match = pattern.search(text)
if match:
    print("Groups:", match.groups())
    print("Year:", match.group(1))
    print("Month:", match.group(2))
    print("Day:", match.group(3))

Non-capturing groups (using ?:) help organize patterns
without creating extra groups in the result.

## Best Practices

When working with Match.groups, consider these best practices:

- Use named groups for better readability with complex patterns

- Document your group structure when patterns have many groups

- Consider using groupdict when working with named groups

- Handle None values for optional groups in your code

- Test edge cases where some groups might not match

## Performance Considerations

The groups method is highly optimized in Python. However,
accessing groups individually might be faster for small numbers of groups.

For patterns with many groups, consider whether you need all groups at once.
Accessing only needed groups can make code clearer and slightly faster.

## Source

[Python Match.groups() documentation](https://docs.python.org/3/library/re.html#re.Match.groups)

This tutorial covered the essential aspects of Python's Match.groups
method. Mastering group extraction will make your regex code more powerful.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).