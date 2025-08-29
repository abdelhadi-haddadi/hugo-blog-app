+++
title = "PHP inet_ntop Function"
date = 2025-08-29T20:06:17.225+01:00
draft = false
description = "PHP inet_ntop function tutorial shows how to convert packed binary IP addresses to human-readable strings. Learn inet_ntop with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP inet_ntop Function

last modified April 4, 2025

The PHP inet_ntop function converts a packed binary IP address
to a human-readable string format. It works with both IPv4 and IPv6.

## Basic Definition

inet_ntop translates a binary IP address to standard notation.
It's the reverse of inet_pton which converts strings to binary.

Syntax: inet_ntop(string $ip): string|false. Returns the address
as a string or false on failure. Requires PHP 5.1.0 or later.

## Convert IPv4 Address

This example demonstrates converting a packed IPv4 address to dotted notation.

ipv4_conversion.php
  

&lt;?php

declare(strict_types=1);

$packed = inet_pton("192.168.1.1");
$result = inet_ntop($packed);

echo "Packed: " . bin2hex($packed) . "\n";
echo "Unpacked: $result\n";

First we pack the IP string to binary with inet_pton, then
convert it back. The bin2hex shows the binary representation.

## Convert IPv6 Address

This example shows converting a packed IPv6 address to its string format.

ipv6_conversion.php
  

&lt;?php

declare(strict_types=1);

$packed = inet_pton("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
$result = inet_ntop($packed);

echo "Packed: " . bin2hex($packed) . "\n";
echo "Unpacked: $result\n";

IPv6 addresses are 128-bit compared to IPv4's 32-bit. The function handles
both formats automatically based on input length.

## Error Handling

This example demonstrates proper error handling when using inet_ntop.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$invalid = "\x7f\x00\x00\x01\x00"; // Invalid length

$result = inet_ntop($invalid);
if ($result === false) {
    echo "Invalid packed IP address\n";
} else {
    echo "Converted: $result\n";
}

The function returns false for invalid input. Always check the return value
to handle potential conversion failures gracefully.

## Working with Database Storage

This example shows how to work with IP addresses stored in binary format.

database_storage.php
  

&lt;?php

declare(strict_types=1);

// Simulate IP from database (BINARY/VARBINARY column)
$db_ip = hex2bin("c0a80101"); // 192.168.1.1

$human_ip = inet_ntop($db_ip);
echo "Database IP: " . bin2hex($db_ip) . "\n";
echo "Human-readable: $human_ip\n";

Databases often store IPs in binary for efficiency. inet_ntop
converts them back to readable format when retrieved.

## Network Address Conversion

This example demonstrates converting network addresses between formats.

network_conversion.php
  

&lt;?php

declare(strict_types=1);

$network = hex2bin("ac100000"); // 172.16.0.0/12
$mask = hex2bin("fff00000");   // 255.240.0.0

$network_str = inet_ntop($network);
$mask_str = inet_ntop($mask);

echo "Network: $network_str\n";
echo "Mask: $mask_str\n";

Network addresses are often manipulated in binary form. This shows how to
convert them to readable format for display or logging purposes.

## Best Practices

- **Validation:** Always validate input before conversion

- **Error Handling:** Check for false return values

- **Storage:** Use binary format for database storage

- **IPv6:** Test with both IPv4 and IPv6 addresses

## Source

[PHP inet_ntop Documentation](https://www.php.net/manual/en/function.inet-ntop.php)

This tutorial covered the PHP inet_ntop function with practical
examples for IP address conversion between binary and string formats.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).