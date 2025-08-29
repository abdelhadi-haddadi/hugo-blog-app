+++
title = "Dart basics"
date = 2025-08-29T19:51:40.122+01:00
draft = false
description = "Dart basics tutorial covers the basic programming concepts of Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart basics

last modified January 28, 2024

In this article we cover the basic programming concepts of Dart language.

Dart is a client-optimized language for fast applications on any platform. It is
used to build mobile, desktop, server, and web applications.

## Dart simple example

The following is a simple example in Dart.

main.dart
  

void main() {
  print('First program in Dart');
}

The program prints a message to the console. Dart programs have the
main.dart extension. The main function is the entry point
to the program. The body of the function is enclosed in a pair of curly brackets.
The print function displays a message in console. The statements
are terminated with a semicolon.

$ dart main.dart
First program in Dart

We run the program.

## Dart comments

Comments are used by humans to clarify source code. There are three types of
comments in Dart: single line comments (//), multi-line comments (/* */),  and
documentation comments (///).

Documentation comments are used to produce documentation by
dartdoc. They are used also by IDEs.

main.dart
  

/*
  This is main.dart
  Author: Jan Bodnar
  ZetCode 2023
*/

// Program starts here
void main() {
  print("This is a Dart program");
}

In the example, we have a multi-line and a single line comment. Comments are
ignored by the compiler.

## Dart variables

Variables store references to values. Every value is an object -- an instance
of a class.

main.dart
  

void main() {
  String name = 'John Doe';
  int age = 34;
  double height = 172.5;

  print('$name is $age years old; his height is $height cm');
}

In the example, we have three variables: a string, an integer, and a double
variable. The data type of the variables are explicitly specified with
String, int, and double.

String name = 'John Doe';

We can create string literals both with single and double quotes.

print('$name is $age years old; his height is $height cm');

Dart supports variable interpolation in strings. The variables preceded with
the $ character are evaluated to their values inside strings.

$ dart main.dart
John Doe is 34 years old; his height is 172.5

## Dart var keyword

When we use the var keyword, the compiler infers the data type of
a variable from the right side of the assignment.

main.dart
  

void main() {
  var name = 'John Doe';
  var age = 34;
  var height = 172.5;

  print('$name is $age years old; his height is $height cm');

  print(name.runtimeType);
  print(age.runtimeType);
  print(height.runtimeType);
}

The data types of the three variables are inferred by the compiler.

print(name.runtimeType);
print(age.runtimeType);
print(height.runtimeType);

We can use the runtimeType attribute to get the data type of a
variable.

$ dart main.dart
John Doe is 34 years old; his height is 172.5 cm
String
int
double

## Dart dynamic keyword

With the dynamic keyword, we can declare a dynamically typed
variable. We can assign values of different data types to the same variable.

main.dart
  

void main() {
  dynamic n = 3;
  print(3);

  n = 'three';
  print(n);
}

In the example, we first assign value 3 to the n variable; later,
we assign the string value 'three'.

$ dart main.dart
3
three

## Dart user input

The dart:io library provides file, socket, HTTP, and other I/O
support for non-web applications.

main.dart
  

import 'dart:io';

void main() {
  stdout.write("Enter your name: ");
  var name = stdin.readLineSync();
  print('Hello $name\n');
}

The example prompts the user for his name and prints a message.

stdout.write("Enter your name: ");

We can use the stdout.write function to write to the console
without a newline character.

var name = stdin.readLineSync();

We read the user input with stdin.readLineSync.

$ dart main.dart
Enter your name: Peter
Hello Peter

## Dart conditionals

Conditionals are created with the if, else if, and
else keywords.

main.dart
  

import 'dart:io';

void main() {
  stdout.write("Enter a number: ");
  var input = stdin.readLineSync();

  var n = int.parse(input);

  if (n &gt; 0) {
    print('$n is a positive value');
  } else if (n == 0) {
    print('$n is zero');
  } else {
    print('$n is a negative value');
  }
}

In the example, we ask for a number from the user. Depending on the received
value, we print a message to the console.

var n = int.parse(input);

Since the readLineSync returns a string, we transform the string
to a number with int.parse.

if (n &gt; 0) {
  print('$n is a positive value');
} else if (n == 0) {
  print('$n is zero');
} else {
  print('$n is a negative value');
}

After the if keyword, we place the condition between two round
brackets. If the condition is true, the body of the if statement is executed.
Other branches are skipped. If the condition is false, the compiler tests the
condition after the else if statement. If it is true, the following
body is executed. If both conditions fail, the body after the else
statement is executed.

$ dart main.dart
Enter a number: 4
4 is a positive value
$ dart main.dart
Enter a number: -4
-4 is a negative value
$ dart main.dart
Enter a number: 0
0 is zero

## Dart Exception

Exceptions are errors indicating that something unexpected happened.
Exceptions are processed with try, on, and
catch keywords.

main.dart
  

import 'dart:io';

void main() {
  stdout.write("Enter a number: ");
  var input = stdin.readLineSync();

  int n;

  try {
    n = int.parse(input);
  } on FormatException {
    print('wrong value');
    return 1;
  }

  if (n &gt; 0) {
    print('$n is a positive value');
  } else if (n == 0) {
    print('$n is zero');
  } else {
    print('$n is a negative value');
  }
}

In the example, we handle the case when the user does not enter a valid number
value.

try {
  n = int.parse(input);
} on FormatException {
  print('wrong value');
return 1;
}

The error prone code is placed in the body of the try statement.
The FormatException is thrown when a string or some other data does
not have an expected format and cannot be parsed or processed.

$ dart main.dart
Enter a number: 4
4 is a positive value
$ dart main.dart
Enter a number: f
wrong value

## Dart while loop

The while statement is a control flow statement that allows code to
be executed repeatedly based on a given boolean condition.
The while keyword executes the statements inside the block enclosed
by the curly brackets. The statements are executed each time the expression is
evaluated to true.

main.dart
  

void main() {
  int i = 0;
  int sum = 0;

  while (i &lt;= 10) {
    sum += i;
    i++;
  }

  print(sum);
}

In the code example, we calculate the sum of values from a range of numbers.

The while loop has three parts. Initialization, testing and
updating. Each execution of the statement is called a cycle.

int i = 0;

We initiate the i variable. It is used as a counter.

while (i &lt;= 10) {
   ...
}

The expression inside the round brackets following the while
keyword is the second phase, the testing. The statements in the body are
executed until the expression is evaluated to false.

sum += i;

We add the current value of i to the sum variable.

i++;

This is the last, third phase of the while loop, the updating. We
increment the counter. Note that improper handling of the while
loops may lead to endless cycles.

$ dart main.dart
55

## Dart for loop

We can do loops with the for statement. There are two for loops
in Dart: the classic for loop and the for range loop.

main.dart
  

void main() {
  var sum = 0;
  for (var i = 0; i &lt; 10; i++) {
    sum += i;
  }

  print(sum);

  var vals = [1, 2, 3, 4, 5];
  for (var e in vals) {
    print(e * e);
  }
}

In the example, we use both for loops.

var sum = 0;
for (var i = 0; i &lt; 10; i++) {
     sum += i;
}

We calculate the sum of values 1..10 with the classic for loop. There are three
phases. In the first phase, we initiate the counter i to zero. This phase is
done only once. Next comes the condition. If the condition is met, the statement
inside the for block is executed. In the third phase the counter is increased.
Now we repeat the 2, 3 phases until the condition is not met and the for loop is
left. In our case, when the counter i is equal to 10, the for loop stops
executing.

var vals = [1, 2, 3, 4, 5];
for (var e in vals) {
     print(e * e);
}

In the second form, we go through the elements of a list one by one. We square
all the values of the list.

$ dart main.dart
45
1
4
9
16
25

## Dart command line arguments

Dart programs can receive command line arguments. They follow the name of the
program when we run it.

main.dart
  

void main(List&lt;String&gt; args) {
  for (var val in args) {
    print(val);
  }

  print('---------');

  for (int i = 0; i &lt; args.length; i++) {
    print(args[i]);
  }
}

We receive the arguments in the args list. We go through the
arguments with the classic and the range for loops.

$ dart main.dart 1 2 3 4
1
2
3
4
---------
1
2
3
4

## Source

[Dart Guides](https://dart.dev/guides)

This was an introduction to the Dart programming language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).