+++
title = "Dart RawSocketEvent"
date = 2025-08-29T19:52:17.206+01:00
draft = false
description = "Dart RawSocketEvent tutorial shows how to handle socket events in Dart using the RawSocketEvent class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawSocketEvent

last modified April 4, 2025

The RawSocketEvent class in Dart represents events that occur on
a raw socket connection. It's used with RawSocket for low-level
network communication.

RawSocketEvent provides event types for read, write, closed, and error states.
It's part of Dart's dart:io library for non-web applications.

## Basic Definition

RawSocketEvent is an enum-like class that defines socket events.
These events are triggered during socket operations and must be handled.

Key events include READ for incoming data, WRITE for output readiness, and
CLOSED for connection termination. Error conditions are also reported.

## Basic Socket Event Handling

This example shows basic event handling with RawSocketEvent.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('example.com', 80);
  
  socket.listen((event) {
    switch (event) {
      case RawSocketEvent.read:
        print('Data available to read');
        break;
      case RawSocketEvent.write:
        print('Ready to send data');
        break;
      case RawSocketEvent.closed:
        print('Connection closed');
        break;
    }
  });
  
  socket.writeEventsEnabled = true;
}

We connect to a server and listen for socket events. The listen callback
receives RawSocketEvent values indicating socket state changes.

$ dart main.dart
Ready to send data
Data available to read
Connection closed

## Reading Data on READ Event

This example demonstrates reading data when READ events occur.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var socket = await RawSocket.connect('example.com', 80);
  var request = 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n';
  
  socket.write(request.codeUnits);
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      var data = socket.read();
      if (data != null) {
        print(utf8.decode(data));
      }
    } else if (event == RawSocketEvent.closed) {
      socket.close();
    }
  });
}

We send an HTTP request and read the response when READ events occur.
The socket.read() method returns available data as a byte list.

$ dart main.dart
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
...

## Handling Write Events

This example shows how to handle WRITE events for efficient data sending.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('localhost', 8080);
  var messages = ['Hello', 'World', 'From', 'Dart'];
  var index = 0;
  
  socket.listen((event) {
    if (event == RawSocketEvent.write &amp;&amp; index &lt; messages.length) {
      socket.write(messages[index++].codeUnits);
      print('Sent: ${messages[index-1]}');
    }
    
    if (index == messages.length) {
      socket.shutdown(SocketDirection.send);
    }
  });
  
  socket.writeEventsEnabled = true;
}

We send messages only when the socket is ready to write. WRITE events indicate
when the socket can accept more data without blocking.

$ dart main.dart
Sent: Hello
Sent: World
Sent: From
Sent: Dart

## Error Event Handling

This example demonstrates handling error events on a socket.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var socket = await RawSocket.connect('invalid.host', 80);
    
    socket.listen((event) {
      if (event == RawSocketEvent.read) {
        print('Data received');
      } else if (event == RawSocketEvent.closed) {
        print('Connection closed');
      } else if (event == RawSocketEvent.readError ||
                 event == RawSocketEvent.writeError) {
        print('Error occurred on socket');
        socket.close();
      }
    });
  } on SocketException catch (e) {
    print('Connection failed: ${e.message}');
  }
}

We handle both connection errors and runtime socket errors. Error events
indicate problems with the socket connection or operations.

$ dart main.dart
Connection failed: Failed host lookup: 'invalid.host'

## Complete Socket Client

This example shows a complete socket client with all event types.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  try {
    var socket = await RawSocket.connect('example.com', 80);
    var request = 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n';
    
    socket.listen((event) {
      switch (event) {
        case RawSocketEvent.read:
          var data = socket.read();
          if (data != null) {
            print(utf8.decode(data.take(100)));
          }
          break;
        case RawSocketEvent.write:
          socket.write(request.codeUnits);
          socket.writeEventsEnabled = false;
          break;
        case RawSocketEvent.closed:
          print('Connection closed by server');
          socket.close();
          break;
        case RawSocketEvent.readError:
        case RawSocketEvent.writeError:
          print('Socket error occurred');
          socket.close();
          break;
      }
    });
    
    socket.writeEventsEnabled = true;
  } on SocketException catch (e) {
    print('Connection error: ${e.message}');
  }
}

This complete example handles all socket events: initial writing, reading
response data, and proper cleanup on closure or errors.

$ dart main.dart
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
...
Connection closed by server

## Best Practices

- **Enable events:** Set writeEventsEnabled only when needed

- **Error handling:** Always handle error and closed events

- **Resource cleanup:** Close sockets when done

- **Buffer management:** Read all available data on READ events

- **Throttling:** Control write rates using WRITE events

## Source

[Dart RawSocketEvent Documentation](https://api.dart.dev/stable/dart-io/RawSocketEvent-class.html)

This tutorial covered Dart's RawSocketEvent class with practical examples showing
event handling, data transfer, and error management for socket programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).