+++
title = "VBScript IsReady Property"
date = 2025-08-29T20:15:07.631+01:00
draft = false
description = "Learn about VBScript IsReady property, including drive status checks, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript IsReady Property

last modified April 9, 2025

The IsReady property in VBScript is part of the
Drive object within the FileSystemObject. It returns
a Boolean value indicating whether a drive is ready for access. This property is
essential for checking drive availability before performing operations.

IsReady helps prevent errors when working with removable drives or
network shares. It checks if the drive is accessible and media is present. This
tutorial covers IsReady with practical examples to demonstrate its
usage in various scenarios.

## IsReady Property Overview

The IsReady property returns True if the specified
drive is ready and False otherwise. It's available through the
Drive object in VBScript scripting. The property is read-only.

Key features include detecting removable media presence and network connection
status. It's particularly useful for CD/DVD drives and USB devices.
IsReady helps create robust scripts that handle drive access errors
gracefully.

## Basic Drive Ready Check

This example demonstrates the simplest use of IsReady to check a
drive's status. It shows how to determine if a drive is accessible before
attempting operations. The script checks the C: drive's readiness.

basic_isready.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

If drive.IsReady Then
    WScript.Echo "Drive C: is ready"
Else
    WScript.Echo "Drive C: is not ready"
End If

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive
object. It then checks the IsReady property. For a fixed drive like
C:, it will typically return True. The script properly cleans up
objects at the end.

## Checking Removable Drive Status

This example shows how to use IsReady with removable drives. It
demonstrates checking a USB drive or CD/DVD drive before access. The script
checks drive D: which is often a removable drive.

removable_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
Set drive = fso.GetDrive("D:")
On Error GoTo 0

If Not drive Is Nothing Then
    If drive.IsReady Then
        WScript.Echo "Drive D: is ready with " &amp; drive.VolumeName
    Else
        WScript.Echo "Drive D: is not ready (no media?)"
    End If
Else
    WScript.Echo "Drive D: does not exist"
End If

Set drive = Nothing
Set fso = Nothing

The script includes error handling as removable drives might not exist. It checks
if the drive object was created successfully. If the drive exists but isn't
ready, it suggests checking for media. This approach prevents runtime errors.

## Network Drive Availability Check

This example demonstrates using IsReady to verify network drive
connectivity. Network drives may become unavailable without warning. The script
checks a mapped network drive (Z: in this case).

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
Set drive = fso.GetDrive("Z:")
On Error GoTo 0

If Not drive Is Nothing Then
    If drive.IsReady Then
        WScript.Echo "Network drive Z: is available"
        WScript.Echo "Free space: " &amp; drive.FreeSpace &amp; " bytes"
    Else
        WScript.Echo "Network drive Z: is not available"
    End If
Else
    WScript.Echo "Drive Z: is not mapped"
End If

Set drive = Nothing
Set fso = Nothing

The script checks both the existence and readiness of the network drive. If
available, it displays additional information like free space. This approach
helps scripts handle network connectivity issues gracefully. Error handling
prevents crashes from unmapped drives.

## Checking All Drives in System

This example shows how to iterate through all drives and check their readiness.
It demonstrates using IsReady in a comprehensive system scan. The
script lists all drives and their status.

all_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

WScript.Echo "Drive Status Report:"
WScript.Echo "-------------------"

For Each drive In drives
    status = IIf(drive.IsReady, "Ready", "Not Ready")
    WScript.Echo drive.DriveLetter &amp; ": " &amp; status
    
    If drive.IsReady Then
        WScript.Echo "   Type: " &amp; drive.DriveType
        WScript.Echo "   File system: " &amp; drive.FileSystem
    End If
Next

Set drives = Nothing
Set fso = Nothing

Function IIf(expr, trueVal, falseVal)
    If expr Then
        IIf = trueVal
    Else
        IIf = falseVal
    End If
End Function

The script enumerates all drives using the Drives collection. For
each drive, it checks IsReady and displays the status. For ready
drives, it shows additional information. The custom IIf function
simplifies conditional output.

## Handling CD/DVD Drive Status

This example focuses specifically on CD/DVD drive status checks. It demonstrates
how IsReady can detect media presence in optical drives. The script
checks drive E: (common for optical drives).

cd_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
Set drive = fso.GetDrive("E:")
On Error GoTo 0

If Not drive Is Nothing Then
    If drive.DriveType = 4 Then ' CD-ROM drive
        If drive.IsReady Then
            WScript.Echo "CD/DVD drive E: has media"
            WScript.Echo "Volume name: " &amp; drive.VolumeName
        Else
            WScript.Echo "CD/DVD drive E: is empty"
        End If
    Else
        WScript.Echo "Drive E: is not a CD/DVD drive"
    End If
Else
    WScript.Echo "Drive E: does not exist"
End If

Set drive = Nothing
Set fso = Nothing

The script first verifies the drive exists and is an optical drive (type 4). It
then checks IsReady to determine media presence. This approach is
essential for CD/DVD burning or reading scripts. The script provides detailed
feedback about the drive status.

## Source

[Drive Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2x9w8a5a(v=vs.84))

In this article, we have explored the IsReady property in VBScript,
covering its usage and practical applications. From basic drive checks to
network and removable media verification, these examples demonstrate robust
drive status checking. With this knowledge, you can create more reliable scripts
that handle drive access properly.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).