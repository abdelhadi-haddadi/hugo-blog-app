+++
title = "Java Consumer Interface"
date = 2025-08-29T19:58:46.456+01:00
draft = false
description = "Complete Java Consumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Consumer Interface

Last modified: April 16, 2025

 

The java.util.function.Consumer interface represents an operation
that accepts a single input argument and returns no result. It is a functional
interface with a single abstract method accept. Consumer is used
for side-effect operations like printing or modifying objects.

Consumer is part of Java's functional programming utilities added
in Java 8. Unlike most functional interfaces, Consumer operations are meant to
produce side effects. The interface provides default methods for consumer
chaining.

## Consumer Interface Overview

Consumer interface contains one abstract method and one default
method. The key method accept performs the operation on the input.
The andThen method enables consumer chaining.

@FunctionalInterface
public interface Consumer&lt;T&gt; {
    void accept(T t);
    
    default Consumer&lt;T&gt; andThen(Consumer&lt;? super T&gt; after);
}

The code above shows the structure of Consumer interface. It uses
generics where T is the input type. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic Consumer Usage

The simplest way to use Consumer is with lambda expressions. We define what to
do with the input in the accept method. The example prints strings to console.

Main.java
  

package com.zetcode;

import java.util.function.Consumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer that prints strings
        Consumer&lt;String&gt; printer = s -&gt; System.out.println(s);
        
        // Use the consumer
        printer.accept("Hello, Consumer!");
        
        // Consumer using method reference
        Consumer&lt;String&gt; methodRefPrinter = System.out::println;
        methodRefPrinter.accept("Method reference consumer");
    }
}

This example demonstrates basic Consumer usage with lambda and method reference.
The printer consumer takes a String and prints it. Method reference provides
more concise syntax for existing methods that match Consumer's signature.

## Consumer with Collections

Consumer is commonly used with collections through the forEach
method. This enables clean iteration patterns without explicit loops. The
example processes a list of numbers.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Consumer to print numbers with prefix
        Consumer&lt;Integer&gt; numberPrinter = n -&gt; 
            System.out.println("Number: " + n);
        
        // Apply consumer to each element
        numbers.forEach(numberPrinter);
        
        // Inline consumer
        numbers.forEach(n -&gt; System.out.println(n * 2));
    }
}

This example shows Consumer usage with collections. We define a number printer
consumer and pass it to forEach. The second forEach demonstrates an inline
consumer. Both approaches process each collection element.

## Consumer Chaining with andThen

The andThen method allows chaining consumers where each consumer
processes the same input in sequence. This enables creating complex processing
pipelines from simple consumers.

Main.java
  

package com.zetcode;

import java.util.function.Consumer;

public class Main {

    public static void main(String[] args) {

        // First consumer logs the message
        Consumer&lt;String&gt; logger = s -&gt; 
            System.out.println("LOG: " + s);
        
        // Second consumer sends email notification
        Consumer&lt;String&gt; notifier = s -&gt; 
            System.out.println("Sending notification: " + s);
        
        // Chain the consumers
        Consumer&lt;String&gt; processor = logger.andThen(notifier);
        
        // Process a message
        processor.accept("System started successfully");
    }
}

This example shows consumer chaining with andThen. The input
message first gets logged, then triggers a notification. Both consumers
receive the same input. The order of execution is guaranteed.

## Modifying Objects with Consumer

Consumers are often used to modify object state. Since they accept arguments
but return nothing, they're perfect for mutating operations. The example
updates product prices.

Main.java
  

package com.zetcode;

import java.util.function.Consumer;

class Product {
    String name;
    double price;
    
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return name + ": $" + price;
    }
}

public class Main {

    public static void main(String[] args) {

        Product laptop = new Product("Laptop", 999.99);
        
        // Consumer to apply discount
        Consumer&lt;Product&gt; discount = p -&gt; 
            p.price = p.price * 0.9; // 10% discount
        
        System.out.println("Before: " + laptop);
        discount.accept(laptop);
        System.out.println("After: " + laptop);
    }
}

This example demonstrates object modification with Consumer. The discount
consumer takes a Product and reduces its price by 10%. Consumers are ideal
for such state-changing operations while keeping code clean.

## BiConsumer Interface

While Consumer takes one argument, BiConsumer handles two inputs.
It's useful when operations need two parameters. The example processes key-value
pairs.

Main.java
  

package com.zetcode;

import java.util.function.BiConsumer;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; ages = new HashMap&lt;&gt;();
        ages.put("John", 25);
        ages.put("Jane", 30);
        ages.put("Bob", 35);
        
        // BiConsumer to print key-value pairs
        BiConsumer&lt;String, Integer&gt; agePrinter = 
            (name, age) -&gt; System.out.println(name + " is " + age + " years old");
        
        // Process each map entry
        ages.forEach(agePrinter);
        
        // Inline BiConsumer
        ages.forEach((k, v) -&gt; System.out.println(k + ": " + v));
    }
}

This example shows BiConsumer usage. The agePrinter takes both
map key and value. Map's forEach expects a BiConsumer. We demonstrate both
named and inline BiConsumer variants.

## Specialized Consumers

Java provides specialized Consumer interfaces for primitive types to avoid
boxing overhead. These include IntConsumer, DoubleConsumer,
and LongConsumer. The example uses primitive consumers.

Main.java
  

package com.zetcode;

import java.util.function.IntConsumer;
import java.util.function.DoubleConsumer;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        int[] integers = {1, 2, 3, 4, 5};
        double[] doubles = {1.1, 2.2, 3.3, 4.4, 5.5};
        
        // IntConsumer example
        IntConsumer squarePrinter = i -&gt; 
            System.out.println(i + " squared is " + (i * i));
        
        Arrays.stream(integers).forEach(squarePrinter);
        
        // DoubleConsumer example
        DoubleConsumer rounder = d -&gt; 
            System.out.println(d + " rounded is " + Math.round(d));
        
        Arrays.stream(doubles).forEach(rounder);
    }
}

This example demonstrates primitive-specialized consumers. IntConsumer processes
int values without boxing. DoubleConsumer handles double values. These
specializations improve performance for primitive-heavy operations.

## Source

[Java Consumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html)

In this article, we've covered the essential methods and features of the Java
Consumer interface. Understanding these concepts is crucial for functional
programming and collection processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).