+++
title = "Java Random Class"
date = 2025-08-29T20:00:08.620+01:00
draft = false
description = "Complete Java Random class tutorial with examples. Learn how to generate random numbers in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Random Class

Last modified: April 20, 2025

 

The Random class, part of Java's utility package, generates
pseudorandom numbers. It offers methods to produce random integers, doubles,
booleans, and Gaussian-distributed values with ease.

 =&gt; 

Random number generation is vital for games, simulations, cryptography, and
testing. The Random class employs a 48-bit seed and a linear
congruential formula to create pseudorandom sequences.

## Random Class Overview

The Random class produces pseudorandom numbers using an algorithm
initiated by a seed value. Identical seeds yield identical number sequences,
aiding in consistent testing and debugging.

It includes methods like nextInt, nextDouble,
and nextBoolean for varied random values. These methods are
thread-safe, though heavy contention may impact performance.

## Basic Random Number Generation

This example illustrates the Random class's basic usage to create
random integers, doubles, and booleans in a straightforward program.

BasicRandom.java
  

package com.zetcode;

import java.util.Random;

public class BasicRandom {

    public static void main(String[] args) {
        
        Random random = new Random();
        
        // Generate random integer
        int randInt = random.nextInt();
        System.out.println("Random integer: " + randInt);
        
        // Generate random integer between 0 (inclusive) and 100 (exclusive)
        int randIntRange = random.nextInt(100);
        System.out.println("Random integer (0-99): " + randIntRange);
        
        // Generate random double between 0.0 and 1.0
        double randDouble = random.nextDouble();
        System.out.println("Random double: " + randDouble);
        
        // Generate random boolean
        boolean randBool = random.nextBoolean();
        System.out.println("Random boolean: " + randBool);
    }
}

This program instantiates a Random object to generate four random
values. The nextInt method, without arguments, produces any
integer, while with a bound, it yields values from 0 to that bound (exclusive).

Each execution yields unique results since the Random instance
uses the current time as its default seed. The values are uniformly distributed
across their respective ranges.

## Seeded Random Number Generation

This example shows how to use a fixed seed with the Random class.
A specific seed ensures consistent number sequences, ideal for testing and
debugging purposes.

SeededRandom.java
  

package com.zetcode;

import java.util.Random;

public class SeededRandom {

    public static void main(String[] args) {
        
        // Create two Random instances with the same seed
        Random random1 = new Random(42);
        Random random2 = new Random(42);
        
        System.out.println("First sequence from random1:");
        for (int i = 0; i &lt; 5; i++) {
            System.out.println(random1.nextInt(100));
        }
        
        System.out.println("\nSecond sequence from random2:");
        for (int i = 0; i &lt; 5; i++) {
            System.out.println(random2.nextInt(100));
        }
    }
}

Here, two Random instances are initialized with the same seed (42).
Both generate identical number sequences due to the shared seed value.

This predictability is essential for applications requiring repeatable results,
such as simulations or reproducible game states. Without a fixed seed, each run
produces distinct sequences.

## Generating Random Numbers in a Range

This example demonstrates generating random numbers within a custom range,
allowing for numbers between any minimum and maximum values, not just from zero.

RandomRange.java
  

package com.zetcode;

import java.util.Random;

public class RandomRange {

    public static void main(String[] args) {
        
        Random random = new Random();
        int min = 10;
        int max = 20;
        
        // Method 1: Using nextInt(bound) with adjustment
        int rand1 = random.nextInt(max - min + 1) + min;
        System.out.println("Random between " + min + " and " + max + ": " + rand1);
        
        // Method 2: Using doubles for more flexible ranges
        double rand2 = min + (max - min) * random.nextDouble();
        System.out.println("Random double in range: " + rand2);
    }
}

The first approach uses nextInt with a calculated bound to
generate integers in the inclusive range. The formula is
random.nextInt(max - min + 1) + min.

The second approach employs nextDouble to produce random doubles
within the range, offering greater precision for fractional values. Both methods
suit various use cases effectively.

## Generating Random Strings

This example illustrates using the Random class to create random
character strings. We implement a method to generate strings of specified
lengths from a defined character set.

RandomString.java
  

package com.zetcode;

import java.util.Random;

public class RandomString {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String generateRandomString(Random random, int length) {
        StringBuilder sb = new StringBuilder(length);
        
        for (int i = 0; i &lt; length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        
        return sb.toString();
    }

    public static void main(String[] args) {
        Random random = new Random();
        
        System.out.println("Random string (8 chars): " + generateRandomString(random, 8));
        System.out.println("Random string (12 chars): " + generateRandomString(random, 12));
        System.out.println("Random string (16 chars): " + generateRandomString(random, 16));
    }
}

We define a constant string of valid characters for the random strings. The
generateRandomString method builds a string by randomly selecting
characters from this set.

This approach is valuable for creating passwords, unique IDs, or test data. The
character set can be tailored to include only the characters required for
specific applications.

## Secure Random Numbers

For security-critical tasks, Java offers SecureRandom, a
cryptographically robust random number generator. This example shows its usage
compared to the standard Random class.

SecureRandomExample.java
  

package com.zetcode;

import java.security.SecureRandom;
import java.util.Random;

public class SecureRandomExample {

    public static void main(String[] args) {
        
        // Regular Random
        Random random = new Random();
        System.out.println("Regular Random int: " + random.nextInt());
        
        // SecureRandom
        SecureRandom secureRandom = new SecureRandom();
        System.out.println("SecureRandom int: " + secureRandom.nextInt());
        
        // Generating a secure random byte array
        byte[] randomBytes = new byte[16];
        secureRandom.nextBytes(randomBytes);
        System.out.print("SecureRandom bytes: ");
        for (byte b : randomBytes) {
            System.out.printf("%02x", b);
        }
        System.out.println();
    }
}

SecureRandom delivers cryptographically strong random numbers for
tasks like generating session keys or tokens. Though slower than
Random, it ensures superior randomness.

This example demonstrates generating integers and byte arrays. The byte array
is displayed in hexadecimal for clarity. Use SecureRandom for all
cryptographic operations.

## Random with Streams

Java 8's streams integrate seamlessly with the Random class. This
example shows how to generate streams of random numbers with diverse
characteristics.

RandomStreams.java
  

package com.zetcode;

import java.util.Random;
import java.util.stream.IntStream;
import java.util.stream.DoubleStream;

public class RandomStreams {

    public static void main(String[] args) {
        
        Random random = new Random();
        
        // Generate stream of random integers
        System.out.println("Random integers (limit 5):");
        IntStream intStream = random.ints(5);
        intStream.forEach(System.out::println);
        
        // Generate stream of random integers in range
        System.out.println("\nRandom integers between 50-100 (limit 5):");
        IntStream rangeStream = random.ints(5, 50, 100);
        rangeStream.forEach(System.out::println);
        
        // Generate stream of random doubles
        System.out.println("\nRandom doubles (limit 5):");
        DoubleStream doubleStream = random.doubles(5);
        doubleStream.forEach(System.out::println);
        
        // Generate infinite stream and limit it
        System.out.println("\nRandom Gaussian values (limit 5):");
        random.doubles()
              .map(d -&gt; random.nextGaussian())
              .limit(5)
              .forEach(System.out::println);
    }
}

This example presents four methods to create random number streams. The
ints, doubles, and longs methods
produce streams of primitive values.

We show bounded streams with set sizes and unbounded streams limited
explicitly. The final case generates Gaussian-distributed values, showcasing
streams' functional approach to random numbers.

## Performance Considerations

This example compares Random and ThreadLocalRandom
performance in multi-threaded settings, where ThreadLocalRandom
excels in efficiency.

RandomPerformance.java
  

package com.zetcode;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class RandomPerformance {

    static final int COUNT = 10000000;

    public static void main(String[] args) {
        
        // Test Random
        long start = System.currentTimeMillis();
        Random random = new Random();
        for (int i = 0; i &lt; COUNT; i++) {
            random.nextInt();
        }
        long duration = System.currentTimeMillis() - start;
        System.out.println("Random time: " + duration + "ms");
        
        // Test ThreadLocalRandom
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; COUNT; i++) {
            ThreadLocalRandom.current().nextInt();
        }
        duration = System.currentTimeMillis() - start;
        System.out.println("ThreadLocalRandom time: " + duration + "ms");
    }
}

ThreadLocalRandom optimizes random number generation in
multi-threaded environments by maintaining separate generators per thread,
avoiding contention.

The output highlights performance differences. For concurrent applications,
ThreadLocalRandom is preferable, though in single-threaded cases,
the difference is minimal.

## Generating Random Arrays

This example demonstrates using the Random class to create arrays
filled with random numbers, useful for simulations or testing scenarios.

RandomArray.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class RandomArray {

    public static void main(String[] args) {
        
        Random random = new Random();
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

This program creates two arrays: one with random integers and another with
random doubles. Each element is generated using the Random class.

Such arrays are useful for testing algorithms or simulating data sets. The
Arrays.toString method formats the output for easy reading.

## Random Selection from a List

This example shows how to use the Random class to randomly select
elements from a list, a common task in games or sampling applications.

RandomSelection.java
  

package com.zetcode;

import java.util.List;
import java.util.Random;

public class RandomSelection {

    public static void main(String[] args) {

        Random random = new Random();
        List&lt;String&gt; items = List.of("Apple", "Banana", 
            "Orange", "Grape", "Mango");

        // Select one random item
        int index = random.nextInt(items.size());
        String randomItem = items.get(index);
        System.out.println("Random item: " + randomItem);

        // Select multiple random items (with replacement)
        System.out.println("Three random items:");
        for (int i = 0; i &lt; 3; i++) {
            index = random.nextInt(items.size());
            System.out.println(items.get(index));
        }
    }
}

We use nextInt to generate a random index within the list's
bounds, then retrieve the element at that index for single or multiple
selections.

This technique suits scenarios like random item selection in games or sampling
data. The example includes selection with replacement, allowing repeated items.

## Generating Random Gaussian Values

This example explores the Random class's ability to generate
Gaussian (normally distributed) random numbers, useful in statistical
simulations.

RandomGaussian.java
  

package com.zetcode;

import java.util.Random;

public class RandomGaussian {

    public static void main(String[] args) {
        
        Random random = new Random();
        
        // Generate 5 Gaussian random numbers
        System.out.println("Gaussian random values (mean 0, std dev 1):");
        for (int i = 0; i &lt; 5; i++) {
            double gaussian = random.nextGaussian();
            System.out.printf("%.4f%n", gaussian);
        }
        
        // Scale Gaussian values to custom mean and standard deviation
        double mean = 100;
        double stdDev = 15;
        System.out.println("\nScaled Gaussian values (mean 100, std dev 15):");
        for (int i = 0; i &lt; 5; i++) {
            double scaled = mean + random.nextGaussian() * stdDev;
            System.out.printf("%.4f%n", scaled);
        }
    }
}

The nextGaussian method generates numbers with a mean of 0 and
standard deviation of 1. We also show scaling to custom mean and deviation.

This is ideal for modeling natural phenomena or statistical data. The scaled
values demonstrate how to adapt Gaussian numbers to specific requirements.

## Source

[Java Random Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Random.html)

This tutorial thoroughly explores the Java Random class, covering
basic usage, seeded generation, range creation, secure options, and
performance. Random number generation is crucial for many applications.

## Author

I am Jan Bodnar, a passionate programmer with extensive experience. Since 2007,
I have written over 1,400 articles and eight e-books. With over eight years of
teaching, I am dedicated to sharing knowledge and helping others learn
programming concepts.

List [all Java tutorials](/java/).