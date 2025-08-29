+++
title = "Java LongPredicate Interface"
date = 2025-08-29T19:58:53.206+01:00
draft = false
description = "Complete Java LongPredicate interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LongPredicate Interface

Last modified: April 16, 2025

 

The java.util.function.LongPredicate interface represents a
predicate (boolean-valued function) of one long-valued argument. It is a
functional interface with a single abstract method test.

LongPredicate is part of Java's functional programming utilities
added in Java 8. It is specialized for long primitives to avoid boxing
overhead. The interface provides default methods for predicate composition.

## LongPredicate Interface Overview

LongPredicate contains one abstract method and several default
methods. The key method test evaluates the predicate on the
given long value. Other methods enable logical operations between predicates.

@FunctionalInterface
public interface LongPredicate {
    boolean test(long value);
    
    default LongPredicate and(LongPredicate other);
    default LongPredicate or(LongPredicate other);
    default LongPredicate negate();
}

The code above shows the structure of LongPredicate interface.
It is annotated with @FunctionalInterface to indicate its single abstract
method nature. The default methods support logical operations between predicates.

## Basic LongPredicate Usage

The simplest way to use LongPredicate is with lambda expressions. We define
the condition to test against long values. The example checks if numbers
are even.

Main.java
  

package com.zetcode;

import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        // Check if number is even
        LongPredicate isEven = n -&gt; n % 2 == 0;
        
        System.out.println("Is 10 even? " + isEven.test(10));
        System.out.println("Is 15 even? " + isEven.test(15));
        
        // Check if number is positive
        LongPredicate isPositive = n -&gt; n &gt; 0;
        System.out.println("Is -5 positive? " + isPositive.test(-5));
    }
}

This example demonstrates basic LongPredicate usage with lambda expressions.
We create two predicates: one checks for even numbers, another for positive
numbers. The test method evaluates each predicate with different values.

## Combining Predicates with AND

The and method allows combining two predicates with logical AND.
Both predicates must return true for the combined predicate to return true.
This enables creating complex conditions from simple ones.

Main.java
  

package com.zetcode;

import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        LongPredicate isEven = n -&gt; n % 2 == 0;
        LongPredicate isGreaterThanTen = n -&gt; n &gt; 10;
        
        // Combine predicates with AND
        LongPredicate isEvenAndGreaterThanTen = isEven.and(isGreaterThanTen);
        
        System.out.println("12: " + isEvenAndGreaterThanTen.test(12));
        System.out.println("8: " + isEvenAndGreaterThanTen.test(8));
        System.out.println("15: " + isEvenAndGreaterThanTen.test(15));
    }
}

This example shows predicate combination with and. We check if
numbers are both even and greater than 10. The combined predicate only
returns true when both conditions are satisfied.

## Combining Predicates with OR

The or method combines two predicates with logical OR. Either
predicate can return true for the combined predicate to return true. This
is useful for checking multiple possible conditions.

Main.java
  

package com.zetcode;

import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        LongPredicate isNegative = n -&gt; n &lt; 0;
        LongPredicate isGreaterThanHundred = n -&gt; n &gt; 100;
        
        // Combine predicates with OR
        LongPredicate isOutOfRange = isNegative.or(isGreaterThanHundred);
        
        System.out.println("-5: " + isOutOfRange.test(-5));
        System.out.println("50: " + isOutOfRange.test(50));
        System.out.println("150: " + isOutOfRange.test(150));
    }
}

This example demonstrates predicate combination with or. We
check if numbers are either negative or greater than 100. The combined
predicate returns true if either condition is met.

## Negating a Predicate

The negate method returns a predicate that represents the
logical negation of the original predicate. This is equivalent to applying
the logical NOT operator to the predicate's result.

Main.java
  

package com.zetcode;

import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        LongPredicate isPrime = n -&gt; {
            if (n &lt; 2) return false;
            for (long i = 2; i &lt;= Math.sqrt(n); i++) {
                if (n % i == 0) return false;
            }
            return true;
        };
        
        // Create negation of isPrime
        LongPredicate isNotPrime = isPrime.negate();
        
        System.out.println("7 is prime? " + isPrime.test(7));
        System.out.println("8 is not prime? " + isNotPrime.test(8));
    }
}

This example shows predicate negation with negate. We create
a prime number checker, then negate it to check for non-prime numbers.
The negated predicate returns the opposite of the original predicate.

## Using LongPredicate with Streams

LongPredicate is commonly used with LongStream for filtering operations.
The filter method accepts a LongPredicate to include elements that match
the condition. This enables efficient processing of long values.

Main.java
  

package com.zetcode;

import java.util.stream.LongStream;

public class Main {

    public static void main(String[] args) {

        // Define a range of numbers
        LongStream numbers = LongStream.rangeClosed(1, 20);
        
        // Filter for numbers divisible by 3 or 5
        LongPredicate divisibleBy3or5 = n -&gt; n % 3 == 0 || n % 5 == 0;
        
        System.out.println("Numbers divisible by 3 or 5:");
        numbers.filter(divisibleBy3or5)
               .forEach(System.out::println);
    }
}

This example demonstrates LongPredicate usage with LongStream. We create
a predicate to check divisibility by 3 or 5, then use it to filter a
range of numbers. The filtered stream only contains matching values.

## Chaining Multiple Predicates

LongPredicate's default methods can be chained to create complex conditions.
This allows building sophisticated predicates from simple components while
maintaining readability.

Main.java
  

package com.zetcode;

import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        LongPredicate isEven = n -&gt; n % 2 == 0;
        LongPredicate isPositive = n -&gt; n &gt; 0;
        LongPredicate isTwoDigits = n -&gt; n &gt;= 10 &amp;&amp; n &lt;= 99;
        
        // Chain multiple predicates
        LongPredicate complexCondition = isPositive.and(isTwoDigits).and(isEven.negate());
        
        System.out.println("25: " + complexCondition.test(25));
        System.out.println("-5: " + complexCondition.test(-5));
        System.out.println("12: " + complexCondition.test(12));
        System.out.println("99: " + complexCondition.test(99));
    }
}

This example shows chaining multiple predicates. We check for positive,
two-digit, odd numbers. The complex condition is built by combining
simpler predicates with and and negate operations.

## Practical Example: Number Validator

Let's create a practical number validator using LongPredicate. We'll
combine several validation rules to check if numbers meet specific
business requirements.

Main.java
  

package com.zetcode;

import java.util.function.LongPredicate;

public class Main {

    public static void main(String[] args) {

        // Define validation rules
        LongPredicate isInAllowedRange = n -&gt; n &gt;= 1000 &amp;&amp; n &lt;= 9999;
        LongPredicate isNotForbiddenNumber = n -&gt; n != 1234 &amp;&amp; n != 4321;
        LongPredicate hasValidChecksum = n -&gt; (n % 10 + n / 10 % 10) % 2 == 0;
        
        // Combine all rules
        LongPredicate isValidNumber = isInAllowedRange
            .and(isNotForbiddenNumber)
            .and(hasValidChecksum);
        
        long[] testNumbers = {1234, 5678, 9999, 4321, 2468, 1001};
        
        for (long num : testNumbers) {
            System.out.printf("%d is valid: %b%n", num, isValidNumber.test(num));
        }
    }
}

This practical example creates a number validator with multiple rules.
Numbers must be 4-digit, not forbidden, and pass a checksum test. The
combined predicate efficiently checks all conditions in one operation.

## Source

[Java LongPredicate Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/LongPredicate.html)

In this article, we've covered the essential methods and features of the Java
LongPredicate interface. Understanding these concepts is crucial for functional
programming and stream processing with primitive longs in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).