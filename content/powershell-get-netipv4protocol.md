+++
title = "PowerShell Get-NetIPv4Protocol"
date = 2025-08-29T20:07:00.777+01:00
draft = false
description = "PowerShell Get-NetIPv4Protocol tutorial shows how to use PowerShell to manage IPv4 protocol settings."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetIPv4Protocol

last modified February 15, 2025

In this article, we will cover the Get-NetIPv4Protocol cmdlet in
PowerShell. This cmdlet retrieves IPv4 protocol configuration settings.

## IPv4 Protocol basics

The IPv4 protocol is the fourth version of the Internet Protocol. It provides
addressing and routing for network communications. The Get-NetIPv4Protocol
cmdlet shows global IPv4 settings. These include default TTL, routing behavior,
and other protocol parameters.

## Basic Get-NetIPv4Protocol usage

The simplest way to use Get-NetIPv4Protocol is without parameters.
This shows all IPv4 protocol configuration settings. The output includes default
TTL, routing behavior, and other global parameters.

ipv4proto1.ps1
  

Get-NetIPv4Protocol

This command retrieves all IPv4 protocol settings. The output shows default
values configured on the system. These settings affect all IPv4 communications.

## Get specific IPv4 protocol properties

You can retrieve specific properties using the Select-Object cmdlet. This allows
focusing on particular settings. Common properties include DefaultTtl and
RoutingBehavior. This is useful when you need specific configuration details.

ipv4proto2.ps1
  

Get-NetIPv4Protocol | Select-Object DefaultTtl, RoutingBehavior

This command shows only the DefaultTtl and RoutingBehavior properties.
The output is more concise than the full configuration display.

PS C:\&gt; .\ipv4proto2.ps1

DefaultTtl RoutingBehavior
---------- --------------
       128          Store

## Filter IPv4 protocol settings by interface

You can filter IPv4 protocol settings by network interface. Use the -InterfaceIndex
parameter with the interface number. This shows protocol settings specific to
that interface. Different interfaces may have different configurations.

ipv4proto3.ps1
  

Get-NetIPv4Protocol -InterfaceIndex 12

This command retrieves IPv4 protocol settings for interface index 12.
The output shows configuration specific to this network adapter.

## Format IPv4 protocol output as list

The default output can be changed to list format for readability. Use the
Format-List cmdlet to display all properties vertically. This provides a
more detailed view of each setting. It's useful for documentation purposes.

ipv4proto4.ps1
  

Get-NetIPv4Protocol | Format-List *

This command shows all IPv4 protocol properties in list format.
Each property is displayed on its own line with the value.

## Compare IPv4 protocol settings between interfaces

You can compare protocol settings between different interfaces. This example
shows how to get settings for multiple interfaces. The output can be compared
to identify configuration differences. This helps in troubleshooting.

ipv4proto5.ps1
  

Get-NetIPv4Protocol -InterfaceIndex 12, 15 | Select-Object InterfaceIndex, DefaultTtl

This command compares DefaultTtl between interfaces 12 and 15.
The output shows the values side by side for easy comparison.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetIPv4Protocol cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).