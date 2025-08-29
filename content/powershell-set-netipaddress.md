+++
title = "PowerShell Set-NetIPAddress"
date = 2025-08-29T20:07:17.671+01:00
draft = false
description = "PowerShell Set-NetIPAddress tutorial shows how to use PowerShell to configure network IP addresses."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Set-NetIPAddress

last modified February 15, 2025

In this article, we will cover the Set-NetIPAddress cmdlet in
PowerShell. This cmdlet modifies IP address configuration of network interfaces.

## IP Address basics

An IP address is a unique identifier assigned to devices on a network. It enables
communication between devices using the Internet Protocol. IPv4 addresses consist
of four octets separated by dots (e.g., 192.168.1.1). IPv6 addresses are longer
and use hexadecimal notation. The Set-NetIPAddress cmdlet allows
modification of these addresses.

## Basic Set-NetIPAddress usage

The simplest way to use Set-NetIPAddress is to specify the IP
address to modify and the new IP address. You need administrative privileges
to change network settings. The cmdlet can modify both IPv4 and IPv6 addresses.
Always verify changes with Get-NetIPAddress.

ipaddress1.ps1
  

Set-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.100

This command changes the IP address of interface with index 12 to 192.168.1.100.
The InterfaceIndex parameter identifies the network interface. Run
Get-NetIPInterface to find interface indexes.

## Changing IP address and subnet mask

You can modify both the IP address and subnet mask simultaneously. The subnet
mask defines the network portion of the IP address. Use the -PrefixLength
parameter for subnet mask specification. PrefixLength is the number of bits
in the subnet mask (e.g., 24 for 255.255.255.0).

ipaddress2.ps1
  

Set-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.100 -PrefixLength 24

This command sets the IP address to 192.168.1.100 with a subnet mask of
255.255.255.0. The PrefixLength of 24 corresponds to this subnet mask.
Always ensure the new settings match your network configuration.

PS C:\&gt; .\ipaddress2.ps1

Confirm
Are you sure you want to perform this action?
Performing the operation "Set" on target "192.168.1.100".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): Y

## Modifying default gateway

To change the default gateway along with the IP address, use the -DefaultGateway
parameter. The default gateway routes traffic to other networks. This change
requires the Set-NetIPInterface cmdlet for complete configuration.
The gateway must be on the same network as the IP address.

ipaddress3.ps1
  

Set-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.100 -PrefixLength 24
Set-NetIPInterface -InterfaceIndex 12 -InterfaceMetric 1
New-NetRoute -InterfaceIndex 12 -DestinationPrefix "0.0.0.0/0" -NextHop 192.168.1.1

This example configures a complete network setup. It sets the IP address,
subnet mask, and default gateway (192.168.1.1). The InterfaceMetric
determines priority when multiple interfaces exist. The route directs all
non-local traffic to the gateway.

## Changing multiple IP addresses

Network interfaces can have multiple IP addresses assigned. Use the
Set-NetIPAddress cmdlet with the -AddressFamily parameter to
specify IPv4 or IPv6. You can modify existing addresses or add new ones.
This is useful for servers hosting multiple services.

ipaddress4.ps1
  

Set-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.100 -PrefixLength 24
New-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.101 -PrefixLength 24

This script first modifies an existing IP address, then adds a second one.
Both addresses are on the same subnet. The New-NetIPAddress
cmdlet adds new addresses while Set-NetIPAddress modifies
existing ones. Verify with Get-NetIPAddress.

## Configuring IPv6 addresses

The Set-NetIPAddress cmdlet works with IPv6 addresses similarly
to IPv4. Specify the IPv6 address and appropriate prefix length. IPv6 uses
128-bit addresses and different notation (e.g., 2001:db8::1). The AddressFamily
parameter explicitly selects IPv6.

ipaddress5.ps1
  

Set-NetIPAddress -InterfaceIndex 12 -IPAddress 2001:db8::1 -PrefixLength 64 -AddressFamily IPv6

This command configures an IPv6 address with a 64-bit prefix. IPv6 typically
uses /64 for local networks. The AddressFamily parameter ensures proper
handling of IPv6 addresses. Remember that IPv6 configuration might require
additional routing setup.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Set-NetIPAddress cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).