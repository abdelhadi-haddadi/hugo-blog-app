+++
title = "PowerShell Restart-NetAdapter"
date = 2025-08-29T20:07:15.398+01:00
draft = false
description = "PowerShell Restart-NetAdapter tutorial shows how to use PowerShell to restart network adapters."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Restart-NetAdapter

last modified February 15, 2025

In this article, we will cover the Restart-NetAdapter cmdlet in
PowerShell. This cmdlet restarts network adapters to apply configuration changes.

## Network adapter basics

A network adapter is hardware that connects a computer to a network. It can be
physical or virtual. Adapters have names, interface descriptions, and status.
The Restart-NetAdapter cmdlet is used to reset network connections.

## Basic Restart-NetAdapter usage

The simplest way to use Restart-NetAdapter is with the -Name
parameter. This restarts the specified network adapter. The cmdlet requires
administrative privileges. It temporarily disconnects the network interface.

restart1.ps1
  

Restart-NetAdapter -Name "Ethernet"

This command restarts the network adapter named "Ethernet". The operation
may take a few seconds to complete. Network connectivity will be interrupted.

## Restart multiple adapters

You can restart multiple network adapters at once. Provide multiple names
separated by commas. This is useful when you need to reset several connections.
All specified adapters will be restarted simultaneously.

restart2.ps1
  

Restart-NetAdapter -Name "Ethernet", "Wi-Fi"

This command restarts both the Ethernet and Wi-Fi adapters. The operation
affects all listed network interfaces. Ensure you understand the impact.

PS C:\&gt; .\restart2.ps1

Name                      InterfaceDescription                    ifIndex Status
----                      --------------------                    ------- ------
Ethernet                  Intel(R) Ethernet Connection (2) I219-L      12 Disconnected
Wi-Fi                     Intel(R) Wireless-AC 9560                    15 Disconnected

## Restart by interface index

Network adapters can also be restarted by their interface index. This is
useful when names might change. Use the -InterfaceIndex parameter with the
index number. You can find indexes with Get-NetAdapter.

restart3.ps1
  

Restart-NetAdapter -InterfaceIndex 12

This command restarts the network adapter with interface index 12. The
index uniquely identifies the adapter regardless of name changes.

## Confirm before restart

You can add confirmation prompts for safety. Use the -Confirm parameter
to request user approval. This prevents accidental restarts of critical
network connections. The operation only proceeds after confirmation.

restart4.ps1
  

Restart-NetAdapter -Name "Ethernet" -Confirm

This command prompts for confirmation before restarting the Ethernet adapter.
The user must type 'Y' to proceed. This adds an extra layer of protection.

## Restart disabled adapters

To restart adapters that are currently disabled, use the -IncludeHidden
parameter. This works with adapters not visible in normal listings. The
cmdlet will first enable then restart the adapter.

restart5.ps1
  

Restart-NetAdapter -Name "VirtualAdapter" -IncludeHidden

This command restarts a hidden virtual network adapter. The -IncludeHidden
parameter ensures disabled or hidden adapters are included in the operation.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Restart-NetAdapter cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).