+++
title = "Dart InternetAddressType"
date = 2025-08-29T19:51:59.169+01:00
draft = false
description = "Dart InternetAddressType tutorial shows how to work with different IP address types in Dart using the InternetAddressType class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart InternetAddressType

last modified April 4, 2025

The InternetAddressType class in Dart is an enumeration that
represents different types of IP addresses. It's used with the
InternetAddress class to specify address families.

This enum is essential for network programming in Dart, helping distinguish
between IPv4 and IPv6 addresses. It's part of Dart's dart:io
library for server-side applications.

## Basic Definition

InternetAddressType is an enum with two values:
IPv4 and IPv6. These represent the two
main IP address versions used in networking.

The type helps determine address formatting, parsing, and network
operations. It's often used when creating or inspecting network
connections in Dart.

## Checking Address Type

This example shows how to check the type of an InternetAddress.

main.dart
  

import 'dart:io';

void main() {
  var ipv4 = InternetAddress('192.168.1.1');
  var ipv6 = InternetAddress('2001:0db8:85a3::8a2e:0370:7334');
  
  print('IPv4 type: ${ipv4.type}'); // InternetAddressType.IPv4
  print('IPv6 type: ${ipv6.type}'); // InternetAddressType.IPv6
  
  if (ipv4.type == InternetAddressType.IPv4) {
    print('This is an IPv4 address');
  }
}

We create both IPv4 and IPv6 addresses and check their types using
the type property. The type property returns an InternetAddressType
value.

$ dart main.dart
IPv4 type: InternetAddressType.IPv4
IPv6 type: InternetAddressType.IPv6
This is an IPv4 address

## Creating Specific Address Types

This example demonstrates creating addresses with specific types.

main.dart
  

import 'dart:io';

void main() {
  var ipv4 = InternetAddress('127.0.0.1', type: InternetAddressType.IPv4);
  var ipv6 = InternetAddress('::1', type: InternetAddressType.IPv6);
  
  try {
    // This will throw an exception
    var invalid = InternetAddress('192.168.1.1', type: InternetAddressType.IPv6);
  } on ArgumentError catch (e) {
    print('Error: $e');
  }
}

We explicitly specify address types when creating addresses. If the
address doesn't match the specified type, an ArgumentError is thrown.

$ dart main.dart
Error: Invalid argument(s): Invalid IPv6 address: 192.168.1.1

## Looking Up Address Types

This example shows checking address types during hostname lookup.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var addresses = await InternetAddress.lookup('example.com');
  
  for (var addr in addresses) {
    print('Address: ${addr.address}');
    print('Type: ${addr.type}');
    print('Is IPv6: ${addr.type == InternetAddressType.IPv6}');
    print('---');
  }
}

We perform a DNS lookup and examine the types of returned addresses.
A hostname can resolve to both IPv4 and IPv6 addresses.

$ dart main.dart
Address: 93.184.216.34
Type: InternetAddressType.IPv4
Is IPv6: false
---
Address: 2606:2800:220:1:248:1893:25c8:1946
Type: InternetAddressType.IPv6
Is IPv6: true
---

## Filtering by Address Type

This example demonstrates filtering addresses by their type.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var addresses = await InternetAddress.lookup('google.com');
  
  var ipv4Addrs = addresses.where(
    (addr) =&gt; addr.type == InternetAddressType.IPv4
  );
  
  var ipv6Addrs = addresses.where(
    (addr) =&gt; addr.type == InternetAddressType.IPv6
  );
  
  print('IPv4 addresses:');
  ipv4Addrs.forEach((addr) =&gt; print(addr.address));
  
  print('\nIPv6 addresses:');
  ipv6Addrs.forEach((addr) =&gt; print(addr.address));
}

We look up addresses for google.com and separate them by type using
the where method. This is useful when you need to handle different
address types separately.

$ dart main.dart
IPv4 addresses:
142.250.190.46

IPv6 addresses:
2607:f8b0:4009:80e::200e

## Server Socket with Specific Type

This example shows creating a server socket with a specific address type.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var ipv6Loopback = InternetAddress('::1', type: InternetAddressType.IPv6);
  
  var server = await ServerSocket.bind(
    ipv6Loopback,
    8080,
  );
  
  print('Server listening on IPv6: ${server.address.address}');
  
  server.listen((Socket socket) {
    socket.write('Hello from IPv6 server!');
    socket.close();
  });
}

We create a server socket that only listens on the IPv6 loopback address.
The InternetAddressType ensures we're working with the correct address
version.

$ dart main.dart
Server listening on IPv6: ::1

## Best Practices

- **Explicit types:** Specify address types when creating addresses

- **Type checking:** Always verify address types in network code

- **Dual-stack:** Support both IPv4 and IPv6 when possible

- **Error handling:** Handle type mismatches gracefully

## Source

[Dart InternetAddressType Documentation](https://api.dart.dev/stable/dart-io/InternetAddressType-class.html)

This tutorial covered Dart's InternetAddressType class with practical examples
showing type checking, address creation, DNS lookups, and server sockets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).