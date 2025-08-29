+++
title = "Java DoubleUnaryOperator Interface"
date = 2025-08-29T19:58:48.656+01:00
draft = false
description = "Complete Java DoubleUnaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DoubleUnaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.DoubleUnaryOperator interface represents an
operation on a single double-valued operand that produces a double result. It is
a functional interface with a single abstract method applyAsDouble.

DoubleUnaryOperator is part of Java's functional programming
utilities added in Java 8. It is specialized for double primitives to avoid
boxing overhead. The interface provides default methods for function composition.

## DoubleUnaryOperator Interface Overview

DoubleUnaryOperator contains one abstract method and several
default methods. The key method applyAsDouble performs the
operation. Other methods enable function composition and chaining.

@FunctionalInterface
public interface DoubleUnaryOperator {
    double applyAsDouble(double operand);
    
    default DoubleUnaryOperator compose(DoubleUnaryOperator before);
    default DoubleUnaryOperator andThen(DoubleUnaryOperator after);
    static DoubleUnaryOperator identity();
}

The code above shows the structure of DoubleUnaryOperator. It
operates on primitive double values for better performance. The interface is
annotated with @FunctionalInterface to indicate its single abstract method.

## Basic DoubleUnaryOperator Usage

The simplest way to use DoubleUnaryOperator is with lambda expressions. We
define how to transform the input double to output double. The example squares
input numbers.

Main.java
  

package com.zetcode;

import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define a function that squares its input
        DoubleUnaryOperator square = x -&gt; x * x;
        
        // Apply the function
        System.out.println("Square of 5.0: " + square.applyAsDouble(5.0));
        System.out.println("Square of 2.5: " + square.applyAsDouble(2.5));
        
        // Function using static method reference
        DoubleUnaryOperator abs = Math::abs;
        System.out.println("Absolute value: " + abs.applyAsDouble(-3.7));
    }
}

This example demonstrates basic DoubleUnaryOperator usage with lambda and method
reference. The square function takes double and returns double. We apply it to
different values. Method reference provides concise syntax for existing methods.

## Function Composition with andThen

The andThen method allows chaining operations where the output of
one becomes input to the next. This enables creating complex transformations
from simple operations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // First function adds 10
        DoubleUnaryOperator addTen = x -&gt; x + 10;
        
        // Second function divides by 2
        DoubleUnaryOperator halve = x -&gt; x / 2;
        
        // Compose the functions
        DoubleUnaryOperator addThenHalve = addTen.andThen(halve);
        
        System.out.println("Result for 5.0: " + addThenHalve.applyAsDouble(5.0));
        System.out.println("Result for 12.0: " + addThenHalve.applyAsDouble(12.0));
    }
}

This example shows function composition with andThen. The input
first gets 10 added, then the result is halved. The order of operations is
left-to-right in the chain. Results are calculated sequentially.

## Function Composition with compose

The compose method is similar to andThen but executes
operations in reverse order. The parameter function runs first, then the original
function.

Main.java
  

package com.zetcode;

import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Function to square a number
        DoubleUnaryOperator square = x -&gt; x * x;
        
        // Function to increment by 1
        DoubleUnaryOperator increment = x -&gt; x + 1;
        
        // Compose in different orders
        DoubleUnaryOperator incrementThenSquare = square.compose(increment);
        DoubleUnaryOperator squareThenIncrement = square.andThen(increment);
        
        System.out.println("Increment then square 2.0: " + incrementThenSquare.applyAsDouble(2.0));
        System.out.println("Square then increment 2.0: " + squareThenIncrement.applyAsDouble(2.0));
    }
}

This example demonstrates the difference between compose and
andThen. With compose, increment happens before squaring. With
andThen, squaring happens before incrementing. The results show different values.

## Using DoubleUnaryOperator with Streams

DoubleUnaryOperator is commonly used with Java Streams for primitive double
transformations. The map operation accepts a DoubleUnaryOperator to transform
stream elements efficiently.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        double[] values = {1.5, 2.3, 3.7, 4.1, 5.9};
        
        // Function to apply 10% discount
        DoubleUnaryOperator discount = x -&gt; x * 0.9;
        
        // Function to round to 1 decimal place
        DoubleUnaryOperator rounder = x -&gt; Math.round(x * 10) / 10.0;
        
        // Apply functions in stream
        Arrays.stream(values)
            .map(discount.andThen(rounder))
            .forEach(d -&gt; System.out.println("Discounted price: " + d));
    }
}

This example shows DoubleUnaryOperator usage in Streams. We define discount and
rounding functions and compose them. The stream applies the transformation to
each element. Primitive streams avoid boxing overhead.

## DoubleUnaryOperator Identity

The DoubleUnaryOperator.identity method returns a function that
always returns its input argument unchanged. It's useful when a function is
required but no transformation is needed.

Main.java
  

package com.zetcode;

import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Identity function
        DoubleUnaryOperator identity = DoubleUnaryOperator.identity();
        
        System.out.println("Identity applied: " + identity.applyAsDouble(7.3));
        
        // Using identity in composition
        DoubleUnaryOperator square = x -&gt; x * x;
        DoubleUnaryOperator squareWithIdentity = square.compose(identity);
        
        System.out.println("Square with identity: " + 
            squareWithIdentity.applyAsDouble(4.0));
    }
}

This example demonstrates DoubleUnaryOperator.identity. The
identity function returns its input unchanged. In compositions, it serves as
a neutral element that doesn't affect the operation.

## Practical Math Operations

DoubleUnaryOperator is ideal for mathematical operations. We can create reusable
function objects for common calculations like unit conversions or formulas.

Main.java
  

package com.zetcode;

import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Celsius to Fahrenheit conversion
        DoubleUnaryOperator cToF = c -&gt; c * 9/5 + 32;
        
        // Circle area calculation
        DoubleUnaryOperator circleArea = r -&gt; Math.PI * r * r;
        
        // Exponential decay function
        DoubleUnaryOperator decay = t -&gt; 100 * Math.exp(-0.05 * t);
        
        System.out.println("25°C in Fahrenheit: " + cToF.applyAsDouble(25));
        System.out.println("Area of r=3.0 circle: " + circleArea.applyAsDouble(3.0));
        System.out.println("Decay at t=10: " + decay.applyAsDouble(10));
    }
}

This example shows practical uses of DoubleUnaryOperator for mathematical
operations. Each function encapsulates a specific calculation. The operations
can be reused and composed as needed in different contexts.

## Combining with Other Functional Interfaces

DoubleUnaryOperator can be combined with other functional interfaces to create
more complex behavior. This example shows integration with DoublePredicate.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;
import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Function to normalize values between 0 and 1
        DoubleUnaryOperator normalize = x -&gt; (x - 50) / 50;
        
        // Predicate to check if value is in normalized range
        DoublePredicate inRange = x -&gt; x &gt;= -1 &amp;&amp; x &lt;= 1;
        
        double value = 75;
        double normalized = normalize.applyAsDouble(value);
        
        System.out.println("Original value: " + value);
        System.out.println("Normalized: " + normalized);
        System.out.println("Is in range: " + inRange.test(normalized));
    }
}

This example combines DoubleUnaryOperator with DoublePredicate. The normalize
function transforms values, while the predicate checks the result. Such
combinations enable powerful data processing pipelines with primitive doubles.

## Source

[Java DoubleUnaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleUnaryOperator.html)

In this article, we've covered the essential methods and features of the Java
DoubleUnaryOperator interface. Understanding these concepts is crucial for
efficient numerical processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).