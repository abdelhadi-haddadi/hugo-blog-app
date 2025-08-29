+++
title = "Java DoubleFunction Interface"
date = 2025-08-29T19:58:47.548+01:00
draft = false
description = "Complete Java DoubleFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DoubleFunction Interface

Last modified: April 16, 2025

 

The java.util.function.DoubleFunction interface represents a function
that accepts a double-valued argument and produces a result. It is a functional
interface with a single abstract method apply. This specialization
avoids boxing overhead when working with primitive doubles.

DoubleFunction is part of Java's functional programming utilities
added in Java 8. It is particularly useful when processing streams of primitive
double values. The interface helps write more efficient and concise code.

## DoubleFunction Interface Overview

DoubleFunction interface contains one abstract method that takes a
double and returns a result of specified type. Unlike regular Function, it works
with primitive doubles for better performance.

@FunctionalInterface
public interface DoubleFunction&lt;R&gt; {
    R apply(double value);
}

The code above shows the simple structure of DoubleFunction. It uses
generics only for the return type R. The input is always primitive double. The
interface is annotated with @FunctionalInterface.

## Basic DoubleFunction Usage

The simplest way to use DoubleFunction is with lambda expressions. We define how
to transform the input double to the desired output type. This example converts
doubles to their string representations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleFunction;

public class Main {

    public static void main(String[] args) {

        // Define a function that takes double and returns String
        DoubleFunction&lt;String&gt; doubleToString = d -&gt; "Value: " + d;
        
        // Apply the function
        System.out.println(doubleToString.apply(3.1415));
        System.out.println(doubleToString.apply(2.71828));
        
        // Function with formatting
        DoubleFunction&lt;String&gt; formatted = d -&gt; String.format("Formatted: %.2f", d);
        System.out.println(formatted.apply(1.23456789));
    }
}

This example demonstrates basic DoubleFunction usage with lambda expressions.
We create two functions that take doubles and return formatted strings. The
second function shows number formatting directly in the lambda.

## DoubleFunction with Method Reference

Method references provide concise syntax for existing methods that match the
DoubleFunction signature. This example uses Double.toString as a method reference.

Main.java
  

package com.zetcode;

import java.util.function.DoubleFunction;

public class Main {

    public static void main(String[] args) {

        // Using method reference to Double.toString()
        DoubleFunction&lt;String&gt; toStringRef = Double::toString;
        
        System.out.println("String value: " + toStringRef.apply(123.456));
        
        // Using constructor reference
        DoubleFunction&lt;Double&gt; doubleConstructor = Double::new;
        Double d = doubleConstructor.apply(42.0);
        System.out.println("Created Double: " + d);
    }
}

This example shows DoubleFunction with method and constructor references. The
first case uses Double.toString() method. The second case demonstrates object
creation via constructor reference.

## DoubleFunction in Stream Processing

DoubleFunction is commonly used with DoubleStream for processing primitive double
values. This avoids boxing overhead compared to using regular Function.

Main.java
  

package com.zetcode;

import java.util.stream.DoubleStream;

public class Main {

    public static void main(String[] args) {

        // Create DoubleStream of values
        DoubleStream stream = DoubleStream.of(1.1, 2.2, 3.3, 4.4, 5.5);
        
        // Process stream with DoubleFunction
        stream.mapToObj(d -&gt; "Number: " + d * 2)
              .forEach(System.out::println);
              
        // Alternative with separate DoubleFunction
        DoubleFunction&lt;String&gt; formatter = d -&gt; String.format("$%.2f", d);
        DoubleStream.of(9.99, 19.95, 29.50)
                   .mapToObj(formatter)
                   .forEach(System.out::println);
    }
}

This example demonstrates DoubleFunction in stream processing. We use both inline
lambda and separate DoubleFunction to transform stream elements. The mapToObj
method accepts DoubleFunction to convert doubles to objects.

## DoubleFunction for Mathematical Operations

DoubleFunction is ideal for mathematical operations that take double inputs. This
example shows various mathematical transformations applied to input values.

Main.java
  

package com.zetcode;

import java.util.function.DoubleFunction;

public class Main {

    public static void main(String[] args) {

        // Square root function
        DoubleFunction&lt;Double&gt; sqrt = Math::sqrt;
        System.out.println("Square root of 16: " + sqrt.apply(16.0));
        
        // Trigonometric function
        DoubleFunction&lt;Double&gt; sinDegrees = d -&gt; Math.sin(Math.toRadians(d));
        System.out.println("Sin of 30 degrees: " + sinDegrees.apply(30.0));
        
        // Custom mathematical operation
        DoubleFunction&lt;String&gt; quadratic = x -&gt; {
            double result = 2*x*x + 3*x + 5;
            return "2x² + 3x + 5 for x=" + x + " is " + result;
        };
        System.out.println(quadratic.apply(2.0));
    }
}

This example shows DoubleFunction for mathematical operations. We use method
references for existing Math methods and define custom operations. The interface
works well with both simple and complex mathematical transformations.

## DoubleFunction with Collections

DoubleFunction can be used to process collections containing double values. This
example demonstrates converting an array of doubles to different representations.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.DoubleFunction;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        double[] values = {1.5, 2.5, 3.5, 4.5, 5.5};
        
        // Convert doubles to temperature strings
        DoubleFunction&lt;String&gt; toFahrenheit = c -&gt; {
            double f = c * 9/5 + 32;
            return String.format("%.1f°C = %.1f°F", c, f);
        };
        
        List&lt;String&gt; temps = Arrays.stream(values)
                                 .mapToObj(toFahrenheit)
                                 .collect(Collectors.toList());
                                 
        temps.forEach(System.out::println);
        
        // Convert to measurement strings
        DoubleFunction&lt;String&gt; toInches = cm -&gt; String.format("%.2f cm = %.2f in", cm, cm / 2.54);
        Arrays.stream(values).mapToObj(toInches).forEach(System.out::println);
    }
}

This example shows DoubleFunction processing arrays of primitive doubles. We
convert Celsius to Fahrenheit and centimeters to inches. The stream processing
with mapToObj is efficient as it avoids boxing individual elements.

## Combining DoubleFunction with Other Functional Interfaces

DoubleFunction can be combined with other functional interfaces for more complex
operations. This example shows composition with Predicate and Consumer.

Main.java
  

package com.zetcode;

import java.util.function.DoubleFunction;
import java.util.function.DoublePredicate;
import java.util.function.DoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // Define predicate to check if value is positive
        DoublePredicate isPositive = d -&gt; d &gt; 0;
        
        // Define function to create description
        DoubleFunction&lt;String&gt; describer = d -&gt; 
            isPositive.test(d) ? "Positive" : "Non-positive";
            
        // Define consumer to print results
        DoubleConsumer printer = d -&gt; 
            System.out.println(d + " is " + describer.apply(d));
            
        // Test values
        printer.accept(3.14);
        printer.accept(-2.5);
        printer.accept(0.0);
        
        // Chain operations
        DoubleFunction&lt;String&gt; complexOp = d -&gt; {
            double abs = Math.abs(d);
            double sqrt = Math.sqrt(abs);
            return String.format("|%.2f| = %.2f, √%.2f = %.2f", 
                                d, abs, abs, sqrt);
        };
        System.out.println(complexOp.apply(-16.0));
    }
}

This example demonstrates combining DoubleFunction with other functional
interfaces. We create a pipeline that checks values, describes them, and prints
results. The complex operation shows how to chain multiple transformations.

## Source

[Java DoubleFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleFunction.html)

In this article, we've covered the essential methods and features of the Java
DoubleFunction interface. Understanding these concepts helps write efficient
numeric processing code in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).