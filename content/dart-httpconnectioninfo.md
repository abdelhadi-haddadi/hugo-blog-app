+++
title = "Dart HttpConnectionInfo"
date = 2025-08-29T19:51:55.839+01:00
draft = false
description = "Dart HttpConnectionInfo tutorial shows how to access HTTP connection information in Dart server applications."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpConnectionInfo

last modified April 4, 2025

The HttpConnectionInfo class in Dart provides information about
HTTP server connections. It's available in server-side Dart applications.

This class exposes details like remote and local addresses, port numbers,
and whether the connection is secure. It's part of Dart's dart:io
library.

## Basic Definition

HttpConnectionInfo is an interface that describes an HTTP connection.
It's typically obtained from an HttpRequest object.

Key properties include remote and local socket addresses, port numbers,
and security status. This information is useful for logging and security.

## Basic HttpConnectionInfo Usage

This example shows how to access basic connection information.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  print('Server running on ${server.port}');
  
  await for (var request in server) {
    var connInfo = request.connectionInfo;
    print('Remote address: ${connInfo.remoteAddress.address}');
    print('Remote port: ${connInfo.remotePort}');
    request.response.write('Hello from server!');
    await request.response.close();
  }
}

We create an HTTP server and access connection info for each request.
The remoteAddress and remotePort properties show client connection details.

$ dart main.dart
Server running on 8080
Remote address: ::1
Remote port: 54321

## Checking Secure Connections

This example demonstrates checking if a connection is secure.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  await for (var request in server) {
    var connInfo = request.connectionInfo;
    var secure = connInfo.secure ? 'SECURE' : 'NOT SECURE';
    
    request.response.write('''
      Connection Info:
      - Secure: $secure
      - Protocol: ${connInfo.protocol}
      - Local Address: ${connInfo.localAddress.address}
    ''');
    
    await request.response.close();
  }
}

We check the secure property to determine if the connection uses HTTPS.
The protocol property shows the transport protocol being used.

$ dart main.dart
Connection Info:
- Secure: NOT SECURE
- Protocol: null
- Local Address: ::1

## Logging Connection Details

This example shows how to log comprehensive connection information.

main.dart
  

import 'dart:io';

void logConnection(HttpConnectionInfo info) {
  print('''
  New Connection:
  - Remote: ${info.remoteAddress.address}:${info.remotePort}
  - Local: ${info.localAddress.address}:${info.localPort}
  - Secure: ${info.secure}
  - Protocol: ${info.protocol ?? 'HTTP'}
  ''');
}

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  await for (var request in server) {
    logConnection(request.connectionInfo);
    request.response.write('Logged your connection!');
    await request.response.close();
  }
}

We create a dedicated logging function for connection information.
This pattern is useful for monitoring and debugging server applications.

$ dart main.dart
New Connection:
- Remote: ::1:54321
- Local: ::1:8080
- Secure: false
- Protocol: HTTP

## Handling Multiple Connections

This example shows tracking multiple connections with unique IDs.

main.dart
  

import 'dart:io';
import 'dart:math';

final random = Random();

String generateConnectionId(HttpConnectionInfo info) {
  return '${info.remoteAddress.address}-${info.remotePort}-${random.nextInt(1000)}';
}

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  var connections = &lt;String, int&gt;{};
  
  await for (var request in server) {
    var id = generateConnectionId(request.connectionInfo);
    connections[id] = (connections[id] ?? 0) + 1;
    
    request.response.write('''
      Connection ID: $id
      Visit count: ${connections[id]}
      Total connections: ${connections.length}
    ''');
    
    await request.response.close();
  }
}

We generate unique IDs for each connection using address, port and random number.
This allows tracking individual client interactions with the server.

$ dart main.dart
Connection ID: ::1-54321-42
Visit count: 1
Total connections: 1

## Secure Server Example

This example demonstrates HttpConnectionInfo with a secure HTTPS server.

main.dart
  

import 'dart:io';
import 'dart:async';

Future&lt;SecurityContext&gt; getSecurityContext() async {
  var context = SecurityContext();
  // In production, use real certificates
  context.useCertificateChain('path/to/cert.pem');
  context.usePrivateKey('path/to/key.pem');
  return context;
}

void main() async {
  var context = await getSecurityContext();
  var server = await HttpServer.bindSecure(
    'localhost', 
    443, 
    context,
  );
  
  await for (var request in server) {
    var connInfo = request.connectionInfo;
    request.response.write('''
      Secure Connection Info:
      - Protocol: ${connInfo.protocol}
      - Cipher: ${connInfo.cipherName}
      - Bits: ${connInfo.cipherBits}
    ''');
    await request.response.close();
  }
}

With a secure server, HttpConnectionInfo provides additional TLS details.
The protocol, cipherName and cipherBits properties show encryption information.

$ dart main.dart
Secure Connection Info:
- Protocol: TLSv1.3
- Cipher: AES_256_GCM
- Bits: 256

## Best Practices

- **Logging:** Record connection info for security audits

- **Validation:** Check remote addresses for access control

- **Performance:** Access connectionInfo sparingly

- **Security:** Prefer secure connections when possible

## Source

[Dart HttpConnectionInfo Documentation](https://api.dart.dev/stable/dart-io/HttpConnectionInfo-class.html)

This tutorial covered Dart's HttpConnectionInfo class with practical examples
showing how to access and utilize HTTP connection information in server apps.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).