+++
title = "Dart RawSecureServerSocket"
date = 2025-08-29T19:52:14.786+01:00
draft = false
description = "Dart RawSecureServerSocket tutorial shows how to create secure socket servers in Dart using the RawSecureServerSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawSecureServerSocket

last modified April 4, 2025

The RawSecureServerSocket class in Dart provides a secure server
socket implementation using TLS/SSL. It's part of Dart's dart:io
library for secure network communication.

RawSecureServerSocket enables encrypted communication between server and clients.
It handles the TLS handshake and encryption/decryption of data automatically.

## Basic Definition

RawSecureServerSocket is a server-side socket that uses TLS/SSL for
secure communication. It listens for incoming client connections on a specified
port.

Key features include certificate management, encryption, and platform-independent
secure communication. It's the secure counterpart to RawServerSocket.

## Basic Secure Server

This example shows a basic secure server that listens for connections.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await RawSecureServerSocket.bind(
    'localhost', 8080, context);
  
  print('Secure server listening on port 8080');
  
  server.listen((client) {
    print('Client connected: ${client.remoteAddress}');
    client.writeEventsEnabled = true;
    client.write('Hello secure client!\n'.codeUnits);
    client.close();
  });
}

We create a SecurityContext with certificate files, then bind the server socket.
The server listens for connections and sends a greeting to each client.

$ dart main.dart
Secure server listening on port 8080

## Handling Client Data

This example demonstrates reading data from secure client connections.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await RawSecureServerSocket.bind(
    'localhost', 8080, context);
  
  server.listen((client) {
    client.listen(
      (data) {
        var message = String.fromCharCodes(data);
        print('Received: $message');
        client.write('Echo: $message'.codeUnits);
      },
      onDone: () =&gt; client.close()
    );
  });
}

The server echoes back any data received from clients. Each client connection
gets its own data stream that we can listen to for incoming messages.

$ dart main.dart
Received: Hello server

## Client Authentication

This example shows how to require client certificate authentication.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('server.pem')
    ..usePrivateKey('server_key.pem')
    ..setTrustedCertificates('client_ca.pem')
    ..requireClientCertificate();
  
  var server = await RawSecureServerSocket.bind(
    'localhost', 8080, context);
  
  server.listen((client) {
    print('Client certificate: ${client.peerCertificate}');
    client.write('Authenticated!\n'.codeUnits);
    client.close();
  });
}

We configure the server to require client certificates by calling
requireClientCertificate. The server can then access the client's
certificate through peerCertificate.

$ dart main.dart
Client certificate: [Certificate details...]

## Handling Multiple Clients

This example demonstrates handling multiple concurrent client connections.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await RawSecureServerSocket.bind(
    'localhost', 8080, context);
  
  var clientCount = 0;
  
  server.listen((client) {
    var id = ++clientCount;
    print('Client $id connected');
    
    client.listen(
      (data) {
        print('Client $id: ${String.fromCharCodes(data)}');
      },
      onDone: () {
        print('Client $id disconnected');
        client.close();
      }
    );
  });
}

The server tracks each client with a unique ID and handles their connections
independently. This pattern is useful for chat servers or multiplayer games.

$ dart main.dart
Client 1 connected
Client 1: Hello
Client 1 disconnected

## Custom Protocol Implementation

This example shows implementing a custom protocol over secure sockets.

main.dart
  

import 'dart:io';

class SecureProtocolServer {
  final RawSecureServerSocket server;
  
  SecureProtocolServer(this.server) {
    server.listen(_handleClient);
  }
  
  void _handleClient(RawSecureSocket client) {
    var buffer = &lt;int&gt;[];
    
    client.listen(
      (data) {
        buffer.addAll(data);
        
        // Check for complete message (ends with newline)
        if (buffer.contains(10)) {
          var message = String.fromCharCodes(buffer);
          print('Received: $message');
          
          // Process message and respond
          var response = 'Processed: ${message.trim()}';
          client.write(response.codeUnits);
          
          buffer.clear();
        }
      },
      onDone: () =&gt; client.close()
    );
  }
}

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('cert.pem')
    ..usePrivateKey('key.pem');
  
  var server = await RawSecureServerSocket.bind(
    'localhost', 8080, context);
  
  SecureProtocolServer(server);
  print('Custom protocol server running');
}

We implement a simple protocol where messages end with newline characters.
The server buffers data until a complete message is received, then processes it.

$ dart main.dart
Custom protocol server running
Received: Test message

## Best Practices

- **Certificate Management:** Keep private keys secure

- **Error Handling:** Handle socket errors gracefully

- **Resource Cleanup:** Always close sockets when done

- **Protocol Design:** Design clear message boundaries

- **Performance:** Use buffers for high-throughput servers

## Source

[Dart RawSecureServerSocket Documentation](https://api.dart.dev/stable/dart-io/RawSecureServerSocket-class.html)

This tutorial covered Dart's RawSecureServerSocket class with practical examples
showing secure communication, client authentication, and protocol implementation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).