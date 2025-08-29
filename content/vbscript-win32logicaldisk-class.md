+++
title = "VBScript Win32_LogicalDisk Class"
date = 2025-08-29T20:15:43.282+01:00
draft = false
description = "Learn about VBScript Win32_LogicalDisk class, including disk information retrieval, drive properties, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_LogicalDisk Class

last modified April 9, 2025

The Win32_LogicalDisk class in VBScript is part of Windows Management
Instrumentation (WMI). It represents data storage devices visible to Windows.
This class provides detailed information about logical disks on a system. It's
commonly used for disk management and monitoring tasks.

Win32_LogicalDisk exposes properties like size, free space, and file
system type. It works with all types of storage devices including HDDs, SSDs,
and network drives. This tutorial covers Win32_LogicalDisk with
practical examples to demonstrate its usage.

## Win32_LogicalDisk Class Overview

The Win32_LogicalDisk class is a WMI provider class that represents
logical disk partitions. It inherits from CIM_LogicalDisk and
provides Windows-specific extensions. The class can be accessed through WMI
queries in VBScript.

Key properties include DeviceID, Size,
FreeSpace, and FileSystem. Methods like
Chkdsk and Defrag are also available. Understanding
this class helps create robust disk management scripts.

## Listing All Logical Disks

This example demonstrates how to retrieve basic information about all logical
disks on a system. It shows the device ID, size, and free space for each disk.
The script uses WMI to query the Win32_LogicalDisk class.

list_disks.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colDisks = objWMIService.ExecQuery("Select * From Win32_LogicalDisk")

For Each objDisk in colDisks
    WScript.Echo "Device ID: " &amp; objDisk.DeviceID
    WScript.Echo "Size: " &amp; FormatNumber(objDisk.Size/1073741824, 2) &amp; " GB"
    WScript.Echo "Free Space: " &amp; FormatNumber(objDisk.FreeSpace/1073741824, 2) &amp; " GB"
    WScript.Echo "---------------------"
Next

The script connects to WMI and queries all logical disks. It loops through each
disk and displays key properties. The size values are converted from bytes to
GB for readability. This provides a quick overview of disk resources.

## Checking Disk Free Space

This example focuses on checking free space on a specific drive. It demonstrates
how to filter WMI queries to target a particular disk. The script calculates
free space percentage and issues a warning if low.

check_space.vbs
  

strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" &amp; strComputer &amp; "\root\cimv2")
Set colDisks = objWMIService.ExecQuery("Select * From Win32_LogicalDisk Where DeviceID = 'C:'")

For Each objDisk in colDisks
    freePercent = (objDisk.FreeSpace / objDisk.Size) * 100
    WScript.Echo "C: Drive Free Space: " &amp; Round(freePercent, 2) &amp; "%"
    
    If freePercent &lt; 10 Then
        WScript.Echo "WARNING: Low disk space on C: drive!"
    End If
Next

The script queries only the C: drive using a WMI filter. It calculates the
percentage of free space and displays it. A warning message appears if free
space drops below 10%. This is useful for disk monitoring scripts.

## Getting Disk File System Information

This example retrieves detailed file system information for all disks. It shows
the file system type, volume name, and serial number. These properties help
identify and manage disks in scripts.

filesystem_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colDisks = objWMIService.ExecQuery("Select * From Win32_LogicalDisk")

For Each objDisk in colDisks
    WScript.Echo "Drive: " &amp; objDisk.DeviceID
    WScript.Echo "File System: " &amp; objDisk.FileSystem
    WScript.Echo "Volume Name: " &amp; objDisk.VolumeName
    WScript.Echo "Volume Serial: " &amp; objDisk.VolumeSerialNumber
    WScript.Echo "---------------------"
Next

The script queries all logical disks and displays file system details. Each disk's
properties are shown in a formatted output. The volume serial number can be
useful for disk identification in scripts. This information helps with disk
management tasks.

## Monitoring Removable Drives

This example demonstrates how to identify removable drives. It filters disks by
drive type using the DriveType property. Removable drives have a
DriveType value of 2.

removable_drives.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colDisks = objWMIService.ExecQuery("Select * From Win32_LogicalDisk Where DriveType = 2")

WScript.Echo "Removable Drives Detected: " &amp; colDisks.Count

For Each objDisk in colDisks
    WScript.Echo "Drive: " &amp; objDisk.DeviceID
    WScript.Echo "Size: " &amp; FormatNumber(objDisk.Size/1048576, 2) &amp; " MB"
    WScript.Echo "---------------------"
Next

The script counts and lists all removable drives on the system. Each drive's
letter and size are displayed. The size is converted to MB for readability.
This is useful for scripts that need to handle USB drives or other removable
media.

## Checking Disk Health Status

This example checks the health status of disks using the
Status property. It identifies disks that might have problems.
The script provides a simple disk health monitoring solution.

disk_health.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colDisks = objWMIService.ExecQuery("Select * From Win32_LogicalDisk")

For Each objDisk in colDisks
    WScript.Echo "Drive: " &amp; objDisk.DeviceID
    WScript.Echo "Status: " &amp; objDisk.Status
    
    If objDisk.Status &lt;&gt; "OK" Then
        WScript.Echo "WARNING: Potential disk problem detected!"
    End If
    WScript.Echo "---------------------"
Next

The script checks the status of each logical disk. A warning message appears for
disks not reporting "OK" status. While basic, this can help identify failing
disks. More comprehensive health checks would require additional WMI classes.

## Source

[Win32_LogicalDisk Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-logicaldisk)

In this article, we have explored the Win32_LogicalDisk class in
VBScript, covering its usage and practical applications. From basic disk
information to health monitoring, these examples demonstrate powerful disk
management capabilities. With this knowledge, you can create robust scripts for
disk monitoring and management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).