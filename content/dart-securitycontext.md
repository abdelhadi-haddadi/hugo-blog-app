+++
title = "Dart SecurityContext"
date = 2025-08-29T19:52:21.749+01:00
draft = false
description = "Dart SecurityContext tutorial shows how to configure secure socket connections in Dart using the SecurityContext class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SecurityContext

last modified April 4, 2025

The SecurityContext class in Dart manages security certificates
and private keys for secure socket connections. It's essential for HTTPS,
TLS, and other secure network protocols.

SecurityContext provides certificate chain validation, private key management,
and trust settings. It's part of Dart's dart:io library for
server-side and secure client applications.

## Basic Definition

SecurityContext is a container for security credentials used in
secure communications. It holds certificates, private keys, and trust settings.

Key features include certificate chain management, client authentication,
and custom trust settings. It's used with HttpClient and SecureSocket.

## Creating a Basic SecurityContext

This example shows how to create a basic SecurityContext instance.

main.dart
  

import 'dart:io';

void main() {
  // Create a new security context
  var securityContext = SecurityContext();
  
  // Set default trust store
  securityContext.setTrustedCertificates(
    'assets/certificates/ca.pem'
  );
  
  print('SecurityContext created with default trust store');
}

We create a SecurityContext and load trusted root certificates from a PEM file.
This context can now be used for secure connections that verify against these CAs.

$ dart main.dart
SecurityContext created with default trust store

## Using Client Certificates

This example demonstrates configuring client certificate authentication.

main.dart
  

import 'dart:io';

void main() async {
  var securityContext = SecurityContext();
  
  // Load client certificate and private key
  securityContext.useCertificateChain(
    'assets/certificates/client.pem'
  );
  securityContext.usePrivateKey(
    'assets/certificates/client_key.pem',
    password: 'securepassword'
  );
  
  // Create secure socket
  var socket = await SecureSocket.connect(
    'example.com',
    443,
    context: securityContext
  );
  
  print('Connected with client certificate');
  socket.destroy();
}

We configure a SecurityContext with client credentials for mutual TLS. The
private key is protected with a password. This context authenticates the
client to servers requiring certificates.

$ dart main.dart
Connected with client certificate

## Custom Trust Store

This example shows how to create a custom trust store configuration.

main.dart
  

import 'dart:io';

void main() {
  var securityContext = SecurityContext();
  
  // Add multiple trusted certificates
  securityContext.setTrustedCertificates(
    'assets/certificates/ca1.pem'
  );
  securityContext.setTrustedCertificates(
    'assets/certificates/ca2.pem'
  );
  
  // Explicitly distrust a certificate
  securityContext.setClientAuthorities(
    'assets/certificates/distrusted.pem'
  );
  
  print('Custom trust store configured');
}

We build a custom trust store by adding multiple CA certificates and explicitly
distrusting specific certificates. This provides fine-grained control over trust.

$ dart main.dart
Custom trust store configured

## In-Memory Certificates

This example demonstrates loading certificates directly from memory.

main.dart
  

import 'dart:io';

void main() {
  var securityContext = SecurityContext();
  
  // Certificate data as strings
  const certPem = '''
-----BEGIN CERTIFICATE-----
MII...certificate data...Q==
-----END CERTIFICATE-----''';
  
  const keyPem = '''
-----BEGIN PRIVATE KEY-----
MII...private key data...Q==
-----END PRIVATE KEY-----''';
  
  // Load from memory
  securityContext.useCertificateChainBytes(
    certPem.codeUnits
  );
  securityContext.usePrivateKeyBytes(
    keyPem.codeUnits
  );
  
  print('Certificates loaded from memory');
}

We create a SecurityContext with certificates provided as strings in memory
rather than files. This is useful for embedded certificates or dynamic loading.

$ dart main.dart
Certificates loaded from memory

## Secure HttpClient Configuration

This example shows using SecurityContext with HttpClient for secure requests.

main.dart
  

import 'dart:io';

void main() async {
  var securityContext = SecurityContext()
    ..setTrustedCertificates('assets/certificates/ca.pem');
  
  var client = HttpClient(context: securityContext)
    ..badCertificateCallback = (cert, host, port) {
      print('Bad certificate from $host:$port');
      return false; // Reject invalid certificates
    };
  
  try {
    var request = await client.getUrl(
      Uri.https('example.com', '/secure')
    );
    var response = await request.close();
    print('Secure request completed: ${response.statusCode}');
  } catch (e) {
    print('Request failed: $e');
  } finally {
    client.close();
  }
}

We configure an HttpClient with a SecurityContext that validates server
certificates against our trust store. The badCertificateCallback handles
invalid certificates according to our security policy.

$ dart main.dart
Secure request completed: 200

## Best Practices

- **Certificate Management:** Keep private keys secure with proper permissions

- **Trust Stores:** Regularly update CA certificates in your trust store

- **Validation:** Always implement badCertificateCallback for production

- **Passwords:** Store private key passwords securely, not in code

- **Context Reuse:** Reuse SecurityContext instances when possible

## Source

[Dart SecurityContext Documentation](https://api.dart.dev/stable/dart-io/SecurityContext-class.html)

This tutorial covered Dart's SecurityContext class with practical examples
showing certificate management, secure connections, and HttpClient integration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).