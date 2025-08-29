+++
title = "Dart FileSystemDeleteEvent"
date = 2025-08-29T19:51:46.802+01:00
draft = false
description = "Dart FileSystemDeleteEvent tutorial shows how to monitor file system deletion events in Dart using the FileSystemDeleteEvent class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemDeleteEvent

last modified April 4, 2025

The FileSystemDeleteEvent class in Dart represents file system
deletion events. It's part of Dart's file system monitoring capabilities.

This event is triggered when files or directories are deleted from a watched
location. It provides details about the deleted file system entity.

## Basic Definition

FileSystemDeleteEvent is a subclass of FileSystemEvent.
It indicates that a file or directory has been deleted from the file system.

Key properties include the event type, path, and whether it's a directory.
These help identify what was deleted and where it was located.

## Basic FileSystemDeleteEvent Usage

This example shows how to watch for file deletion events in a directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemDeleteEvent) {
      print('Deleted: ${event.path}');
      print('Is directory: ${event.isDirectory}');
    }
  });
  
  // Simulate file deletion after delay
  await Future.delayed(Duration(seconds: 1));
  File('${dir.path}/test.txt').create().then((file) {
    Future.delayed(Duration(seconds: 1), () =&gt; file.delete());
  });
}

We create a directory watcher and listen for deletion events. When a file is
deleted, the event provides the path and type information.

$ dart main.dart
Deleted: watch_dir/test.txt
Is directory: false

## Handling Directory Deletion

This example demonstrates detecting directory deletion events.

main.dart
  

import 'dart:io';

void main() async {
  var parentDir = Directory('parent_dir');
  await parentDir.create();
  
  var watcher = parentDir.watch();
  watcher.listen((event) {
    if (event is FileSystemDeleteEvent &amp;&amp; event.isDirectory) {
      print('Directory deleted: ${event.path}');
    }
  });
  
  // Create and then delete a subdirectory
  var subDir = Directory('${parentDir.path}/sub_dir');
  await subDir.create();
  await Future.delayed(Duration(seconds: 1));
  await subDir.delete();
}

We watch for directory deletions specifically by checking the isDirectory
property. The event triggers when a subdirectory is removed.

$ dart main.dart
Directory deleted: parent_dir/sub_dir

## Multiple Event Types

This example shows distinguishing between different file system events.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('multi_event_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemDeleteEvent) {
      print('Delete event: ${event.path}');
    } else if (event is FileSystemCreateEvent) {
      print('Create event: ${event.path}');
    } else if (event is FileSystemModifyEvent) {
      print('Modify event: ${event.path}');
    }
  });
  
  // Trigger multiple events
  var file = File('${dir.path}/data.txt');
  await file.create();
  await file.writeAsString('content');
  await file.delete();
}

We handle different event types separately. The delete event fires when the
file is removed after creation and modification.

$ dart main.dart
Create event: multi_event_dir/data.txt
Modify event: multi_event_dir/data.txt
Delete event: multi_event_dir/data.txt

## Error Handling

This example adds error handling to file system watching.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('error_dir');
  
  try {
    var watcher = dir.watch();
    watcher.listen((event) {
      if (event is FileSystemDeleteEvent) {
        print('Deleted: ${event.path}');
      }
    }, onError: (error) {
      print('Error: $error');
    });
    
    // Simulate deletion of watched directory
    await dir.create();
    await Future.delayed(Duration(seconds: 1));
    await dir.delete();
  } catch (e) {
    print('Exception: $e');
  }
}

We handle both synchronous exceptions and asynchronous errors. The watcher
may error if the watched directory itself is deleted.

$ dart main.dart
Error: FileSystemException: Directory watching failed, path = 'error_dir'

## Recursive Watching

This example demonstrates recursive directory watching for deletions.

main.dart
  

import 'dart:io';

void main() async {
  var rootDir = Directory('root_dir');
  await rootDir.create();
  
  // Watch recursively
  var watcher = rootDir.watch(recursive: true);
  watcher.listen((event) {
    if (event is FileSystemDeleteEvent) {
      print('Deleted (recursive): ${event.path}');
    }
  });
  
  // Create and delete nested structure
  var nestedDir = Directory('${rootDir.path}/a/b/c');
  await nestedDir.create(recursive: true);
  var nestedFile = File('${nestedDir.path}/file.txt');
  await nestedFile.create();
  
  await Future.delayed(Duration(seconds: 1));
  await nestedFile.delete();
  await nestedDir.delete();
}

With recursive watching, we detect deletions at any level in the directory
tree. Events trigger for both files and directories in subfolders.

$ dart main.dart
Deleted (recursive): root_dir/a/b/c/file.txt
Deleted (recursive): root_dir/a/b/c

## Best Practices

- **Resource cleanup:** Always cancel watchers when done

- **Error handling:** Implement both try-catch and onError

- **Recursive wisely:** Use recursive mode only when needed

- **Event filtering:** Check event types before processing

- **Path handling:** Use absolute paths for reliable tracking

## Source

[Dart FileSystemDeleteEvent Documentation](https://api.dart.dev/stable/dart-io/FileSystemDeleteEvent-class.html)

This tutorial covered Dart's FileSystemDeleteEvent class with practical examples
showing file and directory deletion monitoring, error handling, and recursive
watching patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).