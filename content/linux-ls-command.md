+++
title = "Linux ls Command"
date = 2025-08-29T20:03:29.536+01:00
draft = false
description = "Linux tutorial on the ls command, covering basic and advanced directory listing with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux ls Command

last modified March 3, 2025

The ls command in Linux is used to list the contents of a directory.
It is one of the most frequently used commands for navigating and managing files
and directories. This tutorial covers basic and advanced usage of ls
with practical examples.

ls is commonly used for viewing files, directories, and their
properties such as permissions, size, and modification dates.

## List Directory Contents

This example demonstrates how to list the contents of the current directory.

ls

The ls command outputs the names of files and directories in the
current directory.

## List Contents in Long Format

This example shows how to list directory contents in a detailed, long format.

ls -l

The -l option displays file permissions, ownership, size, and
modification date.

## List Hidden Files

This example demonstrates how to list hidden files (those starting with a dot).

ls -a

The -a option includes hidden files in the output.

## List Files with Human-Readable Sizes

This example shows how to list files with sizes in a human-readable format.

ls -lh

The -h option formats file sizes in KB, MB, or GB.

## List Files Sorted by Modification Time

This example demonstrates how to list files sorted by modification time.

ls -lt

The -t option sorts files by modification time, newest first.

## List Files in Reverse Order

This example shows how to list files in reverse order.

ls -r

The -r option reverses the order of the output.

## List Files Recursively

This example demonstrates how to list files recursively in subdirectories.

ls -R

The -R option lists files in the current directory and all
subdirectories.

## List Files with File Type Indicators

This example shows how to list files with indicators for file types.

ls -F

The -F option appends symbols like / for directories
and * for executables.

## List Files with Inode Numbers

This example demonstrates how to list files with their inode numbers.

ls -i

The -i option displays the inode number of each file.

## List Files with Colorized Output

This example shows how to list files with colorized output for better readability.

ls --color

The --color option colorizes the output based on file types.

## Best Practices for ls

- **Use Aliases:** Create aliases for frequently used ls options.

- **Combine Options:** Combine options like -l, -h, and -a for detailed output.

- **Redirect Output:** Use &gt; to save directory listings to a file.

- **Check Permissions:** Use -l to verify file permissions and ownership.

## Source

[GNU ls Manual](https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html)

In this article, we have explored various examples of using the ls
command for listing directory contents, including advanced features like sorting,
recursive listing, and colorized output.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).