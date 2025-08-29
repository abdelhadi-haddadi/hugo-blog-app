+++
title = "VBScript winmgmts Object"
date = 2025-08-29T20:15:46.625+01:00
draft = false
description = "Learn about VBScript winmgmts object, including WMI queries, system information, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript winmgmts Object

last modified April 9, 2025

The winmgmts object in VBScript provides access to Windows Management
Instrumentation (WMI). It allows scripts to query and manage system resources.
WMI offers a standardized way to interact with Windows system components.
This object is essential for system administration tasks in VBScript.

winmgmts can retrieve hardware information, manage services, and
monitor performance. It connects to local or remote computers through WMI.
This tutorial covers winmgmts with practical examples to demonstrate
its powerful capabilities.

## winmgmts Object Overview

The winmgmts object is a moniker that creates a WMI connection.
It provides access to WMI namespaces, classes, and instances. The object
supports querying system information using WQL (WMI Query Language).

Key features include hardware inventory, process management, and event
monitoring. It works with both local and remote systems when proper
credentials are provided. Understanding this object enables powerful
system administration scripts.

## Basic System Information Query

This example demonstrates a simple WMI query to get operating system
information. It shows how to connect to WMI and retrieve basic system
details. The script outputs the OS name, version, and build number.

basic_wmi_query.vbs
  

Set wmi = GetObject("winmgmts:\\.\root\cimv2")
Set os = wmi.ExecQuery("Select * from Win32_OperatingSystem")

For Each item in os
    WScript.Echo "OS Name: " &amp; item.Caption
    WScript.Echo "Version: " &amp; item.Version
    WScript.Echo "Build: " &amp; item.BuildNumber
Next

Set os = Nothing
Set wmi = Nothing

The script connects to the default WMI namespace (root\cimv2). It queries
the Win32_OperatingSystem class which contains OS information. The results
are displayed using a simple loop. This demonstrates basic WMI interaction.

## Listing Running Processes

This example shows how to retrieve a list of all running processes. It
demonstrates querying the Win32_Process WMI class. The script displays
process names and their process IDs.

list_processes.vbs
  

Set wmi = GetObject("winmgmts:\\.\root\cimv2")
Set processes = wmi.ExecQuery("Select * from Win32_Process")

WScript.Echo "Running Processes:"
WScript.Echo "------------------"

For Each proc in processes
    WScript.Echo proc.Name &amp; " (PID: " &amp; proc.ProcessID &amp; ")"
Next

Set processes = Nothing
Set wmi = Nothing

The script connects to WMI and queries the Win32_Process class. Each process
object contains properties like Name and ProcessID. The results are formatted
and displayed. This is useful for process monitoring and management.

## Checking Disk Space

This example demonstrates how to check disk space using WMI. It queries the
Win32_LogicalDisk class for disk information. The script calculates free
space percentage for each disk.

disk_space.vbs
  

Set wmi = GetObject("winmgmts:\\.\root\cimv2")
Set disks = wmi.ExecQuery("Select * from Win32_LogicalDisk Where DriveType = 3")

WScript.Echo "Disk Space Information:"
WScript.Echo "----------------------"

For Each disk in disks
    freeSpace = Round(disk.FreeSpace / 1073741824, 2)
    totalSpace = Round(disk.Size / 1073741824, 2)
    percentFree = Round((disk.FreeSpace / disk.Size) * 100, 2)
    
    WScript.Echo "Drive " &amp; disk.DeviceID &amp; ":"
    WScript.Echo "  Free: " &amp; freeSpace &amp; " GB"
    WScript.Echo "  Total: " &amp; totalSpace &amp; " GB"
    WScript.Echo "  % Free: " &amp; percentFree &amp; "%"
Next

Set disks = Nothing
Set wmi = Nothing

The script filters for fixed disks (DriveType = 3). It converts bytes to GB
for readability. The free space percentage is calculated and displayed.
This helps monitor disk usage in automated scripts.

## Managing Windows Services

This example shows how to query and control Windows services. It demonstrates
listing services and changing their state. The script can start or stop
services based on their current status.

manage_services.vbs
  

Set wmi = GetObject("winmgmts:\\.\root\cimv2")
Set services = wmi.ExecQuery("Select * from Win32_Service Where Name = 'Spooler'")

For Each svc in services
    WScript.Echo "Service: " &amp; svc.Name
    WScript.Echo "Display Name: " &amp; svc.DisplayName
    WScript.Echo "Status: " &amp; svc.State
    
    If svc.State = "Running" Then
        WScript.Echo "Stopping service..."
        svc.StopService()
    Else
        WScript.Echo "Starting service..."
        svc.StartService()
    End If
Next

Set services = Nothing
Set wmi = Nothing

The script queries the print spooler service as an example. It checks the
current state and toggles it. Service control methods like StartService and
StopService are demonstrated. This is useful for service management scripts.

## Monitoring CPU Temperature

This advanced example demonstrates reading CPU temperature through WMI.
Note that not all systems support this feature. The script shows how to
handle potential errors when querying specialized hardware information.

cpu_temperature.vbs
  

On Error Resume Next

Set wmi = GetObject("winmgmts:\\.\root\wmi")
Set temps = wmi.ExecQuery("Select * from MSAcpi_ThermalZoneTemperature")

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error accessing temperature data: " &amp; Err.Description
    WScript.Quit
End If

WScript.Echo "CPU Temperature Readings:"
WScript.Echo "-----------------------"

For Each temp in temps
    celsius = (temp.CurrentTemperature / 10) - 273.15
    WScript.Echo "Current Temperature: " &amp; Round(celsius, 1) &amp; "°C"
Next

If temps.Count = 0 Then
    WScript.Echo "No temperature sensors found"
End If

Set temps = Nothing
Set wmi = Nothing

The script connects to the WMI root\wmi namespace for hardware data. It
converts the temperature from kelvin to celsius. Error handling ensures
graceful failure on unsupported systems. This demonstrates advanced WMI usage.

## Source

[Windows WMI Documentation](https://learn.microsoft.com/en-us/windows/win32/wmisdk/wmi-start-page)

In this article, we have explored the winmgmts object in VBScript,
covering its usage and practical applications. From system information to
hardware monitoring, these examples demonstrate powerful WMI capabilities.
With this knowledge, you can create advanced system administration scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).