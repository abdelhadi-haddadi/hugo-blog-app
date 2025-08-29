+++
title = "Java SecureRandom Class"
date = 2025-08-29T20:00:29.032+01:00
draft = false
description = "Complete Java SecureRandom tutorial with examples. Learn how to generate cryptographically secure random numbers."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java SecureRandom Class

Last modified: April 26, 2025

 

The SecureRandom class, part of Java's security package, generates
cryptographically strong random numbers. It provides methods for secure random
integers, doubles, and byte arrays.

Secure random number generation is critical for cryptography, security tokens,
and sensitive applications. SecureRandom uses robust algorithms to
ensure unpredictable and high-quality randomness.

## SecureRandom Class Overview

SecureRandom extends Random but is designed for
security-critical tasks. It leverages system entropy or secure algorithms to
produce random values suitable for cryptographic use.

Key methods include nextInt, nextDouble, and
nextBytes. While slower than Random, it offers
superior randomness, essential for secure applications.

## Basic Secure Random Number Generation

This example demonstrates basic usage of SecureRandom to generate
random integers, doubles, and byte arrays for secure applications.

BasicSecureRandom.java
  

package com.zetcode;

import java.security.SecureRandom;

public class BasicSecureRandom {

    public static void main(String[] args) {
        
        SecureRandom secureRandom = new SecureRandom();
        
        // Generate random integer
        int randInt = secureRandom.nextInt();
        System.out.println("Secure random integer: " + randInt);
        
        // Generate random integer between 0 and 100 (exclusive)
        int randIntRange = secureRandom.nextInt(100);
        System.out.println("Secure random integer (0-99): " + randIntRange);
        
        // Generate random double
        double randDouble = secureRandom.nextDouble();
        System.out.println("Secure random double: " + randDouble);
        
        // Generate random byte array
        byte[] bytes = new byte[8];
        secureRandom.nextBytes(bytes);
        System.out.print("Secure random bytes: ");
        for (byte b : bytes) {
            System.out.printf("%02x", b);
        }
        System.out.println();
    }
}

This program creates a SecureRandom instance to generate various
random values. The byte array is displayed in hexadecimal for readability.

Each execution produces unpredictable results, leveraging system entropy for
cryptographic strength, making it ideal for security-sensitive tasks.

## Generating Secure Random Numbers in a Range

This example shows how to generate secure random numbers within a specific
range using SecureRandom, useful for secure token generation.

SecureRandomRange.java
  

package com.zetcode;

import java.security.SecureRandom;

public class SecureRandomRange {

    public static void main(String[] args) {
        
        SecureRandom secureRandom = new SecureRandom();
        int min = 10;
        int max = 20;
        
        // Generate secure random integer in range [min, max]
        int randInt = secureRandom.nextInt(max - min + 1) + min;
        System.out.println("Secure random int (" + min + "-" + max + "): " + randInt);
        
        // Generate secure random double in range [min, max)
        double randDouble = min + (max - min) * secureRandom.nextDouble();
        System.out.println("Secure random double (" + min + "-" + max + "): " + randDouble);
    }
}

The program uses nextInt and nextDouble to
generate numbers within a custom range, ensuring cryptographic security for the
output values.

This approach is suitable for applications like secure PIN generation or
randomized cryptographic parameters, where unpredictability is paramount.

## Generating Secure Random Strings

This example illustrates using SecureRandom to create random
strings, ideal for generating secure passwords or session identifiers.

SecureRandomString.java
  

package com.zetcode;

import java.security.SecureRandom;

public class SecureRandomString {

    private static final String CHARACTERS = 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String generateSecureString(SecureRandom random, int length) {
        StringBuilder sb = new StringBuilder(length);
        
        for (int i = 0; i &lt; length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        
        return sb.toString();
    }

    public static void main(String[] args) {
        SecureRandom secureRandom = new SecureRandom();
        
        System.out.println("Secure random string (8 chars): " + 
            generateSecureString(secureRandom, 8));
        System.out.println("Secure random string (16 chars): " + 
            generateSecureString(secureRandom, 16));
    }
}

We define a character set and use SecureRandom to select random
characters, building secure strings of specified lengths for sensitive use cases.

This method is perfect for creating secure tokens or passwords, ensuring high
randomness and resistance to prediction in security-critical applications.

## Using Specific Algorithms

This example demonstrates how to configure SecureRandom with
specific cryptographic algorithms for enhanced security in random number
generation.

SecureRandomAlgorithm.java
  

package com.zetcode;

import java.security.SecureRandom;
import java.security.NoSuchAlgorithmException;

public class SecureRandomAlgorithm {

    public static void main(String[] args) {
        
        try {
            // Use SHA1PRNG algorithm
            SecureRandom sha1prng = SecureRandom.getInstance("SHA1PRNG");
            System.out.println("SHA1PRNG random int: " + sha1prng.nextInt());
            
            // Use NativePRNG algorithm
            SecureRandom nativePrng = SecureRandom.getInstance("NativePRNG");
            System.out.println("NativePRNG random int: " + nativePrng.nextInt());
            
            // Generate secure bytes with NativePRNG
            byte[] bytes = new byte[8];
            nativePrng.nextBytes(bytes);
            System.out.print("NativePRNG bytes: ");
            for (byte b : bytes) {
                System.out.printf("%02x", b);
            }
            System.out.println();
            
        } catch (NoSuchAlgorithmException e) {
            System.err.println("Algorithm not available: " + e.getMessage());
        }
    }
}

We instantiate SecureRandom with specific algorithms like
SHA1PRNG or NativePRNG, allowing tailored randomness for specific security needs.

Choosing an algorithm depends on the application's requirements. This example
shows how to handle potential exceptions for unavailable algorithms.

## Seeding SecureRandom

This example shows how to seed SecureRandom manually, useful for
reproducible results in testing, though typically avoided in production for
security.

SecureRandomSeed.java
  

package com.zetcode;

import java.security.SecureRandom;

public class SecureRandomSeed {

    public static void main(String[] args) {
        
        SecureRandom secureRandom1 = new SecureRandom();
        SecureRandom secureRandom2 = new SecureRandom();
        
        // Set the same seed for both instances
        byte[] seed = new byte[]{1, 2, 3, 4};
        secureRandom1.setSeed(seed);
        secureRandom2.setSeed(seed);
        
        // Generate random integers
        System.out.println("First SecureRandom int: " + secureRandom1.nextInt());
        System.out.println("Second SecureRandom int: " + secureRandom2.nextInt());
    }
}

We set identical seeds for two SecureRandom instances, producing
consistent results. In practice, manual seeding is rare to maintain
unpredictability.

This is useful for debugging or testing cryptographic systems but should be
avoided in production to ensure maximum randomness and security.

## Generating Secure Random Keys

This example demonstrates using SecureRandom to generate
cryptographic keys, a common requirement in secure communication protocols.

SecureRandomKey.java
  

package com.zetcode;

import java.security.SecureRandom;
import java.util.Base64;

public class SecureRandomKey {

    public static void main(String[] args) {
        
        SecureRandom secureRandom = new SecureRandom();
        
        // Generate a 256-bit (32-byte) key
        byte[] key = new byte[32];
        secureRandom.nextBytes(key);
        
        // Encode to Base64 for readable output
        String base64Key = Base64.getEncoder().encodeToString(key);
        System.out.println("Secure 256-bit key (Base64): " + base64Key);
        
        // Generate a 128-bit (16-byte) key
        byte[] shortKey = new byte[16];
        secureRandom.nextBytes(shortKey);
        System.out.print("Secure 128-bit key (hex): ");
        for (byte b : shortKey) {
            System.out.printf("%02x", b);
        }
        System.out.println();
    }
}

The program generates secure byte arrays suitable for cryptographic keys, with
outputs in Base64 and hexadecimal formats for clarity and usability.

Such keys are essential for encryption algorithms like AES, ensuring secure
data transmission or storage in security-sensitive applications.

## Performance Considerations

This example compares SecureRandom and Random
performance, highlighting the trade-off between security and speed in random
number generation.

SecureRandomPerformance.java
  

package com.zetcode;

import java.security.SecureRandom;
import java.util.Random;

public class SecureRandomPerformance {

    static final int COUNT = 1000000;

    public static void main(String[] args) {
        
        // Test Random
        long start = System.currentTimeMillis();
        Random random = new Random();
        for (int i = 0; i &lt; COUNT; i++) {
            random.nextInt();
        }
        long duration = System.currentTimeMillis() - start;
        System.out.println("Random time: " + duration + "ms");
        
        // Test SecureRandom
        start = System.currentTimeMillis();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i &lt; COUNT; i++) {
            secureRandom.nextInt();
        }
        duration = System.currentTimeMillis() - start;
        System.out.println("SecureRandom time: " + duration + "ms");
    }
}

We measure the time taken to generate random integers using both classes.
SecureRandom is slower due to its cryptographic strength but
necessary for security.

Use SecureRandom only when cryptographic security is required, as
Random or ThreadLocalRandom are faster for
non-sensitive tasks.

## Source

[Java SecureRandom Documentation](https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html)

This tutorial thoroughly explores the Java SecureRandom class,
covering basic usage, range generation, secure strings, and cryptographic keys.
It is vital for secure applications.

## Author

I am Jan Bodnar, a passionate programmer with extensive experience. Since 2007,
I have written over 1,400 articles and eight e-books. With over eight years of
teaching, I am dedicated to sharing knowledge and helping others learn
programming concepts.

List [all Java tutorials](/java/).