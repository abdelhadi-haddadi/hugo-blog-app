+++
title = "PHP getprotobynumber Function"
date = 2025-08-29T20:06:13.918+01:00
draft = false
description = "PHP getprotobynumber function tutorial shows how to look up protocol names by number in PHP. Learn getprotobynumber with practical examples for network programming."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP getprotobynumber Function

last modified April 4, 2025

The PHP getprotobynumber function looks up protocol names by number.
It's useful for network programming and protocol analysis.

## Basic Definition

getprotobynumber returns the protocol name associated with a number.
It checks the system's protocol database (/etc/protocols on Unix-like systems).

Syntax: getprotobynumber(int $number): string|false.
Returns protocol name or false if not found. Requires network support.

## Basic Protocol Lookup

This example demonstrates looking up a protocol name by its standard number.

basic_lookup.php
  

&lt;?php

declare(strict_types=1);

$protocolNumber = 6;
$protocolName = getprotobynumber($protocolNumber);

if ($protocolName !== false) {
    echo "Protocol number $protocolNumber is $protocolName";
} else {
    echo "Protocol number $protocolNumber not found";
}

This looks up protocol number 6, which is TCP. The function returns the name
if found in the system's protocol database.

## Checking Common Protocols

This example checks several common protocol numbers and displays their names.

common_protocols.php
  

&lt;?php

declare(strict_types=1);

$protocols = [
    1 =&gt; "ICMP",
    6 =&gt; "TCP",
    17 =&gt; "UDP",
    58 =&gt; "ICMPv6"
];

foreach ($protocols as $number =&gt; $expected) {
    $name = getprotobynumber($number);
    echo "$number: " . ($name === $expected ? "OK" : "Mismatch") . "\n";
}

This verifies standard protocol numbers against expected names. It's useful for
validating system protocol database contents.

## Handling Unknown Protocols

This example shows how to handle cases where a protocol number isn't recognized.

unknown_protocol.php
  

&lt;?php

declare(strict_types=1);

$unknownNumber = 255;
$protocolName = getprotobynumber($unknownNumber);

if ($protocolName === false) {
    echo "Protocol number $unknownNumber is unknown";
} else {
    echo "Protocol number $unknownNumber is $protocolName";
}

The function returns false for unknown protocol numbers. This example demonstrates
proper error handling for such cases.

## Protocol Analysis Function

This shows a complete function for analyzing protocol numbers in network data.

protocol_analyzer.php
  

&lt;?php

declare(strict_types=1);

function analyzeProtocol(int $number): string {
    $name = getprotobynumber($number);
    
    if ($name === false) {
        return "Unknown protocol ($number)";
    }
    
    return "$name ($number)";
}

echo analyzeProtocol(17); // UDP
echo "\n";
echo analyzeProtocol(99); // Unknown

This function provides a standardized way to display protocol information.
It handles both known and unknown protocol numbers gracefully.

## Building a Protocol Reference

This example builds a reference table of protocol numbers and names.

protocol_reference.php
  

&lt;?php

declare(strict_types=1);

$protocolNumbers = range(0, 30);
echo "Protocol Number Reference:\n";

foreach ($protocolNumbers as $number) {
    $name = getprotobynumber($number);
    echo sprintf("%3d: %s\n", $number, $name ?? "Not assigned");
}

This generates a reference table for protocol numbers 0 through 30.
It shows how to systematically examine protocol number assignments.

## Best Practices

- **Error Handling:** Always check for false return values

- **Caching:** Cache results if repeatedly looking up same numbers

- **Validation:** Validate protocol numbers before lookup

- **Documentation:** Refer to IANA protocol number assignments

## Source

[PHP getprotobynumber Documentation](https://www.php.net/manual/en/function.getprotobynumber.php)

This tutorial covered the PHP getprotobynumber function with practical
examples for protocol number lookups in network programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).