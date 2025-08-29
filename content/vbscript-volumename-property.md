+++
title = "VBScript VolumeName Property"
date = 2025-08-29T20:15:16.483+01:00
draft = false
description = "Learn about VBScript VolumeName property, including drive identification, volume operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript VolumeName Property

last modified April 9, 2025

The VolumeName property in VBScript is part of the
FileSystemObject drive object. It gets or sets the name of a disk
volume or drive. This property allows scripts to identify and label storage
devices. It's commonly used in system administration and file management tasks.

VolumeName works with physical drives, network drives, and mapped
drives. The property can be both read and modified when proper permissions
exist. This tutorial covers VolumeName with practical examples to
demonstrate its usage.

## VolumeName Property Overview

The VolumeName property represents the label assigned to a storage
volume. It returns a string containing the current volume name. When set, it
changes the volume label of the specified drive. The property is accessed
through the Drive object in VBScript.

Key features include read/write capability and support for all drive types. The
property doesn't verify if the new name follows system naming rules.
VolumeName is empty for drives without labels. Understanding this
property helps create drive management scripts.

## Retrieving a Drive's Volume Name

This example demonstrates how to retrieve the volume name of a specific drive.
It shows basic usage of the VolumeName property for reading. The
script accesses the C: drive's volume label and displays it.

get_volume_name.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

volumeName = drive.VolumeName
WScript.Echo "Volume name of C: drive is: " &amp; volumeName

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive
object. It then retrieves the VolumeName property. The volume name
is displayed using WScript.Echo. This is the simplest way to read
a drive's label.

## Checking for Empty Volume Names

This example shows how to handle drives without volume names. It demonstrates
checking if the VolumeName property is empty. The script tests the
D: drive and provides appropriate feedback.

check_empty_volume.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("D:")

If drive.VolumeName = "" Then
    WScript.Echo "D: drive has no volume name"
Else
    WScript.Echo "D: drive volume name: " &amp; drive.VolumeName
End If

Set drive = Nothing
Set fso = Nothing

The script checks if VolumeName is an empty string. This indicates
the drive has no label assigned. The conditional statement provides different
output based on whether a volume name exists. This approach prevents displaying
blank names.

## Changing a Drive's Volume Name

This example demonstrates setting a new volume name for a drive. It shows the
write capability of the VolumeName property. The script changes
the E: drive's label to "BACKUP".

set_volume_name.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("E:")

WScript.Echo "Current volume name: " &amp; drive.VolumeName
drive.VolumeName = "BACKUP"
WScript.Echo "New volume name: " &amp; drive.VolumeName

Set drive = Nothing
Set fso = Nothing

The script first displays the current volume name. It then assigns a new value to
the VolumeName property. The change is verified by displaying the
updated name. Note that administrative privileges may be required for this
operation.

## Listing All Drives with Volume Names

This example shows how to iterate through all available drives and display their
volume names. It demonstrates working with the Drives collection.
Each drive's letter and volume name are shown.

list_all_volumes.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.IsReady Then
        name = drive.VolumeName
        If name = "" Then name = "[No Name]"
        WScript.Echo drive.DriveLetter &amp; ": " &amp; name
    End If
Next

Set drives = Nothing
Set fso = Nothing

The script accesses the Drives collection and loops through each
drive. It checks if the drive is ready before accessing properties. Empty volume
names are replaced with "[No Name]" for better readability. This provides a
complete overview of all drives and their labels.

## Validating Volume Name Changes

This example demonstrates error handling when changing volume names. It shows how
to validate the new name and handle potential errors. The script attempts to
change the F: drive's label with proper checks.

validate_volume_change.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
On Error Resume Next

Set drive = fso.GetDrive("F:")
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error accessing F: drive"
    WScript.Quit 1
End If

newName = "DATA2024"
drive.VolumeName = newName

If Err.Number = 0 Then
    WScript.Echo "Volume name changed successfully"
Else
    WScript.Echo "Error changing volume name: " &amp; Err.Description
End If

Set drive = Nothing
Set fso = Nothing

The script includes error handling for drive access and name changes. It uses
On Error Resume Next to prevent script termination on errors. The
result of the operation is verified through the Err object. This
approach makes the script more robust for production use.

## Source

[Drive Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2x9w8a9a(v=vs.84))

In this article, we have explored the VolumeName property in
VBScript, covering its usage and practical applications. From reading drive
labels to modifying them, these examples demonstrate comprehensive volume
management. With this knowledge, you can enhance your system administration
scripts with drive identification capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).