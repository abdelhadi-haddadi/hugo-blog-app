+++
title = "VBScript Write Method"
date = 2025-08-29T20:15:16.494+01:00
draft = false
description = "Learn about VBScript Write method, including file writing, text output, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Write Method

last modified April 9, 2025

The Write method in VBScript is part of the
TextStream object from the FileSystemObject. It writes
a specified string to a text file without adding a newline character. This
method is essential for creating and modifying text files programmatically. It's
commonly used in logging, data export, and configuration file generation.

Write differs from WriteLine by not automatically
adding line terminators. It allows precise control over file content formatting.
This tutorial covers Write with practical examples to demonstrate
its usage in various scenarios.

## Write Method Overview

The Write method takes one parameter: the string to write to the
file. It writes the exact string without modification or line termination. The
method requires an open TextStream object with write permissions.

Key features include direct string output and position maintenance. It doesn't
modify the string content or add formatting. Write works with both
new and existing files. Understanding this method helps create flexible file
output scripts.

## Basic File Writing

This example demonstrates the simplest use of Write to create a new
file with content. It shows how to open a file for writing and write a string.
The file is created if it doesn't exist.

basic_write.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\output.txt", True)

file.Write "This is some sample text."
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and a new text file. The
Write method writes the string without a newline. The file is then
closed and objects released. The output file contains exactly the specified
text.

## Writing Multiple Strings

This example shows how to write multiple strings sequentially using
Write. It demonstrates that consecutive writes append to the file
without separators. The content appears as one continuous string.

multiple_writes.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\data.txt", True)

file.Write "First part"
file.Write "Second part"
file.Write "Third part"
file.Close

Set file = Nothing
Set fso = Nothing

Three separate Write calls place text in the file sequentially. The
resulting file contains "First partSecond partThird part". No spaces or line
breaks are added between writes. This shows the precise nature of
Write.

## Combining Write and WriteLine

This example demonstrates using Write with WriteLine to
create structured output. Write builds lines while
WriteLine adds line terminators. This combination offers flexible
formatting.

write_writeline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\log.txt", True)

file.Write "LOG ENTRY: "
file.WriteLine Date() &amp; " " &amp; Time()
file.Write "STATUS: "
file.WriteLine "Operation completed successfully"
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a log file with structured entries. Write starts
each line, while WriteLine completes them. This produces readable
output with labels and values on the same line. The result is well-formatted log
content.

## Writing Numeric Values

Write automatically converts numeric values to strings when writing.
This example shows writing different numeric types to a file. The conversion is
handled implicitly by the method.

numeric_write.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\numbers.txt", True)

file.Write "Integer: "
file.Write 42
file.Write vbCrLf
file.Write "Float: "
file.Write 3.14159
file.Close

Set file = Nothing
Set fso = Nothing

The script writes both integer and floating-point numbers to a file. Note the
use of vbCrLf for manual line breaks. The numeric values are
converted to strings automatically. The output shows numbers as text in the
file.

## Appending to Existing Files

This example demonstrates using Write to append content to an
existing file. It shows opening a file in append mode rather than create mode.
Existing content is preserved while new content is added.

append_write.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\existing.txt", 8, True)

file.Write "Appended text"
file.Close

Set file = Nothing
Set fso = Nothing

The script opens a file in append mode (8) rather than creating a new file. The
Write method adds content at the end of the file. The True
parameter creates the file if it doesn't exist. This is useful for log files and
data collection.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/s2esdf4x(v=vs.84))

In this article, we have explored the Write method in VBScript,
covering its usage and practical applications. From basic file creation to
complex output formatting, these examples demonstrate reliable text file
manipulation. With this knowledge, you can enhance your file handling scripts
with precise output control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).