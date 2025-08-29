+++
title = "Python os.lstat Function"
date = 2025-08-29T20:09:24.166+01:00
draft = false
description = "Complete guide to Python's os.lstat function covering file statistics, symbolic links, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.lstat Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.lstat function,
which retrieves file status without following symbolic links. We'll cover
stat structure, symbolic link handling, and practical file system examples.

## Basic Definitions

The os.lstat function returns status information about a file
without following symbolic links. It's similar to os.stat but
differs in symbolic link handling.

Key parameters: path (file/directory to examine). Returns a stat_result
object containing file attributes like size, permissions, and timestamps.

## Basic File Information

This example demonstrates retrieving basic file information using os.lstat.
We'll show file size, modification time, and permissions in human-readable
form.

basic_info.py
  

import os
import time

file_path = "example.txt"

# Get file stats
stats = os.lstat(file_path)

print(f"File: {file_path}")
print(f"Size: {stats.st_size} bytes")
print(f"Last modified: {time.ctime(stats.st_mtime)}")
print(f"Permissions: {oct(stats.st_mode)[-3:]}")
print(f"Owner UID: {stats.st_uid}")
print(f"Group GID: {stats.st_gid}")

The code retrieves and displays basic file metadata. st_size gives file size,
st_mtime shows modification time, and st_mode contains permission bits.

Note that os.lstat doesn't follow symbolic links, unlike os.stat which would
return info about the linked file instead of the link itself.

## Checking File Type

os.lstat can determine file types using the st_mode attribute combined with
os.path's file type checking functions. This example shows various checks.

file_type.py
  

import os
import stat

path = "example"

stats = os.lstat(path)

print(f"Checking type of: {path}")
print(f"Is regular file: {stat.S_ISREG(stats.st_mode)}")
print(f"Is directory: {stat.S_ISDIR(stats.st_mode)}")
print(f"Is symbolic link: {stat.S_ISLNK(stats.st_mode)}")
print(f"Is FIFO/pipe: {stat.S_ISFIFO(stats.st_mode)}")
print(f"Is block device: {stat.S_ISBLK(stats.st_mode)}")
print(f"Is character device: {stat.S_ISCHR(stats.st_mode)}")
print(f"Is socket: {stat.S_ISSOCK(stats.st_mode)}")

This code uses stat module constants to check various file types. Each S_IS*
function returns True if the file matches that specific type.

For symbolic links, os.lstat will show them as links, while os.stat would
show the type of the linked file.

## Symbolic Link Handling

This example demonstrates the difference between os.lstat and os.stat when
working with symbolic links. We'll create a link and examine both functions.

symlink_diff.py
  

import os

# Create a target file and symbolic link
with open("target.txt", "w") as f:
    f.write("Original content")

os.symlink("target.txt", "link.txt")

# Compare lstat and stat
link_stats = os.lstat("link.txt")
target_stats = os.stat("link.txt")

print("Symbolic link info (lstat):")
print(f"Size: {link_stats.st_size}")
print(f"Is link: {os.path.islink('link.txt')}")

print("\nTarget file info (stat):")
print(f"Size: {target_stats.st_size}")
print(f"Is link: {os.path.islink('target.txt')}")

The output shows os.lstat returns info about the symbolic link itself (small
size), while os.stat follows the link to return info about the target file.

This distinction is crucial when working with symbolic links in Python file
operations.

## File Timestamps

os.lstat provides three timestamp values: st_atime (access), st_mtime
(modification), and st_ctime (creation/change). This example shows all three.

timestamps.py
  

import os
import time

file_path = "timestamp_example.txt"

# Create file and get initial stats
with open(file_path, "w") as f:
    f.write("Initial content")
stats = os.lstat(file_path)

print("Initial timestamps:")
print(f"Access: {time.ctime(stats.st_atime)}")
print(f"Modification: {time.ctime(stats.st_mtime)}")
print(f"Change: {time.ctime(stats.st_ctime)}")

# Modify file and check again
time.sleep(1)
with open(file_path, "a") as f:
    f.write("\nAdditional content")
new_stats = os.lstat(file_path)

print("\nAfter modification:")
print(f"Access: {time.ctime(new_stats.st_atime)}")
print(f"Modification: {time.ctime(new_stats.st_mtime)}")
print(f"Change: {time.ctime(new_stats.st_ctime)}")

The example shows how different operations affect file timestamps. Writing to
a file updates both mtime and ctime, while atime tracks last access.

Note: st_ctime has different meanings on Unix (metadata change) and Windows
(creation time).

## File Permissions

This example demonstrates how to interpret and modify file permissions using
information from os.lstat and the stat module constants.

permissions.py
  

import os
import stat

file_path = "permission_test.txt"

# Create file and get permissions
with open(file_path, "w") as f:
    f.write("Permission test")
stats = os.lstat(file_path)

# Display current permissions
print(f"Current permissions: {oct(stats.st_mode)[-3:]}")

# Check specific permissions
print("\nPermission checks:")
print(f"Owner readable: {bool(stats.st_mode &amp; stat.S_IRUSR)}")
print(f"Owner writable: {bool(stats.st_mode &amp; stat.S_IWUSR)}")
print(f"Owner executable: {bool(stats.st_mode &amp; stat.S_IXUSR)}")
print(f"Group writable: {bool(stats.st_mode &amp; stat.S_IWGRP)}")
print(f"Others executable: {bool(stats.st_mode &amp; stat.S_IXOTH)}")

# Change permissions
os.chmod(file_path, stat.S_IRUSR | stat.S_IWUSR | stat.S_IRGRP)
new_stats = os.lstat(file_path)
print(f"\nNew permissions: {oct(new_stats.st_mode)[-3:]}")

The code shows how to check individual permission bits using bitwise AND
operations with stat module constants. It then demonstrates changing
permissions with os.chmod.

Understanding these permission bits is essential for secure file handling in
Python applications.

## Comparing Files

This example uses os.lstat to compare two files by their device/inode numbers,
which is more reliable than comparing paths for detecting identical files.

file_comparison.py
  

import os

def are_same_file(file1, file2):
    try:
        stat1 = os.lstat(file1)
        stat2 = os.lstat(file2)
        return (stat1.st_dev == stat2.st_dev and 
                stat1.st_ino == stat2.st_ino)
    except FileNotFoundError:
        return False

# Test cases
file_a = "file1.txt"
file_b = "file2.txt"
file_c = "file1.txt"  # Hard link to file_a

# Create test files
with open(file_a, "w") as f:
    f.write("Content")
os.link(file_a, file_c)  # Create hard link
with open(file_b, "w") as f:
    f.write("Content")

print(f"Same file (a vs b): {are_same_file(file_a, file_b)}")
print(f"Same file (a vs c): {are_same_file(file_a, file_c)}")
print(f"Same file (b vs c): {are_same_file(file_b, file_c)}")

The function compares device (st_dev) and inode (st_ino) numbers to determine
if two paths reference the same physical file, even if they're hard links.

This method works across different directory locations and with hard links,
unlike simple path comparison.

## Security Considerations

- **Symbolic links:** os.lstat doesn't follow them, preventing symlink attacks

- **TOCTOU risks:** File state can change between lstat and use

- **Permission checks:** Always verify before sensitive operations

- **Error handling:** Handle FileNotFoundError for missing files

- **Cross-platform:** Some attributes differ between Unix and Windows

## Best Practices

- **Use for links:** Prefer lstat when working with symlinks

- **Combine with stat:** Use both when full file info is needed

- **Check errors:** Handle exceptions for missing files

- **Cache carefully:** File info may change between checks

- **Document assumptions:** Note when link vs target info is needed

## Source References

- [Python os.lstat Documentation](https://docs.python.org/3/library/os.html#os.lstat)

- [Linux lstat(2) man page](https://man7.org/linux/man-pages/man2/lstat.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).