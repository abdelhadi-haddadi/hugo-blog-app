+++
title = "PowerShell Test-Connection"
date = 2025-08-29T20:07:20.008+01:00
draft = false
description = "PowerShell Test-Connection tutorial shows how to use PowerShell to test network connectivity between computers."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Test-Connection

last modified February 15, 2025

In this article, we will cover the Test-Connection cmdlet in
PowerShell. This cmdlet sends ICMP echo request packets to test network
connectivity between computers.

## Test-Connection basics

The Test-Connection cmdlet is PowerShell's equivalent of the
traditional ping command. It sends ICMP echo requests to one or more remote
computers. The cmdlet returns response statistics including latency and status.
It provides more functionality than the basic ping command.

## Basic Test-Connection usage

The simplest way to use Test-Connection is with just a target
computer name or IP address. This sends four ICMP echo requests by default.
The output shows response times and status for each attempt. This is useful
for basic connectivity testing.

connection1.ps1
  

Test-Connection -ComputerName "google.com"

This command tests connectivity to google.com. The output shows response
times and status for each of the four ICMP packets sent. Success indicates
network connectivity exists.

## Test connection with specific count

You can specify the number of echo requests to send using the -Count parameter.
This is useful when you need more or fewer test packets than the default four.
The command will wait for each response before continuing. This allows for
customized testing durations.

connection2.ps1
  

Test-Connection -ComputerName "8.8.8.8" -Count 2

This command sends only two ICMP echo requests to Google's DNS server at
8.8.8.8. The reduced count makes the test complete faster while still
verifying connectivity.

PS C:\&gt; .\connection2.ps1

Source        Destination     IPV4Address      IPV6Address                              Bytes    Time(ms)
------        -----------     -----------      -----------                              -----    --------
DESKTOP-ABC   8.8.8.8        8.8.8.8                                                 32        15
DESKTOP-ABC   8.8.8.8        8.8.8.8                                                 32        14

## Continuous connection testing

For ongoing monitoring, use the -Continuous parameter. This sends ICMP
requests indefinitely until manually stopped with Ctrl+C. It's useful for
monitoring connection stability over time. Each response is displayed as
it's received.

connection3.ps1
  

Test-Connection -ComputerName "localhost" -Continuous

This command continuously pings the local computer until interrupted. It's
helpful for monitoring local network adapter status. The output updates
with each new response received.

## Test multiple computers

Test-Connection can test multiple computers simultaneously.
Provide multiple computer names or IPs separated by commas. The cmdlet
tests each sequentially by default. This is efficient for checking several
network devices at once.

connection4.ps1
  

Test-Connection -ComputerName "google.com", "8.8.8.8", "localhost" -Count 1

This command tests connectivity to three different targets with one ping
each. The output shows results for each destination separately. Failed
connections will be clearly indicated in the output.

## Quiet mode for scripting

For scripts, you may want simple boolean results rather than detailed output.
The -Quiet parameter returns $True if any packet receives a response, $False
otherwise. This simplifies conditional logic in automation scripts.

connection5.ps1
  

if (Test-Connection -ComputerName "server01" -Count 1 -Quiet) {
    Write-Host "Server is reachable"
} else {
    Write-Host "Server is unreachable"
}

This script checks server connectivity and outputs a simple status message.
The -Quiet parameter makes the cmdlet return a boolean suitable for if
statements. This is ideal for automated monitoring scripts.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Test-Connection cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).