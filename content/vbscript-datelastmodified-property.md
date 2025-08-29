+++
title = "VBScript DateLastModified Property"
date = 2025-08-29T20:14:57.431+01:00
draft = false
description = "Learn about VBScript DateLastModified property, including file timestamp access, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DateLastModified Property

last modified April 9, 2025

The DateLastModified property in VBScript is part of the
FileSystemObject. It returns the date and time when a file was last
modified. This property is read-only and provides valuable file metadata. It's
commonly used in file monitoring and backup scripts.

DateLastModified returns a standard date/time value that can be
formatted as needed. It helps track file changes and manage file versions. This
tutorial covers DateLastModified with practical examples to
demonstrate its usage.

## DateLastModified Property Overview

The DateLastModified property belongs to both File and
Folder objects. It reflects the last write time from the file
system. The property is accessed through the FileSystemObject in
VBScript scripting.

Key features include accurate timestamp retrieval and compatibility with date
functions. It doesn't require special permissions beyond file read access.
Understanding this property helps create effective file management scripts.

## Basic File Modification Date Check

This example demonstrates the simplest use of DateLastModified to
get a file's last modified timestamp. It shows how to access this property for a
specific file. The script displays the raw date/time value.

basic_lastmodified.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\example.txt")

lastModified = file.DateLastModified
WScript.Echo "File last modified: " &amp; lastModified

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to a
file. It then retrieves the DateLastModified property. The output
shows the complete date and time when the file was last modified.

## Formatting the Modification Date

This example shows how to format the DateLastModified value for
better readability. VBScript's date formatting functions are used to display the
timestamp in a specific format. This makes the output more user-friendly.

format_lastmodified.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\report.docx")

lastModified = file.DateLastModified
formattedDate = FormatDateTime(lastModified, vbLongDate)

WScript.Echo "Document last modified: " &amp; formattedDate

Set file = Nothing
Set fso = Nothing

The script retrieves the last modified date and applies FormatDateTime.
The vbLongDate constant specifies the format. This converts the raw
date into a more readable string like "April 9, 2025".

## Comparing File Modification Dates

This example demonstrates comparing modification dates of two files. It shows how
to use DateLastModified to determine which file was changed more
recently. Date comparison operators work directly with the property values.

compare_dates.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file1 = fso.GetFile("C:\temp\file1.txt")
Set file2 = fso.GetFile("C:\temp\file2.txt")

If file1.DateLastModified &gt; file2.DateLastModified Then
    WScript.Echo "file1.txt is newer"
Else
    WScript.Echo "file2.txt is newer or they were modified at the same time"
End If

Set file1 = Nothing
Set file2 = Nothing
Set fso = Nothing

The script compares the DateLastModified properties of two files.
The comparison uses standard VBScript date comparison operators. This technique
is useful for synchronization and backup scripts.

## Checking Folder Modification Date

The DateLastModified property also works with folders. This example
shows how to get the last modification date of a directory. Folder modification
dates update when contents change.

folder_lastmodified.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects")

lastModified = folder.DateLastModified
WScript.Echo "Folder last modified: " &amp; lastModified

Set folder = Nothing
Set fso = Nothing

The script retrieves a folder object and accesses its
DateLastModified property. This returns the timestamp of the most
recent change to the folder's contents. It's useful for monitoring directory
changes.

## Monitoring Recent File Changes

This example shows how to use DateLastModified to find files
changed within a specific time period. It demonstrates practical file monitoring
by comparing dates. The script checks for files modified in the last 7 days.

recent_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\temp")
cutoffDate = DateAdd("d", -7, Date())

For Each file In folder.Files
    If file.DateLastModified &gt; cutoffDate Then
        WScript.Echo file.Name &amp; " was modified on " &amp; file.DateLastModified
    End If
Next

Set folder = Nothing
Set fso = Nothing

The script calculates a cutoff date 7 days before the current date. It then
iterates through all files in a folder, checking each file's
DateLastModified against the cutoff. This identifies recently
changed files for backup or processing.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2zy0f6cf(v=vs.84))

In this article, we have explored the DateLastModified property in
VBScript, covering its usage and practical applications. From basic timestamp
retrieval to advanced file monitoring, these examples demonstrate valuable file
management techniques. With this knowledge, you can enhance your scripts with
effective file change tracking.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).