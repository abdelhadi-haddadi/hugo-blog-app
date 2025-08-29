+++
title = "Dart NetworkInterface"
date = 2025-08-29T19:52:09.191+01:00
draft = false
description = "Dart NetworkInterface tutorial shows how to manage network interfaces in Dart using the NetworkInterface class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart NetworkInterface

last modified April 4, 2025

The NetworkInterface class in Dart provides access to network
interface information. It allows querying available network interfaces
and their addresses.

NetworkInterface is part of Dart's dart:io library. It's useful
for network programming, server configuration, and network diagnostics.

## Basic Definition

NetworkInterface represents a network interface available on
the host system. Each interface has a name and list of associated addresses.

Key properties include interface name, address list, and address type
(IPv4 or IPv6). The class provides static methods to list all interfaces.

## Listing All Network Interfaces

This example shows how to list all available network interfaces.

main.dart
  

import 'dart:io';

void main() async {
  try {
    List&lt;NetworkInterface&gt; interfaces = 
        await NetworkInterface.list();
    
    for (var interface in interfaces) {
      print('Interface: ${interface.name}');
      for (var addr in interface.addresses) {
        print('  ${addr.address} (${addr.type.name})');
      }
    }
  } catch (e) {
    print('Error: $e');
  }
}

We use NetworkInterface.list() to get all interfaces. This returns a Future
that we await. For each interface, we print its name and associated addresses.

$ dart main.dart
Interface: eth0
  192.168.1.100 (IPv4)
  fe80::a00:27ff:fe4a:1234 (IPv6)
Interface: lo
  127.0.0.1 (IPv4)
  ::1 (IPv6)

## Filtering by Interface Type

This example demonstrates filtering interfaces by address type.

main.dart
  

import 'dart:io';

void main() async {
  var interfaces = await NetworkInterface.list(
    includeLoopback: false,
    type: InternetAddressType.IPv4
  );
  
  print('Non-loopback IPv4 interfaces:');
  for (var interface in interfaces) {
    print('${interface.name}:');
    interface.addresses.forEach(print);
  }
}

We filter interfaces to exclude loopback and only show IPv4 addresses. The
list method accepts parameters to customize the returned interface
list.

$ dart main.dart
Non-loopback IPv4 interfaces:
eth0:
192.168.1.100
wlan0:
10.0.0.15

## Checking for Specific Address

This example checks if a specific IP address exists on any interface.

main.dart
  

import 'dart:io';

void main() async {
  const targetIp = '192.168.1.100';
  bool found = false;
  
  var interfaces = await NetworkInterface.list();
  
  for (var interface in interfaces) {
    for (var addr in interface.addresses) {
      if (addr.address == targetIp) {
        found = true;
        print('$targetIp found on ${interface.name}');
        break;
      }
    }
    if (found) break;
  }
  
  if (!found) {
    print('$targetIp not found on any interface');
  }
}

We search all interfaces for a specific IP address. This is useful for verifying
network configuration or checking interface assignments programmatically.

$ dart main.dart
192.168.1.100 found on eth0

## Getting Interface by Name

This example shows how to get details for a specific interface by name.

main.dart
  

import 'dart:io';

void main() async {
  const interfaceName = 'eth0';
  
  var interfaces = await NetworkInterface.list();
  var targetInterface = interfaces.firstWhere(
    (i) =&gt; i.name == interfaceName,
    orElse: () =&gt; null
  );
  
  if (targetInterface != null) {
    print('Details for $interfaceName:');
    print('Addresses:');
    targetInterface.addresses.forEach(print);
  } else {
    print('Interface $interfaceName not found');
  }
}

We find an interface by its name and display its addresses. The firstWhere
method helps locate the specific interface from the complete list.

$ dart main.dart
Details for eth0:
Addresses:
192.168.1.100
fe80::a00:27ff:fe4a:1234

## Monitoring Interface Changes

This example demonstrates monitoring for network interface changes.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  print('Initial interfaces:');
  var initial = await NetworkInterface.list();
  printInterfaces(initial);
  
  print('\nMonitoring for changes (Ctrl+C to stop)...');
  
  Timer.periodic(Duration(seconds: 5), (timer) async {
    var current = await NetworkInterface.list();
    if (interfacesChanged(initial, current)) {
      print('\nInterface change detected:');
      printInterfaces(current);
      initial = current;
    }
  });
}

bool interfacesChanged(List&lt;NetworkInterface&gt; a, List&lt;NetworkInterface&gt; b) {
  if (a.length != b.length) return true;
  
  for (int i = 0; i &lt; a.length; i++) {
    if (a[i].name != b[i].name || 
        a[i].addresses.length != b[i].addresses.length) {
      return true;
    }
  }
  return false;
}

void printInterfaces(List&lt;NetworkInterface&gt; interfaces) {
  for (var interface in interfaces) {
    print('${interface.name}:');
    interface.addresses.forEach((addr) =&gt; print('  ${addr.address}'));
  }
}

We periodically check for interface changes by comparing current state with
initial state. This can detect network configuration changes at runtime.

$ dart main.dart
Initial interfaces:
eth0:
  192.168.1.100
lo:
  127.0.0.1

Monitoring for changes (Ctrl+C to stop)...

Interface change detected:
eth0:
  192.168.1.100
wlan0:
  10.0.0.15
lo:
  127.0.0.1

## Best Practices

- **Error handling:** Always handle potential exceptions

- **Async/await:** Use async/await for cleaner code

- **Filtering:** Filter results when possible for efficiency

- **IPv6 support:** Consider IPv6 addresses in modern apps

- **Platform differences:** Be aware of platform-specific behaviors

## Source

[Dart NetworkInterface Documentation](https://api.dart.dev/stable/dart-io/NetworkInterface-class.html)

This tutorial covered Dart's NetworkInterface class with practical examples
showing interface listing, filtering, monitoring, and address management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).