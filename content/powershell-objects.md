+++
title = "PowerShell Objects"
date = 2025-08-29T20:07:08.642+01:00
draft = false
description = "PowerShell objects tutorial explains how to work with objects in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Objects

last modified February 20, 2025

In this article, we will explore objects in PowerShell.

PowerShell is an object-oriented scripting language. Everything in PowerShell
is an object, including variables, strings, and system components.

## Creating Custom Objects

You can create custom objects using New-Object or
[PSCustomObject].

custom_object.ps1
  

$obj = New-Object PSObject -Property @{ Name="Alice"; Age=30 }
Write-Output $obj

## Getting Object Properties

You can access object properties using dot notation.

get_properties.ps1
  

$process = Get-Process | Select-Object -First 1
Write-Output $process.Name

## Modifying Object Properties

You can modify object properties after creation.

modify_object.ps1
  

$obj = [PSCustomObject]@{ Name="Bob"; Age=25 }
$obj.Age = 26
Write-Output $obj

## Filtering Objects

You can filter objects using Where-Object.

filter_objects.ps1
  

$processes = Get-Process | Where-Object { $_.CPU -gt 10 }
Write-Output $processes

## Sorting Objects

You can sort objects using Sort-Object.

sort_objects.ps1
  

$processes = Get-Process | Sort-Object -Property CPU -Descending
Write-Output $processes

## Selecting Object Properties

You can select specific properties using Select-Object.

select_properties.ps1
  

$processes = Get-Process | Select-Object Name, CPU
Write-Output $processes

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have explored objects in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).