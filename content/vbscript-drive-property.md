+++
title = "VBScript Drive Property"
date = 2025-08-29T20:14:59.715+01:00
draft = false
description = "Learn about VBScript Drive Property, including drive information, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Drive Property

last modified April 9, 2025

The Drive property in VBScript is part of the
FileSystemObject. It returns a Drive object corresponding to the
drive in a specified path. This property provides access to drive information
like available space, drive type, and file system. It's essential for scripts
that need to manage storage devices.

The Drive property helps retrieve detailed information about
storage devices. It works with various drive types including hard disks, CD-ROMs,
and network drives. This tutorial covers the Drive property with
practical examples to demonstrate its usage.

## Drive Property Overview

The Drive property is accessed through the
FileSystemObject. It takes a path string and returns a Drive
object. The Drive object contains properties like TotalSize, FreeSpace, and
DriveType. This property is read-only and doesn't modify the drive.

Key features include retrieving drive information without direct file operations.
It supports all drive types recognized by the operating system. The property
raises an error if the specified drive doesn't exist. Understanding this
property helps create robust storage management scripts.

## Basic Drive Information

This example demonstrates retrieving basic information about a drive. It shows
how to access the Drive object and display its properties. The script gets the
drive letter, volume name, and file system type.

basic_drive_info.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

WScript.Echo "Drive Letter: " &amp; drive.DriveLetter
WScript.Echo "Volume Name: " &amp; drive.VolumeName
WScript.Echo "File System: " &amp; drive.FileSystem

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive. It
then displays basic drive properties. The DriveLetter property
returns the drive letter. VolumeName shows the drive's label.

## Checking Drive Space

This example shows how to check a drive's total and free space. It demonstrates
using the Drive object's size-related properties. The script calculates used
space and displays all space information in GB.

drive_space.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

totalGB = drive.TotalSize / (1024^3)
freeGB = drive.FreeSpace / (1024^3)
usedGB = totalGB - freeGB

WScript.Echo "Total Space: " &amp; FormatNumber(totalGB, 2) &amp; " GB"
WScript.Echo "Free Space: " &amp; FormatNumber(freeGB, 2) &amp; " GB"
WScript.Echo "Used Space: " &amp; FormatNumber(usedGB, 2) &amp; " GB"

Set drive = Nothing
Set fso = Nothing

The script calculates drive space in gigabytes by dividing bytes by 1024^3. It
shows total capacity, free space, and calculated used space. The
FormatNumber function formats the output to two decimal places.

## Determining Drive Type

This example demonstrates identifying a drive's type using the Drive object. It
shows how to interpret the DriveType property value. The script
checks if a drive is fixed, removable, or a network drive.

drive_type.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("D:")

Select Case drive.DriveType
    Case 0: typeDesc = "Unknown"
    Case 1: typeDesc = "Removable"
    Case 2: typeDesc = "Fixed"
    Case 3: typeDesc = "Network"
    Case 4: typeDesc = "CD-ROM"
    Case 5: typeDesc = "RAM Disk"
    Case Else: typeDesc = "Undefined"
End Select

WScript.Echo "Drive Type: " &amp; typeDesc

Set drive = Nothing
Set fso = Nothing

The script uses a Select Case statement to match drive type codes
with descriptions. Each numeric value corresponds to a specific drive type. This
helps identify whether a drive is a hard disk, USB stick, or other media type.

## Checking Drive Availability

This example shows how to check if a drive is ready for access. It demonstrates
using the IsReady property to avoid errors. The script safely
checks drive status before attempting to read properties.

drive_ready.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("E:")

If drive.IsReady Then
    WScript.Echo "Drive is ready"
    WScript.Echo "Free space: " &amp; drive.FreeSpace &amp; " bytes"
Else
    WScript.Echo "Drive is not ready (might be empty CD/DVD drive)"
End If

Set drive = Nothing
Set fso = Nothing

The script checks the IsReady property before accessing drive
information. This prevents errors when querying drives like empty CD-ROMs. The
property returns False for unavailable drives and True for accessible ones.

## Listing All Drives

This example demonstrates enumerating all available drives on a system. It shows
how to use the Drives collection with the Drive property. The
script displays information about each detected drive.

list_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    WScript.Echo "Drive: " &amp; drive.DriveLetter
    If drive.IsReady Then
        WScript.Echo "  Type: " &amp; drive.DriveType
        WScript.Echo "  File System: " &amp; drive.FileSystem
        WScript.Echo "  Total Size: " &amp; drive.TotalSize &amp; " bytes"
    Else
        WScript.Echo "  Drive not ready"
    End If
Next

Set drives = Nothing
Set fso = Nothing

The script loops through the Drives collection to access each
drive. For each drive, it displays the letter and checks if it's ready. Ready
drives show additional details while unavailable drives show a simple status.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Drive property in VBScript,
covering its usage and practical applications. From basic drive information to
system-wide drive enumeration, these examples demonstrate comprehensive drive
management. With this knowledge, you can enhance your scripts with robust drive
handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).