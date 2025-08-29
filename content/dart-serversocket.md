+++
title = "Dart ServerSocket"
date = 2025-08-29T19:52:22.860+01:00
draft = false
description = "Dart ServerSocket tutorial shows how to create network servers in Dart using the ServerSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ServerSocket

last modified April 4, 2025

The ServerSocket class in Dart provides TCP server functionality.
It listens for incoming client connections on a specified port and IP address.

ServerSocket is part of Dart's dart:io library for server-side
programming. It enables building network servers that handle multiple clients.

## Basic Definition

ServerSocket represents a listening TCP socket that accepts
incoming connections. Each connection creates a Socket object.

Key features include asynchronous operation, address binding, and connection
management. It's the foundation for network servers in Dart applications.

## Basic Echo Server

This example creates a simple echo server that sends back received messages.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4040);
  print('Echo server listening on ${server.address}:${server.port}');

  await for (var socket in server) {
    socket.listen(
      (data) {
        print('Received: ${String.fromCharCodes(data)}');
        socket.add(data); // Echo back
      },
      onDone: () =&gt; print('Client disconnected'),
    );
  }
}

We bind to localhost port 4040 and process each client connection asynchronously.
The server echoes back any received data and logs client disconnections.

$ dart main.dart
Echo server listening on 127.0.0.1:4040
Received: Hello
Client disconnected

## Handling Multiple Clients

This example demonstrates a server handling multiple concurrent clients.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('0.0.0.0', 4041);
  print('Multi-client server running on port ${server.port}');

  var clientCount = 0;
  
  await for (var socket in server) {
    clientCount++;
    print('Client $clientCount connected from ${socket.remoteAddress}');
    
    socket.listen(
      (data) =&gt; handleClientData(socket, data),
      onDone: () =&gt; print('Client $clientCount disconnected'),
    );
  }
}

void handleClientData(Socket socket, List&lt;int&gt; data) {
  var message = String.fromCharCodes(data).trim();
  print('Received: $message');
  socket.write('Echo: $message\n');
}

The server tracks connected clients and processes their messages independently.
Each client connection is handled in its own asynchronous execution context.

$ dart main.dart
Multi-client server running on port 4041
Client 1 connected from 127.0.0.1:54321
Received: Test message
Client 1 disconnected

## Broadcast Server

This example shows a server that broadcasts messages to all connected clients.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4042);
  print('Broadcast server started on port ${server.port}');

  var clients = &lt;Socket&gt;[];
  
  server.listen((socket) {
    clients.add(socket);
    print('New client connected (${clients.length} total)');
    
    socket.listen(
      (data) =&gt; broadcast(clients, data),
      onDone: () {
        clients.remove(socket);
        print('Client disconnected (${clients.length} remaining)');
      },
    );
  });

  // Broadcast periodic messages
  Timer.periodic(Duration(seconds: 5), (_) {
    if (clients.isNotEmpty) {
      broadcast(clients, 'Server time: ${DateTime.now()}\n'.codeUnits);
    }
  });
}

void broadcast(List&lt;Socket&gt; clients, List&lt;int&gt; message) {
  for (var client in clients) {
    client.add(message);
  }
}

The server maintains a list of connected clients and broadcasts messages to all.
It also sends periodic time updates and manages client disconnections.

$ dart main.dart
Broadcast server started on port 4042
New client connected (1 total)
Client disconnected (0 remaining)

## Secure Server with SSL

This example demonstrates creating a secure server with SSL/TLS encryption.

main.dart
  

import 'dart:io';

void main() async {
  var context = SecurityContext()
    ..useCertificateChain('certificate.pem')
    ..usePrivateKey('key.pem');
  
  var server = await SecureServerSocket.bind(
    '0.0.0.0', 
    4043,
    context,
  );
  
  print('Secure server listening on port ${server.port}');
  
  await for (var socket in server) {
    socket.listen(
      (data) {
        var message = String.fromCharCodes(data);
        print('Secure message: $message');
        socket.write('SECURE: $message');
      },
      onDone: () =&gt; print('Secure client disconnected'),
    );
  }
}

We create a secure context with certificate files and bind a secure socket.
The server handles encrypted communications while maintaining the same API.

$ dart main.dart
Secure server listening on port 4043
Secure message: Test
Secure client disconnected

## Connection Limits and Timeouts

This example shows how to implement connection limits and timeouts.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4044);
  print('Managed server started with connection limits');
  
  var activeConnections = 0;
  const maxConnections = 3;
  
  await for (var socket in server) {
    if (activeConnections &gt;= maxConnections) {
      socket.write('Server busy. Try again later.\n');
      socket.close();
      continue;
    }
    
    activeConnections++;
    print('New connection ($activeConnections/$maxConnections)');
    
    // Set timeout
    var timer = Timer(Duration(seconds: 30), () {
      socket.write('Connection timeout\n');
      socket.close();
    });
    
    socket.listen(
      (data) {
        timer.cancel(); // Reset timeout on activity
        timer = Timer(Duration(seconds: 30), () =&gt; socket.close());
        socket.add(data);
      },
      onDone: () {
        timer.cancel();
        activeConnections--;
        print('Connection closed ($activeConnections/$maxConnections)');
      },
    );
  }
}

The server enforces a maximum connection limit and implements idle timeouts.
Each connection gets 30 seconds of inactivity before being automatically closed.

$ dart main.dart
Managed server started with connection limits
New connection (1/3)
Connection closed (0/3)

## Best Practices

- **Error Handling:** Always handle connection and I/O errors

- **Resource Management:** Close sockets properly when done

- **Concurrency:** Consider isolates for CPU-intensive tasks

- **Security:** Use SSL/TLS for sensitive communications

- **Logging:** Implement proper logging for debugging

## Source

[Dart ServerSocket Documentation](https://api.dart.dev/stable/dart-io/ServerSocket-class.html)

This tutorial covered Dart's ServerSocket class with practical examples showing
basic servers, secure connections, and advanced connection management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).