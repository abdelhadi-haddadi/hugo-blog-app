+++
title = "Python Match.pos Attribute"
date = 2025-08-29T20:10:11.694+01:00
draft = false
description = "Comprehensive tutorial on Python's Match.pos attribute with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Match.pos Attribute

last modified April 20, 2025

## Introduction to Match.pos

The Match.pos attribute is part of Python's re module.
It stores the starting position in the string where the regex engine began
looking for a match.

This attribute is particularly useful when performing multiple searches
on the same string. It helps track where each search operation began.

The pos value is set when calling matching methods like
search or match with a pos parameter.

## Basic Syntax

The Match.pos attribute is accessed from a match object:

match.pos

It returns an integer representing the search starting position.
The value is read-only and cannot be modified directly.

## Basic Match.pos Example

Here's a simple example demonstrating the Match.pos attribute.

basic_pos.py
  

#!/usr/bin/python

import re

text = "apple banana cherry date"
pattern = re.compile(r'\b\w+\b')

match = pattern.search(text, pos=7)
if match:
    print(f"Found '{match.group()}'")
    print(f"Search started at position: {match.pos}")

This example shows how to access the pos attribute after
a successful match. The search starts at position 7 in the string.

match = pattern.search(text, pos=7)

Here we start the search at position 7. The pos parameter
controls where the regex engine begins looking for matches.

print(f"Search started at position: {match.pos}")

This line prints the starting position stored in the match object's
pos attribute.

## Multiple Searches with Different pos Values

We can perform multiple searches while tracking the starting positions.

multiple_pos.py
  

#!/usr/bin/python

import re

text = "one two three four five six"
pattern = re.compile(r'\b\w+\b')

positions = [0, 4, 8, 12, 16]
for pos in positions:
    match = pattern.search(text, pos=pos)
    if match:
        print(f"At start {pos}: found '{match.group()}' at {match.start()}")

This example shows how different starting positions affect search results.
Each search begins at a different point in the string.

## Comparing pos and start()

It's important to distinguish between pos and start.

pos_vs_start.py
  

#!/usr/bin/python

import re

text = "Python is great for data analysis"
pattern = re.compile(r'great|data')

match = pattern.search(text, pos=10)
if match:
    print(f"Search started at: {match.pos}")
    print(f"Match found at: {match.start()}")
    print(f"Match text: '{match.group()}'")

This demonstrates that pos is where searching began, while
start is where the match was actually found.

## Using pos with finditer

The pos attribute works with iterator-based searching too.

finditer_pos.py
  

#!/usr/bin/python

import re

text = "cat dog bird fish mouse"
pattern = re.compile(r'\b\w+\b')

for match in pattern.finditer(text, pos=4):
    print(f"Found '{match.group()}'")
    print(f"Search pos: {match.pos}, Match pos: {match.start()}")

This shows how finditer maintains the initial search position
while finding all matches after that point.

## pos with Multiline Patterns

The pos behavior changes slightly with multiline patterns.

multiline_pos.py
  

#!/usr/bin/python

import re

text = """first line
second line
third line"""
pattern = re.compile(r'^[a-z]+', re.MULTILINE)

match = pattern.search(text, pos=6)
if match:
    print(f"Found '{match.group()}'")
    print(f"Search started at byte {match.pos}, line {text.count('\n', 0, match.pos)+1}")

In multiline mode, pos refers to byte position, not line
number. This example shows how to calculate the line number.

## Advanced pos Usage with Subpatterns

The pos attribute remains consistent even with complex patterns.

advanced_pos.py
  

#!/usr/bin/python

import re

text = "start: 123, middle: 456, end: 789"
pattern = re.compile(r'(\w+): (\d+)')

matches = list(pattern.finditer(text, pos=7))
for i, match in enumerate(matches, 1):
    print(f"Match {i}:")
    print(f"  Full match: '{match.group()}'")
    print(f"  Search pos: {match.pos}")
    print(f"  Key: '{match.group(1)}', Value: '{match.group(2)}'")

This demonstrates that pos works correctly with capturing
groups and multiple matches. The search position is preserved.

## Error Handling with pos

It's important to handle cases where pos is out of bounds.

pos_errors.py
  

#!/usr/bin/python

import re

text = "short text"
pattern = re.compile(r'\w+')

try:
    match = pattern.search(text, pos=20)
    if match:
        print("Found match")
    else:
        print("No match found (pos beyond string length)")
except Exception as e:
    print(f"Error: {e}")

This shows that using pos beyond string length doesn't
raise an error, but simply returns no match.

## Best Practices

When working with Match.pos, consider these best practices:

Always check if pos
- Remember that pos is byte position, not character index

- Combine pos with endpos for bounded searches

- Use pos for efficient string scanning

- Document your pos values for complex search patterns

## Performance Considerations

Using pos can significantly improve performance when
searching large strings. It avoids reprocessing already-scanned portions.

For repeated searches on the same string, incrementing pos
based on previous matches is more efficient than slicing the string.

## Source

[Python Match.pos documentation](https://docs.python.org/3/library/re.html#re.Match.pos)

This tutorial covered the essential aspects of Python's Match.pos
attribute. Understanding this feature enables more efficient string processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).