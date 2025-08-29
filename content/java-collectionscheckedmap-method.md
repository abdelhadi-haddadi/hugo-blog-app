+++
title = "Java Collections.checkedMap Method"
date = 2025-08-29T19:58:16.804+01:00
draft = false
description = "Complete Java Collections.checkedMap tutorial with examples. Learn how to use type-safe maps in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.checkedMap Method

Last modified: April 20, 2025

 

The Collections.checkedMap method is a utility method in Java's
Collections framework. It returns a dynamically type-safe view of the specified
map. This view ensures that only elements of the correct type can be added.

Type-safe views help catch incorrect type additions at runtime. They're
particularly useful when working with legacy code or untrusted inputs. The
checked map throws ClassCastException for type violations.

## Collections.checkedMap Overview

The checkedMap method is part of the java.util.Collections
class. It takes a map and two Class objects (for keys and values) as parameters.
The returned map enforces type safety at runtime.

This method is useful when you need to ensure type safety in collections that
might be accessed by non-generic code. It provides runtime type checking that
complements compile-time generics checking.

## Basic checkedMap Usage

This example demonstrates the basic usage of Collections.checkedMap.
We create a regular HashMap and then wrap it with a checked map. The checked map
ensures only String keys and Integer values can be added.

BasicCheckedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class BasicCheckedMap {

    public static void main(String[] args) {
        
        Map&lt;String, Integer&gt; originalMap = new HashMap&lt;&gt;();
        originalMap.put("One", 1);
        originalMap.put("Two", 2);
        
        // Create checked map
        Map&lt;String, Integer&gt; checkedMap = 
            Collections.checkedMap(originalMap, String.class, Integer.class);
        
        // Valid additions
        checkedMap.put("Three", 3);
        System.out.println("Checked map: " + checkedMap);
        
        try {
            // Invalid key type
            checkedMap.put(10, 10);
        } catch (ClassCastException e) {
            System.out.println("\nCaught exception: " + e.getMessage());
        }
        
        try {
            // Invalid value type
            checkedMap.put("Four", "4");
        } catch (ClassCastException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This code shows how Collections.checkedMap enforces type safety.
Valid additions work normally, but attempts to add elements of wrong types throw
ClassCastException. The checked map wraps the original map.

The output demonstrates both successful operations and caught exceptions. This
shows the runtime type checking in action. The original map remains accessible.

## Checked Map with Different Types

This example shows how to create a checked map with different key and value
types. We use a map with Integer keys and String values. The checked map ensures
type consistency for both keys and values.

DifferentTypesCheckedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class DifferentTypesCheckedMap {

    public static void main(String[] args) {
        
        Map&lt;Integer, String&gt; originalMap = new HashMap&lt;&gt;();
        originalMap.put(1, "Apple");
        originalMap.put(2, "Banana");
        
        // Create checked map with Integer keys and String values
        Map&lt;Integer, String&gt; checkedMap = 
            Collections.checkedMap(originalMap, Integer.class, String.class);
        
        // Valid operation
        checkedMap.put(3, "Cherry");
        System.out.println("Checked map: " + checkedMap);
        
        try {
            // Invalid key type
            checkedMap.put("Four", "Date");
        } catch (ClassCastException e) {
            System.out.println("\nCaught key exception: " + e.getMessage());
        }
        
        try {
            // Invalid value type
            checkedMap.put(4, 4.5);
        } catch (ClassCastException e) {
            System.out.println("Caught value exception: " + e.getMessage());
        }
    }
}

This example demonstrates type checking for both keys and values. The checked
map ensures keys are Integers and values are Strings. Any deviation from these
types results in a ClassCastException.

The output shows successful additions and caught exceptions. This illustrates
how checked maps maintain type safety for complex type combinations.

## Checked Map with Custom Objects

This example demonstrates using Collections.checkedMap with custom
objects. We define a simple Person class and create a checked map that enforces
Person keys and Double values. This shows how checked maps work with user-defined
types.

CustomObjectsCheckedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return name;
    }
}

public class CustomObjectsCheckedMap {

    public static void main(String[] args) {
        
        Map originalMap = new HashMap&lt;&gt;();
        originalMap.put(new Person("John"), 75.5);
        originalMap.put(new Person("Alice"), 62.3);
        
        // Create checked map with Person keys and Double values
        Map checkedMap = 
            Collections.checkedMap(originalMap, Person.class, Double.class);
        
        // Valid addition
        checkedMap.put(new Person("Bob"), 80.1);
        System.out.println("Checked map: " + checkedMap);
        
        try {
            // Invalid key type
            checkedMap.put("Eve", 55.7);
        } catch (ClassCastException e) {
            System.out.println("\nCaught key exception: " + e.getMessage());
        }
        
        try {
            // Invalid value type
            checkedMap.put(new Person("Charlie"), "70.2");
        } catch (ClassCastException e) {
            System.out.println("Caught value exception: " + e.getMessage());
        }
    }
}

This example shows how checked maps enforce type safety with custom classes. The
Person class instances must be used as keys, and only Double values are allowed.
Attempts to use incorrect types result in exceptions.

The output demonstrates both successful operations and type violations. This
illustrates how checked maps work with any object type, not just Java's built-in
types.

## Checked Map with Null Values

This example explores how Collections.checkedMap handles null keys
and values. While the map itself may allow nulls, the checked map's behavior
depends on the original map's implementation. We demonstrate both cases.

NullValuesCheckedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class NullValuesCheckedMap {

    public static void main(String[] args) {
        
        Map&lt;String, Integer&gt; originalMap = new HashMap&lt;&gt;();
        originalMap.put("One", 1);
        originalMap.put(null, 0); // HashMap allows null key
        
        // Create checked map
        Map&lt;String, Integer&gt; checkedMap = 
            Collections.checkedMap(originalMap, String.class, Integer.class);
        
        // Null key is allowed (depends on original map)
        checkedMap.put(null, 2);
        System.out.println("Map with null key: " + checkedMap);
        
        // Null value is allowed
        checkedMap.put("Two", null);
        System.out.println("Map with null value: " + checkedMap);
        
        try {
            // Attempt to put wrong type where null is expected
            checkedMap.put("Three", "3");
        } catch (ClassCastException e) {
            System.out.println("\nCaught exception: " + e.getMessage());
        }
    }
}

This example demonstrates that null handling in checked maps depends on the
original map's implementation. HashMap allows null keys and values, so the
checked map inherits this behavior. However, type checking still applies to
non-null values.

The output shows successful null operations and a caught type exception. This
illustrates that nulls bypass type checking but other values are strictly
enforced.

## Checked Map Performance Considerations

This example demonstrates the performance impact of using checked maps. While
they provide runtime type safety, they add overhead to map operations. We
compare operations on a regular map and a checked map.

CheckedMapPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class CheckedMapPerformance {

    public static void main(String[] args) {
        
        final int SIZE = 100000;
        Map&lt;Integer, String&gt; regularMap = new HashMap&lt;&gt;();
        Map&lt;Integer, String&gt; checkedMap = 
            Collections.checkedMap(new HashMap&lt;&gt;(), Integer.class, String.class);
        
        // Test regular map put performance
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; SIZE; i++) {
            regularMap.put(i, "Value " + i);
        }
        long regularPutTime = System.currentTimeMillis() - start;
        
        // Test checked map put performance
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; SIZE; i++) {
            checkedMap.put(i, "Value " + i);
        }
        long checkedPutTime = System.currentTimeMillis() - start;
        
        System.out.println("Regular map put time: " + regularPutTime + "ms");
        System.out.println("Checked map put time: " + checkedPutTime + "ms");
        System.out.println("Overhead: " + 
            (100.0 * (checkedPutTime - regularPutTime) / regularPutTime) + "%");
    }
}

This code measures the performance difference between regular and checked maps.
The checked map performs type checking on each insertion, adding overhead. The
exact overhead depends on the JVM implementation and system characteristics.

The output shows the time difference between the two map types. While the
overhead is typically small for individual operations, it can become significant
in performance-critical code with many operations.

## Checked Map in Legacy Code Integration

This example shows how Collections.checkedMap can help integrate
legacy code with generic code. We simulate a legacy method returning a raw map
and show how to safely use it with generic code.

LegacyIntegration.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class LegacyIntegration {

    // Simulates legacy method returning raw map
    @SuppressWarnings("rawtypes")
    public static Map getLegacyMap() {
        Map map = new HashMap();
        map.put("A", 1);
        map.put("B", 2);
        // Legacy code might put wrong types
        map.put("C", "Three"); // Oops, wrong type!
        return map;
    }
    
    public static void main(String[] args) {
        
        // Get raw map from legacy code
        Map rawMap = getLegacyMap();
        
        try {
            // Try to use it directly (unsafe)
            @SuppressWarnings("unchecked")
            Map&lt;String, Integer&gt; unsafeMap = rawMap;
            System.out.println("Unsafe map: " + unsafeMap);
            
            // This would fail at runtime when accessing "C"
            for (Map.Entry&lt;String, Integer&gt; entry : unsafeMap.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        } catch (ClassCastException e) {
            System.out.println("\nCaught unsafe access exception: " + e.getMessage());
        }
        
        // Safe approach with checked map
        try {
            Map&lt;String, Integer&gt; safeMap = 
                Collections.checkedMap(new HashMap&lt;&gt;(), String.class, Integer.class);
            safeMap.putAll(rawMap); // Fails immediately on wrong type
        } catch (ClassCastException e) {
            System.out.println("Caught checked map exception: " + e.getMessage());
        }
    }
}

This example demonstrates how checked maps can help identify type problems when
working with legacy code. The unsafe approach fails when accessing the bad entry,
while the checked map fails immediately when attempting to putAll the bad data.

The output shows both the delayed failure of unsafe code and the immediate
failure of the checked map approach. This illustrates how checked maps can make
type problems easier to diagnose.

## Checked Map with Concurrent Access

This example explores the behavior of checked maps in concurrent scenarios.
While Collections.checkedMap doesn't provide thread safety, it can
be combined with synchronized wrappers for concurrent access with type safety.

ConcurrentCheckedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ConcurrentCheckedMap {

    public static void main(String[] args) {
        
        // Create thread-safe checked map
        Map&lt;String, Integer&gt; safeMap = Collections.synchronizedMap(
            Collections.checkedMap(new HashMap&lt;&gt;(), String.class, Integer.class));
        
        // Worker thread that adds to the map
        Thread worker = new Thread(() -&gt; {
            for (int i = 0; i &lt; 5; i++) {
                safeMap.put("Thread-" + i, i);
            }
        });
        
        // Main thread adds to the map
        worker.start();
        for (int i = 5; i &lt; 10; i++) {
            safeMap.put("Main-" + i, i);
        }
        
        try {
            worker.join();
            System.out.println("Final map: " + safeMap);
            
            // Attempt concurrent modification with wrong type
            Thread badWorker = new Thread(() -&gt; {
                try {
                    safeMap.put(10, 10); // Wrong key type
                } catch (ClassCastException e) {
                    System.out.println("Caught in thread: " + e.getMessage());
                }
            });
            
            badWorker.start();
            badWorker.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates how to combine Collections.checkedMap with
Collections.synchronizedMap to achieve both type safety and thread
safety. Multiple threads can safely add elements to the map, and type violations
are caught even in concurrent scenarios.

The output shows the final map contents after concurrent additions and a caught
exception when a thread tries to add an element of the wrong type. This illustrates
the robustness of checked maps in multi-threaded environments.

## Real-world Use Case

This example demonstrates a practical application of Collections.checkedMap
in a configuration service that manages key-value pairs. The service uses a checked
map to ensure that only valid configuration types are stored.

ConfigurationService.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ConfigurationService {

    private final Map&lt;String, Integer&gt; configMap;
    
    public ConfigurationService() {
        Map&lt;String, Integer&gt; tempMap = new HashMap&lt;&gt;();
        configMap = Collections.checkedMap(tempMap, String.class, Integer.class);
    }
    
    public void setConfig(String key, Integer value) {
        configMap.put(key, value);
    }
    
    public Map&lt;String, Integer&gt; getConfig() {
        return Collections.unmodifiableMap(configMap);
    }
    
    public static void main(String[] args) {
        ConfigurationService service = new ConfigurationService();
        
        // Valid configurations
        service.setConfig("port", 8080);
        service.setConfig("timeout", 30);
        service.setConfig("maxConnections", 100);
        
        System.out.println("Configuration: " + service.getConfig());
        
        try {
            // Invalid configuration type
            service.getConfig().put("invalid", "value");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify config directly: " + e.getMessage());
        }
        
        try {
            // Invalid value type
            Map&lt;String, Integer&gt; rawConfig = service.getConfig();
            rawConfig.put("retry", "5");
        } catch (ClassCastException e) {
            System.out.println("Caught invalid type: " + e.getMessage());
        }
    }
}

This example shows a ConfigurationService that uses a checked map to
ensure all configuration keys are Strings and values are Integers. The service
returns an unmodifiable view of the map to prevent external modifications, and the
checked map ensures type safety for all operations.

The output demonstrates valid configuration settings, an attempt to modify the
returned map (which fails), and an attempt to add an invalid type (which also fails).
This pattern is common in applications where configuration data must be strictly
typed and protected from external changes.

## Source

[Java Collections.checkedMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#checkedMap-java.util.Map-java.lang.Class-java.lang.Class-)

In this tutorial, we've explored Collections.checkedMap in depth. We've
covered basic usage, different type combinations, custom objects, null handling,
performance considerations, legacy code integration, concurrent access, and practical
applications. This method is valuable for ensuring type safety in map operations,
especially when working with non-generic or untrusted code.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).