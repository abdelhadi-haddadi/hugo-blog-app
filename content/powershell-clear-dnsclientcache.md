+++
title = "PowerShell Clear-DnsClientCache"
date = 2025-08-29T20:06:46.274+01:00
draft = false
description = "PowerShell Clear-DnsClientCache tutorial shows how to use PowerShell to clear the DNS client resolver cache."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Clear-DnsClientCache

last modified February 15, 2025

In this article, we will cover the Clear-DnsClientCache cmdlet in
PowerShell. This cmdlet clears the contents of the DNS client resolver cache.

## DNS Cache basics

The DNS client resolver cache stores DNS query responses locally. This improves
performance by reducing DNS lookup times for repeated queries. The cache may
contain outdated or incorrect records that need clearing. The
Clear-DnsClientCache cmdlet removes all cached DNS entries.

## Basic Clear-DnsClientCache usage

The simplest way to use Clear-DnsClientCache is without any
parameters. This clears all entries from the DNS client resolver cache. The
cmdlet does not produce output by default when successful. Administrator
privileges are required to execute this command.

dns1.ps1
  

Clear-DnsClientCache

This command clears the entire DNS client resolver cache. After execution,
subsequent DNS queries will require new lookups. No confirmation is requested.

## Verifying the cache is cleared

To verify the cache was cleared, use Get-DnsClientCache before and
after. The cache should be empty after running Clear-DnsClientCache.
This demonstrates the effect of the clearing operation. You can also check with
ipconfig /displaydns in Command Prompt.

dns2.ps1
  

Get-DnsClientCache
Clear-DnsClientCache
Get-DnsClientCache

The first command shows cached entries, the second clears them, and the third
verifies the cache is empty. The second Get-DnsClientCache should
return no results.

PS C:\&gt; .\dns2.ps1

Entry                     RecordName                Record Status    Section TimeTo DataLength Data
                                                                             Live
-----                     ----------                ------ ------    ------- ------ --------- ----
example.com               example.com               A      Success   Answer   25805         4 93.184.216.34

PS C:\&gt; Clear-DnsClientCache
PS C:\&gt; Get-DnsClientCache
PS C:\&gt;

## Clearing cache with confirmation

To add a confirmation prompt before clearing the cache, use the
-Confirm parameter. This is useful in scripts where you want to
prevent accidental cache clearing. The user must confirm the action before
proceeding. This adds an extra layer of safety.

dns3.ps1
  

Clear-DnsClientCache -Confirm

This command will prompt for confirmation before clearing the DNS cache. Type 'Y'
to proceed or 'N' to cancel. The prompt helps prevent accidental execution.

## Clearing cache in a script

When using Clear-DnsClientCache in scripts, you may want to suppress
the confirmation prompt. Use the -Force parameter to bypass
confirmation. This is useful for automated scripts where user interaction is not
desired. Always use caution with this parameter.

dns4.ps1
  

Clear-DnsClientCache -Force

This command clears the DNS cache without any confirmation prompts. It executes
immediately when run. Use this only when absolutely necessary in scripts.

## Checking cache size before clearing

You can check the cache size before clearing it to understand the impact. Use
Get-DnsClientCache with Measure-Object to count
entries. This helps in monitoring and troubleshooting scenarios. The count shows
how many records will be removed.

dns5.ps1
  

$count = (Get-DnsClientCache | Measure-Object).Count
Write-Host "Clearing $count DNS cache entries"
Clear-DnsClientCache

This script first counts the cache entries, displays the count, then clears the
cache. The output shows how many records were removed. This provides visibility
into the operation.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Clear-DnsClientCache cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).