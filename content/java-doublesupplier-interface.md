+++
title = "Java DoubleSupplier Interface"
date = 2025-08-29T19:58:48.661+01:00
draft = false
description = "Complete Java DoubleSupplier interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DoubleSupplier Interface

Last modified: April 16, 2025

 

The java.util.function.DoubleSupplier interface represents a supplier
of double-valued results. It is a functional interface with a single abstract
method getAsDouble. This interface requires no input arguments.

DoubleSupplier is part of Java's functional programming utilities
added in Java 8. It is useful when you need to generate or supply double values
without any input. The interface is often used in lazy evaluation scenarios.

## DoubleSupplier Interface Overview

DoubleSupplier interface contains one abstract method. The key
method getAsDouble returns a double value. There are no default
or static methods in this interface.

@FunctionalInterface
public interface DoubleSupplier {
    double getAsDouble();
}

The code above shows the simple structure of DoubleSupplier. It is
annotated with @FunctionalInterface to indicate its single abstract method
nature. The interface is specialized for primitive double values.

## Basic DoubleSupplier Usage

The simplest way to use DoubleSupplier is with lambda expressions. We define how
to generate the double value in the getAsDouble method. The example supplies
random numbers.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;

public class Main {

    public static void main(String[] args) {

        // Define a supplier that generates random numbers
        DoubleSupplier randomSupplier = () -&gt; Math.random();
        
        // Get values from the supplier
        System.out.println("Random 1: " + randomSupplier.getAsDouble());
        System.out.println("Random 2: " + randomSupplier.getAsDouble());
        
        // Supplier with fixed value
        DoubleSupplier fixedSupplier = () -&gt; 3.1415;
        System.out.println("Fixed value: " + fixedSupplier.getAsDouble());
    }
}

This example demonstrates basic DoubleSupplier usage with lambda expressions.
The randomSupplier generates new random numbers each time it's called. The
fixedSupplier always returns the same value. Suppliers are lazy evaluated.

## DoubleSupplier with Method Reference

Method references provide a concise way to create DoubleSupplier instances when
existing methods match the interface. This works for methods that take no
parameters and return double.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;

public class Main {

    public static void main(String[] args) {

        // Create a supplier using method reference
        DoubleSupplier piSupplier = Math::PI;
        DoubleSupplier nanSupplier = Double::NaN;
        
        System.out.println("PI value: " + piSupplier.getAsDouble());
        System.out.println("NaN value: " + nanSupplier.getAsDouble());
        
        // Instance method reference
        Random random = new Random();
        DoubleSupplier randomSupplier = random::nextDouble;
        System.out.println("Random from instance: " + randomSupplier.getAsDouble());
    }
}

This example shows DoubleSupplier creation via method references. We use static
methods from Math and Double classes, and an instance method from Random. Method
references make the code more concise and readable.

## DoubleSupplier in Stream Generation

DoubleSupplier is useful for generating infinite streams of double values. The
DoubleStream.generate method accepts a DoubleSupplier to produce
stream elements. This enables lazy generation of values.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;
import java.util.stream.DoubleStream;

public class Main {

    public static void main(String[] args) {

        // Create a supplier for sequence numbers
        double[] counter = {0.0};
        DoubleSupplier sequenceSupplier = () -&gt; counter[0] += 1.0;
        
        // Generate stream of 5 sequence numbers
        DoubleStream.generate(sequenceSupplier)
            .limit(5)
            .forEach(System.out::println);
            
        // Random numbers stream
        DoubleStream.generate(Math::random)
            .limit(3)
            .forEach(d -&gt; System.out.printf("Random: %.4f%n", d));
    }
}

This example demonstrates DoubleSupplier in stream generation. We create a
sequence supplier that increments a counter and a random number supplier. The
stream is limited to avoid infinite processing. Each element is generated on
demand.

## Lazy Evaluation with DoubleSupplier

DoubleSupplier enables lazy evaluation by deferring value generation until
needed. This is useful for expensive computations or when values might not be
used. The supplier acts as a value factory.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;

public class Main {

    public static void main(String[] args) {

        // Expensive computation wrapped in supplier
        DoubleSupplier expensiveCalc = () -&gt; {
            System.out.println("Performing expensive calculation...");
            try {
                Thread.sleep(1000); // Simulate long computation
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return Math.PI * Math.E;
        };
        
        System.out.println("Supplier created, but no calculation yet");
        
        // Only calculate when actually needed
        if (args.length &gt; 0) {
            System.out.println("Result: " + expensiveCalc.getAsDouble());
        }
    }
}

This example shows lazy evaluation with DoubleSupplier. The expensive calculation
is only performed when getAsDouble() is called. Without the supplier, the
computation would happen immediately during initialization. Lazy evaluation
improves performance.

## DoubleSupplier for Configuration Values

DoubleSupplier can provide flexible configuration values. The actual value can
change between calls or be determined at runtime. This is useful for dynamic
configuration systems.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {

        // Time-based discount factor
        DoubleSupplier discountSupplier = () -&gt; {
            int hour = LocalTime.now().getHour();
            return hour &gt;= 20 || hour &lt; 6 ? 0.9 : 1.0; // 10% discount at night
        };
        
        System.out.println("Current discount factor: " + discountSupplier.getAsDouble());
        
        // Environment-based configuration
        DoubleSupplier configSupplier = () -&gt; 
            "prod".equals(System.getenv("APP_ENV")) ? 1.0 : 0.5;
            
        System.out.println("Config value: " + configSupplier.getAsDouble());
    }
}

This example demonstrates DoubleSupplier for dynamic configuration. The discount
supplier changes value based on current time. The config supplier reads from
environment variables. Suppliers enable runtime value determination.

## Combining DoubleSuppliers

While DoubleSupplier has no built-in composition methods, we can combine
suppliers manually to create more complex value generators. This allows building
sophisticated suppliers from simple ones.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;

public class Main {

    public static void main(String[] args) {

        // Base suppliers
        DoubleSupplier randomSupplier = Math::random;
        DoubleSupplier fixedSupplier = () -&gt; 10.0;
        
        // Combined supplier - average of random and fixed
        DoubleSupplier averageSupplier = () -&gt; 
            (randomSupplier.getAsDouble() + fixedSupplier.getAsDouble()) / 2;
            
        System.out.println("Average value: " + averageSupplier.getAsDouble());
        
        // Conditional supplier
        boolean useHighPrecision = true;
        DoubleSupplier precisionSupplier = useHighPrecision 
            ? () -&gt; Math.PI 
            : () -&gt; 3.14;
            
        System.out.println("PI value: " + precisionSupplier.getAsDouble());
    }
}

This example shows how to combine DoubleSuppliers. We create an average supplier
that combines two other suppliers. We also demonstrate a conditional supplier
that changes behavior based on a flag. Composition enables flexible value
generation.

## DoubleSupplier vs Other Suppliers

Java provides several supplier interfaces for different types. DoubleSupplier is
specialized for primitive doubles, avoiding boxing overhead. Other suppliers
like Supplier&lt;Double&gt; work with wrapper objects.

Main.java
  

package com.zetcode;

import java.util.function.DoubleSupplier;
import java.util.function.Supplier;

public class Main {

    public static void main(String[] args) {

        // Primitive double supplier
        DoubleSupplier primitiveSupplier = () -&gt; Math.random();
        
        // Wrapper Double supplier
        Supplier&lt;Double&gt; wrapperSupplier = () -&gt; Math.random();
        
        System.out.println("Primitive: " + primitiveSupplier.getAsDouble());
        System.out.println("Wrapper: " + wrapperSupplier.get());
        
        // Performance consideration
        long start = System.nanoTime();
        for (int i = 0; i &lt; 1_000_000; i++) {
            primitiveSupplier.getAsDouble();
        }
        System.out.println("Primitive time: " + (System.nanoTime() - start)/1_000_000 + " ms");
        
        start = System.nanoTime();
        for (int i = 0; i &lt; 1_000_000; i++) {
            wrapperSupplier.get();
        }
        System.out.println("Wrapper time: " + (System.nanoTime() - start)/1_000_000 + " ms");
    }
}

This example compares DoubleSupplier with Supplier&lt;Double&gt;. The primitive
version avoids boxing overhead and is more efficient for intensive numeric
operations. The wrapper version is needed when working with generic APIs.

## Source

[Java DoubleSupplier Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleSupplier.html)

In this article, we've covered the essential methods and features of the Java
DoubleSupplier interface. Understanding these concepts is crucial for functional
programming and efficient numeric operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).