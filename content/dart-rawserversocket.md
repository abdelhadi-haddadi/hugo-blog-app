+++
title = "Dart RawServerSocket"
date = 2025-08-29T19:52:15.923+01:00
draft = false
description = "Dart RawServerSocket tutorial shows how to create low-level server sockets in Dart using the RawServerSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawServerSocket

last modified April 4, 2025

The RawServerSocket class in Dart provides low-level TCP server
socket functionality. It's part of Dart's dart:io library for
non-web applications.

RawServerSocket allows direct byte-level communication with TCP clients. It's
useful for custom protocols, performance-critical applications, and binary data.

## Basic Definition

RawServerSocket is a server-side socket that listens for incoming
TCP connections. It provides raw byte streams without higher-level protocol
handling.

Key features include asynchronous operation, connection event handling, and
direct access to socket streams. It's the foundation for building custom
network servers.

## Basic Echo Server

This example shows a simple echo server using RawServerSocket.

main.dart
  

import 'dart:io';

void main() async {
  var server = await RawServerSocket.bind('127.0.0.1', 4040);
  print('Echo server listening on ${server.address}:${server.port}');

  server.listen((client) {
    client.listen((data) {
      client.add(data); // Echo back received data
    }, onDone: () =&gt; client.close());
  });
}

We create a server that listens on localhost port 4040. When clients connect,
we echo back any data they send. The server handles multiple clients
asynchronously.

$ dart main.dart
Echo server listening on 127.0.0.1:4040

## Handling Client Connections

This example demonstrates detailed client connection handling.

main.dart
  

import 'dart:io';

void main() async {
  var server = await RawServerSocket.bind('0.0.0.0', 4041);
  print('Server started on port ${server.port}');

  server.listen((client) {
    print('Client connected from ${client.remoteAddress.address}');
    
    client.handleError((error) {
      print('Client error: $error');
    }, test: (error) =&gt; true);
    
    client.listen((data) {
      print('Received ${data.length} bytes');
      client.add([0x01, 0x02, 0x03]); // Send response
    }, onDone: () {
      print('Client disconnected');
      client.close();
    });
  });
}

We log client connections, handle errors, and send a fixed response. The
remoteAddress property identifies connecting clients. Error handling ensures
server stability.

$ dart main.dart
Server started on port 4041
Client connected from 127.0.0.1
Received 5 bytes
Client disconnected

## Broadcast Server

This example shows a server that broadcasts messages to all connected clients.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var server = await RawServerSocket.bind('127.0.0.1', 4042);
  var clients = &lt;RawSocket&gt;[];
  
  server.listen((client) {
    clients.add(client);
    print('New client (${clients.length} total)');
    
    client.listen((_) {}, onDone: () {
      clients.remove(client);
      print('Client disconnected (${clients.length} remaining)');
    });
  });

  // Broadcast timer
  Timer.periodic(Duration(seconds: 2), (_) {
    var message = 'Server time: ${DateTime.now()}\n'.codeUnits;
    for (var client in clients) {
      client.add(message);
    }
  });
}

We maintain a list of connected clients and broadcast time updates every 2
seconds. The server tracks client connections and disconnections.

$ dart main.dart
New client (1 total)
New client (2 total)
Client disconnected (1 remaining)

## Port Scanner

This example demonstrates using RawServerSocket to check port availability.

main.dart
  

import 'dart:io';

Future&lt;bool&gt; isPortAvailable(int port) async {
  try {
    var server = await RawServerSocket.bind('127.0.0.1', port);
    await server.close();
    return true;
  } catch (e) {
    return false;
  }
}

void main() async {
  var ports = [80, 4040, 8080, 3000];
  
  for (var port in ports) {
    var available = await isPortAvailable(port);
    print('Port $port: ${available ? 'available' : 'in use'}');
  }
}

We attempt to bind to each port to check availability. Successful binding
means the port is available. The server is immediately closed after checking.

$ dart main.dart
Port 80: in use
Port 4040: available
Port 8080: in use
Port 3000: available

## Custom Protocol Server

This example implements a simple custom binary protocol server.

main.dart
  

import 'dart:io';

void main() async {
  var server = await RawServerSocket.bind('127.0.0.1', 4043);
  print('Custom protocol server started');

  server.listen((client) {
    var buffer = &lt;int&gt;[];
    
    client.listen((data) {
      buffer.addAll(data);
      
      // Process complete messages (delimited by 0xFF)
      while (buffer.contains(0xFF)) {
        var messageEnd = buffer.indexOf(0xFF);
        var message = buffer.sublist(0, messageEnd);
        buffer.removeRange(0, messageEnd + 1);
        
        print('Received message: $message');
        client.add([...message.reversed, 0xFF]); // Send reversed
      }
    }, onDone: () =&gt; client.close());
  });
}

We implement a simple protocol where messages end with 0xFF. The server
processes complete messages and responds with reversed data. Partial messages
are buffered.

$ dart main.dart
Custom protocol server started
Received message: [72, 101, 108, 108, 111]

## Best Practices

- **Error handling:** Always implement error handlers for sockets

- **Resource cleanup:** Close sockets when done to free resources

- **Buffering:** Handle partial data with proper buffering

- **Backpressure:** Monitor socket write buffers to avoid overload

- **Security:** Validate all incoming data and limit connections

## Source

[Dart RawServerSocket Documentation](https://api.dart.dev/stable/dart-io/RawServerSocket-class.html)

This tutorial covered Dart's RawServerSocket class with practical examples
showing server creation, client handling, and custom protocol implementation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).