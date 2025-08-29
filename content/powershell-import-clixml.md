+++
title = "PowerShell Import-Clixml"
date = 2025-08-29T20:07:04.130+01:00
draft = false
description = "PowerShell Import-Clixml tutorial shows how to use PowerShell to import objects from CLIXML files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Import-Clixml

last modified February 15, 2025

In this article, we will cover the Import-Clixml cmdlet in
PowerShell. This cmdlet imports objects from CLIXML files created with
Export-Clixml.

## CLIXML basics

CLIXML is PowerShell's serialization format for objects. It preserves object
structure and properties when saving to files. Import-Clixml
reconstructs objects from these files. This is useful for data persistence
and transfer between sessions.

## Basic Import-Clixml usage

The simplest way to use Import-Clixml is with a file path. This
reads the CLIXML file and recreates the original objects. The objects maintain
their properties and methods. This example shows basic file import.

import1.ps1
  

$data = Import-Clixml -Path "C:\data\processes.clixml"
$data

This command imports objects from processes.clixml into $data. The objects
can then be used like any other PowerShell objects. The file must exist.

## Importing process objects

You can save and restore process information using CLIXML. First export
processes with Export-Clixml, then import them later. This
preserves the process objects' state at export time. Useful for analysis.

import2.ps1
  

Get-Process | Export-Clixml -Path "C:\temp\processes.clixml"
$savedProcesses = Import-Clixml -Path "C:\temp\processes.clixml"
$savedProcesses | Select-Object Name, Id, CPU -First 5

This exports current processes to a file, then imports them. The Select-Object
cmdlet shows name, ID, and CPU for the first 5 processes. Note that live
process data may differ from saved state.

## Importing custom objects

Import-Clixml works with custom objects too. Create a custom
object, export it, then import it in another session. All properties are
preserved. This enables complex data persistence scenarios.

import3.ps1
  

$customObj = [PSCustomObject]@{
    Name = "Server01"
    Status = "Online"
    Uptime = (Get-Date).AddDays(-1)
}
$customObj | Export-Clixml -Path "C:\temp\server.clixml"
$importedObj = Import-Clixml -Path "C:\temp\server.clixml"
$importedObj

This creates a custom server object, exports it, then imports it. The imported
object has all original properties. DateTime objects are properly reconstructed.

## Importing secure strings

Import-Clixml can securely import encrypted strings. When used
with Export-Clixml, it maintains encryption. This is useful for
storing credentials securely. The encryption uses Windows Data Protection API.

import4.ps1
  

$secureString = Read-Host "Enter password" -AsSecureString
$secureString | Export-Clixml -Path "C:\temp\password.clixml"
$importedSecureString = Import-Clixml -Path "C:\temp\password.clixml"
$credential = New-Object System.Management.Automation.PSCredential("user", $importedSecureString)

This securely saves a password, then recreates a credential object. The
password remains encrypted on disk and in memory. Only the same user on
the same machine can decrypt it.

## Importing from pipeline

Import-Clixml can accept input from the pipeline. This allows
chaining with other cmdlets. The Path parameter accepts pipeline input by
property name. Useful for dynamic file handling.

import5.ps1
  

Get-ChildItem "C:\data\*.clixml" | Import-Clixml

This imports all CLIXML files in C:\data. Each file's contents are output
to the pipeline. Note that all files must contain valid CLIXML data.

## Error handling

When importing CLIXML files, errors may occur. Common issues include invalid
paths or corrupted data. Use try/catch blocks to handle errors gracefully.
This example shows robust import handling.

import6.ps1
  

try {
    $data = Import-Clixml -Path "C:\data\missing.clixml" -ErrorAction Stop
    $data
}
catch {
    Write-Warning "Failed to import CLIXML: $_"
}

This attempts to import a potentially missing file. The -ErrorAction Stop
ensures exceptions are caught. The catch block handles any import errors.

## Importing complex objects

Import-Clixml can handle complex object hierarchies. This
includes arrays, hashtables, and nested objects. The entire object graph
is preserved. This example demonstrates nested object import.

import7.ps1
  

$complexObject = @{
    Servers = @(
        [PSCustomObject]@{Name="Web01"; Role="Frontend"},
        [PSCustomObject]@{Name="DB01"; Role="Backend"}
    )
    Timestamp = Get-Date
}
$complexObject | Export-Clixml -Path "C:\temp\servers.clixml"
$imported = Import-Clixml -Path "C:\temp\servers.clixml"
$imported.Servers | Format-Table

This creates and exports a complex object with nested arrays. The import
recreates the full structure. The Format-Table cmdlet displays the servers.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Import-Clixml cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).