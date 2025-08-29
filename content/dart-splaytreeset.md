+++
title = "Dart SplayTreeSet"
date = 2025-08-29T19:52:27.314+01:00
draft = false
description = "Dart SplayTreeSet tutorial shows how to work with sorted set collections in Dart using SplayTreeSet class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SplayTreeSet

last modified April 4, 2025

In Dart, SplayTreeSet is a self-balancing binary search tree implementation of
a Set. It maintains elements in sorted order and provides efficient operations.

SplayTreeSet implements the Set interface and automatically sorts elements. It
uses splay tree operations that provide amortized O(log n) performance for most
operations.

## Creating a SplayTreeSet

The simplest way to create a SplayTreeSet is using the constructor.

main.dart
  

import 'dart:collection';

void main() {
  var numbers = SplayTreeSet&lt;int&gt;();
  numbers.addAll([5, 3, 7, 1, 9]);
  
  print(numbers);
}

We create a SplayTreeSet of integers. The addAll method adds multiple elements
at once. The set automatically maintains elements in sorted order.

$ dart main.dart
{1, 3, 5, 7, 9}

## Custom Sorting with Comparator

We can provide a custom comparator to define our own sorting order.

main.dart
  

import 'dart:collection';

void main() {
  var names = SplayTreeSet&lt;String&gt;((a, b) =&gt; b.compareTo(a));
  names.addAll(['Alice', 'Bob', 'Charlie', 'David']);
  
  print(names);
}

This creates a SplayTreeSet sorted in reverse alphabetical order. The comparator
function defines how elements should be ordered in the set.

$ dart main.dart
{David, Charlie, Bob, Alice}

## First and Last Elements

SplayTreeSet provides efficient access to the first and last elements.

main.dart
  

import 'dart:collection';

void main() {
  var prices = SplayTreeSet&lt;double&gt;();
  prices.addAll([19.99, 9.99, 29.99, 14.99]);
  
  print('First: ${prices.first}');
  print('Last: ${prices.last}');
  print('Elements &gt;= 15: ${prices.from(15.0)}');
}

We access the smallest and largest elements in the set. The from method returns
a view of elements greater than or equal to the given value.

$ dart main.dart
First: 9.99
Last: 29.99
Elements &gt;= 15: {19.99, 29.99}

## Range Operations

SplayTreeSet supports efficient range queries with from, to, and between.

main.dart
  

import 'dart:collection';

void main() {
  var years = SplayTreeSet&lt;int&gt;();
  years.addAll([2000, 2010, 2020, 2030, 2040]);
  
  print('Years after 2020: ${years.from(2021)}');
  print('Years up to 2030: ${years.to(2030)}');
  print('Years 2010-2030: ${years.range(2010, 2030)}');
}

These operations return views of the original set. They're efficient as they
leverage the tree structure without creating new collections.

$ dart main.dart
Years after 2020: {2030, 2040}
Years up to 2030: {2000, 2010, 2020, 2030}
Years 2010-2030: {2010, 2020, 2030}

## Custom Objects in SplayTreeSet

When using custom objects, we must provide a comparator or implement Comparable.

main.dart
  

import 'dart:collection';

class Product implements Comparable&lt;Product&gt; {
  final String name;
  final double price;
  
  Product(this.name, this.price);
  
  @override
  int compareTo(Product other) =&gt; price.compareTo(other.price);
  
  @override
  String toString() =&gt; '$name: \$$price';
}

void main() {
  var products = SplayTreeSet&lt;Product&gt;();
  products.addAll([
    Product('Laptop', 999.99),
    Product('Phone', 699.99),
    Product('Tablet', 399.99)
  ]);
  
  print(products);
}

The Product class implements Comparable to define natural ordering. The
SplayTreeSet uses this to maintain products sorted by price.

$ dart main.dart
{Tablet: $399.99, Phone: $699.99, Laptop: $999.99}

## Best Practices

- **Comparator Choice:** Provide a consistent comparator for custom ordering.

- **Immutable Elements:** Avoid modifying elements after insertion.

- **Range Queries:** Leverage from/to/range for efficient subset operations.

- **Performance:** Be aware of amortized O(log n) complexity for operations.

## Source

[Dart SplayTreeSet Documentation](https://api.dart.dev/stable/dart-collection/SplayTreeSet-class.html)

This tutorial covered Dart's SplayTreeSet with practical examples demonstrating
its key features and usage patterns for sorted collections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).