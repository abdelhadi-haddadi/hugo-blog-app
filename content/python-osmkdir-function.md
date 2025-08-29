+++
title = "Python os.mkdir Function"
date = 2025-08-29T20:09:25.276+01:00
draft = false
description = "Complete guide to Python's os.mkdir function covering directory creation, path handling, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.mkdir Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.mkdir function,
which creates directories in the file system. We'll cover basic usage, error
handling, path specifications, and permission modes.

## Basic Definitions

The os.mkdir function creates a directory with the specified name.
It's part of Python's os module which provides operating system interfaces.

Key parameters: path (directory to create), mode (permissions, default 0o777),
and dir_fd (optional directory file descriptor). Raises OSError on failure.

## Creating a Basic Directory

The simplest use of os.mkdir creates a single directory in the
current working directory. This example demonstrates basic directory creation.

basic_mkdir.py
  

import os

# Create a single directory
dir_name = "my_directory"

try:
    os.mkdir(dir_name)
    print(f"Directory '{dir_name}' created successfully")
except FileExistsError:
    print(f"Directory '{dir_name}' already exists")
except OSError as error:
    print(f"Error creating directory '{dir_name}': {error}")

This code attempts to create a directory and handles common errors. The
FileExistsError occurs if the directory exists, while OSError catches others.

Always handle exceptions when working with file system operations as many
things can go wrong (permissions, invalid names, etc.).

## Creating Directories with Specific Permissions

The mode parameter controls directory permissions on Unix-like systems.
This example shows how to set explicit permissions when creating a directory.

mkdir_with_permissions.py
  

import os

dir_name = "private_dir"
# Set permissions to owner read/write/execute only
mode = 0o700  # Equivalent to rwx------

try:
    os.mkdir(dir_name, mode)
    print(f"Private directory '{dir_name}' created with mode {oct(mode)}")
    
    # Verify permissions
    stat_info = os.stat(dir_name)
    print(f"Actual directory permissions: {oct(stat_info.st_mode &amp; 0o777)}")
except OSError as e:
    print(f"Error creating directory: {e}")

This creates a directory with restrictive permissions (only owner has access).
The mode is specified in octal notation (0o700 for owner-only access).

Note that the actual permissions may be affected by the umask setting of the
process, which masks out certain permission bits.

## Creating Nested Directories

os.mkdir can only create one directory level at a time. For nested
paths, you need to create each level sequentially or use os.makedirs.

nested_mkdir.py
  

import os

nested_path = "parent/child/grandchild"

# This will fail because parent directories don't exist
try:
    os.mkdir(nested_path)
    print("Created nested directory")
except FileNotFoundError:
    print("Parent directories don't exist - need to create them first")

# Correct approach for nested directories
try:
    os.makedirs(nested_path)
    print("Successfully created nested directory structure")
except OSError as e:
    print(f"Error creating directories: {e}")

The first attempt fails because intermediate directories don't exist. The
second uses os.makedirs which creates all necessary parent dirs.

For simple cases where you control the environment, os.makedirs
is often more convenient than multiple os.mkdir calls.

## Creating Directories with Absolute Paths

os.mkdir works with both relative and absolute paths. This example
demonstrates creating directories using absolute path specifications.

absolute_path_mkdir.py
  

import os

# Create directory in user's home directory
home_dir = os.path.expanduser("~")
new_dir = os.path.join(home_dir, "my_app_data")

try:
    os.mkdir(new_dir)
    print(f"Created directory at absolute path: {new_dir}")
    
    # Verify the directory exists
    if os.path.isdir(new_dir):
        print("Directory verification successful")
except PermissionError:
    print("Permission denied - cannot create directory in home folder")
except OSError as e:
    print(f"Error creating directory: {e}")

This creates a directory in the user's home folder by constructing an absolute
path. os.path.expanduser handles cross-platform home directory.

Using absolute paths is often more reliable than relative paths in applications
that need to maintain specific directory structures.

## Handling Directory Creation Race Conditions

When multiple processes might create the same directory, we need to handle
race conditions. This example shows a thread-safe approach.

race_condition_mkdir.py
  

import os
import time
from threading import Thread

shared_dir = "shared_directory"

def create_dir():
    try:
        os.mkdir(shared_dir)
        print(f"{os.getpid()} created the directory")
    except FileExistsError:
        print(f"{os.getpid()} directory already exists")

# Simulate multiple processes trying to create the same directory
threads = []
for i in range(5):
    t = Thread(target=create_dir)
    threads.append(t)
    t.start()
    time.sleep(0.1)  # Increase chance of race condition

for t in threads:
    t.join()

print("All threads completed")

This simulates multiple processes trying to create the same directory
simultaneously. Only one will succeed in creating it, others will see it exists.

The FileExistsError exception is the proper way to handle this race condition
rather than checking existence first which can lead to TOCTOU issues.

## Creating Directories with Unicode Names

os.mkdir supports Unicode directory names on most modern systems.
This example demonstrates creating directories with non-ASCII characters.

unicode_mkdir.py
  

import os

# Directory names with various Unicode characters
dir_names = [
    "文档",          # Chinese for "documents"
    "ελληνικά",     # Greek
    "Русский",      # Russian
    "日本語",        # Japanese
    "مرحبا"         # Arabic
]

for name in dir_names:
    try:
        os.mkdir(name)
        print(f"Created directory: {name}")
    except OSError as e:
        print(f"Failed to create {name}: {e}")

# Clean up
for name in dir_names:
    try:
        os.rmdir(name)
    except:
        pass

This creates directories with names in various scripts. Most modern file
systems support Unicode names, but there might be limitations on some systems.

Always test Unicode support if your application needs to work with
internationalized directory names.

## Creating Temporary Directories

For temporary directories, Python's tempfile module is often
better, but you can use os.mkdir with unique names.

temp_dir_mkdir.py
  

import os
import time
import uuid

# Create a temporary directory with unique name
temp_dir = f"temp_{int(time.time())}_{uuid.uuid4().hex[:8]}"

try:
    os.mkdir(temp_dir)
    print(f"Created temporary directory: {temp_dir}")
    
    # Use the directory...
    with open(os.path.join(temp_dir, "log.txt"), "w") as f:
        f.write("Temporary data")
        
    # Clean up
    os.remove(os.path.join(temp_dir, "log.txt"))
    os.rmdir(temp_dir)
    print("Temporary directory cleaned up")
except OSError as e:
    print(f"Error working with temporary directory: {e}")

This creates a uniquely named temporary directory using timestamp and UUID.
Remember to clean up temporary directories when they're no longer needed.

For production code, consider tempfile.mkdtemp() which handles
cleanup and security aspects more robustly.

## Security Considerations

- **Permission handling:** Be mindful of directory permissions

- **Path sanitization:** Validate paths to prevent directory traversal

- **Race conditions:** Handle cases where directory might appear/disappear

- **Symbolic links:** Be aware of symlink-related security issues

- **Error handling:** Always handle potential filesystem errors

## Best Practices

- **Use try/except:** Always handle potential errors

- **Check existence:** When needed, use os.path.exists first

- **Prefer makedirs:** For nested paths, use os.makedirs

- **Set permissions:** Explicitly set modes for security-sensitive dirs

- **Clean up:** Remove temporary directories when done

## Source References

- [Python os.mkdir Documentation](https://docs.python.org/3/library/os.html#os.mkdir)

- [Linux mkdir(2) man page](https://man7.org/linux/man-pages/man2/mkdir.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).