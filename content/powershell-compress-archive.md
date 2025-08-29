+++
title = "PowerShell Compress-Archive"
date = 2025-08-29T20:06:46.269+01:00
draft = false
description = "PowerShell Compress-Archive tutorial shows how to use PowerShell to create zip archives."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Compress-Archive

last modified February 15, 2025

In this article, we will cover the Compress-Archive cmdlet in
PowerShell. This cmdlet creates zip archives from files and folders. It
was introduced in PowerShell 5.0 and is part of the Microsoft.PowerShell.Archive
module.

## Archive basics

An archive is a single file that contains compressed files and folders. The
Compress-Archive cmdlet creates ZIP archives specifically. It
supports adding files recursively from directories. The cmdlet can update
existing archives or create new ones. Compression helps save storage space
and makes file transfers easier.

## Basic Compress-Archive usage

The simplest way to use Compress-Archive is with a source path
and destination path. The source can be a file or directory. The destination
is the path for the new zip file. If the destination exists, it will be
overwritten unless specified otherwise.

archive1.ps1
  

Compress-Archive -Path "C:\data\documents" -DestinationPath "C:\backups\docs.zip"

This command creates a zip archive of the documents folder. The archive is
saved to the backups directory. All files and subfolders are included by
default. The operation is recursive unless limited.

## Compress specific files

You can compress specific files by providing their paths. Multiple files can
be specified using wildcards or separate paths. The destination archive will
contain only the specified files. This is useful when you need selective
backups.

archive2.ps1
  

Compress-Archive -Path "C:\data\report.docx", "C:\data\budget.xlsx" -DestinationPath "C:\backups\important.zip"

This command creates an archive with only two specified files. The files
must exist at the provided paths. The archive will be created even if one
of the files is missing.

## Update an existing archive

Existing archives can be updated with new files using the -Update parameter.
This adds files to the archive without recreating it. Duplicate files are
replaced by default. The operation is faster than recreating the archive.

archive3.ps1
  

Compress-Archive -Path "C:\data\presentation.pptx" -DestinationPath "C:\backups\important.zip" -Update

This command adds a PowerPoint file to an existing archive. If the file
already exists in the archive, it will be overwritten. The original
compression level is maintained.

## Compression level options

The cmdlet supports different compression levels through the -CompressionLevel
parameter. Available levels are Fastest, Optimal, and NoCompression. Optimal
provides the best compression but is slower. Fastest prioritizes speed over
compression ratio.

archive4.ps1
  

Compress-Archive -Path "C:\data\images" -DestinationPath "C:\backups\images.zip" -CompressionLevel Fastest

This command creates an archive with fastest compression. It's useful for
large files where speed is important. The resulting archive may be larger
than with Optimal compression.

## Exclude files from archive

Specific files can be excluded using the -ExcludePattern parameter. This
accepts wildcards to match multiple files. The exclusion happens after
file selection. It's useful for skipping temporary or system files.

archive5.ps1
  

Compress-Archive -Path "C:\data\*" -DestinationPath "C:\backups\data.zip" -ExcludePattern "*.tmp"

This command archives all files in the data directory except .tmp files.
Multiple patterns can be specified separated by commas. The exclusion is
case-insensitive by default.

## Create archive from pipeline

File paths can be piped directly to Compress-Archive. This is
useful when combining with other cmdlets. The -DestinationPath parameter is
still required. Piping allows dynamic file selection.

archive6.ps1
  

Get-ChildItem "C:\data\*.log" | Compress-Archive -DestinationPath "C:\backups\logs.zip"

This command finds all .log files and compresses them into an archive. Only
the matched files are included. The operation preserves the directory
structure relative to the source.

## Force overwrite of archive

By default, Compress-Archive won't overwrite existing files.
The -Force parameter overrides this safety check. Use with caution as it
permanently replaces the destination file. No confirmation is requested.

archive7.ps1
  

Compress-Archive -Path "C:\data\*" -DestinationPath "C:\backups\data.zip" -Force

This command creates or overwrites the data.zip archive. Any existing
archive with the same name will be replaced. The operation proceeds
without warning if the file exists.

## Source

[Microsoft Compress-Archive documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/compress-archive)

In this article, we have covered the Compress-Archive cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).