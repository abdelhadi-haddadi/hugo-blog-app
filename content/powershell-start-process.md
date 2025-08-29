+++
title = "PowerShell Start-Process"
date = 2025-08-29T20:07:18.780+01:00
draft = false
description = "PowerShell Start-Process tutorial shows how to use PowerShell to start new processes and applications."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Start-Process

last modified February 15, 2025

In this article, we will cover the Start-Process cmdlet in
PowerShell. This cmdlet starts one or more processes on the local computer.
It provides extensive control over how processes are launched.

## Process basics

The Start-Process cmdlet launches new processes with various options.
It can run executables, scripts, or documents with associated applications.
Unlike directly calling an executable, it provides more control over execution.
Parameters allow setting window styles, credentials, and working directories.

## Basic Start-Process usage

The simplest way to use Start-Process is with just a file name.
This launches the default application for the file type. For executables,
it starts the program directly. The process runs independently of PowerShell.

start1.ps1
  

Start-Process notepad.exe

This command launches Notepad. The process runs in a separate window.
PowerShell continues immediately without waiting for Notepad to close.

## Start process with arguments

Many applications accept command-line arguments. The -ArgumentList parameter
passes these to the new process. Arguments should be provided as an array.
This is useful for configuring application behavior at launch.

start2.ps1
  

Start-Process notepad.exe -ArgumentList "C:\temp\notes.txt"

This command opens Notepad with a specific file. If the file doesn't exist,
Notepad will offer to create it. The file path must be properly quoted.

## Run process as different user

Processes can be started with different credentials using -Credential.
This requires a PSCredential object with username and password. Useful for
running processes with elevated privileges. The user must have appropriate
permissions.

start3.ps1
  

$cred = Get-Credential
Start-Process cmd.exe -Credential $cred

This prompts for credentials then starts Command Prompt as that user.
The Get-Credential cmdlet shows a secure credential dialog. Password is
entered securely.

## Control window style

The -WindowStyle parameter controls how the process window appears.
Options include Normal, Minimized, Maximized, and Hidden. Useful for
background processes or scripts. Default is Normal window state.

start4.ps1
  

Start-Process notepad.exe -WindowStyle Minimized

This starts Notepad minimized in the taskbar. The window isn't visible
initially but appears in the taskbar. Useful for background applications.

## Wait for process completion

The -Wait parameter makes PowerShell wait until the process finishes.
Useful in scripts that depend on process completion. Without it, PowerShell
continues immediately. Combine with -PassThru to get process information.

start5.ps1
  

Start-Process notepad.exe -Wait
Write-Host "Notepad has closed"

PowerShell waits until Notepad is closed before continuing. The message
appears only after Notepad exits. Useful for sequential operations.

## Redirect output to files

Process output can be redirected to files with -RedirectStandardOutput and
-RedirectStandardError. Useful for capturing command output to logs.
Combine with -NoNewWindow for console applications.

start6.ps1
  

Start-Process cmd.exe -ArgumentList "/c dir" `
    -NoNewWindow -RedirectStandardOutput out.txt

Runs dir command and saves output to out.txt. The /c argument tells cmd
to terminate after execution. -NoNewWindow keeps output in PowerShell.

## Start process with working directory

The -WorkingDirectory parameter sets the process's startup directory.
Affects where the process looks for files by default. Different from
PowerShell's current directory. Useful when paths are relative.

start7.ps1
  

Start-Process cmd.exe -WorkingDirectory "C:\temp"

Starts Command Prompt with C:\temp as current directory. Any file operations
will use this location by default. Doesn't affect PowerShell's location.

## Start web URL in default browser

Start-Process can open URLs in the default web browser. Just provide
the URL instead of an executable path. The system handles protocol association.
Works with other protocols like mailto: too.

start8.ps1
  

Start-Process "https://www.zetcode.com"

Opens the ZetCode website in default browser. No need to specify browser
executable. System uses registered URL handler for https protocol.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Start-Process cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).