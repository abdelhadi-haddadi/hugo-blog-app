+++
title = "Linux zip Command"
date = 2025-08-29T20:03:34.041+01:00
draft = false
description = "Linux tutorial on the zip command, covering basic and advanced file compression with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux zip Command

last modified March 3, 2025

The zip command in Linux is used to compress and archive files and
directories. It creates .zip files, which are widely used for file
compression and sharing. This tutorial covers basic and advanced usage of
zip with practical examples.

zip is commonly used for reducing file size, combining multiple
files into a single archive, and encrypting archives for security.

## Basic File Compression

This example demonstrates how to compress a single file.

zip archive.zip file.txt

The zip command creates archive.zip containing
file.txt.

## Compress Multiple Files

This example shows how to compress multiple files into a single archive.

zip archive.zip file1.txt file2.txt

The zip command combines file1.txt and
file2.txt into archive.zip.

## Compress a Directory

This example demonstrates how to compress an entire directory.

zip -r archive.zip mydir/

The -r option recursively includes all files and subdirectories
in mydir/.

## Exclude Files from Compression

This example shows how to exclude specific files from compression.

zip archive.zip mydir/ -x mydir/exclude.txt

The -x option excludes exclude.txt from the archive.

## Encrypt a Zip Archive

This example demonstrates how to create an encrypted zip archive.

zip -e secure.zip file.txt

The -e option prompts for a password to encrypt
secure.zip.

## Split Zip Archive into Parts

This example shows how to split a zip archive into smaller parts.

zip -s 10m -r archive.zip mydir/

The -s option splits archive.zip into 10MB parts.

## Update an Existing Zip Archive

This example demonstrates how to update an existing zip archive.

zip -u archive.zip newfile.txt

The -u option adds newfile.txt to
archive.zip if it is newer or missing.

## List Contents of a Zip Archive

This example shows how to list the contents of a zip archive.

unzip -l archive.zip

The -l option lists the files in archive.zip.

## Extract a Zip Archive

This example demonstrates how to extract a zip archive.

unzip archive.zip

The unzip command extracts all files from
archive.zip.

## Extract to a Specific Directory

This example shows how to extract a zip archive to a specific directory.

unzip archive.zip -d /path/to/directory/

The -d option extracts files to the specified directory.

## Best Practices for zip

- **Use for Compression:** Use zip for compressing files and directories.

- **Encrypt Sensitive Data:** Use -e to encrypt archives containing sensitive data.

- **Split Large Archives:** Use -s to split large archives for easier sharing.

- **Update Archives:** Use -u to keep archives up-to-date.

## Source

[Linux zip Manual](https://linux.die.net/man/1/zip)

In this article, we have explored various examples of using the zip
command for compressing, encrypting, and managing archives, including advanced
features like splitting and updating archives.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).