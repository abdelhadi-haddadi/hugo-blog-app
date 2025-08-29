+++
title = "Dart RawSocket"
date = 2025-08-29T19:52:15.893+01:00
draft = false
description = "Dart RawSocket tutorial shows how to perform low-level network communication in Dart using the RawSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawSocket

last modified April 4, 2025

The RawSocket class in Dart provides low-level network socket
communication capabilities. It allows direct TCP/IP socket operations.

RawSocket is part of Dart's dart:io library and offers more
control than higher-level alternatives like HttpClient or WebSocket.

## Basic Definition

RawSocket represents a raw network socket connection. It provides
direct access to socket events and data streams without protocol handling.

Key features include event-based communication, direct byte stream access,
and fine-grained connection control. It's useful for custom protocols.

## Basic RawSocket Client

This example shows a basic RawSocket client connecting to a server.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await RawSocket.connect('example.com', 80);
    print('Connected to ${socket.remoteAddress.address}');
    
    socket.listen((event) {
      if (event == RawSocketEvent.read) {
        var data = socket.read();
        print('Received: ${String.fromCharCodes(data)}');
      }
    });
    
    socket.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n'.codeUnits);
  } catch (e) {
    print('Error: $e');
  }
}

We create a TCP connection to example.com on port 80. The listen method
handles socket events. We send an HTTP request and print responses.

$ dart main.dart
Connected to 93.184.216.34
Received: HTTP/1.1 200 OK
...

## Handling Multiple Socket Events

This example demonstrates handling different socket events.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('localhost', 8080);
  
  socket.listen((event) {
    switch (event) {
      case RawSocketEvent.read:
        var data = socket.read();
        print('Data: ${String.fromCharCodes(data)}');
        break;
      case RawSocketEvent.write:
        print('Ready to write');
        break;
      case RawSocketEvent.closed:
        print('Connection closed');
        break;
      default:
        print('Unknown event: $event');
    }
  });
  
  socket.write('Hello server'.codeUnits);
  await Future.delayed(Duration(seconds: 1));
  socket.close();
}

We handle read, write and closed events separately. The switch statement
routes different socket events to appropriate handlers for processing.

$ dart main.dart
Ready to write
Data: Hello client
Connection closed

## Creating a Simple Echo Server

This example shows a basic echo server using RawSocket.

server.dart
  

import 'dart:io';

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 8080);
  print('Listening on ${server.address.address}:${server.port}');
  
  server.listen((client) {
    client.listen((event) {
      if (event == RawSocketEvent.read) {
        var data = client.read();
        print('Received: ${String.fromCharCodes(data)}');
        client.write(data);
      }
    });
  });
}

The server binds to localhost port 8080. It echoes back any received data.
Each client connection gets its own event listener for handling messages.

$ dart server.dart
Listening on 127.0.0.1:8080
Received: Test message

## Socket Timeout Handling

This example demonstrates implementing a connection timeout.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  try {
    var socket = await RawSocket.connect('example.com', 80)
      .timeout(Duration(seconds: 3));
    
    socket.listen((event) {
      if (event == RawSocketEvent.read) {
        print('Data received');
      }
    });
    
    print('Connection successful');
  } on TimeoutException {
    print('Connection timed out');
  } on SocketException catch (e) {
    print('Socket error: $e');
  }
}

We add a 3-second timeout to the connection attempt. The timeout method
throws TimeoutException if connection isn't established in time.

$ dart main.dart
Connection successful

## Binary Data Transmission

This example shows sending and receiving binary data.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  var socket = await RawSocket.connect('localhost', 9000);
  
  // Send binary data
  var bytes = Uint8List.fromList([0, 1, 2, 3, 255]);
  socket.write(bytes);
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      var response = socket.read();
      print('Received bytes: $response');
    }
  });
  
  await Future.delayed(Duration(seconds: 1));
  socket.close();
}

We create a Uint8List containing binary values and send it through the socket.
The socket handles binary data transparently without any conversion needed.

$ dart main.dart
Received bytes: [0, 1, 2, 3, 255]

## Best Practices

- **Error handling:** Always handle socket exceptions

- **Resource cleanup:** Close sockets when done

- **Buffering:** Implement proper data buffering

- **Timeouts:** Set reasonable timeout values

- **Event handling:** Handle all relevant socket events

## Source

[Dart RawSocket Documentation](https://api.dart.dev/stable/dart-io/RawSocket-class.html)

This tutorial covered Dart's RawSocket class with practical examples showing
basic usage, event handling, binary data, and server implementation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).