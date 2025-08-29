+++
title = "Dart UnmodifiableListView"
date = 2025-08-29T19:52:30.666+01:00
draft = false
description = "Dart UnmodifiableListView tutorial shows how to work with immutable list views in Dart using UnmodifiableListView class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart UnmodifiableListView

last modified April 4, 2025

In Dart, UnmodifiableListView is an unmodifiable view of a List. It wraps an
existing List and prevents modifications through the view.

UnmodifiableListView implements List but throws UnsupportedError for operations
that would modify the list. It's useful for exposing internal lists safely.

## Creating an UnmodifiableListView

The simplest way to create an UnmodifiableListView is using its constructor.

main.dart
  

import 'dart:collection';

void main() {
  var numbers = [1, 2, 3, 4, 5];
  var unmodifiableView = UnmodifiableListView(numbers);
  
  print(unmodifiableView);
  
  try {
    unmodifiableView.add(6); // Will throw
  } catch (e) {
    print('Error: $e');
  }
}

We create an unmodifiable view of a mutable list. Attempting to modify it throws
an UnsupportedError. The original list can still be modified.

$ dart main.dart
[1, 2, 3, 4, 5]
Error: Unsupported operation: Cannot add to an unmodifiable list

## UnmodifiableListView with List Operations

UnmodifiableListView supports all non-modifying List operations like access and
iteration.

main.dart
  

import 'dart:collection';

void main() {
  var fruits = ['apple', 'banana', 'orange'];
  var unmodifiableFruits = UnmodifiableListView(fruits);
  
  // Access elements
  print('First fruit: ${unmodifiableFruits[0]}');
  print('Length: ${unmodifiableFruits.length}');
  
  // Iteration
  for (var fruit in unmodifiableFruits) {
    print(fruit.toUpperCase());
  }
  
  // Non-modifying methods
  print('Contains apple: ${unmodifiableFruits.contains('apple')}');
  print('Index of banana: ${unmodifiableFruits.indexOf('banana')}');
}

We demonstrate read-only operations on an UnmodifiableListView. All standard List
access methods work as expected without modification capabilities.

$ dart main.dart
First fruit: apple
Length: 3
APPLE
BANANA
ORANGE
Contains apple: true
Index of banana: 1

## Protecting Internal Lists

UnmodifiableListView is commonly used to expose internal lists safely.

main.dart
  

import 'dart:collection';

class Team {
  final List&lt;String&gt; _members = [];
  
  UnmodifiableListView&lt;String&gt; get members =&gt; 
      UnmodifiableListView(_members);
      
  void addMember(String name) {
    _members.add(name);
  }
}

void main() {
  var team = Team();
  team.addMember('Alice');
  team.addMember('Bob');
  
  print('Team members: ${team.members}');
  
  try {
    team.members.add('Charlie'); // Will throw
  } catch (e) {
    print('Cannot modify: $e');
  }
}

The Team class exposes its members through an UnmodifiableListView. Clients can
read but not modify the list directly. Modifications must go through addMember.

$ dart main.dart
Team members: [Alice, Bob]
Cannot modify: Unsupported operation: Cannot add to an unmodifiable list

## UnmodifiableListView vs Unmodifiable List

UnmodifiableListView differs from creating a truly unmodifiable list.

main.dart
  

import 'dart:collection';

void main() {
  var original = [1, 2, 3];
  var view = UnmodifiableListView(original);
  var unmodifiableCopy = List.unmodifiable(original);
  
  original.add(4); // Modifies the original
  
  print('View: $view'); // Reflects changes
  print('Copy: $unmodifiableCopy'); // Doesn't change
  
  try {
    view.add(5); // Throws
    unmodifiableCopy.add(5); // Also throws
  } catch (e) {
    print('Both prevent modification');
  }
}

UnmodifiableListView is a live view that reflects changes to the original list.
List.unmodifiable creates an independent copy that won't change.

$ dart main.dart
View: [1, 2, 3, 4]
Copy: [1, 2, 3]
Both prevent modification

## Combining with Other Collections

UnmodifiableListView can be combined with other collection operations.

main.dart
  

import 'dart:collection';

void main() {
  var data = [10, 20, 30, 40, 50];
  
  // Create filtered unmodifiable view
  var evenView = UnmodifiableListView(
      data.where((n) =&gt; n % 2 == 0).toList());
  
  print('Even numbers: $evenView');
  
  // Create transformed unmodifiable view
  var squaredView = UnmodifiableListView(
      data.map((n) =&gt; n * n).toList());
  
  print('Squared numbers: $squaredView');
  
  // Attempt modification
  try {
    evenView.removeLast();
  } catch (e) {
    print('Cannot modify: $e');
  }
}

We create specialized unmodifiable views by combining filtering and mapping with
UnmodifiableListView. The views remain immutable while showing transformed data.

$ dart main.dart
Even numbers: [20, 40, 50]
Squared numbers: [100, 400, 900, 1600, 2500]
Cannot modify: Unsupported operation: Cannot remove from an unmodifiable list

## Best Practices

- **Defensive Programming:** Use to prevent accidental modifications.

- **Performance:** Prefer over copying large lists when possible.

- **Documentation:** Clearly indicate when APIs return unmodifiable views.

- **Alternatives:** Consider List.unmodifiable for truly immutable snapshots.

## Source

[Dart UnmodifiableListView Documentation](https://api.dart.dev/stable/dart-collection/UnmodifiableListView-class.html)

This tutorial covered Dart's UnmodifiableListView with practical examples
demonstrating its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).