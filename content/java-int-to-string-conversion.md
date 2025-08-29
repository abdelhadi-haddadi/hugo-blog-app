+++
title = "Java int to String conversion"
date = 2025-08-29T19:59:07.339+01:00
draft = false
description = "Java int to String tutorial shows how to convert integers to strings. There are several ways to perform int to String conversion in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java int to String conversion

last modified January 22, 2024

 

In this article we show how to convert integers to strings. There are several
ways to perform int to String conversion in Java. We can use string
concatenation, string formatting, string building, and use built-in conversion
methods.

Integer to String conversion is a type conversion or type casting,
where an entity of integer data type is changed into string one.

In the examples of this tutorial, we build a string message that contains an
integer.

## Using String.format

String.format returns a formatted string using the specified
format string and arguments.

Main.java
  

void main() {

    int numOfApples = 16;
    String msg = String.format("There are %s apples", numOfApples);

    System.out.println(msg);
}

The example uses String.format to do int to String conversion.

## Using string concatenation

When we use the + operator on int and String parameters, the Java
compiler internally performs type conversion. Note that this conversion is
disliked by many Java programmers.

Main.java
  

void main() {

    int numOfApples = 16;

    String msg = "There are " + numOfApples + " apples";

    System.out.println(msg);
}

The example uses string concatenation to do int to String conversion.
Internally, Java compiler uses StringBuilder to do the conversion.

## Java int to String with Integer.toString

Integer.toString converts its argument to signed decimal
representation and returned as a string.

Main.java
  

void main() {

    int numOfApples = 16;
    String msg = "There are " + Integer.toString(numOfApples) + " apples";

    System.out.println(msg);
}

The example uses Integer.toString to do int to String conversion.

## Java int to String with String.valueOf

String.valueOf returns the string representation of the integer
argument. Java compiler internally calls Integer.toString when
String.valueOf is used.

String.valueOf is considered the most readable approach by many.

Main.java
  

void main() {

    int nOfApples = 16;
    String msg = "There are " + String.valueOf(nOfApples) + " apples";

    System.out.println(msg);
}

The example uses String.valueOf to do int to String conversion.

## Using StringBuilder

StringBuilder represents a mutable string of characters. We can use
StringBuilder to construct strings. We can append integers to the
builder as well.

Main.java
  

void main() {

    int numOfApples = 16;

    var msg = new StringBuilder();
    msg.append("There are ").append(numOfApples).append(" apples");

    System.out.println(msg);
}

The code example uses StringBuilder to do int to String conversion.

## Using Scanner

The following example reads an integer from the user with Scanner.
Then a string message is printed to the console, containing the user's input.

Main.java
  

import java.util.Scanner;

void main() {

    System.out.print("Enter number of apples: ");

    try (Scanner scan = new Scanner(System.in)) {

        int numOfApples = scan.nextInt();
        String msg = String.format("There are %d apples", numOfApples);

        System.out.println(msg);
    }
}

We use String.format to do int to String conversion.

try (Scanner scan = new Scanner(System.in)) {

Scanner is a simple text scanner which can parse primitive types
and strings using regular expressions. We use Scanner
to read user's input.

int numOfApples = scan.nextInt();

The nextInt method scans the next token of the input as an int.

String msg = String.format("There are %d apples", numOfApples);

A message is created with String.format. It takes the user's input
as the second parameter.

## Source

[Java tutorials](https://docs.oracle.com/javase/tutorial/)

In this article we have shown how to convert integers to strings in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).