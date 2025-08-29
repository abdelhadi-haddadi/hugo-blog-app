+++
title = "PowerShell Get-NetAdapter"
date = 2025-08-29T20:06:58.464+01:00
draft = false
description = "PowerShell Get-NetAdapter tutorial shows how to use PowerShell to manage and monitor network adapters."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetAdapter

last modified February 15, 2025

In this article, we will cover the Get-NetAdapter cmdlet in
PowerShell. This cmdlet retrieves information about network adapters on a
system.

## Network adapter basics

A network adapter is hardware that connects a computer to a network. It can be
physical (Ethernet, Wi-Fi) or virtual (VPN, Hyper-V). Each adapter has properties
like name, status, speed, and MAC address. The Get-NetAdapter cmdlet
helps manage these network interfaces.

## Basic Get-NetAdapter usage

The simplest way to use Get-NetAdapter is without any parameters.
This lists all network adapters on the system. The output includes adapter names,
status, and interface descriptions. Each adapter is represented as a NetAdapter
object.

netadapter1.ps1
  

Get-NetAdapter

This command retrieves all network adapters. The output shows name, interface
description, status, and MAC address. Disabled and disconnected adapters are
included in the list.

## Get specific adapter by name

You can retrieve information about specific adapters by name. Use the -Name
parameter followed by the adapter name. Wildcards are supported for partial
matching. This is useful when working with particular network interfaces.

netadapter2.ps1
  

Get-NetAdapter -Name "Ethernet*"

This command returns all adapters with names starting with "Ethernet". The
asterisk acts as a wildcard for partial name matching. Multiple adapters may
be returned if they match the pattern.

PS C:\&gt; .\netadapter2.ps1

Name                      InterfaceDescription                    ifIndex Status       MacAddress             LinkSpeed
----                      --------------------                    ------- ------       ----------             ---------
Ethernet                  Microsoft Hyper-V Network Adapter            15 Up           00-15-5D-01-02-03        10 Gbps
Ethernet 2                Realtek PCIe GbE Family Controller           12 Disconnected 00-1A-2B-3C-4D-5E         1 Gbps

## Get enabled network adapters

You can filter adapters by their status using the -Physical parameter. This
shows only physical (non-virtual) adapters. Combine with Where-Object for more
complex filtering. This helps focus on active, physical network connections.

netadapter3.ps1
  

Get-NetAdapter -Physical | Where-Object { $_.Status -eq "Up" }

This command lists only physical adapters that are currently up/connected.
The $_ variable represents the current adapter in the pipeline. The Status
property can be "Up", "Disconnected", or "Disabled".

## Get adapter details with Format-List

The default table format can be changed using Format-List for
detailed information. This shows all available properties of the adapter object.
You can see advanced details like driver information and hardware capabilities.

netadapter4.ps1
  

Get-NetAdapter -Name "Wi-Fi" | Format-List *

This command shows all properties of the Wi-Fi adapter in list format. The
output includes driver version, NDIS version, and hardware characteristics.
This is useful for troubleshooting network issues.

## Get adapters with specific speed

You can filter adapters based on their link speed. This example shows adapters
with gigabit or faster connections. The Where-Object cmdlet filters by the
LinkSpeed property. Speeds are reported in bits per second.

netadapter5.ps1
  

Get-NetAdapter | Where-Object { $_.LinkSpeed -like "*Gbps*" }

This command lists adapters with gigabit or faster connection speeds. The
-like operator performs wildcard string matching. Adjust the pattern to find
specific speed ranges as needed.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetAdapter cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).