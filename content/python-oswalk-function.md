+++
title = "Python os.walk Function"
date = 2025-08-29T20:09:48.102+01:00
draft = false
description = "Complete guide to Python's os.walk function covering directory traversal, recursive file listing, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.walk Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.walk function,
which recursively traverses directory trees. We'll cover directory navigation,
file listing, and practical filesystem exploration examples.

## Basic Definitions

The os.walk function generates file names in a directory tree
by walking either top-down or bottom-up. It returns a 3-tuple for each
directory visited.

Key parameters: top (root directory), topdown (traversal order), onerror
(error handler), followlinks (follow symlinks). Returns (dirpath, dirnames,
filenames) tuples.

## Basic Directory Traversal

The simplest use of os.walk lists all files and directories
starting from a given root. This example shows the basic recursive traversal.

basic_walk.py
  

import os

# Walk through directory tree
for root, dirs, files in os.walk("my_directory"):
    print(f"Current directory: {root}")
    print(f"Subdirectories: {dirs}")
    print(f"Files: {files}")
    print("-" * 40)

# Count total files
file_count = sum(len(files) for _, _, files in os.walk("my_directory"))
print(f"Total files found: {file_count}")

This example shows the basic structure of os.walk usage. For each directory,
it prints the path, subdirectories, and files. Finally, it counts all files.

The generator yields tuples containing the current path, immediate
subdirectories, and non-directory files at each level of traversal.

## Filtering Files by Extension

We can filter files during traversal to only process specific file types.
This example finds all Python files (.py) in a directory tree.

filter_extensions.py
  

import os

# Find all Python files
python_files = []
for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith(".py"):
            python_files.append(os.path.join(root, file))

print("Python files found:")
for file in python_files:
    print(f"- {file}")

# Count lines of code
total_lines = 0
for file in python_files:
    with open(file) as f:
        total_lines += len(f.readlines())

print(f"\nTotal lines of Python code: {total_lines}")

This code first collects all Python files, then counts their total lines.
The os.path.join ensures correct path construction across operating systems.

The underscore (_) ignores dirnames since we don't need them in this example.
This is a common Python convention for unused variables.

## Modifying Directory Traversal

The dirnames list can be modified in-place to control which subdirectories
are visited. This example excludes directories starting with a dot.

modify_traversal.py
  

import os

# Skip hidden directories (starting with dot)
for root, dirs, files in os.walk("project"):
    # Modify dirs in-place to skip hidden directories
    dirs[:] = [d for d in dirs if not d.startswith(".")]
    
    print(f"Scanning: {root}")
    for file in files:
        if not file.startswith("."):  # Skip hidden files too
            print(f"  - {file}")

# Alternative: Skip specific directories entirely
skip_dirs = {"venv", "__pycache__", "node_modules"}
for root, dirs, files in os.walk("project"):
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    # Process remaining files...

By modifying the dirs list during traversal, we control the recursion.
This is more efficient than filtering after traversal is complete.

The slice assignment (dirs[:]) modifies the list in-place, which affects
the walk behavior. This is a key feature of os.walk.

## Calculating Directory Sizes

We can use os.walk to calculate the total size of all files in a directory
tree. This example shows both per-directory and total size calculations.

directory_sizes.py
  

import os

def get_size(start_path):
    total_size = 0
    for dirpath, _, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            try:
                total_size += os.path.getsize(fp)
            except OSError:
                continue
    return total_size

# Calculate size for each directory
for root, dirs, _ in os.walk("data"):
    dir_sizes = {}
    for d in dirs:
        path = os.path.join(root, d)
        size = get_size(path)
        dir_sizes[d] = size
    
    print(f"\nDirectory: {root}")
    for d, size in dir_sizes.items():
        print(f"  {d}: {size/1024:.2f} KB")

# Total size
total = get_size("data")
print(f"\nTotal data size: {total/1024/1024:.2f} MB")

This example shows two approaches: calculating total size recursively and
showing per-directory breakdowns. Error handling prevents crashes on
inaccessible files.

The function converts bytes to KB and MB for better readability. Real-world
applications might add more formatting or threshold checks.

## Finding Duplicate Files

By combining os.walk with file hashing, we can identify duplicate files
across a directory structure. This example uses MD5 hashes for comparison.

find_duplicates.py
  

import os
import hashlib

def file_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

# Find duplicate files
file_hashes = {}
duplicates = []

for root, _, files in os.walk("photos"):
    for file in files:
        path = os.path.join(root, file)
        try:
            file_size = os.path.getsize(path)
            if file_size &gt; 0:  # Skip empty files
                fhash = file_hash(path)
                if fhash in file_hashes:
                    duplicates.append((path, file_hashes[fhash]))
                else:
                    file_hashes[fhash] = path
        except (OSError, PermissionError):
            continue

print("Duplicate files found:")
for dup, original in duplicates:
    print(f"{dup} is a duplicate of {original}")

This code builds a dictionary of file hashes and checks for duplicates.
It skips empty files and handles potential permission errors gracefully.

For large file collections, consider adding size checks before hashing or
using a faster hash algorithm like xxHash for better performance.

## Processing Files by Modification Time

This example finds files modified within the last 7 days, demonstrating
how to combine os.walk with file metadata operations.

recent_files.py
  

import os
import time

# Files modified in last 7 days
recent_files = []
current_time = time.time()
seven_days_ago = current_time - (7 * 24 * 60 * 60)

for root, _, files in os.walk("logs"):
    for file in files:
        path = os.path.join(root, file)
        try:
            mtime = os.path.getmtime(path)
            if mtime &gt; seven_days_ago:
                recent_files.append((path, time.ctime(mtime)))
        except OSError:
            continue

print("Files modified in last 7 days:")
for path, mtime in sorted(recent_files, key=lambda x: x[1], reverse=True):
    print(f"{mtime}: {path}")

# Archive old files
for root, _, files in os.walk("logs"):
    for file in files:
        path = os.path.join(root, file)
        mtime = os.path.getmtime(path)
        if mtime &lt;= seven_days_ago:
            # Add archiving logic here
            print(f"Archiving: {path}")

The script first identifies recent files, then shows how to process older
files separately. Time calculations use seconds since epoch for comparison.

This pattern is useful for log rotation, backup systems, or any time-based
file processing tasks.

## Bottom-Up Directory Traversal

Setting topdown=False reverses the traversal order to process subdirectories
before their parents. This is useful for operations like directory removal.

bottom_up.py
  

import os
import shutil

# Bottom-up traversal example
print("Bottom-up traversal order:")
for root, dirs, files in os.walk("temp", topdown=False):
    print(f"Processing: {root}")
    for file in files:
        file_path = os.path.join(root, file)
        print(f"  Deleting file: {file_path}")
        os.unlink(file_path)
    
    # Now safe to remove the directory
    print(f"  Removing directory: {root}")
    os.rmdir(root)

# Alternative using shutil for entire tree removal
if os.path.exists("temp_backup"):
    print("\nRemoving backup directory with shutil:")
    shutil.rmtree("temp_backup")

The bottom-up approach ensures we process files before attempting to remove
their parent directories. The example shows both manual and shutil methods.

Bottom-up traversal is essential when operations on children must complete
before their parents can be processed.

## Security Considerations

- **Symlink handling:** followlinks=False prevents following symbolic links

- **Permission errors:** Implement onerror callback for graceful handling

- **Path sanitization:** Always use os.path.join for cross-platform paths

- **Memory usage:** For large directories, consider iterative approaches

- **Race conditions:** File system may change during traversal

## Best Practices

- **Use generators:** Process files incrementally to save memory

- **Handle errors:** Implement onerror for robust traversal

- **Modify dirs list:** Control recursion by editing dirs in-place

- **Cross-platform:** Use os.path functions for path manipulation

- **Document behavior:** Note traversal order (topdown/bottom-up)

## Source References

- [Python os.walk Documentation](https://docs.python.org/3/library/os.html#os.walk)

- [Python shutil Documentation](https://docs.python.org/3/library/shutil.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).