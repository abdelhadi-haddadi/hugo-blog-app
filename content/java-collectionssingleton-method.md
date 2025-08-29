+++
title = "Java Collections.singleton Method"
date = 2025-08-29T19:58:23.585+01:00
draft = false
description = "Complete Java Collections.singleton tutorial with examples. Learn how to use Java Collections.singleton method."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.singleton Method

Last modified: April 20, 2025

 

The Collections.singleton method is a utility method in Java's
Collections Framework. It creates an immutable Set containing only the specified
object. This method is useful when you need a single-element, unmodifiable Set.

The returned Set is serializable and has a fixed size of 1. Attempts to modify
it will throw an UnsupportedOperationException. This makes it ideal
for APIs requiring read-only single-element collections.

## Collections.singleton Overview

The singleton method is part of the java.util.Collections
class. It was introduced in Java 1.3 and has remained unchanged since. The method
takes a single parameter and returns a Set containing that parameter.

The implementation is memory-efficient as it doesn't create a full HashSet. It's
thread-safe and provides constant-time performance for basic operations. The Set
maintains the element's type through generics.

## Basic Usage of Collections.singleton

This example demonstrates the most basic usage of Collections.singleton.
We create a single-element Set containing a String. The example shows how to create
the Set and verify its contents.

SingletonBasicExample.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Set;

public class SingletonBasicExample {

    public static void main(String[] args) {
        
        // Create a singleton Set
        Set&lt;String&gt; singleElementSet = Collections.singleton("Hello");
        
        // Print the Set
        System.out.println("Singleton Set: " + singleElementSet);
        
        // Check size
        System.out.println("Set size: " + singleElementSet.size());
        
        // Check contains
        System.out.println("Contains 'Hello': " + 
            singleElementSet.contains("Hello"));
    }
}

This code creates an immutable Set containing just the String "Hello". We then
demonstrate basic operations on the Set. The output shows the Set's contents,
size, and membership check.

The Set cannot be modified after creation. Any attempt to add or remove elements
would throw an UnsupportedOperationException.

## Using singleton with Collection Methods

The Collections.singleton method is often used with other collection
methods. This example shows how to use it with removeAll to remove
a specific element from a collection.

SingletonWithRemoveAll.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SingletonWithRemoveAll {

    public static void main(String[] args) {
        
        List&lt;String&gt; colors = new ArrayList&lt;&gt;();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        colors.add("Green");
        
        System.out.println("Original list: " + colors);
        
        // Remove all occurrences of "Green"
        colors.removeAll(Collections.singleton("Green"));
        
        System.out.println("After removal: " + colors);
    }
}

This example demonstrates a common use case for Collections.singleton.
We create a List with multiple elements, including duplicates. Then we use
removeAll with a singleton Set to remove all occurrences of "Green".

The output shows the List before and after the removal operation. This technique
is cleaner than manually iterating to remove elements.

## Immutable Nature of singleton

The Set returned by Collections.singleton is immutable. This example
demonstrates what happens when attempting to modify the Set. All modification
attempts result in exceptions.

SingletonImmutability.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Set;

public class SingletonImmutability {

    public static void main(String[] args) {
        
        Set&lt;Integer&gt; singleNumber = Collections.singleton(42);
        
        System.out.println("Original Set: " + singleNumber);
        
        try {
            // Attempt to add element
            singleNumber.add(99);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add: " + e.getMessage());
        }
        
        try {
            // Attempt to remove element
            singleNumber.remove(42);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot remove: " + e.getMessage());
        }
        
        try {
            // Attempt to clear
            singleNumber.clear();
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot clear: " + e.getMessage());
        }
    }
}

This code intentionally triggers exceptions to demonstrate the immutable nature
of singleton Sets. We attempt to add, remove, and clear the Set, all of which
fail with UnsupportedOperationException.

The output shows each failed operation. This immutability is by design and
ensures the Set remains constant after creation.

## Using singleton with Stream API

The Collections.singleton method works well with Java's Stream API.
This example shows how to create a stream from a singleton Set and perform
operations on it.

SingletonWithStreams.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class SingletonWithStreams {

    public static void main(String[] args) {
        
        Set&lt;String&gt; singleWord = Collections.singleton("Java");
        
        // Create stream from singleton
        String result = singleWord.stream()
            .map(String::toUpperCase)
            .collect(Collectors.joining());
            
        System.out.println("Original: " + singleWord);
        System.out.println("Transformed: " + result);
        
        // Filter example
        long count = singleWord.stream()
            .filter(s -&gt; s.length() &gt; 3)
            .count();
            
        System.out.println("Count of words longer than 3: " + count);
    }
}

This example demonstrates using a singleton Set with Java Streams. We create a
stream from the Set, transform its element to uppercase, and collect the result.
We also show filtering, though with a single element.

The output shows the original and transformed values. While simple, this pattern
can be useful when working with APIs that expect collections.

## Performance Considerations

The Collections.singleton method has performance advantages over
regular Set implementations. This example compares memory usage and operation
times between singleton and HashSet.

SingletonPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SingletonPerformance {

    public static void main(String[] args) {
        
        // Measure memory before
        long memoryBefore = Runtime.getRuntime().freeMemory();
        
        // Create 100,000 singleton sets
        for (int i = 0; i &lt; 100_000; i++) {
            Set&lt;Integer&gt; s = Collections.singleton(i);
        }
        
        // Measure memory after
        long memoryAfter = Runtime.getRuntime().freeMemory();
        System.out.println("Memory used by singletons: " + 
            (memoryBefore - memoryAfter) + " bytes");
            
        // Reset
        memoryBefore = Runtime.getRuntime().freeMemory();
        
        // Create 100,000 HashSets
        for (int i = 0; i &lt; 100_000; i++) {
            Set&lt;Integer&gt; s = new HashSet&lt;&gt;();
            s.add(i);
        }
        
        // Measure memory after
        memoryAfter = Runtime.getRuntime().freeMemory();
        System.out.println("Memory used by HashSets: " + 
            (memoryBefore - memoryAfter) + " bytes");
    }
}

This example compares the memory usage of singleton Sets versus regular HashSets.
We create 100,000 of each and measure the memory difference. Singleton Sets are
significantly more memory-efficient.

The output shows the memory consumption difference. For single-element Sets,
Collections.singleton should be preferred when immutability is
acceptable.

## Using singleton in Method Parameters

The Collections.singleton method is often used to pass single
elements to methods expecting collections. This example demonstrates this
pattern with a method that processes a Set of values.

SingletonAsParameter.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Set;

public class SingletonAsParameter {

    public static void main(String[] args) {
        
        // Call method with multiple values
        printLanguages(Set.of("Java", "Python", "C++"));
        
        // Call same method with single value using singleton
        printLanguages(Collections.singleton("JavaScript"));
    }
    
    private static void printLanguages(Set&lt;String&gt; languages) {
        System.out.println("Languages:");
        languages.forEach(System.out::println);
        System.out.println("-----");
    }
}

This example shows how Collections.singleton can be used to pass
a single value to a method expecting a Set. We define a method that prints all
elements in a Set, then call it with both a multi-element Set and a singleton.

The output demonstrates that the method works the same in both cases. This
pattern provides API flexibility while maintaining type safety.

## Comparing singleton with Other Methods

Java provides several ways to create single-element collections. This example
compares Collections.singleton with Set.of (Java 9+)
and manual Set creation.

SingletonComparison.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SingletonComparison {

    public static void main(String[] args) {
        
        // Method 1: Collections.singleton
        Set&lt;String&gt; s1 = Collections.singleton("A");
        
        // Method 2: Set.of (Java 9+)
        Set&lt;String&gt; s2 = Set.of("A");
        
        // Method 3: Manual HashSet
        Set&lt;String&gt; s3 = new HashSet&lt;&gt;();
        s3.add("A");
        
        System.out.println("Collections.singleton: " + s1);
        System.out.println("Set.of: " + s2);
        System.out.println("Manual HashSet: " + s3);
        
        // Attempt modifications
        try {
            s1.add("B");
        } catch (Exception e) {
            System.out.println("s1 is immutable");
        }
        
        try {
            s2.add("B");
        } catch (Exception e) {
            System.out.println("s2 is immutable");
        }
        
        s3.add("B");
        System.out.println("Modified s3: " + s3);
    }
}

This example compares three ways to create single-element Sets. We show
Collections.singleton, Set.of (Java 9+), and manual
HashSet creation. Each has different characteristics regarding mutability.

The output demonstrates that both Collections.singleton and
Set.of produce immutable Sets, while HashSet remains mutable.
The choice depends on Java version and mutability requirements.

## Source

[Java Collections.singleton Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#singleton-T-)

In this article, we've explored the Collections.singleton method
in depth. We've covered basic usage, immutability, performance, and comparison
with alternatives. This method is a valuable tool for working with single-element
collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).