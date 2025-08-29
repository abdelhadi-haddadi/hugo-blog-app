+++
title = "VBScript Drives Property"
date = 2025-08-29T20:15:00.851+01:00
draft = false
description = "Learn about VBScript Drives property, including drive enumeration, drive information retrieval, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Drives Property

last modified April 9, 2025

The Drives property in VBScript is part of the
FileSystemObject. It returns a collection of all available drives
on a computer. This includes hard disks, CD-ROM drives, RAM disks, and network
drives. The property provides access to detailed information about each drive.

Drives enables enumeration and inspection of all system drives. It
helps in scripts that need to check drive availability or properties. This
tutorial covers Drives with practical examples to demonstrate its
usage in various scenarios.

## Drives Property Overview

The Drives property returns a Drives collection
object. Each item in the collection is a Drive object representing
a physical or logical drive. The collection is read-only and automatically
updated when drives are added or removed.

Key features include access to drive type, free space, and volume information.
The property works with all drive types recognized by the operating system.
Understanding this property helps create robust drive management scripts.

## Listing All Available Drives

This example demonstrates how to enumerate all available drives on a system. It
shows basic usage of the Drives property to iterate through the
collection. Each drive's letter is displayed in the output.

list_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    WScript.Echo "Drive: " &amp; drive.DriveLetter
Next

Set fso = Nothing

The script creates a FileSystemObject and accesses its
Drives property. It then loops through each drive in the
collection. The DriveLetter property of each drive is displayed.
This provides a simple list of all available drives.

## Checking Drive Types

This example shows how to determine the type of each drive in the system. The
DriveType property returns a numeric value indicating the drive
type. The script translates these values into human-readable descriptions.

drive_types.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    Select Case drive.DriveType
        Case 0: typeDesc = "Unknown"
        Case 1: typeDesc = "Removable"
        Case 2: typeDesc = "Fixed"
        Case 3: typeDesc = "Network"
        Case 4: typeDesc = "CD-ROM"
        Case 5: typeDesc = "RAM Disk"
    End Select
    
    WScript.Echo drive.DriveLetter &amp; ": " &amp; typeDesc
Next

Set fso = Nothing

The script enumerates all drives and checks each one's DriveType.
A Select Case statement converts the numeric type to a descriptive
string. This helps identify whether a drive is fixed, removable, or network-based.

## Checking Drive Free Space

This example demonstrates how to check the available free space on drives. It
uses the FreeSpace property which returns the number of available
bytes. The script converts this to a more readable format in gigabytes.

free_space.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.IsReady Then
        freeGB = Round(drive.FreeSpace / (1024^3), 2)
        WScript.Echo drive.DriveLetter &amp; ": " &amp; freeGB &amp; " GB free"
    Else
        WScript.Echo drive.DriveLetter &amp; ": Drive not ready"
    End If
Next

Set fso = Nothing

The script checks each drive's readiness before accessing space information. For
ready drives, it calculates free space in gigabytes. The IsReady
check prevents errors with unavailable drives like empty CD-ROM drives. Results
are displayed with two decimal places for clarity.

## Getting Volume Information

This example retrieves volume name and file system information for each drive.
It demonstrates the VolumeName and FileSystem
properties. These properties provide additional details about formatted drives.

volume_info.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.IsReady Then
        info = drive.DriveLetter &amp; ": " &amp; drive.VolumeName
        info = info &amp; " (" &amp; drive.FileSystem &amp; ")"
        WScript.Echo info
    End If
Next

Set fso = Nothing

The script checks drive readiness before accessing volume properties. For each
ready drive, it combines the letter, volume name, and file system type. This
creates an informative string like "C: System (NTFS)". Unready drives are
skipped to avoid errors.

## Checking Total Drive Size

This example shows how to get the total size of each drive using the
TotalSize property. Like free space, the value is in bytes and is
converted to gigabytes for better readability. Both total and free space are
displayed.

drive_size.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.IsReady Then
        totalGB = Round(drive.TotalSize / (1024^3), 2)
        freeGB = Round(drive.FreeSpace / (1024^3), 2)
        usedGB = totalGB - freeGB
        
        WScript.Echo drive.DriveLetter &amp; ": " &amp; usedGB &amp; " GB used of " &amp; totalGB &amp; " GB"
    End If
Next

Set fso = Nothing

The script calculates both total and used space for each ready drive. Used space
is derived by subtracting free space from total space. All values are converted
to gigabytes with two decimal places. This provides a comprehensive view of
drive capacity and usage.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Drives property in VBScript,
covering its usage and practical applications. From simple enumeration to
detailed drive information retrieval, these examples demonstrate comprehensive
drive management. With this knowledge, you can enhance your scripts with robust
drive inspection capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).