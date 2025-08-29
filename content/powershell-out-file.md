+++
title = "PowerShell Out-File"
date = 2025-08-29T20:07:09.799+01:00
draft = false
description = "PowerShell Out-File tutorial shows how to use PowerShell to write output to files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Out-File

last modified February 15, 2025

In this article, we will cover the Out-File cmdlet in PowerShell.
This cmdlet sends output to a file. It is useful for saving command results
or script output to disk. The cmdlet provides various parameters to control
file encoding and formatting.

## Out-File basics

The Out-File cmdlet writes output to a specified file. By default,
it creates a new file or overwrites an existing one. The cmdlet preserves the
formatting of the original output. It supports different character encodings
for international text. File paths can be absolute or relative.

## Basic Out-File usage

The simplest way to use Out-File is to pipe command output to it.
Specify the file path with the -FilePath parameter. The file will be created
in the current directory if no path is specified. This example shows basic
file output.

outfile1.ps1
  

Get-Process | Out-File -FilePath "processes.txt"

This command writes the list of running processes to processes.txt. The
output format matches what you see in the console. The file is created
in the current working directory.

## Appending to an existing file

To add content to an existing file without overwriting, use the -Append
parameter. This is useful for logging or accumulating data over time.
The file is created if it doesn't exist. Each new addition appears at
the end of the file.

outfile2.ps1
  

Get-Date | Out-File -FilePath "log.txt" -Append
"System check performed" | Out-File -FilePath "log.txt" -Append

This example appends the current date and a message to log.txt. Multiple
commands can write to the same file. Each entry appears on a new line.

## Controlling file encoding

By default, Out-File uses Unicode (UTF-16LE) encoding. You can
specify different encodings with the -Encoding parameter. Common options
include ASCII, UTF8, and UTF32. This is important for compatibility with
other systems or applications.

outfile3.ps1
  

"PowerShell output" | Out-File -FilePath "output.txt" -Encoding UTF8

This command writes text to output.txt using UTF-8 encoding. UTF-8 is
widely compatible with web applications and Linux systems. The file will
be smaller than with default Unicode encoding.

## Limiting line width

The -Width parameter controls the maximum line length in the output file.
This prevents long lines from being truncated in the output. The default
width is 80 characters. You can increase this for complex data.

outfile4.ps1
  

Get-Service | Out-File -FilePath "services.txt" -Width 200

This command writes service information to a file with 200-character lines.
Wider output preserves more data columns. Adjust based on your data and
viewing requirements.

## NoClobber protection

The -NoClobber parameter prevents accidental overwriting of existing files.
If the file exists, PowerShell generates an error instead of overwriting.
This is a safety feature for important files. Combine with -Force to
override the protection.

outfile5.ps1
  

"Important data" | Out-File -FilePath "data.txt" -NoClobber

This command fails if data.txt already exists. The existing file remains
unchanged. Remove -NoClobber or use -Force to overwrite existing files.

## Redirecting error output

You can capture error messages in the output file using redirection.
The 2&gt;&amp;1 operator redirects error output to the success stream. This
allows complete logging of command results, including errors.

outfile6.ps1
  

Get-ChildItem C:\Nonexistent 2&gt;&amp;1 | Out-File -FilePath "errors.txt"

This command attempts to list a nonexistent directory. The error message
is captured in errors.txt. Normal output would also be included if present.

## Formatting before output

You can format data before writing to a file using formatting cmdlets.
Format-Table and Format-List adjust the output
presentation. This provides control over how data appears in the file.

outfile7.ps1
  

Get-Process | Select-Object Name, CPU | Format-Table -AutoSize | Out-File "process_cpu.txt"

This command creates a table of process names and CPU usage. The -AutoSize
parameter adjusts column widths. The formatted table is written to the file.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Out-File cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).