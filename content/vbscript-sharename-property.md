+++
title = "VBScript ShareName Property"
date = 2025-08-29T20:15:13.160+01:00
draft = false
description = "Learn about VBScript ShareName property, including network share detection, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ShareName Property

last modified April 9, 2025

The ShareName property in VBScript is part of the
FileSystemObject. It returns the network share name for a specified
path if the path is on a shared network resource. This property is read-only and
helps identify shared folders in network environments.

ShareName returns an empty string if the path isn't on a network
share. It's useful for scripts that need to verify network resource access. This
tutorial covers ShareName with practical examples to demonstrate its
usage in various scenarios.

## ShareName Property Overview

The ShareName property belongs to the Drive object in
VBScript's FileSystemObject. It retrieves the network share name
associated with a drive or path. The property works only with network shares,
not local paths.

Key features include automatic detection of network share names and empty string
return for non-shared paths. It helps scripts identify whether resources are
local or network-based. Understanding this property aids in creating robust
network-aware scripts.

## Basic ShareName Detection

This example demonstrates the simplest use of ShareName to detect
if a drive is a network share. It shows how to access the property through the
FileSystemObject. The script checks a drive letter for sharing.

basic_sharenamedetection.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("H:")

If drive.ShareName &lt;&gt; "" Then
    WScript.Echo "H: is a network share: " &amp; drive.ShareName
Else
    WScript.Echo "H: is not a network share"
End If

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the H: drive object.
It checks the ShareName property to determine if it's a network
share. The result is displayed accordingly. Empty string means no share exists.

## Checking Multiple Drives

This example shows how to check multiple drives for network shares using
ShareName. It iterates through all available drives and reports
their sharing status. This approach helps inventory network resources.

multiple_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.IsReady Then
        If drive.ShareName &lt;&gt; "" Then
            WScript.Echo drive.DriveLetter &amp; ": is shared as " &amp; drive.ShareName
        End If
    End If
Next

Set drives = Nothing
Set fso = Nothing

The script enumerates all drives and checks each one's ShareName.
Only ready drives are processed to avoid errors. For shared drives, it displays
both the drive letter and share name. Non-shared drives are silently skipped.

## Verifying UNC Path Shares

This example demonstrates using ShareName with UNC paths. It shows
how to first resolve a UNC path to a drive letter before checking the share.
This technique helps when working with mapped network drives.

unc_path_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set wshNetwork = CreateObject("WScript.Network")

For Each drive In fso.Drives
    If drive.IsReady And drive.DriveType = 3 Then ' Network drive
        WScript.Echo "Drive " &amp; drive.DriveLetter &amp; ": maps to " &amp; drive.ShareName
    End If
Next

Set wshNetwork = Nothing
Set fso = Nothing

The script identifies network drives (DriveType = 3) and displays their mapping.
It combines FileSystemObject with WScript.Network for
complete network drive information. This approach reveals both local drive
letters and their UNC share paths.

## ShareName with Folder Paths

This example shows how to use ShareName with specific folder paths.
It demonstrates checking if a particular folder resides on a network share. The
script first gets the drive from the folder path.

folder_path_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "\\server\share\subfolder"

Set folder = fso.GetFolder(folderPath)
Set drive = fso.GetDrive(folder.Drive)

If drive.ShareName &lt;&gt; "" Then
    WScript.Echo "Folder is on share: " &amp; drive.ShareName
Else
    WScript.Echo "Folder is not on a network share"
End If

Set drive = Nothing
Set folder = Nothing
Set fso = Nothing

The script takes a folder path and retrieves its drive information. It then
checks the drive's ShareName property. This method works for both
local paths and UNC paths, providing consistent share detection.

## Error Handling with ShareName

This example demonstrates proper error handling when using ShareName.
It shows how to manage cases where drives might not be ready or accessible.
Robust error handling makes scripts more reliable in production environments.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("Z:")

If Err.Number = 0 Then
    If drive.IsReady Then
        If drive.ShareName &lt;&gt; "" Then
            WScript.Echo "Share name: " &amp; drive.ShareName
        Else
            WScript.Echo "No share name found"
        End If
    Else
        WScript.Echo "Drive is not ready"
    End If
Else
    WScript.Echo "Error accessing drive: " &amp; Err.Description
End If

On Error Goto 0
Set drive = Nothing
Set fso = Nothing

The script includes comprehensive error checking for drive access and readiness.
It uses On Error Resume Next to prevent script termination on
errors. Each potential failure point is checked before attempting to access the
ShareName property.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the ShareName property in VBScript,
covering its usage and practical applications. From basic share detection to
advanced error handling, these examples demonstrate reliable network share
identification. With this knowledge, you can enhance your scripts with robust
network resource detection.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).