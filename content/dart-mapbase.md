+++
title = "Dart MapBase"
date = 2025-08-29T19:52:06.979+01:00
draft = false
description = "Dart MapBase tutorial shows how to work with the abstract base class for maps in Dart."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart MapBase

last modified June 4, 2025

MapBase is an abstract base class for maps in Dart. It provides common
functionality shared by all map implementations.

This class implements most Map operations but leaves the actual
storage implementation to subclasses. It's useful when creating custom map
types.

## Basic MapBase Implementation

Here's how to create a simple map by extending MapBase.

main.dart
  

import 'dart:collection';

class SimpleMap&lt;K, V&gt; extends MapBase&lt;K, V&gt; {
  final _map = &lt;K, V&gt;{};

  @override
  V? operator [](Object? key) =&gt; _map[key];

  @override
  void operator []=(K key, V value) =&gt; _map[key] = value;

  @override
  void clear() =&gt; _map.clear();

  @override
  Iterable&lt;K&gt; get keys =&gt; _map.keys;

  @override
  V? remove(Object? key) =&gt; _map.remove(key);
}

void main() {
  var map = SimpleMap&lt;String, int&gt;();
  map['one'] = 1;
  map['two'] = 2;
  
  print(map['one']); // 1
  print(map.keys);   // (one, two)
}

We implement all required abstract methods from MapBase. The actual storage
is delegated to a private Map. This pattern is common for custom map types.

$ dart main.dart
1
(one, two)

## Counting Map Implementation

We can create a specialized map that counts value occurrences.

main.dart
  

import 'dart:collection';

class CountingMap&lt;K&gt; extends MapBase&lt;K, int&gt; {
  final _counts = &lt;K, int&gt;{};

  void increment(K key) {
    _counts[key] = (_counts[key] ?? 0) + 1;
  }

  @override
  int? operator [](Object? key) =&gt; _counts[key];

  @override
  void operator []=(K key, int value) =&gt; _counts[key] = value;

  @override
  void clear() =&gt; _counts.clear();

  @override
  Iterable&lt;K&gt; get keys =&gt; _counts.keys;

  @override
  int? remove(Object? key) =&gt; _counts.remove(key);
}

void main() {
  var counter = CountingMap&lt;String&gt;();
  counter.increment('apple');
  counter.increment('apple');
  counter.increment('banana');
  
  print(counter['apple']);  // 2
  print(counter['banana']); // 1
}

This CountingMap adds a custom increment method while still behaving like a
regular map. It demonstrates how to extend MapBase with domain-specific logic.

$ dart main.dart
2
1

## Case Insensitive Map

Here's a map implementation that treats keys case-insensitively.

main.dart
  

import 'dart:collection';

class CaseInsensitiveMap&lt;V&gt; extends MapBase&lt;String, V&gt; {
  final _map = &lt;String, V&gt;{};

  String _normalizeKey(String key) =&gt; key.toLowerCase();

  @override
  V? operator [](Object? key) =&gt; _map[_normalizeKey(key as String)];

  @override
  void operator []=(String key, V value) =&gt; _map[_normalizeKey(key)] = value;

  @override
  void clear() =&gt; _map.clear();

  @override
  Iterable&lt;String&gt; get keys =&gt; _map.keys;

  @override
  V? remove(Object? key) =&gt; _map.remove(_normalizeKey(key as String));
}

void main() {
  var map = CaseInsensitiveMap&lt;int&gt;();
  map['Hello'] = 1;
  map['HELLO'] = 2;
  map['hello'] = 3;
  
  print(map.length);    // 1
  print(map['HeLlO']);  // 3
}

The map normalizes all keys to lowercase before storage. Different case
variations of the same string map to the same entry.

$ dart main.dart
1
3

## Default Value Map

This map returns a default value when a key is not found.

main.dart
  

import 'dart:collection';

class DefaultValueMap&lt;K, V&gt; extends MapBase&lt;K, V&gt; {
  final _map = &lt;K, V&gt;{};
  final V defaultValue;

  DefaultValueMap(this.defaultValue);

  @override
  V operator [](Object? key) =&gt; _map[key] ?? defaultValue;

  @override
  void operator []=(K key, V value) =&gt; _map[key] = value;

  @override
  void clear() =&gt; _map.clear();

  @override
  Iterable&lt;K&gt; get keys =&gt; _map.keys;

  @override
  V? remove(Object? key) =&gt; _map.remove(key);
}

void main() {
  var map = DefaultValueMap&lt;String, int&gt;(0);
  map['a'] = 1;
  
  print(map['a']); // 1
  print(map['b']); // 0
}

The map is initialized with a default value. When accessing non-existent keys,
it returns this default instead of null. This is useful for counting patterns.

$ dart main.dart
1
0

## Observable Map

We can create a map that notifies listeners of changes.

main.dart
  

import 'dart:collection';

class ObservableMap&lt;K, V&gt; extends MapBase&lt;K, V&gt; {
  final Map&lt;K, V&gt; _map = {};
  final List&lt;void Function(K, V?)&gt; _listeners = [];

  void addListener(void Function(K, V?) listener) {
    _listeners.add(listener);
  }

  @override
  V? operator [](Object? key) =&gt; _map[key as K];

  @override
  void operator []=(K key, V value) {
    _map[key] = value;
    _notifyListeners(key, value);
  }

  @override
  void clear() {
    for (var key in _map.keys.toList()) {
      _notifyListeners(key, null); // Notify before clearing
    }
    _map.clear();
  }

  @override
  Iterable&lt;K&gt; get keys =&gt; _map.keys;

  @override
  V? remove(Object? key) {
    if (!_map.containsKey(key)) return null;
    var value = _map.remove(key);
    _notifyListeners(key as K, null);
    return value;
  }

  void _notifyListeners(K key, V? value) {
    for (var listener in _listeners) {
      listener(key, value);
    }
  }
}

void main() {
  var map = ObservableMap&lt;String, int&gt;();
  map.addListener((key, value) {
    print('Change: $key = $value');
  });

  map['a'] = 1;
  map['b'] = 2;
  map.remove('a');
  map.clear(); // Will correctly notify all removals
}

This map maintains a list of listeners and notifies them of changes. The
notification includes the changed key and its new value (or null if
removed).

## Best Practices

- **Minimal Implementation:** Only implement required methods when extending MapBase.

- **Consistent Equality:** Ensure key equality is consistent with hashCode.

- **Null Safety:** Handle null keys/values appropriately in your implementation.

- **Performance:** Consider performance characteristics of your storage backend.

## Source

[Dart MapBase Documentation](https://api.dart.dev/stable/dart-collection/MapBase-class.html)

This tutorial covered Dart's MapBase with practical examples
demonstrating how to create custom map implementations by extending this
abstract base class.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).