+++
title = "VBScript AssociatorsOf Method"
date = 2025-08-29T20:15:41.078+01:00
draft = false
description = "Learn about VBScript AssociatorsOf method, including WMI associations, object relationships, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript AssociatorsOf Method

last modified April 9, 2025

The AssociatorsOf method in VBScript is part of the Windows
Management Instrumentation (WMI) infrastructure. It retrieves objects associated
with a specified source object through WMI associations. This method is powerful
for exploring relationships between system components.

AssociatorsOf helps navigate complex object relationships in WMI.
It returns a collection of objects related to the source object. This tutorial
covers AssociatorsOf with practical examples to demonstrate its
usage in system administration and monitoring.

## AssociatorsOf Method Overview

The AssociatorsOf method queries WMI for related objects. It takes
several parameters to refine the association search. These include association
class, result class, and role filters. The method returns a collection of SWbemObjectSet.

Key parameters include the source object path and optional qualifiers. It can
filter by association type or result class. AssociatorsOf is
available through the SWbemServices object in WMI scripting. Understanding this
method helps create advanced system management scripts.

## Basic Association Query

This example demonstrates the simplest use of AssociatorsOf to find
related objects. It shows how to retrieve services associated with a specific
process. The script connects to WMI and queries associations for Notepad.exe.

basic_associators.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("SELECT * FROM Win32_Process WHERE Name='notepad.exe'")

For Each objProcess in colProcesses
    Set colServices = objProcess.Associators_()
    WScript.Echo "Services associated with Notepad:"
    For Each objService in colServices
        WScript.Echo objService.Name
    Next
Next

The script connects to WMI and queries Notepad processes. It then calls
Associators_ (short for AssociatorsOf) on each process. The method
returns related services without any filters. This shows basic association
navigation in WMI.

## Filtering by Association Class

This example demonstrates filtering associations by class. It retrieves only
specific types of related objects. The script finds disk drives associated with
a particular partition using the Win32_DiskDriveToDiskPartition class.

filter_association_class.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colPartitions = objWMIService.ExecQuery("SELECT * FROM Win32_DiskPartition WHERE Index=0")

For Each objPartition in colPartitions
    Set colDrives = objPartition.Associators_("Win32_DiskDriveToDiskPartition")
    WScript.Echo "Disk drives for partition 0:"
    For Each objDrive in colDrives
        WScript.Echo objDrive.Caption &amp; " - " &amp; objDrive.DeviceID
    Next
Next

The script queries partition 0 and calls Associators_ with a
specific association class. This filters results to only disk drives connected
through that relationship. The output shows physical drives associated with the
partition.

## Specifying Result Class

This example shows how to filter results by the class of returned objects. It
retrieves only services associated with a process, ignoring other types. The
result class parameter ensures only Win32_Service objects are returned.

result_class_filter.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("SELECT * FROM Win32_Process WHERE Name='svchost.exe'")

For Each objProcess in colProcesses
    Set colServices = objProcess.Associators_(, "Win32_Service")
    WScript.Echo "Services hosted by svchost:"
    For Each objService in colServices
        WScript.Echo objService.DisplayName &amp; " (" &amp; objService.Name &amp; ")"
    Next
Next

The script queries svchost processes and requests only Win32_Service associated
objects. The empty first parameter means no association class filter. The second
parameter specifies the desired result class. This focuses the results on hosted
services.

## Using Role Parameter

This example demonstrates the role parameter to specify the relationship
direction. It finds processes that use a specific DLL file. The role parameter
identifies the DLL's role in the association.

role_parameter.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colFiles = objWMIService.ExecQuery("SELECT * FROM CIM_DataFile WHERE Name='C:\\Windows\\System32\\kernel32.dll'")

For Each objFile in colFiles
    Set colProcesses = objFile.Associators_(, "Win32_Process", "Dependent")
    WScript.Echo "Processes using kernel32.dll:"
    For Each objProcess in colProcesses
        WScript.Echo objProcess.Name &amp; " (PID: " &amp; objProcess.ProcessId &amp; ")"
    Next
Next

The script locates kernel32.dll and queries for dependent processes. The "Dependent"
role parameter specifies the DLL's role in the relationship. This returns
processes that depend on (use) the DLL, not other association directions.

## Full Parameter Usage

This example shows all major parameters used together. It retrieves network
adapters associated with a computer system, with specific filters. The query
demonstrates comprehensive control over association navigation.

full_parameters.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colSystems = objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem")

For Each objSystem in colSystems
    Set colAdapters = objSystem.Associators_("Win32_SystemDevices", "Win32_NetworkAdapter", "PartComponent")
    WScript.Echo "Network adapters for this computer:"
    For Each objAdapter in colAdapters
        WScript.Echo objAdapter.Name &amp; " - " &amp; objAdapter.MACAddress
    Next
Next

The script queries the computer system and finds associated network adapters. It
specifies the association class, result class, and role. This precise query
returns only network adapters connected through the Win32_SystemDevices
relationship as components.

## Source

[AssociatorsOf Documentation](https://learn.microsoft.com/en-us/windows/win32/wmisdk/swbemobject-associators-)

In this article, we have explored the AssociatorsOf method in VBScript,
covering its usage and practical applications. From basic association queries to
complex filtered relationships, these examples demonstrate powerful WMI navigation.
With this knowledge, you can create advanced system management scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).