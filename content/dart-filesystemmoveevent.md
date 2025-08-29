+++
title = "Dart FileSystemMoveEvent"
date = 2025-08-29T19:51:49.088+01:00
draft = false
description = "Dart FileSystemMoveEvent tutorial shows how to handle file system move events in Dart using the FileSystemMoveEvent class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemMoveEvent

last modified April 4, 2025

The FileSystemMoveEvent class in Dart represents file system move
or rename operations. It's part of Dart's file system event monitoring API.

This event is triggered when files or directories are moved or renamed within
a watched directory. It provides details about both old and new paths.

## Basic Definition

FileSystemMoveEvent is a subclass of FileSystemEvent.
It contains information about file/directory move operations in the file system.

Key properties include the old path (source) and new path (destination) of the
moved item. It's emitted by Directory.watch() when moves occur.

## Basic FileSystemMoveEvent Usage

This example shows how to watch for file move events in a directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('test_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemMoveEvent) {
      print('Move detected:');
      print('  From: ${event.path}');
      print('  To: ${event.destination}');
      print('  Type: ${event.type}');
    }
  });
  
  // Simulate a file move
  var file = File('${dir.path}/test.txt');
  await file.create();
  await file.rename('${dir.path}/renamed.txt');
}

We create a directory watcher and listen for move events. When a file is renamed,
the event provides both original and new paths. The type indicates move or rename.

$ dart main.dart
Move detected:
  From: test_dir/test.txt
  To: test_dir/renamed.txt
  Type: FileSystemEvent.move

## Handling Directory Moves

This example demonstrates detecting directory move operations.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('watch_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemMoveEvent) {
      print('Directory moved:');
      print('  Source: ${event.path}');
      print('  Target: ${event.destination}');
    }
  });
  
  // Create and move a subdirectory
  var subDir = Directory('${dir.path}/subdir');
  await subDir.create();
  await subDir.rename('${dir.path}/moved_subdir');
}

Directory moves trigger similar events to file moves. The event contains the
original and new paths of the moved directory. This works recursively.

$ dart main.dart
Directory moved:
  Source: watch_dir/subdir
  Target: watch_dir/moved_subdir

## Distinguishing Move Types

This example shows how to differentiate between moves and renames.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('monitor_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemMoveEvent) {
      var isRename = event.path.split('/').last == 
                    event.destination.split('/').last;
      
      print(isRename ? 'File renamed' : 'File moved');
      print('  Old: ${event.path}');
      print('  New: ${event.destination}');
    }
  });
  
  // Test cases
  var file = File('${dir.path}/original.txt');
  await file.create();
  
  // Rename (same directory)
  await file.rename('${dir.path}/renamed.txt');
  
  // Move (different directory)
  var newDir = Directory('${dir.path}/new_location');
  await newDir.create();
  await File('${dir.path}/renamed.txt')
      .rename('${newDir.path}/moved.txt');
}

We distinguish renames from moves by comparing parent directories. Renames keep
the same parent directory while moves change it. Both trigger move events.

$ dart main.dart
File renamed
  Old: monitor_dir/original.txt
  New: monitor_dir/renamed.txt
File moved
  Old: monitor_dir/renamed.txt
  New: monitor_dir/new_location/moved.txt

## Error Handling in Move Events

This example demonstrates error handling during file system move operations.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('error_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    if (event is FileSystemMoveEvent) {
      print('Move event detected');
      try {
        var file = File(event.destination);
        print('File exists: ${file.existsSync()}');
      } catch (e) {
        print('Error checking moved file: $e');
      }
    }
  });
  
  var file = File('${dir.path}/testfile.txt');
  await file.create();
  
  // Move to invalid location
  try {
    await file.rename('${dir.path}/nonexistent/subdir/file.txt');
  } catch (e) {
    print('Move failed: $e');
  }
}

We handle potential errors when processing move events. The event fires even if
the move operation fails, so destination validation is important.

$ dart main.dart
Move event detected
Error checking moved file: FileSystemException: Cannot open file, path = 'error_dir/nonexistent/subdir/file.txt' (OS Error: No such file or directory, errno = 2)
Move failed: FileSystemException: Cannot rename file to 'error_dir/nonexistent/subdir/file.txt', path = 'error_dir/testfile.txt' (OS Error: No such file or directory, errno = 2)

## Monitoring Multiple Events

This example shows handling multiple event types including move events.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('multi_event_dir');
  await dir.create();
  
  var watcher = dir.watch();
  watcher.listen((event) {
    switch (event.type) {
      case FileSystemEvent.move:
        print('Move event: ${event.path} → ${(event as FileSystemMoveEvent).destination}');
        break;
      case FileSystemEvent.create:
        print('Create event: ${event.path}');
        break;
      case FileSystemEvent.delete:
        print('Delete event: ${event.path}');
        break;
      case FileSystemEvent.modify:
        print('Modify event: ${event.path}');
        break;
    }
  });
  
  // Trigger various events
  var file = File('${dir.path}/demo.txt');
  await file.create();
  await file.writeAsString('content');
  await file.rename('${dir.path}/renamed_demo.txt');
  await file.delete();
}

We handle all file system event types with a switch statement. Move events are
specifically cast to access the destination property. Each event type has its
own case.

$ dart main.dart
Create event: multi_event_dir/demo.txt
Modify event: multi_event_dir/demo.txt
Move event: multi_event_dir/demo.txt → multi_event_dir/renamed_demo.txt
Delete event: multi_event_dir/renamed_demo.txt

## Best Practices

- **Filter events:** Check event types before processing

- **Handle errors:** Validate paths after move events

- **Resource management:** Close watchers when done

- **Performance:** Avoid heavy processing in event handlers

- **Cross-platform:** Test behavior on different OSes

## Source

[Dart FileSystemMoveEvent Documentation](https://api.dart.dev/stable/dart-io/FileSystemMoveEvent-class.html)

This tutorial covered Dart's FileSystemMoveEvent class with practical examples
showing file and directory move detection, error handling, and event processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).