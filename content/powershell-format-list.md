+++
title = "PowerShell Format-List"
date = 2025-08-29T20:06:54.018+01:00
draft = false
description = "PowerShell Format-List tutorial shows how to format command output as lists in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Format-List

last modified February 15, 2025

In this article, we will cover the Format-List cmdlet in
PowerShell. This cmdlet formats command output as a list of properties.

## Format-List basics

The Format-List cmdlet displays output as a list of properties.
Each property appears on a new line with its value. This is useful for viewing
all properties of an object. The default table view often truncates information.

## Basic Format-List usage

The simplest way to use Format-List is by piping any cmdlet's
output to it. This displays all properties in a vertical list format. The
asterisk (*) wildcard shows all available properties.

formatlist1.ps1
  

Get-Process | Format-List *

This command retrieves all processes and displays their full properties.
Each property appears on its own line for better readability.

## Display specific properties

You can select specific properties to display with Format-List.
This focuses on relevant information and reduces clutter. List the property
names separated by commas after the cmdlet.

formatlist2.ps1
  

Get-Process -Name "notepad" | Format-List Name, Id, CPU, StartTime

This command shows only the Name, ID, CPU usage, and StartTime of Notepad
processes. The output is cleaner than showing all properties.

PS C:\&gt; .\formatlist2.ps1

Name      : notepad
Id        : 1234
CPU       : 1.2345678
StartTime : 2/15/2025 10:30:45 AM

## Formatting service information

Format-List works well with service-related cmdlets too. It helps
display all configuration details of Windows services. This is useful for
troubleshooting service issues.

formatlist3.ps1
  

Get-Service -Name "WinRM" | Format-List *

This command shows all properties of the Windows Remote Management service.
The output includes status, startup type, and dependencies.

## Custom property display

You can create custom property displays using calculated properties. This
allows formatting or combining values in the output. Use a hashtable with
Name and Expression keys.

formatlist4.ps1
  

Get-Process | Format-List Name, @{Name="Memory(MB)";Expression={$_.WS/1MB}}

This command shows process names with working set memory converted to MB.
The calculated property performs the conversion for better readability.

## Formatting registry key information

Format-List is excellent for displaying registry key details.
Registry keys often have many properties that don't fit well in tables.
This provides a comprehensive view of registry entries.

formatlist5.ps1
  

Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion" | Format-List *

This command displays all properties of the Windows CurrentVersion registry
key. The list format shows each value clearly.

## Comparing with Format-Table

While Format-Table is good for overviews, Format-List
provides detailed information. This example shows the difference between
the two formatting cmdlets for the same data.

formatlist6.ps1
  

# Table format (default)
Get-Process -Name "powershell"

# List format
Get-Process -Name "powershell" | Format-List *

The first command shows basic process info in table format. The second
command displays all available properties in an easy-to-read list.

## Limiting output with -Property

The -Property parameter offers an alternative syntax for selecting
properties. This can make scripts more readable when selecting many properties.
It functions the same as listing properties directly.

formatlist7.ps1
  

Get-Service | Format-List -Property DisplayName, Status, StartType

This command shows service display names, status, and startup types. The
-Property parameter clearly indicates which fields are displayed.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Format-List cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).