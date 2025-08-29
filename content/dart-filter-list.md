+++
title = "Dart filter List"
date = 2025-08-29T19:51:49.077+01:00
draft = false
description = "Learn how to filter lists in Dart using iteration, the where method, and built-in filtering techniques. This tutorial covers efficient ways to filter List elements in Dart."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart filter List

last modified June 8, 2025

In this article, we explore various techniques for filtering List
elements in Dart. Filtering is a fundamental operation in programming, allowing
developers to extract relevant data from collections efficiently.

Filtering is the process of selecting specific elements from a data structure
(e.g., a list or array) based on a given condition. The result is a new data
structure containing only the elements that satisfy the condition, while others
are excluded.

In Dart, filtering is typically performed using iterables and built-in methods
like where. The filtering condition is defined using a predicate
function, which is a function that takes an element as input and returns a
boolean value indicating whether the element should be included.

A predicate is a function that evaluates each element in a collection and
returns either true or false. Elements for which the predicate returns true are
included in the filtered result, while others are discarded.

Filtering is widely used in various applications, including:

    - Data processing - Extracting relevant information from large datasets.

    - User interfaces - Displaying only matching search results.

    - API responses - Selecting specific fields from JSON data.

    - Security - Filtering out invalid or unauthorized inputs.

By leveraging Dart's built-in filtering methods, developers can efficiently
manipulate collections while keeping their code concise and readable.

## Dart filter List with where

The where function all elements that satisfy the predicate
function.

main.dart
  

void main() {
  var vals = &lt;int&gt;[-1, 3, 2, 0, 1, -3, 4, 3, 5];
  var positive = vals.where((e) =&gt; e &gt; 0);
  print(positive);

  var words = &lt;String&gt;["wolf", "sky", "falcon", "cloud", "wood", "oak"];
  var w3 = words.where((e) =&gt; e.length == 3);
  print(w3);
}

In the example, we filter two lists.

var vals = &lt;int&gt;[-1, 3, 2, 0, 1, -3, 4, 3, 5];
var positive = vals.where((e) =&gt; e &gt; 0);

We filter out all elements that are positive. We pass an anonymous function 
to the where function.

var words = &lt;String&gt;["wolf", "sky", "falcon", "cloud", "wood", "oak"];
var w3 = words.where((e) =&gt; e.length == 3);

Here, we get all words whose lenght is 3.

$ dart main.dart 
(3, 2, 1, 4, 3, 5)
(sky, oak)

## Dart filter List with retainWhere

The retainWhere function removes all elements from a list that fail
to satisfy the given predicate.

main.dart
  

void main() {

  var words = &lt;String&gt;["wolf", "sky", "falcon", "cloud", "wood", "oak"];
  var words2 = List&lt;String&gt;.of(words);

  words2.retainWhere((e) =&gt; e.startsWith("w"));

  print(words);
  print(words2);
}

In the program, we want to take all words that start with 'w'.

var words = &lt;String&gt;["wolf", "sky", "falcon", "cloud", "wood", "oak"];
var words2 = List&lt;String&gt;.of(words);

First, we create a copy of the original list.

words2.retainWhere((e) =&gt; e.startsWith("w"));

We apply the retainWhere function on the list. It takes an
anonymous predicate which checks if the element starts with 'w' with
startsWith.

$ dart main.dart 
[wolf, sky, falcon, cloud, wood, oak]
[wolf, wood]

## Dart removeWhere

The removeWhere removes all elements from a list that satisfy
the given predicate.

main.dart
  

void main() {
  var words = &lt;String?&gt;["wolf", null, "falcon", null, "cloud", "wood", "oak"];

  words.removeWhere((e) =&gt; e == null);
  print(words); 
}

We remove all null values from the list of words.

$ dart main.dart 
[wolf, falcon, cloud, wood, oak]

## Dart filter a List of objects

In the next example, we filter a list of objects.

main.dart
  

class Employee {
  String fname;
  String lname;
  int salary;

  Employee(this.fname, this.lname, this.salary);

  @override
  String toString() {
    return "$fname $lname: $salary";
  }
}

void main() {
  var empls = &lt;Employee&gt;[
    new Employee("John", "Doe", 1230),
    new Employee("Adam", "Novak", 670),
    new Employee("Robin", "Brown", 2300),
    new Employee("Rowan", "Cruise", 990),
    new Employee("Joe", "Draker", 1190),
    new Employee("Janet", "Doe", 980),
    new Employee("Lucy", "Smith", 980),
    new Employee("Thomas", "Moore", 1400)
  ];

  var filtered = empls.where((e) =&gt; e.salary &gt; 1000);
  print(filtered);
}

We have a list of employees. We want all employees that have salary higher than
1000.

var filtered = empls.where((e) =&gt; e.salary &gt; 1000);

In the predicate, we access the salary attribute of the element and compare it 
with the 1000 value.

$ dart main.dart 
(John Doe: 1230, Robin Brown: 2300, Joe Draker: 1190, Thomas Moore: 1400)

## Dart whereType

With whereType function, we can get all values of the given type.

main.dart
  

void main() {
  var data = ['sky', 2, 'owl', 11, 'forest', 'falcon'];

  var words = data.whereType&lt;String&gt;();
  print(words);
}

In the example, we filter out all words from the data list.

$ dart main.dart 
(sky, owl, forest, falcon)

## Using List comprehension

A list comprehension is a syntactic construct which creates a list based on an
existing list and a filtering condition.

main.dart
  

void main() {
  var vals = &lt;int&gt;[-1, 3, 2, 0, 1, -3, 4, 3, 5];

  var negative = [
    for (var e in vals)
      if (e &lt; 0) e
  ];

  print(negative);
}

Using list comprehension, we create a new list that contains only negative
values.

$ dart main.dart 
[-1, -3]

## Dart filter List with index

Sometimes you may want to filter a list based on both the element value and its
index. You can achieve this by using asMap or
List.generate.

main.dart
  

void main() {
  var vals = &lt;int&gt;[10, 15, 20, 25, 30, 35, 40];

  // Keep only even-indexed elements that are greater than 20
  var filtered = vals.asMap().entries
      .where((entry) =&gt; entry.key % 2 == 0 &amp;&amp; entry.value &gt; 20)
      .map((entry) =&gt; entry.value);

  print(filtered.toList());
}

In this example, we keep only elements at even indices that are greater than 20.

$ dart main.dart
[30, 40]

## Chaining filters

You can chain multiple where calls to apply several filtering
conditions in sequence.

main.dart
  

void main() {
  var vals = &lt;int&gt;[3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

  // Keep only numbers greater than 10 and divisible by 3
  var filtered = vals.where((e) =&gt; e &gt; 10).where((e) =&gt; e % 3 == 0);

  print(filtered.toList());
}

Here, we first filter numbers greater than 10, then keep only those divisible by
3.

$ dart main.dart
[12, 15, 18, 21, 24, 27, 30]

## Source

[Dart List - language reference](https://api.dart.dev/stable/3.2.6/dart-core/List-class.html)

In this article we have explored various techniques for filtering lists in Dart.
We covered the use of the where method, which allows us to filter
elements based on a predicate function. We also discussed the
retainWhere and removeWhere methods, which modify the
original list by retaining or removing elements that satisfy a given condition.
Additionally, we looked at using list comprehensions for filtering and
demonstrated how to filter lists of objects based on their properties. Finally,
we explored advanced filtering techniques such as filtering with indices and
chaining multiple filters.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).