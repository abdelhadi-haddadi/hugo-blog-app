+++
title = "PowerShell Get-NetTCPConnection"
date = 2025-08-29T20:07:01.895+01:00
draft = false
description = "PowerShell Get-NetTCPConnection tutorial shows how to use PowerShell to monitor TCP network connections."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetTCPConnection

last modified February 15, 2025

This article covers the Get-NetTCPConnection cmdlet in PowerShell.
It retrieves information about active TCP connections on a system. This is
useful for network troubleshooting and monitoring.

## TCP connection basics

TCP (Transmission Control Protocol) is a core internet protocol. It provides
reliable, ordered, and error-checked delivery of data. Each TCP connection has
a local and remote IP address and port. The Get-NetTCPConnection
cmdlet shows these active connections. It helps identify network activity.

## Basic Get-NetTCPConnection usage

The simplest way to use Get-NetTCPConnection is without parameters.
This lists all active TCP connections on the system. The output includes local
and remote addresses, ports, and connection state. Each connection is shown as
an object with properties.

tcp1.ps1
  

Get-NetTCPConnection

This command retrieves all active TCP connections. The output shows local and
remote endpoints, state, and process IDs. It's useful for general network
monitoring.

## Filter connections by state

You can filter connections by their state using the -State parameter. Common
states include Established, Listen, TimeWait, and CloseWait. This helps focus
on specific types of connections. It's particularly useful for troubleshooting.

tcp2.ps1
  

Get-NetTCPConnection -State Established

This command returns only established TCP connections. These are active
connections currently transferring data. It helps identify current network
activity.

PS C:\&gt; .\tcp2.ps1

LocalAddress                        LocalPort RemoteAddress                       RemotePort State       AppliedSetting OwningProcess
------------                        --------- -------------                       ---------- -----       -------------- -------------
192.168.1.100                       49876    172.217.14.206                      443        Established Internet       6784
192.168.1.100                       49875    151.101.1.69                        443        Established Internet       6784

## Find connections by local port

You can find connections using a specific local port with -LocalPort. This is
useful when troubleshooting services that use fixed ports. The port number must
be specified as an integer. Multiple ports can be specified as an array.

tcp3.ps1
  

Get-NetTCPConnection -LocalPort 443

This command returns connections using local port 443 (HTTPS). It helps identify
services or applications using secure web connections. The output includes
process IDs for further investigation.

## Get connections with process information

To see which processes own TCP connections, include the OwningProcess property.
You can then combine this with Get-Process for detailed information. This helps
identify applications behind network connections. The pipeline is used to join
the data.

tcp4.ps1
  

Get-NetTCPConnection | Where-Object { $_.State -eq 'Established' } |
    Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, State, OwningProcess |
    ForEach-Object {
        $process = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue
        $_ | Add-Member -NotePropertyName 'ProcessName' -NotePropertyValue $process.Name -PassThru
    }

This command shows established connections with process names. It first filters
established connections, then adds process names. The result is a comprehensive
view of network activity by application.

## Monitor remote connections

To monitor connections to specific remote addresses, use -RemoteAddress. This
helps identify connections to particular servers or services. Wildcards are not
supported; use IP addresses or hostnames. This is useful for security audits.

tcp5.ps1
  

Get-NetTCPConnection -RemoteAddress 8.8.8.8

This command returns connections to Google's DNS server (8.8.8.8). It helps
verify if your system is communicating with specific external hosts. The output
shows connection details including ports and state.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetTCPConnection cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).