+++
title = "Dart Datagram"
date = 2025-08-29T19:51:42.342+01:00
draft = false
description = "Dart Datagram tutorial shows how to work with UDP networking in Dart using the Datagram class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Datagram

last modified April 4, 2025

The Datagram class in Dart represents a UDP datagram packet for
network communication. It's used with RawDatagramSocket for sending and
receiving UDP packets.

Datagram contains both the data payload and addressing information. It's part
of Dart's dart:io library for low-level network operations.

## Basic Definition

Datagram is an immutable object representing a UDP packet. It
contains bytes of data and the sender/receiver's InternetAddress and port.

Key properties include data access, address information, and port numbers.
UDP is connectionless and doesn't guarantee delivery or ordering.

## Basic Datagram Receiver

This example shows how to receive UDP datagrams on a local port.

receiver.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var socket = await RawDatagramSocket.bind('127.0.0.1', 3000);
  print('UDP receiver listening on ${socket.address.address}:${socket.port}');

  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      Datagram? dg = socket.receive();
      if (dg != null) {
        String message = utf8.decode(dg.data);
        print('Received from ${dg.address.address}:${dg.port} - $message');
      }
    }
  });
}

We bind a socket to localhost port 3000 and listen for incoming datagrams.
When data arrives, we decode the bytes to UTF-8 and print the message with
sender details.

$ dart receiver.dart
UDP receiver listening on 127.0.0.1:3000
Received from 127.0.0.1:54321 - Hello UDP!

## Basic Datagram Sender

This example demonstrates sending UDP datagrams to a receiver.

sender.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var socket = await RawDatagramSocket.bind('127.0.0.1', 0); // Random port
  var message = 'Hello UDP!';
  var bytes = utf8.encode(message);
  
  var sent = socket.send(
    bytes, 
    InternetAddress('127.0.0.1'), 
    3000
  );
  
  print('Sent $sent bytes to port 3000');
  await Future.delayed(Duration(seconds: 1)); // Wait for delivery
  socket.close();
}

We create a socket bound to a random port, encode our message to bytes, and
send it to the receiver on port 3000. The send method returns bytes sent.

$ dart sender.dart
Sent 10 bytes to port 3000

## Handling Binary Data

This example shows sending and receiving binary data in UDP datagrams.

binary_sender.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  var socket = await RawDatagramSocket.bind('127.0.0.1', 0);
  
  // Create binary data (4 bytes representing 32-bit integer)
  var buffer = ByteData(4);
  buffer.setUint32(0, 0xDEADBEEF, Endian.big);
  
  socket.send(
    buffer.buffer.asUint8List(),
    InternetAddress('127.0.0.1'),
    3000
  );
  
  print('Sent binary data');
  await Future.delayed(Duration(seconds: 1));
  socket.close();
}

binary_receiver.dart
  

```
import 'dart:io';
import 'dart:typed_data';

void main() async {
  var socket = await RawDatagramSocket.bind('127.0.0.1', 3000);
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      Datagram? dg = socket.receive();
      if (dg != null) {
        var data = ByteData.sublistView(dg.data);
        var value = data.getUint32(0, Endian.big);
        print('Received 32-bit value: 0x${value.toRadixString(16)}');
      }
    }
  });
}

```

The sender creates a 32-bit integer in big-endian format and sends it as binary.
The receiver reconstructs the integer from the received bytes and prints it.

$ dart binary_receiver.dart
Received 32-bit value: 0xdeadbeef

## Broadcasting Datagrams

This example demonstrates UDP broadcasting to multiple receivers.

broadcast_sender.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var socket = await RawDatagramSocket.bind('0.0.0.0', 0);
  socket.broadcastEnabled = true;
  
  var message = 'Broadcast message!';
  var bytes = utf8.encode(message);
  
  socket.send(
    bytes,
    InternetAddress('255.255.255.255'),
    3000
  );
  
  print('Broadcast sent');
  await Future.delayed(Duration(seconds: 1));
  socket.close();
}

We enable broadcast on the socket and send to the limited broadcast address.
All hosts on the local network segment listening on port 3000 will receive
this datagram.

$ dart broadcast_sender.dart
Broadcast sent

## Handling Large Datagrams

This example shows how to handle datagrams larger than the typical MTU.

large_datagrams.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  // Receiver
  var receiver = await RawDatagramSocket.bind('127.0.0.1', 3000);
  receiver.listen((event) {
    if (event == RawSocketEvent.read) {
      Datagram? dg = receiver.receive();
      if (dg != null) {
        print('Received ${dg.data.length} bytes');
      }
    }
  });

  // Sender
  var sender = await RawDatagramSocket.bind('127.0.0.1', 0);
  var largeData = Uint8List(65507); // Max safe UDP payload size
  
  // Fill with some data
  for (int i = 0; i &lt; largeData.length; i++) {
    largeData[i] = i % 256;
  }
  
  var sent = sender.send(
    largeData,
    InternetAddress('127.0.0.1'),
    3000
  );
  
  print('Sent $sent bytes');
  await Future.delayed(Duration(seconds: 2));
  sender.close();
  receiver.close();
}

We create a datagram with the maximum safe UDP payload size (65,507 bytes).
The receiver simply reports the size of received data. Note that large
datagrams may be fragmented by IP layer.

$ dart large_datagrams.dart
Sent 65507 bytes
Received 65507 bytes

## Best Practices

- **Error handling:** Always check for null when receiving datagrams

- **MTU awareness:** Keep datagrams under 1500 bytes for best reliability

- **Port selection:** Use ports above 1024 for user applications

- **Resource cleanup:** Close sockets when done to free resources

- **Timeout handling:** Implement timeouts for expected responses

## Source

[Dart Datagram Documentation](https://api.dart.dev/stable/dart-io/Datagram-class.html)

This tutorial covered Dart's Datagram class with practical examples showing
UDP communication, binary data handling, broadcasting, and large payloads.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).