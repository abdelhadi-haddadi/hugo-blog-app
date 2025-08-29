+++
title = "Dart write file"
date = 2025-08-29T19:52:33.967+01:00
draft = false
description = "Dart write file tutorial shows how to write to files in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart write file

last modified January 28, 2024

In this article we show how to write to files in Dart language. 

The dart:io package is used to do IO operations, including writing
files. The File class contains methods for manipulating files and
their contents. 

Dart provides both synchronous and asynchronous methods for writing to files, 
such as writeAsStringSync and writeAsString.

The openWrite function creates a new independent
IOSink for the file. It must be explicitly closed when no longer
used, to free system resources.

try/catch keywords can be used to handle possible IO exceptions.

 -->

**Note: ** methods that write a string or a list into a file in one
go should not be used for large amount of data.

## Dart writeAsStringSync

The writeAsStringSync method synchronously writes a string to a
file. It opens the file, writes the string in the given encoding, and closes the
file.

main.dart
  

import 'dart:io';

void main() {
  final fname = 'output.txt';
  final f = new File(fname);

  final data = 'an old falcon';
  f.writeAsStringSync(data);
}

In the program, we write a string into a file synchronously. The file is created 
if it does not exist. If it exists, it is overwritten.

import 'dart:io';

We import the dart:io library.

final fname = 'output.txt';
final f = new File(fname);

We create a new instance of File.

final data = 'an old falcon';
f.writeAsStringSync(data);

We write the string into the file.

## Dart writeAsString

The writeAsString function opens the file, writes the string in the
given encoding, and closes the file. It returns a
Future&lt;File&gt; that completes with the file  object once the
entire operation has completed.

main.dart
  

import 'dart:io';

void main() async {
  final fname = 'output2.txt';
  final f = new File(fname);

  final data = 'a stormy night';
  await f.writeAsString(data);
}

We write a string to a file with writeAsString function.

void main() async {

Since we use the asynchronous writeAsString function, we must add
the async keyword to the main declaration.

await f.writeAsString(data);

With the await keyword we get the completed result of the async 
operation. 

## Dart writeAsBytesSync

The writeAsBytesSync member function synchronously writes a list of
bytes to a file.

main.dart
  

import 'dart:io';

void main() {
  final fname = 'bytes.txt';

  final text = "one 🐘 and three 🐋";
  final data = utf8.encode(text);
  final f = new File(fname);

  f.writeAsBytesSync(data);
}

In the example, we write a text message with emojis to a file using
writeAsBytesSync.

final text = "one 🐘 and three 🐋";

We have the text with two emojis.

final data = utf8.encode(text);

We encode the text into a list of integers.

f.writeAsBytesSync(data);

The encoded text is written to the file synchronously.

$ dart main.dart 
$ cat bytes.txt
one 🐘 and three 🐋

## Dart fetch image

In the next example, we fetch an image from an URL resource.

main.dart
  

import 'dart:io';
import 'package:http/http.dart' as http;

void main() async {
  final res = await http.get(Uri.http('webcode.me', '/favicon.ico'));
  final bdata = res.bodyBytes;

  final fname = 'favicon.ico';
  final f = await File(fname);
  await f.writeAsBytes(bdata);
}

The example downloads a small favicon. 

import 'package:http/http.dart' as http;

To create a HTTP GET request, we use the http library.

final bdata = res.bodyBytes;

With bodyBytes we retrieve the bytes comprising the body of the
response.

final fname = 'favicon.ico';
final f = await File(fname);

We create the File object.

await f.writeAsBytes(bdata);

The bytes are written to the file.

## Dart append to file

In the next example, we append data to a file.

main.dart
  

import 'dart:io';

void main() async {
  final fname = 'words.txt';

  final words = ['cloud', 'blue', 'book', 'solid'];
  final f = new File(fname);

  for (final word in words) {
    await f.writeAsString('$word\n', mode: FileMode.append);
  }
}

To append data to a file, we use the FileMode.append mode.

## Dart IOSink write

The IOSink's write method writes an object to the
sink.

main.dart
  

import 'dart:io';

void main() {
  final fname = 'test.txt';

  final f = File(fname);
  final sink = f.openWrite();
  sink.write('current datetime: ${DateTime.now()}\n');

  sink.close();
}

The example writes the current datetime to the sink. 

final sink = f.openWrite();

From the File object, we open the sink with openWrite
method.

sink.write('current datetime: ${DateTime.now()}\n');

The data is written to the sink with write.

sink.close();

We close the IOSink to free system resources.

## Dart IOSink writeAll

The IOSink writeAll function iterates over the given
objects and writes them in sequence.

main.dart
  

import 'dart:io';

void main() {
  final fname = 'words2.txt';

  final words = ['sky', 'ocean', 'pen', 'rock', 'storm', 'falcon'];

  final f = File(fname);
  final sink = f.openWrite();
  sink.writeAll(words, "\n");

  sink.close();
}

In the example, we use writeAll to write the contents of a list 
to the sink.

## Source

[Dart I/O documentation](https://api.dart.dev/stable/3.2.6/dart-io/dart-io-library.html)

In this article we have showed how to write to files in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).