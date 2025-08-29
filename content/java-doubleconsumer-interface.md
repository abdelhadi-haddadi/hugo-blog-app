+++
title = "Java DoubleConsumer Interface"
date = 2025-08-29T19:58:47.560+01:00
draft = false
description = "Complete Java DoubleConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DoubleConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.DoubleConsumer interface represents an
operation that accepts a single double-valued argument and returns no result.
It is a functional interface with a single abstract method accept.
DoubleConsumer is commonly used for operations that consume primitive double
values without returning anything.

DoubleConsumer is part of Java's functional programming utilities
added in Java 8. It enables behavior parameterization for double values and
helps write more concise code. The interface provides a default method for
consumer chaining.

## DoubleConsumer Interface Overview

DoubleConsumer interface contains one abstract method and one
default method. The key method accept performs the operation on
the input. The default method enables consumer chaining.

@FunctionalInterface
public interface DoubleConsumer {
    void accept(double value);
    
    default DoubleConsumer andThen(DoubleConsumer after);
}

The code above shows the structure of DoubleConsumer interface.
It operates on primitive double values. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic DoubleConsumer Usage

The simplest way to use DoubleConsumer is with lambda expressions. We define
what to do with the double value in the accept method. The example prints
double values with formatting.

Main.java
  

package com.zetcode;

import java.util.function.DoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer that prints formatted double values
        DoubleConsumer printFormatted = d -&gt; 
            System.out.printf("Value: %.2f%n", d);
        
        // Use the consumer
        printFormatted.accept(3.14159);
        printFormatted.accept(2.71828);
        
        // Consumer using method reference
        DoubleConsumer printer = System.out::println;
        printer.accept(1.41421);
    }
}

This example demonstrates basic DoubleConsumer usage with lambda and method
reference. The printFormatted consumer formats and prints doubles. The printer
consumer uses method reference to System.out.println for direct output.

## DoubleConsumer with andThen

The andThen method allows chaining consumers where each consumer
processes the same value in sequence. This enables creating complex processing
pipelines from simple consumers.

Main.java
  

package com.zetcode;

import java.util.function.DoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // First consumer logs the value
        DoubleConsumer logger = d -&gt; 
            System.out.println("Logging: " + d);
        
        // Second consumer calculates square
        DoubleConsumer squarer = d -&gt; 
            System.out.println("Square: " + (d * d));
        
        // Chain the consumers
        DoubleConsumer logThenSquare = logger.andThen(squarer);
        
        System.out.println("Processing 3.0:");
        logThenSquare.accept(3.0);
        
        System.out.println("\nProcessing 1.5:");
        logThenSquare.accept(1.5);
    }
}

This example shows consumer chaining with andThen. The input value
first gets logged, then squared. Both operations happen in sequence for each
value passed to the combined consumer.

## DoubleConsumer in Stream Processing

DoubleConsumer is commonly used with DoubleStream for processing primitive
double values. The forEach terminal operation accepts a DoubleConsumer to
process each stream element.

Main.java
  

package com.zetcode;

import java.util.stream.DoubleStream;

public class Main {

    public static void main(String[] args) {

        // Create a stream of double values
        DoubleStream values = DoubleStream.of(1.1, 2.2, 3.3, 4.4, 5.5);
        
        // Define a consumer that processes each value
        values.forEach(d -&gt; {
            double rounded = Math.round(d * 10) / 10.0;
            System.out.println("Original: " + d + ", Rounded: " + rounded);
        });
        
        // Another example with method reference
        DoubleStream.of(0.5, 1.5, 2.5).forEach(System.out::println);
    }
}

This example demonstrates DoubleConsumer usage in DoubleStream processing. We
define a consumer that rounds and prints each value. Method reference provides
a concise alternative for simple output operations.

## Storing State in DoubleConsumer

While generally discouraged for pure functions, consumers can maintain state
when needed. This example shows a consumer that tracks statistics about the
values it processes.

Main.java
  

package com.zetcode;

import java.util.function.DoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // Consumer that tracks statistics
        class StatsConsumer implements DoubleConsumer {
            private double sum = 0;
            private int count = 0;
            private double min = Double.MAX_VALUE;
            private double max = Double.MIN_VALUE;
            
            @Override
            public void accept(double value) {
                sum += value;
                count++;
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
            
            public void printStats() {
                System.out.printf("Count: %d, Sum: %.2f, Avg: %.2f%n", 
                    count, sum, sum/count);
                System.out.printf("Min: %.2f, Max: %.2f%n", min, max);
            }
        }
        
        StatsConsumer stats = new StatsConsumer();
        
        // Process some values
        stats.accept(5.5);
        stats.accept(3.2);
        stats.accept(7.8);
        stats.accept(1.1);
        
        // Print collected statistics
        stats.printStats();
    }
}

This example shows a stateful DoubleConsumer implementation. The StatsConsumer
tracks sum, count, min and max of processed values. While functional interfaces
are often stateless, this demonstrates their flexibility when needed.

## Combining DoubleConsumer with Other Functional Interfaces

DoubleConsumer can be effectively combined with other functional interfaces to
create more complex operations. This example shows pairing it with DoublePredicate.

Main.java
  

package com.zetcode;

import java.util.function.DoubleConsumer;
import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Predicate to check if value is positive
        DoublePredicate isPositive = d -&gt; d &gt; 0;
        
        // Consumer for positive values
        DoubleConsumer positiveConsumer = d -&gt; 
            System.out.println("Processing positive: " + d);
        
        // Consumer for negative values
        DoubleConsumer negativeConsumer = d -&gt; 
            System.out.println("Processing negative: " + d);
        
        // Combined processor
        DoubleConsumer processor = d -&gt; {
            if (isPositive.test(d)) {
                positiveConsumer.accept(d);
            } else {
                negativeConsumer.accept(d);
            }
        };
        
        // Test the processor
        processor.accept(3.14);
        processor.accept(-2.71);
        processor.accept(0.0);
    }
}

This example demonstrates combining DoubleConsumer with DoublePredicate. We
create different consumers for positive and negative values, then combine them
with a predicate check. This pattern enables conditional processing pipelines.

## DoubleConsumer in Real-World Scenario

This example shows a more practical use case where DoubleConsumer processes
temperature readings from a sensor, with validation and multiple processing
steps.

Main.java
  

package com.zetcode;

import java.util.function.DoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // Valid temperature range
        final double MIN_TEMP = -50.0;
        final double MAX_TEMP = 100.0;
        
        // Consumer to validate temperature
        DoubleConsumer validator = temp -&gt; {
            if (temp &lt; MIN_TEMP || temp &gt; MAX_TEMP) {
                throw new IllegalArgumentException(
                    String.format("Invalid temperature: %.1f", temp));
            }
        };
        
        // Consumer to convert to Fahrenheit
        DoubleConsumer fahrenheitConverter = temp -&gt; {
            double fahr = temp * 9/5 + 32;
            System.out.printf("%.1f°C = %.1f°F%n", temp, fahr);
        };
        
        // Consumer to check for extreme temperatures
        DoubleConsumer extremeChecker = temp -&gt; {
            if (temp &gt; 35.0) {
                System.out.println("WARNING: High temperature alert!");
            } else if (temp &lt; 0.0) {
                System.out.println("WARNING: Freezing temperature!");
            }
        };
        
        // Combined processing pipeline
        DoubleConsumer tempProcessor = validator
            .andThen(extremeChecker)
            .andThen(fahrenheitConverter);
        
        // Process some temperature readings
        double[] readings = {25.5, -1.2, 36.7, 150.0, -60.0};
        
        for (double temp : readings) {
            try {
                System.out.println("\nProcessing: " + temp);
                tempProcessor.accept(temp);
            } catch (IllegalArgumentException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}

This example demonstrates a realistic use of DoubleConsumer for temperature
processing. We chain validation, checking, and conversion operations. The
pipeline handles invalid values gracefully with exception handling.

## Source

[Java DoubleConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleConsumer.html)

In this article, we've covered the essential methods and features of the Java
DoubleConsumer interface. Understanding these concepts is crucial for processing
primitive double values in functional programming and stream operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).