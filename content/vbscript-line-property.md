+++
title = "VBScript Line Property"
date = 2025-08-29T20:15:07.639+01:00
draft = false
description = "Learn about VBScript Line Property, including text file processing, line reading, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Line Property

last modified April 9, 2025

The Line property in VBScript is part of the TextStream
object. It returns the current line number in a text file being read. This
property is read-only and automatically increments as lines are read. It's
commonly used for tracking progress in file processing operations.

Line starts counting from 1 when a file is opened. It provides
valuable debugging information during file operations. This tutorial covers
Line with practical examples to demonstrate its usage in various
scenarios.

## Line Property Overview

The Line property belongs to the TextStream object
created via FileSystemObject. It returns a long integer representing
the current line position. The counter increments after each line read operation.

Key features include automatic line counting and read-only access. It doesn't
affect file reading operations. Line works with both sequential and
random file access. Understanding this property helps create robust file
processing scripts.

## Basic Line Counting

This example demonstrates the simplest use of Line to track reading
progress. It shows how the property increments automatically. The script reads a
file while displaying current line numbers.

basic_line_counting.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\data\log.txt", 1) ' 1 = ForReading

Do Until file.AtEndOfStream
    lineText = file.ReadLine()
    WScript.Echo "Line " &amp; file.Line &amp; ": " &amp; lineText
Loop

file.Close
Set fso = Nothing

The script opens a text file and reads it line by line. Each iteration displays
the current line number and content. Line starts at 1 and increments
after each ReadLine call. This provides real-time progress feedback.

## Error Reporting with Line Numbers

This example shows using Line for error reporting in data files. It
demonstrates validating file content while tracking line numbers. Invalid data
can be reported with precise line references.

error_reporting.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\data\values.csv", 1)

Do Until file.AtEndOfStream
    lineText = file.ReadLine()
    If Not IsNumeric(lineText) Then
        WScript.Echo "Error in line " &amp; file.Line &amp; ": Not a number"
    End If
Loop

file.Close
Set fso = Nothing

The script checks if each line contains numeric data. Non-numeric lines trigger
an error message with the line number. Line helps pinpoint data
quality issues. This approach is useful for data validation scripts.

## Processing Large Files with Progress

This example demonstrates using Line to show progress when
processing large files. It outputs progress at regular intervals. The script
helps monitor lengthy file operations.

large_file_progress.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\data\bigfile.txt", 1)
totalLines = 0

Do Until file.AtEndOfStream
    file.ReadLine()
    totalLines = totalLines + 1
    
    If totalLines Mod 1000 = 0 Then
        WScript.Echo "Processed " &amp; totalLines &amp; " lines..."
    End If
Loop

WScript.Echo "Total lines processed: " &amp; totalLines
file.Close
Set fso = Nothing

The script counts all lines in a large file. It reports progress every 1000
lines. Line could replace the manual counter here. This technique
helps monitor long-running file processing tasks.

## Comparing Line and Line Properties

This example compares Line with manual line counting. It shows both
approaches working simultaneously. The script demonstrates their identical
behavior.

compare_counting.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\data\sample.txt", 1)
manualCount = 0

Do Until file.AtEndOfStream
    lineText = file.ReadLine()
    manualCount = manualCount + 1
    
    WScript.Echo "Manual: " &amp; manualCount &amp; ", Property: " &amp; file.Line
Loop

file.Close
Set fso = Nothing

The script shows both counting methods produce identical results. Line
eliminates the need for manual counters. This example verifies the property's
reliability. Using the built-in property reduces code complexity.

## Line Counting in Write Operations

This example explores Line behavior during file writing. It shows
how the property works differently in write mode. The script demonstrates line
counting during output operations.

write_operations.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\data\output.txt", True) ' True = Overwrite

file.WriteLine "First line"
WScript.Echo "After write 1: " &amp; file.Line

file.WriteLine "Second line"
WScript.Echo "After write 2: " &amp; file.Line

file.Close
Set fso = Nothing

The script creates a new file and writes two lines. Line reflects
the next line number to be written. Unlike reading, it increments before the
write operation. This behavior is important for write tracking scenarios.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Line property in VBScript,
covering its usage and practical applications. From simple line counting to
complex file processing, these examples demonstrate reliable line tracking. With
this knowledge, you can enhance your file handling scripts with precise line
position information.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).