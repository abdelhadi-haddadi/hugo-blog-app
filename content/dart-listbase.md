+++
title = "Dart ListBase"
date = 2025-08-29T19:52:04.781+01:00
draft = false
description = "Dart ListBase tutorial shows how to create custom list implementations in Dart using ListBase class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ListBase

last modified June 4, 2025

In Dart, ListBase is an abstract base class that simplifies creating custom list
implementations. It provides default implementations for most List operations.

ListBase requires subclasses to implement only length, operator[], and length=
methods. All other List operations are built on these fundamental operations.

## Basic ListBase Implementation

Here's a minimal implementation of ListBase that wraps an existing
list.

main.dart
  

import 'dart:collection';

class CustomList&lt;E&gt; extends ListBase&lt;E&gt; {
  final List&lt;E&gt; _list = [];

  @override
  int get length =&gt; _list.length;

  @override
  set length(int newLength) {
    _list.length = newLength;
  }

  @override
  E operator [](int index) =&gt; _list[index];

  @override
  void operator []=(int index, E value) {
    _list[index] = value;
  }

  // Fix: Implement addAll
  @override
  void addAll(Iterable&lt;E&gt; elements) {
    _list.addAll(elements);
  }

  // Fix: Implement add method to allow single item insertion
  @override
  void add(E element) {
    _list.add(element);
  }
}

void main() {
  var myList = CustomList&lt;String&gt;();
  myList.addAll(['apple', 'banana', 'cherry']);

  print(myList); // [apple, banana, cherry]
  print(myList.reversed.toList()); // [cherry, banana, apple]
}

This object-oriented CustomList class extends ListBase
and delegates all operations to an internal _list. 

$ dart main.dart
[apple, banana, cherry]
(cherry, banana, apple)

## Custom List with Validation

We can create a list that enforces constraints on its elements.

main.dart
  

import 'dart:collection';

class PositiveNumberList extends ListBase&lt;int&gt; {
  final List&lt;int&gt; _numbers = [];

  @override
  int get length =&gt; _numbers.length;

  @override
  set length(int newLength) {
    _numbers.length = newLength;
  }

  @override
  int operator [](int index) =&gt; _numbers[index];

  @override
  void operator []=(int index, int value) {
    if (value &lt;= 0) throw ArgumentError('Only positive numbers allowed');
    _numbers[index] = value;
  }

  @override
  void add(int value) {
    if (value &lt;= 0) throw ArgumentError('Only positive numbers allowed');
    _numbers.add(value); // Correctly adds to the internal list
  }

  @override
  void addAll(Iterable&lt;int&gt; values) {
    for (var value in values) {
      add(value); // Ensures validation before adding
    }
  }
}

void main() {
  try {
    var numbers = PositiveNumberList();
    numbers.addAll([1, 2, 3]); // Works fine
    numbers.add(-5); // This will throw an error
  } catch (e) {
    print('Error: $e');
  }
}

The PositiveNumberList rejects non-positive numbers. We override
add for additional validation beyond the index setter.

$ dart main.dart
Error: ArgumentError: Only positive numbers allowed

## Fixed-Size List Implementation

Here's how to create a fixed-size list using ListBase.

main.dart
  

import 'dart:collection';

class FixedList&lt;E&gt; extends ListBase&lt;E&gt; {
  final List&lt;E?&gt; _list; // Allow nullable elements

  FixedList(int length) : _list = List.filled(length, null);

  @override
  int get length =&gt; _list.length;

  @override
  set length(int newLength) {
    throw UnsupportedError('Cannot change length of fixed list');
  }

  @override
  E operator [](int index) {
    if (_list[index] == null) {
      throw StateError('Uninitialized index access');
    }
    return _list[index] as E;
  }

  @override
  void operator []=(int index, E value) {
    _list[index] = value;
  }

  @override
  void add(E value) {
    throw UnsupportedError('Cannot add to a fixed list');
  }

  @override
  void addAll(Iterable&lt;E&gt; values) {
    throw UnsupportedError('Cannot addAll to a fixed list');
  }

  @override
  String toString() =&gt; _list.toString();
}

void main() {
  var fixed = FixedList&lt;String&gt;(3);
  fixed[0] = 'A';
  fixed[1] = 'B';
  fixed[2] = 'C';

  print(fixed); // Outputs: [A, B, C]

  try {
    fixed.add('D'); // Will throw an error
  } catch (e) {
    print('Error: $e');
  }
}

The FixedList throws when attempting to modify its length. All mutating methods
inherited from ListBase will fail as they ultimately try to change length.

$ dart main.dart
[A, B, C]
Error: Unsupported operation: Cannot change length of fixed list

## Lazy-Loaded List

We can implement a list that loads elements on demand.

main.dart
  

import 'dart:collection';

class LazyList&lt;E&gt; extends ListBase&lt;E&gt; {
  final int _length;
  final E Function(int) _generator;
  final List&lt;E?&gt; _loaded;

  LazyList(this._length, this._generator) : _loaded = List.filled(_length, null);

  @override
  int get length =&gt; _length;

  @override
  set length(int newLength) {
    throw UnsupportedError('Cannot change length of lazy list');
  }

  @override
  E operator [](int index) {
    if (index &lt; 0 || index &gt;= length) {
      throw RangeError.index(index, this);
    }
    return _loaded[index] ??= _generator(index);
  }

  @override
  void operator []=(int index, E value) {
    _loaded[index] = value;
  }
}

void main() {
  var lazy = LazyList&lt;int&gt;(5, (index) =&gt; index * 10);
  
  print('Length: ${lazy.length}');
  print('Element at 2: ${lazy[2]}');
  print('Element at 4: ${lazy[4]}');
  print('All elements: $lazy');
}

The LazyList only generates elements when they're first accessed.
The _generator function creates elements based on their index.

$ dart main.dart
Length: 5
Element at 2: 20
Element at 4: 40
All elements: [0, 10, 20, 30, 40]

## Composite List

This example combines multiple lists into one view.

main.dart
  

import 'dart:collection';

class CompositeList&lt;E&gt; extends ListBase&lt;E&gt; {
  final List&lt;List&lt;E&gt;&gt; _sources;

  CompositeList(this._sources);

  @override
  int get length =&gt; _sources.fold(0, (sum, list) =&gt; sum + list.length);

  @override
  set length(int newLength) {
    throw UnsupportedError('Cannot change length of composite list');
  }

  @override
  E operator [](int index) {
    var remaining = index;
    for (var list in _sources) {
      if (remaining &lt; list.length) {
        return list[remaining];
      }
      remaining -= list.length;
    }
    throw RangeError.index(index, this);
  }

  @override
  void operator []=(int index, E value) {
    var remaining = index;
    for (var list in _sources) {
      if (remaining &lt; list.length) {
        list[remaining] = value;
        return;
      }
      remaining -= list.length;
    }
    throw RangeError.index(index, this);
  }
}

void main() {
  var list1 = [1, 2, 3];
  var list2 = [4, 5];
  var list3 = [6, 7, 8, 9];
  
  var composite = CompositeList([list1, list2, list3]);
  
  print('Length: ${composite.length}');
  print('Element at 0: ${composite[0]}');
  print('Element at 3: ${composite[3]}');
  print('Element at 5: ${composite[5]}');
  print('All elements: $composite');
}

The CompositeList presents multiple lists as a single list without copying
elements. Changes to the composite list affect the original lists.

$ dart main.dart
Length: 9
Element at 0: 1
Element at 3: 4
Element at 5: 7
All elements: [1, 2, 3, 4, 5, 6, 7, 8, 9]

## Source

[Dart ListBase Documentation](https://api.dart.dev/stable/dart-collection/ListBase-class.html)

This tutorial covered Dart's ListBase with practical examples
demonstrating how to create custom list implementations efficiently.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).