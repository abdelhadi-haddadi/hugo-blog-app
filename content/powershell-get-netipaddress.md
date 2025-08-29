+++
title = "PowerShell Get-NetIPAddress"
date = 2025-08-29T20:06:59.633+01:00
draft = false
description = "PowerShell Get-NetIPAddress tutorial shows how to use PowerShell to retrieve IP address configuration."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetIPAddress

last modified February 15, 2025

In this article, we will cover the Get-NetIPAddress cmdlet in
PowerShell. This cmdlet retrieves IP address configuration information from
network interfaces.

## IP address basics

An IP address is a numerical label assigned to each device in a network. It
serves two main functions: host identification and location addressing. The
Get-NetIPAddress cmdlet retrieves IPv4 and IPv6 addresses. It
provides detailed information about each network interface configuration.

## Basic Get-NetIPAddress usage

The simplest way to use Get-NetIPAddress is without any parameters.
This lists all IP addresses configured on the system. The output includes IP
addresses, interface indexes, and address states. Each entry represents a
network interface configuration.

ipaddress1.ps1
  

Get-NetIPAddress

This command retrieves all IP addresses on the system. The output shows IPv4
and IPv6 addresses with their associated interface indexes and prefixes.

## Filter by IP address family

You can filter results by IP address family using the -AddressFamily parameter.
This is useful when you only need IPv4 or IPv6 addresses. The parameter accepts
values 'IPv4' or 'IPv6'. This helps simplify output when working with specific
protocols.

ipaddress2.ps1
  

Get-NetIPAddress -AddressFamily IPv4

This command returns only IPv4 addresses configured on the system. The output
excludes IPv6 addresses, making it easier to focus on IPv4 configurations.

PS C:\&gt; .\ipaddress2.ps1

IPAddress         : 192.168.1.100
InterfaceIndex    : 12
InterfaceAlias    : Ethernet
AddressFamily     : IPv4
Type              : Unicast
PrefixLength      : 24
PrefixOrigin      : Dhcp
SuffixOrigin      : Dhcp
AddressState      : Preferred
ValidLifetime     : 23:59:59
PreferredLifetime : 23:59:59

## Get IP addresses by interface index

Network interfaces can be identified by their unique interface index. You can
retrieve IP addresses for a specific interface using -InterfaceIndex. This is
useful when troubleshooting a particular network adapter. The index can be found
using Get-NetAdapter.

ipaddress3.ps1
  

Get-NetIPAddress -InterfaceIndex 12

This command returns IP addresses associated with interface index 12. The output
includes all address configurations for that specific network interface.

## Filter by IP address prefix

You can filter IP addresses by their prefix using the -PrefixLength parameter.
This helps identify addresses within specific subnets. The prefix length
represents the subnet mask in CIDR notation. This is useful for network
segmentation analysis.

ipaddress4.ps1
  

Get-NetIPAddress -AddressFamily IPv4 -PrefixLength 24

This command returns IPv4 addresses with a /24 subnet mask (255.255.255.0). The
output helps identify devices on the same local network segment.

## Get IP addresses by interface alias

Network interfaces often have descriptive alias names. You can filter IP
addresses by interface alias using -InterfaceAlias. This makes commands more
readable than using interface indexes. Wildcards are supported for partial
matching.

ipaddress5.ps1
  

Get-NetIPAddress -InterfaceAlias "Ethernet*"

This command returns IP addresses for all interfaces whose alias starts with
"Ethernet". The output includes both IPv4 and IPv6 addresses for matching
interfaces.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetIPAddress cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).