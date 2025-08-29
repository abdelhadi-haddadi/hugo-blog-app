+++
title = "Python os.write Function"
date = 2025-08-29T20:09:48.115+01:00
draft = false
description = "Complete guide to Python's os.write function covering low-level file writing, file descriptors, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.write Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.write function,
which performs low-level file writing using file descriptors. We'll cover
file descriptors, byte strings, return values, and practical examples.

## Basic Definitions

The os.write function writes bytes to a file descriptor. It's a
low-level operation that bypasses Python's file object layer.

Key parameters: fd (file descriptor), data (bytes-like object). Returns the
number of bytes actually written. Requires proper file opening and permissions.

## Basic File Writing

This example demonstrates the simplest use of os.write to write
data to a file. We first open the file to get a file descriptor.

basic_write.py
  

import os

# Open file and get file descriptor
fd = os.open("output.txt", os.O_WRONLY | os.O_CREAT)

# Write bytes to file
data = b"Hello, World!\n"
bytes_written = os.write(fd, data)
print(f"Wrote {bytes_written} bytes")

# Close file descriptor
os.close(fd)

The code opens a file with write-only access, creates it if needed, writes
bytes, and closes the descriptor. Note the 'b' prefix for bytes literal.

Always close file descriptors to prevent resource leaks. The return value
shows how many bytes were actually written.

## Writing Multiple Chunks

os.write can be called multiple times to write data in chunks.
This example shows sequential writes to the same file descriptor.

chunked_write.py
  

import os

fd = os.open("log.txt", os.O_WRONLY | os.O_CREAT | os.O_APPEND)

messages = [
    b"System started\n",
    b"Loading modules...\n",
    b"Initialization complete\n"
]

for msg in messages:
    bytes_written = os.write(fd, msg)
    print(f"Wrote {bytes_written} bytes")

os.close(fd)

We open the file in append mode to preserve existing content. Each string
is written separately, with progress reported after each write.

The O_APPEND flag ensures writes go to the end of file, even if other
processes are writing to it simultaneously.

## Handling Large Files

For large files, it's efficient to write data in fixed-size chunks. This
example demonstrates writing a large byte array in smaller pieces.

large_file_write.py
  

import os

# Generate 1MB of data
data = b"X" * (1024 * 1024)

fd = os.open("large_file.bin", os.O_WRONLY | os.O_CREAT)

chunk_size = 4096  # 4KB chunks
total_written = 0

for i in range(0, len(data), chunk_size):
    chunk = data[i:i + chunk_size]
    written = os.write(fd, chunk)
    total_written += written
    print(f"Written {total_written} bytes", end="\r")

os.close(fd)
print(f"\nTotal written: {total_written} bytes")

The code writes a 1MB file in 4KB chunks. This approach is memory-efficient
and provides progress feedback during the operation.

Note the carriage return (\r) in print to update the same line, creating a
progress indicator effect.

## Error Handling

os.write can raise exceptions. This example shows proper error
handling for common scenarios like disk full or permission issues.

error_handling.py
  

import os
import errno

try:
    fd = os.open("protected.txt", os.O_WRONLY | os.O_CREAT)
    data = b"Attempting to write to protected file\n"
    
    try:
        bytes_written = os.write(fd, data)
        print(f"Successfully wrote {bytes_written} bytes")
    except OSError as e:
        if e.errno == errno.ENOSPC:
            print("Error: No space left on device")
        elif e.errno == errno.EBADF:
            print("Error: Bad file descriptor")
        else:
            print(f"Write error: {e}")
    finally:
        os.close(fd)
except PermissionError:
    print("Error: Permission denied for file creation")
except OSError as e:
    print(f"File open error: {e}")

The example demonstrates nested try-except blocks to handle different error
scenarios at both file opening and writing stages.

Specific error numbers (errno) help identify exact failure reasons for
appropriate handling.

## Non-blocking I/O

With non-blocking file descriptors, os.write may write fewer
bytes than requested. This example shows how to handle partial writes.

non_blocking.py
  

import os
import errno

# Create a named pipe (run this only once)
if not os.path.exists("mypipe"):
    os.mkfifo("mypipe")

# Open in non-blocking mode
fd = os.open("mypipe", os.O_WRONLY | os.O_NONBLOCK)

data = b"X" * 65536  # Large chunk of data
total = len(data)
written = 0

try:
    while written &lt; total:
        try:
            n = os.write(fd, data[written:])
            if n == 0:
                print("Write would block")
                break
            written += n
            print(f"Written {written}/{total} bytes")
        except OSError as e:
            if e.errno == errno.EAGAIN:
                print("Resource temporarily unavailable")
                break
            raise
finally:
    os.close(fd)

The code demonstrates writing to a named pipe in non-blocking mode. It handles
partial writes and EAGAIN errors that occur when the pipe is full.

Non-blocking I/O is useful for applications that must remain responsive while
performing I/O operations.

## Binary Data Writing

os.write is ideal for writing binary data. This example shows
how to write structured binary data using the struct module.

binary_data.py
  

import os
import struct

fd = os.open("data.bin", os.O_WRONLY | os.O_CREAT)

# Pack different data types into bytes
points = [
    struct.pack("ffi", 1.5, 2.5, 10),  # x, y, color
    struct.pack("ffi", 3.1, 4.2, 20),
    struct.pack("ffi", 5.0, 6.0, 30)
]

for point in points:
    os.write(fd, point)

os.close(fd)
print("Binary data written successfully")

The example writes three points (each containing two floats and an integer)
in binary format. struct.pack converts Python values to bytes.

Binary file writing is common in performance-sensitive applications like
games or scientific computing.

## Standard Output Writing

File descriptor 1 represents standard output. This example shows direct
writing to stdout using os.write.

stdout_write.py
  

import os
import sys

# Method 1: Using file descriptor 1
os.write(1, b"Writing to stdout via file descriptor\n")

# Method 2: Using sys.stdout's fileno()
stdout_fd = sys.stdout.fileno()
os.write(stdout_fd, b"Writing via sys.stdout's descriptor\n")

# Method 3: Using os.fdopen
with os.fdopen(1, "wb") as f:
    f.write(b"Writing via fdopen wrapper\n")

The example demonstrates three ways to write to stdout. The first uses the
well-known descriptor number (1), the second uses sys.stdout's descriptor.

Direct stdout writing can be useful when you need to bypass Python's buffering
or work at a lower level.

## Security Considerations

- **File descriptors:** Must be properly opened and closed

- **Data validation:** Ensure only expected data gets written

- **Error handling:** Always check return values and handle errors

- **Race conditions:** File state may change between operations

- **Platform differences:** Behavior may vary between OSes

## Best Practices

- **Use context managers:** For automatic descriptor closing

- **Check return values:** Verify all bytes were written

- **Prefer buffered I/O:** For most high-level applications

- **Handle partial writes:** Especially in non-blocking mode

- **Clean up resources:** Always close file descriptors

## Source References

- [Python os.write Documentation](https://docs.python.org/3/library/os.html#os.write)

- [Linux write(2) man page](https://man7.org/linux/man-pages/man2/write.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).