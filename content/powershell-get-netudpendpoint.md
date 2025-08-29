+++
title = "PowerShell Get-NetUDPEndpoint"
date = 2025-08-29T20:07:01.885+01:00
draft = false
description = "PowerShell Get-NetUDPEndpoint tutorial shows how to use PowerShell to monitor UDP endpoints and network connections."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetUDPEndpoint

last modified February 15, 2025

In this article, we will cover the Get-NetUDPEndpoint cmdlet in
PowerShell. This cmdlet retrieves information about UDP endpoints on a
system.

## UDP Endpoint basics

A UDP endpoint represents a network connection using the UDP protocol. It
includes local and remote IP addresses and port numbers. UDP is a connectionless
protocol used for lightweight communication. The Get-NetUDPEndpoint
cmdlet helps monitor these connections.

## Basic Get-NetUDPEndpoint usage

The simplest way to use Get-NetUDPEndpoint is without parameters.
This lists all UDP endpoints on the system. The output includes local addresses,
ports, and process IDs. Each endpoint is represented as a CimInstance object.

udp1.ps1
  

Get-NetUDPEndpoint

This command retrieves all UDP endpoints. The output shows listening ports and
associated processes. You can see local addresses and port numbers.

## Get UDP endpoints by local port

You can filter UDP endpoints by their local port number. Use the -LocalPort
parameter followed by the port number. This is useful for checking specific
services. Only endpoints using the specified port will be returned.

udp2.ps1
  

Get-NetUDPEndpoint -LocalPort 53

This command returns UDP endpoints using port 53, commonly used for DNS.
The output shows the process ID and local address information.

PS C:\&gt; .\udp2.ps1

LocalAddress   LocalPort RemoteAddress RemotePort OwningProcess
------------   --------- ------------- ---------- -------------
0.0.0.0        53       0.0.0.0       0          1234
::             53       ::            0          1234

## Get UDP endpoints by process ID

Endpoints can be filtered by their owning process ID. Use the -OwningProcess
parameter followed by the PID. This helps identify network activity of specific
processes. Each process can have multiple UDP endpoints.

udp3.ps1
  

Get-NetUDPEndpoint -OwningProcess 1234

This command returns all UDP endpoints owned by process with ID 1234. The
output includes all ports used by this process.

## Formatting UDP endpoint output

The default table format can be changed using Format-List for
detailed information. This shows all available properties of the endpoint object.
You can also select specific properties using Select-Object.

udp4.ps1
  

Get-NetUDPEndpoint -LocalPort 137 | Format-List *

This command shows all properties of UDP endpoints on port 137 in list format.
The output includes creation time, service name, and other details.

## Filtering UDP endpoints by state

You can filter UDP endpoints based on their state. While UDP is connectionless,
some states like "Listen" can be filtered. The Where-Object cmdlet is used for
this purpose. This helps identify active listening ports.

udp5.ps1
  

Get-NetUDPEndpoint | Where-Object { $_.State -eq "Listen" }

This command lists UDP endpoints in listening state. The $_ variable represents
the current endpoint in the pipeline. Listening ports are waiting for incoming
datagrams.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetUDPEndpoint cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).