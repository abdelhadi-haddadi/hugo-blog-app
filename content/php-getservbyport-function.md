+++
title = "PHP getservbyport Function"
date = 2025-08-29T20:06:13.895+01:00
draft = false
description = "PHP getservbyport function tutorial shows how to look up network services by port number in PHP. Learn getservbyport with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP getservbyport Function

last modified April 4, 2025

The PHP getservbyport function looks up network services by port
number and protocol. It helps identify services running on specific ports.

## Basic Definition

getservbyport returns the Internet service associated with a port
and protocol. It checks the system's services database (usually /etc/services).

Syntax: getservbyport(int $port, string $protocol): string|false.
Returns service name or false if not found. Requires network functions support.

## Basic Port Lookup

This example demonstrates looking up common network services by their port numbers.

basic_lookup.php
  

&lt;?php

declare(strict_types=1);

$service = getservbyport(80, "tcp");
echo "Port 80: " . ($service ?: "Unknown service");

This checks port 80 with TCP protocol, typically used for HTTP. The function
returns "www" or "http" on most systems if the service is registered.

## Checking Multiple Ports

This example checks multiple well-known ports to demonstrate different services.

multi_port_check.php
  

&lt;?php

declare(strict_types=1);

$ports = [21, 22, 25, 53, 80, 443];
foreach ($ports as $port) {
    $service = getservbyport($port, "tcp");
    echo "Port $port: " . ($service ?: "Unknown") . "\n";
}

This checks common ports like FTP (21), SSH (22), SMTP (25), DNS (53), and
HTTPS (443). Results depend on the system's services configuration.

## Protocol Comparison

This example shows how protocol affects service lookup for the same port number.

protocol_comparison.php
  

&lt;?php

declare(strict_types=1);

$port = 53;
$tcp_service = getservbyport($port, "tcp");
$udp_service = getservbyport($port, "udp");

echo "TCP: " . ($tcp_service ?: "None") . "\n";
echo "UDP: " . ($udp_service ?: "None") . "\n";

Some services use both TCP and UDP (like DNS on port 53), while others are
protocol-specific. This demonstrates checking both protocols for comparison.

## Service Validation Function

This creates a function to validate if a port is associated with a known service.

service_validator.php
  

&lt;?php

declare(strict_types=1);

function isKnownService(int $port, string $protocol): bool {
    return (bool) getservbyport($port, $protocol);
}

$port = 3306;
echo isKnownService($port, "tcp") ? "Known" : "Unknown";

This function checks if a port/protocol combination has a registered service.
MySQL typically uses port 3306, which may or may not be in services file.

## Building a Port Scanner

This example shows how to use getservbyport in a simple port scanning utility.

port_scanner.php
  

&lt;?php

declare(strict_types=1);

function scanPorts(array $ports, string $protocol = "tcp"): array {
    $results = [];
    foreach ($ports as $port) {
        $service = getservbyport($port, $protocol);
        $results[$port] = $service ?: "Unknown";
    }
    return $results;
}

$common_ports = [20, 21, 22, 23, 25, 53, 80, 110, 143, 443];
print_r(scanPorts($common_ports));

This scans multiple ports and returns their associated services. Note this only
checks the services database, not actual network connections or open ports.

## Best Practices

- **Error Handling:** Always check for false return values

- **Protocol Specificity:** Be explicit about TCP/UDP protocol

- **Port Ranges:** Remember valid ports are 0-65535

- **System Differences:** Results vary by OS/services file

## Source

[PHP getservbyport Documentation](https://www.php.net/manual/en/function.getservbyport.php)

This tutorial covered the PHP getservbyport function with practical
examples for network service lookup by port number and protocol.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).