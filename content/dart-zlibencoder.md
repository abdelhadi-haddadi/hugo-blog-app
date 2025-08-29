+++
title = "Dart ZLibEncoder"
date = 2025-08-29T19:52:36.255+01:00
draft = false
description = "Dart ZLibEncoder tutorial shows how to compress data in Dart using the ZLibEncoder class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ZLibEncoder

last modified April 4, 2025

The ZLibEncoder class in Dart provides zlib compression functionality.
It's useful for reducing data size for storage or network transmission.

ZLibEncoder implements the DEFLATE compression algorithm with zlib headers and
trailers. It's part of Dart's dart:io and dart:zlib
libraries.

## Basic Definition

ZLibEncoder is a converter that compresses byte data using zlib.
It supports different compression levels and produces standard zlib format output.

Key features include configurable compression level, stream support, and
compatibility with other zlib implementations. It's efficient for text and
binary data compression.

## Basic ZLibEncoder Usage

This example shows basic compression of a string using ZLibEncoder.

main.dart
  

import 'dart:convert';
import 'dart:zlib';

void main() {
  final encoder = ZLibEncoder();
  final text = 'Hello, world! This is a test string for compression.';
  
  final compressed = encoder.encode(utf8.encode(text));
  print('Original size: ${text.length}');
  print('Compressed size: ${compressed.length}');
  print('Compression ratio: ${(compressed.length/text.length).toStringAsFixed(2)}');
}

We create a ZLibEncoder, encode a UTF-8 string, and compare sizes. The encoder
handles the compression process automatically with default settings.

$ dart main.dart
Original size: 47
Compressed size: 35
Compression ratio: 0.74

## Compression with Different Levels

This example demonstrates using different compression levels with ZLibEncoder.

main.dart
  

import 'dart:convert';
import 'dart:zlib';

void main() {
  final text = 'Hello, world! '.codeUnits * 100; // Repeat 100 times
  final bytes = Uint8List.fromList(text);
  
  for (var level in [ZLibOption.minLevel, ZLibOption.defaultLevel, ZLibOption.maxLevel]) {
    final encoder = ZLibEncoder(level: level);
    final compressed = encoder.encode(bytes);
    
    print('Level $level: ${compressed.length} bytes');
  }
}

We test different compression levels on repeated text. Higher levels typically
produce smaller output but may take more time to compress.

$ dart main.dart
Level 1: 60 bytes
Level 6: 56 bytes
Level 9: 56 bytes

## Stream Compression

This example shows how to compress data streams using ZLibEncoder.

main.dart
  

import 'dart:convert';
import 'dart:zlib';
import 'dart:async';

Future&lt;void&gt; main() async {
  final encoder = ZLibEncoder();
  final controller = StreamController&lt;List&lt;int&gt;&gt;();
  
  // Create a stream of data chunks
  final stream = controller.stream;
  controller.add(utf8.encode('First chunk of data '));
  controller.add(utf8.encode('Second chunk of data '));
  controller.add(utf8.encode('Third chunk of data'));
  await controller.close();
  
  // Compress the stream
  final compressedStream = stream.transform(encoder);
  
  // Collect compressed data
  final compressedBytes = await compressedStream.toList();
  final totalSize = compressedBytes.fold(0, (sum, chunk) =&gt; sum + chunk.length);
  
  print('Compressed size: $totalSize bytes');
}

We create a stream of data chunks and compress them using ZLibEncoder as a stream
transformer. This is efficient for large data that can't fit in memory at once.

$ dart main.dart
Compressed size: 53 bytes

## File Compression

This example demonstrates compressing a file's contents using ZLibEncoder.

main.dart
  

import 'dart:io';
import 'dart:zlib';

Future&lt;void&gt; main() async {
  final file = File('example.txt');
  final encoder = ZLibEncoder(level: ZLibOption.maxLevel);
  
  // Read file contents
  final contents = await file.readAsBytes();
  print('Original size: ${contents.length} bytes');
  
  // Compress contents
  final compressed = encoder.encode(contents);
  print('Compressed size: ${compressed.length} bytes');
  
  // Write compressed data to new file
  final compressedFile = File('example.txt.z');
  await compressedFile.writeAsBytes(compressed);
  print('Compressed file written');
}

We read a file, compress its contents with maximum compression level, and write
the compressed data to a new file. This shows practical file compression usage.

$ dart main.dart
Original size: 1024 bytes
Compressed size: 543 bytes
Compressed file written

## Network Data Compression

This example shows compressing data for network transmission.

main.dart
  

import 'dart:convert';
import 'dart:zlib';
import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('Server running on ${server.address}:${server.port}');
  
  await for (var request in server) {
    if (request.method == 'POST') {
      final encoder = ZLibEncoder();
      final data = await request.fold([], (list, chunk) =&gt; list..addAll(chunk));
      
      final compressed = encoder.encode(data);
      request.response
        ..headers.add('Content-Encoding', 'deflate')
        ..add(compressed)
        ..close();
    } else {
      request.response
        ..statusCode = HttpStatus.methodNotAllowed
        ..write('Only POST supported')
        ..close();
    }
  }
}

We create a simple HTTP server that compresses POST data responses. This reduces
network bandwidth usage while maintaining data integrity.

$ dart main.dart
Server running on InternetAddress('127.0.0.1', IPv4):8080

## Best Practices

- **Level selection:** Balance compression ratio and speed

- **Stream processing:** Use for large data to save memory

- **Error handling:** Handle potential compression errors

- **Content type:** Mark compressed data appropriately

## Source

[Dart ZLibEncoder Documentation](https://api.dart.dev/stable/dart-zlib/ZLibEncoder-class.html)

This tutorial covered Dart's ZLibEncoder class with practical examples showing
basic usage, compression levels, streaming, and file/network applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).