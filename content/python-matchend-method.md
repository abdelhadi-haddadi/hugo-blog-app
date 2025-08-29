+++
title = "Python Match.end Method"
date = 2025-08-29T20:10:09.460+01:00
draft = false
description = "Comprehensive tutorial on Python's Match.end method with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Match.end Method

last modified April 20, 2025

## Introduction to Match.end

The Match.end method is part of Python's re module. 
It returns the ending position of a match found by a regular expression.

This method is available on match objects returned by re.search,
re.match, and other regex operations. It helps locate matches
within strings.

The method can take an optional group number parameter. Without it, it
returns the end of the entire match. With a group number, it returns the
end of that specific group.

## Basic Syntax

The syntax for Match.end is straightforward:

match.end([group])

The optional group defaults to 0 (the entire match). It must
be within the range of defined groups in the pattern.

## Basic Match.end Usage

Let's start with a simple example of finding a word's end position.

basic_end.py
  

#!/usr/bin/python

import re

text = "The quick brown fox jumps over the lazy dog"
pattern = re.compile(r'fox')

match = pattern.search(text)
if match:
    print(f"Found 'fox' ending at position {match.end()}")

This example finds the word 'fox' and prints its ending position. The
end method gives the index right after the match.

match = pattern.search(text)

We search for our pattern in the text. This returns a match object if
successful, which contains match position information.

print(f"Found 'fox' ending at position {match.end()}")

The end method returns the index where the match ends.
Remember Python uses 0-based indexing.

## Using Match.end with Groups

We can get the end position of specific capture groups in a pattern.

group_end.py
  

#!/usr/bin/python

import re

text = "Date: 2023-12-25"
pattern = re.compile(r'Date: (\d{4})-(\d{2})-(\d{2})')

match = pattern.search(text)
if match:
    print(f"Full match ends at: {match.end()}")
    print(f"Year ends at: {match.end(1)}")
    print(f"Month ends at: {match.end(2)}")
    print(f"Day ends at: {match.end(3)}")

This shows how to get end positions for both the full match and specific
groups. Group 0 is always the full match.

## Handling Optional Groups

When working with optional groups, we need to check if they matched.

optional_groups.py
  

#!/usr/bin/python

import re

text = "Color: blue"
pattern = re.compile(r'Color: (\w+)(?:, shade: (\w+))?')

match = pattern.search(text)
if match:
    print(f"Color ends at: {match.end(1)}")
    if match.group(2):
        print(f"Shade ends at: {match.end(2)}")
    else:
        print("No shade specified")

This demonstrates safe handling of optional groups. We check if group 2
exists before calling end(2) to avoid exceptions.

## Match.end in String Slicing

The end position is useful for extracting text after a match.

slicing.py
  

#!/usr/bin/python

import re

text = "Error: 404 - Page not found"
pattern = re.compile(r'Error: \d+ - ')

match = pattern.search(text)
if match:
    error_message = text[match.end():]
    print(f"Error message: '{error_message}'")

Here we use end to slice the string and get everything
after the error code prefix. This is a common use case for the method.

## Multiple Matches with finditer

When processing multiple matches, end helps track positions.

finditer.py
  

#!/usr/bin/python

import re

text = "apple 123, banana 456, cherry 789"
pattern = re.compile(r'(\w+) (\d+)')

for match in pattern.finditer(text):
    print(f"Word '{match.group(1)}' ends at {match.end(1)}")
    print(f"Number '{match.group(2)}' ends at {match.end(2)}")

This iterates through all matches, showing how end works
with each one. The positions are relative to the original string.

## Match.end vs Match.endpos

It's important to distinguish between end and endpos.

end_vs_endpos.py
  

#!/usr/bin/python

import re

text = "Search this string"
pattern = re.compile(r'this')

match = pattern.search(text, 0, 10)  # Only search first 10 chars
if match:
    print(f"Match ends at: {match.end()}")  # Position in string
    print(f"Search ended at: {match.endpos}")  # 10 from search params

end gives the match's end position, while endpos
shows where the search stopped. They serve different purposes.

## Error Handling

We should handle cases where groups don't exist or matches fail.

error_handling.py
  

#!/usr/bin/python

import re

text = "No numbers here"
pattern = re.compile(r'(\d+)')

match = pattern.search(text)
if not match:
    print("No match found")
else:
    try:
        print(match.end(1))
    except IndexError:
        print("Group 1 didn't participate in match")

This shows proper error handling when dealing with potential missing
matches or groups. Always check for matches before using end.

## Best Practices

When using Match.end, follow these best practices:

- Always check if a match was found before calling end

- Verify group existence before calling end(group)

- Remember string indices are 0-based in Python

- Use end with string slicing for text extraction

- Combine with start for complete match positions

## Performance Considerations

The end method is very efficient as it simply returns
a pre-calculated value from the match object. There's no performance
penalty for using it.

However, repeatedly calling it on the same match is unnecessary since
the value doesn't change. Store it in a variable if you need to use
it multiple times.

## Source

[Python Match.end() documentation](https://docs.python.org/3/library/re.html#re.Match.end)

This tutorial covered the essential aspects of Python's Match.end
method. Mastering match positions will help you work more effectively
with regular expressions in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).