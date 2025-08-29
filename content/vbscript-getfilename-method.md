+++
title = "VBScript GetFileName Method"
date = 2025-08-29T20:15:05.448+01:00
draft = false
description = "Learn about VBScript GetFileName method, including file path parsing, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetFileName Method

last modified April 9, 2025

The GetFileName method in VBScript is part of the
FileSystemObject. It extracts the filename portion from a complete
path string. This method is useful for parsing file paths in scripts. It returns
the last component of the path, whether it's a file or directory.

GetFileName handles both files and directories in paths. It works
with absolute and relative paths. The method doesn't verify if the file exists.
This tutorial covers GetFileName with practical examples to
demonstrate its usage.

## GetFileName Method Overview

The GetFileName method takes one parameter: a complete path string.
It returns the filename or last directory name from the path. The method is
available through the FileSystemObject in VBScript scripting.

Key features include path parsing without file system checks. It works with all
valid path formats. GetFileName is often used with other file
operations. Understanding this method helps create robust file handling scripts.

## Basic File Name Extraction

This example demonstrates the simplest use of GetFileName to
extract a filename from a full path. It shows how the method isolates the file
portion. The path can include directories and drive letters.

basic_getfilename.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
fileName = fso.GetFileName("C:\Documents\Report.docx")
WScript.Echo fileName ' Output: Report.docx

Set fso = Nothing

The script creates a FileSystemObject and calls
GetFileName. The full path "C:\Documents\Report.docx" is parsed.
The result is "Report.docx". The method correctly identifies the file component.

## Handling Directory Paths

GetFileName works with directory paths as well as files. This example shows how
the method returns the last directory name. It demonstrates consistent behavior
with different path types.

directory_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
dirName = fso.GetFileName("C:\Projects\Website\Images")

WScript.Echo dirName ' Output: Images

Set fso = Nothing

The script extracts "Images" from the directory path. GetFileName
treats the last path component as the target. This behavior is useful when
working with directory structures.

## Working with Network Paths

GetFileName can parse network paths (UNC paths) the same way as
local paths. This example shows extraction from a shared network location. The
method handles the double backslashes correctly.

network_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
fileName = fso.GetFileName("\\Server\Share\Documents\Budget.xlsx")

WScript.Echo fileName ' Output: Budget.xlsx

Set fso = Nothing

The UNC path is parsed to extract "Budget.xlsx". GetFileName
ignores the server and share names. It focuses only on the last path component
regardless of path type.

## Handling Paths with Trailing Backslashes

This example demonstrates how GetFileName handles paths with
trailing backslashes. The method correctly processes these cases without
returning empty strings. It shows robust path parsing behavior.

trailing_backslash.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
path1 = fso.GetFileName("C:\Temp\file.txt\")
path2 = fso.GetFileName("C:\Temp\file.txt")

WScript.Echo path1 ' Output: file.txt
WScript.Echo path2 ' Output: file.txt

Set fso = Nothing

Both paths produce identical results despite different endings.
GetFileName normalizes the path before parsing. This makes the
method reliable for various path formats in real-world scripts.

## Extracting from Relative Paths

GetFileName works with relative paths as well as absolute ones.
This example shows filename extraction from a relative path. The method doesn't
require paths to be fully qualified.

relative_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
fileName = fso.GetFileName("..\..\Downloads\setup.exe")

WScript.Echo fileName ' Output: setup.exe

Set fso = Nothing

The relative path with parent directory references is parsed correctly.
GetFileName extracts "setup.exe" regardless of the path's
relativity. This flexibility is valuable in script portability.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetFileName method in
VBScript, covering its usage and practical applications. From simple file paths
to complex network locations, these examples demonstrate reliable path parsing.
With this knowledge, you can enhance your file handling scripts with robust path
management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).