+++
title = "Java Supplier Interface"
date = 2025-08-29T19:58:55.437+01:00
draft = false
description = "Complete Java Supplier interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Supplier Interface

Last modified: April 16, 2025

 

The java.util.function.Supplier interface represents a supplier of
results. It is a functional interface with a single abstract method
get. Supplier doesn't accept any arguments but produces a value.

Supplier is part of Java's functional programming utilities added
in Java 8. It is useful for lazy evaluation, object creation, and value
generation scenarios. The interface is often used with Optional and Streams.

## Supplier Interface Overview

Supplier interface contains one abstract method and no default
methods. The key method get returns a result without taking any
input parameters. It's a pure producer of values.

@FunctionalInterface
public interface Supplier&lt;T&gt; {
    T get();
}

The code above shows the simple structure of Supplier interface.
It uses generics where T is the type of results supplied. The interface is
annotated with @FunctionalInterface to indicate its single abstract method.

## Basic Supplier Usage

The simplest way to use Supplier is with lambda expressions. We define how to
generate values in the get method. The example supplies random numbers.

Main.java
  

package com.zetcode;

import java.util.function.Supplier;
import java.util.Random;

public class Main {

    public static void main(String[] args) {

        // Define a supplier for random numbers
        Supplier&lt;Integer&gt; randomSupplier = () -&gt; new Random().nextInt(100);
        
        // Get values from supplier
        System.out.println("Random 1: " + randomSupplier.get());
        System.out.println("Random 2: " + randomSupplier.get());
        
        // Supplier for current timestamp
        Supplier&lt;Long&gt; timeSupplier = System::currentTimeMillis;
        System.out.println("Current time: " + timeSupplier.get());
    }
}

This example demonstrates basic Supplier usage with lambda and method reference.
The randomSupplier generates random integers when get() is called. The
timeSupplier uses method reference to supply current timestamps.

## Supplier for Object Creation

Supplier is commonly used for object creation, especially when you need to
defer instantiation or create objects on demand. This enables lazy evaluation.

Main.java
  

package com.zetcode;

import java.util.function.Supplier;

class Product {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
        System.out.println("Creating product: " + name);
    }
    
    @Override
    public String toString() {
        return name + " ($" + price + ")";
    }
}

public class Main {

    public static void main(String[] args) {

        // Supplier for product creation
        Supplier&lt;Product&gt; productSupplier = () -&gt; new Product("Laptop", 999.99);
        
        System.out.println("Supplier defined, but product not created yet");
        
        // Only creates product when get() is called
        Product p1 = productSupplier.get();
        Product p2 = productSupplier.get();
        
        System.out.println("Products created: " + p1 + ", " + p2);
    }
}

This example shows Supplier used for deferred object creation. The Product
objects are only instantiated when get() is called. This demonstrates lazy
initialization pattern using Supplier.

## Supplier with Optional

Supplier is often used with Optional's orElseGet method to provide a fallback
value only when needed. This is more efficient than orElse when the fallback
is expensive to create.

Main.java
  

package com.zetcode;

import java.util.Optional;
import java.util.function.Supplier;

public class Main {

    public static void main(String[] args) {

        Optional&lt;String&gt; emptyOptional = Optional.empty();
        Optional&lt;String&gt; presentOptional = Optional.of("Hello");
        
        // Expensive fallback operation
        Supplier&lt;String&gt; fallbackSupplier = () -&gt; {
            System.out.println("Creating fallback value");
            return "Default Value";
        };
        
        // orElseGet uses Supplier (lazy)
        String value1 = emptyOptional.orElseGet(fallbackSupplier);
        String value2 = presentOptional.orElseGet(fallbackSupplier);
        
        System.out.println("Value 1: " + value1);
        System.out.println("Value 2: " + value2);
        
        // Compare with orElse (eager)
        String value3 = emptyOptional.orElse(fallbackSupplier.get());
    }
}

This example demonstrates Supplier with Optional. The fallbackSupplier only
executes when Optional is empty. Using orElseGet with Supplier is more
efficient than orElse when fallback creation is expensive.

## Supplier in Stream.generate()

The Stream.generate() method accepts a Supplier to create infinite streams.
This is useful for generating sequences of values where each is produced by
the Supplier.

Main.java
  

package com.zetcode;

import java.util.stream.Stream;
import java.util.function.Supplier;
import java.util.concurrent.ThreadLocalRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        // Supplier for random doubles between 0 and 1
        Supplier&lt;Double&gt; randomSupplier = 
            () -&gt; ThreadLocalRandom.current().nextDouble();
        
        // Generate infinite stream of random numbers
        List&lt;Double&gt; randoms = Stream.generate(randomSupplier)
            .limit(5)
            .collect(Collectors.toList());
            
        System.out.println("Random numbers: " + randoms);
        
        // Supplier for sequence numbers
        Supplier&lt;Integer&gt; sequenceSupplier = new Supplier&lt;&gt;() {
            private int next = 0;
            
            @Override
            public Integer get() {
                return next++;
            }
        };
        
        List&lt;Integer&gt; sequence = Stream.generate(sequenceSupplier)
            .limit(5)
            .collect(Collectors.toList());
            
        System.out.println("Sequence: " + sequence);
    }
}

This example shows Supplier used with Stream.generate(). The randomSupplier
produces random numbers, while sequenceSupplier maintains state to generate
a sequence. Both demonstrate infinite stream generation capabilities.

## Memoization with Supplier

Supplier can be used to implement memoization - caching the result of an
expensive computation and returning it on subsequent calls. This pattern
optimizes performance.

Main.java
  

package com.zetcode;

import java.util.function.Supplier;

public class Main {

    public static void main(String[] args) {

        // Expensive computation simulation
        Supplier&lt;String&gt; expensiveSupplier = () -&gt; {
            System.out.println("Performing expensive computation...");
            try {
                Thread.sleep(1000); // Simulate work
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Computed Result";
        };
        
        // Memoizing supplier
        Supplier&lt;String&gt; memoizedSupplier = new Supplier&lt;&gt;() {
            private String value;
            
            @Override
            public String get() {
                if (value == null) {
                    value = expensiveSupplier.get();
                }
                return value;
            }
        };
        
        System.out.println("First call (computes): " + memoizedSupplier.get());
        System.out.println("Second call (cached): " + memoizedSupplier.get());
    }
}

This example demonstrates memoization using Supplier. The expensive computation
only happens on the first get() call. Subsequent calls return the cached value.
This pattern is useful for expensive operations that produce the same result.

## Specialized Suppliers

Java provides specialized Supplier variants for primitive types to avoid boxing
overhead. These include BooleanSupplier, IntSupplier, LongSupplier, and
DoubleSupplier.

Main.java
  

package com.zetcode;

import java.util.function.*;

public class Main {

    public static void main(String[] args) {

        // BooleanSupplier example
        BooleanSupplier booleanSupplier = () -&gt; Math.random() &gt; 0.5;
        System.out.println("Random boolean: " + booleanSupplier.getAsBoolean());
        
        // IntSupplier example
        IntSupplier intSupplier = () -&gt; (int) (Math.random() * 100);
        System.out.println("Random int: " + intSupplier.getAsInt());
        
        // LongSupplier example
        LongSupplier longSupplier = System::currentTimeMillis;
        System.out.println("Current time: " + longSupplier.getAsLong());
        
        // DoubleSupplier example
        DoubleSupplier doubleSupplier = Math::random;
        System.out.println("Random double: " + doubleSupplier.getAsDouble());
    }
}

This example shows specialized Supplier interfaces. Each avoids boxing overhead
for its primitive type. They follow the same pattern as the generic Supplier
but with type-specific get methods (getAsBoolean, getAsInt, etc.).

## Source

[Java Supplier Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html)

In this article, we've covered the essential methods and features of the Java
Supplier interface. Understanding these concepts is crucial for functional
programming and efficient value generation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).