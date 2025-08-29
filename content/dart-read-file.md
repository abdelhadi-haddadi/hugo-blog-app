+++
title = "Dart read file"
date = 2025-08-29T19:52:18.427+01:00
draft = false
description = "Dart read file tutorial shows how to read files in Dart language. We read text and binary files."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart read file

last modified January 28, 2024

In this article we show how to read files in Dart language. We read text and
binary files. 

The dart:io package is used to do IO operations, including reading
files. The File class contains methods for manipulating files and
their contents. 

The try/catch keywords can be used to handle possible IO exceptions.

Note that readAsString and readAsStringSync should 
not be used for reading large files.

words.txt
  

sky
blue
cup
cloud
water
war 
pen
dog

This is a simple text file.

## Dart read file with readAsString

The readAsString method reads the entire file contents as a string
using the given encoding. The encoding is utf-8 by default. It returns a
Future&lt;String&gt; that completes with the string once the file
contents has been read.

main.dart
  

import 'dart:io';

void main() async {
  var path = 'words.txt';

  try {
    var file = File(path);

    var contents = await file.readAsString();

    print(contents);
  } catch (e) {
    stderr.writeln('failed to read file: \n${e}');
  }
}

In the example, we read a text file with readAsString. We use 
try/catch keywords to explicitly handle exceptions.

import 'dart:io';

We import the dart:io package.

var file = File(path);

A File object is created.

var contents = await file.readAsString();

We read the contents of the file with readAsString method. With 
await, we wait until the async operation finishes.

$ dart main.dart 
sky
blue
cup
cloud
water
war 
pen
dog

## Dart read file with readAsStringSync

The readAsStringSync reads the contents of the given file into a
string synchronously.

main.dart
  

import 'dart:io';

void main() {
  var fileName = 'words.txt';
  var contents = File(fileName).readAsStringSync();
  print(contents);
}

The example reads a text file with readAsStringSync.

## Dart self read file

The next program reads its own contents.

main.dart
  

import 'dart:convert';
import 'dart:io';

void main() async {
  var file = File(Platform.script.toFilePath());
  print(await (file.readAsString(encoding: ascii)));
}

We determine the program file name with Platform.script.toFilePath
and then read the contents with readAsString.

$ dart main.dart
import 'dart:convert';
import 'dart:io';

void main() async {
  var file = File(Platform.script.toFilePath());
  print(await (file.readAsString(encoding: ascii)));
}

## Dart read file with readAsLines

With readAsString, we read the file asynchronously line by line.
The method returns a future resolving in a list of strings.

main.dart
  

import 'dart:io';

void main() {
  var fileName = 'words.txt';

  var myFile = new File(fileName);

  myFile.readAsLines().then((lines) =&gt; lines.forEach((line) =&gt; print(line)));
}

The example reads a text file asynchronously line by line.

myFile.readAsLines().then((lines) =&gt; lines.forEach((line) =&gt; print(line)));

Here we use a callback to process the lines.

In the next example, we use the async/await syntax.

main.dart
  

import 'dart:io';

void main() async {
  var fileName = 'words.txt';

  var myFile = new File(fileName);
  var lines = await myFile.readAsLines();

  lines.forEach((line) {
    print(line);
  });
}

The program reads the file with readAsLines; it uses the
async/await syntax.

## Dart read file with readAsLinesSync

The readAsLinesSync reads the file synchronously line by line. 
It returns a list of strings.

main.dart
  

import 'dart:io';

void main() {
  var fileName = 'words.txt';

  var myFile = new File(fileName);
  List&lt;String&gt; lines = myFile.readAsLinesSync();
  lines.forEach((line) =&gt; print(line));
}

The program reads a text file line by line in a synchronous way.

## Dart read file with Stream

The next program reads a file using a Stream.

main.dart
  

import 'dart:convert';
import 'dart:io';

void main() {
  var fileName = 'words.txt';
  Stream&lt;List&lt;int&gt;&gt; stream = new File(fileName).openRead();
  StringBuffer buffer = new StringBuffer();

  stream.transform(utf8.decoder).transform(LineSplitter()).listen((line) {
    buffer.writeln("${line}");
  }, onDone: () =&gt; print(buffer.toString()), onError: (e) =&gt; print(e));
}

We read a text file with a Stream and a StringBuffer.

Stream&lt;List&lt;int&gt;&gt; stream = new File(fileName).openRead();

We open a stream with openRead.

StringBuffer buffer = new StringBuffer();

We will write data to the StringBuffer.

stream.transform(utf8.decoder).transform(LineSplitter()).listen((line) {
    buffer.writeln("${line}");
    }, onDone: () =&gt; print(buffer.toString()), onError: (e) =&gt; print(e));

We transform the stream with a decoder and a line splitter. The final line 
is written to the buffer. In the end, the buffer is printed to the console.

## Dart read binary file

The readAsBytes method reads the entire file contents as a list of
bytes. It returns a Future&lt;Uint8List&gt;.

main.dart
  

import 'dart:convert';
import 'dart:io';
import 'package:collection/collection.dart';

void main() async {
  var fileName = 'favicon.ico';
  var bytes = await File(fileName).readAsBytes();

  String base64Image = base64.encode(bytes);
  print(base64Image);

  var output = bytes
      .mapIndexed((idx, e) =&gt; e.toRadixString(16).padLeft(2, '0'))
      .join(' ');
  print(output);
}

In the program, we read a small favicon file. 

var bytes = await File(fileName).readAsBytes();

We read the file into a list of bytes.

String base64Image = base64.encode(bytes);

We encode the bytes into base64 encoding.

var output = bytes
    .mapIndexed((idx, e) =&gt; e.toRadixString(16).padLeft(2, '0'))
    .join(' ');

Alternatively, we convert the bytes into hexadecimal numbers.

## Source

[Dart I/O documentation](https://dart.dev/libraries/dart-io)

In this article we have showed how to read files in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).