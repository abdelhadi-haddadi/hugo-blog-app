+++
title = "PHP gethostbyname Function"
date = 2025-08-29T20:06:11.705+01:00
draft = false
description = "PHP gethostbyname function tutorial shows how to resolve hostnames to IP addresses in PHP. Learn gethostbyname with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP gethostbyname Function

last modified April 4, 2025

The PHP gethostbyname function resolves hostnames to IP addresses.
It performs forward DNS lookups, converting domain names to IPv4 addresses.

## Basic Definition

gethostbyname translates a hostname to its corresponding IPv4 address.
It queries DNS servers to perform the resolution. Returns a string with the IP.

Syntax: gethostbyname(string $hostname): string. Returns the IP
address or the original hostname if resolution fails. Simple but effective.

## Basic Hostname Resolution

This example demonstrates the simplest use of gethostbyname.

basic_resolution.php
  

&lt;?php

declare(strict_types=1);

$hostname = "www.example.com";
$ip = gethostbyname($hostname);

echo "The IP address of $hostname is: $ip";

This code resolves www.example.com to its IPv4 address. If resolution fails,
it returns the original hostname. Always verify the result is an IP.

## Checking Resolution Success

This example shows how to verify if hostname resolution was successful.

check_resolution.php
  

&lt;?php

declare(strict_types=1);

$hostname = "www.example.com";
$ip = gethostbyname($hostname);

if ($ip !== $hostname) {
    echo "Resolution successful: $ip";
} else {
    echo "Resolution failed for $hostname";
}

The function returns the input hostname if resolution fails. This pattern
helps distinguish between success and failure cases clearly.

## Resolving Multiple Hostnames

This example resolves multiple hostnames in one operation efficiently.

multi_resolution.php
  

&lt;?php

declare(strict_types=1);

$hostnames = ["google.com", "yahoo.com", "github.com"];

foreach ($hostnames as $host) {
    $ip = gethostbyname($host);
    echo "$host resolves to $ip\n";
}

This demonstrates batch processing of hostname resolution. Useful for
applications needing to resolve multiple domains at once.

## Building a URL Validator

This example creates a URL validator that checks domain resolution.

url_validator.php
  

&lt;?php

declare(strict_types=1);

function validateUrl($url) {
    $parsed = parse_url($url);
    if (!isset($parsed['host'])) return false;
    
    $ip = gethostbyname($parsed['host']);
    return $ip !== $parsed['host'];
}

$url = "https://www.example.com";
echo validateUrl($url) ? "Valid URL" : "Invalid URL";

This function extracts the hostname from a URL and verifies it resolves.
Combine with other validation for comprehensive URL checking.

## Comparing with gethostbynamel

This example shows the difference between gethostbyname and gethostbynamel.

compare_resolution.php
  

&lt;?php

declare(strict_types=1);

$hostname = "www.google.com";

$single_ip = gethostbyname($hostname);
$all_ips = gethostbynamel($hostname);

echo "Single IP: $single_ip\n";
echo "All IPs: " . implode(", ", $all_ips);

gethostbyname returns one IP while gethostbynamel
returns all. Useful when hosts have multiple IP addresses for load balancing.

## Best Practices

- **Error Handling:** Always check if resolution succeeded

- **Caching:** Cache results to avoid repeated DNS queries

- **IPv6:** Use dns_get_record for IPv6 support

- **Timeouts:** Consider DNS query timeout in production

## Source

[PHP gethostbyname Documentation](https://www.php.net/manual/en/function.gethostbyname.php)

This tutorial covered the PHP gethostbyname function with practical
examples for hostname to IP resolution in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).