+++
title = "Java LongSupplier Interface"
date = 2025-08-29T19:58:53.189+01:00
draft = false
description = "Complete Java LongSupplier interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LongSupplier Interface

Last modified: April 16, 2025

 

The java.util.function.LongSupplier interface represents a supplier
of long-valued results. It is a functional interface with a single abstract
method getAsLong. LongSupplier doesn't accept any arguments but
produces a long value.

LongSupplier is part of Java's functional programming utilities
added in Java 8. It's useful when you need to generate or supply long values
without input parameters. This interface is the primitive specialization of
Supplier for long values.

## LongSupplier Interface Overview

LongSupplier interface contains one abstract method that must be
implemented. The interface is annotated with @FunctionalInterface to indicate
its single abstract method nature.

@FunctionalInterface
public interface LongSupplier {
    long getAsLong();
}

The code above shows the simple structure of LongSupplier. It has
no default or static methods, just the single abstract method getAsLong that
returns a primitive long value.

## Basic LongSupplier Usage

The simplest way to use LongSupplier is with lambda expressions. We define how
to generate the long value in the getAsLong method. The example shows random
number generation.

Main.java
  

package com.zetcode;

import java.util.function.LongSupplier;

public class Main {

    public static void main(String[] args) {

        // Define a LongSupplier that returns random numbers
        LongSupplier randomSupplier = () -&gt; (long) (Math.random() * 1000);
        
        // Get and print several random values
        System.out.println("Random 1: " + randomSupplier.getAsLong());
        System.out.println("Random 2: " + randomSupplier.getAsLong());
        System.out.println("Random 3: " + randomSupplier.getAsLong());
    }
}

This example demonstrates basic LongSupplier usage with a lambda expression.
The randomSupplier generates random numbers between 0 and 1000. Each call to
getAsLong produces a new random value.

## LongSupplier with Method Reference

Method references provide a concise way to implement LongSupplier when an
existing method matches the interface's signature. This example uses
System.currentTimeMillis.

Main.java
  

package com.zetcode;

import java.util.function.LongSupplier;

public class Main {

    public static void main(String[] args) {

        // LongSupplier using method reference
        LongSupplier timeSupplier = System::currentTimeMillis;
        
        System.out.println("Current time: " + timeSupplier.getAsLong());
        
        // Wait a moment
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Time after delay: " + timeSupplier.getAsLong());
    }
}

This example shows LongSupplier implemented with a method reference. The
timeSupplier returns the current time in milliseconds. Method references
are often cleaner than equivalent lambda expressions.

## Stateful LongSupplier

LongSupplier implementations can maintain state between calls. This example
creates a counter that increments with each call to getAsLong.

Main.java
  

package com.zetcode;

import java.util.function.LongSupplier;

public class Main {

    public static void main(String[] args) {

        // Stateful LongSupplier
        LongSupplier counter = new LongSupplier() {
            private long count = 0;
            
            @Override
            public long getAsLong() {
                return ++count;
            }
        };
        
        System.out.println("Count 1: " + counter.getAsLong());
        System.out.println("Count 2: " + counter.getAsLong());
        System.out.println("Count 3: " + counter.getAsLong());
    }
}

This example demonstrates a stateful LongSupplier. The counter maintains
internal state (count) that persists between calls. Each getAsLong call
returns and increments the counter. Anonymous class syntax is used here.

## LongSupplier in Stream Generation

LongSupplier is useful with Stream.generate to create infinite streams of
long values. This example generates a stream of Fibonacci numbers.

Main.java
  

package com.zetcode;

import java.util.function.LongSupplier;
import java.util.stream.LongStream;

public class Main {

    public static void main(String[] args) {

        // Fibonacci sequence generator
        LongSupplier fibSupplier = new LongSupplier() {
            private long previous = 0;
            private long current = 1;
            
            @Override
            public long getAsLong() {
                long next = previous + current;
                previous = current;
                current = next;
                return previous;
            }
        };
        
        // Generate first 10 Fibonacci numbers
        LongStream.generate(fibSupplier)
            .limit(10)
            .forEach(System.out::println);
    }
}

This example shows LongSupplier used with LongStream.generate. The fibSupplier
generates Fibonacci numbers. The stream is limited to 10 elements and printed.
State is maintained between stream operations.

## Combining LongSuppliers

While LongSupplier doesn't have composition methods, we can combine them
manually to create more complex suppliers. This example averages two other
suppliers.

Main.java
  

package com.zetcode;

import java.util.function.LongSupplier;

public class Main {

    public static void main(String[] args) {

        // First supplier - system time modulo 1000
        LongSupplier timeSupplier = () -&gt; System.currentTimeMillis() % 1000;
        
        // Second supplier - random numbers
        LongSupplier randomSupplier = () -&gt; (long) (Math.random() * 1000);
        
        // Combined supplier - average of the two
        LongSupplier averageSupplier = () -&gt; 
            (timeSupplier.getAsLong() + randomSupplier.getAsLong()) / 2;
        
        System.out.println("Average 1: " + averageSupplier.getAsLong());
        System.out.println("Average 2: " + averageSupplier.getAsLong());
    }
}

This example demonstrates combining multiple LongSuppliers. The averageSupplier
returns the average of values from timeSupplier and randomSupplier. This pattern
allows building complex suppliers from simpler ones.

## LongSupplier for Constant Values

LongSupplier can be used to supply constant values, though this is more
idiomatic with lambda than with method reference. Here we supply a constant.

Main.java
  

package com.zetcode;

import java.util.function.LongSupplier;

public class Main {

    public static void main(String[] args) {

        // Constant value supplier
        LongSupplier constantSupplier = () -&gt; 42L;
        
        System.out.println("The answer: " + constantSupplier.getAsLong());
        
        // Another approach using lambda
        LongSupplier maxValueSupplier = () -&gt; Long.MAX_VALUE;
        System.out.println("Max long: " + maxValueSupplier.getAsLong());
    }
}

This example shows LongSupplier returning constant values. While simple, this
can be useful when an API expects a LongSupplier but you want to provide a
fixed value. The L suffix denotes long literals in Java.

## LongSupplier in Optional

LongSupplier is used with OptionalLong's orElseGet method to provide a
fallback value when the Optional is empty. This shows practical usage.

Main.java
  

package com.zetcode;

import java.util.OptionalLong;
import java.util.function.LongSupplier;

public class Main {

    public static void main(String[] args) {

        // Empty OptionalLong
        OptionalLong emptyOpt = OptionalLong.empty();
        
        // Supplier for default value
        LongSupplier defaultSupplier = () -&gt; {
            System.out.println("Providing default value");
            return 100L;
        };
        
        // Get value or default from supplier
        long value1 = emptyOpt.orElseGet(defaultSupplier);
        System.out.println("Value 1: " + value1);
        
        // Non-empty Optional
        OptionalLong presentOpt = OptionalLong.of(200L);
        long value2 = presentOpt.orElseGet(defaultSupplier);
        System.out.println("Value 2: " + value2);
    }
}

This example demonstrates LongSupplier used with OptionalLong. The defaultSupplier
provides a fallback value when the Optional is empty. The supplier is only
invoked when needed, making it efficient for expensive operations.

## Source

[Java LongSupplier Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/LongSupplier.html)

In this article, we've covered the essential features and usage patterns of the
Java LongSupplier interface. Understanding these concepts helps with functional
programming and stream processing in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).