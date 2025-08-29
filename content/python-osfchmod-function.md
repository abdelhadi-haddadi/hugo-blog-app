+++
title = "Python os.fchmod Function"
date = 2025-08-29T20:09:09.483+01:00
draft = false
description = "Complete guide to Python's os.fchmod function covering file permission changes, mode bits, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.fchmod Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.fchmod function,
which changes file permissions using a file descriptor. We'll cover permission
bits, octal notation, and practical file permission modification examples.

## Basic Definitions

The os.fchmod function changes the mode (permissions) of a file
given its file descriptor rather than a path. It's similar to os.chmod but
works with open files.

Key parameters: fd (file descriptor), mode (permission bits in octal).
Requires the file to be already opened. Available on Unix-like systems only.

## Changing File Permissions with fchmod

This basic example demonstrates how to change file permissions using a file
descriptor. We first open a file, then modify its permissions.

basic_fchmod.py
  

import os

# Create or open a file
file_path = "testfile.txt"
with open(file_path, "w") as f:
    f.write("Sample content")
    
    # Get file descriptor
    fd = f.fileno()
    
    # Change permissions to read-only for owner
    os.fchmod(fd, 0o400)
    print(f"Changed permissions of {file_path} to 0400 (read owner)")

The example creates a file, gets its file descriptor, and sets permissions
to 0400 (read-only for owner). The 0o prefix indicates octal notation.

Note that the file must remain open while changing permissions with fchmod,
unlike chmod which works with paths.

## Setting Different Permission Combinations

This example shows various common permission combinations using fchmod.
We demonstrate read, write, and execute permissions for different users.

permission_combinations.py
  

import os

file_path = "data.txt"
with open(file_path, "w") as f:
    fd = f.fileno()
    
    # Read and write for owner, read for others
    os.fchmod(fd, 0o644)
    print("Set permissions to 0644 (rw-r--r--)")
    
    # Read, write, execute for owner, read and execute for group/others
    os.fchmod(fd, 0o755)
    print("Set permissions to 0755 (rwxr-xr-x)")
    
    # Read and write for owner only
    os.fchmod(fd, 0o600)
    print("Set permissions to 0600 (rw-------)")
    
    # Read, write, execute for owner, nothing for others
    os.fchmod(fd, 0o700)
    print("Set permissions to 0700 (rwx------)")

Each fchmod call changes the file's permissions immediately. The octal values
represent standard Unix permission bits for owner, group, and others.

The first digit represents special bits (setuid, setgid, sticky), while the
next three digits represent owner, group, and others permissions.

## Working with Special Permission Bits

Beyond standard permissions, fchmod can set special bits like setuid, setgid,
and sticky. This example demonstrates their usage.

special_bits.py
  

import os
import stat

script_path = "special_script.sh"
with open(script_path, "w") as f:
    f.write("#!/bin/sh\necho 'Hello World'")
    fd = f.fileno()
    
    # Set setuid bit (04000)
    os.fchmod(fd, 0o4755)
    print("Set setuid bit (04755)")
    
    # Set setgid bit (02000)
    os.fchmod(fd, 0o2755)
    print("Set setgid bit (02755)")
    
    # Set sticky bit (01000)
    os.fchmod(fd, 0o1755)
    print("Set sticky bit (01755)")
    
    # Combine setuid and setgid
    os.fchmod(fd, 0o6755)
    print("Set both setuid and setgid bits (06755)")

Special bits are set using the first octal digit: 4 for setuid, 2 for setgid,
and 1 for sticky. These bits have security implications and should be used
carefully.

Note that the effective user must have appropriate privileges to set these
special permission bits.

## Using stat Constants for Permissions

Instead of raw octal numbers, we can use constants from the stat module to
make permission settings more readable and maintainable.

stat_constants.py
  

import os
import stat

file_path = "config.cfg"
with open(file_path, "w") as f:
    fd = f.fileno()
    
    # Read/write owner, read group/others using stat constants
    mode = (stat.S_IRUSR | stat.S_IWUSR | 
            stat.S_IRGRP | stat.S_IROTH)
    os.fchmod(fd, mode)
    print("Set permissions using stat constants (rw-r--r--)")
    
    # Read/write/execute owner, read/execute group/others
    mode = (stat.S_IRWXU | 
            stat.S_IRGRP | stat.S_IXGRP |
            stat.S_IROTH | stat.S_IXOTH)
    os.fchmod(fd, mode)
    print("Set permissions using stat constants (rwxr-xr-x)")

The stat module provides human-readable constants for permission bits that
can be combined using bitwise OR operations. This makes the code more
self-documenting.

Each constant represents a specific permission bit (e.g., S_IRUSR = read by
owner, S_IWGRP = write by group).

## Error Handling with fchmod

This example demonstrates proper error handling when using fchmod, including
permission denied cases and invalid file descriptors.

error_handling.py
  

import os
import errno

file_path = "protected_file.txt"
try:
    # Try to open a protected file
    with open(file_path, "w") as f:
        fd = f.fileno()
        try:
            os.fchmod(fd, 0o777)
            print("Successfully changed permissions")
        except PermissionError as e:
            print(f"Permission denied: {e}")
        except OSError as e:
            if e.errno == errno.EBADF:
                print("Invalid file descriptor")
            else:
                print(f"OS error: {e}")
except IOError as e:
    print(f"Cannot open file: {e}")

The example shows how to handle various error conditions that might occur
when using fchmod. PermissionError occurs when lacking privileges, while
EBADF indicates an invalid file descriptor.

Proper error handling is crucial when modifying file permissions as these
operations often require elevated privileges.

## Comparing fchmod and chmod

This example highlights the differences between fchmod (file descriptor)
and chmod (path) approaches to changing file permissions.

fchmod_vs_chmod.py
  

import os
import time

file_path = "compare.txt"

# Using chmod (path-based)
with open(file_path, "w") as f:
    f.write("Content")
os.chmod(file_path, 0o644)
print("Used chmod to set permissions via path")

# Using fchmod (descriptor-based)
with open(file_path, "r+") as f:
    fd = f.fileno()
    os.fchmod(fd, 0o600)
    print("Used fchmod to set permissions via descriptor")
    
    # Demonstrate advantage: file renamed while open
    new_path = "renamed.txt"
    os.rename(file_path, new_path)
    os.fchmod(fd, 0o400)
    print("Changed permissions after rename with fchmod")

The key difference is that fchmod works on an open file descriptor, making
it immune to path changes (like renaming) that might affect chmod operations.

fchmod is particularly useful when you need to ensure you're modifying the
same file you have open, regardless of filesystem changes.

## Security Considerations

- **Privilege requirements:** Changing permissions often requires appropriate privileges

- **Race conditions:** fchmod avoids some race conditions present in chmod

- **Special bits:** setuid/setgid bits have security implications

- **Cross-platform:** Only available on Unix-like systems

- **Descriptor validity:** File descriptor must remain valid

## Best Practices

- **Use stat constants:** For more readable permission settings

- **Prefer fchmod:** When you already have the file open

- **Handle errors:** Always check for permission errors

- **Minimal permissions:** Grant only necessary permissions

- **Document changes:** Clearly note permission modifications

## Source References

- [Python os.fchmod Documentation](https://docs.python.org/3/library/os.html#os.fchmod)

- [Linux fchmod(2) man page](https://man7.org/linux/man-pages/man2/fchmod.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).