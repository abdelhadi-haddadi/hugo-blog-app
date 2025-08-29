+++
title = "Python os.stat Function"
date = 2025-08-29T20:09:40.033+01:00
draft = false
description = "Complete guide to Python's os.stat function covering file metadata retrieval, stat structure, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.stat Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.stat function,
which retrieves detailed file system metadata. We'll cover stat structure
attributes, platform differences, and practical file information examples.

## Basic Definitions

The os.stat function returns a stat_result object containing
file system metadata. It works on both files and directories across platforms.

Key attributes include st_mode (permissions), st_size (size), st_mtime
(modification time). The exact attributes available vary by operating system.

## Getting Basic File Information

The simplest use of os.stat retrieves basic file metadata like
size and modification time. This example shows common attributes available.

basic_stats.py
  

import os
import time

file_path = "example.txt"
stats = os.stat(file_path)

print(f"File: {file_path}")
print(f"Size: {stats.st_size} bytes")
print(f"Last modified: {time.ctime(stats.st_mtime)}")
print(f"Last accessed: {time.ctime(stats.st_atime)}")
print(f"Created: {time.ctime(stats.st_ctime)}")
print(f"Mode: {oct(stats.st_mode)}")
print(f"Inode: {stats.st_ino}")

This code retrieves and displays common file attributes. Note st_ctime means
creation time on Windows but metadata change time on Unix-like systems.

The st_mode attribute shows file permissions and type in octal format. We'll
explore this in more detail in later examples.

## Checking File Type

The st_mode attribute contains file type information that can be checked
using stat module constants. This helps distinguish files from directories.

file_type.py
  

import os
import stat

path = "example.txt"
stats = os.stat(path)

mode = stats.st_mode

if stat.S_ISREG(mode):
    print(f"{path} is a regular file")
elif stat.S_ISDIR(mode):
    print(f"{path} is a directory")
elif stat.S_ISLNK(mode):
    print(f"{path} is a symbolic link")
elif stat.S_ISSOCK(mode):
    print(f"{path} is a socket")
else:
    print(f"{path} is of unknown type")

This example uses stat module functions to determine the file type. Each
function checks specific bits in the st_mode field for the file type.

Note that for symbolic links, os.stat follows them by default. Use os.lstat
to get info about the link itself rather than its target.

## Checking File Permissions

File permissions can be extracted from st_mode using bitwise operations or
the stat module constants. This example shows both approaches.

file_permissions.py
  

import os
import stat

file_path = "script.sh"
stats = os.stat(file_path)

mode = stats.st_mode

# Using bitwise operations
user_read = mode &amp; stat.S_IRUSR
user_write = mode &amp; stat.S_IWUSR
user_exec = mode &amp; stat.S_IXUSR

print(f"Owner permissions:")
print(f"  Read: {'Yes' if user_read else 'No'}")
print(f"  Write: {'Yes' if user_write else 'No'}")
print(f"  Execute: {'Yes' if user_exec else 'No'}")

# Using stat module constants
print("\nUsing stat module:")
print(f"Readable by owner: {bool(mode &amp; stat.S_IRUSR)}")
print(f"Writable by owner: {bool(mode &amp; stat.S_IWUSR)}")
print(f"Executable by owner: {bool(mode &amp; stat.S_IXUSR)}")

The first approach uses bitwise AND to check specific permission bits. The
second shows a more concise version using stat constants directly.

Similar checks can be done for group (S_IRGRP etc.) and others (S_IROTH etc.)
permissions following the same pattern.

## Working with File Times

os.stat provides three time-related attributes: st_atime (access), st_mtime
(modification), and st_ctime (creation/metadata change). This example shows
how to work with them.

file_times.py
  

import os
import time
from datetime import datetime

file_path = "document.txt"
stats = os.stat(file_path)

# Raw timestamp values
print(f"Access time (timestamp): {stats.st_atime}")
print(f"Modification time (timestamp): {stats.st_mtime}")
print(f"Metadata change time (timestamp): {stats.st_ctime}")

# Convert to readable format
print("\nFormatted times:")
print(f"Last accessed: {datetime.fromtimestamp(stats.st_atime)}")
print(f"Last modified: {datetime.fromtimestamp(stats.st_mtime)}")
print(f"Metadata changed: {datetime.fromtimestamp(stats.st_ctime)}")

# Time comparisons
now = time.time()
hours_since_mod = (now - stats.st_mtime) / 3600
print(f"\nModified {hours_since_mod:.1f} hours ago")

This demonstrates accessing raw timestamp values and converting them to
human-readable formats. It also shows calculating time differences.

Remember that st_ctime has different meanings across platforms - creation
time on Windows, metadata change time on Unix-like systems.

## Comparing Files

The st_ino (inode) and st_dev (device) attributes can uniquely identify
files and detect hard links. This example shows file comparison techniques.

file_comparison.py
  

import os

def are_same_file(path1, path2):
    stats1 = os.stat(path1)
    stats2 = os.stat(path2)
    
    return (stats1.st_ino == stats2.st_ino and 
            stats1.st_dev == stats2.st_dev)

file1 = "original.txt"
file2 = "hardlink.txt"
file3 = "copy.txt"

print(f"{file1} and {file2} same file: {are_same_file(file1, file2)}")
print(f"{file1} and {file3} same file: {are_same_file(file1, file3)}")

# Additional comparison by metadata
stats1 = os.stat(file1)
stats2 = os.stat(file3)

if (stats1.st_size == stats2.st_size and
    stats1.st_mtime == stats2.st_mtime):
    print("\nFiles have same size and modification time")
else:
    print("\nFiles differ in size or modification time")

The are_same_file function checks if two paths refer to the same physical
file by comparing inode and device numbers. This detects hard links.

The second comparison shows how to check if files have identical metadata
without necessarily being the same physical file.

## Handling Symbolic Links

os.stat follows symbolic links by default. Use os.lstat to get information
about the link itself rather than its target.

symlink_stats.py
  

import os
import stat

# Create a symbolic link for demonstration
if not os.path.exists("target.txt"):
    with open("target.txt", "w") as f:
        f.write("Target file content")

if not os.path.exists("link.txt"):
    os.symlink("target.txt", "link.txt")

# Regular stat follows symlinks
target_stats = os.stat("link.txt")
print(f"Target file size: {target_stats.st_size} bytes")

# lstat gets info about the link itself
link_stats = os.lstat("link.txt")
print(f"\nLink info:")
print(f"Size: {link_stats.st_size} bytes")
print(f"Is symlink: {stat.S_ISLNK(link_stats.st_mode)}")

# Compare the two
print("\nComparison:")
print(f"Same inode: {target_stats.st_ino == link_stats.st_ino}")
print(f"Same device: {target_stats.st_dev == link_stats.st_dev}")

This example demonstrates the difference between os.stat and os.lstat when
working with symbolic links. The link size reported is the length of the
path it contains.

Note that os.lstat is particularly useful when you need to detect and handle
symbolic links specially in your application.

## Platform-Specific Attributes

Some stat attributes are platform-specific. This example shows how to safely
access them with fallback behavior when unavailable.

platform_stats.py
  

import os
import platform
import sys

file_path = sys.executable  # Using Python executable as example
stats = os.stat(file_path)

print(f"System: {platform.system()}")
print(f"File: {file_path}")

# Common attributes
print(f"\nCommon attributes:")
print(f"Size: {stats.st_size} bytes")
print(f"Mode: {oct(stats.st_mode)}")

# Platform-specific attributes
print("\nPlatform-specific attributes:")
if hasattr(stats, 'st_file_attributes'):  # Windows
    print(f"File attributes: {stats.st_file_attributes}")
    
if hasattr(stats, 'st_birthtime'):  # macOS and some Unix
    print(f"Birth time: {stats.st_birthtime}")
elif hasattr(stats, 'st_ctime'):  # Fallback
    print(f"Creation time: {stats.st_ctime}")

if hasattr(stats, 'st_blksize'):  # Unix block size
    print(f"Block size: {stats.st_blksize}")
    print(f"Blocks: {stats.st_blocks}")

This code demonstrates how to safely check for platform-specific attributes
using hasattr. It shows different attributes available on various systems.

The example also highlights the importance of writing cross-platform code
when working with file system metadata.

## Security Considerations

- **TOCTOU risks:** File state can change between stat and use

- **Symbolic links:** os.stat follows them by default

- **Permission checks:** Verify before sensitive operations

- **Error handling:** Always handle FileNotFoundError

- **Platform differences:** Attribute availability varies

## Best Practices

- **Use os.lstat:** When you need info about symlinks themselves

- **Check attribute existence:** With hasattr for cross-platform code

- **Handle exceptions:** Especially FileNotFoundError

- **Prefer pathlib:** For simpler path operations in new code

- **Document assumptions:** About file types and permissions

## Source References

- [Python os.stat Documentation](https://docs.python.org/3/library/os.html#os.stat)

- [Linux stat(2) man page](https://man7.org/linux/man-pages/man2/stat.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).