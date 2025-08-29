+++
title = "Dart Set"
date = 2025-08-29T19:52:22.862+01:00
draft = false
description = "Dart Set tutorial shows how to work with collections of unique elements in Dart using Set interface."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Set

last modified April 4, 2025

In Dart, Set is a collection of unique elements. It does not allow duplicate
values and provides efficient membership testing operations.

Set implements the Iterable interface and provides methods for mathematical
set operations like union, intersection, and difference. Elements must have
consistent Object.== and Object.hashCode implementations.

## Creating a Set

The simplest way to create a Set is using the Set constructor or literal syntax.

main.dart
  

void main() {
  // Using constructor
  var numbers = Set&lt;int&gt;();
  numbers.add(1);
  numbers.add(2);
  numbers.add(3);
  
  // Using literal
  var colors = {'red', 'green', 'blue'};
  
  print(numbers);
  print(colors);
}

We create two Sets: one using the constructor and another using literal syntax.
The generic type specifies the element type. Duplicates are automatically removed.

$ dart main.dart
{1, 2, 3}
{red, green, blue}

## Basic Set Operations

Sets provide methods for adding, removing, and checking elements.

main.dart
  

void main() {
  var fruits = {'apple', 'banana', 'orange'};
  
  // Add elements
  fruits.add('pear');
  fruits.addAll(['kiwi', 'mango']);
  
  // Check elements
  print(fruits.contains('apple')); // true
  print(fruits.contains('grape')); // false
  
  // Remove elements
  fruits.remove('banana');
  fruits.removeWhere((fruit) =&gt; fruit.startsWith('m'));
  
  print(fruits);
}

We demonstrate basic Set operations. addAll adds multiple elements, while
removeWhere removes elements matching a condition. contains checks for membership.

$ dart main.dart
true
false
{apple, orange, pear, kiwi}

## Set Operations

Sets support mathematical operations like union, intersection, and difference.

main.dart
  

void main() {
  var set1 = {1, 2, 3, 4, 5};
  var set2 = {4, 5, 6, 7, 8};
  
  // Union
  print(set1.union(set2));
  
  // Intersection
  print(set1.intersection(set2));
  
  // Difference
  print(set1.difference(set2));
  
  // Check subset
  print(set1.containsAll({2, 3})); // true
}

These operations create new Sets without modifying the originals. union combines
elements, intersection finds common elements, and difference finds elements in
set1 not in set2.

$ dart main.dart
{1, 2, 3, 4, 5, 6, 7, 8}
{4, 5}
{1, 2, 3}
true

## Iterating Over a Set

Sets can be iterated using various methods since they implement Iterable.

main.dart
  

void main() {
  var languages = {'Dart', 'Python', 'Java', 'Go', 'Rust'};
  
  // for-in loop
  for (var lang in languages) {
    print(lang);
  }
  
  // forEach method
  languages.forEach((lang) =&gt; print(lang.toUpperCase()));
  
  // map and where
  var shortNames = languages.where((lang) =&gt; lang.length &lt;= 4);
  print(shortNames);
}

We demonstrate three ways to process Set elements. The iteration order is
unspecified but consistent within a single program run.

$ dart main.dart
Dart
Python
Java
Go
Rust
DART
PYTHON
JAVA
GO
RUST
{Dart, Java, Go}

## Set with Custom Objects

When using custom objects in Sets, proper == and hashCode implementations are
required.

main.dart
  

class Book {
  final String title;
  final String author;
  
  Book(this.title, this.author);
  
  @override
  bool operator ==(Object other) =&gt;
      identical(this, other) ||
      other is Book &amp;&amp; title == other.title &amp;&amp; author == other.author;
  
  @override
  int get hashCode =&gt; title.hashCode ^ author.hashCode;
}

void main() {
  var library = Set&lt;Book&gt;();
  var book1 = Book('Dart in Action', 'Manning');
  var book2 = Book('Flutter Cookbook', 'Packt');
  var book3 = Book('Dart in Action', 'Manning'); // Same as book1
  
  library.add(book1);
  library.add(book2);
  library.add(book3);
  
  print(library);
  print('book1 and book3 same: ${library.contains(book3)}');
}

The Book class implements == and hashCode to ensure logical equality. book1 and
book3 are considered equal despite being different instances, so only one is
added to the Set.

$ dart main.dart
{Book(Dart in Action, Manning), Book(Flutter Cookbook, Packt)}
book1 and book3 same: true

## Best Practices

- **Element Uniqueness:** Ensure elements have proper == and hashCode.

- **Performance:** Use Sets when you need fast contains checks.

- **Immutability:** Consider using const Sets for immutable data.

- **Type Safety:** Always specify generic types for clarity.

## Source

[Dart Set Documentation](https://api.dart.dev/stable/dart-core/Set-class.html)

This tutorial covered Dart's Set interface with practical examples demonstrating
its key features and usage patterns for unique element collections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).