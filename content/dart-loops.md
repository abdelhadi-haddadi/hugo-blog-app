+++
title = "Dart loops"
date = 2025-08-29T19:52:05.888+01:00
draft = false
description = "Dart loops tutorial shows how to create loops in Dart language. We create loops with for and while statements. In addition, we present the break and continue statements."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart loops

last modified January 28, 2024

In this article we show how to create loops in Dart language. We create loops
with for and while statements. In addition, we present the break and continue
statements.

## Loops

The for and while statement are used to create loops.
The break and continue statments are used to alter
the loop execution.

Loops are used to execute statements multiple times or to traverse containers.

## Dart while loop

The while statement is a control flow statement that allows code to
be executed repeatedly based on a given boolean condition.

This is the general form of the while loop:

while (expression)
{
    statement;
}

The while keyword executes the statements inside the block enclosed
by the curly brackets. The statements are executed each time the expression is
evaluated to true.

main.dart
  

void main() {
  int i = 0;
  int sum = 0;

  while (i &lt; 10) {
    i++;
    sum += i;
  }

  print(sum);
}

In the code example, we calculate the sum of values from a range of numbers.

The while loop has three parts. Initialization, testing and
updating. Each execution of the statement is called a cycle.

int i = 0;

We initiate the i variable. It is used as a counter.

while (i &lt; 10) {
   ...
}

The expression inside the round brackets following the while
keyword is the second phase: the testing. The statements in the body are
executed until the expression is evaluated to false.

i++;

This is the last, third phase of the while loop: the updating. We
increment the counter. Note that improper handling of the while
loops may lead to endless cycles.

$ dart main.dart
55

## Dart classic for loop

The classic for loop was taken from the C programming language. A for loop has
also three phases: initialization, condition and code block execution, and
incrementation.

main.dart
  

void main() {
  var sum = 0;

  for (int i = 0; i &lt; 10; i++) {
    sum += i;
  }

  print(sum);
}

In this example, we sum values 0..9 and print the result to the console.

for (int i = 0; i &lt; 10; i++) {
  sum += i;
}

In the first phase, we initiate the counter i to zero.
This phase is done only once. Next comes the condition i &lt; 10. 
If the condition is met, the statement inside the for block is executed. In the
third phase the counter is increased. Now we repeat the 2, 3 phases until the
condition is not met and the for loop is left. In our case, when the counter i
is equal to 10, the for loop stops executing.

## Dart for loop List

A for loop can be used for traversal of containers such as lists or maps. From
the length property of the list we get its size.

main.dart
  

void main() {
  final planets = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Pluto"
  ];

  for (int i = 0; i &lt; planets.length; i++) {
    print(planets[i]);
  }

  print("In reverse:");

  for (int i = planets.length - 1; i &gt;= 0; i--) {
    print(planets[i]);
  }
}

We have a list holding the names of planets in our Solar System. Using two for
loops, we print the values in ascending and descending orders. 

for (int i = 0; i &lt; planets.length; i++) {
  print(planets[i]);
}

The lists are accessed by zero-based indexing. The first item has index 0.
Therefore, the i variable is initialized to zero. The condition
checks if the i variable is less than the length of the list. In
the final phase, the i variable is incremented.

for (int i = planets.length - 1; i &gt;= 0; i--) {
  print(planets[i]);
}

This for loop prints the elements of the list in reverse order. The
i counter is initialized to list size. Since the indexing is zero
based, the last element has index list size-1. The condition ensures that the
counter is greater or equal to zero. (List indexes cannot be negative). In the
third step, the i counter is decremented by one.

$ dart main.dart
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Pluto
In reverse:
Pluto
Uranus
Saturn
Jupiter
Mars
Earth
Venus
Mercury

## Dart for loop Map

A for loop can be used to traverse a Map.

main.dart
  

void main() {
  final fruit = {1: 'Apple', 2: 'Banana', 3: 'Cherry', 4: 'Orange'};

  for (final key in fruit.keys) print(key);
  for (final value in fruit.values) print(value);

  for (final me in fruit.entries) {
    print("${me.key}: ${me.value}");
  }
}

In the example, we use for loops to print al keys, values, and map entries
(key/value pairs).

for (var key in fruit.keys) print(key);

In this for loop, we go through all map keys. If a for loop consists only of 
one statement, we can put the whole loop one a single line.

$ dart main.dart 
1
2
3
4
Apple
Banana
Cherry
Orange
1: Apple
2: Banana
3: Cherry
4: Orange

## Dart for/in loop

The for/in simplifies traversing over collections of data. It has
no explicit counter. It goes through the array or collection one by one and the
current value is copied to a variable defined in the construct. 

main.dart
  

void main() {
  final vals = [1, 2, 3, 4, 5];
  for (final e in vals) {
    print(e * e);
  }
}

In the example, we use the for range to go through a list of numbers.

for (final e in vals) {
  print(e * e);
}

We iterate through the list of numbers. The e is a temporary
variable that contains the current value of the list. The for statement goes 
through all the numbers and prints their squares to the console.

$ dart main.dart
1
4
9
16
25

## Dart nested for loop

For statements can be nested; i.e. a for statement can be placed inside another
for statement. All cycles of a nested for loops are executed for each cycle of
the outer for loop. 

main.dart
  

void main() {
  final a1 = ["A", "B", "C"];
  final a2 = ["A", "B", "C"];

  for (int i = 0; i &lt; a1.length; i++) {
    for (int j = 0; j &lt; a2.length; j++) {
      print(a1[i] + a2[j]);
    }
  }
}

In this example, we create a cartesian product of two lists. 

for (int i = 0; i &lt; a1.length; i++) {
  for (int j = 0; j &lt; a2.length; j++) {
    print(a1[i] + a2[j]);
  }
}

There is a nested for loop inside another parent for loop. The nested for loop
is executed fully for each of the cycles of the parent for loop. 

$ dart main.dart
AA
AB
AC
BA
BB
BC
CA
CB
CC

## Dart break statement

The break statement can be used to terminate the execution of a loop created 
by while and for statements.

main.dart
  

import 'dart:math';

void main() {
  const int MAX = 30;

  while (true) {
    var num = new Random().nextInt(MAX);
    print("$num");

    if (num == 22) {
      break;
    }
  }

  print("\n");
}

We define an endless while loop. We use the break statement to get
out of this loop. We choose a random value from 1 to 30. We print the value. If
the value equals to 22, we finish the endless while loop. 

$ dart main.dart
21
4
20
20
22

## Dart continue statement

The continue statement is used to skip a part of the loop and
continue with the next iteration of the loop. In the following example, we print
a list of numbers that cannot be divided by 2 without a remainder. 

main.dart
  

void main() {
  int num = 0;

  while (num &lt; 1000) {
    num++;

    if ((num % 2) == 0) {
      continue;
    }

    print("$num");
  }

  print("\n");
}

We iterate through numbers 1..999 with the while loop. 

if ((num % 2) == 0) {
  continue;
}

If the expression num % 2 returns 0, the number in question can be
divided by 2. The continue statement is executed and the rest of the cycle is
skipped. In our case, the last statement of the loop is skipped and the number
is not printed to the console. The next iteration is started. 

## Source

[Dart loops - language reference](https://dart.dev/language/loops)

In this article we have covered loops in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).