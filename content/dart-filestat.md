+++
title = "Dart FileStat"
date = 2025-08-29T19:51:46.811+01:00
draft = false
description = "Dart FileStat tutorial shows how to access file system statistics in Dart using the FileStat class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileStat

last modified April 4, 2025

The FileStat class in Dart provides file system statistics for
files and directories. It's part of the dart:io library and
offers metadata about file system entities.

FileStat includes information like file size, modification time, and type.
It's useful for file management, synchronization, and monitoring operations.

## Basic Definition

FileStat is an immutable class representing file system statistics.
It's obtained through the FileSystemEntity.stat() method.

Key properties include type, size, and modification time. The class helps
determine file existence, permissions, and other attributes without opening.

## Getting Basic File Statistics

This example shows how to get basic file statistics using FileStat.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('example.txt');
  await file.writeAsString('Hello, Dart!');
  
  var stat = await file.stat();
  
  print('File type: ${stat.type}');
  print('File size: ${stat.size} bytes');
  print('Modified: ${stat.modified}');
}

We create a file, write some content, then retrieve its statistics. The
stat method returns a Future&lt;FileStat&gt; with the
file's metadata.

$ dart main.dart
File type: FileSystemEntityType.file
File size: 12 bytes
Modified: 2025-04-04 10:30:45.000

## Checking File Existence

This example demonstrates using FileStat to check if a file exists.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('nonexistent.txt');
  
  try {
    var stat = await file.stat();
    print('File exists: ${stat.type != FileSystemEntityType.notFound}');
  } catch (e) {
    print('File does not exist');
  }
}

We attempt to get statistics for a non-existent file. The stat() method
throws an exception if the file doesn't exist or isn't accessible.

$ dart main.dart
File does not exist

## Comparing File Modification Times

This example shows how to compare modification times of two files.

main.dart
  

import 'dart:io';

void main() async {
  var file1 = File('file1.txt');
  var file2 = File('file2.txt');
  
  await file1.writeAsString('First file');
  await Future.delayed(Duration(seconds: 1));
  await file2.writeAsString('Second file');
  
  var stat1 = await file1.stat();
  var stat2 = await file2.stat();
  
  if (stat1.modified.isBefore(stat2.modified)) {
    print('file1 was modified before file2');
  } else {
    print('file2 was modified before file1');
  }
}

We create two files with a delay between them, then compare their
modification times. This is useful for synchronization scenarios.

$ dart main.dart
file1 was modified before file2

## Getting Directory Statistics

This example demonstrates getting statistics for a directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('test_dir');
  await dir.create();
  
  var stat = await dir.stat();
  
  print('Type: ${stat.type}');
  print('Modified: ${stat.modified}');
  print('Size: ${stat.size}'); // Directories may report 0 size
}

We create a directory and retrieve its statistics. Note that directory
sizes may report as 0 on some platforms, as they don't include contents.

$ dart main.dart
Type: FileSystemEntityType.directory
Modified: 2025-04-04 10:32:10.000
Size: 0

## Symbolic Link Statistics

This example shows how to get statistics for a symbolic link.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('target.txt');
  await file.writeAsString('Target file content');
  
  var link = Link('link.txt');
  await link.create(file.path);
  
  var stat = await link.stat();
  
  print('Link type: ${stat.type}');
  print('Link size: ${stat.size}');
  
  // To get the target's stats, use followLinks: true
  var targetStat = await link.stat(followLinks: true);
  print('Target size: ${targetStat.size}');
}

We create a symbolic link and examine its statistics. With followLinks: false,
we get the link's own stats. With followLinks: true, we get the target's stats.

$ dart main.dart
Link type: FileSystemEntityType.link
Link size: 10
Target size: 20

## Best Practices

- **Caching:** Cache FileStat objects for frequently accessed files

- **Error handling:** Always handle potential IO exceptions

- **Performance:** Avoid unnecessary stat calls in performance-critical code

- **Cross-platform:** Be aware of platform differences in reported values

## Source

[Dart FileStat Documentation](https://api.dart.dev/stable/dart-io/FileStat-class.html)

This tutorial covered Dart's FileStat class with practical examples
showing file metadata access, existence checks, and special cases like
directories.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).