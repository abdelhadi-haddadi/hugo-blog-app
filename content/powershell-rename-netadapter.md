+++
title = "PowerShell Rename-NetAdapter"
date = 2025-08-29T20:07:14.228+01:00
draft = false
description = "PowerShell Rename-NetAdapter tutorial shows how to rename network adapters in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Rename-NetAdapter

last modified February 15, 2025

This article covers the Rename-NetAdapter cmdlet in PowerShell. 
It allows renaming network adapters on Windows systems. Network adapters can 
have default names that are not descriptive. Renaming them helps with 
identification and management.

## Network adapter basics

A network adapter is hardware that connects a computer to a network. Each 
adapter has a name, interface description, and MAC address. Windows assigns 
default names like "Ethernet" or "Wi-Fi". The Rename-NetAdapter 
cmdlet modifies these names.

## Basic Rename-NetAdapter usage

The simplest way to use Rename-NetAdapter requires two parameters. 
Specify the current name with -Name and the new name with -NewName. This changes 
the adapter's display name immediately. The change persists across reboots.

rename1.ps1
  

Rename-NetAdapter -Name "Ethernet" -NewName "MainLAN"

This command renames the adapter called "Ethernet" to "MainLAN". The cmdlet 
returns no output by default. Verify the change with Get-NetAdapter.

## Rename by interface index

Adapters can also be identified by their interface index. This is useful when 
multiple adapters have similar names. Use -InterfaceIndex instead of -Name. 
Find the index with Get-NetAdapter.

rename2.ps1
  

Rename-NetAdapter -InterfaceIndex 12 -NewName "BackupNetwork"

This renames the adapter with interface index 12 to "BackupNetwork". The 
interface index is a unique number assigned to each adapter. It remains 
constant until the adapter is removed.

## Rename multiple adapters

You can rename multiple adapters by piping them to Rename-NetAdapter. 
First filter adapters with Get-NetAdapter. Then pipe the results 
to rename them. This is efficient for bulk operations.

rename3.ps1
  

Get-NetAdapter -Name "Ethernet*" | Rename-NetAdapter -NewName { $_.Name -replace "Ethernet", "LAN" }

This renames all adapters starting with "Ethernet" by replacing it with "LAN". 
The script block calculates the new name for each adapter. The original number 
suffix is preserved.

## Rename with confirmation

Add the -Confirm parameter to prompt before renaming. This is useful for 
critical systems. The cmdlet shows the current and new names. You must confirm 
each rename operation.

rename4.ps1
  

Rename-NetAdapter -Name "Wi-Fi" -NewName "PrimaryWireless" -Confirm

This prompts for confirmation before renaming the "Wi-Fi" adapter. The prompt 
shows the current and proposed new names. Answer 'Y' to proceed or 'N' to cancel.

Confirm
Are you sure you want to perform this action?
Performing the operation "Set" on target "InterfaceAlias: Wi-Fi (new: PrimaryWireless)".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):

## Rename using wildcards

Wildcards can match multiple adapters for renaming. Use the -Name parameter 
with a wildcard pattern. This is helpful when adapters follow a naming 
convention. Be careful to match only intended adapters.

rename5.ps1
  

Rename-NetAdapter -Name "Local*" -NewName "Internal-$($_.Name)"

This renames all adapters starting with "Local" by adding an "Internal-" prefix. 
The $_ variable refers to each adapter being processed. The original name 
follows the prefix.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Rename-NetAdapter cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).