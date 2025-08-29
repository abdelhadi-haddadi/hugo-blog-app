+++
title = "Python os.pread Function"
date = 2025-08-29T20:09:28.643+01:00
draft = false
description = "Complete guide to Python's os.pread function covering file descriptor reading, offset handling, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.pread Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.pread function,
which reads from a file descriptor at a specific offset. We'll cover file
descriptors, offset handling, and practical low-level file I/O examples.

## Basic Definitions

The os.pread function reads data from a file descriptor at a
specified offset without changing the file position. It's thread-safe and
useful for random access file operations.

Key parameters: fd (file descriptor), n (number of bytes to read), offset
(position to read from). Returns bytes read as a bytes object.

## Basic File Reading

This example demonstrates the simplest use of os.pread to read
from a file at a specific offset. We first open a file to get its descriptor.

basic_read.py
  

import os

# Create a test file
with open("data.txt", "w") as f:
    f.write("Hello World! This is a test file.")

# Open file and get descriptor
fd = os.open("data.txt", os.O_RDONLY)

# Read 5 bytes from offset 6
data = os.pread(fd, 5, 6)
print(f"Read data: {data.decode()}")  # Output: World

os.close(fd)

The code creates a test file, opens it to get a file descriptor, then uses
os.pread to read "World" from offset 6. The file position isn't
affected by this operation.

Note we use os.open for low-level file descriptor access and
must manually close it with os.close.

## Reading Large Files in Chunks

os.pread is ideal for reading large files in chunks at specific
offsets. This example shows how to process a file in fixed-size blocks.

chunked_read.py
  

import os

# Create a large test file (1MB)
with open("large.bin", "wb") as f:
    f.write(os.urandom(1024 * 1024))

fd = os.open("large.bin", os.O_RDONLY)
chunk_size = 4096  # 4KB chunks
offset = 0

while True:
    data = os.pread(fd, chunk_size, offset)
    if not data:
        break  # End of file
    
    print(f"Read {len(data)} bytes from offset {offset}")
    # Process chunk here
    offset += len(data)

os.close(fd)

This creates a 1MB random binary file, then reads it in 4KB chunks using
os.pread. The offset is manually advanced after each read.

The loop continues until os.pread returns an empty bytes object,
indicating end of file. Each read operation is independent and thread-safe.

## Thread-Safe Parallel Reading

os.pread is thread-safe as it doesn't modify the file position.
This example demonstrates parallel reading from multiple threads.

threaded_read.py
  

import os
import threading

def read_chunk(fd, offset, size):
    data = os.pread(fd, size, offset)
    print(f"Thread {threading.get_ident()}: Read {len(data)} bytes from {offset}")

# Create test file
with open("parallel.txt", "w") as f:
    f.write("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

fd = os.open("parallel.txt", os.O_RDONLY)

# Create threads to read different sections
threads = []
for i in range(0, 26, 5):
    t = threading.Thread(target=read_chunk, args=(fd, i, 5))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

os.close(fd)

This creates multiple threads that read different 5-byte chunks from the file
simultaneously. Each thread specifies its own offset without interfering with
others.

The thread-safety comes from os.pread not using or modifying the
shared file position that traditional read operations would use.

## Reading from Specific File Positions

This example shows how to use os.pread to read from calculated
positions in a structured binary file, similar to a database record access.

structured_read.py
  

import os
import struct

# Create structured binary file
records = [
    struct.pack("i10s", 1, b"Alice"),
    struct.pack("i10s", 2, b"Bob"),
    struct.pack("i10s", 3, b"Charlie")
]
with open("records.bin", "wb") as f:
    f.write(b"".join(records))

fd = os.open("records.bin", os.O_RDONLY)
record_size = struct.calcsize("i10s")

# Read second record
data = os.pread(fd, record_size, record_size)
id, name = struct.unpack("i10s", data)
print(f"Record 2: ID={id}, Name={name.decode().strip()}")

os.close(fd)

We create a binary file with fixed-size records, then use os.pread
to directly access the second record by calculating its offset.

The record size is calculated using struct.calcsize, allowing
precise positioning in the file without maintaining a file position pointer.

## Handling Partial Reads

os.pread may return fewer bytes than requested. This example
demonstrates proper handling of partial reads and end-of-file conditions.

partial_read.py
  

import os

# Create small test file
with open("small.txt", "w") as f:
    f.write("Short")

fd = os.open("small.txt", os.O_RDONLY)

# Attempt to read more bytes than available
data = os.pread(fd, 100, 0)
print(f"Read {len(data)} bytes: {data.decode()}")  # Output: 5 bytes

# Read beyond EOF
data = os.pread(fd, 10, 10)
print(f"Read {len(data)} bytes from offset 10")  # Output: 0 bytes

os.close(fd)

The first read attempts to get 100 bytes but only receives 5 (the file size).
The second read starts beyond EOF and returns an empty bytes object.

Applications must always check the returned data length rather than assuming
the requested number of bytes was read.

## Comparing with Regular File Reading

This example contrasts os.pread with traditional file reading
methods, showing how file position is unaffected by os.pread.

compare_read.py
  

import os

# Create test file
with open("compare.txt", "w") as f:
    f.write("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

fd = os.open("compare.txt", os.O_RDONLY)

# Traditional read (affects position)
os.lseek(fd, 10, os.SEEK_SET)
data1 = os.read(fd, 5)
print(f"Traditional read: {data1.decode()}")  # KLMNO

# pread doesn't affect position
data2 = os.pread(fd, 5, 15)
print(f"pread result: {data2.decode()}")  # PQRST
print(f"Current position: {os.lseek(fd, 0, os.SEEK_CUR)}")  # Still 15

os.close(fd)

After seeking to position 10, a traditional read advances the position to 15.
A subsequent os.pread at offset 15 doesn't affect the position.

This demonstrates os.pread's key advantage: reading at specific
offsets without disturbing the current file position.

## Error Handling

This example shows proper error handling for os.pread, including
invalid file descriptors, bad offsets, and interrupted system calls.

error_handling.py
  

import os
import errno

try:
    # Attempt read from invalid descriptor
    data = os.pread(9999, 10, 0)
except OSError as e:
    print(f"Error reading: {e.errno} ({errno.errorcode[e.errno]})")

# Valid file but bad offset
try:
    fd = os.open("example.txt", os.O_RDONLY | os.O_CREAT, 0o644)
    data = os.pread(fd, 10, -5)  # Invalid offset
except OSError as e:
    print(f"Invalid offset error: {e}")
finally:
    if 'fd' in locals():
        os.close(fd)

The first attempt fails with EBADF (bad file descriptor). The second fails
with EINVAL due to negative offset. Always handle such errors gracefully.

Note the use of errno.errorcode to translate numeric error codes
to their symbolic names for better error reporting.

## Performance Considerations

- **Thread safety:** pread is atomic and doesn't affect file position

- **Kernel calls:** Each pread is a separate system call

- **Buffer size:** Larger reads are generally more efficient

- **Position tracking:** No need to manage file position

- **Caching:** OS may cache frequently accessed regions

## Best Practices

- **Check return size:** Always verify bytes read

- **Handle errors:** Catch OSError for robust code

- **Use appropriate size:** Balance between many small and few large reads

- **Close descriptors:** Always close file descriptors

- **Consider alternatives:** For simple cases, regular file objects may suffice

## Source References

- [Python os.pread Documentation](https://docs.python.org/3/library/os.html#os.pread)

- [Linux pread(2) man page](https://man7.org/linux/man-pages/man2/pread.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).