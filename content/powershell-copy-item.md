+++
title = "PowerShell Copy-Item"
date = 2025-08-29T20:06:48.495+01:00
draft = false
description = "PowerShell Copy-Item tutorial shows how to use PowerShell to copy files and directories."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Copy-Item

last modified February 15, 2025

In this article, we will cover the Copy-Item cmdlet in
PowerShell. This cmdlet copies files and directories from one location
to another.

## Copy-Item basics

The Copy-Item cmdlet copies an item from one location to another.
It can copy files, directories, and registry keys. The cmdlet preserves the
original item and creates a copy at the destination. Wildcards are supported
for copying multiple items.

## Basic file copy

The simplest way to use Copy-Item is to specify source and
destination paths. This copies a single file to the target location. The
destination can be a file name or directory. If the destination is a
directory, the file keeps its original name.

copy1.ps1
  

Copy-Item -Path "C:\data\report.txt" -Destination "C:\backup\"

This command copies report.txt from C:\data to C:\backup. If backup
directory doesn't exist, an error occurs. The file keeps its original name.

## Copy with new name

You can rename a file while copying by specifying a new name in the
destination path. This creates a copy with a different name in the same
or different directory. The original file remains unchanged.

copy2.ps1
  

Copy-Item -Path "C:\data\report.txt" -Destination "C:\backup\report_backup.txt"

This copies report.txt to report_backup.txt in the backup directory.
Both files exist after the operation. The destination directory must exist.

## Copy multiple files

Wildcards can be used to copy multiple files matching a pattern. The asterisk
(*) matches any sequence of characters. This is useful for copying groups of
files with similar names or extensions.

copy3.ps1
  

Copy-Item -Path "C:\data\*.log" -Destination "C:\backup\"

This copies all .log files from C:\data to C:\backup. Each file keeps its
original name. Only files matching the pattern are copied.

## Recursive directory copy

To copy a directory and its contents, use the -Recurse parameter. This copies
all files and subdirectories. Without this parameter, only the empty directory
is copied. The destination directory is created if it doesn't exist.

copy4.ps1
  

Copy-Item -Path "C:\projects\" -Destination "C:\backup\projects\" -Recurse

This copies the entire projects directory to the backup location. All files
and subdirectories are included. The operation may take time for large directories.

## Force overwrite

By default, Copy-Item won't overwrite existing files. Use the
-Force parameter to overwrite existing items. This is useful when you need
to ensure the destination matches the source. Be cautious as data loss may occur.

copy5.ps1
  

Copy-Item -Path "C:\data\report.txt" -Destination "C:\backup\" -Force

This command overwrites report.txt in the backup directory if it exists.
Without -Force, the copy would fail if the file exists. The original is unchanged.

## Filtered copy

You can combine Copy-Item with other cmdlets for advanced copying.
This example copies only files modified in the last 7 days. Get-ChildItem
filters the files before copying. The pipeline passes the filtered results.

copy6.ps1
  

Get-ChildItem -Path "C:\data\" -File | 
Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) } |
Copy-Item -Destination "C:\backup\"

This copies only files modified in the last week. The pipeline filters first,
then copies. This approach is efficient for large directories.

## Copy to remote computer

Copy-Item can copy files to remote computers using PowerShell
remoting. The -ToSession parameter specifies the remote session. This requires
established PSSession with the remote computer.

copy7.ps1
  

$session = New-PSSession -ComputerName "Server01"
Copy-Item -Path "C:\data\report.txt" -Destination "C:\backup\" -ToSession $session
Remove-PSSession $session

This copies report.txt to Server01's backup directory. The session must be
established first. Always clean up sessions when done.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Copy-Item cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).