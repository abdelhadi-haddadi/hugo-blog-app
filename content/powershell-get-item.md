+++
title = "PowerShell Get-Item"
date = 2025-08-29T20:06:57.354+01:00
draft = false
description = "PowerShell Get-Item tutorial shows how to use PowerShell to retrieve file and directory information."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-Item

last modified February 15, 2025

In this article, we will cover the Get-Item cmdlet in
PowerShell. This cmdlet retrieves information about files, directories,
and other items at a specified location.

## Item basics

An item in PowerShell represents a file, directory, or registry key. The
Get-Item cmdlet gets these items but does not get their contents.
It retrieves metadata like attributes, timestamps, and paths. This cmdlet is
essential for file system navigation and inspection.

## Basic Get-Item usage

The simplest way to use Get-Item is with a file or directory path.
This retrieves the item object without its contents. Wildcards are supported
but only return the first matching item. The output shows basic properties.

item1.ps1
  

Get-Item "C:\Windows\System32\notepad.exe"

This command retrieves information about Notepad.exe. The output includes
the file's attributes, last write time, and full path. The item is returned
as a FileInfo object.

## Get directory information

Get-Item can retrieve directory information similarly to files.
The cmdlet returns a DirectoryInfo object for directories. This contains
properties like creation time and parent directory. Directory contents
are not included by default.

item2.ps1
  

Get-Item "C:\Windows"

This command gets information about the Windows directory. The output shows
directory attributes and timestamps. To get contents, use Get-ChildItem.

PS C:\&gt; .\item2.ps1

    Directory: C:\

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         1/5/2023   2:30 PM                Windows

## Using wildcards with Get-Item

Wildcards can be used to match multiple items, but Get-Item
only returns the first match. For multiple matches, use Get-ChildItem.
The asterisk (*) matches any characters, while the question mark (?) matches
a single character.

item3.ps1
  

Get-Item "C:\Windows\*.exe"

This command returns the first .exe file in the Windows directory. Note that
only one item is returned despite multiple matches. The exact file returned
may vary.

## Viewing all item properties

To see all available properties of an item, pipe the output to Format-List *.
This displays all metadata associated with the item. Properties include
technical details not shown in default output. This is useful for scripting.

item4.ps1
  

Get-Item "C:\Windows\System32\notepad.exe" | Format-List *

This command shows all properties of Notepad.exe. The output includes version
information, security descriptors, and more. Many properties are available
for automation tasks.

## Accessing registry keys

Get-Item can retrieve registry keys in addition to filesystem items.
Use the registry provider path (starting with HKLM: or HKCU:). This provides
access to Windows registry configuration. The key's properties are returned.

item5.ps1
  

Get-Item "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion"

This command retrieves information about a Windows registry key. The output
shows the key's properties and subkeys. Registry values are accessed with
Get-ItemProperty.

## Filtering by item properties

You can filter items based on their properties using Where-Object.
This example finds files modified in the last 7 days. The comparison uses
the LastWriteTime property. This technique works for any item property.

item6.ps1
  

Get-Item "C:\Windows\*" | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }

This command lists items in the Windows directory modified recently. The
$_ variable represents the current item in the pipeline. Adjust the time
window as needed.

## Getting hidden items

To retrieve hidden items, use the -Force parameter. This shows items with
the Hidden attribute set. Normally, Get-Item skips hidden items.
This is useful for system administration tasks.

item7.ps1
  

Get-Item "C:\Windows\*" -Force | Where-Object { $_.Attributes -match "Hidden" }

This command finds hidden items in the Windows directory. The -Force parameter
ensures hidden items are included. The Attributes property is checked for
the Hidden flag.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-Item cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).