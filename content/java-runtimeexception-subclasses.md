+++
title = "Java RuntimeException subclasses"
date = 2025-08-29T20:00:27.823+01:00
draft = false
description = "Java RuntimeException tutorial explains runtime exceptions in Java, their characteristics, common types, and how to handle them effectively in your applications."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java RuntimeException subclasses

last modified April 2, 2025

 

RuntimeException is a subclass of Exception that represents exceptions which
can occur during the normal operation of the Java Virtual Machine. Unlike checked
exceptions, RuntimeExceptions don't need to be declared in method signatures.

RuntimeExceptions typically indicate programming errors such as logic mistakes
or improper use of APIs. They are unchecked exceptions, meaning the compiler
doesn't enforce handling or declaring them. Common examples include
NullPointerException and ArrayIndexOutOfBoundsException.

In this tutorial, we'll explore various RuntimeExceptions through practical
examples, understand their causes, and learn how to handle them effectively.

## NullPointerException

NullPointerException occurs when you try to access or modify an object reference
that has the null value. This is one of the most common RuntimeExceptions in Java.

Main.java
  

void main() {

    String text = null;
    try {
        System.out.println(text.length());
    } catch (NullPointerException e) {
        System.out.println("Caught NullPointerException: " + e.getMessage());
    }
}

In this example, we attempt to call length() on a null String reference. This
throws a NullPointerException which we catch and handle. Always check for null
before accessing object members to prevent this exception.

## ArrayIndexOutOfBoundsException

ArrayIndexOutOfBoundsException is thrown when trying to access an array element
with an illegal index, either negative or beyond the array size.

Main.java
  

void main() {

    int[] numbers = {1, 2, 3};

    try {
        System.out.println(numbers[3]);
    } catch (ArrayIndexOutOfBoundsException e) {
        System.out.println("Invalid array index: " + e.getMessage());
    }
}

Here we try to access index 3 of an array that only has 3 elements (indices 0-2).
The exception is caught and handled. Always validate array indices before access.

## ClassCastException

ClassCastException occurs when attempting to cast an object to a subclass of
which it is not an instance. This is a common issue when working with inheritance.

Main.java
  

void main() {
    Object obj = "Hello";
    try {
        Integer num = (Integer) obj;
    } catch (ClassCastException e) {
        System.out.println("Failed to cast: " + e.getMessage());
    }
}

We attempt to cast a String to an Integer, which throws ClassCastException. Use
instanceof to check types before casting to prevent this runtime exception.

## IllegalArgumentException

IllegalArgumentException is thrown when a method receives an argument that is
invalid or inappropriate for its purpose. It's often used to validate parameters.

Main.java
  

void main() {

    try {
        setAge(-5);
    } catch (IllegalArgumentException e) {
        System.out.println("Invalid age: " + e.getMessage());
    }
}

void setAge(int age) {
    if (age &lt; 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    // Set age logic
}

The setAge method throws IllegalArgumentException for negative ages. This is a
good practice for parameter validation in public methods.

## NumberFormatException

NumberFormatException occurs when attempting to convert a string to a numeric
type but the string doesn't have the appropriate format.

Main.java
  

void main() {

    try {
        int num = Integer.parseInt("123abc");
    } catch (NumberFormatException e) {
        System.out.println("Invalid number format: " + e.getMessage());
    }
}

We try to parse a non-numeric string as an integer, causing NumberFormatException.
Always validate string formats before numeric conversion attempts.

## UnsupportedOperationException

UnsupportedOperationException signals that the requested operation is not
supported. It's commonly used in immutable collections or unimplemented methods.

Main.java
  

void main() {
    List&lt;String&gt; immutableList = List.of("a", "b", "c");

    try {
        immutableList.add("d");
    } catch (UnsupportedOperationException e) {
        System.out.println("Operation not supported: " + e.getMessage());
    }
}

The List.of creates an immutable list. Attempting to add an element throws
UnsupportedOperationException. Check collection mutability before
modification.

## ArithmeticException

ArithmeticException is thrown when an exceptional arithmetic condition occurs,
such as division by zero or integer overflow.

Main.java
  

void main() {
    
    try {
        int result = 10 / 0;
    } catch (ArithmeticException e) {
        System.out.println("Arithmetic error: " + e.getMessage());
    }
}

Dividing by zero throws ArithmeticException. Always validate denominators before
division operations to prevent this runtime error.

## Source

[Java RuntimeException Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html)

In this article we explored various RuntimeExceptions in Java, their causes, and
how to handle them. Understanding these exceptions helps write more robust code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).