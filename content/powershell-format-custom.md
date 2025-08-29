+++
title = "PowerShell Format-Custom"
date = 2025-08-29T20:06:54.001+01:00
draft = false
description = "PowerShell Format-Custom tutorial shows how to use PowerShell to customize output formatting."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Format-Custom

last modified February 15, 2025

In this article, we will cover the Format-Custom cmdlet in
PowerShell. This cmdlet formats output as a custom view defined by the user.

## Formatting basics

PowerShell provides several formatting cmdlets to control output display.
Format-Custom creates custom views of objects. It uses predefined
views or user-defined property sets. This allows flexible output formatting.

## Basic Format-Custom usage

The simplest way to use Format-Custom is with a single object.
It displays the object's properties in a structured view. The output shows
property names and values in a hierarchical format.

format1.ps1
  

Get-Process -Name "notepad" | Format-Custom

This command retrieves Notepad processes and formats them customly.
The output shows process details in a structured, indented format.

## Formatting specific properties

You can select specific properties to display with Format-Custom.
Use the -Property parameter followed by property names. This creates a focused
view showing only selected properties.

format2.ps1
  

Get-Process -Name "chrome" | Format-Custom -Property Name, Id, CPU

This command shows only Name, ID, and CPU properties for Chrome processes.
The output is structured but limited to specified properties.

## Using depth parameter

The -Depth parameter controls how many levels of nested objects are displayed.
By default, PowerShell shows up to five levels. This prevents overly deep output.
You can adjust this as needed.

format3.ps1
  

Get-Service | Format-Custom -Depth 2

This command displays service information with a maximum depth of 2.
Complex objects beyond this depth will be truncated in the output.

## Combining with Select-Object

Format-Custom can be combined with Select-Object for
more control. First select properties, then format them customly. This provides
flexibility in property selection before formatting.

format4.ps1
  

Get-Process | Select-Object -First 3 -Property Name, Id, WS | Format-Custom

This command selects three processes with specific properties, then formats
them. The output shows only selected properties in custom format.

## Custom view with calculated properties

You can create calculated properties for Format-Custom. Use a
hash table with Name and Expression keys. This allows displaying derived
values in the custom view.

format5.ps1
  

Get-Process | Select-Object -First 2 -Property Name, @{
    Name="MBMemory"; Expression={$_.WS/1MB}
} | Format-Custom

This command shows process names with working set memory in megabytes.
The calculated property converts bytes to MB for readability.

## Formatting complex objects

Format-Custom is particularly useful for complex objects. It can
display nested properties clearly. This helps understand object structure.
The output shows relationships between properties.

format6.ps1
  

Get-ChildItem | Select-Object -First 1 | Format-Custom

This command displays detailed information about a file system item.
The output shows all properties in a hierarchical, readable format.

## Grouping with Format-Custom

You can combine Group-Object with Format-Custom.
First group objects by a property, then format the groups. This creates
structured views of categorized data.

format7.ps1
  

Get-Process | Group-Object -Property Company | Select-Object -First 3 | Format-Custom

This command groups processes by company name and formats the first three
groups. The output shows the grouping structure with process details.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Format-Custom cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).