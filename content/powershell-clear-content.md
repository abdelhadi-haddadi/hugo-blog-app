+++
title = "PowerShell Clear-Content"
date = 2025-08-29T20:06:45.166+01:00
draft = false
description = "PowerShell Clear-Content tutorial shows how to use PowerShell to clear content from files without deleting them."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Clear-Content

last modified February 15, 2025

In this article, we will cover the Clear-Content cmdlet in
PowerShell. This cmdlet removes content from files without deleting the
files themselves.

## Clear-Content basics

The Clear-Content cmdlet deletes the contents of files but
keeps the files intact. It works with various file types including text,
JSON, and XML. The cmdlet is part of the Microsoft.PowerShell.Management
module. It's useful for resetting log files or clearing configuration data.

## Basic Clear-Content usage

The simplest way to use Clear-Content is by specifying a file
path. This will empty the file while preserving its attributes. The file
will have zero bytes after execution. You need proper permissions to modify
the target file.

clear1.ps1
  

Clear-Content -Path "C:\logs\app.log"

This command clears the content of app.log in the C:\logs directory. The
file remains but becomes empty. No confirmation is requested by default.

## Clear multiple files

Clear-Content can process multiple files at once using wildcards.
This is efficient for batch operations on similar files. The command supports
standard PowerShell wildcard patterns. All matching files will be cleared.

clear2.ps1
  

Clear-Content -Path "C:\temp\*.tmp"

This command clears all .tmp files in the C:\temp directory. Each file's
content is removed individually. The files themselves are not deleted.

## Clear content with confirmation

For safety, you can add the -Confirm parameter to prompt before clearing.
This helps prevent accidental data loss. PowerShell will ask for confirmation
for each file. You can respond to each prompt individually.

clear3.ps1
  

Clear-Content -Path "C:\data\config.ini" -Confirm

This command will prompt before clearing config.ini. You must confirm by
typing 'Y' or 'A' to proceed. The prompt shows the file path being affected.

## Clear content from piped files

You can pipe file objects to Clear-Content from other cmdlets.
This enables complex file selection logic. The pipeline is a powerful feature
of PowerShell. It allows chaining commands together.

clear4.ps1
  

Get-ChildItem -Path "C:\backups\*.bak" | 
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } |
    Clear-Content

This command finds .bak files older than 30 days and clears their content.
The pipeline first gets files, filters them, then clears their content.
Only matching files are processed.

## Clear content with WhatIf

The -WhatIf parameter shows what would happen without making changes. This
is useful for testing commands. It displays the files that would be cleared.
No actual modifications are made to files.

clear5.ps1
  

Clear-Content -Path "C:\temp\test*.txt" -WhatIf

This command simulates clearing all test*.txt files in C:\temp. The output
shows which files would be affected. Use this to verify your file patterns.

## Clear content and preserve read-only files

By default, Clear-Content fails on read-only files. The -Force
parameter overrides this behavior. It clears content even in read-only files.
Use caution as this bypasses file protection.

clear6.ps1
  

Clear-Content -Path "C:\system\settings.cfg" -Force

This command clears settings.cfg even if it's read-only. The -Force parameter
overrides the read-only attribute. The file remains read-only afterward.

## Clear content with alternate credentials

When working with protected files, you might need alternate credentials.
The -Credential parameter allows specifying different user permissions.
This is useful for administrative tasks on remote systems.

clear7.ps1
  

$cred = Get-Credential
Clear-Content -Path "\\server\share\admin.log" -Credential $cred

This command prompts for credentials before clearing admin.log. The credentials
are used for the file operation. This works with both local and network paths.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Clear-Content cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).