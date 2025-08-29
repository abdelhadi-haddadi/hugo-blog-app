+++
title = "PowerShell New-NetIPAddress"
date = 2025-08-29T20:07:07.409+01:00
draft = false
description = "PowerShell New-NetIPAddress tutorial shows how to configure network interfaces with PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell New-NetIPAddress

last modified February 15, 2025

This article covers the New-NetIPAddress cmdlet in PowerShell. 
It is used to create and configure IP addresses on network interfaces. 
The cmdlet is part of the NetTCPIP module in PowerShell.

## IP address basics

An IP address is a unique identifier assigned to devices on a network. 
IPv4 addresses consist of four octets separated by dots (e.g., 192.168.1.1). 
IPv6 addresses are longer and use hexadecimal notation. 
Subnet masks define the network portion of an IP address. 
Default gateways route traffic between different networks.

## Basic New-NetIPAddress usage

The simplest way to use New-NetIPAddress requires three parameters. 
You must specify the IP address, prefix length, and interface index. 
The prefix length replaces the subnet mask in modern notation. 
This example assigns a static IPv4 address to a network interface.

ipaddress1.ps1
  

New-NetIPAddress -IPAddress 192.168.1.100 -PrefixLength 24 -InterfaceIndex 12

This command assigns 192.168.1.100 with a 24-bit subnet mask to interface 12. 
The prefix length of 24 equals a subnet mask of 255.255.255.0. 
You can find interface indexes with Get-NetAdapter.

## Assign IP address with default gateway

You can specify a default gateway when creating a new IP address. 
The -DefaultGateway parameter sets the router address. 
This is essential for communication outside the local network. 
The gateway must be on the same subnet as the IP address.

ipaddress2.ps1
  

New-NetIPAddress -IPAddress 192.168.1.100 -PrefixLength 24 `
    -InterfaceIndex 12 -DefaultGateway 192.168.1.1

This command assigns the IP address and sets 192.168.1.1 as the gateway. 
The backtick (`) is used for line continuation in PowerShell. 
The gateway will be used for all traffic not destined for the local subnet.

## Configure IPv6 address

New-NetIPAddress also supports IPv6 address configuration. 
IPv6 uses a different format and typically longer prefix lengths. 
The cmdlet syntax remains similar to IPv4 configuration. 
This example assigns a global unicast IPv6 address.

ipaddress3.ps1
  

New-NetIPAddress -IPAddress 2001:db8::100 -PrefixLength 64 -InterfaceIndex 12

This command assigns the IPv6 address 2001:db8::100 to interface 12. 
The prefix length of 64 is common for IPv6 subnets. 
IPv6 configuration follows the same principles as IPv4 but with different notation.

## Assign multiple IP addresses

Network interfaces can have multiple IP addresses assigned. 
Simply run New-NetIPAddress multiple times for the same interface. 
Each IP address must be unique on the network. 
This is useful for hosting multiple services on one server.

ipaddress4.ps1
  

New-NetIPAddress -IPAddress 192.168.1.101 -PrefixLength 24 -InterfaceIndex 12
New-NetIPAddress -IPAddress 192.168.1.102 -PrefixLength 24 -InterfaceIndex 12

These commands assign two IP addresses to interface 12. 
Both addresses must be in the same subnet (same prefix length). 
The interface can now respond to traffic on both addresses.

## Configure IP address with DNS

While New-NetIPAddress doesn't set DNS directly, you can combine it. 
Use Set-DnsClientServerAddress after assigning the IP address. 
This provides complete network configuration in a script. 
DNS servers are essential for name resolution.

ipaddress5.ps1
  

New-NetIPAddress -IPAddress 192.168.1.100 -PrefixLength 24 -InterfaceIndex 12
Set-DnsClientServerAddress -InterfaceIndex 12 -ServerAddresses 8.8.8.8,8.8.4.4

This script assigns an IP address and configures Google's DNS servers. 
The DNS settings are applied to the same interface index. 
Multiple DNS servers can be specified as a comma-separated list.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the New-NetIPAddress cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).