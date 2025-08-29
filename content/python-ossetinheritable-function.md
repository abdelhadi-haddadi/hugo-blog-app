+++
title = "Python os.set_inheritable Function"
date = 2025-08-29T20:09:38.922+01:00
draft = false
description = "Complete guide to Python's os.set_inheritable function covering file descriptor inheritance and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.set_inheritable Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.set_inheritable function,
which controls file descriptor inheritance across process creation. We'll cover
inheritance flags, process management, and practical examples.

## Basic Definitions

The os.set_inheritable function sets the inheritable flag of a
file descriptor. This determines if child processes can inherit the descriptor.

Key parameters: fd (file descriptor), inheritable (boolean flag). Returns None.
Available on Unix and Windows systems with different underlying implementations.

## Basic Usage Example

This example demonstrates setting a file descriptor as inheritable before
spawning a child process. The child process will inherit the open file.

basic_inheritance.py
  

import os

# Create a temporary file
fd = os.open("test.txt", os.O_RDWR | os.O_CREAT)

# Make the file descriptor inheritable
os.set_inheritable(fd, True)

# Spawn a child process
pid = os.fork()

if pid == 0:  # Child process
    print(f"Child process with PID {os.getpid()}")
    os.write(fd, b"Written by child\n")
    os.close(fd)
else:  # Parent process
    print(f"Parent process with PID {os.getpid()}")
    os.waitpid(pid, 0)  # Wait for child
    os.lseek(fd, 0, os.SEEK_SET)
    print("File content:", os.read(fd, 100))
    os.close(fd)
    os.unlink("test.txt")

The parent creates a file and sets it as inheritable before forking. Both
processes can then write to the same file descriptor.

This demonstrates basic inheritance behavior between parent and child processes.

## Preventing Inheritance

This example shows how to prevent a file descriptor from being inherited by
child processes. This is useful for security-sensitive file operations.

prevent_inheritance.py
  

import os

# Open a sensitive file
fd = os.open("secret.txt", os.O_RDONLY)

# Explicitly prevent inheritance
os.set_inheritable(fd, False)

# Spawn child process
pid = os.fork()

if pid == 0:  # Child process
    try:
        # Attempt to read from the file
        print(os.read(fd, 100))
    except OSError as e:
        print(f"Child failed to access file: {e}")
    finally:
        os._exit(0)
else:  # Parent process
    os.waitpid(pid, 0)
    print("Parent can still read:", os.read(fd, 100))
    os.close(fd)

The parent opens a file but prevents inheritance. The child process fails to
access the file descriptor while the parent retains access.

This technique helps protect sensitive resources from being accessed by child
processes.

## Inheritance with Pipes

This example demonstrates inheritance behavior with pipe file descriptors,
which are commonly used for inter-process communication.

pipe_inheritance.py
  

import os

# Create a pipe
r, w = os.pipe()

# Set read end as inheritable
os.set_inheritable(r, True)

pid = os.fork()

if pid == 0:  # Child process
    os.close(w)  # Close write end
    print("Child received:", os.read(r, 100))
    os.close(r)
else:  # Parent process
    os.close(r)  # Close read end
    os.write(w, b"Message from parent")
    os.close(w)
    os.waitpid(pid, 0)

The parent creates a pipe and sets the read end as inheritable. The child
process inherits the read descriptor and can receive data from the parent.

Pipes are a common use case for controlled descriptor inheritance.

## Checking Inheritance Status

This example shows how to check the current inheritance status of a file
descriptor using os.get_inheritable.

check_inheritance.py
  

import os

fd = os.open("temp.txt", os.O_RDWR | os.O_CREAT)

# Check default inheritance status
print("Default inheritable:", os.get_inheritable(fd))

# Change and verify status
os.set_inheritable(fd, True)
print("After setting True:", os.get_inheritable(fd))

os.set_inheritable(fd, False)
print("After setting False:", os.get_inheritable(fd))

os.close(fd)
os.unlink("temp.txt")

The code opens a file and checks its default inheritance status. It then
modifies and verifies the status changes.

This demonstrates how to inspect and modify inheritance flags dynamically.

## Inheritance with Subprocess

This example shows how file descriptor inheritance works with Python's
subprocess module.

subprocess_inheritance.py
  

import os
import subprocess

# Create a file and make inheritable
fd = os.open("output.txt", os.O_RDWR | os.O_CREAT)
os.set_inheritable(fd, True)

# Launch subprocess with inherited descriptor
proc = subprocess.Popen(
    ["python3", "-c", f"import os; os.write({fd}, b'Written by subprocess\\n')"],
    pass_fds=[fd]
)

proc.wait()

# Verify content
os.lseek(fd, 0, os.SEEK_SET)
print("File content:", os.read(fd, 100))
os.close(fd)
os.unlink("output.txt")

The parent process opens a file and explicitly passes it to a subprocess.
The subprocess inherits the descriptor and writes to the file.

This demonstrates controlled inheritance with Python's higher-level process API.

## Windows-Specific Behavior

This example highlights Windows-specific behavior of set_inheritable,
where inheritance works differently than on Unix systems.

windows_inheritance.py
  

import os
import sys

if sys.platform != "win32":
    print("This example is for Windows only")
    sys.exit(1)

# On Windows, inheritance must be set at creation time
import msvcrt

fd = os.open("winfile.txt", os.O_RDWR | os.O_CREAT)

# Windows requires setting inheritable flag at creation
handle = msvcrt.get_osfhandle(fd)
print(f"Original handle inheritable: {msvcrt.HANDLE(handle).inheritable}")

# Try to modify inheritance (may not work as expected)
os.set_inheritable(fd, True)
print(f"After set_inheritable: {msvcrt.HANDLE(handle).inheritable}")

os.close(fd)
os.unlink("winfile.txt")

On Windows, inheritance flags are typically set at handle creation time.
set_inheritable may have limited effect compared to Unix systems.

This demonstrates important platform differences in descriptor inheritance.

## Security Considerations

- **Least privilege:** Only make necessary descriptors inheritable

- **Platform differences:** Windows and Unix handle inheritance differently

- **Resource leaks:** Inherited descriptors must be properly closed

- **Race conditions:** Set inheritance flags before process creation

- **Alternative approaches:** Consider higher-level IPC mechanisms

## Best Practices

- **Explicit control:** Always set inheritance flags explicitly

- **Cleanup:** Ensure proper descriptor cleanup in all processes

- **Documentation:** Document inheritance requirements clearly

- **Testing:** Verify behavior on all target platforms

- **Alternatives:** Consider pipes or sockets for IPC

## Source References

- [Python os.set_inheritable Documentation](https://docs.python.org/3/library/os.html#os.set_inheritable)

- [Linux fcntl(2) man page](https://man7.org/linux/man-pages/man2/fcntl.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).