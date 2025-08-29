+++
title = "Dart HashSet"
date = 2025-08-29T19:51:51.351+01:00
draft = false
description = "Dart HashSet tutorial shows how to work with unordered collections in Dart using HashSet class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HashSet

last modified April 4, 2025

In Dart, HashSet is an unordered collection of unique elements. It provides
fast lookup, addition, and deletion operations using hash tables.

HashSet implements the Set interface and requires elements to have consistent
Object.== and Object.hashCode implementations.
Duplicate elements are not allowed.

## Creating a HashSet

The simplest way to create a HashSet is using the constructor. We can specify
the element type and optional equality comparer.

main.dart
  

import 'dart:collection';

void main() {
  var colors = HashSet&lt;String&gt;();
  colors.add('red');
  colors.add('green');
  colors.add('blue');
  colors.add('red'); // Duplicate ignored

  print(colors);
}

We create a HashSet of colors. The generic type specifies String elements.
We add items using add(), and duplicates are automatically ignored.

$ dart main.dart
{red, green, blue}

## HashSet from Iterable

We can create a HashSet from an existing Iterable using HashSet.from constructor.
This automatically removes duplicates.

main.dart
  

import 'dart:collection';

void main() {
  var numbers = [1, 2, 3, 2, 4, 1, 5];
  var uniqueNumbers = HashSet.from(numbers);

  print('Original: $numbers');
  print('Unique: $uniqueNumbers');
}

This creates a HashSet from a list with duplicates. The resulting HashSet
contains only unique values from the original list.

$ dart main.dart
Original: [1, 2, 3, 2, 4, 1, 5]
Unique: {1, 2, 3, 4, 5}

## Checking Contents

HashSet provides methods to check for element presence and collection state.
These operations are typically O(1) complexity.

main.dart
  

import 'dart:collection';

void main() {
  var primes = HashSet.from([2, 3, 5, 7, 11]);

  print(primes.contains(5));    // true
  print(primes.contains(4));    // false
  print(primes.isEmpty);       // false
  print(primes.length);        // 5
  print(primes.first);         // 2 (arbitrary)
}

We check various properties of the HashSet. The first element is arbitrary
since HashSet doesn't maintain insertion order.

$ dart main.dart
true
false
false
5
2

## Set Operations

HashSet supports standard set operations like union, intersection, and difference.
These methods return new sets without modifying the original.

main.dart
  

import 'dart:collection';

void main() {
  var setA = HashSet.from([1, 2, 3, 4]);
  var setB = HashSet.from([3, 4, 5, 6]);

  print('Union: ${setA.union(setB)}');
  print('Intersection: ${setA.intersection(setB)}');
  print('Difference: ${setA.difference(setB)}');
}

We demonstrate three fundamental set operations. Each operation creates a new
HashSet containing the result of the operation.

$ dart main.dart
Union: {1, 2, 3, 4, 5, 6}
Intersection: {3, 4}
Difference: {1, 2}

## Iterating Over HashSet

We can iterate through HashSet elements using various methods. The iteration
order is undefined but consistent for the same set.

main.dart
  

import 'dart:collection';

void main() {
  var languages = HashSet.from(['Dart', 'Java', 'Python', 'Go']);

  print('For loop:');
  for (var lang in languages) {
    print(lang);
  }

  print('\nForEach:');
  languages.forEach((lang) =&gt; print(lang));

  print('\nIterator:');
  var it = languages.iterator;
  while (it.moveNext()) {
    print(it.current);
  }
}

This demonstrates three ways to iterate through a HashSet. All methods
will process elements in the same (arbitrary) order for a given set.

$ dart main.dart
For loop:
Dart
Java
Python
Go

ForEach:
Dart
Java
Python
Go

Iterator:
Dart
Java
Python
Go

## Removing Elements

HashSet provides methods to remove elements individually or clear the entire set.
These operations are typically O(1) complexity.

main.dart
  

import 'dart:collection';

void main() {
  var fruits = HashSet.from(['apple', 'banana', 'orange', 'kiwi']);

  print('Original: $fruits');

  fruits.remove('banana');
  print('After remove: $fruits');

  fruits.removeWhere((fruit) =&gt; fruit.length &gt; 5);
  print('After removeWhere: $fruits');

  fruits.clear();
  print('After clear: $fruits');
}

We demonstrate element removal methods. removeWhere allows filtering
elements based on a condition, while clear empties the entire set.

$ dart main.dart
Original: {apple, banana, orange, kiwi}
After remove: {apple, orange, kiwi}
After removeWhere: {apple, kiwi}
After clear: {}

## HashSet with Custom Objects

When using custom objects in HashSet, we must implement hashCode and == properly.
This ensures correct behavior for uniqueness and lookups.

main.dart
  

import 'dart:collection';

class Book {
  final String title;
  final String author;

  Book(this.title, this.author);

  @override
  bool operator ==(Object other) =&gt;
      identical(this, other) ||
      other is Book &amp;&amp; title == other.title &amp;&amp; author == other.author;

  @override
  int get hashCode =&gt; title.hashCode ^ author.hashCode;
}

void main() {
  var library = HashSet&lt;Book&gt;();
  var book1 = Book('Dart in Depth', 'John Doe');
  var book2 = Book('Flutter Basics', 'Jane Smith');
  var book3 = Book('Dart in Depth', 'John Doe'); // Same as book1

  library.add(book1);
  library.add(book2);
  library.add(book3);

  print('Library size: ${library.length}');
  print('book1 and book3 same: ${library.contains(book1) == library.contains(book3)}');
}

The Book class implements == and hashCode to ensure logical equality.
book1 and book3 are considered the same, so only one is added to the set.

$ dart main.dart
Library size: 2
book1 and book3 same: true

## Best Practices

- **Element Immutability:** Use immutable objects for stable hashing.

- **Proper Hashing:** Always override hashCode when overriding ==.

- **Null Safety:** Consider non-nullable types for clarity.

- **Performance:** HashSet excels at contains checks (O(1)).

- **Ordering:** Don't rely on iteration order being consistent.

## Source

[Dart HashSet Documentation](https://api.dart.dev/stable/dart-collection/HashSet-class.html)

This tutorial covered Dart's HashSet with practical examples demonstrating its
key features and usage patterns for unordered unique collections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).