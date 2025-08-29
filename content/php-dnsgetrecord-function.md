+++
title = "PHP dns_get_record Function"
date = 2025-08-29T20:06:10.601+01:00
draft = false
description = "PHP dns_get_record function tutorial shows how to retrieve DNS records in PHP. Learn dns_get_record with practical examples for DNS analysis and domain validation."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP dns_get_record Function

last modified April 4, 2025

The PHP dns_get_record function retrieves DNS records for a given
host. It provides detailed DNS information for analysis and validation.

## Basic Definition

dns_get_record fetches DNS resource records associated with a host.
It can retrieve various record types like A, MX, CNAME, TXT, etc.

Syntax: dns_get_record(string $hostname, int $type = DNS_ANY, array &amp;$authns = null, array &amp;$addtl = null, bool $raw = false): array|false.
Returns an array of records or false on failure.

## Retrieving All DNS Records

This example shows how to get all DNS records for a domain.

all_records.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$records = dns_get_record($domain);

echo "DNS records for $domain:\n";
print_r($records);

This fetches all available DNS records for the domain. The result is an array
containing all record types. Each record has type-specific fields.

## Getting Specific Record Types

This demonstrates retrieving only MX (Mail Exchange) records for a domain.

mx_records.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$mx_records = dns_get_record($domain, DNS_MX);

echo "MX records for $domain:\n";
foreach ($mx_records as $record) {
    echo "Priority: {$record['pri']}, Target: {$record['target']}\n";
}

MX records specify mail servers for a domain. This example extracts priority
and target server from each MX record. Useful for email configuration checks.

## Checking TXT Records

This example retrieves TXT records, often used for verification and SPF.

txt_records.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$txt_records = dns_get_record($domain, DNS_TXT);

echo "TXT records for $domain:\n";
foreach ($txt_records as $record) {
    echo "TXT: {$record['txt']}\n";
}

TXT records contain arbitrary text data. Commonly used for domain verification,
SPF records, and DKIM configuration. This extracts all TXT entries.

## Getting A and AAAA Records

This shows how to retrieve both IPv4 (A) and IPv6 (AAAA) address records.

ip_records.php
  

&lt;?php

declare(strict_types=1);

$host = "www.example.com";
$ip_records = dns_get_record($host, DNS_A + DNS_AAAA);

echo "IP records for $host:\n";
foreach ($ip_records as $record) {
    $ip = $record['type'] == 'A' ? $record['ip'] : $record['ipv6'];
    echo "{$record['type']}: $ip\n";
}

A records contain IPv4 addresses, AAAA contain IPv6. This combines both types
to get all IP addresses associated with a hostname. Useful for connectivity tests.

## Advanced DNS Analysis

This example performs comprehensive DNS analysis with authoritative nameservers.

advanced_dns.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$authns = [];
$addtl = [];

$records = dns_get_record($domain, DNS_ALL, $authns, $addtl);

echo "Primary records:\n";
print_r($records);

echo "\nAuthoritative nameservers:\n";
print_r($authns);

echo "\nAdditional records:\n";
print_r($addtl);

This retrieves all records plus authoritative nameserver information. The
$authns parameter returns NS records. $addtl contains
additional relevant records. Useful for in-depth DNS troubleshooting.

## Best Practices

- **Error Handling:** Always check for false return value

- **Caching:** Cache results to avoid repeated DNS queries

- **Timeouts:** Be aware of potential DNS query timeouts

- **Record Validation:** Verify required fields exist in results

- **Security:** Sanitize input to prevent DNS poisoning

## Source

[PHP dns_get_record Documentation](https://www.php.net/manual/en/function.dns-get-record.php)

This tutorial covered the PHP dns_get_record function with practical
examples for DNS record retrieval and analysis in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).