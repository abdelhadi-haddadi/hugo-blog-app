+++
title = "Dart ProcessResult"
date = 2025-08-29T19:52:12.562+01:00
draft = false
description = "Dart ProcessResult tutorial shows how to work with process execution results in Dart using the ProcessResult class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ProcessResult

last modified April 4, 2025

The ProcessResult class in Dart represents the result of running
a process. It provides access to exit code, stdout, stderr, and process
information.

ProcessResult is returned by functions like Process.run and
Process.runSync. It's part of Dart's dart:io library.

## Basic Definition

ProcessResult is an immutable object containing process execution
results. It's created when a process completes and cannot be modified.

Key properties include exitCode, stdout, stderr, and pid. These provide
complete information about process execution and output.

## Basic ProcessResult Usage

This example shows basic process execution and result inspection.

main.dart
  

import 'dart:io';

void main() async {
  var result = await Process.run('ls', ['-l']);
  
  print('Exit code: ${result.exitCode}');
  print('Stdout: ${result.stdout}');
  print('Stderr: ${result.stderr}');
}

We run the 'ls -l' command and inspect its results. The
ProcessResult object contains all execution details including
output streams and exit status.

$ dart main.dart
Exit code: 0
Stdout: total 8
-rw-r--r--  1 user  staff  123 Apr  4 10:00 main.dart

Stderr: 

## Handling Command Errors

This example demonstrates error handling with ProcessResult.

main.dart
  

import 'dart:io';

void main() async {
  var result = await Process.run('grep', ['pattern', 'nonexistent.txt']);
  
  if (result.exitCode != 0) {
    print('Command failed with exit code ${result.exitCode}');
    print('Error output: ${result.stderr}');
  } else {
    print('Output: ${result.stdout}');
  }
}

We check the exitCode to determine command success. Non-zero exit codes
typically indicate errors, with details in stderr. This pattern is common
for robust process handling.

$ dart main.dart
Command failed with exit code 2
Error output: grep: nonexistent.txt: No such file or directory

## Parsing Command Output

This example shows parsing command output from ProcessResult.

main.dart
  

import 'dart:io';

void main() async {
  var result = await Process.run('date', ['+%Y-%m-%d']);
  
  if (result.exitCode == 0) {
    var date = (result.stdout as String).trim();
    print('Current date: $date');
  } else {
    print('Failed to get date');
  }
}

We execute the date command and parse its output. The stdout is cast to
String and trimmed for clean processing. This demonstrates working
with command output.

$ dart main.dart
Current date: 2025-04-04

## Running Multiple Commands

This example shows processing multiple commands and their results.

main.dart
  

import 'dart:io';

void main() async {
  var commands = [
    ['echo', 'Hello Dart'],
    ['uname', '-a'],
    ['whoami']
  ];
  
  for (var cmd in commands) {
    var result = await Process.run(cmd[0], cmd.sublist(1));
    print('Command: ${cmd.join(' ')}');
    print('Exit code: ${result.exitCode}');
    print('Output: ${(result.stdout as String).trim()}');
    print('---');
  }
}

We execute multiple commands in sequence and process each result. The example
shows handling different command types and their outputs systematically.

$ dart main.dart
Command: echo Hello Dart
Exit code: 0
Output: Hello Dart
---
Command: uname -a
Exit code: 0
Output: Darwin Kernel Version 22.1.0...
---
Command: whoami
Exit code: 0
Output: user
---

## Working with Binary Output

This example demonstrates handling binary output from processes.

main.dart
  

import 'dart:io';

void main() async {
  var result = await Process.run('ls', ['-l'], stdoutEncoding: null);
  
  if (result.exitCode == 0) {
    var output = result.stdout as List&lt;int&gt;;
    print('Binary output length: ${output.length} bytes');
    print('First 10 bytes: ${output.take(10)}');
  }
}

By setting stdoutEncoding to null, we get raw bytes instead of strings. This is
useful for binary data processing. The output is available as List&lt;int&gt;.

$ dart main.dart
Binary output length: 123 bytes
First 10 bytes: (116, 111, 116, 97, 108, 32, 56, 13, 10, 45)

## Best Practices

- **Check exit codes:** Always verify process success

- **Handle output:** Process both stdout and stderr

- **Use encoding:** Specify correct encoding for text output

- **Timeout:** Consider adding timeouts for long-running processes

- **Cleanup:** Ensure processes are properly terminated

## Source

[Dart ProcessResult Documentation](https://api.dart.dev/stable/dart-io/ProcessResult-class.html)

This tutorial covered Dart's ProcessResult class with practical examples showing
process execution, output handling, and error management in Dart applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).