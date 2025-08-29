+++
title = "VBScript Win32_StartupCommand Class"
date = 2025-08-29T20:15:46.630+01:00
draft = false
description = "Learn about VBScript Win32_StartupCommand class, including querying startup programs, managing auto-run entries, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_StartupCommand Class

last modified April 9, 2025

The Win32_StartupCommand class in VBScript is part of Windows
Management Instrumentation (WMI). It provides information about programs that
run automatically at system startup or user login. This class is useful for
system administration and security auditing.

Win32_StartupCommand reveals startup entries from various locations
including the registry and startup folders. It helps identify potentially
malicious auto-run programs. This tutorial covers the class with practical
examples to demonstrate its usage.

## Win32_StartupCommand Class Overview

The Win32_StartupCommand class contains properties describing each
startup command. Key properties include Command,
Location, Name, and User. These reveal what
runs, where it's configured, and for which user.

The class covers startup entries from multiple locations: registry run keys,
startup folders, and scheduled tasks. It provides a unified view of all auto-run
programs. Understanding this class helps manage system startup behavior.

## Listing All Startup Commands

This basic example demonstrates how to query all startup commands on a system.
It connects to WMI, executes the query, and displays results. Each startup
entry's name, command, and location are shown.

list_startup_commands.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colStartupCommands = objWMIService.ExecQuery _
    ("SELECT * FROM Win32_StartupCommand")

For Each objStartup In colStartupCommands
    WScript.Echo "Name: " &amp; objStartup.Name
    WScript.Echo "Command: " &amp; objStartup.Command
    WScript.Echo "Location: " &amp; objStartup.Location
    WScript.Echo "User: " &amp; objStartup.User
    WScript.Echo "--------------------------------"
Next

The script connects to WMI using GetObject with the appropriate
namespace. It queries all instances of Win32_StartupCommand. The
loop iterates through results, displaying key properties for each entry.

## Filtering Startup Commands by Location

This example shows how to filter startup commands by their location. It queries
only entries from specific startup locations. The WHERE clause in the WQL query
enables this filtering capability.

filter_by_location.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colStartupCommands = objWMIService.ExecQuery _
    ("SELECT * FROM Win32_StartupCommand WHERE Location LIKE '%Startup%'")

WScript.Echo "Startup Folder Entries:"
WScript.Echo "======================="

For Each objStartup In colStartupCommands
    WScript.Echo "Name: " &amp; objStartup.Name
    WScript.Echo "Path: " &amp; objStartup.Command
    WScript.Echo "--------------------------------"
Next

The script filters for entries containing "Startup" in their location. This
targets programs launched from user startup folders. The LIKE operator allows
pattern matching in the WQL query. Only matching entries are processed.

## Finding Startup Commands for Specific User

This example demonstrates querying startup commands for a specific user account.
It uses the User property to filter results. This helps identify user-specific
auto-run programs.

user_specific_startup.vbs
  

targetUser = "DOMAIN\username"

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colStartupCommands = objWMIService.ExecQuery _
    ("SELECT * FROM Win32_StartupCommand WHERE User = '" &amp; targetUser &amp; "'")

WScript.Echo "Startup commands for user " &amp; targetUser &amp; ":"
WScript.Echo "===================================="

For Each objStartup In colStartupCommands
    WScript.Echo "Name: " &amp; objStartup.Name
    WScript.Echo "Location: " &amp; objStartup.Location
    WScript.Echo "Command: " &amp; objStartup.Command
    WScript.Echo "--------------------------------"
Next

The script defines a target user and includes it in the WQL query. Only startup
entries configured for that user are returned. Replace "DOMAIN\username" with
the actual user to investigate. This is useful for user profile management.

## Checking for Specific Startup Program

This example checks if a specific program is configured to run at startup. It
searches for entries matching a program name pattern. This can help detect
potentially unwanted auto-run programs.

check_specific_program.vbs
  

programName = "malware.exe"

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colStartupCommands = objWMIService.ExecQuery _
    ("SELECT * FROM Win32_StartupCommand WHERE Command LIKE '%" &amp; programName &amp; "%'")

If colStartupCommands.Count &gt; 0 Then
    WScript.Echo "Found " &amp; colStartupCommands.Count &amp; " startup entries for " &amp; programName
    For Each objStartup In colStartupCommands
        WScript.Echo "Location: " &amp; objStartup.Location
        WScript.Echo "User: " &amp; objStartup.User
    Next
Else
    WScript.Echo "No startup entries found for " &amp; programName
End If

The script searches for any startup command containing the specified program name.
The LIKE operator with wildcards (%) enables partial matching. Results indicate
if the program is configured to auto-run and where. This is useful for security
audits.

## Exporting Startup Commands to CSV File

This advanced example exports all startup commands to a CSV file. It creates a
structured report with all relevant properties. The script demonstrates file
handling combined with WMI queries.

export_to_csv.vbs
  

outputFile = "C:\temp\startup_commands.csv"

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.CreateTextFile(outputFile, True)

objFile.WriteLine "Name,Command,Location,User"

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colStartupCommands = objWMIService.ExecQuery _
    ("SELECT * FROM Win32_StartupCommand")

For Each objStartup In colStartupCommands
    line = """" &amp; objStartup.Name &amp; ""","
    line = line &amp; """" &amp; objStartup.Command &amp; ""","
    line = line &amp; """" &amp; objStartup.Location &amp; ""","
    line = line &amp; """" &amp; objStartup.User &amp; """"
    objFile.WriteLine line
Next

objFile.Close
WScript.Echo "Startup commands exported to " &amp; outputFile

The script creates a CSV file and writes a header row. It then queries all
startup commands and writes each as a properly formatted CSV line. Quotes handle
commas in the data fields. The result is a spreadsheet-ready report of all
startup entries.

## Source

[Win32_StartupCommand Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-startupcommand)

In this article, we have explored the Win32_StartupCommand class in
VBScript, covering its usage and practical applications. From basic listing to
advanced filtering and reporting, these examples demonstrate powerful startup
program management. With this knowledge, you can better control and audit
system auto-run behavior.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).