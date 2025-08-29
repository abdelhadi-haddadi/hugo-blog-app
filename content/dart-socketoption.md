+++
title = "Dart SocketOption"
date = 2025-08-29T19:52:25.095+01:00
draft = false
description = "Dart SocketOption tutorial shows how to configure socket options in Dart using the SocketOption class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SocketOption

last modified April 4, 2025

The SocketOption class in Dart provides a way to configure socket
options for network communication. It's part of Dart's dart:io
library and works with both TCP and UDP sockets.

Socket options control various low-level behaviors of network sockets, such as
timeout settings, buffer sizes, and protocol-specific configurations. They're
essential for fine-tuning network performance.

## Basic Definition

SocketOption represents a socket-level configuration option that
can be applied to sockets. Each option has a level and name that identify it.

The class provides predefined constants for common options and allows creating
custom options. Options are applied using socket's setOption method.

## Setting Socket Timeout

This example demonstrates setting a receive timeout on a socket.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await Socket.connect('example.com', 80);
  
  // Set receive timeout to 5 seconds
  socket.setOption(SocketOption.tcpNoDelay, true);
  socket.setOption(SocketOption.receiveTimeout, Duration(seconds: 5));
  
  print('Socket options configured');
  await socket.close();
}

We create a TCP socket and set two options: TCP_NODELAY and receive timeout.
The timeout will cause the socket to throw an exception if no data is received.

$ dart main.dart
Socket options configured

## Enabling Broadcast on UDP Socket

This example shows how to enable broadcast on a UDP socket.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
  
  // Enable broadcast
  socket.setOption(SocketOption.broadcast, true);
  
  print('Broadcast enabled on UDP socket');
  socket.close();
}

We create a UDP socket and enable broadcast capability. This allows sending
packets to the broadcast address of the local network.

$ dart main.dart
Broadcast enabled on UDP socket

## Configuring Keep-Alive

This example demonstrates enabling TCP keep-alive on a socket.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await Socket.connect('example.com', 80);
  
  // Enable TCP keep-alive
  socket.setOption(SocketOption.keepAlive, true);
  
  print('Keep-alive enabled');
  await socket.close();
}

TCP keep-alive periodically checks if the connection is still alive. This helps
detect broken connections when no data is being transmitted.

$ dart main.dart
Keep-alive enabled

## Setting Custom Socket Option

This example shows how to set a custom socket option not predefined in Dart.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await Socket.connect('example.com', 80);
  
  // Create custom socket option (IP_TOS on Linux)
  var customOption = SocketOption(SocketOption.levelIP, 1, 0x10);
  socket.setOption(customOption, true);
  
  print('Custom socket option set');
  await socket.close();
}

We create a custom socket option by specifying level, option name, and value.
This example sets the IP Type of Service (TOS) field for quality of service.

$ dart main.dart
Custom socket option set

## Configuring Socket Buffer Sizes

This example demonstrates setting socket send and receive buffer sizes.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await Socket.connect('example.com', 80);
  
  // Set buffer sizes
  socket.setOption(SocketOption.sendBufferSize, 8192);
  socket.setOption(SocketOption.receiveBufferSize, 16384);
  
  print('Socket buffer sizes configured');
  await socket.close();
}

We configure the socket's send and receive buffer sizes. Larger buffers can
improve performance for high-bandwidth connections but use more memory.

$ dart main.dart
Socket buffer sizes configured

## Best Practices

- **Set early:** Configure options immediately after socket creation

- **Check support:** Some options may not be available on all platforms

- **Document:** Clearly document custom socket options

- **Test:** Verify option effects in your specific environment

## Source

[Dart SocketOption Documentation](https://api.dart.dev/stable/dart-io/SocketOption-class.html)

This tutorial covered Dart's SocketOption class with practical examples showing
common socket configurations and custom options for network programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).