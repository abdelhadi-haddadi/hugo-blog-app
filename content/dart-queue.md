+++
title = "Dart Queue"
date = 2025-08-29T19:52:13.673+01:00
draft = false
description = "Dart Queue tutorial shows how to work with FIFO collections in Dart using Queue interface."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Queue

last modified June 8, 2025

In Dart, Queue is a dynamic collection that implements a
double-ended queue (deque), allowing efficient insertion and removal of
elements at both ends. By default, it follows the FIFO (First-In, First-Out)
principle, meaning elements are processed in the order they were added.

Unlike a standard List, which provides index-based access,
Queue is optimized for fast modifications at both ends without
requiring element shifting. This makes it ideal for scenarios such as task
scheduling, buffering, and undo-redo operations.

Key features of queue:

    - Supports constant-time insertion and removal at both ends.

    - Maintains FIFO order for predictable processing.

    - Provides methods for adding, removing, and iterating over elements.

    - Does not support random index-based access like a List.

By leveraging Queue, developers can efficiently manage collections
where fast modifications at both ends are necessary, making it a powerful
alternative to traditional lists for queue-based operations.

## Creating a Queue

The simplest way to create a Queue is using the Queue
factory constructor from the dart:collection library. You can
create an empty queue or initialize it with elements from another collection.

The Queue class is generic, allowing you to specify the type of
elements it will hold. This ensures type safety and allows the queue to
store only elements of the specified type. The factory constructor creates a
new instance of ListQueue, which is a concrete implementation of
the Queue interface. 

factory Queue() = ListQueue&lt;E&gt;;

It uses a resizable array to store elements, providing efficient access and
modification operations. The Queue class implements the
Iterable interface, allowing you to iterate over its elements
using standard iteration methods. It also provides methods for adding,
removing, and inspecting elements, making it a versatile choice for
managing collections in Dart.

main.dart
  

import 'dart:collection';

void main() {
  var queue = Queue&lt;String&gt;();
  queue.add('Apple');
  queue.add('Banana');
  queue.add('Cherry');

  print(queue);
}

We create a Queue of Strings and add three elements. The add method
appends elements to the end of the queue. The generic type specifies the element
type.

$ dart main.dart
{Apple, Banana, Cherry}

## Adding Elements to Queue

Queue provides multiple methods for adding elements at both ends.

main.dart
  

import 'dart:collection';

void main() {
  var queue = Queue&lt;int&gt;();
  
  // Add to end
  queue.add(1);
  queue.addLast(2);
  
  // Add to beginning
  queue.addFirst(0);
  
  // Add multiple
  queue.addAll([3, 4]);
  
  print(queue);
}

We demonstrate various addition methods. add and addLast append to
the end, while addFirst prepends to the start. addAll adds multiple
elements at once.

$ dart main.dart
{0, 1, 2, 3, 4}

## Removing Elements from Queue

Queue provides methods to remove elements from both ends efficiently.

main.dart
  

import 'dart:collection';

void main() {
  var queue = Queue.from([10, 20, 30, 40, 50]);
  
  // Remove from start
  var first = queue.removeFirst();
  
  // Remove from end
  var last = queue.removeLast();
  
  // Remove specific element
  queue.remove(30);
  
  print('Removed: $first, $last');
  print('Remaining: $queue');
}

removeFirst and removeLast efficiently remove from
ends. remove deletes the first occurrence of a value. All these methods modify
the queue in-place.

$ dart main.dart
Removed: 10, 50
Remaining: {20, 40}

## Queue Operations

Queue provides various operations for inspection and modification.

main.dart
  

import 'dart:collection';

void main() {
  var queue = Queue.from(['Red', 'Green', 'Blue']);
  
  // Check properties
  print('First: ${queue.first}');
  print('Last: ${queue.last}');
  print('Length: ${queue.length}');
  print('Is empty: ${queue.isEmpty}');
  
  // Clear queue
  queue.clear();
  print('After clear: $queue');
}

We demonstrate common Queue operations. first and last peek at
elements without removing. length and isEmpty check
size. clear removes all elements.

$ dart main.dart
First: Red
Last: Blue
Length: 3
Is empty: false
After clear: {}

## Iterating Over Queue

Queue can be iterated using standard iteration methods.

main.dart
  

import 'dart:collection';

void main() {
  var queue = Queue.from([1, 2, 3, 4, 5]);
  
  // For-in loop
  print('For-in:');
  for (var num in queue) {
    print(num);
  }
  
  // forEach
  print('\nforEach:');
  queue.forEach(print);
  
  // Iterator
  print('\nIterator:');
  var it = queue.iterator;
  while (it.moveNext()) {
    print(it.current);
  }
}

We show three ways to iterate a Queue. The for-in loop is most
common. forEach provides a functional approach. Iterator offers
manual control.

## Best Practices

- **FIFO Operations:** Use Queue when you need efficient FIFO operations.

- **No Index Access:** Avoid Queue if you need random access by index.

- **Memory Efficiency:** Queue is more memory efficient than List for queue operations.

- **Type Safety:** Always specify generic type for type safety.

## Source

[Dart Queue Documentation](https://api.dart.dev/stable/dart-collection/Queue-class.html)

This tutorial covered Dart's Queue with practical examples
demonstrating its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).