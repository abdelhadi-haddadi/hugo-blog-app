+++
title = "Dart UnmodifiableMapBase"
date = 2025-08-29T19:52:31.767+01:00
draft = false
description = "Dart UnmodifiableMapBase tutorial shows how to work with immutable map collections in Dart using UnmodifiableMapBase class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart UnmodifiableMapBase

last modified April 4, 2025

In Dart, UnmodifiableMapBase is an abstract base class for creating unmodifiable
map views. It provides read-only access to map data while preventing
modifications.

UnmodifiableMapBase implements the Map interface but
throws UnsupportedError for all mutating operations. It's useful
for exposing map data safely without allowing changes.

## Basic UnmodifiableMapBase Usage

Here's how to create a simple unmodifiable map by extending
UnmodifiableMapBase.

main.dart
  

import 'dart:collection';

class UnmodifiableMapView&lt;K, V&gt; extends UnmodifiableMapBase&lt;K, V&gt; {
  final Map&lt;K, V&gt; _source;

  UnmodifiableMapView(this._source);

  @override
  V? operator [](Object? key) =&gt; _source[key];

  @override
  Iterable&lt;K&gt; get keys =&gt; _source.keys;
}

void main() {

  final source = {'a': 1, 'b': 2, 'c': 3};
  final unmodifiable = UnmodifiableMapView(source);

  print(unmodifiable['a']); // 1
  print(unmodifiable.length); // 3

  try {
    unmodifiable['d'] = 4; // Throws
  } catch (e) {
    print('Error: $e');
  }
}

We create an UnmodifiableMapView class that wraps a source map. The [] operator
and keys getter must be implemented. Attempts to modify throw exceptions.

$ dart main.dart
1
3
Error: Unsupported operation: Cannot modify unmodifiable map

## Creating an Unmodifiable Map with Factory

A more practical approach uses a factory method to create unmodifiable maps.

main.dart
  

import 'dart:collection';

class UnmodifiableMapFactory {
  static Map&lt;K, V&gt; create&lt;K, V&gt;(Map&lt;K, V&gt; source) {
    return _UnmodifiableMapWrapper(source);
  }
}

class _UnmodifiableMapWrapper&lt;K, V&gt; extends UnmodifiableMapBase&lt;K, V&gt; {
  final Map&lt;K, V&gt; _source;

  _UnmodifiableMapWrapper(this._source);

  @override
  V? operator [](Object? key) =&gt; _source[key];

  @override
  Iterable&lt;K&gt; get keys =&gt; _source.keys;
}

void main() {

  final source = {'x': 10, 'y': 20, 'z': 30};
  final unmodifiable = UnmodifiableMapFactory.create(source);

  print(unmodifiable['y']); // 20
  print(unmodifiable.containsKey('x')); // true

  try {
    unmodifiable.clear(); // Throws
  } catch (e) {
    print('Error: $e');
  }
}

This example shows a factory pattern for creating unmodifiable maps. The private
_UnmodifiableMapWrapper class implements the unmodifiable behavior.

$ dart main.dart
20
true
Error: Unsupported operation: Cannot modify unmodifiable map

## Unmodifiable Map with Custom Key-Value Types

UnmodifiableMapBase works with custom types while maintaining immutability.

main.dart
  

import 'dart:collection';

class Product {
  final String id;
  final String name;
  
  Product(this.id, this.name);
  
  @override
  String toString() =&gt; 'Product($id, $name)';
}

class UnmodifiableProductMap extends UnmodifiableMapBase&lt;String, Product&gt; {
  final Map&lt;String, Product&gt; _products;
  
  UnmodifiableProductMap(this._products);
  
  @override
  Product? operator [](Object? key) =&gt; _products[key];
  
  @override
  Iterable&lt;String&gt; get keys =&gt; _products.keys;
}

void main() {

  final products = {
    'p1': Product('p1', 'Laptop'),
    'p2': Product('p2', 'Phone'),
    'p3': Product('p3', 'Tablet')
  };
  
  final unmodifiable = UnmodifiableProductMap(products);
  
  print(unmodifiable['p2']); // Product(p2, Phone)
  print(unmodifiable.values.where((p) =&gt; p.name.length &gt; 5).toList());
  
  try {
    unmodifiable['p4'] = Product('p4', 'Monitor'); // Throws
  } catch (e) {
    print('Modification error: $e');
  }
}

We create a type-safe unmodifiable map for Product objects. The map provides
read-only access while preventing any modifications to the product collection.

$ dart main.dart
Product(p2, Phone)
[Product(p1, Laptop), Product(p3, Tablet)]
Modification error: Unsupported operation: Cannot modify unmodifiable map

## Combining UnmodifiableMapBase with Other Collections

UnmodifiableMapBase can be combined with other collection types for complex
immutable data structures.

main.dart
  

import 'dart:collection';

class ImmutableConfig extends UnmodifiableMapBase&lt;String, dynamic&gt; {
  final Map&lt;String, dynamic&gt; _config;
  final List&lt;String&gt; _log;
  
  ImmutableConfig(this._config, this._log);
  
  @override
  dynamic operator [](Object? key) {
    _log.add('Accessed: $key');
    return _config[key];
  }
  
  @override
  Iterable&lt;String&gt; get keys =&gt; _config.keys;
}

void main() {

  final config = {
    'timeout': 30,
    'retries': 3,
    'debug': false
  };
  
  final accessLog = &lt;String&gt;[];
  final immutableConfig = ImmutableConfig(config, accessLog);
  
  print(immutableConfig['timeout']); // 30
  print(immutableConfig['debug']);   // false
  
  try {
    immutableConfig['timeout'] = 60; // Throws
  } catch (e) {
    print('Error: $e');
  }
  
  print('Access log: $accessLog');
}

This example combines an unmodifiable map with a logging list. The map remains
immutable while tracking access attempts. The log list can be accessed separately.

$ dart main.dart
30
false
Error: Unsupported operation: Cannot modify unmodifiable map
Access log: [Accessed: timeout, Accessed: debug]

## Advanced UnmodifiableMapBase with Lazy Loading

We can implement lazy loading in an unmodifiable map by overriding the accessors.

main.dart
  

import 'dart:collection';

class LazyUnmodifiableMap extends UnmodifiableMapBase&lt;String, String&gt; {
  final Map&lt;String, String&gt; _source;
  final Map&lt;String, String&gt; _cache = {};
  
  LazyUnmodifiableMap(this._source);
  
  @override
  String? operator [](Object? key) {
    if (key is! String) return null;
    
    if (!_cache.containsKey(key)) {
      print('Loading $key from source...');
      _cache[key] = _source[key] ?? 'DEFAULT';
    }
    
    return _cache[key];
  }
  
  @override
  Iterable&lt;String&gt; get keys =&gt; _source.keys;
}

void main() {

  final source = {
    'config1': 'Value1',
    'config2': 'Value2',
    'config3': 'Value3'
  };
  
  final lazyMap = LazyUnmodifiableMap(source);
  
  print('First access:');
  print(lazyMap['config2']); // Loads and caches
  
  print('\nSecond access:');
  print(lazyMap['config2']); // Uses cache
  
  print('\nAll keys:');
  print(lazyMap.keys.join(', '));
  
  try {
    lazyMap['new'] = 'value'; // Throws
  } catch (e) {
    print('\nError: $e');
  }
}

This advanced example implements lazy loading with caching. Values are loaded on
first access and cached for subsequent requests. The map remains unmodifiable.

$ dart main.dart
First access:
Loading config2 from source...
Value2

Second access:
Value2

All keys:
config1, config2, config3

Error: Unsupported operation: Cannot modify unmodifiable map

## Best Practices

- **Immutable Design:** Use for exposing internal state safely.

- **Performance:** Consider caching for expensive lookups.

- **Type Safety:** Create specific subclasses for strong typing.

- **Documentation:** Clearly document immutability.

- **Composition:** Combine with other patterns like factory.

## Source

[Dart UnmodifiableMapBase Documentation](https://api.dart.dev/stable/dart-collection/UnmodifiableMapBase-class.html)

This tutorial covered Dart's UnmodifiableMapBase with practical
examples demonstrating immutable map implementations and patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).