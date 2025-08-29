+++
title = "Dart Stdin"
date = 2025-08-29T19:52:28.428+01:00
draft = false
description = "Dart Stdin tutorial shows how to read user input from console in Dart using the Stdin class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Stdin

last modified April 4, 2025

The Stdin class in Dart provides functionality to read input from
the standard input stream (typically the console). It's part of Dart's
dart:io library and is essential for console applications.

Stdin offers synchronous and asynchronous methods for reading input. It can
read bytes, lines, or transform input using various encodings.

## Basic Definition

Stdin represents the standard input stream of a Dart process.
It's accessed through stdin property of the dart:io
library's top-level functions.

Key features include line reading, byte reading, encoding support, and
asynchronous operations. It's crucial for interactive console applications.

## Reading a Single Line

This example shows how to read a single line of text from the console.

main.dart
  

import 'dart:io';

void main() {
  stdout.write('Enter your name: ');
  String name = stdin.readLineSync() ?? 'Unknown';
  print('Hello, $name!');
}

We use readLineSync() to read a line synchronously. The method
returns null if EOF is reached, so we provide a default value. stdout.write
prints without a newline.

$ dart main.dart
Enter your name: John
Hello, John!

## Reading Numbers

This example demonstrates reading and parsing numeric input.

main.dart
  

import 'dart:io';

void main() {
  stdout.write('Enter first number: ');
  var num1 = int.tryParse(stdin.readLineSync() ?? '0') ?? 0;
  
  stdout.write('Enter second number: ');
  var num2 = int.tryParse(stdin.readLineSync() ?? '0') ?? 0;
  
  print('Sum: ${num1 + num2}');
}

We read strings and convert them to integers. tryParse handles
invalid input by returning null, so we provide a fallback value. This makes
the program more robust against bad input.

$ dart main.dart
Enter first number: 12
Enter second number: 7
Sum: 19

## Asynchronous Line Reading

This example shows how to read input asynchronously.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  stdout.write('Enter your favorite color: ');
  var color = await stdin.readLine();
  
  stdout.write('Enter your age: ');
  var age = await stdin.readLine();
  
  print('$age-year-old who loves $color');
}

We use readLine() which returns a Future&lt;String&gt;.
The await keyword pauses execution until input is received. This
approach is non-blocking and better for complex applications.

$ dart main.dart
Enter your favorite color: blue
Enter your age: 25
25-year-old who loves blue

## Reading Raw Bytes

This example demonstrates reading raw bytes from standard input.

main.dart
  

import 'dart:io';

void main() {
  stdout.writeln('Press any key to continue...');
  var byte = stdin.readByteSync();
  print('You pressed: $byte (${String.fromCharCode(byte)})');
}

readByteSync() reads a single byte from input. We convert the
byte to its character representation. This is useful for low-level input
processing or single-key responses.

$ dart main.dart
Press any key to continue...
a
You pressed: 97 (a)

## Reading Until EOF

This example shows how to read multiple lines until end-of-file.

main.dart
  

import 'dart:io';

void main() {
  print('Enter multiple lines (Ctrl+D to end):');
  var lines = &lt;String&gt;[];
  
  while (true) {
    var line = stdin.readLineSync();
    if (line == null) break;
    lines.add(line);
  }
  
  print('You entered ${lines.length} lines:');
  lines.forEach(print);
}

We read lines in a loop until readLineSync() returns null (EOF).
The collected lines are stored in a list. This pattern is useful for processing
piped input or multi-line user input.

$ dart main.dart
Enter multiple lines (Ctrl+D to end):
hello
world
dart
You entered 3 lines:
hello
world
dart

## Best Practices

- **Error handling:** Always validate and sanitize user input

- **Async preference:** Use async methods in larger applications

- **Encoding:** Specify encoding when working with non-ASCII text

- **Prompting:** Always provide clear input prompts

## Source

[Dart Stdin Documentation](https://api.dart.dev/stable/dart-io/Stdin-class.html)

This tutorial covered Dart's Stdin class with practical examples showing
basic input reading, numeric parsing, async operations, and byte-level access.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).