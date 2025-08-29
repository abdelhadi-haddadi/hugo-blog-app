+++
title = "PowerShell Add-Content"
date = 2025-08-29T20:06:44.029+01:00
draft = false
description = "PowerShell Add-Content tutorial shows how to use PowerShell to append content to files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Add-Content

last modified February 15, 2025

In this article, we will cover the Add-Content cmdlet in
PowerShell. This cmdlet appends content to files without overwriting
existing content. It's useful for logging and data collection.

## Add-Content basics

The Add-Content cmdlet adds content to a specified file. Unlike
Set-Content, it preserves existing content. It can add text,
arrays, or file contents. The cmdlet creates the file if it doesn't exist.
It supports various encodings and can work with multiple files.

## Basic Add-Content usage

The simplest way to use Add-Content is with a file path and
content string. This appends the text to the specified file. If the file
doesn't exist, it will be created. The default encoding is UTF-8.

addcontent1.ps1
  

Add-Content -Path "log.txt" -Value "New log entry"

This command appends "New log entry" to log.txt. If log.txt doesn't exist,
it will be created. Each execution adds a new line to the file.

## Appending multiple lines

You can append multiple lines by passing an array of strings. Each array
element becomes a separate line in the file. This is useful for adding
structured data. The -Value parameter accepts both single and multiple values.

addcontent2.ps1
  

$lines = @("First line", "Second line", "Third line")
Add-Content -Path "data.txt" -Value $lines

This command adds three lines to data.txt. Each string in the array becomes
a separate line. The file will contain these lines in the specified order.

PS C:\&gt; Get-Content data.txt
First line
Second line
Third line

## Appending with different encoding

You can specify the file encoding using the -Encoding parameter. This is
important for compatibility with different systems. Common encodings include
UTF8, ASCII, and Unicode. The default is UTF8NoBOM in PowerShell 6+.

addcontent3.ps1
  

Add-Content -Path "output.txt" -Value "Text with special chars: äöü" -Encoding UTF8

This command appends text with special characters using UTF-8 encoding.
The encoding ensures proper handling of non-ASCII characters. Choose the
encoding based on your requirements.

## Appending to multiple files

Add-Content can append to multiple files simultaneously. Provide
multiple paths or use wildcards. This is efficient for batch operations.
All specified files receive the same content.

addcontent4.ps1
  

Add-Content -Path "file1.txt", "file2.txt" -Value "Common content"

This command appends "Common content" to both file1.txt and file2.txt.
If either file doesn't exist, it will be created. Wildcards like *.log
can also be used.

## Using pipeline input

Add-Content can accept input from the pipeline. This allows
dynamic content generation. The input can come from other cmdlets or
functions. This is powerful for processing and logging data.

addcontent5.ps1
  

Get-Date | Add-Content -Path "timestamps.log"

This command appends the current date and time to timestamps.log. The
Get-Date output is piped directly to Add-Content.
This pattern is common for logging scenarios.

## Appending with confirmation

For safety, you can add confirmation prompts. The -Confirm parameter
prompts before writing. This prevents accidental modifications. Useful
when working with important files.

addcontent6.ps1
  

Add-Content -Path "important.txt" -Value "Critical data" -Confirm

This command shows a confirmation prompt before appending. You must
confirm the action by typing 'Y'. The prompt includes the target file path.

## Using -NoNewline parameter

By default, Add-Content adds a newline after each value. The
-NoNewline parameter prevents this. Useful when you need to append without
line breaks. Multiple appends will be on the same line.

addcontent7.ps1
  

Add-Content -Path "output.txt" -Value "Start: " -NoNewline
Add-Content -Path "output.txt" -Value "Continued text"

The first command adds "Start: " without a newline. The second appends
"Continued text" on the same line. The file will contain "Start: Continued text".

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Add-Content cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).