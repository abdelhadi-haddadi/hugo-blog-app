+++
title = "PowerShell Remove-Item"
date = 2025-08-29T20:07:11.965+01:00
draft = false
description = "PowerShell Remove-Item tutorial shows how to use PowerShell to delete files, directories, and other items."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Remove-Item

last modified February 15, 2025

In this article, we will cover the Remove-Item cmdlet in
PowerShell. This cmdlet deletes files, folders, registry keys, and other
items from various providers.

## Remove-Item basics

The Remove-Item cmdlet deletes one or more items from a
PowerShell provider location. It works with the file system, registry,
certificate store, and other providers. The cmdlet can delete files,
directories, registry keys, and variables. It supports wildcards for
pattern matching and has safety features.

## Basic Remove-Item usage

The simplest way to use Remove-Item is to specify a file
path. This permanently deletes the specified file. The cmdlet does not
ask for confirmation by default. Be careful as deleted files don't go to
the Recycle Bin.

remove1.ps1
  

Remove-Item -Path "C:\temp\oldfile.txt"

This command deletes the file "oldfile.txt" from the C:\temp directory.
If the file doesn't exist, PowerShell will display an error message.

## Deleting a directory

To delete a directory, specify the directory path. By default, the cmdlet
only removes empty directories. Use the -Recurse parameter to delete
directories with content. This is a powerful operation that should be
used carefully.

remove2.ps1
  

Remove-Item -Path "C:\temp\oldfolder" -Recurse

This command deletes the "oldfolder" directory and all its contents.
The -Recurse parameter enables deletion of non-empty directories.

## Using wildcards for pattern matching

The Remove-Item cmdlet supports wildcards for pattern
matching. The asterisk (*) matches any characters, while the question
mark (?) matches a single character. This allows batch deletion of
files matching a pattern.

remove3.ps1
  

Remove-Item -Path "C:\temp\*.bak"

This command deletes all files with the .bak extension in C:\temp.
The wildcard (*) matches any filename before the extension.

## Using the -WhatIf parameter

The -WhatIf parameter shows what would happen without actually
deleting anything. This is useful for testing commands before
execution. It helps prevent accidental deletions by showing the
impact of the command.

remove4.ps1
  

Remove-Item -Path "C:\temp\*" -Recurse -WhatIf

This command shows what would be deleted if the command ran without
-WhatIf. The output lists all files and folders that would be removed.

## Using -Confirm for interactive deletion

The -Confirm parameter prompts for confirmation before each deletion.
This adds a safety layer when deleting important files. PowerShell
shows each item and asks for confirmation before proceeding.

remove5.ps1
  

Remove-Item -Path "C:\temp\important.txt" -Confirm

This command prompts for confirmation before deleting important.txt.
You must respond with "Y" or "A" to proceed with the deletion.

## Deleting read-only files

By default, Remove-Item won't delete read-only files.
Use the -Force parameter to override this behavior. This parameter
also suppresses confirmation prompts and can delete hidden files.

remove6.ps1
  

Remove-Item -Path "C:\temp\readonly.txt" -Force

This command forcefully deletes readonly.txt regardless of its
read-only attribute. Use -Force carefully as it bypasses protections.

## Deleting registry keys

Remove-Item can delete registry keys when working with
the registry provider. Specify the full registry path and use -Recurse
for keys with subkeys. Always back up the registry before making changes.

remove7.ps1
  

Remove-Item -Path "HKLM:\Software\MyOldApp" -Recurse

This command deletes the MyOldApp registry key and all its subkeys.
Registry operations require elevated privileges (Run as Administrator).

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Remove-Item cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).