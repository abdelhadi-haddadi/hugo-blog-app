+++
title = "Java Function.identity Method"
date = 2025-08-29T19:58:59.829+01:00
draft = false
description = "Complete Java Function.identity tutorial with examples. Learn how to use identity function in Java streams and functional programming."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Function.identity Method

Last modified: April 16, 2025

 

The Function.identity method is a static utility in Java's
java.util.function.Function interface. It returns a function that
always returns its input argument unchanged. This is useful in functional
programming scenarios where a function is required but no transformation
is needed.

Identity functions are particularly valuable when working with Java streams
and collectors. They serve as placeholders when an operation requires a
function parameter but you want to preserve the original values. The method
was introduced in Java 8 as part of the functional programming enhancements.

## Function.identity Basics

The identity method is defined as a static method in the
Function interface. It returns a function that implements the
identity operation - output equals input. The method signature is simple
and straightforward.

static &lt;T&gt; Function&lt;T, T&gt; identity() {
    return t -&gt; t;
}

The implementation simply returns a lambda expression that takes an input
and returns it unchanged. The generic type parameter ensures type safety
while maintaining flexibility. This makes it usable in various contexts.

## Simple Identity Function Example

This basic example demonstrates how to create and use an identity function.
We'll show both the direct usage and how it compares to a custom lambda
that does the same thing.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Create identity function
        Function&lt;String, String&gt; identity = Function.identity();
        
        // Apply the function
        String input = "Hello, World!";
        String output = identity.apply(input);
        
        System.out.println("Input: " + input);
        System.out.println("Output: " + output);
        System.out.println("Same object? " + (input == output));
        
        // Equivalent lambda expression
        Function&lt;String, String&gt; customIdentity = s -&gt; s;
        System.out.println("Custom identity: " + customIdentity.apply("Test"));
    }
}

This example shows that the identity function returns exactly what it receives.
The output demonstrates that it's the same object reference. The custom lambda
version shows what identity essentially does under the hood.

## Identity in Stream Operations

A common use case for Function.identity is in stream operations,
particularly with collectors. When you need to use values as keys in a map
without transformation, identity is the perfect choice.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {

        // Create a stream of strings
        Stream&lt;String&gt; words = Stream.of("apple", "banana", "cherry");
        
        // Use identity in toMap collector
        Map&lt;String, Integer&gt; wordLengths = words.collect(
            Collectors.toMap(
                Function.identity(),  // Use the word itself as key
                String::length       // Use word length as value
            )
        );
        
        System.out.println("Word lengths: " + wordLengths);
        
        // Alternative without identity (more verbose)
        List&lt;String&gt; fruits = List.of("orange", "pear", "kiwi");
        Map&lt;String, Integer&gt; altMap = fruits.stream()
            .collect(Collectors.toMap(
                fruit -&gt; fruit,     // Equivalent to identity
                String::length
            ));
            
        System.out.println("Alternative map: " + altMap);
    }
}

This example demonstrates how Function.identity provides a
cleaner alternative to writing fruit -&gt; fruit in stream
collectors. It makes the code more readable and expresses the intent
more clearly.

## Identity in Grouping Operations

Another powerful use of Function.identity is with grouping
collectors. When you need to group elements by themselves, identity serves
as an elegant solution.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of("apple", "banana", "apple", 
                                   "orange", "banana", "apple");
        
        // Count word occurrences using identity
        Map&lt;String, Long&gt; wordCounts = words.stream()
            .collect(Collectors.groupingBy(
                Function.identity(),
                Collectors.counting()
            ));
            
        System.out.println("Word counts: " + wordCounts);
        
        // Group strings by their identity
        Map&lt;String, List&lt;String&gt;&gt; grouped = words.stream()
            .collect(Collectors.groupingBy(Function.identity()));
            
        System.out.println("Grouped words: " + grouped);
    }
}

Here we see Function.identity used to group elements by
themselves. The first collector counts occurrences of each word, while
the second groups identical strings together. Both demonstrate clean,
expressive code using the identity function.

## Identity with Function Composition

Function.identity can be useful in function composition
scenarios. It serves as a neutral element that doesn't affect the
composition chain.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Create some transformation functions
        Function&lt;String, String&gt; toUpper = String::toUpperCase;
        Function&lt;String, String&gt; addExclamation = s -&gt; s + "!";
        
        // Create identity function
        Function&lt;String, String&gt; identity = Function.identity();
        
        // Compose with identity (no effect)
        Function&lt;String, String&gt; composed1 = identity.andThen(toUpper);
        Function&lt;String, String&gt; composed2 = addExclamation.compose(identity);
        
        System.out.println("Composed1: " + composed1.apply("hello"));
        System.out.println("Composed2: " + composed2.apply("world"));
        
        // More complex composition
        Function&lt;String, String&gt; pipeline = identity
            .andThen(toUpper)
            .andThen(addExclamation)
            .andThen(identity);
            
        System.out.println("Pipeline result: " + pipeline.apply("java"));
    }
}

This example shows how Function.identity can be used in
function composition without affecting the result. It serves as a neutral
element in the composition chain, similar to how 0 is neutral in addition
or 1 in multiplication.

## Identity in Method References Context

Function.identity is often compared to method references.
While similar in some cases, they serve different purposes. This example
clarifies when to use each approach.

Main.java
  

package com.zetcode;

import java.util.function.Function;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {

        // Using identity in map operation
        Stream.of("one", "two", "three")
            .map(Function.identity())
            .forEach(System.out::println);
        
        // Equivalent using method reference
        Stream.of("uno", "dos", "tres")
            .map(s -&gt; s)
            .forEach(System.out::println);
            
        // When method reference differs
        class Wrapper {
            private final String value;
            
            Wrapper(String value) { this.value = value; }
            
            String getValue() { return value; }
        }
        
        // Correct: method reference to getter
        Stream.of(new Wrapper("a"), new Wrapper("b"))
            .map(Wrapper::getValue)
            .forEach(System.out::println);
            
        // Incorrect: identity would return Wrapper objects
        Stream.of(new Wrapper("x"), new Wrapper("y"))
            .map(Function.identity())
            .forEach(w -&gt; System.out.println(w.getValue()));
    }
}

This example demonstrates the difference between Function.identity
and method references. While they might seem similar, identity always returns
its input unchanged, whereas method references can transform objects by calling
methods on them.

## Identity in Advanced Stream Processing

For more complex stream processing scenarios, Function.identity
can help maintain clean code when combined with other stream operations.
Here's an advanced example.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        String[] colors = {"red", "green", "blue", "red", "green", "yellow"};
        
        // Advanced processing: count, filter, and map
        Map&lt;String, Long&gt; frequentColors = Arrays.stream(colors)
            .collect(Collectors.groupingBy(
                Function.identity(),
                Collectors.counting()
            ))
            .entrySet().stream()
            .filter(e -&gt; e.getValue() &gt; 1)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                e -&gt; e.getValue() * 10  // Transform count
            ));
            
        System.out.println("Processed colors: " + frequentColors);
        
        // Another example: processing with identity
        Map&lt;Boolean, Map&lt;String, Long&gt;&gt; partitioned = Arrays.stream(colors)
            .collect(Collectors.partitioningBy(
                s -&gt; s.length() &gt; 3,
                Collectors.groupingBy(
                    Function.identity(),
                    Collectors.counting()
                )
            ));
            
        System.out.println("Partitioned counts: " + partitioned);
    }
}

This advanced example shows Function.identity in complex
stream processing. It's used in grouping operations within a larger stream
pipeline. The identity function helps keep focus on the transformations
that matter while handling the grouping keys transparently.

## Source

[Java Function.identity Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html#identity--)

The Function.identity method is a simple yet powerful tool
in Java's functional programming toolkit. It promotes cleaner code when
working with streams and function composition. Understanding its proper use
can make your Java code more expressive and maintainable.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).