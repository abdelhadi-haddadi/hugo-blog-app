+++
title = "VBScript AtEndOfLine Property"
date = 2025-08-29T20:14:53.017+01:00
draft = false
description = "Learn about VBScript AtEndOfLine property, including text file processing, line reading, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript AtEndOfLine Property

last modified April 9, 2025

The AtEndOfLine property in VBScript is part of the
TextStream object. It indicates whether the file pointer has reached
the end of a line in a text file. This property is read-only and returns True or
False. It's essential for reading text files line by line or character by
character.

AtEndOfLine helps control file reading operations precisely. It
works with the TextStream object's methods like Read
and ReadLine. This tutorial covers AtEndOfLine with
practical examples to demonstrate its usage.

## AtEndOfLine Property Overview

The AtEndOfLine property checks if the file pointer is at the end
of a line. It returns True only when the pointer reaches a line terminator. The
property is used with TextStream objects opened for reading.

Key features include detecting line endings during sequential file reading. It
doesn't move the file pointer or modify the file. AtEndOfLine helps
process text files with precise control. Understanding this property is crucial
for text file manipulation.

## Basic File Reading with AtEndOfLine

This example demonstrates the simplest use of AtEndOfLine to read a
text file character by character. It shows how the property changes when
encountering line endings. The script reads until the end of the first line.

basic_ateol.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("test.txt", 1) ' 1 = ForReading

Do Until file.AtEndOfLine
    char = file.Read(1)
    WScript.Echo char
Loop

file.Close
Set fso = Nothing

The script opens "test.txt" for reading and reads one character at a time. The
loop continues until AtEndOfLine becomes True. Each character is
echoed to the output. This demonstrates basic end-of-line detection.

## Processing Multiple Lines with AtEndOfLine

This example shows how to process an entire file using both
AtEndOfLine and AtEndOfStream. It reads each line
character by character while tracking line endings. The script handles multiple
lines in a text file.

multiline_ateol.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("data.txt", 1)

Do Until file.AtEndOfStream
    Do Until file.AtEndOfLine
        char = file.Read(1)
        WScript.Echo "Char: " &amp; char
    Loop
    WScript.Echo "End of line reached"
    file.SkipLine ' Move to next line
Loop

file.Close
Set fso = Nothing

The outer loop checks for end of file, while the inner loop checks for end of
line. Each character is processed individually. When a line ends, a message is
displayed. SkipLine moves to the next line.

## Counting Characters per Line

This example uses AtEndOfLine to count characters in each line of a
file. It demonstrates practical file analysis using the property. The script
tracks line numbers and their respective lengths.

count_chars.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("document.txt", 1)
lineNum = 1

Do Until file.AtEndOfStream
    charCount = 0
    Do Until file.AtEndOfLine
        file.Read(1)
        charCount = charCount + 1
    Loop
    WScript.Echo "Line " &amp; lineNum &amp; ": " &amp; charCount &amp; " characters"
    lineNum = lineNum + 1
    file.SkipLine
Loop

file.Close
Set fso = Nothing

The script reads through each line without storing characters. It increments a
counter for each character read. After each line, it reports the line number and
character count. This shows how to use AtEndOfLine for analysis.

## Custom Line Processing with AtEndOfLine

This example demonstrates custom line processing using
AtEndOfLine. It reads lines but processes specific characters
differently. The script converts vowels to uppercase while reading.

custom_processing.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("input.txt", 1)
output = ""

Do Until file.AtEndOfStream
    Do Until file.AtEndOfLine
        char = file.Read(1)
        If InStr("aeiou", LCase(char)) &gt; 0 Then
            output = output &amp; UCase(char)
        Else
            output = output &amp; char
        End If
    Loop
    output = output &amp; vbCrLf ' Add line break
    file.SkipLine
Loop

WScript.Echo output
file.Close
Set fso = Nothing

The script reads each character and checks if it's a vowel. Vowels are converted
to uppercase in the output. Other characters remain unchanged.
AtEndOfLine controls the inner reading loop. The modified text is
built in the output variable.

## Reading Fixed-Width Fields with AtEndOfLine

This example shows how to read fixed-width fields using
AtEndOfLine. It processes each line in segments of specific
lengths. The script demonstrates structured file parsing.

fixed_width.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("records.txt", 1)

Do Until file.AtEndOfStream
    field1 = file.Read(10) ' First 10 chars
    field2 = file.Read(15) ' Next 15 chars
    field3 = file.Read(5)  ' Next 5 chars
    
    WScript.Echo "Field 1: " &amp; Trim(field1)
    WScript.Echo "Field 2: " &amp; Trim(field2)
    WScript.Echo "Field 3: " &amp; Trim(field3)
    
    ' Skip remaining characters in line if any
    Do Until file.AtEndOfLine
        file.Read(1)
    Loop
    file.SkipLine
Loop

file.Close
Set fso = Nothing

The script reads specific character counts for each field. It uses
AtEndOfLine to handle variable-length lines. Fields are trimmed to
remove extra spaces. This approach is useful for fixed-format data files. The
inner loop ensures proper line termination handling.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the AtEndOfLine property in
VBScript, covering its usage and practical applications. From basic file reading
to complex text processing, these examples demonstrate precise line handling.
With this knowledge, you can enhance your file processing scripts with better
control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).