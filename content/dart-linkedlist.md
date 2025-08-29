+++
title = "Dart LinkedList"
date = 2025-08-29T19:52:03.672+01:00
draft = false
description = "Dart LinkedList tutorial shows how to work with linked list collections in Dart using LinkedList class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart LinkedList

last modified April 4, 2025

In Dart, LinkedList is a specialized doubly-linked list implementation. It
provides efficient insertion and removal operations at both ends.

LinkedList elements must extend LinkedListEntry. This class maintains references
to next and previous entries. The list maintains consistent links automatically.

## Creating a LinkedList

To use LinkedList, we first create an entry class that extends LinkedListEntry.

main.dart
  

import 'dart:collection';

class Person extends LinkedListEntry&lt;Person&gt; {
  final String name;
  final int age;

  Person(this.name, this.age);

  @override
  String toString() =&gt; '$name ($age)';
}

void main() {
  var people = LinkedList&lt;Person&gt;();
  people.add(Person('Alice', 30));
  people.add(Person('Bob', 25));
  people.add(Person('Charlie', 35));

  print(people);
}

We define a Person class that extends LinkedListEntry. We then create a
LinkedList and add three Person instances. The list maintains their order.

$ dart main.dart
(Alice (30), Bob (25), Charlie (35))

## Inserting Elements

LinkedList provides several methods to insert elements at specific positions.

main.dart
  

import 'dart:collection';

class Task extends LinkedListEntry&lt;Task&gt; {
  final String description;

  Task(this.description);

  @override
  String toString() =&gt; description;
}

void main() {
  var tasks = LinkedList&lt;Task&gt;();
  var first = Task('Wake up');
  var second = Task('Brush teeth');
  var third = Task('Have breakfast');

  // Add to end
  tasks.add(first);
  tasks.add(third);

  // Insert before
  first.insertBefore(second);

  // Insert after
  third.insertAfter(Task('Go to work'));

  print(tasks);
}

We demonstrate insertBefore and insertAfter methods. These allow precise
positioning of elements in the list without index calculations.

$ dart main.dart
(Brush teeth, Wake up, Have breakfast, Go to work)

## Removing Elements

Elements can be removed from a LinkedList in several ways.

main.dart
  

import 'dart:collection';

class Product extends LinkedListEntry&lt;Product&gt; {
  final String name;
  final double price;

  Product(this.name, this.price);

  @override
  String toString() =&gt; '$name: \$$price';
}

void main() {
  var cart = LinkedList&lt;Product&gt;();
  var milk = Product('Milk', 2.99);
  var bread = Product('Bread', 1.99);
  var eggs = Product('Eggs', 3.49);

  cart.addAll([milk, bread, eggs]);
  print('Original: $cart');

  // Remove specific item
  bread.unlink();
  print('After unlink: $cart');

  // Remove first
  cart.first.unlink();
  print('After first removed: $cart');

  // Clear all
  cart.clear();
  print('After clear: $cart');
}

The unlink method removes an entry from the list. We can also use clear to
remove all elements at once.

$ dart main.dart
Original: (Milk: $2.99, Bread: $1.99, Eggs: $3.49)
After unlink: (Milk: $2.99, Eggs: $3.49)
After first removed: (Eggs: $3.49)
After clear: ()

## Iterating Over LinkedList

LinkedList supports standard iteration methods for traversing elements.

main.dart
  

import 'dart:collection';

class City extends LinkedListEntry&lt;City&gt; {
  final String name;
  final int population;

  City(this.name, this.population);

  @override
  String toString() =&gt; '$name: $population';
}

void main() {
  var cities = LinkedList&lt;City&gt;();
  cities.addAll([
    City('Tokyo', 37400068),
    City('Delhi', 28514000),
    City('Shanghai', 25582000)
  ]);

  // Forward iteration
  print('Forward:');
  for (var city in cities) {
    print(city);
  }

  // Manual backward iteration
  print('\nBackward:');
  var current = cities.last;
  while (current != null) {
    print(current);
    current = current.previous;
  }
}

We demonstrate both forward and backward iteration. The LinkedList maintains
links in both directions automatically.

$ dart main.dart
Forward:
Tokyo: 37400068
Delhi: 28514000
Shanghai: 25582000

Backward:
Shanghai: 25582000
Delhi: 28514000
Tokyo: 37400068

## LinkedList Properties

LinkedList provides several useful properties for accessing list elements.

main.dart
  

import 'dart:collection';

class Node extends LinkedListEntry&lt;Node&gt; {
  final int value;

  Node(this.value);

  @override
  String toString() =&gt; value.toString();
}

void main() {
  var list = LinkedList&lt;Node&gt;();
  list.addAll([Node(10), Node(20), Node(30), Node(40)]);

  print('First: ${list.first}');
  print('Last: ${list.last}');
  print('Length: ${list.length}');
  print('Is empty: ${list.isEmpty}');
  print('Is not empty: ${list.isNotEmpty}');

  print('\nElement at position 2:');
  var element = list.first.next.next;
  print('Current: $element');
  print('Previous: ${element.previous}');
  print('Next: ${element.next}');
}

We access various properties of the LinkedList and its entries. Each entry knows
its neighbors through previous and next references.

$ dart main.dart
First: 10
Last: 40
Length: 4
Is empty: false
Is not empty: true

Element at position 2:
Current: 30
Previous: 20
Next: 40

## Best Practices

- **Entry Uniqueness:** An entry can belong to only one LinkedList at a time.

- **Memory Efficiency:** Use for frequent insertions/deletions.

- **Performance:** Access is O(n) while insert/delete is O(1).

- **Thread Safety:** Like all Dart collections, not thread-safe.

## Source

[Dart LinkedList Documentation](https://api.dart.dev/stable/dart-collection/LinkedList-class.html)

This tutorial covered Dart's LinkedList with practical examples demonstrating
its key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).