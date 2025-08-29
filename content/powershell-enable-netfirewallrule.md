+++
title = "PowerShell Enable-NetFirewallRule"
date = 2025-08-29T20:06:50.705+01:00
draft = false
description = "PowerShell Enable-NetFirewallRule tutorial shows how to use PowerShell to enable Windows firewall rules."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Enable-NetFirewallRule

last modified February 15, 2025

This article covers the Enable-NetFirewallRule cmdlet in PowerShell.
It enables previously disabled Windows Firewall rules. This is essential for
network security management.

## Firewall rule basics

Windows Firewall rules control network traffic to and from your computer.
Each rule defines conditions for allowing or blocking connections. Rules can be
enabled or disabled as needed. The Enable-NetFirewallRule cmdlet
activates disabled rules.

## Basic Enable-NetFirewallRule usage

The simplest way to use Enable-NetFirewallRule is with a rule name.
This enables the specified firewall rule. The rule must exist in the firewall
configuration. You may need administrator privileges to modify firewall rules.

firewall1.ps1
  

Enable-NetFirewallRule -DisplayName "Remote Desktop - User Mode (TCP-In)"

This command enables the Remote Desktop inbound rule for TCP connections.
The -DisplayName parameter specifies which rule to enable. Confirm the rule
exists first using Get-NetFirewallRule.

## Enable multiple rules by name pattern

You can enable multiple rules using wildcards in the display name. This is
useful for enabling groups of related rules. The -DisplayGroup parameter
can also be used to enable rules by their group name.

firewall2.ps1
  

Enable-NetFirewallRule -DisplayName "Remote Desktop*"

This command enables all firewall rules with names starting with "Remote Desktop".
The asterisk acts as a wildcard matching any characters. This affects both TCP
and UDP rules for Remote Desktop.

PS C:\&gt; .\firewall2.ps1

Name                  : {E5D5B920-379D-4D22-BA5E-000000000000}
DisplayName           : Remote Desktop - User Mode (TCP-In)
Description           : Inbound rule for the Remote Desktop service to allow RDP traffic. [TCP 3389]
DisplayGroup          : Remote Desktop
Enabled               : True
Direction             : Inbound
Action                : Allow

## Enable rules by group name

Firewall rules can be organized into groups. You can enable all rules in a
specific group at once. This is efficient for managing related rules. Use the
-DisplayGroup parameter with the group name.

firewall3.ps1
  

Enable-NetFirewallRule -DisplayGroup "File and Printer Sharing"

This command enables all rules in the "File and Printer Sharing" group. Group
names are case-sensitive. Verify the exact group name using Get-NetFirewallRule.

## Enable rules by direction

You can enable rules based on their traffic direction. The -Direction parameter
filters rules by inbound or outbound traffic. This is useful when configuring
specific types of network access.

firewall4.ps1
  

Enable-NetFirewallRule -Direction Inbound -DisplayName "Web Server*"

This command enables all inbound rules with names starting with "Web Server".
The -Direction parameter ensures only inbound rules are affected. This is
important for security when enabling server access.

## Enable rules with confirmation

For safety, you can add confirmation prompts when enabling rules. The -Confirm
parameter prompts before making changes. This prevents accidental rule
modifications. Use -WhatIf to preview changes without applying them.

firewall5.ps1
  

Enable-NetFirewallRule -DisplayName "Core Networking*" -Confirm

This command prompts for confirmation before enabling Core Networking rules.
The prompt shows which rules will be affected. Answer 'Y' to proceed or 'N' to
cancel the operation.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Enable-NetFirewallRule cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).