+++
title = "Python seek Function"
date = 2025-08-29T20:10:19.772+01:00
draft = false
description = "Complete guide to Python's seek function covering file positioning, random access, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python seek Function

Last modified March 26, 2025

This comprehensive guide explores Python's seek function, a
powerful method for file positioning in Python. We'll cover basic usage,
positioning modes, practical examples, and best practices. Through detailed
examples, you'll master random file access in Python.

## Basic Definitions

The seek function changes the current file position in a file
stream. It takes two parameters: offset (position) and whence (reference
point). The function returns the new absolute position in the file.

File positions are measured in bytes from the start of the file. The
whence parameter determines the reference point: 0 (start), 1
(current position), or 2 (end). In text files, only seeks relative to the
start are allowed.

## Basic seek Usage

The simplest use of seek moves to a specific position from the
start of the file. This example demonstrates reading from different positions.

basic_seek.py
  

# Basic seek example
with open('example.txt', 'r') as file:
    file.seek(10)  # Move to 10th byte
    print("From position 10:", file.read(5))
    file.seek(0)   # Return to start
    print("From start:", file.read(5))

This code first moves to position 10, reads 5 characters, then returns to the
start and reads again. The seek operation is immediate and
doesn't involve reading any data. It only changes where the next read or
write will occur.

Remember that in text mode, seeking to arbitrary positions may produce
unexpected results due to newline translations. Binary mode provides more
precise control over file positioning.

## Seeking from Current Position

Using whence=1 allows seeking relative to the current position.
This is useful for skipping or rewinding small amounts without calculating
absolute positions.

seek_current.py
  

# Seeking from current position
with open('data.bin', 'rb') as file:
    print("First 5 bytes:", file.read(5))
    file.seek(3, 1)  # Skip 3 bytes from current
    print("Next 5 bytes:", file.read(5))
    file.seek(-5, 1)  # Rewind 5 bytes
    print("Same 5 bytes:", file.read(5))

This binary mode example reads 5 bytes, skips 3 bytes, reads 5 more, then
rewinds 5 bytes to read the same data again. The second parameter (1) makes
the offset relative to the current position. Negative offsets move backward.

Note that seeking from current position requires binary mode in most cases.
Text mode may not support relative seeks due to newline character
translations between platforms.

## Seeking from End of File

Using whence=2 allows seeking relative to the end of file. This
is often used to read the last part of a file or to append data.

seek_end.py
  

# Seeking from end of file
with open('large.log', 'rb') as file:
    file.seek(-100, 2)  # Last 100 bytes
    last_part = file.read()
    print("Last 100 bytes:", last_part)
    
    # Append without overwriting
    file.seek(0, 2)
    file.write(b'\nNew log entry')

This example first reads the last 100 bytes of a log file, then moves to the
end to append new data. The seek(0, 2) pattern is a common way
to position at the end for appending. The file must be opened in a mode that
allows writing for the append operation.

When seeking from end, negative offsets are typically used to position before
the end. A zero offset positions exactly at the end, which is useful for
appending data to files.

## Text Mode Seeking Limitations

Text mode seeking has limitations due to newline translations. This example
demonstrates the challenges and solutions when working with text files.

text_seek.py
  

# Text mode seeking challenges
with open('textfile.txt', 'r+') as file:
    # Safe seek - only to positions from tell()
    pos = file.tell()
    content = file.read(10)
    file.seek(pos)  # Return to recorded position
    
    # Binary mode alternative for precise seeking
    with open('textfile.txt', 'rb') as bin_file:
        bin_file.seek(20)
        print("Binary mode precise seek:", bin_file.read(5))

This code shows two approaches: using tell to record positions
for safe seeking in text mode, and using binary mode for precise positioning.
Text mode converts platform-specific line endings to \n, making
byte counts unreliable for seeking.

For reliable text file seeking, either use positions obtained from
tell, or open the file in binary mode and handle encoding
manually. The latter approach gives complete control but requires more work.

## Combining seek and readline

This example shows how to use seek with readline to
implement efficient random access to specific lines in a file.

seek_readline.py
  

# Random line access with seek
def get_line(filepath, line_num):
    with open(filepath, 'rb') as file:
        # Find line start positions
        positions = [0]
        while file.readline():
            positions.append(file.tell())
        
        if line_num &gt;= len(positions):
            return None
            
        file.seek(positions[line_num])
        return file.readline().decode('utf-8')

# Get 5th line (0-based index)
print("5th line:", get_line('data.txt', 4))

This function first scans the file to record all line start positions, then
uses seek to jump directly to the desired line. The binary mode
ensures precise positioning, while decode handles text
conversion. This approach is efficient for repeated random access to the same
file.

For very large files, storing all line positions might use too much memory. In
such cases, consider alternative approaches like binary search or maintaining
an external line index.

## Best Practices

- **Prefer binary mode for precise seeking:** Avoids newline translation issues

- **Use tell with seek in text mode:** For reliable positioning

- **Check return values:** seek returns the new position - verify it

- **Handle exceptions:** seek can raise IOError on invalid positions

- **Combine with tell:** For complex file navigation patterns

## Source References

- [Python seek Documentation](https://docs.python.org/3/library/io.html#io.IOBase.seek)

- [Python File Methods Tutorial](https://docs.python.org/3/tutorial/inputoutput.html#methods-of-file-objects)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).