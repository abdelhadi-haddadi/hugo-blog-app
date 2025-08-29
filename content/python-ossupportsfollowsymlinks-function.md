+++
title = "Python os.supports_follow_symlinks Function"
date = 2025-08-29T20:09:42.471+01:00
draft = false
description = "Complete guide to Python's os.supports_follow_symlinks function covering symbolic link support checks and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.supports_follow_symlinks Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.supports_follow_symlinks
function, which checks if the platform supports the follow_symlinks parameter.
We'll cover its usage, platform differences, and practical examples.

## Basic Definitions

The os.supports_follow_symlinks is a set object containing names
of os functions that support the follow_symlinks parameter on the current
platform. This helps write cross-platform code.

Symbolic links (symlinks) are special files that act as references to other
files. The follow_symlinks parameter controls whether operations follow
symlinks or operate on the links themselves.

## Checking Basic Symlink Support

This example demonstrates how to check if the current platform supports
the follow_symlinks parameter in general and for specific functions.

basic_support.py
  

import os

# Check if any functions support follow_symlinks
if os.supports_follow_symlinks:
    print("Platform supports follow_symlinks for some functions")
    print(f"Supported functions: {os.supports_follow_symlinks}")
else:
    print("Platform does not support follow_symlinks parameter")

# Check specific function support
if 'stat' in os.supports_follow_symlinks:
    print("os.stat() supports follow_symlinks")
else:
    print("os.stat() does not support follow_symlinks")

This code first checks if the platform supports follow_symlinks at all.
Then it checks specifically for the os.stat() function. The output varies
by operating system.

On Unix-like systems, most functions typically support follow_symlinks.
Windows may show different results depending on the Python version.

## Using with os.stat

The os.stat() function gets file status. With follow_symlinks=False,
it returns info about the symlink itself rather than the target file.

stat_example.py
  

import os
import time

# Create a symlink for demonstration
if not os.path.exists("target.txt"):
    with open("target.txt", "w") as f:
        f.write("Original file")
    os.symlink("target.txt", "link.txt")

# Check stat support
if 'stat' in os.supports_follow_symlinks:
    # Get info about the symlink itself
    link_info = os.stat("link.txt", follow_symlinks=False)
    print(f"Symlink size: {link_info.st_size} bytes")
    print(f"Symlink mtime: {time.ctime(link_info.st_mtime)}")

    # Get info about the target file
    target_info = os.stat("link.txt", follow_symlinks=True)
    print(f"Target size: {target_info.st_size} bytes")
else:
    print("os.stat() does not support follow_symlinks on this platform")

This example creates a symlink, then demonstrates getting different
information about the link versus its target. The st_size differs
significantly between the two.

The follow_symlinks parameter allows explicit control over whether
to follow symlinks or not, which is important for certain operations.

## Checking Directory Functions

Some directory-related functions also support follow_symlinks. This
example checks and uses them appropriately.

directory_functions.py
  

import os

# Create a test directory structure
os.makedirs("test_dir", exist_ok=True)
os.symlink("test_dir", "dir_link")

# Check directory function support
dir_funcs = ['access', 'chmod', 'chown', 'stat', 'utime']
supported = [f for f in dir_funcs if f in os.supports_follow_symlinks]

print(f"Supported directory functions: {supported}")

if 'access' in os.supports_follow_symlinks:
    # Check access to symlink vs target
    link_accessible = os.access("dir_link", os.R_OK, follow_symlinks=False)
    target_accessible = os.access("dir_link", os.R_OK, follow_symlinks=True)
    print(f"Link accessible: {link_accessible}, Target accessible: {target_accessible}")

This code checks which directory-related functions support follow_symlinks
on the current platform. It then demonstrates using os.access() with
both symlink and target checking.

The results show how different functions might handle symlinks differently
across platforms, emphasizing the need for this check.

## Cross-Platform Compatibility

This example shows how to write code that works across different platforms
by checking symlink support before using related features.

cross_platform.py
  

import os
import sys

def safe_stat(path):
    """Safe stat function that works across platforms"""
    if 'stat' in os.supports_follow_symlinks:
        return os.stat(path, follow_symlinks=False)
    else:
        # Fallback for platforms without follow_symlinks support
        print("Warning: follow_symlinks not supported, using regular stat")
        return os.stat(path)

def check_symlink(path):
    """Check if a path is a symlink in a cross-platform way"""
    if 'lstat' in os.supports_follow_symlinks:
        try:
            os.lstat(path)  # Always checks the symlink itself
            return True
        except OSError:
            return False
    else:
        # Less reliable fallback
        return os.path.islink(path)

print(f"Platform: {sys.platform}")
print(f"Supports follow_symlinks: {bool(os.supports_follow_symlinks)}")

# Test the functions
test_path = "link.txt" if os.path.exists("link.txt") else "target.txt"
print(f"Safe stat result: {safe_stat(test_path)}")
print(f"Is symlink: {check_symlink(test_path)}")

This demonstrates how to write robust code that works across different
platforms by checking support before using platform-specific features.

The safe_stat and check_symlink functions provide fallback behavior
when follow_symlinks isn't supported, making the code more portable.

## File Permission Checks

This example shows how to use os.supports_follow_symlinks with permission
checking functions like os.access().

permission_checks.py
  

import os

# Create a protected file and symlink
protected_file = "protected.txt"
symlink_file = "protected_link.txt"

if not os.path.exists(protected_file):
    with open(protected_file, "w") as f:
        f.write("Sensitive data")
    os.chmod(protected_file, 0o600)  # Owner read/write only
    os.symlink(protected_file, symlink_file)

# Check permission support
if 'access' in os.supports_follow_symlinks:
    # Check symlink permissions (always accessible)
    link_accessible = os.access(symlink_file, os.R_OK, follow_symlinks=False)
    
    # Check target permissions (depends on actual file)
    target_accessible = os.access(symlink_file, os.R_OK, follow_symlinks=True)
    
    print(f"Symlink readable: {link_accessible}")
    print(f"Target readable: {target_accessible}")
else:
    print("Cannot perform detailed symlink permission checks on this platform")

This demonstrates the difference between checking permissions on a symlink
versus its target. The symlink itself is typically always accessible,
while the target may have restricted permissions.

The follow_symlinks parameter allows distinguishing between these cases,
which is important for security-sensitive applications.

## Testing All Supported Functions

This comprehensive example tests all functions that might support
follow_symlinks on the current platform.

all_functions.py
  

import os
import sys

def test_function_support():
    """Test all functions in os.supports_follow_symlinks"""
    print(f"Testing on {sys.platform}")
    print(f"Supported functions: {os.supports_follow_symlinks}")
    
    # Create test files
    with open("test_file.txt", "w") as f:
        f.write("Test content")
    if not os.path.exists("test_link.txt"):
        os.symlink("test_file.txt", "test_link.txt")
    
    # Test each supported function
    for func_name in os.supports_follow_symlinks:
        print(f"\nTesting {func_name}()")
        try:
            func = getattr(os, func_name)
            
            # Try with follow_symlinks=False
            try:
                result = func("test_link.txt", follow_symlinks=False)
                print(f"  follow_symlinks=False: {type(result)} returned")
            except Exception as e:
                print(f"  follow_symlinks=False failed: {e}")
            
            # Try with follow_symlinks=True
            try:
                result = func("test_link.txt", follow_symlinks=True)
                print(f"  follow_symlinks=True: {type(result)} returned")
            except Exception as e:
                print(f"  follow_symlinks=True failed: {e}")
                
        except AttributeError:
            print(f"  Function {func_name} not found in os module")

if __name__ == "__main__":
    test_function_support()

This script systematically tests each function listed in os.supports_follow_symlinks
to verify it works as expected with both symlink and target operations.

The output shows which functions actually work with follow_symlinks on
the current platform, helping identify potential compatibility issues.

## Security Considerations

- **Symlink attacks:** Always verify symlink targets in security-sensitive code

- **Platform differences:** Windows symlink support varies by version

- **Privilege escalation:** Improper symlink handling can lead to security issues

- **TOCTOU risks:** File state can change between check and use

- **Cross-platform:** Test symlink behavior on all target platforms

## Best Practices

- **Check support:** Always verify follow_symlinks support before use

- **Explicit control:** Be intentional about following symlinks or not

- **Fallback behavior:** Provide alternatives for unsupported platforms

- **Document assumptions:** Clearly note symlink handling requirements

- **Test thoroughly:** Verify behavior with different symlink scenarios

## Source References

- [Python os.supports_follow_symlinks Documentation](https://docs.python.org/3/library/os.html#os.supports_follow_symlinks)

- [Linux symlink(7) man page](https://man7.org/linux/man-pages/man7/symlink.7.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).