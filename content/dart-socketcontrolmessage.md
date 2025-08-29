+++
title = "Dart SocketControlMessage"
date = 2025-08-29T19:52:23.961+01:00
draft = false
description = "Dart SocketControlMessage tutorial shows how to work with network control messages in Dart using the SocketControlMessage class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SocketControlMessage

last modified April 4, 2025

The SocketControlMessage class in Dart represents network control
messages used with sockets. These messages carry protocol-specific information.

Control messages are typically used for advanced socket operations like
accessing packet headers or setting socket options. They're part of Dart's
dart:io library for low-level network programming.

## Basic Definition

SocketControlMessage is an abstract class representing platform-
specific control messages. It's used with RawDatagramSocket and RawSocket.

Key features include protocol-specific data access and platform independence.
The actual implementation varies by operating system and protocol.

## Basic SocketControlMessage Usage

This example shows how to receive control messages from a datagram socket.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  final socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      final datagram = socket.receive();
      final controlMessages = socket.receiveControlMessages();
      
      if (controlMessages != null) {
        for (final message in controlMessages) {
          print('Received control message: ${message.runtimeType}');
        }
      }
    }
  });
  
  // Send a test packet to ourselves
  socket.send(Uint8List.fromList([1, 2, 3]), 
      InternetAddress.loopbackIPv4, socket.port);
}

We create a datagram socket and listen for incoming packets with control
messages. The receiveControlMessages() method returns any control messages.

$ dart main.dart
Received control message: _RawSocketControlMessage

## Working with IP_TTL Control Messages

This example demonstrates handling IP time-to-live (TTL) control messages.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  final socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  
  // Enable receiving TTL information
  socket.setOption(SocketOption.ipReceiveTTL, true);
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      final datagram = socket.receive();
      final controlMessages = socket.receiveControlMessages();
      
      if (controlMessages != null) {
        for (final message in controlMessages) {
          if (message.level == SocketOption.ipLevel &amp;&amp;
              message.type == SocketOption.ipTTL) {
            print('Packet TTL: ${message.data[0]}');
          }
        }
      }
    }
  });
  
  // Send test packet
  socket.send(Uint8List.fromList([1, 2, 3]), 
      InternetAddress.loopbackIPv4, socket.port);
}

We configure the socket to receive TTL information and then extract it from
control messages. The message contains protocol level and type information.

$ dart main.dart
Packet TTL: 64

## Sending Control Messages

This example shows how to send packets with control messages attached.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  final receiver = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  final sender = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  
  // Enable TTL control messages on receiver
  receiver.setOption(SocketOption.ipReceiveTTL, true);
  
  receiver.listen((event) {
    if (event == RawSocketEvent.read) {
      final datagram = receiver.receive();
      final controlMessages = receiver.receiveControlMessages();
      
      if (controlMessages != null) {
        for (final message in controlMessages) {
          print('Received TTL: ${message.data[0]}');
        }
      }
    }
  });
  
  // Create control message to set TTL
  final ttlMessage = RawSocketControlMessage.fromHandled(
    SocketOption.ipLevel,
    SocketOption.ipTTL,
    Uint8List.fromList([1]) // Set TTL to 1
  );
  
  // Send with control message
  sender.send(
    Uint8List.fromList([1, 2, 3]),
    InternetAddress.loopbackIPv4,
    receiver.port,
    controlMessages: [ttlMessage]
  );
}

We create a control message to set the TTL value and attach it to an outgoing
packet. The receiver will see this TTL value in its control messages.

$ dart main.dart
Received TTL: 1

## Handling Multiple Control Messages

This example demonstrates processing different types of control messages.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  final socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  
  // Enable multiple control message types
  socket.setOption(SocketOption.ipReceiveTTL, true);
  socket.setOption(SocketOption.ipReceiveTOS, true);
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      final datagram = socket.receive();
      final controlMessages = socket.receiveControlMessages();
      
      if (controlMessages != null) {
        for (final message in controlMessages) {
          if (message.level == SocketOption.ipLevel) {
            if (message.type == SocketOption.ipTTL) {
              print('TTL: ${message.data[0]}');
            } else if (message.type == SocketOption.ipTOS) {
              print('TOS: ${message.data[0]}');
            }
          }
        }
      }
    }
  });
  
  // Send test packet
  socket.send(Uint8List.fromList([1, 2, 3]), 
      InternetAddress.loopbackIPv4, socket.port);
}

We configure the socket to receive both TTL and TOS (Type of Service) control
messages. The code distinguishes between different message types.

$ dart main.dart
TTL: 64
TOS: 0

## Platform-Specific Control Messages

This example shows platform-specific handling of control messages.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  final socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  
  // Platform-specific options
  if (Platform.isLinux) {
    socket.setOption(SocketOption.ipPacketInfo, true);
  } else if (Platform.isMacOS) {
    socket.setOption(SocketOption.ipRecvDstAddr, true);
  }
  
  socket.listen((event) {
    if (event == RawSocketEvent.read) {
      final datagram = socket.receive();
      final controlMessages = socket.receiveControlMessages();
      
      if (controlMessages != null) {
        print('Received ${controlMessages.length} control messages');
        
        for (final message in controlMessages) {
          print('Message level: ${message.level}, type: ${message.type}');
          print('Data length: ${message.data.length} bytes');
        }
      }
    }
  });
  
  // Send test packet
  socket.send(Uint8List.fromList([1, 2, 3]), 
      InternetAddress.loopbackIPv4, socket.port);
}

We demonstrate platform-specific control message options. The actual available
options and message formats vary by operating system.

$ dart main.dart
Received 1 control messages
Message level: 0, type: 8
Data length: 12 bytes

## Best Practices

- **Check platform:** Control message options vary by OS

- **Enable explicitly:** Set required socket options first

- **Handle null:** receiveControlMessages() may return null

- **Validate:** Check message level and type before processing

- **Performance:** Control messages add overhead, use judiciously

## Source

[Dart SocketControlMessage Documentation](https://api.dart.dev/stable/dart-io/SocketControlMessage-class.html)

This tutorial covered Dart's SocketControlMessage class with practical examples
showing reception, sending, and platform-specific handling of control messages.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).