+++
title = "Java Collections.synchronizedSortedMap"
date = 2025-08-29T19:58:26.976+01:00
draft = false
description = "Complete Java Collections.synchronizedSortedMap tutorial with examples. Learn how to use synchronized sorted maps in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.synchronizedSortedMap

Last modified: April 20, 2025

 

The Collections.synchronizedSortedMap method provides thread-safe
wrappers for SortedMap implementations. It returns a synchronized
(thread-safe) sorted map backed by the specified sorted map.

This method is essential for multi-threaded environments where multiple threads
access the same sorted map. It ensures atomic operations and prevents data
corruption. All access must be through the returned synchronized map.

## SortedMap Interface Overview

SortedMap extends the Map interface to provide
ordering on its keys. The map is ordered according to the natural ordering of
its keys or by a comparator. It provides methods to get sub-maps and access
first/last keys.

Key methods include comparator, firstKey,
lastKey, subMap, headMap, and
tailMap. Implementations include TreeMap.

## Basic synchronizedSortedMap Usage

This example demonstrates creating a synchronized sorted map from a TreeMap.
We perform basic operations like put, get, and iteration. The map remains
thread-safe for all these operations.

SynchronizedSortedMapBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedSortedMapBasic {

    public static void main(String[] args) {
        
        // Create a TreeMap
        SortedMap&lt;String, Integer&gt; treeMap = new TreeMap&lt;&gt;();
        
        // Create synchronized wrapper
        SortedMap&lt;String, Integer&gt; syncMap = 
            Collections.synchronizedSortedMap(treeMap);
        
        // Add elements
        syncMap.put("Apple", 10);
        syncMap.put("Banana", 20);
        syncMap.put("Cherry", 30);
        
        // Get element
        System.out.println("Banana quantity: " + syncMap.get("Banana"));
        
        // Iterate (must synchronize manually)
        synchronized(syncMap) {
            for (var entry : syncMap.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        }
    }
}

This code creates a synchronized sorted map from a TreeMap. We add elements,
retrieve values, and iterate safely. Note that iteration requires explicit
synchronization on the map object.

The output shows the map contents in sorted order. The synchronization ensures
thread safety during all operations.

## Multi-threaded Access Example

This example demonstrates thread-safe access to a synchronized sorted map from
multiple threads. We create producer and consumer threads that modify and read
the shared map.

SynchronizedSortedMapThreads.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedSortedMapThreads {

    public static void main(String[] args) throws InterruptedException {
        
        SortedMap&lt;Integer, String&gt; syncMap = 
            Collections.synchronizedSortedMap(new TreeMap&lt;&gt;());
        
        // Producer thread
        Thread producer = new Thread(() -&gt; {
            for (int i = 0; i &lt; 5; i++) {
                syncMap.put(i, "Value" + i);
                System.out.println("Added: " + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        // Consumer thread
        Thread consumer = new Thread(() -&gt; {
            synchronized(syncMap) {
                for (var entry : syncMap.entrySet()) {
                    System.out.println("Read: " + entry.getKey());
                    try {
                        Thread.sleep(150);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        });
        
        producer.start();
        Thread.sleep(50); // Let producer add first element
        consumer.start();
        
        producer.join();
        consumer.join();
        
        System.out.println("Final map: " + syncMap);
    }
}

This example shows safe concurrent access to a synchronized sorted map. The
producer adds elements while the consumer reads them. The synchronization
prevents concurrent modification exceptions.

Note the explicit synchronization during iteration. The output shows interleaved
add and read operations without data corruption.

## SubMap Operations with Synchronization

This example demonstrates using subMap operations with a synchronized sorted map.
We create a submap and perform operations on it while maintaining thread safety.

SynchronizedSubMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedSubMap {

    public static void main(String[] args) {
        
        SortedMap&lt;Integer, String&gt; syncMap = 
            Collections.synchronizedSortedMap(new TreeMap&lt;&gt;());
        
        // Populate map
        syncMap.put(1, "One");
        syncMap.put(2, "Two");
        syncMap.put(3, "Three");
        syncMap.put(4, "Four");
        syncMap.put(5, "Five");
        
        // Get submap (2 &lt;= key &lt; 4)
        SortedMap&lt;Integer, String&gt; subMap;
        synchronized(syncMap) {
            subMap = syncMap.subMap(2, 4);
        }
        
        // Must synchronize on original map for submap operations
        synchronized(syncMap) {
            System.out.println("SubMap contents:");
            subMap.forEach((k, v) -&gt; System.out.println(k + ": " + v));
            
            // Modify submap
            subMap.put(3, "THREE");
        }
        
        System.out.println("Original map after modification: " + syncMap);
    }
}

This code shows how to work with submaps from a synchronized sorted map. We
create a submap and perform operations while maintaining synchronization. Note
that submap operations require synchronization on the original map.

The output demonstrates that changes to the submap affect the original map. All
operations remain thread-safe when properly synchronized.

## Comparator with Synchronized SortedMap

This example demonstrates using a custom comparator with a synchronized sorted
map. We create a case-insensitive sorted map and wrap it for thread safety.

SynchronizedComparator.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedComparator {

    public static void main(String[] args) {
        
        // Create case-insensitive comparator
        Comparator&lt;String&gt; caseInsensitive = String.CASE_INSENSITIVE_ORDER;
        
        // Create TreeMap with comparator
        SortedMap&lt;String, Integer&gt; treeMap = new TreeMap&lt;&gt;(caseInsensitive);
        
        // Create synchronized wrapper
        SortedMap&lt;String, Integer&gt; syncMap = 
            Collections.synchronizedSortedMap(treeMap);
        
        // Add mixed-case keys
        syncMap.put("Apple", 1);
        syncMap.put("banana", 2);
        syncMap.put("CHERRY", 3);
        
        // Access with different cases
        System.out.println("apple: " + syncMap.get("apple"));
        System.out.println("BANANA: " + syncMap.get("BANANA"));
        System.out.println("cherry: " + syncMap.get("cherry"));
        
        // Show sorted order
        synchronized(syncMap) {
            System.out.println("Sorted entries:");
            syncMap.forEach((k, v) -&gt; System.out.println(k + ": " + v));
        }
    }
}

This example creates a case-insensitive synchronized sorted map. We add elements
with different cases and demonstrate case-insensitive lookups. The map maintains
its ordering according to the comparator.

The output shows successful lookups regardless of case. The synchronized wrapper
ensures thread safety while preserving the custom ordering.

## Performance Considerations

This example compares the performance of synchronized and unsynchronized sorted
maps under concurrent access. We measure operation times with multiple threads.

SynchronizedPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class SynchronizedPerformance {

    static final int THREADS = 10;
    static final int OPERATIONS = 10000;

    public static void main(String[] args) throws InterruptedException {
        
        // Unsynchronized map (will produce incorrect results)
        SortedMap unsafeMap = new TreeMap&lt;&gt;();
        
        // Synchronized map
        SortedMap safeMap = 
            Collections.synchronizedSortedMap(new TreeMap&lt;&gt;());
        
        // Test unsafe map
        long unsafeTime = testMap(unsafeMap);
        System.out.println("Unsafe map count: " + unsafeMap.size() + 
            " (should be " + (THREADS * OPERATIONS) + ")");
        System.out.println("Unsafe map time: " + unsafeTime + "ms");
        
        // Test safe map
        long safeTime = testMap(safeMap);
        System.out.println("Safe map count: " + safeMap.size() + 
            " (correct)");
        System.out.println("Safe map time: " + safeTime + "ms");
    }
    
    static long testMap(SortedMap map) 
            throws InterruptedException {
            
        ExecutorService executor = Executors.newFixedThreadPool(THREADS);
        long start = System.currentTimeMillis();
        
        for (int i = 0; i &lt; THREADS; i++) {
            executor.execute(() -&gt; {
                for (int j = 0; j &lt; OPERATIONS; j++) {
                    map.put(j, j);
                }
            });
        }
        
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
        
        return System.currentTimeMillis() - start;
    }
}

This code compares performance between synchronized and unsynchronized maps. The
unsynchronized version fails to maintain correct state under concurrent access.
The synchronized version is slower but correct.

The output shows the trade-off between performance and correctness. The
synchronized map ensures data integrity at the cost of some performance.

## First and Last Key Operations

This example demonstrates thread-safe access to first and last keys in a
synchronized sorted map. We show how to safely retrieve these special entries.

SynchronizedFirstLast.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedFirstLast {

    public static void main(String[] args) {
        
        SortedMap syncMap = 
            Collections.synchronizedSortedMap(new TreeMap&lt;&gt;());
        
        syncMap.put("A", 1.1);
        syncMap.put("B", 2.2);
        syncMap.put("C", 3.3);
        syncMap.put("D", 4.4);
        
        // Safely access first and last keys
        String firstKey, lastKey;
        synchronized(syncMap) {
            firstKey = syncMap.firstKey();
            lastKey = syncMap.lastKey();
        }
        
        System.out.println("First key: " + firstKey);
        System.out.println("Last key: " + lastKey);
        
        // Safely get first and last entries
        synchronized(syncMap) {
            System.out.println("First entry: " + 
                syncMap.firstKey() + "=" + syncMap.get(firstKey));
            System.out.println("Last entry: " + 
                syncMap.lastKey() + "=" + syncMap.get(lastKey));
        }
    }
}

This example shows how to safely access the first and last keys in a synchronized
sorted map. We demonstrate both key retrieval and value access while maintaining
thread safety.

The output displays the expected first and last entries. Proper synchronization
ensures these operations are atomic and thread-safe.

## HeadMap and TailMap Operations

This example demonstrates thread-safe usage of headMap and tailMap operations.
We create views of portions of the map and perform operations on them.

SynchronizedHeadTail.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedHeadTail {

    public static void main(String[] args) {
        
        SortedMap&lt;Integer, String&gt; syncMap = 
            Collections.synchronizedSortedMap(new TreeMap&lt;&gt;());
        
        for (int i = 1; i &lt;= 10; i++) {
            syncMap.put(i, "Value" + i);
        }
        
        // Get head map (keys less than 5)
        SortedMap&lt;Integer, String&gt; headMap;
        synchronized(syncMap) {
            headMap = syncMap.headMap(5);
        }
        
        // Get tail map (keys greater than or equal to 7)
        SortedMap&lt;Integer, String&gt; tailMap;
        synchronized(syncMap) {
            tailMap = syncMap.tailMap(7);
        }
        
        // Modify through views (must synchronize on original map)
        synchronized(syncMap) {
            headMap.put(4, "MODIFIED");
            tailMap.remove(8);
        }
        
        System.out.println("Head map (1-4): " + headMap);
        System.out.println("Tail map (7-10): " + tailMap);
        System.out.println("Original map: " + syncMap);
    }
}

This example demonstrates how to safely use headMap and tailMap operations with
a synchronized sorted map. We create views of the map (headMap for keys less
than 5, tailMap for keys greater than or equal to 7) and perform modifications
through these views. Synchronization on the original map is crucial to maintain
thread safety.

The output shows the contents of the headMap and tailMap after modifications, as
well as the updated original map. The operations are thread-safe and reflect
changes consistently across the views and the original map.

## Real-world Use Case: Thread-safe Cache

This example demonstrates a practical application of
Collections.synchronizedSortedMap in a thread-safe cache
implementation. The cache stores key-value pairs with timestamps and ensures
thread-safe access across multiple threads.

SynchronizedCache.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class SynchronizedCache {

    private final SortedMap cache;

    public SynchronizedCache() {
        cache = Collections.synchronizedSortedMap(new TreeMap&lt;&gt;());
    }

    public void put(String value) {
        cache.put(System.currentTimeMillis(), value);
    }

    public String getLatest() {
        synchronized (cache) {
            return cache.isEmpty() ? null : cache.get(cache.lastKey());
        }
    }

    public SortedMap getRange(Long from, Long to) {
        synchronized (cache) {
            return cache.subMap(from, to);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        SynchronizedCache cache = new SynchronizedCache();

        // Producer thread adding cache entries
        Thread producer = new Thread(() -&gt; {
            for (int i = 0; i &lt; 5; i++) {
                cache.put("Data" + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // Consumer thread reading cache entries
        Thread consumer = new Thread(() -&gt; {
            try {
                Thread.sleep(300); // Wait for some data
                System.out.println("Latest entry: " + cache.getLatest());
                synchronized (cache) {
                    Long firstKey = cache.firstKey();
                    Long lastKey = cache.lastKey();
                    System.out.println("Range of entries: " + 
                        cache.getRange(firstKey, lastKey + 1));
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();

        producer.join();
        consumer.join();

        System.out.println("Final cache state: " + cache);
    }
}

This example implements a thread-safe cache using a synchronized sorted map. The
cache stores values with timestamps as keys, allowing retrieval of the latest
entry or a range of entries. The producer thread adds data, while the consumer
thread reads the latest entry and a range of entries.

The output shows the latest entry retrieved by the consumer, a range of entries,
and the final state of the cache. All operations are thread-safe, demonstrating
a practical use of Collections.synchronizedSortedMap in a
multi-threaded environment.

## Source

[Java Collections.synchronizedSortedMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#synchronizedSortedMap-java.util.SortedMap-)

In this tutorial, we've explored Collections.synchronizedSortedMap
in depth. We've covered basic usage, multi-threaded access, submap operations,
custom comparators, performance considerations, first/last key operations,
head/tail map operations, and a practical cache implementation. This method is
valuable for ensuring thread safety in sorted map operations, particularly in
multi-threaded applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).