+++
title = "VBScript ReadAll Method"
date = 2025-08-29T20:15:12.060+01:00
draft = false
description = "Learn about VBScript ReadAll method, including file reading, text processing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ReadAll Method

last modified April 9, 2025

The ReadAll method in VBScript is part of the
TextStream object from the FileSystemObject. It reads
the entire contents of a text file into a string variable. This method is useful
for processing small to medium-sized text files in one operation. It provides
simple access to file contents without line-by-line reading.

ReadAll loads the complete file into memory, so it's not suitable
for very large files. For big files, line-by-line reading is recommended. This
tutorial covers ReadAll with practical examples to demonstrate its
usage in various scenarios.

## ReadAll Method Overview

The ReadAll method takes no parameters and returns the entire file
contents as a string. It works with text files opened for reading through the
FileSystemObject. The method automatically handles different text
encodings based on how the file was opened.

Key features include simple one-call file reading and preservation of all
formatting. The method includes line breaks and whitespace from the original
file. Understanding ReadAll helps create efficient text processing
scripts when file size isn't a concern.

## Basic File Reading

This example demonstrates the simplest use of ReadAll to read a
text file. It shows how to open a file and read its entire contents with one
method call. The file contents are then displayed in a message box.

basic_readall.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\sample.txt", 1) ' 1 = ForReading
contents = file.ReadAll()
file.Close

WScript.Echo contents

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and opens a text file for
reading. ReadAll reads the entire file into the contents variable.
The file is then closed, and contents are displayed. This is the most basic
usage pattern for ReadAll.

## Counting Words in a File

This example shows how to use ReadAll to count words in a text
file. The entire file is read into memory, then split into words using the
Split function. This demonstrates processing file contents after
reading.

word_count.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\document.txt", 1)
contents = file.ReadAll()
file.Close

words = Split(contents, " ")
wordCount = UBound(words) + 1

WScript.Echo "The file contains " &amp; wordCount &amp; " words."

Set file = Nothing
Set fso = Nothing

After reading the file, the script splits the content by spaces to create an
array of words. The array's upper bound plus one gives the word count. This
shows how ReadAll enables complete text processing in memory.

## Searching File Contents

This example demonstrates searching file contents after reading with
ReadAll. It checks if a specific string exists in the file and
reports its position. This pattern is useful for text analysis tasks.

file_search.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\data.txt", 1)
contents = file.ReadAll()
file.Close

searchTerm = "important"
position = InStr(contents, searchTerm)

If position &gt; 0 Then
    WScript.Echo "Found '" &amp; searchTerm &amp; "' at position " &amp; position
Else
    WScript.Echo "Search term not found"
End If

Set file = Nothing
Set fso = Nothing

The script reads the entire file and uses InStr to search for a
term. If found, it reports the character position where the term begins. This
shows how ReadAll enables complete text searches in one operation.

## Processing Configuration Files

This example shows how to process simple configuration files using
ReadAll. The script reads key-value pairs from a file and stores
them in a dictionary object. This demonstrates structured text processing.

config_reader.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set config = CreateObject("Scripting.Dictionary")
Set file = fso.OpenTextFile("C:\temp\settings.cfg", 1)
contents = file.ReadAll()
file.Close

lines = Split(contents, vbCrLf)
For Each line in lines
    If InStr(line, "=") &gt; 0 Then
        parts = Split(line, "=")
        config.Add Trim(parts(0)), Trim(parts(1))
    End If
Next

WScript.Echo "Server: " &amp; config("server")
WScript.Echo "Port: " &amp; config("port")

Set file = Nothing
Set fso = Nothing
Set config = Nothing

The script reads a configuration file where settings are in "key=value" format.
It splits the file into lines, then processes each line to extract key-value
pairs. This shows how ReadAll enables complex text parsing.

## HTML Template Processing

This example demonstrates using ReadAll to process HTML templates.
The script reads a template file, replaces placeholders, and saves the result.
This shows file modification using ReadAll.

template_processor.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set templateFile = fso.OpenTextFile("C:\temp\template.html", 1)
contents = templateFile.ReadAll()
templateFile.Close

contents = Replace(contents, "{{TITLE}}", "Welcome Page")
contents = Replace(contents, "{{CONTENT}}", "Hello World!")

Set outputFile = fso.CreateTextFile("C:\temp\output.html")
outputFile.Write contents
outputFile.Close

WScript.Echo "HTML file generated successfully"

Set templateFile = Nothing
Set outputFile = Nothing
Set fso = Nothing

The script reads an HTML template containing placeholders like {{TITLE}}. It
replaces these with actual content using Replace, then saves the
result. This demonstrates how ReadAll enables template processing.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the ReadAll method in VBScript,
covering its usage and practical applications. From simple file reading to
complex text processing, these examples demonstrate its versatility. With this
knowledge, you can enhance your file handling scripts with efficient text
processing capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).