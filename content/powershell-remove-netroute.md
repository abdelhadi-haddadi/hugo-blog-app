+++
title = "PowerShell Remove-NetRoute"
date = 2025-08-29T20:07:13.113+01:00
draft = false
description = "PowerShell Remove-NetRoute tutorial shows how to use PowerShell to manage network routes."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Remove-NetRoute

last modified February 15, 2025

This article covers the Remove-NetRoute cmdlet in PowerShell. 
It removes IP routes from the routing table. Network routes direct traffic 
between different networks. Managing routes is essential for network 
configuration and troubleshooting.

## Network route basics

A network route defines the path for network traffic. It contains a 
destination, subnet mask, gateway, and interface. Routes can be persistent 
or temporary. The routing table determines where packets are forwarded. 
Remove-NetRoute deletes unwanted or incorrect routes.

## Basic Remove-NetRoute usage

The simplest way to use Remove-NetRoute is with the destination 
prefix. This removes the route matching the specified network address. 
Administrator privileges are required. Always verify routes before removal.

route1.ps1
  

Remove-NetRoute -DestinationPrefix "192.168.1.0/24" -Confirm:$false

This command removes the route for the 192.168.1.0/24 network. The 
-Confirm:$false parameter suppresses the confirmation prompt. 
Use caution when removing routes as it may disrupt network connectivity.

## Remove route by interface index

Routes can be removed based on the interface they use. Each network interface 
has a unique index number. This is useful when cleaning up routes for a 
specific adapter. First identify the interface index with Get-NetAdapter.

route2.ps1
  

Remove-NetRoute -InterfaceIndex 12 -Confirm:$false

This command removes all routes associated with interface index 12. The 
interface index can be found using Get-NetIPInterface. Multiple 
routes may be deleted if they share the same interface.

## Remove specific route with gateway

For more precise removal, specify both destination and gateway. This ensures 
only the exact route is deleted. Useful when multiple routes exist for the 
same network. The gateway must match exactly for the route to be removed.

route3.ps1
  

Remove-NetRoute -DestinationPrefix "10.0.0.0/8" -NextHop "192.168.1.1" -Confirm:$false

This removes only the 10.0.0.0/8 route that uses 192.168.1.1 as gateway. 
Other routes to 10.0.0.0/8 via different gateways remain unaffected. This 
precision prevents accidental removal of valid routes.

## Remove multiple routes with pipeline

PowerShell's pipeline allows processing multiple routes at once. First filter 
routes with Get-NetRoute, then pipe to Remove-NetRoute. 
This enables bulk operations based on various criteria like metric or protocol.

route4.ps1
  

Get-NetRoute -InterfaceAlias "Ethernet" | Remove-NetRoute -Confirm:$false

This command removes all routes associated with the Ethernet interface. The 
pipeline passes each route object directly to the removal cmdlet. Always 
review the routes before executing such bulk operations.

## Remove route with specific metric

Routes have metrics that determine priority. Lower metrics are preferred. 
You can remove routes based on their metric value. This helps clean up 
less optimal routes while preserving better ones.

route5.ps1
  

Get-NetRoute | Where-Object { $_.RouteMetric -gt 50 } | Remove-NetRoute -Confirm:$false

This removes all routes with a metric greater than 50. The 
Where-Object cmdlet filters the routes first. Metrics can be 
viewed with Get-NetRoute | Select-Object DestinationPrefix, RouteMetric.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

This article covered the Remove-NetRoute cmdlet in PowerShell. Proper route 
management is crucial for network stability and performance.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).