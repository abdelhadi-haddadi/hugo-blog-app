+++
title = "Python os.closerange Function"
date = 2025-08-29T20:09:05.033+01:00
draft = false
description = "Complete guide to Python's os.closerange function covering file descriptor management, resource cleanup, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.closerange Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.closerange function,
which efficiently closes a range of file descriptors. We'll cover its parameters,
use cases, and practical examples for resource management.

## Basic Definitions

The os.closerange function closes all file descriptors from
fd_low (inclusive) to fd_high (exclusive). It ignores errors during closing.

Key parameters: fd_low (first descriptor to close), fd_high (stop before this
descriptor). Returns None. Part of Python's os module for OS interactions.

## Closing a Range of File Descriptors

This basic example demonstrates how to close descriptors 3 through 9. The
function will attempt to close descriptors 3, 4, 5, 6, 7, and 8.

basic_closerange.py
  

import os

# Open several files to get multiple descriptors
files = [open(f"file_{i}.txt", "w") for i in range(10)]

# Get their file descriptors
fds = [f.fileno() for f in files]

print(f"Open descriptors before: {fds}")

# Close descriptors 3 through 9 (3-8)
os.closerange(3, 9)

# Verify which descriptors are still open
remaining_fds = [f.fileno() for f in files[:3] + files[9:]]
print(f"Open descriptors after: {remaining_fds}")

# Clean up remaining files
for f in files[:3] + files[9:]:
    f.close()

This creates 10 files, then closes descriptors 3 through 8 using closerange.
The first 3 and last file remain open until explicitly closed.

Note that file objects should still be properly closed even after their
underlying descriptors are closed with closerange.

## Closing All Descriptors Above a Threshold

A common use case is closing all descriptors above a certain number, often
used after fork() to clean up unwanted file descriptors.

close_above_threshold.py
  

import os
import resource

# Get maximum number of open files
max_fd = resource.getrlimit(resource.RLIMIT_NOFILE)[0]

# Open several files
files = [open(f"temp_{i}.txt", "w") for i in range(5)]
fds = [f.fileno() for f in files]

print(f"Current open descriptors: {fds}")

# Close all descriptors above 3
os.closerange(3, max_fd)

# Verify closed descriptors
try:
    for fd in fds:
        if fd &gt;= 3:
            os.fstat(fd)  # Will raise OSError if closed
except OSError as e:
    print(f"Descriptor check failed: {e}")

# Clean up
for f in files:
    if not f.closed:
        f.close()

This example closes all descriptors from 3 up to the system's maximum. The
resource module helps determine the upper bound for the close operation.

The try-except block demonstrates how to verify descriptors were actually
closed by attempting operations on them.

## Error Handling with closerange

os.closerange silently ignores errors when closing descriptors. This example
shows how to implement custom error handling around it.

error_handling.py
  

import os

def safe_closerange(fd_low, fd_high):
    """Close range with basic error reporting"""
    open_fds = []
    
    # Check which descriptors in range are actually open
    for fd in range(fd_low, fd_high):
        try:
            os.fstat(fd)
            open_fds.append(fd)
        except OSError:
            pass
    
    # Perform the close
    os.closerange(fd_low, fd_high)
    
    # Verify which descriptors were successfully closed
    closed = []
    remaining = []
    for fd in open_fds:
        try:
            os.fstat(fd)
            remaining.append(fd)
        except OSError:
            closed.append(fd)
    
    return closed, remaining

# Example usage
closed, remaining = safe_closerange(3, 10)
print(f"Successfully closed: {closed}")
print(f"Still open: {remaining}")

This wrapper function provides basic error reporting by checking descriptor
status before and after the closerange operation.

While not foolproof due to potential race conditions, it offers more visibility
than the standard closerange behavior.

## Using closerange in a Daemon

Daemon processes often use closerange to clean up file descriptors after
forking. This example demonstrates a simple daemonization pattern.

daemon_example.py
  

import os
import sys
import time

def daemonize():
    # First fork
    try:
        pid = os.fork()
        if pid &gt; 0:
            sys.exit(0)  # Exit parent
    except OSError as e:
        sys.stderr.write(f"First fork failed: {e}\n")
        sys.exit(1)
    
    # Create new session
    os.setsid()
    
    # Second fork
    try:
        pid = os.fork()
        if pid &gt; 0:
            sys.exit(0)
    except OSError as e:
        sys.stderr.write(f"Second fork failed: {e}\n")
        sys.exit(1)
    
    # Close all open file descriptors
    max_fd = os.sysconf('SC_OPEN_MAX')
    if max_fd == -1:  # Default to 1024 if unknown
        max_fd = 1024
    os.closerange(0, max_fd)
    
    # Redirect standard file descriptors to /dev/null
    devnull = os.open('/dev/null', os.O_RDWR)
    for fd in (0, 1, 2):  # stdin, stdout, stderr
        os.dup2(devnull, fd)
    
    # Daemon main loop
    while True:
        with open("/tmp/daemon.log", "a") as f:
            f.write(f"Daemon running at {time.ctime()}\n")
        time.sleep(5)

if __name__ == "__main__":
    daemonize()

This shows a standard daemonization process where closerange helps clean up
all file descriptors before the daemon begins its work.

The example includes double-forking, session creation, and proper handling of
standard I/O descriptors.

## Selective Descriptor Preservation

Sometimes you need to close most descriptors but preserve a few. This example
shows how to combine closerange with selective preservation.

preserve_descriptors.py
  

import os
import sys

def isolate_process(preserve_fds=[]):
    """Close all descriptors except those specified"""
    max_fd = 1024  # Default reasonable maximum
    
    # Close lower range (0 to first preserved fd)
    if preserve_fds:
        os.closerange(0, min(preserve_fds))
    
    # Close ranges between preserved fds
    sorted_fds = sorted(preserve_fds)
    for i in range(len(sorted_fds) - 1):
        os.closerange(sorted_fds[i] + 1, sorted_fds[i + 1])
    
    # Close upper range (last preserved fd to max)
    if sorted_fds:
        os.closerange(sorted_fds[-1] + 1, max_fd)
    else:
        os.closerange(0, max_fd)

# Example usage
log_fd = os.open("preserved.log", os.O_WRONLY | os.O_CREAT)
sock_fd = os.open("/dev/tty", os.O_RDWR)

print(f"Preserving descriptors: {log_fd}, {sock_fd}")
isolate_process(preserve_fds=[log_fd, sock_fd])

# Verify
try:
    os.write(log_fd, b"Still open\n")
    os.write(sock_fd, b"Still open\n")
    print("Preserved descriptors still functional")
except OSError as e:
    print(f"Descriptor error: {e}")

# Clean up
os.close(log_fd)
os.close(sock_fd)

This function closes all descriptors except those explicitly listed in
preserve_fds. It handles ranges efficiently around the preserved descriptors.

The example preserves a log file and terminal descriptor while closing all
others in the assumed range.

## Portable Descriptor Management

This example shows a more portable approach to descriptor management that works
across different Unix-like systems with varying maximum descriptor values.

portable_closerange.py
  

import os
import resource
import sys

def portable_descriptor_cleanup(keep_fds=[]):
    """Portable descriptor cleanup across Unix systems"""
    try:
        # Try to get system maximum
        max_fd = resource.getrlimit(resource.RLIMIT_NOFILE)[0]
        if max_fd == resource.RLIM_INFINITY:
            max_fd = 1024  # Fallback value
    except (AttributeError, ValueError):
        max_fd = 1024  # Default fallback
    
    # Get actually open descriptors
    open_fds = set()
    for fd in range(max_fd):
        try:
            os.fstat(fd)
            open_fds.add(fd)
        except OSError:
            pass
    
    # Close all not in keep_fds
    for fd in open_fds:
        if fd not in keep_fds:
            try:
                os.close(fd)
            except OSError:
                pass  # Already closed or invalid

# Example usage
important_fd = os.open("critical.log", os.O_WRONLY | os.O_CREAT)

print(f"Preserving descriptor: {important_fd}")
portable_descriptor_cleanup(keep_fds=[important_fd, 0, 1, 2])

# Verify
try:
    os.write(important_fd, b"Still working\n")
    print("Preserved descriptor functional")
except OSError as e:
    print(f"Descriptor error: {e}")

os.close(important_fd)

This approach is more robust than simple closerange as it first detects which
descriptors are actually open before attempting to close them.

It preserves standard descriptors (0,1,2) by default along with any explicitly
listed descriptors, making it suitable for daemon and security applications.

## Security Considerations

- **Resource leaks:** Failing to close descriptors can lead to leaks

- **Security risks:** Unintentionally open descriptors pose risks

- **Portability:** Maximum descriptor values vary across systems

- **Race conditions:** Descriptors can be opened between check and close

- **Silent failures:** closerange doesn't report which closes failed

## Best Practices

- **Use in daemons:** Essential for proper daemonization

- **Combine with dup2:** Redirect standard descriptors first

- **Consider context:** May not be needed in managed environments

- **Document preserved fds:** Clearly note which descriptors stay open

- **Test thoroughly:** Verify behavior on target platforms

## Source References

- [Python os.closerange Documentation](https://docs.python.org/3/library/os.html#os.closerange)

- [Linux close(2) man page](https://man7.org/linux/man-pages/man2/close.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).