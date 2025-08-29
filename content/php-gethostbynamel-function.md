+++
title = "PHP gethostbynamel Function"
date = 2025-08-29T20:06:11.698+01:00
draft = false
description = "PHP gethostbynamel function tutorial shows how to get all IP addresses for a hostname in PHP. Learn gethostbynamel with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP gethostbynamel Function

last modified April 4, 2025

The PHP gethostbynamel function returns all IP addresses
associated with a hostname. It's useful when a domain has multiple IPs.

## Basic Definition

gethostbynamel resolves a hostname to an array of IPv4 addresses.
It performs a DNS A record lookup for the given domain name.

Syntax: gethostbynamel(string $hostname): array|false.
Returns an array of IPs or false on failure. Requires DNS server access.

## Basic Hostname Resolution

This example shows how to get all IP addresses for a hostname.

basic_resolution.php
  

&lt;?php

declare(strict_types=1);

$hostname = "www.google.com";
$ips = gethostbynamel($hostname);

if ($ips !== false) {
    echo "IP addresses for $hostname:\n";
    print_r($ips);
} else {
    echo "Could not resolve $hostname";
}

This code resolves www.google.com to its IP addresses. Large sites often
have multiple IPs for load balancing and redundancy.

## Handling Resolution Failure

This demonstrates proper error handling when hostname resolution fails.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$hostname = "nonexistent.example";
$ips = gethostbynamel($hostname);

if ($ips === false) {
    echo "Failed to resolve $hostname\n";
    $error = error_get_last();
    echo "Error: " . $error['message'];
}

When resolution fails, the function returns false. We check for this and
display the error message from PHP's error system.

## Checking Localhost Resolution

This example checks how localhost resolves to IP addresses.

localhost_check.php
  

&lt;?php

declare(strict_types=1);

$hostname = "localhost";
$ips = gethostbynamel($hostname);

if ($ips !== false) {
    echo "localhost resolves to:\n";
    foreach ($ips as $ip) {
        echo "- $ip\n";
    }
} else {
    echo "Failed to resolve localhost";
}

Localhost should typically resolve to 127.0.0.1. This verifies your
system's hostname resolution is working correctly.

## Comparing with gethostbyname

This shows the difference between gethostbynamel and gethostbyname.

comparison.php
  

&lt;?php

declare(strict_types=1);

$hostname = "www.example.com";

$single_ip = gethostbyname($hostname);
$all_ips = gethostbynamel($hostname);

echo "Single IP: $single_ip\n";
echo "All IPs: " . implode(', ', $all_ips);

gethostbyname returns just one IP, while gethostbynamel returns all.
This is important for services with multiple servers.

## Building a Host Checker Tool

This example creates a complete host checker using gethostbynamel.

host_checker.php
  

&lt;?php

declare(strict_types=1);

function checkHost($hostname) {
    $ips = gethostbynamel($hostname);
    
    if ($ips === false) {
        return "Host $hostname could not be resolved";
    }
    
    $result = "Host $hostname resolves to:\n";
    foreach ($ips as $ip) {
        $result .= "- $ip\n";
        $result .= "Reverse: " . gethostbyaddr($ip) . "\n";
    }
    
    return $result;
}

echo checkHost("www.php.net");

This tool resolves a hostname and shows all IPs with reverse DNS lookups.
It demonstrates practical use of gethostbynamel in a complete function.

## Best Practices

- **Caching:** Cache DNS results to reduce lookup times

- **Timeouts:** Consider DNS query timeout settings

- **Validation:** Validate hostnames before resolution

- **Error Handling:** Always check for false return value

- **IPv6:** Use dns_get_record for IPv6 support

## Source

[PHP gethostbynamel Documentation](https://www.php.net/manual/en/function.gethostbynamel.php)

This tutorial covered the PHP gethostbynamel function with practical
examples for resolving hostnames to multiple IP addresses.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).