+++
title = "VBScript FreeSpace Property"
date = 2025-08-29T20:15:03.045+01:00
draft = false
description = "Learn about VBScript FreeSpace property, including disk space checking, drive information, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FreeSpace Property

last modified April 9, 2025

The FreeSpace property in VBScript is part of the
Drive object within the FileSystemObject. It returns
the amount of free space available on a drive in bytes. This property is
essential for disk management and monitoring scripts. It helps prevent storage
issues by checking available space.

FreeSpace provides the same value as the AvailableSpace
property in most cases. It's read-only and requires a valid drive specification.
This tutorial covers FreeSpace with practical examples to
demonstrate its usage.

## FreeSpace Property Overview

The FreeSpace property belongs to the Drive object.
It returns the available storage space in bytes for the specified drive. The
property is accessed through the FileSystemObject in VBScript.

Key features include byte-level precision and compatibility with all drive
types. It works with local and network drives when accessible. Understanding
this property helps create effective disk management scripts. The value
represents actual available space for user data.

## Basic FreeSpace Check

This example demonstrates the simplest use of FreeSpace to check
available space on the C: drive. It shows how to access the property and display
the raw byte value. The script provides fundamental drive space information.

basic_freespace.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

WScript.Echo "Free space on C: drive: " &amp; drive.FreeSpace &amp; " bytes"

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive
reference. It then outputs the free space in bytes. The value represents all
available space on the drive. Remember to release objects when done.

## Converting Bytes to Readable Format

This example enhances the basic check by converting bytes to a more readable
format. It demonstrates calculating megabytes and gigabytes from the raw byte
value. The output becomes more user-friendly and understandable.

readable_freespace.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

freeMB = drive.FreeSpace / (1024 * 1024)
freeGB = drive.FreeSpace / (1024 * 1024 * 1024)

WScript.Echo "Free space: " &amp; FormatNumber(freeMB, 2) &amp; " MB"
WScript.Echo "Free space: " &amp; FormatNumber(freeGB, 2) &amp; " GB"

Set drive = Nothing
Set fso = Nothing

The script calculates megabytes and gigabytes from the raw byte value. It uses
FormatNumber to display two decimal places. This approach makes
disk space information more accessible. The conversion helps users understand
available space better.

## Checking Multiple Drives

This example shows how to check free space on all available drives. It
demonstrates iterating through the Drives collection. Each drive's
status and free space are displayed if ready.

multiple_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

For Each drive In fso.Drives
    If drive.IsReady Then
        freeGB = drive.FreeSpace / (1024 * 1024 * 1024)
        WScript.Echo drive.DriveLetter &amp; ": " &amp; FormatNumber(freeGB, 2) &amp; " GB free"
    Else
        WScript.Echo drive.DriveLetter &amp; ": Not ready"
    End If
Next

Set fso = Nothing

The script loops through all drives in the system. It checks each drive's
readiness before accessing FreeSpace. Ready drives show available
space in gigabytes. Unavailable drives display a "Not ready" message. This
approach handles all drive types safely.

## Low Disk Space Warning

This practical example creates a low disk space warning system. It checks if
free space falls below a specified threshold. The script demonstrates using
FreeSpace for proactive disk management.

low_space_warning.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

warningThresholdGB = 5 ' 5 GB threshold
freeGB = drive.FreeSpace / (1024 * 1024 * 1024)

If freeGB &lt; warningThresholdGB Then
    WScript.Echo "WARNING: Low disk space on C: drive!"
    WScript.Echo "Only " &amp; FormatNumber(freeGB, 2) &amp; " GB remaining"
Else
    WScript.Echo "Disk space OK: " &amp; FormatNumber(freeGB, 2) &amp; " GB free"
End If

Set drive = Nothing
Set fso = Nothing

The script defines a 5GB warning threshold for the C: drive. It compares
available space against this threshold. A warning message appears if space is
low. Otherwise, it confirms adequate space. This pattern is useful for
automated monitoring scripts.

## Network Drive Free Space Check

This example demonstrates checking free space on a network drive. It shows
FreeSpace working with mapped network locations. The script handles
potential accessibility issues gracefully.

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

networkPath = "Z:" ' Replace with your network drive letter
On Error Resume Next

Set drive = fso.GetDrive(networkPath)

If Err.Number = 0 And drive.IsReady Then
    freeGB = drive.FreeSpace / (1024 * 1024 * 1024)
    WScript.Echo networkPath &amp; " free space: " &amp; FormatNumber(freeGB, 2) &amp; " GB"
Else
    WScript.Echo "Cannot access drive " &amp; networkPath
End If

On Error GoTo 0
Set drive = Nothing
Set fso = Nothing

The script attempts to access a network drive (Z: in this case). Error handling
prevents crashes if the drive is unavailable. If accessible, it displays free
space in gigabytes. The approach works for any valid mapped network location.
Always include proper error handling for network resources.

## Source

[Drive Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2z9ffy99(v=vs.84))

In this article, we have explored the FreeSpace property in VBScript,
covering its usage and practical applications. From basic checks to network drive
monitoring, these examples demonstrate effective disk space management. With this
knowledge, you can create robust scripts for storage monitoring and maintenance.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).