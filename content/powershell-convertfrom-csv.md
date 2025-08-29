+++
title = "PowerShell ConvertFrom-Csv"
date = 2025-08-29T20:06:46.264+01:00
draft = false
description = "PowerShell ConvertFrom-Csv tutorial shows how to use PowerShell to convert CSV data into objects."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell ConvertFrom-Csv

last modified February 15, 2025

In this article, we will cover the ConvertFrom-Csv cmdlet in
PowerShell. This cmdlet converts comma-separated value (CSV) data into objects.

## CSV basics

CSV is a simple file format used to store tabular data. Each line represents
a record, with fields separated by commas. PowerShell can work with CSV data
through various cmdlets. The ConvertFrom-Csv cmdlet is essential
for processing CSV strings or files.

## Basic ConvertFrom-Csv usage

The simplest way to use ConvertFrom-Csv is with a CSV string.
The first row should contain headers (property names). Each subsequent row
becomes an object with those properties. The output is a collection of objects.

csv1.ps1
  

$csvData = @"
Name,Age,Occupation
John,32,Engineer
Sarah,28,Designer
Michael,45,Manager
"@

$objects = $csvData | ConvertFrom-Csv
$objects

This command converts a CSV string into objects. Each object has Name, Age,
and Occupation properties. The output shows the objects in table format.

## Working with custom delimiters

By default, ConvertFrom-Csv uses commas as delimiters. You can
specify different delimiters with the -Delimiter parameter. This is useful
for files using tabs, semicolons, or other separators. The delimiter must
match the actual separator in your data.

csv2.ps1
  

$csvData = @"
Name;Age;Occupation
John;32;Engineer
Sarah;28;Designer
Michael;45;Manager
"@

$objects = $csvData | ConvertFrom-Csv -Delimiter ';'
$objects

This command processes CSV data with semicolon delimiters. The output is
identical to comma-delimited data but parsed correctly. The -Delimiter
parameter ensures proper field separation.

## Converting CSV from a file

You can combine Get-Content with ConvertFrom-Csv
to process CSV files. First read the file content, then convert it to objects.
This approach is common when working with external data files. The file must
have proper CSV formatting.

csv3.ps1
  

$fileContent = Get-Content -Path "C:\data\employees.csv"
$objects = $fileContent | ConvertFrom-Csv
$objects | Format-Table -AutoSize

This command reads a CSV file and converts it to objects. The Format-Table
cmdlet ensures clean output. Adjust the file path to match your system.

## Working with headers

If your CSV lacks headers, you can specify them with the -Header parameter.
Provide an array of column names to use as property names. This is useful for
files without header rows. The headers will be applied to all subsequent rows.

csv4.ps1
  

$csvData = @"
John,32,Engineer
Sarah,28,Designer
Michael,45,Manager
"@

$headers = "Name","Age","Occupation"
$objects = $csvData | ConvertFrom-Csv -Header $headers
$objects

This command adds headers to headerless CSV data. Each object will have the
specified property names. The header array must match the number of columns.

## Processing CSV with different encoding

When working with CSV files, encoding issues may arise. Use Get-Content's
-Encoding parameter to specify the correct encoding. Common encodings include
UTF8, ASCII, and Unicode. This ensures special characters are read correctly.

csv5.ps1
  

$fileContent = Get-Content -Path "C:\data\employees.csv" -Encoding UTF8
$objects = $fileContent | ConvertFrom-Csv
$objects

This command reads a UTF8-encoded CSV file. The -Encoding parameter ensures
proper character interpretation. Adjust the encoding type as needed for your
specific file.

## Filtering converted CSV data

After converting CSV to objects, you can filter them like any PowerShell
objects. Use Where-Object to select specific records. This allows powerful
data manipulation directly in PowerShell. Filter criteria can use any object
property.

csv6.ps1
  

$csvData = @"
Name,Age,Occupation
John,32,Engineer
Sarah,28,Designer
Michael,45,Manager
"@

$objects = $csvData | ConvertFrom-Csv
$engineers = $objects | Where-Object { $_.Occupation -eq "Engineer" }
$engineers

This command filters for only Engineer occupations. The Where-Object cmdlet
examines each object's Occupation property. Only matching objects are returned.

## Exporting converted CSV data

After processing CSV data, you might want to export it. Use Export-Csv to
save objects back to CSV format. This creates a new CSV file with the current
data. You can specify delimiters and include/exclude headers.

csv7.ps1
  

$csvData = @"
Name,Age,Occupation
John,32,Engineer
Sarah,28,Designer
Michael,45,Manager
"@

$objects = $csvData | ConvertFrom-Csv
$objects | Export-Csv -Path "C:\data\processed.csv" -NoTypeInformation

This command saves processed data to a new CSV file. The -NoTypeInformation
parameter removes extra type metadata. The output file will contain the
modified data in CSV format.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the ConvertFrom-Csv cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).