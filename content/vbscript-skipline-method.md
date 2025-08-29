+++
title = "VBScript SkipLine Method"
date = 2025-08-29T20:15:15.400+01:00
draft = false
description = "Learn about VBScript SkipLine method, including text file processing, line skipping, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SkipLine Method

last modified April 9, 2025

The SkipLine method in VBScript is part of the
TextStream object. It skips the next line when reading a text file.
This method is useful for ignoring header lines or specific content in files. 
It works with files opened for reading through FileSystemObject.

SkipLine moves the file pointer to the beginning of the next line.
It doesn't return any value or read the skipped line's content. This tutorial
covers SkipLine with practical examples to demonstrate its usage.

## SkipLine Method Overview

The SkipLine method requires no parameters and returns no value. It
works only with text files opened in read mode. The method affects the current
file position in the TextStream object. It's commonly used to skip headers or
comments in data files.

Key features include simple line skipping without content retrieval. It advances
the file pointer past the next line terminator. SkipLine throws an
error if the file isn't open for reading. Understanding this method helps create
efficient file processing scripts.

## Basic Line Skipping

This example demonstrates the simplest use of SkipLine to skip one
line in a text file. It shows how to open a file and skip its first line. The
script then reads and displays the remaining content.

basic_skipline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("data.txt", 1) ' 1 = ForReading

file.SkipLine() ' Skip the first line

Do Until file.AtEndOfStream
    WScript.Echo file.ReadLine()
Loop

file.Close
Set fso = Nothing

The script creates a FileSystemObject and opens "data.txt" for
reading. SkipLine skips the first line before the read loop begins.
Each subsequent line is read and displayed. The file is properly closed at the
end.

## Skipping Multiple Lines

This example shows how to skip multiple lines in a file. It demonstrates using
SkipLine in a loop to bypass several lines at once. The script
skips the first three lines before processing the rest.

multi_skipline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("log.txt", 1)

' Skip three header lines
For i = 1 To 3
    file.SkipLine()
Next

' Process remaining lines
Do Until file.AtEndOfStream
    WScript.Echo "Data: " &amp; file.ReadLine()
Loop

file.Close
Set fso = Nothing

The script opens "log.txt" and skips three lines using a loop. After skipping,
it processes the remaining lines, prefixing each with "Data: ". This pattern is
common when working with files that have multiple header lines.

## Conditional Line Skipping

This example demonstrates conditional line skipping based on content. It shows
how to skip lines that match a specific pattern. The script processes a
configuration file, skipping comment lines that start with '#'.

conditional_skipline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("config.txt", 1)

Do Until file.AtEndOfStream
    line = file.ReadLine()
    If Left(line, 1) = "#" Then
        file.SkipLine() ' Skip the next line after comment
    Else
        WScript.Echo "Config: " &amp; line
    End If
Loop

file.Close
Set fso = Nothing

The script reads "config.txt" and checks each line's first character. If it's a
'#', the script skips the following line. Other lines are processed normally.
This approach is useful for files with comment blocks.

## Skipping Lines in CSV Processing

This example shows using SkipLine when processing CSV files. It
demonstrates skipping a header row before reading data. The script then parses
the remaining lines as comma-separated values.

csv_skipline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("data.csv", 1)

file.SkipLine() ' Skip header row

Do Until file.AtEndOfStream
    line = file.ReadLine()
    values = Split(line, ",")
    WScript.Echo "Field 1: " &amp; values(0) &amp; ", Field 2: " &amp; values(1)
Loop

file.Close
Set fso = Nothing

The script opens "data.csv" and immediately skips the header line. It then reads
each subsequent line, splitting it into fields at commas. The first two fields
are displayed for demonstration. This pattern is common in CSV processing.

## Error Handling with SkipLine

This example demonstrates proper error handling when using SkipLine.
It shows how to handle cases where skipping lines might fail. The script includes
checks for file existence and read permissions.

error_skipline.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FileExists("report.txt") Then
    WScript.Echo "Error: File not found"
    WScript.Quit(1)
End If

Set file = fso.OpenTextFile("report.txt", 1)
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error opening file: " &amp; Err.Description
    WScript.Quit(1)
End If

file.SkipLine()
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error skipping line: " &amp; Err.Description
    file.Close
    WScript.Quit(1)
End If

' Process file contents here

file.Close
Set fso = Nothing

The script includes comprehensive error checking before and during file
operations. It verifies file existence, successful opening, and line skipping.
Each potential error point has appropriate handling. This makes the script more
robust in production environments.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the SkipLine method in VBScript,
covering its usage and practical applications. From simple line skipping to
complex conditional processing, these examples demonstrate efficient file
handling. With this knowledge, you can enhance your text processing scripts with
precise line control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).