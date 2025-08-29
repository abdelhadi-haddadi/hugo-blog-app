+++
title = "PowerShell Out-String"
date = 2025-08-29T20:07:10.898+01:00
draft = false
description = "PowerShell Out-String tutorial shows how to use PowerShell to convert objects to strings."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Out-String

last modified February 15, 2025

In this article, we will cover the Out-String cmdlet in
PowerShell. This cmdlet converts input objects to strings. It is useful
for formatting and text processing.

## Out-String basics

The Out-String cmdlet converts PowerShell objects into strings. By
default, it preserves the formatting of the original output. This is helpful
when you need to process object data as plain text. The cmdlet can handle
single objects or collections.

## Basic Out-String usage

The simplest way to use Out-String is by piping objects to it. This
converts the objects to their string representation. The output maintains the
default formatting. This is useful for saving or processing output as text.

outstring1.ps1
  

Get-Process | Out-String

This command retrieves all processes and converts them to strings. The output
looks identical to the default console display. The difference is it's now
a string object rather than process objects.

## Out-String with -Width parameter

The -Width parameter controls the line width of the output. By
default, PowerShell uses the console width. You can specify a different width
to control text wrapping. This is useful for consistent formatting.

outstring2.ps1
  

Get-Process | Format-Table -AutoSize | Out-String -Width 120

This command formats processes as a table and sets the output width to 120
characters. The -AutoSize parameter ensures columns fit their
content. The wide width prevents unwanted line breaks in the output.

## Out-String with -Stream parameter

The -Stream parameter outputs strings line by line instead of as
a single string. This creates an array of strings, one per line. It's useful
when you need to process output line by line. Each line becomes a separate
array element.

outstring3.ps1
  

Get-Service | Out-String -Stream

This command converts service information to an array of strings. You can now
process each line individually. The output can be piped to other cmdlets that
work with string arrays.

## Out-String with Format-List

Combining Out-String with Format-List creates detailed
text output. This shows all properties of objects in a list format. The result
is a string containing the formatted information. This is useful for reports.

outstring4.ps1
  

Get-Process -Name "notepad" | Format-List * | Out-String

This command gets Notepad processes and formats all properties as a list. The
Out-String converts this to a string. The output contains detailed
process information in text form.

## Out-String for file output

Out-String is often used when saving output to files. It ensures
the file contains properly formatted text. You can pipe the string output to
Out-File. This creates a text file with the command results.

outstring5.ps1
  

Get-Service | Out-String | Out-File services.txt

This command saves service information to a text file. The Out-String
converts the objects to strings first. The file will contain the same formatted
output you see in the console.

## Out-String with Select-Object

You can combine Out-String with Select-Object to create
custom text output. This lets you choose specific properties to include. The
result is a string containing only the selected properties. This is good for
creating focused reports.

outstring6.ps1
  

Get-Process | Select-Object Name, CPU, Id | Out-String

This command selects only the Name, CPU, and ID properties of processes. The
Out-String converts this to a formatted text output. The result is
a cleaner, more focused display of process information.

## Out-String with custom formatting

For complete control over output formatting, combine formatting cmdlets with
Out-String. You can create tables with specific column widths and
headings. The final output is a perfectly formatted text block. This is ideal
for professional reports.

outstring7.ps1
  

Get-Process | Format-Table @{Label="Process";Expression={$_.Name};Width=30},
    @{Label="PID";Expression={$_.Id};Width=10},
    @{Label="CPU(s)";Expression={$_.CPU};Width=10} | Out-String

This command creates a custom formatted table of process information. Each
column has specific width and heading. The Out-String converts
this to a text string. The output is neatly aligned and professional.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Out-String cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).