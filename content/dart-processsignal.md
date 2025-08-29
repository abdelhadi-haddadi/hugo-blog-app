+++
title = "Dart ProcessSignal"
date = 2025-08-29T19:52:13.667+01:00
draft = false
description = "Dart ProcessSignal tutorial shows how to handle process signals in Dart using the ProcessSignal class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ProcessSignal

last modified April 4, 2025

The ProcessSignal class in Dart provides a way to handle operating
system process signals. It allows graceful shutdown and custom signal handling.

Process signals are notifications sent to a program by the operating system.
Common signals include SIGINT (Ctrl+C) and SIGTERM (termination request).

## Basic Definition

ProcessSignal represents operating system signals that can be sent
to a process. It's part of Dart's dart:io library for server-side
applications.

Key features include signal watching, graceful shutdown handling, and platform-
specific signal support. Not all signals are available on all platforms.

## Handling SIGINT (Ctrl+C)

This example shows basic SIGINT (Ctrl+C) signal handling in Dart.

main.dart
  

import 'dart:io';

void main() async {
  ProcessSignal.sigint.watch().listen((signal) {
    print('\nReceived SIGINT (signal $signal)');
    print('Performing cleanup...');
    exit(0);
  });

  print('Press Ctrl+C to send SIGINT');
  await Future.delayed(Duration(minutes: 1));
}

We set up a listener for SIGINT signals. When Ctrl+C is pressed, our handler
executes cleanup code before exiting. The program waits for user input.

$ dart main.dart
Press Ctrl+C to send SIGINT
^C
Received SIGINT (signal ProcessSignal_SIGINT)
Performing cleanup...

## Handling Multiple Signals

This example demonstrates handling multiple signals with one listener.

main.dart
  

import 'dart:io';

void main() async {
  final signals = [ProcessSignal.sigterm, ProcessSignal.sighup];
  
  for (var signal in signals) {
    signal.watch().listen((_) {
      print('Received ${signal.toString()}');
      exit(0);
    });
  }

  print('Running (PID: ${pid})');
  print('Send SIGTERM or SIGHUP to terminate');
  await Future.delayed(Duration(minutes: 1));
}

We create listeners for both SIGTERM and SIGHUP signals. Either signal will
trigger the same shutdown procedure. The program displays its process ID.

$ dart main.dart
Running (PID: 12345)
Send SIGTERM or SIGHUP to terminate
Received ProcessSignal_SIGTERM

## Graceful Shutdown

This example implements a graceful shutdown with cleanup operations.

main.dart
  

import 'dart:io';

class Server {
  Future&lt;void&gt; cleanup() async {
    print('Closing database connections...');
    await Future.delayed(Duration(seconds: 1));
    print('Saving state...');
    await Future.delayed(Duration(seconds: 1));
    print('Cleanup complete');
  }
}

void main() async {
  final server = Server();
  
  ProcessSignal.sigterm.watch().listen((_) async {
    print('\nShutdown initiated');
    await server.cleanup();
    exit(0);
  });

  print('Server running (PID: ${pid})');
  print('Send SIGTERM to terminate gracefully');
  await Future.delayed(Duration(minutes: 1));
}

We create a server class with cleanup operations. When SIGTERM is received,
it performs async cleanup before exiting. This ensures data integrity.

$ dart main.dart
Server running (PID: 12345)
Send SIGTERM to terminate gracefully
Shutdown initiated
Closing database connections...
Saving state...
Cleanup complete

## Ignoring Signals

This example shows how to ignore certain signals in your application.

main.dart
  

import 'dart:io';

void main() async {
  // Ignore SIGINT (Ctrl+C)
  ProcessSignal.sigint.watch().listen((_) {
    print('\nSIGINT ignored (use SIGTERM to terminate)');
  });

  ProcessSignal.sigterm.watch().listen((_) {
    print('\nReceived SIGTERM - shutting down');
    exit(0);
  });

  print('Running (PID: ${pid})');
  print('Try Ctrl+C - it will be ignored');
  await Future.delayed(Duration(minutes: 1));
}

We ignore SIGINT (Ctrl+C) while still handling SIGTERM. This creates a more
controlled shutdown process requiring specific termination signals.

$ dart main.dart
Running (PID: 12345)
Try Ctrl+C - it will be ignored
^C
SIGINT ignored (use SIGTERM to terminate)
Received SIGTERM - shutting down

## Platform-Specific Signals

This example demonstrates platform-specific signal handling in Dart.

main.dart
  

import 'dart:io';

void main() async {
  // Platform-specific signals
  final signals = [
    if (Platform.isLinux || Platform.isMacOS) ProcessSignal.sigusr1,
    if (Platform.isWindows) ProcessSignal.sigbreak,
  ];

  for (var signal in signals) {
    signal.watch().listen((_) {
      print('Received ${signal.toString()}');
      // Custom handling for each signal
    });
  }

  print('Running on ${Platform.operatingSystem}');
  print('Send platform-specific signals');
  await Future.delayed(Duration(minutes: 1));
}

We handle different signals based on the platform. Linux/macOS uses SIGUSR1,
while Windows uses SIGBREAK. The code adapts to the current platform.

$ dart main.dart
Running on linux
Send platform-specific signals
Received ProcessSignal_SIGUSR1

## Best Practices

- **Clean shutdown:** Always perform cleanup in signal handlers

- **Async handling:** Use async/await for cleanup operations

- **Platform awareness:** Check signal availability per platform

- **Signal documentation:** Document expected signals in your app

## Source

[Dart ProcessSignal Documentation](https://api.dart.dev/stable/dart-io/ProcessSignal-class.html)

This tutorial covered Dart's ProcessSignal class with practical examples showing
signal handling, graceful shutdowns, and platform-specific considerations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).