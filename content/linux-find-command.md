+++
title = "Linux find Command"
date = 2025-08-29T20:03:27.273+01:00
draft = false
description = "Linux tutorial on the find command, covering basic and advanced file search with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux find Command

last modified February 25, 2025

The find command in Linux is a powerful tool for searching files
and directories based on various criteria, such as name, type, size, and
modification time. It is widely used for locating files, performing batch
operations, and automating tasks. This tutorial covers basic and advanced usage
of find with practical examples.

find supports a wide range of options and expressions, making it
a versatile tool for system administrators and developers.

## Basic File Search

This example demonstrates how to search for files by name in a directory.

basic_search.sh
  

find /path/to/dir -name "filename.txt"

The -name option searches for files with the specified name.

## Search by File Type

This example shows how to search for files of a specific type, such as
directories or regular files.

search_by_type.sh
  

# Search for directories
find /path/to/dir -type d

# Search for regular files
find /path/to/dir -type f

The -type option filters results by file type (d for
directories, f for files).

## Search by File Size

This example demonstrates how to search for files larger than a specified size.

search_by_size.sh
  

# Search for files larger than 10MB
find /path/to/dir -size +10M

The -size option filters files by size. Use + for
larger than and - for smaller than.

## Search by Modification Time

This example shows how to search for files modified within the last 7 days.

search_by_time.sh
  

find /path/to/dir -mtime -7

The -mtime option filters files by modification time. Use
-7 for files modified within the last 7 days.

## Execute Commands on Found Files

This example demonstrates how to execute a command on each file found.

execute_commands.sh
  

find /path/to/dir -name "*.log" -exec rm {} \;

The -exec option runs the specified command (rm in
this case) on each file found. The {} placeholder represents the
current file.

## Search by Permissions

This example shows how to search for files with specific permissions.

search_by_permissions.sh
  

find /path/to/dir -perm 644

The -perm option filters files by their permission settings.

## Advanced: Combining Conditions

This example demonstrates how to combine multiple conditions in a single
find command.

combine_conditions.sh
  

find /path/to/dir -name "*.txt" -size +1M -mtime -30

This command searches for .txt files larger than 1MB and modified
within the last 30 days.

## Best Practices for find

- **Use -name for Exact Matches:** Always use -name for precise filename searches.

- **Combine Conditions:** Use multiple conditions to refine search results.

- **Execute Commands Safely:** Test -exec commands with echo before running them.

- **Optimize Performance:** Limit search depth with -maxdepth for faster results.

## Source

[GNU find Manual](https://www.gnu.org/software/findutils/manual/html_node/find_html/index.html)

In this article, we have explored various examples of using the find
command for file and directory search, including searching by name, type, size,
modification time, and permissions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).