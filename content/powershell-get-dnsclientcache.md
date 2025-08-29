+++
title = "PowerShell Get-DnsClientCache"
date = 2025-08-29T20:06:57.332+01:00
draft = false
description = "PowerShell Get-DnsClientCache tutorial shows how to use PowerShell to view DNS client cache entries."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-DnsClientCache

last modified February 15, 2025

In this article, we will cover the Get-DnsClientCache cmdlet in
PowerShell. This cmdlet retrieves the contents of the DNS client cache.

## DNS cache basics

The DNS client cache stores recently resolved domain names. It helps speed up
subsequent requests to the same domains. Each entry contains the hostname,
record type, and TTL. The cache is maintained by the DNS Client service.

## Basic Get-DnsClientCache usage

The simplest way to use Get-DnsClientCache is without parameters.
This lists all cached DNS entries. The output includes hostnames, record types,
and TTL values. Each entry is represented as a DnsClientCache object.

dnscache1.ps1
  

Get-DnsClientCache

This command retrieves all cached DNS entries. The output shows hostnames,
record types, and time-to-live values. The cache may be empty if recently cleared.

## Filter cache entries by name

You can filter cache entries by hostname using the -Entry parameter. Wildcards
are supported for partial matching. This is useful when checking specific domains.
The filter is case-insensitive by default.

dnscache2.ps1
  

Get-DnsClientCache -Entry "*google*"

This command returns all cached entries containing "google" in their hostname.
Multiple entries may be returned for different subdomains or record types.

PS C:\&gt; .\dnscache2.ps1

Entry                        RecordName                Record Status     Section TimeTo Data
                                                                       ToLive  Length
-----                        ----------                ------ ------     ------- ------ ----
www.google.com               www.google.com            A      Success   Answer  93     4
google.com                   google.com                AAAA   Success   Answer  93     16

## Filter cache by record type

DNS cache entries can be filtered by record type using -Type parameter. Common
types include A (IPv4), AAAA (IPv6), and CNAME (alias). This helps analyze
specific types of DNS records.

dnscache3.ps1
  

Get-DnsClientCache -Type AAAA

This command returns only IPv6 (AAAA) records from the cache. The output will
show hostnames and their corresponding IPv6 addresses if available.

## Formatting cache output

The default table format can be changed using Format-List for
detailed information. This shows all properties of each cache entry. You can
also select specific properties using Select-Object.

dnscache4.ps1
  

Get-DnsClientCache | Format-List *

This command displays all properties of cached DNS entries in list format.
The output includes detailed information about each record's status and data.

## Clearing the DNS cache

While not directly related to Get-DnsClientCache, you might want
to clear the cache after viewing it. Use Clear-DnsClientCache to
remove all entries. This can help troubleshoot DNS resolution issues.

dnscache5.ps1
  

Clear-DnsClientCache
Get-DnsClientCache

The first command clears the DNS cache, while the second verifies it's empty.
This sequence is useful when testing DNS resolution behavior.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-DnsClientCache cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).