+++
title = "PowerShell Get-NetIPInterface"
date = 2025-08-29T20:07:00.765+01:00
draft = false
description = "PowerShell Get-NetIPInterface tutorial shows how to use PowerShell to manage and monitor network IP interfaces."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetIPInterface

last modified February 15, 2025

In this article, we will cover the Get-NetIPInterface cmdlet in
PowerShell. This cmdlet retrieves information about IP interface configurations.
It helps manage network interfaces and their IP-related properties.

## IP Interface basics

An IP interface represents the configuration of a network interface at the
IP layer. It includes properties like interface index, address family, and
DHCP status. The Get-NetIPInterface cmdlet provides access to
these configurations. It's part of the NetTCPIP module in PowerShell.

## Basic Get-NetIPInterface usage

The simplest way to use Get-NetIPInterface is without parameters.
This lists all IP interfaces on the system. The output includes interface
indexes, addresses, and states. Each interface is represented as an object.

ipinterface1.ps1
  

Get-NetIPInterface

This command retrieves all IP interfaces on the system. The output shows
interface indexes, address families, and connection states. IPv4 and IPv6
interfaces are both included.

## Filter interfaces by address family

You can filter interfaces by their address family using the -AddressFamily
parameter. Valid values are IPv4 and IPv6. This helps when you need to work
with only one IP version. The filtering occurs at the cmdlet level.

ipinterface2.ps1
  

Get-NetIPInterface -AddressFamily IPv4

This command returns only IPv4 interfaces. The output excludes all IPv6
configurations. This is useful when troubleshooting IPv4-specific issues.

PS C:\&gt; .\ipinterface2.ps1

ifIndex InterfaceAlias                  AddressFamily NlMtu(Bytes) InterfaceMetric Dhcp     ConnectionState PolicyStore
------- --------------                  ------------- ------------ --------------- ----     --------------- -----------
12      Ethernet                        IPv4                  1500              25 Enabled  Connected       ActiveStore
1       Loopback Pseudo-Interface 1     IPv4            4294967295              75 Disabled Connected       ActiveStore

## Get interface by interface index

Interfaces can be retrieved by their unique interface index. This provides
precise identification of a specific interface. Use the -InterfaceIndex
parameter followed by the index number. Each interface has a unique index.

ipinterface3.ps1
  

Get-NetIPInterface -InterfaceIndex 12

This command returns information about the interface with index 12. Only
one interface will be returned since indexes are unique. This is useful
for scripting when you know the exact interface.

## Filter interfaces by connection state

You can filter interfaces based on their connection state. Common states
include Connected, Disconnected, and Disabled. This helps identify active
network interfaces. Use the -ConnectionState parameter for filtering.

ipinterface4.ps1
  

Get-NetIPInterface -ConnectionState Connected

This command lists only interfaces that are currently connected. The output
excludes disconnected or disabled interfaces. This is useful for network
monitoring scripts.

## Get detailed interface information

The default output can be expanded to show all properties. Use the
Format-List cmdlet with the wildcard character. This reveals
additional details not shown in table view. You can see all configurable
parameters.

ipinterface5.ps1
  

Get-NetIPInterface -InterfaceIndex 12 | Format-List *

This command shows all properties of interface 12 in list format. The
output includes detailed configuration like router discovery and NLMtu.
This helps with advanced network troubleshooting.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetIPInterface cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).