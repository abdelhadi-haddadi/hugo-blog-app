+++
title = "Java Collections.nCopies Method"
date = 2025-08-29T19:58:21.309+01:00
draft = false
description = "Complete Java Collections.nCopies tutorial with examples. Learn how to create immutable lists with repeated elements."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.nCopies Method

Last modified: April 20, 2025

 

The Collections.nCopies method is a utility method in Java's
Collections Framework. It creates an immutable list containing multiple copies
of a single element. This is useful when you need a list with repeated values.

The method returns a list that contains n copies of the specified
object. The list is immutable, meaning its size and elements cannot be changed.
All elements in the list reference the same object.

## Collections.nCopies Overview

The nCopies method is part of the java.util.Collections
class. It's a static factory method that creates a special kind of List
implementation. The returned list is space-efficient as it stores only one
element reference.

The method signature is: static &lt;T&gt; List&lt;T&gt; nCopies(int n, T o).
The first parameter is the number of copies, the second is the element to repeat.
The list is serializable and implements RandomAccess for efficient access.

## Basic nCopies Example

This example demonstrates the simplest use of nCopies. We create
a list containing five copies of the string "Hello". The resulting list is
immutable and cannot be modified.

BasicNCopies.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class BasicNCopies {

    public static void main(String[] args) {
        
        List&lt;String&gt; greetings = Collections.nCopies(5, "Hello");
        
        System.out.println("List size: " + greetings.size());
        System.out.println("List contents: " + greetings);
        
        try {
            greetings.add("Hi"); // Will throw exception
        } catch (UnsupportedOperationException e) {
            System.out.println("\nCannot modify nCopies list: " + e);
        }
    }
}

This code creates an immutable list with five "Hello" strings. The list's size
is fixed at creation time. Attempting to modify the list throws an
UnsupportedOperationException.

The output shows the list contents and demonstrates its immutability. This is
useful for creating constant lists or default value collections.

## Creating Initialized Lists

nCopies can be used to initialize mutable lists. By passing the
immutable list to a constructor, we create a mutable copy. This is more
efficient than adding elements in a loop.

InitializeList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class InitializeList {

    public static void main(String[] args) {
        
        // Create immutable list with 10 zeros
        List&lt;Integer&gt; immutableZeros = Collections.nCopies(10, 0);
        
        // Create mutable list from immutable one
        List&lt;Integer&gt; mutableZeros = new ArrayList&lt;&gt;(immutableZeros);
        
        System.out.println("Initial list: " + mutableZeros);
        
        // Now we can modify it
        mutableZeros.set(5, 99);
        mutableZeros.add(100);
        
        System.out.println("Modified list: " + mutableZeros);
    }
}

This example shows how to use nCopies for list initialization.
We first create an immutable list of zeros, then use it to construct a mutable
ArrayList. The mutable list can then be modified as needed.

This approach is more efficient than using loops for initialization, especially
for large lists. It clearly expresses the intent to create a list with default
values.

## Working with Custom Objects

nCopies works with any object type, including custom classes. All
elements in the resulting list will reference the same object instance. This is
important to understand when working with mutable objects.

CustomObjects.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return name;
    }
}

public class CustomObjects {

    public static void main(String[] args) {
        
        Person original = new Person("John");
        List&lt;Person&gt; people = Collections.nCopies(3, original);
        
        System.out.println("Original list: " + people);
        
        // Modify the original object
        original.setName("Jane");
        
        System.out.println("After modification: " + people);
    }
}

This example demonstrates nCopies with a custom Person
class. The list contains multiple references to the same Person
object. Changing the original object affects all elements in the list.

This behavior is important to understand when working with mutable objects.
For immutable objects (like Strings), this sharing is safe and memory-efficient.

## Using nCopies with Streams

Java 8 streams can work with nCopies lists. Although the list is
immutable, we can process its elements with stream operations. This example
shows filtering and mapping operations.

NCopiesStreams.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class NCopiesStreams {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = Collections.nCopies(10, 5);
        
        System.out.println("Original list: " + numbers);
        
        // Process with stream
        List&lt;Integer&gt; processed = numbers.stream()
            .map(n -&gt; n * 2)          // Double each number
            .filter(n -&gt; n &gt; 5)        // Filter numbers &gt; 5
            .collect(Collectors.toList());
            
        System.out.println("Processed list: " + processed);
    }
}

This example creates a list of ten fives using nCopies, then
processes it with a stream. The stream operations double each number and filter
those greater than five. The result is a new mutable list.

Streams provide a powerful way to process nCopies lists without
modifying them. This is useful for transformations and calculations on repeated
values.

## Performance Considerations

nCopies is highly memory-efficient for large lists. It stores only
one element reference regardless of list size. This example compares memory
usage between nCopies and regular list creation.

PerformanceTest.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PerformanceTest {

    public static void main(String[] args) {
        final int SIZE = 1_000_000;
        
        // Using nCopies
        long start = System.nanoTime();
        List&lt;String&gt; nCopyList = Collections.nCopies(SIZE, "item");
        long nCopyTime = System.nanoTime() - start;
        
        // Using ArrayList
        start = System.nanoTime();
        List&lt;String&gt; arrayList = new ArrayList&lt;&gt;(SIZE);
        for (int i = 0; i &lt; SIZE; i++) {
            arrayList.add("item");
        }
        long arrayListTime = System.nanoTime() - start;
        
        System.out.println("nCopies creation time (ms): " + 
            nCopyTime / 1_000_000);
        System.out.println("ArrayList creation time (ms): " + 
            arrayListTime / 1_000_000);
        System.out.println("nCopies memory efficient: " + 
            (nCopyList.size() == arrayList.size()));
    }
}

This example demonstrates the performance benefits of nCopies.
Creating a million-element list with nCopies is much faster than
populating an ArrayList manually. It's also more memory-efficient.

The output shows the time difference between the two approaches. For large,
read-only lists of identical elements, nCopies is the better choice.

## nCopies in Data Structures

nCopies can be used to initialize more complex data structures.
This example shows creating a list of lists, where each sublist contains
repeated values. This pattern is useful for matrix initialization.

MatrixInitialization.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MatrixInitialization {

    public static void main(String[] args) {
        
        final int ROWS = 3;
        final int COLS = 4;
        final int INIT_VALUE = 0;
        
        // Create list of lists using nCopies
        List&lt;List&lt;Integer&gt;&gt; matrix = new ArrayList&lt;&gt;(
            Collections.nCopies(ROWS, 
                new ArrayList&lt;&gt;(Collections.nCopies(COLS, INIT_VALUE))
        );
        
        System.out.println("Initial matrix:");
        matrix.forEach(row -&gt; System.out.println(row));
        
        // Modify one element
        matrix.get(1).set(2, 99);
        
        System.out.println("\nModified matrix:");
        matrix.forEach(row -&gt; System.out.println(row));
    }
}

This example creates a 3x4 matrix initialized with zeros using nested
nCopies. The outer list contains references to the same inner
list, so modifying one row affects all rows. This demonstrates both the power
and potential pitfalls of nCopies.

For proper matrix initialization, you would need to create distinct inner
lists. This example serves as a caution about shared references in nested
structures.

## Alternative to nCopies

Java 8 introduced Stream.generate as an alternative to
nCopies. This example compares both approaches for creating
lists with repeated elements. Each has different characteristics and use cases.

StreamAlternative.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamAlternative {

    public static void main(String[] args) {
        
        // Using nCopies
        List&lt;String&gt; nCopyList = Collections.nCopies(5, "Java");
        System.out.println("nCopies result: " + nCopyList);
        
        // Using Stream.generate
        List&lt;String&gt; streamList = Stream.generate(() -&gt; "Java")
            .limit(5)
            .collect(Collectors.toList());
        System.out.println("Stream result: " + streamList);
        
        // Performance comparison
        long start = System.nanoTime();
        Collections.nCopies(1_000_000, "Java");
        long nCopyTime = System.nanoTime() - start;
        
        start = System.nanoTime();
        Stream.generate(() -&gt; "Java").limit(1_000_000).collect(Collectors.toList());
        long streamTime = System.nanoTime() - start;
        
        System.out.println("\nnCopies time (ms): " + nCopyTime / 1_000_000);
        System.out.println("Stream time (ms): " + streamTime / 1_000_000);
    }
}

This example shows two ways to create lists with repeated elements.
nCopies creates an immutable list more efficiently, while
Stream.generate creates a mutable list with more flexibility.

The performance comparison shows nCopies is faster for large
lists. However, streams offer more processing options if you need mutability
or transformations.

## Source

[Java Collections.nCopies Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#nCopies-int-T-)

In this article, we've explored the Collections.nCopies method in
depth. We've covered basic usage, performance characteristics, and alternatives.
This method is valuable for creating memory-efficient immutable lists of
repeated elements.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).