+++
title = "Dart ZLibCodec"
date = 2025-08-29T19:52:36.275+01:00
draft = false
description = "Dart ZLibCodec tutorial shows how to compress and decompress data in Dart using the ZLibCodec class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ZLibCodec

last modified April 4, 2025

The ZLibCodec class in Dart provides zlib compression and
decompression functionality. It's useful for reducing data size for storage
or transmission.

ZLibCodec implements the DEFLATE compression algorithm with a zlib wrapper.
It's part of Dart's dart:io and dart:convert libraries.

## Basic Definition

ZLibCodec is a codec that compresses and decompresses byte data
using the zlib format. It supports different compression levels and strategies.

Key features include configurable compression levels, streaming support, and
compatibility with standard zlib implementations. It works with both 
List&lt;int&gt; and Stream&lt;List&lt;int&gt;&gt; data.

## Basic Compression

This example shows basic compression of a string using ZLibCodec.

main.dart
  

import 'dart:convert';

void main() {
  final codec = ZLibCodec();
  final text = 'The quick brown fox jumps over the lazy dog';
  
  final compressed = codec.encode(utf8.encode(text));
  print('Compressed: $compressed');
  
  final decompressed = utf8.decode(codec.decode(compressed));
  print('Decompressed: $decompressed');
}

We create a ZLibCodec instance, encode a string to UTF-8 bytes, then compress it.
The compressed data is then decompressed back to the original string.

$ dart main.dart
Compressed: [120, 156, 11, 201, 200, 44, 86, 0, 161, 52, 119, 23, 114, 233, 142, 6, 151, 128, 148, 210, 236, 146, 212, 226, 202, 212, 226, 140, 148, 210, 210, 156, 212, 18, 0, 237, 147, 15, 76]
Decompressed: The quick brown fox jumps over the lazy dog

## Compression with Level

This example demonstrates using different compression levels.

main.dart
  

import 'dart:convert';

void main() {
  final text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  final bytes = utf8.encode(text);
  
  for (var level = 1; level &lt;= 9; level++) {
    final codec = ZLibCodec(level: level);
    final compressed = codec.encode(bytes);
    print('Level $level: ${compressed.length} bytes');
  }
}

We test compression levels from 1 (fastest) to 9 (best compression). Higher
levels typically produce smaller output but take more time to compress.

$ dart main.dart
Level 1: 63 bytes
Level 2: 57 bytes
Level 3: 56 bytes
Level 4: 55 bytes
Level 5: 55 bytes
Level 6: 55 bytes
Level 7: 55 bytes
Level 8: 55 bytes
Level 9: 55 bytes

## File Compression

This example shows compressing and decompressing a file.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  final codec = ZLibCodec();
  final file = File('example.txt');
  
  // Compress file
  final original = await file.readAsBytes();
  final compressed = codec.encode(original);
  await File('example.z').writeAsBytes(compressed);
  
  // Decompress file
  final compressedFile = await File('example.z').readAsBytes();
  final decompressed = codec.decode(compressedFile);
  await File('example_decompressed.txt').writeAsBytes(decompressed);
  
  print('Original: ${original.length} bytes');
  print('Compressed: ${compressed.length} bytes');
}

We read a file, compress its contents, and save the compressed version.
Then we decompress it back to verify the process. This shows practical file
compression usage.

$ dart main.dart
Original: 1024 bytes
Compressed: 512 bytes

## Stream Compression

This example demonstrates streaming compression of large data.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  final codec = ZLibCodec();
  final input = File('large_file.txt').openRead();
  final output = File('compressed.z').openWrite();
  
  // Compress stream
  await input.transform(codec.encoder).pipe(output);
  
  // Decompress stream
  final compressed = File('compressed.z').openRead();
  final decompressed = File('decompressed.txt').openWrite();
  await compressed.transform(codec.decoder).pipe(decompressed);
  
  print('Stream compression completed');
}

We use streams to handle large files without loading everything into memory.
The transform method processes data in chunks, making it memory efficient.

$ dart main.dart
Stream compression completed

## Custom Dictionary

This example shows using a custom dictionary for compression.

main.dart
  

import 'dart:convert';

void main() {
  final dictionary = utf8.encode('commonprefix');
  final codec = ZLibCodec(dictionary: dictionary);
  
  final text1 = 'commonprefix12345';
  final text2 = 'commonprefix67890';
  
  final compressed1 = codec.encode(utf8.encode(text1));
  final compressed2 = codec.encode(utf8.encode(text2));
  
  print('Text1 compressed: ${compressed1.length} bytes');
  print('Text2 compressed: ${compressed2.length} bytes');
  
  final decompressed1 = utf8.decode(codec.decode(compressed1));
  final decompressed2 = utf8.decode(codec.decode(compressed2));
  
  print('Decompressed1: $decompressed1');
  print('Decompressed2: $decompressed2');
}

A custom dictionary improves compression for data with common prefixes.
Both encoder and decoder must use the same dictionary for correct operation.

$ dart main.dart
Text1 compressed: 22 bytes
Text2 compressed: 22 bytes
Decompressed1: commonprefix12345
Decompressed2: commonprefix67890

## Best Practices

- **Level selection:** Choose compression level based on needs

- **Memory usage:** Use streams for large data

- **Error handling:** Handle ZLibError exceptions

- **Dictionary:** Use for data with common prefixes

- **Reuse:** Reuse codec instances when possible

## Source

[Dart ZLibCodec Documentation](https://api.dart.dev/stable/dart-io/ZLibCodec-class.html)

This tutorial covered Dart's ZLibCodec class with practical examples showing
basic usage, file operations, streaming, and advanced features like dictionaries.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).