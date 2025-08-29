+++
title = "PowerShell Expand-Archive"
date = 2025-08-29T20:06:51.801+01:00
draft = false
description = "PowerShell Expand-Archive tutorial shows how to use PowerShell to extract zip files and compressed archives."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Expand-Archive

last modified February 15, 2025

In this article, we will cover the Expand-Archive cmdlet in
PowerShell. This cmdlet extracts files from compressed archive files.

## Archive basics

An archive is a file containing one or more files compressed to save space.
Common archive formats include ZIP, 7ZIP, and TAR. PowerShell can work with
ZIP files natively. The Expand-Archive cmdlet extracts contents
from these archives.

## Basic Expand-Archive usage

The simplest way to use Expand-Archive requires just the archive
path and destination. The cmdlet extracts all files to the specified location.
If the destination doesn't exist, it will be created automatically.

expand1.ps1
  

Expand-Archive -Path "C:\archives\data.zip" -DestinationPath "C:\extracted"

This command extracts all files from data.zip to C:\extracted. The destination
folder will contain the archive's contents with original directory structure.

## Extract to current directory

You can extract files to the current working directory by omitting the
destination path. The files will be extracted to the same location as the
archive. This is convenient for quick extractions in the current folder.

expand2.ps1
  

Expand-Archive -Path "project_files.zip"

This command extracts project_files.zip contents to the current directory.
The current location is shown by the Get-Location cmdlet.

## Force overwrite existing files

By default, Expand-Archive won't overwrite existing files. Use the
-Force parameter to overwrite files in the destination. This is useful when
you need to ensure you have the latest extracted version of files.

expand3.ps1
  

Expand-Archive -Path "update.zip" -DestinationPath "C:\app" -Force

This command overwrites existing files when extracting update.zip to C:\app.
Use caution with -Force as it permanently replaces existing files.

## Extract specific files with wildcards

You can use wildcards to extract only files matching a pattern. Combine with
the -Force parameter to selectively update specific files. This helps when you
only need certain files from a large archive.

expand4.ps1
  

Expand-Archive -Path "docs.zip" -DestinationPath "C:\docs" -Force -Include "*.pdf"

This command extracts only PDF files from docs.zip to C:\docs. The -Include
parameter filters which files to extract based on the pattern.

## Exclude specific files during extraction

The -Exclude parameter lets you skip certain files during extraction. This is
useful when you want most files but need to omit specific types or names.
Multiple patterns can be separated by commas.

expand5.ps1
  

Expand-Archive -Path "website.zip" -DestinationPath "C:\web" -Exclude "*.tmp", "thumbs.db"

This command extracts all files except temporary files and thumbs.db. The
excluded files won't be extracted or overwritten in the destination.

## Verbose output for extraction

Add the -Verbose parameter to see detailed progress during extraction. This
shows each file as it's extracted from the archive. Verbose output helps
verify the extraction process is working correctly.

expand6.ps1
  

Expand-Archive -Path "backup.zip" -DestinationPath "C:\restore" -Verbose

This command shows each extracted file in the console. The verbose output
includes paths and progress information during the extraction.

VERBOSE: Performing the operation "Expand-Archive" on target "C:\backup.zip".
VERBOSE: Created 'C:\restore\document1.txt'
VERBOSE: Created 'C:\restore\images\photo1.jpg'
VERBOSE: Created 'C:\restore\data\records.csv'

## Extract from network location

Expand-Archive works with network paths using UNC notation. Ensure
you have proper permissions to access both the archive and destination. Network
extractions may be slower depending on connection speed.

expand7.ps1
  

Expand-Archive -Path "\\server\share\archive.zip" -DestinationPath "\\nas\department\files"

This command extracts files from a network share to another network location.
Both paths use UNC format for network resource access.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Expand-Archive cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).