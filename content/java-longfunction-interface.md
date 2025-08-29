+++
title = "Java LongFunction Interface"
date = 2025-08-29T19:58:53.193+01:00
draft = false
description = "Complete Java LongFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LongFunction Interface

Last modified: April 16, 2025

 

The java.util.function.LongFunction interface represents a function
that accepts a long-valued argument and produces a result. It is a functional
interface with a single abstract method apply. LongFunction is
specialized for long primitives to avoid boxing overhead.

LongFunction is part of Java's functional programming utilities added
in Java 8. It enables behavior parameterization with long primitive values. The
interface is useful when working with numeric operations that require long input.

## LongFunction Interface Overview

LongFunction interface contains one abstract method. The key method
apply performs the operation on the long input value. Unlike
Function, it doesn't provide composition methods.

@FunctionalInterface
public interface LongFunction&lt;R&gt; {
    R apply(long value);
}

The code above shows the structure of LongFunction interface. It
uses generics where R is the result type. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic LongFunction Usage

The simplest way to use LongFunction is with lambda expressions. We define how
to transform the long input to output in the apply method. The example converts
long values to their string representations.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;

public class Main {

    public static void main(String[] args) {

        // Define a function that takes long and returns String
        LongFunction&lt;String&gt; toStringFunction = l -&gt; "Value: " + l;
        
        // Apply the function
        System.out.println(toStringFunction.apply(100L));
        System.out.println(toStringFunction.apply(9999999999L));
        
        // Function using static method reference
        LongFunction&lt;String&gt; hexFunction = Long::toHexString;
        System.out.println("Hex: " + hexFunction.apply(255L));
    }
}

This example demonstrates basic LongFunction usage with lambda and method
reference. The toStringFunction takes long and returns String. We apply it to
different long values. Method reference provides concise syntax for existing
methods.

## LongFunction with Mathematical Operations

LongFunction is useful for mathematical operations that take long values. We can
perform calculations and return results of any type. This example calculates
square roots and returns formatted strings.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;

public class Main {

    public static void main(String[] args) {

        // Calculate square root and format as string
        LongFunction&lt;String&gt; sqrtFunction = l -&gt; {
            double result = Math.sqrt(l);
            return String.format("√%d = %.2f", l, result);
        };
        
        System.out.println(sqrtFunction.apply(25L));
        System.out.println(sqrtFunction.apply(10000L));
        System.out.println(sqrtFunction.apply(2L));
    }
}

This example shows LongFunction performing mathematical operations. We calculate
square roots of long values and format the results as strings. The function
combines computation with string formatting.

## LongFunction with Collections

LongFunction can generate collections based on long input. This example creates
lists with repeated values. The size of the list is determined by the input.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        // Create list with n copies of "Hello"
        LongFunction&lt;List&lt;String&gt;&gt; listCreator = n -&gt; 
            Collections.nCopies((int) n, "Hello");
            
        System.out.println("Size 3: " + listCreator.apply(3L));
        System.out.println("Size 5: " + listCreator.apply(5L));
        
        // Note: casting long to int may lose precision for very large values
    }
}

This example demonstrates LongFunction creating collections. We generate lists
containing multiple copies of a string. The size is controlled by the long
input. Be cautious with large values when casting to int.

## LongFunction with Streams

LongFunction works well with Java Streams for processing numeric data. This
example uses it in a stream pipeline to transform long values. We convert
numbers to their binary representations.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;
import java.util.stream.LongStream;

public class Main {

    public static void main(String[] args) {

        // Function to convert long to binary string
        LongFunction&lt;String&gt; toBinary = l -&gt; Long.toBinaryString(l);
        
        // Process stream of long values
        LongStream.range(1, 6)
            .mapToObj(toBinary)
            .forEach(s -&gt; System.out.println("Binary: " + s));
    }
}

This example shows LongFunction in a stream pipeline. We convert a range of long
values to their binary string representations. The mapToObj method accepts our
LongFunction to perform the transformation.

## LongFunction with Exception Handling

LongFunction implementations may need to handle exceptions. This example shows
how to deal with potential exceptions when processing long values. We validate
input before processing.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;

public class Main {

    public static void main(String[] args) {

        // Function with input validation
        LongFunction&lt;String&gt; safeConverter = l -&gt; {
            if (l &lt; 0) {
                return "Error: Negative value";
            }
            return "Processed: " + (l * 2);
        };
        
        System.out.println(safeConverter.apply(10L));
        System.out.println(safeConverter.apply(-5L));
        System.out.println(safeConverter.apply(0L));
    }
}

This example demonstrates exception handling in LongFunction. We validate the
input long value before processing. For negative numbers, we return an error
message instead of processing. This prevents potential issues.

## LongFunction with Custom Objects

LongFunction can return custom objects based on long input. This example creates
simple Point objects from long values. The x and y coordinates are derived from
the input.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;

class Point {
    private final long x;
    private final long y;
    
    public Point(long x, long y) {
        this.x = x;
        this.y = y;
    }
    
    @Override
    public String toString() {
        return String.format("Point(%d, %d)", x, y);
    }
}

public class Main {

    public static void main(String[] args) {

        // Create Point from long value
        LongFunction&lt;Point&gt; pointCreator = l -&gt; new Point(l, l * 2);
        
        System.out.println(pointCreator.apply(5L));
        System.out.println(pointCreator.apply(10L));
    }
}

This example shows LongFunction creating custom Point objects. The function takes
a long value and returns a Point with coordinates based on that value. This
demonstrates how LongFunction can generate complex return types.

## Combining LongFunction with Other Functional Interfaces

LongFunction can be combined with other functional interfaces for more complex
operations. This example shows how to use it with Predicate for filtering.
We process only even numbers.

Main.java
  

package com.zetcode;

import java.util.function.LongFunction;
import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        // Predicate to check if even
        LongPredicate isEven = l -&gt; l % 2 == 0;
        
        // Function to process even numbers
        LongFunction&lt;String&gt; evenProcessor = l -&gt; 
            isEven.test(l) ? "Even: " + l : "Odd: " + l;
            
        System.out.println(evenProcessor.apply(4L));
        System.out.println(evenProcessor.apply(7L));
    }
}

This example combines LongFunction with LongPredicate. We first check if the
input is even using the predicate. The function then processes the value
differently based on the check. This shows functional composition.

## Source

[Java LongFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/LongFunction.html)

In this article, we've covered the essential methods and features of the Java
LongFunction interface. Understanding these concepts is crucial for functional
programming with primitive long values in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).