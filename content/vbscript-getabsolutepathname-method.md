+++
title = "VBScript GetAbsolutePathName Method"
date = 2025-08-29T20:15:03.033+01:00
draft = false
description = "Learn about VBScript GetAbsolutePathName method, including path conversions, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetAbsolutePathName Method

last modified April 9, 2025

The GetAbsolutePathName method in VBScript is part of the
FileSystemObject. It converts a relative path to a complete
absolute path. This method resolves relative path references like "..\" or ".\".
It's essential for reliable file operations in scripts.

GetAbsolutePathName uses the current directory as reference when
converting paths. It handles various path formats and normalizes the output.
This tutorial covers GetAbsolutePathName with practical examples.

## GetAbsolutePathName Method Overview

The GetAbsolutePathName method takes one parameter: a path string.
It returns the absolute version of this path. The method is available through
the FileSystemObject in VBScript scripting.

Key features include relative path resolution and path normalization. It doesn't
verify path existence. GetAbsolutePathName works with both file and
directory paths. Understanding this method helps create robust path handling.

## Basic Path Conversion

This example demonstrates converting a simple relative path to absolute. It
shows the basic usage of GetAbsolutePathName. The current directory
is used as the reference point for conversion.

basic_absolute_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
absPath = fso.GetAbsolutePathName("docs\report.txt")
WScript.Echo absPath ' Output: C:\Current\Path\docs\report.txt

Set fso = Nothing

The script creates a FileSystemObject and calls
GetAbsolutePathName. The relative path "docs\report.txt" is
converted to absolute. The result includes the current directory path.

## Resolving Parent Directory References

This example shows how GetAbsolutePathName handles parent directory
references ("..\"). It demonstrates path navigation upwards in the directory
tree. The method correctly resolves these relative references.

parent_directory.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
absPath = fso.GetAbsolutePathName("..\config\settings.ini")
WScript.Echo absPath ' Output: C:\Current\config\settings.ini

Set fso = Nothing

The script converts "..\config\settings.ini" to an absolute path. The "..\"
navigates up one directory level. The result shows the correct absolute path
with parent directory resolution.

## Current Directory Reference

This example demonstrates handling of current directory references (".\").
GetAbsolutePathName resolves these references while converting.
The dot notation represents the current directory in paths.

current_directory.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
absPath = fso.GetAbsolutePathName(".\temp\data.dat")
WScript.Echo absPath ' Output: C:\Current\Path\temp\data.dat

Set fso = Nothing

The script converts ".\temp\data.dat" to absolute path. The ".\" reference is
resolved to the current directory. The output shows the complete path without
the dot notation.

## Combining with Drive Letters

This example shows GetAbsolutePathName behavior with drive letters.
When a drive is specified, it becomes part of the absolute path. The method
maintains drive letter references in conversions.

drive_letter.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
absPath = fso.GetAbsolutePathName("D:backup\archive.zip")
WScript.Echo absPath ' Output: D:\Current\Path\On\D\backup\archive.zip

Set fso = Nothing

The script converts "D:backup\archive.zip" to absolute path. The drive letter
is preserved in the output. Note the current path on drive D is used as
reference.

## Network Path Conversion

This example demonstrates GetAbsolutePathName with network paths.
UNC paths are handled differently from local paths. The method maintains the
network reference in the output.

network_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
absPath = fso.GetAbsolutePathName("\\server\share\file.txt")
WScript.Echo absPath ' Output: \\server\share\file.txt

Set fso = Nothing

The script converts the network path "\\server\share\file.txt". Since this is
already an absolute path, it remains unchanged. Network paths don't use drive
letters or relative references.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetAbsolutePathName method in
VBScript. From basic conversions to network paths, these examples demonstrate
reliable path resolution. With this knowledge, you can enhance your scripts with
robust path handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).