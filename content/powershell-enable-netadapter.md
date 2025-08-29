+++
title = "PowerShell Enable-NetAdapter"
date = 2025-08-29T20:06:50.723+01:00
draft = false
description = "PowerShell Enable-NetAdapter tutorial shows how to use PowerShell to enable network adapters."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Enable-NetAdapter

last modified February 15, 2025

In this article, we will cover the Enable-NetAdapter cmdlet in
PowerShell. This cmdlet enables network adapters that are currently disabled.

## Network adapter basics

A network adapter is hardware that connects a computer to a network. It can be
physical (Ethernet, Wi-Fi) or virtual (VPN, Hyper-V). Adapters can be enabled
or disabled for troubleshooting or configuration. PowerShell provides cmdlets
for managing network adapters.

## Basic Enable-NetAdapter usage

The simplest way to use Enable-NetAdapter is with the -Name parameter.
This enables the specified network adapter. The adapter must exist and be disabled.
Administrator privileges are required to run this cmdlet.

enable1.ps1
  

Enable-NetAdapter -Name "Ethernet"

This command enables the network adapter named "Ethernet". No output is returned
unless you use the -PassThru parameter. The adapter will become active if the
command succeeds.

## Enable multiple adapters by wildcard

You can enable multiple adapters using wildcard characters. The -Name parameter
accepts wildcards for pattern matching. This is useful when you need to enable
all adapters matching a specific pattern.

enable2.ps1
  

Enable-NetAdapter -Name "Wi-Fi*" -Confirm:$false

This command enables all adapters whose names start with "Wi-Fi". The -Confirm
parameter suppresses the confirmation prompt. Use wildcards carefully to avoid
enabling unintended adapters.

PS C:\&gt; .\enable2.ps1

Name                      InterfaceDescription                    ifIndex Status
----                      --------------------                    ------- ------
Wi-Fi                     Intel(R) Wi-Fi 6 AX201 160MHz                15 Up
Wi-Fi 2                   Microsoft Wi-Fi Direct Virtual Adapter       16 Up

## Enable adapter by interface index

Network adapters can also be enabled using their interface index. This is a
unique number assigned to each adapter. Use Get-NetAdapter to find the index.
This method is precise when you know the exact adapter to enable.

enable3.ps1
  

Enable-NetAdapter -InterfaceIndex 15 -PassThru

This command enables the adapter with interface index 15. The -PassThru parameter
returns the enabled adapter object. This lets you verify the operation succeeded.

## Enable all disabled adapters

You can enable all disabled network adapters at once. First find disabled adapters
with Get-NetAdapter, then pipe to Enable-NetAdapter. This is useful for quickly
restoring network connectivity.

enable4.ps1
  

Get-NetAdapter | Where-Object { $_.Status -eq "Disabled" } | Enable-NetAdapter

This command finds all disabled adapters and enables them. The Where-Object cmdlet
filters for adapters with Status "Disabled". Piping sends these to Enable-NetAdapter.

## Enable adapter with confirmation

By default, Enable-NetAdapter prompts for confirmation. You can make this explicit
or suppress it. The -Confirm parameter controls this behavior. This is important
for scripting where you need predictable behavior.

enable5.ps1
  

Enable-NetAdapter -Name "Ethernet 2" -Confirm

This command enables "Ethernet 2" with explicit confirmation. You'll be prompted
to confirm before the adapter is enabled. This prevents accidental changes in
interactive sessions.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Enable-NetAdapter cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).