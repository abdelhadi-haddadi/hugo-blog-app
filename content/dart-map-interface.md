+++
title = "Dart Map Interface"
date = 2025-08-29T19:52:05.881+01:00
draft = false
description = "Dart Map interface tutorial shows how to work with key-value collections in Dart using Map interface."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Map Interface

last modified April 4, 2025

In Dart, Map is a collection of key-value pairs where each key is unique. It
provides efficient lookup, insertion, and deletion operations.

The Map interface is implemented by classes like HashMap and LinkedHashMap. Keys
must have consistent Object.== and Object.hashCode implementations for proper
functioning.

## Creating a Map

The simplest way to create a Map is using the literal syntax with curly braces.

main.dart
  

void main() {
  var capitals = {
    'USA': 'Washington',
    'Japan': 'Tokyo',
    'France': 'Paris'
  };

  print(capitals);
  print(capitals['Japan']); // Access by key
}

We create a Map of country-capital pairs using literal syntax. The type is
inferred as Map&lt;String, String&gt;. We access values using the [] operator.

$ dart main.dart
{USA: Washington, Japan: Tokyo, France: Paris}
Tokyo

## Map Operations

Basic Map operations include adding, updating, and removing key-value pairs.

main.dart
  

void main() {
  var scores = {'Alice': 90, 'Bob': 85};
  
  // Add new entry
  scores['Charlie'] = 95;
  
  // Update existing entry
  scores['Alice'] = 92;
  
  // Remove entry
  scores.remove('Bob');
  
  print(scores);
  print('Length: ${scores.length}');
}

We demonstrate basic Map operations. The length property returns the number of
key-value pairs. The remove method deletes an entry by its key.

$ dart main.dart
{Alice: 92, Charlie: 95}
Length: 2

## Map Utility Methods

Map provides several utility methods for common operations like containsKey.

main.dart
  

void main() {
  var inventory = {
    'apples': 10,
    'oranges': 5,
    'bananas': 20
  };

  print(inventory.containsKey('apples')); // true
  print(inventory.containsValue(15));    // false
  
  inventory.update('apples', (value) =&gt; value + 5);
  inventory.putIfAbsent('pears', () =&gt; 8);
  
  print(inventory);
}

containsKey checks for key existence, while containsValue checks for values.
update modifies existing values, and putIfAbsent adds new entries safely.

$ dart main.dart
true
false
{apples: 15, oranges: 5, bananas: 20, pears: 8}

## Iterating Over a Map

There are several ways to iterate through a Map's entries, keys, and values.

main.dart
  

void main() {
  var colors = {
    'red': '#FF0000',
    'green': '#00FF00',
    'blue': '#0000FF'
  };

  // Iterate keys
  print('Keys:');
  for (var key in colors.keys) {
    print(key);
  }

  // Iterate values
  print('\nValues:');
  colors.values.forEach(print);

  // Iterate entries
  print('\nEntries:');
  colors.forEach((key, value) =&gt; print('$key: $value'));
}

We demonstrate three iteration approaches. The keys and values properties return
iterables. The forEach method provides both key and value in the callback.

$ dart main.dart
Keys:
red
green
blue

Values:
#FF0000
#00FF00
#0000FF

Entries:
red: #FF0000
green: #00FF00
blue: #0000FF

## Map Transformation

Maps can be transformed using methods like map, where, and addAll.

main.dart
  

void main() {
  var original = {'a': 1, 'b': 2, 'c': 3};
  
  // Transform values
  var squared = original.map((key, value) =&gt; 
      MapEntry(key, value * value));
  
  // Filter entries
  var filtered = Map.fromEntries(original.entries
      .where((entry) =&gt; entry.value &gt; 1));
  
  // Merge maps
  var merged = {...original, 'd': 4, 'e': 5};
  
  print('Squared: $squared');
  print('Filtered: $filtered');
  print('Merged: $merged');
}

The map method creates a new Map by transforming each entry. We filter using
where and spread operator (...) for merging. These operations return new Maps.

$ dart main.dart
Squared: {a: 1, b: 4, c: 9}
Filtered: {b: 2, c: 3}
Merged: {a: 1, b: 2, c: 3, d: 4, e: 5}

## Best Practices

- **Immutable Keys:** Prefer immutable objects for Map keys.

- **Null Safety:** Use nullable types if values can be null.

- **Efficient Lookups:** Use containsKey for key existence checks.

- **Proper Hashing:** Override hashCode when using custom keys.

## Source

[Dart Map Documentation](https://api.dart.dev/stable/dart-core/Map-class.html)

This tutorial covered Dart's Map interface with practical examples demonstrating
its core functionality and common usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).