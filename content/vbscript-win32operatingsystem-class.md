+++
title = "VBScript Win32_OperatingSystem Class"
date = 2025-08-29T20:15:44.383+01:00
draft = false
description = "Learn about VBScript Win32_OperatingSystem class, including system information retrieval, version detection, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_OperatingSystem Class

last modified April 9, 2025

The Win32_OperatingSystem class in VBScript is part of Windows
Management Instrumentation (WMI). It provides detailed information about the
installed operating system. This class contains properties like version,
installation date, and system directory. It's essential for system administration
scripts.

Win32_OperatingSystem enables querying OS configuration and status.
It can retrieve both static information and dynamic system metrics. This tutorial
covers the class with practical examples to demonstrate its capabilities. You'll
learn to access valuable system information through VBScript.

## Win32_OperatingSystem Class Overview

The Win32_OperatingSystem class represents the operating system
installed on a computer. It inherits from CIM_OperatingSystem and
provides Windows-specific properties. The class is accessed through WMI queries
in VBScript.

Key properties include Caption, Version, and
BuildNumber. Methods like Reboot and
Shutdown allow system control. Understanding this class helps create
powerful system management scripts. It's available on all modern Windows
versions.

## Retrieving Basic OS Information

This example demonstrates how to retrieve basic operating system information.
It shows the OS name, version, and build number. The script connects to WMI and
queries the Win32_OperatingSystem class.

basic_os_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colOS = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")

For Each objOS in colOS
    WScript.Echo "OS Name: " &amp; objOS.Caption
    WScript.Echo "Version: " &amp; objOS.Version
    WScript.Echo "Build Number: " &amp; objOS.BuildNumber
Next

The script connects to WMI using GetObject. It queries all
instances of Win32_OperatingSystem. The loop outputs three key
properties: Caption, Version, and
BuildNumber. These provide basic identification of the OS.

## Checking System Uptime

This example calculates system uptime using the LastBootUpTime
property. It converts WMI's datetime format to a readable value. The script
shows how long the system has been running since last boot.

system_uptime.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colOS = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")

For Each objOS in colOS
    dtmBootup = objOS.LastBootUpTime
    dtmLastBootupTime = WMIDateStringToDate(dtmBootup)
    dtmSystemUptime = DateDiff("h", dtmLastBootupTime, Now)
    WScript.Echo "System Uptime: " &amp; dtmSystemUptime &amp; " hours"
Next

Function WMIDateStringToDate(dtmDate)
    WMIDateStringToDate = CDate(Mid(dtmDate, 5, 2) &amp; "/" &amp; _
        Mid(dtmDate, 7, 2) &amp; "/" &amp; Left(dtmDate, 4) _
        &amp; " " &amp; Mid(dtmDate, 9, 2) &amp; ":" &amp; _
        Mid(dtmDate, 11, 2) &amp; ":" &amp; Mid(dtmDate, 13, 2))
End Function

The script retrieves LastBootUpTime and converts it using a helper
function. DateDiff calculates hours between boot time and now. The
WMIDateStringToDate function handles WMI's unique datetime format.
This provides accurate uptime measurement.

## Checking Free Physical Memory

This example shows how to check available physical memory using the
FreePhysicalMemory property. It converts the value from KB to GB
for better readability. The script demonstrates monitoring system resources.

free_memory.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colOS = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")

For Each objOS in colOS
    freeKB = objOS.FreePhysicalMemory
    freeGB = Round(freeKB / 1048576, 2)
    WScript.Echo "Free Physical Memory: " &amp; freeGB &amp; " GB"
Next

The script queries FreePhysicalMemory which returns kilobytes. It
converts this to gigabytes by dividing by 1048576 (1024*1024). The
Round function formats the output to two decimal places. This helps
monitor system memory usage.

## Determining OS Architecture

This example determines whether the OS is 32-bit or 64-bit using the
OSArchitecture property. It provides clear output about the system
type. The script shows how to check processor architecture compatibility.

os_architecture.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colOS = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")

For Each objOS in colOS
    WScript.Echo "OS Architecture: " &amp; objOS.OSArchitecture
Next

The script simply outputs the OSArchitecture property value. This
returns strings like "32-bit" or "64-bit" directly. Knowing the OS architecture
is crucial for software compatibility. The property is available on Windows Vista
and later.

## Getting System Directory Path

This example retrieves the Windows system directory path using the
SystemDirectory property. It shows where critical system files are
located. The script demonstrates accessing important system paths.

system_directory.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colOS = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")

For Each objOS in colOS
    WScript.Echo "System Directory: " &amp; objOS.SystemDirectory
Next

The script outputs the full path to the system directory (typically
C:\Windows\System32). This information is useful for file operations involving
system files. The property reliably returns the correct path regardless of
Windows version or installation location.

## Source

[Win32_OperatingSystem Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-operatingsystem)

In this article, we have explored the Win32_OperatingSystem class
in VBScript, covering its usage and practical applications. From basic OS
identification to resource monitoring, these examples demonstrate powerful system
information retrieval. With this knowledge, you can create sophisticated system
administration scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).