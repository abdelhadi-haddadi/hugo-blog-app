+++
title = "Dart control flow"
date = 2025-08-29T19:51:42.345+01:00
draft = false
description = "Dart control flow tutorial shows how to control flow of a Dart program. We define several keywords that enable us to control the flow of a C# program."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart control flow

last modified January 28, 2024

In this article we talk about the flow control in Dart. We define several
keywords that enable us to control the flow of a Dart program.

When a Dart program is run, the code is executed from top to bottom. The flow of
the program can be altered with various keywords, including if/else, for, while,
and switch.

The control flow structures can be used to executed code conditionally or
multiple times.

## Dart if &amp; else

The if statement specifies the conditional execution 
of a block. If the expression evaluates to true, the block is executed. 
If the else statement is present and the if statement evaluates
to false, the block following else is executed. 

There can be multiple if/else statements.

## Dart if/else examples

The following examples demonstrate conditional execution of blocks with 
if/else.

main.dart
  

void main() {
  final num = 4;

  if (num &gt; 0) {
    print("The number is positive");
  }
}

In the example we have a simple condition; if the num variable 
is positive, the message "The number is positive" is printed to the console.
Otherwise; nothing is printed. 

$ dart main.dart
The number is positive

The message is printed since value 4 is positive.

main.dart
  

void main() {
  final num = -4;

  if (num &gt; 0) {
    print("The number is positive");
  } else {
    print("The number is negative");
  }
}

Now we have added the second branch. The else statement specifies
the block that is executed if the if condition fails.

$ dart main.dart
The number is negative

For the -4 value, the "The number is negative" is printed.

main.dart
  

import 'dart:math';

void main() {
  const int MAX = 10;
  final num = new Random().nextInt(MAX) - 5;

  if (num &gt; 0) {
    print("The number is positive");
  } else if (num == 0) {
    print("The number is zero");
  } else {
    print("The number is negative");
  }
}

In this example, we add additional branch with if else. We generate 
random values between -5 and 4. With the help of the if &amp;
else statement we print a message for all three options.

## Dart switch statement

The switch statement is a selection control flow statement. It creates multiple
branches in a simpler way than using the combination of if/else
statements.

The switch keyword is used to test a value from the variable or the
expression against a group of values. The values are presented with the
case keyword. If the values match, the statement following the case
is executed. There is an optional default statement. It is executed if no other
match is found.

Each case can be terminated with break. If it is not, 
it falls through.

main.dart
  

void main() {
  final dayOfWeek = DateTime.now().weekday;

  switch (dayOfWeek) {
    case DateTime.sunday:
      print("dies Solis");
      break;

    case DateTime.monday:
      print("dies Lunae");
      break;

    case DateTime.tuesday:
      print("dies Martis");
      break;

    case DateTime.wednesday:
      print("dies Mercurii");
      break;

    case DateTime.thursday:
      print("dies Jovis");
      break;

    case DateTime.friday:
      print("dies Veneris");
      break;

    case DateTime.saturday:
      print("dies Saturni");
      break;
  }
}

The example determines the current day of week and prints its Latin equivalent.

switch (dayOfWeek) {
...
}

In the round brackets, the switch keyword takes a value from an expression,
which is going to be tested. The body of the switch keyword is placed inside a
pair or curly brackets. In the body, we can place multiple case options. Each
option is ended with the break keyword.

case DateTime.sunday:
  print("dies Solis");
  break;

With the case statement, we test the value of the matching
expression. If it is equal to DateTime.sunday, we print the Latin
dies Solis.

$ dart main.dart
dies Veneris

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

In the code example, we calculate the sum of values from a range of
numbers.

The while loop has three parts. Initialization,
testing and updating. Each execution of the statement is called a cycle.

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

In the first phase, we initiate the counter i to zero. This phase
is done only once. Next comes the condition i &lt; 10. If the
condition is met, the statement inside the for block is executed. 

In the third phase the counter is increased. Now we repeat the 2, 3 phases until
the condition is not met and the for loop is left. In our case, when the counter
i is equal to 10, the for loop stops executing.

## Dart for in loop

The for/in form enables us to loop over an iterable easily. 
It is similar to the forEach function.

main.dart
  

void main() {
  final words = ['sky', 'load', 'cup', 'tea', 'rock', 'plate'];

  for (final word in words) {
    print(word);
  }
}

In the example, we define a list of words. With for/in we loop 
over the list and print all words.

$ dart main.dart
sky
load
cup
tea
rock
plate

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

## Source

[Dart loops](https://dart.dev/language/loops)

In this article we have covered control flow in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).