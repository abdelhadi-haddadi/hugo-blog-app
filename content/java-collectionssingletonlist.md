+++
title = "Java Collections.singletonList"
date = 2025-08-29T19:58:23.573+01:00
draft = false
description = "Complete Java Collections.singletonList tutorial with examples. Learn how to use this utility method effectively."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.singletonList

Last modified: April 20, 2025

 

The Collections.singletonList method is a utility method in Java's
Collections framework. It returns an immutable list containing only the specified
object. This method is useful when you need a single-element list that cannot be
modified.

The returned list is serializable and implements the RandomAccess
interface. It is more space-efficient than creating a regular list with one
element. The method is particularly useful for APIs that require lists.

## Collections.singletonList Overview

Collections.singletonList creates an immutable single-element list.
The list cannot be modified - attempts to add, remove, or set elements will
throw UnsupportedOperationException. This makes it thread-safe.

The method is part of the java.util.Collections utility class. It
was introduced in Java 1.3. The implementation is optimized for single-element
storage, making it more efficient than regular lists for this specific case.

## Basic singletonList Usage

This example demonstrates the most basic usage of Collections.singletonList.
We create a single-element list containing a string. The example shows how to
create and access the element in the list.

SingletonListBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class SingletonListBasic {

    public static void main(String[] args) {
        
        // Create a single-element list
        List&lt;String&gt; singleElementList = Collections.singletonList("Hello");
        
        // Access the element
        String element = singleElementList.get(0);
        System.out.println("Element: " + element);
        
        // Print the list
        System.out.println("List: " + singleElementList);
        
        // Size of the list
        System.out.println("Size: " + singleElementList.size());
    }
}

This code creates an immutable list containing just the string "Hello". We then
access the element using get(0) since it's the only element. The
size of the list is always 1.

The output shows the element value, the list representation, and confirms the
list size is exactly one. This demonstrates the basic behavior of singletonList.

## Attempting to Modify singletonList

This example shows what happens when you try to modify a list created with
Collections.singletonList. The list is immutable, so any
modification attempt throws an exception.

SingletonListModification.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class SingletonListModification {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = Collections.singletonList(42);
        
        try {
            // Attempt to add element
            numbers.add(99);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add: " + e.getMessage());
        }
        
        try {
            // Attempt to remove element
            numbers.remove(0);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot remove: " + e.getMessage());
        }
        
        try {
            // Attempt to set element
            numbers.set(0, 100);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot set: " + e.getMessage());
        }
        
        // Original list remains unchanged
        System.out.println("Original list: " + numbers);
    }
}

This code demonstrates the immutability of singletonList. We attempt to add,
remove, and modify elements, all of which fail with
UnsupportedOperationException. The original list remains unchanged.

The output shows each failed operation and the exception message. This confirms
that singletonList is truly immutable and cannot be modified after creation.

## Using singletonList with APIs

This example shows how Collections.singletonList can be useful when
working with APIs that require lists. We demonstrate passing a single value to
a method that expects a list parameter.

SingletonListApiUsage.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class SingletonListApiUsage {

    public static void main(String[] args) {
        
        // Method that requires a List parameter
        printNames(Collections.singletonList("Alice"));
        
        // Compare with regular list creation
        printNames(List.of("Bob")); // Java 9+
    }
    
    private static void printNames(List&lt;String&gt; names) {
        System.out.println("Names:");
        for (String name : names) {
            System.out.println("- " + name);
        }
    }
}

Here we use Collections.singletonList to pass a single name to a
method that expects a list. This is more efficient than creating a regular list
for just one element. We also show the Java 9+ alternative using List.of.

The output demonstrates that both approaches work correctly. The method receives
a list containing exactly one element and processes it accordingly.

## singletonList in Collections.addAll

This example demonstrates using Collections.singletonList with
Collections.addAll. We show how to efficiently add a single element
to an existing collection using these methods together.

SingletonListWithAddAll.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SingletonListWithAddAll {

    public static void main(String[] args) {
        
        List&lt;String&gt; colors = new ArrayList&lt;&gt;();
        colors.add("Red");
        colors.add("Green");
        
        // Add single element using singletonList
        Collections.addAll(colors, Collections.singletonList("Blue").toArray(new String[0]));
        
        System.out.println("Colors: " + colors);
        
        // Alternative way
        colors.addAll(Collections.singletonList("Yellow"));
        System.out.println("Updated colors: " + colors);
    }
}

This code shows two ways to add a single element to a list using
Collections.singletonList. The first approach uses
Collections.addAll, while the second uses List.addAll.

Both methods achieve the same result, but demonstrate different ways to work
with singletonList. The output shows the list growing with each addition.

## singletonList vs Arrays.asList

This example compares Collections.singletonList with
Arrays.asList when creating single-element lists. We highlight the
key differences between these approaches.

SingletonListVsArraysAsList.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SingletonListVsArraysAsList {

    public static void main(String[] args) {
        
        // Using singletonList
        List&lt;String&gt; singleton = Collections.singletonList("One");
        System.out.println("singletonList: " + singleton);
        
        // Using Arrays.asList
        List&lt;String&gt; asList = Arrays.asList("One");
        System.out.println("Arrays.asList: " + asList);
        
        // Modification attempts
        try {
            asList.set(0, "Modified");
            System.out.println("Modified Arrays.asList: " + asList);
        } catch (Exception e) {
            System.out.println("Cannot modify Arrays.asList: " + e.getMessage());
        }
        
        // Size comparison
        System.out.println("singletonList size: " + singleton.size());
        System.out.println("Arrays.asList size: " + asList.size());
    }
}

This example compares two ways to create single-element lists.
Collections.singletonList creates a truly immutable list, while
Arrays.asList creates a fixed-size list that allows element
modification but not structural changes.

The output shows that Arrays.asList allows modifying the existing
element but not changing the list size. Both lists report size 1, but have
different modification capabilities.

## singletonList in Method Returns

This example demonstrates using Collections.singletonList as a
return value from methods. It's particularly useful when a method needs to
return a list but only has one value to return.

SingletonListMethodReturn.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class SingletonListMethodReturn {

    public static void main(String[] args) {
        
        // Get a single search result
        List&lt;String&gt; searchResults = searchDatabase("Java");
        System.out.println("Search results: " + searchResults);
        
        // Process the result
        if (!searchResults.isEmpty()) {
            System.out.println("First result: " + searchResults.get(0));
        }
    }
    
    private static List&lt;String&gt; searchDatabase(String query) {
        // Simulate database search
        if ("Java".equals(query)) {
            return Collections.singletonList("Java Programming");
        }
        return Collections.emptyList();
    }
}

Here we use Collections.singletonList to return a single search
result from a method. This is cleaner than returning null or creating a
full list implementation. The calling code can treat the result as a regular
list.

The output shows the search result being returned and processed. The method
could return an empty list for no matches, maintaining consistent return types.

## singletonList Performance

This example demonstrates the performance benefits of
Collections.singletonList compared to regular list implementations.
We measure memory usage and creation time for both approaches.

SingletonListPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SingletonListPerformance {

    public static void main(String[] args) {
        final int ITERATIONS = 1_000_000;
        
        // Measure ArrayList creation
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            List&lt;String&gt; list = new ArrayList&lt;&gt;();
            list.add("Item");
        }
        long arrayListTime = System.currentTimeMillis() - start;
        
        // Measure singletonList creation
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            List&lt;String&gt; list = Collections.singletonList("Item");
        }
        long singletonTime = System.currentTimeMillis() - start;
        
        System.out.println("ArrayList time: " + arrayListTime + "ms");
        System.out.println("singletonList time: " + singletonTime + "ms");
        System.out.println("singletonList is " + 
            (arrayListTime / (double)singletonTime) + "x faster");
    }
}

This benchmark compares creating 1,000,000 single-element lists using both
ArrayList and Collections.singletonList. The results
show significant performance differences between the two approaches.

The output demonstrates that Collections.singletonList is much
faster and more memory-efficient for single-element lists. This makes it ideal
for cases where you only need one element in an immutable list.

## Source

[Java Collections.singletonList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#singletonList-T-)

In this article, we've explored the Collections.singletonList method
in depth. We've covered basic usage, immutability, API integration, performance,
and comparisons with alternatives. This method is a valuable tool for working
with single-element lists efficiently.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).