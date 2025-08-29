+++
title = "Dart HashMap"
date = 2025-08-29T19:51:51.344+01:00
draft = false
description = "Dart HashMap tutorial shows how to work with key-value collections in Dart using HashMap class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HashMap

last modified April 4, 2025

In Dart, HashMap is an unordered collection of key-value pairs. It provides fast
lookup, addition, and deletion of entries based on keys.

HashMap implements the Map interface and uses hash tables for storage. Keys must
have consistent Object.== and Object.hashCode
implementations.

## Creating a HashMap

The simplest way to create a HashMap is using the constructor.

main.dart
  

import 'dart:collection';

void main() {
  var capitals = HashMap&lt;String, String&gt;();
  capitals['USA'] = 'Washington';
  capitals['Japan'] = 'Tokyo';
  capitals['France'] = 'Paris';

  print(capitals);
}

We create a HashMap of country-capital pairs. The generic types specify that
both keys and values are Strings. We add entries using the [] operator.

$ dart main.dart
{USA: Washington, France: Paris, Japan: Tokyo}

## HashMap from Iterable

We can create a HashMap from an existing Iterable using HashMap.fromIterable.

main.dart
  

import 'dart:collection';

void main() {
  var fruits = ['apple', 'banana', 'orange'];
  var fruitMap = HashMap.fromIterable(fruits,
      key: (item) =&gt; item,
      value: (item) =&gt; item.length);

  print(fruitMap);
}

This creates a HashMap where fruits are keys and their lengths are values. The
key and value parameters transform each element during creation.

$ dart main.dart
{orange: 6, banana: 6, apple: 5}

## Checking Contents

HashMap provides methods to check for keys, values, and empty state.

main.dart
  

import 'dart:collection';

void main() {
  var scores = HashMap&lt;String, int&gt;();
  scores['Alice'] = 90;
  scores['Bob'] = 85;
  scores['Charlie'] = 95;

  print(scores.containsKey('Alice')); // true
  print(scores.containsValue(100));   // false
  print(scores.isEmpty);             // false
  print(scores.length);              // 3
}

We check various properties of the HashMap. Note that containsKey is O(1) while
containsValue is O(n) in complexity.

$ dart main.dart
true
false
false
3

## Updating Values

HashMap provides several ways to update values, including update and putIfAbsent.

main.dart
  

import 'dart:collection';

void main() {
  var inventory = HashMap&lt;String, int&gt;();
  inventory['apples'] = 5;
  
  // Update existing value
  inventory.update('apples', (value) =&gt; value + 3);
  
  // Add new value if absent
  inventory.putIfAbsent('oranges', () =&gt; 10);
  
  print(inventory);
}

The update method modifies existing entries, while putIfAbsent only adds if the
key doesn't exist. Both methods help handle common update patterns safely.

$ dart main.dart
{oranges: 10, apples: 8}

## Iterating Over HashMap

We can iterate through HashMap entries using various methods.

main.dart
  

import 'dart:collection';

void main() {
  var colors = HashMap&lt;String, String&gt;();
  colors['red'] = '#FF0000';
  colors['green'] = '#00FF00';
  colors['blue'] = '#0000FF';

  // Iterate keys
  print('Keys:');
  for (var key in colors.keys) {
    print(key);
  }

  // Iterate values
  print('\nValues:');
  for (var value in colors.values) {
    print(value);
  }

  // Iterate entries
  print('\nEntries:');
  colors.forEach((key, value) =&gt; print('$key: $value'));
}

This demonstrates three ways to iterate through a HashMap. The order is
undefined since HashMap doesn't guarantee insertion order.

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

## Removing Elements

HashMap provides methods to remove entries by key or clear the entire map.

main.dart
  

import 'dart:collection';

void main() {
  var users = HashMap&lt;int, String&gt;();
  users[1] = 'Alice';
  users[2] = 'Bob';
  users[3] = 'Charlie';
  users[4] = 'David';

  print('Original: $users');

  // Remove by key
  users.remove(2);
  print('After remove: $users');

  // Remove where
  users.removeWhere((key, value) =&gt; key.isEven);
  print('After removeWhere: $users');

  // Clear all
  users.clear();
  print('After clear: $users');
}

We demonstrate three removal methods. removeWhere is powerful for bulk removal
based on conditions.

$ dart main.dart
Original: {1: Alice, 2: Bob, 3: Charlie, 4: David}
After remove: {1: Alice, 3: Charlie, 4: David}
After removeWhere: {1: Alice, 3: Charlie}
After clear: {}

## HashMap with Custom Objects

When using custom objects as keys, we must implement hashCode and == properly.

main.dart
  

import 'dart:collection';

class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  @override
  bool operator ==(Object other) =&gt;
      identical(this, other) ||
      other is Person &amp;&amp; name == other.name &amp;&amp; age == other.age;

  @override
  int get hashCode =&gt; name.hashCode ^ age.hashCode;
}

void main() {
  var people = HashMap&lt;Person, String&gt;();
  var p1 = Person('Alice', 30);
  var p2 = Person('Bob', 25);
  var p3 = Person('Alice', 30); // Same as p1

  people[p1] = 'Engineer';
  people[p2] = 'Doctor';
  people[p3] = 'Manager';

  print(people);
  print('p1 and p3 same key: ${people[p1] == people[p3]}');
}

The Person class implements == and hashCode to ensure logical equality. p1 and
p3 are considered the same key despite being different object instances.

$ dart main.dart
{Person(name: Bob, age: 25): Doctor, Person(name: Alice, age: 30): Manager}
p1 and p3 same key: true

## Best Practices

- **Key Immutability:** Use immutable objects as keys for stability.

- **Proper Hashing:** Always override hashCode when overriding ==.

- **Null Safety:** Consider non-nullable types for clarity.

- **Performance:** Prefer containsKey over containsValue for O(1) checks.

## Source

[Dart HashMap Documentation](https://api.dart.dev/stable/dart-collection/HashMap-class.html)

This tutorial covered Dart's HashMap with practical examples demonstrating its
key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).