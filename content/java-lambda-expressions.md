+++
title = "Java Lambda Expressions"
date = 2025-08-29T19:59:44.709+01:00
draft = false
description = "This comprehensive Java lambda expressions tutorial demonstrates how to effectively use lambda expressions to write concise and expressive code in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Lambda Expressions

Last modified April 17, 2025

Lambda expressions, introduced in Java 8, are a cornerstone of functional
programming in Java. They allow developers to write concise, expressive code by
providing inline implementations of functional interfaces. This tutorial
explores their syntax, use cases, and practical applications.

This tutorial explores Java lambda expressions, a powerful feature introduced in
Java 8 that enables concise and expressive functional programming. Lambda
expressions simplify the implementation of functional interfaces and streamline
operations such as sorting, filtering, and mapping data.

The basic syntax for a lambda expression in Java is as follows:

(parameters) -&gt; expression
(parameters) -&gt; { statements; }

Lambda expressions enhance code readability and brevity, allowing developers to
write more maintainable and efficient Java applications.

Parameter type declarations are optional; the Java compiler can infer types from
the context. Parentheses are optional for a single parameter but required for
multiple parameters or none. Curly braces are optional for a single-statement
body, and the return keyword is unnecessary if the body consists of
a single expression that returns a value. However, curly braces are required
when explicitly returning a value with multiple statements.

## Sorting an Array

Sorting arrays is a common task in programming, and lambda expressions make it
easier by providing a concise way to define comparison logic. The following
example demonstrates sorting an array of strings alphabetically using a lambda
expression.

com/zetcode/LambdaSortEx.java
  

package com.zetcode;

import java.util.Arrays;

public class LambdaSortEx {

    public static void main(String[] args) {

        String[] words = { "kind", "massive", "atom", "car", "blue" };

        Arrays.sort(words, (s1, s2) -&gt; s1.compareTo(s2));

        System.out.println(Arrays.toString(words));
    }
}

This example demonstrates sorting an array of strings using the
Arrays.sort method with a lambda expression. The lambda expression
(s1, s2) -&gt; s1.compareTo(s2) defines the comparison logic,
resulting in an alphabetically sorted array.

$ java com/zetcode/LambdaSortEx.java
[atom, blue, car, kind, massive]

## Functional Interfaces and Lambda Expressions

Functional interfaces, which contain a single abstract method, are the
foundation for lambda expressions in Java. Lambda expressions provide a compact
way to implement these interfaces, enabling flexible and reusable code
structures.

## Implementing a Greeting Service

Creating custom functional interfaces allows developers to define specific
behaviors. This example shows how to use a lambda expression to implement a
simple greeting service that outputs messages to the console.

com/zetcode/LambdaGreetingEx.java
  

package com.zetcode;

interface GreetingService {
    void greet(String message);
}

public class LambdaGreetingEx {

    public static void main(String[] args) {

        GreetingService gs = msg -&gt; System.out.println(msg);

        gs.greet("Good night");
        gs.greet("Hello there");
    }
}

In this example, a GreetingService functional interface is defined
with a single greet method. A lambda expression implements this
interface, printing messages to the console when the greet method
is invoked.

$ java com/zetcode/LambdaGreetingEx.java
Good night
Hello there

## Common Functional Interfaces

The java.util.function package provides a set of built-in
functional interfaces, such as Function, Consumer,
Supplier, and Predicate. These interfaces support
common functional programming patterns, making lambda expressions even more
versatile.

## Using the Function Interface

The Function interface is ideal for operations that take an input
and produce an output. This example uses a lambda expression to define a
function that computes the square of an integer.

com/zetcode/LambdaFunctionEx.java
  

package com.zetcode;

import java.util.function.Function;

public class LambdaFunctionEx {

    public static void main(String[] args) {

        Function square = x -&gt; x * x;
        System.out.println(square.apply(5));
    }
}

This example uses the Function interface to define a lambda
expression that computes the square of an integer. The apply method
executes the lambda, returning the result.

$ java com/zetcode/LambdaFunctionEx.java
25

## Filtering Data with Streams

Java streams, combined with lambda expressions, provide a powerful way to
process collections of data. This example demonstrates filtering a list of
objects based on a condition defined by a lambda expression.

com/zetcode/LambdaFilterEx.java
  

package com.zetcode;

import java.util.List;
import java.util.stream.Collectors;

public class LambdaFilterEx {

    public static void main(String[] args) {

        List&lt;User&gt; persons = List.of(
                new User("Jack", "jack234@gmail.com"),
                new User("Peter", "pete2@post.com"),
                new User("Lucy", "lucy17@gmail.com"),
                new User("Robert", "bob56@post.com"),
                new User("Martin", "mato4@imail.com")
        );

        List&lt;User&gt; result = persons.stream()
                .filter(person -&gt; person.email().matches(".*post\\.com"))
                .collect(Collectors.toList());

        result.forEach(p -&gt; System.out.println(p.name()));
    }
}

record User(String name, String email) {}

This example uses a lambda expression within a stream to filter
User objects based on their email domain. The lambda expression in
the filter method selects users with emails ending in "post.com",
and another lambda in forEach prints their names.

$ java com/zetcode/LambdaFilterEx.java
Peter
Robert

## Mapping Data with Streams

The map method in Java streams allows developers to transform data
using lambda expressions. This example shows how to convert a list of strings
into a list of their lengths.

com/zetcode/LambdaMapEx.java
  

package com.zetcode;

import java.util.List;
import java.util.stream.Collectors;

public class LambdaMapEx {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of("apple", "banana", "cherry");

        List&lt;Integer&gt; lengths = words.stream()
                .map(word -&gt; word.length())
                .collect(Collectors.toList());

        System.out.println(lengths);
    }
}

This example demonstrates the use of a lambda expression with the
map method to transform a list of strings into a list of their
lengths. The lambda word -&gt; word.length() computes the length of
each word.

$ java com/zetcode/LambdaMapEx.java
[5, 6, 6]

## Using Consumer Interface

The Consumer interface is used for operations that take an input
and produce no output, such as printing or modifying data. This example uses a
lambda expression to print strings in uppercase.

com/zetcode/LambdaConsumerEx.java
  

package com.zetcode;

import java.util.function.Consumer;

public class LambdaConsumerEx {

    public static void main(String[] args) {

        Consumer&lt;String&gt; printUpperCase = text -&gt; System.out.println(text.toUpperCase());

        printUpperCase.accept("hello");
        printUpperCase.accept("java lambda");
    }
}

This example uses the Consumer interface to define a lambda
expression that converts a string to uppercase and prints it. The
accept method triggers the lambda's execution.

$ java com/zetcode/LambdaConsumerEx.java
HELLO
JAVA LAMBDA

## Using Supplier Interface

The Supplier interface is used to generate values without taking
any input. This example demonstrates a lambda expression that produces random
greetings.

com/zetcode/LambdaSupplierEx.java
  

package com.zetcode;

import java.util.function.Supplier;

public class LambdaSupplierEx {

    public static void main(String[] args) {

        Supplier&lt;String&gt; randomGreeting = () -&gt; {
            String[] greetings = {"Hello", "Hi", "Greetings"};
            return greetings[(int) (Math.random() * greetings.length)];
        };

        System.out.println(randomGreeting.get());
        System.out.println(randomGreeting.get());
    }
}

This example uses the Supplier interface to create a lambda
expression that returns a random greeting. The get method retrieves
the value produced by the lambda.

$ java com/zetcode/LambdaSupplierEx.java
Hi
Greetings

## Combining Predicates

The Predicate interface is used for testing conditions. This
example shows how to combine multiple predicates using logical operations to
filter data.

com/zetcode/LambdaPredicateEx.java
  

package com.zetcode;

import java.util.List;
import java.util.function.Predicate;

public class LambdaPredicateEx {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

        Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;
        Predicate&lt;Integer&gt; isGreaterThanFour = n -&gt; n &gt; 4;

        List&lt;Integer&gt; result = numbers.stream()
                .filter(isEven.and(isGreaterThanFour))
                .toList();

        System.out.println(result);
    }
}

This example combines two Predicate lambda expressions to filter a
list of numbers, selecting only even numbers greater than four. The
and method combines the predicates logically.

$ java com/zetcode/LambdaPredicateEx.java
[6, 8]

## Source

For further reading, refer to the official Java documentation on lambda
expressions, which provides detailed insights into their syntax and
applications.

[Java Lambda Expressions Documentation](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)

This tutorial has provided a comprehensive overview of Java lambda expressions,
including their syntax, use with functional interfaces, and practical
applications in sorting, filtering, mapping, and more.

## Author

My name is Jan Bodnar, a dedicated programmer with extensive experience in
software development. Since 2007, I have authored over 1,400 programming
articles and eight e-books. With more than a decade of teaching experience, I am
committed to sharing knowledge and fostering a deeper understanding of
programming concepts.

List [all Java tutorials](/java/).