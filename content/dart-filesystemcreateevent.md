+++
title = "Dart FileSystemCreateEvent"
date = 2025-08-29T19:51:46.815+01:00
draft = false
description = "Dart FileSystemCreateEvent tutorial shows how to handle file system creation events in Dart using the FileSystemCreateEvent class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemCreateEvent

last modified April 4, 2025

The FileSystemCreateEvent class in Dart represents file system
creation events. It's part of the file system watcher API in the
dart:io library.

This event is triggered when files or directories are created in a watched
directory. It provides information about the created file system entity.

## Basic Definition

FileSystemCreateEvent is a subclass of FileSystemEvent.
It contains details about newly created files or directories.

Key properties include the event type, path, and whether it's a directory.
The class helps monitor file system changes in real-time.

## Basic FileSystemCreateEvent Usage

This example shows how to watch for file creation events in a directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemCreateEvent) {
      print('Created: ${event.path}');
      print('Is directory: ${event.isDirectory}');
    }
  });
  
  // Trigger an event
  await File('${dir.path}/new_file.txt').create();
}

We create a directory watcher and listen for creation events. When a file is
created, the event handler prints its path and type.

$ dart main.dart
Created: watch_dir/new_file.txt
Is directory: false

## Differentiating File and Directory Creation

This example demonstrates distinguishing between file and directory creation.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemCreateEvent) {
      if (event.isDirectory) {
        print('Directory created: ${event.path}');
      } else {
        print('File created: ${event.path}');
      }
    }
  });
  
  // Trigger events
  await File('${dir.path}/file1.txt').create();
  await Directory('${dir.path}/subdir').create();
}

The example checks the isDirectory property to determine if the
created entity is a file or directory. Both types trigger the same event class.

$ dart main.dart
File created: watch_dir/file1.txt
Directory created: watch_dir/subdir

## Handling Multiple Events

This example shows handling multiple creation events with debouncing.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var debounceTimer;
  var watcher = dir.watch();
  
  watcher.listen((event) {
    if (event is FileSystemCreateEvent) {
      if (debounceTimer != null) {
        debounceTimer.cancel();
      }
      
      debounceTimer = Timer(Duration(milliseconds: 500), () {
        print('Creation event: ${event.path}');
      });
    }
  });
  
  // Create multiple files quickly
  for (var i = 0; i &lt; 5; i++) {
    await File('${dir.path}/file_$i.txt').create();
    await Future.delayed(Duration(milliseconds: 100));
  }
}

We use a debounce timer to handle rapid file creation events. This prevents
flooding when many files are created simultaneously.

$ dart main.dart
Creation event: watch_dir/file_4.txt

## Filtering Specific File Types

This example demonstrates filtering creation events by file extension.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemCreateEvent &amp;&amp; 
        !event.isDirectory &amp;&amp; 
        event.path.endsWith('.dart')) {
      print('Dart file created: ${event.path}');
    }
  });
  
  // Create different file types
  await File('${dir.path}/script.dart').create();
  await File('${dir.path}/data.json').create();
  await File('${dir.path}/test.dart').create();
}

We check both the event type and file extension to filter for specific creation
events. Only Dart file creations are logged in this example.

$ dart main.dart
Dart file created: watch_dir/script.dart
Dart file created: watch_dir/test.dart

## Watching Recursively

This example shows how to watch for creation events in subdirectories.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create(recursive: true);
  
  var watcher = dir.watch(recursive: true);
  watcher.listen((event) {
    if (event is FileSystemCreateEvent) {
      print('Created (recursive): ${event.path}');
    }
  });
  
  // Create nested structure
  await Directory('${dir.path}/subdir').create();
  await File('${dir.path}/subdir/file.txt').create();
}

By setting recursive: true, the watcher monitors all subdirectories.
Creation events from any level in the directory tree will be captured.

$ dart main.dart
Created (recursive): watch_dir/subdir
Created (recursive): watch_dir/subdir/file.txt

## Best Practices

- **Error handling:** Always handle watcher errors in your listeners

- **Resource cleanup:** Cancel watchers when no longer needed

- **Performance:** Avoid expensive operations in event handlers

- **Recursive:** Use recursive watching judiciously for large trees

## Source

[Dart FileSystemCreateEvent Documentation](https://api.dart.dev/stable/dart-io/FileSystemCreateEvent-class.html)

This tutorial covered Dart's FileSystemCreateEvent class with practical examples
showing file system monitoring, event filtering, and recursive watching.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).