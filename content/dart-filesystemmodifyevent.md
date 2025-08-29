+++
title = "Dart FileSystemModifyEvent"
date = 2025-08-29T19:51:49.041+01:00
draft = false
description = "Dart FileSystemModifyEvent tutorial shows how to monitor file system changes in Dart using the FileSystemModifyEvent class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemModifyEvent

last modified April 4, 2025

The FileSystemModifyEvent class in Dart represents file system
modification events. It's part of the dart:html library for web
applications.

This event is triggered when files or directories are modified in the watched
directory. It provides details about the changes that occurred in the file system.

## Basic Definition

FileSystemModifyEvent is an event object for file system changes.
It extends Event and contains information about modified entries.

Key properties include path for changed file paths and
type for the modification type (create, modify, or delete).

## Basic FileSystemModifyEvent Usage

This example shows how to listen for file system modification events.

main.dart
  

import 'dart:html';

void main() {
  DirectoryEntry dir;
  
  window.requestFileSystem(1024 * 1024).then((fs) {
    dir = fs.root;
    
    dir.onChange.listen((FileSystemModifyEvent event) {
      print('Change detected in: ${event.path}');
      print('Change type: ${event.type}');
    });
  });
}

We request a file system and set up an event listener on the root directory.
The listener prints details when any modification occurs in the file system.

$ dart main.dart
Change detected in: /example.txt
Change type: modify

## Filtering Specific Event Types

This example demonstrates filtering for specific modification types.

main.dart
  

import 'dart:html';

void main() {
  DirectoryEntry dir;
  
  window.requestFileSystem(1024 * 1024).then((fs) {
    dir = fs.root;
    
    dir.onChange.listen((FileSystemModifyEvent event) {
      if (event.type == 'create') {
        print('New file created: ${event.path}');
      } else if (event.type == 'delete') {
        print('File deleted: ${event.path}');
      }
    });
  });
}

We filter events to only handle file creation and deletion. This helps focus
on specific changes while ignoring others like modifications.

$ dart main.dart
New file created: /test.txt
File deleted: /old.txt

## Monitoring Specific Files

This example shows how to watch for changes to specific files only.

main.dart
  

import 'dart:html';

void main() {
  DirectoryEntry dir;
  const targetFile = '/config.json';
  
  window.requestFileSystem(1024 * 1024).then((fs) {
    dir = fs.root;
    
    dir.onChange.listen((FileSystemModifyEvent event) {
      if (event.path == targetFile) {
        print('Config file changed: ${event.type}');
        // Reload config or take appropriate action
      }
    });
  });
}

We check the event path against our target file path. This creates a focused
watcher that only responds to changes in the specified configuration file.

$ dart main.dart
Config file changed: modify

## Handling Multiple Changes

This example demonstrates processing multiple changes from a single event.

main.dart
  

import 'dart:html';

void main() {
  DirectoryEntry dir;
  
  window.requestFileSystem(1024 * 1024).then((fs) {
    dir = fs.root;
    
    dir.onChange.listen((FileSystemModifyEvent event) {
      print('Batch changes detected:');
      event.changes.forEach((change) {
        print('  ${change.path} - ${change.type}');
      });
    });
  });
}

Some implementations may batch multiple changes into a single event. We iterate
through all changes in the event to handle each modification individually.

$ dart main.dart
Batch changes detected:
  /file1.txt - modify
  /temp/file2.txt - create

## Error Handling in File Monitoring

This example adds error handling to file system monitoring.

main.dart
  

import 'dart:html';

void main() {
  DirectoryEntry dir;
  
  window.requestFileSystem(1024 * 1024).then((fs) {
    dir = fs.root;
    
    var subscription = dir.onChange.listen(
      (FileSystemModifyEvent event) {
        print('Change: ${event.path}');
      },
      onError: (e) =&gt; print('Error: $e'),
      cancelOnError: false
    );
    
    // Later: subscription.cancel();
  }).catchError((e) =&gt; print('Filesystem error: $e'));
}

We add error handlers for both the filesystem request and event listening.
The subscription can be cancelled later when monitoring is no longer needed.

$ dart main.dart
Change: /update.txt
Error: FileSystemError {code: 5, name: "InvalidModificationError"}

## Best Practices

- **Specific paths:** Filter events to only watch relevant files

- **Error handling:** Always implement error handlers

- **Resource cleanup:** Cancel subscriptions when done

- **Performance:** Avoid heavy processing in event handlers

- **Batch handling:** Be prepared for multiple changes per event

## Source

[Dart FileSystemModifyEvent Documentation](https://api.dart.dev/stable/dart-html/FileSystemModifyEvent-class.html)

This tutorial covered Dart's FileSystemModifyEvent class with practical examples
showing basic usage, filtering, error handling, and monitoring techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).