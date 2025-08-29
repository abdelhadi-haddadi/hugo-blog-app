+++
title = "Dart Records"
date = 2025-08-29T19:52:19.536+01:00
draft = false
description = "Dart records tutorial shows how to use records in Dart language to group multiple objects into a single immutable object."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Records

last modified June 7, 2025

In this article, we explore how to use **records** in the Dart
programming language. Records provide a concise way to group multiple values
into a single unit without requiring a custom class. They are immutable,
ordered, and have a fixed size, making them an efficient alternative to
traditional data structures.

Records in Dart function similarly to *tuples* in other programming
languages. They allow developers to return multiple values from a function,
store related data conveniently, and maintain clean, readable code. Unlike
lists, which offer dynamic size and mutability, records are designed to be
lightweight and predictable. 

A key advantage of using records is improved type safety and structure. Each
field in a record maintains its distinct type, ensuring that data remains
properly categorized. This makes records particularly useful when working with
temporary, grouped data in scenarios such as function outputs and intermediate
calculations. 

By leveraging records, Dart developers can write more expressive, concise, and
efficient code without unnecessary boilerplate. In the following sections, we
will demonstrate how to create and work with records effectively.

## Dart Records Simple Example

The following example demonstrates how to create and use a simple record in Dart.

main.dart
  

void main() {
  // Creating a record
  final person = ('John', 30, true);

  // Accessing record elements
  print('Name: ${person.$1}');
  print('Age: ${person.$2}');
  print('Is Active: ${person.$3}');
}

In this program, we create a record containing a name, age, and active status.
We then access and print each element of the record.

final person = ('John', 30, true);

We create a record with three elements: a string, an integer, and a boolean.

print('Name: ${person.$1}');
print('Age: ${person.$2}');
print('Is Active: ${person.$3}');

We access the elements of the record using the $1, $2, and $3 syntax.

$ dart main.dart
Name: John
Age: 30
Is Active: true

## Dart Records with Named Fields

Records can also have named fields, which make the code more readable and self-explanatory.

main.dart
  

void main() {
  // Creating a record with named fields
  final person = (name: 'Alice', age: 25, isActive: false);

  // Accessing record elements using named fields
  print('Name: ${person.name}');
  print('Age: ${person.age}');
  print('Is Active: ${person.isActive}');
}

In this program, we create a record with named fields and access the elements
using the field names.

final person = (name: 'Alice', age: 25, isActive: false);

We create a record with named fields: name, age, and
isActive.

print('Name: ${person.name}');
print('Age: ${person.age}');
print('Is Active: ${person.isActive}');

We access the elements of the record using the named fields.

$ dart main.dart
Name: Alice
Age: 25
Is Active: false

## Dart Records in Functions

Records are particularly useful for returning multiple values from a function.

main.dart
  

(String, int) getUserInfo() {
  return ('Bob', 40);
}

void main() {
  final userInfo = getUserInfo();
  print('Name: ${userInfo.$1}');
  print('Age: ${userInfo.$2}');
}

In this program, we define a function that returns a record containing a name
and age. We then call the function and access the returned values.

(String, int) getUserInfo() {
  return ('Bob', 40);
}

We define a function that returns a record with two elements: a string and an integer.

final userInfo = getUserInfo();
print('Name: ${userInfo.$1}');
print('Age: ${userInfo.$2}');

We call the function and access the returned record's elements.

$ dart main.dart
Name: Bob
Age: 40

## Dart Records with Pattern Matching

Dart supports pattern matching, which allows you to destructure records into
individual variables.

main.dart
  

void main() {
  final person = ('Charlie', 35, true);

  // Destructuring the record
  final (name, age, isActive) = person;

  print('Name: $name');
  print('Age: $age');
  print('Is Active: $isActive');
}

In this program, we use pattern matching to destructure a record into individual
variables.

final (name, age, isActive) = person;

We destructure the record into three variables: name,
age, and isActive.

print('Name: $name');
print('Age: $age');
print('Is Active: $isActive');

We print the values of the destructured variables.

$ dart main.dart
Name: Charlie
Age: 35
Is Active: true

## Dart Records as Map Keys

Records can be used as keys in Dart maps. Records with the same values are
considered equal and have the same hash code.

main.dart
  

void main() {
  final record1 = ('apple', 1);
  final record2 = ('banana', 2);
  final record3 = ('apple', 1);

  final map = {
    record1: 'Red fruit',
    record2: 'Yellow fruit',
  };

  print(map[record1]); // Red fruit
  print(map[record3]); // Red fruit (record1 == record3)
}

In this example, record1 and record3 are equal, so
they refer to the same map entry.

## Dart Records in Collections

You can store records in lists and sets. Dart uses value equality for records,
so duplicates are not added to sets.

main.dart
  

void main() {
  final r1 = ('x', 10);
  final r2 = ('y', 20);
  final r3 = ('x', 10);

  final list = [r1, r2, r3];
  print(list);

  final set = {r1, r2, r3};
  print(set);
}

The set contains only two unique records, even though three were added.

## Dart Records with Positional and Named Fields

A record can have both positional and named fields. You can access them using
their respective syntax.

main.dart
  

void main() {
  final data = ('A', 42, flag: true, description: 'sample');

  print('First: \'${data.$1}\'');
  print('Second: ${data.$2}');
  print('Flag: ${data.flag}');
  print('Description: ${data.description}');
}

This record has two positional fields and two named fields. Access positional
fields with $1, $2 and named fields with their names.

## Source

[Dart Records - Language Documentation](https://dart.dev/language/records)

In this article, we have covered the basics of using records in Dart. Records
are a powerful feature for grouping data in a lightweight and immutable way.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).