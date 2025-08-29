+++
title = "Java BiConsumer Interface"
date = 2025-08-29T19:58:45.351+01:00
draft = false
description = "Complete Java BiConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BiConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.BiConsumer interface represents an operation
that accepts two input arguments and returns no result. It is a functional
interface with a single abstract method accept. BiConsumer is used
for operations that need to process two values without returning anything.

BiConsumer is part of Java's functional programming utilities added
in Java 8. It enables side-effect operations on two input parameters. Common
uses include iterating through maps or performing operations on pairs of values.

## BiConsumer Interface Overview

BiConsumer interface contains one abstract method and one default
method. The key method accept performs the operation on the inputs.
The andThen method enables chaining multiple BiConsumers.

@FunctionalInterface
public interface BiConsumer&lt;T, U&gt; {
    void accept(T t, U u);
    
    default BiConsumer&lt;T, U&gt; andThen(BiConsumer&lt;? super T, ? super U&gt; after);
}

The code above shows the structure of BiConsumer interface. It uses
generics where T and U are input types. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic BiConsumer Usage

The simplest way to use BiConsumer is with lambda expressions. We define how to
process two input values in the accept method. The example prints key-value pairs.

Main.java
  

package com.zetcode;

import java.util.function.BiConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a BiConsumer that prints two values
        BiConsumer&lt;String, Integer&gt; printPair = (key, value) -&gt; 
            System.out.println("Key: " + key + ", Value: " + value);
        
        // Use the BiConsumer
        printPair.accept("age", 30);
        printPair.accept("score", 95);
        
        // BiConsumer using method reference
        BiConsumer&lt;String, String&gt; concatPrinter = System.out::println;
        concatPrinter.accept("Hello", "World");
    }
}

This example demonstrates basic BiConsumer usage with lambda and method reference.
The printPair takes String and Integer inputs and prints them. Method reference
provides concise syntax for existing methods that match BiConsumer signature.

## BiConsumer with Map Iteration

BiConsumer is commonly used with Map's forEach method. The Map's
key-value pairs perfectly match BiConsumer's two input parameters. This enables
clean iteration over map entries.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);
        
        // BiConsumer to print map entries
        BiConsumer&lt;String, Integer&gt; printEntry = 
            (name, score) -&gt; System.out.println(name + ": " + score);
        
        // Iterate map with BiConsumer
        scores.forEach(printEntry);
        
        // Direct lambda in forEach
        scores.forEach((k, v) -&gt; {
            if (v &gt; 80) {
                System.out.println(k + " passed");
            }
        });
    }
}

This example shows BiConsumer usage with Map.forEach. We first define a separate
BiConsumer for printing entries, then use direct lambda for conditional logic.
Map iteration becomes very expressive with BiConsumer.

## Chaining BiConsumers with andThen

The andThen method allows chaining multiple BiConsumers to perform
sequential operations. Each BiConsumer in the chain receives the same input
parameters.

Main.java
  

package com.zetcode;

import java.util.function.BiConsumer;

public class Main {

    public static void main(String[] args) {

        // First BiConsumer logs the operation
        BiConsumer&lt;String, Integer&gt; logger = 
            (item, qty) -&gt; System.out.println("Processing: " + item + " x" + qty);
        
        // Second BiConsumer processes the order
        BiConsumer&lt;String, Integer&gt; processor = 
            (item, qty) -&gt; System.out.println("Ordered " + qty + " of " + item);
        
        // Chain the BiConsumers
        BiConsumer&lt;String, Integer&gt; orderHandler = logger.andThen(processor);
        
        // Use the chained BiConsumer
        orderHandler.accept("Laptop", 2);
        orderHandler.accept("Mouse", 5);
    }
}

This example demonstrates BiConsumer chaining with andThen. The
orderHandler executes both logging and processing for each input pair. Both
BiConsumers receive the same parameters when the chain is executed.

## BiConsumer for Object Modification

BiConsumer can be used to modify object properties based on two
input parameters. This is useful for batch updates or configuration operations.

Main.java
  

package com.zetcode;

import java.util.function.BiConsumer;

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

        // BiConsumer to update product price with discount
        BiConsumer&lt;Product, Double&gt; applyDiscount = 
            (product, discount) -&gt; {
                product.price = product.price * (1 - discount/100);
                System.out.println("Applied " + discount + "% discount");
            };
        
        Product laptop = new Product("Laptop", 999.99);
        Product phone = new Product("Phone", 699.99);
        
        applyDiscount.accept(laptop, 10.0);
        applyDiscount.accept(phone, 15.0);
        
        System.out.println(laptop);
        System.out.println(phone);
    }
}

This example shows BiConsumer modifying object state. The applyDiscount
BiConsumer takes a Product and discount percentage, then updates the product's
price. This pattern is useful for applying consistent modifications.

## BiConsumer in Stream Operations

BiConsumer can be used in stream operations that process pairs of
values. While not as common as Function in streams, it's useful for terminal
operations with side effects.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.function.BiConsumer;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; names = List.of("Alice", "Bob", "Charlie");
        List&lt;Integer&gt; scores = List.of(85, 92, 78);
        
        // BiConsumer to print name-score pairs
        BiConsumer&lt;String, Integer&gt; printResult = 
            (name, score) -&gt; System.out.println(name + " scored " + score);
        
        // Process parallel lists with BiConsumer
        if (names.size() == scores.size()) {
            for (int i = 0; i &lt; names.size(); i++) {
                printResult.accept(names.get(i), scores.get(i));
            }
        }
        
        // More complex BiConsumer
        BiConsumer&lt;String, Integer&gt; resultAnalyzer = (name, score) -&gt; {
            String status = score &gt;= 80 ? "Pass" : "Fail";
            System.out.println(name + ": " + score + " (" + status + ")");
        };
        
        System.out.println("\nAnalysis:");
        for (int i = 0; i &lt; names.size(); i++) {
            resultAnalyzer.accept(names.get(i), scores.get(i));
        }
    }
}

This example demonstrates BiConsumer processing parallel lists. We define two
BiConsumers - one for simple printing and another for more complex analysis.
This pattern is useful when processing related data in separate collections.

## Primitive Specializations of BiConsumer

Java provides specialized versions of BiConsumer for primitive types to avoid
autoboxing overhead. These include ObjIntConsumer, ObjLongConsumer, and
ObjDoubleConsumer.

Main.java
  

package com.zetcode;

import java.util.function.ObjIntConsumer;
import java.util.function.ObjDoubleConsumer;

public class Main {

    public static void main(String[] args) {

        // ObjIntConsumer example
        ObjIntConsumer&lt;String&gt; printWithNumber = 
            (s, i) -&gt; System.out.println(s + ": " + i);
        printWithNumber.accept("Count", 42);
        
        // ObjDoubleConsumer example
        ObjDoubleConsumer&lt;String&gt; temperatureLogger = 
            (location, temp) -&gt; System.out.printf("%s: %.1f°C%n", location, temp);
        temperatureLogger.accept("New York", 22.5);
        
        // Using BiConsumer with boxed primitives
        BiConsumer&lt;String, Integer&gt; boxedConsumer = 
            (s, i) -&gt; System.out.println(s.repeat(i));
        boxedConsumer.accept("Hi ", 3);
    }
}

This example shows primitive specializations of BiConsumer. ObjIntConsumer and
ObjDoubleConsumer avoid boxing overhead when working with primitives. The last
example shows regular BiConsumer with boxed Integer for comparison.

## Combining BiConsumer with Other Functional Interfaces

BiConsumer can be combined with other functional interfaces to
create more complex operations. This example shows pairing it with Function
for data transformation before consumption.

Main.java
  

package com.zetcode;

import java.util.function.BiConsumer;
import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Function to calculate area
        Function&lt;Double, Double&gt; areaCalculator = radius -&gt; Math.PI * radius * radius;
        
        // BiConsumer to print formatted results
        BiConsumer&lt;String, Double&gt; resultPrinter = 
            (label, value) -&gt; System.out.printf("%s: %.2f%n", label, value);
        
        // Process radius values
        double[] radii = {1.0, 2.5, 3.0};
        for (double r : radii) {
            double area = areaCalculator.apply(r);
            resultPrinter.accept("Radius " + r + " area", area);
        }
        
        // More complex combination
        BiConsumer&lt;String, Function&lt;Double, Double&gt;&gt; calculator = 
            (name, func) -&gt; {
                double result = func.apply(10.0);
                System.out.println(name + " at 10.0: " + result);
            };
        
        calculator.accept("Square", x -&gt; x * x);
        calculator.accept("Cube", x -&gt; x * x * x);
    }
}

This example demonstrates combining BiConsumer with Function. We first use them
separately for calculation and printing, then create a BiConsumer that accepts
a Function as its second parameter. This shows the flexibility of functional
interfaces.

## Source

[Java BiConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/BiConsumer.html)

In this article, we've covered the essential methods and features of the Java
BiConsumer interface. Understanding these concepts is crucial for functional
programming and collection processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).