+++
title = "VBScript Skip Method"
date = 2025-08-29T20:15:14.289+01:00
draft = false
description = "Learn about VBScript Skip method, including file reading, text processing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Skip Method

last modified April 9, 2025

The Skip method in VBScript is part of the TextStream
object. It skips a specified number of characters when reading from a text file.
This method is useful for navigating through file content without processing it.
It works with files opened in read mode through the FileSystemObject.

Skip moves the file pointer forward by the specified character count.
It affects subsequent read operations from the current position. This tutorial
covers Skip with practical examples to demonstrate its usage in
file processing scenarios.

## Skip Method Overview

The Skip method takes one parameter: the number of characters to
skip. It doesn't return any value. The method is available through the
TextStream object in VBScript scripting. It only works with files
opened for reading.

Key features include position adjustment in the text stream and character-based
navigation. It doesn't read or return the skipped content. Skip
works with both ASCII and Unicode text files. Understanding this method helps
create efficient file processing scripts.

## Basic Character Skipping

This example demonstrates the simplest use of Skip to bypass
characters in a text file. It shows how the method affects subsequent read
operations. The file pointer moves forward by the specified count.

basic_skip.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("data.txt", 1) ' 1 = ForReading

file.Skip(5) ' Skip first 5 characters
content = file.ReadAll()

WScript.Echo content
file.Close
Set fso = Nothing

The script opens "data.txt" and skips the first 5 characters. ReadAll
then reads the remaining content. If the file contains "HelloWorld", the output
would be "World". The method efficiently bypasses unwanted content.

## Skipping Lines with LineFeeds

This example shows how Skip handles line endings when counting
characters. Line feed characters are counted like any other character. The
method provides precise control over file position.

skip_lines.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("data.txt", True)
file.WriteLine("First line")
file.WriteLine("Second line")
file.Close

Set file = fso.OpenTextFile("data.txt", 1)
file.Skip(12) ' Skip "First line" + line feed
content = file.ReadLine()

WScript.Echo content ' Output: Second line
file.Close
Set fso = Nothing

The script creates a file with two lines, then skips exactly 12 characters.
This includes the first line and its line feed. The next ReadLine
returns "Second line". Precise counting is essential for accurate navigation.

## Combining Skip with Read

This example demonstrates combining Skip with Read to
extract specific portions of a file. It shows how to skip initial content, read
a chunk, then skip more content. This pattern is useful for parsing structured
files.

skip_read.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("config.txt", 1)

file.Skip(10) ' Skip header
configValue = file.Read(5) ' Read 5 characters
file.Skip(20) ' Skip to next section

WScript.Echo "Config value:", configValue
file.Close
Set fso = Nothing

The script skips 10 characters of header, reads 5 characters as a config value,
then skips 20 more characters. This approach allows precise extraction from
known file positions. It's useful for fixed-format files.

## Error Handling with Skip

This example shows proper error handling when using Skip. Attempting
to skip beyond the file end causes no error but affects subsequent reads. The
script demonstrates how to check for valid skip operations.

skip_error.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("short.txt", 1)

file.Skip(1000) ' Try to skip beyond file end
If file.AtEndOfStream Then
    WScript.Echo "Skipped past file end"
Else
    content = file.ReadAll()
    WScript.Echo content
End If

file.Close
Set fso = Nothing

The script attempts to skip 1000 characters in a short file. The
AtEndOfStream check detects if the skip went past the end. This
prevents errors when processing files of unknown length.

## Processing Fixed-Width Records

This example demonstrates using Skip to process fixed-width record
files. Each record is skipped except for specific fields. The method enables
efficient extraction without reading entire records.

fixed_width.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("records.dat", 1)

Do Until file.AtEndOfStream
    file.Skip(10) ' Skip record ID
    name = file.Read(20) ' Read name field
    file.Skip(30) ' Skip remaining fields
    WScript.Echo "Name:", Trim(name)
Loop

file.Close
Set fso = Nothing

The script processes a file with 60-character fixed-width records. It skips the
first 10 characters (record ID), reads 20 characters (name), then skips the
remaining 30. This pattern efficiently extracts specific fields from each record.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Skip method in VBScript,
covering its usage and practical applications. From simple character skipping to
complex file parsing, these examples demonstrate efficient file navigation. With
this knowledge, you can enhance your file processing scripts with precise
content control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).