+++
title = "VBScript ExecQuery Method"
date = 2025-08-29T20:15:42.177+01:00
draft = false
description = "Learn about VBScript ExecQuery method, including WMI queries, data retrieval, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ExecQuery Method

last modified April 9, 2025

The ExecQuery method in VBScript is part of the Windows Management
Instrumentation (WMI) interface. It executes a query to retrieve management
information from WMI providers. This method returns a collection of objects
matching the query criteria. It's essential for system administration scripts.

ExecQuery enables powerful system monitoring and configuration
through WMI queries. It supports complex filtering and selection of system data.
This tutorial covers ExecQuery with practical examples to demonstrate
its usage in various scenarios.

## ExecQuery Method Overview

The ExecQuery method takes a WQL (WMI Query Language) query string
as its parameter. It returns a collection of SWbemObject objects matching the
query. The method is available through the SWbemServices object in VBScript.

Key features include support for WQL syntax and filtering capabilities. It can
query various system components like processes, services, and hardware.
ExecQuery requires proper WMI namespace and authentication setup.
Understanding this method helps create powerful system management scripts.

## Basic Process Listing

This example demonstrates a simple WMI query to list running processes. It shows
how to connect to WMI and execute a basic query. The script retrieves and
displays all running processes on the system.

basic_process_list.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMIService.ExecQuery("Select * From Win32_Process")

For Each objProcess in colProcesses
    WScript.Echo "Process: " &amp; objProcess.Name
Next

The script connects to the WMI service using the root\cimv2 namespace. It
executes a query to select all processes from Win32_Process class. Each process
name is then displayed in a loop. This demonstrates basic WMI data retrieval.

## Filtered Service Query

This example shows how to use ExecQuery with a WHERE clause for
filtering. It retrieves only running services from the system. The query
demonstrates basic WQL filtering capabilities.

filtered_services.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
query = "Select * From Win32_Service Where State = 'Running'"
Set colServices = objWMIService.ExecQuery(query)

For Each objService in colServices
    WScript.Echo "Service: " &amp; objService.Name &amp; " (" &amp; objService.DisplayName &amp; ")"
Next

The script queries only services with State property equal to 'Running'. It
displays both the service name and display name for each match. This shows how
to narrow down query results using WQL conditions. Filtering improves efficiency
by reducing returned data.

## Hardware Information Retrieval

This example demonstrates querying hardware information using
ExecQuery. It retrieves basic system information including
processor, memory, and disk details. The script shows multiple WMI classes in
action.

hardware_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")

' Get processor information
Set colProcessors = objWMIService.ExecQuery("Select * From Win32_Processor")
For Each objProcessor in colProcessors
    WScript.Echo "Processor: " &amp; objProcessor.Name
Next

' Get memory information
Set colMemory = objWMIService.ExecQuery("Select * From Win32_PhysicalMemory")
For Each objMemory in colMemory
    WScript.Echo "Memory: " &amp; objMemory.Capacity/1024/1024 &amp; " MB"
Next

The script queries two different WMI classes: Win32_Processor and
Win32_PhysicalMemory. It demonstrates how to retrieve specific hardware
properties. The memory capacity is converted from bytes to megabytes for
readability. Multiple queries can be combined for comprehensive system reports.

## Event Log Query with Time Filter

This example shows advanced querying of Windows event logs with time-based
filtering. It retrieves specific events from the system log within a time
window. The script demonstrates WQL's date/time handling capabilities.

event_log_query.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
startTime = "20230401000000.000000-000"
endTime = "20230430235959.999999-000"

query = "Select * From Win32_NTLogEvent Where " &amp; _
        "LogFile = 'System' AND " &amp; _
        "TimeWritten &gt;= '" &amp; startTime &amp; "' AND " &amp; _
        "TimeWritten &lt;= '" &amp; endTime &amp; "'"

Set colEvents = objWMIService.ExecQuery(query)

For Each objEvent in colEvents
    WScript.Echo "Event: " &amp; objEvent.EventCode &amp; " - " &amp; objEvent.Message
Next

The script queries system events from April 2023 using WMI's datetime format. It
shows how to construct complex queries with multiple conditions. Event codes and
messages are displayed for matching entries. This demonstrates practical log
analysis capabilities.

## Network Adapter Configuration

This example retrieves network adapter configuration information using
ExecQuery. It shows IP addresses, MAC addresses, and adapter
status. The script demonstrates querying network-related WMI classes.

network_config.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")

' Get network adapter configuration
Set colAdapters = objWMIService.ExecQuery( _
    "Select * From Win32_NetworkAdapterConfiguration Where IPEnabled = True")

For Each objAdapter in colAdapters
    WScript.Echo "Adapter: " &amp; objAdapter.Description
    WScript.Echo "MAC: " &amp; objAdapter.MACAddress
    For Each strIP in objAdapter.IPAddress
        WScript.Echo "IP: " &amp; strIP
    Next
    WScript.Echo ""
Next

The script queries only IP-enabled network adapters using a WHERE clause. It
displays adapter description, MAC address, and all IP addresses. The example
shows handling of array properties (IPAddress) in WMI results. This is useful
for network inventory and troubleshooting.

## Source

[WMI ExecQuery Documentation](https://learn.microsoft.com/en-us/windows/win32/wmisdk/swbemservices-execquery)

In this article, we have explored the ExecQuery method in VBScript,
covering its usage and practical applications. From simple process listing to
complex event log queries, these examples demonstrate powerful system management
capabilities. With this knowledge, you can create robust administration scripts
using WMI.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).