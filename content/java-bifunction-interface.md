+++
title = "Java BiFunction Interface"
date = 2025-08-29T19:58:45.337+01:00
draft = false
description = "Complete Java BiFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BiFunction Interface

Last modified: April 16, 2025

 

The java.util.function.BiFunction interface represents a function
that accepts two arguments and produces a result. It is a functional interface
with a single abstract method apply. BiFunction is commonly used
for operations that combine two inputs into one output.

BiFunction is part of Java's functional programming utilities added
in Java 8. It enables behavior parameterization for two-argument operations.
The interface provides default methods for function composition.

## BiFunction Interface Overview

BiFunction interface contains one abstract method and one default
method. The key method apply performs the operation on two inputs.
The andThen method enables function composition.

@FunctionalInterface
public interface BiFunction&lt;T, U, R&gt; {
    R apply(T t, U u);
    
    default &lt;V&gt; BiFunction&lt;T, U, V&gt; andThen(Function&lt;? super R, ? extends V&gt; after);
}

The code above shows the structure of BiFunction interface. It uses
generics where T and U are input types and R is result type. The interface is
annotated with @FunctionalInterface to indicate its single abstract method nature.

## Basic BiFunction Usage

The simplest way to use BiFunction is with lambda expressions. We define how to
combine two inputs into one output. The example concatenates two strings.

Main.java
  

package com.zetcode;

import java.util.function.BiFunction;

public class Main {

    public static void main(String[] args) {

        // Define a BiFunction that concatenates two strings
        BiFunction&lt;String, String, String&gt; concat = (s1, s2) -&gt; s1 + s2;
        
        // Apply the BiFunction
        String result = concat.apply("Hello, ", "World!");
        System.out.println(result);
        
        // BiFunction with different types
        BiFunction&lt;String, Integer, String&gt; repeat = (s, n) -&gt; s.repeat(n);
        System.out.println(repeat.apply("Java ", 3));
    }
}

This example demonstrates basic BiFunction usage with lambda expressions. The
concat function combines two strings. The repeat function repeats a string n
times. We apply these functions with different arguments.

## BiFunction with Method References

Method references provide a concise way to implement BiFunction when existing
methods match the required signature. This example uses String's indexOf method.

Main.java
  

package com.zetcode;

import java.util.function.BiFunction;

public class Main {

    public static void main(String[] args) {

        // BiFunction using method reference
        BiFunction&lt;String, String, Integer&gt; findIndex = String::indexOf;
        
        // Apply the function
        int index = findIndex.apply("Hello World", "World");
        System.out.println("Index found: " + index);
        
        // Another method reference example
        BiFunction&lt;Double, Double, Double&gt; power = Math::pow;
        System.out.println("2^3 = " + power.apply(2.0, 3.0));
    }
}

This example shows BiFunction usage with method references. String::indexOf
matches the BiFunction signature. Math::pow demonstrates another common use
case. Method references make code more readable for existing methods.

## BiFunction Composition with andThen

The andThen method allows chaining a BiFunction with a Function.
The BiFunction's output becomes the Function's input. This enables complex
transformations.

Main.java
  

package com.zetcode;

import java.util.function.BiFunction;
import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // BiFunction to concatenate strings
        BiFunction&lt;String, String, String&gt; concat = (s1, s2) -&gt; s1 + s2;
        
        // Function to convert to uppercase
        Function&lt;String, String&gt; toUpper = String::toUpperCase;
        
        // Compose the functions
        BiFunction&lt;String, String, String&gt; concatAndUpper = concat.andThen(toUpper);
        
        String result = concatAndUpper.apply("hello", " world");
        System.out.println("Result: " + result);
    }
}

This example shows BiFunction composition with andThen. The input
strings are first concatenated, then converted to uppercase. The order of
operations is left-to-right in the chain.

s

## BiFunction in Stream Operations

BiFunction can be used with Streams for operations that combine elements.
The reduce operation often uses BiFunction to accumulate results.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // BiFunction for sum
        BiFunction&lt;Integer, Integer, Integer&gt; sum = Integer::sum;
        
        // Use in reduce
        int total = numbers.stream()
            .reduce(0, sum::apply);
            
        System.out.println("Sum: " + total);
        
        // Another example with strings
        List&lt;String&gt; words = Arrays.asList("Hello", "World", "Java");
        BiFunction&lt;String, String, String&gt; joinWithSpace = (s1, s2) -&gt; s1 + " " + s2;
        
        String sentence = words.stream()
            .reduce("", joinWithSpace::apply);
            
        System.out.println("Sentence: " + sentence);
    }
}

This example demonstrates BiFunction usage in Stream operations. We use
Integer::sum as a BiFunction for reduction. The joinWithSpace function
combines strings with spaces. Stream operations become very expressive.

## BiFunction for Custom Objects

BiFunction works well with custom objects. This example combines Person objects
to create family relationships.

Main.java
  

package com.zetcode;

import java.util.function.BiFunction;

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

public class Main {

    public static void main(String[] args) {

        // BiFunction to create a family relationship string
        BiFunction&lt;Person, Person, String&gt; createFamily = 
            (p1, p2) -&gt; p1.name + " and " + p2.name + " are family members";
            
        Person john = new Person("John", 35);
        Person mary = new Person("Mary", 32);
        
        String family = createFamily.apply(john, mary);
        System.out.println(family);
        
        // Another example: calculate combined age
        BiFunction&lt;Person, Person, Integer&gt; combinedAge = 
            (p1, p2) -&gt; p1.age + p2.age;
            
        System.out.println("Combined age: " + combinedAge.apply(john, mary));
    }
}

This example shows BiFunction usage with custom Person objects. We create
functions that work with two Person instances. The first generates a family
relationship string. The second calculates combined age.

## BiFunction with Collections

BiFunction can be used with collection operations like Map's computeIfPresent.
This provides powerful ways to transform map entries based on both key and value.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BiFunction;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; wordCounts = new HashMap&lt;&gt;();
        wordCounts.put("apple", 3);
        wordCounts.put("banana", 2);
        wordCounts.put("cherry", 5);
        
        // BiFunction to increment count
        BiFunction&lt;String, Integer, Integer&gt; increment = 
            (key, value) -&gt; value + 1;
            
        // Apply to map entries
        wordCounts.computeIfPresent("apple", increment);
        wordCounts.computeIfPresent("banana", increment);
        
        System.out.println("Updated counts: " + wordCounts);
        
        // More complex transformation
        BiFunction&lt;String, Integer, String&gt; formatEntry = 
            (word, count) -&gt; word.toUpperCase() + ":" + count;
            
        wordCounts.forEach((k, v) -&gt; 
            System.out.println(formatEntry.apply(k, v)));
    }
}

This example demonstrates BiFunction usage with Map operations. We increment
word counts using computeIfPresent. Then we format entries using another
BiFunction. This shows how BiFunction enables flexible map transformations.

## Primitive Specializations of BiFunction

Java provides primitive specializations of BiFunction to avoid boxing overhead.
These include ToIntBiFunction, ToLongBiFunction, and ToDoubleBiFunction.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;
import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // ToIntBiFunction example
        ToIntBiFunction&lt;Integer, Integer&gt; sumInts = (a, b) -&gt; a + b;
        System.out.println("Sum: " + sumInts.applyAsInt(5, 3));
        
        // ToDoubleBiFunction example
        ToDoubleBiFunction&lt;Double, Double&gt; avg = (a, b) -&gt; (a + b) / 2;
        System.out.println("Average: " + avg.applyAsDouble(10.5, 15.5));
        
        // Using with custom objects
        ToIntBiFunction&lt;String, String&gt; totalLength = 
            (s1, s2) -&gt; s1.length() + s2.length();
        System.out.println("Total length: " + totalLength.applyAsInt("Hello", "World"));
    }
}

This example shows primitive specializations of BiFunction. ToIntBiFunction
returns an int, avoiding Integer boxing. ToDoubleBiFunction returns a double.
These are more efficient for primitive operations.

## Source

[Java BiFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/BiFunction.html)

In this article, we've covered the essential methods and features of the Java
BiFunction interface. Understanding these concepts is crucial for functional
programming with two-argument operations in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).