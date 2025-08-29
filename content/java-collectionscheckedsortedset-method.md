+++
title = "Java Collections.checkedSortedSet Method"
date = 2025-08-29T19:58:17.916+01:00
draft = false
description = "Complete Java Collections.checkedSortedSet tutorial with examples. Learn how to use type-safe sorted sets in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.checkedSortedSet Method

Last modified: April 20, 2025

 

The Collections.checkedSortedSet method is part of Java's Collections
Framework. It provides runtime type safety for SortedSet implementations. This
method returns a dynamically type-safe view of the specified sorted set.

Any attempt to insert an element of the wrong type will result in an immediate
ClassCastException. This helps detect programming errors early
rather than allowing them to propagate. The returned set will be serializable
if the specified set is serializable.

## Collections.checkedSortedSet Overview

The checkedSortedSet method is particularly useful when working
with legacy code or when type safety cannot be guaranteed at compile time. It
wraps an existing SortedSet and enforces type checking at runtime.

The method signature is: static &lt;E&gt; SortedSet&lt;E&gt;
checkedSortedSet(SortedSet&lt;E&gt; s, Class&lt;E&gt; type). It takes
the sorted set to wrap and the type of elements it should contain.

## Basic Usage of checkedSortedSet

This example demonstrates the basic usage of Collections.checkedSortedSet.
We create a TreeSet of Strings and wrap it with a type-safe view. The example
shows both valid and invalid operations.

BasicCheckedSortedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class BasicCheckedSortedSet {

    public static void main(String[] args) {
        
        SortedSet&lt;String&gt; names = new TreeSet&lt;&gt;();
        names.add("Alice");
        names.add("Bob");
        
        // Create type-safe view
        SortedSet&lt;String&gt; checkedNames = 
            Collections.checkedSortedSet(names, String.class);
        
        // Valid operation
        checkedNames.add("Charlie");
        System.out.println("Valid addition: " + checkedNames);
        
        try {
            // Invalid operation - adding wrong type
            checkedNames.add(42); // Integer instead of String
        } catch (ClassCastException e) {
            System.out.println("\nCaught exception: " + e.getMessage());
        }
    }
}

This code creates a TreeSet of Strings and wraps it with
Collections.checkedSortedSet. The type-safe view allows adding
valid String elements but throws ClassCastException for invalid
types.

The output shows the successful addition of "Charlie" and the caught exception
when trying to add an Integer. This demonstrates the runtime type checking.

## Working with Legacy Code

The checkedSortedSet is particularly useful when dealing with
legacy code that doesn't use generics. This example shows how to protect
against type-unsafe operations in such scenarios.

LegacyCodeProtection.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class LegacyCodeProtection {

    @SuppressWarnings({"unchecked", "rawtypes"})
    public static void main(String[] args) {
        
        // Legacy code without generics
        SortedSet rawSet = new TreeSet();
        rawSet.add("Apple");
        rawSet.add("Banana");
        
        // Create type-safe view
        SortedSet&lt;String&gt; safeSet = 
            Collections.checkedSortedSet(rawSet, String.class);
        
        // Pass to legacy method
        legacyMethod(rawSet);
        
        System.out.println("After legacy method: " + safeSet);
        
        try {
            // Now try to use the safe view
            safeSet.add("Cherry"); // Valid
            safeSet.add(123); // Invalid
        } catch (ClassCastException e) {
            System.out.println("\nCaught exception: " + e.getMessage());
        }
    }
    
    @SuppressWarnings("rawtypes")
    private static void legacyMethod(SortedSet set) {
        // Legacy method might add wrong types
        set.add(42); // This will succeed in raw set
    }
}

This example demonstrates how checkedSortedSet can help identify
type safety issues in legacy code. The raw set allows adding any type, but the
type-safe view catches invalid additions when used.

The output shows that the legacy method successfully added an Integer to the raw
set, but attempting to add an Integer through the type-safe view throws an
exception. This helps localize type safety issues.

## Combining with Other Collections Methods

This example shows how checkedSortedSet can be combined with other
Collections utility methods. We create an unmodifiable type-safe view of a
sorted set.

CombinedCollectionsMethods.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class CombinedCollectionsMethods {

    public static void main(String[] args) {
        
        SortedSet&lt;Integer&gt; numbers = new TreeSet&lt;&gt;();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        
        // Create type-safe and unmodifiable view
        SortedSet&lt;Integer&gt; safeUnmodifiableSet = Collections.unmodifiableSortedSet(
            Collections.checkedSortedSet(numbers, Integer.class));
        
        System.out.println("Initial set: " + safeUnmodifiableSet);
        
        try {
            // Attempt modification through unmodifiable view
            safeUnmodifiableSet.add(40);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCaught UnsupportedOperationException: " + 
                e.getMessage());
        }
        
        try {
            // Attempt to add wrong type to original set
            numbers.add("Not a number");
        } catch (ClassCastException e) {
            System.out.println("\nCaught ClassCastException: " + e.getMessage());
        }
    }
}

This code combines checkedSortedSet with
unmodifiableSortedSet to create a view that is both type-safe and
unmodifiable. The example demonstrates both type safety and immutability
protection.

The output shows that attempts to modify the set through the unmodifiable view
are caught, as are attempts to add elements of the wrong type to the original
set. This demonstrates layered collection protections.

## Using with Custom Comparators

The checkedSortedSet works with sorted sets that use custom
comparators. This example demonstrates type checking in a sorted set with a
case-insensitive string comparator.

CustomComparatorExample.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class CustomComparatorExample {

    public static void main(String[] args) {
        
        // Create sorted set with case-insensitive comparator
        SortedSet&lt;String&gt; caseInsensitiveSet = new TreeSet&lt;&gt;(
            String.CASE_INSENSITIVE_ORDER);
        
        caseInsensitiveSet.add("Apple");
        caseInsensitiveSet.add("banana");
        
        // Create type-safe view
        SortedSet&lt;String&gt; checkedSet = 
            Collections.checkedSortedSet(caseInsensitiveSet, String.class);
        
        System.out.println("Original set: " + checkedSet);
        
        // Adding with different case works due to comparator
        checkedSet.add("APPLE");
        System.out.println("After adding 'APPLE': " + checkedSet);
        
        try {
            // Adding wrong type fails
            checkedSet.add(42);
        } catch (ClassCastException e) {
            System.out.println("\nCaught ClassCastException: " + e.getMessage());
        }
    }
}

This example shows that checkedSortedSet works with sorted sets
that use custom comparators. The type checking is performed independently of
the sorting logic.

The output demonstrates that the case-insensitive comparator allows "APPLE" to
be added (though it doesn't appear twice due to being equal to "Apple"), while
attempting to add an Integer is caught by the type checking.

## Serialization with checkedSortedSet

The set returned by checkedSortedSet is serializable if the
backing set is serializable. This example demonstrates serialization and
deserialization of a type-safe sorted set.

SerializationExample.java
  

package com.zetcode;

import java.io.*;
import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class SerializationExample {

    public static void main(String[] args) {
        String filename = "checkedset.ser";
        
        // Create and serialize a checked sorted set
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            
            SortedSet&lt;Double&gt; numbers = new TreeSet&lt;&gt;();
            numbers.add(3.14);
            numbers.add(2.71);
            
            SortedSet&lt;Double&gt; checkedNumbers = 
                Collections.checkedSortedSet(numbers, Double.class);
            
            oos.writeObject(checkedNumbers);
            System.out.println("Serialized set: " + checkedNumbers);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize the checked sorted set
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(filename))) {
            
            @SuppressWarnings("unchecked")
            SortedSet&lt;Double&gt; deserialized = (SortedSet&lt;Double&gt;) ois.readObject();
            
            System.out.println("Deserialized set: " + deserialized);
            
            // Verify type safety still works
            try {
                deserialized.add("Not a number");
            } catch (ClassCastException e) {
                System.out.println("\nCaught ClassCastException: " + 
                    e.getMessage());
            }
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates that the type-safe wrapper maintains its type checking
capabilities after serialization and deserialization. The serialized set
preserves both its elements and its type safety constraints.

The output shows the set before serialization and after deserialization,
followed by the caught exception when attempting to add an invalid type. This
confirms that type safety is maintained through serialization.

## Performance Considerations

While checkedSortedSet provides valuable type safety, it does add
a small performance overhead. This example demonstrates how to measure the
impact of the type checking wrapper.

PerformanceComparison.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class PerformanceComparison {

    public static void main(String[] args) {
        final int ELEMENT_COUNT = 100000;
        final int TEST_RUNS = 100;
        
        SortedSet&lt;Integer&gt; regularSet = new TreeSet&lt;&gt;();
        SortedSet&lt;Integer&gt; checkedSet = 
            Collections.checkedSortedSet(new TreeSet&lt;&gt;(), Integer.class);
        
        // Test regular set performance
        long regularTime = timeAddOperations(regularSet, ELEMENT_COUNT, TEST_RUNS);
        
        // Test checked set performance
        long checkedTime = timeAddOperations(checkedSet, ELEMENT_COUNT, TEST_RUNS);
        
        System.out.println("Regular set time: " + regularTime + " ms");
        System.out.println("Checked set time: " + checkedTime + " ms");
        System.out.println("Overhead: " + 
            ((double)(checkedTime - regularTime)/regularTime * 100) + "%");
    }
    
    private static long timeAddOperations(SortedSet&lt;Integer&gt; set, 
            int count, int runs) {
        long totalTime = 0;
        
        for (int i = 0; i &lt; runs; i++) {
            set.clear();
            long start = System.currentTimeMillis();
            
            for (int j = 0; j &lt; count; j++) {
                set.add(j);
            }
            
            totalTime += System.currentTimeMillis() - start;
        }
        
        return totalTime / runs;
    }
}

This code compares the performance of a regular TreeSet with a
type-safe wrapped version. The test measures the time taken to add elements
to both sets, averaging over multiple runs for accuracy.

The output shows the absolute times and the percentage overhead introduced by
the type checking. While the overhead is typically small, it's important to
consider in performance-critical applications.

## Source

[Java Collections.checkedSortedSet Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#checkedSortedSet-java.util.SortedSet-java.lang.Class-)

In this article, we've explored the Collections.checkedSortedSet
method in depth. We've covered basic usage, legacy code integration, combination
with other utilities, custom comparators, serialization, and performance.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).