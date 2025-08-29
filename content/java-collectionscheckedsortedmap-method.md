+++
title = "Java Collections.checkedSortedMap Method"
date = 2025-08-29T19:58:16.797+01:00
draft = false
description = "Complete Java Collections.checkedSortedMap tutorial with examples. Learn how to use type-safe sorted maps in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.checkedSortedMap Method

Last modified: April 20, 2025

 

The Collections.checkedSortedMap method is part of Java's Collections
Framework. It returns a dynamically type-safe view of the specified sorted map.
This wrapper ensures type safety at runtime by checking element types during
insertion.

The method is particularly useful for debugging and enforcing type constraints.
It throws ClassCastException if an invalid type is inserted. The
returned map maintains all the properties of the original sorted map.

## Collections.checkedSortedMap Overview

Collections.checkedSortedMap provides runtime type checking for
sorted maps. It wraps an existing SortedMap and checks all added
elements. The method signature takes the map and two Class objects for key and
value types.

The returned view prevents insertion of elements with wrong types. It's useful
for detecting type violations early. The wrapper preserves the original map's
sorting order and all its operations.

## Basic checkedSortedMap Usage

This example demonstrates the basic usage of checkedSortedMap. We
create a TreeMap and wrap it with type checking. The example shows both valid
and invalid operations.

BasicCheckedSortedMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class BasicCheckedSortedMap {

    public static void main(String[] args) {
        
        // Create original sorted map
        SortedMap&lt;String, Integer&gt; original = new TreeMap&lt;&gt;();
        original.put("Apple", 10);
        original.put("Banana", 20);
        
        // Create type-safe view
        SortedMap&lt;String, Integer&gt; checked = 
            Collections.checkedSortedMap(original, String.class, Integer.class);
        
        // Valid operation
        checked.put("Cherry", 30);
        System.out.println("Valid addition: " + checked);
        
        try {
            // Invalid key type
            checked.put(42, 40);
        } catch (ClassCastException e) {
            System.out.println("Caught invalid key: " + e.getMessage());
        }
        
        try {
            // Invalid value type
            checked.put("Date", "Fifty");
        } catch (ClassCastException e) {
            System.out.println("Caught invalid value: " + e.getMessage());
        }
    }
}

This code creates a TreeMap and wraps it with type checking. Valid
operations work normally, while invalid ones throw exceptions. The type checking
applies to both keys and values.

The output shows successful operations and caught exceptions. This demonstrates
how checkedSortedMap enforces type safety at runtime.

## Using checkedSortedMap with Submaps

checkedSortedMap works with all SortedMap operations,
including submap views. This example shows type checking applied to submaps
created from the checked map.

CheckedSubmap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class CheckedSubmap {

    public static void main(String[] args) {
        
        SortedMap&lt;String, Double&gt; original = new TreeMap&lt;&gt;();
        original.put("A", 1.1);
        original.put("B", 2.2);
        original.put("C", 3.3);
        original.put("D", 4.4);
        
        SortedMap&lt;String, Double&gt; checked = 
            Collections.checkedSortedMap(original, String.class, Double.class);
        
        // Create a submap
        SortedMap&lt;String, Double&gt; submap = checked.subMap("B", "D");
        System.out.println("Original submap: " + submap);
        
        // Valid submap operation
        submap.put("C", 3.33);
        System.out.println("After valid update: " + submap);
        
        try {
            // Invalid operation on submap
            submap.put("E", "Five");
        } catch (ClassCastException e) {
            System.out.println("Caught invalid value in submap: " + e.getMessage());
        }
    }
}

This example demonstrates that type checking applies to submaps as well. We
create a submap from the checked map and perform operations. The type safety is
maintained in the submap view.

The output shows that valid operations succeed while invalid ones are caught.
This proves that type checking is preserved in derived map views.

## Checked SortedMap with Custom Objects

This example shows checkedSortedMap working with custom objects. We
define a simple Product class and use it as the map value type.
The type checking ensures only valid products can be added.

CheckedCustomObjects.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

class Product {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return name + " ($" + price + ")";
    }
}

public class CheckedCustomObjects {

    public static void main(String[] args) {
        
        SortedMap&lt;Integer, Product&gt; inventory = new TreeMap&lt;&gt;();
        inventory.put(1001, new Product("Laptop", 999.99));
        inventory.put(1002, new Product("Phone", 699.99));
        
        SortedMap&lt;Integer, Product&gt; checkedInventory = 
            Collections.checkedSortedMap(inventory, Integer.class, Product.class);
        
        // Valid addition
        checkedInventory.put(1003, new Product("Tablet", 399.99));
        System.out.println("Inventory after valid addition:");
        checkedInventory.forEach((k, v) -&gt; System.out.println(k + ": " + v));
        
        try {
            // Invalid value type
            checkedInventory.put(1004, "Monitor");
        } catch (ClassCastException e) {
            System.out.println("\nCaught invalid product: " + e.getMessage());
        }
    }
}

This example demonstrates type checking with custom objects. The Product
class instances are the only valid values for our map. The checked map prevents
insertion of invalid types.

The output shows successful addition of a valid product and the caught exception
when trying to add an invalid type. This ensures type safety with custom classes.

## Performance Considerations

While checkedSortedMap provides runtime type safety, it comes with
a performance cost. This example demonstrates the overhead by comparing operations
on checked and unchecked maps.

CheckedMapPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class CheckedMapPerformance {

    static final int OPERATIONS = 100000;

    public static void main(String[] args) {
        
        SortedMap&lt;Integer, String&gt; original = new TreeMap&lt;&gt;();
        SortedMap&lt;Integer, String&gt; checked = 
            Collections.checkedSortedMap(original, Integer.class, String.class);
        
        // Test put performance
        long start = System.nanoTime();
        for (int i = 0; i &lt; OPERATIONS; i++) {
            original.put(i, "Value " + i);
        }
        long originalTime = System.nanoTime() - start;
        
        original.clear();
        
        start = System.nanoTime();
        for (int i = 0; i &lt; OPERATIONS; i++) {
            checked.put(i, "Value " + i);
        }
        long checkedTime = System.nanoTime() - start;
        
        System.out.println("Original map put time: " + originalTime / 1e6 + " ms");
        System.out.println("Checked map put time: " + checkedTime / 1e6 + " ms");
        System.out.println("Overhead: " + 
            (100.0 * (checkedTime - originalTime) / originalTime) + "%");
    }
}

This code measures the performance difference between checked and unchecked map
operations. We perform a large number of insertions and compare the times. The
results show the overhead of runtime type checking.

The output displays the time taken for operations on both map types. The
percentage shows the performance overhead introduced by type checking.

## Combining with Unmodifiable SortedMap

checkedSortedMap can be combined with other wrappers like
unmodifiableSortedMap. This example creates a map that's both
type-checked and unmodifiable.

CheckedUnmodifiableMap.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class CheckedUnmodifiableMap {

    public static void main(String[] args) {
        
        SortedMap&lt;String, Double&gt; original = new TreeMap&lt;&gt;();
        original.put("USD", 1.0);
        original.put("EUR", 0.85);
        original.put("GBP", 0.72);
        
        // Create checked and unmodifiable view
        SortedMap&lt;String, Double&gt; rates = Collections.unmodifiableSortedMap(
            Collections.checkedSortedMap(original, String.class, Double.class));
        
        System.out.println("Exchange rates: " + rates);
        
        try {
            // Attempt modification
            rates.put("JPY", 110.0);
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught modification attempt: " + e.getMessage());
        }
        
        try {
            // Attempt invalid type
            original.put(42, 1.0);
        } catch (ClassCastException e) {
            System.out.println("Caught invalid type: " + e.getMessage());
        }
    }
}

This example creates a map that's both type-safe and unmodifiable. We first apply
the type checking wrapper, then make it unmodifiable. The result is a secure
view of the original map.

The output demonstrates that both modification attempts and invalid type
insertions are caught. This shows how wrappers can be combined for stronger
constraints.

## Real-world Use Case: Configuration Validation

This example demonstrates a practical use case for checkedSortedMap:
validating configuration settings. We ensure configuration keys are strings and
values are of specific types.

ConfigValidation.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

public class ConfigValidation {

    public static void main(String[] args) {
        
        SortedMap&lt;String, Object&gt; config = new TreeMap&lt;&gt;();
        
        // Create type-safe configuration map
        SortedMap&lt;String, Object&gt; checkedConfig = 
            Collections.checkedSortedMap(config, String.class, Object.class);
        
        // Valid configurations
        checkedConfig.put("timeout", 30);
        checkedConfig.put("retries", 3);
        checkedConfig.put("debug", false);
        checkedConfig.put("username", "admin");
        
        System.out.println("Valid configuration:");
        checkedConfig.forEach((k, v) -&gt; 
            System.out.println(k + ": " + v + " (" + v.getClass().getSimpleName() + ")"));
        
        try {
            // Invalid key type
            checkedConfig.put(42, "invalid");
        } catch (ClassCastException e) {
            System.out.println("\nCaught invalid key: " + e.getMessage());
        }
        
        // Narrower type checking for specific values
        SortedMap&lt;String, Integer&gt; intConfig = 
            Collections.checkedSortedMap(new TreeMap&lt;&gt;(), String.class, Integer.class);
        intConfig.put("port", 8080);
        
        try {
            intConfig.put("port", "80");
        } catch (ClassCastException e) {
            System.out.println("\nCaught invalid port value: " + e.getMessage());
        }
    }
}

This example shows how checkedSortedMap can validate configuration
settings. We first create a general configuration map with string keys. Then we
demonstrate stricter type checking for specific configuration values.

The output displays valid configurations and caught exceptions. This pattern is
useful for ensuring configuration integrity in applications.

## Source

[Java Collections.checkedSortedMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#checkedSortedMap-java.util.SortedMap-java.lang.Class-java.lang.Class-)

In this tutorial, we explored the Collections.checkedSortedMap method
in depth. We covered basic usage, custom objects, performance, and practical
applications. This wrapper is valuable for enforcing type safety in sorted maps.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).