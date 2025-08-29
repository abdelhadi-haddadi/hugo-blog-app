+++
title = "Linux scp Command"
date = 2025-08-29T20:03:30.720+01:00
draft = false
description = "Linux tutorial on the scp command, covering secure file transfer between local and remote systems with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux scp Command

last modified March 3, 2025

The scp command in Linux is used to securely copy files and
directories between local and remote systems. It uses SSH for data transfer,
ensuring encryption and authentication. This tutorial covers basic and advanced
usage of scp with practical examples.

scp is commonly used for transferring files between local and
remote machines, copying directories, and preserving file permissions.

## Copy a File from Local to Remote

This example demonstrates how to copy a file from a local machine to a remote
system.

scp file.txt user@remote:/path/to/destination

The scp command copies file.txt to the remote system
at the specified path.

## Copy a File from Remote to Local

This example shows how to copy a file from a remote system to the local machine.

scp user@remote:/path/to/file.txt /local/destination

The scp command retrieves file.txt from the remote
system and saves it locally.

## Copy a Directory Recursively

This example demonstrates how to copy a directory and its contents recursively.

scp -r /local/directory user@remote:/path/to/destination

The -r option ensures that the directory and all its contents
are copied.

## Preserve File Permissions

This example shows how to preserve file permissions during the transfer.

scp -p file.txt user@remote:/path/to/destination

The -p option preserves the original file permissions and
timestamps.

## Limit Bandwidth Usage

This example demonstrates how to limit the bandwidth used by scp.

scp -l 1000 file.txt user@remote:/path/to/destination

The -l option limits the bandwidth to 1000 Kbit/s.

## Use a Specific SSH Port

This example shows how to specify a custom SSH port for the transfer.

scp -P 2222 file.txt user@remote:/path/to/destination

The -P option specifies port 2222 for the SSH connection.

## Copy Multiple Files

This example demonstrates how to copy multiple files in a single command.

scp file1.txt file2.txt user@remote:/path/to/destination

The scp command copies both file1.txt and
file2.txt to the remote system.

## Quiet Mode

This example shows how to suppress progress and warning messages.

scp -q file.txt user@remote:/path/to/destination

The -q option enables quiet mode, reducing output to the terminal.

## Use a Specific SSH Key

This example demonstrates how to use a specific SSH key for authentication.

scp -i /path/to/private_key file.txt user@remote:/path/to/destination

The -i option specifies the private key for SSH authentication.

## Best Practices for scp

- **Use SSH Keys:** Use SSH keys for secure and passwordless authentication.

- **Limit Bandwidth:** Use the -l option to avoid network congestion.

- **Preserve Permissions:** Use -p to maintain file permissions.

- **Test Transfers:** Test small transfers before moving large files.

## Source

[scp Manual](https://linux.die.net/man/1/scp)

In this article, we have explored various examples of using the scp
command for secure file transfer, including copying files, directories, and
preserving permissions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).