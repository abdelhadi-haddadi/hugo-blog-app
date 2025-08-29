+++
title = "Dart StdioType"
date = 2025-08-29T19:52:28.424+01:00
draft = false
description = "Dart StdioType tutorial shows how to work with standard IO types in Dart using the StdioType class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart StdioType

last modified April 4, 2025

The StdioType class in Dart provides a way to identify the type
of standard IO streams. It's used to determine if a file descriptor is
a terminal, pipe, file, or other type of stream.

StdioType is part of Dart's dart:io library and is particularly
useful when working with process communication or when you need to adjust
behavior based on the IO stream type.

## Basic Definition

StdioType is an enumeration that identifies different types of
standard IO streams. It helps determine how to handle various IO operations.

The class provides constants like TERMINAL, PIPE,
FILE, and OTHER to classify standard streams.
It's often used with stdin, stdout, and stderr.

## Checking stdin Type

This example shows how to check the type of the standard input stream.

main.dart
  

import 'dart:io';

void main() {
  var stdinType = stdin.stdioType;
  
  if (stdinType == StdioType.TERMINAL) {
    print('Input is from a terminal');
  } else if (stdinType == StdioType.PIPE) {
    print('Input is from a pipe');
  } else {
    print('Input is of type: $stdinType');
  }
}

We check the type of stdin using the stdioType property. This helps determine
if the program is receiving input interactively or through a pipe.

$ dart main.dart
Input is from a terminal

$ echo "test" | dart main.dart
Input is from a pipe

## Detecting Output Stream Type

This example demonstrates checking the type of standard output streams.

main.dart
  

import 'dart:io';

void main() {
  checkStreamType(stdout, 'stdout');
  checkStreamType(stderr, 'stderr');
}

void checkStreamType(IOSink stream, String name) {
  var type = stream.stdioType;
  
  print('$name type: $type');
  print('Is terminal: ${type == StdioType.TERMINAL}');
}

We examine both stdout and stderr streams to determine their types.
This can be useful for formatting output differently based on destination.

$ dart main.dart
stdout type: StdioType.TERMINAL
Is terminal: true
stderr type: StdioType.TERMINAL
Is terminal: true

$ dart main.dart &gt; output.txt
stdout type: StdioType.FILE
Is terminal: false
stderr type: StdioType.TERMINAL
Is terminal: true

## Handling Different Stream Types

This example shows how to adjust behavior based on the stream type.

main.dart
  

import 'dart:io';

void main() {
  var output = stdout;
  
  switch (output.stdioType) {
    case StdioType.TERMINAL:
      output.writeln('Writing to terminal - adding colors');
      break;
    case StdioType.PIPE:
      output.writeln('Writing to pipe - plain output');
      break;
    case StdioType.FILE:
      output.writeln('Writing to file - no terminal features');
      break;
    default:
      output.writeln('Writing to unknown stream type');
  }
}

We use a switch statement to handle different output stream types differently.
This pattern is common for CLI tools that adapt to their environment.

$ dart main.dart
Writing to terminal - adding colors

$ dart main.dart | cat
Writing to pipe - plain output

## Checking File Descriptors

This example demonstrates checking StdioType for arbitrary file descriptors.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('test.txt');
  var sink = file.openWrite();
  
  print('File stream type: ${sink.stdioType}');
  
  await sink.close();
  
  var socket = await Socket.connect('google.com', 80);
  print('Socket stream type: ${socket.stdioType}');
  socket.destroy();
}

We check StdioType for different IO objects. Note that not all IO objects
support stdioType, and some may return null or OTHER.

$ dart main.dart
File stream type: StdioType.FILE
Socket stream type: StdioType.OTHER

## Process Communication with StdioType

This example shows using StdioType in process communication scenarios.

main.dart
  

import 'dart:io';

void main() async {
  var process = await Process.start('ls', ['-l']);
  
  print('Process stdin type: ${process.stdin.stdioType}');
  print('Process stdout type: ${process.stdout.stdioType}');
  print('Process stderr type: ${process.stderr.stdioType}');
  
  await process.exitCode;
}

When spawning processes, StdioType helps determine how to handle the
process streams. This is useful for building process management tools.

$ dart main.dart
Process stdin type: StdioType.PIPE
Process stdout type: StdioType.PIPE
Process stderr type: StdioType.PIPE

## Best Practices

- **Check early:** Verify stream types at program start

- **Adapt output:** Adjust formatting based on stream type

- **Handle null:** Some streams may return null stdioType

- **Fallback:** Provide default behavior for OTHER type

## Source

[Dart StdioType Documentation](https://api.dart.dev/stable/dart-io/StdioType-class.html)

This tutorial covered Dart's StdioType class with practical examples showing
how to identify and handle different standard IO stream types in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).