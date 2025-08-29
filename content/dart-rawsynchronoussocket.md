+++
title = "Dart RawSynchronousSocket"
date = 2025-08-29T19:52:17.190+01:00
draft = false
description = "Dart RawSynchronousSocket tutorial shows how to perform synchronous socket operations in Dart using the RawSynchronousSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawSynchronousSocket

last modified April 4, 2025

The RawSynchronousSocket class in Dart provides synchronous socket
operations for low-level network programming. It's part of Dart's
dart:io library.

Unlike asynchronous sockets, RawSynchronousSocket blocks until operations
complete. This makes it suitable for specific use cases requiring synchronous
behavior.

## Basic Definition

RawSynchronousSocket represents a synchronous TCP socket connection.
It allows blocking read/write operations without callbacks or futures.

Key features include synchronous data transfer, direct byte access, and
connection management. It's typically used in specialized scenarios.

## Creating a Synchronous Socket

This example shows how to create a synchronous socket connection.

main.dart
  

import 'dart:io';

void main() {
  var socket = RawSynchronousSocket.connectSync('example.com', 80);
  
  if (socket != null) {
    print('Connected to ${socket.address.address}:${socket.port}');
    socket.closeSync();
  } else {
    print('Connection failed');
  }
}

We create a synchronous TCP connection to a web server. The connectSync method
blocks until the connection succeeds or fails. Always close sockets when done.

$ dart main.dart
Connected to 93.184.216.34:80

## Synchronous Read Operation

This example demonstrates synchronous reading from a socket.

main.dart
  

import 'dart:io';

void main() {
  var socket = RawSynchronousSocket.connectSync('example.com', 80);
  if (socket == null) return;
  
  var request = 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n';
  socket.writeFromSync(request.codeUnits);
  
  var buffer = List.filled(1024, 0);
  var bytesRead = socket.readIntoSync(buffer, 0, buffer.length);
  
  print('Read $bytesRead bytes:');
  print(String.fromCharCodes(buffer.sublist(0, bytesRead)));
  
  socket.closeSync();
}

We send an HTTP request and read the response synchronously. The readIntoSync
method blocks until data is available. The buffer stores received bytes.

$ dart main.dart
Read 1024 bytes:
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
...

## Synchronous Write Operation

This example shows synchronous writing to a socket.

main.dart
  

import 'dart:io';

void main() {
  var socket = RawSynchronousSocket.connectSync('localhost', 8080);
  if (socket == null) return;
  
  var message = 'Hello, server!\n';
  var bytesWritten = socket.writeFromSync(message.codeUnits);
  
  print('Wrote $bytesWritten bytes to socket');
  
  socket.closeSync();
}

We connect to a local server and write data synchronously. The writeFromSync
method blocks until all bytes are written. It returns the count of bytes sent.

$ dart main.dart
Wrote 15 bytes to socket

## Handling Multiple Operations

This example demonstrates multiple synchronous operations on a socket.

main.dart
  

import 'dart:io';

void main() {
  var socket = RawSynchronousSocket.connectSync('time.nist.gov', 13);
  if (socket == null) return;
  
  var buffer = List.filled(256, 0);
  var totalBytes = 0;
  
  while (true) {
    var bytesRead = socket.readIntoSync(buffer, 0, buffer.length);
    if (bytesRead &lt;= 0) break;
    
    totalBytes += bytesRead;
    print(String.fromCharCodes(buffer.sublist(0, bytesRead)));
  }
  
  print('Total bytes received: $totalBytes');
  socket.closeSync();
}

We connect to a daytime server and read data in a loop. The readIntoSync call
blocks until data arrives. The loop exits when the connection closes.

$ dart main.dart
59335 23-04-25 12:34:56 00 0 0 123.5 UTC(NIST) 
Total bytes received: 51

## Error Handling

This example shows proper error handling with synchronous sockets.

main.dart
  

import 'dart:io';

void main() {
  try {
    var socket = RawSynchronousSocket.connectSync('invalid.host', 80);
    if (socket == null) {
      print('Connection failed');
      return;
    }
    
    socket.writeFromSync('GET / HTTP/1.1\r\n\r\n'.codeUnits);
    
    var buffer = List.filled(1024, 0);
    socket.readIntoSync(buffer, 0, buffer.length);
    
    socket.closeSync();
  } on SocketException catch (e) {
    print('Socket error: ${e.message}');
  } catch (e) {
    print('Error: $e');
  }
}

We wrap socket operations in try-catch blocks to handle potential errors.
SocketException catches network-related errors specifically. Always clean up.

$ dart main.dart
Socket error: Failed host lookup: 'invalid.host'

## Best Practices

- **Use sparingly:** Prefer async sockets for most use cases

- **Thread safety:** Don't share sockets between isolates

- **Timeouts:** Implement application-level timeouts

- **Cleanup:** Always close sockets properly

- **Buffer size:** Choose appropriate buffer sizes

## Source

[Dart RawSynchronousSocket Documentation](https://api.dart.dev/stable/dart-io/RawSynchronousSocket-class.html)

This tutorial covered Dart's RawSynchronousSocket class with practical examples
showing connection, reading, writing, and error handling in synchronous mode.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).