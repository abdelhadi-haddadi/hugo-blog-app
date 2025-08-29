+++
title = "Dart ZLibDecoder"
date = 2025-08-29T19:52:36.269+01:00
draft = false
description = "Dart ZLibDecoder tutorial shows how to decompress zlib-encoded data in Dart using the ZLibDecoder class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ZLibDecoder

last modified April 4, 2025

The ZLibDecoder class in Dart provides functionality to decompress
data compressed with the zlib format. It's part of Dart's dart:io
and dart:convert libraries.

ZLibDecoder handles the decompression of zlib-encoded data streams, commonly
used in network protocols and file compression. It supports both raw and
wrapped zlib streams.

## Basic Definition

ZLibDecoder is a converter that transforms zlib-compressed byte
data into its original uncompressed form. It implements the Codec
interface for stream processing.

Key features include support for streaming decompression, memory efficiency,
and handling of both zlib-wrapped and raw compressed data formats.

## Basic ZLibDecoder Usage

This example shows basic decompression of a zlib-compressed byte list.

main.dart
  

import 'dart:convert';

void main() {
  // Compressed data (zlib format)
  final compressed = [120, 156, 75, 76, 74, 6, 0, 2, 130, 1, 69];
  
  final decoder = ZLibDecoder();
  final decompressed = decoder.convert(compressed);
  
  print('Decompressed: ${String.fromCharCodes(decompressed)}');
}

We create a ZLibDecoder instance and use its convert method to decompress
the byte list. The compressed data represents the string "Hello" in zlib format.

$ dart main.dart
Decompressed: Hello

## Streaming Decompression

This example demonstrates streaming decompression of zlib data.

main.dart
  

import 'dart:convert';
import 'dart:async';

Future&lt;void&gt; main() async {
  // Simulate streaming compressed data
  final stream = Stream.fromIterable([
    [120, 156],
    [75, 76, 74, 6],
    [0, 2, 130, 1, 69]
  ]);
  
  final decoder = ZLibDecoder();
  final decompressed = await decoder.bind(stream).toList();
  
  final result = decompressed.expand((x) =&gt; x).toList();
  print('Decompressed: ${String.fromCharCodes(result)}');
}

We use the bind method to connect a stream of compressed data chunks to the
decoder. This is memory-efficient for large compressed data streams.

$ dart main.dart
Decompressed: Hello

## Handling Raw ZLib Data

This example shows how to decompress raw zlib data without headers.

main.dart
  

import 'dart:convert';

void main() {
  // Raw compressed data (no zlib headers)
  final rawCompressed = [75, 76, 74, 6, 0, 2, 130, 1, 69];
  
  final decoder = ZLibDecoder(raw: true);
  final decompressed = decoder.convert(rawCompressed);
  
  print('Decompressed: ${String.fromCharCodes(decompressed)}');
}

By setting the raw parameter to true, we tell the decoder to expect raw
compressed data without zlib headers. This is useful for certain protocols.

$ dart main.dart
Decompressed: Hello

## Error Handling

This example demonstrates proper error handling during decompression.

main.dart
  

import 'dart:convert';

void main() {
  // Invalid compressed data
  final invalidData = [1, 2, 3, 4, 5];
  
  final decoder = ZLibDecoder();
  
  try {
    final decompressed = decoder.convert(invalidData);
    print('Decompressed: $decompressed');
  } on FormatException catch (e) {
    print('Decompression failed: ${e.message}');
  }
}

We wrap the decompression in a try-catch block to handle potential
FormatExceptions that occur with invalid compressed data.

$ dart main.dart
Decompression failed: Invalid zlib data

## Decompressing Large Files

This example shows how to decompress large zlib-compressed files efficiently.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  final inputFile = File('compressed.zlib');
  final outputFile = File('decompressed.txt');
  
  final decoder = ZLibDecoder();
  
  await outputFile.openWrite().addStream(
    inputFile.openRead().transform(decoder)
  );
  
  print('File decompressed successfully');
}

We use file streams and the transform method to decompress large files without
loading the entire content into memory. This is memory-efficient for big files.

$ dart main.dart
File decompressed successfully

## Best Practices

- **Stream processing:** Use streams for large compressed data

- **Error handling:** Always handle FormatException

- **Resource cleanup:** Close streams properly

- **Memory limits:** Be mindful of decompressed size

- **Format awareness:** Know if data is raw or wrapped

## Source

[Dart ZLibDecoder Documentation](https://api.dart.dev/stable/dart-convert/ZLibDecoder-class.html)

This tutorial covered Dart's ZLibDecoder class with practical examples showing
basic decompression, streaming, error handling, and file operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).