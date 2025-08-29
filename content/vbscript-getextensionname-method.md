+++
title = "VBScript GetExtensionName Method"
date = 2025-08-29T20:15:04.153+01:00
draft = false
description = "Learn about VBScript GetExtensionName method, including file extensions, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetExtensionName Method

last modified April 9, 2025

The GetExtensionName method in VBScript is part of the
FileSystemObject. It extracts the extension from a file path or
name. This method returns the portion after the last dot, including the dot
itself. It's commonly used in file operations and validation scripts.

GetExtensionName handles both full paths and simple filenames. It
returns an empty string if no extension exists. This tutorial covers
GetExtensionName with practical examples to demonstrate its usage.

## GetExtensionName Method Overview

The GetExtensionName method takes one parameter: a path or
filename. It returns a string containing the file extension. The method is
available through the FileSystemObject in VBScript scripting.

Key features include case preservation and dot inclusion. It doesn't verify file
existence or validity. GetExtensionName works with both absolute
and relative paths. Understanding this method helps create robust file handling
scripts.

## Basic File Extension Extraction

This example demonstrates the simplest use of GetExtensionName to
get a file extension. It shows how the method extracts the portion after the
last dot. The extension includes the dot character in the returned value.

basic_extension.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
extension = fso.GetExtensionName("document.docx")
WScript.Echo extension ' Output: .docx

Set fso = Nothing

The script creates a FileSystemObject and calls
GetExtensionName. The filename "document.docx" is processed to
extract ".docx". Notice the dot is included in the returned extension string.

## Handling Full Paths

GetExtensionName works with complete file paths, not just
filenames. This example shows how it extracts extensions from full paths. The
method correctly identifies the last dot in the path string.

full_path_extension.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
path = "C:\Users\Public\Documents\report.pdf"
extension = fso.GetExtensionName(path)

WScript.Echo extension ' Output: .pdf

Set fso = Nothing

The script processes a full file path and extracts the ".pdf" extension.
GetExtensionName ignores all dots in the directory structure. It
only considers the dot before the actual file extension.

## Files Without Extensions

This example demonstrates GetExtensionName's behavior with
extensionless files. When no extension exists, the method returns an empty
string. This is useful for validation and conditional processing.

no_extension.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
result1 = fso.GetExtensionName("README")
result2 = fso.GetExtensionName("archive.tar.gz")

WScript.Echo result1 ' Output: (empty string)
WScript.Echo result2 ' Output: .gz

Set fso = Nothing

The first call returns an empty string for "README" which has no extension. The
second call shows it only gets the last extension (.gz) for multi-extension
files. This behavior is important for proper file processing.

## Case Sensitivity in Extensions

GetExtensionName preserves the original case of the extension. This
example demonstrates how case is maintained in the returned value. The method
doesn't modify the case of the extension characters.

case_sensitivity.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
ext1 = fso.GetExtensionName("image.JPEG")
ext2 = fso.GetExtensionName("program.CS")

WScript.Echo ext1 ' Output: .JPEG
WScript.Echo ext2 ' Output: .CS

Set fso = Nothing

The script shows that uppercase extensions remain uppercase in the output. This
behavior is consistent with VBScript's general case preservation. Applications
should handle case differences when comparing extensions.

## Processing Multiple Files

This example shows how to use GetExtensionName in a loop to process
multiple files. It demonstrates practical application in file management
scripts. The method efficiently extracts extensions from an array of filenames.

multiple_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
files = Array("data.txt", "config.ini", "backup.zip", "notes")

For Each file In files
    extension = fso.GetExtensionName(file)
    WScript.Echo file &amp; " - Extension: " &amp; extension
Next

Set fso = Nothing

The script processes each file in the array, printing its name and extension.
Notice the last file "notes" shows no extension. This pattern is useful for
categorizing or filtering files by type in scripts.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetExtensionName method in
VBScript, covering its usage and practical applications. From simple filename
processing to complex file management tasks, these examples demonstrate reliable
extension extraction. With this knowledge, you can enhance your file handling
scripts with robust extension management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).