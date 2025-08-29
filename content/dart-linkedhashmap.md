+++
title = "Dart LinkedHashMap"
date = 2025-08-29T19:52:02.520+01:00
draft = false
description = "Dart LinkedHashMap tutorial shows how to work with ordered key-value collections in Dart using LinkedHashMap class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart LinkedHashMap

last modified April 4, 2025

In Dart, LinkedHashMap is an ordered collection of key-value pairs. It maintains
insertion order while providing fast lookup operations.

LinkedHashMap implements the Map interface using a hash table and linked list.
This combination preserves order while maintaining O(1) access time for keys.

## Creating a LinkedHashMap

LinkedHashMap can be created using its constructor or from another Map.

main.dart
  

import 'dart:collection';

void main() {
  var orderedCapitals = LinkedHashMap&lt;String, String&gt;();
  orderedCapitals['USA'] = 'Washington';
  orderedCapitals['Japan'] = 'Tokyo';
  orderedCapitals['France'] = 'Paris';

  print(orderedCapitals);
}

We create a LinkedHashMap of country-capital pairs. The entries will be printed
in the same order they were inserted, unlike regular HashMap.

$ dart main.dart
{USA: Washington, Japan: Tokyo, France: Paris}

## LinkedHashMap.from

We can create a LinkedHashMap from an existing Map while preserving order.

main.dart
  

import 'dart:collection';

void main() {
  var unordered = {'z': 1, 'a': 2, 'm': 3};
  var ordered = LinkedHashMap.from(unordered);

  print('Original: $unordered');
  print('LinkedHashMap: $ordered');
}

The LinkedHashMap.from constructor creates a new map with the same entries.
The insertion order is preserved from the original map's iteration order.

$ dart main.dart
Original: {z: 1, a: 2, m: 3}
LinkedHashMap: {z: 1, a: 2, m: 3}

## Maintaining Insertion Order

LinkedHashMap preserves insertion order even when entries are modified.

main.dart
  

import 'dart:collection';

void main() {
  var tasks = LinkedHashMap&lt;int, String&gt;();
  tasks[1] = 'Buy groceries';
  tasks[2] = 'Clean house';
  tasks[3] = 'Pay bills';

  // Modify existing entry
  tasks[2] = 'Deep clean house';
  
  // Add new entry
  tasks[4] = 'Walk dog';

  print(tasks);
}

Modifying an existing value doesn't change its position in the iteration order.
New entries are always added to the end of the iteration sequence.

$ dart main.dart
{1: Buy groceries, 2: Deep clean house, 3: Pay bills, 4: Walk dog}

## Accessing First and Last Elements

LinkedHashMap provides easy access to its first and last entries.

main.dart
  

import 'dart:collection';

void main() {
  var colors = LinkedHashMap&lt;String, String&gt;();
  colors['red'] = '#FF0000';
  colors['green'] = '#00FF00';
  colors['blue'] = '#0000FF';

  print('First key: ${colors.keys.first}');
  print('Last value: ${colors.values.last}');
  print('First entry: ${colors.entries.first}');
}

We can access the first and last elements through keys, values, or entries.
This is particularly useful for ordered collections like LinkedHashMap.

$ dart main.dart
First key: red
Last value: #0000FF
First entry: MapEntry(red: #FF0000)

## Removing Elements While Preserving Order

Removing elements from LinkedHashMap maintains the order of remaining entries.

main.dart
  

import 'dart:collection';

void main() {
  var inventory = LinkedHashMap&lt;String, int&gt;();
  inventory['apples'] = 10;
  inventory['bananas'] = 5;
  inventory['oranges'] = 8;
  inventory['pears'] = 12;

  print('Original: $inventory');
  
  inventory.remove('bananas');
  print('After remove: $inventory');
  
  inventory.removeWhere((key, value) =&gt; value &lt; 9);
  print('After removeWhere: $inventory');
}

When removing entries, the remaining elements keep their original order.
The removeWhere method filters based on a condition while preserving order.

$ dart main.dart
Original: {apples: 10, bananas: 5, oranges: 8, pears: 12}
After remove: {apples: 10, oranges: 8, pears: 12}
After removeWhere: {apples: 10, pears: 12}

## Best Practices

- **Order Matters:** Use LinkedHashMap when insertion order is important.

- **Memory Consideration:** LinkedHashMap uses more memory than HashMap.

- **Performance:** Both have O(1) access time but LinkedHashMap has overhead.

- **Key Consistency:** Ensure keys have proper hashCode and == implementations.

## Source

[Dart LinkedHashMap Documentation](https://api.dart.dev/stable/dart-collection/LinkedHashMap-class.html)

This tutorial covered Dart's LinkedHashMap with examples demonstrating its
ordered nature and key features compared to regular HashMap.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).