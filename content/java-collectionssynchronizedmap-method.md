+++
title = "Java Collections.synchronizedMap Method"
date = 2025-08-29T19:58:25.828+01:00
draft = false
description = "Complete Java Collections.synchronizedMap tutorial with examples. Learn how to create thread-safe maps in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.synchronizedMap Method

Last modified: April 20, 2025

 

The Collections.synchronizedMap method creates a thread-safe
version of a Map. It wraps the original map and provides synchronized access
to all its operations. This is essential for multi-threaded environments.

Synchronized maps ensure that only one thread can access the map at a time.
They prevent concurrent modification exceptions and data corruption. However,
they may impact performance due to synchronization overhead.

## Basic Definitions

A synchronized map is a wrapper around a regular map that adds thread safety.
All access to the map is controlled by a single lock. This prevents multiple
threads from modifying the map simultaneously.

The synchronization is at the method level. Compound operations still require
external synchronization. Iterators must be manually synchronized during use.

## Creating a Synchronized Map

This example shows how to create a synchronized map from a HashMap. The
Collections.synchronizedMap method takes any Map implementation
and returns a thread-safe version.

SynchronizedMapCreation.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SynchronizedMapCreation {

    public static void main(String[] args) {
        
        // Create regular HashMap
        Map&lt;String, Integer&gt; unsyncMap = new HashMap&lt;&gt;();
        
        // Create synchronized wrapper
        Map&lt;String, Integer&gt; syncMap = 
            Collections.synchronizedMap(unsyncMap);
        
        // Add elements to synchronized map
        syncMap.put("Apple", 1);
        syncMap.put("Banana", 2);
        syncMap.put("Cherry", 3);
        
        System.out.println("Synchronized map: " + syncMap);
    }
}

This code demonstrates basic synchronized map creation. We first create a regular
HashMap, then wrap it using Collections.synchronizedMap. The
resulting map can be safely used across multiple threads.

The synchronized map delegates all operations to the original map while adding
synchronization. All method calls are atomic and thread-safe.

## Multi-threaded Access

This example demonstrates how synchronized maps handle concurrent access. We
create multiple threads that modify the map simultaneously. The synchronization
prevents data corruption.

SynchronizedMapThreads.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SynchronizedMapThreads {

    public static void main(String[] args) throws InterruptedException {
        
        Map&lt;Integer, String&gt; syncMap = 
            Collections.synchronizedMap(new HashMap&lt;&gt;());
        
        // Create and start multiple threads
        Thread[] threads = new Thread[5];
        for (int i = 0; i &lt; threads.length; i++) {
            final int threadId = i;
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; 100; j++) {
                    syncMap.put(threadId * 100 + j, 
                        "Thread-" + threadId + "-" + j);
                }
            });
            threads[i].start();
        }
        
        // Wait for all threads to complete
        for (Thread t : threads) {
            t.join();
        }
        
        System.out.println("Map size: " + syncMap.size());
    }
}

This example shows synchronized map usage in a multi-threaded environment. Five
threads concurrently add entries to the map. Without synchronization, this
would cause data corruption or exceptions.

The synchronized map ensures thread-safe access. Each put operation is atomic.
The final size shows all entries were added successfully.

## Iterating a Synchronized Map

Iterating over a synchronized map requires manual synchronization. While
individual operations are thread-safe, iteration involves multiple calls.
This example shows the proper way to iterate.

SynchronizedMapIteration.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SynchronizedMapIteration {

    public static void main(String[] args) {
        
        Map&lt;String, Integer&gt; syncMap = 
            Collections.synchronizedMap(new HashMap&lt;&gt;());
        
        syncMap.put("A", 1);
        syncMap.put("B", 2);
        syncMap.put("C", 3);
        
        // Proper synchronized iteration
        synchronized (syncMap) {
            for (Map.Entry&lt;String, Integer&gt; entry : syncMap.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        }
    }
}

This example demonstrates safe iteration over a synchronized map. We use a
synchronized block to ensure the entire iteration is atomic. Without this,
concurrent modifications could cause exceptions.

The synchronized block locks the map during iteration. This prevents other
threads from modifying the map while we're iterating over it.

## Compound Operations

Compound operations on synchronized maps require external synchronization.
This example shows how to safely perform check-then-act operations.
Individual method calls are atomic, but sequences are not.

SynchronizedMapCompound.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SynchronizedMapCompound {

    public static void main(String[] args) {
        
        Map&lt;String, Integer&gt; syncMap = 
            Collections.synchronizedMap(new HashMap&lt;&gt;());
        
        // Unsafe compound operation
        if (!syncMap.containsKey("Apple")) {
            syncMap.put("Apple", 1); // Race condition possible
        }
        
        // Safe compound operation
        synchronized (syncMap) {
            if (!syncMap.containsKey("Banana")) {
                syncMap.put("Banana", 2);
            }
        }
        
        System.out.println("Map: " + syncMap);
    }
}

This example highlights the need for external synchronization with compound
operations. The first operation is unsafe as another thread could modify the
map between the contains check and the put.

The second operation uses a synchronized block to make the entire sequence
atomic. This ensures thread safety for the check-then-act pattern.

## Performance Considerations

Synchronized maps have performance overhead due to locking. This example
compares synchronized and unsynchronized map performance for read-heavy
workloads.

SynchronizedMapPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SynchronizedMapPerformance {

    public static void main(String[] args) {
        
        Map&lt;Integer, String&gt; unsyncMap = new HashMap&lt;&gt;();
        Map&lt;Integer, String&gt; syncMap = 
            Collections.synchronizedMap(new HashMap&lt;&gt;());
        
        // Populate maps
        for (int i = 0; i &lt; 10000; i++) {
            unsyncMap.put(i, "Value" + i);
            syncMap.put(i, "Value" + i);
        }
        
        // Test unsynchronized map
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; 100000; i++) {
            unsyncMap.get(i % 10000);
        }
        System.out.println("Unsync time: " + 
            (System.currentTimeMillis() - start) + "ms");
        
        // Test synchronized map
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; 100000; i++) {
            syncMap.get(i % 10000);
        }
        System.out.println("Sync time: " + 
            (System.currentTimeMillis() - start) + "ms");
    }
}

This benchmark compares read performance between synchronized and unsynchronized
maps. The synchronized map shows higher latency due to lock acquisition.

The difference is more pronounced in highly concurrent scenarios. For write-heavy
workloads, consider ConcurrentHashMap for better performance.

## Alternative to SynchronizedMap

Java provides ConcurrentHashMap as a modern alternative to synchronized maps.
This example compares both approaches for concurrent access.

ConcurrentHashMapExample.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapExample {

    public static void main(String[] args) throws InterruptedException {
        
        Map&lt;Integer, String&gt; syncMap = 
            Collections.synchronizedMap(new HashMap&lt;&gt;());
        Map&lt;Integer, String&gt; concurrentMap = new ConcurrentHashMap&lt;&gt;();
        
        // Test synchronized map
        long start = System.currentTimeMillis();
        testMap(syncMap);
        System.out.println("SynchronizedMap time: " + 
            (System.currentTimeMillis() - start) + "ms");
        
        // Test ConcurrentHashMap
        start = System.currentTimeMillis();
        testMap(concurrentMap);
        System.out.println("ConcurrentHashMap time: " + 
            (System.currentTimeMillis() - start) + "ms");
    }
    
    private static void testMap(Map&lt;Integer, String&gt; map) 
            throws InterruptedException {
        
        Thread[] threads = new Thread[10];
        for (int i = 0; i &lt; threads.length; i++) {
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; 1000; j++) {
                    map.put(j, "Value");
                    map.get(j);
                }
            });
            threads[i].start();
        }
        
        for (Thread t : threads) {
            t.join();
        }
    }
}

This example demonstrates the performance difference between synchronized maps
and ConcurrentHashMap. ConcurrentHashMap uses finer-grained locking for better
throughput in concurrent scenarios.

For high-concurrency applications, ConcurrentHashMap is generally preferred.
It provides better scalability while maintaining thread safety.

## Source

[Java Collections.synchronizedMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedMap-java.util.Map-)

In this article, we've explored Java's Collections.synchronizedMap
method in depth. We covered creation, multi-threaded access, iteration,
compound operations, and performance considerations. Understanding these
concepts is crucial for building thread-safe applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).