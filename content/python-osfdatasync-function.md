+++
title = "Python os.fdatasync Function"
date = 2025-08-29T20:09:10.626+01:00
draft = false
description = "Complete guide to Python's os.fdatasync function covering file synchronization, data flushing, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.fdatasync Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.fdatasync function,
which forces write of file data to disk. We'll cover synchronization methods,
performance implications, and practical file I/O examples.

## Basic Definitions

The os.fdatasync function forces write of file data to disk without
necessarily writing metadata. It's similar to fsync but more efficient.

Key differences: fdatasync only flushes data, not metadata (like file size).
This makes it faster than fsync for cases where metadata doesn't change.

## Basic File Synchronization

This example shows basic usage of fdatasync to ensure data is written to disk
after file operations. This is crucial for critical data integrity.

basic_sync.py
  

import os

# Open file for writing
with open("important.log", "w") as f:
    f.write("Critical transaction data\n")
    # Force data to disk
    os.fdatasync(f.fileno())
    print("Data safely written to disk")

# Verify the write
with open("important.log", "r") as f:
    print(f.read())

The example writes data to a file and immediately forces it to disk using
fdatasync. This ensures data persists even if the system crashes.

Note we use fileno() to get the file descriptor from the file object before
passing it to fdatasync.

## Comparing fsync and fdatasync

This example demonstrates the performance difference between fsync and fdatasync
by timing multiple write operations with each synchronization method.

sync_comparison.py
  

import os
import time

def test_sync(method, filename):
    start = time.time()
    with open(filename, "w") as f:
        for i in range(1000):
            f.write(f"Line {i}\n")
            if method == "fsync":
                os.fsync(f.fileno())
            else:
                os.fdatasync(f.fileno())
    return time.time() - start

# Test both methods
fsync_time = test_sync("fsync", "fsync_test.log")
fdatasync_time = test_sync("fdatasync", "fdatasync_test.log")

print(f"fsync time: {fsync_time:.3f} seconds")
print(f"fdatasync time: {fdatasync_time:.3f} seconds")
print(f"Difference: {(fsync_time-fdatasync_time):.3f} seconds")

The test writes 1000 lines to files using each sync method. fdatasync is
typically faster as it doesn't flush metadata to disk.

The performance difference depends on filesystem and hardware, but fdatasync
generally has less overhead than fsync.

## Database Transaction Safety

This example shows how fdatasync can be used to ensure database transaction
durability without the full overhead of fsync.

db_transaction.py
  

import os
import sqlite3

def safe_transaction(db_file):
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    
    # Create table if not exists
    cursor.execute("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, value TEXT)")
    
    # Perform transaction
    cursor.execute("INSERT INTO data (value) VALUES ('important')")
    conn.commit()
    
    # Force data to disk
    db_fd = os.open(db_file, os.O_RDWR)
    os.fdatasync(db_fd)
    os.close(db_fd)
    
    print("Transaction committed and synced")
    conn.close()

safe_transaction("test.db")

The example performs a SQLite transaction and ensures the data is flushed to
disk using fdatasync. This provides durability with better performance.

Note we directly open the file descriptor for the database file to sync it,
as SQLite's Python interface doesn't expose the file descriptor.

## Log File Rotation with Sync

This example demonstrates proper log file rotation with data synchronization
to prevent data loss during the rotation process.

log_rotation.py
  

import os
import time
from datetime import datetime

LOG_FILE = "app.log"
MAX_SIZE = 1024  # 1KB for demonstration

def write_log(message):
    with open(LOG_FILE, "a") as f:
        f.write(f"{datetime.now()}: {message}\n")
        os.fdatasync(f.fileno())

def rotate_logs():
    if os.path.exists(LOG_FILE) and os.path.getsize(LOG_FILE) &gt; MAX_SIZE:
        timestamp = int(time.time())
        os.rename(LOG_FILE, f"app_{timestamp}.log")
        # Create new empty log file
        with open(LOG_FILE, "w") as f:
            os.fdatasync(f.fileno())

# Test log writing and rotation
for i in range(50):
    write_log(f"Test message {i}")
    rotate_logs()
    time.sleep(0.1)

The example writes log messages and rotates the log file when it exceeds size.
Each write is synchronized with fdatasync to ensure no data loss.

The rotation process also syncs the new empty file to ensure filesystem
metadata is consistent after rotation.

## Configuring File Buffering

This example shows how to combine file buffering settings with fdatasync to
optimize performance while maintaining data integrity.

buffering.py
  

import os

def write_with_buffering(filename, buffer_size):
    # Open with specific buffer size
    with open(filename, "w", buffering=buffer_size) as f:
        for i in range(100):
            f.write(f"Data chunk {i}\n")
            # Sync at specific intervals
            if i % 10 == 0:
                os.fdatasync(f.fileno())
        # Final sync
        os.fdatasync(f.fileno())

# Test different buffer sizes
for size in [0, 1, 1024, 4096]:
    write_with_buffering(f"output_{size}.txt", size)
    print(f"Written with buffer size {size}")

The example tests different buffer sizes with periodic synchronization.
Smaller buffers reduce data loss risk but may impact performance.

The optimal buffer size depends on your specific use case and performance
requirements versus data integrity needs.

## Error Handling

This example demonstrates proper error handling when using fdatasync, as
the operation can fail for various reasons like disk full or I/O errors.

error_handling.py
  

import os
import errno

def safe_write(filename, data):
    try:
        with open(filename, "w") as f:
            f.write(data)
            try:
                os.fdatasync(f.fileno())
                print("Data successfully written and synced")
            except OSError as e:
                if e.errno == errno.EIO:
                    print("I/O error during sync - data may be corrupted")
                elif e.errno == errno.ENOSPC:
                    print("No space left on device")
                else:
                    print(f"Sync failed: {e}")
    except IOError as e:
        print(f"File operation failed: {e}")

# Test with good and bad scenarios
safe_write("good.txt", "This should work")
safe_write("/full/device.txt", "This should fail if device is full")

The example shows comprehensive error handling for both file operations and
synchronization. Different error types are handled specifically.

Proper error handling is crucial when dealing with disk synchronization as
failures can indicate serious storage problems.

## Platform Considerations

This example demonstrates platform-specific behavior of fdatasync and provides
a cross-platform wrapper function.

cross_platform.py
  

import os
import sys

def safe_sync(fd):
    """Cross-platform file synchronization"""
    if hasattr(os, 'fdatasync'):
        # Unix-like systems
        os.fdatasync(fd)
    else:
        # Windows or other platforms
        os.fsync(fd)

def write_data(filename):
    with open(filename, "w") as f:
        f.write("Cross-platform data\n")
        safe_sync(f.fileno())
        print("Data written and synced")

write_data("data.txt")
print(f"Running on: {sys.platform}")

The example provides a cross-platform solution that uses fdatasync where
available and falls back to fsync otherwise.

On Windows, fdatasync is not available, so fsync is used instead. The behavior
is similar but not identical.

## Performance Implications

- **Disk I/O:** fdatasync forces physical write operations

- **Metadata:** Doesn't flush metadata like fsync does

- **Battery life:** Can impact mobile device battery life

- **Throughput:** Reduces write throughput significantly

- **Latency:** Increases write latency due to disk sync

## Best Practices

- **Use sparingly:** Only for critical data that must persist

- **Batch operations:** Group writes and sync once if possible

- **Error handling:** Always handle potential sync failures

- **Testing:** Test behavior on your specific filesystem

- **Alternatives:** Consider write-through modes if available

## Source References

- [Python os.fdatasync Documentation](https://docs.python.org/3/library/os.html#os.fdatasync)

- [Linux fdatasync(2) man page](https://man7.org/linux/man-pages/man2/fdatasync.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).