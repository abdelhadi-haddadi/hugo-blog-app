+++
title = "VBScript GetDriveName Method"
date = 2025-08-29T20:15:04.150+01:00
draft = false
description = "Learn about VBScript GetDriveName method, including drive extraction, path analysis, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetDriveName Method

last modified April 9, 2025

The GetDriveName method in VBScript is part of the
FileSystemObject. It extracts the drive name from a specified path
string. This method returns only the drive portion of a complete path. It's
commonly used in file operations and path analysis.

GetDriveName helps identify the storage device referenced by a path.
It works with both local and network drive paths. This tutorial covers
GetDriveName with practical examples to demonstrate its usage.

## GetDriveName Method Overview

The GetDriveName method takes one parameter: a complete path
string. It returns a string containing just the drive portion. The method is
available through the FileSystemObject in VBScript scripting.

Key features include handling various path formats and network paths. It doesn't
verify if the drive exists. GetDriveName works with both file and
directory paths. Understanding this method helps create robust path analysis.

## Basic Drive Name Extraction

This example demonstrates the simplest use of GetDriveName to
extract a drive letter. It shows how the method isolates the drive portion from
a full path. The drive letter is returned with the colon character.

basic_getdrivename.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
driveName = fso.GetDriveName("C:\Windows\System32")
WScript.Echo driveName ' Output: C:

Set fso = Nothing

The script creates a FileSystemObject and calls
GetDriveName. The path "C:\Windows\System32" is processed. The
result is "C:". Notice only the drive portion is returned with the colon.

## Handling Network Drive Paths

GetDriveName correctly processes network share paths. This example
shows how the method handles UNC paths. It demonstrates consistent behavior with
both local and network paths.

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
localDrive = fso.GetDriveName("D:\Projects\Report.docx")
networkDrive = fso.GetDriveName("\\Server\Share\Documents\file.txt")

WScript.Echo localDrive ' Output: D:
WScript.Echo networkDrive ' Output: \\Server\Share

Set fso = Nothing

The script processes both local and network paths. For UNC paths, it returns the
full server and share name. This behavior helps identify network resources in
scripts that work with multiple storage locations.

## Extracting Drive from File Path

This example shows how GetDriveName extracts the drive from a full
file path. It demonstrates the method's ability to work with file references.
The drive information is isolated regardless of path depth.

file_path_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "E:\Backups\2025\April\data.zip"
drive = fso.GetDriveName(filePath)

WScript.Echo drive ' Output: E:

Set fso = Nothing

The script processes a multi-level file path. GetDriveName correctly
identifies "E:" as the drive. This works regardless of how deep the file is in
the directory structure.

## Working with Root Directory Paths

This example demonstrates GetDriveName with root directory paths.
It shows the method's behavior when the path is just a drive root. The result is
consistent with other path formats.

root_directory.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
drive1 = fso.GetDriveName("F:\")
drive2 = fso.GetDriveName("G:")

WScript.Echo drive1 ' Output: F:
WScript.Echo drive2 ' Output: G:

Set fso = Nothing

Both variations of drive root paths produce the expected results.
GetDriveName handles both formats correctly. The trailing backslash
doesn't affect the output.

## Combining with Other Path Methods

This example shows GetDriveName used with other
FileSystemObject methods. It demonstrates practical path analysis by
combining multiple operations. The script extracts and verifies drive
information.

combined_methods.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
path = "H:\Data\Projects\Current\status.txt"

drive = fso.GetDriveName(path)
Set driveObj = fso.GetDrive(drive)

WScript.Echo "Drive: " &amp; drive
WScript.Echo "Free space: " &amp; driveObj.FreeSpace &amp; " bytes"

Set fso = Nothing

The script first extracts the drive letter, then gets drive object properties.
This demonstrates practical use of GetDriveName in system
administration scripts. The drive object provides additional information.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetDriveName method in
VBScript, covering its usage and practical applications. From simple drive
extraction to network path analysis, these examples demonstrate reliable path
processing. With this knowledge, you can enhance your file handling scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).