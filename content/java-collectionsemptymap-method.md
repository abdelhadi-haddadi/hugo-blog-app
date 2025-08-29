+++
title = "Java Collections.emptyMap Method"
date = 2025-08-29T19:58:19.036+01:00
draft = false
description = "Complete Java Collections.emptyMap tutorial with examples. Learn how to use empty immutable maps in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.emptyMap Method

Last modified: April 20, 2025

 

The Collections.emptyMap method returns an immutable empty map.
It is part of Java's Collections utility class. This method provides a type-safe
way to get an empty map instance.

The returned map is serializable and implements the Map interface.
It cannot be modified after creation. This makes it useful for returning empty
results from methods.

## Collections.emptyMap Overview

Collections.emptyMap was introduced in Java 1.5. It returns a
singleton empty map instance. The method is generic and returns a
Map&lt;K,V&gt; with the specified type parameters.

The main advantage is memory efficiency. Since it's immutable and shared, it
doesn't create new instances. This reduces memory usage when empty maps are
needed frequently.

## Basic emptyMap Usage

This example demonstrates the most basic usage of Collections.emptyMap.
We obtain an empty map and verify its properties. The example shows the map's
immutability by attempting to modify it.

EmptyMapBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

public class EmptyMapBasic {

    public static void main(String[] args) {
        
        // Get empty map
        Map&lt;String, Integer&gt; emptyMap = Collections.emptyMap();
        
        // Verify properties
        System.out.println("Map size: " + emptyMap.size());
        System.out.println("Is empty: " + emptyMap.isEmpty());
        
        try {
            // Attempt to modify
            emptyMap.put("key", 1);
        } catch (UnsupportedOperationException e) {
            System.out.println("Expected exception: " + e.getMessage());
        }
    }
}

This code shows how to obtain an empty map using Collections.emptyMap.
We verify it's empty by checking size and isEmpty. The attempt to modify it
throws an UnsupportedOperationException.

The output demonstrates the map's immutability. This behavior is consistent
with all immutable collection views provided by the Collections class.

## Returning Empty Map from Method

A common use case for emptyMap is returning empty results from
methods. This example shows a method that conditionally returns either a
populated map or an empty one.

EmptyMapReturn.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class EmptyMapReturn {

    public static Map&lt;String, Integer&gt; getWordCounts(String text) {
        if (text == null || text.trim().isEmpty()) {
            return Collections.emptyMap();
        }
        
        Map&lt;String, Integer&gt; counts = new HashMap&lt;&gt;();
        String[] words = text.split("\\s+");
        
        for (String word : words) {
            counts.merge(word, 1, Integer::sum);
        }
        
        return counts;
    }

    public static void main(String[] args) {
        System.out.println("Non-empty text: " + 
            getWordCounts("hello world hello"));
        System.out.println("Empty text: " + 
            getWordCounts(""));
    }
}

This example demonstrates using emptyMap as a return value. The
getWordCounts method returns an empty map for empty input. For
non-empty input, it returns a populated map with word counts.

Using emptyMap here is more efficient than creating new HashMap
instances. It also clearly signals the empty result case to calling code.

## Type-Safe Empty Map

Collections.emptyMap provides type safety through generics. This
example shows how to use it with different type parameters. The compiler
enforces type safety at compile time.

EmptyMapTypes.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

public class EmptyMapTypes {

    public static void main(String[] args) {
        
        // String-Integer map
        Map&lt;String, Integer&gt; stringIntMap = Collections.emptyMap();
        System.out.println("String-Integer map: " + stringIntMap);
        
        // Integer-String map
        Map&lt;Integer, String&gt; intStringMap = Collections.emptyMap();
        System.out.println("Integer-String map: " + intStringMap);
        
        // Nested maps
        Map&lt;String, Map&lt;String, Integer&gt;&gt; nestedMap = Collections.emptyMap();
        System.out.println("Nested map: " + nestedMap);
        
        // The following would cause compile-time error:
        // stringIntMap.put(1, "one"); // Incompatible types
    }
}

This example shows emptyMap with different generic type parameters.
We demonstrate simple maps, nested maps, and how the compiler prevents type
mismatches. The type safety helps catch errors early.

The output shows that regardless of type parameters, the maps are empty. The
type parameters only affect compile-time checking, not runtime behavior.

## Empty Map as Default Value

Empty maps can serve as default values for map fields or parameters. This
example shows using emptyMap to initialize a field and provide
default parameter values.

EmptyMapDefault.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Map;

public class EmptyMapDefault {

    private Map&lt;String, String&gt; configurations = Collections.emptyMap();

    public void printConfigurations(
            Map&lt;String, String&gt; overrideConfigs) {
        
        Map&lt;String, String&gt; effectiveConfigs = overrideConfigs.isEmpty() 
            ? configurations 
            : overrideConfigs;
        
        System.out.println("Current configurations:");
        effectiveConfigs.forEach((k, v) -&gt; 
            System.out.println(k + " = " + v));
    }

    public static void main(String[] args) {
        EmptyMapDefault demo = new EmptyMapDefault();
        
        // Use default empty map
        demo.printConfigurations(Collections.emptyMap());
        
        // Use provided map
        demo.printConfigurations(
            Map.of("timeout", "100", "retries", "3"));
    }
}

This example demonstrates using emptyMap as a default value. The
class field is initialized with an empty map. The method uses either the default
or provided configuration map.

The output shows both cases: using the default empty map and using a provided
map. This pattern is common in configuration handling and similar scenarios.

## Empty Map in Collections Framework

The empty map integrates with other Collections Framework features. This example
shows using it with methods like putAll and stream operations.

EmptyMapFramework.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class EmptyMapFramework {

    public static void main(String[] args) {
        
        // Using with putAll
        Map&lt;String, Integer&gt; map1 = new HashMap&lt;&gt;();
        map1.putAll(Collections.emptyMap());
        System.out.println("After putAll: " + map1);
        
        // Using with streams
        Map&lt;String, Integer&gt; result = Collections.emptyMap()
            .entrySet()
            .stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue));
        
        System.out.println("Stream result: " + result);
        
        // Using with Map.copyOf (Java 10+)
        Map&lt;String, Integer&gt; copiedMap = Map.copyOf(Collections.emptyMap());
        System.out.println("Copied map: " + copiedMap);
    }
}

This example shows emptyMap working with other Collections
Framework features. We demonstrate putAll, streams, and
Map.copyOf. The empty map behaves correctly in all cases.

The output shows that operations with empty maps produce empty or unchanged
results. This makes empty maps safe to use in various collection operations.

## Performance Considerations

Using Collections.emptyMap has performance benefits. This example
compares it with creating new HashMap instances. We measure memory usage and
execution time.

EmptyMapPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class EmptyMapPerformance {

    public static void main(String[] args) {
        final int ITERATIONS = 1_000_000;
        
        // Test emptyMap
        long start = System.nanoTime();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            Map&lt;String, String&gt; m = Collections.emptyMap();
        }
        long emptyMapTime = System.nanoTime() - start;
        
        // Test new HashMap
        start = System.nanoTime();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            Map&lt;String, String&gt; m = new HashMap&lt;&gt;();
        }
        long hashMapTime = System.nanoTime() - start;
        
        System.out.println("Collections.emptyMap time: " + 
            emptyMapTime / 1_000_000 + " ms");
        System.out.println("new HashMap time: " + 
            hashMapTime / 1_000_000 + " ms");
        System.out.println("Ratio: " + 
            (double)hashMapTime / emptyMapTime);
    }
}

This example compares the performance of emptyMap versus creating
new HashMap instances. The test creates each type of map one million times and
measures the elapsed time.

The output shows that emptyMap is significantly faster. This is
because it reuses a single immutable instance rather than creating new objects.

## Empty Map Serialization

The empty map returned by Collections.emptyMap is serializable.
This example demonstrates serializing and deserializing an empty map. We use
Java's standard serialization mechanism.

EmptyMapSerialization.java
  

package com.zetcode;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Collections;
import java.util.Map;

public class EmptyMapSerialization {

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Map&lt;String, Integer&gt; originalMap = Collections.emptyMap();
        
        // Serialize
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(originalMap);
        oos.close();
        
        // Deserialize
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bais);
        @SuppressWarnings("unchecked")
        Map&lt;String, Integer&gt; deserializedMap = (Map&lt;String, Integer&gt;) ois.readObject();
        
        System.out.println("Original map: " + originalMap);
        System.out.println("Deserialized map: " + deserializedMap);
        System.out.println("Same instance: " + 
            (originalMap == deserializedMap));
    }
}

This example shows that empty maps can be serialized and deserialized. The
process preserves the empty state of the map. After deserialization, we still
have a working empty map.

The output confirms the serialization works correctly. Note that the deserialized
map might not be the exact same singleton instance but will behave identically.

## Source

[Java Collections.emptyMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#emptyMap--)

In this article, we've explored Java's Collections.emptyMap method
in depth. We've covered basic usage, type safety, performance, and integration
with other collection features. The empty map is a useful tool for many
scenarios.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).