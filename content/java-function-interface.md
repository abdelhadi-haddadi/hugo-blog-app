+++
title = "Java Function Interface"
date = 2025-08-29T19:58:49.778+01:00
draft = false
description = "Complete Java Function interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Function Interface

Last modified: April 16, 2025

 

The java.util.function.Function interface represents a function
that accepts one argument and produces a result. It is a functional interface
with a single abstract method apply. Function is commonly used for
transforming data in stream operations and method references.

Function is part of Java's functional programming utilities added
in Java 8. It enables behavior parameterization and helps write more concise
code. The interface provides default methods for function composition and
chaining.

## Function Interface Overview

Function interface contains one abstract method and several default
methods. The key method apply performs the operation on the input.
Other methods enable function composition and transformation chaining.

@FunctionalInterface
public interface Function&lt;T, R&gt; {
    R apply(T t);
    
    default &lt;V&gt; Function&lt;V, R&gt; compose(Function&lt;? super V, ? extends T&gt; before);
    default &lt;V&gt; Function&lt;T, V&gt; andThen(Function&lt;? super R, ? extends V&gt; after);
    static &lt;T&gt; Function&lt;T, T&gt; identity();
}

The code above shows the structure of Function interface. It uses
generics where T is input type and R is result type. The interface is annotated
with @FunctionalInterface to indicate its single abstract method nature.

## Basic Function Usage

The simplest way to use Function is with lambda expressions. We define how to
transform input to output in the apply method. The example converts strings to
their lengths.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Define a function that takes String and returns its length
        Function&lt;String, Integer&gt; lengthFunction = s -&gt; s.length();
        
        // Apply the function
        System.out.println("Length of 'hello': " + lengthFunction.apply("hello"));
        System.out.println("Length of 'functional': " + lengthFunction.apply("functional"));
        
        // Function using method reference
        Function&lt;String, Integer&gt; lengthMethodRef = String::length;
        System.out.println("Length via method ref: " + lengthMethodRef.apply("method"));
    }
}

This example demonstrates basic Function usage with lambda and method reference.
The lengthFunction takes String and returns Integer. We apply it to different
strings. Method reference provides more concise syntax for existing methods.

## Function Composition with andThen

The andThen method allows chaining functions where the output of
one becomes input to the next. This enables creating complex transformations
from simple functions.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // First function converts String to uppercase
        Function&lt;String, String&gt; toUpper = s -&gt; s.toUpperCase();
        
        // Second function extracts first 3 characters
        Function&lt;String, String&gt; firstThree = s -&gt; s.substring(0, Math.min(s.length(), 3));
        
        // Compose the functions
        Function&lt;String, String&gt; upperThenTrim = toUpper.andThen(firstThree);
        
        System.out.println("Result: " + upperThenTrim.apply("hello world"));
        System.out.println("Result: " + upperThenTrim.apply("java"));
    }
}

This example shows function composition with andThen. The input
string first gets converted to uppercase, then trimmed to first 3 characters.
The order of operations is left-to-right in the chain.

## Function Composition with compose

The compose method is similar to andThen but executes
functions in reverse order. The parameter function runs first, then the original
function.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Function to double a number
        Function&lt;Integer, Integer&gt; doubler = x -&gt; x * 2;
        
        // Function to increment by 1
        Function&lt;Integer, Integer&gt; incrementer = x -&gt; x + 1;
        
        // Compose in different orders
        Function&lt;Integer, Integer&gt; incrementThenDouble = doubler.compose(incrementer);
        Function&lt;Integer, Integer&gt; doubleThenIncrement = doubler.andThen(incrementer);
        
        System.out.println("Increment then double 5: " + incrementThenDouble.apply(5));
        System.out.println("Double then increment 5: " + doubleThenIncrement.apply(5));
    }
}

This example demonstrates the difference between compose and
andThen. With compose, the increment happens before doubling.
With andThen, doubling happens before incrementing. The results differ.

## Using Function with Streams

Function is commonly used with Java Streams for data transformation. The map
operation accepts a Function to transform stream elements. This enables clean
data processing pipelines.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; names = Arrays.asList("alice", "bob", "charlie", "dave");
        
        // Function to capitalize first letter
        Function&lt;String, String&gt; capitalize = s -&gt; 
            s.substring(0, 1).toUpperCase() + s.substring(1);
        
        // Apply function in stream
        List&lt;String&gt; capitalizedNames = names.stream()
            .map(capitalize)
            .collect(Collectors.toList());
            
        System.out.println("Original: " + names);
        System.out.println("Transformed: " + capitalizedNames);
    }
}

This example shows Function usage in Streams. We define a capitalization
function and apply it to each stream element via map. The result is a new
list with transformed values. Stream operations become very expressive.

## Function Identity

The Function.identity method returns a function that always
returns its input argument. It's useful when an operation requires a function
but you want to pass values unchanged.

Main.java
  

package com.zetcode;

import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {

        // Identity function
        Function&lt;String, String&gt; identity = Function.identity();
        
        System.out.println("Identity applied: " + identity.apply("test"));
        
        // Practical use in streams
        Stream&lt;String&gt; words = Stream.of("a", "b", "c");
        var result = words.collect(Collectors.toMap(
            Function.identity(), // key mapper
            String::length       // value mapper
        ));
        
        System.out.println("Resulting map: " + result);
    }
}

This example demonstrates Function.identity. The identity
function returns its input unchanged. In streams, it's often used as a
placeholder when transformation isn't needed but a Function is required.

## BiFunction and Beyond

While Function takes one argument, Java provides related interfaces for
different arities. BiFunction takes two arguments, and specialized
interfaces exist for primitive types to avoid boxing.

Main.java
  

package com.zetcode;

import java.util.function.BiFunction;
import java.util.function.DoubleFunction;
import java.util.function.ToIntFunction;

public class Main {

    public static void main(String[] args) {

        // BiFunction example
        BiFunction&lt;Integer, Integer, String&gt; sumToString = 
            (a, b) -&gt; String.valueOf(a + b);
        System.out.println("Sum as string: " + sumToString.apply(5, 3));
        
        // Primitive specialized functions
        DoubleFunction&lt;String&gt; doubleFormatter = d -&gt; String.format("$%.2f", d);
        System.out.println("Formatted: " + doubleFormatter.apply(12.3456));
        
        ToIntFunction&lt;String&gt; stringToLength = String::length;
        System.out.println("Length as int: " + stringToLength.applyAsInt("hello"));
    }
}

This example shows Function variants. BiFunction
handles two inputs, while primitive specializations like
DoubleFunction improve performance. Java's functional interfaces
cover many common use cases.

## Source

[Java Function Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html)

In this article, we've covered the essential methods and features of the Java
Function interface. Understanding these concepts is crucial for functional
programming and stream processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).