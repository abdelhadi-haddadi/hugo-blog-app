+++
title = "Dart WebSocketTransformer"
date = 2025-08-29T19:52:33.977+01:00
draft = false
description = "Dart WebSocketTransformer tutorial shows how to handle WebSocket connections in Dart using the WebSocketTransformer class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart WebSocketTransformer

last modified April 4, 2025

The WebSocketTransformer class in Dart provides functionality to
upgrade HTTP connections to WebSocket connections. It's part of Dart's
dart:io library for server-side applications.

WebSocketTransformer handles the WebSocket handshake protocol and manages the
connection upgrade process. It transforms HTTP requests into WebSocket
connections when the client supports it.

## Basic Definition

WebSocketTransformer is a utility class that upgrades HTTP
connections to WebSocket connections. It implements the WebSocket protocol
handshake and connection management.

Key features include protocol negotiation, connection upgrading, and message
stream transformation. It works with both server and client WebSocket
connections.

## Basic WebSocket Server

This example shows a basic WebSocket server using WebSocketTransformer.

server.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('Server running on ${server.address}:${server.port}');

  await for (var request in server) {
    if (WebSocketTransformer.isUpgradeRequest(request)) {
      var socket = await WebSocketTransformer.upgrade(request);
      socket.add('Hello from server!');
      
      socket.listen((message) {
        print('Received: $message');
        socket.add('Echo: $message');
      });
    } else {
      request.response
        ..statusCode = HttpStatus.badRequest
        ..write('WebSocket upgrade required')
        ..close();
    }
  }
}

We create an HTTP server that upgrades WebSocket requests. The transformer
handles the protocol upgrade automatically. After upgrade, we can send and
receive messages.

$ dart server.dart
Server running on InternetAddress('127.0.0.1', IPv4):8080

## Handling Multiple Connections

This example demonstrates handling multiple WebSocket connections.

server.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  final server = await HttpServer.bind('localhost', 8080);
  var clients = &lt;WebSocket&gt;[];

  await for (var request in server) {
    if (WebSocketTransformer.isUpgradeRequest(request)) {
      var socket = await WebSocketTransformer.upgrade(request);
      clients.add(socket);
      print('New client connected (${clients.length} total)');

      socket.listen((message) {
        print('Broadcasting: $message');
        for (var client in clients) {
          if (client != socket) {
            client.add('Client says: $message');
          }
        }
      }, onDone: () {
        clients.remove(socket);
        print('Client disconnected (${clients.length} remaining)');
      });
    } else {
      request.response
        ..statusCode = HttpStatus.badRequest
        ..write('WebSocket upgrade required')
        ..close();
    }
  }
}

We maintain a list of connected clients and broadcast messages to all except
the sender. The onDone callback handles client disconnections cleanly.

$ dart server.dart
New client connected (1 total)
New client connected (2 total)
Broadcasting: Hello from client 1
Client disconnected (1 remaining)

## Custom Protocol Negotiation

This example shows custom protocol negotiation during WebSocket upgrade.

server.dart
  

import 'dart:io';

void main() async {
  final server = await HttpServer.bind('localhost', 8080);

  await for (var request in server) {
    if (WebSocketTransformer.isUpgradeRequest(request)) {
      var protocols = request.headers['sec-websocket-protocol'];
      
      if (protocols != null &amp;&amp; protocols.any((p) =&gt; p == 'chat-v1')) {
        var socket = await WebSocketTransformer.upgrade(
          request,
          protocol: 'chat-v1'
        );
        socket.add('Protocol chat-v1 accepted');
      } else {
        request.response
          ..statusCode = HttpStatus.badRequest
          ..write('chat-v1 protocol required')
          ..close();
      }
    } else {
      request.response
        ..statusCode = HttpStatus.badRequest
        ..write('WebSocket upgrade required')
        ..close();
    }
  }
}

We check for a specific protocol ('chat-v1') during the upgrade process.
If the protocol isn't supported, we reject the connection. This enables
protocol versioning.

$ dart server.dart

## Error Handling

This example demonstrates proper error handling in WebSocket connections.

server.dart
  

import 'dart:io';

void main() async {
  try {
    final server = await HttpServer.bind('localhost', 8080);
    print('Server started');

    await for (var request in server) {
      try {
        if (WebSocketTransformer.isUpgradeRequest(request)) {
          var socket = await WebSocketTransformer.upgrade(request);
          
          socket.handleError((error) {
            print('WebSocket error: $error');
            socket.close();
          });

          socket.listen((message) {
            if (message is! String) {
              throw FormatException('Only text messages supported');
            }
            print('Received: $message');
          }, onDone: () =&gt; print('Connection closed'));
        } else {
          request.response
            ..statusCode = HttpStatus.badRequest
            ..write('WebSocket upgrade required')
            ..close();
        }
      } catch (e) {
        print('Request handling error: $e');
        request.response
          ..statusCode = HttpStatus.internalServerError
          ..close();
      }
    }
  } catch (e) {
    print('Server error: $e');
  }
}

We implement multiple layers of error handling: server startup, request
processing, and WebSocket communication. This makes the server more robust.

$ dart server.dart
Server started
Received: Hello
WebSocket error: FormatException: Only text messages supported
Connection closed

## Client-Side WebSocket

This example shows a WebSocket client connecting to our server.

client.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await WebSocket.connect('ws://localhost:8080');
    print('Connected to server');
    
    socket.listen(
      (message) =&gt; print('Server says: $message'),
      onError: (error) =&gt; print('Error: $error'),
      onDone: () =&gt; print('Disconnected from server')
    );

    // Send messages every second
    var counter = 0;
    Timer.periodic(Duration(seconds: 1), (_) {
      socket.add('Message ${++counter}');
    });
  } catch (e) {
    print('Connection failed: $e');
  }
}

The client connects to our WebSocket server and listens for messages.
It sends periodic messages to demonstrate two-way communication.

$ dart client.dart
Connected to server
Server says: Hello from server!
Server says: Echo: Message 1
Server says: Echo: Message 2
Disconnected from server

## Best Practices

- **Protocols:** Always negotiate and validate protocols

- **Errors:** Implement comprehensive error handling

- **Resources:** Clean up resources on disconnect

- **Messages:** Validate message types and content

- **Security:** Implement authentication if needed

## Source

[Dart WebSocketTransformer Documentation](https://api.dart.dev/stable/dart-io/WebSocketTransformer-class.html)

This tutorial covered Dart's WebSocketTransformer class with practical examples
showing server implementation, client communication, and best practices for
WebSocket applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).