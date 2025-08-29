+++
title = "PowerShell Set-NetAdapterBinding"
date = 2025-08-29T20:07:16.514+01:00
draft = false
description = "PowerShell Set-NetAdapterBinding tutorial shows how to configure network adapter bindings."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Set-NetAdapterBinding

last modified February 15, 2025

This tutorial covers the Set-NetAdapterBinding cmdlet in PowerShell.
It is used to enable or disable network adapter protocol bindings. This helps
manage network connectivity and optimize performance.

## Network adapter binding basics

Network adapter bindings determine which protocols and services can use a
network adapter. Each adapter can have multiple bindings for different
protocols. The Set-NetAdapterBinding cmdlet modifies these
bindings. This is useful for security and performance tuning.

## Basic Set-NetAdapterBinding usage

The simplest usage enables or disables a binding on a specific adapter.
You need the adapter name and component ID. The -Enabled parameter
accepts $true or $false values. This example disables IPv6 on an adapter.

binding1.ps1
  

Set-NetAdapterBinding -Name "Ethernet" -ComponentID "ms_tcpip6" -Enabled $false

This command disables IPv6 binding on the Ethernet adapter. The component
ID "ms_tcpip6" identifies the IPv6 protocol. No output is returned by default.

## Enable a binding on all adapters

You can modify bindings across all network adapters. Use the wildcard
character (*) for the -Name parameter. This example enables Link-Layer
Topology Discovery on all adapters. Be cautious with global changes.

binding2.ps1
  

Set-NetAdapterBinding -Name "*" -ComponentID "ms_lltdio" -Enabled $true

This enables the LLTD protocol on every network adapter. The component
ID "ms_lltdio" refers to Link-Layer Topology Discovery. Verify changes
with Get-NetAdapterBinding.

PS C:\&gt; Get-NetAdapterBinding -Name "Ethernet" -ComponentID "ms_lltdio"

Name                      DisplayName                                        ComponentID          Enabled
----                      -----------                                        -----------          -------
Ethernet                  Link-Layer Topology Discovery Responder           ms_lltdio            True

## Disable bindings using pipeline

PowerShell's pipeline can simplify binding management. First get adapters
with Get-NetAdapter, then pipe to Set-NetAdapterBinding. This example
disables NetBIOS over TCP/IP on wireless adapters.

binding3.ps1
  

Get-NetAdapter -Name "Wi-Fi*" | Set-NetAdapterBinding -ComponentID "ms_netbios" -Enabled $false

This disables NetBIOS on all adapters with names starting with "Wi-Fi".
The pipeline passes adapter objects directly to the binding cmdlet. This
approach is efficient for bulk operations.

## Check current bindings before changes

It's good practice to verify current settings before making changes.
Combine Get-NetAdapterBinding with Set-NetAdapterBinding. This example
shows checking then disabling a binding.

binding4.ps1
  

$bindings = Get-NetAdapterBinding -Name "Ethernet" -ComponentID "ms_server"
if ($bindings.Enabled) {
    Set-NetAdapterBinding -Name "Ethernet" -ComponentID "ms_server" -Enabled $false
}

This script first checks if the File and Printer Sharing binding is enabled.
Only if enabled, it disables the binding. The ms_server component ID
represents this service.

## Enable multiple bindings with a script

You can manage multiple bindings in a single script. Create an array of
component IDs and loop through them. This example enables several protocols
on a specific adapter.

binding5.ps1
  

$components = @("ms_tcpip6", "ms_lltdio", "ms_rspndr")
foreach ($comp in $components) {
    Set-NetAdapterBinding -Name "Ethernet" -ComponentID $comp -Enabled $true
}

This script enables IPv6, LLTD, and Link-Layer Topology Discovery Responder
on the Ethernet adapter. The array contains component IDs for each protocol.
The foreach loop processes each binding sequentially.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Set-NetAdapterBinding cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).