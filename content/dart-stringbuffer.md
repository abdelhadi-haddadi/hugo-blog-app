+++
title = "Dart StringBuffer"
date = 2025-08-29T19:52:29.568+01:00
draft = false
description = "Dart StringBuffer tutorial shows how to concatenate strings efficiently in Dart language using StringBuffer class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart StringBuffer

last modified January 28, 2024

In this article we show how to concatenate strings efficiently in Dart language
using StringBuffer class.

A string is a sequence of UTF-16 code units. It is used to represent some text
in a program.

*StringBuffer* is a class that is used to create new strings efficiently
by concatenation. It contains write, writeAll,
writeln and clear member functions for string
manipulation.

## Dart StringBuffer simple example

The following is a simple Dart program which uses StringBuffer;

main.dart
  

void main() {
  var msg = StringBuffer('There are');
  msg.write(' three ');
  msg.writeAll(['hawks', 'in', 'the sky'], " ");

  String output = msg.toString();
  print(output);
}

The program dynamically builds a new string and prints it to the console.

var msg = StringBuffer('There are');

We create a new instance of StringBuffer. We add some initial text.

msg.write(' three ');

We insert another string with write.

msg.writeAll(['hawks', 'in', 'the sky'], " ");

We insert multiple strings with writeAll. The first parameter is a
list of strings, the second parameter is a separator character.

String output = msg.toString();

Finally, we turn the string buffer into a single string with
toString.

$ dart main.dart
There are three hawks in the sky

## Dart StringBuffer writeln

The writeln method writes a new string followed by a newline
character.

main.dart
  

void main() {
  var msg = StringBuffer('blue sky\n');
  msg.writeln('old owl');
  msg.writeln('lonely wolf');
  msg.writeln('strict regime');

  print(msg.length);
  print(msg.toString());
}

The example creates a string consisting of several lines of text data. In
addition, we print the size of the text in characters using length.

$ dart main.dart
43
blue sky
old owl
lonely wolf
strict regime

## Dart StringBuffer isEmpty

We can check if a string buffer is empty with isEmpty. The buffer
can be deleted with clear.

main.dart
  

void main() {
  var msg = StringBuffer();
  check(msg);
  msg.writeAll(['an', 'old', 'hawk', 'in', 'the', 'sky'], ' ');
  check(msg);
  print(msg.toString());
  msg.clear();
  check(msg);
}

void check(StringBuffer msg) {
  if (msg.isEmpty) {
    print('the buffer is empty');
  } else {
    print('the buffer is not empty');
  }
}

In the program, we build a string with StringBuffer and use the
isEmpty method to check, if the buffer is empty.

$ dart main.dart
the buffer is empty
the buffer is not empty
an old hawk in the sky
the buffer is empty

## Source

[Dart StringBuffer - language reference](https://api.dart.dev/stable/3.2.6/dart-core/StringBuffer-class.html)

In this article we have covered the StringBuffer class in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).