+++
title = "VBScript DateLastAccessed Property"
date = 2025-08-29T20:14:57.448+01:00
draft = false
description = "Learn about VBScript DateLastAccessed property, including file access tracking, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DateLastAccessed Property

last modified April 9, 2025

The DateLastAccessed property in VBScript is part of the
FileSystemObject. It returns the date and time when a file was last
accessed. This property is read-only and provides valuable information for file
tracking and auditing purposes. It's commonly used in file management scripts.

DateLastAccessed returns a standard date value that can be formatted
as needed. The property works with both files and folders through the
File and Folder objects. This tutorial covers
DateLastAccessed with practical examples to demonstrate its usage.

## DateLastAccessed Property Overview

The DateLastAccessed property belongs to both File and
Folder objects in VBScript. It returns the last access timestamp
from the file system. The value includes both date and time components.

Key features include automatic updates by the operating system on file access.
The property doesn't require special permissions beyond file read access.
Understanding this property helps create file monitoring and reporting scripts.

## Basic File Access Date Retrieval

This example demonstrates the simplest use of DateLastAccessed to
get the last access time of a file. It shows how to access the property through
a File object. The script displays the raw date value.

basic_access_date.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\example.txt")

lastAccess = file.DateLastAccessed
WScript.Echo "File last accessed: " &amp; lastAccess

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to a
file. It retrieves the DateLastAccessed property and displays it.
The output shows the complete date and time when the file was last accessed.

## Formatting the Access Date

This example shows how to format the DateLastAccessed value for
better readability. VBScript's date formatting functions are used to display
the date in a specific format. The example demonstrates common formatting needs.

format_access_date.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\report.doc")

lastAccess = file.DateLastAccessed
formattedDate = FormatDateTime(lastAccess, vbLongDate)
formattedTime = FormatDateTime(lastAccess, vbLongTime)

WScript.Echo "Last accessed date: " &amp; formattedDate
WScript.Echo "Last accessed time: " &amp; formattedTime

Set file = Nothing
Set fso = Nothing

The script retrieves the last access date and formats it separately for date and
time components. vbLongDate and vbLongTime constants
provide locale-specific formatting. This approach makes the output more user-friendly.

## Comparing Access Dates

This example demonstrates comparing DateLastAccessed dates between
two files. It shows how to determine which file was accessed more recently.
Date comparison operators are used for the evaluation.

compare_access_dates.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file1 = fso.GetFile("C:\Temp\file1.txt")
Set file2 = fso.GetFile("C:\Temp\file2.txt")

If file1.DateLastAccessed &gt; file2.DateLastAccessed Then
    WScript.Echo "file1.txt was accessed more recently"
ElseIf file1.DateLastAccessed &lt; file2.DateLastAccessed Then
    WScript.Echo "file2.txt was accessed more recently"
Else
    WScript.Echo "Both files were accessed at the same time"
End If

Set file1 = Nothing
Set file2 = Nothing
Set fso = Nothing

The script compares the last access dates of two files using standard comparison
operators. The conditional logic determines which file was accessed last or if
they were accessed simultaneously. This technique is useful for file monitoring.

## Checking Recent File Access

This example shows how to check if a file was accessed within a certain time
period. It calculates the difference between the current date and the last
access date. The script demonstrates date arithmetic with DateDiff.

recent_access_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\data.dat")

lastAccess = file.DateLastAccessed
daysSinceAccess = DateDiff("d", lastAccess, Now())

If daysSinceAccess &lt;= 7 Then
    WScript.Echo "File was accessed within the last week"
Else
    WScript.Echo "File wasn't accessed in the last week"
End If

Set file = Nothing
Set fso = Nothing

The script calculates how many days have passed since the file was last accessed.
It uses DateDiff with "d" parameter for day difference. The example
shows checking against a 7-day threshold to determine recent access.

## Folder Last Access Date

This example demonstrates using DateLastAccessed with folders
instead of files. The property works identically for Folder objects.
The script shows how to retrieve a directory's last access timestamp.

folder_access_date.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp\Projects")

lastAccess = folder.DateLastAccessed
WScript.Echo "Folder last accessed: " &amp; lastAccess

Set folder = Nothing
Set fso = Nothing

The script gets a reference to a folder object instead of a file. The
DateLastAccessed property returns when the folder contents were
last accessed. This information is useful for directory monitoring and cleanup
scripts.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the DateLastAccessed property in
VBScript, covering its usage and practical applications. From basic retrieval to
date comparisons and formatting, these examples demonstrate file access tracking.
With this knowledge, you can enhance your file management scripts with access
time monitoring capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).