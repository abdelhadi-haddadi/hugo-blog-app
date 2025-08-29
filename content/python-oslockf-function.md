+++
title = "Python os.lockf Function"
date = 2025-08-29T20:09:23.046+01:00
draft = false
description = "Complete guide to Python's os.lockf function covering file locking, advisory locks, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.lockf Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.lockf function,
which applies, tests or removes POSIX advisory locks on open files. We'll
cover lock types, blocking behavior, and practical synchronization examples.

## Basic Definitions

The os.lockf function manipulates file locks on open file
descriptors. It provides advisory locking - processes must cooperate by
checking locks. Locks are released when the file is closed or process exits.

Key parameters: fd (file descriptor), cmd (lock operation: F_LOCK, F_TLOCK,
F_ULOCK, F_TEST), len (bytes to lock, 0 means to EOF). Works on Unix-like
systems only.

## Basic File Locking

This example demonstrates acquiring and releasing an exclusive lock on a file.
The F_LOCK command blocks until the lock can be acquired if another process
holds it.

basic_lock.py
  

import os

file_path = "data.txt"

# Open file and acquire lock
with open(file_path, "w") as f:
    fd = f.fileno()
    os.lockf(fd, os.F_LOCK, 0)  # Lock entire file
    
    # Critical section
    f.write("Important data\n")
    
    # Lock automatically released when file closes
    print("Lock released automatically")

print("File closed and lock released")

The lock is acquired for the entire file (len=0) and held during the write
operation. The lock is automatically released when the file is closed.

This ensures only one process can write to the file at a time, preventing
data corruption from concurrent writes.

## Non-blocking Lock Attempt

The F_TLOCK command attempts to acquire a lock without blocking. If the lock
is unavailable, it raises an OSError instead of waiting.

nonblocking_lock.py
  

import os
import time

file_path = "shared.txt"

try:
    with open(file_path, "w") as f:
        fd = f.fileno()
        try:
            os.lockf(fd, os.F_TLOCK, 0)
            print("Lock acquired successfully")
            f.write("Exclusive data\n")
            time.sleep(2)  # Simulate work
        except OSError:
            print("Could not acquire lock - file is locked by another process")
except IOError as e:
    print(f"File error: {e}")

This attempts to get an immediate lock. If another process holds the lock,
it catches the OSError and continues without blocking the program.

Non-blocking locks are useful when you want to try an operation but don't
want to wait indefinitely for resources.

## Testing for Existing Locks

The F_TEST command checks if a lock could be acquired without actually
acquiring it. This is useful for testing lock status before attempting
operations.

test_lock.py
  

import os

file_path = "status.log"

with open(file_path, "r+") as f:
    fd = f.fileno()
    
    try:
        os.lockf(fd, os.F_TEST, 0)
        print("File is not locked - safe to proceed")
        
        # Now acquire the lock for real
        os.lockf(fd, os.F_LOCK, 0)
        print("Lock acquired")
        
        # Read and update file
        data = f.read()
        f.seek(0)
        f.write(f"Updated: {data}")
        
    except OSError:
        print("File is currently locked by another process")

First we test if the file is locked, then proceed with the actual lock if
it's available. This two-step approach can be useful for user feedback.

Note there's still a race condition between the test and actual lock - the
file could become locked by another process in between these operations.

## Partial File Locking

Instead of locking the entire file, we can lock specific byte ranges. This
allows different processes to work on different parts of the same file.

partial_lock.py
  

import os

file_path = "database.bin"
record_size = 100

def update_record(record_num, data):
    with open(file_path, "r+b") as f:
        fd = f.fileno()
        offset = record_num * record_size
        
        # Lock only this record
        os.lockf(fd, os.F_LOCK, record_size)
        f.seek(offset)
        f.write(data)
        print(f"Updated record {record_num}")
        
        # Lock released when file closes

# Simulate updating different records
update_record(0, b"X" * 100)  # Lock first 100 bytes
update_record(1, b"Y" * 100)  # Lock next 100 bytes

Each call locks only a specific 100-byte segment of the file, allowing
concurrent updates to different records. The lock starts at the current
file position.

This technique is useful for database-like applications where different
processes need to update different parts of a shared file.

## Process Synchronization

This example demonstrates using file locks to coordinate between multiple
processes, ensuring only one process executes critical code at a time.

process_sync.py
  

import os
import time
from multiprocessing import Process

lock_file = "process.lock"

def worker(pid):
    print(f"Process {pid} starting")
    
    with open(lock_file, "w") as f:
        try:
            os.lockf(f.fileno(), os.F_LOCK, 0)
            print(f"Process {pid} acquired lock")
            time.sleep(2)  # Simulate work
            print(f"Process {pid} releasing lock")
        except OSError as e:
            print(f"Process {pid} lock failed: {e}")

# Create multiple processes
processes = [Process(target=worker, args=(i,)) for i in range(3)]
for p in processes:
    p.start()
for p in processes:
    p.join()

os.unlink(lock_file)

Three processes compete for the lock. The first to acquire it executes its
critical section while others wait. Each process gets exclusive access in turn.

This pattern is useful for ensuring only one instance of a distributed job
runs at a time across multiple machines sharing a filesystem.

## Lock Timeout Pattern

While os.lockf doesn't directly support timeouts, we can implement a timeout
by combining F_TLOCK with retries and delays.

lock_timeout.py
  

import os
import time

file_path = "timed_lock.txt"
timeout = 5  # seconds
retry_interval = 0.1

def acquire_with_timeout():
    start_time = time.time()
    with open(file_path, "w") as f:
        fd = f.fileno()
        while True:
            try:
                os.lockf(fd, os.F_TLOCK, 0)
                print("Lock acquired")
                return True
            except OSError:
                if time.time() - start_time &gt; timeout:
                    print("Timeout waiting for lock")
                    return False
                time.sleep(retry_interval)

if acquire_with_timeout():
    try:
        # Critical section
        print("Doing work...")
        time.sleep(1)
    finally:
        # Lock released when file closes
        pass
else:
    print("Failed to acquire lock within timeout")

This attempts to acquire the lock in a non-blocking way, retrying until
either successful or timeout expires. The retry interval controls how often
to check.

This pattern is useful when you need to limit how long to wait for a resource
before giving up or trying alternative approaches.

## Unlocking Specific Sections

The F_ULOCK command releases a previously acquired lock. This allows finer
control than waiting for file close, but must match the original lock range.

explicit_unlock.py
  

import os

file_path = "explicit.txt"

with open(file_path, "w+") as f:
    fd = f.fileno()
    
    # Lock first 50 bytes
    os.lockf(fd, os.F_LOCK, 50)
    f.write("Locked data")
    print("First section locked and written")
    
    # Explicitly unlock first section
    os.lockf(fd, os.F_ULOCK, 50)
    print("First section unlocked")
    
    # Now lock remaining file
    f.seek(50)
    os.lockf(fd, os.F_LOCK, 0)
    f.write("Second locked section")
    print("Remaining file locked and written")
    
    # Final unlock happens automatically

We first lock and write to the beginning of the file, then explicitly
release that lock before locking the remainder. This shows fine-grained
control over locked regions.

Explicit unlocking is useful when different parts of your code need to
manage locks independently of file handle lifetime.

## Security Considerations

- **Advisory only:** Processes must cooperate by checking locks

- **No deadlock detection:** Can deadlock if not careful

- **File descriptor based:** Locks tied to fd, not file object

- **Automatic cleanup:** Locks released on process termination

- **Unix-only:** Not available on Windows systems

## Best Practices

- **Minimize locked time:** Hold locks only as long as needed

- **Use context managers:** Ensure locks are properly released

- **Document locking strategy:** Make expectations clear

- **Consider alternatives:** For complex cases, use threading.Lock

- **Handle errors:** Always prepare for lock acquisition failures

## Source References

- [Python os.lockf Documentation](https://docs.python.org/3/library/os.html#os.lockf)

- [Linux lockf(3) man page](https://man7.org/linux/man-pages/man3/lockf.3.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).