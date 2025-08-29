+++
title = "VBScript Win32_BIOS Class"
date = 2025-08-29T20:15:43.286+01:00
draft = false
description = "Learn about VBScript Win32_BIOS class, including BIOS properties, system information, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_BIOS Class

last modified April 9, 2025

The Win32_BIOS class in VBScript provides access to BIOS information
through Windows Management Instrumentation (WMI). It contains properties about
the system BIOS firmware. This includes version, manufacturer, and release date.

Using Win32_BIOS, scripts can retrieve critical system firmware
details. This is useful for inventory, compliance checking, and system
administration. The class is part of the WMI root\cimv2 namespace.

## Win32_BIOS Class Overview

The Win32_BIOS class represents the BIOS firmware installed on a
computer. It inherits from CIM_BIOSElement in the CIM model. The
class provides read-only properties about the BIOS configuration.

Key properties include Manufacturer, Name, Version, and SerialNumber. The class
also provides SMBIOS-specific information. Access requires WMI permissions,
typically available to administrators.

## Retrieving Basic BIOS Information

This example demonstrates how to retrieve basic BIOS information using
Win32_BIOS. It shows manufacturer, version, and release date. The
script connects to WMI and queries the BIOS class.

basic_bios_info.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colBIOS = objWMIService.ExecQuery("Select * from Win32_BIOS")

For Each objBIOS in colBIOS
    WScript.Echo "Manufacturer: " &amp; objBIOS.Manufacturer
    WScript.Echo "Name: " &amp; objBIOS.Name
    WScript.Echo "Version: " &amp; objBIOS.Version
    WScript.Echo "Release Date: " &amp; objBIOS.ReleaseDate
Next

The script connects to WMI using GetObject. It queries all
instances of Win32_BIOS. The loop outputs key properties for each
BIOS instance. Most systems have only one BIOS instance.

## Checking BIOS Serial Number

This example retrieves the BIOS serial number, which is often used for asset
tracking. The serial number is a unique identifier for the system. Some systems
may not expose this property.

bios_serial.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colBIOS = objWMIService.ExecQuery("Select * from Win32_BIOS")

For Each objBIOS in colBIOS
    If IsNull(objBIOS.SerialNumber) Then
        WScript.Echo "Serial Number: Not Available"
    Else
        WScript.Echo "Serial Number: " &amp; objBIOS.SerialNumber
    End If
Next

The script checks if SerialNumber is null before displaying it. This handles
cases where the property isn't available. The output shows either the serial
number or a "Not Available" message.

## Determining SMBIOS Version

This example retrieves SMBIOS version information from the BIOS. SMBIOS is a
standard for delivering BIOS information. The version indicates the standard
compliance level.

smbios_version.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colBIOS = objWMIService.ExecQuery("Select * from Win32_BIOS")

For Each objBIOS in colBIOS
    WScript.Echo "SMBIOS Version: " &amp; objBIOS.SMBIOSBIOSVersion
    WScript.Echo "SMBIOS Major Version: " &amp; objBIOS.SMBIOSMajorVersion
    WScript.Echo "SMBIOS Minor Version: " &amp; objBIOS.SMBIOSMinorVersion
Next

The script outputs three SMBIOS-related properties. These indicate the BIOS
implementation of the SMBIOS standard. Higher versions typically support more
features and information.

## Checking BIOS Characteristics

The BIOS characteristics property contains flags indicating supported features.
This example decodes and displays these characteristics. Each bit represents a
different BIOS capability.

bios_characteristics.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colBIOS = objWMIService.ExecQuery("Select * from Win32_BIOS")

For Each objBIOS in colBIOS
    If Not IsNull(objBIOS.BIOSCharacteristics) Then
        WScript.Echo "Number of BIOS Characteristics: " &amp; _
            UBound(objBIOS.BIOSCharacteristics) + 1
    Else
        WScript.Echo "BIOS Characteristics not available"
    End If
Next

The script checks if BIOSCharacteristics is available. It then displays the
count of characteristics flags. Each flag would need additional decoding to
understand specific capabilities.

## Verifying BIOS Status

This example checks the BIOS status property. The status indicates whether the
BIOS is functioning properly. Common values include "OK", "Error", or
"Degraded".

bios_status.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colBIOS = objWMIService.ExecQuery("Select * from Win32_BIOS")

For Each objBIOS in colBIOS
    WScript.Echo "Status: " &amp; objBIOS.Status
    WScript.Echo "Primary BIOS: " &amp; objBIOS.PrimaryBIOS
Next

The script outputs both the BIOS status and whether it's the primary BIOS. On
most systems, the primary BIOS value will be TRUE. The status should normally be
"OK" for functioning systems.

## Source

[Win32_BIOS Class Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-bios)

In this article, we have explored the Win32_BIOS class in VBScript,
covering its usage and practical applications. From basic information retrieval
to specific property checks, these examples demonstrate BIOS data access. With
this knowledge, you can enhance your system management scripts with detailed
BIOS information.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).