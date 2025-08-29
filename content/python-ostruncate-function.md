+++
title = "Python os.truncate Function"
date = 2025-08-29T20:09:43.691+01:00
draft = false
description = "Complete guide to Python's os.truncate function covering file size modification, truncation examples, and practical usage."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.truncate Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.truncate function,
which modifies file size by truncating or extending it. We'll cover usage
scenarios, permission requirements, and practical examples.

## Basic Definitions

The os.truncate function changes the size of a file to the
specified length. If the file is extended, new bytes are filled with zeros.

Key parameters: path (file to modify), length (new size in bytes). Requires
write permission on the file. Works on regular files, not directories.

## Truncating a File to Smaller Size

The most common use of os.truncate is reducing file size by
discarding content beyond the specified length. This example demonstrates
basic truncation.

basic_truncate.py
  

import os

# Create a sample file
file_path = "data.txt"
with open(file_path, "w") as f:
    f.write("This is some sample text for truncation demonstration.")

# Check original size
original_size = os.path.getsize(file_path)
print(f"Original size: {original_size} bytes")

# Truncate to 20 bytes
os.truncate(file_path, 20)
new_size = os.path.getsize(file_path)
print(f"New size: {new_size} bytes")

# Verify content
with open(file_path) as f:
    print(f"Content: '{f.read()}'")

This creates a file, then truncates it to 20 bytes. The remaining content
will be the first 20 bytes of the original text.

Note that truncation happens immediately at the filesystem level, without
needing to reopen the file.

## Extending a File with Zeros

When specifying a length larger than the current file size, os.truncate
extends the file by padding with null bytes. This example shows file extension.

extend_file.py
  

import os

file_path = "empty.dat"

# Create empty file
with open(file_path, "w"):
    pass

# Extend file to 1KB (1024 bytes)
os.truncate(file_path, 1024)
size = os.path.getsize(file_path)
print(f"File size after extension: {size} bytes")

# Verify content is null bytes
with open(file_path, "rb") as f:
    content = f.read(16)  # Read first 16 bytes
    print(f"First 16 bytes: {content}")

This creates an empty file, then extends it to 1024 bytes. The new space is
filled with zeros. Binary mode is used to read the null bytes.

File extension is useful for preallocating space or creating sparse files.

## Truncating Open File Descriptors

os.ftruncate works similarly but operates on an open file descriptor
instead of a path. This example shows both functions for comparison.

fd_truncate.py
  

import os

file_path = "log.txt"

# Using os.truncate with path
with open(file_path, "w") as f:
    f.write("Initial content for truncation test")

os.truncate(file_path, 10)
print(f"After path truncate: {os.path.getsize(file_path)} bytes")

# Using os.ftruncate with file descriptor
with open(file_path, "r+") as f:
    fd = f.fileno()
    os.ftruncate(fd, 5)
    print(f"After fd truncate: {os.path.getsize(file_path)} bytes")

Both functions achieve the same result but take different parameters.
os.ftruncate requires an open file descriptor.

The file must be opened in a mode that allows writing for os.ftruncate.

## Error Handling

os.truncate can raise various exceptions. This example demonstrates
proper error handling for common scenarios.

error_handling.py
  

import os
import errno

file_path = "protected.txt"

try:
    # Attempt to truncate a non-existent file
    os.truncate("nonexistent.txt", 100)
except FileNotFoundError:
    print("Error: File not found")

try:
    # Attempt to truncate without permissions
    os.truncate("/root/protected.txt", 100)
except PermissionError:
    print("Error: Permission denied")

try:
    # Attempt to truncate a directory
    os.truncate("/tmp", 100)
except IsADirectoryError:
    print("Error: Cannot truncate a directory")

try:
    # Invalid length
    os.truncate(file_path, -1)
except OSError as e:
    if e.errno == errno.EINVAL:
        print("Error: Invalid length specified")

This shows handling for file not found, permission issues, directory truncation,
and invalid length parameters. Each case raises a different exception.

Always validate inputs and handle potential errors when working with filesystem
operations.

## Combining with Other File Operations

os.truncate can be combined with other file operations for more
complex workflows. This example shows integration with file reading.

combined_operations.py
  

import os

file_path = "data.bin"

# Create binary file with some data
with open(file_path, "wb") as f:
    f.write(b"\x01\x02\x03\x04\x05\x06\x07\x08")

# Truncate to remove last 4 bytes
os.truncate(file_path, 4)

# Read remaining content
with open(file_path, "rb") as f:
    content = f.read()
    print(f"Remaining bytes: {content}")
    print(f"Size after truncate: {len(content)} bytes")

# Extend file and verify
os.truncate(file_path, 8)
with open(file_path, "rb") as f:
    content = f.read()
    print(f"Extended bytes: {content}")
    print(f"Size after extension: {len(content)} bytes")

This creates a binary file, truncates it, then extends it while verifying
the content at each step. The null bytes added during extension are visible.

Binary mode is essential when working with non-text data or examining the
actual bytes added during extension.

## Performance Considerations

This example benchmarks os.truncate against alternative methods
of file size modification to demonstrate performance characteristics.

performance_test.py
  

import os
import timeit

file_path = "large_file.bin"
size_mb = 10  # 10MB file
test_size = 5  # Truncate to 5MB

def create_large_file():
    with open(file_path, "wb") as f:
        f.seek(size_mb * 1024 * 1024 - 1)
        f.write(b"\0")

def method_truncate():
    os.truncate(file_path, test_size * 1024 * 1024)

def method_write():
    with open(file_path, "r+") as f:
        f.truncate(test_size * 1024 * 1024)

# Setup
create_large_file()

# Benchmark
truncate_time = timeit.timeit(method_truncate, number=100)
write_time = timeit.timeit(method_write, number=100)

print(f"os.truncate average: {truncate_time/100:.6f}s")
print(f"file.truncate average: {write_time/100:.6f}s")

# Cleanup
os.remove(file_path)

This creates a large file, then compares truncation methods. os.truncate
is generally faster as it operates at the filesystem level.

The performance difference becomes more significant with larger files and
frequent truncation operations.

## Security Considerations

- **Permission requirements:** Write permission on the file is required

- **Data loss:** Truncation permanently removes file content

- **Race conditions:** File may change between size check and truncation

- **Symbolic links:** Follows symlinks by default (use os.path.realpath)

- **Cross-platform:** Behavior consistent across Unix and Windows

## Best Practices

- **Backup important data:** Before performing destructive operations

- **Check file type:** Verify it's a regular file before truncating

- **Handle errors:** Implement proper exception handling

- **Document size changes:** Log truncation operations for audit

- **Consider alternatives:** For some cases, file.truncate() may be better

## Source References

- [Python os.truncate Documentation](https://docs.python.org/3/library/os.html#os.truncate)

- [Linux truncate(2) man page](https://man7.org/linux/man-pages/man2/truncate.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).