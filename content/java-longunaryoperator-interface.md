+++
title = "Java LongUnaryOperator Interface"
date = 2025-08-29T19:58:54.328+01:00
draft = false
description = "Complete Java LongUnaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LongUnaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.LongUnaryOperator interface represents a
function that accepts a single long-valued argument and produces a long-valued
result. It is a functional interface with a single abstract method
applyAsLong. This specialization avoids boxing/unboxing overhead.

LongUnaryOperator is part of Java's functional programming utilities
added in Java 8. It is particularly useful when working with primitive long
values in streams and other functional operations. The interface provides
default methods for composition.

## LongUnaryOperator Interface Overview

LongUnaryOperator contains one abstract method and several default
methods. The key method applyAsLong performs the operation on the
input. Other methods enable function composition and chaining.

@FunctionalInterface
public interface LongUnaryOperator {
    long applyAsLong(long operand);
    
    default LongUnaryOperator compose(LongUnaryOperator before);
    default LongUnaryOperator andThen(LongUnaryOperator after);
    static LongUnaryOperator identity();
}

The code above shows the structure of LongUnaryOperator interface.
Unlike generic Function, it works specifically with primitive long values. The
interface is annotated with @FunctionalInterface to indicate its nature.

## Basic LongUnaryOperator Usage

The simplest way to use LongUnaryOperator is with lambda expressions. We define
how to transform the input long to output long. The example squares input values.

Main.java
  

package com.zetcode;

import java.util.function.LongUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define a function that squares a long value
        LongUnaryOperator square = x -&gt; x * x;
        
        // Apply the function
        System.out.println("Square of 5: " + square.applyAsLong(5));
        System.out.println("Square of 12: " + square.applyAsLong(12));
        
        // Function using arithmetic expression
        LongUnaryOperator incrementAndDouble = x -&gt; (x + 1) * 2;
        System.out.println("Increment and double 3: " + 
            incrementAndDouble.applyAsLong(3));
    }
}

This example demonstrates basic LongUnaryOperator usage with lambda expressions.
The square operator multiplies input by itself. We also show a more complex
operation combining increment and multiplication. Results are primitive longs.

## Function Composition with andThen

The andThen method allows chaining LongUnaryOperators where the
output of one becomes input to the next. This enables building complex
operations from simple ones.

Main.java
  

package com.zetcode;

import java.util.function.LongUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // First function increments by 1
        LongUnaryOperator increment = x -&gt; x + 1;
        
        // Second function multiplies by 2
        LongUnaryOperator doubler = x -&gt; x * 2;
        
        // Compose the functions
        LongUnaryOperator incrementThenDouble = increment.andThen(doubler);
        
        System.out.println("Increment then double 5: " + 
            incrementThenDouble.applyAsLong(5));
        System.out.println("Increment then double 10: " + 
            incrementThenDouble.applyAsLong(10));
    }
}

This example shows function composition with andThen. The input
value first gets incremented by 1, then multiplied by 2. The order of operations
is left-to-right in the chain. No boxing occurs between operations.

## Function Composition with compose

The compose method is similar to andThen but executes
functions in reverse order. The parameter function runs first, then the original
function.

Main.java
  

package com.zetcode;

import java.util.function.LongUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Function to square a number
        LongUnaryOperator square = x -&gt; x * x;
        
        // Function to subtract 5
        LongUnaryOperator subtractFive = x -&gt; x - 5;
        
        // Compose in different orders
        LongUnaryOperator subtractThenSquare = square.compose(subtractFive);
        LongUnaryOperator squareThenSubtract = square.andThen(subtractFive);
        
        System.out.println("Subtract 5 then square 8: " + 
            subtractThenSquare.applyAsLong(8));
        System.out.println("Square then subtract 5 from 8: " + 
            squareThenSubtract.applyAsLong(8));
    }
}

This example demonstrates the difference between compose and
andThen. With compose, subtraction happens before squaring. With
andThen, squaring happens before subtraction. The results show different values.

## Using LongUnaryOperator with Streams

LongUnaryOperator is commonly used with LongStream for primitive long
transformations. The map operation accepts a LongUnaryOperator to transform
stream elements. This avoids boxing overhead in numeric operations.

Main.java
  

package com.zetcode;

import java.util.stream.LongStream;

public class Main {

    public static void main(String[] args) {

        // Define transformation operations
        LongUnaryOperator square = x -&gt; x * x;
        LongUnaryOperator increment = x -&gt; x + 1;
        
        // Apply operations in stream pipeline
        LongStream.rangeClosed(1, 5)
            .map(square)
            .map(increment)
            .forEach(System.out::println);
            
        // Combined operation
        LongUnaryOperator combined = square.andThen(increment);
        System.out.println("Combined result for 3: " + 
            combined.applyAsLong(3));
    }
}

This example shows LongUnaryOperator usage in LongStream. We define square and
increment operations and apply them to a range of numbers. The combined operator
shows how to chain operations. All operations work with primitive longs.

## LongUnaryOperator Identity

The LongUnaryOperator.identity method returns a function that
always returns its input argument unchanged. It's useful as a default operation
or placeholder in stream processing.

Main.java
  

package com.zetcode;

import java.util.function.LongUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Identity function
        LongUnaryOperator identity = LongUnaryOperator.identity();
        
        System.out.println("Identity applied to 5: " + 
            identity.applyAsLong(5));
        System.out.println("Identity applied to 100: " + 
            identity.applyAsLong(100));
            
        // Using identity in stream filter
        LongStream.of(10, 20, 30)
            .map(LongUnaryOperator.identity())
            .forEach(System.out::println);
    }
}

This example demonstrates LongUnaryOperator.identity. The identity
function returns its input unchanged. In streams, it can serve as a no-op
transformation when needed for API consistency. Results are identical to inputs.

## Practical Application: Number Formatting

LongUnaryOperator can be used in practical scenarios like number formatting or
data transformation pipelines. This example shows a currency conversion
operation chain.

Main.java
  

package com.zetcode;

import java.util.function.LongUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Conversion rates (simplified)
        long usdToEurRate = 85; // 100 USD = 85 EUR
        long eurToGbpRate = 90; // 100 EUR = 90 GBP
        
        // Create conversion operators
        LongUnaryOperator usdToEur = usd -&gt; usd * usdToEurRate / 100;
        LongUnaryOperator eurToGbp = eur -&gt; eur * eurToGbpRate / 100;
        
        // Combined conversion
        LongUnaryOperator usdToGbp = usdToEur.andThen(eurToGbp);
        
        long amountInUsd = 20000; // $200.00 in cents
        System.out.println("$200 in GBP: £" + 
            usdToGbp.applyAsLong(amountInUsd) / 100.0);
            
        // Formatting operator
        LongUnaryOperator roundToNearest100 = x -&gt; (x + 50) / 100 * 100;
        System.out.println("Rounded 1234: " + 
            roundToNearest100.applyAsLong(1234));
    }
}

This example shows practical LongUnaryOperator usage. We create currency
conversion operators and chain them together. The rounding operator demonstrates
another common numeric operation. All calculations use primitive longs.

## Source

[Java LongUnaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/LongUnaryOperator.html)

In this article, we've covered the essential methods and features of the Java
LongUnaryOperator interface. Understanding these concepts is crucial for
efficient numeric processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).