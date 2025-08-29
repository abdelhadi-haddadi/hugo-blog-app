+++
title = "PowerShell Set-DnsClient"
date = 2025-08-29T20:07:16.519+01:00
draft = false
description = "PowerShell Set-DnsClient tutorial shows how to configure DNS client settings in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Set-DnsClient

last modified February 15, 2025

This article covers the Set-DnsClient cmdlet in PowerShell. 
It configures DNS client settings on Windows systems. The cmdlet manages 
interface-specific DNS configurations.

## DNS Client basics

The DNS client service resolves domain names to IP addresses. It caches 
responses and follows configured DNS server settings. Each network interface 
can have unique DNS configurations. The Set-DnsClient cmdlet 
modifies these settings.

## Basic Set-DnsClient usage

The simplest use modifies the DNS server for an interface. Specify the 
interface index with -InterfaceIndex. Provide DNS servers 
with -ServerAddresses. This changes where DNS queries are sent.

dns1.ps1
  

Set-DnsClient -InterfaceIndex 12 -ServerAddresses ("8.8.8.8","8.8.4.4")

This configures interface 12 to use Google's public DNS servers. The 
-ServerAddresses accepts an array of IP strings. Changes 
take effect immediately.

## Disable IPv6 on an interface

You can disable IPv6 DNS resolution for specific interfaces. Use the 
-ConnectionSpecificSuffix parameter. Combine with 
-RegisterThisConnectionsAddress for registration control.

dns2.ps1
  

Set-DnsClient -InterfaceIndex 5 -ConnectionSpecificSuffix "" `
    -RegisterThisConnectionsAddress $false

This disables DNS registration and clears the connection suffix for 
interface 5. The backtick (`) continues the command on the next line. 
This prevents IPv6 DNS registration.

## Enable DNS suffix search list

The DNS suffix search list appends domains to unqualified names. Use 
-UseSuffixWhenRegistering to enable this behavior. This 
helps resolve local network names without full qualification.

dns3.ps1
  

Set-DnsClient -InterfaceIndex 3 -UseSuffixWhenRegistering $true

This enables DNS suffix search for interface 3. The system will append 
configured suffixes to resolve names. This simplifies local network name 
resolution.

## Configure multiple DNS settings

Multiple DNS settings can be configured in one command. This example 
sets servers, enables LLMNR, and configures suffix registration. The 
-Validate parameter checks settings before applying.

dns4.ps1
  

Set-DnsClient -InterfaceIndex 7 -ServerAddresses "192.168.1.1" `
    -UseSuffixWhenRegistering $true -ConnectionSpecificSuffix "local.lan" `
    -Validate $true

This configures interface 7 with multiple DNS settings. The local DNS 
server is set along with suffix options. The -Validate 
ensures proper configuration.

## Disable multicast name resolution

Multicast DNS (mDNS) resolves names without a traditional DNS server. 
Use -EnableMulticast to control this feature. Disabling 
can improve security in some environments.

dns5.ps1
  

Set-DnsClient -InterfaceAlias "Ethernet" -EnableMulticast $false

This disables multicast DNS on the "Ethernet" interface. The 
-InterfaceAlias identifies the interface by name instead 
of index. Changes apply to all matching interfaces.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

This article covered the Set-DnsClient cmdlet in PowerShell. We explored 
basic configuration and advanced scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive 
programming experience. I have been writing programming articles since 2007. 
To date, I have authored over 1,400 articles and 8 e-books. I possess more 
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).