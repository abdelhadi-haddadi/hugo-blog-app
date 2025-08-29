+++
title = "Linux mkdir Command"
date = 2025-08-29T20:03:29.517+01:00
draft = false
description = "Linux tutorial on the mkdir command, covering basic and advanced directory creation with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux mkdir Command

last modified March 3, 2025

The mkdir command in Linux is used to create directories. It is a
fundamental tool for organizing files and directories in the file system. This
tutorial covers basic and advanced usage of mkdir with practical
examples.

mkdir is commonly used for creating single directories, nested
directories, and setting permissions during creation.

## Create a Single Directory

This example demonstrates how to create a single directory.

mkdir mydir

The mkdir command creates a directory named mydir in
the current working directory.

## Create Multiple Directories

This example shows how to create multiple directories at once.

mkdir dir1 dir2 dir3

The mkdir command creates three directories: dir1,
dir2, and dir3.

## Create Nested Directories

This example demonstrates how to create nested directories.

mkdir -p parent/child/grandchild

The -p option creates parent directories as needed. This command
creates a nested directory structure: parent/child/grandchild.

## Set Directory Permissions

This example shows how to set permissions while creating a directory.

mkdir -m 755 secure_dir

The -m option sets the directory permissions to 755,
which means read, write, and execute for the owner, and read and execute for
others.

## Create Directories with Spaces

This example demonstrates how to create directories with spaces in their names.

mkdir "My Documents"

Use quotes to create directories with spaces, such as My Documents.

## Verbose Mode

This example shows how to use verbose mode to display details of directory
creation.

mkdir -v logs

The -v option prints a message for each directory created. In this
case, it confirms the creation of logs.

## Best Practices for mkdir

- **Use -p for Nested Directories:** Avoid errors by creating parent directories automatically.

- **Set Permissions:** Use -m to set appropriate permissions during creation.

- **Use Quotes for Spaces:** Always use quotes for directory names with spaces.

- **Check for Existing Directories:** Use -v to confirm directory creation.

## Source

[GNU mkdir Manual](https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html)

In this article, we have explored various examples of using the mkdir
command for creating directories, including advanced features like nested
directories and setting permissions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).