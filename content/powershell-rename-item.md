+++
title = "PowerShell Rename-Item"
date = 2025-08-29T20:07:14.232+01:00
draft = false
description = "PowerShell Rename-Item tutorial shows how to use PowerShell to rename files and directories."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Rename-Item

last modified February 15, 2025

In this article, we will cover the Rename-Item cmdlet in
PowerShell. This cmdlet renames files, directories, and other items in
the file system. It is essential for file management tasks.

## Rename-Item basics

The Rename-Item cmdlet changes the name of a specified item.
It works with files, folders, registry keys, and other item types. The
cmdlet doesn't move or delete items, only renames them. It requires the
path of the item and the new name as parameters.

## Basic Rename-Item usage

The simplest way to use Rename-Item is with the path and new
name. This example renames a single file. The original file must exist,
and the new name must not conflict with existing items. The cmdlet doesn't
produce output unless the -PassThru parameter is used.

rename1.ps1
  

Rename-Item -Path "C:\temp\oldfile.txt" -NewName "newfile.txt"

This command renames oldfile.txt to newfile.txt in the C:\temp directory.
If successful, no output is displayed. Use -PassThru to see the renamed item.

## Rename multiple files with wildcards

You can rename multiple files using wildcards in the path parameter. This
example adds a prefix to all .txt files in a directory. The -WhatIf parameter
can preview changes before executing. This is useful for batch operations.

rename2.ps1
  

Get-ChildItem "C:\temp\*.txt" | Rename-Item -NewName { "backup_" + $_.Name }

This command adds "backup_" prefix to all .txt files in C:\temp. The $_ 
variable represents each file in the pipeline. The operation is performed
on all matching files.

## Rename with confirmation prompt

For safety, you can add a confirmation prompt before renaming. Use the
-Confirm parameter to enable interactive confirmation. This prevents
accidental renames. The prompt shows both old and new names before proceeding.

rename3.ps1
  

Rename-Item -Path "C:\temp\important.docx" -NewName "critical.docx" -Confirm

This command prompts for confirmation before renaming important.docx. The
user must type 'Y' to proceed or 'N' to cancel. This adds safety for
important files.

## Rename and force overwrite

By default, Rename-Item won't overwrite existing files. The -Force parameter
overrides this safety check. Use with caution as it may cause data loss. This
is useful when you need to replace files intentionally.

rename4.ps1
  

Rename-Item -Path "C:\temp\temp.log" -NewName "archive.log" -Force

This command renames temp.log to archive.log even if archive.log exists.
The existing archive.log file will be overwritten. Without -Force, the
command would fail if archive.log exists.

## Rename directory

Rename-Item works with directories the same way as with files. Specify
the directory path and new name. The directory must exist, and the new
name must be available. All contents remain unchanged inside the directory.

rename5.ps1
  

Rename-Item -Path "C:\projects\old_project" -NewName "new_project"

This command renames the old_project directory to new_project. The path
to the directory changes, but all files inside remain intact. Directory
renaming is instant and doesn't involve data movement.

## Rename with regular expressions

You can use regex patterns for complex renaming operations. Combine
Get-ChildItem with Rename-Item for pattern-based renaming. This example
removes digits from filenames. The -replace operator handles regex matching.

rename6.ps1
  

Get-ChildItem "C:\temp\*.txt" | 
    Rename-Item -NewName { $_.Name -replace '\d+','' } -WhatIf

This command removes all digits from .txt filenames in C:\temp. The -WhatIf
shows what would happen without making changes. Remove -WhatIf to execute.

## Rename and keep extension

When renaming files, you often want to preserve the extension. This example
demonstrates how to modify the basename while keeping the extension. The
[System.IO.Path] class methods help handle extensions properly.

rename7.ps1
  

Get-ChildItem "C:\temp\*.jpg" | 
    Rename-Item -NewName { "resized_" + $_.BaseName + $_.Extension }

This command adds "resized_" prefix to all .jpg files while preserving
extensions. The BaseName property contains the filename without extension.
The Extension property contains the dot and extension.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Rename-Item cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).