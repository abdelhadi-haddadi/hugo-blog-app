+++
title = "PowerShell New-Item"
date = 2025-08-29T20:07:07.427+01:00
draft = false
description = "PowerShell New-Item tutorial shows how to use PowerShell to create files and directories."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell New-Item

last modified February 15, 2025

In this article, we will cover the New-Item cmdlet in
PowerShell. This cmdlet creates files, directories, and other items
in the filesystem.

## New-Item basics

The New-Item cmdlet creates new items in the filesystem.
It can create files, directories, symbolic links, and junctions.
The cmdlet is versatile with parameters to control item creation.
It's essential for filesystem automation in PowerShell scripts.

## Create a new directory

The simplest use of New-Item creates a new directory.
Use the -ItemType parameter with value "Directory" to specify this.
The -Path parameter defines where to create the directory.
Multiple directories can be created in a single command.

newitem1.ps1
  

New-Item -Path "C:\temp\NewFolder" -ItemType Directory

This command creates a new directory named "NewFolder" in C:\temp.
If the parent directory doesn't exist, the command will fail.
The -Force parameter can create parent directories automatically.

## Create a new file

To create a new file, use New-Item with -ItemType "File".
The -Value parameter can initialize the file with content.
If the file exists, it will be overwritten unless -Force is omitted.
Empty files are created if -Value is not specified.

newitem2.ps1
  

New-Item -Path "C:\temp\example.txt" -ItemType File -Value "Initial content"

This creates example.txt in C:\temp with "Initial content" as text.
The file encoding will be UTF-8 by default in PowerShell.
To specify different encoding, use Out-File after creation.

## Create multiple items

New-Item can create multiple items at once using arrays.
Provide multiple paths in the -Path parameter as an array.
This works for both files and directories.
Each item will be created with the same properties.

newitem3.ps1
  

New-Item -Path "C:\temp\dir1","C:\temp\dir2" -ItemType Directory

This creates two directories: dir1 and dir2 in C:\temp.
The same technique works for creating multiple files.
Wildcards are not supported in the -Path parameter.

## Create items with relative paths

New-Item works with relative paths based on current location.
The current location is shown by Get-Location cmdlet.
Relative paths simplify scripts that work in different directories.
Dot notation (., ..) can be used in paths.

newitem4.ps1
  

New-Item -Path ".\relative.txt" -ItemType File

This creates relative.txt in the current working directory.
The file path is relative to where the script is executed.
Use Push-Location and Pop-Location to manage working directory.

## Create symbolic links

New-Item can create symbolic links with -ItemType "SymbolicLink".
Symbolic links point to other files or directories in the filesystem.
The -Target parameter specifies what the link points to.
Administrator privileges are required on Windows.

newitem5.ps1
  

New-Item -ItemType SymbolicLink -Path "C:\temp\mylink" -Target "C:\target"

This creates a symbolic link named mylink pointing to C:\target.
For files, use -ItemType "File" with -Value pointing to target.
Symbolic links are useful for creating shortcuts in scripts.

## Create items with confirmation

The -Confirm parameter adds interactive confirmation before creation.
This prevents accidental overwrites of existing items.
The confirmation prompt shows what will be created.
Useful in scripts where safety is important.

newitem6.ps1
  

New-Item -Path "C:\temp\important.txt" -ItemType File -Confirm

This shows a confirmation prompt before creating important.txt.
Answer 'Y' to proceed or 'N' to cancel the operation.
The -WhatIf parameter shows what would happen without making changes.

## Create hidden files

Files can be created with hidden attribute using -Force parameter.
Hidden files aren't visible in normal directory listings.
The attribute can be modified later with attrib.exe or Set-ItemProperty.
Hidden files are often used for configuration.

newitem7.ps1
  

New-Item -Path "C:\temp\hidden.txt" -ItemType File -Force -Value "hidden" | 
    Set-ItemProperty -Name Attributes -Value "Hidden"

This creates hidden.txt and immediately sets it as hidden.
The pipeline passes the new file object to Set-ItemProperty.
Hidden files can be viewed with Get-ChildItem -Force.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the New-Item cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).