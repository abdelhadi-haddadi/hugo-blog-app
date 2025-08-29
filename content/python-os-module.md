+++
title = "Python OS Module"
date = 2025-08-29T20:09:25.260+01:00
draft = false
description = "Python OS Module tutorial shows how to use the OS module for interacting with the operating system in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python OS Module

last modified February 15, 2025

In this article, we show how to use the os module in Python. The
os module provides a way of interacting with the operating system,
allowing you to perform tasks such as file and directory manipulation,
environment variable management, and process management.

The os module is particularly useful for tasks like navigating the
file system, creating and deleting files, and working with environment
variables.

## Navigating the File System

The following example demonstrates how to use the os module to
navigate the file system.

main.py
  

import os

# Get the current working directory
current_directory = os.getcwd()
print("Current Directory:", current_directory)

# Change the current working directory
os.chdir('/tmp')
print("Changed Directory:", os.getcwd())

# List files and directories in the current directory
print("Files and Directories:", os.listdir())

In this program, the os.getcwd function is used to get the current
working directory, os.chdir is used to change the directory, and
os.listdir is used to list files and directories.

## Working with Files and Directories

The following example demonstrates how to create, rename, and delete files and
directories using the os module.

main.py
  

import os

# Create a new directory
os.mkdir('new_directory')
print("Directory Created:", 'new_directory')

# Rename the directory
os.rename('new_directory', 'renamed_directory')
print("Directory Renamed:", 'renamed_directory')

# Create a new file
with open('new_file.txt', 'w') as f:
    f.write('Hello, World!')
print("File Created:", 'new_file.txt')

# Delete the file
os.remove('new_file.txt')
print("File Deleted:", 'new_file.txt')

# Delete the directory
os.rmdir('renamed_directory')
print("Directory Deleted:", 'renamed_directory')

In this program, the os.mkdir function is used to create a
directory, os.rename is used to rename it, os.remove
is used to delete a file, and os.rmdir is used to delete a
directory.

$ python main.py
Directory Created: new_directory
Directory Renamed: renamed_directory
File Created: new_file.txt
File Deleted: new_file.txt
Directory Deleted: renamed_directory

## Environment Variables

The following example demonstrates how to work with environment variables using
the os module.

main.py
  

import os

# Get the value of an environment variable
home_directory = os.getenv('HOME')
print("Home Directory:", home_directory)

# Set a new environment variable
os.environ['MY_VAR'] = 'my_value'
print("MY_VAR:", os.getenv('MY_VAR'))

# List all environment variables
print("Environment Variables:", os.environ)

In this program, the os.getenv function is used to retrieve the
value of an environment variable, os.environ is used to set a new
environment variable, and os.environ is also used to list all
environment variables.

## Running System Commands

The following example demonstrates how to run system commands using the
os module.

main.py
  

import os

# Run a system command
os.system('ls -l')

In this program, the os.system function is used to execute the
ls -l command, which lists files and directories in the current
directory.

## Path Manipulation with os.path

The following example demonstrates how to manipulate file paths using the
os.path submodule.

main.py
  

import os

# Join path components
path = os.path.join('/home', 'user', 'documents', 'file.txt')
print("Joined Path:", path)

# Get the basename of the path
basename = os.path.basename(path)
print("Basename:", basename)

# Get the directory name of the path
dirname = os.path.dirname(path)
print("Dirname:", dirname)

# Check if the path exists
exists = os.path.exists(path)
print("Path Exists:", exists)

In this program, the os.path.join function is used to join path
components, os.path.basename is used to get the basename of the
path, os.path.dirname is used to get the directory name, and
os.path.exists is used to check if the path exists.

## Rename a File with os.rename

The following example demonstrates how to rename a file using the os.rename function and check if the file exists using os.path.exists.

main.py
  

import os

# Specify the file name
file_name = 'myfile.txt'

# Check if the file exists
if os.path.exists(file_name):
    # Rename the file
    os.rename('myfile.txt', 'myfile2.txt')
    print("File renamed successfully.")
else:
    print('Failed to rename file: File does not exist.')

In this program, the os.path.exists function is used to check if
the file exists, and os.rename is used to rename the file if it
exists. If the file does not exist, an appropriate message is displayed.

$ python main.py
File renamed successfully.

If the file does not exist, the program will output:

$ python main.py
Failed to rename file: File does not exist.

## List Directory with os.listdir

The following example demonstrates how to list the contents of a directory using
the os.listdir function.

main.py
  

import os

# List all entries in the current directory
content = os.listdir('.')
print("Directory Contents:", content)

In this program, the os.listdir function is used to list all
entries in the current directory. The list includes files and directories but
excludes special entries like '.' and '..'.

## List Directory with os.scandir

The following example demonstrates how to list the contents of a directory using the os.scandir function, which provides additional information such as file attributes.

main.py
  

import os
from datetime import datetime

# Specify the directory path
path = '.'

# Use scandir to list entries with additional info
with os.scandir(path) as it:
    for entry in it:
        print(f'{entry.name} - Created: {datetime.fromtimestamp(entry.stat().st_ctime)}')

In this program, the os.scandir function is used to list entries in
the current directory along with their creation time. The
entry.stat method provides file metadata, such as creation time
(st_ctime).

## Traverse Directory with os.walk

The following example demonstrates how to traverse a directory recursively using
the os.walk function. This function generates the file names and
directory names in a directory tree by walking either top-down or bottom-up.

main.py
  

import os

# Traverse the directory tree starting from the current directory
for root, dirs, files in os.walk(os.path.abspath(".")):
    # Print all files in the current directory
    for name in files:
        print(os.path.join(root, name))
    # Print all subdirectories in the current directory
    for name in dirs:
        print(os.path.join(root, name))

In this program, the os.walk function is used to traverse the
directory tree starting from the current directory. For each directory, it lists
all files and subdirectories, printing their full paths using
os.path.join.

The os.walk function is particularly useful for recursively
processing files and directories in a directory tree.

## Source

[Python OS Module - Documentation](https://docs.python.org/3/library/os.html)

In this article, we have shown how to use the os module for
interacting with the operating system in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).