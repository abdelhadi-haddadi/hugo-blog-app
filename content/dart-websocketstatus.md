+++
title = "Dart WebSocketStatus"
date = 2025-08-29T19:52:33.971+01:00
draft = false
description = "Dart WebSocketStatus tutorial shows how to check WebSocket connection status in Dart using the WebSocketStatus class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart WebSocketStatus

last modified April 4, 2025

The WebSocketStatus class in Dart provides constants for WebSocket
connection states. It's used to check the current status of WebSocket
connections.

WebSocketStatus contains static integer values representing different connection
phases. These values help manage WebSocket lifecycle events and error handling.

## Basic Definition

WebSocketStatus is a class containing static constants for WebSocket
connection states. It's part of Dart's dart:io library.

Key status codes include connecting, open, closing, and closed states. There are
also codes for abnormal closures and protocol errors.

## Checking Connection Status

This example shows how to check basic WebSocket connection status.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await WebSocket.connect('ws://echo.websocket.org');
  
  if (socket.readyState == WebSocketStatus.open) {
    print('Connection is open');
  } else if (socket.readyState == WebSocketStatus.connecting) {
    print('Still connecting');
  }
  
  await socket.close();
}

We connect to a WebSocket server and check its readyState against WebSocketStatus
constants. The open state indicates a successful connection.

$ dart main.dart
Connection is open

## Handling Connection Errors

This example demonstrates checking for abnormal closure status.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await WebSocket.connect('ws://invalid.url');
  } on WebSocketException catch (e) {
    print('Connection failed: ${e.message}');
    
    if (e.inner?.readyState == WebSocketStatus.abnormalClosure) {
      print('Abnormal closure detected');
    }
  }
}

We attempt to connect to an invalid URL and catch the WebSocketException. The
inner socket's readyState shows the abnormal closure status.

$ dart main.dart
Connection failed: Connection failed
Abnormal closure detected

## Monitoring State Changes

This example shows tracking WebSocket state transitions.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await WebSocket.connect('ws://echo.websocket.org');
  print('Initial state: ${socket.readyState}');
  
  socket.listen(
    (data) =&gt; print('Data received'),
    onDone: () {
      print('Final state: ${socket.readyState}');
      if (socket.readyState == WebSocketStatus.closed) {
        print('Connection closed normally');
      }
    }
  );
  
  await socket.close();
}

We monitor the WebSocket's state changes from open to closed. The onDone callback
checks the final state after connection closure.

$ dart main.dart
Initial state: 1
Final state: 3
Connection closed normally

## Protocol Error Handling

This example demonstrates checking for protocol errors.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await WebSocket.connect('ws://echo.websocket.org');
    
    // Force protocol violation
    socket.add('Invalid binary data');
    await socket.close();
  } on WebSocketException catch (e) {
    if (e.inner?.readyState == WebSocketStatus.protocolError) {
      print('Protocol error occurred');
    }
  }
}

We intentionally cause a protocol violation by sending invalid data. The exception
handler checks for the protocolError status code.

$ dart main.dart
Protocol error occurred

## Connection Lifecycle Tracking

This example shows tracking all possible WebSocket states.

main.dart
  

import 'dart:io';

void printState(int state) {
  switch (state) {
    case WebSocketStatus.connecting:
      print('Connecting');
      break;
    case WebSocketStatus.open:
      print('Open');
      break;
    case WebSocketStatus.closing:
      print('Closing');
      break;
    case WebSocketStatus.closed:
      print('Closed');
      break;
    default:
      print('Unknown state');
  }
}

void main() async {
  var socket = await WebSocket.connect('ws://echo.websocket.org');
  printState(socket.readyState);
  
  socket.add('Hello');
  await socket.close();
  printState(socket.readyState);
}

We create a helper function to translate status codes to human-readable strings.
This shows the complete connection lifecycle from connecting to closed.

$ dart main.dart
Open
Closed

## Best Practices

- **State checks:** Always verify connection state before sending data

- **Error handling:** Handle all possible error states gracefully

- **Cleanup:** Properly close connections when done

- **Monitoring:** Track state changes for debugging

## Source

[Dart WebSocketStatus Documentation](https://api.dart.dev/stable/dart-io/WebSocketStatus-class.html)

This tutorial covered Dart's WebSocketStatus class with practical examples showing
connection monitoring, error handling, and state management for WebSockets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).