+++
title = "Java Collections.shuffle Method"
date = 2025-08-29T19:58:22.420+01:00
draft = false
description = "Complete Java Collections.shuffle tutorial with examples. Learn how to randomize lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.shuffle Method

Last modified: April 20, 2025

 

The Collections.shuffle method is part of Java's Collections
Framework. It randomly permutes the specified list using a default or specified
source of randomness. This method is useful for randomization tasks in Java.

Shuffling is commonly needed in applications like games, simulations, and
statistical sampling. The method operates in linear time and modifies the
original list rather than returning a new shuffled list.

## Collections.shuffle Overview

The Collections.shuffle method has two overloaded versions. One
takes just a List, using a default random source. The other takes both a List
and a Random object for controlled randomness. Both versions shuffle in-place.

The method uses the Fisher-Yates shuffle algorithm internally. This algorithm
produces a uniformly random permutation of the list elements. The time
complexity is O(n) where n is the list size.

## Basic Shuffle Example

This example demonstrates the simplest use of Collections.shuffle.
We create a list of numbers and shuffle them. The output shows the list before
and after shuffling.

BasicShuffle.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BasicShuffle {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
        
        System.out.println("Original list: " + numbers);
        Collections.shuffle(numbers);
        System.out.println("Shuffled list: " + numbers);
    }
}

This code creates an immutable list of numbers using Arrays.asList.
We print the original order, then call Collections.shuffle to
randomize the list. Finally, we print the shuffled result.

Each run produces different output because the shuffle is random. The original
list remains unchanged if you need to preserve it, create a copy first.

## Shuffling with Custom Random Source

This example demonstrates how to use a specific Random object with
Collections.shuffle. By utilizing a seeded Random
instance, you can achieve reproducible shuffles, which are especially useful for
testing, debugging, or scenarios where consistent random behavior is required.

SeededShuffle.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class SeededShuffle {

    public static void main(String[] args) {

        List&lt;String&gt; originalColors = Arrays.asList("Red", "Green", "Blue", "Yellow");
        Random random = new Random(42); // Fixed seed for reproducibility

        System.out.println("Original: " + originalColors);

        // First shuffle with original list
        List&lt;String&gt; colors = Arrays.asList("Red", "Green", "Blue", "Yellow");
        Collections.shuffle(colors, random);
        System.out.println("First shuffle: " + colors);

        // Reset to original list and reseed for deterministic shuffle
        colors = Arrays.asList("Red", "Green", "Blue", "Yellow");
        random.setSeed(42);
        Collections.shuffle(colors, random);
        System.out.println("Second shuffle: " + colors);
    }
}

In this example, we initialize a list of colors and use a
Random object with a fixed seed (42). After performing the first
shuffle, the list order is reset to its original state. By resetting the seed of
the Random instance and reshuffling, we ensure the results of both
shuffles are identical.

This approach highlights the practical application of seeded randomness for
predictable outcomes. It is valuable for use cases like unit testing, where
consistent results across executions are critical, or for debugging
random-dependent operations. Note that resetting the list to its original state
before each shuffle is essential for obtaining identical results.

## Shuffling a List of Custom Objects

Collections.shuffle works with any List implementation containing
any object type. This example demonstrates shuffling a list of custom Person
objects.

ShuffleCustomObjects.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

record Person(String name, int age) {}

public class ShuffleCustomObjects {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Charlie", 22));
        people.add(new Person("Diana", 28));

        System.out.println("Original order:");
        people.forEach(System.out::println);

        Collections.shuffle(people);

        System.out.println("\nShuffled order:");
        people.forEach(System.out::println);
    }
}

We define a simple Person record with name and age fields. After creating and
populating a list of Person objects, we shuffle it using
Collections.shuffle. The output shows the random reordering.

This demonstrates that shuffle works with any object type, not just primitive
wrappers or Strings. The Person objects maintain their integrity while their
order in the list changes.

## Shuffling Part of a List

To shuffle only a portion of a list, we can use List.subList to
create a view of the desired range. This example shows how to shuffle just the
first half of a list.

PartialShuffle.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PartialShuffle {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        for (int i = 1; i &lt;= 10; i++) {
            numbers.add(i);
        }
        
        System.out.println("Original list: " + numbers);
        
        // Shuffle first half
        int halfSize = numbers.size() / 2;
        Collections.shuffle(numbers.subList(0, halfSize));
        
        System.out.println("Half-shuffled: " + numbers);
    }
}

We create a list of numbers 1 through 10. Using subList(0, halfSize),
we create a view of the first half of the list. Shuffling this sublist affects
only those elements in the original list.

The output shows the first five numbers randomized while the last five remain
in their original order. This technique is useful when you need to randomize
only a specific section of a list.

## Shuffling Arrays via List Conversion

While Collections.shuffle works on Lists, we can shuffle arrays by
first converting them to a List. This example demonstrates the technique using
Arrays.asList.

ShuffleArray.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ShuffleArray {

    public static void main(String[] args) {
        
        Integer[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        // Convert to List and shuffle
        List&lt;Integer&gt; list = Arrays.asList(numbers);
        Collections.shuffle(list);
        
        System.out.println("Shuffled array: " + Arrays.toString(numbers));
    }
}

We create an Integer array (note: this won't work with primitive int arrays).
Arrays.asList creates a List view of the array. Shuffling this
list shuffles the underlying array.

The output shows the array elements in their new random order. Remember that
Arrays.asList returns a fixed-size list backed by the array, so
structural modifications aren't allowed.

## Performance Considerations

This example compares the performance of shuffling different list
implementations. ArrayList and LinkedList have different shuffle performance
characteristics due to their internal structures.

ShufflePerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

public class ShufflePerformance {

    static final int SIZE = 100000;
    
    public static void main(String[] args) {
        
        // Create lists
        List&lt;Integer&gt; arrayList = new ArrayList&lt;&gt;(SIZE);
        List&lt;Integer&gt; linkedList = new LinkedList&lt;&gt;();
        
        Random random = new Random();
        for (int i = 0; i &lt; SIZE; i++) {
            int num = random.nextInt();
            arrayList.add(num);
            linkedList.add(num);
        }
        
        // Time ArrayList shuffle
        long start = System.currentTimeMillis();
        Collections.shuffle(arrayList);
        long duration = System.currentTimeMillis() - start;
        System.out.println("ArrayList shuffle time: " + duration + "ms");
        
        // Time LinkedList shuffle
        start = System.currentTimeMillis();
        Collections.shuffle(linkedList);
        duration = System.currentTimeMillis() - start;
        System.out.println("LinkedList shuffle time: " + duration + "ms");
    }
}

We populate an ArrayList and LinkedList with the same random numbers. We then
time how long Collections.shuffle takes for each implementation.
ArrayList is generally faster due to better memory locality.

The output shows the time difference between shuffling the two list types. For
large lists, ArrayList can be significantly faster. Choose your list
implementation based on your application's needs.

## Thread-Safe Shuffling with Multiple Threads

This example demonstrates how synchronization ensures thread-safe operations
when multiple threads access or modify the same collection. We'll use multiple
threads to shuffle and read from the same list concurrently, highlighting the
need for synchronization.

Collections.synchronizedList is a utility method in Java that wraps
a given list with a thread-safe synchronized wrapper. This ensures that all
access to the list, such as additions, removals, or modifications, is
synchronized, preventing concurrent modification issues in multi-threaded
environments. However, for compound operations (e.g., iteration or conditional
updates), explicit synchronization on the returned list object is still
necessary to maintain thread safety.

ThreadSafeShuffleWithThreads.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ThreadSafeShuffleWithThreads {

    public static void main(String[] args) {

        // Initialize a list with sample data
        List&lt;String&gt; unsafeList = new ArrayList&lt;&gt;();
        Collections.addAll(unsafeList, "Task1", "Task2", "Task3", "Task4", "Task5");

        // Wrap the list to make it thread-safe
        List&lt;String&gt; safeList = Collections.synchronizedList(unsafeList);

        // Thread to shuffle the list
        Thread shuffleThread = new Thread(() -&gt; {
            synchronized (safeList) {
                Collections.shuffle(safeList);
                System.out.println("Shuffled safely: " + safeList);
            }
        });

        // Thread to read the list
        Thread readThread = new Thread(() -&gt; {
            synchronized (safeList) {
                System.out.println("Thread-safe read: " + safeList);
            }
        });

        // Start both threads
        shuffleThread.start();
        readThread.start();

        // Wait for threads to complete
        try {
            shuffleThread.join();
            readThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

In this example, two threads—one for shuffling and another for reading—access
the same list concurrently. Synchronization blocks ensure that only one thread
at a time can work with the list, preventing potential data corruption or
exceptions. The synchronized block locks the shared list during
operations to guarantee thread-safe access and modification.

This demonstrates how synchronization provides reliable handling of shared
resources, ensuring consistent and safe behavior even in multi-threaded
scenarios. Without synchronization, such operations might result in inconsistent
states or runtime errors.

## Source

[Java Collections.shuffle Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#shuffle-java.util.List-)

In this tutorial, we've explored the Collections.shuffle method in
depth. We've covered basic usage, custom randomness, performance considerations,
and thread safety. Shuffling is a fundamental operation for many applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).