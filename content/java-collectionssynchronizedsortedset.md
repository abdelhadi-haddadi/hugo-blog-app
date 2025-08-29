+++
title = "Java Collections.synchronizedSortedSet"
date = 2025-08-29T19:58:26.950+01:00
draft = false
description = "Complete Java Collections.synchronizedSortedSet tutorial with examples. Learn how to use synchronized sorted sets in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.synchronizedSortedSet

Last modified: April 20, 2025

 

The Collections.synchronizedSortedSet method provides thread-safe
access to sorted sets. It returns a synchronized (thread-safe) sorted set backed
by the specified sorted set. This wrapper ensures safe concurrent access.

In multi-threaded environments, direct access to collections can cause issues.
The synchronized wrapper prevents data corruption by synchronizing all operations.
It's part of Java's Collections Framework utility methods.

## SortedSet and Synchronization Basics

A SortedSet maintains elements in ascending order according to their
natural ordering or a comparator. However, standard implementations like
TreeSet are not thread-safe. Synchronization is needed for
multi-threaded access.

The Collections.synchronizedSortedSet method solves this by wrapping
the set. All access to the returned set is synchronized on the set itself. This
prevents concurrent modification issues.

## Basic SynchronizedSortedSet Example

This example demonstrates creating a synchronized sorted set from a TreeSet. We
show basic operations like adding elements and iteration. The synchronized wrapper
ensures thread safety.

BasicSynchronizedSortedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class BasicSynchronizedSortedSet {

    public static void main(String[] args) {
        
        // Create a regular TreeSet
        SortedSet&lt;String&gt; treeSet = new TreeSet&lt;&gt;();
        
        // Wrap it in a synchronized sorted set
        SortedSet&lt;String&gt; syncSet = Collections.synchronizedSortedSet(treeSet);
        
        // Add elements
        syncSet.add("Apple");
        syncSet.add("Banana");
        syncSet.add("Cherry");
        
        // Iterate (must synchronize manually for iteration)
        synchronized(syncSet) {
            for (String fruit : syncSet) {
                System.out.println(fruit);
            }
        }
        
        System.out.println("Size: " + syncSet.size());
    }
}

This code creates a synchronized wrapper around a TreeSet. All operations on the
set are now thread-safe. Note that iteration requires explicit synchronization.
The output shows the elements in sorted order.

The synchronized wrapper ensures safe concurrent access. However, compound
operations still need external synchronization. The example demonstrates proper
iteration synchronization.

## Multi-threaded Access Example

This example shows how multiple threads can safely access a synchronized sorted
set. We create two threads that concurrently add elements. The synchronized
wrapper prevents corruption.

MultiThreadedSortedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class MultiThreadedSortedSet {

    public static void main(String[] args) throws InterruptedException {
        
        SortedSet&lt;Integer&gt; syncSet = Collections.synchronizedSortedSet(
            new TreeSet&lt;&gt;());
        
        // Create and start two threads
        Thread t1 = new Thread(() -&gt; addNumbers(syncSet, 0, 50));
        Thread t2 = new Thread(() -&gt; addNumbers(syncSet, 50, 100));
        
        t1.start();
        t2.start();
        
        t1.join();
        t2.join();
        
        // Verify all numbers were added
        System.out.println("Total elements: " + syncSet.size());
        System.out.println("First: " + syncSet.first());
        System.out.println("Last: " + syncSet.last());
    }
    
    private static void addNumbers(SortedSet&lt;Integer&gt; set, int start, int end) {
        for (int i = start; i &lt; end; i++) {
            set.add(i);
        }
    }
}

This example demonstrates thread-safe concurrent access. Two threads add numbers
to the set simultaneously. The synchronized wrapper prevents race conditions.
The final output shows all numbers were added correctly.

Note that while individual operations are thread-safe, compound operations may
need additional synchronization. The example shows proper thread coordination
using join().

## Comparator with SynchronizedSortedSet

This example demonstrates using a custom comparator with a synchronized sorted
set. We create a case-insensitive sorted set and wrap it for thread safety. The
comparator defines the sorting order.

ComparatorSortedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class ComparatorSortedSet {

    public static void main(String[] args) {
        
        // Create comparator for case-insensitive sorting
        Comparator&lt;String&gt; ignoreCase = String.CASE_INSENSITIVE_ORDER;
        
        // Create sorted set with comparator
        SortedSet&lt;String&gt; treeSet = new TreeSet&lt;&gt;(ignoreCase);
        
        // Wrap in synchronized set
        SortedSet&lt;String&gt; syncSet = Collections.synchronizedSortedSet(treeSet);
        
        // Add mixed-case elements
        syncSet.add("apple");
        syncSet.add("Banana");
        syncSet.add("CHERRY");
        syncSet.add("dATE");
        
        // Iterate (with synchronization)
        synchronized(syncSet) {
            for (String fruit : syncSet) {
                System.out.println(fruit);
            }
        }
    }
}

This code creates a case-insensitive sorted set and wraps it for thread safety.
The comparator ensures proper ordering regardless of case. The synchronized
wrapper makes all operations thread-safe.

The output shows elements sorted case-insensitively. The synchronization ensures
safe access even if multiple threads modify the set concurrently.

## Bulk Operations with SynchronizedSortedSet

This example demonstrates bulk operations on a synchronized sorted set. We show
addAll, removeAll, and retainAll
operations. Each operation is automatically synchronized.

BulkOperationsSortedSet.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class BulkOperationsSortedSet {

    public static void main(String[] args) {
        
        SortedSet&lt;String&gt; syncSet = Collections.synchronizedSortedSet(
            new TreeSet&lt;&gt;());
        
        // Add multiple elements
        syncSet.addAll(Arrays.asList("Apple", "Banana", "Cherry", "Date"));
        System.out.println("After addAll: " + syncSet);
        
        // Remove multiple elements
        syncSet.removeAll(Arrays.asList("Banana", "Date"));
        System.out.println("After removeAll: " + syncSet);
        
        // Retain only specified elements
        syncSet.retainAll(Arrays.asList("Apple", "Cherry", "Fig"));
        System.out.println("After retainAll: " + syncSet);
        
        // Check contains all
        boolean hasAll = syncSet.containsAll(Arrays.asList("Apple", "Cherry"));
        System.out.println("Contains all: " + hasAll);
    }
}

This example shows bulk operations on a synchronized sorted set. Each operation
is thread-safe due to the synchronization wrapper. The output demonstrates how
each operation modifies the set.

Bulk operations are particularly useful when working with groups of elements.
The synchronized wrapper ensures these operations remain atomic and thread-safe.

## Iteration and Subset Operations

This example demonstrates subset operations and proper iteration techniques. We
show subSet, headSet, and tailSet methods.
Iteration requires explicit synchronization.

SubsetOperations.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class SubsetOperations {

    public static void main(String[] args) {
        
        SortedSet&lt;Integer&gt; syncSet = Collections.synchronizedSortedSet(
            new TreeSet&lt;&gt;());
        
        // Add numbers 1-100
        for (int i = 1; i &lt;= 100; i++) {
            syncSet.add(i);
        }
        
        // Get subset 40-60
        SortedSet&lt;Integer&gt; subSet = syncSet.subSet(40, 60);
        System.out.println("Subset 40-60 size: " + subSet.size());
        
        // Get headSet (elements &lt; 25)
        SortedSet&lt;Integer&gt; headSet = syncSet.headSet(25);
        System.out.println("HeadSet &lt;25 size: " + headSet.size());
        
        // Get tailSet (elements &gt;= 75)
        SortedSet&lt;Integer&gt; tailSet = syncSet.tailSet(75);
        System.out.println("TailSet &gt;=75 size: " + tailSet.size());
        
        // Iterate subset (with synchronization)
        synchronized(syncSet) {
            for (Integer num : subSet) {
                System.out.print(num + " ");
            }
        }
    }
}

This example demonstrates subset operations on a synchronized sorted set. The
subSet, headSet, and tailSet methods
create views of portions of the original set. These views are also synchronized.

The output shows the sizes of different subsets. The synchronized iteration
ensures thread-safe access during traversal. Subset operations are powerful for
working with ranges of sorted data.

## Performance Considerations

This example compares performance between synchronized and unsynchronized sorted
sets. We measure operation times for both to show synchronization overhead. The
test demonstrates when synchronization is necessary.

PerformanceComparison.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class PerformanceComparison {

    public static void main(String[] args) {
        
        final int ELEMENTS = 100000;
        
        // Unsynchronized set
        SortedSet&lt;Integer&gt; treeSet = new TreeSet&lt;&gt;();
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ELEMENTS; i++) {
            treeSet.add(i);
        }
        long unsyncTime = System.currentTimeMillis() - start;
        
        // Synchronized set
        SortedSet&lt;Integer&gt; syncSet = Collections.synchronizedSortedSet(
            new TreeSet&lt;&gt;());
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ELEMENTS; i++) {
            syncSet.add(i);
        }
        long syncTime = System.currentTimeMillis() - start;
        
        System.out.println("Unsynchronized add time: " + unsyncTime + "ms");
        System.out.println("Synchronized add time: " + syncTime + "ms");
        System.out.println("Overhead: " + 
            ((double)(syncTime - unsyncTime)/unsyncTime * 100) + "%");
    }
}

This code compares performance between synchronized and unsynchronized sorted
sets. The test adds many elements to both sets and measures the time taken.
The output shows the synchronization overhead percentage.

Synchronization adds overhead but is necessary for thread safety. In single-
threaded scenarios, prefer unsynchronized collections. The example helps
understand the performance trade-offs.

## Source

[Java Collections.synchronizedSortedSet Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedSortedSet-java.util.SortedSet-)

In this article, we've explored Collections.synchronizedSortedSet
in depth. We've covered basic usage, multi-threading, comparators, bulk
operations, subsets, and performance. Understanding these concepts is crucial
for thread-safe sorted set operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).