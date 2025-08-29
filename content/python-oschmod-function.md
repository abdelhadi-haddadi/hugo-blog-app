+++
title = "Python os.chmod Function"
date = 2025-08-29T20:09:03.916+01:00
draft = false
description = "Complete guide to Python's os.chmod function covering file permission changes, mode bits, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.chmod Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.chmod function,
which changes file mode bits (permissions). We'll cover permission flags,
symbolic vs numeric modes, and practical permission management examples.

## Basic Definitions

The os.chmod function changes the mode (permissions) of a file
or directory. It follows Unix-style permission bits and works on Windows too.

Key parameters: path (file/directory to modify), mode (permission flags:
stat.S_IRWXU, stat.S_IRUSR, etc. or octal numbers like 0o755). Returns None.

## Setting Basic File Permissions

This example demonstrates setting basic read, write, and execute permissions
for a file using octal notation. Octal numbers represent permission bits.

basic_permissions.py
  

import os

file_path = "document.txt"

# Create file if it doesn't exist
if not os.path.exists(file_path):
    with open(file_path, "w") as f:
        f.write("Sample content")

# Set permissions to read/write for owner, read for others
os.chmod(file_path, 0o644)
print(f"Set permissions for {file_path} to 644 (rw-r--r--)")

# Verify permissions
mode = os.stat(file_path).st_mode
print(f"Current permissions: {oct(mode)[-3:]}")

This sets owner read/write (6), group read (4), and others read (4) permissions.
The 0o prefix indicates octal notation in Python. The last print shows the mode.

Octal notation is compact but can be less readable than symbolic constants.
The next examples will show alternative approaches.

## Using stat Module Constants

The stat module provides symbolic constants for permission bits, making code
more readable. This example combines them using bitwise OR operations.

stat_constants.py
  

import os
import stat

file_path = "script.sh"

# Create executable script
with open(file_path, "w") as f:
    f.write("#!/bin/bash\necho 'Hello World'")

# Set permissions: rwxr-xr-x
os.chmod(file_path, 
    stat.S_IRWXU |  # User read, write, execute
    stat.S_IRGRP |  # Group read
    stat.S_IXGRP |  # Group execute
    stat.S_IROTH |  # Others read
    stat.S_IXOTH    # Others execute
)

print(f"Made {file_path} executable for all")
print(f"Current permissions: {oct(os.stat(file_path).st_mode)[-3:]}")

This sets full permissions for owner (rwx), read/execute for group (r-x),
and read/execute for others (r-x). The symbolic constants make the intent clear.

The stat constants can be combined flexibly to create any permission combination
needed for your application.

## Changing Directory Permissions

Directory permissions work similarly to files but with different meanings.
Execute permission on directories allows traversing/searching them.

directory_permissions.py
  

import os
import stat

dir_path = "private_data"

# Create directory if it doesn't exist
if not os.path.exists(dir_path):
    os.mkdir(dir_path)

# Restrict directory to owner only (rwx------)
os.chmod(dir_path, stat.S_IRWXU)

print(f"Set strict permissions for {dir_path}")
print(f"Current permissions: {oct(os.stat(dir_path).st_mode)[-3:]}")

# Verify access
try:
    os.listdir(dir_path)
    print("Can access directory (running as owner)")
except PermissionError:
    print("Cannot access directory")

This sets directory permissions to rwx------ (700), allowing only the owner
to access it. Other users can't list or enter the directory.

Directory permissions are crucial for security when storing sensitive data.
They control who can access files within the directory.

## Modifying Specific Permission Bits

You can modify specific permission bits while preserving others by first
reading the current mode and then applying changes. This is more precise.

modify_bits.py
  

import os
import stat

file_path = "config.cfg"

# Create file with default permissions
with open(file_path, "w") as f:
    f.write("key=value")

# Get current permissions
current_mode = os.stat(file_path).st_mode

# Add group write permission
new_mode = current_mode | stat.S_IWGRP
os.chmod(file_path, new_mode)

print(f"Added group write permission to {file_path}")
print(f"New permissions: {oct(os.stat(file_path).st_mode)[-3:]}")

# Remove others read permission
new_mode = new_mode &amp; ~stat.S_IROTH
os.chmod(file_path, new_mode)

print(f"Removed others read permission")
print(f"Final permissions: {oct(os.stat(file_path).st_mode)[-3:]}")

This first adds group write permission using bitwise OR, then removes others
read using bitwise AND with the complement of the permission bit.

This approach is useful when you need to modify specific permissions without
affecting other existing permission bits.

## Handling Symbolic Permissions

While Python doesn't have built-in symbolic permission notation (like chmod u+x),
we can create a helper function to parse such expressions.

symbolic_permissions.py
  

import os
import stat

def apply_symbolic_chmod(path, symbolic):
    """Apply symbolic permissions like chmod command"""
    current = os.stat(path).st_mode
    who, op, perms = symbolic[:1], symbolic[1:2], symbolic[2:]
    
    # Determine which bits to modify
    mask = 0
    if 'u' in who or 'a' in who:
        mask |= stat.S_IRWXU
    if 'g' in who or 'a' in who:
        mask |= stat.S_IRWXG
    if 'o' in who or 'a' in who:
        mask |= stat.S_IRWXO
    
    # Determine new permissions
    new_bits = 0
    if 'r' in perms:
        new_bits |= (stat.S_IRUSR | stat.S_IRGRP | stat.S_IROTH)
    if 'w' in perms:
        new_bits |= (stat.S_IWUSR | stat.S_IWGRP | stat.S_IWOTH)
    if 'x' in perms:
        new_bits |= (stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)
    
    # Apply operation
    if op == '+':
        new_mode = current | (new_bits &amp; mask)
    elif op == '-':
        new_mode = current &amp; ~(new_bits &amp; mask)
    elif op == '=':
        new_mode = (current &amp; ~mask) | (new_bits &amp; mask)
    
    os.chmod(path, new_mode)

file_path = "app.log"
with open(file_path, "w") as f:
    f.write("Log entries...")

# Examples of symbolic notation
apply_symbolic_chmod(file_path, "u=rw")  # User read/write
apply_symbolic_chmod(file_path, "go-r")  # Remove group/others read
apply_symbolic_chmod(file_path, "a+x")   # Add execute for all

print(f"Final permissions: {oct(os.stat(file_path).st_mode)[-3:]}")

This implements a basic symbolic permission parser similar to Unix chmod.
It handles who (u/g/o/a), operation (+/-/=), and permissions (r/w/x).

While not as complete as the Unix command, it demonstrates how to implement
symbolic permission changes in Python when needed.

## Windows Compatibility Notes

On Windows, only certain permission bits are meaningful. This example shows
what works and what doesn't on Windows systems.

windows_permissions.py
  

import os
import stat
import sys

file_path = "winfile.txt"

with open(file_path, "w") as f:
    f.write("Windows test")

# These work on Windows
os.chmod(file_path, stat.S_IREAD)   # Read-only
os.chmod(file_path, stat.S_IWRITE)  # Write-only
os.chmod(file_path, stat.S_IREAD | stat.S_IWRITE)  # Read/write

print("Basic permission changes work on Windows")

# These are ignored on Windows
try:
    os.chmod(file_path, stat.S_IXUSR)  # Execute
    print("Execute bit set (but ignored on Windows)")
except:
    print("Execute bit not supported")

if sys.platform == "win32":
    print("\nNote: Windows has limited permission support")
    print("Only read-only/writeable flags are effective")

Windows only respects the read-only flag (which corresponds to S_IREAD).
Other permission bits may be stored but don't affect file access.

When writing cross-platform code, test permission changes on all target
platforms to ensure consistent behavior.

## Security Considerations

- **Least privilege:** Grant only necessary permissions

- **Race conditions:** Avoid TOCTOU issues with sensitive files

- **Umask interaction:** New files inherit umask-modified permissions

- **Symbolic links:** chmod follows symlinks by default

- **Windows limitations:** Permission support varies by platform

## Best Practices

- **Use octal carefully:** Leading zeros matter (0o755 not 0755)

- **Prefer stat constants:** More readable than magic numbers

- **Document changes:** Comment why permissions are being modified

- **Test thoroughly:** Verify permissions after changes

- **Consider alternatives:** For complex ACLs, use platform tools

## Source References

- [Python os.chmod Documentation](https://docs.python.org/3/library/os.html#os.chmod)

- [Python stat module Documentation](https://docs.python.org/3/library/stat.html)

- [Linux chmod(2) man page](https://man7.org/linux/man-pages/man2/chmod.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).