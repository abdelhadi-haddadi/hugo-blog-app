+++
title = "Python Match.re Attribute"
date = 2025-08-29T20:10:08.357+01:00
draft = false
description = "Comprehensive tutorial on Python's Match.re attribute with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Match.re Attribute

last modified April 20, 2025

## Introduction to Match.re

The Match.re attribute is a property of match objects in Python's
re module. It returns the regular expression pattern object used
for the match.

This attribute provides access to the original compiled pattern that
produced the match. It's useful when you need to inspect or reuse the
pattern that created a particular match object.

The Match.re attribute connects match results back to their
source pattern, enabling more dynamic regex processing and debugging.

## Basic Definitions

A Match object is returned by successful regex operations like
search and match. It contains match details.

The re attribute of a Match object references the compiled
regex pattern (Pattern instance) that produced the match.

## Accessing the Original Pattern

This basic example shows how to access the original pattern from a match.

basic_re_access.py
  

#!/usr/bin/python

import re

text = "The year is 2023"
pattern = re.compile(r'\d{4}')

match = pattern.search(text)
if match:
    print("Matched text:", match.group())
    print("Original pattern:", match.re.pattern)

This demonstrates accessing the original pattern string through the
Match.re attribute. The pattern property of
the regex object contains the original pattern string.

match = pattern.search(text)

We perform a search operation that returns a match object if successful.
The match object contains information about where the pattern was found.

print("Original pattern:", match.re.pattern)

Here we access the original pattern string through the match object's
re attribute. This shows the exact pattern that produced
the match.

## Inspecting Pattern Flags

The Match.re attribute also lets you inspect the flags used.

flag_inspection.py
  

#!/usr/bin/python

import re

text = "Case INSENSITIVE match"
pattern = re.compile(r'insensitive', re.IGNORECASE)

match = pattern.search(text)
if match:
    print("Matched text:", match.group())
    print("Pattern flags:", match.re.flags)
    print("IGNORECASE flag set?", bool(match.re.flags &amp; re.IGNORECASE))

This example shows how to check which flags were used in the original
pattern. The flags property contains all active flags.

## Reusing the Original Pattern

You can reuse the original pattern from a match for further operations.

pattern_reuse.py
  

#!/usr/bin/python

import re

text = "First match: apple, second match: orange"
pattern = re.compile(r'\b\w{5}\b')  # Match 5-letter words

first_match = pattern.search(text)
if first_match:
    print("First match:", first_match.group())
    
    # Use the same pattern to find next match
    second_match = first_match.re.search(text, first_match.end())
    if second_match:
        print("Second match:", second_match.group())

This demonstrates how to reuse the original pattern from a match object
to perform additional searches. The pattern remains accessible through
the match's re attribute.

## Debugging with Match.re

The Match.re attribute is useful for debugging regex patterns.

debugging.py
  

#!/usr/bin/python

import re

def debug_match(match):
    if match:
        print("Match successful!")
        print("Matched text:", match.group())
        print("Pattern used:", match.re.pattern)
        print("Pattern flags:", match.re.flags)
    else:
        print("No match found")

text = "Debug this pattern: 123-456-7890"
pattern = re.compile(r'\d{3}-\d{3}-\d{4}')

match = pattern.search(text)
debug_match(match)

This example shows how Match.re can help debug regex
operations by providing access to the original pattern and flags.

## Dynamic Pattern Inspection

You can dynamically inspect and modify behavior based on the original pattern.

dynamic_inspection.py
  

#!/usr/bin/python

import re

def process_match(match):
    original_pattern = match.re.pattern
    
    if 'email' in original_pattern:
        return "[EMAIL REDACTED]"
    elif 'phone' in original_pattern:
        return "[PHONE REDACTED]"
    else:
        return match.group()

text = "Contact: email@example.com or 555-123-4567"
email_pattern = re.compile(r'email\s*:\s*(\S+@\S+)')
phone_pattern = re.compile(r'phone\s*:\s*(\d{3}-\d{3}-\d{4})')

email_match = email_pattern.search(text)
if email_match:
    print(process_match(email_match))

phone_match = phone_pattern.search(text)
if phone_match:
    print(process_match(phone_match))

This advanced example demonstrates using Match.re to make
processing decisions based on the original pattern that produced a match.

## Comparing Patterns

You can compare patterns from different matches using the Match.re attribute.

pattern_comparison.py
  

#!/usr/bin/python

import re

text = "apple orange banana"
fruit_pattern = re.compile(r'\b\w{5}\b')
color_pattern = re.compile(r'\b\w{6}\b')

fruit_match = fruit_pattern.search(text)
color_match = color_pattern.search(text)

if fruit_match and color_match:
    print("Same pattern used?", fruit_match.re is color_match.re)
    print("Fruit pattern:", fruit_match.re.pattern)
    print("Color pattern:", color_match.re.pattern)

This example shows how to compare whether two matches came from the same
original pattern by comparing their re attributes.

## Accessing Pattern Methods

Through Match.re, you can access all pattern object methods.

pattern_methods.py
  

#!/usr/bin/python

import re

text = "Sample text with 3 numbers: 1, 2, and 3"
pattern = re.compile(r'\d')

match = pattern.search(text)
if match:
    print("First number:", match.group())
    
    # Use findall from the original pattern
    all_numbers = match.re.findall(text)
    print("All numbers:", all_numbers)

This demonstrates accessing pattern methods like findall
through the Match.re attribute after an initial match.

## Best Practices

When working with Match.re, consider these best practices:

- Use it for debugging to verify which pattern produced a match

- Access pattern flags when match behavior needs verification

- Reuse the pattern for subsequent matches when appropriate

- Document pattern dependencies when storing match objects

- Prefer direct pattern references when possible for clarity

## Performance Considerations

Accessing Match.re has minimal overhead since it's just
a reference to an existing object. However, unnecessary pattern
inspection should be avoided in performance-critical code.

The attribute is most valuable in debugging scenarios or when building
dynamic regex processing systems that need to inspect match origins.

## Source

[Python Match.re documentation](https://docs.python.org/3/library/re.html#re.Match.re)

This tutorial covered the essential aspects of Python's Match.re
attribute. Understanding this feature enables more advanced regex debugging
and dynamic pattern processing in your Python applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).