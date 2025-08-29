+++
title = "PowerShell New-NetFirewallRule"
date = 2025-08-29T20:07:07.424+01:00
draft = false
description = "PowerShell New-NetFirewallRule tutorial shows how to create firewall rules in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell New-NetFirewallRule

last modified February 15, 2025

This article covers the New-NetFirewallRule cmdlet in PowerShell. 
It creates inbound or outbound firewall rules in Windows. The cmdlet is part of 
the NetSecurity module. It provides granular control over Windows Firewall.

## Firewall rule basics

A firewall rule defines how network traffic is filtered. Rules can allow or 
block traffic based on various criteria. Each rule has a name, direction, 
action, and protocol specification. Rules can apply to specific programs, 
ports, or IP addresses. Windows Firewall uses these rules to secure the system.

## Create a basic allow rule

This example creates a simple inbound firewall rule. The rule allows traffic 
on TCP port 80. It applies to all profiles (Domain, Private, Public). The 
rule is enabled immediately after creation.

firewall1.ps1
  

New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP `
    -LocalPort 80 -Action Allow -Enabled True

The rule allows incoming HTTP traffic on port 80. The -Direction parameter 
specifies inbound traffic. -Protocol defines the protocol type. -LocalPort 
sets the port number. -Action Allow permits the traffic.

## Create a rule for a specific program

This example creates a rule for a specific executable file. The rule allows 
outbound traffic for the specified program. It applies only to the Private 
network profile. The rule has a custom description for documentation.

firewall2.ps1
  

New-NetFirewallRule -DisplayName "Allow MyApp" -Direction Outbound `
    -Program "C:\Apps\MyApp.exe" -Action Allow -Profile Private `
    -Description "Allows MyApp to communicate externally"

The -Program parameter specifies the application path. -Profile limits the 
rule to Private networks. -Description adds explanatory text. The rule only 
affects traffic from the specified executable.

## Create a rule with IP restrictions

This example creates a rule with IP address restrictions. The rule allows 
inbound RDP traffic only from specific IPs. It uses the -RemoteAddress 
parameter to define allowed sources. The rule is disabled by default.

firewall3.ps1
  

New-NetFirewallRule -DisplayName "Restricted RDP" -Direction Inbound `
    -Protocol TCP -LocalPort 3389 -Action Allow -RemoteAddress "192.168.1.100,192.168.1.101" `
    -Enabled False

The rule would allow RDP access only from two IP addresses. -RemoteAddress 
accepts multiple comma-separated IPs. -Enabled False creates the rule in 
disabled state. The rule can be enabled later when needed.

## Create a rule with service association

This example creates a rule associated with a Windows service. The rule 
allows inbound traffic for the DNS service. It uses the -Service parameter 
to link to the service. The rule applies to all network profiles.

firewall4.ps1
  

New-NetFirewallRule -DisplayName "Allow DNS Service" -Direction Inbound `
    -Protocol UDP -LocalPort 53 -Action Allow -Service Dnscache

The rule allows DNS traffic on UDP port 53. -Service links to the Dnscache 
service. Traffic is only allowed when the service is running. This provides 
more precise control than port-based rules.

## Create a rule with advanced security

This example creates a rule with advanced security settings. It configures 
authentication and encryption requirements. The rule uses IPSec for secure 
communication. Multiple security options are specified.

firewall5.ps1
  

New-NetFirewallRule -DisplayName "Secure File Share" -Direction Inbound `
    -Protocol TCP -LocalPort 445 -Action Allow -Authentication Required `
    -Encryption Dynamic -LocalUser Any -RemoteUser "DOMAIN\FileUsers"

The rule allows SMB traffic with security requirements. -Authentication 
enforces IPSec authentication. -Encryption enables dynamic encryption. 
-RemoteUser restricts access to specific domain users. This creates a 
secure file sharing rule.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the New-NetFirewallRule cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).