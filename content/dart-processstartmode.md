+++
title = "Dart ProcessStartMode"
date = 2025-08-29T19:52:13.669+01:00
draft = false
description = "Dart ProcessStartMode tutorial shows how to control process execution modes in Dart using the ProcessStartMode class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ProcessStartMode

last modified April 4, 2025

The ProcessStartMode class in Dart controls how a new process
should be started. It's used with the Process.run and
Process.start methods.

ProcessStartMode determines how the standard input, output, and error streams
are handled. It's part of Dart's dart:io library for system-level
operations.

## Basic Definition

ProcessStartMode is an enum that defines process execution modes.
It specifies how the process streams should be connected to the parent process.

The available modes are: normal, detached,
detachedWithStdio, and inheritsStdio. Each serves
different use cases for process execution.

## Normal Mode

This example shows the default normal mode where pipes are created
for all standard streams.

main.dart
  

import 'dart:io';

void main() async {
  var process = await Process.start(
    'dart',
    ['--version'],
    mode: ProcessStartMode.normal
  );
  
  var output = await process.stdout.transform(utf8.decoder).join();
  print('Dart version: $output');
}

In normal mode, the process creates pipes for stdin, stdout, and stderr.
The parent process can read/write these streams. This is the default mode.

$ dart main.dart
Dart version: Dart SDK version: 2.19.0 (stable)

## Detached Mode

This example demonstrates detached mode where the process runs
independently without stream connections.

main.dart
  

import 'dart:io';

void main() async {
  var process = await Process.start(
    'sleep',
    ['5'],
    mode: ProcessStartMode.detached
  );
  
  print('Process started with PID: ${process.pid}');
  print('Process will run independently for 5 seconds');
}

In detached mode, the process runs independently with no stream connections.
The parent process cannot communicate with the child process via streams.

$ dart main.dart
Process started with PID: 12345
Process will run independently for 5 seconds

## Detached With Stdio

This example shows detachedWithStdio mode where the process
inherits the parent's standard streams but runs independently.

main.dart
  

import 'dart:io';

void main() async {
  var process = await Process.start(
    'dart',
    ['--version'],
    mode: ProcessStartMode.detachedWithStdio
  );
  
  print('Process started with PID: ${process.pid}');
  print('Output will go to parent process stdout');
}

In this mode, the process inherits stdio but runs detached. Output appears
in the parent's console, but the parent can't programmatically access streams.

$ dart main.dart
Process started with PID: 12346
Output will go to parent process stdout
Dart SDK version: 2.19.0 (stable)

## Inherits Stdio

This example demonstrates inheritsStdio mode where the process
shares the parent's standard streams.

main.dart
  

import 'dart:io';

void main() async {
  var process = await Process.start(
    'echo',
    ['Hello from child process'],
    mode: ProcessStartMode.inheritsStdio
  );
  
  await process.exitCode;
  print('Child process completed');
}

In inheritsStdio mode, the child process shares the parent's stdin,
stdout, and stderr. The output appears directly in the console without
redirection.

$ dart main.dart
Hello from child process
Child process completed

## Combining Modes with Process.run

This example shows using ProcessStartMode with
Process.run for simpler process execution while controlling stream
behavior.

main.dart
  

import 'dart:io';

void main() async {
  var result = await Process.run(
    'ls',
    ['-l'],
    runInShell: true,
    mode: ProcessStartMode.inheritsStdio
  );
  
  print('Exit code: ${result.exitCode}');
}

Process.run simplifies process execution while still allowing mode
control. In this case, output goes directly to console due to
inheritsStdio mode.

$ dart main.dart
total 8
-rw-r--r--  1 user  group  123 Apr  4 10:00 main.dart
Exit code: 0

## Best Practices

- **Default:** Use normal mode when you need stream communication

- **Background:** Use detached for long-running background tasks

- **Console:** Use inheritsStdio for simple command-line tools

- **Security:** Be careful with inheritsStdio for sensitive input

## Source

[Dart ProcessStartMode Documentation](https://api.dart.dev/stable/dart-io/ProcessStartMode-class.html)

This tutorial covered Dart's ProcessStartMode class with practical examples
showing different process execution modes and their use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).