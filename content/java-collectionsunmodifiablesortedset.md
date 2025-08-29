+++
title = "Java Collections.unmodifiableSortedSet"
date = 2025-08-29T19:58:29.227+01:00
draft = false
description = "Complete Java Collections.unmodifiableSortedSet tutorial with examples. Learn how to create immutable sorted sets in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.unmodifiableSortedSet

Last modified: April 20, 2025

 

The Collections.unmodifiableSortedSet method is part of Java's
Collections Framework. It returns an unmodifiable view of a specified
SortedSet. This view is read-only and throws exceptions on
modification attempts.

Unmodifiable collections are useful when you need to provide read-only access
to data. They help enforce immutability and prevent unintended modifications.
The original sorted set can still be modified if you maintain a reference to it.

## SortedSet and Unmodifiable Collections Overview

A SortedSet is a Set that maintains its elements in
ascending order. The ordering can be natural or determined by a
Comparator. TreeSet is the primary implementation.

Unmodifiable collections are wrappers that prevent modification operations.
They throw UnsupportedOperationException when modification is
attempted. The original collection remains modifiable if you have a reference.

## Basic unmodifiableSortedSet Example

This example demonstrates creating an unmodifiable view of a TreeSet.
We first create a mutable TreeSet, then wrap it with
unmodifiableSortedSet. The example shows both allowed and
disallowed operations.

BasicUnmodifiableSortedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class BasicUnmodifiableSortedSet {

    public static void main(String[] args) {
        
        // Create a mutable sorted set
        SortedSet&lt;String&gt; mutableSet = new TreeSet&lt;&gt;();
        mutableSet.add("Apple");
        mutableSet.add("Banana");
        mutableSet.add("Cherry");
        
        // Create unmodifiable view
        SortedSet&lt;String&gt; unmodifiableSet = 
            Collections.unmodifiableSortedSet(mutableSet);
        
        System.out.println("Original set: " + mutableSet);
        System.out.println("Unmodifiable view: " + unmodifiableSet);
        
        // Allowed operation: reading elements
        System.out.println("First element: " + unmodifiableSet.first());
        
        try {
            // Attempt to modify unmodifiable view
            unmodifiableSet.add("Date");
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify unmodifiable set: " + e);
        }
        
        // Original set can still be modified
        mutableSet.add("Date");
        System.out.println("After modifying original: " + unmodifiableSet);
    }
}

This code creates a TreeSet and wraps it with
unmodifiableSortedSet. We demonstrate that read operations work,
but modification attempts throw exceptions. Changes to the original set are
visible through the unmodifiable view.

The output shows the initial set, read operations, the exception when trying to
modify, and how changes to the original set are reflected in the view.

## Creating Truly Immutable SortedSet

To create a completely immutable sorted set, we can combine
unmodifiableSortedSet with initialization in one step. This
approach prevents any modifications since there's no reference to the original.

ImmutableSortedSet.java
  

package com.zetcode;

import java.util.Set;
import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class ImmutableSortedSet {

    public static void main(String[] args) {
        
        // Create truly immutable sorted set
        SortedSet&lt;Integer&gt; immutableSet = Collections.unmodifiableSortedSet(
            new TreeSet&lt;&gt;(Set.of(5, 2, 8, 1, 9))
        );
        
        System.out.println("Immutable set: " + immutableSet);
        
        // All read operations work
        System.out.println("First: " + immutableSet.first());
        System.out.println("Last: " + immutableSet.last());
        System.out.println("Subset (3-7): " + 
            immutableSet.subSet(3, 7));
        
        try {
            // All modification attempts fail
            immutableSet.add(10);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify immutable set: " + e);
        }
    }
}

This example creates a completely immutable sorted set by not keeping a
reference to the original TreeSet. The set is initialized with
values and immediately wrapped. No modifications are possible to either the
original or the view.

The output demonstrates successful read operations and the expected exception
when attempting modification. This pattern is useful for creating constants.

## Using Comparator with unmodifiableSortedSet

This example shows how to use a custom Comparator with
unmodifiableSortedSet. The comparator defines the ordering of
elements in the set. The unmodifiable view maintains this ordering.

ComparatorSortedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.List;

public class ComparatorSortedSet {

    public static void main(String[] args) {
        
        // Create comparator for reverse order
        Comparator&lt;String&gt; reverseComparator = 
            Comparator.reverseOrder();
        
        // Create sorted set with comparator
        SortedSet&lt;String&gt; mutableSet = 
            new TreeSet&lt;&gt;(reverseComparator);
        mutableSet.addAll(List.of("Apple", "Banana", "Cherry"));
        
        // Create unmodifiable view
        SortedSet&lt;String&gt; unmodifiableSet = 
            Collections.unmodifiableSortedSet(mutableSet);
        
        System.out.println("Reverse ordered set: " + unmodifiableSet);
        
        // Comparator is preserved
        System.out.println("Comparator: " + 
            unmodifiableSet.comparator());
        
        // All sorted set operations work
        System.out.println("First element: " + unmodifiableSet.first());
        System.out.println("Head set (before 'Banana'): " + 
            unmodifiableSet.headSet("Banana"));
    }
}

This code demonstrates using a custom comparator with an unmodifiable sorted
set. We create a reverse-order comparator and use it to initialize a
TreeSet. The unmodifiable view maintains both the ordering and
the comparator reference.

The output shows the reverse-ordered elements, the comparator being preserved,
and standard sorted set operations working correctly on the unmodifiable view.

## Working with Subsets

SortedSet provides methods to create subsets. This example shows
how these methods work with unmodifiable sorted sets. The subsets themselves
are also unmodifiable.

SubsetOperations.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class SubsetOperations {

    public static void main(String[] args) {
        
        SortedSet&lt;Integer&gt; numbers = new TreeSet&lt;&gt;();
        Collections.addAll(numbers, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        
        SortedSet&lt;Integer&gt; unmodifiableNumbers = 
            Collections.unmodifiableSortedSet(numbers);
        
        // Create subsets from unmodifiable set
        SortedSet&lt;Integer&gt; headSet = unmodifiableNumbers.headSet(5);
        SortedSet&lt;Integer&gt; tailSet = unmodifiableNumbers.tailSet(5);
        SortedSet&lt;Integer&gt; subSet = unmodifiableNumbers.subSet(3, 7);
        
        System.out.println("Original: " + unmodifiableNumbers);
        System.out.println("Head set (elements &lt; 5): " + headSet);
        System.out.println("Tail set (elements &gt;= 5): " + tailSet);
        System.out.println("Sub set (elements 3-6): " + subSet);
        
        try {
            // Attempt to modify subset
            headSet.add(0);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify subset: " + e);
        }
        
        // Changes to original are reflected in subsets
        numbers.add(0);
        System.out.println("After adding to original:");
        System.out.println("Head set now: " + headSet);
    }
}

This example demonstrates subset operations on an unmodifiable sorted set. We
create head, tail, and arbitrary subsets. These subsets are also unmodifiable
and reflect changes to the original set.

The output shows the subsets and demonstrates that they can't be modified
directly. It also shows how modifying the original set affects the subsets.

## Performance Considerations

This example examines the performance characteristics of
unmodifiableSortedSet. The wrapper adds minimal overhead to
operations since it's just a view. All operations delegate to the underlying set.

PerformanceTest.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class PerformanceTest {

    public static void main(String[] args) {
        
        // Create large sorted set
        SortedSet&lt;Integer&gt; largeSet = new TreeSet&lt;&gt;();
        for (int i = 0; i &lt; 1000000; i++) {
            largeSet.add(i);
        }
        
        // Create unmodifiable view
        SortedSet&lt;Integer&gt; unmodifiableSet = 
            Collections.unmodifiableSortedSet(largeSet);
        
        // Time operations on original
        long start = System.nanoTime();
        boolean contains = largeSet.contains(999999);
        long originalTime = System.nanoTime() - start;
        
        // Time same operation on unmodifiable view
        start = System.nanoTime();
        contains = unmodifiableSet.contains(999999);
        long unmodifiableTime = System.nanoTime() - start;
        
        System.out.println("Original set contains operation: " + 
            originalTime + " ns");
        System.out.println("Unmodifiable set contains operation: " + 
            unmodifiableTime + " ns");
        System.out.println("Overhead: " + 
            (unmodifiableTime - originalTime) + " ns");
    }
}

This code compares the performance of operations on a large original sorted set
versus its unmodifiable view. We measure the time to perform a contains
operation on both. The difference shows the minimal overhead of the wrapper.

The output demonstrates that the unmodifiable wrapper adds negligible overhead
to operations. The performance is essentially identical to using the original
set directly for read operations.

## Real-world Use Case

This example shows a practical application of
unmodifiableSortedSet in an API that provides read-only access to
sorted data. The API returns an unmodifiable view to prevent client code from
modifying internal data.

TemperatureService.java
  

package com.zetcode;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class TemperatureService {

    private final SortedSet&lt;Double&gt; temperatures = new TreeSet&lt;&gt;();
    
    public void addTemperature(double temp) {
        temperatures.add(temp);
    }
    
    public SortedSet&lt;Double&gt; getTemperatures() {
        return Collections.unmodifiableSortedSet(temperatures);
    }
    
    public static void main(String[] args) {
        TemperatureService service = new TemperatureService();
        
        // Add some data
        service.addTemperature(23.5);
        service.addTemperature(19.2);
        service.addTemperature(21.8);
        service.addTemperature(25.1);
        service.addTemperature(18.9);
        
        // Get unmodifiable view of temperatures
        SortedSet&lt;Double&gt; temps = service.getTemperatures();
        System.out.println("All temperatures (sorted): " + temps);
        System.out.println("Highest temperature: " + temps.last());
        System.out.println("Lowest temperature: " + temps.first());
        
        try {
            // Client cannot modify the set
            temps.add(22.0);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nClient cannot modify temperatures: " + e);
        }
    }
}

This example demonstrates a temperature service that maintains a sorted set of
temperature readings. The service provides read-only access to clients through
an unmodifiable view. Clients can see the data but cannot modify it.

The output shows the sorted temperatures and demonstrates that client code
cannot modify the set. This pattern is common in APIs where you need to expose
internal collections safely.

## Source

[Java Collections.unmodifiableSortedSet Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableSortedSet-java.util.SortedSet-)

In this tutorial, we've explored Collections.unmodifiableSortedSet
in depth. We've covered basic usage, immutability patterns, comparators,
subsets, performance, and practical applications. This method is valuable for
creating read-only views of sorted data.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).