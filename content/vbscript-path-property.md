+++
title = "VBScript Path Property"
date = 2025-08-29T20:15:10.970+01:00
draft = false
description = "Learn about VBScript Path property, including file path operations, directory management, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Path Property

last modified April 9, 2025

The Path property in VBScript is part of the
FileSystemObject and related objects. It returns the complete path
for files, folders, or drives. This property is read-only and provides the full
system path of the referenced object. It's essential for file system navigation
and operations.

The Path property works with File, Folder,
and Drive objects. It always returns absolute paths in the system's
native format. This tutorial covers the Path property with practical
examples to demonstrate its usage.

## Path Property Overview

The Path property provides the complete path to a file system object.
For files, it includes the filename and extension. For folders, it shows the
full directory path. For drives, it displays the drive letter with a colon.

Key features include consistent path formatting and absolute path returns. It
doesn't modify or validate the path. The Path property is available
on multiple FileSystemObject-related objects. Understanding this property helps
in file system navigation and logging.

## Getting File Path

This example demonstrates how to retrieve the complete path of a file using the
Path property. We first get a File object reference, then access
its Path property. This shows the full absolute path to the specified file.

file_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Documents\report.docx")

WScript.Echo file.Path ' Output: C:\Documents\report.docx

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to a
specific file. The Path property returns the complete file path.
This includes both the directory path and the filename with extension.

## Getting Folder Path

This example shows how to retrieve the complete path of a folder. The process is
similar to getting a file path but uses a Folder object. The Path
property returns the full directory path without a trailing backslash.

folder_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Program Files\Common Files")

WScript.Echo folder.Path ' Output: C:\Program Files\Common Files

Set folder = Nothing
Set fso = Nothing

The script gets a reference to a folder and accesses its Path
property. The returned path is the absolute path to the folder. Note that the
path doesn't end with a backslash unless it's a root directory.

## Getting Drive Path

This example demonstrates retrieving the path of a drive. For drives, the
Path property simply returns the drive letter followed by a colon.
This is the minimal path representation for a drive.

drive_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

WScript.Echo drive.Path ' Output: C:

Set drive = Nothing
Set fso = Nothing

The script gets a reference to the C: drive and accesses its Path
property. The result is just the drive letter with a colon. This can be combined
with other paths using BuildPath.

## Comparing Path Properties

This example compares the Path property with other similar
properties. It shows how Path differs from Name and
ShortPath. Each property provides different information about the
file system object.

compare_paths.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Documents\report.docx")

WScript.Echo "Path: " &amp; file.Path
WScript.Echo "Name: " &amp; file.Name
WScript.Echo "ShortPath: " &amp; file.ShortPath

Set file = Nothing
Set fso = Nothing

The script shows three different properties of a file object. Path
returns the full path, Name gives just the filename, and
ShortPath provides the 8.3 format path. Each serves different
purposes in file operations.

## Using Path in File Operations

This example demonstrates practical use of the Path property in
file operations. We get a file's path and use it to create a backup copy. The
path is modified to create a new filename for the backup.

file_operation.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Data\important.txt")
filePath = file.Path

' Create backup path by modifying original path
backupPath = fso.BuildPath(fso.GetParentFolderName(filePath), "backup_" &amp; file.Name)
file.Copy(backupPath)

WScript.Echo "Created backup: " &amp; backupPath

Set file = Nothing
Set fso = Nothing

The script gets a file's path and creates a backup copy with a modified name.
The Path property provides the complete reference needed for the
operation. This shows how Path integrates with other file
operations.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Path property in VBScript,
covering its usage and practical applications. From simple path retrieval to
integration with file operations, these examples demonstrate its versatility.
With this knowledge, you can better navigate and manipulate file systems in your
scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).