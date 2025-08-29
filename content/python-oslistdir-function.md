+++
title = "Python os.listdir Function"
date = 2025-08-29T20:09:23.058+01:00
draft = false
description = "Complete guide to Python's os.listdir function covering directory listing, file system operations, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.listdir Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.listdir function,
which lists directory contents. We'll cover basic usage, path handling,
filtering results, and practical file system operations.

## Basic Definitions

The os.listdir function returns a list containing the names of
entries in a directory. The list is in arbitrary order and excludes special
entries '.' and '..'.

Key parameters: path (directory to list, defaults to current directory).
Returns a list of strings representing directory contents. Raises OSError
for invalid paths.

## Basic Directory Listing

The simplest use of os.listdir lists contents of the current
directory. This example shows basic usage and result handling.

basic_listing.py
  

import os

# List current directory contents
contents = os.listdir()
print("Current directory contents:")
for item in contents:
    print(item)

# List specific directory
target_dir = "/tmp"
print(f"\nContents of {target_dir}:")
try:
    for item in os.listdir(target_dir):
        print(item)
except FileNotFoundError:
    print(f"Directory {target_dir} not found")
except PermissionError:
    print(f"No permission to access {target_dir}")

This example first lists the current directory, then attempts to list /tmp.
It includes basic error handling for common directory access issues.

The output shows filenames without full paths. For absolute paths, use
os.path.join with the directory path.

## Filtering Files by Extension

We can combine os.listdir with string operations to filter
files by extension. This example finds all Python files in a directory.

filter_by_extension.py
  

import os

def find_py_files(directory):
    """Return list of .py files in directory"""
    py_files = []
    for filename in os.listdir(directory):
        if filename.endswith('.py'):
            py_files.append(filename)
    return py_files

# Example usage
project_dir = "src"
py_files = find_py_files(project_dir)
print(f"Python files in {project_dir}:")
for py_file in py_files:
    print(py_file)

# Using list comprehension
py_files = [f for f in os.listdir(project_dir) if f.endswith('.py')]
print(f"\nFound {len(py_files)} Python files")

The function scans a directory and returns only .py files. The example shows
both a traditional loop and a list comprehension approach.

For case-insensitive matching, convert filenames to lowercase before checking
extensions.

## Getting File Metadata

We can combine os.listdir with os.stat to get
file metadata. This example shows file sizes and modification times.

file_metadata.py
  

import os
import time

def list_files_with_metadata(directory):
    """Print files with size and modification time"""
    print(f"Contents of {directory} with metadata:")
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):  # Skip directories
            stat = os.stat(filepath)
            size = stat.st_size
            mtime = time.ctime(stat.st_mtime)
            print(f"{filename:20} {size:8} bytes  modified {mtime}")

# Example usage
list_files_with_metadata(".")

This script lists each file with its size and last modification time. The
os.path.join creates proper paths, and os.stat retrieves file metadata.

The example filters out directories using os.path.isfile to focus on files
only.

## Recursive Directory Listing

While os.listdir only lists one directory, we can use it with
os.walk for recursive listing. This example shows both approaches.

recursive_listing.py
  

import os

def list_recursive(directory):
    """Recursively list directory contents using os.listdir"""
    for root, dirs, files in os.walk(directory):
        print(f"\nDirectory: {root}")
        print("Subdirectories:")
        for dirname in dirs:
            print(f"  {dirname}")
        print("Files:")
        for filename in files:
            print(f"  {filename}")

# Simple recursive alternative
def simple_recursive(directory, indent=0):
    """Simple recursive listing using only os.listdir"""
    items = os.listdir(directory)
    for item in items:
        full_path = os.path.join(directory, item)
        print("  " * indent + item)
        if os.path.isdir(full_path):
            simple_recursive(full_path, indent + 1)

# Example usage
print("Using os.walk:")
list_recursive(".")

print("\nUsing recursive os.listdir:")
simple_recursive(".")

The first function uses os.walk for efficient recursive listing. The second
shows a manual recursive approach using only os.listdir.

The manual approach is simpler but less efficient for deep directory trees.

## Sorting Directory Contents

os.listdir returns items in arbitrary order. This example shows
various sorting techniques for directory contents.

sorted_listing.py
  

import os

def list_sorted(directory):
    """List directory contents sorted different ways"""
    items = os.listdir(directory)
    
    print("Alphabetical order:")
    for item in sorted(items):
        print(f"  {item}")
    
    print("\nReverse alphabetical:")
    for item in sorted(items, reverse=True):
        print(f"  {item}")
    
    print("\nBy size (smallest first):")
    sized_items = [(os.path.getsize(os.path.join(directory, f)), f) for f in items]
    for size, item in sorted(sized_items):
        print(f"  {item:20} {size:8} bytes")
    
    print("\nBy modification time (newest first):")
    timed_items = [(os.path.getmtime(os.path.join(directory, f)), f) for f in items]
    for mtime, item in sorted(timed_items, reverse=True):
        print(f"  {item}")

# Example usage
list_sorted(".")

This demonstrates alphabetical, reverse alphabetical, size-based, and
modification time sorting. Each approach uses different key functions.

For large directories, consider using generator expressions instead of
creating full lists of metadata.

## Handling Hidden Files

Unix-like systems hide files starting with '.'. This example shows how to
filter or include hidden files in directory listings.

hidden_files.py
  

import os

def list_hidden(directory, show_hidden=False):
    """List directory contents with hidden file control"""
    items = os.listdir(directory)
    
    if not show_hidden:
        items = [f for f in items if not f.startswith('.')]
    
    print(f"Contents of {directory} (hidden {'shown' if show_hidden else 'hidden'}):")
    for item in items:
        print(f"  {item}")

# Example usage
print("Normal listing (hidden files excluded):")
list_hidden(".")

print("\nIncluding hidden files:")
list_hidden(".", show_hidden=True)

# Windows hidden files (system/hidden attributes)
if os.name == 'nt':
    import win32api, win32con
    def is_hidden_win(filepath):
        attrs = win32api.GetFileAttributes(filepath)
        return attrs &amp; (win32con.FILE_ATTRIBUTE_HIDDEN | win32con.FILE_ATTRIBUTE_SYSTEM)
    
    print("\nWindows hidden files:")
    for item in os.listdir("."):
        full_path = os.path.join(".", item)
        if is_hidden_win(full_path):
            print(f"  {item} (hidden)")

The main function filters Unix hidden files. The Windows-specific section
shows how to detect hidden files using Windows API attributes.

Cross-platform applications should handle both dot-files and Windows
hidden attributes for complete hidden file detection.

## Comparing With Alternative Methods

Python offers several ways to list directory contents. This example compares
os.listdir with glob and pathlib.

alternatives.py
  

import os
import glob
from pathlib import Path

directory = "."

print("Using os.listdir:")
for item in os.listdir(directory):
    print(f"  {item}")

print("\nUsing glob.glob:")
for item in glob.glob(os.path.join(directory, "*")):
    print(f"  {os.path.basename(item)}")

print("\nUsing pathlib.Path:")
for item in Path(directory).iterdir():
    print(f"  {item.name}")

print("\nFiltering with glob:")
py_files = glob.glob(os.path.join(directory, "*.py"))
print(f"Found {len(py_files)} Python files")

print("\nPathlib with pattern matching:")
py_files = list(Path(directory).glob("*.py"))
print(f"Found {len(py_files)} Python files")

This shows equivalent directory listing operations using different Python
modules. Each has different strengths and use cases.

pathlib (Python 3.4+) offers object-oriented interface while
glob provides built-in pattern matching capabilities.

## Performance Considerations

- **Large directories:** os.listdir can be memory-intensive for directories with many files

- **Caching:** Results aren't cached - repeated calls hit the filesystem

- **Network drives:** Performance varies significantly on network filesystems

- **Alternatives:** For huge directories, consider scandir (os.scandir in Python 3.5+)

- **Error handling:** Always handle potential permission errors

## Best Practices

- **Use absolute paths:** Combine with os.path.join for reliable path handling

- **Handle exceptions:** Catch OSError for permission/not-found cases

- **Filter early:** Process results as you go for memory efficiency

- **Consider pathlib:** Newer code might prefer pathlib.Path methods

- **Document assumptions:** Note if hidden files are included/excluded

## Source References

- [Python os.listdir Documentation](https://docs.python.org/3/library/os.html#os.listdir)

- [Python os.scandir Documentation](https://docs.python.org/3/library/os.html#os.scandir)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).