+++
title = "PHP getservbyname Function"
date = 2025-08-29T20:06:13.910+01:00
draft = false
description = "PHP getservbyname function tutorial shows how to look up service ports in PHP. Learn getservbyname with practical examples for network programming and service discovery."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP getservbyname Function

last modified April 4, 2025

The PHP getservbyname function looks up port numbers for network
services. It translates service names to their corresponding port numbers.

## Basic Definition

getservbyname returns the port number associated with an Internet
service and protocol. It checks the system's services database (/etc/services).

Syntax: getservbyname(string $service, string $protocol): int|false.
Returns port number on success, false on failure. Common protocols: tcp, udp.

## Looking Up HTTP Port

This example demonstrates how to find the standard port for HTTP service.

http_port.php
  

&lt;?php

declare(strict_types=1);

$http_port = getservbyname('http', 'tcp');
if ($http_port !== false) {
    echo "HTTP service runs on port: $http_port";
} else {
    echo "HTTP service not found";
}

This checks the standard port for HTTP over TCP. The expected result is 80.
The function returns false if the service isn't found in the system database.

## Checking FTP Port

This example shows how to verify the standard FTP control port number.

ftp_port.php
  

&lt;?php

declare(strict_types=1);

$ftp_port = getservbyname('ftp', 'tcp');
if ($ftp_port !== false) {
    echo "FTP control port is: $ftp_port";
} else {
    echo "FTP service not found";
}

FTP typically uses port 21 for control connections. This verifies that standard
configuration. The protocol must match the service's actual transport protocol.

## Looking Up Multiple Services

This example checks ports for several common services in one operation.

multi_service.php
  

&lt;?php

declare(strict_types=1);

$services = [
    ['ssh', 'tcp'],
    ['smtp', 'tcp'],
    ['domain', 'udp']
];

foreach ($services as $service) {
    $port = getservbyname($service[0], $service[1]);
    echo "{$service[0]} ({$service[1]}): " . ($port ?: 'Not found') . "\n";
}

This demonstrates checking multiple services with different protocols. SSH uses
TCP port 22, SMTP TCP port 25, and DNS (domain) uses UDP port 53 typically.

## Validating Custom Service Port

This example shows how to verify if a custom service exists in the system.

custom_service.php
  

&lt;?php

declare(strict_types=1);

$service = 'myapp';
$protocol = 'tcp';

$port = getservbyname($service, $protocol);
if ($port !== false) {
    echo "$service runs on port $port";
} else {
    echo "$service is not a registered service";
}

This checks if 'myapp' is registered in the system services database. For this
to work, the service must be defined in /etc/services or equivalent system file.

## Building a Service Port Lookup Tool

This example creates a simple command-line tool for service port lookup.

port_lookup.php
  

&lt;?php

declare(strict_types=1);

if ($argc != 3) {
    echo "Usage: php port_lookup.php &lt;service&gt; &lt;protocol&gt;\n";
    exit(1);
}

$service = $argv[1];
$protocol = $argv[2];

$port = getservbyname($service, $protocol);
if ($port !== false) {
    echo "$service/$protocol: port $port\n";
} else {
    echo "Service $service with protocol $protocol not found\n";
}

This script accepts service name and protocol as command-line arguments. It
provides a practical way to query service ports from the terminal or scripts.

## Best Practices

- **Error Handling:** Always check for false return value

- **Protocol Matching:** Use correct protocol (tcp/udp)

- **Case Sensitivity:** Service names are case-sensitive

- **System Differences:** Results may vary between systems

## Source

[PHP getservbyname Documentation](https://www.php.net/manual/en/function.getservbyname.php)

This tutorial covered the PHP getservbyname function with practical
examples for network service port lookup in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).