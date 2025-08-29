+++
title = "Java ObjLongConsumer Interface"
date = 2025-08-29T19:58:55.452+01:00
draft = false
description = "Complete Java ObjLongConsumer interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjLongConsumer Interface

Last modified: April 16, 2025

 

The java.util.function.ObjLongConsumer interface represents an
operation that accepts an object and a long-valued argument. It is a functional
interface with a single abstract method accept. This interface is
specialized for long primitive type to avoid boxing overhead.

ObjLongConsumer is part of Java's functional programming utilities
added in Java 8. It enables behavior parameterization for operations that need
both an object and a long parameter. The interface is commonly used in stream
processing and collection operations.

## ObjLongConsumer Interface Overview

ObjLongConsumer interface contains one abstract method that
performs the operation on the given arguments. Unlike regular consumers, it
takes two parameters - an object and a long primitive.

@FunctionalInterface
public interface ObjLongConsumer&lt;T&gt; {
    void accept(T t, long value);
}

The code above shows the structure of ObjLongConsumer interface.
It uses generics for the object parameter while the second parameter is always
long. The interface is annotated with @FunctionalInterface.

## Basic ObjLongConsumer Usage

The simplest way to use ObjLongConsumer is with lambda expressions. We define
how to process the object and long parameters in the accept method. This example
shows a consumer that logs product updates.

Main.java
  

package com.zetcode;

import java.util.function.ObjLongConsumer;

public class Main {

    public static void main(String[] args) {

        // Define a consumer for product updates
        ObjLongConsumer&lt;String&gt; productUpdater = (name, newStock) -&gt; {
            System.out.printf("Updating product '%s' with new stock: %d%n", 
                name, newStock);
        };
        
        // Use the consumer
        productUpdater.accept("Laptop", 150L);
        productUpdater.accept("Smartphone", 300L);
    }
}

This example demonstrates basic ObjLongConsumer usage. The
productUpdater takes a product name (String) and new stock value (long). It
prints an update message for each product. The consumer performs an action
without returning any result.

## ObjLongConsumer with Collections

ObjLongConsumer can be used to process elements in collections.
This example shows how to update inventory quantities for products in a map.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.ObjLongConsumer;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Long&gt; inventory = new HashMap&lt;&gt;();
        inventory.put("Keyboard", 50L);
        inventory.put("Mouse", 75L);
        inventory.put("Monitor", 30L);
        
        // Consumer to update inventory
        ObjLongConsumer&lt;String&gt; inventoryUpdater = (product, quantity) -&gt; {
            inventory.merge(product, quantity, Long::sum);
        };
        
        // Apply updates
        inventoryUpdater.accept("Keyboard", 20L);
        inventoryUpdater.accept("Monitor", 15L);
        inventoryUpdater.accept("Headphones", 40L); // New product
        
        System.out.println("Updated inventory: " + inventory);
    }
}

This example shows ObjLongConsumer with collections. The inventoryUpdater adds
quantities to existing products or creates new entries. The Map.merge method
handles both cases. This pattern is useful for bulk updates.

## ObjLongConsumer in Stream Processing

ObjLongConsumer can be used in stream operations that need to
process both an object and a long value. This example calculates total prices
for order items.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.function.ObjLongConsumer;

public class Main {

    public static void main(String[] args) {

        record OrderItem(String name, double price, int quantity) {}
        
        List&lt;OrderItem&gt; orderItems = List.of(
            new OrderItem("Shirt", 29.99, 2),
            new OrderItem("Pants", 49.99, 1),
            new OrderItem("Shoes", 89.99, 1)
        );
        
        // Consumer to calculate total price
        ObjLongConsumer&lt;OrderItem&gt; priceCalculator = (item, total) -&gt; {
            double itemTotal = item.price() * item.quantity();
            System.out.printf("%s: %.2f x %d = %.2f (Running total: %d)%n",
                item.name(), item.price(), item.quantity(), 
                itemTotal, total + (long) itemTotal);
        };
        
        // Process with running total
        long runningTotal = 0;
        for (OrderItem item : orderItems) {
            priceCalculator.accept(item, runningTotal);
            runningTotal += (long) (item.price() * item.quantity());
        }
    }
}

This example demonstrates ObjLongConsumer in stream-like processing. The
priceCalculator shows each item's total and the running sum. While not using
Stream API directly, it shows the consumer pattern for sequential processing.

## ObjLongConsumer with Primitive Arrays

ObjLongConsumer works well with primitive arrays where we need to
process elements with additional context. This example processes temperature
readings with location information.

Main.java
  

package com.zetcode;

import java.util.function.ObjLongConsumer;

public class Main {

    public static void main(String[] args) {

        long[] temperatures = {22L, 24L, 19L, 21L, 25L};
        String location = "New York";
        
        // Consumer to process temperature readings
        ObjLongConsumer&lt;String&gt; tempProcessor = (loc, temp) -&gt; {
            String condition = temp &gt; 23 ? "Warm" : 
                             temp &lt; 20 ? "Cool" : "Mild";
            System.out.printf("%s: %d°C (%s)%n", loc, temp, condition);
        };
        
        // Process all temperatures
        for (long temp : temperatures) {
            tempProcessor.accept(location, temp);
        }
    }
}

This example shows ObjLongConsumer with primitive arrays. The tempProcessor
takes location context and temperature values. It categorizes each reading
and prints a formatted message. The consumer handles both object and primitive.

## ObjLongConsumer for Object State Modification

ObjLongConsumer can modify object state based on long parameters.
This example updates bank account balances with transaction amounts.

Main.java
  

package com.zetcode;

import java.util.function.ObjLongConsumer;

public class Main {

    static class BankAccount {
        private String owner;
        private long balance;
        
        public BankAccount(String owner, long balance) {
            this.owner = owner;
            this.balance = balance;
        }
        
        public void processTransaction(ObjLongConsumer&lt;BankAccount&gt; operation, 
                                      long amount) {
            operation.accept(this, amount);
        }
        
        @Override
        public String toString() {
            return owner + "'s account: $" + balance;
        }
    }
    
    public static void main(String[] args) {

        BankAccount account = new BankAccount("John", 1000L);
        
        // Define deposit operation
        ObjLongConsumer&lt;BankAccount&gt; deposit = (acc, amount) -&gt; {
            acc.balance += amount;
            System.out.println("Deposited: $" + amount);
        };
        
        // Define withdrawal operation
        ObjLongConsumer&lt;BankAccount&gt; withdraw = (acc, amount) -&gt; {
            if (acc.balance &gt;= amount) {
                acc.balance -= amount;
                System.out.println("Withdrawn: $" + amount);
            } else {
                System.out.println("Insufficient funds for withdrawal: $" + amount);
            }
        };
        
        // Process transactions
        account.processTransaction(deposit, 500L);
        System.out.println(account);
        
        account.processTransaction(withdraw, 200L);
        System.out.println(account);
        
        account.processTransaction(withdraw, 2000L);
        System.out.println(account);
    }
}

This example demonstrates state modification with ObjLongConsumer.
The BankAccount class uses consumers for deposits and withdrawals. Each
operation receives the account object and transaction amount. This encapsulates
behavior.

## ObjLongConsumer in Method Parameters

ObjLongConsumer can be passed as method parameters for flexible
behavior. This example shows a generic data processor that accepts a consumer.

Main.java
  

package com.zetcode;

import java.util.function.ObjLongConsumer;

public class Main {

    static void processData(String[] items, long[] values, 
                          ObjLongConsumer&lt;String&gt; processor) {
        if (items.length != values.length) {
            throw new IllegalArgumentException("Arrays must have equal length");
        }
        
        for (int i = 0; i &lt; items.length; i++) {
            processor.accept(items[i], values[i]);
        }
    }
    
    public static void main(String[] args) {

        String[] products = {"Tablet", "Laptop", "Phone"};
        long[] sales = {1500L, 2300L, 3100L};
        
        // Consumer to print product sales
        ObjLongConsumer&lt;String&gt; salesReporter = (product, count) -&gt; {
            System.out.printf("%-10s: %5d units%n", product, count);
        };
        
        // Consumer to calculate revenue (assuming $500 per unit)
        ObjLongConsumer&lt;String&gt; revenueCalculator = (product, count) -&gt; {
            long revenue = count * 500;
            System.out.printf("%-10s: $%,d%n", product, revenue);
        };
        
        System.out.println("Sales Report:");
        processData(products, sales, salesReporter);
        
        System.out.println("\nRevenue Estimate:");
        processData(products, sales, revenueCalculator);
    }
}

This example shows ObjLongConsumer as method parameters. The processData method
accepts any consumer for processing paired String and long values. Different
consumers provide varied processing without modifying the core method.

## Combining ObjLongConsumer with Other Functional Interfaces

ObjLongConsumer can be combined with other functional interfaces
for more complex operations. This example shows filtering before consumption.

Main.java
  

package com.zetcode;

import java.util.function.ObjLongConsumer;
import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        record SensorReading(String sensorId, long value) {}
        
        SensorReading[] readings = {
            new SensorReading("TEMP-1", 22L),
            new SensorReading("TEMP-2", 45L),  // Invalid
            new SensorReading("TEMP-3", 18L),
            new SensorReading("TEMP-4", 50L)   // Invalid
        };
        
        // Predicate to validate readings
        LongPredicate isValid = value -&gt; value &gt;= 20L &amp;&amp; value &lt;= 30L;
        
        // Consumer to process valid readings
        ObjLongConsumer&lt;String&gt; readingProcessor = (id, value) -&gt; {
            System.out.printf("Processing valid reading - %s: %d%n", id, value);
            // Additional processing logic here
        };
        
        // Process readings with filter
        for (SensorReading reading : readings) {
            if (isValid.test(reading.value())) {
                readingProcessor.accept(reading.sensorId(), reading.value());
            } else {
                System.out.printf("Skipping invalid reading - %s: %d%n", 
                    reading.sensorId(), reading.value());
            }
        }
    }
}

This example combines ObjLongConsumer with LongPredicate. The isValid predicate
filters readings before processing. The readingProcessor only receives valid
values. This pattern enables clean separation of concerns.

## Source

[Java ObjLongConsumer Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ObjLongConsumer.html)

In this article, we've covered the essential methods and features of the Java
ObjLongConsumer interface. Understanding these concepts is crucial for handling
operations that require both object and long primitive parameters efficiently.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).