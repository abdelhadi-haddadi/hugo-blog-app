+++
title = "PowerShell Set-NetFirewallRule"
date = 2025-08-29T20:07:16.504+01:00
draft = false
description = "PowerShell Set-NetFirewallRule tutorial shows how to use PowerShell to configure Windows Firewall rules."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Set-NetFirewallRule

last modified February 15, 2025

In this article, we will cover the Set-NetFirewallRule cmdlet in
PowerShell. This cmdlet modifies existing Windows Firewall rules with various
configuration options.

## Firewall rule basics

A firewall rule controls network traffic to and from your computer. Each rule
has properties like name, direction, action, and protocol. Rules can allow or
block traffic based on these properties. The Set-NetFirewallRule
cmdlet modifies these existing rules.

## Basic Set-NetFirewallRule usage

The simplest way to use Set-NetFirewallRule is with the -Name
parameter. This identifies which rule to modify. You must specify at least one
property to change. The cmdlet doesn't produce output unless you use -PassThru.

firewall1.ps1
  

Set-NetFirewallRule -Name "Remote Desktop - User Mode (TCP-In)" -Enabled True

This command enables the Remote Desktop inbound rule. The -Enabled parameter
controls whether the rule is active. True activates the rule, False deactivates.

## Changing rule description

You can modify the description of an existing firewall rule. Descriptions help
identify the rule's purpose. Use the -Description parameter with the new text.
This is useful for documentation and rule management.

firewall2.ps1
  

Set-NetFirewallRule -Name "Remote Desktop - User Mode (TCP-In)" `
    -Description "Allows inbound Remote Desktop connections"

This command updates the description of the Remote Desktop rule. The backtick (`)
is a line continuation character. It makes long commands more readable.

PS C:\&gt; .\firewall2.ps1

Name                  : Remote Desktop - User Mode (TCP-In)
DisplayName           : Remote Desktop - User Mode (TCP-In)
Description           : Allows inbound Remote Desktop connections
Enabled               : True
Profile               : Any
Platform              : {}
Direction             : Inbound
Action                : Allow

## Modifying multiple rules at once

You can modify multiple rules simultaneously using wildcards. This is efficient
for bulk changes. Combine with -WhatIf to preview changes before applying them.
Always verify the rules affected by your wildcard pattern.

firewall3.ps1
  

Set-NetFirewallRule -DisplayName "Remote Desktop*" -Profile Private, Domain

This command modifies all rules with "Remote Desktop" in their name. It sets
them to apply only to Private and Domain network profiles. The Public profile
is excluded from these rules.

## Changing rule action and protocol

You can modify both the action and protocol of existing rules. The action
determines if traffic is allowed or blocked. The protocol specifies TCP or UDP.
These are fundamental properties of any firewall rule.

firewall4.ps1
  

Set-NetFirewallRule -Name "MyApp Rule" -Action Block -Protocol TCP

This command changes an existing rule to block TCP traffic. The rule must
already exist for this to work. Use New-NetFirewallRule to create new rules.

## Using -PassThru to verify changes

By default, Set-NetFirewallRule doesn't output the modified rule. Use -PassThru
to see the changes. This helps confirm your modifications were applied correctly.
It's good practice for scripting and automation.

firewall5.ps1
  

Set-NetFirewallRule -Name "MyApp Rule" -Direction Outbound -PassThru

This command changes a rule's direction to Outbound and displays the result. The
output shows all rule properties, not just the changed ones. This helps verify
the complete rule configuration.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Set-NetFirewallRule cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).