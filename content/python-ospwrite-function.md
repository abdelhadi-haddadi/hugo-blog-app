+++
title = "Python os.pwrite Function"
date = 2025-08-29T20:09:29.908+01:00
draft = false
description = "Complete guide to Python's os.pwrite function covering file writing at specific offsets, low-level I/O operations, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.pwrite Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.pwrite function,
which writes data to a file at a specific offset without changing the file
pointer. We'll cover its parameters, behavior, and practical use cases.

## Basic Definitions

The os.pwrite function writes bytes to a file descriptor at a
specified offset. It's similar to os.write but doesn't modify
the file pointer position.

Key parameters: fd (file descriptor), data (bytes to write), offset (position
in file). Returns number of bytes written. Requires file opened for writing.

## Basic File Writing

This example demonstrates basic usage of os.pwrite to write data
at a specific position in a file. We first create a file with some content.

basic_write.py
  

import os

# Create a file with initial content
with open("data.txt", "w") as f:
    f.write("Initial content")

# Open file for writing and get file descriptor
fd = os.open("data.txt", os.O_RDWR)

# Write at offset 8 without changing file pointer
bytes_written = os.pwrite(fd, b"NEW ", 8)
print(f"Wrote {bytes_written} bytes")

# Verify content
os.lseek(fd, 0, os.SEEK_SET)
print(os.read(fd, 100))  # Output: b'Initial NEWtent'

os.close(fd)

This writes "NEW " at position 8 in the file. The original content "content"
becomes "NEWtent" because we overwrote part of it. The file pointer remains
unchanged after pwrite.

Notice we use os.open to get a file descriptor, as pwrite
requires a file descriptor, not a file object.

## Writing at Different Offsets

This example shows writing at multiple positions in a file while maintaining
the original file pointer position between writes.

multiple_writes.py
  

import os

# Create a sample file
with open("records.txt", "w") as f:
    f.write("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

fd = os.open("records.txt", os.O_RDWR)

# Get initial position
initial_pos = os.lseek(fd, 0, os.SEEK_CUR)
print(f"Initial position: {initial_pos}")

# Write at various offsets
os.pwrite(fd, b"123", 5)    # Overwrite positions 5-7
os.pwrite(fd, b"456", 10)   # Overwrite positions 10-12
os.pwrite(fd, b"789", 20)   # Overwrite positions 20-22

# Verify position hasn't changed
current_pos = os.lseek(fd, 0, os.SEEK_CUR)
print(f"Position after writes: {current_pos}")

# Read entire file
os.lseek(fd, 0, os.SEEK_SET)
print(os.read(fd, 100))  # Output: b'ABCDE123HIJ456NOPQRST789VWXYZ'

os.close(fd)

Each pwrite operation writes at the specified offset without
affecting the others or the file pointer. This allows precise modifications
at known file locations.

The output shows the original string with our inserted number sequences at
the specified positions.

## Appending with pwrite

While pwrite is typically for overwriting, we can use it to
append by writing at the end of file. This requires knowing the file size.

append_write.py
  

import os

# Create initial file
with open("log.txt", "w") as f:
    f.write("Log starts here\n")

fd = os.open("log.txt", os.O_RDWR)

# Get file size for append
file_size = os.lseek(fd, 0, os.SEEK_END)

# Append new entries without moving pointer
os.pwrite(fd, b"Entry 1\n", file_size)
file_size += len("Entry 1\n")

os.pwrite(fd, b"Entry 2\n", file_size)
file_size += len("Entry 2\n")

os.pwrite(fd, b"Entry 3\n", file_size)

# Verify content
os.lseek(fd, 0, os.SEEK_SET)
print(os.read(fd, 1000).decode())

os.close(fd)

This demonstrates how to append data using pwrite by tracking
the file size. Each write goes at the end of the current content.

While os.write with O_APPEND is simpler for pure
appending, this shows pwrite's flexibility.

## Handling Partial Writes

pwrite may write fewer bytes than requested. This example shows
how to handle partial writes and ensure complete data is written.

partial_writes.py
  

import os

fd = os.open("partial.dat", os.O_RDWR | os.O_CREAT)

large_data = b"X" * 1000000  # 1MB of data
offset = 0
remaining = len(large_data)

while remaining &gt; 0:
    written = os.pwrite(fd, large_data[-remaining:], offset)
    if written == 0:  # Disk full?
        raise IOError("Failed to write data")
    offset += written
    remaining -= written
    print(f"Wrote {written} bytes, {remaining} remaining")

os.close(fd)

# Verify
print(f"Final file size: {os.path.getsize('partial.dat')} bytes")

This implements a write loop that continues until all data is written. It
updates the offset and remaining data with each partial write.

In practice, disk full situations are rare, but robust code should handle
partial writes for large data transfers.

## Thread-Safe File Writing

pwrite is atomic when the writes are within a single filesystem
block, making it useful for thread-safe operations. This example demonstrates
this property.

thread_safe.py
  

import os
import threading

fd = os.open("counter.txt", os.O_RDWR | os.O_CREAT)
os.write(fd, b"0")  # Initialize counter
os.lseek(fd, 0, os.SEEK_SET)

def increment_counter(thread_id):
    for _ in range(1000):
        # Read current value
        current = int(os.pread(fd, 1, 0))
        # Write incremented value
        os.pwrite(fd, str(current + 1).encode(), 0)

threads = []
for i in range(10):
    t = threading.Thread(target=increment_counter, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

os.lseek(fd, 0, os.SEEK_SET)
print(f"Final counter value: {os.read(fd, 10).decode()}")

os.close(fd)

This implements a simple counter with concurrent increments. While not perfect
(race conditions exist between read and write), it demonstrates pwrite's
atomic write capability.

For true atomic increments, consider file locking or other synchronization
methods in addition to pwrite.

## Binary Data Manipulation

pwrite excels at binary file manipulation. This example shows
modifying specific bytes in a binary file while leaving others unchanged.

binary_edit.py
  

import os

# Create a binary file with a pattern
with open("data.bin", "wb") as f:
    f.write(bytes(range(256)))  # 0x00 to 0xFF

fd = os.open("data.bin", os.O_RDWR)

# Modify specific bytes
os.pwrite(fd, b"\xFF\xFF", 0x10)  # Overwrite positions 0x10-0x11
os.pwrite(fd, b"\xAA\xBB", 0x80)  # Overwrite positions 0x80-0x81

# Verify changes
os.lseek(fd, 0, os.SEEK_SET)
content = os.read(fd, 256)

print(f"Byte at 0x10: {hex(content[0x10])}")
print(f"Byte at 0x11: {hex(content[0x11])}")
print(f"Byte at 0x80: {hex(content[0x80])}")
print(f"Byte at 0x81: {hex(content[0x81])}")

os.close(fd)

This creates a binary file with a known pattern, then modifies specific
byte ranges using pwrite. The rest of the file remains unchanged.

This technique is useful for binary file formats where you need to modify
specific headers or data structures within a larger file.

## Performance Comparison

This example compares pwrite performance with regular write
when doing random access to a large file.

performance.py
  

import os
import time
import random

def test_pwrite(fd, positions):
    start = time.time()
    for pos in positions:
        os.pwrite(fd, b"X", pos)
    return time.time() - start

def test_write(fd, positions):
    start = time.time()
    for pos in positions:
        os.lseek(fd, pos, os.SEEK_SET)
        os.write(fd, b"X")
    return time.time() - start

# Create a large test file
fd = os.open("perf_test.dat", os.O_RDWR | os.O_CREAT)
os.ftruncate(fd, 1000000)  # 1MB file

# Generate random positions
positions = [random.randint(0, 999999) for _ in range(1000)]

# Test pwrite
pwrite_time = test_pwrite(fd, positions)

# Test regular write
write_time = test_write(fd, positions)

os.close(fd)

print(f"pwrite time: {pwrite_time:.4f} seconds")
print(f"write time: {write_time:.4f} seconds")
print(f"Ratio: {write_time/pwrite_time:.2f}x")

This benchmarks writing to 1000 random positions in a 1MB file. pwrite
typically performs better by avoiding repeated seek operations.

The performance difference grows with more random writes, making pwrite
ideal for certain database-like operations.

## Security Considerations

- **File descriptors:** Requires proper file descriptor management

- **Atomic writes:** Writes up to PIPE_BUF bytes are atomic

- **Error handling:** Always check return value for partial writes

- **Concurrency:** Safe for multi-threaded use with proper coordination

- **Platform support:** Available on Unix-like systems, not Windows

## Best Practices

- **Use for random access:** Ideal for writing at known offsets

- **Check return values:** Verify all bytes were written

- **Combine with pread:** For read-modify-write cycles

- **Consider file sync:** Use fsync for durability when needed

- **Prefer for large files:** More efficient than seek+write

## Source References

- [Python os.pwrite Documentation](https://docs.python.org/3/library/os.html#os.pwrite)

- [Linux pwrite(2) man page](https://man7.org/linux/man-pages/man2/pwrite.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).