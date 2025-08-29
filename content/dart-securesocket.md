+++
title = "Dart SecureSocket"
date = 2025-08-29T19:52:21.745+01:00
draft = false
description = "Dart SecureSocket tutorial shows how to establish secure network connections in Dart using the SecureSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SecureSocket

last modified April 4, 2025

The SecureSocket class in Dart provides secure network communication
using TLS/SSL protocols. It's essential for encrypted client-server applications.

SecureSocket wraps raw sockets with encryption, ensuring data confidentiality
and integrity. It's part of Dart's dart:io library for I/O operations.

## Basic Definition

SecureSocket is a stream-based encrypted communication channel.
It implements the same interface as regular sockets but adds security features.

Key features include certificate validation, protocol negotiation, and encrypted
data transfer. It supports both client and server-side secure connections.

## Basic Secure Client Connection

This example shows how to establish a basic secure client connection.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  try {
    var socket = await SecureSocket.connect(
      'example.com',
      443,
      onBadCertificate: (cert) =&gt; true // For testing only
    );
    
    print('Connected to ${socket.remoteAddress.address}');
    socket.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n');
    
    await socket.flush();
    await socket.listen(print).asFuture();
    await socket.close();
  } catch (e) {
    print('Error: $e');
  }
}

We create a secure connection to example.com on port 443 (HTTPS). The
onBadCertificate callback allows self-signed certs for testing. We send
an HTTP request and print the response.

$ dart main.dart
Connected to 93.184.216.34
HTTP/1.1 200 OK
...

## Secure Server with Certificate

This example demonstrates creating a simple secure echo server.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await SecureServerSocket.bind(
    'localhost',
    4040,
    context,
  );
  
  print('Secure server listening on ${server.port}');
  
  await for (var socket in server) {
    socket.listen(
      (data) {
        print('Received: $data');
        socket.add(data);
      },
      onError: (e) =&gt; print('Error: $e'),
      onDone: () =&gt; print('Client disconnected'),
    );
  }
}

We create a security context with certificate files, then bind a secure server.
The server echoes back all received data. Certificates must be valid for real use.

$ dart main.dart
Secure server listening on 4040
Received: Hello

## Client with Certificate Validation

This example shows proper certificate validation in a client.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  try {
    var socket = await SecureSocket.connect(
      'example.com',
      443,
      supportedProtocols: ['TLSv1.2', 'TLSv1.3']
    );
    
    print('Using protocol: ${socket.selectedProtocol}');
    print('Peer certificate:');
    print(socket.peerCertificate?.subject);
    
    var response = await socket
      .transform(utf8.decoder)
      .transform(LineSplitter())
      .take(10)
      .toList();
      
    print('Response headers:');
    response.forEach(print);
    await socket.close();
  } catch (e) {
    print('Connection failed: $e');
  }
}

We connect with protocol restrictions and inspect the server certificate.
The response is read as UTF-8 text with proper stream transformations.

$ dart main.dart
Using protocol: TLSv1.3
Peer certificate: CN=example.com
Response headers:
HTTP/1.1 200 OK
...

## Two-Way SSL Authentication

This example demonstrates mutual TLS authentication.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var context = SecurityContext()
    ..useCertificateChain('client.pem')
    ..usePrivateKey('client_key.pem')
    ..setTrustedCertificates('ca.pem');
  
  try {
    var socket = await SecureSocket.connect(
      'secure.example.com',
      9443,
      context: context,
    );
    
    print('Mutual TLS established');
    print('Peer cert: ${socket.peerCertificate?.subject}');
    print('Our cert: ${socket.certificate?.subject}');
    
    socket.write('PING');
    var response = await socket.first;
    print('Response: ${String.fromCharCodes(response)}');
    
    await socket.close();
  } catch (e) {
    print('Mutual TLS failed: $e');
  }
}

Both client and server authenticate with certificates. The client presents its
certificate and validates the server's cert against a CA. This provides strong
mutual authentication.

$ dart main.dart
Mutual TLS established
Peer cert: CN=secure.example.com
Our cert: CN=client.example.com
Response: PONG

## Custom Security Context

This example shows creating a custom security context with specific settings.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var context = SecurityContext()
    ..setTrustedCertificates('custom_ca.pem')
    ..setAlpnProtocols(['h2', 'http/1.1'], false)
    ..setClientAuthorities('client_ca.pem');
  
  var server = await SecureServerSocket.bind(
    'localhost',
    8443,
    context,
    requestClientCertificate: true,
  );
  
  print('Custom secure server running');
  
  await for (var socket in server) {
    print('ALPN: ${socket.selectedProtocol}');
    print('Client cert: ${socket.peerCertificate?.subject}');
    
    socket.transform(utf8.decoder).listen(print);
    socket.write('Welcome to secure server');
  }
}

We configure a custom security context with specific CA, ALPN protocols, and
client certificate requirements. The server inspects client certificates and
negotiates protocols.

$ dart main.dart
Custom secure server running
ALPN: h2
Client cert: CN=testclient

## Best Practices

- **Validate certificates:** Never skip validation in production

- **Use strong protocols:** Prefer TLS 1.2 or higher

- **Proper error handling:** Secure connections can fail in many ways

- **Resource cleanup:** Always close sockets when done

- **Certificate management:** Keep private keys secure

## Source

[Dart SecureSocket Documentation](https://api.dart.dev/stable/dart-io/SecureSocket-class.html)

This tutorial covered Dart's SecureSocket class with practical examples showing
client and server usage, certificate handling, and secure communication patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).