+++
title = "Java ThreadLocalRandom Class"
date = 2025-08-29T20:00:45.601+01:00
draft = false
description = "Complete Java ThreadLocalRandom tutorial with examples. Learn how to generate random numbers in concurrent applications."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ThreadLocalRandom Class

Last modified: April 26, 2025

 

The ThreadLocalRandom class, part of Java's concurrency utilities,
generates pseudorandom numbers optimized for multi-threaded environments. It
provides efficient methods to produce random integers, doubles, and longs.

Random number generation is crucial in concurrent applications like games,
simulations, and load testing. ThreadLocalRandom avoids contention
by maintaining separate random number generators for each thread.

## ThreadLocalRandom Class Overview

Introduced in Java 7, ThreadLocalRandom is a high-performance
random number generator specifically designed for concurrent applications.
Unlike Random, which can create contention between threads due to
shared state, ThreadLocalRandom eliminates synchronization overhead
by providing each thread with its own isolated random number generator. This
significantly improves performance in multi-threaded environments.

Accessible through the static method ThreadLocalRandom.current,
this class provides various convenient methods, including
nextInt, nextDouble, nextLong, and
their overloaded versions that support specifying bounds. These methods are
inherently thread-safe, as each thread manages its own instance of
ThreadLocalRandom, ensuring efficiency and reliability under high
concurrency.

In addition to its concurrency advantages, ThreadLocalRandom
simplifies generating random values within specified ranges, making it a
preferred choice in modern multi-threaded applications. Its design aligns with
Java's emphasis on providing robust and efficient tools for parallel processing.

## Basic Random Number Generation

This example demonstrates basic usage of ThreadLocalRandom to
generate random integers, doubles, and longs in a concurrent-friendly manner.

BasicThreadLocalRandom.java
  

package com.zetcode;

import java.util.concurrent.ThreadLocalRandom;

public class BasicThreadLocalRandom {

    public static void main(String[] args) {
        
        ThreadLocalRandom random = ThreadLocalRandom.current();
        
        // Generate random integer
        int randInt = random.nextInt();
        System.out.println("Random integer: " + randInt);
        
        // Generate random integer between 0 and 100 (exclusive)
        int randIntRange = random.nextInt(100);
        System.out.println("Random integer (0-99): " + randIntRange);
        
        // Generate random double between 0.0 and 1.0
        double randDouble = random.nextDouble();
        System.out.println("Random double: " + randDouble);
        
        // Generate random long
        long randLong = random.nextLong();
        System.out.println("Random long: " + randLong);
    }
}

This program uses ThreadLocalRandom.current to obtain the
thread-specific random generator. It generates four random values, showcasing
the class's core methods.

Each run produces different results, as the generator is seeded uniquely per
thread. The values are uniformly distributed, ideal for concurrent applications.

## Random Numbers in a Custom Range

This example shows how to generate random numbers within a specific range using
ThreadLocalRandom, suitable for tasks requiring bounded values.

RandomRange.java
  

package com.zetcode;

import java.util.concurrent.ThreadLocalRandom;

public class RandomRange {

    public static void main(String[] args) {
        
        ThreadLocalRandom random = ThreadLocalRandom.current();
        int min = 10;
        int max = 20;
        
        // Generate random integer in range [min, max)
        int randInt = random.nextInt(min, max);
        System.out.println("Random int (" + min + "-" + (max-1) + "): " + randInt);
        
        // Generate random double in range [min, max)
        double randDouble = random.nextDouble(min, max);
        System.out.println("Random double (" + min + "-" + max + "): " + randDouble);
        
        // Generate random long in range [min, max)
        long randLong = random.nextLong(min, max);
        System.out.println("Random long (" + min + "-" + (max-1) + "): " + randLong);
    }
}

The program uses overloaded methods to generate numbers directly within the
specified range. The nextInt(min, max) method, for example,
produces integers from min to max-1.

This approach simplifies range generation compared to Random,
making it efficient for concurrent tasks like simulations or game mechanics.

## Concurrent Random Number Generation

This example illustrates ThreadLocalRandom in a multi-threaded
environment, highlighting its efficiency over Random in concurrent
settings.

ConcurrentRandom.java
  

package com.zetcode;

import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ConcurrentRandom {

    public static void main(String[] args) {

        try (ExecutorService executor = Executors.newFixedThreadPool(4)) {

            for (int i = 0; i &lt; 4; i++) {
                executor.submit(() -&gt; {
                    ThreadLocalRandom random = ThreadLocalRandom.current();
                    System.out.println(Thread.currentThread().getName() +
                            ": " + random.nextInt(100));
                });
            }

            executor.shutdown();
        }
    }
}

We create a thread pool and submit tasks that generate random numbers using
ThreadLocalRandom. Each thread uses its own generator, avoiding
contention.

This demonstrates the class's strength in concurrent environments, where
multiple threads can generate random numbers without synchronization overhead.

## Generating Random Streams

This example shows how to use ThreadLocalRandom with Java streams
to generate sequences of random numbers, ideal for functional programming.

RandomStreams.java
  

package com.zetcode;

import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

public class RandomStreams {

    public static void main(String[] args) {
        
        ThreadLocalRandom random = ThreadLocalRandom.current();
        
        // Generate stream of random integers
        System.out.println("Random integers (limit 5):");
        IntStream intStream = random.ints(5);
        intStream.forEach(System.out::println);
        
        // Generate stream of random integers in range
        System.out.println("\nRandom integers (50-100, limit 5):");
        IntStream rangeStream = random.ints(5, 50, 100);
        rangeStream.forEach(System.out::println);
        
        // Generate stream of random doubles
        System.out.println("\nRandom doubles (limit 5):");
        random.doubles(5).forEach(System.out::println);
    }
}

The program generates streams of random integers and doubles using
ints and doubles methods, with options for bounded
ranges and sizes.

Streams provide a functional approach to random number generation, making
ThreadLocalRandom versatile for modern Java applications in
concurrent settings.

## Random Selection from a List

This example demonstrates using ThreadLocalRandom to randomly
select elements from a list, useful in concurrent applications like games or
sampling.

RandomSelection.java
  

package com.zetcode;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class RandomSelection {

    public static void main(String[] args) {

        ThreadLocalRandom random = ThreadLocalRandom.current();
        List&lt;String&gt; items = List.of("Apple", "Banana", "Orange", "Grape", "Mango");

        // Select one random item
        int index = random.nextInt(items.size());
        String randomItem = items.get(index);
        System.out.println("Random item: " + randomItem);

        // Select multiple random items
        System.out.println("Three random items:");
        for (int i = 0; i &lt; 3; i++) {
            index = random.nextInt(items.size());
            System.out.println(items.get(index));
        }
    }
}

We use nextInt to generate a random index within the list's
size, then retrieve the corresponding element. The example includes multiple
selections with replacement.

This technique is efficient in concurrent environments, as
ThreadLocalRandom ensures thread-safe random number generation
without locks.

## Performance Comparison

This example compares the performance of Random and
ThreadLocalRandom in a multi-threaded environment. It highlights
the efficiency of ThreadLocalRandom, which is designed for
concurrent applications, over Random, which requires explicit
handling to maintain thread safety.

PerformanceComparison.java
  

package com.zetcode;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class PerformanceComparison {

    static final int COUNT = 1000000;

    public static void main(String[] args) {

        // Test Random
        try (ExecutorService executor = Executors.newFixedThreadPool(4)) {
            long start = System.currentTimeMillis();
            for (int i = 0; i &lt; 4; i++) {
                executor.submit(() -&gt; {
                    Random random = new Random();
                    for (int j = 0; j &lt; COUNT; j++) {
                        random.nextInt();
                    }
                });
            }
            executor.shutdown();
            if (!executor.awaitTermination(1, TimeUnit.MINUTES)) {
                System.err.println("Random tasks did not complete within the timeout.");
            }
            long duration = System.currentTimeMillis() - start;
            System.out.println("Random time: " + duration + "ms");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Execution was interrupted.");
        }

        // Test ThreadLocalRandom
        try (ExecutorService executor = Executors.newFixedThreadPool(4)) {
            long start = System.currentTimeMillis();
            for (int i = 0; i &lt; 4; i++) {
                executor.submit(() -&gt; {
                    ThreadLocalRandom random = ThreadLocalRandom.current();
                    for (int j = 0; j &lt; COUNT; j++) {
                        random.nextInt();
                    }
                });
            }
            executor.shutdown();
            if (!executor.awaitTermination(1, TimeUnit.MINUTES)) {
                System.err.println("ThreadLocalRandom tasks did not complete within the timeout.");
            }
            long duration = System.currentTimeMillis() - start;
            System.out.println("ThreadLocalRandom time: " + duration + "ms");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Execution was interrupted.");
        }
    }
}

In this example, we use a fixed thread pool to execute tasks that generate
random numbers using both Random and
ThreadLocalRandom. The tasks run concurrently across four threads,
each generating a million random numbers. 

The Random class, though sufficient for single-threaded
applications, may cause contention in multi-threaded environments as each thread
creates its own instance. On the other hand, ThreadLocalRandom is
designed specifically for concurrent applications, providing faster and more
efficient random number generation without synchronization overhead.

Additionally, the use of try-with-resources ensures proper cleanup
of the ExecutorService, while awaitTermination
verifies that all tasks finish within a given timeout, providing more robust
handling of thread pool execution.

## Generating Random Arrays

This example shows how to use ThreadLocalRandom to fill arrays
with random numbers, useful for concurrent testing or simulation tasks.

RandomArray.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

public class RandomArray {

    public static void main(String[] args) {
        
        ThreadLocalRandom random = ThreadLocalRandom.current();
        int size = 10;
        
        // Generate array of random integers
        int[] intArray = new int[size];
        for (int i = 0; i &lt; size; i++) {
            intArray[i] = random.nextInt(100);
        }
        System.out.println("Random integer array: " + Arrays.toString(intArray));
        
        // Generate array of random doubles
        double[] doubleArray = new double[size];
        for (int i = 0; i &lt; size; i++) {
            doubleArray[i] = random.nextDouble();
        }
        System.out.println("Random double array: " + Arrays.toString(doubleArray));
    }
}

The program creates arrays of random integers and doubles using
ThreadLocalRandom. Each element is generated efficiently,
suitable for concurrent environments.

Such arrays are valuable for testing algorithms or simulating data in
multi-threaded applications, with output formatted using
Arrays.toString.

## Source

[Java ThreadLocalRandom Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html)

This tutorial thoroughly explores the Java ThreadLocalRandom
class, covering basic usage, range generation, streams, and performance in
concurrent settings. It is essential for multi-threaded applications.

## Author

I am Jan Bodnar, a passionate programmer with extensive experience. Since 2007,
I have written over 1,400 articles and eight e-books. With over eight years of
teaching, I am dedicated to sharing knowledge and helping others learn
programming concepts.

List [all Java tutorials](/java/).