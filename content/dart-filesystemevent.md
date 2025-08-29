+++
title = "Dart FileSystemEvent"
date = 2025-08-29T19:51:47.908+01:00
draft = false
description = "Dart FileSystemEvent tutorial shows how to monitor file system changes in Dart using the FileSystemEvent class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemEvent

last modified April 4, 2025

The FileSystemEvent class in Dart represents changes in the file
system. It's used with Directory.watch() to monitor files and directories.

FileSystemEvent provides information about create, modify, delete, and move
operations. It's part of Dart's dart:io library for I/O operations.

## Basic Definition

FileSystemEvent is an abstract class with concrete subclasses for
different event types. These include create, modify, delete, and move events.

Key properties include path, type, and (for move events) destination path.
Events are delivered asynchronously through streams from Directory.watch().

## Basic File Monitoring

This example shows basic file system monitoring using FileSystemEvent.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory.current;
  var watcher = dir.watch();
  
  await for (var event in watcher) {
    print('Event type: ${event.type}');
    print('Path: ${event.path}');
    
    if (event is FileSystemMoveEvent) {
      print('Destination: ${event.destination}');
    }
  }
}

We create a watcher for the current directory and listen for events.
The code prints event details, including special handling for move events.

$ dart main.dart
Event type: FileSystemEvent.create
Path: /path/to/newfile.txt

## Filtering Specific Event Types

This example demonstrates filtering for specific file system event types.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  
  await for (var event in watcher) {
    switch (event.type) {
      case FileSystemEvent.create:
        print('File created: ${event.path}');
        break;
      case FileSystemEvent.modify:
        print('File modified: ${event.path}');
        break;
      case FileSystemEvent.delete:
        print('File deleted: ${event.path}');
        break;
    }
  }
}

We watch a specific directory and handle different event types separately.
This allows customized responses to different file system operations.

$ dart main.dart
File created: watch_dir/test.txt
File modified: watch_dir/test.txt

## Handling Move Events

This example focuses on detecting and handling file move/rename operations.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  
  await for (var event in watcher) {
    if (event is FileSystemMoveEvent) {
      print('File moved/renamed:');
      print('From: ${event.path}');
      print('To: ${event.destination}');
      print('Is directory: ${event.isDirectory}');
    }
  }
}

Move events are special as they include both source and destination paths.
The isDirectory property indicates if the moved item is a file or directory.

$ dart main.dart
File moved/renamed:
From: watch_dir/old.txt
To: watch_dir/new.txt
Is directory: false

## Watching Recursively

This example shows how to monitor a directory and all its subdirectories.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create(recursive: true);
  
  var watcher = dir.watch(recursive: true);
  
  await for (var event in watcher) {
    print('Event in ${event.isDirectory ? 'directory' : 'file'}:');
    print('Path: ${event.path}');
    print('Type: ${event.type}');
  }
}

The recursive flag extends monitoring to all subdirectories.
We also check whether each event affects a file or directory.

$ dart main.dart
Event in directory:
Path: watch_dir/subdir
Type: FileSystemEvent.create

## Error Handling in File Watching

This example demonstrates proper error handling for file system watching.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var dir = Directory('nonexistent_dir');
    var watcher = dir.watch();
    
    await for (var event in watcher) {
      print('Event: ${event.type} at ${event.path}');
    }
  } on FileSystemException catch (e) {
    print('Error watching directory: ${e.message}');
  } catch (e) {
    print('Unexpected error: $e');
  }
}

We wrap the watch operation in try-catch blocks to handle potential errors.
This includes cases where the watched directory doesn't exist or isn't accessible.

$ dart main.dart
Error watching directory: Directory listing failed

## Best Practices

- **Resource cleanup:** Cancel subscriptions when no longer needed

- **Error handling:** Always handle potential I/O errors

- **Performance:** Be mindful of recursive watching on large trees

- **Event batching:** Some platforms may batch multiple changes

- **Cross-platform:** Behavior may vary between operating systems

## Source

[Dart FileSystemEvent Documentation](https://api.dart.dev/stable/dart-io/FileSystemEvent-class.html)

This tutorial covered Dart's FileSystemEvent class with practical examples
showing file system monitoring, event handling, and error management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).