+++
title = "PowerShell ConvertTo-Json"
date = 2025-08-29T20:06:47.380+01:00
draft = false
description = "PowerShell ConvertTo-Json tutorial shows how to convert objects to JSON format in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell ConvertTo-Json

last modified February 15, 2025

In this article, we will cover the ConvertTo-Json cmdlet in
PowerShell. This cmdlet converts objects to JSON-formatted strings.
JSON is widely used for data interchange between systems and applications.

## JSON basics

JSON (JavaScript Object Notation) is a lightweight data interchange format.
It is easy for humans to read and write, and for machines to parse and generate.
JSON represents data as key-value pairs and ordered lists of values.
PowerShell can work with JSON data using ConvertTo-Json and ConvertFrom-Json.

## Basic ConvertTo-Json usage

The simplest way to use ConvertTo-Json is with a basic object.
The cmdlet converts PowerShell objects to JSON strings. By default, it
creates a compact JSON representation without extra whitespace.

json1.ps1
  

$person = @{
    Name = "John Doe"
    Age = 35
    Occupation = "Developer"
}
$person | ConvertTo-Json

This command creates a hashtable and converts it to JSON. The output is
a string containing the JSON representation of the object.

PS C:\&gt; .\json1.ps1
{
    "Name":  "John Doe",
    "Age":  35,
    "Occupation":  "Developer"
}

## Formatting JSON output

You can control the formatting of JSON output using the -Depth parameter.
It specifies how many levels of contained objects are included in the JSON.
The default depth is 2. For complex objects, you may need to increase this.

json2.ps1
  

$company = @{
    Name = "TechCorp"
    Employees = @(
        @{Name="Alice"; Position="Manager"},
        @{Name="Bob"; Position="Developer"}
    )
}
$company | ConvertTo-Json -Depth 3

This example shows nested objects requiring a depth of 3. Without sufficient
depth, some data might be truncated in the JSON output.

## Pretty-printing JSON

For better readability, you can pretty-print JSON using the -Compress
parameter set to $false. This adds indentation and line breaks to the output.
The default is $true which produces compact JSON.

json3.ps1
  

$data = @{
    Server = "DB01"
    Services = @("MySQL", "Redis", "MongoDB")
    Status = "Active"
}
$data | ConvertTo-Json -Compress $false

This command produces formatted JSON with proper indentation. The output is
easier to read but consumes more space than compressed JSON.

## Converting process information to JSON

You can combine ConvertTo-Json with other cmdlets like Get-Process.
This is useful for exporting system information in a machine-readable format.
The JSON output can be consumed by other applications or stored in files.

json4.ps1
  

Get-Process -Name "chrome" | 
    Select-Object Name, Id, CPU, WorkingSet | 
    ConvertTo-Json -Depth 2

This command gets Chrome processes, selects specific properties, and converts
them to JSON. The output can be used for monitoring or analysis purposes.

## Handling special characters

ConvertTo-Json automatically escapes special characters in strings.
This includes quotes, backslashes, and control characters. The JSON output
remains valid regardless of the input string content.

json5.ps1
  

$text = @{
    Message = "This string contains `"quotes`" and \backslashes\"
}
$text | ConvertTo-Json

The cmdlet properly escapes the quotes and backslashes in the output JSON.
This ensures the JSON remains valid and can be parsed correctly.

## Custom object conversion

You can convert custom PowerShell objects to JSON. This works with both
hashtables and PSObjects. The conversion preserves the object structure
and property names in the JSON output.

json6.ps1
  

$car = [PSCustomObject]@{
    Make = "Toyota"
    Model = "Camry"
    Year = 2022
    Features = @("GPS", "Bluetooth", "Backup Camera")
}
$car | ConvertTo-Json -Depth 2

This example creates a custom object and converts it to JSON. The array of
features is properly represented in the JSON output.

## Working with dates in JSON

Date objects are converted to JSON strings in ISO 8601 format by default.
This is a standard date representation that is widely supported. You can
parse these strings back to DateTime objects when needed.

json7.ps1
  

$event = @{
    Name = "Conference"
    Date = Get-Date
    Location = "New York"
}
$event | ConvertTo-Json

The date in the JSON output will be in ISO format. This ensures compatibility
with other systems and programming languages that consume the JSON.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the ConvertTo-Json cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).