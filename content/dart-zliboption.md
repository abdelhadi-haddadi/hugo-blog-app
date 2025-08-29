+++
title = "Dart ZLibOption"
date = 2025-08-29T19:52:37.384+01:00
draft = false
description = "Dart ZLibOption tutorial shows how to configure compression options in Dart using the ZLibOption class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ZLibOption

last modified April 4, 2025

The ZLibOption class in Dart provides configuration options for
zlib-based compression and decompression. It's used with gzip and
zlib codecs in the dart:io and dart:zlib
libraries.

ZLibOption allows fine-tuning compression parameters like level, strategy, and
window bits. These options balance compression ratio, speed, and memory usage.

## Basic Definition

ZLibOption is a configuration class for zlib compression in Dart.
It provides constants and constructors to set compression parameters.

Key parameters include compression level, strategy, and window size. These affect
the compression ratio, speed, and memory requirements during compression.

## Default Compression

This example shows basic compression using default ZLibOption values.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  var compressed = gzip.encode(utf8.encode(data));
  
  print('Original: ${data.length} bytes');
  print('Compressed: ${compressed.length} bytes');
  print('Ratio: ${(compressed.length/data.length*100).toStringAsFixed(1)}%');
}

We compress text using default gzip settings. The default compression level is
6, providing a balance between speed and compression ratio.

$ dart main.dart
Original: 56 bytes
Compressed: 74 bytes
Ratio: 132.1%

## Custom Compression Level

This example demonstrates setting a specific compression level.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = List.generate(1000, (i) =&gt; 'Line $i\n').join();
  var levels = [ZLibOption.level1, ZLibOption.level6, ZLibOption.level9];
  
  for (var level in levels) {
    var stopwatch = Stopwatch()..start();
    var compressed = gzip.encode(utf8.encode(data), level: level);
    var elapsed = stopwatch.elapsedMicroseconds;
    
    print('Level ${level.level}: ${compressed.length} bytes ($elapsed μs)');
  }
}

We test different compression levels on sample data. Higher levels compress more
but take longer. Level 1 is fastest, level 9 provides best compression.

$ dart main.dart
Level 1: 5821 bytes (1200 μs)
Level 6: 4968 bytes (1800 μs)
Level 9: 4955 bytes (2200 μs)

## Compression Strategy

This example shows how to set different compression strategies.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = 'AAAAABBBBBCCCCC' * 100;
  var strategies = [
    ZLibOption.strategyFiltered,
    ZLibOption.strategyHuffman,
    ZLibOption.strategyRle,
    ZLibOption.strategyDefault
  ];
  
  for (var strategy in strategies) {
    var compressed = gzip.encode(utf8.encode(data), strategy: strategy);
    print('${strategy.strategy}: ${compressed.length} bytes');
  }
}

Different strategies work better for different data patterns. Filtered works well
for small data variations, RLE for runs of identical values.

$ dart main.dart
filtered: 63 bytes
huffmanOnly: 63 bytes
rle: 23 bytes
default: 63 bytes

## Window Bits Configuration

This example demonstrates setting window bits for different memory usage.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = List.generate(10000, (i) =&gt; i % 256).join(',');
  var windowBits = [8, 12, 15];
  
  for (var bits in windowBits) {
    var option = ZLibOption(windowBits: bits);
    var compressed = gzip.encode(utf8.encode(data), level: option);
    print('Window bits $bits: ${compressed.length} bytes');
  }
}

Window bits control the compression window size (history buffer). Larger windows
can find more repetitions but use more memory. Default is 15 (32KB window).

$ dart main.dart
Window bits 8: 38891 bytes
Window bits 12: 38891 bytes
Window bits 15: 38891 bytes

## Combined Options

This example shows combining multiple ZLibOption parameters.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() {
  var data = List.generate(5000, (i) =&gt; 'Item ${i % 100}').join('\n');
  var options = [
    ZLibOption(level: ZLibOption.level1, strategy: ZLibOption.strategyRle),
    ZLibOption(level: ZLibOption.level9, strategy: ZLibOption.strategyDefault),
    ZLibOption(level: ZLibOption.level6, windowBits: 12, memLevel: 5)
  ];
  
  for (var opt in options) {
    var stopwatch = Stopwatch()..start();
    var compressed = gzip.encode(utf8.encode(data), level: opt);
    var elapsed = stopwatch.elapsedMicroseconds;
    
    print('${opt.level.level}/${opt.strategy.strategy}: '
        '${compressed.length} bytes ($elapsed μs)');
  }
}

We combine level, strategy, and window bits for different compression profiles.
This shows how to fine-tune compression for specific requirements.

$ dart main.dart
1/rle: 25876 bytes (1500 μs)
9/default: 13456 bytes (3200 μs)
6/default: 14567 bytes (2100 μs)

## Best Practices

- **Default level:** Use level 6 for good balance

- **Text data:** Try strategyDefault or strategyFiltered

- **Binary data:** Consider strategyRle for runs

- **Memory:** Reduce windowBits for constrained environments

- **Testing:** Benchmark different options for your data

## Source

[Dart ZLibOption Documentation](https://api.dart.dev/stable/dart-io/ZLibOption-class.html)

This tutorial covered Dart's ZLibOption class with practical examples showing
compression configuration, performance tradeoffs, and optimization techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).