+++
title = "PowerShell Stop-Process"
date = 2025-08-29T20:07:20.001+01:00
draft = false
description = "PowerShell Stop-Process tutorial shows how to use PowerShell to terminate running processes."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Stop-Process

last modified February 15, 2025

In this article, we will cover the Stop-Process cmdlet in
PowerShell. This cmdlet terminates running processes on a system. It is
a powerful tool for process management and troubleshooting.

## Process termination basics

Process termination is the act of stopping a running program instance.
The Stop-Process cmdlet sends a termination signal to one or
more processes. Processes can be identified by name or process ID (PID).
Termination can be forced if a process doesn't respond to normal shutdown.

## Basic Stop-Process usage

The simplest way to use Stop-Process is with the -Name parameter.
This stops all processes matching the specified name. Wildcards are supported
for partial matching. The command requires administrative privileges for
some processes.

stop1.ps1
  

Stop-Process -Name "notepad"

This command terminates all running instances of Notepad. If no Notepad
processes are running, no action is taken. The command runs silently unless
errors occur.

## Stop process by ID

Processes can be precisely terminated using their unique process ID (PID).
This is useful when you need to target a specific instance. Use the -Id
parameter followed by the PID. You can find PIDs using Get-Process.

stop2.ps1
  

Stop-Process -Id 1234

This command terminates the process with ID 1234. Only one process will be
stopped since PIDs are unique. The command fails if the PID doesn't exist.

## Forcefully stop a process

Some processes may resist normal termination attempts. The -Force parameter
can be used to compel termination. This bypasses any confirmation prompts.
Use with caution as it may cause data loss in applications.

stop3.ps1
  

Stop-Process -Name "hangapp" -Force

This command forcefully terminates all instances of "hangapp". The -Force
parameter ensures the process is killed immediately. No save prompts are
shown to the user.

## Stop multiple processes

Multiple processes can be stopped at once by providing multiple names or
IDs. Separate the values with commas. This is efficient for batch termination
of related processes. Wildcards can be used with process names.

stop4.ps1
  

Stop-Process -Name "chrome","firefox","edge"

This command terminates all instances of Chrome, Firefox, and Edge browsers.
Each process name is treated separately. The command attempts to stop all
matching processes.

## Confirm before stopping

The -Confirm parameter adds a safety check before process termination.
This prompts the user to confirm each process stop. It's useful when you
want to prevent accidental termination. The prompt shows the process name
and ID.

stop5.ps1
  

Stop-Process -Name "importantapp" -Confirm

This command prompts for confirmation before stopping "importantapp". The
user must explicitly approve each termination. This adds a layer of
protection against mistakes.

## Stop processes using pipeline

Stop-Process can accept process objects from the pipeline.
This allows combining with Get-Process for powerful filtering. You can
first select processes then terminate them. This method is very flexible.

stop6.ps1
  

Get-Process -Name "oldapp*" | Stop-Process

This command finds all processes starting with "oldapp" and stops them.
The pipeline passes the process objects directly to Stop-Process. No
intermediate variables are needed.

## Stop processes with WhatIf

The -WhatIf parameter shows what would happen without actually stopping
processes. This is useful for testing commands. It displays which processes
would be terminated. No changes are made to the system.

stop7.ps1
  

Stop-Process -Name "testapp" -WhatIf

This command simulates stopping "testapp" processes. The output shows what
would occur if executed. It's a safe way to verify command behavior before
running it for real.

## Stop processes by window title

While not directly supported, you can stop processes by window title using
a combination of cmdlets. This requires filtering processes by their
MainWindowTitle property. It's useful for GUI applications.

stop8.ps1
  

Get-Process | Where-Object { $_.MainWindowTitle -like "*Untitled*" } | Stop-Process

This command finds processes with "Untitled" in their window title and stops
them. The Where-Object cmdlet filters by window title. This approach works
best for applications with visible windows.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Stop-Process cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).