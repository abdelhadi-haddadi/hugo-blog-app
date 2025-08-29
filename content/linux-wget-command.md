+++
title = "Linux wget Command"
date = 2025-08-29T20:03:32.941+01:00
draft = false
description = "Linux tutorial on the wget command, covering basic and advanced file downloading with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux wget Command

last modified March 3, 2025

The wget command in Linux is a powerful tool for downloading files
from the web. It supports HTTP, HTTPS, and FTP protocols and can handle
recursive downloads, file resuming, and more. This tutorial covers basic and
advanced usage of wget with practical examples.

wget is commonly used for downloading single files, entire
websites, and mirroring directories.

## Download a Single File

This example demonstrates how to download a single file from the web.

wget https://example.com/file.zip

The wget command downloads file.zip from the specified
URL and saves it in the current directory.

## Download and Save with a Different Name

This example shows how to download a file and save it with a custom name.

wget -O custom_name.zip https://example.com/file.zip

The -O option allows you to specify the output filename.

## Download in the Background

This example demonstrates how to download a file in the background.

wget -b https://example.com/largefile.zip

The -b option runs wget in the background.

## Resume a Partial Download

This example shows how to resume a partially downloaded file.

wget -c https://example.com/largefile.zip

The -c option resumes the download from where it left off.

## Download Multiple Files

This example demonstrates how to download multiple files using a list of URLs.

wget -i urls.txt

The -i option reads URLs from urls.txt and downloads
each file.

## Limit Download Speed

This example shows how to limit the download speed.

wget --limit-rate=200k https://example.com/largefile.zip

The --limit-rate option restricts the download speed to 200 KB/s.

## Download an Entire Website

This example demonstrates how to download an entire website for offline viewing.

wget --mirror --convert-links https://example.com

The --mirror option mirrors the site, and --convert-links
adjusts links for local viewing.

## Download Files via FTP

This example shows how to download files from an FTP server.

wget ftp://example.com/file.zip

The wget command supports FTP downloads with authentication if needed.

## Download with Authentication

This example demonstrates how to download a file requiring authentication.

wget --user=username --password=password https://example.com/securefile.zip

The --user and --password options provide credentials.

## Best Practices for wget

- **Use for Reliable Downloads:** Use wget for reliable and resumable downloads.

- **Limit Bandwidth:** Use --limit-rate to avoid overwhelming your network.

- **Mirror Websites:** Use --mirror for offline browsing or backups.

- **Check File Integrity:** Verify downloads using checksums when available.

## Source

[GNU wget Manual](https://www.gnu.org/software/wget/manual/wget.html)

In this article, we have explored various examples of using the wget
command for downloading files, including advanced features like resuming downloads,
limiting speed, and mirroring websites.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).