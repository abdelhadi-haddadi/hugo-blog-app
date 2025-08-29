+++
title = "Dart SecureServerSocket"
date = 2025-08-29T19:52:21.755+01:00
draft = false
description = "Dart SecureServerSocket tutorial shows how to create secure socket servers in Dart using the SecureServerSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SecureServerSocket

last modified April 4, 2025

The SecureServerSocket class in Dart provides secure network
communication using SSL/TLS protocols. It's essential for encrypted data
transfer in client-server applications.

SecureServerSocket creates encrypted socket servers that authenticate clients
and protect data integrity. It's part of Dart's dart:io library.

## Basic Definition

SecureServerSocket is a server socket that provides secure
communication over SSL/TLS. It requires security context configuration.

Key features include encryption, certificate management, and secure connection
handling. It extends ServerSocket with security capabilities.

## Basic SecureServerSocket Usage

This example shows basic secure socket server creation.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await SecureServerSocket.bind(
    'localhost', 4040, context);
  
  print('Secure server listening on port 4040');
  
  await for (var socket in server) {
    socket.write('Secure hello!');
    await socket.close();
  }
}

We create a security context with certificate files, then bind a secure server.
The server accepts connections and sends a secure message to each client.

$ dart main.dart
Secure server listening on port 4040

## Handling Client Connections

This example demonstrates secure client connection handling.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await SecureServerSocket.bind(
    'localhost', 4040, context);
  
  await for (var socket in server) {
    socket.transform(utf8.decoder).listen((data) {
      print('Received: $data');
      socket.write('Secure echo: $data');
    });
  }
}

The server echoes back received data securely. We use transformers for
stream handling. Each connection is automatically encrypted.

$ dart main.dart
Received: Test message

## Client Authentication

This example shows server-side client certificate verification.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem')
    ..setClientAuthorities('ca.pem');
  
  var server = await SecureServerSocket.bind(
    'localhost', 4040, context,
    requestClientCertificate: true);
  
  await for (var socket in server) {
    var cert = socket.peerCertificate;
    if (cert == null) {
      print('Client failed authentication');
      await socket.close();
      continue;
    }
    print('Client authenticated: ${cert.subject}');
    socket.write('Welcome authenticated client!');
  }
}

The server requires client certificates for authentication. We check the peer
certificate before processing the connection. This provides mutual authentication.

$ dart main.dart
Client authenticated: CN=Client1

## Custom Security Parameters

This example demonstrates custom SSL/TLS protocol configuration.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem')
    ..setAlpnProtocols(['h2', 'http/1.1'], true);
  
  var server = await SecureServerSocket.bind(
    'localhost', 4040, context,
    supportedProtocols: ['TLSv1.3']);
  
  print('Server using TLS 1.3 with ALPN support');
  
  await for (var socket in server) {
    print('Negotiated protocol: ${socket.selectedProtocol}');
    socket.write('Secure connection established');
  }
}

We configure ALPN protocols and restrict to TLS 1.3. The server reports the
negotiated protocol for each connection. This enables modern security features.

$ dart main.dart
Server using TLS 1.3 with ALPN support
Negotiated protocol: h2

## Secure Web Server

This example creates a basic secure HTTP server.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await SecureServerSocket.bind(
    'localhost', 4433, context);
  
  await for (var socket in server) {
    socket.write('HTTP/1.1 200 OK\r\n'
      'Content-Type: text/plain\r\n'
      '\r\n'
      'Secure Hello from Dart!');
    await socket.close();
  }
}

The server responds to HTTPS requests with a simple message. Note the proper
HTTP headers and response format. This demonstrates secure web communication.

$ dart main.dart
(Server running, accessible via https://localhost:4433)

## Best Practices

- **Certificate Management:** Use valid certificates from trusted CAs

- **Protocol Selection:** Prefer TLS 1.2 or higher for security

- **Error Handling:** Implement proper error handling for connection issues

- **Resource Cleanup:** Always close sockets and servers properly

- **Configuration:** Regularly update security context settings

## Source

[Dart SecureServerSocket Documentation](https://api.dart.dev/stable/dart-io/SecureServerSocket-class.html)

This tutorial covered Dart's SecureServerSocket class with practical examples
showing secure communication, authentication, and modern protocol configuration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).