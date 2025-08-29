+++
title = "PowerShell Get-ChildItem"
date = 2025-08-29T20:06:56.252+01:00
draft = false
description = "PowerShell Get-ChildItem tutorial shows how to use PowerShell to list files and directories."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-ChildItem

last modified February 15, 2025

In this article, we will cover the Get-ChildItem cmdlet in
PowerShell. This cmdlet retrieves items from specified locations such as
files and directories.

## Get-ChildItem basics

The Get-ChildItem cmdlet lists items in a specified location. It
works with file system drives, registry, and certificate stores. By default,
it returns files and directories. The cmdlet is similar to the dir command in
CMD or ls in Unix shells.

## Basic Get-ChildItem usage

The simplest way to use Get-ChildItem is without any parameters.
This lists all items in the current directory. The output includes names,
last write times, and lengths for files. Directories are marked as such.

childitem1.ps1
  

Get-ChildItem

This command retrieves all items in the current directory. The output is
formatted as a table by default. You can see item names, types, and dates.

## List items from specific directory

You can specify a path to list items from a particular directory. Use the
-Path parameter followed by the directory path. Both relative and absolute
paths are supported. Wildcards can be used for pattern matching.

childitem2.ps1
  

Get-ChildItem -Path "C:\Windows\System32"

This command returns all items in the System32 directory. The output includes
system files and directories. Administrator privileges may be needed.

PS C:\&gt; .\childitem2.ps1

    Directory: C:\Windows\System32

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         1/5/2025   8:00 AM                en-US
d-----         1/5/2025   8:00 AM                Drivers
-a----         1/5/2025   8:00 AM          57344 advapi32.dll
-a----         1/5/2025   8:00 AM         102400 kernel32.dll

## Recursive directory listing

To list items recursively from all subdirectories, use the -Recurse parameter.
This shows the complete directory tree structure. Be cautious with large
directory trees as it may take time. The output can be extensive.

childitem3.ps1
  

Get-ChildItem -Path "C:\Temp" -Recurse

This command lists all items in C:\Temp and its subdirectories. Each file and
directory in the entire tree is displayed. The output can be filtered.

## Filter items by name

You can filter items by name using wildcards. The -Filter parameter provides
efficient pattern matching. This is useful when searching for specific files.
The filter is applied at the provider level.

childitem4.ps1
  

Get-ChildItem -Path "C:\Windows" -Filter "*.exe"

This command lists all .exe files in the Windows directory. Only executable
files matching the pattern are returned. The search is case-insensitive.

## Get specific item properties

You can select specific properties to display using Select-Object. This allows
customizing the output format. Multiple properties can be specified. The
output can be piped to other cmdlets.

childitem5.ps1
  

Get-ChildItem | Select-Object Name, Length, LastWriteTime

This command shows only name, size, and modification date of items. The output
is cleaner than the default format. Additional properties can be added.

## Find files by size

You can filter files based on their size using Where-Object. This helps identify
large files that may need attention. The size is in bytes by default. Comparison
operators can be used for different thresholds.

childitem6.ps1
  

Get-ChildItem -Recurse | Where-Object { $_.Length -gt 10MB }

This command lists files larger than 10MB in the current directory tree. The
$_ variable represents the current item in the pipeline. Adjust the size as
needed.

## Count items in directory

You can count items in a directory by measuring the output. The Measure-Object
cmdlet provides counting functionality. This is useful for inventory purposes.
The count includes both files and directories.

childitem7.ps1
  

(Get-ChildItem).Count

This command returns the number of items in the current directory. The Count
property provides a quick total. For recursive counts, use -Recurse.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-ChildItem cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).