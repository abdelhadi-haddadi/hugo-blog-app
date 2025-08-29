+++
title = "Dart map function"
date = 2025-08-29T19:52:06.984+01:00
draft = false
description = "Dart map function tutorial shows how to map elements of an iterable to a function in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart map function

last modified January 28, 2024

In this article we show how to map elements of an *Iterable* to a
function in Dart language. In our examples, we use the list collection.

The map function returns a lazy Iterable which is
created by calling the specified function on each element of an
Iterable.

## Dart map simple example

The following is a simple map function example.

main.dart
  

void main() {
  final vals = [1, 2, 3, 4, 5, 6];

  final res = vals.map((e) =&gt; e * 5);
  print(res);
  print(res.toList());
}

We have a list of integers. We apply the map function on each of the elements. 
The function is a lambda expression, which multiplies an element by 5. 

$ dart main.dart
(5, 10, 15, 20, 25, 30)
[5, 10, 15, 20, 25, 30]

## Dart map example II

In the following example, we apply the map function on a list of 
words.

main.dart
  

void main() {
  final words = ['sky', 'cloud', 'snow', 'summer', 'cup', 'water'];

  final wlns = words.map((e) =&gt; e.length);
  print(wlns);
}

In the program, we transform a list of words into a sequence of word lengths.

$ dart main.dart
(3, 5, 4, 6, 3, 5)

## Dart indexed map function

If we want to work with element indexes, we can use the mapIndexed
function, which is available in the collection library.

$ dart pub add collection

We add the library to the project.

main.dart
  

import 'package:collection/collection.dart';

void main() {
  final words = ['sky', 'cloud', 'snow', 'summer', 'cup', 'water'];

  final wlns =
      words.mapIndexed((idx, word) =&gt; "{idx=$idx, len=${word.length}}");
  print(wlns);
}

We map the list elements into a iterable of strings, which contain the index 
value and the string length.

$ dart main.dart
({idx=0, len=3}, {idx=1, len=5}, {idx=2, len=4}, ...

## Dart map projection

A projection is a selection of specific fields from the returned objects.

main.dart
  

class User {
  final String name;
  final String occupation;
  final int salary;

  User(this.name, this.occupation, this.salary);

  @override
  String toString() {
    return "$name|$occupation|$salary";
  }
}

void main() {
  final users = &lt;User&gt;[
    User("John", "Doe", 1230),
    User("Lucy", "Novak", 670),
    User("Ben", "Walter", 2050),
    User("Robin", "Brown", 2300),
    User("Amy", "Doe", 1250),
    User("Joe", "Draker", 1190),
    User("Janet", "Doe", 980),
    User("Albert", "Novak", 1930),
  ];

  final salaries = users.map((e) =&gt; e.salary);
  print(salaries);
}

We have list of users having three fields: first name, last name, and salary.
We pick the salary field to form a new lazy iterable.

$ dart main.dart
(1230, 670, 2050, 2300, 1250, 1190, 980, 1930)

## Source

[Dart map method - language reference](https://api.dart.dev/stable/3.2.6/dart-core/Iterable/map.html)

In this article we have have called the map function on elements 
of a list collection. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).