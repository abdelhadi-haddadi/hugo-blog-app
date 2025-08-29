+++
title = "Dart ListQueue"
date = 2025-08-29T19:52:05.884+01:00
draft = false
description = "Dart ListQueue tutorial shows how to work with queue collections in Dart using ListQueue class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ListQueue

last modified June 8, 2025

In Dart, ListQueue is a high-performance, list-based implementation
of the Queue interface. It is designed for efficient insertion and
removal at both ends, providing O(1) time complexity for these operations. This
makes it ideal for scenarios where frequent modifications at the front and back
of the queue are required.

Unlike a standard List, which requires shifting elements when
modifying the front, ListQueue uses a cyclic buffer internally.
This ensures that adding and removing elements remains fast, even as the queue
grows dynamically.

Key features of ListQueue:

    - Supports constant-time insertion and removal at both ends.

    - Maintains FIFO (First-In, First-Out) order for predictable processing.

    - Uses a cyclic buffer, avoiding costly element shifting.

    - Provides index-based access similar to lists.

    - Offers methods for adding, removing, and iterating over elements.

By leveraging ListQueue, developers can efficiently manage
collections where fast modifications at both ends are necessary, making it a
powerful alternative to traditional lists for queue-based operations.

## Creating a ListQueue

We can create a ListQueue using its constructor or from an existing
iterable.

main.dart
  

import 'dart:collection';

void main() {
  var queue = ListQueue&lt;String&gt;();
  queue.add('apple');
  queue.add('banana');
  queue.add('orange');

  print(queue);
}

This creates an empty ListQueue and adds three elements. The
generic type parameter specifies the element type as String.

$ dart main.dart
{apple, banana, orange}

## Adding Elements

ListQueue provides multiple methods for adding elements at
different positions.

main.dart
  

import 'dart:collection';

void main() {
  var queue = ListQueue.of([1, 2, 3]);
  
  queue.add(4);
  queue.addFirst(0);
  queue.addAll([5, 6]);
  
  print(queue);
}

The of method creates a queue from an iterable. We demonstrate
adding elements to both ends of the queue. addFirst
is particularly useful for queue operations.

$ dart main.dart
{0, 1, 2, 3, 4, 5, 6}

## Removing Elements

ListQueue provides several ways to remove elements from the
collection.

main.dart
  

import 'dart:collection';

void main() {
  var queue = ListQueue.of(['a', 'b', 'c', 'd', 'e']);
  
  var first = queue.removeFirst();
  var last = queue.removeLast();
  queue.remove('c');
  
  print('Removed: $first, $last');
  print('Remaining: $queue');
}

This shows FIFO (removeFirst) and LIFO (removeLast)
operations. The remove method deletes the first occurrence of the
specified value.

$ dart main.dart
Removed: a, e
Remaining: {b, d}

## Accessing Elements

ListQueue supports both queue-style access and index-based element
retrieval.

main.dart
  

import 'dart:collection';

void main() {
  var queue = ListQueue.of([10, 20, 30, 40, 50]);
  
  print('First: ${queue.first}');
  print('Last: ${queue.last}');
  print('Element at 2: ${queue.elementAt(2)}');
  
  print('All elements:');
  for (var item in queue) {
    print(item);
  }
}

ListQueue maintains list-like characteristics while providing queue
operations. We can access elements by position or iterate through them.

$ dart main.dart
First: 10
Last: 50
Element at 2: 30
All elements:
10
20
30
40
50

## Queue Operations

ListQueue implements standard queue operations with efficient
performance.

main.dart
  

import 'dart:collection';

void main() {
  var queue = ListQueue&lt;int&gt;();
  
  // Enqueue elements
  queue.addLast(1);
  queue.addLast(2);
  queue.addLast(3);
  
  // Dequeue elements
  while (queue.isNotEmpty) {
    print('Processing: ${queue.removeFirst()}');
  }
  
  print('Queue empty: ${queue.isEmpty}');
}

This demonstrates classic FIFO queue behavior. Elements are added at the end and
removed from the front. The isNotEmpty check is safer than checking
length.

$ dart main.dart
Processing: 1
Processing: 2
Processing: 3
Queue empty: true

## Best Practices

- **Queue vs List:** Use ListQueue when you need both queue operations and index access.

- **Capacity:** Consider initial capacity for large queues to reduce reallocations.

- **Bulk Operations:** Use addAll for adding multiple elements efficiently.

- **Type Safety:** Always specify generic type parameters for type safety.

## Source

[Dart ListQueue Documentation](https://api.dart.dev/stable/dart-collection/ListQueue-class.html)

This tutorial covered Dart's ListQueue with practical examples
demonstrating its key features and usage patterns for efficient queue
operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).