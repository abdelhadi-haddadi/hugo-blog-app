+++
title = "Python os.rename Function"
date = 2025-08-29T20:09:32.092+01:00
draft = false
description = "Complete guide to Python's os.rename function covering file renaming, path manipulation, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.rename Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.rename function,
which renames files and directories. We'll cover basic usage, error handling,
cross-platform considerations, and practical examples.

## Basic Definitions

The os.rename function changes the name of a file or directory.
It takes two parameters: src (source path) and dst (destination path).

On Unix systems, this is equivalent to the rename system call. On Windows,
it uses MoveFileEx. The function raises OSError if the operation fails.

## Basic File Renaming

The simplest use of os.rename changes a file's name in the same
directory. This example demonstrates renaming a single file.

basic_rename.py
  

import os

# Original and new file names
src = "old_name.txt"
dst = "new_name.txt"

# Create the original file
with open(src, "w") as f:
    f.write("Sample content")

# Rename the file
try:
    os.rename(src, dst)
    print(f"Renamed {src} to {dst}")
except OSError as e:
    print(f"Error renaming file: {e}")

# Verify the rename
if os.path.exists(dst):
    print("Rename successful")
else:
    print("Rename failed")

This example creates a file, renames it, and verifies the operation. The
try-except block handles potential errors during the rename operation.

Note that if dst already exists, behavior depends on the operating system.
On Unix, it will overwrite; on Windows, it will raise an error.

## Moving Files Between Directories

os.rename can also move files between directories when paths
include different directory components. This example shows directory moves.

move_between_dirs.py
  

import os

# Create directories and file
os.makedirs("source_dir", exist_ok=True)
os.makedirs("target_dir", exist_ok=True)
src = os.path.join("source_dir", "file.txt")

with open(src, "w") as f:
    f.write("Moving this file")

# Move file to target directory
dst = os.path.join("target_dir", "file.txt")

try:
    os.rename(src, dst)
    print(f"Moved {src} to {dst}")
except OSError as e:
    print(f"Error moving file: {e}")

# Clean up
if os.path.exists(dst):
    os.remove(dst)
os.rmdir("source_dir")
os.rmdir("target_dir")

This creates source and target directories, moves a file between them, then
cleans up. The os.path.join ensures proper path construction across platforms.

The exist_ok parameter prevents errors if directories already exist. Always
use os.path.join for cross-platform path manipulation.

## Renaming Directories

os.rename works with directories just like files. This example
demonstrates renaming an entire directory and its contents.

rename_directory.py
  

import os

# Create directory with content
os.makedirs("old_dir", exist_ok=True)
with open(os.path.join("old_dir", "test.txt"), "w") as f:
    f.write("Directory rename test")

# Rename the directory
try:
    os.rename("old_dir", "new_dir")
    print("Directory renamed successfully")
    
    # Verify contents moved
    if os.path.exists(os.path.join("new_dir", "test.txt")):
        print("Contents preserved in new directory")
except OSError as e:
    print(f"Error renaming directory: {e}")

# Clean up
if os.path.exists("new_dir"):
    os.remove(os.path.join("new_dir", "test.txt"))
    os.rmdir("new_dir")

This creates a directory with a file, renames the directory, and verifies the
contents were preserved. Directory renaming follows the same rules as files.

On Unix systems, the directory must be empty or on the same filesystem. Windows
has different restrictions regarding open files and permissions.

## Error Handling

Proper error handling is crucial for robust file operations. This example shows
common error scenarios and how to handle them.

error_handling.py
  

import os
import errno

def safe_rename(src, dst):
    try:
        os.rename(src, dst)
        return True
    except OSError as e:
        if e.errno == errno.ENOENT:
            print(f"Source file {src} does not exist")
        elif e.errno == errno.EACCES:
            print(f"Permission denied for {src} or {dst}")
        elif e.errno == errno.EEXIST:
            print(f"Destination {dst} already exists")
        else:
            print(f"Error renaming {src} to {dst}: {e}")
        return False

# Test cases
safe_rename("nonexistent.txt", "new.txt")  # ENOENT
safe_rename("/root/file.txt", "new.txt")   # EACCES (Unix)
safe_rename("file1.txt", "file2.txt")      # EEXIST (Windows)
safe_rename("valid.txt", "renamed.txt")    # Success case

This demonstrates handling various error conditions: missing source files,
permission issues, and existing destination files. The errno module provides
standard error codes.

Windows and Unix may return different error codes for similar conditions.
Always test error handling on your target platforms.

## Cross-Platform Considerations

File renaming behavior differs across operating systems. This example highlights
key differences and provides cross-platform solutions.

cross_platform.py
  

import os
import platform
import shutil

def cross_rename(src, dst):
    try:
        os.rename(src, dst)
    except OSError:
        # Fallback for Windows when dst exists
        if platform.system() == "Windows":
            try:
                os.replace(src, dst)
            except OSError as e:
                print(f"Windows-specific error: {e}")
        # Fallback for cross-device moves on Unix
        elif errno.EXDEV:
            shutil.move(src, dst)
        else:
            raise

# Usage example
cross_rename("source.txt", "destination.txt")

This shows handling platform-specific behaviors: Windows doesn't allow
overwriting by default, while Unix can't rename across filesystems.

The solution uses os.replace on Windows and shutil.move for cross-device
moves on Unix. Always consider your target platforms when renaming files.

## Atomic Rename Operations

File renames are often atomic operations, making them useful for ensuring
data consistency. This example demonstrates atomic file replacement.

atomic_rename.py
  

import os
import tempfile

def atomic_write(filename, data):
    # Write to temporary file
    temp = tempfile.NamedTemporaryFile(delete=False, dir=os.path.dirname(filename))
    try:
        with temp:
            temp.write(data.encode())
        
        # Atomic rename
        os.replace(temp.name, filename)
    except Exception:
        os.unlink(temp.name)
        raise

# Usage
atomic_write("important.dat", "Critical data")

This creates a temporary file, writes data to it, then atomically replaces
the target file. This ensures the target file is either complete or unchanged.

Atomic operations are crucial for data integrity. On Unix, os.rename is
atomic; on Windows, use os.replace for similar behavior.

## Batch Renaming Files

os.rename can be combined with other functions for batch
processing. This example renames multiple files with a pattern.

batch_rename.py
  

import os
import re

def batch_rename(directory, pattern, replacement):
    for filename in os.listdir(directory):
        if re.match(pattern, filename):
            new_name = re.sub(pattern, replacement, filename)
            src = os.path.join(directory, filename)
            dst = os.path.join(directory, new_name)
            try:
                os.rename(src, dst)
                print(f"Renamed {filename} to {new_name}")
            except OSError as e:
                print(f"Error renaming {filename}: {e}")

# Usage: prefix all .txt files with "backup_"
batch_rename(".", r"^(.*\.txt)$", r"backup_\1")

This function renames all files matching a regex pattern in a directory.
The example adds a "backup_" prefix to all .txt files.

Always test pattern matching on sample data before batch operations. Consider
dry-run modes for production code.

## Security Considerations

- **Path validation:** Always validate paths to prevent directory traversal

- **Permission checks:** Verify permissions before operations

- **Symbolic links:** Be aware of symlink behavior on your OS

- **Error handling:** Handle all possible error conditions

- **Atomic operations:** Use for critical file updates

## Best Practices

- **Use os.path.join:** For cross-platform path construction

- **Prefer os.replace:** For consistent cross-platform behavior

- **Handle errors:** Implement comprehensive error handling

- **Test thoroughly:** Especially for batch operations

- **Document assumptions:** About filesystem behavior

## Source References

- [Python os.rename Documentation](https://docs.python.org/3/library/os.html#os.rename)

- [Linux rename(2) man page](https://man7.org/linux/man-pages/man2/rename.2.html)

- [Windows MoveFileEx documentation](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexa)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).