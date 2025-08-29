+++
title = "PowerShell Set-Content"
date = 2025-08-29T20:07:15.401+01:00
draft = false
description = "PowerShell Set-Content tutorial shows how to use PowerShell to write content to files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Set-Content

last modified February 15, 2025

In this article, we will cover the Set-Content cmdlet in
PowerShell. This cmdlet writes content to files, replacing existing content.
It's useful for creating or updating text files programmatically.

## Set-Content basics

The Set-Content cmdlet writes new content or replaces the content
in a file. It differs from Add-Content which appends content.
By default, it uses Unicode (UTF-16LE) encoding. You can specify different
encodings with the -Encoding parameter.

## Basic Set-Content usage

The simplest way to use Set-Content is with a file path and content.
This creates a new file or overwrites an existing one. The content can be
a string or an array of strings. Each array element becomes a line in the file.

setcontent1.ps1
  

Set-Content -Path "example.txt" -Value "Hello, PowerShell!"

This command creates or overwrites example.txt with "Hello, PowerShell!".
If the file exists, all previous content is replaced. The file is created
in the current directory if no full path is specified.

## Writing multiple lines to a file

You can write multiple lines by passing an array of strings to -Value.
Each element in the array becomes a separate line in the output file.
This is useful for creating structured text files or configuration files.

setcontent2.ps1
  

$content = @("First line", "Second line", "Third line")
Set-Content -Path "multiline.txt" -Value $content

This creates multiline.txt with three separate lines. The @() syntax creates
an array. Each string in the array becomes a line in the output file.

PS C:\&gt; Get-Content multiline.txt
First line
Second line
Third line

## Using pipeline input

Set-Content can accept input from the pipeline. This allows you to
process data and write it to a file in one command. The pipeline input is
treated as the content to write. This is powerful when combined with other
cmdlets.

setcontent3.ps1
  

Get-Process | Out-String | Set-Content -Path "processes.txt"

This command gets all running processes, converts them to a string, and
writes them to processes.txt. The Out-String cmdlet converts
the process objects to text format. The file contains the same output you
would see in the console.

## Specifying file encoding

By default, Set-Content uses Unicode encoding. You can specify
different encodings with the -Encoding parameter. Common options include
UTF8, ASCII, and UTF32. This is important for compatibility with other systems.

setcontent4.ps1
  

Set-Content -Path "utf8file.txt" -Value "UTF-8 encoded text" -Encoding UTF8

This creates a file with UTF-8 encoding instead of the default Unicode.
The -Encoding parameter ensures the file uses the specified character
encoding. This is crucial when working with systems that expect specific
encodings.

## Using -NoNewline parameter

The -NoNewline parameter prevents Set-Content from adding a
newline at the end of the file. By default, it adds a newline character.
This is useful when you need precise control over file content.

setcontent5.ps1
  

Set-Content -Path "nonewline.txt" -Value "No newline here" -NoNewline

This creates a file without a trailing newline character. The file contains
exactly the specified string. This can be important for certain file formats
or when concatenating files.

## Setting file content conditionally

You can use -WhatIf and -Confirm parameters for safe file operations.
-WhatIf shows what would happen without making changes. -Confirm prompts
before overwriting files. These are useful for scripts that modify files.

setcontent6.ps1
  

Set-Content -Path "important.txt" -Value "New data" -WhatIf

This shows what would happen without actually modifying the file. The
output indicates the file would be updated. Remove -WhatIf to actually
make the changes.

PS C:\&gt; .\setcontent6.ps1
What if: Performing the operation "Set Content" on target "Path: C:\important.txt".

## Using -Force to overwrite read-only files

The -Force parameter allows Set-Content to overwrite read-only
files. Normally, it would fail when trying to modify read-only files.
This bypasses the read-only attribute temporarily.

setcontent7.ps1
  

Set-Content -Path "readonly.txt" -Value "New content" -Force

This command updates readonly.txt even if it has the read-only attribute set.
The -Force parameter is necessary to modify protected files. Use with caution
as it overrides file protections.

## Source

[PowerShell Set-Content documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-content)

In this article, we have covered the Set-Content cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).