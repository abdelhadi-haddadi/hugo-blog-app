+++
title = "Dart WebSocket"
date = 2025-08-29T19:52:32.868+01:00
draft = false
description = "Dart WebSocket tutorial shows how to implement real-time communication in Dart using the WebSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart WebSocket

last modified April 4, 2025

The WebSocket class in Dart provides full-duplex communication
channels over a single TCP connection. It enables real-time data exchange
between clients and servers.

WebSocket is ideal for applications requiring persistent connections like
chat apps, live updates, and multiplayer games. It's part of Dart's
dart:io and dart:html libraries.

## Basic Definition

WebSocket is a protocol providing full-duplex communication over
a single TCP connection. It establishes a persistent connection between client
and server.

Key features include event-driven communication, low latency, and efficient
data framing. It's supported by all modern browsers and many server platforms.

## Basic WebSocket Client

This example shows how to create a simple WebSocket client in Dart.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await WebSocket.connect('ws://echo.websocket.org');
    print('Connected to WebSocket server');
    
    socket.add('Hello from Dart!');
    
    socket.listen((message) {
      print('Received: $message');
      socket.close();
    });
  } catch (e) {
    print('Error: $e');
  }
}

We connect to a public WebSocket echo server, send a message, and listen for
responses. The connection is closed after receiving the echo response.

$ dart main.dart
Connected to WebSocket server
Received: Hello from Dart!

## WebSocket with Error Handling

This example demonstrates robust WebSocket usage with error handling.

main.dart
  

import 'dart:io';

void main() async {
  WebSocket socket;
  
  try {
    socket = await WebSocket.connect('ws://echo.websocket.org')
      ..listen(
        (data) =&gt; print('Message: $data'),
        onError: (err) =&gt; print('Error: $err'),
        onDone: () =&gt; print('Connection closed'),
      );
    
    socket.add('Ping');
    await Future.delayed(Duration(seconds: 1));
    socket.add('Ping 2');
    
    await Future.delayed(Duration(seconds: 1));
    await socket.close();
  } catch (e) {
    print('Connection error: $e');
    socket?.close();
  }
}

We establish a connection with comprehensive error handling. The example shows
multiple message exchanges and proper connection cleanup.

$ dart main.dart
Message: Ping
Message: Ping 2
Connection closed

## WebSocket Server

This example demonstrates creating a simple WebSocket server in Dart.

server.dart
  

import 'dart:io';

void main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('WebSocket server listening on ws://localhost:8080');
  
  await for (var request in server) {
    if (WebSocketTransformer.isUpgradeRequest(request)) {
      var socket = await WebSocketTransformer.upgrade(request);
      handleConnection(socket);
    } else {
      request.response.statusCode = HttpStatus.forbidden;
      request.response.close();
    }
  }
}

void handleConnection(WebSocket socket) {
  print('Client connected: ${socket.hashCode}');
  
  socket.listen(
    (message) {
      print('Received: $message');
      socket.add('Echo: $message');
    },
    onError: (error) =&gt; print('Error: $error'),
    onDone: () =&gt; print('Client disconnected'),
  );
}

We create a WebSocket server that echoes received messages back to clients.
The server handles multiple concurrent connections and properly manages errors.

$ dart server.dart
WebSocket server listening on ws://localhost:8080
Client connected: 123456
Received: Hello
Client disconnected

## Binary Data Transfer

This example shows how to send and receive binary data over WebSocket.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  var socket = await WebSocket.connect('ws://localhost:8080');
  
  // Send binary data
  var data = Uint8List.fromList([1, 2, 3, 4, 5]);
  socket.add(data);
  
  // Handle binary responses
  socket.listen((message) {
    if (message is Uint8List) {
      print('Received binary: ${message.toList()}');
    } else {
      print('Received text: $message');
    }
    socket.close();
  });
}

We demonstrate sending binary data as Uint8List and handling different message
types. WebSocket supports both text and binary data transmission.

$ dart main.dart
Received binary: [1, 2, 3, 4, 5]

## WebSocket with JSON

This example shows WebSocket communication using JSON for structured data.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var socket = await WebSocket.connect('ws://localhost:8080');
  
  // Send JSON data
  var message = {'type': 'greeting', 'content': 'Hello Server'};
  socket.add(jsonEncode(message));
  
  // Handle JSON responses
  socket.listen((data) {
    try {
      var response = jsonDecode(data);
      print('Received JSON: ${response['type']} - ${response['content']}');
    } catch (e) {
      print('Error parsing JSON: $e');
    }
    socket.close();
  });
}

We use JSON for structured communication between client and server. The example
shows encoding and decoding of complex data structures.

$ dart main.dart
Received JSON: response - Hello Client

## Best Practices

- **Error Handling:** Always implement comprehensive error handling

- **Connection Management:** Properly close connections when done

- **Ping/Pong:** Implement keep-alive for long-lived connections

- **Message Format:** Standardize message formats (JSON, Protobuf)

- **Backpressure:** Handle message flooding with proper buffering

## Source

[Dart WebSocket Documentation](https://api.dart.dev/stable/dart-io/WebSocket-class.html)

This tutorial covered Dart's WebSocket class with practical examples showing
client and server implementations, binary data transfer, and JSON messaging.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).