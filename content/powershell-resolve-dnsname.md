+++
title = "PowerShell Resolve-DnsName"
date = 2025-08-29T20:07:14.225+01:00
draft = false
description = "PowerShell Resolve-DnsName tutorial shows how to use PowerShell to perform DNS lookups and queries."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Resolve-DnsName

last modified February 15, 2025

In this article, we will cover the Resolve-DnsName cmdlet in
PowerShell. This cmdlet performs DNS name resolution queries.

## DNS basics

DNS (Domain Name System) translates domain names to IP addresses. It is a
hierarchical decentralized naming system. DNS records include A, AAAA, MX,
and CNAME types. PowerShell provides Resolve-DnsName for DNS
queries.

## Basic Resolve-DnsName usage

The simplest way to use Resolve-DnsName is with a domain name.
This performs a standard DNS lookup for A records. The output includes IP
addresses and other DNS information. By default, it queries your system's
configured DNS servers.

dns1.ps1
  

Resolve-DnsName "example.com"

This command retrieves DNS information for example.com. The output shows
the IP address(es) associated with the domain.

## Query specific DNS record types

You can specify which DNS record type to query using the -Type parameter.
Common types include A, AAAA, MX, TXT, and CNAME. This allows targeted
queries for specific DNS information. Different record types serve different
purposes in DNS.

dns2.ps1
  

Resolve-DnsName "example.com" -Type MX

This command retrieves MX (Mail Exchange) records for example.com. MX records
specify mail servers for a domain.

PS C:\&gt; .\dns2.ps1

Name                           Type   TTL   Section    NameExchange       Preference
----                           ----   ---   -------    -----------       ----------
example.com                    MX     3600  Answer     mail.example.com  10

## Specify DNS server

You can query a specific DNS server using the -Server parameter. This bypasses
your system's default DNS configuration. It's useful for testing or when you
need to query authoritative nameservers directly. The server must respond to
DNS queries.

dns3.ps1
  

Resolve-DnsName "example.com" -Server "8.8.8.8"

This command queries Google's public DNS server (8.8.8.8) for example.com's
records. The results come from Google's DNS cache.

## Reverse DNS lookup

Reverse DNS lookups map IP addresses to domain names. Use the -Type PTR
parameter for reverse lookups. The IP address must be properly formatted
for reverse DNS. This is useful for identifying domains associated with IPs.

dns4.ps1
  

Resolve-DnsName "8.8.8.8" -Type PTR

This command performs a reverse DNS lookup on Google's DNS server IP. The
output shows the associated domain name if a PTR record exists.

## Detailed DNS query with all records

For comprehensive DNS information, use the -DnsOnly and -DnssecOk parameters.
This provides detailed output including TTL values and record sections. It
shows the complete DNS response from the server. Useful for troubleshooting.

dns5.ps1
  

Resolve-DnsName "example.com" -Type ANY -DnsOnly -DnssecOk

This command retrieves all available DNS records for example.com. The output
includes all record types present in the DNS zone.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Resolve-DnsName cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).