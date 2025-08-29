+++
title = "Java BiPredicate Interface"
date = 2025-08-29T19:58:46.468+01:00
draft = false
description = "Complete Java BiPredicate interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BiPredicate Interface

Last modified: April 16, 2025

 

The java.util.function.BiPredicate interface represents a predicate
that takes two arguments and returns a boolean result. It is a functional
interface with a single abstract method test. BiPredicate is used
for evaluating conditions against two input values.

BiPredicate was introduced in Java 8 as part of the functional
programming utilities. It enables testing conditions with two parameters in a
functional style. The interface provides default methods for logical operations
like AND, OR, and negation.

## BiPredicate Interface Overview

BiPredicate interface contains one abstract method and three default
methods. The key method test evaluates the condition. Other methods
enable predicate composition with logical operations.

@FunctionalInterface
public interface BiPredicate&lt;T, U&gt; {
    boolean test(T t, U u);
    
    default BiPredicate&lt;T, U&gt; and(BiPredicate&lt;? super T, ? super U&gt; other);
    default BiPredicate&lt;T, U&gt; or(BiPredicate&lt;? super T, ? super U&gt; other);
    default BiPredicate&lt;T, U&gt; negate();
}

The code above shows the structure of BiPredicate interface. It uses
generics where T and U are input types. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic BiPredicate Usage

The simplest way to use BiPredicate is with lambda expressions. We define the
condition to test against two inputs. The example checks if one string contains
another.

Main.java
  

package com.zetcode;

import java.util.function.BiPredicate;

public class Main {

    public static void main(String[] args) {

        // Define a BiPredicate that checks if first string contains second
        BiPredicate&lt;String, String&gt; containsChecker = 
            (str, substr) -&gt; str.contains(substr);
        
        // Test the predicate
        System.out.println("Contains check: " + containsChecker.test("hello world", "hello"));
        System.out.println("Contains check: " + containsChecker.test("java", "python"));
        
        // Using method reference
        BiPredicate&lt;String, String&gt; equalsChecker = String::equals;
        System.out.println("Equals check: " + equalsChecker.test("test", "test"));
    }
}

This example demonstrates basic BiPredicate usage with lambda and method reference.
The containsChecker takes two strings and returns boolean. We test different string
pairs. Method reference provides concise syntax for existing methods.

## Combining BiPredicates with AND

The and method allows combining two predicates with logical AND.
Both predicates must evaluate to true for the combined predicate to return true.

Main.java
  

package com.zetcode;

import java.util.function.BiPredicate;

public class Main {

    public static void main(String[] args) {

        // First predicate checks if first number is greater than second
        BiPredicate&lt;Integer, Integer&gt; greaterThan = (a, b) -&gt; a &gt; b;
        
        // Second predicate checks if difference is less than 10
        BiPredicate&lt;Integer, Integer&gt; diffLessThan10 = 
            (a, b) -&gt; Math.abs(a - b) &lt; 10;
        
        // Combine with AND
        BiPredicate&lt;Integer, Integer&gt; combined = greaterThan.and(diffLessThan10);
        
        System.out.println("5 &gt; 3 and diff &lt; 10: " + combined.test(5, 3));
        System.out.println("15 &gt; 3 and diff &lt; 10: " + combined.test(15, 3));
    }
}

This example shows predicate combination with and. The combined
predicate checks both conditions. First test passes (5&gt;3 and difference 2&lt;10).
Second test fails (15&gt;3 but difference 12 not &lt;10).

## Combining BiPredicates with OR

The or method combines two predicates with logical OR. Either
predicate evaluating to true makes the combined predicate return true.

Main.java
  

package com.zetcode;

import java.util.function.BiPredicate;

public class Main {

    public static void main(String[] args) {

        // Check if strings have same length
        BiPredicate&lt;String, String&gt; sameLength = 
            (s1, s2) -&gt; s1.length() == s2.length();
        
        // Check if strings start with same letter
        BiPredicate&lt;String, String&gt; sameFirstLetter = 
            (s1, s2) -&gt; s1.charAt(0) == s2.charAt(0);
        
        // Combine with OR
        BiPredicate&lt;String, String&gt; combined = sameLength.or(sameFirstLetter);
        
        System.out.println("'apple' and 'orange': " + combined.test("apple", "orange"));
        System.out.println("'banana' and 'berry': " + combined.test("banana", "berry"));
    }
}

This example demonstrates or combination. First test passes because
both strings start with 'a' (even though lengths differ). Second test passes
because lengths are equal (even though starting letters differ).

## Negating a BiPredicate

The negate method returns a predicate representing the logical
negation of the original predicate. It inverts the boolean result.

Main.java
  

package com.zetcode;

import java.util.function.BiPredicate;

public class Main {

    public static void main(String[] args) {

        // Check if number is divisible by another
        BiPredicate&lt;Integer, Integer&gt; isDivisible = 
            (num, divisor) -&gt; num % divisor == 0;
        
        // Create negated version
        BiPredicate&lt;Integer, Integer&gt; isNotDivisible = isDivisible.negate();
        
        System.out.println("10 divisible by 5: " + isDivisible.test(10, 5));
        System.out.println("10 not divisible by 3: " + isNotDivisible.test(10, 3));
    }
}

This example shows predicate negation. The original predicate checks divisibility.
The negated version returns true when numbers are not divisible. Negation is
useful for inverting conditions without rewriting them.

## Using BiPredicate with Collections

BiPredicate can be used with collections to implement complex filtering logic.
The example filters map entries based on both key and value conditions.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BiPredicate;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);
        scores.put("David", 65);
        
        // Filter names starting with A-C and scores &gt;= 80
        BiPredicate&lt;String, Integer&gt; filter = 
            (name, score) -&gt; name.charAt(0) &lt;= 'C' &amp;&amp; score &gt;= 80;
        
        System.out.println("Filtered entries:");
        scores.forEach((name, score) -&gt; {
            if (filter.test(name, score)) {
                System.out.println(name + ": " + score);
            }
        });
    }
}

This example demonstrates BiPredicate with collections. We filter map entries
where names start with A-C and scores are 80+. The predicate evaluates both
key and value conditions together. This approach is cleaner than separate filters.

## BiPredicate in Stream Filtering

BiPredicate can be adapted for stream filtering by converting it to a
Predicate. This is useful when stream elements contain multiple values to test.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.function.BiPredicate;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        record Person(String name, int age) {}
        
        List&lt;Person&gt; people = List.of(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 20),
            new Person("David", 35)
        );
        
        // BiPredicate to check name length and age
        BiPredicate&lt;String, Integer&gt; filter = 
            (name, age) -&gt; name.length() &gt; 3 &amp;&amp; age &gt;= 25;
        
        // Convert BiPredicate to Predicate for stream filter
        List&lt;Person&gt; filtered = people.stream()
            .filter(p -&gt; filter.test(p.name(), p.age()))
            .collect(Collectors.toList());
            
        System.out.println("Filtered people:");
        filtered.forEach(p -&gt; System.out.println(p.name() + " - " + p.age()));
    }
}

This example shows BiPredicate in stream operations. We filter Person objects
based on name length and age. The lambda adapts BiPredicate to Predicate for
use in filter. This maintains clean separation of filtering logic.

## Chaining Multiple BiPredicates

BiPredicates can be chained together for complex condition evaluation. This
example checks multiple conditions on product price and category.

Main.java
  

package com.zetcode;

import java.util.function.BiPredicate;

public class Main {

    public static void main(String[] args) {

        // Check if product is in electronics category
        BiPredicate&lt;String, Double&gt; isElectronics = 
            (category, price) -&gt; category.equals("Electronics");
        
        // Check if price is in premium range
        BiPredicate&lt;String, Double&gt; isPremiumPrice = 
            (category, price) -&gt; price &gt; 500;
        
        // Check if product is on sale
        BiPredicate&lt;String, Double&gt; isOnSale = 
            (category, price) -&gt; price &lt; 100;
        
        // Complex condition: (Electronics AND premium) OR on sale
        BiPredicate&lt;String, Double&gt; complexCondition = 
            isElectronics.and(isPremiumPrice).or(isOnSale);
        
        System.out.println("Laptop $600: " + complexCondition.test("Electronics", 600.0));
        System.out.println("Book $80: " + complexCondition.test("Books", 80.0));
        System.out.println("TV $400: " + complexCondition.test("Electronics", 400.0));
    }
}

This example demonstrates complex predicate chaining. The condition evaluates to
true for electronics priced over $500 OR any product under $100. Chaining
predicates creates readable complex conditions from simple components.

## Source

[Java BiPredicate Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/BiPredicate.html)

In this article, we've covered the essential methods and features of the Java
BiPredicate interface. Understanding these concepts is crucial for functional
programming with two-argument conditions in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).