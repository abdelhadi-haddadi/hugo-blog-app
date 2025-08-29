+++
title = "PHP inet_pton Function"
date = 2025-08-29T20:06:18.335+01:00
draft = false
description = "PHP inet_pton function tutorial shows how to convert human-readable IP addresses to packed binary strings. Learn inet_pton with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP inet_pton Function

last modified April 4, 2025

The PHP inet_pton function converts human-readable IP addresses
to packed binary strings. It's essential for network programming and storage.

## Basic Definition

inet_pton converts IPv4 and IPv6 addresses from text to binary.
It stands for "internet presentation to network" format conversion.

Syntax: inet_pton(string $ip): string|false.
Returns binary string on success, false on invalid input. Works with both
IP versions.

## Convert IPv4 Address

This example demonstrates converting a standard IPv4 address to binary.

ipv4_conversion.php
  

&lt;?php

declare(strict_types=1);

$ip = "192.168.1.1";
$binary = inet_pton($ip);

if ($binary !== false) {
    echo "Binary representation: " . bin2hex($binary);
} else {
    echo "Invalid IP address";
}

The function converts "192.168.1.1" to a 4-byte binary string. We use
bin2hex to display the binary in readable hexadecimal format.

## Convert IPv6 Address

This shows how to convert an IPv6 address to its binary representation.

ipv6_conversion.php
  

&lt;?php

declare(strict_types=1);

$ip = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
$binary = inet_pton($ip);

if ($binary !== false) {
    echo "Binary representation: " . bin2hex($binary);
} else {
    echo "Invalid IP address";
}

IPv6 addresses convert to 16-byte binary strings. The example shows a
valid IPv6 address in compressed format being converted.

## Validate IP Address

This example uses inet_pton to validate both IPv4 and IPv6.

ip_validation.php
  

&lt;?php

declare(strict_types=1);

function isValidIP($ip) {
    return inet_pton($ip) !== false;
}

$testIPs = ["192.168.1.1", "256.0.0.1", "2001:db8::1", "invalid"];

foreach ($testIPs as $ip) {
    $valid = isValidIP($ip) ? "valid" : "invalid";
    echo "$ip is $valid\n";
}

The function checks if inet_pton returns non-false. This
validates both IP versions without needing separate checks.

## Compare IP Addresses

This demonstrates comparing IP addresses after converting to binary.

ip_comparison.php
  

&lt;?php

declare(strict_types=1);

$ip1 = "192.168.001.001";
$ip2 = "192.168.1.1";

$bin1 = inet_pton($ip1);
$bin2 = inet_pton($ip2);

if ($bin1 &amp;&amp; $bin2) {
    echo $bin1 === $bin2 ? "Same IP" : "Different IPs";
} else {
    echo "Invalid IP(s) provided";
}

Binary comparison handles different textual representations of the same IP.
Leading zeros and formatting differences don't affect the comparison.

## Store IP in Database

This example shows storing IP addresses efficiently in binary format.

ip_storage.php
  

&lt;?php

declare(strict_types=1);

$ip = "203.0.113.45";
$binaryIP = inet_pton($ip);

if ($binaryIP !== false) {
    // Store in database as BINARY(16) for both IPv4 and IPv6
    $pdo = new PDO("mysql:host=localhost;dbname=test", "user", "pass");
    $stmt = $pdo-&gt;prepare("INSERT INTO logs (ip) VALUES (?)");
    $stmt-&gt;execute([$binaryIP]);
    echo "IP stored successfully";
}

Storing IPs in binary format saves space and allows for efficient comparison.
The same column can store both IPv4 and IPv6 addresses.

## Best Practices

- **Validation:** Always check for false return value

- **Storage:** Use binary columns for IP storage in databases

- **Comparison:** Compare binary representations for accuracy

- **Display:** Use inet_ntop to convert back for display

## Source

[PHP inet_pton Documentation](https://www.php.net/manual/en/function.inet-pton.php)

This tutorial covered the PHP inet_pton function with practical
examples for IP address conversion, validation, and storage.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).