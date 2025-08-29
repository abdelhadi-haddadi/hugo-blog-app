+++
title = "VBScript FileSystem Property"
date = 2025-08-29T20:15:01.955+01:00
draft = false
description = "Learn about VBScript FileSystem property, including file system access, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FileSystem Property

last modified April 9, 2025

The FileSystem property in VBScript is part of the
Drive object within the FileSystemObject. It returns
the type of file system for a specified drive. Common file system types include
FAT, NTFS, and CDFS. This property is useful for determining drive capabilities.

Understanding the file system type helps in script decision-making. Different
file systems support different features and limitations. This tutorial covers
FileSystem with practical examples to demonstrate its usage.

## FileSystem Property Overview

The FileSystem property returns a string indicating the drive's
file system format. It's accessed through a Drive object obtained
from FileSystemObject. The property is read-only and requires an
existing drive path.

Common return values include "FAT", "NTFS", "CDFS" (CD-ROM), and "UDF". The
property helps scripts adapt behavior based on file system capabilities. It's
particularly useful for security and feature checks.

## Basic FileSystem Check

This example demonstrates checking the file system type of the C: drive. It
shows how to access the FileSystem property through the
FileSystemObject. The script displays the file system type.

basic_filesystem.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
WScript.Echo "C: drive uses " &amp; drive.FileSystem &amp; " file system"

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive
object. It then accesses the FileSystem property. Typical output
would be "NTFS" or "FAT32" depending on the system configuration.

## Checking Multiple Drives

This example checks the file system type for all available drives. It
demonstrates iterating through the Drives collection. Each drive's
file system type is displayed.

multiple_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
For Each drive In fso.Drives
    If drive.IsReady Then
        WScript.Echo drive.DriveLetter &amp; ": " &amp; drive.FileSystem
    End If
Next

Set fso = Nothing

The script loops through all available drives using the Drives
collection. It checks if each drive is ready before accessing properties. The
output shows each drive letter with its corresponding file system type.

## Conditional Logic Based on FileSystem

This example demonstrates using the FileSystem property in
conditional logic. It checks if a drive uses NTFS before performing specific
operations. Different actions are taken based on the file system type.

conditional_filesystem.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

If UCase(drive.FileSystem) = "NTFS" Then
    WScript.Echo "NTFS detected: Advanced features available"
Else
    WScript.Echo "Non-NTFS system: Limited functionality"
End If

Set drive = Nothing
Set fso = Nothing

The script checks if the C: drive uses NTFS. The comparison uses
UCase to ensure case-insensitive matching. This pattern is useful
for scripts requiring NTFS-specific features like encryption or compression.

## Network Drive FileSystem Check

This example demonstrates checking the file system type of a network drive. It
shows how the FileSystem property works with mapped network
drives. The script handles potential connection issues.

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
On Error Resume Next

Set drive = fso.GetDrive("Z:")
If Err.Number = 0 And drive.IsReady Then
    WScript.Echo "Network drive uses " &amp; drive.FileSystem
Else
    WScript.Echo "Network drive not available"
End If

On Error GoTo 0
Set drive = Nothing
Set fso = Nothing

The script attempts to access a mapped network drive (Z:). Error handling
prevents script failure if the drive isn't available. If accessible, it displays
the network drive's file system type.

## FileSystem-Based Feature Detection

This example uses the FileSystem property to detect support for
specific features. It checks for NTFS to determine if file compression is
available. The script provides appropriate feedback.

feature_detection.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

Select Case UCase(drive.FileSystem)
    Case "NTFS"
        WScript.Echo "Supports: Compression, Encryption, Large Files"
    Case "FAT32"
        WScript.Echo "Supports: Basic features (4GB file limit)"
    Case "EXFAT"
        WScript.Echo "Supports: Large files, no security features"
    Case Else
        WScript.Echo "Unknown file system features"
End Select

Set drive = Nothing
Set fso = Nothing

The script uses a Select Case structure to evaluate the file
system type. Different messages are displayed based on the detected file system.
This approach helps scripts adapt to different environments.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the FileSystem property in
VBScript, covering its usage and practical applications. From basic checks to
feature detection, these examples demonstrate file system identification. With
this knowledge, you can create more robust scripts that adapt to different
environments.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).