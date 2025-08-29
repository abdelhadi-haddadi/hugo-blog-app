+++
title = "VBScript DateCreated Property"
date = 2025-08-29T20:14:57.451+01:00
draft = false
description = "Learn about VBScript DateCreated property, including file creation dates, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DateCreated Property

last modified April 9, 2025

The DateCreated property in VBScript is part of the
FileSystemObject. It returns the date and time when a file or
folder was created. This read-only property is useful for file management and
auditing purposes. It helps track when system resources were originally created.

DateCreated returns a standard date/time value that can be formatted
or compared. It works with both File and Folder objects.
This tutorial covers DateCreated with practical examples to
demonstrate its usage.

## DateCreated Property Overview

The DateCreated property requires a reference to a valid file or
folder object. It returns the creation timestamp in the local system time zone.
The value includes both date and time components down to the second.

Key features include automatic conversion to VBScript's date format and
read-only access. The property reflects the actual filesystem creation time.
Understanding this property helps create file management and reporting scripts.

## Basic File Creation Date Check

This example demonstrates the simplest use of DateCreated to get a
file's creation date. It shows how to access the property and display the result.
The script checks a specific file's creation timestamp.

basic_datecreated.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\example.txt")

creationDate = file.DateCreated
WScript.Echo "File created on: " &amp; creationDate

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to a
file. It then accesses the DateCreated property and displays it.
The output shows the exact date and time when the file was created.

## Comparing File Creation Dates

This example shows how to compare creation dates of two different files. It
demonstrates date comparison operations using DateCreated. The
script determines which file was created earlier.

compare_dates.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file1 = fso.GetFile("C:\Temp\file1.txt")
Set file2 = fso.GetFile("C:\Temp\file2.txt")

If file1.DateCreated &lt; file2.DateCreated Then
    WScript.Echo "file1.txt was created earlier"
Else
    WScript.Echo "file2.txt was created earlier"
End If

Set file1 = Nothing
Set file2 = Nothing
Set fso = Nothing

The script compares the DateCreated properties of two files. It
uses standard date comparison operators to determine which file is older. This
technique is useful for sorting or processing files by age.

## Formatting Creation Date Output

This example demonstrates formatting the DateCreated output for
better readability. It shows how to use VBScript's date formatting functions.
The script displays the creation date in a custom format.

format_date.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\data.log")

creationDate = file.DateCreated
formattedDate = Year(creationDate) &amp; "-" &amp; Right("0" &amp; Month(creationDate), 2) &amp; "-" &amp; Right("0" &amp; Day(creationDate), 2)

WScript.Echo "Log file created on: " &amp; formattedDate

Set file = Nothing
Set fso = Nothing

The script retrieves the creation date and formats it as YYYY-MM-DD. It uses
VBScript date functions to extract and format each component. This approach
provides control over how dates are displayed.

## Checking Folder Creation Date

DateCreated works with folders as well as files. This example shows
how to get the creation date of a directory. The process is similar to checking
file creation dates.

folder_date.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects")

creationDate = folder.DateCreated
WScript.Echo "Project folder created on: " &amp; creationDate

Set folder = Nothing
Set fso = Nothing

The script gets a reference to a folder instead of a file. It then accesses the
DateCreated property the same way. This demonstrates the property's
consistency across different filesystem objects.

## Listing Files with Creation Dates

This example shows how to list all files in a directory with their creation
dates. It combines DateCreated with folder enumeration. The script
creates a simple file inventory report.

list_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")

WScript.Echo "Files in " &amp; folder.Path &amp; ":"
For Each file In folder.Files
    WScript.Echo file.Name &amp; " - Created: " &amp; file.DateCreated
Next

Set folder = Nothing
Set fso = Nothing

The script enumerates all files in a folder and displays each file's name and
creation date. This demonstrates practical use of DateCreated for
file management tasks. The output provides a complete file listing with timestamps.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the DateCreated property in
VBScript, covering its usage and practical applications. From simple date checks
to complex file listings, these examples demonstrate reliable file timestamp
access. With this knowledge, you can enhance your file management scripts with
creation date tracking.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).