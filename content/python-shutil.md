+++
title = "Python shutil"
date = 2025-08-29T20:10:23.131+01:00
draft = false
description = "Python shutil tutorial shows how to use the shutil module for high-level file operations in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python shutil

last modified February 15, 2025

In this article, we show how to use the shutil module in Python.
The shutil module provides high-level file operations, such as
copying, moving, and deleting files and directories. It is particularly useful
for automating file management tasks.

The shutil module is part of Python's standard library, so no
additional installation is required.

## Copying Files

The following example demonstrates how to copy a file using the
shutil.copy function.

main.py
  

import shutil

# Copy a file
shutil.copy('source.txt', 'destination.txt')
print("File copied successfully.")

In this program, the shutil.copy function is used to copy the
contents of source.txt to destination.txt. If
destination.txt does not exist, it will be created.

$ python main.py
File copied successfully.

## Copying Directories

The following example demonstrates how to copy a directory using the
shutil.copytree function.

main.py
  

import shutil

# Copy a directory
shutil.copytree('source_dir', 'destination_dir')
print("Directory copied successfully.")

In this program, the shutil.copytree function is used to copy the
entire contents of source_dir to destination_dir. If
destination_dir does not exist, it will be created.

$ python main.py
Directory copied successfully.

## Moving Files and Directories

The following example demonstrates how to move a file or directory using the
shutil.move function.

main.py
  

import shutil

# Move a file
shutil.move('source.txt', 'destination.txt')
print("File moved successfully.")

# Move a directory
shutil.move('source_dir', 'destination_dir')
print("Directory moved successfully.")

In this program, the shutil.move function is used to move
source.txt to destination.txt and
source_dir to destination_dir.

$ python main.py
File moved successfully.
Directory moved successfully.

## Deleting Directories

The following example demonstrates how to delete a directory using the
shutil.rmtree function.

main.py
  

import shutil

# Delete a directory
shutil.rmtree('directory_to_delete')
print("Directory deleted successfully.")

In this program, the shutil.rmtree function is used to delete
directory_to_delete and all its contents.

$ python main.py
Directory deleted successfully.

## Archiving Files and Directories

The following example demonstrates how to create an archive (e.g., ZIP file)
using the shutil.make_archive function.

main.py
  

import shutil

# Create a ZIP archive
shutil.make_archive('archive', 'zip', 'source_dir')
print("Archive created successfully.")

In this program, the shutil.make_archive function is used to create
a ZIP archive of source_dir.

$ python main.py
Archive created successfully.

## Source

[Python shutil - Documentation](https://docs.python.org/3/library/shutil.html)

In this article, we have shown how to use the shutil module in
Python for high-level file operations. The shutil module is a
powerful tool for automating file management tasks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).