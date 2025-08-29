+++
title = "Java ObjIntConsumer Interface"
date = 2025-08-29T19:58:54.316+01:00
draft = false
description = "Complete Java ObjIntConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjIntConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.ObjIntConsumer interface represents an
operation that accepts an object-valued and an int-valued argument, and returns
no result. It is a functional interface with a single abstract method
accept.

ObjIntConsumer is part of Java's functional programming utilities
added in Java 8. It is used when you need to perform operations combining
objects and primitive int values. Unlike regular consumers, it avoids autoboxing
overhead.

## ObjIntConsumer Interface Overview

ObjIntConsumer interface contains one abstract method that must be
implemented. The method performs the operation on the given object and int
arguments. There are no default or static methods in this interface.

@FunctionalInterface
public interface ObjIntConsumer&lt;T&gt; {
    void accept(T t, int value);
}

The code above shows the structure of ObjIntConsumer interface. It uses
generics where T is the type of the object argument. The interface is annotated
with @FunctionalInterface to indicate its single abstract method nature.

## Basic ObjIntConsumer Usage

The simplest way to use ObjIntConsumer is with lambda expressions. We define what
to do with the object and int parameters. The example shows a consumer that prints
both values.

Main.java
  

package com.zetcode;

import java.util.function.ObjIntConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer that prints object and int
        ObjIntConsumer&lt;String&gt; printCombined = (s, i) -&gt; 
            System.out.println("String: " + s + ", int: " + i);
        
        // Use the consumer
        printCombined.accept("Hello", 42);
        printCombined.accept("Java", 8);
        
        // Consumer with more complex logic
        ObjIntConsumer&lt;String&gt; repeatPrint = (str, count) -&gt; {
            for (int i = 0; i &lt; count; i++) {
                System.out.println(str);
            }
        };
        
        repeatPrint.accept("Loop", 3);
    }
}

This example demonstrates basic ObjIntConsumer usage with lambda expressions.
The printCombined consumer simply prints both arguments. The repeatPrint consumer
shows more complex logic, printing a string multiple times based on the int value.

## Using ObjIntConsumer with Collections

ObjIntConsumer can be useful when processing collections where you need
to combine elements with their indices or other integer values. This example shows
how to use it with a list.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.ObjIntConsumer;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // Consumer to print name with index
        ObjIntConsumer&lt;String&gt; printIndexed = (name, index) -&gt;
            System.out.println((index + 1) + ". " + name);
        
        // Process list with index
        for (int i = 0; i &lt; names.size(); i++) {
            printIndexed.accept(names.get(i), i);
        }
        
        // Consumer to build a formatted string
        StringBuilder sb = new StringBuilder();
        ObjIntConsumer&lt;String&gt; buildString = (s, i) -&gt; {
            if (i &gt; 0) sb.append(", ");
            sb.append(s).append(":").append(i);
        };
        
        for (int i = 0; i &lt; names.size(); i++) {
            buildString.accept(names.get(i), i);
        }
        
        System.out.println("Formatted: " + sb.toString());
    }
}

This example shows ObjIntConsumer used with a list of names. The printIndexed
consumer displays each name with its 1-based index. The buildString consumer
creates a formatted string combining names with their indices.

## ObjIntConsumer in Object Processing

ObjIntConsumer is particularly useful when processing objects that
have some relationship with integer values. This example demonstrates updating
product quantities in a shopping cart.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.ObjIntConsumer;

class Product {
    String name;
    double price;
    
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return name + " ($" + price + ")";
    }
}

public class Main {

    public static void main(String[] args) {

        Map&lt;Product, Integer&gt; cart = new HashMap&lt;&gt;();
        cart.put(new Product("Laptop", 999.99), 1);
        cart.put(new Product("Mouse", 25.50), 2);
        cart.put(new Product("Keyboard", 45.75), 1);
        
        // Consumer to update product quantities
        ObjIntConsumer&lt;Product&gt; updateQuantity = (product, quantity) -&gt; {
            int current = cart.getOrDefault(product, 0);
            cart.put(product, current + quantity);
        };
        
        // Add more items to cart
        Product mouse = new Product("Mouse", 25.50);
        updateQuantity.accept(mouse, 3);
        
        Product headphones = new Product("Headphones", 79.99);
        updateQuantity.accept(headphones, 2);
        
        // Print final cart contents
        ObjIntConsumer&lt;Product&gt; printCartItem = (p, q) -&gt;
            System.out.println(p + " x " + q + " = $" + (p.price * q));
        
        cart.forEach((k, v) -&gt; printCartItem.accept(k, v));
    }
}

This example shows ObjIntConsumer used for shopping cart operations. The
updateQuantity consumer adds specified quantities to products in the cart.
The printCartItem consumer displays each product with its quantity and total
price. This demonstrates practical object-int pair processing.

## Combining ObjIntConsumer with Other Functional Interfaces

ObjIntConsumer can be combined with other functional interfaces to
create more complex operations. This example shows integration with Predicate
and Function.

Main.java
  

package com.zetcode;

import java.util.function.Function;
import java.util.function.ObjIntConsumer;
import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // Function to create greeting
        Function&lt;String, String&gt; greeter = name -&gt; "Hello, " + name + "!";
        
        // Predicate to check if number is even
        Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;
        
        // Consumer that combines both
        ObjIntConsumer&lt;String&gt; complexConsumer = (name, number) -&gt; {
            String greeting = greeter.apply(name);
            String evenOdd = isEven.test(number) ? "even" : "odd";
            System.out.println(greeting + " Your number is " + number + 
                " which is " + evenOdd + ".");
        };
        
        // Use the combined consumer
        complexConsumer.accept("Alice", 42);
        complexConsumer.accept("Bob", 7);
        
        // Another example with calculation
        ObjIntConsumer&lt;Double&gt; powerCalculator = (base, exponent) -&gt; {
            double result = Math.pow(base, exponent);
            System.out.printf("%.2f^%d = %.2f%n", base, exponent, result);
        };
        
        powerCalculator.accept(2.5, 3);
        powerCalculator.accept(10.0, -2);
    }
}

This example demonstrates combining ObjIntConsumer with other functional
interfaces. The complexConsumer uses a Function and Predicate to create
a more sophisticated operation. The powerCalculator shows mathematical
operations combining double and int values.

## ObjIntConsumer in Stream Processing

While ObjIntConsumer isn't directly used in Stream API methods,
it can be helpful in stream processing scenarios where you need to handle
object-int pairs. This example shows a custom stream-like operation.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.ObjIntConsumer;

public class Main {

    static &lt;T&gt; void processWithIndices(List&lt;T&gt; list, ObjIntConsumer&lt;T&gt; consumer) {
        for (int i = 0; i &lt; list.size(); i++) {
            consumer.accept(list.get(i), i);
        }
    }

    public static void main(String[] args) {

        List&lt;String&gt; colors = Arrays.asList("Red", "Green", "Blue", "Yellow");
        
        // Consumer to create indexed color codes
        ObjIntConsumer&lt;String&gt; colorCoder = (color, index) -&gt; {
            String code = color.substring(0, 3).toUpperCase() + index;
            System.out.println(color + " -&gt; " + code);
        };
        
        processWithIndices(colors, colorCoder);
        
        // Another example with statistics
        int[] totals = new int[1];
        ObjIntConsumer&lt;Integer&gt; summer = (num, weight) -&gt; {
            totals[0] += num * weight;
        };
        
        List&lt;Integer&gt; numbers = Arrays.asList(10, 20, 30, 40);
        processWithIndices(numbers, summer);
        System.out.println("Weighted total: " + totals[0]);
    }
}

This example shows a custom stream processing method using ObjIntConsumer.
The processWithIndices method applies the consumer to each element with its
index. The colorCoder creates codes combining color names with positions.
The summer calculates a weighted total of numbers.

## ObjIntConsumer for Configuration

ObjIntConsumer can be useful for configuration scenarios where
objects need to be configured with integer parameters. This example shows
a settings application pattern.

Main.java
  

package com.zetcode;

import java.util.function.ObjIntConsumer;

class Device {
    String name;
    int brightness;
    int volume;
    
    Device(String name) {
        this.name = name;
    }
    
    void displaySettings() {
        System.out.printf("%s - Brightness: %d, Volume: %d%n", 
            name, brightness, volume);
    }
}

public class Main {

    public static void main(String[] args) {

        Device tv = new Device("Living Room TV");
        Device speaker = new Device("Kitchen Speaker");
        
        // Consumers for different device settings
        ObjIntConsumer&lt;Device&gt; setBrightness = (d, b) -&gt; {
            d.brightness = Math.min(Math.max(b, 0), 100);
        };
        
        ObjIntConsumer&lt;Device&gt; setVolume = (d, v) -&gt; {
            d.volume = Math.min(Math.max(v, 0), 50);
        };
        
        // Apply settings
        setBrightness.accept(tv, 75);
        setVolume.accept(tv, 30);
        
        setBrightness.accept(speaker, 0); // No brightness control
        setVolume.accept(speaker, 25);
        
        // Show final settings
        tv.displaySettings();
        speaker.displaySettings();
        
        // Consumer with validation
        ObjIntConsumer&lt;Device&gt; safeVolume = (d, v) -&gt; {
            if (d.name.contains("Speaker") &amp;&amp; v &gt; 40) {
                System.out.println("Warning: High volume for speaker!");
            }
            setVolume.accept(d, v);
        };
        
        safeVolume.accept(speaker, 45);
        speaker.displaySettings();
    }
}

This example demonstrates using ObjIntConsumer for device configuration.
Different consumers handle brightness and volume settings with appropriate
constraints. The safeVolume consumer adds validation logic specific to
speaker devices. This shows how ObjIntConsumer can encapsulate setting
logic.

## Source

[Java ObjIntConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ObjIntConsumer.html)

In this article, we've covered the essential methods and features of the Java
ObjIntConsumer interface. Understanding these concepts is valuable for scenarios
where you need to process objects in combination with primitive int values.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).