+++
title = "Python os.ftruncate Function"
date = 2025-08-29T20:09:13.964+01:00
draft = false
description = "Complete guide to Python's os.ftruncate function covering file size modification, truncation operations, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.ftruncate Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.ftruncate function,
which modifies file size by truncating or extending it. We'll cover file
descriptors, size modification, and practical file manipulation examples.

## Basic Definitions

The os.ftruncate function changes the size of a file referenced
by a file descriptor. It can either truncate the file or extend it with null
bytes if the new size is larger than current size.

Key parameters: fd (file descriptor), length (new size in bytes). Requires
write permission on the file. Works on both Unix and Windows systems.

## Basic File Truncation

This example demonstrates the simplest use of os.ftruncate to
reduce a file's size. We first create a sample file with some content.

basic_truncate.py
  

import os

# Create a sample file
with open("sample.txt", "w") as f:
    f.write("This is a sample text file with some content.")

# Open file for reading and writing
with open("sample.txt", "r+") as f:
    # Get current size
    original_size = os.fstat(f.fileno()).st_size
    print(f"Original size: {original_size} bytes")

    # Truncate to 10 bytes
    os.ftruncate(f.fileno(), 10)
    truncated_size = os.fstat(f.fileno()).st_size
    print(f"Truncated size: {truncated_size} bytes")

    # Read remaining content
    f.seek(0)
    print(f"Content after truncation: '{f.read()}'")

This code creates a file, then opens it in read-write mode. It shows the
original size, truncates to 10 bytes, and displays the new size and content.

The file descriptor is obtained from the file object using fileno(). After
truncation, the file contains only the first 10 bytes of the original content.

## Extending a File

os.ftruncate can also extend files by adding null bytes when the
new size exceeds the current size. This example demonstrates this behavior.

extend_file.py
  

import os

# Create a small file
with open("small.txt", "w") as f:
    f.write("short")

# Open and extend the file
with open("small.txt", "r+") as f:
    print(f"Original content: '{f.read()}'")
    f.seek(0)
    
    # Extend to 20 bytes
    os.ftruncate(f.fileno(), 20)
    
    # Show extended content
    f.seek(0)
    extended_content = f.read()
    print(f"Extended content: '{extended_content}'")
    print(f"Extended content length: {len(extended_content)}")
    print(f"Extended content as bytes: {extended_content.encode()}")

The code creates a small file, then extends it to 20 bytes. The new space is
filled with null bytes (\x00), which may not be visible when printed as text.

When reading the extended file, the null bytes are included in the content but
may not display visibly in terminal output depending on your environment.

## Truncating to Zero

A common use case is truncating a file to zero bytes, effectively clearing its
content while keeping the file intact. This example shows how to do this.

truncate_to_zero.py
  

import os

# Create a file with content
with open("logfile.log", "w") as f:
    f.write("This is some log content\n" * 10)

# Check original size
original_size = os.path.getsize("logfile.log")
print(f"Original log file size: {original_size} bytes")

# Truncate to zero
with open("logfile.log", "r+") as f:
    os.ftruncate(f.fileno(), 0)

# Verify truncation
new_size = os.path.getsize("logfile.log")
print(f"After truncation: {new_size} bytes")

# File still exists but is empty
with open("logfile.log", "r") as f:
    content = f.read()
    print(f"File content: '{content}' (length: {len(content)})")

This example creates a log file, then truncates it to zero bytes. The file
remains in place but contains no data. This is useful for log rotation.

Note that the file must be opened in a mode that allows writing (r+ in this
case) for truncation to work. The file's metadata (like creation time) remains.

## Error Handling

os.ftruncate can raise various exceptions. This example shows
proper error handling for common scenarios like permission issues.

error_handling.py
  

import os
import errno

def safe_truncate(filename, size):
    try:
        with open(filename, "r+") as f:
            os.ftruncate(f.fileno(), size)
            print(f"Successfully truncated {filename} to {size} bytes")
    except OSError as e:
        if e.errno == errno.EBADF:
            print(f"Error: Bad file descriptor for {filename}")
        elif e.errno == errno.EINVAL:
            print(f"Error: Invalid size {size} for {filename}")
        elif e.errno == errno.EPERM:
            print(f"Error: Permission denied for {filename}")
        else:
            print(f"Unexpected error: {e}")

# Test cases
safe_truncate("existing.txt", 100)  # Assuming this file exists
safe_truncate("/root/protected.txt", 0)  # Likely permission denied
safe_truncate("nonexistent.txt", 50)  # FileNotFoundError
safe_truncate("valid.txt", -10)  # Invalid size

This function demonstrates handling various errors that might occur during
truncation. Different error numbers indicate different types of failures.

Note that attempting to truncate a non-existent file raises FileNotFoundError,
which we catch as OSError in Python. Always handle potential errors when working
with file operations.

## Working with Binary Files

os.ftruncate works equally well with binary files. This example
shows truncating a binary file at specific positions.

binary_truncate.py
  

import os
import struct

# Create a binary file with various data types
with open("data.bin", "wb") as f:
    # Write different data types
    f.write(struct.pack('i', 42))          # Integer
    f.write(struct.pack('f', 3.14))        # Float
    f.write(struct.pack('10s', b"binary")) # String
    f.write(struct.pack('?', True))        # Boolean

# Check original size
original_size = os.path.getsize("data.bin")
print(f"Original binary file size: {original_size} bytes")

# Truncate after the integer and float (8 bytes)
with open("data.bin", "r+b") as f:
    os.ftruncate(f.fileno(), 8)
    
    # Read remaining content
    f.seek(0)
    data = f.read()
    print(f"Remaining bytes: {data}")
    print(f"Unpacked integer: {struct.unpack('i', data[:4])[0]}")
    print(f"Unpacked float: {struct.unpack('f', data[4:8])[0]}")

This creates a binary file with multiple data types, then truncates it after
the first two values. The remaining content is read and unpacked to verify.

Binary file truncation is precise since we're working with exact byte counts.
This is useful when dealing with fixed-size records or headers in binary files.

## Comparing with os.truncate

Python also provides os.truncate which works similarly but takes
a path instead of file descriptor. This example compares both functions.

compare_truncate.py
  

import os

filename = "compare.txt"

# Create sample file
with open(filename, "w") as f:
    f.write("This is a file for comparing truncation methods")

# Method 1: Using os.ftruncate with file descriptor
with open(filename, "r+") as f:
    os.ftruncate(f.fileno(), 10)
    f.seek(0)
    fd_content = f.read()
    print(f"os.ftruncate result: '{fd_content}'")

# Reset file
with open(filename, "w") as f:
    f.write("This is a file for comparing truncation methods")

# Method 2: Using os.truncate with path
os.truncate(filename, 10)
with open(filename, "r") as f:
    path_content = f.read()
    print(f"os.truncate result: '{path_content}'")

# Compare
print(f"Results equal: {fd_content == path_content}")

Both methods achieve the same result but through different interfaces.
os.ftruncate requires an open file descriptor, while
os.truncate works with a path string.

The choice depends on context: use os.ftruncate when you already have a file
open, and os.truncate when working with file paths directly.

## Real-world Log Rotation

This example shows a practical application of os.ftruncate in
a log rotation system that limits log file size.

log_rotation.py
  

import os
import time

LOG_FILE = "app.log"
MAX_SIZE = 1024  # 1KB max log size

def write_log(message):
    # Check current size
    if os.path.exists(LOG_FILE):
        current_size = os.path.getsize(LOG_FILE)
        if current_size &gt;= MAX_SIZE:
            # Rotate log by truncating
            with open(LOG_FILE, "r+") as f:
                os.ftruncate(f.fileno(), 0)
            print("Log rotated (truncated)")
    
    # Append new log entry
    with open(LOG_FILE, "a") as f:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] {message}\n")

# Simulate log writing
for i in range(100):
    write_log(f"Event {i}: This is a log message")
    time.sleep(0.1)  # Small delay

# Show final log size
final_size = os.path.getsize(LOG_FILE)
print(f"Final log size: {final_size} bytes")

This log rotation system checks file size before each write. If the log exceeds
1KB, it's truncated to zero bytes. In production, you'd want more sophisticated
rotation.

Real implementations might archive old logs instead of truncating, but this
demonstrates the core concept of size management using os.ftruncate.

## Security Considerations

- **File descriptors:** Ensure valid descriptors are passed to os.ftruncate

- **Permissions:** Requires write permission on the target file

- **Race conditions:** File state may change between size check and truncation

- **Data loss:** Truncation permanently removes data beyond the new size

- **Cross-platform:** Behavior consistent across Unix and Windows

## Best Practices

- **Error handling:** Always handle potential OSError exceptions

- **File modes:** Open files in appropriate modes (r+ or w) for truncation

- **Backups:** Consider creating backups before destructive operations

- **Atomic operations:** For critical files, consider safer alternatives

- **Documentation:** Clearly document truncation behavior in your code

## Source References

- [Python os.ftruncate Documentation](https://docs.python.org/3/library/os.html#os.ftruncate)

- [Linux ftruncate(2) man page](https://man7.org/linux/man-pages/man2/ftruncate.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).