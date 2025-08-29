+++
title = "Dart List"
date = 2025-08-29T19:52:04.788+01:00
draft = false
description = "Dart List tutorial shows how to work with ordered collections in Dart using List class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart List

last modified April 4, 2025

In Dart, List is an ordered collection of elements. It maintains insertion order
and allows duplicate values. Lists are similar to arrays in other languages.

Lists in Dart can be either fixed-length or growable. Growable lists can change
size dynamically. Lists are zero-indexed and support various operations.

## Creating a List

There are several ways to create a List in Dart. The simplest is using list
literals with square brackets.

main.dart
  

void main() {
  // Using list literal
  var fruits = ['apple', 'banana', 'orange'];
  print(fruits);

  // Using List constructor
  var numbers = List&lt;int&gt;.filled(3, 0);
  numbers[0] = 1;
  numbers[1] = 2;
  numbers[2] = 3;
  print(numbers);
}

The first example creates a growable list of strings. The second creates a
fixed-length list initialized with zeros. We then assign values to each index.

$ dart main.dart
[apple, banana, orange]
[1, 2, 3]

## Accessing List Elements

List elements can be accessed using index notation. Dart provides various methods
for safe element access.

main.dart
  

void main() {
  var colors = ['red', 'green', 'blue', 'yellow'];

  // Access by index
  print(colors[0]); // red
  print(colors[3]); // yellow

  // Safe access with elementAt
  print(colors.elementAt(2)); // blue

  // First and last elements
  print('First: ${colors.first}');
  print('Last: ${colors.last}');

  // Length
  print('Length: ${colors.length}');
}

We demonstrate different ways to access list elements. elementAt is safer than
[] as it throws RangeError for invalid indices. first and last are convenient.

$ dart main.dart
red
yellow
blue
First: red
Last: yellow
Length: 4

## Adding and Removing Elements

Growable lists support dynamic addition and removal of elements. Here are common
operations.

main.dart
  

void main() {
  var numbers = [1, 2, 3];

  // Adding elements
  numbers.add(4);
  numbers.addAll([5, 6]);
  numbers.insert(0, 0);
  print('After adding: $numbers');

  // Removing elements
  numbers.remove(6);
  numbers.removeAt(0);
  numbers.removeLast();
  print('After removing: $numbers');

  // Clear all
  numbers.clear();
  print('After clear: $numbers');
}

add appends a single element, while addAll adds multiple. insert places an
element at a specific position. Various remove methods delete elements.

$ dart main.dart
After adding: [0, 1, 2, 3, 4, 5, 6]
After removing: [1, 2, 3, 4]
After clear: []

## List Iteration

Dart provides multiple ways to iterate through list elements. Here are the most
common patterns.

main.dart
  

void main() {
  var languages = ['Dart', 'Python', 'Java', 'C#'];

  // for loop
  print('for loop:');
  for (var i = 0; i &lt; languages.length; i++) {
    print(languages[i]);
  }

  // for-in loop
  print('\nfor-in loop:');
  for (var lang in languages) {
    print(lang);
  }

  // forEach
  print('\nforEach:');
  languages.forEach((lang) =&gt; print(lang));

  // map
  print('\nmap:');
  var upper = languages.map((lang) =&gt; lang.toUpperCase());
  print(upper);
}

The for loop provides index access. for-in is simpler for element access.
forEach is functional style. map transforms elements to a new iterable.

$ dart main.dart
for loop:
Dart
Python
Java
C#

for-in loop:
Dart
Python
Java
C#

forEach:
Dart
Python
Java
C#

map:
(DART, PYTHON, JAVA, C#)

## List Manipulation

Dart lists support various manipulation operations like sorting, filtering, and
slicing.

main.dart
  

void main() {
  var numbers = [5, 2, 8, 1, 7, 3, 9, 4, 6];

  // Sorting
  numbers.sort();
  print('Sorted: $numbers');

  // Reversing
  var reversed = numbers.reversed.toList();
  print('Reversed: $reversed');

  // Filtering
  var even = numbers.where((n) =&gt; n % 2 == 0).toList();
  print('Even numbers: $even');

  // Sublist
  var middle = numbers.sublist(2, 5);
  print('Middle sublist: $middle');

  // Shuffling
  numbers.shuffle();
  print('Shuffled: $numbers');
}

sort modifies the list in place. reversed returns an iterable that needs toList.
where filters elements. sublist extracts a portion. shuffle randomizes order.

$ dart main.dart
Sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Reversed: [9, 8, 7, 6, 5, 4, 3, 2, 1]
Even numbers: [2, 4, 6, 8]
Middle sublist: [3, 4, 5]
Shuffled: [5, 9, 1, 6, 3, 8, 2, 4, 7]

## Spread Operator and Collection If/For

Dart supports spread operator (...) and collection if/for in list literals.

main.dart
  

void main() {
  var list1 = [1, 2, 3];
  var list2 = [4, 5, 6];

  // Spread operator
  var combined = [...list1, ...list2];
  print('Combined: $combined');

  // Collection if
  var includeZero = true;
  var numbers = [if (includeZero) 0, ...list1];
  print('With optional zero: $numbers');

  // Collection for
  var squares = [for (var n in list2) n * n];
  print('Squares: $squares');
}

The spread operator expands a list into individual elements. Collection if
conditionally includes elements. Collection for transforms elements during
list creation.

$ dart main.dart
Combined: [1, 2, 3, 4, 5, 6]
With optional zero: [0, 1, 2, 3]
Squares: [16, 25, 36]

## Best Practices

- **Type Safety:** Always specify list types for better code clarity.

- **Growable Lists:** Prefer growable lists unless fixed size is needed.

- **Immutable Lists:** Use List.unmodifiable for read-only lists.

- **Performance:** Consider LinkedList for frequent insertions/deletions.

## Source

[Dart List Documentation](https://api.dart.dev/stable/dart-core/List-class.html)

This tutorial covered Dart's List with practical examples demonstrating its
key features and usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).