+++
title = "PowerShell Start-BitsTransfer"
date = 2025-08-29T20:07:17.627+01:00
draft = false
description = "PowerShell Start-BitsTransfer tutorial shows how to use PowerShell for background file transfers."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Start-BitsTransfer

last modified February 15, 2025

This article covers the Start-BitsTransfer cmdlet in PowerShell. 
It enables background file transfers using Windows BITS service. BITS stands 
for Background Intelligent Transfer Service. This service optimizes bandwidth 
usage and handles network interruptions gracefully.

## BITS basics

BITS is a Windows service for asynchronous file transfers. It automatically 
adjusts to available bandwidth and pauses during network outages. Transfers 
resume when connectivity is restored. BITS is ideal for large file transfers 
or unreliable networks. The service runs with low priority to avoid impacting 
other network applications.

## Basic file download

The simplest use of Start-BitsTransfer downloads a file from a URL. 
Specify the source URL and destination path. The transfer runs in the background. 
You can monitor progress with Get-BitsTransfer. The cmdlet returns 
a BITS job object.

bitstransfer1.ps1
  

Start-BitsTransfer -Source "https://example.com/largefile.zip" -Destination "C:\Downloads\"

This downloads largefile.zip to the Downloads folder. The transfer continues 
even if the PowerShell session ends. You can check status later with 
Get-BitsTransfer.

## Download with progress display

To monitor transfer progress, use the -DisplayName and 
-Asynchronous parameters. This creates a visible job in the 
BITS transfer queue. You can view progress in the Windows BITS admin console. 
The -Priority parameter adjusts transfer priority.

bitstransfer2.ps1
  

$job = Start-BitsTransfer -Source "https://example.com/update.exe" `
       -Destination "C:\Updates\" -DisplayName "Critical Update" `
       -Priority High -Asynchronous

This starts a high-priority transfer with a descriptive name. The $job 
variable stores the transfer object. Use it to check status or modify the transfer.

## Upload files with BITS

Start-BitsTransfer also supports file uploads to web servers. 
Specify the local file path and destination URL. The server must support BITS 
uploads. Authentication credentials can be provided when needed. Uploads benefit 
from the same reliability features as downloads.

bitstransfer3.ps1
  

Start-BitsTransfer -Source "C:\Reports\Q1.pdf" `
    -Destination "https://server/reports/upload.php" `
    -Credential (Get-Credential)

This uploads Q1.pdf to a web server. The -Credential parameter 
prompts for authentication. The transfer will automatically retry on failures.

## Multiple file transfer

You can transfer multiple files in one BITS job. Provide arrays of source 
and destination paths. This is efficient for related files. All files in the 
job share the same transfer settings. The job completes when all files transfer.

bitstransfer4.ps1
  

$sources = @("https://site.com/file1.txt", "https://site.com/file2.txt")
$destinations = @("C:\Data\file1.txt", "C:\Data\file2.txt")
Start-BitsTransfer -Source $sources -Destination $destinations

This transfers two files simultaneously. The sources and destinations arrays 
must have matching indexes. BITS manages the parallel transfers efficiently.

## Scheduled transfer with retry options

BITS transfers can be scheduled for specific times. Use -RetryTimeout 
and -RetryInterval to control retry behavior. This is useful for 
time-sensitive transfers. The transfer will attempt to complete within the 
specified timeframe.

bitstransfer5.ps1
  

Start-BitsTransfer -Source "https://backup.com/nightly.db" `
    -Destination "C:\Backups\" -RetryTimeout 180 -RetryInterval 30 `
    -ScheduledStartTime "22:00"

This schedules a backup transfer for 10 PM. If failed, it retries every 30 
minutes for 3 hours. The transfer won't impact daytime network performance.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Start-BitsTransfer cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).