+++
title = "PowerShell Remove-NetIPAddress"
date = 2025-08-29T20:07:13.116+01:00
draft = false
description = "PowerShell Remove-NetIPAddress tutorial shows how to use PowerShell to remove IP addresses from network interfaces."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Remove-NetIPAddress

last modified February 15, 2025

In this article, we will cover the Remove-NetIPAddress cmdlet in
PowerShell. This cmdlet removes IP addresses from network interfaces.

## IP Address basics

An IP address is a unique identifier assigned to devices on a network. It
enables communication between devices. PowerShell provides cmdlets to manage
network configurations. The Remove-NetIPAddress cmdlet is used to
remove unwanted or incorrect IP addresses.

## Basic Remove-NetIPAddress usage

The simplest way to use Remove-NetIPAddress is by specifying the
IP address to remove. This requires administrative privileges. The cmdlet will
remove the specified IP from the network interface. Always verify the IP before
removal to avoid network issues.

removeip1.ps1
  

Remove-NetIPAddress -IPAddress "192.168.1.100"

This command removes the IP address 192.168.1.100 from any interface. If the
IP exists on multiple interfaces, all instances will be removed. Use with
caution.

## Remove IP address from specific interface

You can target a specific network interface for IP removal. Use the
-InterfaceIndex or -InterfaceAlias parameter. This prevents accidental
removal from wrong interfaces. First, identify the interface details using
Get-NetIPAddress.

removeip2.ps1
  

Remove-NetIPAddress -IPAddress "192.168.1.100" -InterfaceIndex 12

This command removes the IP only from interface with index 12. The interface
index can be found using Get-NetAdapter. This provides precise control.

PS C:\&gt; .\removeip2.ps1

Confirm
Are you sure you want to perform this action?
Performing the operation "Remove" on target "192.168.1.100".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): Y

## Remove multiple IP addresses

Multiple IP addresses can be removed in one command using pipeline input. First
retrieve the IPs with Get-NetIPAddress. Then pipe them to Remove-NetIPAddress.
This is efficient for bulk operations.

removeip3.ps1
  

Get-NetIPAddress -IPAddress "192.168.1.*" | Remove-NetIPAddress

This command removes all IPs in the 192.168.1.x range. The wildcard matches
multiple addresses. Always review the matched IPs before execution.

## Force removal without confirmation

By default, PowerShell prompts for confirmation before removing IPs. The
-Confirm:$false parameter suppresses this prompt. Useful for automated scripts.
Use carefully to avoid unintended removals.

removeip4.ps1
  

Remove-NetIPAddress -IPAddress "192.168.1.100" -Confirm:$false

This command removes the IP without asking for confirmation. Suitable for
scripts where user interaction is not desired. Ensure proper error handling.

## Remove IPv6 addresses

The cmdlet works with both IPv4 and IPv6 addresses. Specify the full IPv6
address for removal. IPv6 addresses must be enclosed in square brackets if
using the port format. Verify the address format carefully.

removeip5.ps1
  

Remove-NetIPAddress -IPAddress "fe80::a00:27ff:fe1a:2b3c"

This command removes the specified IPv6 address. The same parameters as IPv4
apply. Use Get-NetIPAddress to verify IPv6 configurations first.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Remove-NetIPAddress cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).