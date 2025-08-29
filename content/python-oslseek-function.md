+++
title = "Python os.lseek Function"
date = 2025-08-29T20:09:24.175+01:00
draft = false
description = "Complete guide to Python's os.lseek function covering file positioning, seeking operations, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.lseek Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.lseek function,
which changes the file position for reading/writing. We'll cover positioning
modes, offset handling, and practical file manipulation examples.

## Basic Definitions

The os.lseek function changes the file position of a file
descriptor. It's a low-level operation similar to the C library's lseek.

Key parameters: fd (file descriptor), pos (offset), whence (reference point:
SEEK_SET, SEEK_CUR, SEEK_END). Returns the new absolute position.

## Seeking from File Start

The SEEK_SET mode positions from the file start. This example demonstrates
reading specific parts of a file by seeking to absolute positions.

seek_from_start.py
  

import os

# Create a test file
with open("data.bin", "wb") as f:
    f.write(b"ABCDEFGHIJKLMNOPQRSTUVWXYZ")

# Open and seek
fd = os.open("data.bin", os.O_RDONLY)
os.lseek(fd, 10, os.SEEK_SET)  # Seek to 11th byte (0-based)
data = os.read(fd, 5)
print(f"Read from position 10: {data.decode()}")  # KLMNO

os.close(fd)

This creates a binary file with the alphabet, then seeks to position 10.
The read operation starts from 'K' and reads 5 bytes forward.

Remember that file positions are 0-based in Python. SEEK_SET with pos=0
is the file start.

## Seeking from Current Position

The SEEK_CUR mode positions relative to the current position. This allows
forward/backward movement without knowing the absolute position.

seek_from_current.py
  

import os

fd = os.open("data.bin", os.O_RDONLY)

# Initial read
data = os.read(fd, 5)
print(f"First 5 bytes: {data.decode()}")  # ABCDE

# Seek forward 5 bytes
os.lseek(fd, 5, os.SEEK_CUR)
data = os.read(fd, 5)
print(f"Next 5 bytes: {data.decode()}")  # KLMNO

# Seek backward 10 bytes
os.lseek(fd, -10, os.SEEK_CUR)
data = os.read(fd, 5)
print(f"Rewound 10 bytes: {data.decode()}")  # FGHIJ

os.close(fd)

This shows forward and backward seeking from the current position. The
second seek moves back 10 bytes from the current position.

Negative offsets move backward, positive forward. The position can't go
before the file start.

## Seeking from File End

The SEEK_END mode positions relative to the file end. This is useful for
appending or reading the end of files without knowing their exact size.

seek_from_end.py
  

import os

fd = os.open("data.bin", os.O_RDONLY)

# Get file size by seeking to end
file_size = os.lseek(fd, 0, os.SEEK_END)
print(f"File size: {file_size} bytes")  # 26

# Read last 5 bytes
os.lseek(fd, -5, os.SEEK_END)
data = os.read(fd, 5)
print(f"Last 5 bytes: {data.decode()}")  # VWXYZ

# Seek beyond end (creates 'hole' in sparse files)
new_pos = os.lseek(fd, 100, os.SEEK_END)
print(f"New position: {new_pos}")  # 126

os.close(fd)

This demonstrates getting file size by seeking to end, reading the last
bytes, and seeking beyond the end (which may create sparse files).

Seeking beyond end doesn't immediately allocate space. The file appears
larger but disk space isn't used until data is written.

## Modifying File Content

Combining lseek with write operations allows precise file modifications.
This example shows in-place updates without rewriting the entire file.

modify_file.py
  

import os

# Create initial file
with open("records.dat", "wb") as f:
    f.write(b"RECORD1DATAXXXXX")

# Open for read-write
fd = os.open("records.dat", os.O_RDWR)

# Update specific record
os.lseek(fd, 7, os.SEEK_SET)  # Position after "RECORD1"
os.write(fd, b"UPDATED")

# Verify change
os.lseek(fd, 0, os.SEEK_SET)
data = os.read(fd, 20)
print(f"Modified content: {data.decode()}")  # RECORD1UPDATEDXX

os.close(fd)

This creates a file with placeholder data, then seeks to position 7 to
overwrite part of the content. The rest of the file remains unchanged.

For fixed-length record files, lseek provides efficient random access
without loading the entire file.

## Working with Large Files

os.lseek supports large files (&gt;2GB) by returning and accepting 64-bit
offsets. This example demonstrates handling large file positions.

large_files.py
  

import os

# Create a large sparse file (doesn't use actual disk space)
fd = os.open("large.bin", os.O_WRONLY | os.O_CREAT, 0o644)
os.lseek(fd, 2**32, os.SEEK_SET)  # 4GB position
os.write(fd, b"END")
os.close(fd)

# Verify the large file
fd = os.open("large.bin", os.O_RDONLY)
size = os.lseek(fd, 0, os.SEEK_END)
print(f"File size: {size} bytes")  # 4294967299 (4GB + 3 bytes)

# Read the written data
os.lseek(fd, 2**32, os.SEEK_SET)
data = os.read(fd, 3)
print(f"Data at 4GB offset: {data.decode()}")  # END

os.close(fd)

This creates a sparse file with data at a 4GB offset. The actual disk usage
is minimal until data is written to specific locations.

On most modern systems, Python's os.lseek supports files up to 2^63-1 bytes
(8 exabytes) in size.

## Finding Current Position

Calling lseek with offset 0 and SEEK_CUR returns the current position
without changing it. This is useful for position tracking.

current_position.py
  

import os

fd = os.open("data.bin", os.O_RDONLY)

# Initial position
pos = os.lseek(fd, 0, os.SEEK_CUR)
print(f"Initial position: {pos}")  # 0

# Read some data
os.read(fd, 10)

# Check new position
pos = os.lseek(fd, 0, os.SEEK_CUR)
print(f"After reading 10 bytes: {pos}")  # 10

# Seek and verify
os.lseek(fd, 5, os.SEEK_SET)
pos = os.lseek(fd, 0, os.SEEK_CUR)
print(f"After seeking to 5: {pos}")  # 5

os.close(fd)

This demonstrates getting the current position between operations. The
technique works regardless of the previous seek or read operations.

This is particularly useful when implementing complex file parsing
algorithms that need to track position.

## Error Handling

os.lseek can raise OSError for invalid operations. This example shows
proper error handling for various edge cases.

error_handling.py
  

import os

try:
    # Invalid file descriptor
    os.lseek(999, 0, os.SEEK_SET)
except OSError as e:
    print(f"Error with bad fd: {e}")

try:
    # Seek before start
    fd = os.open("data.bin", os.O_RDONLY)
    os.lseek(fd, -1, os.SEEK_SET)
except OSError as e:
    print(f"Error seeking before start: {e}")
finally:
    os.close(fd)

try:
    # Directory seek (invalid)
    fd = os.open(".", os.O_RDONLY)
    os.lseek(fd, 10, os.SEEK_SET)
except OSError as e:
    print(f"Error seeking in directory: {e}")
finally:
    os.close(fd)

This shows three common error scenarios: invalid descriptor, invalid
offset, and seeking in a directory (which isn't supported).

Always handle potential OSError exceptions when working with low-level
file operations like lseek.

## Security Considerations

- **File descriptors:** Ensure valid descriptors to prevent errors

- **Boundary checks:** Validate offsets to avoid invalid seeks

- **Concurrent access:** Other processes may modify file between operations

- **Resource leaks:** Always close file descriptors properly

- **Platform differences:** Behavior may vary between operating systems

## Best Practices

- **Use with caution:** Prefer high-level file objects when possible

- **Check returns:** Verify the new position after seeking

- **Handle errors:** Catch OSError for robust operation

- **Document positions:** Clearly track file position changes

- **Clean up:** Close descriptors in finally blocks

## Source References

- [Python os.lseek Documentation](https://docs.python.org/3/library/os.html#os.lseek)

- [Linux lseek(2) man page](https://man7.org/linux/man-pages/man2/lseek.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).