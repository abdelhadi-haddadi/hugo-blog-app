+++
title = "PowerShell Format-Table"
date = 2025-08-29T20:06:55.132+01:00
draft = false
description = "PowerShell Format-Table tutorial shows how to format command output as tables in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Format-Table

last modified February 15, 2025

In this article, we will cover the Format-Table cmdlet in
PowerShell. This cmdlet formats command output as a table with selected
properties.

## Format-Table basics

The Format-Table cmdlet formats output as a table. It displays
selected properties of objects in columns. By default, PowerShell uses
Format-Table for many cmdlets. You can customize which properties appear
and their order.

Format-Table is particularly useful when you want to view specific object
properties in a clean tabular format. It helps organize output for better
readability. The cmdlet supports various parameters for customization.

## Basic Format-Table usage

The simplest way to use Format-Table is by piping output to it. This
formats the output as a table with default properties. The table will
auto-size columns based on content. This is useful for quick viewing of
object properties.

format1.ps1
  

Get-Process | Format-Table

This command retrieves all processes and formats them as a table. The
output shows default properties like Name, Id, and CPU usage. The table
format makes it easier to scan the information.

## Selecting specific properties

You can choose which properties to display using the -Property parameter.
This lets you customize the table columns. Multiple properties can be
specified in a comma-separated list. The order determines column sequence.

format2.ps1
  

Get-Process | Format-Table -Property Name, Id, CPU, WorkingSet

This command shows only Name, Id, CPU, and WorkingSet columns. The output
is more focused than the default view. WorkingSet displays memory usage in
bytes.

PS C:\&gt; .\format2.ps1

Name                     Id        CPU WorkingSet
----                     --        --- ----------
chrome                6784   0.328125   27262976
chrome                6792   0.281250   26615808
explorer              6824   0.109375   35799040

## Customizing column widths

The -AutoSize parameter adjusts column widths to fit content. Without it,
columns may be truncated. For wide tables, -Wrap can display all content.
These parameters help optimize table layout.

format3.ps1
  

Get-Process | Format-Table -Property Name, Path -AutoSize

This command ensures all process names and paths are fully visible. The
-AutoSize parameter prevents truncation of long paths. This is useful when
viewing items with variable-length properties.

## Grouping output

The -GroupBy parameter organizes output by a property value. This creates
separate tables for each unique value. Grouping helps analyze data by
categories. The grouped property appears as a header above each section.

format4.ps1
  

Get-Service | Format-Table -Property Name, Status -GroupBy StartType

This command groups services by their StartType (Automatic, Manual, etc.).
Each group shows services with that start type. The output is more organized
than a flat list.

## Calculated properties

You can create custom columns using calculated properties. These use script
blocks to transform or combine data. The @{label="Name";expression={...}}
syntax defines them. This enables powerful output customization.

format5.ps1
  

Get-Process | Format-Table Name, 
    @{label="Memory(MB)";expression={$_.WorkingSet/1MB -as [int]}}

This command adds a custom column showing memory usage in MB. The expression
converts bytes to megabytes. The -as [int] formats the result as an integer.
This makes memory usage easier to interpret.

## Hiding headers

The -HideTableHeaders parameter removes column headers from output. This is
useful when piping to other commands. Headers can interfere with further
processing. The output becomes just the data rows.

format6.ps1
  

Get-Process | Select-Object -First 3 | Format-Table -HideTableHeaders

This command shows three processes without column headers. The output is
cleaner for scripts that process the data. Headers are typically only
needed for human-readable output.

## Combining formatting options

You can combine multiple formatting options for optimal output. This example
shows processes with selected properties, auto-sizing, and custom columns.
Complex formatting makes output more informative and readable.

format7.ps1
  

Get-Process | 
    Format-Table -Property Name, 
        @{label="PID";expression={$_.Id}},
        @{label="CPU(s)";expression={$_.CPU}},
        @{label="Memory(MB)";expression={[math]::Round($_.WorkingSet/1MB,1)}} -AutoSize

This command creates a comprehensive process table with custom columns. Memory
is shown in MB with one decimal place. The -AutoSize ensures all data is
visible. This format is useful for system monitoring.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Format-Table cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).