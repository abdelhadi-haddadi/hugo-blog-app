+++
title = "Python re.split Function"
date = 2025-08-29T20:10:14.000+01:00
draft = false
description = "Comprehensive tutorial on Python's re.split function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.split Function

last modified April 20, 2025

## Introduction to re.split

The re.split function is a powerful tool in Python's re
module. It splits strings using regular expressions as delimiters.

Unlike str.split, re.split offers more flexible
splitting based on patterns rather than fixed strings. It handles complex
delimiter cases efficiently.

The function returns a list of substrings obtained by splitting the input
string at each match of the pattern. Empty matches result in empty strings.

## Basic Syntax

The syntax for re.split is:

re.split(pattern, string, maxsplit=0, flags=0)

pattern is the regex to split on. string is the input
text. maxsplit limits splits, and flags modifies
pattern behavior.

## Basic String Splitting

Let's start with a simple example splitting on whitespace.

basic_split.py
  

#!/usr/bin/python

import re

text = "apple banana cherry date"
result = re.split(r'\s+', text)

print("Split result:", result)

This splits the string at each sequence of whitespace characters.
The \s+ pattern matches one or more whitespace chars.

result = re.split(r'\s+', text)

The re.split function takes the pattern and input string.
It returns a list of substrings between matches.

## Splitting on Multiple Delimiters

re.split can handle multiple delimiter types in one operation.

multi_delimiter.py
  

#!/usr/bin/python

import re

text = "apple,banana;cherry date:fig"
result = re.split(r'[,;:\s]+', text)

print("Split result:", result)

This splits on commas, semicolons, colons, or whitespace. The character
class [,;:\s] matches any of these delimiters.

## Limiting Splits with maxsplit

The maxsplit parameter controls how many splits occur.

maxsplit_example.py
  

#!/usr/bin/python

import re

text = "one two three four five six"
result = re.split(r'\s+', text, maxsplit=2)

print("Limited split:", result)

With maxsplit=2, only the first two whitespace sequences
trigger splits. The rest of the string remains intact in the last element.

## Splitting with Capture Groups

When patterns contain capture groups, the groups are included in the result.

capture_groups.py
  

#!/usr/bin/python

import re

text = "appleXbananaYcherryZdate"
result = re.split(r'([XYZ])', text)

print("Split with delimiters:", result)

The parentheses create a capture group. The matched delimiters (X, Y, Z)
appear in the result list between the split segments.

## Splitting on Word Boundaries

Word boundaries (\b) provide another useful splitting point.

word_boundaries.py
  

#!/usr/bin/python

import re

text = "HelloWorldThisIsCamelCase"
result = re.split(r'(?&lt;=[a-z])(?=[A-Z])', text)

print("CamelCase split:", result)

This splits camelCase words by looking for lowercase-to-uppercase
transitions. The lookbehind and lookahead assertions don't consume chars.

## Splitting While Keeping Delimiters

Using lookahead/lookbehind assertions preserves delimiters in the output.

keep_delimiters.py
  

#!/usr/bin/python

import re

text = "20+30-40*50/60"
result = re.split(r'(?&lt;=[+*/-])|(?=[+*/-])', text)

print("Split with operators:", result)

This splits mathematical expressions while keeping operators. The pattern
matches positions before or after operators without consuming them.

## Splitting with Flags

Flags can modify splitting behavior, like case-insensitive matching.

flags_example.py
  

#!/usr/bin/python

import re

text = "appleBananaCHERRYdateFIG"
result = re.split(r'[A-Z]+', text, flags=re.IGNORECASE)

print("Case-insensitive split:", result)

The re.IGNORECASE flag makes the pattern match uppercase
and lowercase letters equally when splitting.

## Best Practices

When using re.split, consider these best practices:

- Use raw strings (r'') for patterns to avoid escaping issues

- Precompile patterns with re.compile if reused frequently

- Be mindful of capture groups as they affect the output

- Consider maxsplit for performance with large strings

- Test edge cases with empty strings or no matches

## Performance Considerations

For simple splits with fixed strings, str.split is faster.
re.split shines when pattern matching is needed.

Compiling patterns with re.compile improves performance when
splitting repeatedly. The compilation overhead is amortized over multiple uses.

## Source

[Python re.split() documentation](https://docs.python.org/3/library/re.html#re.split)

This tutorial covered the essential aspects of Python's re.split
function. Mastering regex-based splitting enables flexible string processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).