+++
title = "PowerShell Export-Csv"
date = 2025-08-29T20:06:52.904+01:00
draft = false
description = "PowerShell Export-Csv tutorial shows how to use PowerShell to export data to CSV files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Export-Csv

last modified February 15, 2025

In this article, we will cover the Export-Csv cmdlet in
PowerShell. This cmdlet converts objects into CSV format and saves them
to a file. CSV files are widely used for data exchange between systems.

## CSV basics

CSV (Comma-Separated Values) is a simple file format for storing tabular
data. Each line represents a row, and columns are separated by commas.
PowerShell's Export-Csv creates files with headers by default.
The cmdlet preserves object properties as columns in the output file.

## Basic Export-Csv usage

The simplest way to use Export-Csv is to pipe objects to it
with a file path. This creates a CSV file with all object properties.
The first row contains column headers. Each subsequent row represents
an object's property values.

export1.ps1
  

Get-Process | Export-Csv -Path "processes.csv"

This command exports all running processes to a CSV file named processes.csv.
The file will contain columns like ProcessName, Id, CPU, and other properties.

## Exporting specific properties

You can select specific properties to include in the CSV file using
Select-Object. This reduces file size and improves readability.
Only the specified properties will be exported. The column order matches
the property selection order.

export2.ps1
  

Get-Process | 
    Select-Object Name, Id, CPU, WorkingSet | 
    Export-Csv -Path "process_summary.csv"

This command exports only four properties of each process. The resulting
CSV file will be smaller and easier to work with for basic analysis.

## Appending to existing CSV files

The -Append parameter adds data to an existing CSV file
instead of overwriting it. The new data must have the same structure
as the existing file. Headers are only written when creating a new file.

export3.ps1
  

Get-Service | 
    Select-Object Name, Status | 
    Export-Csv -Path "services.csv" -Append

This command appends service information to an existing CSV file. If the
file doesn't exist, it will be created with headers. Subsequent runs add
new rows without duplicating headers.

## Using different delimiters

While CSV typically uses commas, you can specify different delimiters
with -Delimiter. This is useful for compatibility with
systems expecting other separators. Common alternatives include semicolons
or tabs.

export4.ps1
  

Get-ChildItem | 
    Export-Csv -Path "files.txt" -Delimiter "`t"

This command exports file information using tabs as delimiters. The
backtick-t (`t) represents a tab character in PowerShell. The output
file can be opened in spreadsheet software as a tab-delimited file.

## Exporting without type information

By default, Export-Csv includes type information in the
first line. Use -NoTypeInformation to omit this metadata.
This creates cleaner CSV files compatible with more applications.

export5.ps1
  

Get-Process | 
    Export-Csv -Path "clean_processes.csv" -NoTypeInformation

The resulting CSV file starts directly with column headers. Many data
analysis tools prefer this simpler format without type metadata.

## Handling special characters

When exporting data containing commas or quotes, Export-Csv
automatically escapes them. Strings containing delimiters are wrapped in
quotes. Embedded quotes are doubled for proper escaping.

export6.ps1
  

$data = @(
    [PSCustomObject]@{Name="File,1"; Size=100}
    [PSCustomObject]@{Name="File""2"; Size=200}
)
$data | Export-Csv -Path "special_chars.csv"

This creates a CSV file that properly handles names containing commas
and quotes. The output will maintain data integrity when imported back.

## Using Encoding parameter

The -Encoding parameter specifies the character encoding
for the output file. UTF8 is commonly used for international characters.
ASCII may be needed for legacy systems.

export7.ps1
  

Get-Process | 
    Export-Csv -Path "utf8_processes.csv" -Encoding UTF8

This ensures the CSV file uses UTF-8 encoding, supporting international
characters in process names. The default encoding varies by PowerShell
version and system configuration.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Export-Csv cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).