+++
title = "PowerShell Test-NetConnection"
date = 2025-08-29T20:07:21.189+01:00
draft = false
description = "PowerShell Test-NetConnection tutorial shows how to use PowerShell to test network connectivity."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Test-NetConnection

last modified February 15, 2025

In this article, we will cover the Test-NetConnection cmdlet in
PowerShell. This cmdlet provides diagnostic information for network connections.
It replaces traditional tools like ping and tracert with more powerful features.

## Network connection basics

Network connectivity testing is essential for troubleshooting. The
Test-NetConnection cmdlet checks if a remote host is reachable.
It can test TCP ports, perform route tracing, and measure latency. This cmdlet
is available in PowerShell 4.0 and later versions.

## Basic ping test

The simplest usage tests basic ICMP connectivity to a host. This is similar to
the traditional ping command but provides more detailed output. The cmdlet
returns success/failure status and latency information. By default, it tests
connectivity four times.

network1.ps1
  

Test-NetConnection -ComputerName "google.com"

This command tests connectivity to google.com. The output shows if the host is
reachable and the average latency. It also displays the remote IP address.

PS C:\&gt; .\network1.ps1

ComputerName           : google.com
RemoteAddress          : 172.217.16.206
InterfaceAlias         : Ethernet
SourceAddress          : 192.168.1.100
PingSucceeded          : True
PingReplyDetails (RTT) : 12 ms

## Test specific TCP port

You can test if a specific TCP port is open on a remote host. This is useful
for checking service availability. Use the -Port parameter with the port number.
The cmdlet attempts to establish a TCP connection to the specified port.

network2.ps1
  

Test-NetConnection -ComputerName "example.com" -Port 80

This command tests if port 80 (HTTP) is open on example.com. The output shows
if the connection succeeded and the time taken. This helps verify web server
availability.

## Detailed trace route

The cmdlet can perform a route trace similar to tracert. This shows the network
path to the destination. Use the -TraceRoute parameter to enable this feature.
Each hop in the path is displayed with its latency. This helps identify network
bottlenecks.

network3.ps1
  

Test-NetConnection -ComputerName "microsoft.com" -TraceRoute

This command traces the network route to microsoft.com. The output shows each
router along the path. Latency for each hop helps identify slow connections.

## Test with specific source address

On multi-homed systems, you can specify which network interface to use. The
-SourceAddress parameter defines the local IP address for testing. This is
useful when testing connectivity from specific network adapters. It helps
verify routing configuration.

network4.ps1
  

Test-NetConnection -ComputerName "8.8.8.8" -SourceAddress "192.168.1.100"

This command tests connectivity to Google DNS (8.8.8.8) using the specified
local IP. The output confirms which interface was used for the test. This
helps troubleshoot multi-interface scenarios.

## Comprehensive connection test

For thorough testing, combine multiple parameters. This example tests a TCP port
with detailed diagnostics. The -InformationLevel parameter provides verbose
output. This gives complete connection details for troubleshooting.

network5.ps1
  

Test-NetConnection -ComputerName "github.com" -Port 443 -InformationLevel "Detailed"

This command performs a detailed test of HTTPS connectivity to github.com. The
output includes TCP connection details and timing information. It helps diagnose
SSL/TLS connection issues.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Test-NetConnection cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).