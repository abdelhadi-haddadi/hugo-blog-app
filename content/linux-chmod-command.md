+++
title = "Linux chmod Command"
date = 2025-08-29T20:03:25.047+01:00
draft = false
description = "Linux tutorial on the chmod command, covering basic and advanced file permission changes with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux chmod Command

last modified March 3, 2025

The chmod command in Linux is used to change file permissions. 
It allows users to control who can read, write, or execute a file. 
This tutorial covers basic and advanced usage of chmod with examples.

File permissions in Linux are represented by three types: 
read (r), write (w), and execute (x). 
These permissions are assigned to three categories: 
owner, group, and others.

## Basic Syntax

The basic syntax of chmod is:

chmod [options] permissions filename

permissions can be specified using symbolic or numeric notation.

## Example 1: Change Permissions Using Symbolic Notation

This example adds execute permission for the owner of a file.

chmod u+x filename.txt

Here, u stands for the owner, and +x adds execute permission.

## Example 2: Change Permissions Using Numeric Notation

This example sets read, write, and execute permissions for the owner, 
and read-only permissions for others.

chmod 744 filename.txt

The number 744 represents rwxr--r-- in permissions.

## Example 3: Remove Write Permission for Group

This example removes write permission for the group.

chmod g-w filename.txt

Here, g stands for the group, and -w removes write permission.

## Example 4: Recursively Change Permissions

This example changes permissions for all files and directories within a folder.

chmod -R 755 /path/to/directory

The -R option applies the changes recursively.

## Example 5: Set Permissions for Owner and Group

This example sets read and write permissions for the owner and group.

chmod ug=rw filename.txt

Here, ug refers to the owner and group, and =rw sets read and write permissions.

## Example 6: Set Default Permissions with umask

This example uses umask to set default permissions for new files.

umask 022

The umask value 022 ensures new files have rw-r--r-- permissions.

## Best Practices for chmod

- **Use Numeric Notation:** Use numeric notation for precise control over permissions.

- **Be Cautious with Recursive Changes:** Use -R carefully to avoid unintended changes.

- **Check Current Permissions:** Use ls -l to verify permissions before making changes.

- **Limit Execute Permissions:** Only grant execute permissions when necessary for security.

## Source

[GNU chmod Manual](https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html)

In this article, we have explored various examples of using the chmod
command to manage file permissions, including symbolic and numeric notation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).