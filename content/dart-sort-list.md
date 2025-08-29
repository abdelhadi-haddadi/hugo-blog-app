+++
title = "Dart sort List"
date = 2025-08-29T19:52:26.198+01:00
draft = false
description = "Dart sort List tutorial shows how to sort List elements in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart sort List

last modified January 28, 2024

In this article we show how to sort List elements in Dart language.

## Sorting

Sorting is arranging elements in an ordered sequence. In the past, several
algorithms were developed to perform sorting on data, including merge sort,
quick sort, selection sort, or bubble sort. 

Shuffling, the opposite of sorting, is rearranging a sequence of elements in a
random or meaningless order.

Data can be sorted alphabetically or numerically. The sort key specifies the
criteria used to perform the sort. It is possible to sort objects by multiple
keys. For instance, when sorting users, the names of the users could be used as
primary sort key, and their occupation as the secondary sort key. 

## Dart sort List of integers

In the first example, we sort integers. 

main.dart
  

void main() {
  var nums = &lt;int&gt;[2, 1, 8, 0, 4, 3, 5, 7, 9];

  nums.sort();
  print(nums);

  var reversed = nums.reversed;
  print(reversed);
  print(nums);
}

We have a list of integers. They are sorted and then reversed.

nums.sort();

The sort method sorts the integers in-place.

var reversed = nums.reversed;

With reversed, we get a new list in reversed order. The values in the
nums are not changed.

$ dart main.dart 
[0, 1, 2, 3, 4, 5, 7, 8, 9]
(9, 8, 7, 5, 4, 3, 2, 1, 0)
[0, 1, 2, 3, 4, 5, 7, 8, 9]

## Dart sort List of strings

In the next example, we sort a list of strings.

main.dart
  

void main() {
  var nums = &lt;String&gt;['sky', 'm', 'worm', 'cup', 'are', 'snail', 'water'];

  nums.sort();
  print(nums);

  var reversed = nums.reversed;
  print(reversed);

  print(nums);
}

Strings are sorted alphabetically by default.

$ dart main.dart 
[are, cup, sky, snail, water, worm]
(worm, water, snail, sky, cup, are)
[are, cup, sky, snail, water, worm]

## Dart List sort strings by length

The following example sorts the list of words by the words' length. 

main.dart
  

void main() {
  var words = &lt;String&gt;['falcon', 'order', 'war',
        'sky', 'ocean', 'blue', 'cloud', 'boy', 'by', 'raven',
        'station', 'batallion'];

  words.sort((e1, e2) =&gt; e1.length.compareTo(e2.length));
  words.forEach(print);

  words.sort((e1, e2) =&gt; e2.length.compareTo(e1.length));
  words.forEach(print);
}

We provide a custom comparison method to do the job. 

words.sort((e1, e2) =&gt; e1.length.compareTo(e2.length));

We provide an anonymous method to the sort method. This method uses
the compareTo method of the integer type to compare the two values.
The size of the words is returned with the length property. 

$ dart main.dart 
by
war
sky
boy
blue
order
ocean
cloud
raven
falcon
station
batallion
batallion
station
falcon
order
ocean
cloud
raven
blue
war
sky
boy
by

## Dart sort List of objects

In the following example, we sort a list of Employee objects. 

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

  empls.sort((e1, e2) =&gt; e1.lname.compareTo(e2.lname));
  empls.forEach(print);

  print("--------------------------");

  empls.sort((e1, e2) =&gt; e2.salary.compareTo(e1.salary));
  empls.forEach(print);
}

We have a list of employee objects. The employee has three attributes: first
name, last name, and salary. We sort the list by employees' last names and then
by their salary.

empls.sort((e1, e2) =&gt; e1.lname.compareTo(e2.lname));

The employees are sorted by their last names in ascending order.

empls.sort((e1, e2) =&gt; e2.salary.compareTo(e1.salary));

The employees are sorted by their salaries in descending order.

$ dart main.dart 
Robin Brown: 2300
Rowan Cruise: 990
John Doe: 1230
Janet Doe: 980
Joe Draker: 1190
Thomas Moore: 1400
Adam Novak: 670
Lucy Smith: 980
--------------------------
Robin Brown: 2300
Thomas Moore: 1400
John Doe: 1230
Joe Draker: 1190
Rowan Cruise: 990
Janet Doe: 980
Lucy Smith: 980
Adam Novak: 670

## Dart Comparable

If the object can be naturally sorted, we can use the Comparable
interface.

main.dart
  

class Employee implements Comparable&lt;Employee&gt; {
  String fname;
  String lname;
  int salary;

  Employee(this.fname, this.lname, this.salary);

  @override
  String toString() {
    return "$fname $lname: $salary";
  }
  
  @override
  int compareTo(Employee other) {
    return lname.compareTo(other.lname);
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

  empls.sort();
  empls.forEach(print);
}

In the example, the Employee implements the Comparable
interface to have a default, natural ordering. 

@override
int compareTo(Employee other) {
    return lname.compareTo(other.lname);
}

We implement the compareTo method, which orders the employees by 
their last names.

$ dart main.dart 
Robin Brown: 2300
Rowan Cruise: 990
John Doe: 1230
Janet Doe: 980
Joe Draker: 1190
Thomas Moore: 1400
Adam Novak: 670
Lucy Smith: 980

## Source

[Dart Sort List method - language reference](https://api.dart.dev/stable/1.10.1/dart-core/List/sort.html)

In this article we have sorted Dart lists.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).