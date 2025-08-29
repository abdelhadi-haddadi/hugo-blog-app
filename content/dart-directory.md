+++
title = "Dart Directory"
date = 2025-08-29T19:51:43.452+01:00
draft = false
description = "Dart Directory tutorial shows how to work with file system directories in Dart using the Directory class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Directory

last modified April 4, 2025

The Directory class in Dart provides operations for working with
file system directories. It's part of Dart's dart:io library.

Directory supports creating, listing, deleting, and checking directory
properties. It works synchronously and asynchronously for file operations.

## Basic Definition

Directory represents a directory in the file system. It provides
methods to manipulate directories and their contents.

Key features include path manipulation, file listing, creation, deletion,
and existence checking. Directory operations can be synchronous or async.

## Creating a Directory

This example demonstrates how to create a new directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('new_directory');
  
  try {
    await dir.create();
    print('Directory created: ${dir.path}');
  } catch (e) {
    print('Error creating directory: $e');
  }
}

We create a Directory object and call create() to make the directory.
The async/await pattern is used for asynchronous file operations.

$ dart main.dart
Directory created: new_directory

## Listing Directory Contents

This example shows how to list files and subdirectories in a directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('.'); // Current directory
  
  try {
    var contents = await dir.list().toList();
    
    print('Contents of ${dir.path}:');
    for (var entity in contents) {
      print(entity.path);
    }
  } catch (e) {
    print('Error listing directory: $e');
  }
}

The list() method returns a stream of directory entries. We convert it to
a list and print each entry's path. This shows all files and subdirectories.

$ dart main.dart
Contents of .:
./main.dart
./new_directory
./pubspec.yaml

## Checking Directory Existence

This example demonstrates how to check if a directory exists.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('test_dir');
  
  if (await dir.exists()) {
    print('Directory exists');
  } else {
    print('Directory does not exist');
    await dir.create();
    print('Created directory');
  }
}

The exists() method checks if the directory exists. If not, we create it.
This pattern is useful for ensuring directories exist before operations.

$ dart main.dart
Directory does not exist
Created directory

## Deleting a Directory

This example shows how to delete a directory and its contents.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('temp_dir');
  
  // Create some test content
  await dir.create();
  await File('${dir.path}/test.txt').create();
  
  try {
    await dir.delete(recursive: true);
    print('Directory deleted successfully');
  } catch (e) {
    print('Error deleting directory: $e');
  }
}

The delete() method removes the directory. The recursive parameter allows
deleting non-empty directories. Without it, deletion fails if not empty.

$ dart main.dart
Directory deleted successfully

## Getting Directory Properties

This example demonstrates accessing directory properties and metadata.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('.'); // Current directory
  
  try {
    var stat = await dir.stat();
    
    print('Directory: ${dir.path}');
    print('Type: ${stat.type}');
    print('Size: ${stat.size} bytes');
    print('Modified: ${stat.modified}');
    print('Accessed: ${stat.accessed}');
  } catch (e) {
    print('Error getting directory stats: $e');
  }
}

The stat() method returns a FileStat object with directory metadata.
This includes size, modification time, and file type information.

$ dart main.dart
Directory: .
Type: directory
Size: 4096 bytes
Modified: 2025-04-04 14:30:22.000
Accessed: 2025-04-04 14:35:10.000

## Best Practices

- **Async operations:** Prefer async methods for better performance

- **Error handling:** Always handle potential IO exceptions

- **Path handling:** Use path.join() for cross-platform paths

- **Resource cleanup:** Close streams when done with directory listings

## Source

[Dart Directory Documentation](https://api.dart.dev/stable/dart-io/Directory-class.html)

This tutorial covered Dart's Directory class with practical examples showing
common directory operations like creation, listing, and deletion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).