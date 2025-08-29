+++
title = "Java Collections.unmodifiableMap Method"
date = 2025-08-29T19:58:28.086+01:00
draft = false
description = "Complete Java Collections.unmodifiableMap tutorial with examples. Learn how to create unmodifiable Map views in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.unmodifiableMap Method

Last modified: April 20, 2025

 

The Collections.unmodifiableMap method is part of Java's Collections
Framework. It returns an unmodifiable view of the specified map. This view
prevents modifications to the underlying map through the returned reference.

Unmodifiable maps are useful when you need to provide read-only access to map
data. They help enforce immutability and prevent accidental modifications.
The original map can still be modified if you maintain a reference to it.

## Basic Definitions

An unmodifiable map is a wrapper around an existing map that blocks all
modification operations. Attempts to modify the map result in
UnsupportedOperationException. The view is live - changes to the
backing map are visible through the unmodifiable view.

The unmodifiableMap method is a factory method in the
java.util.Collections class. It takes a Map as parameter and
returns an unmodifiable view of that map. All map implementations can be
wrapped this way.

## Creating an Unmodifiable Map

This example demonstrates the basic usage of Collections.unmodifiableMap.
We create a regular HashMap, then obtain an unmodifiable view of it. The example
shows that we can read from but not write to the unmodifiable view.

UnmodifiableMapBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class UnmodifiableMapBasic {

    public static void main(String[] args) {
        
        Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);
        
        // Create unmodifiable view
        Map&lt;String, Integer&gt; unmodifiableScores = 
            Collections.unmodifiableMap(scores);
        
        // Can read from unmodifiable map
        System.out.println("Bob's score: " + unmodifiableScores.get("Bob"));
        
        try {
            // Attempt to modify unmodifiable map
            unmodifiableScores.put("Diana", 88);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify unmodifiable map: " + e.getMessage());
        }
        
        // Original map can still be modified
        scores.put("Diana", 88);
        System.out.println("Diana's score (via unmodifiable view): " + 
            unmodifiableScores.get("Diana"));
    }
}

This code shows the basic behavior of an unmodifiable map. We first create a
regular HashMap and populate it with some entries. Then we create an unmodifiable
view of this map using Collections.unmodifiableMap.

The example demonstrates that while we can't modify the map through the
unmodifiable view, changes to the original map are reflected in the view. This
shows that the unmodifiable map is a live view, not an independent copy.

## Unmodifiable Map Operations

This example explores various operations on an unmodifiable map. We'll see which
operations are allowed (read operations) and which throw exceptions (write
operations). The example covers common Map interface methods.

UnmodifiableMapOperations.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class UnmodifiableMapOperations {

    public static void main(String[] args) {
        
        Map&lt;String, String&gt; countries = new HashMap&lt;&gt;();
        countries.put("USA", "Washington");
        countries.put("France", "Paris");
        countries.put("Japan", "Tokyo");
        
        Map&lt;String, String&gt; unmodifiableCountries = 
            Collections.unmodifiableMap(countries);
        
        // Allowed operations
        System.out.println("Size: " + unmodifiableCountries.size());
        System.out.println("Contains France? " + 
            unmodifiableCountries.containsKey("France"));
        System.out.println("Capital of Japan: " + 
            unmodifiableCountries.get("Japan"));
        System.out.println("All countries: " + 
            unmodifiableCountries.keySet());
            
        // Disallowed operations (all throw UnsupportedOperationException)
        try {
            unmodifiableCountries.put("Germany", "Berlin");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot add to unmodifiable map");
        }
        
        try {
            unmodifiableCountries.remove("USA");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot remove from unmodifiable map");
        }
        
        try {
            unmodifiableCountries.clear();
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot clear unmodifiable map");
        }
    }
}

This example demonstrates the behavior of various Map operations on an
unmodifiable map. Read operations like size,
containsKey, get, and keySet
work normally. All modification operations throw
UnsupportedOperationException.

The output shows that while we can query the unmodifiable map, any attempt to
modify it results in an exception. This makes unmodifiable maps ideal for
providing read-only access to map data.

## Unmodifiable Map from Java 9 Map.of

Java 9 introduced factory methods like Map.of that create
immutable maps directly. This example compares these with
Collections.unmodifiableMap. The factory methods create truly
immutable maps rather than views.

UnmodifiableMapJava9.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class UnmodifiableMapJava9 {

    public static void main(String[] args) {
        
        // Java 8 and earlier approach
        Map&lt;String, Integer&gt; ages = new HashMap&lt;&gt;();
        ages.put("John", 30);
        ages.put("Mary", 25);
        Map&lt;String, Integer&gt; unmodifiableAges = 
            Collections.unmodifiableMap(ages);
        
        // Java 9+ approach
        Map&lt;String, Integer&gt; immutableAges = 
            Map.of("John", 30, "Mary", 25);
        
        System.out.println("Unmodifiable map: " + unmodifiableAges);
        System.out.println("Immutable map: " + immutableAges);
        
        // Both throw UnsupportedOperationException when modified
        try {
            unmodifiableAges.put("Alice", 28);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify unmodifiable map");
        }
        
        try {
            immutableAges.put("Alice", 28);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify immutable map");
        }
        
        // Difference: original can still modify unmodifiable view
        ages.put("Alice", 28);
        System.out.println("\nAfter original modification: " + unmodifiableAges);
    }
}

This example highlights the difference between Collections.unmodifiableMap
and Java 9's Map.of. While both prevent modification through their
references, unmodifiableMap is just a view of a potentially mutable
map, whereas Map.of creates a completely immutable map.

The output shows that changes to the original map are reflected in the
unmodifiable view, while the Java 9 immutable map cannot be modified by any
means. Choose the appropriate approach based on your immutability requirements.

## Nested Unmodifiable Maps

This example demonstrates creating an unmodifiable map containing other
unmodifiable collections. We'll see how to build complex immutable data
structures. The example shows a map of countries to their unmodifiable lists
of cities.

NestedUnmodifiableMap.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class NestedUnmodifiableMap {

    public static void main(String[] args) {
        
        // Create mutable lists of cities
        List&lt;String&gt; usCities = new ArrayList&lt;&gt;();
        usCities.add("New York");
        usCities.add("Los Angeles");
        usCities.add("Chicago");
        
        List&lt;String&gt; frCities = new ArrayList&lt;&gt;();
        frCities.add("Paris");
        frCities.add("Lyon");
        frCities.add("Marseille");
        
        // Create unmodifiable lists
        List&lt;String&gt; unmodifiableUsCities = 
            Collections.unmodifiableList(usCities);
        List&lt;String&gt; unmodifiableFrCities = 
            Collections.unmodifiableList(frCities);
        
        // Create map of countries to their city lists
        Map countryCities = new HashMap&lt;&gt;();
        countryCities.put("USA", unmodifiableUsCities);
        countryCities.put("France", unmodifiableFrCities);
        
        // Create unmodifiable view of the map
        Map unmodifiableCountryCities = 
            Collections.unmodifiableMap(countryCities);
        
        System.out.println("Country cities: " + unmodifiableCountryCities);
        
        // Attempting to modify at any level will throw exceptions
        try {
            unmodifiableCountryCities.get("USA").add("Houston");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify cities list");
        }
        
        try {
            unmodifiableCountryCities.put("Germany", 
                Collections.unmodifiableList(new ArrayList&lt;&gt;(List.of("Berlin"))));
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify countries map");
        }
    }
}

This example creates a deep immutability structure. We first make the city lists
unmodifiable, then place them in a map, and finally make the map itself
unmodifiable. This ensures no part of the structure can be modified.

The example shows that attempts to modify either the outer map or the nested
collections all result in exceptions. This approach is useful when you need to
provide completely immutable data structures to other parts of your application.

## Performance Considerations

This example examines the performance characteristics of unmodifiable maps.
We'll compare operations on regular maps versus their unmodifiable views.
The test measures read operations and memory overhead.

UnmodifiableMapPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class UnmodifiableMapPerformance {

    public static void main(String[] args) {
        
        final int SIZE = 1_000_000;
        final int ITERATIONS = 100;
        
        // Create large map
        Map&lt;Integer, String&gt; bigMap = new HashMap&lt;&gt;();
        for (int i = 0; i &lt; SIZE; i++) {
            bigMap.put(i, "Value" + i);
        }
        
        // Create unmodifiable view
        Map&lt;Integer, String&gt; unmodifiableBigMap = 
            Collections.unmodifiableMap(bigMap);
        
        // Measure get operation performance
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            bigMap.get(i % SIZE);
        }
        long duration = System.currentTimeMillis() - start;
        System.out.println("Regular map get: " + duration + " ms");
        
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            unmodifiableBigMap.get(i % SIZE);
        }
        duration = System.currentTimeMillis() - start;
        System.out.println("Unmodifiable map get: " + duration + " ms");
        
        // Measure memory usage
        Runtime runtime = Runtime.getRuntime();
        runtime.gc();
        long memoryBefore = runtime.totalMemory() - runtime.freeMemory();
        
        Map&lt;Integer, String&gt;[] maps = new Map[1000];
        for (int i = 0; i &lt; 1000; i++) {
            maps[i] = Collections.unmodifiableMap(new HashMap&lt;&gt;());
        }
        
        runtime.gc();
        long memoryAfter = runtime.totalMemory() - runtime.freeMemory();
        System.out.println("Memory per unmodifiable map wrapper: " + 
            (memoryAfter - memoryBefore) / 1000 + " bytes");
    }
}

This performance test demonstrates that unmodifiable maps have negligible
overhead for read operations. The get operation takes essentially
the same time on both the original map and its unmodifiable view.

The memory test shows that each unmodifiable wrapper consumes a small amount of
additional memory (typically 16-32 bytes). This overhead is insignificant for
most applications, making unmodifiable views a lightweight solution for
providing read-only access.

## Real-world Use Case

This example demonstrates a practical application of unmodifiableMap
in a configuration management system. We'll create a configuration holder that
provides read-only access to application settings while allowing privileged code
to update the configuration.

ConfigurationManager.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ConfigurationManager {

    private Map&lt;String, String&gt; configMap = new HashMap&lt;&gt;();
    private Map&lt;String, String&gt; unmodifiableConfigView = 
        Collections.unmodifiableMap(configMap);
    
    public ConfigurationManager() {
        // Initialize with default values
        configMap.put("timeout", "30");
        configMap.put("max_connections", "10");
        configMap.put("debug_mode", "false");
    }
    
    // Public method to get read-only configuration
    public Map&lt;String, String&gt; getConfiguration() {
        return unmodifiableConfigView;
    }
    
    // Privileged method to update configuration
    public void updateConfiguration(String key, String value) {
        configMap.put(key, value);
    }
    
    public static void main(String[] args) {
        ConfigurationManager configManager = new ConfigurationManager();
        
        // Get read-only configuration
        Map&lt;String, String&gt; config = configManager.getConfiguration();
        System.out.println("Initial configuration: " + config);
        
        // Try to modify through unmodifiable view
        try {
            config.put("timeout", "60");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify configuration through view");
        }
        
        // Update through privileged method
        configManager.updateConfiguration("timeout", "60");
        System.out.println("Updated configuration: " + config);
    }
}

This example shows how to use Collections.unmodifiableMap in a
configuration management system. The ConfigurationManager class
maintains a mutable internal map but exposes only an unmodifiable view to
clients. This ensures that external code cannot modify the configuration
directly.

The example demonstrates that while attempts to modify the configuration through
the unmodifiable view fail, the updateConfiguration method can
still modify the internal map, and those changes are visible through the view.
This pattern is common in API design to protect internal state while allowing
controlled modifications.

## Source

[Java Collections.unmodifiableMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableMap-java.util.Map-)

In this tutorial, we've explored the Java Collections.unmodifiableMap
method in depth. We've covered basic usage, map operations, comparisons with
Java 9's Map.of, nested unmodifiable structures, performance
considerations, and a practical configuration management use case. This method
is valuable for providing read-only access to map data while maintaining
flexibility to modify the underlying map when needed.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).