+++
title = "PowerShell Out-GridView"
date = 2025-08-29T20:07:09.794+01:00
draft = false
description = "PowerShell Out-GridView tutorial shows how to use PowerShell to display data in an interactive grid window."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Out-GridView

last modified February 15, 2025

In this article, we will cover the Out-GridView cmdlet in
PowerShell. This cmdlet displays data in an interactive grid window.
It allows for sorting, filtering, and selecting data visually.

## Out-GridView basics

The Out-GridView cmdlet sends output to a graphical table in a
separate window. It accepts input from the pipeline or parameters. The grid
provides interactive features like sorting columns and filtering data. This
makes it useful for examining and selecting data sets visually.

## Basic Out-GridView usage

The simplest way to use Out-GridView is by piping command output
to it. This displays the data in a scrollable, sortable grid window. The grid
includes all properties of the input objects by default. You can interact with
the data without modifying the original source.

grid1.ps1
  

Get-Process | Out-GridView

This command shows all running processes in a grid view. You can sort by any
column by clicking its header. The window remains interactive while the script
continues execution.

## Filtering data with Out-GridView

Out-GridView includes built-in filtering capabilities. Click the
filter icon in any column header to access filtering options. You can filter by
specific values or text patterns. The grid updates immediately to show only
matching rows.

grid2.ps1
  

Get-Service | Out-GridView

This displays all system services in a grid. Use the filter boxes to narrow
down services by status or name. The filtering is dynamic and applies as you
type. Multiple columns can be filtered simultaneously.

## Selecting and returning data

The -PassThru parameter allows selecting items and returning them
to the pipeline. Selected items become available for further processing after
closing the grid window. This enables interactive selection workflows in scripts.

grid3.ps1
  

Get-ChildItem C:\Windows\*.exe | Out-GridView -PassThru | ForEach-Object {
    Write-Host "Selected file: $($_.FullName)"
}

This script shows Windows executable files in a grid. Selected files are
processed after closing the window. The ForEach-Object cmdlet
receives only the chosen items. This creates an interactive file selection tool.

## Customizing the grid title

The -Title parameter sets a custom window title for the grid. This
helps identify multiple grid windows when several are open. The title appears in
the window's title bar and taskbar entry.

grid4.ps1
  

Get-Process | Select-Object Name, Id, CPU | Out-GridView -Title "Process Monitor"

This displays process information with a custom window title. Only selected
properties are shown in the grid. The title makes the window's purpose clear.
This is especially useful in complex scripts with multiple grids.

## Using Out-GridView for selection menus

Out-GridView can create interactive selection menus in scripts. By
combining with -PassThru, users can choose from options. The
selection determines the script's subsequent actions. This provides a graphical
alternative to text menus.

grid5.ps1
  

$options = @(
    [pscustomobject]@{Name="Restart"; Description="Restart the service"}
    [pscustomobject]@{Name="Stop"; Description="Stop the service"}
    [pscustomobject]@{Name="Start"; Description="Start the service"}
)

$action = $options | Out-GridView -Title "Select Action" -PassThru
Write-Host "You selected: $($action.Name)"

This script presents a menu of service actions in a grid. The user's selection
is stored in $action for further processing. The description
column provides additional context for each option.

## Multiple selection mode

By default, Out-GridView allows selecting multiple items. Hold Ctrl
to select non-contiguous items or Shift for ranges. The -PassThru
parameter returns all selected items. This enables batch operations on chosen data.

grid6.ps1
  

$selected = Get-Process | Out-GridView -PassThru
$selected | Stop-Process -WhatIf

This script lets users select multiple processes to stop. The -WhatIf
parameter shows what would happen without actually stopping processes. Remove it
to perform the actual operations. Always confirm destructive actions with users.

## Waiting for grid closure

The -Wait parameter pauses script execution until the grid window
closes. This ensures subsequent commands run only after user interaction. Without
it, the script continues immediately after displaying the grid.

grid7.ps1
  

Get-Service | Out-GridView -Title "Service Status" -Wait
Write-Host "Grid window closed - continuing script"

This script waits for the user to close the services grid before continuing.
The message appears only after the grid window is dismissed. This behavior is
useful for sequential interactive scripts.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Out-GridView cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).