+++
title = "Python os.link Function"
date = 2025-08-29T20:09:23.049+01:00
draft = false
description = "Complete guide to Python's os.link function covering hard link creation, file system operations, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.link Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.link function,
which creates hard links between files. We'll cover link creation,
filesystem behavior, and practical examples of hard link usage.

## Basic Definitions

The os.link function creates a hard link pointing to the same
inode as the source file. Hard links share the same data blocks on disk.

Key parameters: src (source file path), dst (destination link path).
Requires both files to be on the same filesystem. Raises OSError on failure.

## Creating a Basic Hard Link

The simplest use of os.link creates a new hard link to an
existing file. Both files will refer to the same physical data on disk.

basic_link.py
  

import os

# Create a sample file
with open("original.txt", "w") as f:
    f.write("This is the original file content")

# Create a hard link
os.link("original.txt", "link.txt")

# Verify both files exist and have same content
print(f"Original exists: {os.path.exists('original.txt')}")
print(f"Link exists: {os.path.exists('link.txt')}")

with open("link.txt") as f:
    print(f"Link content: {f.read()}")

This example creates a file, then makes a hard link to it. Both files will
show the same content since they point to the same data blocks.

Changes made through either filename will be visible in both since they
reference the same underlying file.

## Checking Link Count

We can use os.stat to check the link count (nlink) which shows
how many hard links point to a file. This count increases with each new link.

link_count.py
  

import os

# Create initial file
with open("data.txt", "w") as f:
    f.write("Sample data")

# Check initial link count
stat = os.stat("data.txt")
print(f"Initial link count: {stat.st_nlink}")

# Create first hard link
os.link("data.txt", "backup1.txt")
stat = os.stat("data.txt")
print(f"After first link: {stat.st_nlink}")

# Create second hard link
os.link("data.txt", "backup2.txt")
stat = os.stat("data.txt")
print(f"After second link: {stat.st_nlink}")

This shows how the link count increases with each new hard link. The count
decreases when links are removed, and the file is deleted when count reaches 0.

All hard links are equal - there is no "original" vs "link" distinction at
the filesystem level.

## Cross-Directory Linking

Hard links can be created in different directories as long as they're on the
same filesystem. This example demonstrates linking across directories.

cross_directory.py
  

import os

# Create directory structure
os.makedirs("docs", exist_ok=True)
os.makedirs("backups", exist_ok=True)

# Create source file
with open("docs/report.txt", "w") as f:
    f.write("Quarterly financial report")

# Create cross-directory link
os.link("docs/report.txt", "backups/report_backup.txt")

# Verify link
print(f"Original size: {os.path.getsize('docs/report.txt')}")
print(f"Link size: {os.path.getsize('backups/report_backup.txt')}")

# Modify through link
with open("backups/report_backup.txt", "a") as f:
    f.write("\nUpdated version")

# Check original content
with open("docs/report.txt") as f:
    print(f.read())

This creates a file in one directory and links to it from another. Changes
made through either path are reflected in both since they share storage.

The directories must be on the same filesystem partition for hard links to work.

## Error Handling

os.link can raise various exceptions. This example shows proper
error handling for common cases like missing source or existing destination.

error_handling.py
  

import os
import errno

def create_link(src, dst):
    try:
        os.link(src, dst)
        print(f"Created link {dst} -&gt; {src}")
    except FileNotFoundError:
        print(f"Error: Source file {src} does not exist")
    except FileExistsError:
        print(f"Error: Destination {dst} already exists")
    except PermissionError:
        print(f"Error: Permission denied for {dst}")
    except OSError as e:
        if e.errno == errno.EXDEV:
            print("Error: Cross-device linking not allowed")
        else:
            print(f"Error: {e.strerror}")

# Test cases
create_link("nonexistent.txt", "link.txt")  # Missing source
create_link("original.txt", "original.txt")  # Same file
create_link("/etc/passwd", "passwd.link")    # Permission denied (usually)
create_link("file1.txt", "/mnt/otherfs/link.txt")  # Cross-device

This demonstrates handling various error conditions that might occur when
creating hard links. Each case provides specific feedback about the failure.

Proper error handling makes programs more robust and user-friendly when
filesystem operations fail.

## Link vs Copy

This example contrasts hard links with file copies, showing their different
behavior regarding storage usage and modification propagation.

link_vs_copy.py
  

import os
import shutil

# Create original file
with open("data.txt", "w") as f:
    f.write("Original content")

# Create hard link
os.link("data.txt", "hardlink.txt")

# Create copy
shutil.copy2("data.txt", "copy.txt")

# Check initial sizes
print(f"Original size: {os.path.getsize('data.txt')}")
print(f"Hardlink size: {os.path.getsize('hardlink.txt')}")
print(f"Copy size: {os.path.getsize('copy.txt')}")

# Modify original
with open("data.txt", "a") as f:
    f.write("\nAdded line")

# Check updated content
print("\nAfter modification:")
with open("hardlink.txt") as f:
    print(f"Hardlink: {f.read()}")

with open("copy.txt") as f:
    print(f"Copy: {f.read()}")

The hard link reflects changes to the original file immediately, while the
copy remains unchanged. Both hard links share storage, while the copy uses
additional space.

Hard links are efficient for creating multiple references to the same data
without duplicating storage.

## Checking for Hard Links

We can identify hard links by comparing inode numbers and device IDs using
os.stat. This example finds all hard links to a given file.

find_links.py
  

import os

def find_hard_links(target_path):
    target_stat = os.stat(target_path)
    links = []
    
    for root, dirs, files in os.walk("/"):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                file_stat = os.stat(file_path)
                if (file_stat.st_ino == target_stat.st_ino and 
                    file_stat.st_dev == target_stat.st_dev):
                    links.append(file_path)
            except:
                continue
                
    return links

# Create test file and links
with open("master.txt", "w") as f:
    f.write("Master file")

os.link("master.txt", "link1.txt")
os.link("master.txt", "link2.txt")

# Find all links
print("Hard links found:")
for link in find_hard_links("master.txt"):
    print(link)

This scans the filesystem (starting from root) to find all files sharing the
same inode and device as the target. This identifies all hard links to a file.

Note this is an expensive operation on large filesystems and may require
root privileges to access all directories.

## Security Considerations

- **Permission requirements:** Need write permission in target directory

- **Cross-filesystem:** Hard links only work within same filesystem

- **Accidental overwrites:** Existing files won't be overwritten

- **Directory links:** Most systems prevent hard links to directories

- **Symlink differences:** Hard links are not the same as symbolic links

## Best Practices

- **Error handling:** Always handle potential OSError exceptions

- **Same filesystem:** Ensure src and dst are on same partition

- **Cleanup:** Remove unneeded links to avoid confusion

- **Documentation:** Document link relationships in complex systems

- **Alternatives:** Consider symlinks for cross-filesystem cases

## Source References

- [Python os.link Documentation](https://docs.python.org/3/library/os.html#os.link)

- [Linux link(2) man page](https://man7.org/linux/man-pages/man2/link.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).