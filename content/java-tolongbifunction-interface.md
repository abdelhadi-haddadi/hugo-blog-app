+++
title = "Java ToLongBiFunction Interface"
date = 2025-08-29T19:58:57.600+01:00
draft = false
description = "Complete Java ToLongBiFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ToLongBiFunction Interface

Last modified: April 16, 2025

 

The java.util.function.ToLongBiFunction interface represents a
function that accepts two arguments and produces a long-valued result. It is a
functional interface with a single abstract method applyAsLong.

ToLongBiFunction is part of Java's functional programming utilities
added in Java 8. It specializes in primitive long return values to avoid boxing
overhead. The interface is commonly used in stream operations and data processing.

## ToLongBiFunction Interface Overview

ToLongBiFunction interface contains one abstract method that takes
two arguments and returns a long. It is parameterized with two generic types for
the input parameters.

@FunctionalInterface
public interface ToLongBiFunction&lt;T, U&gt; {
    long applyAsLong(T t, U u);
}

The code above shows the structure of ToLongBiFunction interface.
It uses generics where T and U are input types. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic ToLongBiFunction Usage

The simplest way to use ToLongBiFunction is with lambda expressions. We define
how to process two inputs to produce a long result. This example calculates
product of two integers.

Main.java
  

package com.zetcode;

import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Define a function that multiplies two integers
        ToLongBiFunction&lt;Integer, Integer&gt; multiplier = (a, b) -&gt; a * b;
        
        // Apply the function
        long result1 = multiplier.applyAsLong(5, 7);
        long result2 = multiplier.applyAsLong(10, 20);
        
        System.out.println("5 * 7 = " + result1);
        System.out.println("10 * 20 = " + result2);
    }
}

This example demonstrates basic ToLongBiFunction usage with lambda expression.
The multiplier function takes two Integers and returns their product as long.
We apply it to different number pairs and print the results.

## String Length Calculation

ToLongBiFunction can process different input types. This example calculates total
length of two strings combined. It shows how to work with non-numeric inputs.

Main.java
  

package com.zetcode;

import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Function to calculate combined length of two strings
        ToLongBiFunction&lt;String, String&gt; lengthSum = 
            (s1, s2) -&gt; s1.length() + s2.length();
        
        System.out.println("Total length: " + 
            lengthSum.applyAsLong("hello", "world"));
        System.out.println("Total length: " + 
            lengthSum.applyAsLong("java", "programming"));
    }
}

This example shows ToLongBiFunction working with String inputs. The lengthSum
function calculates the combined length of two strings. The result is returned
as primitive long to avoid Integer boxing.

## Date Difference Calculation

ToLongBiFunction is useful for temporal calculations. This example computes days
between two LocalDate objects. It demonstrates working with complex input types.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Function to calculate days between two dates
        ToLongBiFunction&lt;LocalDate, LocalDate&gt; daysBetween = 
            (d1, d2) -&gt; ChronoUnit.DAYS.between(d1, d2);
        
        LocalDate date1 = LocalDate.of(2023, 1, 1);
        LocalDate date2 = LocalDate.of(2023, 12, 31);
        
        System.out.println("Days between: " + 
            daysBetween.applyAsLong(date1, date2));
    }
}

This example demonstrates date calculations with ToLongBiFunction. The daysBetween
function uses Java's ChronoUnit to compute days between dates. The result is a
primitive long representing the temporal difference.

## Working with Collections

ToLongBiFunction can process collection elements. This example counts total
elements in two collections. It shows integration with Java collections framework.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collection;
import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Function to sum sizes of two collections
        ToLongBiFunction&lt;Collection&lt;?&gt;, Collection&lt;?&gt;&gt; totalElements = 
            (c1, c2) -&gt; c1.size() + c2.size();
        
        Collection&lt;String&gt; list1 = Arrays.asList("a", "b", "c");
        Collection&lt;Integer&gt; list2 = Arrays.asList(1, 2, 3, 4);
        
        System.out.println("Total elements: " + 
            totalElements.applyAsLong(list1, list2));
    }
}

This example shows ToLongBiFunction working with generic collections. The
totalElements function calculates combined size of two collections. The wildcard
type parameters make it work with any collection type.

## Primitive Specialization

ToLongBiFunction has primitive specializations for better performance. This
example demonstrates calculating distance between 2D points using primitive
coordinates.

Main.java
  

package com.zetcode;

import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Function to calculate squared distance between points
        ToLongBiFunction&lt;Double, Double&gt; distanceSquared = 
            (x, y) -&gt; (long) (x * x + y * y);
        
        double x = 3.0;
        double y = 4.0;
        
        System.out.println("Squared distance: " + 
            distanceSquared.applyAsLong(x, y));
    }
}

This example shows ToLongBiFunction working with primitive double inputs. The
distanceSquared function calculates x² + y² as a long. Using primitives avoids
boxing overhead for better performance.

## Combining with Other Functional Interfaces

ToLongBiFunction can be combined with other functional interfaces. This example
shows filtering before applying the function. It demonstrates functional composition.

Main.java
  

package com.zetcode;

import java.util.function.BiPredicate;
import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Predicate to check if both numbers are positive
        BiPredicate&lt;Integer, Integer&gt; bothPositive = 
            (a, b) -&gt; a &gt; 0 &amp;&amp; b &gt; 0;
        
        // Function to multiply only positive numbers
        ToLongBiFunction&lt;Integer, Integer&gt; safeMultiply = 
            (a, b) -&gt; bothPositive.test(a, b) ? a * b : 0L;
        
        System.out.println("Result: " + safeMultiply.applyAsLong(5, 4));
        System.out.println("Result: " + safeMultiply.applyAsLong(-2, 10));
    }
}

This example combines ToLongBiFunction with BiPredicate. The safeMultiply
function only performs multiplication when both inputs are positive. Otherwise,
it returns 0. This shows conditional logic in functional programming.

## Using with Streams

ToLongBiFunction works well with Java Streams. This example processes pairs of
numbers from parallel streams. It demonstrates functional programming patterns.

Main.java
  

package com.zetcode;

import java.util.stream.IntStream;
import java.util.function.ToLongBiFunction;

public class Main {

    public static void main(String[] args) {

        // Function to calculate a^2 + b^2
        ToLongBiFunction&lt;Integer, Integer&gt; sumOfSquares = 
            (a, b) -&gt; a*a + b*b;
        
        IntStream.range(1, 5)
            .forEach(i -&gt; {
                long result = sumOfSquares.applyAsLong(i, i+1);
                System.out.println(i + "² + " + (i+1) + "² = " + result);
            });
    }
}

This example shows ToLongBiFunction in a stream pipeline. The sumOfSquares
function calculates a² + b² for sequential number pairs. The stream generates
the input values and prints the results.

## Source

[Java ToLongBiFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ToLongBiFunction.html)

In this article, we've covered the essential methods and features of the Java
ToLongBiFunction interface. Understanding these concepts is crucial for efficient
functional programming with primitive long results in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).