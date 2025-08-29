+++
title = "Java ToDoubleFunction Interface"
date = 2025-08-29T19:58:56.519+01:00
draft = false
description = "Complete Java ToDoubleFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ToDoubleFunction Interface

Last modified: April 16, 2025

 

The java.util.function.ToDoubleFunction interface represents a function
that accepts one argument and produces a double-valued result. It is a functional
interface with a single abstract method applyAsDouble.

ToDoubleFunction is part of Java's functional programming utilities
added in Java 8. It is specialized to avoid boxing when working with primitive
double values. This improves performance in numeric operations.

## ToDoubleFunction Interface Overview

ToDoubleFunction interface contains one abstract method that must
be implemented. The method takes an object of type T and returns a primitive
double value. There are no default methods in this interface.

@FunctionalInterface
public interface ToDoubleFunction&lt;T&gt; {
    double applyAsDouble(T value);
}

The code above shows the simple structure of ToDoubleFunction. It
uses generics where T is the input type. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic ToDoubleFunction Usage

The simplest way to use ToDoubleFunction is with lambda expressions. We define
how to convert the input to a double value. This example calculates string lengths.

Main.java
  

package com.zetcode;

import java.util.function.ToDoubleFunction;

public class Main {

    public static void main(String[] args) {

        // Define function that returns string length as double
        ToDoubleFunction&lt;String&gt; lengthFunction = s -&gt; (double) s.length();
        
        // Apply the function
        System.out.println("Length of 'hello': " + lengthFunction.applyAsDouble("hello"));
        System.out.println("Length of 'functional': " + lengthFunction.applyAsDouble("functional"));
        
        // Using method reference
        ToDoubleFunction&lt;String&gt; lengthMethodRef = String::length;
        System.out.println("Length via method ref: " + lengthMethodRef.applyAsDouble("method"));
    }
}

This example demonstrates basic ToDoubleFunction usage with lambda and method
reference. The function takes String and returns its length as double. We apply
it to different strings. Method reference provides concise syntax.

## ToDoubleFunction with Custom Objects

ToDoubleFunction works well with custom objects. We can extract numeric properties
from objects. This example calculates product prices after tax.

Main.java
  

package com.zetcode;

import java.util.function.ToDoubleFunction;

class Product {
    String name;
    double price;
    
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class Main {

    public static void main(String[] args) {

        // Function to calculate price with 20% tax
        ToDoubleFunction&lt;Product&gt; priceWithTax = p -&gt; p.price * 1.20;
        
        Product laptop = new Product("Laptop", 999.99);
        Product phone = new Product("Phone", 599.99);
        
        System.out.println("Laptop with tax: " + priceWithTax.applyAsDouble(laptop));
        System.out.println("Phone with tax: " + priceWithTax.applyAsDouble(phone));
    }
}

This example shows ToDoubleFunction with custom Product objects. The function
calculates the final price including tax. We apply it to different product
instances. The result is always a primitive double.

## ToDoubleFunction in Stream Operations

ToDoubleFunction is commonly used with Java Streams for numeric transformations.
The mapToDouble operation accepts a ToDoubleFunction. This enables efficient
numeric processing.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; words = Arrays.asList("apple", "banana", "cherry", "date");
        
        // Calculate average word length
        double avgLength = words.stream()
            .mapToDouble(String::length)  // ToDoubleFunction as method reference
            .average()
            .orElse(0);
            
        System.out.println("Average word length: " + avgLength);
        
        // Sum of squares of lengths
        double sumSquares = words.stream()
            .mapToDouble(s -&gt; Math.pow(s.length(), 2))  // Lambda as ToDoubleFunction
            .sum();
            
        System.out.println("Sum of squares: " + sumSquares);
    }
}

This example demonstrates ToDoubleFunction in Streams. We use method reference
and lambda to transform strings to numeric values. The stream operations work
with primitive doubles for better performance.

## ToDoubleFunction with Collections

ToDoubleFunction can be used with collection operations that require numeric
transformations. This example shows statistics calculation on a collection.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.function.ToDoubleFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = Arrays.asList(10, 20, 30, 40, 50);
        
        // Convert integers to their square roots
        ToDoubleFunction&lt;Integer&gt; sqrtFunction = n -&gt; Math.sqrt(n);
        
        DoubleSummaryStatistics stats = numbers.stream()
            .mapToDouble(sqrtFunction)
            .summaryStatistics();
            
        System.out.println("Count: " + stats.getCount());
        System.out.println("Average: " + stats.getAverage());
        System.out.println("Max: " + stats.getMax());
        System.out.println("Min: " + stats.getMin());
        System.out.println("Sum: " + stats.getSum());
    }
}

This example uses ToDoubleFunction to calculate square roots of integers. We
then generate statistics from the results. The function enables clean numeric
transformations before statistical operations.

## ToDoubleFunction with Arrays

Arrays can be processed efficiently using ToDoubleFunction. This example shows
array transformation and reduction operations.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.ToDoubleFunction;

public class Main {

    public static void main(String[] args) {

        String[] temperatures = {"23.5", "18.2", "31.7", "25.0", "19.8"};
        
        // Parse strings to doubles
        ToDoubleFunction&lt;String&gt; parseDouble = s -&gt; Double.parseDouble(s);
        
        double[] values = Arrays.stream(temperatures)
            .mapToDouble(parseDouble)
            .toArray();
            
        System.out.println("Parsed values: " + Arrays.toString(values));
        
        // Find maximum temperature
        double max = Arrays.stream(temperatures)
            .mapToDouble(Double::parseDouble)  // Method reference alternative
            .max()
            .orElse(Double.NaN);
            
        System.out.println("Maximum temperature: " + max);
    }
}

This example processes an array of temperature strings. We use ToDoubleFunction
to parse strings to doubles. The results are collected in an array and used for
finding the maximum value. Both lambda and method reference forms are shown.

## Combining ToDoubleFunction with Other Functional Interfaces

ToDoubleFunction can be combined with other functional interfaces for more
complex operations. This example shows filtering before conversion.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.ToDoubleFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; mixedValues = Arrays.asList("12.5", "invalid", "45.2", "0", "3.14");
        
        Predicate&lt;String&gt; isNumeric = s -&gt; {
            try {
                Double.parseDouble(s);
                return true;
            } catch (NumberFormatException e) {
                return false;
            }
        };
        
        ToDoubleFunction&lt;String&gt; parseSafe = s -&gt; {
            try {
                return Double.parseDouble(s);
            } catch (NumberFormatException e) {
                return 0.0;
            }
        };
        
        // Filter valid numbers and parse them
        double sum = mixedValues.stream()
            .filter(isNumeric)
            .mapToDouble(parseSafe)
            .sum();
            
        System.out.println("Sum of valid numbers: " + sum);
        
        // Alternative with handling in ToDoubleFunction
        double sumAlt = mixedValues.stream()
            .mapToDouble(parseSafe)
            .sum();
            
        System.out.println("Sum with default handling: " + sumAlt);
    }
}

This example combines Predicate and ToDoubleFunction to safely process mixed
input. We filter valid numbers first, then parse them. An alternative approach
handles invalid values within the ToDoubleFunction itself.

## Primitive Specializations Comparison

Java provides several primitive-specialized functional interfaces. This example
compares ToDoubleFunction with similar interfaces for different primitives.

Main.java
  

package com.zetcode;

import java.util.function.ToIntFunction;
import java.util.function.ToLongFunction;
import java.util.function.ToDoubleFunction;

public class Main {

    public static void main(String[] args) {

        // Different primitive specialized functions
        ToIntFunction&lt;String&gt; toLengthInt = String::length;
        ToLongFunction&lt;String&gt; toLengthLong = s -&gt; (long) s.length();
        ToDoubleFunction&lt;String&gt; toLengthDouble = s -&gt; (double) s.length();
        
        System.out.println("As int: " + toLengthInt.applyAsInt("hello"));
        System.out.println("As long: " + toLengthLong.applyAsLong("world"));
        System.out.println("As double: " + toLengthDouble.applyAsDouble("java"));
        
        // When precision matters
        ToDoubleFunction&lt;Double&gt; circleArea = r -&gt; Math.PI * r * r;
        System.out.println("Area of circle with r=2.5: " + circleArea.applyAsDouble(2.5));
    }
}

This example compares ToDoubleFunction with ToIntFunction and ToLongFunction.
Each specializes for a different primitive return type. ToDoubleFunction is
ideal when fractional precision is needed, like in geometric calculations.

## Source

[Java ToDoubleFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ToDoubleFunction.html)

In this article, we've covered the essential usage patterns of the Java
ToDoubleFunction interface. This specialized functional interface is valuable
for efficient numeric processing in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).