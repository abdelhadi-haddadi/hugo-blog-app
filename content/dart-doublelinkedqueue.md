+++
title = "Dart DoubleLinkedQueue"
date = 2025-08-29T19:51:43.448+01:00
draft = false
description = "Dart DoubleLinkedQueue tutorial shows how to work with double-ended queues in Dart using DoubleLinkedQueue class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart DoubleLinkedQueue

last modified June 8, 2025

In Dart, DoubleLinkedQueue is a high-performance, double-ended
queue implementation that allows efficient insertion and removal of elements at
both ends. It is particularly useful for scenarios where frequent modifications
at the front and back of the queue are required.

DoubleLinkedQueue implements the Queue interface,
ensuring that elements maintain their order as they are added or removed.
Internally, it uses a doubly linked list structure, which enables O(1)
time complexity for operations such as adding, removing, and peeking at
elements from either end.

Unlike a standard ListQueue, which is backed by a resizable array,
DoubleLinkedQueue does not require shifting elements when modifying
the queue, making it more efficient for dynamic data structures. It is ideal for
use cases such as task scheduling, undo-redo functionality, and buffering
mechanisms.

Key features of DoubleLinkedQueue:

    - Supports constant-time insertion and removal at both ends.

    - Maintains element order, ensuring predictable behavior.

    - Uses linked nodes, avoiding costly array resizing operations.

    - Provides methods for iterating, clearing, and checking emptiness.

By leveraging DoubleLinkedQueue, developers can efficiently manage
dynamic collections where frequent modifications at both ends are necessary
without the overhead of shifting elements, making it a powerful tool in Dart's
collection library. Practical applications include implementing deques, managing
event queues, and building complex data structures that require efficient front
and back access; for instacnce in task scheduling or buffering scenarios.

## Creating a DoubleLinkedQueue

The simplest way to create a DoubleLinkedQueue is using the constructor.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;String&gt;();
  queue.addFirst('Apple');
  queue.addLast('Banana');
  queue.addLast('Orange');

  print(queue);
}

We create a DoubleLinkedQueue of strings. We add elements to both ends using
addFirst and addLast. The queue maintains insertion order.

$ dart main.dart
DoubleLinkedQueue(Apple, Banana, Orange)

## Basic Queue Operations

DoubleLinkedQueue provides standard queue operations at both ends.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;int&gt;();
  queue.addAll([10, 20, 30]);
  
  print('First element: ${queue.first}');
  print('Last element: ${queue.last}');
  
  queue.removeFirst();
  queue.removeLast();
  
  print('After removals: $queue');
}

We demonstrate basic operations. addAll adds multiple elements. first and last
access ends. removeFirst and removeLast modify the queue.

$ dart main.dart
First element: 10
Last element: 30
After removals: DoubleLinkedQueue(20)

## Iterating Through Queue

DoubleLinkedQueue supports iteration using for-in loops and
iterators. You can traverse elements in the order they were added.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue.of(['Red', 'Green', 'Blue']);
  
  print('Standard iteration:');
  for (var color in queue) {
    print(color);
  }

  var it = queue.iterator;
  print('\nUsing iterator:');
  
  while (it.moveNext()) {
    print(it.current);
  }
}

We create a queue from an iterable using of. We iterate using a for-in loop
and an explicit iterator. Both methods maintain the original order.

## Queue Manipulation

DoubleLinkedQueue provides methods for complex manipulations.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue&lt;int&gt;();
  queue.addAll([1, 2, 3, 4, 5]);
  
  queue.addFirst(0);
  queue.addLast(6);
  
  queue.removeWhere((element) =&gt; element % 2 == 0);
  
  print('Final queue: $queue');
  print('Length: ${queue.length}');
}

We demonstrate adding elements to both ends. removeWhere filters
elements. The queue maintains order through all operations.

$ dart main.dart
Final queue: DoubleLinkedQueue(0, 1, 3, 5)
Length: 4

## Converting to Other Collections

DoubleLinkedQueue can be converted to other collection types.

main.dart
  

import 'dart:collection';

void main() {
  var queue = DoubleLinkedQueue.of(['a', 'b', 'c']);
  
  var list = queue.toList();
  var set = queue.toSet();
  
  print('List: $list');
  print('Set: $set');
}

We convert the queue to a List and Set. The
conversions preserve element order.

$ dart main.dart
List: [a, b, c]
Set: {a, b, c}

## Best Practices

- **Use for double-ended operations:** Prefer for frequent front/back access.

- **Avoid random access:** Not optimized for middle element access.

- **Consider ListQueue:** For mostly single-end operations.

- **Thread safety:** Like all Dart collections, not thread-safe.

## Source

[Dart DoubleLinkedQueue Documentation](https://api.dart.dev/stable/dart-collection/DoubleLinkedQueue-class.html)

This tutorial covered Dart's DoubleLinkedQueue with practical examples
demonstrating its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).