+++
title = "Dart ProcessInfo"
date = 2025-08-29T19:52:12.556+01:00
draft = false
description = "Dart ProcessInfo tutorial shows how to access process information in Dart using the ProcessInfo class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ProcessInfo

last modified April 4, 2025

The ProcessInfo class in Dart provides information about the
current process. It's part of the dart:io library.

ProcessInfo is a utility class that exposes process-related
metrics. It provides static methods to access information about the running Dart
process.

## Memory Usage Statistics

This example demonstrates how to check memory usage of the current process.

main.dart
  

import 'dart:io';

void main() async {
  var memory = await ProcessInfo.currentRss;
  print('Resident Set Size: ${memory ~/ 1024} KB');

  var maxRss = await ProcessInfo.maxRss;
  print('Maximum RSS: ${maxRss ~/ 1024} KB');
}

We use currentRss for current memory usage. 

The maxRss returns the high-watermark in bytes for the resident set
size of memory for the process. Note that the meaning of this field is platform
dependent. For example, some memory accounted for here may be shared with other
processes, or if the same page is mapped into a process's address space, it may
be counted twice

$ dart main.dart
Resident Set Size: 24576 KB
Maximum RSS: 25600 KB

## Source

[Dart ProcessInfo Documentation](https://api.dart.dev/stable/dart-io/ProcessInfo-class.html)

This tutorial covered Dart's ProcessInfo class.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).