+++
title = "Dart File Class"
date = 2025-08-29T19:51:45.711+01:00
draft = false
description = "Dart File tutorial shows how to perform file operations in Dart using the File class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart File Class

last modified April 4, 2025

The File class in Dart provides methods for working with files.
It allows reading, writing, and manipulating file contents and metadata.

File operations are asynchronous by default, using Dart's Future API.
The class is part of Dart's dart:io library for server-side apps.

## Basic Definition

File represents a reference to a file in the file system.
It provides both synchronous and asynchronous methods for file operations.

Key features include reading/writing text/binary data, file metadata access,
and file manipulation like copying or deleting. It works with both relative
and absolute paths.

## Reading a Text File

This example shows how to read the contents of a text file asynchronously.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('example.txt');
  
  try {
    var contents = await file.readAsString();
    print(contents);
  } catch (e) {
    print('Error reading file: $e');
  }
}

We create a File object pointing to 'example.txt', then read its contents.
The readAsString() method returns a Future that completes with the file's text.

$ dart main.dart
Hello from example.txt

## Writing to a File

This example demonstrates writing text to a file asynchronously.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('output.txt');
  
  try {
    await file.writeAsString('Dart File example\n', mode: FileMode.append);
    print('File written successfully');
  } catch (e) {
    print('Error writing file: $e');
  }
}

We open 'output.txt' in append mode and add a line of text. FileMode.append
ensures new content is added to the end rather than overwriting existing data.

$ dart main.dart
File written successfully

## Reading File Metadata

This example shows how to get information about a file.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('example.txt');
  
  try {
    var stat = await file.stat();
    print('File size: ${stat.size} bytes');
    print('Modified: ${stat.modified}');
    print('Accessed: ${stat.accessed}');
  } catch (e) {
    print('Error getting file stats: $e');
  }
}

The stat() method returns a FileStat object containing file metadata.
This includes size, modification time, and access time information.

$ dart main.dart
File size: 24 bytes
Modified: 2025-04-04 10:30:45.000
Accessed: 2025-04-04 10:35:12.000

## Copying and Deleting Files

This example demonstrates file manipulation operations.

main.dart
  

import 'dart:io';

void main() async {
  var source = File('source.txt');
  var dest = File('backup.txt');
  
  try {
    await source.copy(dest.path);
    print('File copied successfully');
    
    await dest.delete();
    print('Backup file deleted');
  } catch (e) {
    print('Error manipulating files: $e');
  }
}

We copy source.txt to backup.txt, then delete the backup file.
Both operations are asynchronous and return Futures that complete when done.

$ dart main.dart
File copied successfully
Backup file deleted

## Reading Binary Data

This example shows how to read a file as bytes.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('image.png');
  
  try {
    var bytes = await file.readAsBytes();
    print('Read ${bytes.length} bytes');
    print('First byte: ${bytes[0]}');
  } catch (e) {
    print('Error reading binary file: $e');
  }
}

The readAsBytes() method reads the entire file into a Uint8List.
This is useful for binary files like images where text reading isn't appropriate.

$ dart main.dart
Read 1024 bytes
First byte: 137

## Best Practices

- **Error handling:** Always handle potential IO errors

- **Async operations:** Prefer async methods for better performance

- **Resource cleanup:** Close streams when done with them

- **Path handling:** Use path.join() for cross-platform paths

## Source

[Dart File Documentation](https://api.dart.dev/stable/dart-io/File-class.html)

This tutorial covered Dart's File class with practical examples showing common
file operations including reading, writing, and file manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).