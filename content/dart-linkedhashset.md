+++
title = "Dart LinkedHashSet"
date = 2025-08-29T19:52:03.681+01:00
draft = false
description = "Dart LinkedHashSet tutorial shows how to work with ordered set collections in Dart using LinkedHashSet class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart LinkedHashSet

last modified April 4, 2025

In Dart, LinkedHashSet is an ordered set implementation that maintains insertion
order. It combines Set and List properties by ensuring uniqueness while
preserving order.

LinkedHashSet implements the Set interface and uses a hash table with a linked
list. Elements must have consistent Object.== and
Object.hashCode implementations.

## Creating a LinkedHashSet

The simplest way to create a LinkedHashSet is using the constructor.

main.dart
  

import 'dart:collection';

void main() {
  var colors = LinkedHashSet&lt;String&gt;();
  colors.add('red');
  colors.add('green');
  colors.add('blue');
  colors.add('red'); // Duplicate ignored

  print(colors);
}

We create a LinkedHashSet of colors. The generic type specifies String elements.
We add elements with add(), and duplicates are automatically ignored.

$ dart main.dart
{red, green, blue}

## LinkedHashSet from Iterable

We can create a LinkedHashSet from an existing Iterable using LinkedHashSet.from.

main.dart
  

import 'dart:collection';

void main() {
  var numbers = [3, 1, 4, 1, 5, 9, 2, 6];
  var uniqueNumbers = LinkedHashSet&lt;int&gt;.from(numbers);

  print('Original: $numbers');
  print('Unique ordered: $uniqueNumbers');
}

This creates a LinkedHashSet from a list with duplicates. The resulting set
contains unique elements in their first occurrence order.

$ dart main.dart
Original: [3, 1, 4, 1, 5, 9, 2, 6]
Unique ordered: {3, 1, 4, 5, 9, 2, 6}

## Checking Contents

LinkedHashSet provides methods to check for elements and set properties.

main.dart
  

import 'dart:collection';

void main() {
  var vowels = LinkedHashSet&lt;String&gt;.from(['a', 'e', 'i', 'o', 'u']);

  print(vowels.contains('e')); // true
  print(vowels.contains('x')); // false
  print(vowels.first);        // a
  print(vowels.last);         // u
  print(vowels.length);       // 5
}

We check various properties of the LinkedHashSet. The first and last properties
reflect insertion order, not alphabetical order.

$ dart main.dart
true
false
a
u
5

## Set Operations

LinkedHashSet supports standard set operations like union, intersection, and
difference.

main.dart
  

import 'dart:collection';

void main() {
  var setA = LinkedHashSet&lt;int&gt;.from([1, 2, 3, 4]);
  var setB = LinkedHashSet&lt;int&gt;.from([3, 4, 5, 6]);

  print('Union: ${setA.union(setB)}');
  print('Intersection: ${setA.intersection(setB)}');
  print('Difference: ${setA.difference(setB)}');
}

These operations return new sets. The union combines elements from both sets,
intersection finds common elements, and difference shows elements in setA not
in setB.

$ dart main.dart
Union: {1, 2, 3, 4, 5, 6}
Intersection: {3, 4}
Difference: {1, 2}

## Iterating Over LinkedHashSet

We can iterate through LinkedHashSet elements while maintaining insertion order.

main.dart
  

import 'dart:collection';

void main() {
  var planets = LinkedHashSet&lt;String&gt;.from([
    'Mercury', 'Venus', 'Earth', 'Mars',
    'Jupiter', 'Saturn', 'Uranus', 'Neptune'
  ]);

  print('Forward order:');
  for (var planet in planets) {
    print(planet);
  }

  print('\nReversed order:');
  for (var planet in planets.toList().reversed) {
    print(planet);
  }
}

This demonstrates iteration in both forward and reversed order. The reversed
iteration requires converting to a list first since sets don't have reverse.

$ dart main.dart
Forward order:
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune

Reversed order:
Neptune
Uranus
Saturn
Jupiter
Mars
Earth
Venus
Mercury

## Removing Elements

LinkedHashSet provides methods to remove elements while maintaining order.

main.dart
  

import 'dart:collection';

void main() {
  var letters = LinkedHashSet&lt;String&gt;.from([
    'A', 'B', 'C', 'D', 'E', 'F', 'G'
  ]);

  print('Original: $letters');

  letters.remove('C');
  print('After remove: $letters');

  letters.removeWhere((letter) =&gt; letter.codeUnitAt(0) % 2 == 0);
  print('After removeWhere: $letters');

  letters.clear();
  print('After clear: $letters');
}

We demonstrate three removal methods. removeWhere filters based on character
codes, removing letters with even ASCII values.

$ dart main.dart
Original: {A, B, C, D, E, F, G}
After remove: {A, B, D, E, F, G}
After removeWhere: {A, D, F}
After clear: {}

## LinkedHashSet with Custom Objects

When using custom objects, we must implement hashCode and == properly.

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

  @override
  String toString() =&gt; '$title by $author';
}

void main() {
  var library = LinkedHashSet&lt;Book&gt;();
  var book1 = Book('1984', 'George Orwell');
  var book2 = Book('Brave New World', 'Aldous Huxley');
  var book3 = Book('1984', 'George Orwell'); // Same as book1

  library.add(book1);
  library.add(book2);
  library.add(book3);

  print(library);
  print('book1 and book3 same: ${library.contains(book3)}');
}

The Book class implements == and hashCode to ensure logical equality. book1 and
book3 are considered the same despite being different object instances.

$ dart main.dart
{1984 by George Orwell, Brave New World by Aldous Huxley}
book1 and book3 same: true

## Best Practices

- **Order Preservation:** Use when insertion order matters.

- **Element Uniqueness:** Ensure elements implement proper == and hashCode.

- **Performance:** O(1) for add/contains/remove operations.

- **Memory:** Uses more memory than HashSet due to order tracking.

## Source

[Dart LinkedHashSet Documentation](https://api.dart.dev/stable/dart-collection/LinkedHashSet-class.html)

This tutorial covered Dart's LinkedHashSet with practical examples demonstrating
its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).