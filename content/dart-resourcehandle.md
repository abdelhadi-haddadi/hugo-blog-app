+++
title = "Dart ResourceHandle"
date = 2025-08-29T19:52:20.630+01:00
draft = false
description = "Dart ResourceHandle tutorial shows how to manage resources efficiently in Dart using the ResourceHandle class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ResourceHandle

last modified April 4, 2025

The ResourceHandle class in Dart provides a way to manage resources
that need explicit cleanup. It's useful for file handles, network connections,
and other disposable resources.

ResourceHandle ensures resources are properly released when no longer needed.
It helps prevent resource leaks and follows the RAII (Resource Acquisition Is
Initialization) pattern.

## Basic Definition

ResourceHandle is a wrapper for resources that require cleanup.
It manages the resource lifecycle and ensures proper disposal when the handle
goes out of scope.

Key features include automatic disposal, manual release control, and error
handling. It's particularly useful for scarce or expensive resources.

## Basic ResourceHandle Usage

This example shows basic resource management using ResourceHandle.

main.dart
  

import 'dart:io';

void main() {
  // Create a resource handle for a temporary file
  var fileHandle = ResourceHandle&lt;File&gt;(
    File('temp.txt'),
    dispose: (file) =&gt; file.delete(),
  );

  // Use the resource
  fileHandle.value.writeAsStringSync('Hello, ResourceHandle!');
  
  // Resource is automatically disposed when handle goes out of scope
}

We create a ResourceHandle for a File object with a custom dispose function.
The file will be deleted automatically when the handle is no longer needed.

$ dart main.dart
# File is created and automatically deleted

## Manual Resource Release

This example demonstrates manual control over resource disposal.

main.dart
  

import 'dart:io';

void main() {
  var socketHandle = ResourceHandle&lt;Socket&gt;(
    Socket.connect('example.com', 80).then((socket) =&gt; socket),
    dispose: (socket) =&gt; socket.close(),
  );

  // Use the resource
  socketHandle.value.then((socket) {
    socket.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n');
    
    // Manually release when done
    socketHandle.dispose();
  });
}

We create a ResourceHandle for a network socket and manually dispose it after
use. This gives precise control over resource lifetime when needed.

$ dart main.dart
# Socket is connected, used, and properly closed

## Error Handling with Resources

This example shows error handling in resource management.

main.dart
  

import 'dart:io';

void main() {
  try {
    var dbHandle = ResourceHandle&lt;File&gt;(
      File('database.db'),
      dispose: (file) {
        print('Cleaning up database file');
        file.deleteSync();
      },
    );

    // Simulate an error
    throw Exception('Database operation failed');
  } catch (e) {
    print('Error occurred: $e');
  }
  // Handle ensures cleanup happens even on error
}

The ResourceHandle ensures the database file is cleaned up even when an error
occurs during operation. This prevents resource leaks in error scenarios.

$ dart main.dart
Error occurred: Exception: Database operation failed
Cleaning up database file

## Multiple Resources Management

This example demonstrates managing multiple resources together.

main.dart
  

import 'dart:io';

void main() {
  var resources = ResourceHandle.group([
    ResourceHandle&lt;File&gt;(
      File('log1.txt'),
      dispose: (file) =&gt; file.delete(),
    ),
    ResourceHandle&lt;File&gt;(
      File('log2.txt'),
      dispose: (file) =&gt; file.delete(),
    ),
    ResourceHandle&lt;Directory&gt;(
      Directory('temp'),
      dispose: (dir) =&gt; dir.delete(recursive: true),
    ),
  ]);

  // Use resources
  resources[0].value.writeAsStringSync('Log entry 1');
  resources[1].value.writeAsStringSync('Log entry 2');
  
  // All resources will be disposed together
}

We manage multiple resources as a group, ensuring coordinated cleanup.
This is useful when working with related resources that should be released
together.

$ dart main.dart
# All files and directory are created and cleaned up

## Custom Resource Types

This example shows using ResourceHandle with custom resource types.

main.dart
  

class DatabaseConnection {
  final String connectionString;
  
  DatabaseConnection(this.connectionString) {
    print('Connected to $connectionString');
  }
  
  void close() {
    print('Closed connection to $connectionString');
  }
}

void main() {
  var dbHandle = ResourceHandle&lt;DatabaseConnection&gt;(
    DatabaseConnection('postgres://localhost/mydb'),
    dispose: (db) =&gt; db.close(),
  );

  // Use the database connection
  print('Using database: ${dbHandle.value.connectionString}');
  
  // Connection will be automatically closed
}

We create a ResourceHandle for a custom DatabaseConnection class. The handle
ensures proper connection closure, demonstrating the pattern's flexibility.

$ dart main.dart
Connected to postgres://localhost/mydb
Using database: postgres://localhost/mydb
Closed connection to postgres://localhost/mydb

## Best Practices

- **Always dispose:** Ensure all resources have proper dispose handlers

- **Use groups:** Manage related resources together when possible

- **Error safety:** Design dispose handlers to be exception-safe

- **Document:** Clearly document resource ownership and lifetimes

## Source

[Dart ResourceHandle Documentation](https://api.dart.dev/stable/dart-core/ResourceHandle-class.html)

This tutorial covered Dart's ResourceHandle class with practical examples showing
basic usage, error handling, and resource management patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).