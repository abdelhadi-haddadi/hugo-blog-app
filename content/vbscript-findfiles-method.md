+++
title = "VBScript FindFiles Method"
date = 2025-08-29T20:15:26.602+01:00
draft = false
description = "Learn about VBScript FindFiles method, including file searching, pattern matching, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FindFiles Method

last modified April 9, 2025

The FindFiles method in VBScript is part of the
FileSystemObject. It searches a folder for files matching a
specified pattern. This method returns a collection of files that match the
search criteria. It's commonly used for file management and automation tasks.

FindFiles supports wildcard characters like * and ? for pattern
matching. The search is not recursive by default. This tutorial covers
FindFiles with practical examples to demonstrate its usage.

## FindFiles Method Overview

The FindFiles method takes a file search pattern as its parameter.
It returns a collection of file names matching the pattern. The method is
available through the Folder object in VBScript scripting.

Key features include wildcard support and case-insensitive matching on Windows.
It doesn't search subfolders by default. FindFiles is efficient for
quick file searches within a single directory. Understanding this method helps
create powerful file management scripts.

## Basic File Search

This example demonstrates the simplest use of FindFiles to locate
all text files in a directory. It shows how to iterate through the results. The
search pattern "*.txt" matches all files with .txt extension.

basic_findfiles.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")
Set files = folder.Files

For Each file In files
    If LCase(fso.GetExtensionName(file.Name)) = "txt" Then
        WScript.Echo file.Name
    End If
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a folder reference.
It loops through all files checking their extension. Only .txt files are
displayed. This approach is more flexible than using wildcards directly.

## Using Wildcards with FindFiles

This example shows how to use wildcards with FindFiles to match
multiple file patterns. The * wildcard matches any sequence of characters. The ?
wildcard matches any single character.

wildcards_findfiles.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Documents")
Set files = folder.Files

WScript.Echo "All Word documents:"
For Each file In files
    If file.Name Like "*.doc*" Then
        WScript.Echo file.Name
    End If
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script searches for all Word documents (.doc and .docx) in the Documents
folder. The "*.doc*" pattern matches any file starting with any name and having
.doc in the extension. The Like operator provides pattern matching capabilities.

## Searching with Multiple Patterns

This example demonstrates searching for files matching multiple patterns. It
shows how to combine different file types in a single search. The script checks
each file against several possible patterns.

multiple_patterns.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects")
Set files = folder.Files

patterns = Array("*.vbs", "*.wsf", "*.js")

For Each file In files
    For Each pattern In patterns
        If file.Name Like pattern Then
            WScript.Echo file.Name
            Exit For
        End If
    Next
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script searches for script files with .vbs, .wsf, or .js extensions. It uses
an array to store multiple patterns. Each file is checked against all patterns.
The Exit For statement stops checking after the first match is found.

## Finding Files by Date

This example shows how to combine FindFiles with date comparisons.
It finds files modified within the last 7 days. The DateDiff function calculates
the time difference between dates.

date_search.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Backups")
Set files = folder.Files

cutoffDate = DateAdd("d", -7, Date)

For Each file In files
    If file.DateLastModified &gt; cutoffDate Then
        WScript.Echo file.Name &amp; " - " &amp; file.DateLastModified
    End If
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script calculates a cutoff date 7 days before the current date. It then
checks each file's last modified date. Only files modified after the cutoff are
displayed. This approach is useful for finding recently changed files.

## Searching for Specific File Names

This example demonstrates searching for files containing specific text in their
names. It shows how to perform partial name matching. The InStr function checks
if the search text exists in the file name.

name_search.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Reports")
Set files = folder.Files

searchText = "Q1"

For Each file In files
    If InStr(1, file.Name, searchText, vbTextCompare) &gt; 0 Then
        WScript.Echo file.Name
    End If
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script searches for all files containing "Q1" in their names. The
vbTextCompare parameter makes the search case-insensitive. This approach is
useful when you need to find files with specific naming conventions.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the FindFiles method in VBScript,
covering its usage and practical applications. From basic searches to complex
pattern matching, these examples demonstrate powerful file searching
capabilities. With this knowledge, you can enhance your file management scripts
with robust search functionality.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).