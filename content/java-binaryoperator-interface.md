+++
title = "Java BinaryOperator Interface"
date = 2025-08-29T19:58:45.343+01:00
draft = false
description = "Complete Java BinaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BinaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.BinaryOperator interface represents an
operation upon two operands of the same type, producing a result of the same
type. It extends BiFunction and is a functional interface with
a single abstract method apply.

BinaryOperator is part of Java's functional programming utilities
added in Java 8. It is commonly used for reduction operations, mathematical
calculations, and combining values. The interface provides static methods for
common operations like min and max.

## BinaryOperator Interface Overview

BinaryOperator interface contains one abstract method and several
static methods. The key method apply performs the operation on the
two inputs. Static methods provide common binary operations.

@FunctionalInterface
public interface BinaryOperator&lt;T&gt; extends BiFunction&lt;T,T,T&gt; {
    static &lt;T&gt; BinaryOperator&lt;T&gt; minBy(Comparator&lt;? super T&gt; comparator);
    static &lt;T&gt; BinaryOperator&lt;T&gt; maxBy(Comparator&lt;? super T&gt; comparator);
}

The code above shows the structure of BinaryOperator interface.
It uses generics where T is the type of operands and result. The interface
extends BiFunction with all three type parameters being the same.

## Basic BinaryOperator Usage

The simplest way to use BinaryOperator is with lambda expressions. We define
how to combine two values of the same type. The example shows addition of
integers.

Main.java
  

package com.zetcode;

import java.util.function.BinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define a binary operator for addition
        BinaryOperator&lt;Integer&gt; adder = (a, b) -&gt; a + b;
        
        // Apply the operator
        System.out.println("Sum of 5 and 3: " + adder.apply(5, 3));
        System.out.println("Sum of 10 and 15: " + adder.apply(10, 15));
        
        // BinaryOperator for string concatenation
        BinaryOperator&lt;String&gt; concat = (s1, s2) -&gt; s1 + s2;
        System.out.println("Concatenated: " + concat.apply("Hello ", "World"));
    }
}

This example demonstrates basic BinaryOperator usage with lambda expressions.
The adder takes two integers and returns their sum. The concat operator
combines two strings. BinaryOperator is useful for any operation combining
two values of the same type.

## Using minBy and maxBy

The minBy and maxBy static methods create
BinaryOperators that return the minimum or maximum of two values according
to a Comparator. This is useful for reduction operations.

Main.java
  

package com.zetcode;

import java.util.Comparator;
import java.util.function.BinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Create min and max operators for integers
        BinaryOperator&lt;Integer&gt; minOp = BinaryOperator.minBy(Integer::compare);
        BinaryOperator&lt;Integer&gt; maxOp = BinaryOperator.maxBy(Integer::compare);
        
        System.out.println("Min of 5 and 3: " + minOp.apply(5, 3));
        System.out.println("Max of 5 and 3: " + maxOp.apply(5, 3));
        
        // For custom objects
        BinaryOperator&lt;String&gt; shortest = 
            BinaryOperator.minBy(Comparator.comparingInt(String::length));
        System.out.println("Shorter string: " + 
            shortest.apply("longword", "short"));
    }
}

This example shows how to use minBy and maxBy.
We create operators that find minimum and maximum values. For custom objects,
we provide a Comparator. These methods are often used with streams.

## BinaryOperator in Stream Reduction

BinaryOperator is commonly used as the accumulator in stream reduction
operations. The reduce method takes a BinaryOperator to combine stream
elements. This is powerful for aggregation operations.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.BinaryOperator;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // BinaryOperator for sum
        BinaryOperator&lt;Integer&gt; sum = (a, b) -&gt; a + b;
        
        // Reduce the stream
        int total = numbers.stream()
            .reduce(0, sum);
            
        System.out.println("Sum of numbers: " + total);
        
        // Product of numbers
        BinaryOperator&lt;Integer&gt; product = (a, b) -&gt; a * b;
        int factorial = numbers.stream()
            .reduce(1, product);
            
        System.out.println("Product of numbers: " + factorial);
    }
}

This example demonstrates BinaryOperator in stream reduction. We define
operators for sum and product. The reduce method uses these to aggregate
stream elements. This pattern is common in data processing.

## Combining with Other Functional Interfaces

BinaryOperator can be combined with other functional interfaces like
Function and Predicate to create more complex operations. This enables
building powerful data processing pipelines.

Main.java
  

package com.zetcode;

import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // BinaryOperator for sum
        BinaryOperator&lt;Integer&gt; sum = (a, b) -&gt; a + b;
        
        // Function to square a number
        Function&lt;Integer, Integer&gt; square = x -&gt; x * x;
        
        // Predicate to check if even
        Predicate&lt;Integer&gt; isEven = x -&gt; x % 2 == 0;
        
        // Combined operation
        int result = sum.andThen(square).apply(3, 4);
        System.out.println("Sum squared: " + result);
        
        // Conditional operation
        BinaryOperator&lt;Integer&gt; conditionalOp = (a, b) -&gt; 
            isEven.test(a) ? sum.apply(a, b) : a * b;
        System.out.println("Conditional result: " + conditionalOp.apply(4, 5));
        System.out.println("Conditional result: " + conditionalOp.apply(3, 5));
    }
}

This example shows combining BinaryOperator with other functional interfaces.
We chain operations using andThen and create conditional logic with Predicate.
This demonstrates the flexibility of functional programming in Java.

## BinaryOperator with Custom Objects

BinaryOperator works with custom objects just as well as with primitives.
We can define operations that combine two objects into one. This is useful
for domain-specific operations.

Main.java
  

package com.zetcode;

import java.util.function.BinaryOperator;

class Point {
    int x;
    int y;
    
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    @Override
    public String toString() {
        return "(" + x + "," + y + ")";
    }
}

public class Main {

    public static void main(String[] args) {

        // BinaryOperator to add two points
        BinaryOperator&lt;Point&gt; pointAdder = (p1, p2) -&gt; 
            new Point(p1.x + p2.x, p1.y + p2.y);
            
        Point p1 = new Point(1, 2);
        Point p2 = new Point(3, 4);
        
        System.out.println("Sum of points: " + pointAdder.apply(p1, p2));
        
        // BinaryOperator to find midpoint
        BinaryOperator&lt;Point&gt; midpoint = (p1, p2) -&gt; 
            new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
            
        System.out.println("Midpoint: " + midpoint.apply(p1, p2));
    }
}

This example demonstrates BinaryOperator with custom Point objects. We define
operations to add points and find midpoints. The same pattern can be applied
to any domain object that needs combining operations.

## BinaryOperator in Parallel Streams

BinaryOperator used in parallel streams must be associative to ensure correct
results. The operation must produce the same result regardless of grouping.
This is crucial for parallel processing.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.BinaryOperator;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Associative BinaryOperator for sum
        BinaryOperator&lt;Integer&gt; sum = (a, b) -&gt; a + b;
        
        // Parallel stream reduction
        int parallelSum = numbers.parallelStream()
            .reduce(0, sum);
            
        System.out.println("Parallel sum: " + parallelSum);
        
        // Non-associative operation (subtraction)
        BinaryOperator&lt;Integer&gt; subtract = (a, b) -&gt; a - b;
        int parallelSubtract = numbers.parallelStream()
            .reduce(0, subtract);
            
        System.out.println("Parallel subtract (incorrect): " + parallelSubtract);
    }
}

This example shows the importance of associativity in parallel streams. The sum
operation works correctly in parallel because it's associative. Subtraction
fails because it's not associative. Always verify associativity for parallel ops.

## BinaryOperator for Mathematical Operations

BinaryOperator is ideal for implementing mathematical operations that take two
operands. We can create reusable operators for various calculations and combine
them flexibly.

Main.java
  

package com.zetcode;

import java.util.function.BinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Mathematical operators
        BinaryOperator&lt;Double&gt; add = (a, b) -&gt; a + b;
        BinaryOperator&lt;Double&gt; multiply = (a, b) -&gt; a * b;
        BinaryOperator&lt;Double&gt; power = (a, b) -&gt; Math.pow(a, b);
        
        // Using the operators
        System.out.println("5 + 3 = " + add.apply(5.0, 3.0));
        System.out.println("5 * 3 = " + multiply.apply(5.0, 3.0));
        System.out.println("5 ^ 3 = " + power.apply(5.0, 3.0));
        
        // Combining operations
        double result = add.andThen(x -&gt; multiply.apply(x, 2.0))
                          .apply(3.0, 4.0);
        System.out.println("(3 + 4) * 2 = " + result);
    }
}

This example shows BinaryOperator for mathematical operations. We define basic
arithmetic operators and demonstrate their use. The operators can be combined
to form more complex calculations, showing the power of functional composition.

## Source

[Java BinaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/BinaryOperator.html)

In this article, we've covered the essential methods and features of the Java
BinaryOperator interface. Understanding these concepts is crucial for reduction
operations and functional programming in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).