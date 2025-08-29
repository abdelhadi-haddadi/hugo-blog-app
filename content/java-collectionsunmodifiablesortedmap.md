+++
title = "Java Collections.unmodifiableSortedMap"
date = 2025-08-29T19:58:29.281+01:00
draft = false
description = "Complete Java Collections.unmodifiableSortedMap tutorial with examples. Learn how to create unmodifiable sorted map views in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.unmodifiableSortedMap

Last modified: April 20, 2025

 

The Collections.unmodifiableSortedMap method is part of Java's
Collections Framework. It provides an unmodifiable view of a specified
SortedMap. This method is useful for creating immutable sorted map
structures.

An unmodifiable sorted map prevents modifications to the underlying map through
the returned view. Any attempt to modify the map will result in an
UnsupportedOperationException. The view maintains the original
map's sorting order.

## SortedMap Interface Overview

SortedMap is a subinterface of Map that maintains its
entries in ascending key order. The ordering is determined by the natural
ordering of keys or by a Comparator provided at creation time.

Key features include methods for range views (subMap,
headMap, tailMap) and access to first/last keys.
TreeMap is the primary implementation of SortedMap.

## Basic unmodifiableSortedMap Usage

This example demonstrates the basic usage of
Collections.unmodifiableSortedMap. We create a TreeMap,
then obtain an unmodifiable view of it. The example shows both successful read
operations and failed modification attempts.

BasicUnmodifiableSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class BasicUnmodifiableSortedMap {

    public static void main(String[] args) {
        
        // Create a mutable sorted map
        SortedMap&lt;String, Integer&gt; scores = new TreeMap&lt;&gt;();
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);
        
        // Create unmodifiable view
        SortedMap&lt;String, Integer&gt; unmodifiableScores = 
            Collections.unmodifiableSortedMap(scores);
        
        // Read operations work
        System.out.println("First key: " + unmodifiableScores.firstKey());
        System.out.println("Alice's score: " + unmodifiableScores.get("Alice"));
        
        try {
            // Attempt modification throws exception
            unmodifiableScores.put("Diana", 88);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify: " + e.getMessage());
        }
    }
}

This code creates a TreeMap with some entries, then wraps it in an
unmodifiable view. The view allows all read operations but throws an exception
on any modification attempt. The output demonstrates both successful reads and
failed writes.

The unmodifiable view reflects changes to the original map but prevents direct
modifications through itself. This is useful for providing read-only access to
sorted map data.

## Unmodifiable SortedMap with Comparator

This example shows how unmodifiableSortedMap works with a custom
Comparator. We create a TreeMap with descending order,
then make it unmodifiable. The view maintains the original sorting order.

ComparatorUnmodifiableSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedMap;
import java.util.TreeMap;

public class ComparatorUnmodifiableSortedMap {

    public static void main(String[] args) {
        
        // Create comparator for descending order
        Comparator&lt;String&gt; descending = Comparator.reverseOrder();
        
        // Create sorted map with custom comparator
        SortedMap&lt;String, Integer&gt; products = new TreeMap&lt;&gt;(descending);
        products.put("Laptop", 999);
        products.put("Phone", 699);
        products.put("Tablet", 399);
        
        // Create unmodifiable view
        SortedMap&lt;String, Integer&gt; unmodifiableProducts = 
            Collections.unmodifiableSortedMap(products);
        
        // View maintains original order
        System.out.println("Products in descending order:");
        unmodifiableProducts.forEach((k, v) -&gt; 
            System.out.println(k + ": $" + v));
        
        // Original map can still be modified
        products.put("Monitor", 249);
        System.out.println("\nAfter original modification:");
        unmodifiableProducts.forEach((k, v) -&gt; 
            System.out.println(k + ": $" + v));
    }
}

This example demonstrates that the unmodifiable view preserves the original
map's sorting order. We created a TreeMap with descending order
using a custom Comparator, then made it unmodifiable.

The output shows the descending order is maintained in the unmodifiable view.
Changes to the original map are reflected in the view, but the view itself
cannot be modified directly.

## Unmodifiable SortedMap with Submaps

This example explores how unmodifiableSortedMap interacts with
submap operations. We create a sorted map, obtain an unmodifiable view, then
work with its submap views. All derived views remain unmodifiable.

SubmapUnmodifiableSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SubmapUnmodifiableSortedMap {

    public static void main(String[] args) {
        
        SortedMap&lt;Integer, String&gt; numbers = new TreeMap&lt;&gt;();
        numbers.put(1, "One");
        numbers.put(2, "Two");
        numbers.put(3, "Three");
        numbers.put(4, "Four");
        numbers.put(5, "Five");
        
        SortedMap&lt;Integer, String&gt; unmodifiableNumbers = 
            Collections.unmodifiableSortedMap(numbers);
        
        // Get submap (inclusive 2, exclusive 5)
        SortedMap&lt;Integer, String&gt; subMap = 
            unmodifiableNumbers.subMap(2, 5);
        
        System.out.println("Submap (2-5): " + subMap);
        
        try {
            // Attempt to modify submap
            subMap.put(6, "Six");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify submap: " + e.getMessage());
        }
        
        // Head and tail maps are also unmodifiable
        SortedMap&lt;Integer, String&gt; headMap = unmodifiableNumbers.headMap(3);
        SortedMap&lt;Integer, String&gt; tailMap = unmodifiableNumbers.tailMap(3);
        
        System.out.println("Head map (&lt;3): " + headMap);
        System.out.println("Tail map (&gt;=3): " + tailMap);
    }
}

This example shows that submap operations on an unmodifiable sorted map return
unmodifiable views. We create a sorted map of numbers, make it unmodifiable,
then extract a submap, headmap, and tailmap.

All derived views inherit the unmodifiable characteristic. Attempts to modify
any of these views result in UnsupportedOperationException. This
behavior ensures consistent immutability across all map views.

## Unmodifiable SortedMap Performance

This example demonstrates the performance characteristics of unmodifiable sorted
maps. We compare operations between a regular TreeMap and its
unmodifiable view. The wrapper adds minimal overhead to read operations.

PerformanceUnmodifiableSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class PerformanceUnmodifiableSortedMap {

    public static void main(String[] args) {
        
        // Create large sorted map
        SortedMap&lt;Integer, String&gt; bigMap = new TreeMap&lt;&gt;();
        for (int i = 0; i &lt; 100000; i++) {
            bigMap.put(i, "Value" + i);
        }
        
        // Create unmodifiable view
        SortedMap&lt;Integer, String&gt; unmodifiableBigMap = 
            Collections.unmodifiableSortedMap(bigMap);
        
        // Time get operations
        long start = System.nanoTime();
        bigMap.get(50000);
        long end = System.nanoTime();
        System.out.println("Regular map get: " + (end - start) + " ns");
        
        start = System.nanoTime();
        unmodifiableBigMap.get(50000);
        end = System.nanoTime();
        System.out.println("Unmodifiable map get: " + (end - start) + " ns");
        
        // Time iteration
        start = System.nanoTime();
        bigMap.forEach((k, v) -&gt; {});
        end = System.nanoTime();
        System.out.println("\nRegular map iteration: " + (end - start) + " ns");
        
        start = System.nanoTime();
        unmodifiableBigMap.forEach((k, v) -&gt; {});
        end = System.nanoTime();
        System.out.println("Unmodifiable map iteration: " + (end - start) + " ns");
    }
}

This performance test shows that unmodifiable sorted maps add negligible
overhead to read operations. We compare get operations and full iterations
between a regular TreeMap and its unmodifiable view.

The results demonstrate that the unmodifiable wrapper doesn't significantly
impact performance for read operations. The small overhead comes from the
wrapper's modification checks during operations.

## Unmodifiable SortedMap Serialization

This example examines serialization behavior of unmodifiable sorted maps. We
serialize and deserialize both a TreeMap and its unmodifiable
view. The example shows how the unmodifiable characteristic is preserved.

SerializationUnmodifiableSortedMap.java
  

package com.zetcode;

import java.io.*;
import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SerializationUnmodifiableSortedMap {

    public static void main(String[] args) {
        
        SortedMap prices = new TreeMap&lt;&gt;();
        prices.put("Apple", 1.99);
        prices.put("Banana", 0.99);
        prices.put("Orange", 2.49);
        
        SortedMap unmodifiablePrices = 
            Collections.unmodifiableSortedMap(prices);
        
        // Serialize
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("prices.ser"))) {
            oos.writeObject(unmodifiablePrices);
            System.out.println("Serialized unmodifiable sorted map");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("prices.ser"))) {
            @SuppressWarnings("unchecked")
            SortedMap deserialized = 
                (SortedMap) ois.readObject();
            
            System.out.println("Deserialized map: " + deserialized);
            
            try {
                deserialized.put("Grape", 3.99);
            } catch (UnsupportedOperationException e) {
                System.out.println("\nDeserialized map is still unmodifiable");
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates that the unmodifiable characteristic of a sorted map
is preserved during serialization. We serialize an unmodifiable view, then
deserialize it and verify it remains unmodifiable.

The output shows that the deserialized map maintains its unmodifiable nature.
Attempts to modify it after deserialization result in the expected exception.
This behavior is important for maintaining immutability across process boundaries.

## Unmodifiable SortedMap in Concurrent Context

This example explores using unmodifiable sorted maps in concurrent programming.
While unmodifiable maps are thread-safe for reads, we examine their behavior
when the underlying map changes concurrently.

ConcurrentUnmodifiableSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ConcurrentUnmodifiableSortedMap {

    public static void main(String[] args) throws InterruptedException {
        
        SortedMap&lt;String, Integer&gt; stock = new TreeMap&lt;&gt;();
        stock.put("WidgetA", 100);
        stock.put("WidgetB", 150);
        
        SortedMap&lt;String, Integer&gt; unmodifiableStock = 
            Collections.unmodifiableSortedMap(stock);
        
        ExecutorService executor = Executors.newFixedThreadPool(2);
        
        // Reader thread
        executor.submit(() -&gt; {
            for (int i = 0; i &lt; 5; i++) {
                System.out.println("Reader: " + unmodifiableStock);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        // Writer thread (modifies original map)
        executor.submit(() -&gt; {
            try {
                Thread.sleep(50); // Let reader start first
                stock.put("WidgetC", 200);
                System.out.println("\nWriter added WidgetC");
                Thread.sleep(100);
                stock.remove("WidgetA");
                System.out.println("Writer removed WidgetA");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.SECONDS);
        
        System.out.println("\nFinal state: " + unmodifiableStock);
    }
}

This example demonstrates that unmodifiable sorted maps are safe for concurrent
reads but reflect changes to the underlying map. We create a TreeMap,
make it unmodifiable, and then have two threads: one reading from the unmodifiable
view and another modifying the original map.

The reader thread sees the changes made by the writer thread, demonstrating that
the unmodifiable view is live and reflects underlying changes. To ensure thread
safety, you would need to synchronize access to the original map or use a
concurrent map implementation like ConcurrentSkipListMap.

## Real-world Use Case: Configuration Management

This example shows a practical application of
Collections.unmodifiableSortedMap in a configuration management
system. We create a class that provides read-only access to sorted configuration
data while allowing privileged updates.

ConfigManagerUnmodifiableSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class ConfigManagerUnmodifiableSortedMap {

    private SortedMap&lt;String, String&gt; config = new TreeMap&lt;&gt;();
    private SortedMap&lt;String, String&gt; unmodifiableConfig = 
        Collections.unmodifiableSortedMap(config);
    
    public ConfigManagerUnmodifiableSortedMap() {
        config.put("db.host", "localhost");
        config.put("db.port", "3306");
        config.put("app.name", "MyApp");
    }
    
    public SortedMap&lt;String, String&gt; getConfig() {
        return unmodifiableConfig;
    }
    
    public void updateConfig(String key, String value) {
        config.put(key, value);
    }
    
    public static void main(String[] args) {
        ConfigManagerUnmodifiableSortedMap manager = 
            new ConfigManagerUnmodifiableSortedMap();
        
        SortedMap&lt;String, String&gt; configView = manager.getConfig();
        System.out.println("Initial config: " + configView);
        
        try {
            configView.put("db.user", "admin");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify config view directly");
        }
        
        manager.updateConfig("db.user", "admin");
        System.out.println("Updated config: " + configView);
    }
}

This example demonstrates using unmodifiableSortedMap in a
configuration manager. The class maintains a sorted map of configuration
properties and exposes an unmodifiable view to clients. Authorized updates go
through the updateConfig method.

The output shows that direct modifications to the view are prevented, but
updates through the manager are reflected in the view. This pattern is useful
for maintaining sorted configuration data with controlled access.

## Source

[Java Collections.unmodifiableSortedMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableSortedMap-java.util.SortedMap-)

In this tutorial, we've explored Collections.unmodifiableSortedMap
in depth. We've covered basic usage, custom comparators, submap operations,
performance characteristics, serialization, concurrent access, and a practical
use case in configuration management. This method is valuable for creating
read-only views of sorted maps while preserving their ordering properties.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).