+++
title = "PHP gethostbyaddr Function"
date = 2025-08-29T20:06:11.714+01:00
draft = false
description = "PHP gethostbyaddr function tutorial shows how to perform reverse DNS lookups in PHP. Learn gethostbyaddr with practical examples for IP address resolution."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP gethostbyaddr Function

last modified April 4, 2025

The PHP gethostbyaddr function performs reverse DNS lookups. It
returns the hostname associated with a given IP address. This is useful for
identifying servers and logging purposes.

## Basic Definition

gethostbyaddr gets the Internet host name corresponding to an IP
address. It queries DNS servers to find the PTR record for the IP address.

Syntax: gethostbyaddr(string $ip): string|false. Returns the
hostname on success or the IP on failure. Requires proper DNS configuration.

## Basic Reverse DNS Lookup

This example demonstrates a simple reverse DNS lookup for an IP address.

basic_lookup.php
  

&lt;?php

declare(strict_types=1);

$ip = "93.184.216.34"; // example.com IP
$hostname = gethostbyaddr($ip);

echo "IP $ip resolves to: " . $hostname;

This code queries DNS for the hostname associated with the IP address. If no
PTR record exists, it returns the original IP. The result depends on DNS
configuration.

## Handling Failed Lookups

This example shows how to handle cases where reverse DNS lookup fails.

failed_lookup.php
  

&lt;?php

declare(strict_types=1);

$ip = "8.8.8.8"; // Google DNS (may not have PTR)
$hostname = gethostbyaddr($ip);

if ($hostname === $ip) {
    echo "No reverse DNS record found for $ip";
} else {
    echo "Reverse DNS for $ip: $hostname";
}

When no PTR record exists, gethostbyaddr returns the input IP.
This example checks for this case to detect failed lookups. Some IPs may
intentionally not have PTR records.

## Looking Up Client IP

This example performs reverse DNS on the client's IP address for logging.

client_lookup.php
  

&lt;?php

declare(strict_types=1);

$client_ip = $_SERVER['REMOTE_ADDR'];
$hostname = gethostbyaddr($client_ip);

echo "Client IP: $client_ip\n";
echo "Hostname: $hostname";

This can help identify clients in logs, though many ISPs don't set PTR
records for residential IPs. The hostname may reveal the ISP or service
provider when available.

## Batch IP Lookup

This example processes multiple IP addresses in a batch operation.

batch_lookup.php
  

&lt;?php

declare(strict_types=1);

$ips = [
    "93.184.216.34", // example.com
    "8.8.8.8",       // Google DNS
    "127.0.0.1"      // localhost
];

foreach ($ips as $ip) {
    $hostname = gethostbyaddr($ip);
    echo "$ip → $hostname\n";
}

This demonstrates processing multiple IP addresses efficiently. Each lookup
is performed sequentially. Consider adding delays between lookups to avoid
being blocked by rate limits.

## IPv6 Reverse Lookup

This example shows reverse DNS lookup for an IPv6 address.

ipv6_lookup.php
  

&lt;?php

declare(strict_types=1);

$ipv6 = "2606:2800:220:1:248:1893:25c8:1946"; // example.com IPv6
$hostname = gethostbyaddr($ipv6);

echo "IPv6 $ipv6 resolves to: $hostname";

gethostbyaddr works with both IPv4 and IPv6 addresses. IPv6
PTR records use a special format in the ip6.arpa domain. The function
handles the conversion automatically.

## Best Practices

- **Caching:** Cache results to avoid repeated DNS queries

- **Timeouts:** Consider setting a timeout for slow responses

- **Error Handling:** Always verify the return value

- **Performance:** Avoid in loops without delays

- **Privacy:** Be mindful of logging PII from hostnames

## Source

[PHP gethostbyaddr Documentation](https://www.php.net/manual/en/function.gethostbyaddr.php)

This tutorial covered the PHP gethostbyaddr function with practical
examples for reverse DNS lookups in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).