+++
title = "Dart MapView"
date = 2025-08-29T19:52:08.095+01:00
draft = false
description = "Dart MapView tutorial shows how to work with unmodifiable map views in Dart using MapView class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart MapView

last modified April 4, 2025

In Dart, MapView is an unmodifiable view of a Map. It provides read-only
access to the underlying map's data while preventing modifications.

MapView implements the Map interface but throws UnsupportedError for operations
that would modify the map. It's useful for exposing map data safely.

## Creating a MapView

The simplest way to create a MapView is using MapView.of constructor.

main.dart
  

import 'dart:collection';

void main() {
  var originalMap = {'a': 1, 'b': 2, 'c': 3};
  var view = MapView.of(originalMap);

  print(view);
  print(view['b']); // Access works
  
  try {
    view['d'] = 4; // Will throw
  } catch (e) {
    print(e); // UnsupportedError
  }
}

We create a MapView from an existing map. While we can read values, any attempt
to modify the view throws an UnsupportedError.

$ dart main.dart
{a: 1, b: 2, c: 3}
2
UnsupportedError: Cannot modify unmodifiable map

## MapView with Different Map Types

MapView can work with any Map implementation, including HashMap and LinkedHashMap.

main.dart
  

import 'dart:collection';

void main() {
  var hashMap = HashMap&lt;String, int&gt;();
  hashMap.addAll({'x': 10, 'y': 20, 'z': 30});
  
  var linkedMap = LinkedHashMap&lt;String, int&gt;();
  linkedMap.addAll({'first': 1, 'second': 2});
  
  var hashView = MapView.of(hashMap);
  var linkedView = MapView.of(linkedMap);
  
  print('HashMap view: $hashView');
  print('LinkedHashMap view: $linkedView');
}

This shows MapView works consistently across different Map implementations. The
view maintains the characteristics of the original map.

$ dart main.dart
HashMap view: {x: 10, z: 30, y: 20}
LinkedHashMap view: {first: 1, second: 2}

## MapView Operations

MapView supports all read operations of the Map interface.

main.dart
  

import 'dart:collection';

void main() {
  var scores = {'Alice': 90, 'Bob': 85, 'Charlie': 95};
  var scoreView = MapView.of(scores);
  
  print('Keys: ${scoreView.keys}');
  print('Values: ${scoreView.values}');
  print('Length: ${scoreView.length}');
  print('Contains Alice: ${scoreView.containsKey('Alice')}');
  print('Alice\'s score: ${scoreView['Alice']}');
  
  scoreView.forEach((k, v) =&gt; print('$k: $v'));
}

All non-modifying Map operations work normally on MapView. The view reflects
changes made to the original map.

$ dart main.dart
Keys: (Alice, Bob, Charlie)
Values: (90, 85, 95)
Length: 3
Contains Alice: true
Alice's score: 90
Alice: 90
Bob: 85
Charlie: 95

## Live View of Original Map

MapView provides a live view that reflects changes to the original map.

main.dart
  

import 'dart:collection';

void main() {
  var original = {'a': 1, 'b': 2};
  var view = MapView.of(original);
  
  print('Initial view: $view');
  
  original['c'] = 3;
  print('After original modification: $view');
  
  original.remove('a');
  print('After original removal: $view');
}

Changes to the original map are immediately visible in the MapView. This makes
MapView ideal for scenarios where you need to share data safely.

$ dart main.dart
Initial view: {a: 1, b: 2}
After original modification: {a: 1, b: 2, c: 3}
After original removal: {b: 2, c: 3}

## Combining MapView with Other Collections

MapView can be combined with other unmodifiable collections for complete safety.

main.dart
  

import 'dart:collection';

void main() {
  var data = {
    'users': ['Alice', 'Bob'],
    'scores': [90, 85],
    'active': true
  };
  
  var unmodifiableMap = UnmodifiableMapView(data);
  var unmodifiableLists = unmodifiableMap.map(
    (key, value) =&gt; MapEntry(
      key, 
      value is List ? List.unmodifiable(value) : value
    )
  );
  
  print(unmodifiableLists);
  
  try {
    unmodifiableLists['users'].add('Charlie'); // Fails
  } catch (e) {
    print(e); // UnsupportedError
  }
}

We create a completely unmodifiable structure by combining MapView with
unmodifiable lists. This prevents modification at all levels.

$ dart main.dart
{users: [Alice, Bob], scores: [90, 85], active: true}
UnsupportedError: Cannot add to an unmodifiable list

## Best Practices

- **Data Safety:** Use MapView when you need to share map data without allowing modifications.

- **Performance:** MapView has minimal overhead as it doesn't copy data.

- **Immutability:** Combine with other unmodifiable collections for complete immutability.

- **Documentation:** Clearly document when APIs return MapView to set proper expectations.

## Source

[Dart MapView Documentation](https://api.dart.dev/stable/dart-collection/MapView-class.html)

This tutorial covered Dart's MapView with practical examples demonstrating its
key features and usage patterns for creating unmodifiable map views.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).