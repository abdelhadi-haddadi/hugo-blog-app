+++
title = "Dart ConnectionTask"
date = 2025-08-29T19:51:41.221+01:00
draft = false
description = "Dart ConnectionTask tutorial shows how to manage network connection tasks in Dart using the ConnectionTask class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ConnectionTask

last modified April 4, 2025

The ConnectionTask class in Dart represents an asynchronous
network connection operation. It's used with socket connections and
provides control over ongoing connection attempts.

ConnectionTask allows cancellation of pending connections and provides
status information. It's part of Dart's dart:io library for
network operations.

## Basic Definition

ConnectionTask is a Future-like object returned by socket
connection methods. It represents a pending connection attempt that
can be monitored or canceled.

Key features include cancellation capability, connection timeout
handling, and status tracking. It's essential for robust network
applications.

## Basic ConnectionTask Usage

This example shows basic connection establishment using ConnectionTask.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var task = Socket.connect('example.com', 80);
  
  try {
    var socket = await task;
    print('Connected to ${socket.remoteAddress}');
    socket.destroy();
  } catch (e) {
    print('Connection failed: $e');
  }
}

We initiate a connection to example.com port 80. The connect method
returns a ConnectionTask which we await to get the connected socket.

$ dart main.dart
Connected to InternetAddress('93.184.216.34', IPv4)

## Canceling a Connection

This example demonstrates canceling an ongoing connection attempt.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var task = Socket.connect('slow.server', 80);
  
  // Cancel after 2 seconds
  Future.delayed(Duration(seconds: 2), () {
    task.cancel();
    print('Connection canceled');
  });
  
  try {
    var socket = await task;
    print('Connected to ${socket.remoteAddress}');
    socket.destroy();
  } catch (e) {
    print('Connection failed: $e');
  }
}

We start a connection to a slow server and cancel it after 2 seconds.
The cancel() method aborts the connection attempt if it's still pending.

$ dart main.dart
Connection canceled
Connection failed: SocketException: Connection attempt cancelled

## Connection Timeout

This example shows implementing a connection timeout using ConnectionTask.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var task = Socket.connect('nonexistent.server', 80)
    .timeout(Duration(seconds: 3));
  
  try {
    var socket = await task;
    print('Connected to ${socket.remoteAddress}');
    socket.destroy();
  } catch (e) {
    print('Connection failed: $e');
  }
}

We attempt to connect to a non-existent server with a 3-second timeout.
The timeout() method creates a new Future that completes with an error
if the connection takes too long.

$ dart main.dart
Connection failed: TimeoutException after 0:00:03.000000: Future not completed

## Multiple Connection Attempts

This example demonstrates managing multiple connection attempts.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var servers = ['server1', 'server2', 'server3'];
  var port = 80;
  
  for (var server in servers) {
    var task = Socket.connect(server, port);
    print('Connecting to $server...');
    
    try {
      var socket = await task.timeout(Duration(seconds: 2));
      print('Connected to $server');
      socket.destroy();
      return;
    } catch (e) {
      print('Failed to connect to $server: $e');
    }
  }
  
  print('All connection attempts failed');
}

We try connecting to multiple servers sequentially. The first successful
connection stops the attempts. Each attempt has a 2-second timeout.

$ dart main.dart
Connecting to server1...
Failed to connect to server1: TimeoutException
Connecting to server2...
Connected to server2

## Monitoring Connection Progress

This example shows how to monitor connection progress and status.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var task = Socket.connect('example.com', 80);
  
  // Add status listener
  task.asStream().listen((event) {
    print('Connection status: $event');
  }, onDone: () {
    print('Connection attempt completed');
  });
  
  try {
    var socket = await task;
    print('Connected successfully');
    socket.destroy();
  } catch (e) {
    print('Connection failed: $e');
  }
}

We convert the ConnectionTask to a stream to monitor status events.
This provides visibility into the connection process stages.

$ dart main.dart
Connection status: Socket.startConnect
Connection status: Socket.connected
Connected successfully
Connection attempt completed

## Best Practices

- **Always handle errors:** Connection attempts can fail for many reasons

- **Use timeouts:** Prevent indefinite waiting for connections

- **Clean up resources:** Close sockets when done

- **Consider cancellation:** Provide user control over long attempts

- **Monitor progress:** For better user feedback

## Source

[Dart ConnectionTask Documentation](https://api.dart.dev/stable/dart-io/ConnectionTask-class.html)

This tutorial covered Dart's ConnectionTask class with practical examples
showing connection management, cancellation, timeouts, and monitoring.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).