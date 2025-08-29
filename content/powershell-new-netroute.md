+++
title = "PowerShell New-NetRoute"
date = 2025-08-29T20:07:08.563+01:00
draft = false
description = "PowerShell New-NetRoute tutorial shows how to use PowerShell to create network routes."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell New-NetRoute

last modified February 15, 2025

In this article, we will cover the New-NetRoute cmdlet in
PowerShell. This cmdlet creates network routes in the IP routing table.

## Network routing basics

A network route defines the path network traffic takes to reach a destination.
Routes consist of destination networks, gateways, and interface indexes.
The New-NetRoute cmdlet adds static routes to the routing table.
These routes persist until manually removed or the system restarts.

## Basic New-NetRoute usage

The simplest way to use New-NetRoute requires destination prefix,
next hop, and interface index. The destination prefix specifies the target
network. The next hop is the gateway IP address for the route.

route1.ps1
  

New-NetRoute -DestinationPrefix "192.168.2.0/24" -NextHop "192.168.1.1" -InterfaceIndex 12

This command adds a route for the 192.168.2.0/24 network via gateway
192.168.1.1 using interface 12. The route will be active immediately.

## Adding a persistent route

By default, routes created with New-NetRoute are not persistent.
Use the -PolicyStore parameter with "PersistentStore" to make them survive
reboots. Persistent routes are stored in the registry and reapplied at startup.

route2.ps1
  

New-NetRoute -DestinationPrefix "10.0.0.0/8" -NextHop "192.168.1.2" `
    -InterfaceIndex 12 -PolicyStore PersistentStore

This command creates a persistent route for the 10.0.0.0/8 network. The
backtick (`) is a line continuation character in PowerShell. The route
will remain after system restart.

## Setting route metric

Route metric determines the priority when multiple routes exist for the same
destination. Lower metrics have higher priority. Use the -RouteMetric
parameter to specify this value. The default metric is usually sufficient.

route3.ps1
  

New-NetRoute -DestinationPrefix "172.16.0.0/16" -NextHop "192.168.1.3" `
    -InterfaceIndex 12 -RouteMetric 5

This command adds a route with a metric of 5. If another route exists for
172.16.0.0/16 with a higher metric, this route will be preferred.

## Creating a default route

A default route (0.0.0.0/0) handles traffic when no specific route exists.
This is commonly used to direct traffic to the internet gateway. The same
principles apply as with regular routes.

route4.ps1
  

New-NetRoute -DestinationPrefix "0.0.0.0/0" -NextHop "192.168.1.254" `
    -InterfaceIndex 12 -PolicyStore PersistentStore

This command creates a persistent default route via gateway 192.168.1.254.
All non-local traffic will use this route unless a more specific one exists.

## Adding a route with specific interface

When multiple network interfaces exist, specify which to use with
-InterfaceIndex. Find interface indexes using Get-NetAdapter.
The index uniquely identifies each network interface on the system.

route5.ps1
  

$ifIndex = (Get-NetAdapter -Name "Ethernet").ifIndex
New-NetRoute -DestinationPrefix "192.168.3.0/24" -NextHop "192.168.1.4" `
    -InterfaceIndex $ifIndex

This command first retrieves the interface index for "Ethernet" adapter.
Then it creates a route specifically using that interface. This ensures
the route uses the correct physical or virtual network interface.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the New-NetRoute cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).