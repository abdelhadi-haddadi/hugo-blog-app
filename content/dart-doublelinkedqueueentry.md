+++
title = "Dart DoubleLinkedQueueEntry"
date = 2025-08-29T19:51:44.606+01:00
draft = false
description = "Dart DoubleLinkedQueueEntry tutorial shows how to work with queue elements in Dart using DoubleLinkedQueueEntry class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart DoubleLinkedQueueEntry

last modified April 4, 2025

In Dart, DoubleLinkedQueueEntry represents an element in a DoubleLinkedQueue. It
provides links to adjacent elements and methods to manipulate queue position.

Each entry contains a value and maintains references to the next and previous
entries. This enables efficient insertion and removal operations at any position.

## Basic DoubleLinkedQueueEntry Usage

Let's start with basic usage of DoubleLinkedQueueEntry to understand its role.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;String&gt;();
  queue.add('Apple');
  queue.add('Banana');
  queue.add('Cherry');

  // Get first entry
  var firstEntry = queue.firstEntry();
  print('First value: ${firstEntry!.value}');

  // Get next entry
  var nextEntry = firstEntry.nextEntry();
  print('Next value: ${nextEntry!.value}');

  // Get previous from next (should be first)
  var prevEntry = nextEntry.previousEntry();
  print('Previous value: ${prevEntry!.value}');
}

This example demonstrates basic navigation between queue entries. We access the
first entry, then its next entry, and verify we can navigate back.

$ dart main.dart
First value: Apple
Next value: Banana
Previous value: Apple

## Inserting Elements Using Entries

DoubleLinkedQueueEntry allows inserting elements relative to existing entries.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;String&gt;();
  queue.add('Apple');
  queue.add('Cherry');

  // Get first entry
  var firstEntry = queue.firstEntry();

  // Insert before first entry
  firstEntry!.insertBefore('Apricot');

  // Insert after first entry
  firstEntry.insertAfter('Banana');

  print(queue);
}

We insert elements before and after existing entries. This provides precise
control over queue positioning without needing indexes.

$ dart main.dart
{Apricot, Apple, Banana, Cherry}

## Removing Elements Using Entries

Entries can remove themselves from the queue while maintaining structure.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;String&gt;();
  queue.addAll(['Apple', 'Banana', 'Cherry', 'Date']);

  // Get second entry
  var secondEntry = queue.firstEntry()!.nextEntry();

  // Remove the entry
  var removedValue = secondEntry!.remove();

  print('Removed: $removedValue');
  print('Remaining queue: $queue');
}

The remove() method removes the entry from the queue and returns its value. The
queue automatically updates its links to maintain continuity.

$ dart main.dart
Removed: Banana
Remaining queue: {Apple, Cherry, Date}

## Iterating Through Entries

We can traverse the queue using entry navigation methods.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;int&gt;();
  queue.addAll([10, 20, 30, 40, 50]);

  // Start with first entry
  var current = queue.firstEntry();

  print('Forward traversal:');
  while (current != null) {
    print(current.value);
    current = current.nextEntry();
  }

  // Start with last entry
  current = queue.lastEntry();

  print('\nBackward traversal:');
  while (current != null) {
    print(current.value);
    current = current.previousEntry();
  }
}

This demonstrates bidirectional traversal of the queue using entry navigation.
We can move forward or backward through the linked structure.

$ dart main.dart
Forward traversal:
10
20
30
40
50

Backward traversal:
50
40
30
20
10

## Advanced Entry Manipulation

Entries can be used for complex queue manipulations like reordering.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;String&gt;();
  queue.addAll(['A', 'B', 'C', 'D', 'E']);

  // Get middle entry
  var middle = queue.firstEntry()!.nextEntry()!.nextEntry();

  // Remove and reinsert at beginning
  middle!.remove();
  queue.firstEntry()!.insertBefore(middle.value);

  print('After moving middle to front: $queue');

  // Swap first and last
  var firstVal = queue.firstEntry()!.value;
  var lastVal = queue.lastEntry()!.value;

  queue.firstEntry()!.value = lastVal;
  queue.lastEntry()!.value = firstVal;

  print('After swapping first and last: $queue');
}

This shows advanced manipulation of queue elements using entries. We move an
element and swap values directly through entry references.

$ dart main.dart
After moving middle to front: {C, A, B, D, E}
After swapping first and last: {E, A, B, D, C}

## Best Practices

- **Null Safety:** Always check for null when navigating entries.

- **Performance:** Entry operations are O(1) for adjacent access.

- **Concurrency:** Queue entries aren't thread-safe by default.

- **Memory:** Each entry maintains references, increasing memory use.

## Source

[Dart DoubleLinkedQueueEntry Documentation](https://api.dart.dev/stable/dart-collection/DoubleLinkedQueueEntry-class.html)

This tutorial covered Dart's DoubleLinkedQueueEntry with practical examples
demonstrating its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).