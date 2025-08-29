+++
title = "Java LongConsumer Interface"
date = 2025-08-29T19:58:52.079+01:00
draft = false
description = "Complete Java LongConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LongConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.LongConsumer interface represents an operation
that accepts a single long-valued argument and returns no result. It is a functional
interface with a single abstract method accept. LongConsumer is used
primarily for side-effects like printing or modifying state.

LongConsumer is part of Java's functional programming utilities added
in Java 8. It is specialized for primitive long values to avoid boxing overhead.
The interface is commonly used with streams and other functional constructs.

## LongConsumer Interface Overview

LongConsumer interface contains one abstract method and one default
method. The key method accept performs the operation on the input.
The andThen method enables chaining of consumers.

@FunctionalInterface
public interface LongConsumer {
    void accept(long value);
    
    default LongConsumer andThen(LongConsumer after);
}

The code above shows the structure of LongConsumer interface. It
operates on primitive long values. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic LongConsumer Usage

The simplest way to use LongConsumer is with lambda expressions. We define what
to do with the long value in the accept method. The example prints long values.

Main.java
  

package com.zetcode;

import java.util.function.LongConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer that prints long values
        LongConsumer printConsumer = value -&gt; System.out.println("Value: " + value);
        
        // Use the consumer
        printConsumer.accept(42L);
        printConsumer.accept(10000000000L);
        
        // Consumer with method reference
        LongConsumer sysOutConsumer = System.out::println;
        sysOutConsumer.accept(999L);
    }
}

This example demonstrates basic LongConsumer usage with lambda and method reference.
The printConsumer takes a long value and prints it. We apply it to different
values. Method reference provides concise syntax for existing methods.

## LongConsumer with andThen

The andThen method allows chaining consumers where both operations
are performed in sequence. This enables creating complex side-effect chains from
simple consumers.

Main.java
  

package com.zetcode;

import java.util.function.LongConsumer;

public class Main {

    public static void main(String[] args) {

        // First consumer prints the value
        LongConsumer printValue = value -&gt; System.out.println("Original: " + value);
        
        // Second consumer prints the squared value
        LongConsumer printSquare = value -&gt; 
            System.out.println("Squared: " + (value * value));
        
        // Chain the consumers
        LongConsumer combined = printValue.andThen(printSquare);
        
        combined.accept(5L);
        combined.accept(10L);
    }
}

This example shows consumer chaining with andThen. The input value
is first printed as-is, then its square is printed. Both consumers receive the
same original input value.

## LongConsumer with Streams

LongConsumer is commonly used with LongStream for processing primitive long values.
The forEach terminal operation accepts a LongConsumer to perform side-effects.

Main.java
  

package com.zetcode;

import java.util.stream.LongStream;

public class Main {

    public static void main(String[] args) {

        // Create a LongStream
        LongStream.rangeClosed(1L, 5L)
            // Filter even numbers
            .filter(n -&gt; n % 2 == 0)
            // Use LongConsumer to print
            .forEach(value -&gt; {
                System.out.println("Even value: " + value);
                System.out.println("Cube: " + (value * value * value));
            });
    }
}

This example demonstrates LongConsumer usage in LongStream. We filter even numbers
and use forEach with a consumer that prints the value and its cube. Streams
provide clean data processing pipelines.

## Stateful LongConsumer

LongConsumer can maintain state between invocations when implemented as a class
or using an external variable. This allows accumulating values across multiple
calls.

Main.java
  

package com.zetcode;

import java.util.function.LongConsumer;

public class Main {

    public static void main(String[] args) {

        // Using an array to hold state (effectively final)
        long[] sum = {0L};
        
        // Consumer that accumulates values
        LongConsumer summingConsumer = value -&gt; sum[0] += value;
        
        summingConsumer.accept(10L);
        summingConsumer.accept(20L);
        summingConsumer.accept(30L);
        
        System.out.println("Total sum: " + sum[0]);
        
        // Using a class implementation
        class AveragingConsumer implements LongConsumer {
            private long total = 0;
            private int count = 0;
            
            @Override
            public void accept(long value) {
                total += value;
                count++;
            }
            
            public double getAverage() {
                return count == 0 ? 0 : (double) total / count;
            }
        }
        
        AveragingConsumer avgConsumer = new AveragingConsumer();
        avgConsumer.accept(5L);
        avgConsumer.accept(15L);
        avgConsumer.accept(25L);
        
        System.out.println("Average: " + avgConsumer.getAverage());
    }
}

This example shows stateful LongConsumer implementations. The first uses an array
to hold state in a lambda. The second uses a class to track total and count for
calculating average. Both maintain state between accept calls.

## LongConsumer in Collections

LongConsumer can be used with collections containing long values. We can process
collections by converting them to streams or iterating directly.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.LongConsumer;

public class Main {

    public static void main(String[] args) {

        List numbers = Arrays.asList(100L, 200L, 300L, 400L);
        
        // Consumer that formats and prints long values
        LongConsumer formatter = value -&gt; 
            System.out.printf("Formatted: $%,d%n", value);
        
        // Process list with stream
        numbers.stream()
            .mapToLong(Long::longValue)
            .forEach(formatter);
            
        // Process array directly
        long[] primitives = {1000L, 2000L, 3000L};
        Arrays.stream(primitives)
            .forEach(formatter.andThen(
                v -&gt; System.out.println("---")));
    }
}

This example shows LongConsumer usage with collections. We process a List
by converting to LongStream. We also process a primitive long array directly.
The consumer formats values as currency and prints them.

## Combining LongConsumer with Other Functional Interfaces

LongConsumer can be combined with other functional interfaces to create more
complex operations. This demonstrates interoperability between functional types.

Main.java
  

package com.zetcode;

import java.util.function.LongConsumer;
import java.util.function.LongFunction;
import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        // Predicate to filter negative numbers
        LongPredicate isPositive = n -&gt; n &gt; 0;
        
        // Function to convert long to String
        LongFunction toStringWithUnit = n -&gt; n + " meters";
        
        // Consumer to print processed values
        LongConsumer printer = n -&gt; 
            System.out.println("Processed: " + toStringWithUnit.apply(n));
        
        // Process values
        long[] values = {10, -5, 20, -3, 30};
        
        for (long n : values) {
            if (isPositive.test(n)) {
                printer.accept(n);
            }
        }
        
        // Using method that accepts LongConsumer
        processValues(15L, 25L, printer.andThen(
            n -&gt; System.out.println("--- End of record ---")));
    }
    
    private static void processValues(long... values, LongConsumer consumer) {
        for (long n : values) {
            consumer.accept(n);
        }
    }
}

This example combines LongConsumer with LongPredicate and LongFunction. We filter
positive numbers, convert them to strings with units, and print them. The example
also shows passing LongConsumer to a method.

## Source

[Java LongConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/LongConsumer.html)

In this article, we've covered the essential methods and features of the Java
LongConsumer interface. Understanding these concepts is crucial for functional
programming with primitive long values in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).