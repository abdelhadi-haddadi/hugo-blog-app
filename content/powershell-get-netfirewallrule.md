+++
title = "PowerShell Get-NetFirewallRule"
date = 2025-08-29T20:06:59.625+01:00
draft = false
description = "PowerShell Get-NetFirewallRule tutorial shows how to use PowerShell to manage Windows Firewall rules."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-NetFirewallRule

last modified February 15, 2025

In this article, we will cover the Get-NetFirewallRule cmdlet in
PowerShell. This cmdlet retrieves Windows Firewall rules from the local computer.

## Firewall rule basics

A firewall rule defines how network traffic is filtered. Each rule has properties
like name, direction, action, and protocol. Rules can be inbound or outbound.
They can allow or block traffic based on various conditions.

## Basic Get-NetFirewallRule usage

The simplest way to use Get-NetFirewallRule is without parameters.
This lists all firewall rules on the system. The output includes rule names,
enabled status, and directions. Each rule is represented as a firewall object.

firewall1.ps1
  

Get-NetFirewallRule

This command retrieves all firewall rules. The default output shows basic
information. More details can be viewed with additional parameters.

## Get specific firewall rule by name

You can retrieve specific firewall rules by name. Use the -DisplayName parameter
followed by the rule name. Wildcards are supported for partial matching.
This is useful when searching for related rules.

firewall2.ps1
  

Get-NetFirewallRule -DisplayName "Remote Desktop*"

This command returns all rules with names starting with "Remote Desktop".
Multiple rules may be returned for complex applications like RDP.

PS C:\&gt; .\firewall2.ps1

Name                  : RemoteDesktop-UserMode-In-TCP
DisplayName           : Remote Desktop - User Mode (TCP-In)
Description           : Inbound rule for the Remote Desktop service to allow RDP traffic. [TCP 3389]
DisplayGroup          : Remote Desktop
Enabled               : True
Profile               : Any
Platform              : {}
Direction             : Inbound
Action                : Allow

## Get firewall rules by enabled status

You can filter rules based on whether they are enabled or disabled. Use the
-Enabled parameter with $true or $false values. This helps identify active
or inactive rules in your firewall configuration.

firewall3.ps1
  

Get-NetFirewallRule -Enabled $true

This command returns all enabled firewall rules. Only rules currently active
in the firewall configuration will be displayed.

## Get detailed firewall rule information

To view all properties of firewall rules, pipe the output to Format-List.
This shows complete configuration details including protocols and ports.
You can also select specific properties using Select-Object.

firewall4.ps1
  

Get-NetFirewallRule -DisplayName "File and Printer Sharing*" | Format-List *

This command shows all properties of File and Printer Sharing rules.
The output includes detailed configuration like interfaces and security.

## Filter firewall rules by direction

You can filter rules based on traffic direction using -Direction parameter.
Valid values are Inbound or Outbound. This helps analyze rules affecting
specific traffic flows through the firewall.

firewall5.ps1
  

Get-NetFirewallRule -Direction Inbound | Where-Object { $_.Enabled -eq $true }

This command lists all enabled inbound firewall rules. The Where-Object cmdlet
filters the results to show only active rules. Adjust the filter as needed.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-NetFirewallRule cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).