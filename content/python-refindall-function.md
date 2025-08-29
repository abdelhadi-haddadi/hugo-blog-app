+++
title = "Python re.findall() Function"
date = 2025-08-29T20:10:07.241+01:00
draft = false
description = "Comprehensive tutorial on Python's re.findall function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.findall() Function

last modified April 20, 2025

## Introduction to re.findall

The re.findall function is a powerful tool in Python's
re module for pattern matching. It scans a string and
returns all non-overlapping matches of a pattern.

Unlike re.search which finds the first match, findall
finds all matches. It returns matches as a list of strings or tuples,
depending on pattern groups.

The function is ideal for extracting multiple occurrences of patterns
from text data. It works with both compiled patterns and raw regex strings.

## Basic Syntax

The syntax for re.findall is straightforward:

re.findall(pattern, string, flags=0)

The pattern is the regular expression to match. The
string is the text to search. Optional flags
modify matching behavior.

## Basic Pattern Matching

Let's start with a simple example of finding all digits in a string.

basic_findall.py
  

#!/usr/bin/python

import re

text = "Order 12345 shipped on 2023-05-15, delivered on 2023-05-20"
numbers = re.findall(r'\d+', text)

print("Found numbers:", numbers)

This example finds all sequences of digits in the text. The \d+
pattern matches one or more digit characters.

numbers = re.findall(r'\d+', text)

The findall function scans the entire string and returns
all matches as a list. Each match is a string of consecutive digits.

## Finding Words with Specific Patterns

We can find all words that match certain criteria using findall.

word_patterns.py
  

#!/usr/bin/python

import re

text = "The quick brown fox jumps over the lazy dog. Foxes are clever."
words = re.findall(r'\b[fF]\w+\b', text)

print("Words starting with f/F:", words)

This finds all words starting with 'f' or 'F'. The \b ensures
we match whole words only. \w+ matches word characters.

## Extracting Email Addresses

findall is excellent for extracting structured data like emails.

emails.py
  

#!/usr/bin/python

import re

text = "Contact us at support@example.com or sales@company.org for help"
emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)

print("Found emails:", emails)

This pattern matches standard email formats. It looks for the @ symbol
between valid characters and a domain suffix.

## Using Groups with findall

When patterns contain groups, findall returns tuples of groups.

groups.py
  

#!/usr/bin/python

import re

text = "John: 30, Alice: 25, Bob: 42, Eve: 29"
matches = re.findall(r'(\w+): (\d+)', text)

for name, age in matches:
    print(f"{name} is {age} years old")

This extracts name-age pairs using two capture groups. Each match becomes
a tuple of the grouped matches.

## Case-Insensitive Matching

We can make findall case-insensitive using the re.IGNORECASE flag.

case_insensitive.py
  

#!/usr/bin/python

import re

text = "Python is great. python is versatile. PYTHON is powerful."
matches = re.findall(r'python', text, re.IGNORECASE)

print("Python mentions:", matches)

The flag makes the pattern match all case variations of 'python'. This
is useful when case doesn't matter in the search.

## Finding Multiple Patterns

We can search for multiple alternative patterns using the pipe character.

multiple_patterns.py
  

#!/usr/bin/python

import re

text = "Apples 5, Oranges 3, Bananas 12, Grapes 7"
matches = re.findall(r'(Apples|Oranges|Grapes)\s+\d+', text)

print("Fruit quantities:", matches)

This finds specific fruits and their quantities. The alternation operator
| allows matching any of several patterns.

## Extracting URLs

findall can extract URLs from text using a comprehensive pattern.

urls.py
  

#!/usr/bin/python

import re

text = "Visit https://example.com or http://test.org/page?q=1 for more info"
urls = re.findall(r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', text)

print("Found URLs:", urls)

This pattern matches both HTTP and HTTPS URLs. It handles various URL
components while avoiding overly complex matching.

## Best Practices

When using re.findall, follow these best practices:

- Use raw strings (r'') for patterns to avoid escaping issues

- Pre-compile patterns if reused frequently for better performance

- Be specific with patterns to avoid unintended matches

- Consider using finditer for large texts to save memory

- Test patterns thoroughly with various input cases

## Performance Considerations

re.findall loads all matches into memory at once. For very
large texts or many matches, this can consume significant memory.

For memory-efficient processing of large texts, consider re.finditer
which returns matches as an iterator. This processes matches one at a time.

## Source

[Python re.findall() documentation](https://docs.python.org/3/library/re.html#re.findall)

This tutorial covered the essential aspects of Python's re.findall
function. Mastering this function will greatly enhance your text processing
capabilities in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).