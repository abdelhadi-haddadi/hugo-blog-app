+++
title = "Java ObjDoubleConsumer Interface"
date = 2025-08-29T19:58:54.312+01:00
draft = false
description = "Complete Java ObjDoubleConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjDoubleConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.ObjDoubleConsumer interface represents an
operation that accepts an object-valued and a double-valued argument. It is a
functional interface with a single abstract method accept. This
interface is useful for operations that need to consume two different types.

ObjDoubleConsumer is part of Java's functional programming
utilities added in Java 8. It enables behavior parameterization for operations
that work with an object and a double value. The interface doesn't return any
result.

## ObjDoubleConsumer Interface Overview

ObjDoubleConsumer interface contains one abstract method that
performs the operation on the given arguments. Unlike some other functional
interfaces, it doesn't provide default methods for composition.

@FunctionalInterface
public interface ObjDoubleConsumer&lt;T&gt; {
    void accept(T t, double value);
}

The code above shows the structure of ObjDoubleConsumer interface.
It uses generics where T is the object type parameter. The interface is
annotated with @FunctionalInterface to indicate its single abstract method.

## Basic ObjDoubleConsumer Usage

The simplest way to use ObjDoubleConsumer is with lambda expressions. We define
how to consume the object and double values in the accept method. The example
shows a consumer that prints both values.

Main.java
  

package com.zetcode;

import java.util.function.ObjDoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer that prints object and double
        ObjDoubleConsumer&lt;String&gt; printer = (s, d) -&gt;
            System.out.println("String: " + s + ", Double: " + d);
        
        // Use the consumer
        printer.accept("Price", 19.99);
        printer.accept("Weight", 2.5);
        
        // Consumer with more complex logic
        ObjDoubleConsumer&lt;String&gt; formatter = (label, value) -&gt;
            System.out.printf("%s: %.2f%n", label, value);
        formatter.accept("Temperature", 23.4567);
    }
}

This example demonstrates basic ObjDoubleConsumer usage with lambda expressions.
The printer consumer takes a String and double, printing both. The formatter
shows more complex formatting of the double value. Consumers don't return values.

## Using ObjDoubleConsumer with Collections

ObjDoubleConsumer can be useful when processing collections where
you need to associate objects with double values. This example shows processing
a map of product prices.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.ObjDoubleConsumer;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Double&gt; products = new HashMap&lt;&gt;();
        products.put("Laptop", 999.99);
        products.put("Mouse", 25.50);
        products.put("Keyboard", 49.99);
        
        // Consumer to apply discount
        ObjDoubleConsumer&lt;String&gt; discountApplier = (name, price) -&gt; {
            double discounted = price * 0.9; // 10% discount
            System.out.printf("%s: $%.2f -&gt; $%.2f%n", name, price, discounted);
        };
        
        // Apply to all products
        products.forEach(discountApplier::accept);
    }
}

This example shows ObjDoubleConsumer used with a Map. The discountApplier
consumer calculates and prints discounted prices. We use method reference
syntax with forEach to apply the consumer to all map entries.

## ObjDoubleConsumer in Object Processing

We can use ObjDoubleConsumer to modify object properties based on double values.
This example demonstrates updating product inventory quantities.

Main.java
  

package com.zetcode;

import java.util.function.ObjDoubleConsumer;

class Product {
    String name;
    double quantity;
    
    Product(String name, double quantity) {
        this.name = name;
        this.quantity = quantity;
    }
    
    void display() {
        System.out.printf("%s: %.1f kg%n", name, quantity);
    }
}

public class Main {

    public static void main(String[] args) {

        Product apple = new Product("Apple", 10.5);
        Product banana = new Product("Banana", 7.2);
        
        // Consumer to add to inventory
        ObjDoubleConsumer&lt;Product&gt; addToStock = (p, q) -&gt; p.quantity += q;
        
        // Apply consumer
        addToStock.accept(apple, 2.3);
        addToStock.accept(banana, 1.8);
        
        apple.display();
        banana.display();
    }
}

This example shows ObjDoubleConsumer modifying object state. The addToStock
consumer increases product quantities. The consumer directly modifies the
Product object's quantity field based on the double value provided.

## ObjDoubleConsumer with Primitive Arrays

ObjDoubleConsumer can process arrays where we need to associate
objects with double values. This example calculates weighted scores.

Main.java
  

package com.zetcode;

import java.util.function.ObjDoubleConsumer;

public class Main {

    public static void main(String[] args) {

        String[] students = {"Alice", "Bob", "Charlie"};
        double[] weights = {0.3, 0.4, 0.3};
        double[] scores = {85.0, 92.0, 78.0};
        
        // Consumer to calculate weighted score
        ObjDoubleConsumer&lt;String&gt; scoreCalculator = (name, weight) -&gt; {
            int index = java.util.Arrays.asList(students).indexOf(name);
            double weighted = scores[index] * weight;
            System.out.printf("%s: %.1f * %.1f = %.1f%n", 
                name, scores[index], weight, weighted);
        };
        
        // Process each student
        for (int i = 0; i &lt; students.length; i++) {
            scoreCalculator.accept(students[i], weights[i]);
        }
    }
}

This example demonstrates ObjDoubleConsumer processing parallel arrays. The
scoreCalculator consumer matches each student with their weight and score. It
calculates and prints the weighted score for each student.

## Combining ObjDoubleConsumer with Other Interfaces

ObjDoubleConsumer can be combined with other functional interfaces
for more complex operations. This example shows filtering before consumption.

Main.java
  

package com.zetcode;

import java.util.function.ObjDoubleConsumer;
import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Consumer for high-value transactions
        ObjDoubleConsumer&lt;String&gt; transactionLogger = (account, amount) -&gt;
            System.out.printf("Large transaction: %s - $%.2f%n", account, amount);
        
        // Predicate to filter high amounts
        DoublePredicate isLarge = amount -&gt; amount &gt;= 1000.0;
        
        // Process transactions
        processTransaction("ACCT-123", 1500.0, isLarge, transactionLogger);
        processTransaction("ACCT-456", 500.0, isLarge, transactionLogger);
    }
    
    static void processTransaction(String account, double amount,
            DoublePredicate filter, ObjDoubleConsumer&lt;String&gt; consumer) {
        if (filter.test(amount)) {
            consumer.accept(account, amount);
        }
    }
}

This example combines ObjDoubleConsumer with DoublePredicate. The
processTransaction method only invokes the consumer if the amount passes
the filter. This pattern enables flexible composition of operations.

## ObjDoubleConsumer in Stream Processing

While not directly used in streams like some other functional interfaces,
ObjDoubleConsumer can still be useful in stream pipelines. This
example shows processing stream results.

Main.java
  

package com.zetcode;

import java.util.function.ObjDoubleConsumer;
import java.util.stream.DoubleStream;

public class Main {

    public static void main(String[] args) {

        // Consumer to accumulate statistics
        class Stats {
            double sum = 0;
            int count = 0;
        }
        Stats stats = new Stats();
        
        ObjDoubleConsumer&lt;Stats&gt; statsUpdater = (s, value) -&gt; {
            s.sum += value;
            s.count++;
        };
        
        // Process stream of doubles
        DoubleStream.of(12.5, 8.3, 15.7, 20.1, 5.4)
            .forEach(d -&gt; statsUpdater.accept(stats, d));
        
        System.out.printf("Count: %d, Sum: %.1f, Avg: %.2f%n",
            stats.count, stats.sum, stats.sum / stats.count);
    }
}

This example uses ObjDoubleConsumer to accumulate statistics from a DoubleStream.
The statsUpdater consumer maintains running totals in the Stats object. This
shows how consumers can maintain state during stream processing.

## Specialized Variants of Consumer

Java provides several specialized consumer interfaces for different combinations
of input types. These include BiConsumer, DoubleConsumer,
and others for various primitive types.

Main.java
  

package com.zetcode;

import java.util.function.BiConsumer;
import java.util.function.DoubleConsumer;
import java.util.function.ObjDoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // ObjDoubleConsumer example
        ObjDoubleConsumer&lt;String&gt; objDoublePrinter = (s, d) -&gt;
            System.out.println(s + ": " + d);
        objDoublePrinter.accept("Value", 3.14);
        
        // BiConsumer example (two generic types)
        BiConsumer&lt;String, Double&gt; biPrinter = (s, d) -&gt;
            System.out.println(s + ": " + d);
        biPrinter.accept("BiValue", 2.71);
        
        // DoubleConsumer example (primitive specialization)
        DoubleConsumer doublePrinter = d -&gt;
            System.out.println("Double: " + d);
        doublePrinter.accept(1.618);
    }
}

This example compares ObjDoubleConsumer with related interfaces.
BiConsumer is more general but requires boxing, while
DoubleConsumer handles only primitive doubles. Choose based on
specific needs.

## Source

[Java ObjDoubleConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ObjDoubleConsumer.html)

In this article, we've covered the essential methods and features of the Java
ObjDoubleConsumer interface. Understanding these concepts helps in writing
expressive code for operations that consume object and double values.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).