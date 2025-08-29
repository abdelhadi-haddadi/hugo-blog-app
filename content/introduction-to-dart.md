+++
title = "Introduction to Dart"
date = 2025-08-29T19:52:00.285+01:00
draft = false
description = "An introduction to the Dart programming language, developed by Google in 2011. Learn how Dart powers modern application development, especially with Flutter."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Dart

last modified June 4, 2025

This is introduction to the Dart programming language. Dart first appeared in
2011; it is developed by Google. The website of the language is [https://dart.dev/](https://dart.dev/).

An online development environment is available at [https://dartpad.dev/](https://dartpad.dev/).

## Dart Programming Language

Dart is a modern, client-optimized programming language designed for fast 
development of high-performance applications across multiple platforms, 
including mobile, desktop, server, and web. Developed by Google, Dart offers 
a clean and approachable syntax that is easy to learn for developers familiar 
with languages like JavaScript, Java, or C#.

Dart is particularly well-suited for building user interfaces, thanks to 
its efficient rendering engine and smooth integration with frameworks like 
**Flutter**. It enables hot reload, allowing developers to see 
changes instantly without restarting the app, significantly improving 
productivity.

Key features of Dart include:

    - Object-oriented programming model with class-based inheritance.

    - Garbage collection for efficient memory management.

    - C-style syntax, making it familiar to developers from other languages.

    - JIT (Just-in-Time) compilation for fast development cycles.

    - AOT (Ahead-of-Time) compilation for high-performance native execution.

    - Can compile to machine code (native) or JavaScript for browser-based applications.

Dart powers Flutter, Google's UI toolkit for building natively compiled
applications for mobile, web, and desktop from a single codebase. Flutter's
reactive framework takes advantage of Dart's fast execution and rich feature set
to provide beautiful, responsive user interfaces.

Dart continues to evolve, offering developers an efficient way to create modern, 
cross-platform applications with minimal overhead.

## Dart installation

Dart is very easy to install.

$ sudo apt-get install dart

On Debian-based Linux distributions, we can install Dart with the above command.

$ dart --version
Dart SDK version: 2.10.4 (stable) (Unknown timestamp) on "linux_x64"

After successfull installation, we can check the installed version of Dart with 
the --version command.

Dart has a good extension for VS Code called Dart; it contains language support
and debugger for Visual Studio Code.

## Dart simple example

The following is a simple example in Dart.

main.dart
  

void main() {
  print('First program in Dart');
}

The program prints a message to the console. Dart programs have the
main.dart extension. The main function is the entry point 
to the program. The function name is preceded with the void keyword
indicating that the function does not return anything.

The body of the function is enclosed in a pair of curly brackets.
The print function displays a message in console. The statements 
are terminated with a semicolon.

$ dart main.dart
First program in Dart

## Dart variables

Variables store references to values.

main.dart
  

void main() {
  String name = 'John Doe';
  int age = 34;

  print('$name is $age years old');
}

In the example, we have a string and a integer variable. The names of the 
variables are preceded with String and int data types.

String name = 'John Doe';

We can create string literals both with single and double quotes.

print('$name is $age years old');

Dart supports variable interpolation in strings. The variables preceded with 
the $ character are evaluated to their values inside strings.

$ dart main.dart
John Doe is 34 years old

## Dart user input

The dart:io library provides file, socket, HTTP, and other I/O
support for non-web applications.

main.dart
  

import 'dart:io';

void main() {
  stdout.write("Enter your name: ");
  var name = stdin.readLineSync();
  print('Hello $name\n');
}

The example prompts the user for his name and prints a message.

stdout.write("Enter your name: ");

We can use the stdout.write function to write to the console
without a newline character.

var name = stdin.readLineSync();

We read the user input with stdin.readLineSync.

$ dart main.dart
Enter your name: Peter
Hello Peter

## Source

[Dart Guides](https://dart.dev/guides)

This was an introduction to the Dart programming language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).