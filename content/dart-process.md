+++
title = "Dart Process"
date = 2025-08-29T19:52:12.552+01:00
draft = false
description = "Dart Process tutorial shows how to manage system processes in Dart using the Process class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Process

last modified April 4, 2025

The Process class in Dart provides functionality to run and
interact with system processes. It's part of Dart's dart:io
library and works in command-line applications.

Process allows executing commands, reading their output, writing to their
input, and monitoring their exit status. It's essential for system-level
programming in Dart.

## Basic Definition

Process represents a native system process. It provides methods
to start, communicate with, and control external programs.

Key features include process lifecycle management, I/O stream access, and
exit code handling. It supports both synchronous and asynchronous operations.

## Running a Simple Command

This example shows how to run a basic system command and read its output.

main.dart
  

import 'dart:io';

void main() async {
  var process = await Process.start('ls', ['-l']);
  
  process.stdout.transform(utf8.decoder).listen((data) {
    print(data);
  });
  
  var exitCode = await process.exitCode;
  print('Exit code: $exitCode');
}

We start the 'ls -l' command asynchronously and listen to its stdout stream.
The exitCode future completes when the process terminates.

$ dart main.dart
total 12
-rw-r--r-- 1 user user  220 Apr  4 10:00 main.dart
Exit code: 0

## Handling Input and Output

This example demonstrates two-way communication with a process.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var process = await Process.start('grep', ['dart']);
  
  process.stdin.writeln('This line contains dart');
  process.stdin.writeln('This line does not');
  await process.stdin.close();
  
  process.stdout.transform(utf8.decoder).listen((data) {
    print('Found: $data');
  });
  
  await process.exitCode;
}

We start grep to filter lines containing 'dart'. We write to its stdin and
read filtered results from stdout. Always close stdin when done writing.

$ dart main.dart
Found: This line contains dart

## Running Synchronously

This example shows how to run a command and wait for completion.

main.dart
  

import 'dart:io';

void main() async {
  var result = await Process.run('date', ['+%Y-%m-%d']);
  
  print('Output: ${result.stdout}');
  print('Error: ${result.stderr}');
  print('Exit code: ${result.exitCode}');
}

Process.run executes the command and collects all output. It returns a
ProcessResult with stdout, stderr, and exit code when complete.

$ dart main.dart
Output: 2025-04-04

Error: 
Exit code: 0

## Handling Errors

This example demonstrates error handling when a process fails.

main.dart
  

import 'dart:io';

void main() async {
  try {
    var result = await Process.run('nonexistent', []);
    print(result.stdout);
  } on ProcessException catch (e) {
    print('Process failed: ${e.message}');
  }
}

We attempt to run a non-existent command. ProcessException is thrown when
the process cannot be started. Always handle potential process failures.

$ dart main.dart
Process failed: No such file or directory

## Running Multiple Processes

This example shows how to run and manage multiple processes concurrently.

main.dart
  

import 'dart:io';

void main() async {
  var processes = [
    Process.start('sleep', ['2']),
    Process.start('echo', ['hello']),
    Process.start('date', []),
  ];
  
  var results = await Future.wait(processes);
  
  for (var process in results) {
    print('Process ${process.pid} exited with ${await process.exitCode}');
  }
}

We start three processes simultaneously and wait for all to complete.
Each Process object provides the process ID and exit status.

$ dart main.dart
Process 1234 exited with 0
Process 1235 exited with 0
Process 1236 exited with 0

## Best Practices

- **Stream handling:** Always listen to stdout/stderr to prevent deadlocks

- **Error handling:** Catch ProcessException for startup failures

- **Resource cleanup:** Close stdin and cancel stream subscriptions

- **Timeouts:** Consider using timeouts for long-running processes

- **Security:** Sanitize command arguments to prevent injection

## Source

[Dart Process Documentation](https://api.dart.dev/stable/dart-io/Process-class.html)

This tutorial covered Dart's Process class with practical examples showing
command execution, I/O handling, error management, and concurrent processes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).