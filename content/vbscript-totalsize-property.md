+++
title = "VBScript TotalSize Property"
date = 2025-08-29T20:15:15.390+01:00
draft = false
description = "Learn about VBScript TotalSize property, including disk space calculations, drive information, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript TotalSize Property

last modified April 9, 2025

The TotalSize property in VBScript is part of the
FileSystemObject and Drive objects. It returns the
total size of a drive or folder in bytes. This property is read-only and
provides valuable information about storage capacity. It's commonly used in
disk management scripts.

TotalSize helps monitor disk space and manage storage resources.
The property works with both local and network drives. This tutorial covers
TotalSize with practical examples to demonstrate its usage.
Understanding this property is essential for storage-related scripting.

## TotalSize Property Overview

The TotalSize property returns the total capacity of a storage
device in bytes. It's available through the Drive object in
VBScript. The property represents the raw storage capacity before formatting.

Key features include working with all drive types (HDD, SSD, network). It
doesn't account for filesystem overhead or reserved space. TotalSize
is often used with FreeSpace for disk analysis. Understanding this
property helps create effective storage management tools.

## Getting Drive Total Size

This example demonstrates how to retrieve the total size of a drive. It shows
basic usage of the TotalSize property. The script gets the C: drive
capacity and displays it in bytes.

basic_totalsize.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

WScript.Echo "Total size of C: drive: " &amp; drive.TotalSize &amp; " bytes"

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive
reference. It then accesses the TotalSize property. The output
shows the drive's total capacity in bytes. This is the foundation for more
complex disk space calculations.

## Converting Bytes to Gigabytes

Raw byte values are hard to interpret, so conversion to gigabytes is useful.
This example shows how to convert the TotalSize output to a more
readable format. The conversion makes the disk capacity easier to understand.

convert_gb.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

totalGB = drive.TotalSize / (1024 ^ 3)
WScript.Echo "Total size: " &amp; FormatNumber(totalGB, 2) &amp; " GB"

Set drive = Nothing
Set fso = Nothing

The script calculates gigabytes by dividing bytes by 1024^3 (1 GB in bytes).
FormatNumber displays the result with 2 decimal places. This
approach provides a more user-friendly representation of drive capacity.
The conversion is essential for human-readable reports.

## Checking Multiple Drives

This example demonstrates checking TotalSize for all available
drives. It loops through the Drives collection and displays each
drive's capacity. The script handles both ready and unavailable drives.

all_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

For Each drive In fso.Drives
    If drive.IsReady Then
        totalGB = drive.TotalSize / (1024 ^ 3)
        WScript.Echo drive.DriveLetter &amp; ": " &amp; FormatNumber(totalGB, 2) &amp; " GB"
    Else
        WScript.Echo drive.DriveLetter &amp; ": Not ready"
    End If
Next

Set fso = Nothing

The script iterates through all drives in the system. For each ready drive, it
calculates and displays the total size in GB. Unavailable drives show a "Not
ready" message. This approach provides a complete system storage overview.
The IsReady check prevents errors with inaccessible drives.

## Calculating Used Space Percentage

This example combines TotalSize with FreeSpace to
calculate used space percentage. It shows how to derive useful metrics from
drive properties. The percentage helps monitor disk utilization.

used_percentage.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

If drive.IsReady Then
    usedPct = 100 - ((drive.FreeSpace / drive.TotalSize) * 100)
    WScript.Echo "Drive C: used space: " &amp; FormatNumber(usedPct, 2) &amp; "%"
Else
    WScript.Echo "Drive C: not ready"
End If

Set drive = Nothing
Set fso = Nothing

The script calculates used space by comparing FreeSpace to
TotalSize. The result shows what percentage of the drive is
occupied. This metric is valuable for disk monitoring scripts. The
FormatNumber function ensures clean percentage display.

## Network Drive Capacity Check

TotalSize works with network drives just like local ones. This
example shows checking capacity of a mapped network drive. The approach is
identical to local drives but requires proper permissions.

network_drive.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("Z:")

If drive.IsReady Then
    totalTB = drive.TotalSize / (1024 ^ 4)
    WScript.Echo "Network drive Z: capacity: " &amp; FormatNumber(totalTB, 3) &amp; " TB"
Else
    WScript.Echo "Network drive Z: not available"
End If

Set drive = Nothing
Set fso = Nothing

The script checks a network drive (Z:) and displays its capacity in terabytes.
The calculation uses 1024^4 for TB conversion. This demonstrates
TotalSize's versatility across storage types. Network drives must
be properly mapped and accessible for this to work.

## Source

[Drive Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2z9ffy98(v=vs.84))

In this article, we have explored the TotalSize property in VBScript,
covering its usage and practical applications. From basic drive capacity checks
to advanced storage metrics, these examples demonstrate valuable disk management
techniques. With this knowledge, you can create powerful storage monitoring
scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).