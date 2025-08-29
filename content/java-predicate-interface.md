+++
title = "Java Predicate Interface"
date = 2025-08-29T19:58:55.432+01:00
draft = false
description = "Complete Java Predicate interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Predicate Interface

Last modified: April 16, 2025

 

The java.util.function.Predicate interface represents a boolean-valued
function that tests a condition. It is a functional interface with a single
abstract method test. Predicate is commonly used for filtering
collections and streams.

Predicate was introduced in Java 8 and enhanced in JDK 9 with new
methods. It enables conditional logic in functional programming style. The
interface provides methods for logical operations and predicate composition.

## Predicate Interface Overview

Predicate interface contains one abstract method and several default
and static methods. The key method test evaluates the condition.
Other methods enable logical combinations of predicates.

@FunctionalInterface
public interface Predicate&lt;T&gt; {
    boolean test(T t);
    
    default Predicate&lt;T&gt; and(Predicate&lt;? super T&gt; other);
    default Predicate&lt;T&gt; or(Predicate&lt;? super T&gt; other);
    default Predicate&lt;T&gt; negate();
    static &lt;T&gt; Predicate&lt;T&gt; not(Predicate&lt;? super T&gt; target);
    static &lt;T&gt; Predicate&lt;T&gt; isEqual(Object targetRef);
}

The code above shows the structure of Predicate interface. It uses
generics where T is the input type. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic Predicate Usage

The simplest way to use Predicate is with lambda expressions. We define the
condition to test in the test method. The example checks if numbers are even.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // Define a predicate that tests if number is even
        Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;
        
        // Test the predicate
        System.out.println("Is 4 even? " + isEven.test(4));
        System.out.println("Is 7 even? " + isEven.test(7));
        
        // Predicate using method reference
        Predicate&lt;String&gt; isEmpty = String::isEmpty;
        System.out.println("Is empty? " + isEmpty.test(""));
    }
}

This example demonstrates basic Predicate usage with lambda and method reference.
The isEven predicate takes Integer and returns boolean. We test it with different
numbers. Method reference provides concise syntax for existing methods.

## Predicate Composition with and()

The and method combines two predicates with logical AND. The
resulting predicate tests true only when both original predicates test true.
This enables complex conditions from simple predicates.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // First predicate checks if number is positive
        Predicate&lt;Integer&gt; isPositive = n -&gt; n &gt; 0;
        
        // Second predicate checks if number is even
        Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;
        
        // Combine predicates with AND
        Predicate&lt;Integer&gt; isPositiveAndEven = isPositive.and(isEven);
        
        System.out.println("6 is positive and even? " + isPositiveAndEven.test(6));
        System.out.println("-2 is positive and even? " + isPositiveAndEven.test(-2));
        System.out.println("3 is positive and even? " + isPositiveAndEven.test(3));
    }
}

This example shows predicate composition with and. The combined
predicate tests for numbers that are both positive and even. Only 6 satisfies
both conditions in our test cases.

## Predicate Composition with or()

The or method combines two predicates with logical OR. The
resulting predicate tests true when either original predicate tests true.
This is useful for testing multiple possible conditions.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // First predicate checks if string starts with 'A'
        Predicate&lt;String&gt; startsWithA = s -&gt; s.startsWith("A");
        
        // Second predicate checks if string ends with 'e'
        Predicate&lt;String&gt; endsWithE = s -&gt; s.endsWith("e");
        
        // Combine predicates with OR
        Predicate&lt;String&gt; startsOrEnds = startsWithA.or(endsWithE);
        
        System.out.println("Apple: " + startsOrEnds.test("Apple"));
        System.out.println("Orange: " + startsOrEnds.test("Orange"));
        System.out.println("Banana: " + startsOrEnds.test("Banana"));
    }
}

This example demonstrates predicate composition with or. The
combined predicate tests for strings that start with 'A' or end with 'e'.
"Apple" satisfies both conditions, "Orange" satisfies the ending condition.

## Predicate Negation with negate()

The negate method returns a predicate that represents the logical
negation of the original predicate. This is equivalent to the logical NOT
operation.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // Predicate checks if number is greater than 10
        Predicate&lt;Integer&gt; greaterThan10 = n -&gt; n &gt; 10;
        
        // Create negated version
        Predicate&lt;Integer&gt; notGreaterThan10 = greaterThan10.negate();
        
        System.out.println("Is 15 &gt; 10? " + greaterThan10.test(15));
        System.out.println("Is 15 not &gt; 10? " + notGreaterThan10.test(15));
        System.out.println("Is 5 not &gt; 10? " + notGreaterThan10.test(5));
    }
}

This example shows predicate negation with negate. The negated
predicate returns the opposite boolean value of the original. 15 is greater than
10, so its negation returns false.

## JDK 9+ not() Static Method

JDK 9 introduced the static not method as an alternative to
negate. It creates a predicate that is the negation of the
supplied predicate. This is useful for method references.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;
import java.util.List;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; names = Arrays.asList("Alice", "Bob", "", "Charlie", "");
        
        // Filter non-empty strings using not()
        Predicate&lt;String&gt; nonEmpty = Predicate.not(String::isEmpty);
        
        long count = names.stream()
            .filter(nonEmpty)
            .count();
            
        System.out.println("Non-empty names: " + count);
    }
}

This example demonstrates JDK 9's not method. We create a predicate
that checks for non-empty strings by negating isEmpty. The stream filters out
empty strings using this predicate. The result counts non-empty names.

## Predicate Composition with isEqual()

The static isEqual method creates a predicate that tests if the
input equals a target object. It uses Objects.equals() for comparison, handling
null values safely.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;
import java.util.List;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        // Create predicate that tests for "admin"
        Predicate&lt;String&gt; isAdmin = Predicate.isEqual("admin");
        
        List&lt;String&gt; users = Arrays.asList("user1", "admin", "user2", "admin");
        
        long adminCount = users.stream()
            .filter(isAdmin)
            .count();
            
        System.out.println("Admin users: " + adminCount);
        
        // Works with null values
        Predicate&lt;String&gt; isNull = Predicate.isEqual(null);
        System.out.println("Is null? " + isNull.test(null));
    }
}

This example shows isEqual usage. We create a predicate to find
"admin" users in a list. The stream counts matching entries. The example also
demonstrates null-safe comparison.

## Complex Predicate Composition

Predicates can be combined in complex ways using multiple compositions. This
example shows combining and(), or(), and negate() to create sophisticated
conditions.

Main.java
  

package com.zetcode;

import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;
        Predicate&lt;Integer&gt; isPositive = n -&gt; n &gt; 0;
        Predicate&lt;Integer&gt; isMultipleOf3 = n -&gt; n % 3 == 0;
        
        // Complex predicate: (positive AND even) OR (multiple of 3)
        Predicate&lt;Integer&gt; complexPredicate = 
            isPositive.and(isEven).or(isMultipleOf3);
            
        System.out.println("4: " + complexPredicate.test(4));  // true (pos+even)
        System.out.println("-6: " + complexPredicate.test(-6)); // true (multiple of 3)
        System.out.println("5: " + complexPredicate.test(5));  // false
        System.out.println("9: " + complexPredicate.test(9));  // true (multiple of 3)
    }
}

This example creates a complex predicate combining multiple conditions. The
predicate tests true for numbers that are either (positive and even) or
(multiples of 3). This demonstrates powerful predicate composition.

## Source

[Java Predicate Interface Documentation](https://docs.oracle.com/javase/9/docs/api/java/util/function/Predicate.html)

In this article, we've covered the essential methods and features of the Java
Predicate interface, with focus on JDK 9+ enhancements. Understanding these
concepts is crucial for functional programming and stream processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).