+++
title = "Dart LinkedListEntry"
date = 2025-08-29T19:52:03.662+01:00
draft = false
description = "Dart LinkedListEntry tutorial shows how to work with linked list elements in Dart using LinkedListEntry class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart LinkedListEntry

last modified June 8, 2025

In Dart, LinkedListEntry is a fundamental base class for elements
within a LinkedList. It provides the necessary linking structure
for doubly-linked lists, allowing efficient traversal and modification of
elements. Each entry maintains references to its next and previous neighbors,
ensuring smooth navigation within the list.

Unlike standard lists, which rely on indexed access, a LinkedList
is optimized for fast insertions and deletions without requiring element
shifting. This makes it ideal for scenarios where frequent modifications are
needed, such as task scheduling, undo-redo functionality, and buffering
mechanisms.

To use LinkedListEntry, developers must extend it to create custom
entry types. This allows each entry to store additional data while still
benefiting from the automatic list management provided by Dart's
LinkedList implementation.

Key features of LinkedListEntry:

    - Supports efficient insertion and removal without shifting elements.

    - Maintains next and previous references for easy traversal.

    - Entries can be inserted before or after existing elements.

    - Provides methods for unlinking elements safely.

By leveraging LinkedListEntry, developers can efficiently manage
dynamic collections while ensuring fast modifications and predictable
traversal.

## Basic LinkedListEntry Usage

Here's a simple example demonstrating how to create and use a custom
LinkedListEntry subclass.

main.dart
  

import 'dart:collection';

class PersonEntry extends LinkedListEntry&lt;PersonEntry&gt; {
  final String name;
  final int age;

  PersonEntry(this.name, this.age);

  @override
  String toString() =&gt; '$name ($age)';
}

void main() {
  var list = LinkedList&lt;PersonEntry&gt;();
  var alice = PersonEntry('Alice', 30);
  var bob = PersonEntry('Bob', 25);
  
  list.add(alice);
  list.add(bob);
  
  print(list);
}

We create a PersonEntry class extending LinkedListEntry. We then create a
LinkedList and add two entries. The list maintains the order of insertion.

$ dart main.dart
(Alice (30), Bob (25))

## Accessing Neighboring Entries

LinkedListEntry provides next and
previous properties to traverse the list.

main.dart
  

import 'dart:collection';

class TaskEntry extends LinkedListEntry&lt;TaskEntry&gt; {
  final String description;
  
  TaskEntry(this.description);
}

void main() {
  var tasks = LinkedList&lt;TaskEntry&gt;();
  var task1 = TaskEntry('Buy milk');
  var task2 = TaskEntry('Walk dog');
  var task3 = TaskEntry('Write code');
  
  tasks.addAll([task1, task2, task3]);
  
  print('First task: ${task1.next?.description}');
  print('Middle task previous: ${task2.previous?.description}');
  print('Middle task next: ${task2.next?.description}');
  print('Last task previous: ${task3.previous?.description}');
}

We create a linked list of tasks and demonstrate how to navigate between
entries. The next and previous properties return null at list boundaries.

$ dart main.dart
First task: Walk dog
Middle task previous: Buy milk
Middle task next: Write code
Last task previous: Walk dog

## Removing Entries from List

Entries can be removed from their list by calling unlink on them.

main.dart
  

import 'dart:collection';

class NumberEntry extends LinkedListEntry&lt;NumberEntry&gt; {
  final int value;

  NumberEntry(this.value);

  @override
  String toString() =&gt;
      value.toString();
}

void main() {
  var numbers = LinkedList&lt;NumberEntry&gt;();
  var one = NumberEntry(1);
  var two = NumberEntry(2);
  var three = NumberEntry(3);

  numbers.addAll([one, two, three]);

  print('Before removal: ${numbers.map((e) =&gt; e.value).toList()}');

  two.unlink();
  print('After removal: ${numbers.map((e) =&gt; e.value).toList()}');
}

We demonstrate removing an entry from the middle of the list. The
unlink method removes the entry and updates the links of
neighboring entries.

$ dart main.dart
Before removal: (1, 2, 3)
After removal: (1, 3)

## Checking List Membership

LinkedListEntry provides a list property to check if an entry is in
a list.

main.dart
  

import 'dart:collection';

class CityEntry extends LinkedListEntry&lt;CityEntry&gt; {
  final String name;
  
  CityEntry(this.name);
}

void main() {
  var cities = LinkedList&lt;CityEntry&gt;();
  var ny = CityEntry('New York');
  var la = CityEntry('Los Angeles');
  
  print('Before adding:');
  print('NY in list: ${ny.list != null}');
  print('LA in list: ${la.list != null}');
  
  cities.add(ny);
  cities.add(la);
  
  print('\nAfter adding:');
  print('NY in list: ${ny.list != null}');
  print('LA in list: ${la.list != null}');
  
  ny.unlink();
  
  print('\nAfter removing NY:');
  print('NY in list: ${ny.list != null}');
  print('LA in list: ${la.list != null}');
}

We check list membership using the list property. It returns null when the entry
is not in any list, or the LinkedList instance when it is.

$ dart main.dart
Before adding:
NY in list: false
LA in list: false

After adding:
NY in list: true
LA in list: true

After removing NY:
NY in list: false
LA in list: true

## Inserting Entries Between Others

Entries can be inserted between existing entries using insertBefore/After.

main.dart
  

import 'dart:collection';

class ProductEntry extends LinkedListEntry&lt;ProductEntry&gt; {
  final String name;
  final double price;

  ProductEntry(this.name, this.price);

  @override
  String toString() =&gt; '$name: \$$price';
}

void main() {
  var products = LinkedList&lt;ProductEntry&gt;();
  var apple = ProductEntry('Apple', 0.99);
  var banana = ProductEntry('Banana', 1.49);

  products.addAll([apple, banana]);
  print('Original list: ${products.map((e) =&gt; e.toString()).toList()}');

  var orange = ProductEntry('Orange', 1.29);
  apple.insertAfter(orange);
  print('After inserting orange: ${products.map((e) =&gt; e.toString()).toList()}');

  var grape = ProductEntry('Grape', 2.99);
  banana.insertBefore(grape);
  print('After inserting grape: ${products.map((e) =&gt; e.toString()).toList()}');
}

We demonstrate inserting entries at specific positions in the list. The
insert operations automatically update all necessary links in the list.

$ dart main.dart
Original list: (Apple: $0.99, Banana: $1.49)
After inserting orange: (Apple: $0.99, Orange: $1.29, Banana: $1.49)
After inserting grape: (Apple: $0.99, Orange: $1.29, Grape: $2.99, Banana: $1.49)

## Best Practices

- **Single List Membership:** An entry can only belong to one list at a time.

- **Proper Removal:** Always unlink entries before reusing them.

- **Type Safety:** Extend LinkedListEntry with a specific type parameter.

- **Performance:** Insertions and removals are O(1) operations.

## Source

[Dart LinkedListEntry Documentation](https://api.dart.dev/stable/dart-collection/LinkedListEntry-class.html)

This tutorial covered Dart's LinkedListEntry with practical
examples demonstrating its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).