+++
title = "Java UnaryOperator Interface"
date = 2025-08-29T19:58:58.710+01:00
draft = false
description = "Complete Java UnaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java UnaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.UnaryOperator interface represents an operation
on a single operand that produces a result of the same type. It extends the
Function interface and is a functional interface with method
apply. UnaryOperator is commonly used for transformations where
input and output types match.

UnaryOperator is part of Java's functional programming utilities
added in Java 8. It specializes Function for cases where the input and output
types are identical. This simplifies type declarations and provides type safety.

## UnaryOperator Interface Overview

UnaryOperator interface contains one abstract method inherited from
Function and several static methods. The key method apply performs
the operation on the input. Static methods provide useful operator instances.

@FunctionalInterface
public interface UnaryOperator&lt;T&gt; extends Function&lt;T, T&gt; {
    static &lt;T&gt; UnaryOperator&lt;T&gt; identity();
}

The code above shows the structure of UnaryOperator interface. It
extends Function with identical input and output types. The identity method
returns a UnaryOperator that always returns its input argument.

## Basic UnaryOperator Usage

The simplest way to use UnaryOperator is with lambda expressions. We define how
to transform the input to output of the same type. The example squares integers.

Main.java
  

package com.zetcode;

import java.util.function.UnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define a UnaryOperator that squares integers
        UnaryOperator&lt;Integer&gt; square = x -&gt; x * x;
        
        // Apply the operator
        System.out.println("Square of 5: " + square.apply(5));
        System.out.println("Square of 12: " + square.apply(12));
        
        // UnaryOperator using method reference
        UnaryOperator&lt;String&gt; toUpper = String::toUpperCase;
        System.out.println("Uppercase: " + toUpper.apply("hello"));
    }
}

This example demonstrates basic UnaryOperator usage with lambda and method
reference. The square operator takes Integer and returns Integer. The toUpper
operator transforms strings to uppercase. Both maintain input-output type.

## UnaryOperator Composition

UnaryOperator inherits composition methods from Function. andThen
and compose allow chaining operations while maintaining type
consistency. This creates powerful transformation pipelines.

Main.java
  

package com.zetcode;

import java.util.function.UnaryOperator;

public class Main {

    public static void main(String[] args) {

        // First operator increments by 1
        UnaryOperator&lt;Integer&gt; increment = x -&gt; x + 1;
        
        // Second operator multiplies by 2
        UnaryOperator&lt;Integer&gt; doubler = x -&gt; x * 2;
        
        // Compose the operators
        UnaryOperator&lt;Integer&gt; incrementThenDouble = increment.andThen(doubler);
        UnaryOperator&lt;Integer&gt; doubleThenIncrement = doubler.andThen(increment);
        
        System.out.println("Increment then double 5: " + incrementThenDouble.apply(5));
        System.out.println("Double then increment 5: " + doubleThenIncrement.apply(5));
    }
}

This example shows UnaryOperator composition. We chain mathematical operations
while maintaining Integer type throughout. The order of operations affects the
final result significantly.

## UnaryOperator Identity

The UnaryOperator.identity method returns an operator that always
returns its input argument unchanged. It's useful as a default or neutral
operation in transformation pipelines.

Main.java
  

package com.zetcode;

import java.util.function.UnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Identity operator
        UnaryOperator&lt;String&gt; identity = UnaryOperator.identity();
        
        System.out.println("Identity applied: " + identity.apply("test"));
        
        // Practical use with optional transformation
        UnaryOperator&lt;String&gt; transformer = someCondition() 
            ? String::toUpperCase 
            : UnaryOperator.identity();
            
        System.out.println("Result: " + transformer.apply("conditional"));
    }
    
    private static boolean someCondition() {
        return false;
    }
}

This example demonstrates UnaryOperator.identity. The identity
operator returns its input unchanged. It serves as a neutral element when
conditional transformation is needed but sometimes no operation is required.

## Using UnaryOperator with Streams

UnaryOperator works naturally with Java Streams for in-place transformations.
The map operation accepts a UnaryOperator when input and output types match.
This enables clean data processing pipelines.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // UnaryOperator to square numbers
        UnaryOperator&lt;Integer&gt; square = x -&gt; x * x;
        
        // Apply operator in stream
        List&lt;Integer&gt; squaredNumbers = numbers.stream()
            .map(square)
            .collect(Collectors.toList());
            
        System.out.println("Original: " + numbers);
        System.out.println("Squared: " + squaredNumbers);
    }
}

This example shows UnaryOperator usage in Streams. We define a squaring operator
and apply it to each stream element via map. The result is a new list with
transformed values while maintaining the Integer type throughout.

## UnaryOperator for String Manipulation

UnaryOperator is particularly useful for string transformations where the
operation preserves the String type. Common examples include trimming,
case conversion, and formatting.

Main.java
  

package com.zetcode;

import java.util.function.UnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Trim and capitalize string
        UnaryOperator&lt;String&gt; trimAndCapitalize = s -&gt; {
            String trimmed = s.trim();
            return trimmed.substring(0, 1).toUpperCase() + 
                   trimmed.substring(1).toLowerCase();
        };
        
        System.out.println("Formatted: " + trimAndCapitalize.apply("  hELLO  "));
        
        // Repeat string three times
        UnaryOperator&lt;String&gt; tripler = s -&gt; s + s + s;
        System.out.println("Tripled: " + tripler.apply("hi"));
    }
}

This example demonstrates String manipulation with UnaryOperator. We create
operators that clean and format strings while maintaining the String type.
The operators can be reused across different string processing scenarios.

## Specialized UnaryOperator Variants

Java provides specialized UnaryOperator variants for primitive types to avoid
boxing overhead. These include IntUnaryOperator,
LongUnaryOperator, and DoubleUnaryOperator.

Main.java
  

package com.zetcode;

import java.util.function.IntUnaryOperator;
import java.util.function.DoubleUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // IntUnaryOperator example
        IntUnaryOperator negate = x -&gt; -x;
        System.out.println("Negated: " + negate.applyAsInt(42));
        
        // DoubleUnaryOperator example
        DoubleUnaryOperator celsiusToFahrenheit = c -&gt; (c * 9/5) + 32;
        System.out.println("20°C in Fahrenheit: " + 
            celsiusToFahrenheit.applyAsDouble(20));
    }
}

This example shows specialized UnaryOperator variants. IntUnaryOperator
works with int primitives directly, avoiding Integer boxing. Similarly,
DoubleUnaryOperator handles double primitives efficiently.

## Source

[Java UnaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/UnaryOperator.html)

In this article, we've covered the essential methods and features of the Java
UnaryOperator interface. Understanding these concepts is crucial for type-safe
transformations in functional programming and stream processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).