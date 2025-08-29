+++
title = "PowerShell Get-Process"
date = 2025-08-29T20:07:03.027+01:00
draft = false
description = "PowerShell Get-Process tutorial shows how to use PowerShell to manage and monitor running processes."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-Process

last modified February 15, 2025

In this article, we will cover the Get-Process cmdlet in
PowerShell. This cmdlet retrieves information about running processes on a
system.

## Process basics

A process is an instance of a running program. Each process has a unique
identifier (PID), name, and resource usage statistics. Processes can be managed
through PowerShell using various cmdlets. The Get-Process cmdlet is
fundamental for process monitoring and management.

## Basic Get-Process usage

The simplest way to use Get-Process is without any parameters. This
lists all running processes on the system. The output includes process names,
IDs, and resource usage. Each process is represented as a Process object.

process1.ps1
  

Get-Process

This command retrieves all running processes. The output is formatted as
a table by default. You can see process names, IDs, and CPU usage.

## Get specific process by name

You can retrieve information about specific processes by name. Use the
-Name parameter followed by the process name. Wildcards are supported
for partial matching. This is useful when you need to check if a particular
application is running.

process2.ps1
  

Get-Process -Name "chrome"

This command returns all processes with "chrome" in their name. Multiple
processes are typically returned for applications like web browsers.

## Get process by ID

Processes can also be retrieved by their unique process ID (PID). This is
useful when you need precise identification. Use the -Id parameter followed
by the PID. Each running process has a unique numerical identifier.

process3.ps1
  

Get-Process -Id 6784

This command returns information about the process with ID 6784. Only one
process will be returned since PIDs are unique.

## Formatting process output

The default table format can be changed using Format-List for
detailed information. This shows all available properties of the process object.
You can also select specific properties to display using Select-Object.

process4.ps1
  

Get-Process -Name "notepad" | Format-List *

This command shows all properties of Notepad processes in list format.
The output includes memory usage, threads, and other detailed information.

## Filtering processes by CPU usage

You can filter processes based on their resource consumption. This example
shows processes using significant CPU resources. The Where-Object cmdlet is
used for filtering. This helps identify performance-intensive processes.

process5.ps1
  

Get-Process | Where-Object { $_.CPU -gt 10 }

This command lists processes using more than 10 seconds of CPU time. The
$_ variable represents the current process in the pipeline. Adjust the
threshold as needed for your analysis.

## Sorting processes by memory usage

Processes can be sorted by their memory consumption using Sort-Object. This
helps identify memory-intensive applications. The -Descending parameter shows
the highest consumers first. Memory usage is shown in kilobytes by default.

process6.ps1
  

Get-Process | Sort-Object -Property WS -Descending | Select-Object -First 5

This command shows the top 5 processes by working set memory. The WS property
represents the working set size. You can use PM for private memory instead.

## Getting process modules

The Modules property contains DLLs and other modules loaded by a process. This
can be useful for debugging or security analysis. Use Select-Object to expand
the Modules property. Each module shows its path and version information.

process7.ps1
  

Get-Process -Name "explorer" | Select-Object -ExpandProperty Modules

This command lists all modules loaded by the Windows Explorer process. The
output includes module names, paths, and memory addresses. This is useful for
advanced troubleshooting.

## Getting remote processes

Get-Process can retrieve processes from remote computers using the -ComputerName
parameter. This requires PowerShell Remoting to be enabled. The syntax is similar
to local process retrieval. You must have appropriate permissions on the remote
machine.

process8.ps1
  

Get-Process -ComputerName "Server01"

This command lists all processes running on the remote computer Server01. The
output format is identical to local process retrieval. Network latency may
affect performance.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-Process cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).