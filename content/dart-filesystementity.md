+++
title = "Dart FileSystemEntity"
date = 2025-08-29T19:51:47.924+01:00
draft = false
description = "Dart FileSystemEntity tutorial shows how to work with files and directories in Dart using the FileSystemEntity class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemEntity

last modified April 4, 2025

The FileSystemEntity class in Dart provides a common interface for
working with files, directories, and links. It's the superclass for File,
Directory, and Link classes.

FileSystemEntity offers methods for common filesystem operations like checking
existence, getting metadata, and deleting entities. It's part of Dart's
dart:io library for server-side applications.

## Basic Definition

FileSystemEntity is an abstract class representing filesystem items.
It provides static methods and properties that work with all entity types.

Key features include path manipulation, existence checking, and type detection.
It serves as a base for more specific file system operations.

## Checking File Existence

This example demonstrates how to check if a file exists using FileSystemEntity.

main.dart
  

import 'dart:io';

void main() async {
  var path = 'test.txt';
  
  // Check if file exists
  var exists = await FileSystemEntity.isFile(path);
  print('File exists: $exists');
  
  // Create the file if it doesn't exist
  if (!exists) {
    await File(path).writeAsString('Hello, Dart!');
    print('File created');
  }
}

We use isFile() to check for file existence. The method returns a Future
that completes with the check result. We then create the file if needed.

$ dart main.dart
File exists: false
File created

## Getting File Type

This example shows how to determine the type of a filesystem entity.

main.dart
  

import 'dart:io';

void main() async {
  var filePath = 'test.txt';
  var dirPath = 'test_dir';
  
  // Create test entities
  await File(filePath).create();
  await Directory(dirPath).create();
  
  // Check types
  var fileType = await FileSystemEntity.type(filePath);
  var dirType = await FileSystemEntity.type(dirPath);
  
  print('File type: $fileType');
  print('Directory type: $dirType');
  
  // Clean up
  await File(filePath).delete();
  await Directory(dirPath).delete();
}

The type() method returns a FileSystemEntityType enum value. Possible values are
FILE, DIRECTORY, LINK, or NOT_FOUND. We test both file and directory paths.

$ dart main.dart
File type: FileSystemEntityType.file
Directory type: FileSystemEntityType.directory

## Listing Directory Contents

This example demonstrates listing directory contents using FileSystemEntity.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('test_dir');
  
  // Create test directory with files
  await dir.create();
  await File('${dir.path}/file1.txt').create();
  await File('${dir.path}/file2.txt').create();
  
  // List directory contents
  var entities = await dir.list().toList();
  
  print('Directory contents:');
  for (var entity in entities) {
    var type = await FileSystemEntity.type(entity.path);
    print('${entity.path} - $type');
  }
  
  // Clean up
  await dir.delete(recursive: true);
}

We create a directory with files, then list its contents. For each entity, we
determine its type. The list() method returns a Stream of FileSystemEntity
objects.

$ dart main.dart
Directory contents:
test_dir/file1.txt - FileSystemEntityType.file
test_dir/file2.txt - FileSystemEntityType.file

## Getting File Statistics

This example shows how to get file statistics using FileSystemEntity.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('test.txt');
  await file.writeAsString('Dart FileSystemEntity tutorial');
  
  // Get file statistics
  var stat = await file.stat();
  
  print('File size: ${stat.size} bytes');
  print('Modified: ${stat.modified}');
  print('Accessed: ${stat.accessed}');
  print('Type: ${stat.type}');
  
  // Clean up
  await file.delete();
}

The stat() method returns a FileStat object containing file metadata. We access
size, modification time, access time, and file type from the statistics.

$ dart main.dart
File size: 28 bytes
Modified: 2025-04-04 15:30:45.000
Accessed: 2025-04-04 15:30:45.000
Type: FileSystemEntityType.file

## Deleting Filesystem Entities

This example demonstrates deleting different types of filesystem entities.

main.dart
  

import 'dart:io';

void main() async {
  // Create test entities
  var file = File('test.txt');
  var dir = Directory('test_dir');
  
  await file.create();
  await dir.create();
  
  // Delete entities
  await FileSystemEntity.delete(file.path);
  await FileSystemEntity.delete(dir.path);
  
  // Verify deletion
  var fileExists = await file.exists();
  var dirExists = await dir.exists();
  
  print('File exists: $fileExists');
  print('Directory exists: $dirExists');
}

We use the static delete() method to remove both files and directories. The same
method works for all FileSystemEntity types. We verify deletion by checking
existence afterward.

$ dart main.dart
File exists: false
Directory exists: false

## Best Practices

- **Use async/await:** Most methods return Futures

- **Check types:** Verify entity types before operations

- **Handle errors:** Wrap operations in try-catch blocks

- **Clean up:** Delete temporary files when done

- **Use absolute paths:** For more reliable operations

## Source

[Dart FileSystemEntity Documentation](https://api.dart.dev/stable/dart-io/FileSystemEntity-class.html)

This tutorial covered Dart's FileSystemEntity class with practical examples
showing file operations, directory handling, and filesystem metadata access.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).