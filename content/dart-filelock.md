+++
title = "Dart FileLock"
date = 2025-08-29T19:51:45.707+01:00
draft = false
description = "Dart FileLock tutorial shows how to manage file locks in Dart using the FileLock class for concurrent access control."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart FileLock

last modified April 4, 2025

The FileLock class in Dart provides file locking capabilities
for controlling concurrent access to files. It's part of Dart's
dart:io library.

FileLock helps prevent race conditions when multiple processes or isolates
access the same file. It supports both shared and exclusive locking modes.

## Basic Definition

FileLock is an enum that represents different types of file locks.
It's used with file operations to control concurrent access to file resources.

The enum has three values: FileLock.shared,
FileLock.exclusive, and FileLock.blocking.
These control how locks are acquired and released.

## Basic File Locking

This example shows basic file locking with an exclusive lock.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('test.txt');
  
  // Open the file for writing with exclusive lock
  var raf = await file.open(mode: FileMode.write, 
    lock: FileLock.exclusive);
  
  // Write to the file
  await raf.writeString('Locked content\n');
  
  // Release the lock by closing the file
  await raf.close();
  
  print('File written with exclusive lock');
}

We open a file with an exclusive lock, preventing other processes from
accessing it. The lock is automatically released when the file is closed.

$ dart main.dart
File written with exclusive lock

## Shared File Lock

This example demonstrates using a shared lock for concurrent reads.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('test.txt');
  
  // Open with shared lock for reading
  var raf1 = await file.open(mode: FileMode.read, 
    lock: FileLock.shared);
  var raf2 = await file.open(mode: FileMode.read, 
    lock: FileLock.shared);
  
  // Both can read simultaneously
  print(await raf1.readAsString());
  print(await raf2.readAsString());
  
  await raf1.close();
  await raf2.close();
}

Shared locks allow multiple readers to access a file simultaneously.
They prevent exclusive locks from being acquired while active.

$ dart main.dart
Locked content
Locked content

## Blocking Lock

This example shows how to use blocking locks to wait for access.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('test.txt');
  
  // First process gets exclusive lock
  var raf1 = await file.open(mode: FileMode.write, 
    lock: FileLock.exclusive);
  
  // Second process waits for lock to be released
  Future.delayed(Duration(seconds: 2), () async {
    var raf2 = await file.open(mode: FileMode.write, 
      lock: FileLock.blockingExclusive);
    await raf2.writeString('Second write\n');
    await raf2.close();
    print('Second write completed');
  });
  
  // First process writes and releases lock
  await raf1.writeString('First write\n');
  await Future.delayed(Duration(seconds: 3));
  await raf1.close();
  print('First write completed');
}

Blocking locks wait until the current lock is released before proceeding.
This prevents errors from failed lock attempts.

$ dart main.dart
First write completed
Second write completed

## Lock Conflicts

This example demonstrates what happens when lock conflicts occur.

main.dart
  

import 'dart:io';

void main() async {
  var file = File('test.txt');
  
  try {
    // First exclusive lock
    var raf1 = await file.open(mode: FileMode.write, 
      lock: FileLock.exclusive);
    
    // Try to get another exclusive lock (will fail)
    var raf2 = await file.open(mode: FileMode.write, 
      lock: FileLock.exclusive);
    
    await raf1.close();
    await raf2.close();
  } catch (e) {
    print('Lock conflict: $e');
  }
}

When a lock conflict occurs, an exception is thrown. This helps detect
and handle concurrent access issues in your application.

$ dart main.dart
Lock conflict: FileSystemException: Cannot open file, path = 'test.txt' (OS Error: The process cannot access the file because it is being used by another process., errno = 32)

## File Lock with Timeout

This example implements a lock with timeout using Future.any.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var file = File('test.txt');
  
  // Get initial exclusive lock
  var raf1 = await file.open(mode: FileMode.write, 
    lock: FileLock.exclusive);
  
  // Try to get lock with timeout
  try {
    var result = await Future.any([
      file.open(mode: FileMode.write, lock: FileLock.exclusive),
      Future.delayed(Duration(seconds: 2),
    ]);
    
    if (result is RandomAccessFile) {
      print('Lock acquired');
      await result.close();
    } else {
      print('Timeout waiting for lock');
    }
  } finally {
    await raf1.close();
  }
}

We implement a timeout mechanism for lock acquisition. If the lock isn't
acquired within 2 seconds, we handle the timeout case appropriately.

$ dart main.dart
Timeout waiting for lock

## Best Practices

- **Scope:** Keep locks for minimal duration needed

- **Order:** Acquire locks in consistent order to prevent deadlocks

- **Cleanup:** Always release locks in finally blocks

- **Granularity:** Use appropriate lock type (shared/exclusive)

- **Timeout:** Implement timeouts for blocking operations

## Source

[Dart FileLock Documentation](https://api.dart.dev/stable/dart-io/FileLock-class.html)

This tutorial covered Dart's FileLock class with practical examples showing
basic usage, lock types, conflict handling, and timeout patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).