+++
title = "Dart IOSink"
date = 2025-08-29T19:52:01.399+01:00
draft = false
description = "Dart IOSink tutorial shows how to perform stream-based I/O operations in Dart using the IOSink class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart IOSink

last modified April 4, 2025

The IOSink class in Dart provides a stream-based interface for
performing I/O operations. It's commonly used for writing to files, sockets,
and other byte-oriented sinks.

IOSink implements the StreamSink interface and provides methods
for both synchronous and asynchronous writing. It's part of Dart's core
dart:io library.

## Basic Definition

IOSink is an abstract class that represents a destination for
byte data. It provides methods to write data and manage the output stream.

Key features include buffered writing, encoding support, and stream control.
It's used with files, stdout, and network sockets in Dart applications.

## Basic IOSink Usage

This example shows basic file writing using IOSink.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('output.txt');
  var sink = file.openWrite();
  
  sink.write('Hello, ');
  sink.writeln('Dart!');
  
  await sink.close();
  print('File written successfully');
}

We create a file sink, write text to it, and properly close the resource.
The openWrite method returns an IOSink for file operations.

$ dart main.dart
File written successfully

## Writing Different Data Types

This example demonstrates writing various data types to a sink.

main.dart
  

import 'dart:io';

void main() async {
  var sink = stdout;
  
  sink.write('String: ');
  sink.writeln('Dart');
  
  sink.write('Integer: ');
  sink.writeln(42);
  
  sink.write('Double: ');
  sink.writeln(3.14);
  
  sink.write('Boolean: ');
  sink.writeln(true);
  
  await sink.flush();
}

IOSink provides methods to write different data types with automatic
conversion to strings. We use stdout as the sink in this example.

$ dart main.dart
String: Dart
Integer: 42
Double: 3.14
Boolean: true

## Buffered Writing

This example shows how IOSink handles buffered writing.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('buffered.txt');
  var sink = file.openWrite();
  
  for (var i = 1; i &lt;= 10; i++) {
    sink.write('Line $i\n');
    if (i % 5 == 0) {
      await sink.flush();
      print('Flushed at line $i');
    }
  }
  
  await sink.close();
}

The sink buffers writes for efficiency. We manually flush every 5 lines
to demonstrate buffer control. Normally, closing the sink flushes automatically.

$ dart main.dart
Flushed at line 5
Flushed at line 10

## Error Handling

This example demonstrates proper error handling with IOSink.

main.dart
  

import 'dart:io';

void main() async {
  var sink = File('nonexistent/path/output.txt').openWrite();
  
  try {
    sink.write('Test data');
    await sink.close();
  } on IOException catch (e) {
    print('Error writing file: $e');
    await sink.close();
  }
}

We handle potential I/O errors when writing to a file. The sink is properly
closed in both success and error cases to prevent resource leaks.

$ dart main.dart
Error writing file: FileSystemException: Cannot open file, path = 'nonexistent/path/output.txt' (OS Error: No such file or directory, errno = 2)

## Using with Encoding

This example shows how to specify character encoding when writing.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var file = File('encoded.txt');
  var sink = file.openWrite(encoding: latin1);
  
  sink.write('Special chars: ñçá');
  await sink.close();
  
  var content = await file.readAsString(encoding: latin1);
  print(content);
}

We specify Latin-1 encoding when creating the sink to handle special
characters correctly. The same encoding is used when reading back the file.

$ dart main.dart
Special chars: ñçá

## Best Practices

- **Always close:** Ensure sinks are properly closed

- **Use await:** Await close/flush operations

- **Handle errors:** Implement error handling for I/O operations

- **Specify encoding:** Set encoding when working with text

- **Consider buffering:** Use flush strategically for large writes

## Source

[Dart IOSink Documentation](https://api.dart.dev/stable/dart-io/IOSink-class.html)

This tutorial covered Dart's IOSink class with practical examples
showing file operations, stdout writing, buffering, and error handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).