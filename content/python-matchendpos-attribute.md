+++
title = "Python Match.endpos Attribute"
date = 2025-08-29T20:10:09.464+01:00
draft = false
description = "Comprehensive tutorial on Python's Match.endpos attribute with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Match.endpos Attribute

last modified April 20, 2025

## Introduction to Match.endpos

The Match.endpos attribute is part of Python's re module.
It represents the end position in the string where the regex engine stops searching.

This attribute is set when creating a match object and reflects the search
boundaries. It's useful for understanding the scope of pattern matching.

The value equals the length of the string by default but can be modified
using the pos and endpos parameters in search methods.

## Basic Syntax

The Match.endpos attribute is accessed from a match object:

match.endpos

It returns an integer representing the ending index of the search.
This is the index one past the last character that was considered.

## Basic Match.endpos Example

Let's start with a simple example showing the default behavior.

basic_endpos.py
  

#!/usr/bin/python

import re

text = "Python programming is fun"
pattern = re.compile(r'programming')
match = pattern.search(text)

print(f"Match found: {match.group()}")
print(f"End position: {match.endpos}")
print(f"String length: {len(text)}")

This example shows that endpos matches the string length
when no search boundaries are specified. The attribute is read-only.

match = pattern.search(text)

The search creates a match object. By default, it searches the entire string.
The endpos will equal the string length in this case.

print(f"End position: {match.endpos}")

This prints the ending position of the search, which is the same as
len(text) when searching the entire string.

## Using endpos with Search Boundaries

We can limit the search range using the endpos parameter.

endpos_boundary.py
  

#!/usr/bin/python

import re

text = "Python programming is fun"
pattern = re.compile(r'is')
match = pattern.search(text, 0, 18)  # endpos=18

print(f"Match found: {match.group()}")
print(f"End position: {match.endpos}")
print(f"String length: {len(text)}")

Here we restrict the search to the first 18 characters. The match object's
endpos reflects this boundary, even though the string is longer.

## endpos with Multiple Matches

When using finditer, each match object has the same endpos.

multiple_matches.py
  

#!/usr/bin/python

import re

text = "apple banana apple orange apple"
pattern = re.compile(r'apple')
matches = pattern.finditer(text, 0, 20)  # endpos=20

for match in matches:
    print(f"Found '{match.group()}' at {match.start()}")
    print(f"Search end position: {match.endpos}")

This shows that all match objects from the same search share the same
endpos value. Only two matches are found due to the boundary.

## endpos with Fullmatch

The fullmatch method is affected by endpos.

fullmatch_example.py
  

#!/usr/bin/python

import re

text = "Python3"
pattern = re.compile(r'Python\d')
match = pattern.fullmatch(text, 0, 6)  # endpos=6

print(f"Match: {match}")  # None, as 'Python' doesn't match fully
match = pattern.fullmatch(text, 0, 7)  # endpos=7
print(f"Match: {match.group()}")

fullmatch requires the entire string (up to endpos)
to match. Here we see how endpos affects the result.

## endpos with Substrings

The endpos works with string slices too.

substring_example.py
  

#!/usr/bin/python

import re

text = "Python programming is fun"
substring = text[:18]  # First 18 characters
pattern = re.compile(r'is')
match = pattern.search(substring)

print(f"Match found: {match.group()}")
print(f"End position: {match.endpos}")
print(f"Substring length: {len(substring)}")

This demonstrates that endpos reflects the substring length
when searching a slice. The behavior matches using the endpos parameter.

## endpos with Multiline Strings

In multiline mode, endpos still marks the absolute end position.

multiline_example.py
  

#!/usr/bin/python

import re

text = """First line
Second line
Third line"""
pattern = re.compile(r'line$', re.MULTILINE)
matches = pattern.finditer(text, 0, 25)  # endpos=25

for match in matches:
    print(f"Found '{match.group()}' at {match.start()}")
    print(f"Search end position: {match.endpos}")

Even in multiline mode, endpos limits the absolute character
position. Only matches before this position are returned.

## endpos with Overlapping Matches

The endpos affects overlapping matches too.

overlapping_example.py
  

#!/usr/bin/python

import re

text = "ababababab"
pattern = re.compile(r'(?=(aba))')
matches = pattern.finditer(text, 0, 8)  # endpos=8

for match in matches:
    print(f"Found '{match.group(1)}' at {match.start(1)}")
    print(f"Search end position: {match.endpos}")

This shows how endpos limits overlapping matches. The lookahead
finds matches up to the specified position.

## Best Practices

When working with Match.endpos, consider these best practices:

- Use endpos to limit search scope for better performance

- Remember it's the index after the last character to consider

- Combine with pos for precise search windows

- Document search boundaries when using endpos

- Verify endpos values when debugging pattern matching

## Performance Considerations

Using endpos can improve performance by reducing the search space.
This is especially valuable with large strings.

The performance benefit increases with the size difference between the
full string and the limited search range. Always measure when optimizing.

## Source

[Python Match.endpos documentation](https://docs.python.org/3/library/re.html#re.Match.endpos)

This tutorial covered the essential aspects of Python's Match.endpos
attribute. Understanding search boundaries helps create efficient regex patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).