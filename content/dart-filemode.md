+++
title = "Dart FileMode"
date = 2025-08-29T19:51:45.705+01:00
draft = false
description = "Dart FileMode tutorial shows how to use different file handling modes in Dart using the FileMode class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileMode

last modified April 4, 2025

The FileMode class in Dart defines constants for file opening modes.
It's used with file operations to specify how a file should be opened.

FileMode is essential for controlling file access permissions and behavior.
It's part of Dart's dart:io library for file system operations.

## Basic Definition

FileMode is an enum-like class with constants for file operations.
It determines whether to read, write, append, or create files.

Key modes include read, write, append, and writeOnly. These control file
access and whether to create or truncate existing files.

## Reading a File

This example shows how to open a file in read-only mode using FileMode.read.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('example.txt');
  
  try {
    var contents = await file.open(mode: FileMode.read);
    var stream = contents.transform(utf8.decoder);
    
    await for (var line in stream) {
      print(line);
    }
    
    await contents.close();
  } catch (e) {
    print('Error: $e');
  }
}

We open a file in read mode and read its contents as a stream. FileMode.read
ensures we only have read access to the file. The file must exist for this mode.

$ dart main.dart
Hello, Dart!
This is a test file.

## Writing to a File

This example demonstrates writing to a file using FileMode.write.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('output.txt');
  
  try {
    var sink = file.openWrite(mode: FileMode.write);
    sink.write('First line\n');
    sink.write('Second line\n');
    await sink.close();
    
    print('File written successfully');
  } catch (e) {
    print('Error: $e');
  }
}

FileMode.write opens the file for writing, creating it if needed. If the file
exists, it's truncated to zero length first. We use openWrite for convenience.

$ dart main.dart
File written successfully

## Appending to a File

This example shows how to append content to an existing file.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('log.txt');
  
  try {
    var sink = file.openWrite(mode: FileMode.append);
    sink.write('${DateTime.now()}: New log entry\n');
    await sink.close();
    
    print('Log entry added');
  } catch (e) {
    print('Error: $e');
  }
}

FileMode.append opens the file for writing at the end. If the file doesn't exist,
it's created. Existing content is preserved and new content is added at the end.

$ dart main.dart
Log entry added

## Read-Write Access

This example demonstrates opening a file with both read and write access.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('data.txt');
  
  try {
    var raf = await file.open(mode: FileMode.writeOnlyAppend);
    await raf.writeString('Initial content\n');
    await raf.close();
    
    raf = await file.open(mode: FileMode.readWrite);
    var content = await raf.readString();
    await raf.writeString('Additional content\n');
    await raf.close();
    
    print('Updated content:\n$content');
  } catch (e) {
    print('Error: $e');
  }
}

FileMode.readWrite allows both reading and writing to the file. The file pointer
starts at the beginning, letting us read existing content before writing.

$ dart main.dart
Updated content:
Initial content

## Exclusive File Creation

This example shows how to create a new file exclusively.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('newfile.txt');
  
  try {
    var raf = await file.open(mode: FileMode.writeOnly);
    await raf.writeString('This is a new file\n');
    await raf.close();
    
    print('File created exclusively');
  } on FileSystemException catch (e) {
    print('Error: ${e.message}');
  }
}

FileMode.writeOnly creates a new file, failing if it already exists. This is
useful when you need to ensure you're not overwriting an existing file.

$ dart main.dart
File created exclusively

## Best Practices

- **Choose carefully:** Select the mode that matches your needs

- **Error handling:** Always handle potential file system errors

- **Resource cleanup:** Close files when done to release resources

- **Atomic operations:** Use appropriate modes for data safety

## Source

[Dart FileMode Documentation](https://api.dart.dev/stable/dart-io/FileMode-class.html)

This tutorial covered Dart's FileMode class with practical examples showing
different file access patterns and their appropriate use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).