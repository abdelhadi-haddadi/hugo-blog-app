+++
title = "VBScript SerialNumber Property"
date = 2025-08-29T20:15:13.152+01:00
draft = false
description = "Learn about VBScript SerialNumber property, including drive identification, volume tracking, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SerialNumber Property

last modified April 9, 2025

The SerialNumber property in VBScript is part of the
Drive object within the FileSystemObject. It returns
a unique decimal number assigned to a disk volume during formatting. This number
helps identify and track storage devices in scripts. It's read-only and cannot
be modified programmatically.

The serial number remains constant unless the drive is reformatted. It's useful
for license verification and drive identification tasks. This tutorial covers
SerialNumber with practical examples to demonstrate its usage.

## SerialNumber Property Overview

The SerialNumber property retrieves a drive's unique identification
number. This number is assigned when the volume is formatted. The property is
accessed through a Drive object in VBScript scripting.

Key features include persistent identification across system reboots. The
number is displayed in decimal format by default. It works with all drive types
including HDDs, SSDs, and removable media. Understanding this property helps
create robust drive management scripts.

## Basic Serial Number Retrieval

This example demonstrates the simplest use of SerialNumber to get
a drive's identification number. It shows how to access the property for the
system drive. The script displays the serial number in decimal format.

basic_serialnumber.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
WScript.Echo "Drive C: Serial Number: " &amp; drive.SerialNumber

Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive object.
It then retrieves and displays the serial number property. The output shows the
unique decimal identifier assigned to the volume during formatting.

## Converting Serial Number to Hexadecimal

Drive serial numbers are often displayed in hexadecimal format in system tools.
This example shows how to convert the decimal serial number to hexadecimal. The
result matches what you'd see in command-line tools.

hex_serialnumber.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
decSerial = drive.SerialNumber
hexSerial = Hex(decSerial)

WScript.Echo "Decimal: " &amp; decSerial
WScript.Echo "Hexadecimal: " &amp; hexSerial

Set drive = Nothing
Set fso = Nothing

The script retrieves the decimal serial number then converts it using VBScript's
Hex function. This matches the format shown in Windows utilities
like vol command. The hexadecimal representation is more commonly
used for display purposes.

## Checking Multiple Drive Serial Numbers

This example shows how to retrieve serial numbers for all available drives on
a system. It demonstrates iterating through the Drives collection.
Each drive's letter and serial number are displayed.

all_drives_serial.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive In drives
    If drive.IsReady Then
        WScript.Echo drive.DriveLetter &amp; ": " &amp; drive.SerialNumber
    End If
Next

Set drives = Nothing
Set fso = Nothing

The script enumerates all available drives and checks if they're ready. For each
ready drive, it displays the drive letter and serial number. The
IsReady check prevents errors with unavailable drives like empty
CD-ROMs.

## Comparing Drive Serial Numbers

This example demonstrates using serial numbers to compare drives. It checks if
two specified drives have the same serial number. This technique can detect when
the same physical drive is mounted with different letters.

compare_serial.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive1 = fso.GetDrive("C:")
Set drive2 = fso.GetDrive("D:")

If drive1.SerialNumber = drive2.SerialNumber Then
    WScript.Echo "Drives have the same serial number"
Else
    WScript.Echo "Drives have different serial numbers"
End If

Set drive1 = Nothing
Set drive2 = Nothing
Set fso = Nothing

The script retrieves serial numbers for drives C: and D:. It compares them and
reports whether they match. This approach is useful for detecting mirrored
drives or when multiple paths point to the same physical storage.

## Creating a Drive Inventory Report

This comprehensive example creates a detailed drive inventory report. It collects
multiple properties including serial numbers for all available drives. The output
is formatted for easy reading and logging.

drive_inventory.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

WScript.Echo "Drive Inventory Report"
WScript.Echo "----------------------"
WScript.Echo "Generated: " &amp; Now()
WScript.Echo ""

For Each drive In drives
    If drive.IsReady Then
        WScript.Echo "Drive Letter: " &amp; drive.DriveLetter
        WScript.Echo "Serial Number: " &amp; drive.SerialNumber
        WScript.Echo "Volume Name: " &amp; drive.VolumeName
        WScript.Echo "File System: " &amp; drive.FileSystem
        WScript.Echo "Total Size: " &amp; FormatNumber(drive.TotalSize/1073741824, 2) &amp; " GB"
        WScript.Echo "Free Space: " &amp; FormatNumber(drive.FreeSpace/1073741824, 2) &amp; " GB"
        WScript.Echo "----------------------"
    End If
Next

Set drives = Nothing
Set fso = Nothing

The script generates a comprehensive report with multiple drive properties. Serial
numbers are included alongside capacity and filesystem information. The output
is formatted with clear labels and separators for readability. This demonstrates
practical use of serial numbers in system inventory scripts.

## Source

[Drive Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/2x9w8a9a(v=vs.84))

In this article, we have explored the SerialNumber property in
VBScript, covering its usage and practical applications. From basic retrieval to
complex drive comparison and inventory tasks, these examples demonstrate its
versatility. With this knowledge, you can enhance your drive management scripts
with reliable device identification.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).