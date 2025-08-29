+++
title = "Dart SocketDirection"
date = 2025-08-29T19:52:25.101+01:00
draft = false
description = "Dart SocketDirection tutorial shows how to work with socket directions in Dart using the SocketDirection class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SocketDirection

last modified April 4, 2025

The SocketDirection class in Dart represents the direction of
socket communication. It's used with socket shutdown operations to specify
whether to close reading, writing, or both directions.

SocketDirection is an enum from Dart's dart:io library. It's
essential for proper socket resource management in network applications.

## Basic Definition

SocketDirection is an enum with three values: receive,
send, and both. These represent the possible
communication directions for a socket.

The enum is used primarily with the Socket.shutdown() method to
control which direction of communication should be terminated on a socket.

## Basic SocketDirection Usage

This example shows basic usage of SocketDirection with a simple TCP socket.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('localhost', 0);
  var client = await Socket.connect('localhost', server.port);
  
  // Shutdown only the send direction
  client.shutdown(SocketDirection.send);
  
  print('Send direction shutdown');
  server.close();
}

We create a server and client socket, then shutdown only the send direction
on the client. The server can still send data to the client after this call.

$ dart main.dart
Send direction shutdown

## Shutting Down Receive Direction

This example demonstrates shutting down the receive direction of a socket.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('localhost', 0);
  var client = await Socket.connect('localhost', server.port);
  
  // Shutdown only the receive direction
  client.shutdown(SocketDirection.receive);
  
  print('Receive direction shutdown');
  server.close();
}

After shutting down the receive direction, the client can still send data
but won't receive any incoming data. This is useful for one-way communication.

$ dart main.dart
Receive direction shutdown

## Shutting Down Both Directions

This example shows how to completely shutdown a socket in both directions.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('localhost', 0);
  var client = await Socket.connect('localhost', server.port);
  
  // Shutdown both directions
  client.shutdown(SocketDirection.both);
  
  print('Both directions shutdown');
  server.close();
}

Using SocketDirection.both closes all communication on the socket.
This is equivalent to calling Socket.close() but more explicit.

$ dart main.dart
Both directions shutdown

## Graceful Socket Termination

This example demonstrates graceful socket termination using SocketDirection.

main.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('localhost', 0);
  var client = await Socket.connect('localhost', server.port);
  
  // First shutdown sending to indicate we're done writing
  client.shutdown(SocketDirection.send);
  
  // Then wait for server to finish sending
  await server.first;
  
  // Finally shutdown completely
  client.shutdown(SocketDirection.both);
  server.close();
  
  print('Graceful termination complete');
}

This pattern ensures all pending data is transmitted before closing. First we
stop sending, then wait for the other side to finish, then close completely.

$ dart main.dart
Graceful termination complete

## Error Handling with SocketDirection

This example shows proper error handling when using SocketDirection.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await Socket.connect('google.com', 80);
    
    // Attempt to shutdown a direction
    socket.shutdown(SocketDirection.send);
    
    print('Shutdown successful');
    socket.close();
  } on SocketException catch (e) {
    print('Socket error: ${e.message}');
  } catch (e) {
    print('Unexpected error: $e');
  }
}

We wrap socket operations in try-catch blocks to handle potential errors.
SocketDirection operations can fail if the socket is already closed.

$ dart main.dart
Shutdown successful

## Best Practices

- **Explicit shutdowns:** Use SocketDirection for clear communication termination

- **Graceful closure:** Shutdown send direction first when possible

- **Error handling:** Always handle potential socket errors

- **Resource cleanup:** Ensure sockets are properly closed

## Source

[Dart SocketDirection Documentation](https://api.dart.dev/stable/dart-io/SocketDirection-class.html)

This tutorial covered Dart's SocketDirection class with practical examples showing
how to control socket communication directions for proper network programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).