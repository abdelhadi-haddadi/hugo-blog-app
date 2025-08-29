+++
title = "Python Match.string Attribute"
date = 2025-08-29T20:10:12.858+01:00
draft = false
description = "Comprehensive tutorial on Python's Match.string attribute with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Match.string Attribute

last modified April 20, 2025

## Introduction to Match.string

The Match.string attribute is a property of Python's match objects.
It returns the original string that was passed to the matching function.

This attribute is read-only and provides access to the complete input string,
not just the matched portion. It's useful for context operations around matches.

Match objects are returned by re.match, re.search,
and other regex operations. The string attribute preserves the input.

## Basic Syntax

The syntax for accessing Match.string is straightforward:

match.string

Where match is a match object returned by a regex operation.
No parameters are needed as it's a simple attribute access.

## Basic Match.string Usage

Let's start with a simple example demonstrating basic Match.string usage.

basic_string.py
  

#!/usr/bin/python

import re

text = "The quick brown fox jumps over the lazy dog"
match = re.search(r'fox', text)

if match:
    print("Matched text:", match.group())
    print("Original string:", match.string)
    print("Is same object?", match.string is text)

This example shows how to access the original string from a match object.
The output confirms it's the same string object passed to search.

match = re.search(r'fox', text)

We perform a basic regex search that looks for the word 'fox' in our text.
This returns a match object if successful.

print("Original string:", match.string)

The string attribute gives us back the complete original input
string, not just the matched portion.

## Using Match.string with Multiple Matches

The string attribute remains constant across multiple matches.

multiple_matches.py
  

#!/usr/bin/python

import re

text = "apple orange apple banana apple"
pattern = re.compile(r'apple')

for match in pattern.finditer(text):
    print(f"Found '{match.group()}' at {match.start()}-{match.end()}")
    print("Full string:", match.string)
    print("---")

This demonstrates that each match object references the same original string.
The string attribute doesn't change between matches.

## Context Extraction with Match.string

We can use Match.string to extract context around matches.

context_extraction.py
  

#!/usr/bin/python

import re

text = "The event will occur on 2023-12-25 at 14:30"
match = re.search(r'\d{4}-\d{2}-\d{2}', text)

if match:
    start, end = match.start(), match.end()
    context = match.string[max(0, start-10):end+10]
    print(f"Found date: {match.group()}")
    print(f"Context: ...{context}...")

This shows how to use the original string to get text around the match.
The string attribute provides access to the complete input.

## Match.string with Compiled Patterns

The string attribute works the same with compiled patterns.

compiled_pattern.py
  

#!/usr/bin/python

import re

text = "User: john_doe, Email: john@example.com"
pattern = re.compile(r'(\w+)@(\w+\.\w+)')

match = pattern.search(text)
if match:
    print("Full match:", match.group())
    print("Original string:", match.string)
    print("Username:", match.group(1))
    print("Domain:", match.group(2))

Compiled patterns produce match objects with the same string attribute.
The behavior is identical to uncompiled pattern matches.

## String Verification with Match.string

We can verify if a match came from a specific string using is.

string_verification.py
  

#!/usr/bin/python

import re

original = "Important message: SECRET123"
copy_text = original[:]

match = re.search(r'SECRET\d+', original)

if match:
    print("Is original string?", match.string is original)
    print("Is copy string?", match.string is copy_text)
    print("Content equal?", match.string == copy_text)

This demonstrates that Match.string maintains object identity,
not just value equality. It references the exact string passed to the matcher.

## Match.string in Replacement Functions

The string attribute can be used in replacement callbacks.

replacement_callback.py
  

#!/usr/bin/python

import re

text = "Prices: $10, $20, $30"

def add_tax(match):
    price = int(match.group(1))
    taxed = price * 1.2
    return f"${taxed:.2f} (original: {match.string[match.start():match.end()]})"

result = re.sub(r'\$(\d+)', add_tax, text)
print(result)

The replacement function uses match.string to reference the
original matched text. This provides context during substitutions.

## Match.string with Multiline Strings

The attribute preserves the complete string, including newlines.

multiline_string.py
  

#!/usr/bin/python

import re

text = """First line
Second line with IMPORTANT data
Third line"""

match = re.search(r'IMPORTANT', text)

if match:
    print("Matched:", match.group())
    print("Complete string:", repr(match.string))
    line_start = match.string.rfind('\n', 0, match.start()) + 1
    line_end = match.string.find('\n', match.end())
    print("Full line:", match.string[line_start:line_end])

This shows how to use match.string to work with multiline input.
We can extract complete lines containing matches.

## Best Practices

When using Match.string, consider these best practices:

- Use it when you need context around matches

- Remember it's the complete original string, not just the match

- Prefer is for identity checks rather than ==

- Combine with start and end for precise slicing

- Be mindful of memory with very large strings

## Performance Considerations

The Match.string attribute is simply a reference to the original
string. It doesn't create a copy, so has minimal memory overhead.

However, keeping match objects alive will keep the original string in memory.
For large strings, consider extracting needed portions and discarding matches.

## Source

[Python Match Objects documentation](https://docs.python.org/3/library/re.html#match-objects)

This tutorial covered the essential aspects of Python's Match.string
attribute. Understanding this feature helps in advanced text processing tasks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).