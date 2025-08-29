+++
title = "Copying Files in Python"
date = 2025-08-29T20:07:52.195+01:00
draft = false
description = "Complete guide to copying files in Python covering multiple methods including shutil, os, pathlib, and low-level file operations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Copying Files in Python

last modified March 31, 2025

Python provides several methods for copying files, each with different features
and use cases. This tutorial covers all major approaches including high-level
utilities, low-level operations, and platform-specific considerations.

Choosing the right file copying method depends on your specific needs - whether
you require metadata preservation, handling of large files, cross-platform
compatibility, or special features like progress tracking. We'll explore each
option with practical examples.

## Using shutil.copy

The shutil.copy function is the simplest way to copy a file's contents.

shutil_copy.py
  

import shutil

# Basic file copy
shutil.copy('source.txt', 'destination.txt')

# Copy to directory (preserves filename)
shutil.copy('source.txt', '/path/to/directory/')

# With full paths
src = '/path/to/source.txt'
dst = '/path/to/destination.txt'
shutil.copy(src, dst)

The shutil.copy function provides a straightforward way to
duplicate file contents from a source to a destination location. This method
handles the basic file copying operations while automatically managing file
permissions, making it suitable for most common use cases. When using this
function, you can specify either a complete destination file path or just a
target directory - in the latter case, it will preserve the original filename.

The implementation is cross-platform compatible, working consistently across
Windows, Linux, and macOS systems. However, it's important to note that while it
copies file permissions along with the content, it doesn't preserve other
metadata like creation/modification timestamps. This makes it ideal for
situations where you simply need to duplicate a file's content and basic
permissions without worrying about maintaining all the original file attributes.

## Using shutil.copy2

shutil.copy2 is similar to copy but preserves metadata.

shutil_copy2.py
  

import shutil

# Copy with metadata preservation
shutil.copy2('source.txt', 'destination.txt')

# Works with directories too
shutil.copy2('/path/to/src/file', '/path/to/dst/file')

The shutil.copy2 function extends the capabilities of
shutil.copy by preserving all possible file metadata during the
copy operation. This includes crucial attributes like the original file creation
and modification timestamps, which are often important for maintaining file
history and version tracking. Like its simpler counterpart, it handles both
file-to-file and file-to-directory copying scenarios gracefully. 

The metadata preservation works across different filesystems as long as the
underlying operating system supports these features. This method is particularly
valuable in backup systems, version control operations, or any situation where
maintaining the exact original file attributes is required. It's worth noting
that while it preserves most metadata, some platform-specific attributes might
still not be carried over depending on the filesystem capabilities.

## Using shutil.copyfile

shutil.copyfile copies only the file contents.

shutil_copyfile.py
  

import shutil

# Copy just the file data
shutil.copyfile('source.txt', 'destination.txt')

# Will raise error if destination is directory
try:
    shutil.copyfile('source.txt', '/path/to/dir/')
except IOError as e:
    print(f"Error: {e}")

The shutil.copyfile method focuses exclusively on copying the raw
file contents without any additional metadata or permissions. This makes it the
most lightweight option among the shutil copy functions, as it doesn't attempt
to preserve or modify any file system attributes. 

Unlike shutil.copy, this function requires that the destination
parameter must be a full filename and cannot be a directory path - attempting to
specify a directory will raise an IOError. This behavior makes it particularly
useful when you need precise control over the destination filename. The function
is implemented at a lower level than the other shutil copy methods, resulting in
slightly better performance for simple file content duplication tasks where no
metadata handling is required. It's commonly used in data processing pipelines
where only the file content matters and all other attributes will be managed
separately.

## Using shutil.copyfileobj

For large files or custom handling, copyfileobj copies file objects.

shutil_copyfileobj.py
  

import shutil

with open('source.txt', 'rb') as src:
    with open('destination.txt', 'wb') as dst:
        shutil.copyfileobj(src, dst)

# With buffer size control (64KB chunks)
with open('largefile.iso', 'rb') as src:
    with open('copy.iso', 'wb') as dst:
        shutil.copyfileobj(src, dst, length=65536)

The shutil.copyfileobj function operates at a more fundamental
level by working directly with file objects rather than file paths. This
approach provides several advantages, particularly when dealing with large files
or when you need fine-grained control over the copying process. By allowing you
to specify the buffer size through the length parameter, it enables efficient
memory management during copy operations - larger buffers generally mean fewer
I/O operations but higher memory usage. 

This method is particularly valuable when copying between different types of
file-like objects, such as when transferring data between regular files, network
sockets, or in-memory buffers. The example demonstrates both the basic usage
with default buffer size and an optimized version using 64KB chunks, which often
provides a good balance between performance and memory efficiency for large file
operations. This low-level approach also serves as the foundation for building
more sophisticated copy operations with progress tracking or data transformation
during the copy process.

## Using os.system for Shell Commands

You can invoke system copy commands through os.system.

os_system_copy.py
  

import os
import platform

# Platform-appropriate copy command
if platform.system() == 'Windows':
    os.system('copy source.txt destination.txt')
else:
    os.system('cp source.txt destination.txt')

# More robust version with paths
src = '/path/to/source.txt'
dst = '/path/to/destination.txt'
if platform.system() == 'Windows':
    os.system(f'copy "{src}" "{dst}"')
else:
    os.system(f'cp "{src}" "{dst}"')

Using os.system to execute native shell commands provides a way
to leverage the operating system's built-in file copy capabilities. This
approach requires platform-specific command syntax, as demonstrated by the
different commands needed for Windows versus Unix-like systems. The first
example shows a basic cross-platform implementation that switches between
Windows' copy command and Unix's cp command. 

The second, more robust version properly handles file paths that might contain
spaces by wrapping them in quotes. While this method can be useful in certain
scenarios, it comes with several important caveats. The approach is generally
less secure than Python-native methods as it involves shell command injection,
and proper escaping of paths is crucial to prevent security vulnerabilities.

Additionally, the return value should always be checked to detect and handle any
copy failures. This technique might be appropriate in situations where you
specifically need shell features like wildcard expansion or when integrating
with existing shell scripts, but for most Python applications, the native shutil
functions are preferred.

## Using pathlib.Path

The modern pathlib module provides object-oriented file copying.

pathlib_copy.py
  

from pathlib import Path

# Basic copy
src = Path('source.txt')
dst = Path('destination.txt')
src.copy(dst)

# Copy with metadata preservation
src.copy2(dst)

# Copy to directory
target_dir = Path('/path/to/directory')
src.copy(target_dir / src.name)

The pathlib.Path class, introduced in Python 3.4, offers an
object-oriented approach to file system operations including file copying. This
modern API provides several advantages over traditional path string
manipulation. The copy methods available through Path objects mirror the
functionality of their shutil counterparts but with a more elegant syntax that
integrates seamlessly with other pathlib features. 

The example demonstrates three common copying scenarios: basic file copying,
metadata-preserving copying, and copying to a target directory while preserving
the original filename. The object-oriented nature of pathlib makes path
manipulation more intuitive and less error-prone, particularly when dealing with
complex path operations. For instance, the directory copy example shows how
easily you can combine paths using the division operator, which automatically
handles path separators correctly across different operating systems. 

This approach is especially valuable in modern Python codebases where type
safety and clean object-oriented design are priorities, though it's worth noting
that under the hood, pathlib's copy methods ultimately call the same shutil
functions we've already discussed.

## Low-Level File Copy

For complete control, you can implement manual file copying.

low_level_copy.py
  

BUFFER_SIZE = 65536  # 64KB chunks

def copy_file(src, dst):
    with open(src, 'rb') as src_file:
        with open(dst, 'wb') as dst_file:
            while True:
                data = src_file.read(BUFFER_SIZE)
                if not data:
                    break
                dst_file.write(data)

copy_file('source.txt', 'destination.txt')

Implementing file copying at this low level gives you maximum control over the
process, allowing for custom optimizations and special handling that isn't
possible with higher-level functions. The example demonstrates a basic but
robust implementation that reads the source file in configurable chunks (64KB in
this case) and writes them to the destination file. 

This approach is particularly memory-efficient because it never needs to load
the entire file into memory at once, making it suitable for very large files
that might exceed available RAM. The use of context managers (the with
statements) ensures proper file handle cleanup even if errors occur during the
copy operation. While this requires more code than using shutil functions, it
provides opportunities to add features like progress tracking, data
transformation during the copy, custom error handling, or integration with
non-file data sources. 

The buffer size can be tuned based on performance testing with your specific
hardware - larger buffers generally reduce I/O operations but increase memory
usage. This pattern also serves as the foundation for building more specialized
copy operations that might need to work with encrypted files, compressed data,
or network streams.

## Copying with Progress Tracking

For large files, you might want to track copy progress.

progress_copy.py
  

import os
import shutil

def copy_with_progress(src, dst):
    total = os.path.getsize(src)
    copied = 0
    
    def progress(length):
        nonlocal copied
        copied += length
        percent = (copied / total) * 100
        print(f"\rProgress: {percent:.1f}%", end='')
    
    with open(src, 'rb') as fsrc:
        with open(dst, 'wb') as fdst:
            shutil.copyfileobj(fsrc, fdst, callback=progress)
    print()  # Newline after progress

copy_with_progress('large_file.iso', 'copy.iso')

This enhanced copying implementation demonstrates how to add progress tracking
to file copy operations, which is particularly valuable when dealing with large
files or in user-facing applications. The function first determines the total
file size to establish the baseline for progress calculation. During the copy
process, it uses a callback function that shutil's copyfileobj invokes after
each buffer transfer, allowing us to update and display the progress percentage.

The progress display uses a carriage return (\r) to overwrite the same line
repeatedly, creating a smooth progress indicator in the console. This approach
maintains all the benefits of shutil's efficient copying while adding user
feedback. The implementation could be extended in several ways - for instance,
by adding time remaining estimates, transfer speed calculations, or integrating
with GUI progress bars. The callback mechanism is also useful for implementing
cancellation support in long-running operations. While this example prints to
the console, the same pattern could be adapted to update progress in web
applications, desktop UIs, or logging systems. The final print
ensures a clean newline after the progress display completes.

## Copying Directory Trees

To copy entire directories, use shutil.copytree.

copytree.py
  

import shutil

# Basic directory copy
shutil.copytree('source_dir', 'destination_dir')

# With symlink handling
shutil.copytree('source_dir', 'destination_dir', 
               symlinks=True)

# With ignore patterns
def ignore_pycache(dirname, filenames):
    return [fn for fn in filenames if fn == '__pycache__']

shutil.copytree('src', 'dst', ignore=ignore_pycache)

The shutil.copytree function provides comprehensive support for
recursively copying entire directory structures, including all subdirectories
and their contents. The basic usage simply duplicates the entire directory tree
from source to destination, creating all necessary subdirectories in the
process. The symlinks parameter controls how symbolic links are handled - when
True, it preserves them as links rather than copying their targets. The ignore
parameter accepts a callable that filters which files and directories should be
excluded from the copy operation, as demonstrated by the example that skips
__pycache__ directories. 

This function offers several other useful parameters
not shown here, including the ability to specify different copy functions for
special file types or to preserve specific metadata attributes. The
implementation is careful to maintain directory structure and handle various
edge cases, making it far more robust than manually recursing through
directories. When working with large directory trees, consider combining
copytree with the progress tracking techniques shown earlier, though this would
require a custom implementation since copytree doesn't natively support progress
callbacks. This function is particularly valuable for backup systems, deployment
scripts, or any application that needs to duplicate complex directory
structures.

## Best Practices

**Use shutil for most cases:** It handles edge cases properly

**Check file existence first:** Avoid accidental overwrites

**Handle paths carefully:** Use raw strings or pathlib for Windows

**Consider metadata needs:** Choose between copy() and copy2()

**Clean up on failure:** Remove partial copies if errors occur

## Source References

[Python shutil Documentation](https://docs.python.org/3/library/shutil.html)

[Python pathlib Documentation](https://docs.python.org/3/library/pathlib.html)

[Python os Documentation](https://docs.python.org/3/library/os.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).