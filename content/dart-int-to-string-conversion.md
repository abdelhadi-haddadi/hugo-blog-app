+++
title = "Dart int to String conversion"
date = 2025-08-29T19:52:00.283+01:00
draft = false
description = "Learn how to convert integers to strings in Dart with this detailed tutorial. Understand type conversion methods, best practices, and examples for efficient data handling in Dart."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart int to String conversion

last modified May 10, 2025

This tutorial provides a detailed guide on converting integers to strings in
Dart, a fundamental operation in many programming scenarios, including data
formatting and user output.

Integer to string conversion is a process where a numerical value of
type int is transformed into a textual representation as a
String. This type conversion is essential for displaying numerical
data within string-based messages, logging information, or formatting output for
user interfaces.

Through practical examples, we demonstrate how to construct string messages that
include integer values, ensuring smooth integration between numeric and
text-based data in Dart applications.

## Dart int to String with toString

The toString method method converts the numeric value to its
equivalent string representation.

main.dart
  

void main() {
  int val = 4;
  String msg = "There are " + val.toString() + " hawks";

  print(msg);
}

The program uses the toString to do int to String conversion.

$ dart main.dart
There are 4 hawks

## Dart int to String with StringBuffer

The StringBuffer is a class for concatenating strings efficiently.

main.dart
  

void main() {
  int numOfApples = 16;

  var buffer = new StringBuffer();
  buffer.write("There are ");
  buffer.write(numOfApples);
  buffer.write(" apples");

  print(buffer.toString());
}

The code example uses StringBuffer to do int to string conversion.

var buffer = new StringBuffer();

A new instance of StringBuffer is created.

buffer.write("There are ");
buffer.write(numOfApples);
buffer.write(" apples");

With write, we add string and integer values.

print(buffer.toString());

We convert the StringBuffer into a String with
toString.

$ dart main.dart
There are 16 apples

## Dart int to String with interpolation

String interpolation is the process of evaluating a string containing variables
and expressions. When an interpolated string is evaluated the variables and
expressions are replaced with their corresponding values.

In Dart, the $ is used to interpolate variables and
${} expressions.

main.dart
  

void main() {
  int n = 4;
  String msg = "There are ${n} hawks";

  print(msg);
}

The program builds a message with string interpolation.

## Dart int to string with sprintf

The sprintf package contains the sprintf function,
which provides C-like string formatting options.

$ dart pub add sprintf

We add the package.

main.dart
  

import 'package:sprintf/sprintf.dart';

void main() {
  int n = 4;
  String msg = sprintf("There are %d hawks", [n]);

  print(msg);
}

We import the library and call sprintf. It is similar to C's 
printf.

String msg = sprintf("There are %d hawks", [n]);

The %d specifier expects an integer, which is provided in the list 
following the comma.

## Source

[Dart int - language reference](https://api.dart.dev/stable/3.2.6/dart-core/int-class.html)

In this article we have shown how to perform int to string conversions in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).