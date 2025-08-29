+++
title = "Dart RawSecureSocket"
date = 2025-08-29T19:52:15.934+01:00
draft = false
description = "Dart RawSecureSocket tutorial shows how to establish secure socket connections in Dart using the RawSecureSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawSecureSocket

last modified April 4, 2025

The RawSecureSocket class in Dart provides secure socket
communication using SSL/TLS protocols. It's essential for encrypted network
communication in client-server applications.

RawSecureSocket extends RawSocket with security features like encryption,
certificate validation, and secure handshakes. It's part of Dart's
dart:io library for non-web applications.

## Basic Definition

RawSecureSocket is a low-level interface for secure socket
communication. It handles SSL/TLS encryption while providing raw byte access.

Key features include secure connection establishment, certificate management,
and encrypted data transfer. It works with both client and server sockets.

## Basic Secure Client Connection

This example shows how to establish a basic secure client connection.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  try {
    var socket = await RawSecureSocket.connect('example.com', 443);
    print('Connected to ${socket.address.address}:${socket.port}');
    
    socket.writeEventsEnabled = true;
    socket.write(Uint8List.fromList('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n'.codeUnits));
    
    socket.listen((event) {
      if (event == RawSocketEvent.read) {
        print(String.fromCharCodes(socket.read()));
      }
    });
  } catch (e) {
    print('Connection failed: $e');
  }
}

We connect to example.com on port 443 (HTTPS). After connection, we send an
HTTP request and listen for responses. The socket handles all encryption
automatically.

$ dart main.dart
Connected to 93.184.216.34:443
HTTP/1.1 200 OK
...

## Server Certificate Verification

This example demonstrates custom certificate verification.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var context = SecurityContext.defaultContext;
  context.setTrustedCertificates('path/to/cert.pem');
  
  try {
    var socket = await RawSecureSocket.connect(
      'example.com',
      443,
      context: context,
      onBadCertificate: (cert) {
        print('Bad certificate: ${cert.subject}');
        return false; // Reject invalid certificates
      }
    );
    
    print('Connected with verified certificate');
    socket.close();
  } catch (e) {
    print('Connection failed: $e');
  }
}

We create a SecurityContext with custom trusted certificates. The
onBadCertificate callback allows handling certificate validation errors.
This is crucial for security-sensitive applications.

$ dart main.dart
Connected with verified certificate

## Secure Server Implementation

This example shows a basic secure server implementation.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var context = SecurityContext()
    ..useCertificateChain('server.crt')
    ..usePrivateKey('server.key');
  
  var server = await SecureServerSocket.bind(
    'localhost',
    8443,
    context,
    backlog: 5
  );
  
  print('Secure server listening on ${server.address.address}:${server.port}');
  
  server.listen((client) {
    client.write('Hello secure client!\n');
    client.close();
  });
}

We create a secure server using certificate and private key files. The server
listens for incoming connections and responds with a simple message. All
communication is automatically encrypted.

$ dart main.dart
Secure server listening on 127.0.0.1:8443

## Client Authentication

This example demonstrates mutual TLS authentication.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var serverContext = SecurityContext()
    ..useCertificateChain('server.crt')
    ..usePrivateKey('server.key')
    ..setClientAuthorities('ca.crt')
    ..requestClientCertificate(true);
  
  var server = await SecureServerSocket.bind(
    'localhost',
    8443,
    serverContext
  );
  
  server.listen((client) {
    var cert = client.peerCertificate;
    if (cert != null) {
      print('Client authenticated: ${cert.subject}');
    }
    client.close();
  });
  
  // Client with certificate
  var clientContext = SecurityContext()
    ..useCertificateChain('client.crt')
    ..usePrivateKey('client.key')
    ..setTrustedCertificates('ca.crt');
  
  var socket = await RawSecureSocket.connect(
    'localhost',
    8443,
    context: clientContext
  );
  
  socket.close();
  server.close();
}

The server requires client certificates for authentication. The client provides
its certificate during the handshake. This implements mutual TLS authentication.

$ dart main.dart
Client authenticated: CN=client

## Handling Secure Socket Events

This example shows comprehensive event handling.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var socket = await RawSecureSocket.connect('example.com', 443);
  
  socket.listen((event) {
    switch (event) {
      case RawSocketEvent.read:
        var data = socket.read();
        print('Received: ${data?.length} bytes');
        break;
      case RawSocketEvent.write:
        print('Ready to write');
        break;
      case RawSocketEvent.readClosed:
        print('Read closed');
        break;
      case RawSocketEvent.closed:
        print('Connection closed');
        break;
    }
  }, onError: (e) {
    print('Error: $e');
  }, onDone: () {
    print('Done');
  });
  
  socket.writeEventsEnabled = true;
  socket.write(Uint8List.fromList('PING'.codeUnits));
  
  await Future.delayed(Duration(seconds: 2));
  socket.close();
}

We handle various socket events including data reception, write readiness,
and connection closure. The event-based API allows efficient handling of
asynchronous socket operations.

$ dart main.dart
Ready to write
Received: 142 bytes
Connection closed
Done

## Best Practices

- **Certificate validation:** Always verify server certificates

- **Context reuse:** Reuse SecurityContext for multiple connections

- **Error handling:** Handle all socket events and errors

- **Resource cleanup:** Always close sockets when done

- **Protocol selection:** Configure supported protocols carefully

## Source

[Dart RawSecureSocket Documentation](https://api.dart.dev/stable/dart-io/RawSecureSocket-class.html)

This tutorial covered Dart's RawSecureSocket class with practical examples
showing secure communication, certificate handling, and event management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).