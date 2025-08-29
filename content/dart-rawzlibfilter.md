+++
title = "Dart RawZLibFilter"
date = 2025-08-29T19:52:18.430+01:00
draft = false
description = "Dart RawZLibFilter tutorial shows how to perform raw zlib compression and decompression in Dart using the RawZLibFilter class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RawZLibFilter

last modified April 4, 2025

The RawZLibFilter class in Dart provides low-level access to
zlib compression and decompression. It's part of Dart's dart:io
library and handles raw zlib data streams.

Unlike ZLibCodec, RawZLibFilter works without zlib headers and trailers.
This makes it suitable for specific protocols that use raw zlib streams.

## Basic Definition

RawZLibFilter is a converter that implements zlib compression.
It processes byte streams without zlib headers, providing raw compression.

Key features include configurable compression level, window bits, and memory
level. It works with both compression and decompression of byte streams.

## Basic Compression

This example shows basic compression using RawZLibFilter.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() {
  var data = Uint8List.fromList('Hello, world!'.codeUnits);
  var filter = RawZLibFilter(rawDeflate: true);
  
  var compressed = filter.process(data);
  print('Compressed: $compressed');
  
  filter.finish();
}

We create a RawZLibFilter with rawDeflate set to true for raw compression.
The process() method compresses the input data without zlib headers.

$ dart main.dart
Compressed: [202, 72, 205, 201, 201, 215, 81, 40, 207, 47, 202, 73, 1, 0]

## Basic Decompression

This example demonstrates basic decompression of raw zlib data.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() {
  var compressed = Uint8List.fromList([
    202, 72, 205, 201, 201, 215, 81, 40, 207, 47, 202, 73, 1, 0
  ]);
  
  var filter = RawZLibFilter(rawInflate: true);
  var decompressed = filter.process(compressed);
  
  print('Decompressed: ${String.fromCharCodes(decompressed)}');
  filter.finish();
}

We create a RawZLibFilter with rawInflate set to true for raw decompression.
The process() method decompresses the input data back to original form.

$ dart main.dart
Decompressed: Hello, world!

## Stream Compression

This example shows streaming compression with RawZLibFilter.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() async {
  var filter = RawZLibFilter(rawDeflate: true, level: 6);
  var chunks = [
    Uint8List.fromList('First part '.codeUnits),
    Uint8List.fromList('Second part '.codeUnits),
    Uint8List.fromList('Third part'.codeUnits)
  ];
  
  var compressed = Uint8List(0);
  for (var chunk in chunks) {
    compressed = Uint8List.fromList([...compressed, ...filter.process(chunk)]);
  }
  compressed = Uint8List.fromList([...compressed, ...filter.finish()]);
  
  print('Compressed length: ${compressed.length}');
}

We process data in chunks, maintaining compression state between calls.
The finish() method flushes any remaining compressed data from the filter.

$ dart main.dart
Compressed length: 38

## Custom Compression Parameters

This example demonstrates custom compression parameters.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() {
  var data = Uint8List.fromList('Example data for compression'.codeUnits);
  
  var filter = RawZLibFilter(
    rawDeflate: true,
    level: 9,           // Maximum compression
    windowBits: 15,     // Default window size
    memLevel: 9,        // Maximum memory usage
    strategy: ZLibStrategy.filtered
  );
  
  var compressed = filter.process(data);
  print('Compressed size: ${compressed.length} bytes');
  filter.finish();
}

We configure compression with maximum level, memory usage, and filtered strategy.
These parameters affect compression ratio and performance characteristics.

$ dart main.dart
Compressed size: 24 bytes

## Error Handling

This example shows error handling during decompression.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

void main() {
  var invalidData = Uint8List.fromList([1, 2, 3, 4, 5]);
  
  try {
    var filter = RawZLibFilter(rawInflate: true);
    var result = filter.process(invalidData);
    filter.finish();
    print('Decompressed: $result');
  } on ZLibException catch (e) {
    print('Decompression failed: ${e.message}');
  }
}

We attempt to decompress invalid data, catching ZLibException that occurs.
Proper error handling is essential when working with raw compressed data.

$ dart main.dart
Decompression failed: Invalid data

## Best Practices

- **Resource cleanup:** Always call finish() to release resources

- **Error handling:** Handle ZLibException for invalid data

- **Chunking:** Process large data in chunks to manage memory

- **Parameter tuning:** Adjust parameters for your use case

## Source

[Dart RawZLibFilter Documentation](https://api.dart.dev/stable/dart-io/RawZLibFilter-class.html)

This tutorial covered Dart's RawZLibFilter class with practical examples showing
compression, decompression, streaming, and error handling for raw zlib data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).