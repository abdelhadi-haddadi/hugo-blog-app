+++
title = "Java BooleanSupplier Interface"
date = 2025-08-29T19:58:46.471+01:00
draft = false
description = "Complete Java BooleanSupplier interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BooleanSupplier Interface

Last modified: April 16, 2025

 

The java.util.function.BooleanSupplier interface represents a
supplier of boolean-valued results. It is a functional interface with a single
abstract method getAsBoolean. BooleanSupplier doesn't accept any
arguments but produces a boolean result.

BooleanSupplier is part of Java's functional programming utilities
added in Java 8. It's useful when you need to lazily evaluate or generate
boolean conditions. The interface is often used with lambda expressions and
method references.

## BooleanSupplier Interface Overview

BooleanSupplier interface contains one abstract method. Unlike
other functional interfaces, it doesn't provide default or static methods. Its
simplicity makes it easy to use for boolean value generation.

@FunctionalInterface
public interface BooleanSupplier {
    boolean getAsBoolean();
}

The code above shows the structure of BooleanSupplier interface.
It's annotated with @FunctionalInterface to indicate its single abstract method
nature. The interface doesn't use generics as it always returns a primitive
boolean.

## Basic BooleanSupplier Usage

The simplest way to use BooleanSupplier is with lambda expressions. We define
how to generate the boolean value in the getAsBoolean method. The example shows
random boolean generation.

Main.java
  

package com.zetcode;

import java.util.function.BooleanSupplier;
import java.util.Random;

public class Main {

    public static void main(String[] args) {

        // Create a random boolean supplier
        BooleanSupplier randomBoolean = () -&gt; new Random().nextBoolean();
        
        // Get several random values
        System.out.println("Random boolean 1: " + randomBoolean.getAsBoolean());
        System.out.println("Random boolean 2: " + randomBoolean.getAsBoolean());
        System.out.println("Random boolean 3: " + randomBoolean.getAsBoolean());
        
        // Simple condition supplier
        BooleanSupplier isEvening = () -&gt; java.time.LocalTime.now().getHour() &gt; 18;
        System.out.println("Is evening? " + isEvening.getAsBoolean());
    }
}

This example demonstrates basic BooleanSupplier usage with lambda expressions.
The randomBoolean supplier generates random true/false values. The isEvening
supplier checks if current time is after 6 PM. Each call to getAsBoolean
re-evaluates the condition.

## BooleanSupplier with Method Reference

BooleanSupplier can be implemented using method references when existing methods
match its signature. This provides more concise syntax for boolean-returning
methods without parameters.

Main.java
  

package com.zetcode;

import java.util.function.BooleanSupplier;

public class Main {
    
    private static boolean checkSystemStatus() {
        // Simulate some system check
        return Math.random() &gt; 0.5;
    }
    
    private boolean isDatabaseConnected() {
        // Simulate database connection check
        return true;
    }

    public static void main(String[] args) {

        // Static method reference
        BooleanSupplier statusCheck = Main::checkSystemStatus;
        System.out.println("System status: " + statusCheck.getAsBoolean());
        
        // Instance method reference
        Main main = new Main();
        BooleanSupplier dbCheck = main::isDatabaseConnected;
        System.out.println("Database connected: " + dbCheck.getAsBoolean());
    }
}

This example shows BooleanSupplier with method references. The statusCheck uses
a static method reference, while dbCheck uses an instance method reference.
Method references provide cleaner syntax when existing methods match the
functional interface.

## BooleanSupplier in Conditional Execution

BooleanSupplier is useful for lazy evaluation of conditions. The boolean value
is only computed when needed, which can improve performance in some scenarios.

Main.java
  

package com.zetcode;

import java.util.function.BooleanSupplier;

public class Main {

    public static void main(String[] args) {

        // Expensive condition check
        BooleanSupplier hasEnoughResources = () -&gt; {
            System.out.println("Checking resources...");
            // Simulate expensive computation
            try { Thread.sleep(1000); } catch (InterruptedException e) {}
            return Runtime.getRuntime().freeMemory() &gt; 100_000_000;
        };
        
        // Condition is only evaluated when needed
        System.out.println("Starting operation...");
        
        if (hasEnoughResources.getAsBoolean()) {
            System.out.println("Operation completed");
        } else {
            System.out.println("Insufficient resources");
        }
    }
}

This example demonstrates lazy evaluation with BooleanSupplier. The expensive
resource check is only performed when getAsBoolean is called. This pattern is
useful when condition evaluation is costly and might not always be needed.

## BooleanSupplier in Optional

BooleanSupplier can be used with Optional's filter method to create conditional
logic. This allows for more expressive filtering of Optional values based on
dynamic conditions.

Main.java
  

package com.zetcode;

import java.util.Optional;
import java.util.function.BooleanSupplier;

public class Main {

    public static void main(String[] args) {

        Optional name = Optional.of("Alice");
        
        // Dynamic condition supplier
        BooleanSupplier isLongName = () -&gt; name.get().length() &gt; 4;
        
        // Use supplier in Optional filter
        name.filter(n -&gt; isLongName.getAsBoolean())
            .ifPresent(n -&gt; System.out.println(n + " has a long name"));
            
        // Another example with different condition
        BooleanSupplier isVowelStart = () -&gt; {
            String first = name.get().substring(0, 1).toLowerCase();
            return "aeiou".contains(first);
        };
        
        name.filter(n -&gt; isVowelStart.getAsBoolean())
            .ifPresent(n -&gt; System.out.println(n + " starts with vowel"));
    }
}

This example shows BooleanSupplier used with Optional. The isLongName supplier
checks name length dynamically. The isVowelStart supplier checks the first
letter. Both conditions are evaluated only when needed during Optional
processing.

## BooleanSupplier for Configuration Checks

BooleanSupplier is ideal for configuration or feature flag checks. The actual
check implementation can be changed without modifying client code that uses
the supplier.

Main.java
  

package com.zetcode;

import java.util.function.BooleanSupplier;

public class Main {
    
    private static boolean isFeatureEnabledInDB() {
        // Simulate database check
        return true;
    }
    
    private static boolean isFeatureEnabledInConfig() {
        // Simulate config file check
        return false;
    }

    public static void main(String[] args) {

        // Choose implementation strategy
        BooleanSupplier featureCheck = args.length &gt; 0 ? 
            Main::isFeatureEnabledInDB : 
            Main::isFeatureEnabledInConfig;
        
        if (featureCheck.getAsBoolean()) {
            System.out.println("Feature is enabled");
            // Execute feature code
        } else {
            System.out.println("Feature is disabled");
        }
    }
}

This example demonstrates using BooleanSupplier for feature flags. The actual
check implementation (database vs config file) can be swapped easily. Client
code only depends on the BooleanSupplier interface, not the implementation.

## BooleanSupplier in Stream Operations

BooleanSupplier can be used with streams to control operations or filtering.
While less common than other functional interfaces, it's useful for dynamic
stream control.

Main.java
  

package com.zetcode;

import java.util.function.BooleanSupplier;
import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {

        // Dynamic limit for stream processing
        BooleanSupplier processMore = () -&gt; Math.random() &gt; 0.3;
        
        IntStream.iterate(1, i -&gt; i + 1)
            .takeWhile(i -&gt; processMore.getAsBoolean())
            .limit(10) // safety limit
            .forEach(System.out::println);
            
        // Another example with filtering
        BooleanSupplier includeNegatives = () -&gt; System.currentTimeMillis() % 2 == 0;
        
        IntStream.of(-5, -3, -1, 0, 1, 3, 5)
            .filter(i -&gt; i &gt;= 0 || includeNegatives.getAsBoolean())
            .forEach(System.out::println);
    }
}

This example shows BooleanSupplier in stream operations. The processMore
supplier randomly stops processing. The includeNegatives supplier toggles
based on current time. Both demonstrate dynamic stream control based on
boolean conditions.

## BooleanSupplier for Retry Logic

BooleanSupplier works well for implementing retry logic patterns. It can
encapsulate the success condition check while remaining flexible about
implementation details.

Main.java
  

package com.zetcode;

import java.util.function.BooleanSupplier;

public class Main {
    
    private static int attemptCount = 0;

    public static void main(String[] args) {

        // Operation that might need retries
        BooleanSupplier operationSuccessful = () -&gt; {
            attemptCount++;
            System.out.println("Attempt " + attemptCount);
            // Simulate operation that might fail
            return Math.random() &gt; 0.7;
        };
        
        // Retry logic
        int maxAttempts = 5;
        while (!operationSuccessful.getAsBoolean() &amp;&amp; attemptCount &lt; maxAttempts) {
            System.out.println("Retrying...");
        }
        
        if (attemptCount &gt;= maxAttempts) {
            System.out.println("Operation failed after " + maxAttempts + " attempts");
        } else {
            System.out.println("Operation succeeded on attempt " + attemptCount);
        }
    }
}

This example demonstrates retry logic with BooleanSupplier. The operationSuccessful
supplier simulates an operation that might fail. The retry loop continues until
success or max attempts. The condition check is cleanly encapsulated in the
supplier.

## Source

[Java BooleanSupplier Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/BooleanSupplier.html)

In this article, we've covered the essential usage patterns of the Java
BooleanSupplier interface. Understanding these concepts helps in writing more
flexible and expressive condition-checking code in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).