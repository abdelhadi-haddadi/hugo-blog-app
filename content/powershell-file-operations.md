+++
title = "PowerShell file operations"
date = 2025-08-29T20:06:52.917+01:00
draft = false
description = "In this article we show how to work with files in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell file operations

last modified February 15, 2025

In this article we show how to work with files in PowerShell.

PowerShell is a cross-platform task automation solution made up of a
command-line shell, a scripting language, and a configuration management
framework.

PowerShell provides a rich set of cmdlets for file operations.

## Get-ChildItem

The Get-ChildItem cmdlet gets the items in one or more specified locations.

get_child_item.ps1
  

Get-ChildItem -Path "C:\"

In this program, we get the child items of the root of the C drive.

PS C:\&gt; .\get_child_item.ps1

    Directory: C:\

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        15/02/2025     16:23                Config.Msi
d-----        15/02/2025     16:23                Documents and Settings
d-----        15/02/2025     16:23                PerfLogs
d-----        15/02/2025     16:23                Program Files
d-----        15/02/2025     16:23                Program Files (x86)
d-----        15/02/2025     16:23                Recovery
d-----        15/02/2025     16:23                System Volume Information
d-----        15/02/2025     16:23                Users
d-----        15/02/2025     16:23                Windows

We run the script and see the output.

## Remove-Item

The Remove-Item cmdlet deletes items such as files, directories, and registry keys.

remove_item.ps1
  

Remove-Item -Path "test.txt"

In this program, we delete a file named test.txt.

PS C:\&gt; .\remove_item.ps1

We run the script and see no output.

## Copy-Item

The Copy-Item cmdlet copies an item from one location to another.

copy_item.ps1
  

Copy-Item -Path "test.txt" -Destination "test_copy.txt"

In this program, we copy a file named test.txt to a new file named test_copy.txt.

PS C:\&gt; .\copy_item.ps1

We run the script and see no output.

## Move-Item

The Move-Item cmdlet moves an item from one location to another.

move_item.ps1
  

Move-Item -Path "test.txt" -Destination "test_moved.txt"

In this program, we move a file named test.txt to a new file named test_moved.txt.

PS C:\&gt; .\move_item.ps1

We run the script and see no output.

## Test-Path

The Test-Path cmdlet tests whether a path exists.

test_path.ps1
  

Test-Path -Path "test_moved.txt"

In this program, we test whether a file named test_moved.txt exists.

PS C:\&gt; .\test_path.ps1
True

We run the script and see the output.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article we have shown you how to work with files in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).