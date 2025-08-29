+++
title = "Dart Socket"
date = 2025-08-29T19:52:23.976+01:00
draft = false
description = "Dart Socket tutorial shows how to perform network programming in Dart using the Socket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Socket

last modified April 4, 2025

The Socket class in Dart provides TCP network communication
functionality. It's part of the dart:io library and enables
both client and server network operations.

Sockets support bidirectional communication between endpoints. They can
transfer raw bytes or text data over TCP/IP networks with various events.

## Basic Definition

A Socket represents a TCP network connection between two
endpoints. It provides streams for reading and writing data asynchronously.

Key features include event-based data handling, connection management,
and support for both IPv4 and IPv6 addresses. Sockets work with Streams.

## Basic Socket Client

This example shows a simple TCP client that connects to a server.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await Socket.connect('localhost', 8080);
    print('Connected to server');
    
    socket.write('Hello from Dart client');
    socket.destroy();
  } catch (e) {
    print('Error: $e');
  }
}

We create a socket connection to localhost on port 8080. After sending
a message, we close the connection. Error handling catches connection issues.

$ dart main.dart
Connected to server

## Socket with Data Listening

This example demonstrates reading data from a socket connection.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var socket = await Socket.connect('example.com', 80);
  
  socket.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n');
  
  socket.listen(
    (List&lt;int&gt; data) {
      print(utf8.decode(data));
    },
    onDone: () {
      print('Connection closed');
      socket.destroy();
    }
  );
}

We connect to a web server and send an HTTP request. The listen callback
handles incoming data. The connection closes automatically when complete.

$ dart main.dart
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
...
Connection closed

## Socket Server

This example creates a simple TCP server that accepts client connections.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 8080);
  print('Server listening on ${server.address}:${server.port}');
  
  server.listen((Socket socket) {
    socket.write('Hello from server!\n');
    socket.close();
  });
}

The server binds to localhost port 8080. For each client connection,
it sends a greeting and closes. ServerSocket manages multiple clients.

$ dart main.dart
Server listening on 127.0.0.1:8080

## Bidirectional Communication

This example shows a chat-like bidirectional socket communication.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var socket = await Socket.connect('localhost', 8080);
  
  socket.listen(
    (data) =&gt; print('Server: ${String.fromCharCodes(data)}'),
    onDone: () =&gt; socket.destroy()
  );
  
  var input = stdin.transform(utf8.decoder);
  await for (var message in input) {
    socket.write(message);
  }
}

The client connects to a server and listens for messages. It also reads
user input from console and sends it to the server. UTF-8 handles text.

$ dart main.dart
Hello
Server: Hi there!
How are you?
Server: I'm fine, thanks!

## Socket with Timeout

This example demonstrates socket connection with timeout handling.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await Socket.connect('localhost', 8080)
      .timeout(Duration(seconds: 5));
    
    socket.write('Quick message');
    await socket.flush();
    socket.destroy();
    
    print('Message sent successfully');
  } on SocketException catch (e) {
    print('Socket error: $e');
  } on TimeoutException {
    print('Connection timed out');
  }
}

The connection attempt will timeout after 5 seconds if unsuccessful.
We handle both socket errors and timeout exceptions separately.

$ dart main.dart
Connection timed out

## Best Practices

- **Error handling:** Always handle SocketException and other errors

- **Resource cleanup:** Call destroy() or close() when done

- **Buffering:** Use flush() for important writes

- **Encoding:** Specify text encoding when needed

- **Timeouts:** Set reasonable timeouts for operations

## Source

[Dart Socket Documentation](https://api.dart.dev/stable/dart-io/Socket-class.html)

This tutorial covered Dart's Socket class with practical examples showing
client/server communication, data handling, and error management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).