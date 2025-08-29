+++
title = "Python os.nice Function"
date = 2025-08-29T20:09:26.406+01:00
draft = false
description = "Complete guide to Python's os.nice function covering process priority adjustment, nice values, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.nice Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.nice function,
which adjusts process priority (nice value) on Unix-like systems. We'll cover
nice value ranges, permission requirements, and practical examples.

## Basic Definitions

The os.nice function increments the process's nice value by the
specified increment. A higher nice value means lower priority.

Key parameters: increment (value to add to current nice value). Returns the
new nice value. Only available on Unix systems, requires appropriate privileges.

## Basic Nice Value Adjustment

This example demonstrates the simplest use of os.nice to increase
the process's nice value. Positive values lower priority, negative raise it.

basic_nice.py
  

import os

# Increase nice value by 5 (lower priority)
try:
    new_nice = os.nice(5)
    print(f"New nice value: {new_nice}")
except PermissionError:
    print("Permission denied: need appropriate privileges")
except AttributeError:
    print("os.nice not available on this platform")

This attempts to increase the nice value by 5. On Unix, regular users can only
increase nice values (lower priority). Decreasing requires privileges.

The example includes error handling for permission issues and platform
incompatibility.

## Checking Current Nice Value

To check the current nice value without changing it, we can use os.nice(0).
This returns the current nice value without modification.

check_nice.py
  

import os

try:
    current_nice = os.nice(0)
    print(f"Current nice value: {current_nice}")
    
    # Typical range is -20 (highest priority) to 19 (lowest)
    print("Lower values mean higher priority")
    
except AttributeError:
    print("os.nice not supported on this platform")

This shows how to get the current nice value. The value 0 means default priority.
Negative values indicate higher than default priority.

Note that the exact range (-20 to 19) and behavior may vary slightly between
Unix systems.

## Gradual Priority Reduction

This example shows how to gradually reduce process priority by incrementally
increasing the nice value in steps.

gradual_nice.py
  

import os
import time

def cpu_intensive_task():
    # Simulate CPU work
    for i in range(5):
        sum(range(10**6))
        print(f"Step {i} completed")

try:
    print(f"Initial nice: {os.nice(0)}")
    
    # First priority reduction
    os.nice(5)
    print(f"After first adjustment: {os.nice(0)}")
    cpu_intensive_task()
    
    # Further reduction
    os.nice(5)
    print(f"After second adjustment: {os.nice(0)}")
    cpu_intensive_task()
    
except PermissionError:
    print("Need privileges for negative adjustments")
except AttributeError:
    print("Platform doesn't support nice values")

The code demonstrates how multiple calls to os.nice can gradually reduce
process priority. Each adjustment makes the process more "nice" to others.

In practice, you'd typically set the nice value once rather than incrementally.

## Setting Maximum Nice Value

This example attempts to set the process to the maximum nice value (lowest
priority). Regular users can typically set values up to 19.

max_nice.py
  

import os

MAX_NICE = 19  # Typical maximum nice value

try:
    current = os.nice(0)
    needed = MAX_NICE - current
    
    if needed &gt; 0:
        new_nice = os.nice(needed)
        print(f"Set to maximum nice value: {new_nice}")
    else:
        print(f"Already at or above maximum nice: {current}")
        
except PermissionError:
    print("Permission denied for nice adjustment")
except AttributeError:
    print("Nice values not supported on this platform")

The code calculates the needed increment to reach the maximum nice value.
It only adjusts if the current value is below the maximum.

Note that some systems may have different maximum values or restrictions.

## Privileged Nice Adjustment

This example demonstrates how privileged processes (like root) can decrease
nice values to increase process priority. Requires superuser privileges.

privileged_nice.py
  

import os
import sys

def check_root():
    if os.geteuid() != 0:
        print("This script requires root privileges")
        sys.exit(1)

try:
    check_root()
    current = os.nice(0)
    print(f"Current nice (as root): {current}")
    
    # Increase priority (decrease nice)
    new_nice = os.nice(-5)
    print(f"New nice value: {new_nice}")
    
except PermissionError:
    print("Unexpected permission error")
except AttributeError:
    print("Platform doesn't support nice adjustments")

The script first verifies root privileges, then demonstrates decreasing the
nice value to increase process priority.

Only privileged users can decrease nice values below the current value or
below 0.

## Nice Value in Child Processes

This example shows how nice values are inherited by child processes and how
they can be adjusted independently.

child_process.py
  

import os
import time

def worker():
    print(f"Child nice: {os.nice(0)}")
    time.sleep(2)

try:
    print(f"Parent nice: {os.nice(0)}")
    
    # Create child process
    pid = os.fork()
    
    if pid == 0:  # Child process
        # Adjust child's nice value
        os.nice(5)
        worker()
        os._exit(0)
    else:  # Parent process
        os.waitpid(pid, 0)
        print(f"Parent nice after child: {os.nice(0)}")
        
except AttributeError:
    print("Platform lacks fork or nice support")
except OSError:
    print("Fork failed")

The parent process creates a child that adjusts its own nice value. The parent's
nice value remains unchanged, demonstrating independent adjustment.

This pattern is useful when you want background tasks to have lower priority
than the main process.

## Platform Compatibility Check

This example demonstrates how to check for os.nice availability and implement
a fallback for unsupported platforms.

platform_check.py
  

import os
import sys

def adjust_priority(increment):
    if hasattr(os, 'nice'):
        try:
            return os.nice(increment)
        except PermissionError:
            print("Warning: No permission to adjust priority")
            return os.nice(0)
    else:
        print("Warning: Nice values not supported on this platform")
        return 0  # Default priority

# Usage
current_priority = adjust_priority(5)
print(f"Current priority adjustment: {current_priority}")

The code first checks for os.nice availability before attempting to use it.
This makes the code more portable across different operating systems.

Windows systems don't support nice values, so this check is essential for
cross-platform code.

## Security Considerations

- **Privilege requirements:** Decreasing nice values requires elevated privileges

- **Resource starvation:** Misuse can lead to system instability

- **Platform limitations:** Not available on Windows systems

- **Child processes:** Nice values are inherited by child processes

- **User limits:** May be restricted by system-wide limits

## Best Practices

- **Use sparingly:** Only adjust priority when necessary

- **Check platform:** Verify os.nice availability first

- **Handle errors:** Always catch PermissionError and AttributeError

- **Document assumptions:** Note any privilege requirements

- **Consider alternatives:** For complex scheduling, use dedicated tools

## Source References

- [Python os.nice Documentation](https://docs.python.org/3/library/os.html#os.nice)

- [Linux nice(2) man page](https://man7.org/linux/man-pages/man2/nice.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).