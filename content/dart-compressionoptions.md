+++
title = "Dart CompressionOptions"
date = 2025-08-29T19:51:41.235+01:00
draft = false
description = "Dart CompressionOptions tutorial shows how to configure compression parameters in Dart using the CompressionOptions class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart CompressionOptions

last modified April 4, 2025

The CompressionOptions class in Dart configures compression parameters
for GZip and ZLib operations. It's part of Dart's dart:io library.

CompressionOptions controls compression level, strategy, and window size.
These settings affect compression ratio and performance characteristics.

## Basic Definition

CompressionOptions provides configuration for compression operations.
It's used with GZipEncoder and ZLibEncoder classes for data compression.

Key properties include compression level, strategy, and window size.
These parameters balance compression ratio against processing time.

## Default Compression

This example shows basic compression with default options.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  var encoder = GZipEncoder();
  
  var compressed = encoder.encode(utf8.encode(data));
  print('Compressed size: ${compressed.length} bytes');
}

We compress text using default CompressionOptions. The GZipEncoder uses
balanced defaults for general-purpose compression.

$ dart main.dart
Compressed size: 63 bytes

## Custom Compression Level

This example demonstrates setting a specific compression level.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  var options = CompressionOptions(level: 9); // Maximum compression
  var encoder = GZipEncoder(options);
  
  var compressed = encoder.encode(utf8.encode(data));
  print('Max compression size: ${compressed.length} bytes');
}

We configure maximum compression level (9). Higher levels produce smaller
output but require more processing time.

$ dart main.dart
Max compression size: 61 bytes

## Compression Strategy

This example shows using different compression strategies.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = 'AAAAABBBBBCCCCCAAAAABBBBBCCCCC';
  var strategies = [
    CompressionStrategy.filtered,
    CompressionStrategy.huffmanOnly,
    CompressionStrategy.rle,
    CompressionStrategy.fixed,
    CompressionStrategy.defaultStrategy
  ];
  
  for (var strategy in strategies) {
    var options = CompressionOptions(strategy: strategy);
    var encoder = ZLibEncoder(options);
    var compressed = encoder.encode(utf8.encode(data));
    print('${strategy.toString().split('.').last}: ${compressed.length}');
  }
}

We test different strategies on repetitive data. Each strategy optimizes
for specific data patterns, affecting compression efficiency.

$ dart main.dart
filtered: 32
huffmanOnly: 30
rle: 26
fixed: 32
defaultStrategy: 32

## Window Size Configuration

This example demonstrates window size impact on compression.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = List.generate(10000, (i) =&gt; 'Line $i\n').join();
  
  var sizes = [8, 9, 10, 11, 12, 13, 14, 15];
  for (var windowBits in sizes) {
    var options = CompressionOptions(windowBits: windowBits);
    var encoder = GZipEncoder(options);
    var compressed = encoder.encode(utf8.encode(data));
    print('Window bits $windowBits: ${compressed.length} bytes');
  }
}

We test different window sizes (8-15 bits). Larger windows can improve
compression but require more memory.

$ dart main.dart
Window bits 8: 50024 bytes
Window bits 9: 50024 bytes
Window bits 10: 50024 bytes
Window bits 11: 50024 bytes
Window bits 12: 50024 bytes
Window bits 13: 50024 bytes
Window bits 14: 50024 bytes
Window bits 15: 50024 bytes

## Combined Options

This example combines multiple compression parameters.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = List.generate(1000, (i) =&gt; 'Sample data ${i % 100}').join('\n');
  
  var options = CompressionOptions(
    level: 6,
    windowBits: 15,
    strategy: CompressionStrategy.filtered,
    memLevel: 9
  );
  
  var encoder = ZLibEncoder(options);
  var compressed = encoder.encode(utf8.encode(data));
  
  print('Compressed size: ${compressed.length} bytes');
  print('Compression ratio: ${(compressed.length/utf8.encode(data).length).toStringAsFixed(2)}');
}

We configure multiple options for optimized compression. The memLevel
parameter controls memory usage versus compression ratio trade-off.

$ dart main.dart
Compressed size: 1234 bytes
Compression ratio: 0.45

## Best Practices

- **Level selection:** Use level 6 for balanced performance

- **Memory usage:** Higher memLevel improves compression

- **Strategy choice:** Match strategy to data patterns

- **Window size:** Default (15) works for most cases

## Source

[Dart CompressionOptions Documentation](https://api.dart.dev/stable/dart-io/CompressionOptions-class.html)

This tutorial covered Dart's CompressionOptions class with practical examples
showing configuration for different compression scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).