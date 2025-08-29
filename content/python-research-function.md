+++
title = "Python re.search Function"
date = 2025-08-29T20:10:13.994+01:00
draft = false
description = "Comprehensive tutorial on Python's re.search function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.search Function

last modified April 20, 2025

## Introduction to re.search

The re.search function scans through a string looking for
the first location where a regular expression pattern matches. Unlike
re.match, it searches the entire string.

This function returns a match object if found, or None if no match exists.
It's one of the most commonly used functions in Python's regex module.

The search stops at the first match found in the string. For all matches,
use re.findall or re.finditer instead.

## Basic Syntax

The syntax for re.search is straightforward:

re.search(pattern, string, flags=0)

The pattern is the regular expression to match. The
string is searched for matches. Optional flags modify
matching behavior.

## Basic Pattern Search

Let's start with a simple example of searching for a pattern in text.

basic_search.py
  

#!/usr/bin/python

import re

text = "The quick brown fox jumps over the lazy dog"
match = re.search(r'fox', text)

if match:
    print(f"Found '{match.group()}' at position {match.start()}")
else:
    print("Pattern not found")

This example demonstrates the basic usage of re.search.
We look for the literal string 'fox' in the given text.

match = re.search(r'fox', text)

The raw string (r'') prevents Python from interpreting
backslashes. The function scans the text for the first 'fox' occurrence.

if match:
    print(f"Found '{match.group()}' at position {match.start()}")

If a match is found, we print the matched text and its starting position.
The group method returns the matched substring.

## Using Flags with re.search

Flags modify how the pattern matching behaves. Here's a case-insensitive search.

flags_example.py
  

#!/usr/bin/python

import re

text = "Python is FUN!"
match = re.search(r'fun', text, re.IGNORECASE)

if match:
    print(f"Found '{match.group()}' ignoring case")
else:
    print("Pattern not found")

The re.IGNORECASE flag makes the search case-insensitive.
This allows matching 'FUN' with the pattern 'fun'.

## Searching for Digits

Regular expressions can match complex patterns like sequences of digits.

digits_example.py
  

#!/usr/bin/python

import re

text = "Order 12345 was placed on 2023-05-20"
match = re.search(r'\d+', text)

if match:
    print(f"Found number: {match.group()}")
else:
    print("No numbers found")

The pattern \d+ matches one or more digits. It finds the
first sequence of digits in the string (12345 in this case).

## Extracting Email Addresses

We can use re.search to find structured data like emails.

email_example.py
  

#!/usr/bin/python

import re

text = "Contact us at support@example.com or sales@example.org"
match = re.search(r'[\w\.-]+@[\w\.-]+', text)

if match:
    print(f"Found email: {match.group()}")
else:
    print("No email found")

This pattern matches common email formats. The character class [\w\.-]
matches word characters, dots, and hyphens commonly found in emails.

## Using Groups in Search

Parentheses create capturing groups that can be extracted separately.

groups_example.py
  

#!/usr/bin/python

import re

text = "Date: 2023-12-25"
match = re.search(r'Date: (\d{4})-(\d{2})-(\d{2})', text)

if match:
    print(f"Year: {match.group(1)}")
    print(f"Month: {match.group(2)}")
    print(f"Day: {match.group(3)}")
else:
    print("Date pattern not found")

This extracts date components into separate groups. Group 0 is the full match,
while groups 1-3 contain the captured date parts.

## Searching with Word Boundaries

Word boundaries (\b) ensure we match whole words only.

word_boundaries.py
  

#!/usr/bin/python

import re

text = "The cat in the hat"
match = re.search(r'\bcat\b', text)

if match:
    print("Found exact word 'cat'")
else:
    print("Word 'cat' not found")

The \b anchors ensure we match 'cat' as a whole word,
not as part of other words like 'category' or 'concatenate'.

## Searching in Multiline Text

The re.MULTILINE flag changes how ^ and $ work in patterns.

multiline_example.py
  

#!/usr/bin/python

import re

text = """First line
Second line
Third line"""

match = re.search(r'^Second.*$', text, re.MULTILINE)

if match:
    print(f"Found line: {match.group()}")
else:
    print("Line not found")

With re.MULTILINE, ^ matches the start of each line,
not just the start of the whole string. Similarly for $.

## Best Practices

When using re.search, follow these best practices:

- Use raw strings (r'') for patterns to avoid escaping issues

- Pre-compile patterns with re.compile if reused frequently

- Check if the match object is not None before using it

- Use appropriate flags to simplify patterns when possible

- Consider using re.findall if you need all matches

## Performance Considerations

For single searches, re.search is efficient enough. For repeated
searches with the same pattern, consider compiling the pattern first.

Complex patterns with excessive backtracking can be slow. Test performance
with realistic input data when working with complex regexes.

## Source

[Python re.search() documentation](https://docs.python.org/3/library/re.html#re.search)

This tutorial covered the essential aspects of Python's re.search
function. Mastering pattern searching is fundamental to effective text processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).