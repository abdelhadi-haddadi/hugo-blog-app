+++
title = "PHP dns_check_record Function"
date = 2025-08-29T20:06:09.477+01:00
draft = false
description = "PHP dns_check_record function tutorial shows how to check DNS records in PHP. Learn dns_check_record with practical examples for email and domain validation."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP dns_check_record Function

last modified April 4, 2025

The PHP dns_check_record function checks DNS records for a given host.
It's an alias of checkdnsrr with identical functionality.

## Basic Definition

dns_check_record verifies if DNS records exist for a specified host.
It can check various record types like MX, A, CNAME, and others.

Syntax: dns_check_record(string $host, string $type = "MX"): bool.
Returns true if matching records exist, false otherwise. Requires DNS access.

## Basic Email Domain Validation

This example checks if a domain has MX records for email validation.

email_validation.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
if (dns_check_record($domain, "MX")) {
    echo "Domain $domain has valid MX records";
} else {
    echo "Domain $domain has no MX records";
}

This checks if the domain can receive email by verifying MX records.
MX records are essential for proper email server communication.

## Checking A Records

This demonstrates checking A records to verify a domain's IP resolution.

a_record_check.php
  

&lt;?php

declare(strict_types=1);

$host = "www.example.com";
if (dns_check_record($host, "A")) {
    echo "$host resolves to an IP address";
} else {
    echo "$host doesn't resolve to an IP";
}

A records map hostnames to IP addresses. This check confirms the domain
has proper DNS configuration for web hosting.

## Checking Multiple Record Types

This example checks multiple DNS record types for comprehensive validation.

multi_record_check.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$checks = ["A", "MX", "TXT"];

foreach ($checks as $type) {
    $result = dns_check_record($domain, $type) ? "exists" : "missing";
    echo "$type record: $result\n";
}

This provides a complete DNS health check by verifying multiple record types.
Different record types serve different purposes in domain configuration.

## Email Validation Function

This shows a complete email validation function using dns_check_record.

email_validator.php
  

&lt;?php

declare(strict_types=1);

function validateEmailDomain($email) {

    $parts = explode('@', $email);
    if (count($parts) != 2) return false;
    
    $domain = $parts[1];
    return dns_check_record($domain, "MX");
}

$email = "user@example.com";
echo validateEmailDomain($email) ? "Valid" : "Invalid";

This function splits the email to extract the domain, then checks for MX
records. This is more reliable than simple format validation.

## Checking CNAME Records

This example verifies if a hostname has CNAME (alias) records configured.

cname_check.php
  

&lt;?php

declare(strict_types=1);

$host = "blog.example.com";
if (dns_check_record($host, "CNAME")) {
    echo "$host is an alias (CNAME)";
} else {
    echo "$host is not a CNAME record";
}

CNAME records create aliases pointing to other domain names. This check helps
identify if a hostname is configured as an alias.

## Best Practices

- **Caching:** Cache results to avoid repeated DNS queries

- **Error Handling:** Handle cases where DNS queries fail

- **Performance:** Consider timeout values for slow responses

- **Validation:** Combine with other validation methods

## Source

[PHP dns_check_record Documentation](https://www.php.net/manual/en/function.dns-check-record.php)

This tutorial covered the PHP dns_check_record function with practical
examples for DNS record validation in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).