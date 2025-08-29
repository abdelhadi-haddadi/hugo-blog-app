+++
title = "PHP ip2long Function"
date = 2025-08-29T20:06:18.321+01:00
draft = false
description = "PHP ip2long function tutorial shows how to convert IP addresses to long integers in PHP. Learn ip2long with practical examples for IP manipulation and storage."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP ip2long Function

last modified April 4, 2025

The PHP ip2long function converts a human-readable IP address
to a long integer. This is useful for IP storage and range comparisons.

## Basic Definition

ip2long converts an IPv4 address from string to long integer.
The integer can be used for efficient storage and IP address manipulation.

Syntax: ip2long(string $ip): int|false. Returns the long integer
or false on failure. Works only with IPv4 addresses, not IPv6.

## Basic IP Conversion

This example demonstrates the basic conversion of an IP address to long.

basic_conversion.php
  

&lt;?php

declare(strict_types=1);

$ip = "192.168.1.1";
$long_ip = ip2long($ip);

echo "IP: $ip\n";
echo "Long: $long_ip\n";

The output shows the string IP and its long integer representation.
This conversion is useful for compact storage in databases.

## IP Address Validation

This example shows how to validate an IP address using ip2long.

ip_validation.php
  

&lt;?php

declare(strict_types=1);

function isValidIp($ip) {
    return ip2long($ip) !== false;
}

$test_ip = "256.0.0.1"; // Invalid IP
echo isValidIp($test_ip) ? "Valid" : "Invalid";

The function returns false for invalid IP addresses. Note that some
invalid IPs might still return a long value due to PHP's conversion.

## IP Range Checking

This demonstrates checking if an IP falls within a specific range.

ip_range_check.php
  

&lt;?php

declare(strict_types=1);

$ip = "192.168.1.100";
$start = "192.168.1.1";
$end = "192.168.1.254";

$long_ip = ip2long($ip);
$long_start = ip2long($start);
$long_end = ip2long($end);

if ($long_ip &gt;= $long_start &amp;&amp; $long_ip &lt;= $long_end) {
    echo "$ip is in range $start - $end";
} else {
    echo "$ip is NOT in range";
}

Converting IPs to longs allows numeric comparison of IP ranges.
This is more efficient than string-based range checking.

## IP Storage in Database

This example shows storing IP addresses as integers in a database.

ip_database_storage.php
  

&lt;?php

declare(strict_types=1);

$ip = "10.0.0.5";
$long_ip = ip2long($ip);

// Using PDO for database connection
$pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
$stmt = $pdo-&gt;prepare("INSERT INTO logs (ip_address) VALUES (?)");
$stmt-&gt;execute([$long_ip]);

echo "Stored IP: $ip as $long_ip";

Storing IPs as integers saves space and allows efficient range queries.
Remember to convert back using long2ip when retrieving.

## Network Address Calculation

This example calculates network addresses using bitwise operations.

network_calculation.php
  

&lt;?php

declare(strict_types=1);

$ip = "192.168.1.100";
$mask = "255.255.255.0";

$long_ip = ip2long($ip);
$long_mask = ip2long($mask);

$network = $long_ip &amp; $long_mask;
echo "Network address: " . long2ip($network);

This calculates the network address by ANDing the IP with the netmask.
Network calculations are essential for subnetting and routing.

## Best Practices

- **Validation:** Always validate IPs before conversion

- **Storage:** Consider unsigned integers for storage

- **IPv6:** Use other functions for IPv6 addresses

- **Endianness:** Be aware of platform byte order differences

- **Negative values:** Handle potential negative integers

## Source

[PHP ip2long Documentation](https://www.php.net/manual/en/function.ip2long.php)

This tutorial covered the PHP ip2long function with practical
examples for IP address manipulation, validation, and storage.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).