+++
title = "VBScript WriteBlankLines Method"
date = 2025-08-29T20:15:17.650+01:00
draft = false
description = "Learn about VBScript WriteBlankLines method, including text file formatting, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript WriteBlankLines Method

last modified April 9, 2025

The WriteBlankLines method in VBScript is part of the
TextStream object. It writes a specified number of blank lines to
a text file. This method is useful for formatting text files with proper spacing.
It helps create readable and well-structured output files in scripts.

WriteBlankLines works with files opened for writing or appending.
The method takes an integer parameter specifying how many blank lines to insert.
This tutorial covers WriteBlankLines with practical examples to
demonstrate its usage in file operations.

## WriteBlankLines Method Overview

The WriteBlankLines method writes newline characters to a text
file. It's available through the TextStream object in VBScript.
The method requires a file to be opened in write or append mode first.

Key features include simple blank line insertion and precise line count control.
It doesn't affect existing file content before the current position.
WriteBlankLines is often used with other text writing methods.
Understanding this method helps create better formatted output files.

## Basic Blank Line Insertion

This example demonstrates the simplest use of WriteBlankLines to
add blank lines to a file. It shows how to create a file and insert spacing.
The script writes some text followed by two blank lines.

basic_writeblanklines.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\output.txt")

file.WriteLine "This is the first line of text."
file.WriteBlankLines 2
file.WriteLine "This appears after two blank lines."

file.Close
Set file = Nothing
Set fso = Nothing

The script creates a new file and writes an initial line. It then inserts two
blank lines using WriteBlankLines. Finally, it adds another text
line. The resulting file will have clear visual separation between sections.

## Creating Section Headers

This example shows how to use WriteBlankLines to create visually
distinct sections in a log file. It demonstrates practical formatting for
better readability. Blank lines help separate different log entries clearly.

section_headers.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\log.txt", 8, True) ' Open for appending

file.WriteBlankLines 1
file.WriteLine "===== SYSTEM LOG ENTRY ====="
file.WriteBlankLines 1
file.WriteLine "Timestamp: " &amp; Now
file.WriteLine "Event: User login detected"
file.WriteBlankLines 2

file.Close
Set file = Nothing
Set fso = Nothing

The script appends to an existing log file, starting with a blank line. It adds
a section header surrounded by single blank lines. After the log details, it
inserts two blank lines to separate from future entries. This creates a clean,
organized log format.

## Generating Formatted Reports

This example demonstrates using WriteBlankLines in report
generation. It shows how blank lines can improve report structure. The method
helps create professional-looking document formatting.

report_formatting.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set report = fso.CreateTextFile("C:\temp\monthly_report.txt")

report.WriteLine "MONTHLY SALES REPORT"
report.WriteBlankLines 1
report.WriteLine "Region: North"
report.WriteLine "Total Sales: $12,450"
report.WriteBlankLines 2
report.WriteLine "Region: South"
report.WriteLine "Total Sales: $9,780"

report.Close
Set report = Nothing
Set fso = Nothing

The script creates a sales report with clear regional sections. The title has a
single blank line below it for emphasis. Each region's data is separated by two
blank lines. This formatting makes the report easier to read and understand.

## Creating Multi-Paragraph Documents

This example shows how WriteBlankLines can simulate paragraphs in
generated documents. It demonstrates text separation similar to word processing.
The method helps create properly spaced textual content.

paragraph_formatting.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set doc = fso.CreateTextFile("C:\temp\document.txt")

doc.WriteLine "VBScript File Operations"
doc.WriteBlankLines 1
doc.WriteLine "The WriteBlankLines method provides simple way to format text files."
doc.WriteLine "It inserts blank lines between sections of content."
doc.WriteBlankLines 1
doc.WriteLine "Proper spacing improves document readability significantly."
doc.WriteLine "This is especially important for generated reports."

doc.Close
Set doc = Nothing
Set fso = Nothing

The script creates a document with paragraph-like spacing. Each "paragraph" is
separated by a blank line. The title stands out with spacing below it. This
formatting mimics traditional document structure for better readability.

## Combining with Other Writing Methods

This example shows WriteBlankLines used alongside other text
writing methods. It demonstrates comprehensive file output techniques. The
script combines different writing approaches for complete file generation.

combined_writing.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set output = fso.CreateTextFile("C:\temp\combined.txt")

output.Write "Configuration" &amp; vbTab &amp; "Value" &amp; vbCrLf
output.WriteBlankLines 1
output.Write "Timeout:" &amp; vbTab &amp; "30" &amp; vbCrLf
output.Write "Retries:" &amp; vbTab &amp; "3" &amp; vbCrLf
output.WriteBlankLines 2
output.WriteLine "End of configuration"

output.Close
Set output = Nothing
Set fso = Nothing

The script creates a configuration file with mixed formatting. It uses tabs for
alignment and blank lines for separation. The header and data are separated by a
blank line. The footer has two blank lines above it for clear distinction.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/saxfz1x4(v=vs.84))

In this article, we have explored the WriteBlankLines method in
VBScript, covering its usage and practical applications. From simple spacing to
complex document formatting, these examples demonstrate effective file output
techniques. With this knowledge, you can enhance your file generation scripts
with professional formatting.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).