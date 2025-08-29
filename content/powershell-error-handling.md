+++
title = "PowerShell Error Handling"
date = 2025-08-29T20:06:50.711+01:00
draft = false
description = "Learn PowerShell error handling techniques including try/catch blocks, error variables, and exception management for robust scripting."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Error Handling

last modified February 15, 2025

Effective error handling ensures scripts fail gracefully and provide
meaningful feedback. PowerShell offers multiple mechanisms to handle
exceptions and errors during script execution.

Terminating errors halt execution, while non-terminating errors allow
scripts to continue. Use try/catch blocks, $Error variable, and
ErrorAction to manage different error types in PowerShell.

## Try/Catch Blocks

Basic exception handling uses try/catch blocks to capture terminating
errors. This example attempts to read a non-existent file.

try_catch.ps1
  

try {
    Get-Content "missing.txt" -ErrorAction Stop
}
catch {
    Write-Output "Error encountered: $_"
}

The script forces a terminating error with -ErrorAction Stop. The catch
block captures the exception using the $_ automatic variable.

Get-Content "missing.txt" -ErrorAction Stop

Forces a terminating error when file isn't found. Without -ErrorAction
Stop, Get-Content produces a non-terminating error.

PS C:\&gt; .\try_catch.ps1
Error encountered: Cannot find path 'C:\missing.txt'...

## ErrorAction Parameter

Control error behavior using -ErrorAction. This converts non-terminating
errors to terminating ones for capture in try/catch blocks.

error_action.ps1
  

try {
    Remove-Item "nonexistent.txt" -ErrorAction Stop
}
catch [System.Management.Automation.ItemNotFoundException] {
    Write-Output "Specific error: File not found"
}
catch {
    Write-Output "General error: $_"
}

This script handles specific exception types first, then general errors.
ItemNotFoundException catches missing file scenarios specifically.

PS C:\&gt; .\error_action.ps1
Specific error: File not found

## $Error Variable

PowerShell maintains $Error array containing recent errors. Access the
latest error with $Error[0].

error_var.ps1
  

Get-ChildItem "invalid_path" -ErrorAction SilentlyContinue
if ($Error.Count -gt 0) {
    Write-Output "Last error: $($Error[0].Exception.Message)"
}

SilentlyContinue suppresses error output while still populating $Error.
We check for errors and display the most recent message.

PS C:\&gt; .\error_var.ps1
Last error: Cannot find path 'C:\invalid_path'...

## Finally Block

Use finally to execute cleanup code regardless of errors. This example
demonstrates resource cleanup after file operations.

finally_block.ps1
  

$file = $null
try {
    $file = [System.IO.File]::OpenRead("test.txt")
}
catch {
    Write-Output "Error opening file: $_"
}
finally {
    if ($file) { $file.Close() }
    Write-Output "Cleanup completed"
}

The finally block ensures file handles get closed even if an error
occurs during file opening.

PS C:\&gt; .\finally_block.ps1
Cleanup completed

## Custom Errors

Generate custom errors using Write-Error and handle them in scripts.
This allows controlled error propagation.

custom_error.ps1
  

function Test-Value {
    param($val)
    if ($val -lt 10) {
        Write-Error "Value too low" -ErrorAction Stop
    }
}

try {
    Test-Value -val 5
}
catch {
    Write-Output "Custom error caught: $_"
}

Write-Error with -ErrorAction Stop creates a terminating error caught
by the catch block. This enables structured error reporting.

PS C:\&gt; .\custom_error.ps1
Custom error caught: Value too low

## Source

[Microsoft PowerShell Documentation](https://learn.microsoft.com/en-us/powershell/)

These examples demonstrate essential error handling techniques for
creating robust PowerShell scripts.

## Author

Jan Bodnar is a professional developer and technical writer with expertise
in system administration and automation. Author of multiple programming
manuals and maintainer of PowerShell-focused educational resources.

List [all PowerShell tutorials](/powershell/).