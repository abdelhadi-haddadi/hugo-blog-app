+++
title = "PowerShell Move-Item"
date = 2025-08-29T20:07:06.313+01:00
draft = false
description = "PowerShell Move-Item tutorial shows how to use PowerShell to move files and directories."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Move-Item

last modified February 15, 2025

In this article, we will cover the Move-Item cmdlet in
PowerShell. This cmdlet moves files and directories from one location
to another.

## Move-Item basics

The Move-Item cmdlet moves an item from one location to
another. It can move files, directories, and registry keys. The original
item is deleted after the move operation. Wildcards are supported for
moving multiple items at once.

## Basic Move-Item usage

The simplest way to use Move-Item is with source and destination
paths. The source is the item to move, and destination is the target location.
If the destination is a directory, the item keeps its original name.

move1.ps1
  

Move-Item -Path "C:\temp\file1.txt" -Destination "C:\backup\"

This command moves file1.txt from C:\temp to C:\backup. The file retains
its name in the new location. The original file is deleted from the source.

## Move and rename a file

You can rename a file while moving it by specifying a new name in the
destination path. This combines moving and renaming into a single operation.
The destination must include the new filename.

move2.ps1
  

Move-Item -Path "C:\temp\file1.txt" -Destination "C:\backup\file2.txt"

This moves file1.txt to C:\backup and renames it to file2.txt. Both the
location and name of the file are changed in one command.

## Move multiple files with wildcards

Wildcards can be used to move multiple files matching a pattern. The asterisk
(*) represents any sequence of characters. This is useful for moving groups
of files with similar names or extensions.

move3.ps1
  

Move-Item -Path "C:\temp\*.log" -Destination "C:\logs\"

This command moves all .log files from C:\temp to C:\logs. Each file keeps
its original name. Only files matching the pattern are affected.

## Move a directory

Directories can be moved just like files. The entire directory structure
is preserved during the move. All contents within the directory are moved
along with it.

move4.ps1
  

Move-Item -Path "C:\temp\old_data" -Destination "C:\archive\"

This moves the old_data directory from C:\temp to C:\archive. The directory
and all its contents are relocated. The operation maintains the directory
structure.

## Force move operation

The -Force parameter allows moving items that would normally be restricted.
This includes hidden or read-only files. Use with caution as it overrides
some safety checks.

move5.ps1
  

Move-Item -Path "C:\temp\hidden.txt" -Destination "C:\backup\" -Force

This command moves a hidden file that would otherwise be skipped. The -Force
parameter ensures the operation proceeds despite the file's attributes.

## Move with confirmation prompt

The -Confirm parameter adds a safety check before moving items. PowerShell
prompts for confirmation before executing the move. This helps prevent
accidental data movement.

move6.ps1
  

Move-Item -Path "C:\temp\important.txt" -Destination "D:\backup\" -Confirm

This command will prompt before moving important.txt. The user must confirm
the operation by typing 'Y' or 'A'. This adds an extra layer of protection
for critical files.

## Move with WhatIf simulation

The -WhatIf parameter shows what would happen without actually moving files.
This is useful for testing move operations before executing them. No changes
are made to the file system.

move7.ps1
  

Move-Item -Path "C:\temp\*.tmp" -Destination "C:\temp\old\" -WhatIf

This command displays what would happen if the move was executed. The output
shows which files would be moved where. The actual files remain unchanged.

PS C:\&gt; .\move7.ps1
What if: Performing the operation "Move File" on target "Item: C:\temp\file1.tmp Destination: C:\temp\old\file1.tmp".
What if: Performing the operation "Move File" on target "Item: C:\temp\file2.tmp Destination: C:\temp\old\file2.tmp".

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Move-Item cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).