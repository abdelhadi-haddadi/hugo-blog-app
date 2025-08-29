+++
title = "Java Collections.synchronizedList Method"
date = 2025-08-29T19:58:25.850+01:00
draft = false
description = "Complete Java Collections.synchronizedList tutorial with examples. Learn how to create thread-safe lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.synchronizedList Method

Last modified: April 20, 2025

 

The Collections.synchronizedList method provides thread-safe
access to List implementations. It returns a synchronized (thread-safe) list
backed by the specified list. All operations are synchronized, preventing
concurrent modification issues.

This method is part of Java's Collections Framework utility class. It wraps
existing List implementations to make them thread-safe. The returned list must
be manually synchronized for iteration.

## Collections.synchronizedList Overview

The synchronizedList method creates a thread-safe wrapper around
a List. It synchronizes all individual operations like add, remove, and get.
This prevents data corruption in multi-threaded environments.

While individual operations are thread-safe, compound operations require
external synchronization. Iteration also needs manual synchronization to
prevent ConcurrentModificationException. The method is declared in the
Collections utility class.

## Basic synchronizedList Example

This example demonstrates creating a synchronized list from an ArrayList.
We perform basic operations to show thread-safe access. The example shows
how to create and use a synchronized list.

BasicSynchronizedList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicSynchronizedList {

    public static void main(String[] args) {
        
        // Create regular ArrayList
        List&lt;String&gt; normalList = new ArrayList&lt;&gt;();
        
        // Create synchronized list
        List&lt;String&gt; syncList = Collections.synchronizedList(normalList);
        
        // Add elements - thread-safe
        syncList.add("Apple");
        syncList.add("Banana");
        syncList.add("Cherry");
        
        // Remove element - thread-safe
        syncList.remove("Banana");
        
        System.out.println("Synchronized list: " + syncList);
    }
}

This code shows basic usage of Collections.synchronizedList. We
create a regular ArrayList, then wrap it in a synchronized list. All operations
on syncList are thread-safe.

The output demonstrates that the synchronized list behaves like a normal list
but with thread safety. Individual operations like add and remove are atomic.

## Multi-thread Access Example

This example demonstrates thread-safe access to a synchronized list from
multiple threads. We create several threads that concurrently modify the list.
The synchronized wrapper prevents data corruption.

MultiThreadSynchronizedList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MultiThreadSynchronizedList {

    public static void main(String[] args) throws InterruptedException {
        
        List&lt;Integer&gt; numbers = Collections.synchronizedList(new ArrayList&lt;&gt;());
        
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
        for (Thread t : threads) {
            t.join();
        }
        
        System.out.println("Total elements: " + numbers.size());
    }
}

This example shows how multiple threads can safely access a synchronized list.
Each thread adds 100 elements to the shared list. Without synchronization,
this would cause data corruption.

The output shows the correct total count of 500 elements (5 threads × 100
elements each). The synchronized list ensures thread-safe access during
concurrent modification.

## Iterating a Synchronized List

Iterating a synchronized list requires manual synchronization. While individual
operations are thread-safe, iteration involves multiple operations. This example
shows the correct way to iterate.

SynchronizedListIteration.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SynchronizedListIteration {

    public static void main(String[] args) {
        
        List&lt;String&gt; syncList = Collections.synchronizedList(new ArrayList&lt;&gt;());
        
        syncList.add("Red");
        syncList.add("Green");
        syncList.add("Blue");
        
        // Proper synchronized iteration
        synchronized(syncList) {
            for (String color : syncList) {
                System.out.println(color);
            }
        }
        
        // Unsafe iteration (may throw ConcurrentModificationException)
        // for (String color : syncList) {
        //     System.out.println(color);
        // }
    }
}

This example demonstrates the correct way to iterate a synchronized list. The
entire iteration block is wrapped in a synchronized block using the list as
the lock.

The commented-out unsafe iteration shows what not to do. Without explicit
synchronization, concurrent modifications during iteration could cause
exceptions. Always synchronize iteration manually.

## Compound Operations Example

Compound operations on synchronized lists require external synchronization.
This example shows how to safely perform operations that involve multiple
method calls. The "check-then-act" pattern is demonstrated.

CompoundOperations.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CompoundOperations {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; syncList = Collections.synchronizedList(new ArrayList&lt;&gt;());
        
        // Unsafe compound operation
        if (!syncList.contains(42)) {
            syncList.add(42); // Race condition possible
        }
        
        // Safe compound operation
        synchronized(syncList) {
            if (!syncList.contains(42)) {
                syncList.add(42);
            }
        }
        
        System.out.println("List contains 42: " + syncList.contains(42));
    }
}

This example highlights the need for external synchronization with compound
operations. The unsafe version shows a potential race condition between
contains and add calls.

The safe version wraps both operations in a synchronized block. This ensures
atomic execution of the compound operation. Always synchronize multi-step
operations manually.

## Performance Comparison

This example compares the performance of synchronized lists versus regular
lists. Synchronization adds overhead but provides thread safety. The test
measures the performance impact.

PerformanceComparison.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PerformanceComparison {

    public static void main(String[] args) {
        
        final int ITERATIONS = 1000000;
        List&lt;Integer&gt; normalList = new ArrayList&lt;&gt;();
        List&lt;Integer&gt; syncList = Collections.synchronizedList(new ArrayList&lt;&gt;());
        
        // Test normal list
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            normalList.add(i);
        }
        long normalTime = System.currentTimeMillis() - start;
        
        // Test synchronized list
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            syncList.add(i);
        }
        long syncTime = System.currentTimeMillis() - start;
        
        System.out.println("Normal list time: " + normalTime + "ms");
        System.out.println("Sync list time: " + syncTime + "ms");
        System.out.println("Overhead: " + (syncTime - normalTime) + "ms");
    }
}

This performance test compares synchronized and unsynchronized list operations.
The synchronized version shows measurable overhead due to locking. The exact
difference depends on system and JVM characteristics.

The output demonstrates the trade-off between thread safety and performance.
Use synchronized lists only when thread safety is required. Consider other
options like CopyOnWriteArrayList for specific use cases.

## Alternative to synchronizedList

This example shows CopyOnWriteArrayList as an alternative to synchronizedList.
It provides thread safety without explicit synchronization. The trade-offs
between these approaches are discussed.

CopyOnWriteExample.java
  

package com.zetcode;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class CopyOnWriteExample {

    public static void main(String[] args) {
        
        List&lt;String&gt; cowList = new CopyOnWriteArrayList&lt;&gt;();
        
        cowList.add("Java");
        cowList.add("Python");
        cowList.add("C++");
        
        // Safe iteration without synchronization
        for (String lang : cowList) {
            System.out.println(lang);
            cowList.add("JavaScript"); // Modification during iteration
        }
        
        System.out.println("Final list: " + cowList);
    }
}

CopyOnWriteArrayList provides thread safety through a different mechanism. It
creates a new copy of the underlying array on modification. This allows safe
iteration without synchronization.

The example shows modification during iteration, which would fail with a
synchronized list. The trade-off is higher memory usage and write overhead.
Choose based on your specific requirements.

## Real-world Use Case

This example demonstrates a real-world scenario using synchronizedList. We
simulate a logging system where multiple threads add log entries. The
synchronized list ensures thread-safe logging.

LoggingSystem.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class LoggingSystem {

    private final List&lt;String&gt; logEntries;
    
    public LoggingSystem() {
        this.logEntries = Collections.synchronizedList(new ArrayList&lt;&gt;());
    }
    
    public void addLogEntry(String entry) {
        logEntries.add(entry);
    }
    
    public void processLogs() {
        synchronized(logEntries) {
            for (String entry : logEntries) {
                System.out.println(entry);
            }
            logEntries.clear();
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        LoggingSystem logger = new LoggingSystem();
        
        // Simulate multiple threads logging
        Thread[] threads = new Thread[3];
        for (int i = 0; i &lt; threads.length; i++) {
            final int threadId = i;
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; 5; j++) {
                    logger.addLogEntry("Thread " + threadId + " - Message " + j);
                }
            });
            threads[i].start();
        }
        
        // Wait for threads to finish
        for (Thread t : threads) {
            t.join();
        }
        
        // Process logs
        logger.processLogs();
    }
}

This example shows a practical use of synchronizedList in a logging system.
Multiple threads can safely add log entries concurrently. The processLogs
method demonstrates proper synchronized iteration and clearing.

The output shows all log entries from different threads interleaved but
without corruption. This pattern is common in real-world concurrent
applications.

## Source

[Java Collections.synchronizedList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedList-java.util.List-)

In this article, we've explored Java's Collections.synchronizedList
method in depth. We've covered basic usage, multi-thread scenarios, iteration,
performance, and alternatives. Understanding thread-safe collections is crucial
for concurrent programming.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).