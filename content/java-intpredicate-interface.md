+++
title = "Java IntPredicate Interface"
date = 2025-08-29T19:58:50.859+01:00
draft = false
description = "Complete Java IntPredicate interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IntPredicate Interface

Last modified: April 16, 2025

 

The java.util.function.IntPredicate interface represents a predicate
that accepts an int-valued argument. It is a functional interface with a single
abstract method test. IntPredicate is commonly used for filtering
operations on streams of primitive integers.

IntPredicate is part of Java's functional programming utilities added
in Java 8. It enables behavior parameterization for primitive int values. The
interface provides default methods for predicate composition and chaining.

## IntPredicate Interface Overview

IntPredicate interface contains one abstract method and several default
methods. The key method test evaluates the predicate on the input.
Other methods enable logical operations between predicates.

@FunctionalInterface
public interface IntPredicate {
    boolean test(int value);
    
    default IntPredicate and(IntPredicate other);
    default IntPredicate or(IntPredicate other);
    default IntPredicate negate();
}

The code above shows the structure of IntPredicate interface. It
operates on primitive int values to avoid boxing overhead. The interface is
annotated with @FunctionalInterface to indicate its single abstract method nature.

## Basic IntPredicate Usage

The simplest way to use IntPredicate is with lambda expressions. We define the
condition to test on the input value. The example checks if numbers are even.

Main.java
  

package com.zetcode;

import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Define a predicate that tests if a number is even
        IntPredicate isEven = n -&gt; n % 2 == 0;
        
        // Test the predicate
        System.out.println("Is 4 even? " + isEven.test(4));
        System.out.println("Is 7 even? " + isEven.test(7));
        
        // Predicate for numbers greater than 10
        IntPredicate isGreaterThan10 = n -&gt; n &gt; 10;
        System.out.println("Is 15 &gt; 10? " + isGreaterThan10.test(15));
    }
}

This example demonstrates basic IntPredicate usage with lambda expressions.
The isEven predicate checks if a number is divisible by 2. We test it with
different values. The isGreaterThan10 shows another simple condition.

## Combining Predicates with AND

The and method allows combining two predicates with logical AND.
Both predicates must evaluate to true for the combined predicate to return true.

Main.java
  

package com.zetcode;

import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Define individual predicates
        IntPredicate isEven = n -&gt; n % 2 == 0;
        IntPredicate isGreaterThan10 = n -&gt; n &gt; 10;
        
        // Combine with AND
        IntPredicate isEvenAndGreaterThan10 = isEven.and(isGreaterThan10);
        
        System.out.println("12: " + isEvenAndGreaterThan10.test(12));
        System.out.println("8: " + isEvenAndGreaterThan10.test(8));
        System.out.println("15: " + isEvenAndGreaterThan10.test(15));
    }
}

This example shows predicate composition with and. The combined
predicate checks if a number is both even and greater than 10. Only 12 satisfies
both conditions in our test cases.

## Combining Predicates with OR

The or method combines two predicates with logical OR. Either
predicate can be true for the combined predicate to return true.

Main.java
  

package com.zetcode;

import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Define individual predicates
        IntPredicate isNegative = n -&gt; n &lt; 0;
        IntPredicate isDivisibleBy3 = n -&gt; n % 3 == 0;
        
        // Combine with OR
        IntPredicate isNegativeOrDivisibleBy3 = isNegative.or(isDivisibleBy3);
        
        System.out.println("-5: " + isNegativeOrDivisibleBy3.test(-5));
        System.out.println("9: " + isNegativeOrDivisibleBy3.test(9));
        System.out.println("7: " + isNegativeOrDivisibleBy3.test(7));
    }
}

This example demonstrates predicate composition with or. The combined
predicate checks if a number is either negative or divisible by 3. -5 and 9
satisfy at least one condition, while 7 satisfies neither.

## Negating a Predicate

The negate method returns a predicate that represents the logical
negation of the original predicate. It inverts the result of the test.

Main.java
  

package com.zetcode;

import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Original predicate
        IntPredicate isPrime = n -&gt; {
            if (n &lt; 2) return false;
            for (int i = 2; i &lt;= Math.sqrt(n); i++) {
                if (n % i == 0) return false;
            }
            return true;
        };
        
        // Negated predicate
        IntPredicate isNotPrime = isPrime.negate();
        
        System.out.println("Is 7 prime? " + isPrime.test(7));
        System.out.println("Is 8 not prime? " + isNotPrime.test(8));
    }
}

This example shows predicate negation with negate. The isPrime
predicate checks for prime numbers, while isNotPrime inverts this logic.
The results demonstrate the negation in action.

## Using IntPredicate with IntStream

IntPredicate is commonly used with IntStream for filtering operations. The
filter method accepts an IntPredicate to include only matching elements.
This enables efficient processing of primitive int streams.

Main.java
  

package com.zetcode;

import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {

        // Define a predicate for perfect squares
        IntPredicate isPerfectSquare = n -&gt; {
            int sqrt = (int) Math.sqrt(n);
            return sqrt * sqrt == n;
        };
        
        // Filter a range of numbers
        System.out.println("Perfect squares between 1 and 100:");
        IntStream.rangeClosed(1, 100)
            .filter(isPerfectSquare)
            .forEach(System.out::println);
    }
}

This example shows IntPredicate usage with IntStream. We define a predicate
to identify perfect squares, then use it to filter numbers from 1 to 100.
The stream pipeline prints only numbers that satisfy the condition.

## Chaining Multiple Predicates

IntPredicate methods can be chained to create complex conditions from simple
predicates. This approach improves code readability and maintainability.

Main.java
  

package com.zetcode;

import java.util.function.IntPredicate;

public class Main {

    public static void main(String[] args) {

        // Define base predicates
        IntPredicate isEven = n -&gt; n % 2 == 0;
        IntPredicate isPositive = n -&gt; n &gt; 0;
        IntPredicate isTwoDigits = n -&gt; n &gt;= 10 &amp;&amp; n &lt;= 99;
        
        // Chain predicates
        IntPredicate complexCondition = isPositive
            .and(isTwoDigits)
            .and(isEven.negate());
        
        System.out.println("15: " + complexCondition.test(15));
        System.out.println("22: " + complexCondition.test(22));
        System.out.println("105: " + complexCondition.test(105));
    }
}

This example demonstrates chaining multiple IntPredicate operations. The
complexCondition checks for positive, two-digit, odd numbers. Each test
case shows how different combinations of conditions evaluate.

## Method Reference as IntPredicate

Method references can be used to create IntPredicate instances when existing
methods match the functional interface requirements. This provides concise syntax.

Main.java
  

package com.zetcode;

import java.util.function.IntPredicate;

public class NumberUtils {
    
    public static boolean isPalindrome(int number) {
        String s = Integer.toString(number);
        return new StringBuilder(s).reverse().toString().equals(s);
    }
}

public class Main {

    public static void main(String[] args) {

        // Method reference as IntPredicate
        IntPredicate isPalindrome = NumberUtils::isPalindrome;
        
        System.out.println("1221: " + isPalindrome.test(1221));
        System.out.println("1234: " + isPalindrome.test(1234));
    }
}

This example shows using a method reference as an IntPredicate. The
NumberUtils.isPalindrome method checks if a number reads the same forwards
and backwards. We reference this method to create a predicate instance.

## Source

[Java IntPredicate Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/IntPredicate.html)

In this article, we've covered the essential methods and features of the Java
IntPredicate interface. Understanding these concepts is crucial for functional
programming and stream processing with primitive integers in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).