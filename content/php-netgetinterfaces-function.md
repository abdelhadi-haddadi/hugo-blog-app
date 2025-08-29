+++
title = "PHP net_get_interfaces Function"
date = 2025-08-29T20:06:19.428+01:00
draft = false
description = "PHP net_get_interfaces function tutorial shows how to get network interface information in PHP. Learn net_get_interfaces with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP net_get_interfaces Function

last modified April 4, 2025

The PHP net_get_interfaces function retrieves network interface
information. It provides details about all network interfaces on the system.

## Basic Definition

net_get_interfaces returns an associative array of network
interfaces. Each interface contains details like IP addresses and MAC.

Syntax: net_get_interfaces(): array|false. Returns array on
success, false on failure. Available since PHP 7.3.

## Basic Interface Listing

This example shows how to get and display all network interfaces.

basic_interfaces.php
  

&lt;?php

declare(strict_types=1);

$interfaces = net_get_interfaces();

if ($interfaces === false) {
    echo "Failed to get network interfaces";
    exit(1);
}

print_r($interfaces);

This code retrieves all network interfaces and prints their details.
The output includes interface names, IP addresses, and MAC addresses.

## Checking Specific Interface

This demonstrates how to check if a specific network interface exists.

check_interface.php
  

&lt;?php

declare(strict_types=1);

$interfaces = net_get_interfaces();
$target = "eth0";

if (isset($interfaces[$target])) {
    echo "Interface $target exists";
    print_r($interfaces[$target]);
} else {
    echo "Interface $target not found";
}

This checks for the existence of 'eth0' interface. If found, it displays
the interface details including IP configuration and status.

## Listing IP Addresses

This example extracts and lists all IPv4 addresses from all interfaces.

list_ips.php
  

&lt;?php

declare(strict_types=1);

$interfaces = net_get_interfaces();

foreach ($interfaces as $name =&gt; $details) {
    if (isset($details['unicast'])) {
        foreach ($details['unicast'] as $addr) {
            if ($addr['family'] == 2) { // AF_INET
                echo "$name: {$addr['address']}\n";
            }
        }
    }
}

This loops through all interfaces and their unicast addresses. It filters
for IPv4 addresses (family 2) and prints them with interface names.

## Checking Interface Status

This shows how to check if a network interface is up and running.

interface_status.php
  

&lt;?php

declare(strict_types=1);

$interfaces = net_get_interfaces();
$target = "wlan0";

if (isset($interfaces[$target])) {
    $status = $interfaces[$target]['up'] ? "up" : "down";
    echo "Interface $target is $status";
} else {
    echo "Interface $target not found";
}

This checks the 'up' status of the 'wlan0' interface. The 'up' field
indicates whether the interface is currently active and operational.

## Getting MAC Addresses

This example demonstrates how to retrieve MAC addresses of all interfaces.

mac_addresses.php
  

&lt;?php

declare(strict_types=1);

$interfaces = net_get_interfaces();

foreach ($interfaces as $name =&gt; $details) {
    if (isset($details['mac'])) {
        echo "$name: {$details['mac']}\n";
    } else {
        echo "$name: No MAC address\n";
    }
}

This lists all interfaces with their MAC addresses. Some interfaces like
loopback may not have MAC addresses. The output shows each interface's
hardware address.

## Best Practices

- **Error Handling:** Always check for false return value

- **Permission:** Ensure script has proper permissions

- **Caching:** Cache results for repeated use

- **Security:** Be cautious with sensitive network info

## Source

[PHP net_get_interfaces Documentation](https://www.php.net/manual/en/function.net-get-interfaces.php)

This tutorial covered the PHP net_get_interfaces function with
practical examples for network interface information retrieval.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).