+++
title = "Java ToLongFunction Interface"
date = 2025-08-29T19:58:57.606+01:00
draft = false
description = "Complete Java ToLongFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ToLongFunction Interface

Last modified: April 16, 2025

 

The java.util.function.ToLongFunction interface represents a function
that accepts one argument and produces a long-valued result. It is a functional
interface with a single abstract method applyAsLong. This specialized
function avoids boxing overhead when working with primitive longs.

ToLongFunction is part of Java's functional programming utilities
added in Java 8. It is particularly useful in stream operations where primitive
long values are processed. The interface helps write efficient numeric code.

## ToLongFunction Interface Overview

ToLongFunction interface contains one abstract method that must be
implemented. Unlike regular Function, it returns a primitive long instead of
an object. This provides performance benefits for numeric operations.

@FunctionalInterface
public interface ToLongFunction&lt;T&gt; {
    long applyAsLong(T value);
}

The code above shows the simple structure of ToLongFunction. It uses
generics for the input type T but always returns primitive long. The interface is
annotated with @FunctionalInterface to indicate its single abstract method nature.

## Basic ToLongFunction Usage

The simplest way to use ToLongFunction is with lambda expressions. We define how
to convert input to long in the applyAsLong method. The example converts strings
to their lengths as longs.

Main.java
  

package com.zetcode;

import java.util.function.ToLongFunction;

public class Main {

    public static void main(String[] args) {

        // Define a function that takes String and returns its length as long
        ToLongFunction&lt;String&gt; lengthFunction = s -&gt; s.length();
        
        // Apply the function
        System.out.println("Length of 'hello': " + lengthFunction.applyAsLong("hello"));
        System.out.println("Length of 'functional': " + lengthFunction.applyAsLong("functional"));
        
        // Function using method reference
        ToLongFunction&lt;String&gt; lengthMethodRef = String::length;
        System.out.println("Length via method ref: " + lengthMethodRef.applyAsLong("method"));
    }
}

This example demonstrates basic ToLongFunction usage with lambda and method
reference. The lengthFunction takes String and returns primitive long. We apply
it to different strings. Method reference provides concise syntax for existing
methods.

## ToLongFunction with Custom Objects

ToLongFunction can work with custom objects by extracting long
values from them. This is useful when processing collections of objects in
streams. The example calculates employee salaries as longs.

Main.java
  

package com.zetcode;

import java.util.function.ToLongFunction;

class Employee {
    private String name;
    private long salary;
    
    public Employee(String name, long salary) {
        this.name = name;
        this.salary = salary;
    }
    
    public long getSalary() { return salary; }
}

public class Main {

    public static void main(String[] args) {

        // Function to extract salary from Employee
        ToLongFunction&lt;Employee&gt; salaryExtractor = Employee::getSalary;
        
        Employee emp1 = new Employee("John", 75000L);
        Employee emp2 = new Employee("Sarah", 85000L);
        
        System.out.println("John's salary: " + salaryExtractor.applyAsLong(emp1));
        System.out.println("Sarah's salary: " + salaryExtractor.applyAsLong(emp2));
    }
}

This example shows ToLongFunction working with custom Employee objects. The
salaryExtractor function uses method reference to get salary values. This
pattern is common when processing object collections in numeric operations.

## ToLongFunction in Stream Operations

ToLongFunction is commonly used with Java Streams for numeric
processing. The mapToLong operation accepts a ToLongFunction to transform
stream elements to primitive longs. This enables efficient numeric pipelines.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; words = Arrays.asList("apple", "banana", "cherry", "date");
        
        // Calculate total characters using mapToLong
        long totalChars = words.stream()
            .mapToLong(String::length)
            .sum();
            
        System.out.println("Total characters: " + totalChars);
        
        // Calculate average word length
        double avgLength = words.stream()
            .mapToLong(String::length)
            .average()
            .orElse(0.0);
            
        System.out.println("Average length: " + avgLength);
    }
}

This example demonstrates ToLongFunction in Stream operations. We use method
reference String::length as ToLongFunction. The mapToLong operation creates
a LongStream for efficient numeric processing like sum and average.

## ToLongFunction with Primitive Arrays

ToLongFunction can process primitive arrays efficiently. This is
useful when working with large numeric datasets. The example calculates array
statistics using ToLongFunction.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.ToLongFunction;

public class Main {

    public static void main(String[] args) {

        int[] numbers = {10, 20, 30, 40, 50};
        
        // Function to convert int to long (needed for large numbers)
        ToLongFunction&lt;Integer&gt; intToLong = x -&gt; (long) x;
        
        // Process array using ToLongFunction
        long sum = Arrays.stream(numbers)
            .mapToLong(intToLong)
            .sum();
            
        System.out.println("Sum of array: " + sum);
        
        // Another example: square each number
        long[] squares = Arrays.stream(numbers)
            .mapToLong(x -&gt; (long) x * x)
            .toArray();
            
        System.out.println("Squares: " + Arrays.toString(squares));
    }
}

This example shows ToLongFunction processing primitive arrays. We convert int
values to longs to prevent overflow in calculations. The mapToLong operation
enables efficient numeric transformations on array elements.

## Combining ToLongFunction with Other Functional Interfaces

ToLongFunction can be combined with other functional interfaces
for more complex operations. The example shows filtering before applying
ToLongFunction in a stream pipeline.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.ToLongFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; products = Arrays.asList("Laptop:1200", "Mouse:25", 
            "Keyboard:45", "Monitor:300");
            
        // Predicate to filter expensive products
        Predicate&lt;String&gt; expensive = s -&gt; {
            long price = Long.parseLong(s.split(":")[1]);
            return price &gt; 100;
        };
        
        // ToLongFunction to extract price
        ToLongFunction&lt;String&gt; priceExtractor = s -&gt; 
            Long.parseLong(s.split(":")[1]);
        
        // Calculate total of expensive products
        long total = products.stream()
            .filter(expensive)
            .mapToLong(priceExtractor)
            .sum();
            
        System.out.println("Total expensive products: $" + total);
    }
}

This example combines Predicate with ToLongFunction in a stream pipeline. We
first filter expensive products, then extract prices as longs for summation.
This shows how functional interfaces work together for data processing.

## ToLongFunction vs Function

While similar, ToLongFunction and Function have key
differences. ToLongFunction returns primitive long for better performance with
numeric operations. Function returns an object which requires boxing.

Main.java
  

package com.zetcode;

import java.util.function.Function;
import java.util.function.ToLongFunction;

public class Main {

    public static void main(String[] args) {

        // ToLongFunction - returns primitive long
        ToLongFunction&lt;String&gt; toLongFunc = s -&gt; Long.parseLong(s);
        long primitiveLong = toLongFunc.applyAsLong("123456789012");
        
        // Function - returns Long object
        Function&lt;String, Long&gt; func = s -&gt; Long.parseLong(s);
        Long objectLong = func.apply("123456789012");
        
        System.out.println("ToLongFunction result: " + primitiveLong);
        System.out.println("Function result: " + objectLong);
        
        // Performance comparison
        long start = System.nanoTime();
        for (int i = 0; i &lt; 1_000_000; i++) {
            toLongFunc.applyAsLong("123");
        }
        long toLongTime = System.nanoTime() - start;
        
        start = System.nanoTime();
        for (int i = 0; i &lt; 1_000_000; i++) {
            func.apply("123");
        }
        long funcTime = System.nanoTime() - start;
        
        System.out.println("ToLongFunction time: " + toLongTime);
        System.out.println("Function time: " + funcTime);
    }
}

This example compares ToLongFunction and Function. Both parse strings to longs,
but ToLongFunction avoids boxing overhead. The performance test shows ToLongFunction
is faster for numeric operations due to primitive handling.

## Specialized ToLongFunction Variants

Java provides specialized variants of ToLongFunction for different
input types. These include IntToLongFunction,
DoubleToLongFunction, and others for primitive inputs.

Main.java
  

package com.zetcode;

import java.util.function.DoubleToLongFunction;
import java.util.function.IntToLongFunction;
import java.util.function.LongUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // IntToLongFunction example
        IntToLongFunction square = x -&gt; (long) x * x;
        System.out.println("Square of 5: " + square.applyAsLong(5));
        
        // DoubleToLongFunction example (rounding)
        DoubleToLongFunction rounder = d -&gt; Math.round(d);
        System.out.println("Rounded 3.7: " + rounder.applyAsLong(3.7));
        
        // LongUnaryOperator (special case of ToLongFunction)
        LongUnaryOperator increment = x -&gt; x + 1;
        System.out.println("Incremented 10: " + increment.applyAsLong(10));
    }
}

This example demonstrates specialized ToLongFunction variants. These interfaces
accept primitive inputs directly, avoiding boxing overhead. They are useful for
high-performance numeric processing in Java applications.

## Source

[Java ToLongFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ToLongFunction.html)

In this article, we've covered the essential methods and features of the Java
ToLongFunction interface. Understanding these concepts is crucial for efficient
numeric processing and functional programming in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).