+++
title = "VBScript GetBaseName Method"
date = 2025-08-29T20:15:03.050+01:00
draft = false
description = "Learn about VBScript GetBaseName method, including file path extraction, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetBaseName Method

last modified April 9, 2025

The GetBaseName method in VBScript is part of the
FileSystemObject. It extracts the base name from a file path,
removing both the directory path and file extension. This method is useful for
working with filenames without their full paths or extensions.

GetBaseName handles both files and directories, returning the last
component of the path. It doesn't verify if the path exists. This tutorial
covers GetBaseName with practical examples to demonstrate its usage.

## GetBaseName Method Overview

The GetBaseName method takes a file path as its parameter. It
returns a string containing the file or directory name without extension. The
method is available through the FileSystemObject in VBScript.

Key features include automatic path parsing and extension removal. It works with
both absolute and relative paths. GetBaseName is often used with
other FileSystemObject methods. Understanding this method helps in file
processing scripts.

## Basic File Name Extraction

This example demonstrates the simplest use of GetBaseName to
extract a filename from a path. It shows how the method removes both the
directory path and file extension. The result is just the base filename.

basic_getbasename.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
baseName = fso.GetBaseName("C:\Documents\report.docx")
WScript.Echo baseName ' Output: report

Set fso = Nothing

The script creates a FileSystemObject and calls
GetBaseName. The path "C:\Documents\report.docx" is processed to
return "report". Both the directory path and .docx extension are removed.

## Handling Files Without Extensions

GetBaseName correctly handles files that don't have extensions.
This example shows the method's behavior with extensionless files. The entire
filename is returned when no extension exists.

no_extension.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
baseName1 = fso.GetBaseName("C:\Temp\README")
baseName2 = fso.GetBaseName("D:\Projects\Makefile")

WScript.Echo baseName1 ' Output: README
WScript.Echo baseName2 ' Output: Makefile

Set fso = Nothing

Both examples return the complete filename since no extension is present.
GetBaseName doesn't modify names without extensions. This behavior
is consistent with files that do have extensions.

## Working with Directory Paths

GetBaseName can extract the last component from directory paths.
This example shows how it works with folder structures. The method returns the
final directory name in the path.

directory_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
dirName = fso.GetBaseName("C:\Users\Public\Documents\Projects")

WScript.Echo dirName ' Output: Projects

Set fso = Nothing

The script processes a directory path and returns just "Projects". This
demonstrates GetBaseName's ability to work with both files and
directories. The method treats the last path component the same way in both
cases.

## Multiple Extensions Handling

This example shows how GetBaseName handles files with multiple
dots in their names. The method only removes the last extension, preserving
other dots in the filename. This is important for complex file naming schemes.

multiple_extensions.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
baseName1 = fso.GetBaseName("archive.tar.gz")
baseName2 = fso.GetBaseName("project.backup.zip")

WScript.Echo baseName1 ' Output: archive.tar
WScript.Echo baseName2 ' Output: project.backup

Set fso = Nothing

The method removes only the last extension (.gz and .zip) from each filename.
Intermediate dots remain part of the returned base name. This behavior is
consistent with standard file extension conventions.

## Combining with Other FileSystemObject Methods

This example demonstrates using GetBaseName with other
FileSystemObject methods. It shows a practical file processing scenario where
multiple path operations are combined.

combined_methods.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\Data\Reports\Q1_2025.xlsx"

' Get just the filename with extension
fileName = fso.GetFileName(filePath)

' Get just the base name without extension
baseName = fso.GetBaseName(filePath)

WScript.Echo "Full path: " &amp; filePath
WScript.Echo "Filename: " &amp; fileName
WScript.Echo "Base name: " &amp; baseName

Set fso = Nothing

The script shows how to extract different parts of a file path. GetFileName
gets the full filename, while GetBaseName removes the extension.
This combination is powerful for file processing tasks.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetBaseName method in VBScript,
covering its usage and practical applications. From simple filename extraction to
complex path processing, these examples demonstrate reliable file name handling.
With this knowledge, you can enhance your file processing scripts with precise
filename control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).