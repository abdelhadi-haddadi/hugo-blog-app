+++
title = "VBScript DriveExists Method"
date = 2025-08-29T20:14:59.697+01:00
draft = false
description = "Learn about VBScript DriveExists method, including drive checking, file system operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DriveExists Method

last modified April 9, 2025

The DriveExists method in VBScript is part of the
FileSystemObject. It checks whether a specified drive exists on the
system. This method returns True if the drive exists and False otherwise. It's
commonly used before performing drive operations to avoid errors.

DriveExists accepts drive letters or UNC paths as input. It helps
create robust scripts that handle various system configurations. This tutorial
covers DriveExists with practical examples to demonstrate its usage.

## DriveExists Method Overview

The DriveExists method takes one parameter: a drive specification.
It returns a Boolean value indicating drive existence. The method is available
through the FileSystemObject in VBScript scripting.

Key features include support for local and network drives. It works with both
lettered drives (C:) and UNC paths (\\server\share). DriveExists
doesn't verify drive readiness or accessibility. Understanding this method helps
create reliable drive handling scripts.

## Checking Local Drive Existence

This example demonstrates checking if a local drive exists. It shows basic usage
of DriveExists with a drive letter. The script checks drive C: and
displays the result.

check_local_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
If fso.DriveExists("C:") Then
    WScript.Echo "Drive C: exists"
Else
    WScript.Echo "Drive C: does not exist"
End If

Set fso = Nothing

The script creates a FileSystemObject and calls
DriveExists for drive C:. It displays whether the drive exists.
This basic check is useful before performing file operations on a drive.

## Checking Network Drive Existence

This example shows how to check for a network drive using a UNC path. It
demonstrates DriveExists with network shares. The script verifies
if a specific network path is available.

check_network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
networkPath = "\\server\share"

If fso.DriveExists(networkPath) Then
    WScript.Echo "Network drive exists: " &amp; networkPath
Else
    WScript.Echo "Network drive not found: " &amp; networkPath
End If

Set fso = Nothing

The script checks if the network path "\\server\share" exists. Note that this
only verifies path availability, not authentication. Network drives must be
properly mapped or accessible for this check to succeed.

## Checking Multiple Drives

This example demonstrates checking multiple drives in sequence. It shows how to
use DriveExists in a loop. The script checks drives A: through Z:
and reports existing ones.

check_multiple_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
WScript.Echo "Existing drives on this system:"

For i = 65 To 90 ' ASCII codes for A-Z
    driveLetter = Chr(i) &amp; ":"
    If fso.DriveExists(driveLetter) Then
        WScript.Echo " - " &amp; driveLetter
    End If
Next

Set fso = Nothing

The script iterates through all possible drive letters. For each existing drive,
it displays the drive letter. This approach is useful for inventorying available
drives on a system.

## Validating Drive Before Operation

This example shows practical usage of DriveExists before performing
file operations. It demonstrates defensive programming by checking drive
existence first. The script attempts to create a file only if the drive exists.

validate_drive_before_operation.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
targetDrive = "D:"
filePath = targetDrive &amp; "\testfile.txt"

If fso.DriveExists(targetDrive) Then
    Set file = fso.CreateTextFile(filePath)
    file.WriteLine "Test content"
    file.Close
    WScript.Echo "File created successfully"
Else
    WScript.Echo "Drive " &amp; targetDrive &amp; " not available"
End If

Set fso = Nothing

The script checks if drive D: exists before attempting to create a file. This
prevents errors when working with potentially unavailable drives. Such checks
make scripts more robust in varied environments.

## Checking Drive with Different Formats

This example explores how DriveExists handles different drive
specification formats. It tests various ways to specify the same drive. The
results show the method's flexibility with input formats.

drive_format_test.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

WScript.Echo "Checking drive C: with different formats:"
WScript.Echo "C:    -&gt; " &amp; fso.DriveExists("C:")
WScript.Echo "C:\   -&gt; " &amp; fso.DriveExists("C:\")
WScript.Echo "C     -&gt; " &amp; fso.DriveExists("C")
WScript.Echo "c:    -&gt; " &amp; fso.DriveExists("c:")

Set fso = Nothing

The script tests four different ways to specify drive C:. DriveExists
handles all these formats consistently. Note that the method is case-insensitive
for drive letters. This flexibility makes the method easier to use in scripts.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the DriveExists method in VBScript,
covering its usage and practical applications. From simple checks to defensive
programming patterns, these examples demonstrate reliable drive verification.
With this knowledge, you can enhance your scripts with robust drive handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).