+++
title = "Python re.sub() Function"
date = 2025-08-29T20:10:15.127+01:00
draft = false
description = "Comprehensive tutorial on Python's re.sub function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.sub() Function

last modified April 20, 2025

## Introduction to re.sub

The re.sub function is a powerful tool in Python's re
module for performing substitutions using regular expressions. It searches
for patterns in strings and replaces them with specified text.

This function is essential for text processing tasks like data cleaning,
formatting, and transformation. It offers more flexibility than simple
string replacement methods.

re.sub can use both literal replacements and callbacks for
dynamic substitutions. It supports flags to modify matching behavior and
can reference matched groups in replacements.

## Basic Syntax

The basic syntax of re.sub has three required parameters:

re.sub(pattern, repl, string, count=0, flags=0)

pattern is the regex to match. repl is the
replacement string. string is the input text to process.

Optional count limits replacements. flags
modify matching behavior. The function returns the modified string.

## Basic Text Replacement

Let's start with a simple example replacing colors in a sentence.

basic_sub.py
  

#!/usr/bin/python

import re

text = "The sky is blue and the grass is green"
result = re.sub(r'blue', 'gray', text)

print(result)

This replaces all occurrences of 'blue' with 'gray' in the input text.
The replacement is case-sensitive by default.

result = re.sub(r'blue', 'gray', text)

The first argument is the pattern to match. The second is the replacement
string. The third is the text to process.

## Using Regular Expression Patterns

re.sub shines when using regex patterns for matching.

regex_pattern.py
  

#!/usr/bin/python

import re

text = "Order 12345 shipped, Order 67890 processing"
result = re.sub(r'Order \d+', 'Order XXXX', text)

print(result)

This replaces all order numbers with 'XXXX'. The \d+ pattern
matches one or more digits.

The example demonstrates how regex patterns can match variable text for
consistent replacements.

## Referencing Matched Groups

We can reference matched groups in the replacement string.

group_reference.py
  

#!/usr/bin/python

import re

text = "2023-04-20"
result = re.sub(r'(\d{4})-(\d{2})-(\d{2})', r'\2/\3/\1', text)

print(result)

This reformats a date from YYYY-MM-DD to MM/DD/YYYY. Parentheses create
capture groups referenced as \1, \2, etc.

r'(\d{4})-(\d{2})-(\d{2})'

The pattern captures year, month, and day as separate groups. Each
\d matches a digit, with {n} specifying quantity.

## Using a Replacement Function

For dynamic replacements, we can use a callback function.

callback_function.py
  

#!/usr/bin/python

import re

def double_match(match):
    return str(int(match.group()) * 2)

text = "Scores: 10, 20, 30"
result = re.sub(r'\d+', double_match, text)

print(result)

This doubles all numbers in the text. The callback receives a match object
and returns the replacement string.

The function approach enables complex transformations based on matched
content. It's more flexible than static replacement strings.

## Limiting Replacements with Count

The count parameter limits how many substitutions occur.

count_parameter.py
  

#!/usr/bin/python

import re

text = "apple apple apple apple"
result = re.sub(r'apple', 'orange', text, count=2)

print(result)

This replaces only the first two occurrences of 'apple'. The remaining
matches stay unchanged.

Controlling replacement count is useful when you want partial substitutions
or to process only certain matches.

## Case-Insensitive Replacement

Flags like re.IGNORECASE modify matching behavior.

case_insensitive.py
  

#!/usr/bin/python

import re

text = "Python is GREAT, really great!"
result = re.sub(r'great', 'awesome', text, flags=re.IGNORECASE)

print(result)

This replaces all case variants of 'great' with 'awesome'. The flag makes
the match case-insensitive.

Flags can be combined using bitwise OR (|) when multiple behaviors are
needed simultaneously.

## Advanced: Swapping Words

Here's a more complex example swapping word positions.

word_swap.py
  

#!/usr/bin/python

import re

text = "John Doe, Jane Smith, Mike Johnson"
result = re.sub(r'(\w+) (\w+)', r'\2, \1', text)

print(result)

This swaps first and last names, adding a comma between them. The
\w+ pattern matches word characters.

The example shows how regex groups can restructure text in powerful ways.
This technique is useful for data reformatting.

## Best Practices

When using re.sub, consider these best practices:

- Use raw strings (r'') for patterns to avoid escaping issues

- Pre-compile patterns with re.compile if reused frequently

- Be specific with patterns to avoid unintended matches

- Use callback functions for complex replacement logic

- Test patterns thoroughly with various input cases

## Performance Considerations

re.sub performance depends on pattern complexity and input
size. Simple patterns on small texts are fast, while complex patterns
on large texts may need optimization.

For repeated substitutions, pre-compiling the pattern with
re.compile improves performance. Avoid unnecessary
capturing groups when possible.

## Source

[Python re.sub() documentation](https://docs.python.org/3/library/re.html#re.sub)

This tutorial covered the essential aspects of Python's re.sub
function. Mastering pattern substitution will enhance your text processing
capabilities significantly.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).