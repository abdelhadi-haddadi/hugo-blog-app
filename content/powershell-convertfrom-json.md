+++
title = "PowerShell ConvertFrom-Json"
date = 2025-08-29T20:06:47.362+01:00
draft = false
description = "PowerShell ConvertFrom-Json tutorial shows how to use PowerShell to parse JSON data."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell ConvertFrom-Json

last modified February 15, 2025

In this article, we will cover the ConvertFrom-Json cmdlet in
PowerShell. This cmdlet converts JSON-formatted strings into PowerShell objects.
It enables easy parsing and manipulation of JSON data in scripts.

## JSON basics

JSON (JavaScript Object Notation) is a lightweight data interchange format. It
uses human-readable text to store and transmit data objects. JSON represents
data as key-value pairs and ordered lists. PowerShell can work with JSON data
through the ConvertFrom-Json cmdlet.

## Basic ConvertFrom-Json usage

The simplest way to use ConvertFrom-Json is with a JSON string. The
cmdlet parses the string and returns a PowerShell object. This object can then
be manipulated like any other PowerShell object. The JSON must be properly
formatted.

json1.ps1
  

$json = '{"name":"John","age":30,"city":"New York"}'
$obj = $json | ConvertFrom-Json
$obj

This command converts a simple JSON string to a PowerShell object. The object
properties can be accessed with dot notation. The output shows the parsed data.

## Accessing JSON object properties

After converting JSON to an object, you can access its properties directly. Use
dot notation to reference nested properties. This allows easy data extraction
from complex JSON structures. Property names are case-sensitive.

json2.ps1
  

$json = '{"user":{"name":"Alice","email":"alice@example.com"}}'
$obj = $json | ConvertFrom-Json
$obj.user.name
$obj.user.email

This example shows how to access nested JSON properties. The user object
contains name and email properties. These are accessed through dot notation.

## Working with JSON arrays

JSON arrays are converted to PowerShell object arrays. You can iterate through
them or access elements by index. Arrays maintain their order from the JSON
source. This is useful for processing lists of items.

json3.ps1
  

$json = '["red","green","blue"]'
$colors = $json | ConvertFrom-Json
$colors[0]
$colors | ForEach-Object { "Color: $_" }

This example demonstrates working with a JSON array. The first element is
accessed by index. Then all elements are processed in a loop.

## Parsing complex JSON structures

ConvertFrom-Json can handle nested objects and arrays. Complex JSON
structures become PowerShell objects with nested properties. This maintains the
original data hierarchy. You can navigate through the structure with dot notation.

json4.ps1
  

$json = '{
  "employees": [
    {"name":"John", "skills":["PowerShell","C#"]},
    {"name":"Jane", "skills":["Python","SQL"]}
  ]
}'
$obj = $json | ConvertFrom-Json
$obj.employees[0].name
$obj.employees[1].skills[0]

This example parses a complex JSON structure. It contains an array of employee
objects with nested skills arrays. Specific values are accessed through chained
dot notation.

## Reading JSON from a file

JSON data often comes from files. Use Get-Content to read the file
first. Then pipe the content to ConvertFrom-Json. This is a common
workflow for configuration files or API responses.

json5.ps1
  

$jsonContent = Get-Content -Path "config.json" -Raw
$config = $jsonContent | ConvertFrom-Json
$config.settings

This script reads JSON from a file and converts it to an object. The -Raw
parameter ensures the entire file is read as a single string. The config object
can then be used throughout the script.

## Handling large JSON data

For large JSON files, use the -Depth parameter. It controls how many levels of
nested objects are converted. The default depth is 1024. This prevents stack
overflow errors with very deep structures.

json6.ps1
  

$bigJson = Get-Content -Path "large_data.json" -Raw
$data = $bigJson | ConvertFrom-Json -Depth 50
$data.items[0].details

This example shows how to process large JSON files. The -Depth parameter is set
to handle deep nesting. The first item's details are then accessed.

## Error handling with ConvertFrom-Json

Invalid JSON will cause parsing errors. Use try/catch blocks to handle these
gracefully. This ensures your script can respond appropriately to malformed
input. Always validate JSON data when possible.

json7.ps1
  

$badJson = '{"name": "Bob", "age": }'
try {
    $obj = $badJson | ConvertFrom-Json
    $obj
}
catch {
    Write-Host "Error parsing JSON: $_"
}

This example demonstrates error handling. The malformed JSON triggers an
exception. The catch block displays a user-friendly error message.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the ConvertFrom-Json cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).