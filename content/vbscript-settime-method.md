+++
title = "VBScript SetTime Method"
date = 2025-08-29T20:15:29.897+01:00
draft = false
description = "Learn about VBScript SetTime method, including file time modifications, date operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetTime Method

last modified April 9, 2025

The SetTime method in VBScript is part of the
FileSystemObject functionality. It allows modification of file or
folder timestamps including creation, modification, and last access times. This
method is useful for file management and synchronization tasks.

SetTime provides precise control over file system timestamps. It
can set all three timestamps simultaneously or individually. This tutorial
covers SetTime with practical examples to demonstrate its usage.
Understanding this method enhances file management capabilities in VBScript.

## SetTime Method Overview

The SetTime method modifies timestamps for files or folders. It
accepts parameters for creation, modification, and access times. All parameters
are optional, allowing selective timestamp updates. The method is available
through the File and Folder objects in VBScript.

Key features include the ability to set dates in the past or future. The method
uses standard date formats compatible with VBScript. SetTime is
particularly useful for backup systems and file synchronization scripts.
Understanding its parameters is essential for effective usage.

## Basic File Timestamp Update

This example demonstrates the simplest use of SetTime to update all
timestamps of a file. It shows how to set creation, modification, and access
times to the current date and time. The example uses a sample text file.

basic_settime.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\sample.txt")

' Set all timestamps to current date and time
file.SetTime Now, Now, Now

WScript.Echo "All timestamps updated to current time"

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to a
file. The SetTime method is called with Now for all
parameters. This updates all three timestamps to the current system time.
The method doesn't return any value.

## Updating Specific Timestamps

This example shows how to update only specific timestamps while leaving others
unchanged. It demonstrates using Null to skip certain parameters.
The script modifies only the last accessed time of a file.

specific_timestamps.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\data.log")

' Update only last accessed time
newAccessTime = DateAdd("d", -1, Now) ' Yesterday
file.SetTime Null, Null, newAccessTime

WScript.Echo "Last accessed time updated to yesterday"

Set file = Nothing
Set fso = Nothing

The script updates only the last accessed timestamp to yesterday's date. The
first two parameters are Null, indicating they should remain
unchanged. DateAdd is used to calculate yesterday's date.
This selective update is useful for audit trails.

## Setting Future Dates

SetTime can set timestamps in the future, which is useful for
scheduling or documentation purposes. This example sets a file's modification
date to one week in the future. The script demonstrates future date calculation.

future_dates.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\plan.docx")

' Set modification date to one week from now
futureDate = DateAdd("d", 7, Now)
file.SetTime Null, futureDate, Null

WScript.Echo "Modified date set to one week in the future"

Set file = Nothing
Set fso = Nothing

The script calculates a date one week ahead using DateAdd. Only the
modification date is updated, leaving other timestamps unchanged. Future dates
can be useful for project planning or file expiration systems.
The Windows file system fully supports future timestamps.

## Setting Historical Dates

This example demonstrates setting file timestamps to historical dates. It shows
how to create a specific date using DateSerial. The script sets all
timestamps to January 1, 2000 for archival purposes.

historical_dates.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\archive.zip")

' Set all timestamps to January 1, 2000
historicalDate = DateSerial(2000, 1, 1)
file.SetTime historicalDate, historicalDate, historicalDate

WScript.Echo "All timestamps set to January 1, 2000"

Set file = Nothing
Set fso = Nothing

The script uses DateSerial to create a specific historical date.
All three timestamps are set to the same value. This technique is useful for
normalizing dates in archival systems or testing date-sensitive applications.
Historical dates must be valid for the file system.

## Updating Folder Timestamps

SetTime works with folders as well as files. This example shows how
to update directory timestamps. The script modifies a folder's creation date
while leaving other timestamps unchanged.

folder_timestamps.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp\Backups")

' Update only creation time
newCreationDate = DateSerial(2020, 6, 15)
folder.SetTime newCreationDate, Null, Null

WScript.Echo "Folder creation date updated to June 15, 2020"

Set folder = Nothing
Set fso = Nothing

The script gets a reference to a folder instead of a file. Only the creation
date is updated to June 15, 2020. Folder timestamp management is identical to
file timestamp management. This consistency simplifies script development for
file system operations.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the SetTime method in VBScript,
covering its usage and practical applications. From basic timestamp updates to
specific historical or future dates, these examples demonstrate flexible file
time management. With this knowledge, you can enhance your file handling scripts
with precise timestamp control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).