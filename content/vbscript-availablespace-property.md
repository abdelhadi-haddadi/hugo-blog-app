+++
title = "VBScript AvailableSpace Property"
date = 2025-08-29T20:14:54.134+01:00
draft = false
description = "Learn about VBScript AvailableSpace property, including disk space checking, drive information, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript AvailableSpace Property

last modified April 9, 2025

The AvailableSpace property in VBScript is part of the
Drive object within the FileSystemObject. It returns
the amount of available space on a drive in bytes. This property is essential
for disk space monitoring and management tasks in scripts.

AvailableSpace provides the actual free space available to the user,
considering quotas. It differs from FreeSpace in some environments.
This tutorial covers AvailableSpace with practical examples to
demonstrate its usage in various scenarios.

## AvailableSpace Property Overview

The AvailableSpace property returns a numeric value representing
bytes available on a drive. It's accessed through a Drive object
obtained from FileSystemObject. The value includes space available
within the user's disk quota if quotas are enabled.

Key features include accurate space reporting and compatibility with all drive
types. It works with local drives, network shares, and removable media.
Understanding this property helps create robust disk management scripts.

## Basic AvailableSpace Check

This example demonstrates the simplest use of AvailableSpace to
check free space on the C: drive. It shows how to access the property and
display the raw byte value. The script provides a foundation for more complex
disk space checks.

basic_availablespace.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
availableBytes = drive.AvailableSpace

WScript.Echo "Available space on C: drive: " &amp; availableBytes &amp; " bytes"

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive object.
It then retrieves the AvailableSpace property value. The result is
displayed in bytes. This basic example forms the core of disk space checking.

## Converting Bytes to Readable Format

Raw byte values are hard to interpret, so this example converts the available
space to a human-readable format. It demonstrates calculating megabytes and
gigabytes from the byte value. The conversion makes the output more useful.

readable_format.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

bytes = drive.AvailableSpace
mb = bytes / (1024 * 1024)
gb = bytes / (1024 * 1024 * 1024)

WScript.Echo "Available space:"
WScript.Echo FormatNumber(bytes, 0) &amp; " bytes"
WScript.Echo FormatNumber(mb, 2) &amp; " MB"
WScript.Echo FormatNumber(gb, 2) &amp; " GB"

Set drive = Nothing
Set fso = Nothing

The script calculates megabytes and gigabytes from the raw byte value. It uses
FormatNumber for clean numeric display. This approach makes disk
space information more accessible to users and administrators.

## Checking Multiple Drives

This example demonstrates checking available space across all drives on a system.
It loops through the Drives collection and reports space for each.
The script shows how to handle different drive types and statuses.

multiple_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

For Each drive In fso.Drives
    If drive.IsReady Then
        gb = drive.AvailableSpace / (1024^3)
        WScript.Echo drive.DriveLetter &amp; ": " &amp; FormatNumber(gb, 2) &amp; " GB free"
    Else
        WScript.Echo drive.DriveLetter &amp; ": Drive not ready"
    End If
Next

Set fso = Nothing

The script checks each drive's readiness before accessing AvailableSpace.
It converts space to gigabytes for readability. The output shows available space
for all ready drives and skips unavailable ones. This approach prevents errors
with removable media.

## Low Disk Space Warning

This practical example creates a low disk space warning system. It checks if
available space falls below a specified threshold. The script demonstrates using
AvailableSpace for proactive system monitoring.

low_space_warning.vbs
  

Const WARNING_LEVEL_GB = 5 ' 5 GB threshold

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

availableGB = drive.AvailableSpace / (1024^3)

If availableGB &lt; WARNING_LEVEL_GB Then
    WScript.Echo "WARNING: Low disk space on C: drive!"
    WScript.Echo "Only " &amp; FormatNumber(availableGB, 2) &amp; " GB remaining"
Else
    WScript.Echo "Disk space OK: " &amp; FormatNumber(availableGB, 2) &amp; " GB free"
End If

Set drive = Nothing
Set fso = Nothing

The script defines a warning threshold of 5 GB. It compares the available space
against this threshold and issues appropriate messages. This approach can be
extended for automated alerts in maintenance scripts.

## Comparing AvailableSpace and FreeSpace

This example highlights the difference between AvailableSpace and
FreeSpace properties. It demonstrates both properties on the same
drive. The comparison helps understand when to use each property.

compare_properties.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")

availableGB = drive.AvailableSpace / (1024^3)
freeGB = drive.FreeSpace / (1024^3)

WScript.Echo "AvailableSpace: " &amp; FormatNumber(availableGB, 2) &amp; " GB"
WScript.Echo "FreeSpace: " &amp; FormatNumber(freeGB, 2) &amp; " GB"
WScript.Echo "Difference: " &amp; FormatNumber(freeGB - availableGB, 2) &amp; " GB"

Set drive = Nothing
Set fso = Nothing

The script displays both property values and their difference. On most systems,
these values will be identical. However, in quota-enabled environments,
AvailableSpace reflects the user's quota allowance.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the AvailableSpace property in
VBScript, covering its usage and practical applications. From basic checks to
advanced monitoring, these examples demonstrate reliable disk space management.
With this knowledge, you can enhance your system administration scripts with
robust disk space monitoring.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).