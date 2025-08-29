+++
title = "Dart Stdout"
date = 2025-08-29T19:52:28.433+01:00
draft = false
description = "Dart Stdout tutorial shows how to write output to the console in Dart using the Stdout class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Stdout

last modified April 4, 2025

The Stdout class in Dart provides methods for writing output to the
console. It's part of Dart's dart:io library and is essential for
command-line applications.

Stdout offers more control than basic print statements, including byte-level
writing, line control, and synchronous operations. It's the standard way to
interact with console output in Dart.

## Basic Definition

Stdout is an abstract class representing standard output. It's
typically accessed via stdout from the dart:io library.

Key features include text and byte writing, line control, and terminal
interaction. It supports both synchronous and asynchronous operations for
different use cases.

## Basic Stdout Usage

This example shows basic console output using Stdout.

main.dart
  

import 'dart:io';

void main() {
  stdout.write('Hello, ');
  stdout.write('Dart!');
  stdout.writeln();
  stdout.writeln('This is a new line');
  
  print('Using print() for comparison');
}

We use write() for continuous output and writeln() for
line-terminated output. Unlike print(), Stdout methods don't
automatically add newlines.

$ dart main.dart
Hello, Dart!
This is a new line
Using print() for comparison

## Writing Bytes to Stdout

This example demonstrates writing raw bytes to standard output.

main.dart
  

import 'dart:io';

void main() {
  // Write bytes directly
  stdout.add([72, 101, 108, 108, 111]); // 'Hello' in ASCII
  
  // Write a single byte
  stdout.writeByte(10); // Newline character
  
  // Write from a stream
  var stream = Stream.fromIterable([66, 121, 101]);
  stdout.addStream(stream).then((_) {
    stdout.writeln();
  });
}

We use add() for byte lists, writeByte() for single
bytes, and addStream() for asynchronous byte streams. This is
useful for binary data.

$ dart main.dart
Hello
Bye

## Controlling Line Behavior

This example shows different line-writing techniques with Stdout.

main.dart
  

import 'dart:io';

void main() {
  // Write without newline
  stdout.write('First line');
  
  // Force immediate output
  stdout.flush();
  
  // Write with newline
  stdout.writeln('Second line');
  
  // Write multiple lines
  stdout.writeAll(['Third', 'Fourth', 'Fifth'], '\n');
  stdout.writeln();
}

flush() ensures output is written immediately. writeAll()
writes multiple items with a separator. These methods provide precise control
over line endings.

$ dart main.dart
First lineSecond line
Third
Fourth
Fifth

## Checking Terminal Capabilities

This example demonstrates checking terminal properties before output.

main.dart
  

import 'dart:io';

void main() {
  if (stdout.hasTerminal) {
    print('Terminal width: ${stdout.terminalColumns}');
    print('Terminal height: ${stdout.terminalLines}');
    
    if (stdout.supportsAnsiEscapes) {
      stdout.writeln('\x1B[31mRed Text\x1B[0m');
    }
  } else {
    stdout.writeln('No terminal detected');
  }
}

We check for terminal presence, get dimensions, and test for ANSI escape support.
This helps create adaptive console applications that work in different
environments.

$ dart main.dart
Terminal width: 80
Terminal height: 24
Red Text

## Synchronous vs Asynchronous Writing

This example compares synchronous and asynchronous output methods.

main.dart
  

import 'dart:io';

void main() async {
  // Synchronous writing
  stdout.write('Sync 1 ');
  stdout.write('Sync 2 ');
  
  // Asynchronous writing
  await stdout.addStream(Stream.fromIterable([
    'Async 1 '.codeUnits,
    'Async 2 '.codeUnits
  ].expand((x) =&gt; x)));
  
  stdout.writeln();
  print('Done');
}

Synchronous writes execute immediately while asynchronous writes using
addStream() complete later. Mixing them requires care to maintain
output order.

$ dart main.dart
Sync 1 Sync 2 Async 1 Async 2 
Done

## Best Practices

- **Buffering:** Use flush() when immediate output is needed

- **Error handling:** Check hasTerminal for CLI apps

- **Performance:** Prefer bulk writes for large outputs

- **ANSI codes:** Verify supportsAnsiEscapes first

## Source

[Dart Stdout Documentation](https://api.dart.dev/stable/dart-io/Stdout-class.html)

This tutorial covered Dart's Stdout class with practical examples showing
basic output, byte writing, terminal control, and asynchronous operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).