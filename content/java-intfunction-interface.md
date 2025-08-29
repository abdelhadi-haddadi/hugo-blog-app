+++
title = "Java IntFunction Interface"
date = 2025-08-29T19:58:50.979+01:00
draft = false
description = "Complete Java IntFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IntFunction Interface

Last modified: April 16, 2025

 

The java.util.function.IntFunction interface represents a function
that accepts an int-valued argument and produces a result. It is a functional
interface with a single abstract method apply. IntFunction is
specialized for primitive int inputs to avoid boxing overhead.

IntFunction is part of Java's functional programming utilities
added in Java 8. It enables behavior parameterization with primitive int values.
The interface is useful when working with numerical operations and streams.

## IntFunction Interface Overview

IntFunction interface contains one abstract method that takes an
int and returns a result of specified type. Unlike regular Function, it avoids
boxing primitive int values to Integer objects.

@FunctionalInterface
public interface IntFunction&lt;R&gt; {
    R apply(int value);
}

The code above shows the structure of IntFunction interface. It
uses generics where R is the result type. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic IntFunction Usage

The simplest way to use IntFunction is with lambda expressions. We define how to
transform an int input to the desired output type. The example converts ints to
their string representations.

Main.java
  

package com.zetcode;

import java.util.function.IntFunction;

public class Main {

    public static void main(String[] args) {

        // Define a function that takes int and returns String
        IntFunction&lt;String&gt; intToString = i -&gt; "Number: " + i;
        
        // Apply the function
        System.out.println(intToString.apply(5));
        System.out.println(intToString.apply(42));
        
        // Function using static method reference
        IntFunction&lt;String&gt; valueOf = String::valueOf;
        System.out.println("String value: " + valueOf.apply(123));
    }
}

This example demonstrates basic IntFunction usage with lambda and method
reference. The intToString function takes an int and returns a formatted
String. We apply it to different integer values. Method reference provides
concise syntax for existing methods.

## IntFunction with Arrays

IntFunction is commonly used with array operations, particularly when creating
arrays of generic types. The example shows how to create arrays of different
types using IntFunction.

Main.java
  

package com.zetcode;

import java.util.function.IntFunction;

public class Main {

    public static void main(String[] args) {

        // Function to create String array of given size
        IntFunction&lt;String[]&gt; stringArrayGenerator = String[]::new;
        
        // Function to create Integer array of given size
        IntFunction&lt;Integer[]&gt; integerArrayGenerator = Integer[]::new;
        
        // Generate arrays
        String[] strings = stringArrayGenerator.apply(3);
        Integer[] integers = integerArrayGenerator.apply(5);
        
        System.out.println("String array length: " + strings.length);
        System.out.println("Integer array length: " + integers.length);
    }
}

This example shows IntFunction usage for array creation. The array generator
functions take an int size parameter and return new arrays of specified type.
This pattern is often used in stream operations that produce arrays.

## IntFunction in Stream Operations

IntFunction works well with IntStream and other stream operations that process
primitive int values. The example demonstrates mapping int values to objects.

Main.java
  

package com.zetcode;

import java.util.stream.IntStream;
import java.util.function.IntFunction;

public class Main {

    public static void main(String[] args) {

        // Function to create squares as Strings
        IntFunction&lt;String&gt; squareToString = i -&gt; i + " squared is " + (i*i);
        
        // Apply function in IntStream
        IntStream.rangeClosed(1, 5)
            .mapToObj(squareToString)
            .forEach(System.out::println);
            
        // Function to convert to wrapper objects
        IntFunction&lt;Integer&gt; toInteger = Integer::valueOf;
        System.out.println("Converted value: " + toInteger.apply(7));
    }
}

This example shows IntFunction usage with streams. We create a function that
formats squares of numbers, then apply it to a range of ints using mapToObj.
The second function demonstrates converting primitive int to Integer objects.

## IntFunction with Collections

IntFunction can be used to generate collection elements based on int input. The
example shows creating lists with elements determined by their indices.

Main.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;
import java.util.function.IntFunction;

public class Main {

    public static void main(String[] args) {

        // Function to create list items based on index
        IntFunction&lt;String&gt; itemGenerator = i -&gt; "Item-" + (i + 1);
        
        // Generate a list of 5 items
        List&lt;String&gt; items = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; 5; i++) {
            items.add(itemGenerator.apply(i));
        }
        
        System.out.println("Generated items: " + items);
        
        // Function to create numbered objects
        IntFunction&lt;Number&gt; numberCreator = i -&gt; i % 2 == 0 ? i : i * 1.5;
        System.out.println("Number 3: " + numberCreator.apply(3));
    }
}

This example demonstrates using IntFunction to generate collection elements. The
itemGenerator creates strings based on index values. The numberCreator shows
returning different Number subtypes based on input conditions.

## Combining IntFunction with Other Functional Interfaces

IntFunction can be combined with other functional interfaces to create more
complex operations. The example shows using IntFunction with Predicate.

Main.java
  

package com.zetcode;

import java.util.function.IntFunction;
import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Predicate to check if number is even
        IntPredicate isEven = i -&gt; i % 2 == 0;
        
        // Function to describe number properties
        IntFunction&lt;String&gt; numberDescriber = i -&gt; 
            i + " is " + (isEven.test(i) ? "even" : "odd");
        
        // Apply the combined functions
        System.out.println(numberDescriber.apply(4));
        System.out.println(numberDescriber.apply(7));
        
        // Function chain with method reference
        IntFunction&lt;String&gt; hexConverter = Integer::toHexString;
        System.out.println("Hex of 255: " + hexConverter.apply(255));
    }
}

This example shows combining IntFunction with IntPredicate. The numberDescriber
uses both the input value and predicate test result to create its output. The
hexConverter demonstrates using method references for common conversions.

## IntFunction for Object Creation

IntFunction can be used as a factory to create objects where the constructor
takes an int parameter. The example demonstrates creating geometric shapes.

Main.java
  

package com.zetcode;

import java.util.function.IntFunction;

class Circle {
    private int radius;
    
    public Circle(int radius) {
        this.radius = radius;
    }
    
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

public class Main {

    public static void main(String[] args) {

        // Function to create Circle objects
        IntFunction&lt;Circle&gt; circleFactory = Circle::new;
        
        // Create circles of different sizes
        Circle small = circleFactory.apply(5);
        Circle large = circleFactory.apply(15);
        
        System.out.printf("Small circle area: %.2f%n", small.getArea());
        System.out.printf("Large circle area: %.2f%n", large.getArea());
        
        // Function to create formatted strings
        IntFunction&lt;String&gt; formattedArea = r -&gt; 
            String.format("Radius %d → Area %.2f", r, new Circle(r).getArea());
            
        System.out.println(formattedArea.apply(10));
    }
}

This example demonstrates using IntFunction as an object factory. The
circleFactory creates Circle instances with specified radii. The formattedArea
function shows combining object creation and formatting in one operation.

## Specialized IntFunction Variants

Java provides specialized variants of IntFunction for different primitive return
types. These include IntToDoubleFunction, IntToLongFunction, and IntUnaryOperator.

Main.java
  

package com.zetcode;

import java.util.function.IntToDoubleFunction;
import java.util.function.IntToLongFunction;
import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Convert int to double
        IntToDoubleFunction toCelsius = fahr -&gt; (fahr - 32) * 5.0 / 9;
        System.out.printf("70°F = %.1f°C%n", toCelsius.applyAsDouble(70));
        
        // Convert int to long
        IntToLongFunction factorial = n -&gt; {
            long result = 1;
            for (int i = 2; i &lt;= n; i++) {
                result *= i;
            }
            return result;
        };
        System.out.println("5! = " + factorial.applyAsLong(5));
        
        // IntUnaryOperator (int → int)
        IntUnaryOperator square = x -&gt; x * x;
        System.out.println("7 squared: " + square.applyAsInt(7));
    }
}

This example shows specialized IntFunction variants. IntToDoubleFunction avoids
boxing when returning doubles, IntToLongFunction for longs, and IntUnaryOperator
for int-to-int operations. These provide better performance for primitive ops.

## Source

[Java IntFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/IntFunction.html)

In this article, we've covered the essential methods and features of the Java
IntFunction interface. Understanding these concepts is crucial for efficient
numerical processing and functional programming with primitive types in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).