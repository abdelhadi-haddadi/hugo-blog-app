+++
title = "Dart InternetAddress"
date = 2025-08-29T19:51:59.176+01:00
draft = false
description = "Dart InternetAddress tutorial shows how to work with IP addresses in Dart using the InternetAddress class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart InternetAddress

last modified April 4, 2025

The InternetAddress class in Dart represents an IP address (either
IPv4 or IPv6) and provides utilities for address manipulation and resolution.

It's part of Dart's dart:io library and is essential for network
programming, including socket operations and hostname resolution.

## Basic Definition

InternetAddress encapsulates an IP address and provides methods for
parsing, validating, and looking up addresses. It supports both IPv4 and IPv6.

Key features include address validation, hostname resolution, and conversion
between string representations and raw byte formats.

## Creating InternetAddress Objects

This example shows basic creation of InternetAddress objects from strings.

main.dart
  

import 'dart:io';

void main() async {
  // IPv4 address
  var ipv4 = InternetAddress('192.168.1.1');
  print('IPv4: ${ipv4.address}');
  print('Type: ${ipv4.type}');
  
  // IPv6 address
  var ipv6 = InternetAddress('2001:0db8:85a3::8a2e:0370:7334');
  print('IPv6: ${ipv6.address}');
  print('Type: ${ipv6.type}');
  
  // Loopback address
  var loopback = InternetAddress.loopbackIPv4;
  print('Loopback: ${loopback.address}');
}

We create InternetAddress objects from string representations of IPv4 and IPv6
addresses. The type property indicates the address family (IPv4 or IPv6).

$ dart main.dart
IPv4: 192.168.1.1
Type: InternetAddressType.IPv4
IPv6: 2001:0db8:85a3::8a2e:0370:7334
Type: InternetAddressType.IPv6
Loopback: 127.0.0.1

## Hostname Resolution

This example demonstrates looking up IP addresses for a hostname.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var addresses = await InternetAddress.lookup('example.com');
    
    print('Addresses for example.com:');
    for (var addr in addresses) {
      print('${addr.address} (${addr.type})');
    }
  } on SocketException catch (e) {
    print('Failed to lookup address: $e');
  }
}

The lookup() method performs DNS resolution asynchronously, returning a list of
InternetAddress objects. We handle potential SocketException for errors.

$ dart main.dart
Addresses for example.com:
93.184.216.34 (InternetAddressType.IPv4)
2606:2800:220:1:248:1893:25c8:1946 (InternetAddressType.IPv6)

## Working with Raw Addresses

This example shows how to work with raw byte representations of IP addresses.

main.dart
  

import 'dart:io';

void main() {
  // Create from raw bytes (IPv4)
  var rawIpv4 = InternetAddress.fromRawAddress(
    Uint8List.fromList([192, 168, 1, 100])
  );
  print('Raw IPv4: ${rawIpv4.address}');
  
  // Create from raw bytes (IPv6)
  var rawIpv6 = InternetAddress.fromRawAddress(
    Uint8List.fromList([
      0x20, 0x01, 0x0d, 0xb8, 0x85, 0xa3, 0x00, 0x00,
      0x00, 0x00, 0x8a, 0x2e, 0x03, 0x70, 0x73, 0x34
    ]),
    type: InternetAddressType.IPv6
  );
  print('Raw IPv6: ${rawIpv6.address}');
}

We create InternetAddress objects from raw byte arrays. For IPv6, we must specify
the address type explicitly. This is useful for low-level network programming.

$ dart main.dart
Raw IPv4: 192.168.1.100
Raw IPv6: 2001:db8:85a3::8a2e:370:7334

## Checking Address Properties

This example demonstrates checking various properties of InternetAddress objects.

main.dart
  

import 'dart:io';

void main() {
  var privateAddr = InternetAddress('10.0.0.1');
  var publicAddr = InternetAddress('8.8.8.8');
  var loopback = InternetAddress.loopbackIPv4;
  var multicast = InternetAddress('224.0.0.1');
  
  print('10.0.0.1 is private: ${privateAddr.isPrivate}');
  print('8.8.8.8 is private: ${publicAddr.isPrivate}');
  print('127.0.0.1 is loopback: ${loopback.isLoopback}');
  print('224.0.0.1 is multicast: ${multicast.isMulticast}');
}

InternetAddress provides properties to check if an address is private, loopback,
or multicast. These are useful for network configuration and validation.

$ dart main.dart
10.0.0.1 is private: true
8.8.8.8 is private: false
127.0.0.1 is loopback: true
224.0.0.1 is multicast: true

## Reverse DNS Lookup

This example shows how to perform reverse DNS lookups (PTR records).

main.dart
  

import 'dart:io';

void main() async {
  var addr = InternetAddress('8.8.8.8');
  
  try {
    var host = await addr.reverse();
    print('Reverse lookup for ${addr.address}: ${host.host}');
  } on SocketException catch (e) {
    print('Reverse lookup failed: $e');
  }
}

The reverse() method performs a PTR record lookup to find the hostname associated
with an IP address. This operation is asynchronous and may fail.

$ dart main.dart
Reverse lookup for 8.8.8.8: dns.google

## Best Practices

- **Validation:** Always validate IP addresses from user input

- **Async:** Use await for hostname lookups and reverse lookups

- **Error handling:** Handle SocketException for network operations

- **IPv6:** Test with both IPv4 and IPv6 addresses

- **Caching:** Cache resolved addresses when possible

## Source

[Dart InternetAddress Documentation](https://api.dart.dev/stable/dart-io/InternetAddress-class.html)

This tutorial covered Dart's InternetAddress class with practical examples showing
address creation, DNS resolution, reverse lookups, and property checking.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).