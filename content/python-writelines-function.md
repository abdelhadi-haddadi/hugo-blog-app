+++
title = "Python writelines Function"
date = 2025-08-29T20:11:13.289+01:00
draft = false
description = "Complete guide to Python's writelines function covering usage, examples, and best practices for writing multiple lines to files."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python writelines Function

Last modified March 26, 2025

This comprehensive guide explores Python's writelines function, a
method for writing multiple lines to files efficiently. We'll cover its usage,
differences from write, common patterns, and best practices.
Through practical examples, you'll master writing sequences to files in Python.

## Basic Definition

The writelines method writes a sequence of strings to a file. It
does not add newline characters automatically. The sequence can be any iterable
containing strings. Unlike write, it handles multiple strings at
once.

This method is particularly useful when you have a list of strings to write.
It's more efficient than multiple write calls in a loop. However,
you must manage newlines manually if needed between elements.

## Basic writelines Example

This example demonstrates the simplest use of writelines to write
a list of strings to a file. Notice we include newline characters explicitly.

basic_writelines.py
  

lines = ['First line\n', 'Second line\n', 'Third line\n']

with open('output.txt', 'w') as file:
    file.writelines(lines)

This code creates or overwrites 'output.txt' and writes three lines. Each string
in the list includes a newline character. Without these, all text would appear
on one line. The with statement ensures proper file closure.

The writelines method doesn't return any value. It simply writes
the sequence elements consecutively. The method is faster than writing in a loop
because it makes fewer system calls.

## Writing Without Explicit Newlines

This example shows what happens when you omit newline characters. The strings
are written consecutively without separation.

no_newlines.py
  

items = ['apple', 'banana', 'cherry']

with open('fruits.txt', 'w') as file:
    file.writelines(items)

The resulting file will contain "applebananacherry" without any spaces or
newlines. This demonstrates that writelines does exactly what its
name suggests - writes lines without adding anything extra.

To add separators, you could use a generator expression with newlines or map
the list to add newlines. This behavior differs from some other languages'
similar methods which might add newlines automatically.

## Using Generator Expressions

Generator expressions can efficiently transform data before writing. This
example adds line numbers to each line during writing.

generator_writelines.py
  

data = ['red', 'green', 'blue']

with open('colors.txt', 'w') as file:
    file.writelines(f"{i+1}: {color}\n" for i, color in enumerate(data))

This code writes numbered lines to the file. The generator expression creates
formatted strings on the fly without creating an intermediate list. This is
memory-efficient for large datasets.

The f-string formats each line with its index (starting at 1) and value. The
writelines method consumes the generator and writes the results.
This pattern is common for transforming data during file output.

## Writing from a File to Another

This example reads lines from one file and writes them to another using
writelines. It demonstrates efficient file-to-file copying.

file_copy_writelines.py
  

with open('source.txt', 'r') as source:
    with open('destination.txt', 'w') as dest:
        dest.writelines(source)

This code copies 'source.txt' to 'destination.txt'. The file object is an
iterator yielding lines, which writelines consumes directly.
This approach is memory-efficient as it doesn't load the entire file.

Note that this preserves the original line endings. For binary data or precise
copying, use binary mode. This pattern works well for line-oriented text
processing and transformations between files.

## Filtering Before Writing

This example demonstrates filtering lines before writing. Only lines containing
'a' are written to the output file.

filter_writelines.py
  

lines = ['apple\n', 'banana\n', 'cherry\n', 'date\n']

with open('filtered.txt', 'w') as file:
    file.writelines(line for line in lines if 'a' in line)

The output file will contain only 'apple' and 'banana' lines. The generator
expression filters the sequence before writing. This pattern is powerful for
selective output without temporary lists.

You can combine multiple conditions in the filter. This approach is memory-
efficient for large datasets as it processes items one at a time without
storing the entire filtered collection.

## Best Practices

- **Manage newlines explicitly:** Add \n if you need line separation

- **Use generators for large data:** Avoid creating large temporary lists

- **Prefer with statements:** Ensure proper file handling and closure

- **Consider memory efficiency:** writelines is good for streaming data

- **Combine with transformations:** Use generator expressions for on-the-fly processing

## Source References

- [Python writelines Documentation](https://docs.python.org/3/library/io.html#io.IOBase.writelines)

- [Python File I/O Tutorial](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).