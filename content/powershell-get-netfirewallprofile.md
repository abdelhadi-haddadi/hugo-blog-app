+++
title = "PowerShell Get-NetFirewallProfile"
date = 2025-08-29T20:06:59.629+01:00
draft = false
description = "PowerShell Get-NetFirewallProfile tutorial shows how to use PowerShell to manage Windows Firewall profiles."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetFirewallProfile

last modified February 15, 2025

This tutorial covers the Get-NetFirewallProfile cmdlet in PowerShell. 
It retrieves Windows Firewall profile configurations. The cmdlet helps manage 
network security settings on Windows systems.

## Firewall Profile Basics

Windows Firewall has three network profiles: Domain, Private, and Public. 
Each profile has separate firewall rules and settings. The Domain profile 
applies when connected to a corporate domain. Private is for trusted networks. 
Public is for untrusted networks like coffee shops.

## Basic Get-NetFirewallProfile Usage

The simplest way to use Get-NetFirewallProfile is without parameters. 
This retrieves all firewall profiles with their current settings. The output 
shows profile names, enabled status, and default actions. Each profile is 
represented as a NetFirewallProfile object.

firewall1.ps1
  

Get-NetFirewallProfile

This command returns all firewall profiles. The output includes profile names, 
enabled status, default inbound/outbound actions, and other settings.

## Get Specific Firewall Profile

You can retrieve a specific profile using the -Name parameter. Valid values are 
Domain, Private, or Public. This is useful when you need to check settings for 
a particular network type. The cmdlet returns detailed configuration for the 
specified profile.

firewall2.ps1
  

Get-NetFirewallProfile -Name "Public"

This command returns only the Public firewall profile settings. You can see if 
the firewall is enabled and its default actions for this network type.

PS C:\&gt; .\firewall2.ps1

Name                  : Public
Enabled               : True
DefaultInboundAction  : Block
DefaultOutboundAction : Allow
AllowLocalFirewallRules : False
AllowLocalIPsecRules  : False
LogFileName           : %systemroot%\system32\LogFiles\Firewall\pfirewall.log
LogMaxSizeKilobytes   : 4096
LogAllowed           : False
LogBlocked           : True

## Check Firewall Profile Status

To quickly check if a firewall profile is enabled, use the -Name parameter 
with Select-Object. This filters the output to show only the profile name 
and enabled status. It's useful for scripts that need to verify firewall status.

firewall3.ps1
  

Get-NetFirewallProfile -Name "Private" | Select-Object Name, Enabled

This command shows whether the Private profile firewall is enabled. The output 
is simplified to just the profile name and its enabled status (True/False).

## Format Firewall Profile Output

For detailed information, use Format-List to display all properties. 
This shows all available configuration options for the profile. You can see 
logging settings, default actions, and other advanced configurations.

firewall4.ps1
  

Get-NetFirewallProfile -Name "Domain" | Format-List *

This command displays all properties of the Domain firewall profile. The output 
includes logging paths, maximum log size, and other detailed settings.

## Filter Enabled Firewall Profiles

You can filter profiles based on their enabled status using Where-Object. 
This helps identify which profiles are currently active. The $_ variable 
represents the current profile in the pipeline.

firewall5.ps1
  

Get-NetFirewallProfile | Where-Object { $_.Enabled -eq $true }

This command lists only enabled firewall profiles. It's useful for auditing 
which network types currently have firewall protection active.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

This tutorial covered the Get-NetFirewallProfile cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).