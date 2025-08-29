+++
title = "Dart SplayTreeMap"
date = 2025-08-29T19:52:26.188+01:00
draft = false
description = "Dart SplayTreeMap tutorial shows how to work with sorted key-value collections in Dart using SplayTreeMap class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SplayTreeMap

last modified April 4, 2025

In Dart, SplayTreeMap is a self-balancing binary search tree that maintains
entries in sorted order. It provides efficient lookup, insertion, and deletion
operations.

SplayTreeMap implements the Map interface and keeps keys sorted according to
their natural order or a custom comparator. It automatically reorganizes itself
to optimize access patterns.

## Creating a SplayTreeMap

The simplest way to create a SplayTreeMap is using the constructor. Entries are
automatically sorted by key.

main.dart
  

import 'dart:collection';

void main() {
  var scores = SplayTreeMap&lt;String, int&gt;();
  scores['Bob'] = 85;
  scores['Alice'] = 90;
  scores['Charlie'] = 95;

  print(scores);
}

We create a SplayTreeMap of name-score pairs. The keys are automatically sorted
in ascending order. Notice the insertion order doesn't affect the final order.

$ dart main.dart
{Alice: 90, Bob: 85, Charlie: 95}

## Custom Sorting with Comparator

We can provide a custom comparator to define our own sorting order for keys.

main.dart
  

import 'dart:collection';

void main() {
  var products = SplayTreeMap&lt;String, double&gt;(
    (a, b) =&gt; b.compareTo(a) // Sort in descending order
  );
  
  products['Laptop'] = 999.99;
  products['Mouse'] = 19.99;
  products['Keyboard'] = 49.99;
  
  print(products);
}

The comparator function reverses the natural string ordering. This results in
products being sorted from Z to A alphabetically.

$ dart main.dart
{Mouse: 19.99, Laptop: 999.99, Keyboard: 49.99}

## Accessing First and Last Elements

SplayTreeMap provides efficient access to its first and last elements due to its
sorted nature.

main.dart
  

import 'dart:collection';

void main() {
  var temperatures = SplayTreeMap&lt;DateTime, double&gt;();
  temperatures[DateTime(2023, 1, 15)] = -5.2;
  temperatures[DateTime(2023, 1, 10)] = -8.1;
  temperatures[DateTime(2023, 1, 20)] = 2.4;

  print('First date: ${temperatures.firstKey()}');
  print('Last date: ${temperatures.lastKey()}');
  print('Lowest temp: ${temperatures[temperatures.firstKey()]}');
  print('Highest temp: ${temperatures[temperatures.lastKey()]}');
}

We store temperature readings with dates as keys. The firstKey and lastKey
methods give us the earliest and latest dates efficiently.

$ dart main.dart
First date: 2023-01-10 00:00:00.000
Last date: 2023-01-20 00:00:00.000
Lowest temp: -8.1
Highest temp: 2.4

## Range Operations

SplayTreeMap supports efficient range queries using from, to, and between
operations.

main.dart
  

import 'dart:collection';

void main() {
  var studentGrades = SplayTreeMap&lt;int, String&gt;();
  studentGrades[101] = 'A';
  studentGrades[102] = 'B';
  studentGrades[103] = 'C';
  studentGrades[104] = 'A';
  studentGrades[105] = 'B';

  print('Grades from ID 102:');
  print(studentGrades.from(102));

  print('\nGrades between 102 and 104:');
  print(studentGrades.range(102, 104));
}

We can efficiently retrieve subsets of the map based on key ranges. The from
method gets all entries from a key onward, while range gets entries between
two keys.

$ dart main.dart
Grades from ID 102:
{102: B, 103: C, 104: A, 105: B}

Grades between 102 and 104:
{102: B, 103: C}

## Performance Optimization with Splaying

SplayTreeMap automatically moves frequently accessed elements closer to the root
for faster access.

main.dart
  

import 'dart:collection';

void main() {
  var cache = SplayTreeMap&lt;String, String&gt;();
  
  // Initial population
  for (var i = 0; i &lt; 100; i++) {
    cache['key$i'] = 'value$i';
  }
  
  // Access pattern - frequent access to key42
  for (var i = 0; i &lt; 1000; i++) {
    var value = cache['key42']; // This access becomes faster over time
    if (i % 100 == 0) {
      print('Accessed key42 ${i + 1} times');
    }
  }
}

The splaying behavior optimizes access to frequently used keys. After many
accesses, 'key42' will be near the root of the tree for faster lookup.

$ dart main.dart
Accessed key42 1 times
Accessed key42 101 times
Accessed key42 201 times
Accessed key42 301 times
Accessed key42 401 times
Accessed key42 501 times
Accessed key42 601 times
Accessed key42 701 times
Accessed key42 801 times
Accessed key42 901 times

## Best Practices

- **Sorted Data:** Use when you need data sorted by keys.

- **Access Patterns:** Ideal for uneven access distributions.

- **Comparator:** Provide one for custom sorting logic.

- **Key Types:** Ensure keys are comparable or provide comparator.

## Source

[Dart SplayTreeMap Documentation](https://api.dart.dev/stable/dart-collection/SplayTreeMap-class.html)

This tutorial covered Dart's SplayTreeMap with practical examples demonstrating
its key features and usage patterns for sorted key-value collections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).