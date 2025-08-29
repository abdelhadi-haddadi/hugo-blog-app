+++
title = "Java IntConsumer Interface"
date = 2025-08-29T19:58:49.770+01:00
draft = false
description = "Complete Java IntConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IntConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.IntConsumer interface represents an operation
that accepts a single int-valued argument and returns no result. It is a
functional interface with a single abstract method accept.

IntConsumer is part of Java's functional programming utilities added
in Java 8. It is the primitive specialization of Consumer for int.
This avoids autoboxing overhead when working with primitive int values.

## IntConsumer Interface Overview

IntConsumer interface contains one abstract method and one default
method. The key method accept performs the operation on the input.
The andThen method enables chaining of consumers.

@FunctionalInterface
public interface IntConsumer {
    void accept(int value);
    
    default IntConsumer andThen(IntConsumer after);
}

The code above shows the structure of IntConsumer interface. It is
annotated with @FunctionalInterface to indicate its single abstract method
nature. The interface is designed for side-effect operations on int values.

## Basic IntConsumer Usage

The simplest way to use IntConsumer is with lambda expressions. We define what
to do with the input int value in the accept method. The example prints numbers.

Main.java
  

package com.zetcode;

import java.util.function.IntConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer that prints the number
        IntConsumer printNumber = n -&gt; System.out.println("Number: " + n);
        
        // Use the consumer
        printNumber.accept(5);
        printNumber.accept(10);
        
        // Consumer that squares the number and prints
        IntConsumer squareAndPrint = n -&gt; System.out.println(n + " squared: " + n * n);
        squareAndPrint.accept(4);
    }
}

This example demonstrates basic IntConsumer usage with lambda expressions. The
printNumber consumer simply prints the input value. The squareAndPrint consumer
performs a calculation before printing. Consumers are useful for side effects.

## Chaining Consumers with andThen

The andThen method allows chaining consumers where each consumer
processes the same input value in sequence. This enables modular side effects.

Main.java
  

package com.zetcode;

import java.util.function.IntConsumer;

public class Main {

    public static void main(String[] args) {

        // First consumer prints the number
        IntConsumer print = n -&gt; System.out.println("Original: " + n);
        
        // Second consumer prints the number doubled
        IntConsumer printDouble = n -&gt; System.out.println("Doubled: " + n * 2);
        
        // Chain the consumers
        IntConsumer combined = print.andThen(printDouble);
        
        // Execute the chain
        combined.accept(7);
        combined.accept(12);
    }
}

This example shows consumer chaining with andThen. The same input
value (7 and 12) flows through both consumers. Each consumer performs its
operation independently. The order of execution is guaranteed.

## IntConsumer with Streams

IntConsumer is commonly used with IntStream for processing primitive int values.
The forEach method accepts an IntConsumer to process each element.

Main.java
  

package com.zetcode;

import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {

        // Create a range of numbers
        IntStream numbers = IntStream.rangeClosed(1, 5);
        
        // Define a consumer that processes each number
        numbers.forEach(n -&gt; {
            System.out.println("Processing: " + n);
            System.out.println("Square root: " + Math.sqrt(n));
        });
        
        // Another example with method reference
        IntStream.of(10, 20, 30).forEach(System.out::println);
    }
}

This example demonstrates IntConsumer usage with IntStream. The lambda passed to
forEach is an IntConsumer that processes each stream element. Method references
can also be used when the operation matches an existing method.

## Stateful IntConsumer

While generally discouraged, IntConsumers can maintain state. This example shows
a consumer that tracks and reports statistics about the numbers it processes.

Main.java
  

package com.zetcode;

import java.util.function.IntConsumer;

public class Main {

    public static void main(String[] args) {

        // Stateful consumer that tracks statistics
        class StatsConsumer implements IntConsumer {
            private int count = 0;
            private int sum = 0;
            private int min = Integer.MAX_VALUE;
            private int max = Integer.MIN_VALUE;
            
            @Override
            public void accept(int value) {
                count++;
                sum += value;
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
            
            public void printStats() {
                System.out.println("Count: " + count);
                System.out.println("Sum: " + sum);
                System.out.println("Min: " + (count &gt; 0 ? min : "N/A"));
                System.out.println("Max: " + (count &gt; 0 ? max : "N/A"));
            }
        }
        
        StatsConsumer stats = new StatsConsumer();
        IntStream.of(5, 10, 2, 8, 3).forEach(stats);
        stats.printStats();
    }
}

This example shows a stateful IntConsumer implementation. The StatsConsumer
tracks count, sum, min and max of processed values. While functional, such
stateful consumers should be used carefully in parallel streams.

## IntConsumer in Collections

IntConsumer can be used with collections containing primitive int values. This
example demonstrates processing an int array with a consumer.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.IntConsumer;

public class Main {

    public static void main(String[] args) {

        int[] temperatures = {22, 25, 19, 30, 17};
        
        // Consumer that checks for extreme temperatures
        IntConsumer tempChecker = temp -&gt; {
            if (temp &gt; 28) {
                System.out.println("Heat warning: " + temp + "°C");
            } else if (temp &lt; 20) {
                System.out.println("Cold warning: " + temp + "°C");
            }
        };
        
        // Process all temperatures
        Arrays.stream(temperatures).forEach(tempChecker);
        
        // Another example with array modification
        int[] squares = new int[temperatures.length];
        IntConsumer squareStorer = i -&gt; squares[i] = temperatures[i] * temperatures[i];
        for (int i = 0; i &lt; temperatures.length; i++) {
            squareStorer.accept(i);
        }
        System.out.println("Squares: " + Arrays.toString(squares));
    }
}

This example shows IntConsumer usage with arrays. The tempChecker analyzes each
temperature value. The squareStorer demonstrates how consumers can work with
array indices. Consumers provide flexible processing of primitive values.

## Combining IntConsumer with Other Functional Interfaces

IntConsumer can be combined with other functional interfaces like IntPredicate
or IntFunction to create more complex processing pipelines.

Main.java
  

package com.zetcode;

import java.util.function.IntConsumer;
import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Predicate to check for even numbers
        IntPredicate isEven = n -&gt; n % 2 == 0;
        
        // Consumer for even numbers
        IntConsumer evenProcessor = n -&gt; System.out.println("Even: " + n);
        
        // Consumer for odd numbers
        IntConsumer oddProcessor = n -&gt; System.out.println("Odd: " + n);
        
        // Process numbers with conditional logic
        IntStream.range(1, 6).forEach(n -&gt; {
            if (isEven.test(n)) {
                evenProcessor.accept(n);
            } else {
                oddProcessor.accept(n);
            }
        });
        
        // Another example with IntFunction and IntConsumer
        java.util.function.IntFunction intToString = Integer::toString;
        IntConsumer printHex = n -&gt; System.out.println("Hex: " + Integer.toHexString(n));
        
        IntStream.of(10, 20, 30)
            .mapToObj(intToString)
            .forEach(s -&gt; System.out.println("String: " + s));
            
        IntStream.of(10, 20, 30).forEach(printHex);
    }
}

This example shows IntConsumer working with other functional interfaces. The
first part demonstrates conditional processing with IntPredicate. The second
part shows integration with IntFunction in a stream pipeline. Such combinations
enable powerful data processing patterns.

## Source

[Java IntConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/IntConsumer.html)

In this article, we've covered the essential methods and features of the Java
IntConsumer interface. Understanding these concepts is crucial for efficient
processing of primitive int values in functional Java programming.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).