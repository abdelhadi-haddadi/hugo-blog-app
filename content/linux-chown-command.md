+++
title = "Linux chown Command"
date = 2025-08-29T20:03:25.029+01:00
draft = false
description = "Linux tutorial on the chown command, covering basic and advanced file ownership changes with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux chown Command

last modified March 3, 2025

The chown command in Linux is used to change the ownership of files
and directories. It allows you to modify the user and group associated with a
file or directory. This tutorial covers basic and advanced usage of
chown with practical examples.

chown is commonly used for managing file permissions and ensuring
proper access control in multi-user environments.

## Change File Ownership

This example demonstrates how to change the owner of a file.

chown newowner filename.txt

The chown command changes the owner of filename.txt to
newowner.

## Change File Ownership and Group

This example shows how to change both the owner and group of a file.

chown newowner:newgroup filename.txt

The chown command changes the owner to newowner and the
group to newgroup for filename.txt.

## Change Ownership Recursively

This example demonstrates how to change ownership for all files in a directory.

chown -R newowner:newgroup /path/to/directory

The -R option applies the ownership change recursively to all files
and subdirectories within /path/to/directory.

## Change Group Only

This example shows how to change only the group of a file.

chown :newgroup filename.txt

The chown command changes the group of filename.txt to
newgroup without altering the owner.

## Change Ownership Using UID and GID

This example demonstrates how to change ownership using user and group IDs.

chown 1001:1002 filename.txt

The chown command changes the owner to the user with UID
1001 and the group to the group with GID 1002.

## Preserve Root Ownership

This example shows how to prevent changing ownership of root-owned files.

chown --preserve-root newowner:newgroup /path/to/directory

The --preserve-root option prevents chown from
modifying the ownership of the root directory.

## Best Practices for chown

- **Use with Caution:** Changing ownership can affect system security and functionality.

- **Recursive Changes:** Use -R carefully to avoid unintended modifications.

- **Verify Ownership:** Use ls -l to check ownership before and after changes.

- **Preserve Root:** Use --preserve-root to avoid accidental changes to system files.

## Source

[GNU chown Manual](https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html)

In this article, we have explored various examples of using the chown
command for changing file and directory ownership, including recursive changes
and preserving root ownership.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).