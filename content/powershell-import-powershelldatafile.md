+++
title = "PowerShell Import-PowerShellDataFile"
date = 2025-08-29T20:07:04.112+01:00
draft = false
description = "PowerShell Import-PowerShellDataFile tutorial shows how to import PowerShell data files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Import-PowerShellDataFile

last modified February 15, 2025

This article covers the Import-PowerShellDataFile cmdlet in
PowerShell. It imports values from a .psd1 file into a hashtable.
The cmdlet safely evaluates file contents without executing script blocks.

## PowerShell data files basics

PowerShell data files (.psd1) store configuration data in key-value
pairs. They are commonly used for module manifests and configuration settings.
Unlike scripts, they don't contain executable code. The Import-PowerShellDataFile
cmdlet safely imports these files.

## Basic Import-PowerShellDataFile usage

The simplest usage imports a data file and returns its contents as a hashtable.
Specify the file path with the -Path parameter. The cmdlet parses
the file and converts it to a PowerShell object. This is useful for reading
configuration files.

data1.ps1
  

$config = Import-PowerShellDataFile -Path "C:\config\settings.psd1"
$config

This imports a configuration file and stores it in the $config
variable. The variable contains a hashtable with the file's key-value pairs.
You can then access individual values by their keys.

## Importing module manifest data

Module manifests (.psd1 files) contain metadata about PowerShell
modules. You can use Import-PowerShellDataFile to read this data.
This example shows how to access module version information from a manifest.

data2.ps1
  

$manifest = Import-PowerShellDataFile -Path ".\MyModule\MyModule.psd1"
$manifest.ModuleVersion

This command reads a module manifest file and displays its version number.
The version is stored in the ModuleVersion property of the returned hashtable.

PS C:\&gt; .\data2.ps1
1.2.0

## Accessing nested hashtable values

PowerShell data files can contain nested hashtables. You can access these
values using dot notation. This example demonstrates accessing nested
configuration settings from a data file.

data3.ps1
  

$config = Import-PowerShellDataFile -Path ".\appsettings.psd1"
$config.Database.Server

This reads a configuration file with nested database settings. It then
accesses the server name from the Database section. The dot notation
navigates through the nested structure.

## Using with splatting

Imported hashtables can be used with PowerShell splatting. Splatting passes
parameters to cmdlets using a hashtable. This example shows how to use a
configuration file to splat parameters.

data4.ps1
  

$params = Import-PowerShellDataFile -Path ".\mailparams.psd1"
Send-MailMessage @params

This imports mail parameters from a file and splats them to Send-MailMessage.
The @ symbol before the variable name indicates splatting. Each key-value
pair becomes a parameter-value pair for the cmdlet.

## Importing multiple configuration files

You can combine multiple configuration files into a single configuration.
This example merges settings from different environment-specific files.
The resulting hashtable contains all configuration values.

data5.ps1
  

$baseConfig = Import-PowerShellDataFile -Path ".\config\base.psd1"
$envConfig = Import-PowerShellDataFile -Path ".\config\prod.psd1"
$finalConfig = $baseConfig + $envConfig

This combines base configuration with environment-specific overrides. The +
operator merges the two hashtables. Values in the second hashtable override
matching keys in the first.

## Validating imported data

After importing data, you can validate its structure and values. This example
checks for required configuration keys. It throws an error if any are missing.

data6.ps1
  

$config = Import-PowerShellDataFile -Path ".\appconfig.psd1"
$required = @("Server", "Database", "Credentials")
foreach ($key in $required) {
    if (-not $config.ContainsKey($key)) {
        throw "Missing required configuration key: $key"
    }
}

This script ensures all required configuration keys are present. It checks each
key in the $required array against the imported configuration. If any key is
missing, it throws an exception.

## Converting JSON to PowerShell data file

You can convert JSON data to PowerShell data file format. This example shows
how to read JSON and save it as a .psd1 file. The converted file
can then be imported with Import-PowerShellDataFile.

data7.ps1
  

$json = Get-Content -Path ".\config.json" -Raw | ConvertFrom-Json
$json | ConvertTo-Json -Depth 10 | Out-File ".\config.psd1"

This reads a JSON file, converts it to a PowerShell object, then saves it as
a .psd1 file. The -Depth parameter ensures nested
structures are preserved. The resulting file can be imported normally.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Import-PowerShellDataFile cmdlet in
PowerShell. We demonstrated various use cases for importing configuration
data from .psd1 files.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).