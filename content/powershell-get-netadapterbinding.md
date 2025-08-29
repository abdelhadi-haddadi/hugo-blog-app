+++
title = "PowerShell Get-NetAdapterBinding"
date = 2025-08-29T20:06:58.456+01:00
draft = false
description = "PowerShell Get-NetAdapterBinding tutorial shows how to use PowerShell to manage network adapter bindings."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetAdapterBinding

last modified February 15, 2025

In this article, we will cover the Get-NetAdapterBinding cmdlet in
PowerShell. This cmdlet retrieves binding information for network adapters.

## Network adapter binding basics

Network adapter bindings determine which protocols and services are enabled for
each network interface. Bindings control how network traffic is processed. The
Get-NetAdapterBinding cmdlet shows these configurations. It helps
in troubleshooting and optimizing network performance.

## Basic Get-NetAdapterBinding usage

The simplest way to use Get-NetAdapterBinding is without parameters.
This lists all bindings for all network adapters. The output includes adapter
names, component IDs, and enabled status. Each binding is represented as an object.

binding1.ps1
  

Get-NetAdapterBinding

This command retrieves all network adapter bindings. The output shows adapter
names, component IDs, and whether each binding is enabled. This provides a
comprehensive view of network configurations.

## Get bindings for specific adapter

You can retrieve bindings for a specific network adapter by name. Use the
-Name parameter followed by the adapter name. Wildcards are supported for
partial matching. This is useful when troubleshooting a particular interface.

binding2.ps1
  

Get-NetAdapterBinding -Name "Ethernet"

This command returns all bindings for the Ethernet adapter. The output shows
protocols and services bound to this interface. You can see which components
are enabled or disabled.

PS C:\&gt; .\binding2.ps1

Name                      DisplayName                                        ComponentID          Enabled
----                      -----------                                        -----------          -------
Ethernet                  Client for Microsoft Networks                      ms_client           True
Ethernet                  QoS Packet Scheduler                               ms_pacer            True
Ethernet                  File and Printer Sharing for Microsoft Networks    ms_server           False
Ethernet                  Internet Protocol Version 6 (TCP/IPv6)             ms_tcpip6           True
Ethernet                  Internet Protocol Version 4 (TCP/IPv4)             ms_tcpip            True

## Filter bindings by component ID

You can filter bindings by their component ID using the -ComponentID parameter.
This is useful when checking specific protocols or services. The component ID
identifies the network feature precisely. This provides targeted information.

binding3.ps1
  

Get-NetAdapterBinding -ComponentID "ms_tcpip6"

This command returns IPv6 bindings for all adapters. The output shows whether
IPv6 is enabled on each interface. You can quickly identify IPv6 configuration.

## Check enabled bindings only

To view only enabled bindings, pipe the output to Where-Object. This filters
results to show active configurations only. It helps identify currently used
network components. This simplifies troubleshooting active connections.

binding4.ps1
  

Get-NetAdapterBinding | Where-Object { $_.Enabled -eq $true }

This command lists all enabled bindings across all adapters. The $_ variable
represents the current binding in the pipeline. Only active configurations are
displayed in the output.

## Get detailed binding information

For more detailed information, use Format-List with wildcard. This shows all
available properties of the binding objects. You can see additional metadata
about each binding. This is useful for advanced troubleshooting.

binding5.ps1
  

Get-NetAdapterBinding -Name "Wi-Fi" | Format-List *

This command shows all properties of Wi-Fi adapter bindings. The output includes
detailed information about each binding component. You can see interface
descriptions and other metadata.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetAdapterBinding cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).