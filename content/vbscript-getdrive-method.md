+++
title = "VBScript GetDrive Method"
date = 2025-08-29T20:15:04.163+01:00
draft = false
description = "Learn about VBScript GetDrive method, including drive information, properties, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetDrive Method

last modified April 9, 2025

The GetDrive method in VBScript is part of the
FileSystemObject. It returns a Drive object corresponding to a
specified drive. This method allows access to drive properties like free space,
total size, and drive type. It's essential for scripts that need to interact
with storage devices.

GetDrive can work with drive letters, UNC paths, or mapped network
drives. It provides detailed information about storage media. This tutorial
covers GetDrive with practical examples to demonstrate its usage.

## GetDrive Method Overview

The GetDrive method takes one parameter: a drive specification. It
returns a Drive object with properties and methods. The drive specification can
be a letter, path, or network share. This method is available through the
FileSystemObject.

Key features include access to drive capacity, file system type, and volume
information. It works with local and network drives. Understanding this method
helps create robust storage management scripts. The method raises an error if
the drive doesn't exist.

## Basic Drive Information

This example demonstrates the simplest use of GetDrive to retrieve
basic information about a drive. It shows how to access common drive properties.
The script displays the drive letter, type, and file system.

basic_getdrive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

WScript.Echo "Drive Letter: " &amp; drive.DriveLetter
WScript.Echo "Drive Type: " &amp; drive.DriveType
WScript.Echo "File System: " &amp; drive.FileSystem

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and calls
GetDrive for the C: drive. It then displays three key properties.
DriveType returns a number representing the drive type (2 for fixed drive).
FileSystem shows the format (NTFS, FAT32, etc.).

## Checking Drive Free Space

This example shows how to check available space on a drive using
GetDrive. It demonstrates accessing capacity-related properties.
The script calculates free space in gigabytes for better readability.

drive_space.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

totalGB = drive.TotalSize / (1024^3)
freeGB = drive.FreeSpace / (1024^3)

WScript.Echo "Total Size: " &amp; FormatNumber(totalGB, 2) &amp; " GB"
WScript.Echo "Free Space: " &amp; FormatNumber(freeGB, 2) &amp; " GB"

Set drive = Nothing
Set fso = Nothing

The script retrieves the C: drive and calculates its total and free space. The
values are converted from bytes to gigabytes for readability.
FormatNumber displays the results with two decimal places. This is
useful for disk monitoring scripts.

## Working with Network Drives

GetDrive can access information about mapped network drives. This
example shows how to retrieve properties from a network share. The script checks
if a network drive is ready before accessing its properties.

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("Z:")

If drive.IsReady Then
    WScript.Echo "Share Name: " &amp; drive.ShareName
    WScript.Echo "Volume Name: " &amp; drive.VolumeName
Else
    WScript.Echo "Drive Z: is not ready"
End If

Set drive = Nothing
Set fso = Nothing

The script attempts to access a mapped network drive (Z:). It first checks the
IsReady property to avoid errors. If ready, it displays the share
and volume names. This approach is essential for reliable network drive access.

## Listing All Available Drives

This example demonstrates how to list all available drives on a system. It
combines GetDrive with the Drives collection. The
script shows each drive's letter and type in a readable format.

list_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    WScript.Echo "Drive: " &amp; drive.DriveLetter &amp; " - Type: " &amp; GetDriveTypeName(drive.DriveType)
Next

Function GetDriveTypeName(typeNum)
    Select Case typeNum
        Case 0: GetDriveTypeName = "Unknown"
        Case 1: GetDriveTypeName = "Removable"
        Case 2: GetDriveTypeName = "Fixed"
        Case 3: GetDriveTypeName = "Network"
        Case 4: GetDriveTypeName = "CD-ROM"
        Case 5: GetDriveTypeName = "RAM Disk"
        Case Else: GetDriveTypeName = "Unknown"
    End Select
End Function

Set drives = Nothing
Set fso = Nothing

The script enumerates all drives using the Drives collection. For
each drive, it displays the letter and a human-readable type. The helper
function GetDriveTypeName converts numeric types to strings. This
provides a comprehensive view of all storage devices.

## Checking Drive Readiness and Type

This example shows advanced usage of GetDrive to check drive status.
It demonstrates handling different drive types and readiness states. The script
provides detailed information about each drive's availability.

drive_status.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    WScript.Echo "Drive " &amp; drive.DriveLetter &amp; ":"
    WScript.Echo "  Type: " &amp; GetDriveTypeName(drive.DriveType)
    
    If drive.IsReady Then
        WScript.Echo "  Status: Ready"
        WScript.Echo "  File System: " &amp; drive.FileSystem
        WScript.Echo "  Free Space: " &amp; FormatNumber(drive.FreeSpace / (1024^2), 2) &amp; " MB"
    Else
        WScript.Echo "  Status: Not Ready"
    End If
Next

' Same GetDriveTypeName function as previous example

Set drives = Nothing
Set fso = Nothing

The script checks each drive's readiness before attempting to access properties.
For ready drives, it shows detailed information including free space in
megabytes. This approach prevents errors when accessing unavailable drives. It's
particularly useful for scripts dealing with removable media.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetDrive method in VBScript,
covering its usage and practical applications. From basic drive information to
advanced status checking, these examples demonstrate comprehensive drive
management. With this knowledge, you can enhance your scripts with robust drive
handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).