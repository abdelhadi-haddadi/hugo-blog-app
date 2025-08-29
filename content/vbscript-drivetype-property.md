+++
title = "VBScript DriveType Property"
date = 2025-08-29T20:15:00.847+01:00
draft = false
description = "Learn about VBScript DriveType property, including drive detection, type checking, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DriveType Property

last modified April 9, 2025

The DriveType property in VBScript is part of the
FileSystemObject. It identifies the type of a drive, such as fixed,
removable, or network. This property returns an integer representing the drive's
type. It's useful for scripts that need to handle different storage devices.

DriveType helps determine available storage options and their
characteristics. It enables conditional logic based on drive capabilities. This
tutorial covers DriveType with practical examples to demonstrate its
usage in various scenarios.

## DriveType Property Overview

The DriveType property returns an integer from 0 to 6 indicating
the drive type. Each number corresponds to a specific drive category. The
property is accessed through a Drive object in VBScript scripting.

Common values include 1 for removable, 2 for fixed, and 3 for network drives.
Unknown drives return 0, while CD-ROM drives return 4. RAM disks return 5, and
removable media drives return 6. Understanding these values helps create robust
drive handling scripts.

## Checking Drive Type Basics

This example demonstrates the simplest use of DriveType to check a
drive's type. It shows how to access the property and interpret its value. The
script identifies whether a drive is fixed or removable.

basic_drivetype.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
driveType = drive.DriveType

Select Case driveType
    Case 1: WScript.Echo "Removable drive"
    Case 2: WScript.Echo "Fixed drive"
    Case 3: WScript.Echo "Network drive"
    Case Else: WScript.Echo "Other drive type"
End Select

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive. It
reads the DriveType property and uses a Select Case statement to
interpret the value. For most systems, C: will return 2 (Fixed drive).

## Listing All Drive Types

This example enumerates all available drives and displays their types. It shows
how to iterate through the Drives collection. Each drive's type is checked and
displayed with its letter.

list_drivetypes.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    Select Case drive.DriveType
        Case 0: typeName = "Unknown"
        Case 1: typeName = "Removable"
        Case 2: typeName = "Fixed"
        Case 3: typeName = "Network"
        Case 4: typeName = "CD-ROM"
        Case 5: typeName = "RAM Disk"
        Case 6: typeName = "Removable Media"
    End Select
    
    WScript.Echo drive.DriveLetter &amp; ": " &amp; typeName
Next

Set drives = Nothing
Set fso = Nothing

The script creates a FileSystemObject and accesses its Drives
collection. It loops through each drive, checks its type, and displays the
letter with a descriptive name. This provides a complete overview of all
connected storage devices.

## Checking for CD-ROM Drive

This example specifically checks for CD-ROM drives in the system. It
demonstrates how to use DriveType to find optical drives. The
script identifies any drives with type 4 (CD-ROM).

check_cdrom.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives
found = False

For Each drive In drives
    If drive.DriveType = 4 Then
        WScript.Echo "CD-ROM drive found: " &amp; drive.DriveLetter &amp; ":"
        found = True
    End If
Next

If Not found Then WScript.Echo "No CD-ROM drives found"

Set drives = Nothing
Set fso = Nothing

The script scans all drives looking for type 4 (CD-ROM). If found, it displays
the drive letter. If no optical drives are detected, it informs the user. This
technique is useful for scripts that need to interact with CD/DVD media.

## Network Drive Detection

This example shows how to identify network drives using DriveType.
It checks for drives with type 3 (Network). The script can help manage network
resources or verify mapped drives.

network_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives
count = 0

For Each drive In drives
    If drive.DriveType = 3 Then
        WScript.Echo "Network drive: " &amp; drive.DriveLetter &amp; ":"
        count = count + 1
    End If
Next

WScript.Echo "Found " &amp; count &amp; " network drive(s)"

Set drives = Nothing
Set fso = Nothing

The script counts and lists all network drives on the system. It uses the type
value 3 to identify network connections. This approach helps in scripts that
need to verify network resource availability before operations.

## Removable Drive Check

This example demonstrates checking for removable drives (USB, flash drives). It
looks for drives with type 1 (Removable) or 6 (Removable Media). The script
provides feedback about detected removable storage.

removable_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives
count = 0

For Each drive In drives
    If drive.DriveType = 1 Or drive.DriveType = 6 Then
        WScript.Echo "Removable drive: " &amp; drive.DriveLetter &amp; ":"
        count = count + 1
    End If
Next

If count = 0 Then
    WScript.Echo "No removable drives found"
Else
    WScript.Echo "Found " &amp; count &amp; " removable drive(s)"
End If

Set drives = Nothing
Set fso = Nothing

The script identifies both standard removable drives (type 1) and removable
media drives (type 6). It provides a count of detected devices. This is useful
for scripts that need to interact with USB storage or similar devices.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the DriveType property in
VBScript, covering its usage and practical applications. From basic type checks
to specific drive detection, these examples demonstrate reliable drive
identification. With this knowledge, you can enhance your scripts with robust
drive handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).