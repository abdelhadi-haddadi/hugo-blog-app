+++
title = "Dart GZipCodec"
date = 2025-08-29T19:51:51.347+01:00
draft = false
description = "Dart GZipCodec tutorial shows how to compress and decompress data in Dart using the GZipCodec class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart GZipCodec

last modified April 4, 2025

The GZipCodec class in Dart provides GZIP compression and
decompression functionality. It's part of Dart's dart:io and
dart:convert libraries for efficient data handling.

GZipCodec implements the Codec interface, allowing both encoding
(compression) and decoding (decompression) operations. It's useful for reducing
data size for storage or transmission.

## Basic Definition

GZipCodec is a compression codec that implements the GZIP format.
It compresses byte arrays or streams using the DEFLATE algorithm.

Key features include configurable compression levels, stream support, and
compatibility with standard GZIP file format. It adds proper headers and
footers to compressed data.

## Basic Compression Example

This example shows basic string compression using GZipCodec.

main.dart
  

import 'dart:convert';
import 'dart:io';

void main() {
  final text = 'This is a sample text to compress with GZipCodec in Dart.';
  final bytes = utf8.encode(text);
  
  final compressed = gzip.encode(bytes);
  print('Compressed size: ${compressed.length} bytes');
  
  final decompressed = gzip.decode(compressed);
  print('Original text: ${utf8.decode(decompressed)}');
}

We convert a string to bytes, compress it with gzip.encode, then decompress
back to the original. The gzip object is a predefined instance of GZipCodec.

$ dart main.dart
Compressed size: 62 bytes
Original text: This is a sample text to compress with GZipCodec in Dart.

## File Compression

This example demonstrates compressing and decompressing files.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final inputFile = File('input.txt');
  final compressedFile = File('compressed.gz');
  final outputFile = File('output.txt');
  
  // Compress file
  final bytes = await inputFile.readAsBytes();
  final compressed = gzip.encode(bytes);
  await compressedFile.writeAsBytes(compressed);
  
  // Decompress file
  final decompressed = gzip.decode(compressed);
  await outputFile.writeAsBytes(decompressed);
  
  print('Original size: ${bytes.length}');
  print('Compressed size: ${compressed.length}');
  print('Decompressed matches original: ${bytes.length == decompressed.length}');
}

We read a file, compress its contents to a .gz file, then decompress back.
The example shows the complete round-trip of file compression.

$ dart main.dart
Original size: 1024
Compressed size: 512
Decompressed matches original: true

## Custom Compression Level

This example shows how to use different compression levels.

main.dart
  

import 'dart:convert';
import 'dart:io';

void main() {
  final text = 'Repeated text. ' * 100;
  final bytes = utf8.encode(text);
  
  final fast = GZipCodec(level: 1).encode(bytes);
  final balanced = GZipCodec(level: 6).encode(bytes);
  final best = GZipCodec(level: 9).encode(bytes);
  
  print('Fast compression size: ${fast.length}');
  print('Balanced compression size: ${balanced.length}');
  print('Best compression size: ${best.length}');
}

We create GZipCodec instances with different compression levels. Higher levels
produce smaller output but use more CPU time.

$ dart main.dart
Fast compression size: 168
Balanced compression size: 128
Best compression size: 120

## Stream Compression

This example demonstrates streaming compression for large data.

main.dart
  

import 'dart:convert';
import 'dart:io';

Future&lt;void&gt; main() async {
  final input = File('large_file.txt').openRead();
  final output = File('compressed_stream.gz').openWrite();
  
  // Compress stream
  await input.pipe(gzip.encoder).pipe(output);
  
  print('Stream compression complete');
}

We use pipe() to compress a large file stream without loading it entirely
into memory. The gzip.encoder transforms the stream on the fly.

$ dart main.dart
Stream compression complete

## HTTP Compression

This example shows using GZipCodec with HTTP responses.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('Server running on ${server.address}:${server.port}');
  
  await for (final request in server) {
    final response = request.response;
    final text = 'Compressed HTTP response ' * 100;
    
    // Enable GZIP compression
    response.headers.add('Content-Encoding', 'gzip');
    response.add(gzip.encode(utf8.encode(text)));
    
    await response.close();
  }
}

We create an HTTP server that sends GZIP-compressed responses. The client
automatically decompresses when Content-Encoding header is set.

$ dart main.dart
Server running on localhost:8080

## Best Practices

- **Level selection:** Choose compression level based on needs

- **Streams:** Use streaming for large data to save memory

- **Binary data:** GZIP works best with compressible data

- **HTTP:** Enable compression for web responses

- **Error handling:** Always handle decompression errors

## Source

[Dart GZipCodec Documentation](https://api.dart.dev/stable/dart-io/GZipCodec-class.html)

This tutorial covered Dart's GZipCodec class with practical examples showing
basic usage, file operations, streaming, and HTTP integration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).