+++
title = "Python os.get_inheritable Function"
date = 2025-08-29T20:09:19.604+01:00
draft = false
description = "Complete guide to Python's os.get_inheritable function covering file descriptor inheritance checks and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.get_inheritable Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.get_inheritable function,
which checks if a file descriptor can be inherited by child processes. We'll cover
file descriptor flags, inheritance behavior, and practical examples.

## Basic Definitions

The os.get_inheritable function checks if a file descriptor is
marked as inheritable. Inheritable descriptors are passed to child processes.

Key parameter: fd (file descriptor to check). Returns True if the descriptor
is inheritable, False otherwise. Available in Python 3.4+.

## Checking Standard Stream Inheritance

Standard streams (stdin, stdout, stderr) are typically inheritable. This
example checks their inheritance status.

std_inheritance.py
  

import os
import sys

# Check standard streams
print(f"stdin inheritable: {os.get_inheritable(sys.stdin.fileno())}")
print(f"stdout inheritable: {os.get_inheritable(sys.stdout.fileno())}")
print(f"stderr inheritable: {os.get_inheritable(sys.stderr.fileno())}")

# Check a regular file
with open("test.txt", "w") as f:
    print(f"Regular file inheritable: {os.get_inheritable(f.fileno())}")

This example first checks the standard streams, which usually return True.
Then it checks a newly opened file, which typically inherits the default
inheritance setting.

The results may vary based on platform and how the Python process was launched.

## Modifying Inheritance Flag

We can change inheritance status with os.set_inheritable and
verify changes with os.get_inheritable.

modify_inheritance.py
  

import os

# Create a temporary file
with open("temp.txt", "w") as f:
    fd = f.fileno()
    print(f"Original inheritable: {os.get_inheritable(fd)}")
    
    # Disable inheritance
    os.set_inheritable(fd, False)
    print(f"After disabling: {os.get_inheritable(fd)}")
    
    # Re-enable inheritance
    os.set_inheritable(fd, True)
    print(f"After re-enabling: {os.get_inheritable(fd)}")

This demonstrates changing a file descriptor's inheritance flag and verifying
the changes. The file descriptor remains valid after modification.

Note that changing inheritance affects only new child processes, not existing ones.

## Checking Pipe Inheritance

Pipes created with os.pipe can be checked for inheritance.
This example shows both read and write ends of a pipe.

pipe_inheritance.py
  

import os

# Create a pipe
r, w = os.pipe()

print(f"Read end inheritable: {os.get_inheritable(r)}")
print(f"Write end inheritable: {os.get_inheritable(w)}")

# Modify one end
os.set_inheritable(r, False)
print(f"Modified read end: {os.get_inheritable(r)}")

# Clean up
os.close(r)
os.close(w)

This creates a pipe and checks both ends' inheritance status. By default,
both ends are typically inheritable. We then modify one end's status.

Always remember to close file descriptors when they're no longer needed.

## Inheritance in Subprocesses

This example demonstrates how inheritance affects actual subprocess behavior.
We'll create a file and check its visibility in a child process.

subprocess_inheritance.py
  

import os
import subprocess

# Create a test file
with open("shared.txt", "w") as f:
    fd = f.fileno()
    print(f"Before change: {os.get_inheritable(fd)}")
    
    # Test with inheritable descriptor
    subprocess.run(["python", "-c", "import os; print(os.path.exists('shared.txt'))"])
    
    # Make non-inheritable and test again
    os.set_inheritable(fd, False)
    print(f"After change: {os.get_inheritable(fd)}")
    subprocess.run(["python", "-c", "import os; print(os.path.exists('shared.txt'))"])

The first subprocess can access the file because the descriptor is inheritable.
After disabling inheritance, the file remains accessible through the filesystem.

This shows the difference between descriptor inheritance and file path access.

## Comparing with fcntl Module

We can compare os.get_inheritable with the fcntl
module's approach to checking descriptor flags.

fcntl_comparison.py
  

import os
import fcntl

with open("compare.txt", "w") as f:
    fd = f.fileno()
    
    # Using os.get_inheritable
    print(f"os.get_inheritable: {os.get_inheritable(fd)}")
    
    # Using fcntl
    flags = fcntl.fcntl(fd, fcntl.F_GETFD)
    print(f"fcntl FD_CLOEXEC: {not bool(flags &amp; fcntl.FD_CLOEXEC)}")
    
    # Make them differ
    os.set_inheritable(fd, False)
    print("\nAfter change:")
    print(f"os.get_inheritable: {os.get_inheritable(fd)}")
    flags = fcntl.fcntl(fd, fcntl.F_GETFD)
    print(f"fcntl FD_CLOEXEC: {not bool(flags &amp; fcntl.FD_CLOEXEC)}")

This shows two ways to check inheritance status. os.get_inheritable
is simpler, while fcntl provides more control.

Note that FD_CLOEXEC is the inverse of inheritable - when set, the descriptor
is not inheritable.

## Platform Differences

This example demonstrates platform-specific behavior of os.get_inheritable
between Unix and Windows systems.

platform_differences.py
  

import os
import sys

def check_inheritance(fd):
    try:
        return os.get_inheritable(fd)
    except (AttributeError, OSError) as e:
        return f"Error: {e}"

# Check standard streams
print("Platform:", sys.platform)
print(f"stdin: {check_inheritance(sys.stdin.fileno())}")
print(f"stdout: {check_inheritance(sys.stdout.fileno())}")
print(f"stderr: {check_inheritance(sys.stderr.fileno())}")

# Check invalid descriptor
print(f"Invalid fd: {check_inheritance(9999)}")

This code checks inheritance on different platforms and handles potential errors.
Windows may behave differently from Unix-like systems for certain descriptors.

The example also shows error handling for invalid file descriptors.

## Security Considerations

- **Descriptor leaks:** Inheritable descriptors can leak to child processes

- **Privilege escalation:** Careless inheritance can create security holes

- **Default settings:** Understand your platform's default inheritance

- **Cleanup:** Close unnecessary descriptors before process creation

- **Platform differences:** Behavior varies between operating systems

## Best Practices

- **Explicit control:** Set inheritance flags deliberately

- **Minimize inheritance:** Only pass needed descriptors

- **Use context managers:** Ensure proper cleanup of resources

- **Check documentation:** Understand platform-specific behavior

- **Combine with subprocess:** Use pass_fds parameter when appropriate

## Source References

- [Python os.get_inheritable Documentation](https://docs.python.org/3/library/os.html#os.get_inheritable)

- [Linux fcntl(2) man page](https://man7.org/linux/man-pages/man2/fcntl.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).