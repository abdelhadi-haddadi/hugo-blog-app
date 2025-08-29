+++
title = "Dart FileSystemEntityType"
date = 2025-08-29T19:51:47.935+01:00
draft = false
description = "Dart FileSystemEntityType tutorial shows how to work with different file system entity types in Dart using the FileSystemEntityType class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileSystemEntityType

last modified April 4, 2025

The FileSystemEntityType class in Dart represents types of file
system entities. It's used to identify whether a path refers to a file,
directory, or link.

This enum-like class is part of Dart's dart:io library. It's
commonly used with file system operations to determine entity types before
performing specific actions.

## Basic Definition

FileSystemEntityType is an abstract class with constant values
representing different file system entity types. It cannot be instantiated.

The class provides four possible values: FILE, DIRECTORY, LINK, and NOT_FOUND.
These help identify what kind of entity a path points to in the file system.

## Checking File Type

This example shows how to check if a path points to a regular file.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('example.txt');
  await file.writeAsString('Hello, Dart!');
  
  var type = await FileSystemEntity.type('example.txt');
  print(type == FileSystemEntityType.file); // true
  
  await file.delete();
}

We create a file, check its type using FileSystemEntity.type(), then delete it.
The method returns a FileSystemEntityType value we can compare against constants.

$ dart main.dart
true

## Checking Directory Type

This example demonstrates checking if a path points to a directory.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('test_dir');
  await dir.create();
  
  var type = await FileSystemEntity.type('test_dir');
  print(type == FileSystemEntityType.directory); // true
  
  await dir.delete();
}

We create a directory, verify its type using FileSystemEntityType.directory,
then clean up. This is useful before performing directory-specific operations.

$ dart main.dart
true

## Checking Symbolic Link Type

This example shows how to identify a symbolic link using FileSystemEntityType.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('target.txt');
  await file.writeAsString('Link target');
  
  var link = Link('link.txt');
  await link.create('target.txt');
  
  var type = await FileSystemEntity.type('link.txt');
  print(type == FileSystemEntityType.link); // true
  
  await link.delete();
  await file.delete();
}

We create a file and a symbolic link to it. The type check confirms the link's
nature. Always clean up temporary files after such operations.

$ dart main.dart
true

## Handling Non-Existent Paths

This example demonstrates how FileSystemEntityType handles non-existent paths.

main.dart
  

import 'dart:io';

void main() async {
  var type = await FileSystemEntity.type('nonexistent.txt');
  print(type == FileSystemEntityType.notFound); // true
  
  if (type == FileSystemEntityType.notFound) {
    print('Path does not exist');
  }
}

When checking a non-existent path, FileSystemEntityType returns NOT_FOUND.
This helps distinguish between different types of "file not found" scenarios.

$ dart main.dart
true
Path does not exist

## Directory Listing with Type Checking

This example shows how to list directory contents with type information.

main.dart
  

import 'dart:io';

void main() async {
  var dir = Directory('test');
  await dir.create();
  
  await File('${dir.path}/file.txt').create();
  await Directory('${dir.path}/subdir').create();
  
  var entities = dir.list();
  await for (var entity in entities) {
    var type = await FileSystemEntity.type(entity.path);
    print('${entity.path}: ${type.toString().split('.').last}');
  }
  
  await dir.delete(recursive: true);
}

We create a directory with a file and subdirectory, then list them with types.
The type() method helps categorize each entity during directory traversal.

$ dart main.dart
test/file.txt: file
test/subdir: directory

## Best Practices

- **Async handling:** Always await FileSystemEntity.type() calls

- **Error checking:** Handle NOT_FOUND cases appropriately

- **Type safety:** Use == operator for type comparisons

- **Cleanup:** Delete temporary files after testing

## Source

[Dart FileSystemEntityType Documentation](https://api.dart.dev/stable/dart-io/FileSystemEntityType-class.html)

This tutorial covered Dart's FileSystemEntityType class with practical examples
showing how to identify different file system entities in Dart applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).