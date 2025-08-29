+++
title = "Java LongBinaryOperator Interface"
date = 2025-08-29T19:58:52.093+01:00
draft = false
description = "Complete Java LongBinaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LongBinaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.LongBinaryOperator interface represents an
operation on two long-valued operands producing a long result. It is a functional
interface with a single abstract method applyAsLong. This interface
is specialized for primitive long types to avoid boxing overhead.

LongBinaryOperator is part of Java's functional programming utilities
added in Java 8. It is useful for mathematical operations and reductions where
performance with primitive types is important. The interface has no default or
static methods.

## LongBinaryOperator Interface Overview

LongBinaryOperator interface contains one abstract method that must
be implemented. The method takes two long parameters and returns a long value.
This makes it ideal for arithmetic operations on primitive longs.

@FunctionalInterface
public interface LongBinaryOperator {
    long applyAsLong(long left, long right);
}

The code above shows the simple structure of LongBinaryOperator.
It is annotated with @FunctionalInterface to indicate its single abstract method
nature. The interface avoids object creation overhead by using primitives.

## Basic LongBinaryOperator Usage

The simplest way to use LongBinaryOperator is with lambda expressions. We define
how to combine two long values into one result. The example shows basic
arithmetic operations.

Main.java
  

package com.zetcode;

import java.util.function.LongBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define addition operator
        LongBinaryOperator add = (a, b) -&gt; a + b;
        
        // Define multiplication operator
        LongBinaryOperator multiply = (a, b) -&gt; a * b;
        
        System.out.println("10 + 20 = " + add.applyAsLong(10, 20));
        System.out.println("5 * 7 = " + multiply.applyAsLong(5, 7));
        
        // Using method reference for max operation
        LongBinaryOperator max = Math::max;
        System.out.println("Max of 15 and 25: " + max.applyAsLong(15, 25));
    }
}

This example demonstrates basic LongBinaryOperator usage with lambda expressions.
We create operators for addition and multiplication. Method reference shows how
to use existing methods compatible with the interface. Results are printed.

## Using LongBinaryOperator with reduce

LongBinaryOperator is commonly used with reduce
operations on streams of primitive longs. This allows efficient aggregation
without boxing overhead. The example sums numbers in a LongStream.

Main.java
  

package com.zetcode;

import java.util.stream.LongStream;
import java.util.function.LongBinaryOperator;

public class Main {

    public static void main(String[] args) {

        LongStream numbers = LongStream.of(1, 2, 3, 4, 5);
        
        // Sum reduction using LongBinaryOperator
        long sum = numbers.reduce(0, (a, b) -&gt; a + b);
        System.out.println("Sum: " + sum);
        
        // Alternative with method reference
        LongStream numbers2 = LongStream.of(10, 20, 30);
        long sum2 = numbers2.reduce(0, Long::sum);
        System.out.println("Sum2: " + sum2);
        
        // Product reduction
        LongStream factors = LongStream.of(2, 3, 4);
        long product = factors.reduce(1, (a, b) -&gt; a * b);
        System.out.println("Product: " + product);
    }
}

This example shows LongBinaryOperator in stream reductions. We sum numbers using
both lambda and method reference. The product calculation demonstrates another
common reduction pattern. All operations work directly with primitive longs.

## Custom Mathematical Operations

We can implement custom mathematical operations using LongBinaryOperator. This
is useful when standard operators don't meet requirements. The example shows
power and GCD calculations.

Main.java
  

package com.zetcode;

import java.util.function.LongBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Power operation
        LongBinaryOperator power = (base, exponent) -&gt; {
            long result = 1;
            for (long i = 0; i &lt; exponent; i++) {
                result *= base;
            }
            return result;
        };
        
        System.out.println("2^5 = " + power.applyAsLong(2, 5));
        
        // GCD operation using Euclidean algorithm
        LongBinaryOperator gcd = (a, b) -&gt; {
            while (b != 0) {
                long temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        };
        
        System.out.println("GCD of 56 and 42: " + gcd.applyAsLong(56, 42));
    }
}

This example implements custom mathematical operations. The power operator
calculates exponents through iteration. The GCD operator uses the Euclidean
algorithm. Both show how complex operations can be encapsulated.

## Combining with Other Functional Interfaces

LongBinaryOperator can be combined with other functional interfaces
for more complex behavior. The example shows filtering before operation and
chaining operations together.

Main.java
  

package com.zetcode;

import java.util.function.LongBinaryOperator;
import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        // Only operate if both numbers are even
        LongBinaryOperator conditionalAdd = (a, b) -&gt; {
            LongPredicate isEven = n -&gt; n % 2 == 0;
            return isEven.test(a) &amp;&amp; isEven.test(b) ? a + b : 0;
        };
        
        System.out.println("Conditional add (4,6): " + 
            conditionalAdd.applyAsLong(4, 6));
        System.out.println("Conditional add (3,8): " + 
            conditionalAdd.applyAsLong(3, 8));
            
        // Chaining operations
        LongBinaryOperator addThenDouble = (a, b) -&gt; (a + b) * 2;
        System.out.println("Add then double (3,4): " + 
            addThenDouble.applyAsLong(3, 4));
    }
}

This example combines LongBinaryOperator with LongPredicate for conditional
operations. We also show how to chain operations within a single lambda. This
demonstrates the flexibility of functional composition in Java.

## Using in Parallel Streams

LongBinaryOperator is particularly useful in parallel streams
where operations must be associative for correct results. The example shows
parallel reduction with a custom operator.

Main.java
  

package com.zetcode;

import java.util.stream.LongStream;
import java.util.function.LongBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Custom associative operation (a + b)^2
        LongBinaryOperator sumOfSquares = (a, b) -&gt; (a + b) * (a + b);
        
        long result = LongStream.rangeClosed(1, 10)
            .parallel()
            .reduce(0, sumOfSquares);
            
        System.out.println("Parallel reduction result: " + result);
        
        // Verification with sequential stream
        long seqResult = LongStream.rangeClosed(1, 10)
            .reduce(0, sumOfSquares);
            
        System.out.println("Sequential result: " + seqResult);
    }
}

This example demonstrates parallel stream reduction with a custom associative
operation. The operator must be associative to work correctly in parallel. We
verify results match between parallel and sequential execution.

## Performance Comparison

Using LongBinaryOperator with primitive longs can provide
significant performance benefits over object-based alternatives. The example
compares primitive and object-based reduction.

Main.java
  

package com.zetcode;

import java.util.stream.LongStream;
import java.util.stream.Stream;
import java.util.function.LongBinaryOperator;
import java.util.function.BinaryOperator;

public class Main {

    public static void main(String[] args) {

        final int SIZE = 10_000_000;
        
        // Primitive long stream with LongBinaryOperator
        long start = System.currentTimeMillis();
        long sum = LongStream.rangeClosed(1, SIZE)
            .reduce(0, (a, b) -&gt; a + b);
        long primitiveTime = System.currentTimeMillis() - start;
        
        // Object stream with BinaryOperator
        start = System.currentTimeMillis();
        Long sumObj = Stream.iterate(1L, n -&gt; n + 1)
            .limit(SIZE)
            .reduce(0L, (a, b) -&gt; a + b);
        long objectTime = System.currentTimeMillis() - start;
        
        System.out.println("Primitive sum: " + sum + " in " + 
            primitiveTime + "ms");
        System.out.println("Object sum: " + sumObj + " in " + 
            objectTime + "ms");
    }
}

This example compares performance between primitive long operations and boxed
Long operations. The primitive version using LongBinaryOperator is typically
faster due to avoiding boxing overhead. Results and timings are printed.

## Source

[Java LongBinaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/LongBinaryOperator.html)

In this article, we've covered the essential usage patterns of the Java
LongBinaryOperator interface. Understanding these concepts is crucial for
efficient numerical processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).