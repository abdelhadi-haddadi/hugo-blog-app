+++
title = "VBScript Win32_Processor Class"
date = 2025-08-29T20:15:45.520+01:00
draft = false
description = "Learn about VBScript Win32_Processor class, including CPU information retrieval, system monitoring, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_Processor Class

last modified April 9, 2025

The Win32_Processor class in VBScript is part of Windows Management
Instrumentation (WMI). It provides detailed information about the computer's CPU
and processor architecture. This class exposes numerous properties about system
processors. It's commonly used in system monitoring and inventory scripts.

Win32_Processor can retrieve data like CPU name, clock speed, cache
size, and more. It works across all modern Windows versions through WMI. This
tutorial covers Win32_Processor with practical examples to
demonstrate its usage.

## Win32_Processor Class Overview

The Win32_Processor class represents a processor on a Windows
system. It contains about 50 properties describing processor characteristics.
Access requires WMI connection through the winmgmts moniker. The
class provides read-only information about installed processors.

Key properties include Name, NumberOfCores, and
MaxClockSpeed. The class supports both single and multi-processor
systems. Understanding this class helps create robust system information scripts.

## Basic CPU Information Retrieval

This example demonstrates retrieving basic CPU information using
Win32_Processor. It shows how to connect to WMI and access common
processor properties. The script displays the CPU name, manufacturer, and clock
speed.

basic_cpu_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcessors = objWMIService.ExecQuery("Select * from Win32_Processor")

For Each objProcessor in colProcessors
    WScript.Echo "Processor Name: " &amp; objProcessor.Name
    WScript.Echo "Manufacturer: " &amp; objProcessor.Manufacturer
    WScript.Echo "Current Clock Speed: " &amp; objProcessor.CurrentClockSpeed &amp; " MHz"
Next

The script connects to WMI and queries all processor instances. It then loops
through each processor (for multi-CPU systems) and displays key properties.
The output includes the full processor name, manufacturer, and current speed.

## Retrieving CPU Architecture Information

This example shows how to determine the processor architecture using
Win32_Processor. It demonstrates accessing the
Architecture property and interpreting its numeric value. The script
converts the architecture code to a human-readable description.

cpu_architecture.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcessors = objWMIService.ExecQuery("Select * from Win32_Processor")

For Each objProcessor in colProcessors
    Select Case objProcessor.Architecture
        Case 0 arch = "x86"
        Case 1 arch = "MIPS"
        Case 2 arch = "Alpha"
        Case 3 arch = "PowerPC"
        Case 5 arch = "ARM"
        Case 6 arch = "ia64"
        Case 9 arch = "x64"
        Case Else arch = "Unknown"
    End Select
    
    WScript.Echo "Processor Architecture: " &amp; arch
Next

The script retrieves the numeric architecture value from WMI. It uses a
Select Case statement to map this to a descriptive string. Common
values include 0 for x86 and 9 for x64 architectures. The output shows the
processor's instruction set architecture.

## Checking CPU Cache Information

This example demonstrates retrieving CPU cache information using
Win32_Processor. It shows how to access L2 and L3 cache sizes. The
script displays cache information in kilobytes for better readability.

cpu_cache_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcessors = objWMIService.ExecQuery("Select * from Win32_Processor")

For Each objProcessor in colProcessors
    WScript.Echo "L2 Cache Size: " &amp; objProcessor.L2CacheSize &amp; " KB"
    WScript.Echo "L3 Cache Size: " &amp; objProcessor.L3CacheSize &amp; " KB"
    WScript.Echo "L2 Cache Speed: " &amp; objProcessor.L2CacheSpeed &amp; " MHz"
Next

The script queries the L2CacheSize, L3CacheSize, and
L2CacheSpeed properties. These values represent the processor's
cache characteristics. Note that some properties may return 0 on certain CPU
models or if the information is unavailable.

## Monitoring CPU Load

This example shows how to monitor current CPU load using
Win32_Processor. It demonstrates accessing the
LoadPercentage property. The script provides a simple CPU
utilization monitor.

cpu_load_monitor.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcessors = objWMIService.ExecQuery("Select * from Win32_Processor")

For Each objProcessor in colProcessors
    WScript.Echo "CPU Load: " &amp; objProcessor.LoadPercentage &amp; "%"
    WScript.Echo "Number of Cores: " &amp; objProcessor.NumberOfCores
    WScript.Echo "Number of Logical Processors: " &amp; objProcessor.NumberOfLogicalProcessors
Next

The script retrieves the current CPU load percentage for each processor. It also
shows core and logical processor counts. The LoadPercentage value
represents the current utilization across all cores. This is useful for system
monitoring scripts.

## Checking CPU Power Management

This example demonstrates checking CPU power management capabilities using
Win32_Processor. It shows how to access power-related properties
like current and maximum clock speeds. The script helps assess CPU power states.

cpu_power_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcessors = objWMIService.ExecQuery("Select * from Win32_Processor")

For Each objProcessor in colProcessors
    WScript.Echo "Current Clock Speed: " &amp; objProcessor.CurrentClockSpeed &amp; " MHz"
    WScript.Echo "Max Clock Speed: " &amp; objProcessor.MaxClockSpeed &amp; " MHz"
    WScript.Echo "Power Management Supported: " &amp; objProcessor.PowerManagementSupported
    WScript.Echo "CPU Status: " &amp; objProcessor.Status
Next

The script displays current and maximum CPU clock speeds, showing potential
throttling. It checks if power management is supported by the processor. The
Status property indicates the processor's operational state. This
information is valuable for power management scripts.

## Source

[Win32_Processor Class Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor)

In this article, we have explored the Win32_Processor class in
VBScript, covering its usage and practical applications. From basic CPU
information to power management details, these examples demonstrate system
monitoring capabilities. With this knowledge, you can enhance your system
information scripts with detailed processor data.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).