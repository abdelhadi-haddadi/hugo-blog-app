+++
title = "Dart RawDatagramSocket"
date = 2025-08-29T19:52:14.794+01:00
draft = false
description = "Dart RawDatagramSocket tutorial shows how to work with UDP sockets in Dart using the RawDatagramSocket class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawDatagramSocket

last modified April 4, 2025

The RawDatagramSocket class in Dart provides UDP socket functionality.
It allows sending and receiving datagrams (UDP packets) over IP networks.

Unlike TCP sockets, UDP is connectionless and doesn't guarantee delivery.
RawDatagramSocket is part of Dart's dart:io library for I/O operations.

## Basic Definition

RawDatagramSocket represents a UDP socket that can bind to a port.
It supports both IPv4 and IPv6 addresses and provides event-based I/O.

Key features include sending/receiving datagrams, multicast support, and port
binding. It's useful for low-latency applications like games and streaming.

## Basic UDP Echo Server

This example shows a simple UDP echo server that sends back received packets.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 8888);
  print('UDP echo server listening on ${socket.address}:${socket.port}');

  socket.listen((RawSocketEvent event) {
    if (event == RawSocketEvent.read) {
      var datagram = socket.receive();
      if (datagram != null) {
        print('Received from ${datagram.address}:${datagram.port}');
        socket.send(datagram.data, datagram.address, datagram.port);
      }
    }
  });
}

We bind to any IPv4 address on port 8888 and listen for incoming datagrams.
When data arrives, we print the sender info and echo the data back.

$ dart main.dart
UDP echo server listening on 0.0.0.0:8888
Received from 127.0.0.1:54321

## UDP Client Example

This example demonstrates a UDP client that sends messages to a server.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  print('Client bound to port ${socket.port}');

  var message = 'Hello UDP';
  var data = message.codeUnits;
  var server = InternetAddress.loopbackIPv4;
  var port = 8888;

  socket.send(data, server, port);
  print('Sent "$message" to $server:$port');

  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      var datagram = socket.receive();
      if (datagram != null) {
        print('Received: ${String.fromCharCodes(datagram.data)}');
      }
    }
  });
}

The client binds to a random port (0), sends a message to the server, and waits
for a response. We convert the string to bytes before sending over UDP.

$ dart main.dart
Client bound to port 54321
Sent "Hello UDP" to 127.0.0.1:8888
Received: Hello UDP

## Broadcasting UDP Packets

This example shows how to send UDP broadcast packets to all hosts on a network.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  socket.broadcastEnabled = true;

  var message = 'Broadcast message';
  var data = message.codeUnits;
  var port = 8888;

  socket.send(data, InternetAddress('255.255.255.255'), port);
  print('Broadcast sent to port $port');

  socket.close();
}

We enable broadcasting and send to the special broadcast address 255.255.255.255.
This sends the packet to all hosts on the local network segment.

$ dart main.dart
Broadcast sent to port 8888

## Multicast UDP Example

This example demonstrates joining a multicast group and receiving packets.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 8888);
  var multicast = InternetAddress('239.1.2.3');
  
  socket.joinMulticast(multicast);
  print('Joined multicast group $multicast');

  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      var datagram = socket.receive();
      if (datagram != null) {
        print('Multicast from ${datagram.address}: ${String.fromCharCodes(datagram.data)}');
      }
    }
  });
}

We join the multicast group 239.1.2.3 and listen for incoming packets.
Multicast allows efficient one-to-many communication on a network.

$ dart main.dart
Joined multicast group 239.1.2.3
Multicast from 192.168.1.100: Test multicast message

## Handling Errors and Timeouts

This example shows error handling and timeout configuration for UDP sockets.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  try {
    var socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 8888)
      .timeout(Duration(seconds: 5));
    
    socket.handleError((error) {
      print('Socket error: $error');
    });

    socket.listen((event) {
      if (event == RawSocketEvent.read) {
        var datagram = socket.receive();
        print('Received data');
      }
      if (event == RawSocketEvent.closed) {
        print('Socket closed');
      }
    });

    Timer(Duration(seconds: 10), () {
      socket.close();
    });
  } on TimeoutException {
    print('Failed to bind socket within 5 seconds');
  } on SocketException catch (e) {
    print('Socket exception: ${e.message}');
  }
}

We add timeout for socket binding, error handlers, and automatic socket closure.
This makes the UDP communication more robust in real-world scenarios.

$ dart main.dart
Socket closed

## Best Practices

- **Error handling:** Always implement error handlers for sockets

- **Port selection:** Use 0 for ephemeral ports in clients

- **Buffer size:** UDP has MTU limits (typically 1500 bytes)

- **Multicast TTL:** Set appropriate TTL for multicast packets

- **Resource cleanup:** Close sockets when done

## Source

[Dart RawDatagramSocket Documentation](https://api.dart.dev/stable/dart-io/RawDatagramSocket-class.html)

This tutorial covered Dart's RawDatagramSocket class with practical examples
showing UDP communication patterns including unicast, broadcast, and multicast.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).