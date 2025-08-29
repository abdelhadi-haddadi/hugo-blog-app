+++
title = "VBScript Win32_Process Class"
date = 2025-08-29T20:15:44.394+01:00
draft = false
description = "Learn about VBScript Win32_Process class, including process creation, monitoring, and management. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_Process Class

last modified April 9, 2025

The Win32_Process class in VBScript provides access to Windows
process management through WMI. It allows querying, creating, and terminating
processes on local or remote systems. This class is part of Windows Management
Instrumentation (WMI) infrastructure. It offers extensive process-related
information and control capabilities.

Win32_Process enables system administrators to automate process
management tasks. It can retrieve detailed process properties like memory usage,
execution time, and command line arguments. This tutorial covers
Win32_Process with practical examples to demonstrate its usage.

## Win32_Process Class Overview

The Win32_Process class represents a process on a Windows system.
It contains properties like ProcessId, Name, ExecutablePath, and CommandLine.
Methods include Create for starting processes and Terminate for stopping them.

Key features include remote management and detailed process statistics. The class
requires WMI connection through GetObject with "winmgmts:" moniker.
Understanding this class helps create robust process management scripts.

## Listing All Running Processes

This example demonstrates how to list all running processes on a system. It shows
basic WMI connection setup and process enumeration. The script retrieves process
names and IDs for all active processes.

list_processes.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("Select * From Win32_Process")

For Each objProcess in colProcesses
    WScript.Echo "Process: " &amp; objProcess.Name &amp; " (ID: " &amp; objProcess.ProcessId &amp; ")"
Next

The script connects to WMI service and queries all Win32_Process instances. It
then iterates through the collection, displaying each process name and ID. This
provides a basic process listing similar to Task Manager's process tab.

## Creating a New Process

This example shows how to create a new process using Win32_Process. It launches
Notepad.exe with specified parameters. The Create method returns process ID and
execution status.

create_process.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set objProcess = objWMIService.Get("Win32_Process")
strCommand = "notepad.exe C:\temp\notes.txt"

intReturn = objProcess.Create(strCommand, Null, Null, intProcessID)

If intReturn = 0 Then
    WScript.Echo "Process created with ID: " &amp; intProcessID
Else
    WScript.Echo "Process creation failed. Error: " &amp; intReturn
End If

The script connects to WMI and gets the Win32_Process class. It calls Create
with the command line to execute. The method returns 0 on success, populating
the process ID variable. Error codes indicate various failure conditions.

## Terminating a Process by ID

This example demonstrates terminating a process by its Process ID. It shows how
to forcefully end a running process. The Terminate method stops execution
immediately.

terminate_process.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("Select * From Win32_Process Where ProcessId = 1234")

For Each objProcess in colProcesses
    intReturn = objProcess.Terminate(0)
    If intReturn = 0 Then
        WScript.Echo "Process terminated successfully"
    Else
        WScript.Echo "Failed to terminate process. Error: " &amp; intReturn
    End If
Next

The script queries for a specific process ID (replace 1234 with actual ID). It
calls Terminate on matching processes. The method returns 0 on success. This
approach allows precise process termination without affecting others.

## Getting Process Memory Usage

This example retrieves memory usage information for all processes. It shows how
to access performance-related properties. The script displays working set size
and virtual memory usage.

process_memory.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("Select * From Win32_Process")

For Each objProcess in colProcesses
    WScript.Echo "Process: " &amp; objProcess.Name
    WScript.Echo "  Working Set: " &amp; objProcess.WorkingSetSize &amp; " bytes"
    WScript.Echo "  Virtual Size: " &amp; objProcess.VirtualSize &amp; " bytes"
Next

The script enumerates all processes and displays memory statistics. WorkingSetSize
shows physical memory usage. VirtualSize indicates allocated virtual memory.
These metrics help identify resource-intensive processes.

## Finding Processes by Name

This example demonstrates searching for processes by executable name. It uses a
WQL query with WHERE clause to filter results. The script finds all instances of
a specified process.

find_process.vbs
  

strProcessName = "chrome.exe"
Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("Select * From Win32_Process Where Name = '" &amp; strProcessName &amp; "'")

WScript.Echo "Found " &amp; colProcesses.Count &amp; " instances of " &amp; strProcessName
For Each objProcess in colProcesses
    WScript.Echo "  PID: " &amp; objProcess.ProcessId &amp; ", Path: " &amp; objProcess.ExecutablePath
Next

The script searches for processes matching the specified name (chrome.exe). It
displays count of matches and details for each instance. ExecutablePath shows
full path to the process binary. This helps identify multiple instances of same
application.

## Source

[Win32_Process Class Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-process)

In this article, we have explored the Win32_Process class in
VBScript, covering its usage and practical applications. From process listing to
creation and termination, these examples demonstrate powerful process management
capabilities. With this knowledge, you can enhance your system administration
scripts with robust process control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).