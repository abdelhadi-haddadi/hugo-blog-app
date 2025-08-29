+++
title = "Linux cp Command"
date = 2025-08-29T20:03:25.032+01:00
draft = false
description = "Linux tutorial on the cp command, covering basic and advanced file copying with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux cp Command

last modified March 3, 2025

The cp command in Linux is used to copy files and directories. 
It is a fundamental tool for duplicating data, backing up files, and organizing 
file systems. This tutorial covers basic and advanced usage of cp 
with practical examples.

cp is commonly used for copying single files, multiple files, 
and entire directories, with options to preserve attributes and handle conflicts.

## Copy a Single File

This example demonstrates how to copy a single file to a new location.

cp source.txt destination.txt

The cp command copies source.txt to 
destination.txt.

## Copy Multiple Files

This example shows how to copy multiple files to a directory.

cp file1.txt file2.txt /path/to/destination/

The cp command copies file1.txt and 
file2.txt to the specified directory.

## Copy a Directory

This example demonstrates how to copy an entire directory recursively.

cp -r sourcedir/ destinationdir/

The -r option ensures the directory and its contents are copied.

## Preserve File Attributes

This example shows how to copy a file while preserving its attributes.

cp -p source.txt destination.txt

The -p option preserves file permissions, timestamps, and ownership.

## Force Overwrite

This example demonstrates how to force overwrite an existing file.

cp -f source.txt destination.txt

The -f option forces the copy, even if the destination file exists.

## Interactive Copy

This example shows how to copy files interactively, prompting before overwriting.

cp -i source.txt destination.txt

The -i option prompts for confirmation before overwriting.

## Copy with Verbose Output

This example demonstrates how to copy files with verbose output.

cp -v source.txt destination.txt

The -v option displays detailed information about the copy process.

## Copy and Backup Existing Files

This example shows how to create a backup of existing files before copying.

cp --backup source.txt destination.txt

The --backup option creates a backup of the destination file.

## Copy Symbolic Links

This example demonstrates how to copy symbolic links instead of the target files.

cp -P symlink.txt destination.txt

The -P option preserves symbolic links during the copy.

## Copy with Progress

This example shows how to copy files with a progress bar.

cp --progress source.txt destination.txt

The --progress option displays a progress bar during the copy.

## Best Practices for cp

- **Use -r for Directories:** Always use -r when copying directories.

- **Preserve Attributes:** Use -p to maintain file permissions and timestamps.

- **Interactive Mode:** Use -i to avoid accidental overwrites.

- **Verbose Output:** Use -v for detailed feedback during copying.

## Source

[GNU cp Manual](https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html)

In this article, we have explored various examples of using the cp
command for copying files and directories, including advanced features like 
preserving attributes and interactive copying.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).