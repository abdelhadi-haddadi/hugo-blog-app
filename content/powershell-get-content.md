+++
title = "PowerShell Get-Content"
date = 2025-08-29T20:06:56.257+01:00
draft = false
description = "PowerShell Get-Content tutorial shows how to use PowerShell to read and manipulate file contents."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-Content

last modified February 15, 2025

In this article, we will cover the Get-Content cmdlet in
PowerShell. This cmdlet reads the contents of files and returns them as
strings or arrays of strings.

## File content basics

The Get-Content cmdlet is used to read text files line by line.
It can handle various file encodings and supports streaming large files.
By default, it returns each line as a separate string in an array. The cmdlet
is essential for file manipulation and log processing in PowerShell.

## Basic Get-Content usage

The simplest way to use Get-Content is with just a file path.
This reads the entire file and outputs each line as a separate string.
The output can be stored in a variable or processed further in the pipeline.

content1.ps1
  

Get-Content -Path "C:\logs\app.log"

This command reads the contents of app.log and outputs each line. The
default behavior is to read the file as text with UTF-8 encoding.

## Reading specific number of lines

You can limit the number of lines read using the -TotalCount parameter.
This is useful for reading just the beginning of a file, like a header.
The parameter accepts a positive integer specifying how many lines to read.

content2.ps1
  

Get-Content -Path "C:\logs\app.log" -TotalCount 10

This command reads only the first 10 lines of the log file. It's efficient
for quick inspections without loading the entire file into memory.

PS C:\&gt; .\content2.ps1

2025-02-15 08:00:01 INFO Application started
2025-02-15 08:00:02 DEBUG Loading configuration
2025-02-15 08:00:03 INFO Database connected
2025-02-15 08:00:04 WARN Missing optional module
2025-02-15 08:00:05 INFO User admin logged in

## Reading from a specific position

The -Tail parameter reads lines from the end of the file. This is particularly
useful for viewing recent log entries. Combined with -Wait, it can monitor
log files in real-time as they grow.

content3.ps1
  

Get-Content -Path "C:\logs\app.log" -Tail 5

This command displays the last 5 lines of the log file. It's equivalent to
the Unix 'tail' command and is commonly used for log monitoring.

## Reading files as single string

By default, Get-Content returns an array of strings (lines). Using the
-Raw parameter makes it return the entire content as a single string.
This is useful when you need the complete file content without line breaks.

content4.ps1
  

Get-Content -Path "C:\config\settings.json" -Raw

This command reads the JSON file as one continuous string. The -Raw parameter
preserves all whitespace and formatting exactly as in the file.

## Filtering file content

You can filter file content using Where-Object in the pipeline. This allows
searching for specific patterns or excluding certain lines. Regular expressions
can be used for more complex pattern matching.

content5.ps1
  

Get-Content -Path "C:\logs\app.log" | Where-Object { $_ -match "ERROR" }

This command reads the log file and returns only lines containing "ERROR".
The $_ variable represents the current line being processed in the pipeline.

## Reading files with different encodings

PowerShell can read files with various character encodings using the
-Encoding parameter. Common encodings include UTF8, ASCII, Unicode,
and UTF7. This is important when working with files from different systems.

content6.ps1
  

Get-Content -Path "C:\data\legacy.txt" -Encoding ASCII

This command reads the file using ASCII encoding. Always specify the correct
encoding to prevent character corruption, especially with international text.

## Monitoring file changes

The -Wait parameter keeps the file open and outputs new content as it's
appended. This creates a real-time monitoring solution for log files.
The command continues running until manually stopped with Ctrl+C.

content7.ps1
  

Get-Content -Path "C:\logs\app.log" -Wait

This command monitors the log file and displays new lines as they're added.
It's perfect for real-time debugging and system monitoring scenarios.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-Content cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).