+++
title = "PowerShell Disable-NetFirewallRule"
date = 2025-08-29T20:06:49.601+01:00
draft = false
description = "PowerShell Disable-NetFirewallRule tutorial shows how to use PowerShell to disable Windows firewall rules."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Disable-NetFirewallRule

last modified February 15, 2025

This article covers the Disable-NetFirewallRule cmdlet in PowerShell.
It is used to disable existing Windows firewall rules. The cmdlet is part of the
NetSecurity module.

## Firewall rule basics

Windows Firewall rules control network traffic to and from your computer.
Each rule has properties like name, direction, action, and protocol.
Rules can be enabled or disabled to control their effect. The
Disable-NetFirewallRule cmdlet modifies rule status.

## Basic Disable-NetFirewallRule usage

The simplest way to disable a firewall rule is by its name. Use the -Name
parameter followed by the rule name. The rule will be disabled but not deleted.
You can verify the change with Get-NetFirewallRule.

disable1.ps1
  

Disable-NetFirewallRule -Name "Remote Desktop - User Mode (TCP-In)"

This command disables the Remote Desktop inbound rule. The rule remains in
the firewall configuration but won't be active. Administrator privileges are
required to modify firewall rules.

## Disable multiple rules by name

You can disable multiple rules at once by providing multiple names. Separate
the rule names with commas. Wildcards can be used to match multiple rules.
This is useful for batch operations on related rules.

disable2.ps1
  

Disable-NetFirewallRule -Name "Remote*", "CoreNet*"

This command disables all rules starting with "Remote" or "CoreNet". The
operation affects multiple rules simultaneously. Always verify the rules
before disabling them.

PS C:\&gt; .\disable2.ps1

Name                  : Remote Desktop - User Mode (TCP-In)
Enabled               : False
Direction             : Inbound
Profile               : Any
Action                : Allow

Name                  : Core Networking - DNS (UDP-Out)
Enabled               : False
Direction             : Outbound
Profile               : Any
Action                : Allow

## Disable rules by display name

Rules can also be disabled using their display names. The -DisplayName
parameter accepts partial matches with wildcards. This is helpful when
you know the rule's display text but not its exact name.

disable3.ps1
  

Disable-NetFirewallRule -DisplayName "File and Printer Sharing*"

This command disables all rules with display names starting with "File and
Printer Sharing". The asterisk acts as a wildcard for partial matching.
Display names often provide more readable descriptions than rule names.

## Disable rules by pipeline input

Rules can be disabled by piping them from Get-NetFirewallRule. This allows
filtering before disabling. You can combine this with Where-Object for
complex filtering. The pipeline approach is powerful for selective operations.

disable4.ps1
  

Get-NetFirewallRule -Direction Inbound | Disable-NetFirewallRule

This command disables all inbound firewall rules. The Get-NetFirewallRule
cmdlet retrieves the rules, which are then piped to Disable-NetFirewallRule.
Use caution with broad operations like this.

## Disable rules with confirmation

For safety, you can add confirmation prompts before disabling rules. Use the
-Confirm parameter to request user approval. This prevents accidental
modifications. The prompt shows which rules will be affected.

disable5.ps1
  

Disable-NetFirewallRule -Name "Remote*" -Confirm

This command prompts for confirmation before disabling any matching rules.
The user must type 'Y' to proceed or 'N' to cancel. This is recommended
for production environments.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Disable-NetFirewallRule cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).