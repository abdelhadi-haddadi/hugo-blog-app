+++
title = "Java Collections.synchronizedCollection"
date = 2025-08-29T19:58:24.717+01:00
draft = false
description = "Complete Java Collections.synchronizedCollection tutorial with examples. Learn how to create thread-safe collections in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.synchronizedCollection

Last modified: April 20, 2025

 

The Collections.synchronizedCollection method creates thread-safe
wrappers around collections. It returns a synchronized (thread-safe) collection
backed by the specified collection. This is essential for multi-threaded
environments.

All access to the returned collection must be through the synchronized wrapper.
The wrapper ensures that all method calls are atomic. However, manual
synchronization is still needed for compound operations.

## Collections.synchronizedCollection Overview

The synchronizedCollection method is part of Java's Collections
utility class. It provides basic thread safety for collection operations. The
method wraps any Collection implementation with synchronization.

The returned collection serializes all method access. This prevents concurrent
modification issues. However, iteration requires explicit synchronization to
avoid ConcurrentModificationException.

## Basic Synchronized Collection

This example demonstrates creating a basic synchronized collection. We wrap an
ArrayList with Collections.synchronizedCollection. The example
shows basic operations on the synchronized collection.

BasicSynchronizedCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class BasicSynchronizedCollection {

    public static void main(String[] args) {
        
        Collection&lt;String&gt; baseCollection = new ArrayList&lt;&gt;();
        Collection&lt;String&gt; syncCollection = 
            Collections.synchronizedCollection(baseCollection);
        
        // Add elements in a thread-safe manner
        syncCollection.add("Java");
        syncCollection.add("Python");
        syncCollection.add("C++");
        
        System.out.println("Synchronized collection: " + syncCollection);
        
        // Remove an element
        syncCollection.remove("Python");
        System.out.println("After removal: " + syncCollection);
        
        // Check size
        System.out.println("Size: " + syncCollection.size());
    }
}

This code creates a synchronized wrapper around an ArrayList. All operations on
syncCollection are thread-safe. The example demonstrates adding,
removing, and checking size of elements.

The output shows the collection's state after each operation. The synchronized
wrapper ensures these operations are atomic when accessed from multiple threads.

## Multi-threaded Access

This example shows how multiple threads can safely access a synchronized
collection. We create several threads that concurrently modify the collection.
The synchronized wrapper prevents data corruption.

MultiThreadSynchronizedCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class MultiThreadSynchronizedCollection {

    public static void main(String[] args) throws InterruptedException {
        
        Collection&lt;Integer&gt; numbers = 
            Collections.synchronizedCollection(new ArrayList&lt;&gt;());
        
        // Create and start multiple threads
        Thread[] threads = new Thread[5];
        for (int i = 0; i &lt; threads.length; i++) {
            final int threadId = i;
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; 100; j++) {
                    numbers.add(threadId * 100 + j);
                }
            });
            threads[i].start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("Total elements: " + numbers.size());
    }
}

This example demonstrates thread-safe collection access. Five threads each add
100 elements to the collection concurrently. The synchronized wrapper ensures
all additions are properly serialized.

The final count should be exactly 500 elements (5 threads × 100 elements each).
Without synchronization, the count would be unpredictable due to race conditions.

## Iterating with Synchronization

Iterating over a synchronized collection requires explicit synchronization. This
example shows the correct way to iterate while maintaining thread safety. The
collection is locked during the entire iteration.

SynchronizedIteration.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class SynchronizedIteration {

    public static void main(String[] args) {
        
        Collection&lt;String&gt; syncCollection = 
            Collections.synchronizedCollection(new ArrayList&lt;&gt;());
        
        syncCollection.add("Apple");
        syncCollection.add("Banana");
        syncCollection.add("Cherry");
        
        // Proper synchronized iteration
        synchronized (syncCollection) {
            for (String item : syncCollection) {
                System.out.println(item);
            }
        }
        
        // Alternative with forEach (Java 8+)
        syncCollection.forEach(System.out::println);
    }
}

This example demonstrates two approaches to iteration. The first uses explicit
synchronization to prevent concurrent modification during iteration. The second
uses the forEach method which is internally synchronized.

Both approaches are thread-safe, but the synchronized block provides more
control. The forEach method is more concise but may be less flexible for
complex operations.

## Compound Operations

Compound operations on synchronized collections require additional synchronization.
This example demonstrates checking and then adding an element atomically. The
entire operation must be synchronized to be thread-safe.

CompoundOperations.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class CompoundOperations {

    public static void main(String[] args) {
        
        Collection&lt;String&gt; syncCollection = 
            Collections.synchronizedCollection(new ArrayList&lt;&gt;());
        
        // Add some initial elements
        syncCollection.add("Red");
        syncCollection.add("Green");
        
        // Thread-safe compound operation
        synchronized (syncCollection) {
            if (!syncCollection.contains("Blue")) {
                syncCollection.add("Blue");
            }
        }
        
        System.out.println("Collection: " + syncCollection);
    }
}

This example shows a common pattern: check-then-act. The contains check and
subsequent add must be atomic to prevent race conditions. The synchronized
block ensures no other thread can modify the collection between these operations.

Without this synchronization, another thread could add "Blue" between our check
and add. This would result in duplicate elements or other inconsistencies.

## Synchronized Collection vs Concurrent Collections

This example compares synchronized collections with concurrent collections like
CopyOnWriteArrayList. It demonstrates performance differences and use cases for
each approach.

SyncVsConcurrent.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.concurrent.CopyOnWriteArrayList;

public class SyncVsConcurrent {

    public static void main(String[] args) {
        
        // Synchronized collection
        Collection&lt;Integer&gt; syncCollection = 
            Collections.synchronizedCollection(new ArrayList&lt;&gt;());
        
        // Concurrent collection
        Collection&lt;Integer&gt; concurrentCollection = 
            new CopyOnWriteArrayList&lt;&gt;();
        
        long start, end;
        
        // Test synchronized collection
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; 10000; i++) {
            syncCollection.add(i);
        }
        end = System.currentTimeMillis();
        System.out.println("Synchronized collection time: " + 
            (end - start) + "ms");
        
        // Test concurrent collection
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; 10000; i++) {
            concurrentCollection.add(i);
        }
        end = System.currentTimeMillis();
        System.out.println("Concurrent collection time: " + 
            (end - start) + "ms");
    }
}

This example benchmarks synchronized collections against concurrent collections.
Synchronized collections use coarse-grained locking, while concurrent collections
use more sophisticated techniques. The performance characteristics differ based
on use case.

Synchronized collections are generally better for write-heavy workloads with
simple operations. Concurrent collections often perform better for read-heavy
workloads or complex operations.

## Synchronized Collection with Custom Objects

This example demonstrates using synchronized collections with custom objects. It
shows how to ensure thread safety when the collection elements themselves might
be accessed from multiple threads.

CustomObjectsInSyncCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

class Product {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    public synchronized void updatePrice(double newPrice) {
        this.price = newPrice;
    }
    
    @Override
    public synchronized String toString() {
        return name + ": $" + price;
    }
}

public class CustomObjectsInSyncCollection {

    public static void main(String[] args) {
        
        Collection&lt;Product&gt; products = 
            Collections.synchronizedCollection(new ArrayList&lt;&gt;());
        
        // Add products
        products.add(new Product("Laptop", 999.99));
        products.add(new Product("Phone", 699.99));
        
        // Update prices from multiple threads
        Thread t1 = new Thread(() -&gt; {
            for (Product p : products) {
                p.updatePrice(p.toString().contains("Laptop") ? 899.99 : 599.99);
            }
        });
        
        Thread t2 = new Thread(() -&gt; {
            synchronized (products) {
                for (Product p : products) {
                    System.out.println(p);
                }
            }
        });
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example shows a collection of custom Product objects. The Product class has
its own synchronization for price updates. The collection wrapper ensures
thread-safe access to the collection structure.

Note that synchronizing the collection doesn't automatically synchronize access
to the elements. The Product class must handle its own synchronization for
thread-safe element access.

## Synchronized Collection Performance Considerations

This example demonstrates performance implications of synchronized collections.
It shows how synchronization overhead affects operations in single-threaded and
multi-threaded scenarios.

SyncCollectionPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class SyncCollectionPerformance {

    public static void main(String[] args) {
        
        final int ELEMENTS = 100000;
        
        // Unsynchronized collection
        Collection&lt;Integer&gt; normalCollection = new ArrayList&lt;&gt;();
        
        // Synchronized collection
        Collection&lt;Integer&gt; syncCollection = 
            Collections.synchronizedCollection(new ArrayList&lt;&gt;());
        
        // Test unsynchronized add
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ELEMENTS; i++) {
            normalCollection.add(i);
        }
        long end = System.currentTimeMillis();
        System.out.println("Normal collection add time: " + 
            (end - start) + "ms");
        
        // Test synchronized add
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ELEMENTS; i++) {
            syncCollection.add(i);
        }
        end = System.currentTimeMillis();
        System.out.println("Synchronized collection add time: " + 
            (end - start) + "ms");
        
        // Test multi-threaded synchronized add
        syncCollection.clear();
        start = System.currentTimeMillis();
        Thread[] threads = new Thread[4];
        for (int i = 0; i &lt; threads.length; i++) {
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; ELEMENTS/threads.length; j++) {
                    syncCollection.add(j);
                }
            });
            threads[i].start();
        }
        for (Thread t : threads) {
            try {
                t.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        end = System.currentTimeMillis();
        System.out.println("Multi-threaded sync collection add time: " + 
            (end - start) + "ms");
    }
}

This example benchmarks synchronized collection performance. It compares
single-threaded operations between synchronized and unsynchronized collections.
It also measures multi-threaded performance with the synchronized collection.

The results show that synchronization adds overhead in single-threaded scenarios.
However, in multi-threaded environments, the synchronization prevents data
corruption and ensures thread safety at the cost of some performance.

## Source

[Java Collections.synchronizedCollection Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedCollection-java.util.Collection-)

In this article, we've explored Java's Collections.synchronizedCollection
method in depth. We've covered basic usage, multi-threaded access, iteration,
compound operations, and performance considerations. Understanding these concepts
is crucial for developing thread-safe applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).