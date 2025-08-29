+++
title = "VBScript CreateTextFile Method"
date = 2025-08-29T20:14:56.332+01:00
draft = false
description = "Learn about VBScript CreateTextFile method, including file creation, text operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CreateTextFile Method

last modified April 9, 2025

The CreateTextFile method in VBScript is part of the
FileSystemObject. It creates a new text file and returns a
TextStream object for writing to it. This method is essential for
file operations in VBScript. It allows scripts to generate log files, 
configuration files, and other text-based data.

CreateTextFile can optionally overwrite existing files or create
unicode files. It provides control over file creation behavior through its
parameters. This tutorial covers CreateTextFile with practical
examples to demonstrate its usage in various scenarios.

## CreateTextFile Method Overview

The CreateTextFile method takes three parameters: filename,
overwrite, and unicode. Filename specifies the file to create. Overwrite
determines if existing files should be replaced. Unicode specifies the file
encoding.

Key features include automatic file creation and text stream return. It supports
both ASCII and Unicode file formats. The method raises errors if path is invalid
or permissions are insufficient. Understanding this method enables robust file
handling in scripts.

## Basic Text File Creation

This example demonstrates the simplest use of CreateTextFile to
create a new text file. It shows how to create a file and write a single line.
The script creates a file in the current directory with default settings.

basic_createfile.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("example.txt")
file.WriteLine "This is a test file created with VBScript"
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and calls
CreateTextFile. It writes one line to the file and closes it.
The default parameters create an ASCII file and overwrite existing files.
Always close files after writing to ensure data is saved.

## Creating Unicode Text Files

This example shows how to create a Unicode text file using the third parameter.
Unicode files support international characters and special symbols. The script
demonstrates creating a Unicode-encoded text file.

unicode_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("unicode.txt", True, True)
file.WriteLine "This file contains Unicode text: こんにちは"
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a Unicode file by setting the third parameter to True. The
second parameter (True) enables overwriting existing files. The file contains
both English and Japanese text. Unicode encoding preserves all special characters
correctly.

## Appending to Existing Files

To append to existing files rather than overwrite, use OpenTextFile
with appropriate parameters. This example shows how to add content to an existing
file. It demonstrates file appending as an alternative to creation.

append_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
' Create file if it doesn't exist, open for appending if it does
Set file = fso.OpenTextFile("log.txt", 8, True)
file.WriteLine "New log entry: " &amp; Now()
file.Close

Set file = Nothing
Set fso = Nothing

The script uses OpenTextFile with mode 8 (ForAppending). The third
parameter (True) creates the file if it doesn't exist. This approach is useful
for log files and other accumulating data. Each run adds a new timestamped entry.

## Creating Files with Error Handling

This example demonstrates robust file creation with error handling. It checks for
potential issues like invalid paths or permission problems. Proper error handling
makes scripts more reliable in production environments.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\restricted\test.txt")

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error creating file: " &amp; Err.Description
    Err.Clear
Else
    file.WriteLine "File created successfully"
    file.Close
End If

Set file = Nothing
Set fso = Nothing

The script attempts to create a file in a potentially restricted location.
On Error Resume Next prevents script termination on errors. The code
checks Err.Number to detect failures. Error handling provides
graceful failure instead of cryptic errors.

## Creating Multiple Files in a Loop

This example shows how to create multiple text files programmatically. It uses a
loop to generate several files with sequential names. Each file receives unique
content based on its index.

multiple_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

For i = 1 To 5
    fileName = "report_" &amp; i &amp; ".txt"
    Set file = fso.CreateTextFile(fileName)
    file.WriteLine "This is report number " &amp; i
    file.WriteLine "Generated on " &amp; Now()
    file.Close
    Set file = Nothing
Next

Set fso = Nothing

The script creates five files named report_1.txt through report_5.txt. Each file
contains its sequence number and generation timestamp. The loop demonstrates
batch file creation. This pattern is useful for report generation or data export.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the CreateTextFile method in
VBScript, covering its usage and practical applications. From basic file creation
to advanced scenarios with error handling, these examples demonstrate reliable
file operations. With this knowledge, you can enhance your scripts with robust
file handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).