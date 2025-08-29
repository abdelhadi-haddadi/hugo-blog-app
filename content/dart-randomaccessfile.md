+++
title = "Dart RandomAccessFile"
date = 2025-08-29T19:52:14.798+01:00
draft = false
description = "Dart RandomAccessFile tutorial shows how to perform random access file operations in Dart using the RandomAccessFile class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RandomAccessFile

last modified April 4, 2025

The RandomAccessFile class in Dart provides random access to files.
It allows reading and writing at specific positions within a file.

RandomAccessFile is part of Dart's dart:io library. It supports
asynchronous operations and is essential for advanced file manipulation.

## Basic Definition

RandomAccessFile represents a file opened for random access.
It provides methods for reading, writing, and seeking within the file.

Key features include position manipulation, synchronous/asynchronous operations,
and direct byte access. It's particularly useful for binary file operations.

## Opening and Reading a File

This example shows how to open a file and read its contents.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('data.txt');
  var raf = await file.open(mode: FileMode.read);
  
  var contents = await raf.read(await raf.length());
  print(String.fromCharCodes(contents));
  
  await raf.close();
}

We open a file in read mode, read its entire contents, then close it.
The read operation returns bytes which we convert to a string.

$ dart main.dart
File contents here...

## Writing to a File

This example demonstrates writing data to a file at specific positions.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('output.dat');
  var raf = await file.open(mode: FileMode.write);
  
  await raf.writeFrom([65, 66, 67]); // ABC
  await raf.setPosition(0);
  await raf.writeFrom([68, 69]); // DE
  
  await raf.close();
}

We open a file in write mode, write some bytes, then overwrite the beginning.
The setPosition method moves the file pointer to the specified offset.

$ dart main.dart
$ hexdump output.dat
0000000 44 45 43

## Seeking and Reading

This example shows how to seek to specific positions and read data.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('data.bin');
  var raf = await file.open(mode: FileMode.read);
  
  await raf.setPosition(10);
  var data = await raf.read(4);
  
  print('Data at position 10-13: $data');
  await raf.close();
}

We open a binary file, seek to position 10, then read 4 bytes from that point.
This demonstrates random access capabilities of the class.

$ dart main.dart
Data at position 10-13: [1, 2, 3, 4]

## File Locking

This example demonstrates file locking during operations.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('shared.dat');
  var raf = await file.open(mode: FileMode.append);
  
  await raf.lock();
  try {
    await raf.writeFrom([1, 2, 3]);
  } finally {
    await raf.unlock();
    await raf.close();
  }
}

We acquire an exclusive lock before writing to prevent concurrent access.
The lock is released in a finally block to ensure it always happens.

$ dart main.dart

## Reading and Writing Structures

This example shows reading and writing structured binary data.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  var file = File('records.dat');
  var raf = await file.open(mode: FileMode.write);
  
  // Write a record
  var buffer = ByteData(8);
  buffer.setInt32(0, 1234);
  buffer.setFloat32(4, 56.78);
  await raf.writeFrom(buffer.buffer.asUint8List());
  
  // Read it back
  await raf.setPosition(0);
  var data = await raf.read(8);
  var reader = ByteData.view(data.buffer);
  
  print('Int: ${reader.getInt32(0)}');
  print('Float: ${reader.getFloat32(4)}');
  
  await raf.close();
}

We write a structured record containing an integer and float, then read it back.
ByteData is used to handle different data types in the binary file.

$ dart main.dart
Int: 1234
Float: 56.78

## Best Practices

- **Always close:** Ensure files are closed after use

- **Error handling:** Use try-catch for file operations

- **Buffering:** Consider buffering for small writes

- **Positioning:** Be mindful of position changes

## Source

[Dart RandomAccessFile Documentation](https://api.dart.dev/stable/dart-io/RandomAccessFile-class.html)

This tutorial covered Dart's RandomAccessFile class with practical examples
showing file operations, positioning, locking, and structured data handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).