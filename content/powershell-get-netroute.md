+++
title = "PowerShell Get-NetRoute"
date = 2025-08-29T20:07:01.899+01:00
draft = false
description = "PowerShell Get-NetRoute tutorial shows how to use PowerShell to view and manage network routing tables."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetRoute

last modified February 15, 2025

In this article, we will cover the Get-NetRoute cmdlet in
PowerShell. This cmdlet retrieves IP route information from the network
stack. It shows how traffic is routed between network interfaces.

## Network routing basics

A network route defines the path network traffic takes to reach its destination.
Routes contain destination networks, next hops, and interface indexes. The
Get-NetRoute cmdlet displays the IP routing table. This table
determines where packets are forwarded based on their destination IP.

## Basic Get-NetRoute usage

The simplest way to use Get-NetRoute is without any parameters.
This lists all IP routes in the routing table. The output includes destination
prefixes, next hops, and interface indexes. Each route is represented as a
NetRoute object.

route1.ps1
  

Get-NetRoute

This command retrieves all routes from the IP routing table. The output shows
destination networks, next hops, and interface metrics. Default routes appear
as 0.0.0.0/0.

## Filter routes by destination prefix

You can filter routes by destination prefix using the -DestinationPrefix
parameter. This shows routes matching a specific network address. Wildcards
are supported for partial matching. This helps when troubleshooting routing
for specific networks.

route2.ps1
  

Get-NetRoute -DestinationPrefix "192.168.*"

This command returns all routes for 192.168.x.x networks. The asterisk acts
as a wildcard matching any octet values. This is useful for viewing local
network routes.

PS C:\&gt; .\route2.ps1

ifIndex DestinationPrefix    NextHop       RouteMetric PolicyStore
------- -----------------   ------       ------------ -----------
    15 192.168.1.0/24      0.0.0.0             256 ActiveStore
    15 192.168.1.15/32     0.0.0.0             256 ActiveStore

## Get routes for a specific interface

Routes can be filtered by network interface using the -InterfaceIndex
parameter. Each interface has a unique index number. This shows routing
information for a specific network adapter. Use Get-NetAdapter to find
interface indexes.

route3.ps1
  

Get-NetRoute -InterfaceIndex 15

This command returns all routes associated with interface index 15. The
output shows how traffic is routed through this specific network adapter.

## View detailed route information

The default table format can be changed using Format-List for
detailed route information. This shows all available properties of the route
object. You can also select specific properties using Select-Object.

route4.ps1
  

Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Format-List *

This command shows all properties of the default route in list format.
The output includes route metrics, policies, and protocol information.

## Filter routes by route metric

You can filter routes based on their metric value using Where-Object. The
metric determines route priority when multiple paths exist. Lower metrics
indicate preferred routes. This helps analyze routing decisions.

route5.ps1
  

Get-NetRoute | Where-Object { $_.RouteMetric -lt 50 }

This command lists routes with metrics less than 50. The $_ variable
represents the current route in the pipeline. Adjust the threshold as
needed for your analysis.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetRoute cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).