+++
title = "Dart Extension Methods"
date = 2025-08-29T19:51:44.602+01:00
draft = false
description = "Dart extension methods tutorial shows how to use extension methods in Dart language to add functionality to existing classes."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Extension Methods

last modified January 15, 2025

In this article, we show how to use **extension methods** in Dart
language. Extension methods allow you to add functionality to existing classes
without modifying their source code or creating a subclass.

Extension methods are particularly useful when you want to add utility methods
to classes from external libraries or built-in types like String,
int, or List.

## Dart Extension Methods Simple Example

The following example demonstrates how to create and use a simple extension
method in Dart.

main.dart
  

extension StringExtensions on String {
  bool get isPalindrome {
    return this == this.split('').reversed.join('');
  }
}

void main() {
  final word = 'racecar';
  print('Is "$word" a palindrome? ${word.isPalindrome}');
}

In this program, we define an extension method isPalindrome for the
String class. The method checks if a string reads the same backward
as forward.

extension StringExtensions on String {
  bool get isPalindrome {
    return this == this.split('').reversed.join('');
  }
}

We define an extension named StringExtensions that adds a
isPalindrome getter to the String class.

void main() {
  final word = 'racecar';
  print('Is "$word" a palindrome? ${word.isPalindrome}');
}

We use the isPalindrome extension method to check if the string
'racecar' is a palindrome.

$ dart main.dart
Is "racecar" a palindrome? true

## Dart Extension Methods with Parameters

Extension methods can also accept parameters, allowing you to add more flexible
functionality.

main.dart
  

extension NumberExtensions on int {
  int power(int exponent) {
    return this ^ exponent;
  }
}

void main() {
  final number = 2;
  print('$number raised to the power of 3 is ${number.power(3)}');
}

In this program, we define an extension method power for the
int class. The method calculates the power of a number.

extension NumberExtensions on int {
  int power(int exponent) {
    return this ^ exponent;
  }
}

We define an extension named NumberExtensions that adds a
power method to the int class.

void main() {
  final number = 2;
  print('$number raised to the power of 3 is ${number.power(3)}');
}

We use the power extension method to calculate 2 raised to the power of 3.

$ dart main.dart
2 raised to the power of 3 is 8

## Dart Extension Methods with Generic Types

Extension methods can also be defined for generic types, making them reusable
across different data types.

main.dart
  

extension ListExtensions&lt;T&gt; on List&lt;T&gt; {
  List&lt;T&gt; duplicate() {
    return [...this, ...this];
  }
}

void main() {
  final numbers = [1, 2, 3];
  print('Duplicated list: ${numbers.duplicate()}');
}

In this program, we define an extension method duplicate for the
List class. The method duplicates the elements of the list.

extension ListExtensions&lt;T&gt; on List&lt;T&gt; {
  List&lt;T&gt; duplicate() {
    return [...this, ...this];
  }
}

We define an extension named ListExtensions that adds a
duplicate method to the List class. The method works
for any type T.

void main() {
  final numbers = [1, 2, 3];
  print('Duplicated list: ${numbers.duplicate()}');
}

We use the duplicate extension method to duplicate the elements of
a list of integers.

$ dart main.dart
Duplicated list: [1, 2, 3, 1, 2, 3]

## Dart Extension Methods with Static Helpers

Extension methods can also include static helper methods, which are useful for
utility functions.

main.dart
  

extension StringHelpers on String {
  static String capitalize(String input) {
    return input[0].toUpperCase() + input.substring(1);
  }
}

void main() {
  final name = 'alice';
  print('Capitalized name: ${StringHelpers.capitalize(name)}');
}

In this program, we define a static helper method capitalize within
an extension for the String class. The method capitalizes the first
letter of a string.

extension StringHelpers on String {
  static String capitalize(String input) {
    return input[0].toUpperCase() + input.substring(1);
  }
}

We define an extension named StringHelpers that includes a static capitalize method.

void main() {
  final name = 'alice';
  print('Capitalized name: ${StringHelpers.capitalize(name)}');
}

We use the static capitalize method to capitalize the first letter
of the string 'alice'.

$ dart main.dart
Capitalized name: Alice

## Source

[Dart Extension Methods - Language Documentation](https://dart.dev/language/extension-methods)

In this article, we have covered the basics of using extension methods in Dart.
Extension methods are a powerful feature for adding functionality to existing
classes without modifying their source code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).