+++
title = "PowerShell Format-Wide"
date = 2025-08-29T20:06:55.127+01:00
draft = false
description = "PowerShell Format-Wide tutorial shows how to use PowerShell to format output in wide columns."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Format-Wide

last modified February 15, 2025

In this article, we will cover the Format-Wide cmdlet in
PowerShell. This cmdlet formats output as a wide table with one property.

## Format-Wide basics

The Format-Wide cmdlet displays objects in a multi-column layout.
It shows only one property of each object by default. This is useful when
you want a compact view of simple data. The cmdlet automatically adjusts
column width based on terminal size.

## Basic Format-Wide usage

The simplest way to use Format-Wide is by piping objects to it.
By default, it displays the first property of each object. This creates a
compact multi-column view. The output is optimized for terminal width.

formatwide1.ps1
  

Get-Process | Format-Wide

This command lists all processes in a multi-column format. Only the process
names are shown by default. The column count adjusts to your terminal width.

## Specifying the property to display

You can specify which property to display using the -Property parameter.
This is useful when you want to show a specific property. The property
name must be valid for the input objects. Multiple properties cannot be
displayed with Format-Wide.

formatwide2.ps1
  

Get-Process | Format-Wide -Property Id

This command displays process IDs in a multi-column format. The output is
more compact than the default table view. It's useful for quick scanning.

## Controlling column count

You can control the number of columns with the -Column parameter. This
overrides the automatic column calculation. The value must be a positive
integer. This is useful when you need consistent output formatting.

formatwide3.ps1
  

Get-ChildItem | Format-Wide -Column 3

This command displays files in exactly three columns. The output remains
consistent regardless of terminal width. Each item is the file name by default.

## Formatting services

Format-Wide works well with service information. It can display
service names in a compact format. This is useful for quick service overviews.
The cmdlet automatically handles the service objects.

formatwide4.ps1
  

Get-Service | Format-Wide -Property DisplayName

This command shows service display names in wide format. The output is more
compact than the default table. It's easier to scan through many services.

## Combining with Select-Object

You can combine Format-Wide with Select-Object for
custom output. First select the properties you need, then format them. This
allows filtering before formatting. The pipeline handles the data flow.

formatwide5.ps1
  

Get-Process | Select-Object -First 10 -Property Name | Format-Wide

This command shows only the first 10 process names in wide format. The
combination provides precise control over output. The result is clean and
easy to read.

## Formatting modules

Module information can be displayed compactly with Format-Wide.
This is useful when listing many modules. The cmdlet shows one property per
module. The default is the module name.

formatwide6.ps1
  

Get-Module -ListAvailable | Format-Wide -Property Name

This command lists available module names in wide format. The output is
more compact than the default table. It's easier to scan through many modules.

## Customizing output width

You can combine Format-Wide with Out-String to
control line width. This is useful for output redirection or logging. The
-Width parameter specifies maximum line width. The cmdlet adjusts columns
accordingly.

formatwide7.ps1
  

Get-Process | Format-Wide | Out-String -Width 80

This command formats process names to fit within 80 characters per line.
The output is suitable for fixed-width displays or logs. Column count
adjusts to stay within the limit.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Format-Wide cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).