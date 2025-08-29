+++
title = "Java IntUnaryOperator Interface"
date = 2025-08-29T19:58:52.101+01:00
draft = false
description = "Complete Java IntUnaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IntUnaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.IntUnaryOperator interface represents an
operation on a single int-valued operand that produces an int-valued result.
It is a functional interface with a single abstract method applyAsInt.

IntUnaryOperator is part of Java's functional programming utilities
added in Java 8. It is a specialization of UnaryOperator for the int primitive
type, avoiding autoboxing overhead. The interface provides default methods for
function composition.

## IntUnaryOperator Interface Overview

IntUnaryOperator contains one abstract method and two default
methods. The key method applyAsInt performs the operation on the
input. Other methods enable function composition.

@FunctionalInterface
public interface IntUnaryOperator {
    int applyAsInt(int operand);
    
    default IntUnaryOperator compose(IntUnaryOperator before);
    default IntUnaryOperator andThen(IntUnaryOperator after);
    static IntUnaryOperator identity();
}

The code above shows the structure of IntUnaryOperator interface.
It operates exclusively on primitive int values. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic IntUnaryOperator Usage

The simplest way to use IntUnaryOperator is with lambda expressions. We define
how to transform the input int to output int. The example squares the input.

Main.java
  

package com.zetcode;

import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Define an operator that squares its input
        IntUnaryOperator square = x -&gt; x * x;
        
        // Apply the operator
        System.out.println("Square of 5: " + square.applyAsInt(5));
        System.out.println("Square of 12: " + square.applyAsInt(12));
        
        // Operator using method reference
        IntUnaryOperator abs = Math::abs;
        System.out.println("Absolute of -8: " + abs.applyAsInt(-8));
    }
}

This example demonstrates basic IntUnaryOperator usage with lambda and method
reference. The square operator takes an int and returns its square. We apply it
to different values. Method reference provides concise syntax for existing methods.

## Function Composition with andThen

The andThen method allows chaining operators where the output of
one becomes input to the next. This enables creating complex operations from
simple ones.

Main.java
  

package com.zetcode;

import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // First operator increments by 1
        IntUnaryOperator increment = x -&gt; x + 1;
        
        // Second operator doubles the value
        IntUnaryOperator doubler = x -&gt; x * 2;
        
        // Compose the operators
        IntUnaryOperator incrementThenDouble = increment.andThen(doubler);
        
        System.out.println("Increment then double 5: " + incrementThenDouble.applyAsInt(5));
        System.out.println("Increment then double 10: " + incrementThenDouble.applyAsInt(10));
    }
}

This example shows operator composition with andThen. The input
first gets incremented by 1, then doubled. The order of operations is
left-to-right in the chain. Results show the transformation sequence.

## Function Composition with compose

The compose method is similar to andThen but executes
operators in reverse order. The parameter operator runs first, then the original
operator.

Main.java
  

package com.zetcode;

import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Operator to square a number
        IntUnaryOperator square = x -&gt; x * x;
        
        // Operator to subtract 5
        IntUnaryOperator subtractFive = x -&gt; x - 5;
        
        // Compose in different orders
        IntUnaryOperator subtractThenSquare = square.compose(subtractFive);
        IntUnaryOperator squareThenSubtract = square.andThen(subtractFive);
        
        System.out.println("Subtract 5 then square 10: " + subtractThenSquare.applyAsInt(10));
        System.out.println("Square then subtract 5 from 10: " + squareThenSubtract.applyAsInt(10));
    }
}

This example demonstrates the difference between compose and
andThen. With compose, subtraction happens before squaring.
With andThen, squaring happens before subtraction. The results differ
significantly.

## Using IntUnaryOperator with Streams

IntUnaryOperator is commonly used with Java Streams for primitive int
transformations. The map operation accepts an IntUnaryOperator to transform
stream elements. This enables efficient data processing.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        int[] numbers = {1, 2, 3, 4, 5};
        
        // Operator to calculate factorial
        IntUnaryOperator factorial = n -&gt; {
            int result = 1;
            for (int i = 2; i &lt;= n; i++) {
                result *= i;
            }
            return result;
        };
        
        // Apply operator in stream
        Arrays.stream(numbers)
            .map(factorial)
            .forEach(System.out::println);
    }
}

This example shows IntUnaryOperator usage in Streams. We define a factorial
operator and apply it to each stream element via map. The result is printed
for each transformed value. Primitive streams avoid boxing overhead.

## IntUnaryOperator Identity

The IntUnaryOperator.identity method returns an operator that
always returns its input argument. It's useful when an operation requires an
operator but you want to pass values unchanged.

Main.java
  

package com.zetcode;

import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Identity operator
        IntUnaryOperator identity = IntUnaryOperator.identity();
        
        System.out.println("Identity applied to 7: " + identity.applyAsInt(7));
        
        // Practical use in conditional processing
        IntUnaryOperator processor = x -&gt; x &gt; 10 ? x * 2 : identity.applyAsInt(x);
        
        System.out.println("Process 5: " + processor.applyAsInt(5));
        System.out.println("Process 15: " + processor.applyAsInt(15));
    }
}

This example demonstrates IntUnaryOperator.identity. The identity
operator returns its input unchanged. In conditional processing, it serves as
a no-op for values that don't meet transformation criteria.

## Combining Multiple IntUnaryOperators

We can combine multiple IntUnaryOperators to create complex transformations.
This approach promotes code reuse and modular design of operations.

Main.java
  

package com.zetcode;

import java.util.function.IntUnaryOperator;

public class Main {

    public static void main(String[] args) {

        // Basic operators
        IntUnaryOperator addTen = x -&gt; x + 10;
        IntUnaryOperator triple = x -&gt; x * 3;
        IntUnaryOperator halve = x -&gt; x / 2;
        
        // Complex combined operator
        IntUnaryOperator complexOp = addTen.andThen(triple).andThen(halve);
        
        System.out.println("Complex operation on 4: " + complexOp.applyAsInt(4));
        System.out.println("Complex operation on 10: " + complexOp.applyAsInt(10));
        
        // Alternative combination
        IntUnaryOperator altComplexOp = halve.compose(triple).compose(addTen);
        System.out.println("Alternative operation on 4: " + altComplexOp.applyAsInt(4));
    }
}

This example shows combining multiple IntUnaryOperators. We create basic
operations and chain them together. The complexOp adds 10, triples, then
halves the result. The order of operations matters significantly.

## Source

[Java IntUnaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/IntUnaryOperator.html)

In this article, we've covered the essential methods and features of the Java
IntUnaryOperator interface. Understanding these concepts is crucial for efficient
primitive-based functional programming in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).