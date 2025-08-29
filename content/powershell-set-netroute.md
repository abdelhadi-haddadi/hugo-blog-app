+++
title = "PowerShell Set-NetRoute"
date = 2025-08-29T20:07:17.665+01:00
draft = false
description = "PowerShell Set-NetRoute tutorial shows how to use PowerShell to manage network routes."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Set-NetRoute

last modified February 15, 2025

In this article, we will cover the Set-NetRoute cmdlet in
PowerShell. This cmdlet modifies existing IP route settings in the TCP/IP
network stack.

## Network routing basics

A network route defines the path network traffic takes to reach a destination.
Routes contain destination prefixes, next hops, and interface indexes. The
Set-NetRoute cmdlet modifies these route properties. It is part of
the NetTCPIP module in PowerShell.

## Basic Set-NetRoute usage

The simplest way to use Set-NetRoute is with the -DestinationPrefix
and -NextHop parameters. You must specify which route to modify. The cmdlet
changes properties of existing routes matching the criteria.

route1.ps1
  

Set-NetRoute -DestinationPrefix "192.168.1.0/24" -NextHop "192.168.1.1" -Confirm:$false

This command modifies the route for the 192.168.1.0/24 network. It sets the
next hop to 192.168.1.1. The -Confirm:$false parameter suppresses the prompt.

## Changing route metric

Route metric determines the priority of a route when multiple routes exist.
Lower metrics have higher priority. You can modify the metric of an existing
route. This affects how traffic is routed when multiple paths are available.

route2.ps1
  

Set-NetRoute -DestinationPrefix "10.0.0.0/8" -InterfaceIndex 12 -RouteMetric 50

This command changes the metric to 50 for the 10.0.0.0/8 route on interface 12.
A higher metric makes this route less preferred than alternatives.

## Modifying multiple routes

You can modify multiple routes at once using pipeline input. First retrieve
routes with Get-NetRoute, then pipe to Set-NetRoute.
This allows bulk modifications based on filters.

route3.ps1
  

Get-NetRoute -InterfaceIndex 12 | Set-NetRoute -RouteMetric 100

This command changes the metric to 100 for all routes on interface 12. The
Get-NetRoute cmdlet retrieves the routes, which are then modified.

## Setting publish and store properties

Routes can be published (advertised) and stored persistently. The -Publish
parameter controls route advertisement. The -Store parameter determines if
changes persist across reboots.

route4.ps1
  

Set-NetRoute -DestinationPrefix "172.16.0.0/16" -Publish Yes -Store ActiveStore

This command makes the 172.16.0.0/16 route advertised and stores it in the
active configuration. The route won't persist after reboot without -Store.

## Modifying route policy

Route policies determine how routes are used and prioritized. The -PolicyStore
parameter specifies where to apply changes. You can modify routes in different
policy stores like ActiveStore or PersistentStore.

route5.ps1
  

Set-NetRoute -DestinationPrefix "192.168.100.0/24" -NextHop "192.168.100.1" -PolicyStore PersistentStore

This command modifies the route in the persistent store, making it survive
reboots. The change won't take effect immediately without applying to ActiveStore.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Set-NetRoute cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).