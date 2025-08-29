+++
title = "Python truncate Function"
date = 2025-08-29T20:11:05.846+01:00
draft = false
description = "Complete guide to Python's truncate function covering file operations, modes, and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python truncate Function

Last modified March 26, 2025

This comprehensive guide explores Python's truncate function, a
method for resizing files in Python. We'll cover basic usage, file positioning,
context managers, and practical applications. Through examples, you'll master
file truncation operations in Python.

## Basic Definition

The truncate method resizes a file to the given number of bytes.
If no size is specified, it uses the current file position. The method is
available on file objects opened in write or append modes.

Truncation can either shrink or expand a file. When expanding, the new area is
filled with null bytes. The operation affects the physical file on disk
immediately when using with statement or after calling flush.

## Basic Truncation

The simplest use of truncate resizes a file to the specified
size in bytes. This example shows how to truncate a file to 100 bytes.

basic_truncate.py
  

# Open a file for writing
with open('example.txt', 'w') as file:
    file.write('This is some sample text for demonstration.')
    
# Truncate the file to 10 bytes
with open('example.txt', 'r+') as file:
    file.truncate(10)
    print(file.read())  # Output: 'This is so'

This code first creates a file with sample text, then truncates it to 10 bytes.
The r+ mode allows both reading and writing. After truncation,
only the first 10 bytes remain in the file.

Note that truncate operates based on byte count, not character count. For
multibyte encodings like UTF-8, this might split characters in the middle.
Always consider the file encoding when working with text files.

## Truncate at Current Position

When called without arguments, truncate uses the current file
position as the new size. This example demonstrates position-based truncation.

position_truncate.py
  

# Create a sample file
with open('data.txt', 'w') as file:
    file.write('Line 1\nLine 2\nLine 3\nLine 4\n')

# Truncate after second line
with open('data.txt', 'r+') as file:
    file.readline()  # Read first line
    file.readline()  # Read second line
    file.truncate()  # Truncate at current position
    file.seek(0)
    print(file.read())  # Output: 'Line 1\nLine 2\n'

This example reads two lines from the file, then truncates at that position.
The remaining content after truncation contains only the first two lines.
The seek(0) call moves back to the start for reading.

This technique is useful for processing files where you want to remove content
after a certain point. It's commonly used in log rotation and data processing
scenarios.

## Extending a File with Truncate

truncate can also extend files by specifying a size larger than
the current file size. The new space is filled with null bytes.

extend_file.py
  

# Create a small file
with open('small.txt', 'w') as file:
    file.write('abc')

# Extend the file to 10 bytes
with open('small.txt', 'r+') as file:
    file.truncate(10)
    print(f"File size: {file.tell()} bytes")
    file.seek(0)
    content = file.read()
    print(f"Content: {content!r}")  # Output: 'abc\x00\x00\x00\x00\x00\x00\x00'

This code creates a 3-byte file, then extends it to 10 bytes. The new space
contains null bytes (\x00). The !r in the format
string shows the raw representation of the content.

File extension with truncate is useful when pre-allocating space for files
that will be filled later. It can improve performance by ensuring contiguous
disk space allocation.

## Truncate with Binary Files

The truncate method works equally well with binary files. This
example shows truncation of a binary file at a specific position.

binary_truncate.py
  

# Create a binary file with sample data
with open('data.bin', 'wb') as file:
    file.write(bytes(range(100)))  # 0 to 99

# Truncate to first 50 bytes
with open('data.bin', 'r+b') as file:
    file.truncate(50)
    print(f"File size: {file.tell()} bytes")
    content = file.read()
    print(f"First byte: {content[0]}, Last byte: {content[-1]}")
    # Output: First byte: 0, Last byte: 49

This example creates a binary file with 100 bytes (values 0-99), then truncates
it to 50 bytes. The r+b mode opens the file for both reading and
writing in binary mode. Binary mode is essential for non-text files.

When working with binary files, truncation is often used to remove corrupted
data or to extract specific portions of a file. The byte-level precision makes
it ideal for binary formats.

## Truncate in Append Mode

While typically used with read-write modes, truncate can also be
used in append mode (a or a+). This example shows
how to combine appending and truncation.

append_truncate.py
  

# Create initial file
with open('log.txt', 'w') as file:
    file.write('Log entry 1\nLog entry 2\nLog entry 3\n')

# Append and then truncate
with open('log.txt', 'a+') as file:
    file.write('Log entry 4\n')
    file.seek(0)  # Move to start for truncation
    file.truncate(20)  # Keep first 20 bytes
    file.seek(0)
    print(file.read())  # Output: 'Log entry 1\nLog ent'

This example demonstrates that even in append mode, you can seek to other
positions and perform truncation. The a+ mode allows both
appending and reading, though writes always go to the end initially.

This technique is useful for log rotation where you want to add new entries
but limit the total file size. Remember that seeking in append mode requires
a+ rather than just a.

## Best Practices

- **Use context managers:** Always prefer with statements for file handling

- **Backup important files:** Truncation is destructive - consider backups

- **Check file positions:** Verify positions before truncating without size parameter

- **Handle exceptions:** Catch IOError/OSError for file operations

- **Consider encoding:** For text files, be aware of multi-byte characters

## Source References

- [Python truncate Documentation](https://docs.python.org/3/library/io.html#io.IOBase.truncate)

- [Python File Methods](https://docs.python.org/3/tutorial/inputoutput.html#methods-of-file-objects)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).