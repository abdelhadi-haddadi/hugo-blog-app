+++
title = "Dart SetBase"
date = 2025-08-29T19:52:22.848+01:00
draft = false
description = "Dart SetBase tutorial shows how to work with unique element collections in Dart using SetBase class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SetBase

last modified April 4, 2025

In Dart, SetBase is an abstract base class for sets that contains common
functionality for all Set implementations. It provides operations for
working with collections of unique elements.

SetBase implements the core Set interface and provides default
implementations for many methods. All elements in a Set must be unique
and must have consistent Object.== implementations.

## Creating a Set with SetBase

While SetBase is abstract, we can use its concrete implementations like
HashSet to demonstrate its functionality.

main.dart
  

import 'dart:collection';

void main() {
  var numbers = HashSet&lt;int&gt;();
  numbers.add(1);
  numbers.add(2);
  numbers.add(3);
  numbers.add(2); // Duplicate, won't be added

  print(numbers);
}

We create a HashSet which extends SetBase. We add elements using add(),
and duplicates are automatically ignored. The generic type specifies
that we're storing integers.

$ dart main.dart
{1, 2, 3}

## Set Operations

SetBase provides standard set operations like union, intersection, and
difference.

main.dart
  

import 'dart:collection';

void main() {
  var set1 = HashSet&lt;int&gt;.from([1, 2, 3, 4]);
  var set2 = HashSet&lt;int&gt;.from([3, 4, 5, 6]);

  print('Union: ${set1.union(set2)}');
  print('Intersection: ${set1.intersection(set2)}');
  print('Difference: ${set1.difference(set2)}');
}

We demonstrate three fundamental set operations. Union combines elements
from both sets, intersection finds common elements, and difference shows
elements in set1 not in set2.

$ dart main.dart
Union: {1, 2, 3, 4, 5, 6}
Intersection: {3, 4}
Difference: {1, 2}

## Checking Set Contents

SetBase provides methods to check for element existence and set relationships.

main.dart
  

import 'dart:collection';

void main() {
  var fruits = HashSet&lt;String&gt;.from(['apple', 'banana', 'orange']);

  print(fruits.contains('apple')); // true
  print(fruits.contains('grape')); // false
  print(fruits.containsAll(['apple', 'banana'])); // true
  print(fruits.isEmpty); // false
  print(fruits.length); // 3
}

We check various properties of the set. contains() checks for single
elements while containsAll() verifies multiple elements. isEmpty and
length provide size information.

$ dart main.dart
true
false
true
false
3

## Modifying Sets

SetBase provides methods to modify sets including adding and removing
elements.

main.dart
  

import 'dart:collection';

void main() {
  var colors = HashSet&lt;String&gt;.from(['red', 'green', 'blue']);

  // Add elements
  colors.add('yellow');
  colors.addAll(['purple', 'cyan']);

  // Remove elements
  colors.remove('green');
  colors.removeWhere((color) =&gt; color.startsWith('b'));

  print(colors);
}

We demonstrate adding single elements with add() and multiple elements
with addAll(). We remove elements with remove() and conditionally with
removeWhere().

$ dart main.dart
{red, yellow, purple, cyan}

## Iterating Over Sets

SetBase provides multiple ways to iterate through set elements.

main.dart
  

import 'dart:collection';

void main() {
  var primes = HashSet&lt;int&gt;.from([2, 3, 5, 7, 11]);

  // Using for-in loop
  print('For-in loop:');
  for (var prime in primes) {
    print(prime);
  }

  // Using forEach
  print('\nForEach:');
  primes.forEach((prime) =&gt; print(prime));

  // Using iterator
  print('\nIterator:');
  var it = primes.iterator;
  while (it.moveNext()) {
    print(it.current);
  }
}

We demonstrate three iteration methods. The order is undefined as HashSet
doesn't guarantee element ordering. All methods provide access to each
element in the set.

$ dart main.dart
For-in loop:
2
3
5
7
11

ForEach:
2
3
5
7
11

Iterator:
2
3
5
7
11

## SetBase with Custom Objects

When using custom objects in sets, proper hashCode and == implementations
are crucial.

main.dart
  

import 'dart:collection';

class Product {
  final String id;
  final String name;

  Product(this.id, this.name);

  @override
  bool operator ==(Object other) =&gt;
      identical(this, other) ||
      other is Product &amp;&amp; id == other.id &amp;&amp; name == other.name;

  @override
  int get hashCode =&gt; id.hashCode ^ name.hashCode;
}

void main() {
  var products = HashSet&lt;Product&gt;();
  var p1 = Product('1', 'Laptop');
  var p2 = Product('2', 'Phone');
  var p3 = Product('1', 'Laptop'); // Same as p1

  products.add(p1);
  products.add(p2);
  products.add(p3);

  print('Set size: ${products.length}');
  print('Contains p1: ${products.contains(p1)}');
  print('Contains p3: ${products.contains(p3)}');
}

The Product class implements == and hashCode to ensure logical equality.
p1 and p3 are considered equal, so p3 isn't added to the set. This
maintains the uniqueness guarantee of sets.

$ dart main.dart
Set size: 2
Contains p1: true
Contains p3: true

## Best Practices

- **Element Uniqueness:** Ensure proper == and hashCode for custom elements.

- **Immutable Elements:** Prefer immutable elements to prevent set corruption.

- **Performance:** Use contains() for O(1) membership checks.

- **Null Safety:** Consider non-nullable types for clearer semantics.

## Source

[Dart SetBase Documentation](https://api.dart.dev/stable/dart-collection/SetBase-class.html)

This tutorial covered Dart's SetBase with practical examples demonstrating its
key features and usage patterns for working with unique element collections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).