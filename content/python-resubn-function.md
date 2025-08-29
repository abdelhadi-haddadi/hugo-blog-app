+++
title = "Python re.subn() Function"
date = 2025-08-29T20:10:15.108+01:00
draft = false
description = "Comprehensive tutorial on Python's re.subn function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.subn() Function

last modified April 20, 2025

## Introduction to re.subn

The re.subn function is a powerful tool in Python's re
module for pattern substitution. It works similarly to re.sub but
returns additional information about substitutions made.

This function performs regex-based search-and-replace operations while counting
how many substitutions were performed. It returns a tuple containing the modified
string and the substitution count.

re.subn is particularly useful when you need to know how many
replacements occurred during text processing. It shares the same parameters
as re.sub but provides extra feedback.

## Basic Syntax

The syntax for re.subn is similar to re.sub:

re.subn(pattern, repl, string, count=0, flags=0)

Parameters include the regex pattern, replacement string, input text, optional
maximum substitutions, and optional flags. The return value is a tuple.

## Basic Substitution with Count

This example demonstrates the fundamental usage of re.subn.

basic_subn.py
  

#!/usr/bin/python

import re

text = "The rain in Spain falls mainly in the plain"
result = re.subn(r'ain', 'ane', text)

print(f"Modified text: {result[0]}")
print(f"Substitutions made: {result[1]}")

This replaces all occurrences of 'ain' with 'ane' and reports the count.
The result tuple contains the modified string and number of substitutions.

result = re.subn(r'ain', 'ane', text)

The function scans the text for the pattern 'ain' and replaces each match
with 'ane'. It returns both the new string and replacement count.

print(f"Substitutions made: {result[1]}")

The second element of the tuple (result[1]) gives the exact
number of substitutions performed in the operation.

## Limiting Substitutions with Count

The count parameter limits how many replacements are made.

limited_subn.py
  

#!/usr/bin/python

import re

text = "apple apple apple apple"
result = re.subn(r'apple', 'orange', text, count=2)

print(f"Modified text: {result[0]}")
print(f"Substitutions made: {result[1]}")

This example replaces only the first two occurrences of 'apple' despite
four being present. The count parameter controls the maximum replacements.

## Using Compiled Patterns

re.subn works efficiently with precompiled patterns.

compiled_subn.py
  

#!/usr/bin/python

import re

text = "User1: 100, User2: 200, User3: 300"
pattern = re.compile(r'\d+')
result = pattern.subn('XXX', text)

print(f"Modified text: {result[0]}")
print(f"Numbers replaced: {result[1]}")

Here we compile a pattern matching digits, then use it with subn.
This approach is efficient when performing multiple substitutions.

## Case-Insensitive Substitution

Flags like re.IGNORECASE modify matching behavior.

case_insensitive.py
  

#!/usr/bin/python

import re

text = "Python is FUN, fun, FUN!"
result = re.subn(r'fun', 'great', text, flags=re.IGNORECASE)

print(f"Modified text: {result[0]}")
print(f"Replacements: {result[1]}")

The re.IGNORECASE flag makes the substitution case-insensitive.
All variations of 'fun' are replaced regardless of capitalization.

## Using Replacement Functions

re.subn can use functions to determine replacements dynamically.

function_replacement.py
  

#!/usr/bin/python

import re

def double_match(match):
    return str(int(match.group()) * 2)

text = "Scores: 10, 20, 30"
result = re.subn(r'\d+', double_match, text)

print(f"Modified text: {result[0]}")
print(f"Numbers doubled: {result[1]}")

This example doubles all numeric values in the text. The replacement function
receives match objects and returns the replacement string.

## Complex Pattern Substitution

re.subn handles complex patterns with groups and backreferences.

complex_pattern.py
  

#!/usr/bin/python

import re

text = "2023-04-20, 2024-05-21, 2025-06-22"
result = re.subn(r'(\d{4})-(\d{2})-(\d{2})', r'\2/\3/\1', text)

print(f"Modified dates: {result[0]}")
print(f"Dates reformatted: {result[1]}")

This reformats dates from YYYY-MM-DD to MM/DD/YYYY format. Backreferences
(\1, \2, etc.) access captured groups.

## Multiple Patterns with Flags

Combine multiple flags for sophisticated matching behavior.

multi_flag.py
  

#!/usr/bin/python

import re

text = "Start\nmiddle\nEnd"
result = re.subn(r'^[a-z]+', 'WORD', text, flags=re.IGNORECASE|re.MULTILINE)

print(f"Modified text: {result[0]}")
print(f"Words replaced: {result[1]}")

This uses both re.IGNORECASE and re.MULTILINE flags.
It replaces words at the start of each line regardless of case.

## Best Practices

When using re.subn, consider these recommendations:

- Use raw strings for patterns to avoid escaping backslashes

- Precompile patterns when performing multiple substitutions

- Check the substitution count to verify operation success

- Use functions for dynamic replacement logic

- Combine flags with bitwise OR for multiple behaviors

## Performance Considerations

re.subn has similar performance characteristics to re.sub.
The additional count reporting adds negligible overhead.

For large texts or complex patterns, precompiling regexes can significantly
improve performance, especially in loops or repeated operations.

## Source

[Python re.subn() documentation](https://docs.python.org/3/library/re.html#re.subn)

This tutorial covered the essential aspects of Python's re.subn
function. Mastering this tool will enhance your text processing capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).