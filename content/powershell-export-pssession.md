+++
title = "PowerShell Export-PSSession"
date = 2025-08-29T20:06:52.901+01:00
draft = false
description = "PowerShell Export-PSSession tutorial shows how to use PowerShell to export session commands to a module."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Export-PSSession

last modified February 15, 2025

In this article, we will cover the Export-PSSession cmdlet in
PowerShell. This cmdlet exports commands from a remote session into a local
PowerShell module. It enables command reuse across sessions.

## Export-PSSession basics

Export-PSSession creates a module from commands in a remote session.
This allows using remote commands locally without reconnecting. The cmdlet
requires an active PSSession to export from. The output is a PowerShell module
with proxy functions.

## Basic Export-PSSession usage

The simplest way to use Export-PSSession is with a session object.
First create a session with New-PSSession, then export its commands.
The module is saved to the specified path. This creates reusable command sets.

export1.ps1
  

$session = New-PSSession -ComputerName Server01
Export-PSSession -Session $session -OutputModule RemoteCommands

This creates a session to Server01 and exports its commands. The commands are
saved in a module named RemoteCommands. The module is placed in the modules path.

## Export specific commands

You can export only specific commands using the -CommandName parameter. This
filters which commands are included in the output module. Wildcards are
supported for pattern matching. This reduces module size and clutter.

export2.ps1
  

$session = New-PSSession -ComputerName Server01
Export-PSSession -Session $session -CommandName Get-* -OutputModule GetCommands

This exports only commands starting with "Get-" from Server01. The resulting
module contains just these filtered commands. Useful for creating focused modules.

## Export to a specific directory

By default, modules are saved to the user's module path. You can specify a
different location with -OutputModulePath. This allows custom module storage.
The path must exist before running the command. Useful for testing modules.

export3.ps1
  

$session = New-PSSession -ComputerName Server01
Export-PSSession -Session $session -OutputModule TempCommands -OutputModulePath C:\Temp

This exports commands to C:\Temp\TempCommands instead of the default location.
The module can be imported from this custom path later. Good for temporary modules.

## Export with module description

You can add metadata to the exported module using -Description. This appears
when using Get-Module -ListAvailable. Helps document the module's purpose.
The description is stored in the module manifest file.

export4.ps1
  

$session = New-PSSession -ComputerName Server01
Export-PSSession -Session $session -OutputModule ServerCmds -Description "Server01 management commands"

This creates a module with a descriptive message about its contents. The
description helps users understand the module's purpose. Useful in shared environments.

## Export with specific module version

You can specify a version number for the exported module. Use -ModuleVersion
to set this. Version numbers help track module updates. Follows standard
versioning format (Major.Minor.Build). Useful for module management.

export5.ps1
  

$session = New-PSSession -ComputerName Server01
Export-PSSession -Session $session -OutputModule ServerTools -ModuleVersion 1.0.0

This exports commands as version 1.0.0 of the ServerTools module. Versioning
helps track changes and dependencies. Important for production environments.

## Export with command prefix

You can add a prefix to all exported commands using -Prefix. This avoids
naming conflicts with local commands. The prefix is added to each command name.
Makes it clear which commands are remote.

export6.ps1
  

$session = New-PSSession -ComputerName Server01
Export-PSSession -Session $session -OutputModule Remote -Prefix Server01

This adds "Server01" prefix to all exported commands. For example, Get-Process
becomes Server01Get-Process. Helps distinguish between local and remote commands.

## Export with specific format files

You can include custom format files with -FormatTypeName and -FormatData.
These control how objects are displayed. Useful for preserving remote session
formatting. The format data is included in the module.

export7.ps1
  

$session = New-PSSession -ComputerName Server01
$format = Get-FormatData -TypeName Some.Custom.Type
Export-PSSession -Session $session -OutputModule CustomFormats -FormatData $format

This exports commands along with custom formatting for Some.Custom.Type objects.
The formatting is preserved when using the module locally. Maintains consistency.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Export-PSSession cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).