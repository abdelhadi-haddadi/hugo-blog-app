+++
title = "VBScript Size Property"
date = 2025-08-29T20:15:14.260+01:00
draft = false
description = "Learn about VBScript Size property, including file size checking, folder size calculation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Size Property

last modified April 9, 2025

The Size property in VBScript is part of the
FileSystemObject object model. It returns the size of a file or
folder in bytes. For files, it gives the exact byte count. For folders, it
recursively calculates the total size of all contained files.

Size is commonly used for disk space management and file analysis.
It helps in monitoring storage usage and implementing size-based file operations.
This tutorial covers Size with practical examples to demonstrate
its usage.

## Size Property Overview

The Size property is available for both File and
Folder objects. It returns a numeric value representing bytes. For
folders, the calculation includes all subfolders and files. The property is
read-only and requires proper object initialization.

Key features include accurate byte counting and recursive folder sizing. It
doesn't account for filesystem overhead or allocation units. Size
works with all file types and folder structures. Understanding this property
helps create robust file management scripts.

## Getting File Size

This example demonstrates the basic use of Size to get a file's
size. It shows how to access a file object and retrieve its size in bytes. The
result is displayed in a message box.

file_size.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\example.txt")
fileSize = file.Size

WScript.Echo "File size: " &amp; fileSize &amp; " bytes"

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to a
file. The Size property returns the file's size in bytes. The
result is displayed using WScript.Echo. Always clean up objects
when done.

## Converting Bytes to KB and MB

This example shows how to convert the raw byte count to more readable units. It
demonstrates dividing the size by 1024 for KB and by 1024 squared for MB. The
converted values are formatted for better readability.

size_conversion.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\largefile.dat")

bytes = file.Size
kb = bytes / 1024
mb = kb / 1024

WScript.Echo "Size: " &amp; Round(mb, 2) &amp; " MB (" &amp; bytes &amp; " bytes)"

Set file = Nothing
Set fso = Nothing

The script gets the file size and performs unit conversions. The Round
function formats the MB value to two decimal places. This approach makes file
sizes more understandable for users. The original byte count is also displayed.

## Getting Folder Size

This example demonstrates using Size with folders. It shows how the
property recursively calculates total size of all files in a folder structure.
The result includes all subfolders and their contents.

folder_size.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\temp\projects")
folderSize = folder.Size

WScript.Echo "Folder size: " &amp; folderSize &amp; " bytes"

Set folder = Nothing
Set fso = Nothing

The script gets a folder reference and accesses its Size property.
The calculation may take time for large folder structures. The result represents
the sum of all files' sizes within the folder hierarchy. Empty folders contribute
zero bytes to the total.

## Checking Disk Space Usage

This example combines Size with drive information to check disk
space usage. It calculates the percentage of used space on a drive. The script
demonstrates practical storage monitoring.

disk_usage.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

totalSpace = drive.TotalSize
freeSpace = drive.FreeSpace
usedSpace = totalSpace - freeSpace
usagePercent = (usedSpace / totalSpace) * 100

WScript.Echo "Disk usage: " &amp; Round(usagePercent, 2) &amp; "%"

Set drive = Nothing
Set fso = Nothing

The script calculates disk usage percentage using drive properties. The
Size concept relates to the space calculations. The result shows
how much of the drive's capacity is in use. This technique is useful for system
monitoring scripts.

## Finding Large Files

This example searches a folder for files larger than a specified size. It
demonstrates using Size in file filtering operations. The script
lists all files exceeding the size threshold.

large_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\temp")
threshold = 10 * 1024 * 1024 ' 10 MB

For Each file In folder.Files
    If file.Size &gt; threshold Then
        WScript.Echo file.Name &amp; ": " &amp; file.Size &amp; " bytes"
    End If
Next

Set folder = Nothing
Set fso = Nothing

The script checks each file's Size against a 10 MB threshold. Files
exceeding the limit are listed with their sizes. This approach helps identify
space-consuming files. The threshold can be adjusted as needed.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Size property in VBScript,
covering its usage and practical applications. From basic file sizing to disk
space analysis, these examples demonstrate valuable file management techniques.
With this knowledge, you can enhance your scripts with robust size-related
operations.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).