+++
title = "Java IntBinaryOperator Interface"
date = 2025-08-29T19:58:49.760+01:00
draft = false
description = "Complete Java IntBinaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IntBinaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.IntBinaryOperator interface represents an
operation on two int-valued operands that produces an int-valued result. It is
a functional interface with a single abstract method applyAsInt.

IntBinaryOperator is part of Java's functional programming utilities
added in Java 8. It is specialized for primitive int types to avoid boxing
overhead. The interface is commonly used in numeric operations and reductions.

## IntBinaryOperator Interface Overview

IntBinaryOperator interface contains one abstract method that takes
two int parameters and returns an int. Unlike generic functional interfaces,
it works directly with primitive values for better performance.

@FunctionalInterface
public interface IntBinaryOperator {
    int applyAsInt(int left, int right);
}

The code above shows the simple structure of IntBinaryOperator.
It's annotated with @FunctionalInterface and has just one method to implement.
The method takes two int parameters and returns an int result.

## Basic IntBinaryOperator Usage

The simplest way to use IntBinaryOperator is with lambda expressions. We define
how to combine two int values into one result. The example shows addition.

Main.java
  

package com.zetcode;

import java.util.function.IntBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define an addition operator
        IntBinaryOperator add = (a, b) -&gt; a + b;
        
        // Apply the operator
        System.out.println("5 + 3 = " + add.applyAsInt(5, 3));
        System.out.println("10 + 20 = " + add.applyAsInt(10, 20));
        
        // Define a multiplication operator
        IntBinaryOperator multiply = (x, y) -&gt; x * y;
        System.out.println("7 * 6 = " + multiply.applyAsInt(7, 6));
    }
}

This example demonstrates basic IntBinaryOperator usage with lambda expressions.
We create two operators: one for addition and one for multiplication. Each
operator takes two int values and returns their combined result.

## Using IntBinaryOperator with reduce

IntBinaryOperator is commonly used with reduce
operations on streams of primitive integers. The operator defines how to
combine elements in the reduction process.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.IntBinaryOperator;

public class Main {

    public static void main(String[] args) {

        int[] numbers = {1, 2, 3, 4, 5};
        
        // Define a sum operator
        IntBinaryOperator sumOperator = (a, b) -&gt; a + b;
        
        // Reduce the array to a single sum
        int sum = Arrays.stream(numbers)
            .reduce(0, sumOperator);
            
        System.out.println("Sum of numbers: " + sum);
        
        // Define a max operator
        IntBinaryOperator maxOperator = (a, b) -&gt; a &gt; b ? a : b;
        
        // Find maximum value
        int max = Arrays.stream(numbers)
            .reduce(Integer.MIN_VALUE, maxOperator);
            
        System.out.println("Max value: " + max);
    }
}

This example shows IntBinaryOperator used with stream reduction. We define two
operators: one for summing values and one for finding the maximum. The reduce
operation applies the operator cumulatively to all elements.

## Custom Mathematical Operations

We can implement more complex mathematical operations using IntBinaryOperator.
This example demonstrates power calculation and GCD (Greatest Common Divisor).

Main.java
  

package com.zetcode;

import java.util.function.IntBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Power calculation
        IntBinaryOperator power = (base, exponent) -&gt; {
            int result = 1;
            for (int i = 0; i &lt; exponent; i++) {
                result *= base;
            }
            return result;
        };
        
        System.out.println("2^5 = " + power.applyAsInt(2, 5));
        
        // GCD calculation using Euclidean algorithm
        IntBinaryOperator gcd = (a, b) -&gt; {
            while (b != 0) {
                int temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        };
        
        System.out.println("GCD of 54 and 24: " + gcd.applyAsInt(54, 24));
    }
}

This example implements two custom mathematical operations. The power operator
calculates base raised to exponent. The GCD operator implements the Euclidean
algorithm. Both show how IntBinaryOperator can encapsulate complex logic.

## Combining with Other Functional Interfaces

IntBinaryOperator can be combined with other functional interfaces to create
more powerful operations. This example shows combination with IntPredicate.

Main.java
  

package com.zetcode;

import java.util.function.IntBinaryOperator;
import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Conditional sum - only add if both numbers are even
        IntBinaryOperator conditionalSum = (a, b) -&gt; {
            IntPredicate isEven = n -&gt; n % 2 == 0;
            return isEven.test(a) &amp;&amp; isEven.test(b) ? a + b : 0;
        };
        
        System.out.println("Sum if even (4,6): " + 
            conditionalSum.applyAsInt(4, 6));
        System.out.println("Sum if even (3,8): " + 
            conditionalSum.applyAsInt(3, 8));
            
        // Safe division - avoid division by zero
        IntBinaryOperator safeDivide = (a, b) -&gt; {
            return b != 0 ? a / b : 0;
        };
        
        System.out.println("10 / 2 = " + safeDivide.applyAsInt(10, 2));
        System.out.println("10 / 0 = " + safeDivide.applyAsInt(10, 0));
    }
}

This example demonstrates combining IntBinaryOperator with other functional
interfaces. The conditionalSum only adds numbers if both are even. The
safeDivide operator handles division by zero gracefully.

## Factory Methods for Common Operations

We can create factory methods that return common IntBinaryOperator instances.
This approach promotes code reuse and follows the factory pattern.

Main.java
  

package com.zetcode;

import java.util.function.IntBinaryOperator;

public class Main {
    
    public static IntBinaryOperator createAdder(int increment) {
        return (a, b) -&gt; a + b + increment;
    }
    
    public static IntBinaryOperator createMultiplier(int factor) {
        return (a, b) -&gt; a * b * factor;
    }

    public static void main(String[] args) {

        // Create customized operators
        IntBinaryOperator addWithBonus = createAdder(5);
        IntBinaryOperator multiplyWithFactor = createMultiplier(2);
        
        System.out.println("Add with bonus: " + 
            addWithBonus.applyAsInt(10, 20));
        System.out.println("Multiply with factor: " + 
            multiplyWithFactor.applyAsInt(3, 4));
            
        // Compose operations
        int result = addWithBonus.andThen(r -&gt; r * 2)
            .applyAsInt(10, 20);
        System.out.println("Composed result: " + result);
    }
}

This example shows factory methods creating customized IntBinaryOperator
instances. The createAdder method returns an operator that adds a bonus.
The createMultiplier includes an extra factor. We also demonstrate chaining.

## Using in Custom Accumulator

IntBinaryOperator can be used to implement custom accumulation logic. This
example creates a simple statistics calculator that processes arrays.

Main.java
  

package com.zetcode;

import java.util.function.IntBinaryOperator;

public class Main {
    
    public static int processArray(int[] array, int initial, 
            IntBinaryOperator operator) {
        int result = initial;
        for (int value : array) {
            result = operator.applyAsInt(result, value);
        }
        return result;
    }

    public static void main(String[] args) {

        int[] data = {12, 34, 56, 78, 90};
        
        // Calculate sum
        int sum = processArray(data, 0, (a, b) -&gt; a + b);
        System.out.println("Sum: " + sum);
        
        // Calculate product
        int product = processArray(data, 1, (a, b) -&gt; a * b);
        System.out.println("Product: " + product);
        
        // Find minimum
        int min = processArray(data, Integer.MAX_VALUE, 
            (a, b) -&gt; a &lt; b ? a : b);
        System.out.println("Minimum: " + min);
    }
}

This example demonstrates using IntBinaryOperator in a custom accumulator.
The processArray method applies the operator to all elements. We reuse the
same method for different operations by passing different operators.

## Source

[Java IntBinaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/IntBinaryOperator.html)

In this article, we've covered the essential methods and features of the Java
IntBinaryOperator interface. Understanding these concepts is crucial for
functional programming with primitive types in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).