+++
title = "Dart UnmodifiableSetView"
date = 2025-08-29T19:52:32.863+01:00
draft = false
description = "Dart UnmodifiableSetView tutorial shows how to work with immutable set views in Dart using UnmodifiableSetView class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart UnmodifiableSetView

last modified April 4, 2025

In Dart, UnmodifiableSetView is an immutable view of a Set that prevents
modifications to the underlying collection. It wraps an existing Set.

UnmodifiableSetView implements the Set interface but throws exceptions for
modification operations. It's useful for providing read-only access to sets.

## Creating an UnmodifiableSetView

The simplest way to create an UnmodifiableSetView is using the constructor.

main.dart
  

import 'dart:collection';

void main() {
  var numbers = {1, 2, 3};
  var unmodifiableView = UnmodifiableSetView(numbers);
  
  print(unmodifiableView);
  
  try {
    unmodifiableView.add(4); // Will throw
  } catch (e) {
    print('Error: $e');
  }
}

We create an UnmodifiableSetView from a regular Set. Attempting to modify it
throws an UnsupportedError. The view reflects changes to the original Set.

$ dart main.dart
{1, 2, 3}
Error: Unsupported operation: Cannot modify an unmodifiable set

## UnmodifiableSetView from Set.unmodifiable

Dart's Set.unmodifiable factory creates an UnmodifiableSetView internally.

main.dart
  

import 'dart:collection';

void main() {
  var colors = {'red', 'green', 'blue'};
  var unmodifiableColors = Set.unmodifiable(colors);
  
  print(unmodifiableColors.runtimeType);
  print(unmodifiableColors);
  
  // Changes to original don't affect the unmodifiable copy
  colors.add('yellow');
  print(unmodifiableColors);
}

Set.unmodifiable creates a snapshot of the original Set. Unlike
UnmodifiableSetView, changes to the original Set don't affect the copy.

$ dart main.dart
UnmodifiableSetView&lt;String&gt;
{red, green, blue}
{red, green, blue}

## Checking Contents

UnmodifiableSetView supports all read operations of the Set interface.

main.dart
  

import 'dart:collection';

void main() {
  var fruits = {'apple', 'banana', 'orange'};
  var view = UnmodifiableSetView(fruits);
  
  print('Contains apple: ${view.contains('apple')}');
  print('Length: ${view.length}');
  print('First element: ${view.first}');
  print('Last element: ${view.last}');
  print('Is empty: ${view.isEmpty}');
}

We demonstrate various read operations available on UnmodifiableSetView. These
operations work the same as on regular Sets but are guaranteed to be safe.

$ dart main.dart
Contains apple: true
Length: 3
First element: apple
Last element: orange
Is empty: false

## Iterating Over UnmodifiableSetView

UnmodifiableSetView supports all standard Set iteration methods.

main.dart
  

import 'dart:collection';

void main() {
  var primes = {2, 3, 5, 7, 11};
  var primeView = UnmodifiableSetView(primes);
  
  print('Using for-in:');
  for (var prime in primeView) {
    print(prime);
  }
  
  print('\nUsing forEach:');
  primeView.forEach(print);
  
  print('\nUsing where:');
  var largePrimes = primeView.where((p) =&gt; p &gt; 5);
  print(largePrimes);
}

We demonstrate three ways to iterate through an UnmodifiableSetView. The view
provides the same iteration capabilities as a regular Set but is immutable.

$ dart main.dart
Using for-in:
2
3
5
7
11

Using forEach:
2
3
5
7
11

Using where:
(7, 11)

## Set Operations

UnmodifiableSetView supports non-modifying Set operations like union and intersection.

main.dart
  

import 'dart:collection';

void main() {
  var setA = UnmodifiableSetView({1, 2, 3, 4});
  var setB = UnmodifiableSetView({3, 4, 5, 6});
  
  print('Union: ${setA.union(setB)}');
  print('Intersection: ${setA.intersection(setB)}');
  print('Difference: ${setA.difference(setB)}');
  
  print('\nLookups:');
  print('Contains 3: ${setA.contains(3)}');
  print('Lookup 5: ${setA.lookup(5)}');
}

These operations return new Sets rather than modifying the existing view. The
original UnmodifiableSetView remains unchanged after these operations.

$ dart main.dart
Union: {1, 2, 3, 4, 5, 6}
Intersection: {3, 4}
Difference: {1, 2}

Lookups:
Contains 3: true
Lookup 5: null

## Best Practices

- **Immutable APIs:** Use UnmodifiableSetView for public APIs that shouldn't be modified.

- **Performance:** Prefer UnmodifiableSetView over copying for large Sets.

- **Defensive Programming:** Wrap Sets in views when passing to untrusted code.

- **Documentation:** Clearly document when APIs return unmodifiable views.

## Source

[Dart UnmodifiableSetView Documentation](https://api.dart.dev/stable/dart-collection/UnmodifiableSetView-class.html)

This tutorial covered Dart's UnmodifiableSetView with practical examples
demonstrating its features and usage patterns for immutable Set operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).