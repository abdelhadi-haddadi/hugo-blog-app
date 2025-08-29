+++
title = "Java Collections.checkedList Method"
date = 2025-08-29T19:58:15.681+01:00
draft = false
description = "Complete Java Collections.checkedList tutorial with examples. Learn how to use type-safe collections in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.checkedList Method

Last modified: April 20, 2025

 

The Collections.checkedList method is part of Java's Collections
Framework. It returns a dynamically type-safe view of the specified list. This
helps catch type mismatches at runtime rather than allowing them to corrupt
collections.

Type-safe views are particularly useful when working with legacy code or
heterogeneous collections. They provide runtime type checking that complements
Java's compile-time generics. The method was introduced in Java 5.

## Collections.checkedList Overview

Collections.checkedList wraps an existing list to provide runtime
type checking. Any attempt to insert an element of the wrong type will throw
a ClassCastException. This helps maintain collection integrity.

The method signature is static &lt;E&gt; List&lt;E&gt; checkedList(List&lt;E&gt; list,
Class&lt;E&gt; type). It takes a list and a Class object representing the
element type. The returned list enforces this type constraint.

## Basic checkedList Usage

This example demonstrates the basic usage of Collections.checkedList.
We create a regular ArrayList and then wrap it with a type-safe view. The
example shows both valid and invalid operations.

BasicCheckedList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicCheckedList {

    public static void main(String[] args) {
        
        List&lt;String&gt; names = new ArrayList&lt;&gt;();
        names.add("John");
        names.add("Lucy");
        
        // Create type-safe view
        List&lt;String&gt; checkedNames = 
            Collections.checkedList(names, String.class);
        
        // Valid operation
        checkedNames.add("Bob");
        System.out.println("Names: " + checkedNames);
        
        try {
            // Invalid operation - will throw ClassCastException
            List rawList = checkedNames;
            rawList.add(42); // Adding Integer to String list
        } catch (ClassCastException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}

This code creates a type-safe view of a String list. We first add valid String
elements successfully. Then we demonstrate how the checked list catches type
mismatches by attempting to add an Integer.

The output shows the valid operations complete normally while the invalid one
throws an exception. This helps identify type safety issues during development.

## Working with Legacy Code

checkedList is particularly useful when interfacing with legacy
code that doesn't use generics. This example shows how it can prevent type
pollution in such scenarios.

LegacyCodeIntegration.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LegacyCodeIntegration {

    public static void main(String[] args) {
        
        // Modern typed list
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        numbers.add(1);
        numbers.add(2);
        
        // Create type-safe view
        List&lt;Integer&gt; checkedNumbers = 
            Collections.checkedList(numbers, Integer.class);
        
        // Pass to legacy method
        legacyMethod(checkedNumbers);
        
        System.out.println("Numbers after legacy call: " + numbers);
    }
    
    // Legacy method without generics
    @SuppressWarnings({"rawtypes", "unchecked"})
    private static void legacyMethod(List list) {
        // Attempt to add wrong type
        list.add("Not a number"); // Will throw ClassCastException
    }
}

This example demonstrates protecting a typed collection when passed to legacy
code. The legacyMethod doesn't use generics and could normally
insert any type. The checked list prevents this.

The output shows the type safety is maintained even when interacting with
non-generic code. This makes checkedList valuable for gradual
modernization of legacy systems.

## Checked List with Custom Objects

Collections.checkedList works with custom objects just as well as
with built-in types. This example demonstrates using it with a custom class.

CustomObjectCheckedList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Product {
    private String name;
    
    public Product(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return name;
    }
}

public class CustomObjectCheckedList {

    public static void main(String[] args) {
        
        List&lt;Product&gt; products = new ArrayList&lt;&gt;();
        products.add(new Product("Laptop"));
        
        // Create type-safe view
        List&lt;Product&gt; checkedProducts = 
            Collections.checkedList(products, Product.class);
        
        // Valid addition
        checkedProducts.add(new Product("Phone"));
        System.out.println("Products: " + checkedProducts);
        
        try {
            // Invalid addition
            checkedProducts.add("Not a product"); // String instead of Product
        } catch (ClassCastException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}

This example creates a checked list of Product objects. We show
both valid additions of Product instances and an invalid attempt to add a
String. The type safety is enforced at runtime.

The output demonstrates that only proper Product objects can be added to the
checked list. This maintains collection integrity even with custom types.

## Performance Considerations

While checkedList provides valuable type safety, it has performance
implications. This example demonstrates measuring the overhead of using checked
collections.

CheckedListPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CheckedListPerformance {

    public static void main(String[] args) {
        
        final int COUNT = 1000000;
        List&lt;Integer&gt; regularList = new ArrayList&lt;&gt;();
        List&lt;Integer&gt; checkedList = 
            Collections.checkedList(new ArrayList&lt;&gt;(), Integer.class);
        
        // Test regular list
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; COUNT; i++) {
            regularList.add(i);
        }
        long regularTime = System.currentTimeMillis() - start;
        
        // Test checked list
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; COUNT; i++) {
            checkedList.add(i);
        }
        long checkedTime = System.currentTimeMillis() - start;
        
        System.out.println("Regular list time: " + regularTime + "ms");
        System.out.println("Checked list time: " + checkedTime + "ms");
        System.out.println("Overhead: " + 
            (100.0 * (checkedTime - regularTime) / regularTime + "%");
    }
}

This code compares the performance of regular and checked lists when adding
elements. The checked list performs a type check on each insertion, which adds
overhead. The exact overhead varies by JVM implementation.

The output shows the relative performance difference. In most applications, the
safety benefits outweigh the small performance cost. However, in performance-
critical sections, this should be considered.

## Checked List with Null Values

Collections.checkedList handles null values specially. This example
demonstrates how nulls are treated in checked collections.

CheckedListWithNulls.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CheckedListWithNulls {

    public static void main(String[] args) {
        
        List&lt;String&gt; names = new ArrayList&lt;&gt;();
        List&lt;String&gt; checkedNames = 
            Collections.checkedList(names, String.class);
        
        // Adding null to checked list is allowed
        checkedNames.add(null);
        System.out.println("List with null: " + checkedNames);
        
        // Adding non-null values still checked
        checkedNames.add("Alice");
        System.out.println("List with values: " + checkedNames);
        
        try {
            // Still catches invalid types
            List rawList = checkedNames;
            rawList.add(42);
        } catch (ClassCastException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}

This example shows that null values can be added to checked lists regardless of
the element type. The type checking only applies to non-null values. This is
consistent with Java's general handling of null in generics.

The output demonstrates that while nulls are permitted, type safety is still
enforced for actual values. This behavior is important to understand when
working with collections that may contain nulls.

## Combining with Other Collections Methods

Collections.checkedList can be combined with other Collections
utility methods. This example shows using it with unmodifiableList
for maximum safety.

CombinedCollectionsUtilities.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CombinedCollectionsUtilities {

    public static void main(String[] args) {
        
        List&lt;Double&gt; prices = new ArrayList&lt;&gt;();
        prices.add(19.99);
        
        // Create type-safe and unmodifiable view
        List&lt;Double&gt; safePrices = Collections.unmodifiableList(
            Collections.checkedList(prices, Double.class));
        
        System.out.println("Initial list: " + safePrices);
        
        // Can modify through original reference
        prices.add(29.99);
        System.out.println("After original modification: " + safePrices);
        
        try {
            // Cannot modify through safe view
            safePrices.add(39.99);
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught modification attempt: " + e.getMessage());
        }
        
        try {
            // Still type-checked
            List rawList = safePrices;
            rawList.add("Not a number");
        } catch (ClassCastException e) {
            System.out.println("Caught type violation: " + e.getMessage());
        }
    }
}

This example combines type safety with immutability. We first create a checked
list, then make it unmodifiable. The result is a collection that's both type-
safe and cannot be modified through its public interface.

The output shows that modifications are still possible through the original
reference but not through the wrapped view. Type safety is maintained in all
cases. This combination is powerful for APIs.

## Source

[Java Collections.checkedList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#checkedList-java.util.List-java.lang.Class-)

In this article, we've explored Java's Collections.checkedList method
in depth. We've covered basic usage, legacy code integration, performance, null
handling, and combining with other utilities. This tool is valuable for
maintaining type safety in Java collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).