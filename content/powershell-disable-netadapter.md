+++
title = "PowerShell Disable-NetAdapter"
date = 2025-08-29T20:06:49.605+01:00
draft = false
description = "PowerShell Disable-NetAdapter tutorial shows how to use PowerShell to disable network adapters."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Disable-NetAdapter

last modified February 15, 2025

In this article, we will cover the Disable-NetAdapter cmdlet in
PowerShell. This cmdlet disables network adapters on a system. It is useful
for network troubleshooting and management.

## Network adapter basics

A network adapter is hardware that connects a computer to a network. It can
be physical (Ethernet, WiFi) or virtual (VPN, Hyper-V). Each adapter has a
name and interface description. PowerShell provides cmdlets to manage them.

## Basic Disable-NetAdapter usage

The simplest way to use Disable-NetAdapter is with the -Name
parameter. This disables the specified network adapter. You need administrator
privileges to run this cmdlet. The adapter will remain disabled until enabled.

disable1.ps1
  

Disable-NetAdapter -Name "Ethernet" -Confirm:$false

This command disables the Ethernet adapter without confirmation. The
-Confirm:$false parameter suppresses the confirmation prompt. Use this
carefully as it will immediately disable network connectivity.

## Disable multiple adapters

You can disable multiple adapters at once using wildcards. This is useful
when you need to disable several similar adapters. The command supports
pipeline input for multiple adapter names. Always verify the adapters first.

disable2.ps1
  

Disable-NetAdapter -Name "WiFi*" -Confirm:$false

This command disables all adapters whose names start with "WiFi". The
wildcard (*) matches any characters after "WiFi". This affects all WiFi
adapters on the system.

## Disable adapter by interface description

Adapters can also be disabled using their interface description. This is
useful when adapter names are not consistent. Use the -InterfaceDescription
parameter instead of -Name. Descriptions often include manufacturer details.

disable3.ps1
  

Disable-NetAdapter -InterfaceDescription "Realtek PCIe GbE Family Controller" -Confirm:$false

This command disables the adapter with the specified description. The
description must match exactly. You can find descriptions using
Get-NetAdapter first.

## Disable adapter with confirmation

For safety, you can include a confirmation prompt before disabling. This
is the default behavior when -Confirm is not specified. The prompt shows
which adapter will be disabled. You must confirm by typing 'Y' or 'Yes'.

disable4.ps1
  

Disable-NetAdapter -Name "Ethernet"

This command shows a confirmation prompt before disabling the Ethernet
adapter. It's safer than disabling immediately. The prompt helps prevent
accidental network disconnections.

## Disable adapter using pipeline

You can pipe adapter objects from Get-NetAdapter to Disable-NetAdapter.
This allows for more complex filtering before disabling. Combine with
Where-Object for selective disabling. This method is powerful but requires
care.

disable5.ps1
  

Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Disable-NetAdapter -Confirm:$false

This command disables all currently active network adapters. It first gets
all adapters, filters for those with status "Up", then disables them. Use
this cautiously as it affects all active connections.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Disable-NetAdapter cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).