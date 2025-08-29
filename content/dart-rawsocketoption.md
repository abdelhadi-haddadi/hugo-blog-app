+++
title = "Dart RawSocketOption"
date = 2025-08-29T19:52:17.195+01:00
draft = false
description = "Dart RawSocketOption tutorial shows how to configure low-level socket options in Dart using the RawSocketOption class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawSocketOption

last modified April 4, 2025

The RawSocketOption class in Dart provides low-level access to
socket configuration options. It's used with RawSocket for custom network
protocol implementations.

RawSocketOption allows setting platform-specific socket options not exposed
through higher-level APIs. It's part of Dart's dart:io library.

## Basic Definition

RawSocketOption represents a socket option that can be set or
queried on a RawSocket. It encapsulates both the option level and name.

Key properties include option level (SOL_SOCKET, IPPROTO_TCP etc.), option
name, and value type. Options affect socket behavior at the OS level.

## Enabling Socket Reuse

This example demonstrates enabling SO_REUSEADDR to allow address reuse.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('localhost', 8080);
  
  var reuseAddr = RawSocketOption.fromInt(
    SocketOption.SOL_SOCKET,
    SocketOption.SO_REUSEADDR,
    1 // enable
  );
  
  socket.setOption(reuseAddr);
  print('SO_REUSEADDR set to 1');
  
  socket.close();
}

We create a socket and enable SO_REUSEADDR to allow binding to addresses
in TIME_WAIT state. This is useful for server sockets that restart frequently.

$ dart main.dart
SO_REUSEADDR set to 1

## Setting TCP Keepalive

This example configures TCP keepalive to detect dead connections.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('google.com', 80);
  
  var keepAlive = RawSocketOption.fromInt(
    SocketOption.SOL_SOCKET,
    SocketOption.SO_KEEPALIVE,
    1 // enable
  );
  
  socket.setOption(keepAlive);
  print('TCP Keepalive enabled');
  
  socket.close();
}

We enable SO_KEEPALIVE which causes TCP to periodically verify the connection
is still alive. This helps detect network failures without application traffic.

$ dart main.dart
TCP Keepalive enabled

## Configuring Receive Buffer Size

This example sets the socket receive buffer size for better performance.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('example.com', 80);
  
  var rcvBuf = RawSocketOption.fromInt(
    SocketOption.SOL_SOCKET,
    SocketOption.SO_RCVBUF,
    65536 // 64KB buffer
  );
  
  socket.setOption(rcvBuf);
  print('Receive buffer size set to 64KB');
  
  socket.close();
}

We configure SO_RCVBUF to increase the kernel receive buffer size. Larger
buffers improve throughput for high-bandwidth connections.

$ dart main.dart
Receive buffer size set to 64KB

## Disabling Nagle's Algorithm

This example disables Nagle's algorithm for low-latency communication.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('localhost', 9000);
  
  var noDelay = RawSocketOption.fromInt(
    SocketOption.IPPROTO_TCP,
    SocketOption.TCP_NODELAY,
    1 // disable Nagle
  );
  
  socket.setOption(noDelay);
  print('Nagle\'s algorithm disabled');
  
  socket.close();
}

TCP_NODELAY disables Nagle's algorithm which buffers small packets. This
reduces latency for interactive applications at the cost of more packets.

$ dart main.dart
Nagle's algorithm disabled

## Querying Socket Options

This example shows how to query current socket option values.

main.dart
  

import 'dart:io';

void main() async {
  var socket = await RawSocket.connect('example.com', 80);
  
  var queryRcvBuf = RawSocketOption(
    SocketOption.SOL_SOCKET,
    SocketOption.SO_RCVBUF,
    4 // buffer for int result
  );
  
  var bufSize = socket.getOption(queryRcvBuf);
  print('Current receive buffer size: ${bufSize.getInt32(0)} bytes');
  
  socket.close();
}

We create a RawSocketOption with a buffer to hold the result, then call
getOption to retrieve the current value. The buffer must be large enough.

$ dart main.dart
Current receive buffer size: 87380 bytes

## Best Practices

- **Platform awareness:** Options may behave differently across OSes

- **Error handling:** Check setOption/getOption return values

- **Documentation:** Consult OS docs for option specifics

- **Testing:** Verify option effects in your environment

## Source

[Dart RawSocketOption Documentation](https://api.dart.dev/stable/dart-io/RawSocketOption-class.html)

This tutorial covered Dart's RawSocketOption class with practical examples
showing common socket configurations for performance and reliability tuning.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).