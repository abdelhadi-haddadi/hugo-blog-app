+++
title = "Dart UnmodifiableMapView"
date = 2025-08-29T19:52:31.757+01:00
draft = false
description = "Dart UnmodifiableMapView tutorial shows how to work with immutable map views in Dart using UnmodifiableMapView class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart UnmodifiableMapView

last modified April 4, 2025

In Dart, UnmodifiableMapView is an unmodifiable view of a Map. It provides
read-only access to an existing Map while preventing modifications.

UnmodifiableMapView implements the Map interface but
throws exceptions for modification operations. It's useful for exposing internal
maps safely.

## Creating an UnmodifiableMapView

The simplest way to create an UnmodifiableMapView is using the constructor.

main.dart
  

import 'dart:collection';

void main() {
  
  var originalMap = {'a': 1, 'b': 2, 'c': 3};
  var unmodifiableView = UnmodifiableMapView(originalMap);

  print(unmodifiableView);
  
  try {
    unmodifiableView['d'] = 4; // Throws
  } catch (e) {
    print('Error: $e');
  }
}

We create an unmodifiable view of a regular map. Attempting to modify it throws
an UnsupportedError. The view reflects changes to the original map.

$ dart main.dart
{a: 1, b: 2, c: 3}
Error: Unsupported operation: Cannot modify unmodifiable map

## UnmodifiableMapView with Map Methods

UnmodifiableMapView supports all read operations from the Map interface.

main.dart
  

import 'dart:collection';

void main() {
  
  var scores = {'Alice': 95, 'Bob': 87, 'Charlie': 92};
  var view = UnmodifiableMapView(scores);

  print('Alice\'s score: ${view['Alice']}');
  print('Contains Bob? ${view.containsKey('Bob')}');
  print('Keys: ${view.keys}');
  print('Values: ${view.values}');
  print('Length: ${view.length}');
}

We demonstrate various read operations on an UnmodifiableMapView. All these
operations work the same as with regular maps but are safe from modifications.

$ dart main.dart
Alice's score: 95
Contains Bob? true
Keys: (Alice, Bob, Charlie)
Values: (95, 87, 92)
Length: 3

## Dynamic Updates from Original Map

UnmodifiableMapView reflects changes made to the original underlying map.

main.dart
  

import 'dart:collection';

void main() {
  
  var original = {'x': 10, 'y': 20};
  var view = UnmodifiableMapView(original);

  print('Initial view: $view');
  
  original['z'] = 30;
  print('After original modification: $view');
  
  original.remove('x');
  print('After original removal: $view');
}

Changes to the original map are immediately visible in the view. The view itself
remains unmodifiable while the original can still be changed.

$ dart main.dart
Initial view: {x: 10, y: 20}
After original modification: {x: 10, y: 20, z: 30}
After original removal: {y: 20, z: 30}

## Iterating Over UnmodifiableMapView

UnmodifiableMapView supports all standard map iteration methods.

main.dart
  

import 'dart:collection';

void main() {
  
  var colors = {'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF'};
  var unmodifiableColors = UnmodifiableMapView(colors);

  print('Keys:');
  for (var key in unmodifiableColors.keys) {
    print(key);
  }

  print('\nValues:');
  for (var value in unmodifiableColors.values) {
    print(value);
  }

  print('\nEntries:');
  unmodifiableColors.forEach((key, value) =&gt; print('$key: $value'));
}

We demonstrate three ways to iterate through an UnmodifiableMapView. The view
maintains the same iteration order as the original map.

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

## UnmodifiableMapView with Custom Objects

UnmodifiableMapView works with custom objects just like regular maps.

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
  
  var products = {
    Product('p1', 'Laptop'): 999,
    Product('p2', 'Phone'): 699,
  };
  
  var unmodifiableProducts = UnmodifiableMapView(products);
  
  var searchKey = Product('p1', 'Laptop');
  print('Laptop price: \$${unmodifiableProducts[searchKey]}');
  
  try {
    unmodifiableProducts[Product('p3', 'Tablet')] = 299;
  } catch (e) {
    print('Error: $e');
  }
}

We use custom Product objects as keys in an UnmodifiableMapView. The view
correctly handles key lookups while preventing modifications.

$ dart main.dart
Laptop price: $999
Error: Unsupported operation: Cannot modify unmodifiable map

## Best Practices

- **Immutable Exposure:** Use to safely expose internal maps.

- **Performance:** No overhead compared to original map.

- **Documentation:** Clearly document returned views as unmodifiable.

- **Null Safety:** Works well with non-nullable types.

## Source

[Dart UnmodifiableMapView Documentation](https://api.dart.dev/stable/dart-collection/UnmodifiableMapView-class.html)

This tutorial covered Dart's UnmodifiableMapView with practical examples
demonstrating its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).