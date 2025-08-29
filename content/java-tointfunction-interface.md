+++
title = "Java ToIntFunction Interface"
date = 2025-08-29T19:58:57.611+01:00
draft = false
description = "Complete Java ToIntFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ToIntFunction Interface

Last modified: April 16, 2025

 

The java.util.function.ToIntFunction interface represents a function
that accepts one argument and produces an int-valued result. It is a functional
interface with a single abstract method applyAsInt.

ToIntFunction is part of Java's functional programming utilities
added in Java 8. It is specialized to avoid boxing when working with primitive
ints. This improves performance in numeric operations.

## ToIntFunction Interface Overview

ToIntFunction interface contains one abstract method that must be
implemented. Unlike regular Function, it returns a primitive int instead of
an object. This avoids unnecessary object creation.

@FunctionalInterface
public interface ToIntFunction&lt;T&gt; {
    int applyAsInt(T value);
}

The code above shows the simple structure of ToIntFunction. It
uses generics for the input type T but always returns primitive int. The
interface is annotated with @FunctionalInterface.

## Basic ToIntFunction Usage

The simplest way to use ToIntFunction is with lambda expressions. We define
how to convert the input to an int value. The example converts strings to
their lengths.

Main.java
  

package com.zetcode;

import java.util.function.ToIntFunction;

public class Main {

    public static void main(String[] args) {

        // Define a function that takes String and returns its length as int
        ToIntFunction&lt;String&gt; lengthFunction = s -&gt; s.length();
        
        // Apply the function
        System.out.println("Length of 'hello': " + lengthFunction.applyAsInt("hello"));
        System.out.println("Length of 'functional': " + lengthFunction.applyAsInt("functional"));
        
        // Function using method reference
        ToIntFunction&lt;String&gt; lengthMethodRef = String::length;
        System.out.println("Length via method ref: " + lengthMethodRef.applyAsInt("method"));
    }
}

This example demonstrates basic ToIntFunction usage with lambda and method
reference. The lengthFunction takes String and returns primitive int. We
apply it to different strings. Method reference provides concise syntax.

## ToIntFunction with Custom Objects

ToIntFunction works well with custom objects. We can extract
numeric properties or compute values from object fields. This example uses
a Person class.

Main.java
  

package com.zetcode;

import java.util.function.ToIntFunction;

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public int getAge() { return age; }
    public String getName() { return name; }
}

public class Main {

    public static void main(String[] args) {

        // Function to get person's age
        ToIntFunction&lt;Person&gt; ageExtractor = Person::getAge;
        
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Bob", 32);
        
        System.out.println(p1.getName() + "'s age: " + ageExtractor.applyAsInt(p1));
        System.out.println(p2.getName() + "'s age: " + ageExtractor.applyAsInt(p2));
    }
}

This example shows ToIntFunction working with custom Person objects. We
create a function that extracts the age field. The method reference makes
the code clean and readable. No boxing occurs when returning the age.

## ToIntFunction in Stream Operations

ToIntFunction is commonly used with Java Streams for numeric
processing. The mapToInt operation accepts a ToIntFunction to transform
stream elements to primitive ints.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.ToIntFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; words = Arrays.asList("apple", "banana", "cherry", "date");
        
        // Function to get word lengths
        ToIntFunction&lt;String&gt; wordLength = String::length;
        
        // Calculate average length using stream
        double avgLength = words.stream()
            .mapToInt(wordLength)
            .average()
            .orElse(0);
            
        System.out.println("Average word length: " + avgLength);
    }
}

This example demonstrates ToIntFunction in Stream processing. We calculate
the average length of words in a list. Using mapToInt with ToIntFunction
is efficient as it works with primitive ints throughout the pipeline.

## ToIntFunction with Collections

We can use ToIntFunction to process collections in various ways.
This example shows summing values based on a transformation function.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.ToIntFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; numbers = Arrays.asList("1", "2", "3", "4", "5");
        
        // Function to parse strings to ints
        ToIntFunction&lt;String&gt; parser = Integer::parseInt;
        
        int sum = 0;
        for (String num : numbers) {
            sum += parser.applyAsInt(num);
        }
        
        System.out.println("Sum of numbers: " + sum);
    }
}

This example shows using ToIntFunction to parse and sum numbers from strings.
We avoid creating Integer objects by working directly with primitive ints.
The function is applied to each element in the collection.

## Combining ToIntFunction with Predicates

ToIntFunction can be combined with other functional interfaces
like Predicate for more complex operations. This example filters and then
processes data.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.ToIntFunction;

public class Main {

    public static void main(String[] args) {

        List&lt;String&gt; words = Arrays.asList("sky", "cup", "book", "water", "computer");
        
        // Predicate to filter long words
        Predicate&lt;String&gt; isLong = s -&gt; s.length() &gt; 3;
        
        // Function to get squared lengths
        ToIntFunction&lt;String&gt; squareLength = s -&gt; s.length() * s.length();
        
        words.stream()
            .filter(isLong)
            .mapToInt(squareLength)
            .forEach(System.out::println);
    }
}

This example combines ToIntFunction with Predicate in a stream pipeline.
We filter words longer than 3 characters, then calculate and print their
squared lengths. The operations are performed efficiently with primitives.

## ToIntFunction in Map Operations

We can use ToIntFunction to process Map entries. This example
shows calculating values based on map contents.

Main.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.function.ToIntFunction;

public class Main {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; inventory = new HashMap&lt;&gt;();
        inventory.put("Apples", 50);
        inventory.put("Oranges", 25);
        inventory.put("Bananas", 75);
        
        // Function to calculate restock amounts
        ToIntFunction&lt;Integer&gt; restockCalc = current -&gt; 100 - current;
        
        inventory.forEach((k, v) -&gt; {
            int restock = restockCalc.applyAsInt(v);
            System.out.printf("Need to add %d %s%n", restock, k);
        });
    }
}

This example demonstrates using ToIntFunction with Map entries. We calculate
how many items need to be added to reach 100 in stock. The function works
directly with the primitive int values from the map.

## Specialized Primitive Functions

Java provides several specialized functional interfaces similar to
ToIntFunction for different primitive types. These include
ToLongFunction and ToDoubleFunction.

Main.java
  

package com.zetcode;

import java.util.function.ToDoubleFunction;
import java.util.function.ToIntFunction;
import java.util.function.ToLongFunction;

public class Main {

    public static void main(String[] args) {

        // ToIntFunction example
        ToIntFunction&lt;String&gt; hexParser = s -&gt; Integer.parseInt(s, 16);
        System.out.println("Hex FF as int: " + hexParser.applyAsInt("FF"));
        
        // ToLongFunction example
        ToLongFunction&lt;String&gt; memoryParser = s -&gt; Long.parseLong(s) * 1024;
        System.out.println("KB to bytes: " + memoryParser.applyAsLong("2048"));
        
        // ToDoubleFunction example
        ToDoubleFunction&lt;String&gt; tempConverter = 
            s -&gt; (Double.parseDouble(s) * 9/5) + 32;
        System.out.println("Celsius to Fahrenheit: " + tempConverter.applyAsDouble("25"));
    }
}

This example shows various primitive-specialized functional interfaces.
Each avoids boxing for its specific primitive type. They work similarly to
ToIntFunction but with different return types.

## Source

[Java ToIntFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ToIntFunction.html)

In this article, we've covered the essential methods and features of the Java
ToIntFunction interface. Understanding these concepts is crucial for efficient
numeric processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).