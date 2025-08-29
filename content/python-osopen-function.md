+++
title = "Python os.open Function"
date = 2025-08-29T20:09:26.372+01:00
draft = false
description = "Complete guide to Python's os.open function covering low-level file operations, flags, modes, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.open Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.open function,
which provides low-level file operations. We'll cover file descriptors,
flags, modes, and practical file handling examples.

## Basic Definitions

The os.open function opens a file and returns a file descriptor.
It provides lower-level control than the built-in open function.

Key parameters: path (file to open), flags (open mode flags), mode (permission
bits for new files). Returns an integer file descriptor for the opened file.

## Basic File Opening

The simplest use of os.open opens a file for reading. This
example demonstrates basic file descriptor usage with read operations.

basic_open.py
  

import os

# Open file for reading only
fd = os.open("example.txt", os.O_RDONLY)

# Read content using file descriptor
content = os.read(fd, 1024)
print(f"File content: {content.decode('utf-8')}")

# Close the file descriptor
os.close(fd)

This example opens a file in read-only mode, reads its content, and closes it.
Note we must manually close the file descriptor to avoid resource leaks.

The os.read operation returns bytes, so we decode it to UTF-8
for string output. The second parameter is the maximum number of bytes to read.

## Creating and Writing to Files

We can create new files or truncate existing ones using appropriate flags.
This example demonstrates file creation and writing operations.

create_write.py
  

import os

# Create or truncate file with write permissions
fd = os.open("output.log", os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)

# Write data to file
data = "This is test data\n".encode('utf-8')
os.write(fd, data)

# Close file descriptor
os.close(fd)

print("File created and written successfully")

The flags combination creates the file if it doesn't exist (O_CREAT), truncates
it if it exists (O_TRUNC), and opens it for writing only (O_WRONLY).

The mode 0o644 sets standard Unix permissions (owner read/write, others read).
Note the octal notation (leading 0o) for permission bits.

## Appending to Files

To append to existing files without truncating, we use the O_APPEND flag.
This ensures all writes go to the end of the file automatically.

append_file.py
  

import os

# Open file for appending
fd = os.open("output.log", os.O_WRONLY | os.O_APPEND)

# Append data to file
new_data = "Appended line\n".encode('utf-8')
os.write(fd, new_data)

# Close file descriptor
os.close(fd)

print("Data appended to file")

The O_APPEND flag ensures atomic append operations, preventing race conditions
between multiple processes writing to the same file.

Without O_APPEND, we would need to manually seek to the end before writing,
which could lead to race conditions in multi-process scenarios.

## Reading and Writing Simultaneously

For files that need both read and write access, we combine O_RDWR with other
flags. This example shows reading and modifying file content.

read_write.py
  

import os

# Open file for both reading and writing
fd = os.open("data.txt", os.O_RDWR)

# Read current content
content = os.read(fd, 1024)
print(f"Original content: {content.decode('utf-8')}")

# Move to beginning of file
os.lseek(fd, 0, os.SEEK_SET)

# Write new content
new_content = "Updated data\n".encode('utf-8')
os.write(fd, new_content)

# Close file descriptor
os.close(fd)

We use O_RDWR to open the file for both reading and writing. After reading,
we use os.lseek to return to the file's start before writing.

Note that file position is shared between read and write operations, so we
must manage the position carefully when switching between them.

## Exclusive File Creation

The O_EXCL flag ensures atomic file creation, failing if the file exists.
This is useful for creating lock files or ensuring unique file creation.

exclusive_create.py
  

import os

try:
    # Try to create file exclusively
    fd = os.open("lockfile", os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o644)
    print("File created exclusively")
    
    # Write to our new file
    os.write(fd, b"Lock file content")
    os.close(fd)
    
except FileExistsError:
    print("File already exists - cannot create exclusively")

The O_EXCL flag combined with O_CREAT ensures the file is created only if it
doesn't exist. If the file exists, a FileExistsError is raised.

This pattern is commonly used for lock files, where the existence check and
creation must be atomic to prevent race conditions.

## Non-blocking File Operations

The O_NONBLOCK flag enables non-blocking I/O operations. This is particularly
useful when working with special files like FIFOs or device files.

non_blocking.py
  

import os
import time

# Create a named pipe (FIFO)
fifo_path = "test.fifo"
try:
    os.mkfifo(fifo_path)
except FileExistsError:
    pass

# Open FIFO in non-blocking mode
try:
    fd = os.open(fifo_path, os.O_RDONLY | os.O_NONBLOCK)
    print("FIFO opened in non-blocking mode")
    
    # Attempt to read (won't block)
    try:
        data = os.read(fd, 1024)
        print(f"Read data: {data}")
    except BlockingIOError:
        print("No data available (non-blocking)")
    
    os.close(fd)
except OSError as e:
    print(f"Error opening FIFO: {e}")

This example demonstrates non-blocking I/O with a named pipe. Without data
available, the read operation raises BlockingIOError instead of blocking.

Non-blocking mode is essential for event-driven programs that can't afford to
block on I/O operations, such as network servers or GUI applications.

## File Descriptor Inheritance

File descriptors opened with os.open are inherited by child
processes by default. This example demonstrates controlling inheritance.

fd_inheritance.py
  

import os
import subprocess

# Open file normally (inheritable by default)
fd = os.open("inherited.txt", os.O_WRONLY | os.O_CREAT, 0o644)
os.write(fd, b"This will be inherited\n")

# Open file with close-on-exec flag
fd_noinherit = os.open("not_inherited.txt", 
                      os.O_WRONLY | os.O_CREAT | os.O_CLOEXEC, 0o644)
os.write(fd_noinherit, b"This won't be inherited\n")

# Launch child process
subprocess.run(["ls", "-l"])

# Close files
os.close(fd)
os.close(fd_noinherit)

The O_CLOEXEC flag (close-on-exec) prevents the file descriptor from being
inherited by child processes. This is important for security and resource control.

Without O_CLOEXEC, child processes might unintentionally access files they
shouldn't or exhaust file descriptor limits.

## Security Considerations

- **File descriptors:** Must be properly closed to avoid leaks

- **Permission modes:** Set appropriate permissions for new files

- **Race conditions:** Use O_EXCL for atomic file creation

- **Inheritance:** Use O_CLOEXEC for sensitive file descriptors

- **Error handling:** Always check for and handle errors

## Best Practices

- **Use high-level open:** Prefer built-in open() when possible

- **Close descriptors:** Always close file descriptors properly

- **Atomic operations:** Use appropriate flags for atomicity

- **Error checking:** Handle all possible error conditions

- **Resource limits:** Be mindful of system file descriptor limits

## Source References

- [Python os.open Documentation](https://docs.python.org/3/library/os.html#os.open)

- [Linux open(2) man page](https://man7.org/linux/man-pages/man2/open.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).