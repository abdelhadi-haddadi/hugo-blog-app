+++
title = "Python re.finditer() Function"
date = 2025-08-29T20:10:08.352+01:00
draft = false
description = "Comprehensive tutorial on Python's re.finditer function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.finditer() Function

last modified April 20, 2025

## Introduction to re.finditer

The re.finditer function is a powerful tool in Python's
re module for pattern matching. It returns an iterator
yielding match objects for all non-overlapping matches.

Unlike re.findall which returns strings, finditer
provides match objects with detailed match information. This includes
positions and captured groups.

The function is memory efficient for large texts as it processes matches
lazily. It's ideal when you need match details rather than just the text.

## Basic Syntax

The syntax for re.finditer is straightforward:

re.finditer(pattern, string, flags=0)

The pattern is the regular expression to match. The
string is the text to search. Optional flags
modify matching behavior.

## Basic Pattern Matching

Let's start with a simple example of finding all vowels in text.

basic_finditer.py
  

#!/usr/bin/python

import re

text = "The quick brown fox jumps over the lazy dog"
pattern = r'[aeiou]'

for match in re.finditer(pattern, text):
    print(f"Found '{match.group()}' at position {match.start()}")

This example finds all vowels in the text and prints each with its position. The
match object provides group and start methods.

pattern = r'[aeiou]'

This pattern matches any single vowel character. The square brackets
define a character class.

for match in re.finditer(pattern, text):

The finditer call returns an iterator of match objects.
We loop through them to process each match.

## Finding Words with Specific Patterns

Let's find all words starting with 'q' or 'j' in a text.

word_patterns.py
  

#!/usr/bin/python

import re

text = "The quick brown fox jumps over the lazy dog"
pattern = r'\b[qj]\w+\b'

for match in re.finditer(pattern, text, re.IGNORECASE):
    print(f"Found word: {match.group()}")
    print(f"Start: {match.start()}, End: {match.end()}")

This uses word boundaries (\b) to match whole words. The
\w+ matches subsequent word characters.

The re.IGNORECASE flag makes the match case-insensitive.
Match objects provide start and end positions.

## Extracting Email Addresses

Here's how to extract email addresses from text with detailed positions.

emails.py
  

#!/usr/bin/python

import re

text = "Contact us at support@example.com or sales@example.org"
pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

for match in re.finditer(pattern, text):
    print(f"Email: {match.group()}")
    print(f"Position: {match.span()}")
    print(f"Full match: {text[match.start():match.end()]}")

This pattern matches standard email formats. The span
method returns a tuple of (start, end) positions.

We demonstrate accessing the matched text both through match.group()
and by slicing the original string.

## Finding Dates with Groups

This example extracts dates while capturing day, month, and year groups.

dates.py
  

#!/usr/bin/python

import re

text = "Dates: 2023-12-25, 2024-01-01, 2024-02-14"
pattern = r'(\d{4})-(\d{2})-(\d{2})'

for match in re.finditer(pattern, text):
    print(f"Full date: {match.group(0)}")
    print(f"Year: {match.group(1)}, Month: {match.group(2)}")
    print(f"Day: {match.group(3)} at {match.start()}")

Parentheses create capturing groups. Group 0 is always the full match.
Subsequent groups match the parenthesized subpatterns.

This is useful for structured data extraction where you need both
the full match and its components.

## Overlapping Matches with Lookahead

finditer normally finds non-overlapping matches. Here's
how to find overlaps using lookahead.

overlapping.py
  

#!/usr/bin/python

import re

text = "abracadabra"
pattern = r'(?=(\w{3}))'  # Lookahead for 3-letter sequences

for match in re.finditer(pattern, text):
    print(f"Found: {match.group(1)} at {match.start()}")

The positive lookahead (?=...) allows finding overlapping
matches. The actual match is captured in group 1.

This technique is useful for finding all possible n-grams or sliding
windows in text.

## Multiline Text Processing

This example demonstrates processing a multiline text with line numbers.

multiline.py
  

#!/usr/bin/python

import re

text = """First line
Second line with IMPORTANT data
Third line
Fourth line with CRITICAL information"""

pattern = r'(IMPORTANT|CRITICAL)'
lines = text.splitlines()

for match in re.finditer(pattern, text):
    line_no = text[:match.start()].count('\n') + 1
    print(f"Found '{match.group()}' in line {line_no}:")
    print(f"&gt; {lines[line_no-1]}")

We calculate line numbers by counting newlines before the match.
The actual line content is retrieved from a pre-split list.

This approach is useful for log processing or document analysis where
line context matters.

## Performance Considerations

When using re.finditer with large texts, consider these
performance tips:

- Pre-compile patterns if reused frequently (re.compile)

- Use simpler patterns when possible - complex regexes are slower

- Process matches as they're found rather than collecting all first

- Consider string methods for simple fixed-string searches

- Be mindful of catastrophic backtracking in complex patterns

## Source

[Python re.finditer() documentation](https://docs.python.org/3/library/re.html#re.finditer)

This tutorial covered the essential aspects of Python's re.finditer
function. Mastering this iterator-based approach will make your pattern
matching code more efficient and flexible.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).