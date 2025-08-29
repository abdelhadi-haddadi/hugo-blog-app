+++
title = "Java DoublePredicate Interface"
date = 2025-08-29T19:58:48.673+01:00
draft = false
description = "Complete Java DoublePredicate interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DoublePredicate Interface

Last modified: April 16, 2025

 

The java.util.function.DoublePredicate interface represents a
predicate (boolean-valued function) of one double-valued argument. It is a
functional interface with a single abstract method test.

DoublePredicate is part of Java's functional programming utilities
added in Java 8. It is specialized for double primitive type to avoid boxing
overhead. The interface provides default methods for logical operations.

## DoublePredicate Interface Overview

DoublePredicate contains one abstract method and three default
methods. The key method test evaluates the predicate on the given
argument. Other methods enable logical combinations of predicates.

@FunctionalInterface
public interface DoublePredicate {
    boolean test(double value);
    
    default DoublePredicate and(DoublePredicate other);
    default DoublePredicate negate();
    default DoublePredicate or(DoublePredicate other);
}

The code above shows the structure of DoublePredicate interface.
It operates on primitive double values. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic DoublePredicate Usage

The simplest way to use DoublePredicate is with lambda expressions. We define
the condition to test against double values. The example checks if numbers are
positive.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Define a predicate that tests if a number is positive
        DoublePredicate isPositive = n -&gt; n &gt; 0;
        
        // Test the predicate
        System.out.println("5.0 is positive: " + isPositive.test(5.0));
        System.out.println("-3.2 is positive: " + isPositive.test(-3.2));
        System.out.println("0.0 is positive: " + isPositive.test(0.0));
    }
}

This example demonstrates basic DoublePredicate usage with lambda expression.
The isPositive predicate tests if a number is greater than zero. We apply it
to different values to see the boolean results.

## Combining Predicates with AND

The and method allows combining two predicates with logical AND.
Both predicates must evaluate to true for the combined predicate to return true.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Define individual predicates
        DoublePredicate isPositive = n -&gt; n &gt; 0;
        DoublePredicate isWholeNumber = n -&gt; n == Math.floor(n);
        
        // Combine with AND
        DoublePredicate isPositiveWhole = isPositive.and(isWholeNumber);
        
        System.out.println("5.0 is positive whole: " + isPositiveWhole.test(5.0));
        System.out.println("3.14 is positive whole: " + isPositiveWhole.test(3.14));
        System.out.println("-2.0 is positive whole: " + isPositiveWhole.test(-2.0));
    }
}

This example shows predicate combination with and. The combined
predicate checks if a number is both positive and a whole number. Only numbers
that satisfy both conditions return true.

## Combining Predicates with OR

The or method combines two predicates with logical OR. Either
predicate evaluating to true makes the combined predicate return true.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Define individual predicates
        DoublePredicate isNegative = n -&gt; n &lt; 0;
        DoublePredicate isGreaterThan100 = n -&gt; n &gt; 100;
        
        // Combine with OR
        DoublePredicate isNegativeOrLarge = isNegative.or(isGreaterThan100);
        
        System.out.println("-5.0 matches: " + isNegativeOrLarge.test(-5.0));
        System.out.println("150.0 matches: " + isNegativeOrLarge.test(150.0));
        System.out.println("50.0 matches: " + isNegativeOrLarge.test(50.0));
    }
}

This example demonstrates predicate combination with or. The
combined predicate checks if a number is either negative or greater than 100.
Numbers satisfying either condition return true.

## Negating a Predicate

The negate method returns a predicate that represents the logical
negation of the original predicate. It inverts the boolean result.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Original predicate
        DoublePredicate isEven = n -&gt; n % 2 == 0;
        
        // Negated predicate
        DoublePredicate isOdd = isEven.negate();
        
        System.out.println("4.0 is odd: " + isOdd.test(4.0));
        System.out.println("7.0 is odd: " + isOdd.test(7.0));
        System.out.println("0.0 is odd: " + isOdd.test(0.0));
    }
}

This example shows predicate negation with negate. We create an
isEven predicate, then negate it to get isOdd. The negated predicate returns
true for odd numbers and false for even numbers.

## Using DoublePredicate with Streams

DoublePredicate is commonly used with DoubleStream for filtering operations.
The filter method accepts a DoublePredicate to include elements in the stream.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.stream.DoubleStream;

public class Main {

    public static void main(String[] args) {

        double[] values = {1.5, -2.3, 4.7, 0.0, 10.2, -5.6, 7.8};
        
        // Define predicate for filtering
        DoublePredicate inRange = n -&gt; n &gt;= 0 &amp;&amp; n &lt;= 10;
        
        // Filter stream using predicate
        double[] filtered = DoubleStream.of(values)
            .filter(inRange)
            .toArray();
            
        System.out.println("Original: " + Arrays.toString(values));
        System.out.println("Filtered: " + Arrays.toString(filtered));
    }
}

This example shows DoublePredicate usage with DoubleStream. We define a range
check predicate and use it to filter values. Only numbers between 0 and 10
(inclusive) pass through the filter.

## Chaining Multiple Predicates

DoublePredicate methods can be chained to create complex conditions. This
enables building sophisticated filters from simple predicates.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Define base predicates
        DoublePredicate isPositive = n -&gt; n &gt; 0;
        DoublePredicate hasFraction = n -&gt; n != Math.floor(n);
        DoublePredicate notTooLarge = n -&gt; n &lt; 100;
        
        // Chain predicates
        DoublePredicate complexCondition = isPositive
            .and(hasFraction)
            .and(notTooLarge);
        
        System.out.println("3.14 matches: " + complexCondition.test(3.14));
        System.out.println("5.0 matches: " + complexCondition.test(5.0));
        System.out.println("150.5 matches: " + complexCondition.test(150.5));
        System.out.println("-2.7 matches: " + complexCondition.test(-2.7));
    }
}

This example demonstrates predicate chaining. We combine three conditions:
positive, has fractional part, and not too large. The complex condition only
matches numbers that satisfy all three criteria.

## Practical Example: Data Validation

DoublePredicate is useful for data validation scenarios. We can create reusable
validation rules for double values in business logic.

Main.java
  

package com.zetcode;

import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Define validation predicates
        DoublePredicate isValidTemperature = t -&gt; t &gt;= -50 &amp;&amp; t &lt;= 50;
        DoublePredicate isValidPercentage = p -&gt; p &gt;= 0 &amp;&amp; p &lt;= 100;
        
        // Test values
        double[] temps = {25.5, -60.2, 45.0, 55.1};
        double[] percents = {75.3, -5.0, 100.0, 101.5};
        
        System.out.println("Temperature validation:");
        for (double t : temps) {
            System.out.printf("%.1f°C: %s%n", t, isValidTemperature.test(t));
        }
        
        System.out.println("\nPercentage validation:");
        for (double p : percents) {
            System.out.printf("%.1f%%: %s%n", p, isValidPercentage.test(p));
        }
    }
}

This practical example shows DoublePredicate for data validation. We define
rules for valid temperatures and percentages. The predicates are then used to
validate arrays of values, demonstrating real-world applicability.

## Source

[Java DoublePredicate Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/DoublePredicate.html)

In this article, we've covered the essential methods and features of the Java
DoublePredicate interface. Understanding these concepts is crucial for working
with primitive double values in functional programming contexts.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).