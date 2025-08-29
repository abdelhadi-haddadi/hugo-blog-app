+++
title = "PowerShell ConvertTo-Csv"
date = 2025-08-29T20:06:47.384+01:00
draft = false
description = "PowerShell ConvertTo-Csv tutorial shows how to convert objects to CSV format in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell ConvertTo-Csv

last modified February 15, 2025

This article covers the ConvertTo-Csv cmdlet in PowerShell. It converts objects into a series of CSV strings. The cmdlet is useful for data export and interoperability with other systems.

## CSV basics

CSV (Comma-Separated Values) is a simple file format for storing tabular data. Each line represents a record, with fields separated by commas. PowerShell objects can be serialized to CSV format for storage or transfer. The ConvertTo-Csv cmdlet handles this conversion.

## Basic ConvertTo-Csv usage

The simplest way to use ConvertTo-Csv is by piping objects to it. The cmdlet outputs CSV strings representing the input objects. The first line contains column headers. Subsequent lines contain the property values.

csv1.ps1
  

Get-Process | Select-Object -First 3 | ConvertTo-Csv

This command gets three processes and converts them to CSV format. The output includes headers and three data rows. Each property becomes a column in the CSV output.

PS C:\&gt; .\csv1.ps1
"Name","Id","PriorityClass","FileVersion","HandleCount","WorkingSet","PagedMemorySize","PrivateMemorySize","VirtualMemorySize","TotalProcessorTime","SI","Handles","VM","WS","PM","NPM","Path","Company","CPU","ProductVersion","Description","Product","BasePriority","ExitCode","HasExited","ExitTime","Handle","SafeHandle","MachineName","MainWindowHandle","MainWindowTitle","MainModule","MaxWorkingSet","MinWorkingSet","Modules","NonpagedSystemMemorySize","NonpagedSystemMemorySize64","PagedMemorySize64","PagedSystemMemorySize","PagedSystemMemorySize64","PeakPagedMemorySize","PeakPagedMemorySize64","PeakWorkingSet","PeakWorkingSet64","PeakVirtualMemorySize","PeakVirtualMemorySize64","PriorityBoostEnabled","PrivateMemorySize64","PrivilegedProcessorTime","ProcessName","ProcessorAffinity","Responding","SessionId","StartInfo","StartTime","SynchronizingObject","Threads","TotalProcessorTime","UserProcessorTime","VirtualMemorySize64","EnableRaisingEvents","StandardInput","StandardOutput","StandardError","WorkingSet64","Site","Container"
"ApplicationFrameHost","11928","Normal","10.0.19041.746 (WinBuild.160101.0800)","338","43417600","24862720","24862720","24862720","00:00:00.0312500",1,"338","24862720","43417600","24862720","24862720","C:\WINDOWS\system32\ApplicationFrameHost.exe","Microsoft Corporation","0.03125","10.0.19041.746","Application Frame Host","Microsoft® Windows® Operating System","8",,,,"11928",,".",0,"",,,,"0","0","24862720","0","0","24862720","24862720","43417600","43417600","24862720","24862720",True,"24862720","00:00:00.0156250","ApplicationFrameHost","1",True,1,,,,,"00:00:00.0312500","00:00:00.0156250","24862720",False,,,,,"43417600",,
"armsvc","1108","Normal",,"43","1269760","0","0","0","00:00:00",1,"43","0","1269760","0","0",,,,"0",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"audiodg","2588","Normal","10.0.19041.1 (WinBuild.160101.0800)","156","17653760","0","0","0","00:00:00.0156250",1,"156","0","17653760","0","0","C:\WINDOWS\system32\audiodg.exe","Microsoft Corporation","0.015625","10.0.19041.1","Windows Audio Device Graph Isolation","Microsoft® Windows® Operating System","13",,,,"2588",,".",0,"",,,,"0","0","0","0","0","0","0","17653760","17653760","0","0",True,"0","00:00:00","audiodg","1",True,0,,,,,"00:00:00.0156250","00:00:00.0156250","0",False,,,,,"17653760",,

## Custom delimiter in CSV output

By default, ConvertTo-Csv uses commas as delimiters. You can specify a different delimiter with the -Delimiter parameter. This is useful when commas are part of your data. Common alternatives include semicolons or tabs.

csv2.ps1
  

Get-Service | Select-Object -First 3 | ConvertTo-Csv -Delimiter ";"

This command converts service information to CSV with semicolon delimiters. The output structure remains the same but uses semicolons instead of commas. This format is often preferred in European locales.

## Excluding type information

ConvertTo-Csv includes type information by default in the first line. You can suppress this with the -NoTypeInformation parameter. This creates cleaner CSV files for most applications. The output starts directly with column headers.

csv3.ps1
  

Get-Process | Select-Object -First 3 | ConvertTo-Csv -NoTypeInformation

This command generates CSV output without the type information line. The result is more compatible with standard CSV parsers. Only property headers and data rows are included.

## Selecting specific properties

You can control which properties are included in the CSV output. Use Select-Object before converting to CSV. This reduces file size and focuses on relevant data. Only specified properties will appear in the output.

csv4.ps1
  

Get-Process | Select-Object Name, Id, CPU | ConvertTo-Csv -NoTypeInformation

This command exports only process names, IDs, and CPU usage to CSV. The output is more concise than the full object conversion. You can specify any properties available on the input objects.

## Saving CSV to a file

While ConvertTo-Csv outputs to the console, you can redirect to a file. Use the redirection operator (&gt;) or Out-File cmdlet. This creates persistent CSV files for later use. The file can be opened in Excel or other tools.

csv5.ps1
  

Get-Service | ConvertTo-Csv -NoTypeInformation | Out-File services.csv

This command saves service information to services.csv. The file contains CSV-formatted data ready for import elsewhere. Always use -NoTypeInformation for clean file output.

## Working with custom objects

ConvertTo-Csv works with any PowerShell objects, including custom ones. You can create objects with New-Object or Select-Object with calculated properties. The cmdlet handles these the same as system objects.

csv6.ps1
  

$customObjects = @(
    [PSCustomObject]@{Name="Server1"; Status="Online"; Uptime=120}
    [PSCustomObject]@{Name="Server2"; Status="Offline"; Uptime=0}
    [PSCustomObject]@{Name="Server3"; Status="Online"; Uptime=360}
)

$customObjects | ConvertTo-Csv

This example creates custom objects and converts them to CSV. The output includes all defined properties in header and data rows. Custom objects follow the same conversion rules as system objects.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

This article covered the ConvertTo-Csv cmdlet in PowerShell. We explored basic usage and advanced scenarios for data conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).