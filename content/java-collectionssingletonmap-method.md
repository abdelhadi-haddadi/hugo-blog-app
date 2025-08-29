+++
title = "Java Collections.singletonMap Method"
date = 2025-08-29T19:58:23.565+01:00
draft = false
description = "Complete Java Collections.singletonMap tutorial with examples. Learn how to use this immutable map utility method."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.singletonMap Method

Last modified: May 1, 2025

 

The Collections.singletonMap method is a useful utility in Java's
Collections framework that allows the creation of an immutable map containing
exactly one key-value pair. As part of the java.util.Collections
class, it provides a streamlined approach to handling single-entry maps without
requiring a full-fledged collection.

Singleton maps are ideal when a single-entry map is needed without modification.
They are highly memory-efficient and inherently thread-safe, making them a
reliable option in concurrent environments. Since its introduction in Java 1.3,
singletonMap has remained a widely used tool for simplifying
map-based operations.

## Overview of Collections.singletonMap

The Collections.singletonMap method returns an immutable and
serializable map with a single key-value pair. While it implements the
Map interface, any attempt to modify its contents—such as adding or
removing elements—results in an UnsupportedOperationException.

Key characteristics of singletonMap include:

  - Fixed size with exactly one entry.

  - Supports null values (if permitted by the value type).

  - Optimized memory usage, as no additional storage is allocated.

  - Thread-safe design, making it suitable for concurrent applications.

Due to its efficiency and ssimplicity, singletonMap is commonly
used in method parameters, API calls, and scenarios where immutability is
preferred over dynamic modification.

## Basic singletonMap Usage

This example demonstrates the most basic usage of Collections.singletonMap.
We create a map with one key-value pair and demonstrate its immutability by
attempting to modify it.

SingletonMapBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

public class SingletonMapBasic {

    public static void main(String[] args) {
        
        // Create singleton map
        Map&lt;String, Integer&gt; ageMap = Collections.singletonMap("John", 30);
        
        // Access elements
        System.out.println("John's age: " + ageMap.get("John"));
        System.out.println("Map size: " + ageMap.size());
        
        try {
            // Attempt to modify (will throw exception)
            ageMap.put("Alice", 25);
        } catch (UnsupportedOperationException e) {
            System.out.println("Expected exception: " + e.getMessage());
        }
    }
}

This code creates a singleton map with "John" as the key and 30 as the value.
We demonstrate accessing the value and checking the map size. The attempt to
add another entry throws an exception, proving immutability.

The output shows successful read operations and the expected exception when
attempting modification. This behavior is fundamental to singleton collections.

## Using singletonMap with Null Values

This example explores how singletonMap handles null values. While
the key cannot be null, the value can be null if the value type permits it.
We demonstrate both cases.

SingletonMapNulls.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

public class SingletonMapNulls {

    public static void main(String[] args) {
        
        // Valid: null value
        Map&lt;String, String&gt; validMap = 
            Collections.singletonMap("config", null);
        System.out.println("Config value: " + validMap.get("config"));
        
        try {
            // Invalid: null key
            Map&lt;String, String&gt; invalidMap = 
                Collections.singletonMap(null, "value");
        } catch (NullPointerException e) {
            System.out.println("Expected exception: " + e.getMessage());
        }
    }
}

The example shows that while null values are permitted (when the value type
allows), null keys are prohibited. Attempting to use a null key throws a
NullPointerException.

This behavior matches the general Map contract in Java, where keys cannot be
null but values can be (unless restricted by the implementation). The output
demonstrates both scenarios.

## Using singletonMap in Method Parameters

The Collections.singletonMap method provides a quick way to pass
single-entry maps to methods requiring a Map parameter. This is
particularly useful when calling APIs or utility functions where a full-fledged
map isn't necessary. In this example, we simulate a system that retrieves
weather data for a specific city using a singleton map.

SingletonMapParameter.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

public class SingletonMapParameter {

    public static void displayWeatherInfo(Map&lt;String, Integer&gt; weatherData) {

        System.out.println("Weather Report:");
        weatherData.forEach((city, temp) -&gt;
                System.out.println("The temperature in " + city + " is " + temp + "°C"));
        System.out.println("Total locations processed: " + weatherData.size());
    }

    public static void main(String[] args) {
        
        // Using singletonMap to pass a single city's weather data
        displayWeatherInfo(Collections.singletonMap("Bratislava", 18));

        // Alternative approach without singletonMap:
        // Map&lt;String, Integer&gt; weatherMap = new HashMap&lt;&gt;();
        // weatherMap.put("Bratislava", 18);
        // displayWeatherInfo(weatherMap);
    }
}

This example highlights how singletonMap simplifies passing
single-value maps to methods, reducing verbosity while maintaining efficiency.
Instead of manually creating and populating a mutable map, a singleton map
provides a streamlined alternative.

Such a pattern is widely used in Java applications, particularly in API calls,
configuration settings, and scenarios where only one key-value pair is required.
The output demonstrates how a method can process the singleton map seamlessly.

## Comparing singletonMap with Regular Map

This example compares memory usage and performance characteristics of
singletonMap versus regular HashMap. We demonstrate the
differences in memory footprint and modification behavior.

SingletonMapComparison.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SingletonMapComparison {

    public static void main(String[] args) {
        
        // Singleton map
        Map&lt;String, String&gt; singleton = 
            Collections.singletonMap("id", "A100");
        
        // Regular HashMap
        Map&lt;String, String&gt; hashMap = new HashMap&lt;&gt;();
        hashMap.put("id", "A100");
        
        System.out.println("Singleton map class: " + singleton.getClass());
        System.out.println("HashMap class: " + hashMap.getClass());
        
        // Memory comparison
        System.out.println("\nSingleton map overhead: minimal");
        System.out.println("HashMap overhead: includes hash table structure");
        
        // Modification comparison
        try {
            singleton.put("newKey", "value");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify singleton map");
        }
        
        hashMap.put("newKey", "value");
        System.out.println("HashMap modified successfully");
    }
}

The example highlights key differences between singleton maps and regular HashMaps.
Singleton maps have minimal memory overhead as they don't need hash table
structures. They're immutable, while HashMaps are mutable by default.

The output shows the different behaviors and reminds us to choose the appropriate
map type based on requirements. Singleton maps are perfect for immutable
single-entry cases.

## Using singletonMap with Custom Objects in Java

The Collections.singletonMap method allows creating an immutable
map with a single key-value pair. This example demonstrates its behavior when
using custom objects as both keys and values, specifically with a
Person record. We will explore how object references work within
singleton maps.

SingletonMapCustomObjects.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

record Person(String name) { }

public class SingletonMapCustomObjects {

    public static void main(String[] args) {

        Person john = new Person("John Doe");
        Person jane = new Person("Jane Smith");

        Map&lt;Person, Person&gt; marriage =
                Collections.singletonMap(john, jane);

        System.out.println("Marriage mapping:");
        marriage.forEach((k, v) -&gt;
                System.out.println(k.name() + " is married to " + v.name()));

        // Changing the reference doesn't affect the map
        john = new Person("Johnny Doe"); // New object, but map remains unchanged
        System.out.println("\nAfter modifying original reference:");
        marriage.forEach((k, v) -&gt;
                System.out.println(k.name() + " is married to " + v.name()));
    }
}

This example highlights that singletonMap stores object references
rather than copies. Although we assign a new Person instance to the
john variable, the original mapping remains unchanged because
immutable collections do not update dynamically.

This behavior is consistent across all Java collections: modifying a reference
does not alter objects that have already been stored within the collection.

## singletonMap in Collections Framework

This example shows how singletonMap fits within the broader
Collections framework. We'll use it alongside other collections and demonstrate
interoperability.

SingletonMapInFramework.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class SingletonMapInFramework {

    public static void main(String[] args) {
        
        // Create a list of singleton maps
        List&lt;Map&lt;String, Integer&gt;&gt; mapList = new ArrayList&lt;&gt;();
        
        mapList.add(Collections.singletonMap("Alice", 25));
        mapList.add(Collections.singletonMap("Bob", 30));
        mapList.add(Collections.singletonMap("Charlie", 35));
        
        System.out.println("List of singleton maps:");
        mapList.forEach(map -&gt; 
            map.forEach((k, v) -&gt; System.out.println(k + ": " + v)));
        
        // Extract all values
        List&lt;Integer&gt; ages = new ArrayList&lt;&gt;();
        mapList.forEach(map -&gt; ages.addAll(map.values()));
        
        System.out.println("\nAll ages: " + ages);
    }
}

Here we see how singleton maps can be used alongside other collection types.
We create a list of singleton maps, each representing a person's age. Then we
extract all values into a separate list.

This demonstrates the interoperability of singleton maps with the rest of the
Collections framework. The output shows the combined data from all maps in the
list.

## Performance Considerations

This final example examines the performance benefits of singletonMap
compared to regular maps. We'll measure memory usage and access times for both.

SingletonMapPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SingletonMapPerformance {

    public static void main(String[] args) {
        
        final int iterations = 10_000_000;
        
        // Test singleton map
        long startTime = System.nanoTime();
        for (int i = 0; i &lt; iterations; i++) {
            Map&lt;Integer, String&gt; map = Collections.singletonMap(i, "value");
        }
        long singletonTime = System.nanoTime() - startTime;
        
        // Test HashMap
        startTime = System.nanoTime();
        for (int i = 0; i &lt; iterations; i++) {
            Map&lt;Integer, String&gt; map = new HashMap&lt;&gt;();
            map.put(i, "value");
        }
        long hashMapTime = System.nanoTime() - startTime;
        
        System.out.println("SingletonMap creation time: " + 
            (singletonTime / 1_000_000) + " ms");
        System.out.println("HashMap creation time: " + 
            (hashMapTime / 1_000_000) + " ms");
        System.out.println("Ratio: " + 
            ((double)hashMapTime / singletonTime));
    }
}

The performance test shows that singletonMap is significantly
faster for creation than HashMap when you only need one entry. It also uses
less memory as it doesn't allocate a hash table.

The output demonstrates the time difference in creating millions of each map
type. Singleton maps are optimal for single-entry cases where immutability is
acceptable.

## Source

[Java Collections.singletonMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#singletonMap-K-V-)

In this article, we've explored the Java Collections.singletonMap
method in depth. We've covered basic usage, null handling, practical applications,
performance, and integration with other collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).