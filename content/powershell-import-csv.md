+++
title = "PowerShell Import-Csv"
date = 2025-08-29T20:07:04.117+01:00
draft = false
description = "PowerShell Import-Csv tutorial shows how to use PowerShell to import and work with CSV files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Import-Csv

last modified February 15, 2025

In this article, we will cover the Import-Csv cmdlet in
PowerShell. This cmdlet imports data from CSV files and creates objects
from the data.

## CSV basics

CSV (Comma-Separated Values) is a simple file format for storing tabular
data. Each line represents a record, and fields are separated by commas.
PowerShell can read and manipulate CSV files efficiently. The first row
typically contains column headers.

## Basic Import-Csv usage

The simplest way to use Import-Csv is with just the file path.
This reads the CSV file and creates objects with properties from the headers.
Each row becomes a separate object with corresponding property values.

csv1.ps1
  

Import-Csv -Path "data.csv"

This command reads data from data.csv and outputs objects. The first row
should contain column names. Each subsequent row creates an object with
those properties.

## Working with CSV data

After importing CSV data, you can work with it like any PowerShell object.
Properties correspond to column headers. You can filter, sort, and process
the data using standard PowerShell cmdlets.

csv2.ps1
  

$data = Import-Csv "employees.csv"
$data | Where-Object { $_.Department -eq "IT" }

This imports employee data and filters for IT department employees. The
Where-Object cmdlet filters based on the Department property. The $_ variable
represents each object in the pipeline.

## Specifying delimiter

CSV files sometimes use different delimiters like semicolons or tabs. Use
the -Delimiter parameter to specify non-comma separators. This ensures
proper parsing of fields in the input file.

csv3.ps1
  

Import-Csv -Path "data.txt" -Delimiter ";"

This command reads a semicolon-delimited file. The delimiter must match
what's used in the file. PowerShell will split each line at semicolons
instead of commas.

## Selecting specific columns

You can select specific columns from the CSV file using Select-Object.
This is useful when you only need certain data. It reduces memory usage
and simplifies output.

csv4.ps1
  

Import-Csv "products.csv" | Select-Object Name, Price

This imports product data but only keeps the Name and Price columns. The
output objects will have only these two properties. Other columns are
discarded from the output.

## Converting data types

CSV data is imported as strings by default. You can convert properties
to other types using calculated properties. This enables numerical
operations on imported data.

csv5.ps1
  

Import-Csv "sales.csv" | Select-Object *,
    @{Name="Amount"; Expression={[int]$_.Amount}}

This converts the Amount column to integers. The @{} syntax creates a
calculated property. Original columns are preserved with Select-Object *.

## Handling headers

When a CSV file lacks headers, you can specify them with the -Header
parameter. Provide an array of column names. These become property names
for the imported objects.

csv6.ps1
  

Import-Csv "data_noheaders.csv" -Header "ID", "Name", "Value"

This imports a headerless CSV file and assigns column names. The first
row becomes data, not headers. All objects will have ID, Name, and Value
properties.

## Processing large CSV files

For large CSV files, use the pipeline efficiently to minimize memory usage.
Process rows one at a time rather than loading all data at once. This
approach scales better with large datasets.

csv7.ps1
  

Import-Csv "largefile.csv" | ForEach-Object {
    # Process each row here
    $_.Name
}

This processes each row individually as it's read from the file. The
ForEach-Object cmdlet handles one row at a time. Memory usage remains
constant regardless of file size.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Import-Csv cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).