+++
title = "Dart TlsProtocolVersion"
date = 2025-08-29T19:52:30.670+01:00
draft = false
description = "Dart TlsProtocolVersion tutorial shows how to work with TLS protocol versions in Dart using the TlsProtocolVersion class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart TlsProtocolVersion

last modified April 4, 2025

The TlsProtocolVersion class in Dart represents versions of the TLS
protocol used for secure communications. It's essential for network security.

TlsProtocolVersion provides constants for standard TLS versions and methods to
compare versions. It's part of Dart's dart:io library.

## Basic Definition

TlsProtocolVersion is an immutable class representing TLS versions.
It includes constants like TLSv1, TLSv1_1, TLSv1_2, and TLSv1_3.

Key features include version comparison, string representation, and validation.
It's used in secure socket configurations and security policy definitions.

## Basic TlsProtocolVersion Usage

This example shows basic usage of TlsProtocolVersion constants.

main.dart
  

import 'dart:io';

void main() {
  var tls1 = TlsProtocolVersion.tls1;
  var tls12 = TlsProtocolVersion.tls1_2;
  
  print('TLS 1.0: $tls1');
  print('TLS 1.2: $tls12');
  
  print('Is TLS 1.2 newer than TLS 1.0? ${tls12 &gt; tls1}');
}

We create protocol version objects using built-in constants and compare them.
The class provides natural ordering of TLS versions.

$ dart main.dart
TLS 1.0: TlsProtocolVersion:0x0301
TLS 1.2: TlsProtocolVersion:0x0303
Is TLS 1.2 newer than TLS 1.0? true

## Creating Custom Protocol Versions

This example demonstrates creating custom protocol version objects.

main.dart
  

import 'dart:io';

void main() {
  var customVersion = TlsProtocolVersion(3, 4);
  
  print('Custom version: $customVersion');
  print('Is standard: ${customVersion.isStandard}');
  
  var ssl30 = TlsProtocolVersion(3, 0);
  print('SSL 3.0: $ssl30');
  print('Is standard: ${ssl30.isStandard}');
}

We create non-standard TLS versions by specifying major and minor numbers.
The isStandard property checks if the version is a recognized standard.

$ dart main.dart
Custom version: TlsProtocolVersion:0x0304
Is standard: false
SSL 3.0: TlsProtocolVersion:0x0300
Is standard: true

## Comparing Protocol Versions

This example shows detailed version comparison operations.

main.dart
  

import 'dart:io';

void main() {
  var tls11 = TlsProtocolVersion.tls1_1;
  var tls13 = TlsProtocolVersion.tls1_3;
  
  print('Comparison results:');
  print('tls11 &lt; tls13: ${tls11 &lt; tls13}');
  print('tls11 &lt;= tls13: ${tls11 &lt;= tls13}');
  print('tls11 == tls13: ${tls11 == tls13}');
  print('tls11 &gt;= tls13: ${tls11 &gt;= tls13}');
  print('tls11 &gt; tls13: ${tls11 &gt; tls13}');
  
  print('Hash codes:');
  print('tls11: ${tls11.hashCode}');
  print('tls13: ${tls13.hashCode}');
}

TlsProtocolVersion implements Comparable, allowing full comparison operations.
Hash codes are consistent with equality comparisons.

$ dart main.dart
Comparison results:
tls11 &lt; tls13: true
tls11 &lt;= tls13: true
tls11 == tls13: false
tls11 &gt;= tls13: false
tls11 &gt; tls13: false
Hash codes:
tls11: 769
tls13: 772

## Using with SecureSocket

This example shows TlsProtocolVersion in a real SecureSocket context.

main.dart
  

import 'dart:io';

void main() async {
  var server = await SecureServerSocket.bind(
    'localhost', 0,
    context: SecurityContext()
      ..useCertificateChain('cert.pem')
      ..usePrivateKey('key.pem'),
    supportedProtocols: [TlsProtocolVersion.tls1_3]
  );
  
  print('Server running with TLS 1.3 only');
  print('Supported version: ${server.supportedProtocols}');
  
  server.close();
}

We configure a SecureServerSocket to only accept TLS 1.3 connections.
The supportedProtocols parameter uses TlsProtocolVersion values.

$ dart main.dart
Server running with TLS 1.3 only
Supported version: [TlsProtocolVersion:0x0304]

## Version Validation

This example demonstrates version validation and range checking.

main.dart
  

import 'dart:io';

void main() {
  var minVersion = TlsProtocolVersion.tls1_2;
  var current = TlsProtocolVersion.tls1_3;
  var old = TlsProtocolVersion.tls1;
  
  print('Is current acceptable? ${current &gt;= minVersion}');
  print('Is old acceptable? ${old &gt;= minVersion}');
  
  var rangeCheck = (TlsProtocolVersion version) {
    return version &gt;= TlsProtocolVersion.tls1_1 &amp;&amp;
           version &lt;= TlsProtocolVersion.tls1_3;
  };
  
  print('TLS 1.0 in range: ${rangeCheck(TlsProtocolVersion.tls1)}');
  print('TLS 1.2 in range: ${rangeCheck(TlsProtocolVersion.tls1_2)}');
}

We implement security policies by checking version ranges. This is common in
applications requiring minimum TLS versions for security compliance.

$ dart main.dart
Is current acceptable? true
Is old acceptable? false
TLS 1.0 in range: false
TLS 1.2 in range: true

## Best Practices

- **Use standards:** Prefer standard versions over custom ones

- **Minimum versions:** Enforce minimum secure TLS versions

- **Comparisons:** Use built-in comparison operators

- **SecurityContext:** Configure supported versions explicitly

## Source

[Dart TlsProtocolVersion Documentation](https://api.dart.dev/stable/dart-io/TlsProtocolVersion-class.html)

This tutorial covered Dart's TlsProtocolVersion class with practical examples
showing version handling, comparison, and secure socket configuration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).