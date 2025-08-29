+++
title = "Python os.scandir Function"
date = 2025-08-29T20:09:33.241+01:00
draft = false
description = "Complete guide to Python's os.scandir function covering directory listing, file system traversal, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.scandir Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.scandir function,
which provides efficient directory scanning. We'll cover basic usage, file
attributes, performance benefits, and practical examples.

## Basic Definitions

The os.scandir function scans a directory yielding DirEntry objects.
It's more efficient than os.listdir as it provides file attributes without
additional system calls.

Key features: returns an iterator of DirEntry objects, provides file type and
attribute information, and is faster than os.listdir for many use cases.

## Basic Directory Listing

The simplest use of os.scandir lists all entries in a directory.
This example shows how to iterate through directory contents.

basic_listing.py
  

import os

# List all entries in current directory
with os.scandir('.') as entries:
    for entry in entries:
        print(entry.name)

# Alternative without context manager (not recommended)
entries = os.scandir('.')
for entry in entries:
    print(entry.name)
entries.close()

This example shows two ways to scan a directory. The first uses a context
manager for automatic resource cleanup. The second requires manual closing.

The context manager approach is preferred as it ensures proper resource
cleanup even if exceptions occur during iteration.

## Filtering Files and Directories

DirEntry objects provide methods to check entry types. This example filters
files and directories separately.

filter_entries.py
  

import os

# Scan directory and separate files from directories
with os.scandir('.') as entries:
    files = []
    dirs = []
    
    for entry in entries:
        if entry.is_file():
            files.append(entry.name)
        elif entry.is_dir():
            dirs.append(entry.name)

print("Files:", files)
print("Directories:", dirs)

This code scans the current directory and categorizes entries into files
and directories. The is_file() and is_dir() methods efficiently check types.

These methods use cached information from the initial scan, avoiding extra
system calls that would be needed with os.path.isdir().

## Getting File Information

DirEntry objects provide access to file metadata. This example shows how to
get size and modification time for files.

file_info.py
  

import os
import datetime

# Get file information for all entries
with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_file():
            stat = entry.stat()
            mtime = datetime.datetime.fromtimestamp(stat.st_mtime)
            print(f"{entry.name:20} {stat.st_size:8} bytes  {mtime}")

This code displays file names, sizes, and modification times. The stat()
method returns a stat_result object with file attributes.

The stat() method performs a system call, but only when needed, making
os.scandir still more efficient than separate os.stat calls.

## Recursive Directory Traversal

Combining os.scandir with recursion allows full directory tree traversal.
This example implements a simple recursive file search.

recursive_scan.py
  

import os

def scan_directory(path, indent=0):
    with os.scandir(path) as entries:
        for entry in entries:
            print(" " * indent + entry.name)
            if entry.is_dir():
                full_path = os.path.join(path, entry.name)
                scan_directory(full_path, indent + 4)

# Start recursive scan from current directory
scan_directory('.')

This function recursively scans directories, printing a tree-like structure.
Each level of nesting is indented for better visualization.

For large directory trees, consider using os.walk() instead, which handles
some edge cases more robustly.

## Finding Specific File Types

os.scandir can efficiently filter files by extension or other attributes.
This example finds all Python files in a directory.

find_py_files.py
  

import os

# Find all Python files in directory
python_files = []
with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_file() and entry.name.endswith('.py'):
            python_files.append(entry.name)

print("Python files found:", python_files)

# Alternative with list comprehension
with os.scandir('.') as entries:
    py_files = [e.name for e in entries if e.is_file() and e.name.endswith('.py')]
print("Python files (listcomp):", py_files)

The first approach uses a traditional loop to collect Python files. The second
shows a more concise list comprehension version.

Both methods efficiently check file types and extensions without unnecessary
system calls.

## Comparing with os.listdir

This example demonstrates the performance difference between os.scandir and
os.listdir when checking file types.

performance_comparison.py
  

import os
import time

def using_scandir():
    start = time.time()
    with os.scandir('.') as entries:
        files = [e.name for e in entries if e.is_file()]
    return time.time() - start

def using_listdir():
    start = time.time()
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    return time.time() - start

# Time both approaches
scandir_time = using_scandir()
listdir_time = using_listdir()

print(f"os.scandir: {scandir_time:.6f} seconds")
print(f"os.listdir: {listdir_time:.6f} seconds")
print(f"scandir is {listdir_time/scandir_time:.1f}x faster")

This code measures the time taken to list files using both methods. os.scandir
is typically faster as it avoids separate stat calls for type checking.

The performance difference becomes more significant with larger directories or
when checking multiple file attributes.

## Handling Symbolic Links

os.scandir provides methods to detect and handle symbolic links. This example
shows how to identify them.

symlink_handling.py
  

import os

# Create a test symlink if it doesn't exist
if not os.path.exists('test_link'):
    os.symlink(__file__, 'test_link')

# Scan directory and identify symlinks
with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_symlink():
            target = os.readlink(entry.path)
            print(f"Symlink: {entry.name} -&gt; {target}")
        elif entry.is_file():
            print(f"File: {entry.name}")
        elif entry.is_dir():
            print(f"Directory: {entry.name}")

This code first creates a symbolic link for testing, then scans the directory
identifying different entry types. The is_symlink() method detects links.

Note that is_file() and is_dir() follow symlinks by default. Use follow_symlinks=False
with stat() to get information about the link itself.

## Security Considerations

- **Resource handling:** Always close scandir iterators when done

- **Permission errors:** Handle OSError for protected directories

- **Symbolic links:** Be aware of potential symlink attacks

- **Case sensitivity:** Behavior varies by filesystem

- **Concurrent modifications:** Directory may change during scan

## Best Practices

- **Use context managers:** Prefer 'with' statement for resource cleanup

- **Cache attributes:** Store needed attributes to avoid repeated calls

- **Handle exceptions:** Catch OSError for permission issues

- **Consider os.walk:** For recursive scans with more features

- **Document assumptions:** Note any expected directory structure

## Source References

- [Python os.scandir Documentation](https://docs.python.org/3/library/os.html#os.scandir)

- [PEP 471 - os.scandir()](https://www.python.org/dev/peps/pep-0471/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).