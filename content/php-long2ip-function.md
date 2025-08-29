+++
title = "PHP long2ip Function"
date = 2025-08-29T20:06:18.326+01:00
draft = false
description = "PHP long2ip function tutorial shows how to convert long integer IP addresses to dotted-quad strings in PHP. Learn long2ip with practical examples for network programming."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP long2ip Function

last modified April 4, 2025

The PHP long2ip function converts a long integer address into
a dotted-quad string IP address. It's essential for network programming.

## Basic Definition

long2ip transforms a 32-bit unsigned long integer into an IPv4
address string. The integer represents the packed binary format of an IP.

Syntax: long2ip(int $ip): string. Returns the IP address as
a string in dotted format (e.g., "192.168.1.1"). Works with IPv4 only.

## Basic Conversion Example

This example demonstrates the simplest usage of converting a long to IP.

basic_conversion.php
  

&lt;?php

declare(strict_types=1);

$longIP = 2130706433; // 127.0.0.1 in long format
$ipAddress = long2ip($longIP);

echo "Long: $longIP converts to IP: $ipAddress";

This converts the integer 2130706433 to its IP representation 127.0.0.1.
The function handles the binary to dotted-quad conversion automatically.

## Converting Database-Stored IPs

This shows how to convert IPs stored as integers in databases to readable format.

database_ip_conversion.php
  

&lt;?php

declare(strict_types=1);

// Simulating IP stored as integer in database
$storedIP = 3232235521; // 192.168.0.1

$readableIP = long2ip($storedIP);
echo "Database value $storedIP represents IP: $readableIP";

Many databases store IPs as integers for efficiency. This converts them back
to human-readable format when retrieved. The example uses 192.168.0.1.

## Working with ip2long and long2ip

This demonstrates the relationship between ip2long and long2ip functions.

ip_conversion_cycle.php
  

&lt;?php

declare(strict_types=1);

$originalIP = "10.0.0.138";
$longIP = ip2long($originalIP);
$convertedIP = long2ip($longIP);

echo "Original: $originalIP\n";
echo "Long: $longIP\n";
echo "Converted back: $convertedIP";

This shows the complete cycle of converting IP to long and back. The functions
are inverses of each other when used correctly. Note potential signed integer
issues on 32-bit systems.

## Handling Network Addresses

This example converts network addresses stored as long integers.

network_address_conversion.php
  

&lt;?php

declare(strict_types=1);

$networkLong = 2886729728; // 172.16.0.0
$broadcastLong = 2886733823; // 172.16.0.255

echo "Network: " . long2ip($networkLong) . "\n";
echo "Broadcast: " . long2ip($broadcastLong);

Network programming often works with address ranges as integers. This converts
network and broadcast addresses to readable format. Useful for subnet calculations.

## Error Handling with Invalid Input

This demonstrates how long2ip handles invalid input values.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$invalidLong = -1; // Negative value
$largeLong = 4294967296; // Exceeds 32-bit

try {
    echo "Negative: " . long2ip($invalidLong) . "\n";
    echo "Large: " . long2ip($largeLong);
} catch (Throwable $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The function wraps around for values outside 0-4294967295 range due to PHP's
integer handling. Negative values produce unexpected results rather than errors.

## Best Practices

- **Validation:** Validate input is within 0-4294967295 range

- **32-bit Systems:** Be aware of signed integer limitations

- **IPv6:** Use other functions for IPv6 addresses

- **Type Safety:** Ensure input is integer type

## Source

[PHP long2ip Documentation](https://www.php.net/manual/en/function.long2ip.php)

This tutorial covered the PHP long2ip function with practical
examples for IP address conversion in network programming scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).