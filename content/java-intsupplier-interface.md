+++
title = "Java IntSupplier Interface"
date = 2025-08-29T19:58:50.982+01:00
draft = false
description = "Complete Java IntSupplier interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IntSupplier Interface

Last modified: April 16, 2025

 

The java.util.function.IntSupplier interface represents a supplier
of integer-valued results. It is a functional interface with a single abstract
method getAsInt. IntSupplier doesn't accept any arguments but
produces an int value.

IntSupplier is part of Java's functional programming utilities
added in Java 8. It's a primitive specialization of Supplier for int values.
This avoids autoboxing overhead when working with primitive integers.

## IntSupplier Interface Overview

IntSupplier interface contains one abstract method. The key method
getAsInt returns an integer value without taking any input. There
are no default or static methods in this interface.

@FunctionalInterface
public interface IntSupplier {
    int getAsInt();
}

The code above shows the simple structure of IntSupplier. It's
annotated with @FunctionalInterface to indicate its single abstract method
nature. The interface is designed for efficient primitive int operations.

## Basic IntSupplier Usage

The simplest way to use IntSupplier is with lambda expressions. We define how to
generate the integer value in the getAsInt method. The example shows random
number generation.

Main.java
  

package com.zetcode;

import java.util.function.IntSupplier;
import java.util.concurrent.ThreadLocalRandom;

public class Main {

    public static void main(String[] args) {

        // Define a supplier that generates random numbers
        IntSupplier randomSupplier = () -&gt; ThreadLocalRandom.current().nextInt(1, 101);
        
        // Get values from supplier
        System.out.println("Random number: " + randomSupplier.getAsInt());
        System.out.println("Random number: " + randomSupplier.getAsInt());
        
        // Supplier with constant value
        IntSupplier constantSupplier = () -&gt; 42;
        System.out.println("Constant value: " + constantSupplier.getAsInt());
    }
}

This example demonstrates basic IntSupplier usage with lambda expressions. The
randomSupplier generates numbers between 1-100. Each call to getAsInt produces
a new value. The constantSupplier always returns the same value.

## IntSupplier with Method Reference

Method references provide a concise way to create IntSupplier instances when
working with methods that match the interface's signature. This example uses
a class method as supplier.

Main.java
  

package com.zetcode;

import java.util.function.IntSupplier;

public class Main {
    
    private static int getCounter() {
        return Counter.getCount();
    }

    public static void main(String[] args) {

        // Using method reference as IntSupplier
        IntSupplier counterSupplier = Main::getCounter;
        
        System.out.println("Counter value: " + counterSupplier.getAsInt());
        System.out.println("Counter value: " + counterSupplier.getAsInt());
    }
}

class Counter {
    private static int count = 0;
    
    public static int getCount() {
        return ++count;
    }
}

This example shows IntSupplier created via method reference. The getCounter
method matches IntSupplier's functional signature. Each call to getAsInt
invokes the method, returning incremented counter values.

## IntSupplier for Lazy Evaluation

IntSupplier is useful for lazy evaluation scenarios where value generation is
expensive. The computation happens only when getAsInt is called, not when the
supplier is created.

Main.java
  

package com.zetcode;

import java.util.function.IntSupplier;

public class Main {

    public static void main(String[] args) {

        // Expensive computation wrapped in supplier
        IntSupplier expensiveValue = () -&gt; {
            System.out.println("Performing expensive calculation...");
            try {
                Thread.sleep(1000); // Simulate long computation
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return 12345;
        };
        
        System.out.println("Supplier created, computation not done yet");
        System.out.println("Value: " + expensiveValue.getAsInt());
    }
}

This example demonstrates lazy evaluation with IntSupplier. The expensive
computation is deferred until getAsInt is called. The supplier can be passed
around without triggering the computation until needed.

## IntSupplier in Stream Generation

IntSupplier can be used with Stream.generate to create infinite streams of
integer values. This is useful for generating sequences or random numbers.

Main.java
  

package com.zetcode;

import java.util.function.IntSupplier;
import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {

        // Fibonacci sequence supplier
        IntSupplier fibSupplier = new IntSupplier() {
            private int previous = 0;
            private int current = 1;
            
            @Override
            public int getAsInt() {
                int next = previous + current;
                previous = current;
                current = next;
                return previous;
            }
        };
        
        // Generate stream of Fibonacci numbers
        IntStream.generate(fibSupplier)
            .limit(10)
            .forEach(System.out::println);
    }
}

This example shows IntSupplier generating Fibonacci numbers. The supplier
maintains state between calls. We use it with IntStream.generate to create
an infinite stream, limited to first 10 numbers.

## Combining IntSupplier with Other Functional Interfaces

IntSupplier can be combined with other functional interfaces to create more
complex behaviors. This example shows composition with IntConsumer.

Main.java
  

package com.zetcode;

import java.util.function.IntConsumer;
import java.util.function.IntSupplier;

public class Main {
    
    public static void processValues(IntSupplier supplier, IntConsumer consumer, int count) {
        for (int i = 0; i &lt; count; i++) {
            consumer.accept(supplier.getAsInt());
        }
    }

    public static void main(String[] args) {

        // Supplier for squares
        IntSupplier squareSupplier = new IntSupplier() {
            private int n = 1;
            
            @Override
            public int getAsInt() {
                int result = n * n;
                n++;
                return result;
            }
        };
        
        // Consumer to print with formatting
        IntConsumer formattedPrinter = value -&gt; 
            System.out.printf("Processed value: %,d%n", value);
        
        // Process 5 values
        processValues(squareSupplier, formattedPrinter, 5);
    }
}

This example demonstrates combining IntSupplier with IntConsumer. The
processValues method takes both interfaces, generating and consuming values.
The squareSupplier produces square numbers while the consumer formats output.

## IntSupplier for Configuration Values

IntSupplier is useful for providing configurable values that might change
between calls. The supplier can encapsulate logic for value determination.

Main.java
  

package com.zetcode;

import java.util.function.IntSupplier;

public class Main {
    
    private static class ConfigManager {
        private static int threshold = 10;
        
        public static IntSupplier getThresholdSupplier() {
            return () -&gt; {
                // Simulate dynamic configuration
                threshold = (threshold * 2) % 50;
                return threshold;
            };
        }
    }

    public static void main(String[] args) {

        IntSupplier thresholdSupplier = ConfigManager.getThresholdSupplier();
        
        for (int i = 0; i &lt; 5; i++) {
            System.out.println("Current threshold: " + thresholdSupplier.getAsInt());
        }
    }
}

This example shows IntSupplier providing dynamic configuration values. The
threshold value changes each time it's requested. The supplier encapsulates
the logic for determining the current threshold value.

## Source

[Java IntSupplier Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/IntSupplier.html)

In this article, we've covered the essential methods and features of the Java
IntSupplier interface. Understanding these concepts is crucial for functional
programming and efficient primitive operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).