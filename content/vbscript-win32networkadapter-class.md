+++
title = "VBScript Win32_NetworkAdapter Class"
date = 2025-08-29T20:15:44.419+01:00
draft = false
description = "Learn about VBScript Win32_NetworkAdapter class, including network adapter properties, configuration, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_NetworkAdapter Class

last modified April 9, 2025

The Win32_NetworkAdapter class in VBScript provides access to network
adapter properties through WMI. It represents the network interface hardware and
software in a Windows system. This class offers detailed information about each
network adapter installed on the computer.

Win32_NetworkAdapter includes properties like MAC address, adapter
type, speed, and connection status. It's part of Windows Management
Instrumentation (WMI) infrastructure. This tutorial covers the class with
practical examples to demonstrate its usage.

## Win32_NetworkAdapter Class Overview

The Win32_NetworkAdapter class contains over 50 properties
describing network interfaces. These include both physical and logical network
adapters. The class provides read-only access to adapter configuration.

Key properties include Name, MACAddress,
Speed, and NetConnectionStatus. The class can be
accessed through WMI using VBScript's GetObject function.
Understanding this class helps in network configuration scripts.

## Listing All Network Adapters

This example demonstrates how to retrieve basic information about all network
adapters on a system. It shows the adapter name, MAC address, and connection
status. The script connects to WMI and queries the Win32_NetworkAdapter class.

list_adapters.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colAdapters = objWMIService.ExecQuery("SELECT * FROM Win32_NetworkAdapter")

For Each objAdapter in colAdapters
    WScript.Echo "Name: " &amp; objAdapter.Name
    WScript.Echo "MAC Address: " &amp; objAdapter.MACAddress
    WScript.Echo "Status: " &amp; objAdapter.NetConnectionStatus
    WScript.Echo "---------------------"
Next

The script creates a WMI connection and executes a query for all network
adapters. It then loops through each adapter and displays key properties. The
output includes the adapter name, MAC address, and current connection status.

## Filtering Physical Network Adapters

This example shows how to filter for only physical network adapters. Many
systems have virtual adapters that aren't actual hardware. The script uses a WQL
query to exclude virtual and non-physical adapters.

physical_adapters.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
strQuery = "SELECT * FROM Win32_NetworkAdapter WHERE PhysicalAdapter = True"
Set colAdapters = objWMIService.ExecQuery(strQuery)

For Each objAdapter in colAdapters
    WScript.Echo "Physical Adapter: " &amp; objAdapter.Name
    WScript.Echo "Adapter Type: " &amp; objAdapter.AdapterType
    WScript.Echo "Speed: " &amp; objAdapter.Speed / 1000000 &amp; " Mbps"
    WScript.Echo "---------------------"
Next

The script adds a WHERE clause to the WQL query to filter for physical adapters.
It then displays the name, type, and speed of each physical adapter. The speed
is converted from bits to megabits for readability.

## Checking Network Connection Status

This example demonstrates checking the connection status of network adapters. It
translates the numeric status codes to human-readable text. The script helps
identify which adapters are currently connected.

connection_status.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colAdapters = objWMIService.ExecQuery("SELECT * FROM Win32_NetworkAdapter")

For Each objAdapter in colAdapters
    Select Case objAdapter.NetConnectionStatus
        Case 0 statusText = "Disconnected"
        Case 1 statusText = "Connecting"
        Case 2 statusText = "Connected"
        Case 3 statusText = "Disconnecting"
        Case 4 statusText = "Hardware not present"
        Case 5 statusText = "Hardware disabled"
        Case 6 statusText = "Hardware malfunction"
        Case 7 statusText = "Media disconnected"
        Case 8 statusText = "Authenticating"
        Case 9 statusText = "Authentication succeeded"
        Case 10 statusText = "Authentication failed"
        Case Else statusText = "Unknown status"
    End Select
    
    WScript.Echo objAdapter.Name &amp; ": " &amp; statusText
Next

The script retrieves all network adapters and checks their connection status. It
uses a Select Case statement to translate numeric status codes. Each adapter's
name and readable status are displayed in the output.

## Finding Adapters with IP Addresses

This example shows how to find network adapters that have IP addresses assigned.
It combines information from Win32_NetworkAdapter and Win32_NetworkAdapter-
Configuration classes. The script displays adapters with active IP configurations.

adapters_with_ip.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
strQuery = "SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = True"
Set colConfigs = objWMIService.ExecQuery(strQuery)

For Each objConfig in colConfigs
    Set colAdapters = objWMIService.ExecQuery( _
        "SELECT * FROM Win32_NetworkAdapter WHERE DeviceID = " &amp; objConfig.Index)
    
    For Each objAdapter in colAdapters
        WScript.Echo "Adapter: " &amp; objAdapter.Name
        WScript.Echo "MAC: " &amp; objAdapter.MACAddress
        WScript.Echo "IP: " &amp; Join(objConfig.IPAddress, ", ")
        WScript.Echo "---------------------"
    Next
Next

The script first queries for enabled network adapter configurations. For each
configuration, it finds the corresponding adapter by DeviceID. The output shows
the adapter name, MAC address, and assigned IP addresses. This helps identify
active network interfaces.

## Disabling a Network Adapter

This advanced example demonstrates how to disable a network adapter using WMI.
It first lists available adapters, then disables the selected one. Note that
this requires administrative privileges.

disable_adapter.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colAdapters = objWMIService.ExecQuery("SELECT * FROM Win32_NetworkAdapter")

' List adapters first
WScript.Echo "Available Network Adapters:"
i = 1
For Each objAdapter in colAdapters
    WScript.Echo i &amp; ") " &amp; objAdapter.Name
    i = i + 1
Next

' Prompt for adapter to disable
adapterIndex = InputBox("Enter the number of the adapter to disable:")
If adapterIndex = "" Then WScript.Quit

' Find and disable the selected adapter
i = 1
For Each objAdapter in colAdapters
    If i = CInt(adapterIndex) Then
        WScript.Echo "Disabling " &amp; objAdapter.Name &amp; "..."
        errDisable = objAdapter.Disable()
        If errDisable = 0 Then
            WScript.Echo "Adapter disabled successfully"
        Else
            WScript.Echo "Error disabling adapter: " &amp; errDisable
        End If
        Exit For
    End If
    i = i + 1
Next

The script first lists all available network adapters with numbers. It prompts
the user to select an adapter by number. The selected adapter is then disabled
using the Disable method. Error handling checks if the operation succeeded.

## Source

[Win32_NetworkAdapter Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-networkadapter)

In this article, we have explored the Win32_NetworkAdapter class
in VBScript, covering its properties and practical applications. From listing
adapters to checking status and managing connections, these examples demonstrate
powerful network management capabilities. With this knowledge, you can create
advanced network configuration scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).