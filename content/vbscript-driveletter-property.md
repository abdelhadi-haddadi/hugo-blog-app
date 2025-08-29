+++
title = "VBScript DriveLetter Property"
date = 2025-08-29T20:14:59.709+01:00
draft = false
description = "Learn about VBScript DriveLetter property, including drive detection, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DriveLetter Property

last modified April 9, 2025

The DriveLetter property in VBScript is part of the
FileSystemObject and Drive objects. It returns the
drive letter of a specified drive. This property is read-only and provides
a simple way to identify drives in scripts. It's commonly used in file system
operations and drive management.

DriveLetter returns a single uppercase character (A-Z) followed by
a colon. For network drives, it returns the mapped drive letter. This tutorial
covers DriveLetter with practical examples to demonstrate its usage
in various scenarios.

## DriveLetter Property Overview

The DriveLetter property is available on Drive objects
returned by the FileSystemObject. It provides the letter assigned
to a physical or logical drive. The property is useful for drive identification
and path construction.

Key features include consistent uppercase letter format and colon suffix. It
works with all drive types (fixed, removable, network). Understanding this
property helps create robust drive handling scripts. The property is read-only
and cannot be modified.

## Basic Drive Letter Retrieval

This example demonstrates the simplest use of DriveLetter to get
the letter of the current drive. It shows how to access the property through
a Drive object. The script displays the drive letter of the
current working directory.

basic_driveletter.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set currentDrive = fso.GetDrive(fso.GetDriveName(fso.GetAbsolutePathName(".")))

WScript.Echo "Current drive letter: " &amp; currentDrive.DriveLetter

Set currentDrive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the current drive.
It then accesses the DriveLetter property. The output shows the
drive letter (e.g., "C:") where the script is running. All objects are properly
cleaned up at the end.

## Listing All Drive Letters

This example shows how to retrieve drive letters for all available drives on
a system. It demonstrates iterating through the Drives collection.
Each drive's letter is displayed along with its drive type.

list_driveletters.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    WScript.Echo "Drive: " &amp; drive.DriveLetter &amp; " - Type: " &amp; drive.DriveType
Next

Set drives = Nothing
Set fso = Nothing

The script enumerates all drives using the Drives collection. For
each drive, it displays the letter and type. The output might show "C: - Type: 2"
for a fixed drive. Network drives appear with their mapped letters.

## Checking Specific Drive Availability

This example uses DriveLetter to check if a specific drive exists.
It demonstrates practical error handling when accessing drives. The script tries
to access drive D: and reports its availability.

check_drive.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("D:")

If Err.Number = 0 Then
    WScript.Echo "Drive " &amp; drive.DriveLetter &amp; " is available"
Else
    WScript.Echo "Drive D: is not available"
    Err.Clear
End If

On Error GoTo 0
Set drive = Nothing
Set fso = Nothing

The script attempts to access drive D: and checks for errors. If successful, it
displays the drive letter. Error handling prevents script termination if the
drive doesn't exist. This pattern is useful for robust drive detection.

## Network Drive Letter Verification

This example demonstrates DriveLetter with network drives. It shows
how mapped network drives appear in the system. The script identifies network
drives among all available drives.

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.DriveType = 3 Then ' Network drive
        WScript.Echo "Network drive found: " &amp; drive.DriveLetter
    End If
Next

Set drives = Nothing
Set fso = Nothing

The script checks each drive's type and reports network drives (type 3). For
each network drive found, it displays the mapped letter. This helps identify
available network resources in scripts. The output might show "Network drive found: Z:".

## Building Paths with Drive Letters

This example combines DriveLetter with path construction. It shows
how to use drive letters to build complete file paths. The script demonstrates
dynamic path creation based on available drives.

build_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

If Not drive Is Nothing Then
    filePath = fso.BuildPath(drive.DriveLetter &amp; "\", "Windows\System32")
    WScript.Echo "System directory: " &amp; filePath
End If

Set drive = Nothing
Set fso = Nothing

The script gets the C: drive and constructs a path to the System32 directory.
It uses DriveLetter to ensure proper path formatting. The output
shows "System directory: C:\Windows\System32". This technique is useful for
dynamic path construction.

## Source

[Drive Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2x9h1e1a(v=vs.84))

In this article, we have explored the DriveLetter property in
VBScript, covering its usage and practical applications. From basic drive
identification to network drive detection, these examples demonstrate reliable
drive management. With this knowledge, you can enhance your scripts with robust
drive handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).