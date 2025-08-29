+++
title = "Java Collections.synchronizedSet Method"
date = 2025-08-29T19:58:25.840+01:00
draft = false
description = "Complete Java Collections.synchronizedSet tutorial with examples. Learn how to create thread-safe sets in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.synchronizedSet Method

Last modified: April 20, 2025

 

The Collections.synchronizedSet method is a utility method in Java's
Collections Framework. It returns a synchronized (thread-safe) set backed by the
specified set. This wrapper provides thread safety for basic operations.

All access to the returned set must be through the synchronized wrapper. The
method ensures that individual operations are atomic and thread-safe. However,
compound operations require external synchronization.

## Collections.synchronizedSet Overview

The synchronizedSet method is part of the java.util.Collections
class. It takes a Set as input and returns a thread-safe version.
The returned set's iterator requires manual synchronization for thread safety.

This method is useful when you need thread safety but don't want to use
ConcurrentHashMap-based sets. It's simpler but may have lower
performance under high contention compared to concurrent collections.

## Basic synchronizedSet Example

This example demonstrates creating a synchronized set from a HashSet. We perform
basic operations like add, remove, and contains. The example shows the basic
thread-safe wrapper usage.

SynchronizedSetBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SynchronizedSetBasic {

    public static void main(String[] args) {
        
        Set&lt;String&gt; normalSet = new HashSet&lt;&gt;();
        Set&lt;String&gt; syncSet = Collections.synchronizedSet(normalSet);
        
        // Add elements to synchronized set
        syncSet.add("Apple");
        syncSet.add("Banana");
        syncSet.add("Cherry");
        
        // Check size and contents
        System.out.println("Size: " + syncSet.size());
        System.out.println("Contains Banana: " + syncSet.contains("Banana"));
        
        // Remove element
        syncSet.remove("Apple");
        System.out.println("After removal: " + syncSet);
    }
}

This code creates a synchronized set wrapper around a HashSet. All operations on
the synchronized set are thread-safe. The example shows basic operations that
are now protected against concurrent access.

The output demonstrates that the synchronized set behaves like a normal set for
single-threaded operations. The thread safety becomes apparent in multi-threaded
scenarios.

## Multi-threaded Access Example

This example demonstrates how synchronizedSet handles concurrent
access from multiple threads. We create several threads that modify the set
simultaneously. The synchronized wrapper prevents data corruption.

SynchronizedSetThreads.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SynchronizedSetThreads {

    public static void main(String[] args) throws InterruptedException {
        
        Set&lt;Integer&gt; numbers = Collections.synchronizedSet(new HashSet&lt;&gt;());
        
        // Create and start multiple threads
        Thread[] threads = new Thread[5];
        for (int i = 0; i &lt; threads.length; i++) {
            final int threadId = i;
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; 1000; j++) {
                    numbers.add(threadId * 1000 + j);
                }
            });
            threads[i].start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("Final set size: " + numbers.size());
    }
}

This example shows the thread-safe nature of synchronizedSet. Multiple threads
add elements concurrently without causing corruption. Each add operation is
atomic and protected by synchronization.

The final size should be exactly 5000 (5 threads × 1000 adds each). Without
synchronization, the size would likely be smaller due to lost updates.

## Iterating a Synchronized Set

Iterating over a synchronized set requires manual synchronization. This example
demonstrates the proper way to iterate while maintaining thread safety. The
iterator itself is not thread-safe without external synchronization.

SynchronizedSetIteration.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SynchronizedSetIteration {

    public static void main(String[] args) {
        
        Set&lt;String&gt; colors = Collections.synchronizedSet(new HashSet&lt;&gt;());
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        
        // Proper synchronized iteration
        synchronized(colors) {
            for (String color : colors) {
                System.out.println(color);
            }
        }
        
        // Unsafe iteration (may throw ConcurrentModificationException)
        try {
            for (String color : colors) {
                System.out.println(color);
            }
        } catch (Exception e) {
            System.out.println("Exception during unsafe iteration: " + e);
        }
    }
}

The example shows both safe and unsafe iteration approaches. The synchronized
block ensures no modifications occur during iteration. Without synchronization,
concurrent modifications may cause exceptions.

Always use manual synchronization when iterating over synchronized collections.
This prevents ConcurrentModificationException and ensures
consistent views.

## Compound Operations Example

Compound operations on synchronized sets require additional synchronization.
This example demonstrates how to safely perform check-then-act operations.
Individual operations are thread-safe, but sequences need protection.

SynchronizedSetCompound.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SynchronizedSetCompound {

    public static void main(String[] args) {
        
        Set&lt;String&gt; users = Collections.synchronizedSet(new HashSet&lt;&gt;());
        
        // Unsafe compound operation
        if (!users.contains("Admin")) {
            users.add("Admin"); // Race condition possible
        }
        
        // Safe compound operation
        synchronized(users) {
            if (!users.contains("Admin")) {
                users.add("Admin");
            }
        }
        
        System.out.println("Users: " + users);
    }
}

The example shows both unsafe and safe versions of a compound operation. The
unsafe version may still allow duplicate adds due to race conditions. The safe
version uses external synchronization for the entire operation sequence.

Always synchronize manually when performing multiple operations that must be
atomic. The synchronized set only protects individual method calls.

## Performance Comparison

This example compares the performance of synchronizedSet with regular HashSet
and ConcurrentHashMap's keySet. It demonstrates the overhead of synchronization.
Results will vary based on system and contention levels.

SynchronizedSetPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class SynchronizedSetPerformance {

    public static void main(String[] args) {
        
        final int ITERATIONS = 1_000_000;
        
        Set&lt;Integer&gt; hashSet = new HashSet&lt;&gt;();
        Set&lt;Integer&gt; syncSet = Collections.synchronizedSet(new HashSet&lt;&gt;());
        Set&lt;Integer&gt; concurrentSet = ConcurrentHashMap.newKeySet();
        
        // Test HashSet (unsynchronized)
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            hashSet.add(i);
        }
        System.out.println("HashSet time: " + 
            (System.currentTimeMillis() - start) + "ms");
        
        // Test synchronizedSet
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            syncSet.add(i);
        }
        System.out.println("synchronizedSet time: " + 
            (System.currentTimeMillis() - start) + "ms");
        
        // Test ConcurrentHashMap's keySet
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            concurrentSet.add(i);
        }
        System.out.println("ConcurrentSet time: " + 
            (System.currentTimeMillis() - start) + "ms");
    }
}

This performance test shows the relative overhead of different thread-safe set
implementations. synchronizedSet typically shows higher overhead
than ConcurrentHashMap's set under contention.

The results help choose between synchronization approaches based on performance
requirements. For read-heavy workloads, synchronizedSet may be
adequate.

## Real-world Usage Example

This example demonstrates a realistic use case for synchronizedSet -
tracking active user sessions in a web application. The set needs to be
thread-safe as sessions are added/removed concurrently.

SessionTracker.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Set;
import java.util.HashSet;

public class SessionTracker {

    private final Set&lt;String&gt; activeSessions = 
        Collections.synchronizedSet(new HashSet&lt;&gt;());
    
    public void addSession(String sessionId) {
        activeSessions.add(sessionId);
        System.out.println("Session added: " + sessionId);
    }
    
    public void removeSession(String sessionId) {
        activeSessions.remove(sessionId);
        System.out.println("Session removed: " + sessionId);
    }
    
    public int getActiveSessionCount() {
        return activeSessions.size();
    }
    
    public static void main(String[] args) {
        SessionTracker tracker = new SessionTracker();
        
        // Simulate concurrent session activity
        new Thread(() -&gt; {
            tracker.addSession("user1");
            tracker.addSession("user2");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            tracker.removeSession("user1");
        }).start();
        
        new Thread(() -&gt; {
            tracker.addSession("user3");
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            tracker.removeSession("user3");
            tracker.addSession("user4");
        }).start();
        
        try { Thread.sleep(200); } catch (InterruptedException e) {}
        System.out.println("Active sessions: " + tracker.getActiveSessionCount());
    }
}

This example models a web application session tracker. The synchronized set
ensures thread-safe session management. Multiple threads can safely add and
remove sessions concurrently.

The output shows sessions being added and removed. The final count correctly
reflects the remaining active sessions. This pattern is common in server
applications.

## Source

[Java Collections.synchronizedSet Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedSet-java.util.Set-)

In this tutorial, we've explored the Collections.synchronizedSet
method in depth. We covered basic usage, thread safety, iteration, compound
operations, performance, and real-world applications. This wrapper provides
simple thread safety for set operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).