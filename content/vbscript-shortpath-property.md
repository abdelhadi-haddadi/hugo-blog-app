+++
title = "VBScript ShortPath Property"
date = 2025-08-29T20:15:14.295+01:00
draft = false
description = "Learn about VBScript ShortPath property, including path conversions, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ShortPath Property

last modified April 9, 2025

The ShortPath property in VBScript is part of the
FileSystemObject. It returns the short path name (8.3 format) of a
file or folder. This property is useful when working with legacy systems or
applications that require the older DOS-style naming convention.

ShortPath converts long filenames to their 8.3 format equivalents.
It helps maintain compatibility with older software. This tutorial covers
ShortPath with practical examples to demonstrate its usage.

## ShortPath Property Overview

The ShortPath property is available through the
FileSystemObject in VBScript. It returns a string representing the
short path name. The property is read-only and works with both files and
folders.

Key features include automatic conversion of long names to 8.3 format. It
requires the file or folder to exist. ShortPath is particularly
useful for legacy system integration. Understanding this property helps create
compatible file handling scripts.

## Basic ShortPath Usage

This example demonstrates the simplest use of ShortPath to get the
short path of a file. It shows how to access the property through a file object.
The script displays both the original and short path names.

basic_shortpath.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Program Files\Internet Explorer\iexplore.exe")

WScript.Echo "Original path: " &amp; file.Path
WScript.Echo "Short path: " &amp; file.ShortPath

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a file object. It
then displays both the original path and the short path. The short path will
typically be in 8.3 format (e.g., PROGRA~1\INTERN~1\IEXPLORE.EXE).

## Getting Folder ShortPath

This example shows how to use ShortPath with folders. It
demonstrates getting the short path of a directory. The process is similar to
working with files but uses a folder object.

folder_shortpath.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Program Files")

WScript.Echo "Original path: " &amp; folder.Path
WScript.Echo "Short path: " &amp; folder.ShortPath

Set folder = Nothing
Set fso = Nothing

The script retrieves the short path for the "Program Files" directory. The output
will show the 8.3 format version (e.g., C:\PROGRA~1). This is useful when
working with applications that require short path names.

## Using ShortPath in File Operations

This example demonstrates using ShortPath in actual file
operations. It shows how to use the short path when executing commands. Some
legacy commands work better with short paths.

file_operation_shortpath.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Program Files\Internet Explorer\iexplore.exe")

shortPath = file.ShortPath
WScript.Echo "Executing: " &amp; shortPath

Set wsh = CreateObject("WScript.Shell")
wsh.Run shortPath

Set file = Nothing
Set fso = Nothing
Set wsh = Nothing

The script gets the short path of Internet Explorer and executes it. Some older
applications or scripts might require the short path format. This ensures
compatibility across different systems.

## Handling Spaces in Paths with ShortPath

This example shows how ShortPath can help with paths containing
spaces. Some commands or applications have issues with spaces in paths. The
short path version eliminates spaces.

spaces_shortpath.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Documents and Settings\All Users\Desktop\Sample.txt")

WScript.Echo "Original path (with spaces): " &amp; file.Path
WScript.Echo "Short path (no spaces): " &amp; file.ShortPath

Set file = Nothing
Set fso = Nothing

The script demonstrates converting a path with spaces to its short version. The
short path replaces spaces and long names with 8.3 format. This makes the path
more compatible with older systems.

## Comparing ShortPath and LongPath

This example shows both short and long paths for comparison. It helps
understand how ShortPath transforms the original path. The script
displays both versions side by side.

compare_paths.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Program Files (x86)\Common Files")

WScript.Echo "Long path: " &amp; folder.Path
WScript.Echo "Short path: " &amp; folder.ShortPath

Set folder = Nothing
Set fso = Nothing

The script gets a folder with a complex name and shows both paths. The short
path will typically be something like C:\PROGRA~2\COMMON~1. This comparison
helps understand the transformation.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the ShortPath property in
VBScript, covering its usage and practical applications. From basic file paths
to complex directory structures, these examples demonstrate reliable path
conversion. With this knowledge, you can enhance your scripts with better
compatibility.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).