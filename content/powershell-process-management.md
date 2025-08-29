+++
title = "PowerShell Process Management"
date = 2025-08-29T20:07:06.328+01:00
draft = false
description = "Learn to manage Windows processes using PowerShell commands for system administration and automation."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Process Management

last modified February 15, 2025

This tutorial covers essential PowerShell commands for managing system processes.
Learn to view, stop, and control applications and services through cmdlets.

Processes are running program instances consuming system resources. PowerShell
provides powerful commands to interact with processes for system administration.

## Listing Processes

Use Get-Process to retrieve information about running processes:

processes.ps1
  

Get-Process

This command displays all active processes with details like ID, CPU usage, and
memory consumption. Add process names as parameters to filter results.

Get-Process

Executing without parameters lists all running processes in a table format.
Columns include Handles, CPU, and ProcessName.

PS C:\&gt; .\processes.ps1

Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
    435      25    62248      70972       1.58   9360   2 chrome
    258      15    15244      27208       0.09   4788   2 explorer

## Stopping Processes

Terminate processes using Stop-Process. Always exercise caution
when stopping system processes.

stop_process.ps1
  

Stop-Process -Id 1234 -Force
Stop-Process -Name "notepad" -Force

The first command stops a process by ID, while the second terminates all
instances of a named process. The -Force parameter ensures
immediate termination.

-Id 1234

Specifies the process ID to terminate. Obtain IDs using Get-Process.

-Name "notepad"

Targets all processes with the specified name. Wildcards are supported for
partial matches.

## Starting Processes

Launch applications with Start-Process:

start_process.ps1
  

Start-Process notepad -PassThru

This starts Notepad and returns a process object. The -PassThru
parameter enables further manipulation of the new process.

-PassThru

Returns a process object for the newly created process, allowing property
access or piping to other commands.

## Filtering Processes

Combine Get-Process with Where-Object for advanced
filtering:

filter_processes.ps1
  

Get-Process | Where-Object {$_.CPU -gt 100}

This pipeline shows processes using more than 100 seconds of CPU time. Adjust
the comparison value for different thresholds.

{$_.CPU -gt 100}

Filters processes where the CPU property exceeds 100 seconds. The $_
variable represents current pipeline object.

## Source

[PowerShell Documentation](https://docs.microsoft.com/en-us/powershell/)

Mastering process management in PowerShell enables efficient system monitoring
and resource control. These commands form the foundation for automation scripts
and administrative tasks.

## Author

Jan Bodnar is a software developer and technical writer with 15+ years of
experience. He specializes in creating comprehensive programming tutorials
and system administration guides.

List [all PowerShell tutorials](/powershell/).