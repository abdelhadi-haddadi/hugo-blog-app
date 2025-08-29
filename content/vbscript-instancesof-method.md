+++
title = "VBScript InstancesOf Method"
date = 2025-08-29T20:15:43.289+01:00
draft = false
description = "Learn about VBScript InstancesOf method, including WMI queries, object enumeration, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript InstancesOf Method

last modified April 9, 2025

The InstancesOf method in VBScript is part of the Windows Management
Instrumentation (WMI) interface. It queries WMI for all instances of a specified
class. This method returns a collection of objects matching the query criteria.
It's commonly used for system administration and monitoring tasks.

InstancesOf provides access to hardware, software, and system
information. It enables powerful system management capabilities through WMI.
This tutorial covers InstancesOf with practical examples to
demonstrate its usage in various scenarios.

## InstancesOf Method Overview

The InstancesOf method is called on a WMI service object. It takes
a single parameter: the WMI class name to query. The method returns a collection
of SWbemObject instances representing the queried objects.

Key features include access to system information and hardware details. It
requires proper WMI permissions to execute successfully. InstancesOf
works with both local and remote systems when properly configured.

## Basic Process Enumeration

This example demonstrates querying running processes using InstancesOf.
It shows how to retrieve basic process information. The script connects to WMI
and queries the Win32_Process class.

basic_processes.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.InstancesOf("Win32_Process")

For Each objProcess in colProcesses
    WScript.Echo "Process: " &amp; objProcess.Name &amp; " (ID: " &amp; objProcess.ProcessId &amp; ")"
Next

The script connects to the local WMI service and queries all processes. It then
iterates through the collection, displaying each process name and ID. This is a
foundational example of WMI data retrieval.

## Querying Disk Drives

This example shows how to retrieve information about physical disk drives. It
demonstrates querying the Win32_DiskDrive class. The script displays basic
drive properties for each installed disk.

disk_drives.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colDisks = objWMIService.InstancesOf("Win32_DiskDrive")

For Each objDisk in colDisks
    WScript.Echo "Model: " &amp; objDisk.Model
    WScript.Echo "Size: " &amp; Round(objDisk.Size/1073741824, 2) &amp; " GB"
    WScript.Echo "Interface: " &amp; objDisk.InterfaceType
    WScript.Echo "---"
Next

The script connects to WMI and queries disk drive information. It displays the
model, size (converted to GB), and interface type for each drive. This example
shows practical hardware information retrieval.

## Checking Installed Software

This example demonstrates querying installed software using the Win32_Product
class. It shows how to retrieve software names and versions. The script provides
a basic software inventory capability.

installed_software.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colSoftware = objWMIService.InstancesOf("Win32_Product")

For Each objProduct in colSoftware
    WScript.Echo "Name: " &amp; objProduct.Name
    WScript.Echo "Version: " &amp; objProduct.Version
    WScript.Echo "Vendor: " &amp; objProduct.Vendor
    WScript.Echo "---"
Next

The script queries all installed software products through WMI. It displays the
name, version, and vendor for each product. Note that this query might be slow
on systems with many installed applications.

## Monitoring Network Adapters

This example shows how to retrieve network adapter information. It queries the
Win32_NetworkAdapterConfiguration class. The script displays IP configuration
details for each network adapter.

network_adapters.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colAdapters = objWMIService.InstancesOf("Win32_NetworkAdapterConfiguration")

For Each objAdapter in colAdapters
    If Not IsNull(objAdapter.IPAddress) Then
        WScript.Echo "Description: " &amp; objAdapter.Description
        WScript.Echo "IP Address: " &amp; Join(objAdapter.IPAddress, ", ")
        WScript.Echo "Subnet Mask: " &amp; Join(objAdapter.IPSubnet, ", ")
        WScript.Echo "---"
    End If
Next

The script retrieves all network adapter configurations. It filters to show only
adapters with IP addresses assigned. The Join function combines array values for
cleaner output of multiple IP addresses.

## Checking System BIOS Information

This final example demonstrates querying BIOS information. It uses the
Win32_BIOS class to retrieve system BIOS details. The script displays version,
manufacturer, and release date.

bios_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colBIOS = objWMIService.InstancesOf("Win32_BIOS")

For Each objBIOS in colBIOS
    WScript.Echo "Manufacturer: " &amp; objBIOS.Manufacturer
    WScript.Echo "Version: " &amp; objBIOS.Version
    WScript.Echo "Release Date: " &amp; objBIOS.ReleaseDate
    WScript.Echo "SMBIOS Version: " &amp; objBIOS.SMBIOSBIOSVersion
Next

The script retrieves BIOS information from the system. It displays key details
about the BIOS firmware. This example shows how to access low-level system
information through WMI.

## Source

[WMI InstancesOf Documentation](https://learn.microsoft.com/en-us/windows/win32/wmisdk/swbemservices-instancesof)

In this article, we have explored the InstancesOf method in VBScript,
covering its usage and practical applications. From process monitoring to hardware
inventory, these examples demonstrate powerful system management capabilities.
With this knowledge, you can create robust administrative scripts using WMI.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).