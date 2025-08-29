+++
title = "Java Function.andThen Method"
date = 2025-08-29T19:58:58.703+01:00
draft = false
description = "Complete Java Function.andThen tutorial with examples. Learn function composition in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Function.andThen Method

Last modified: April 16, 2025

 

The Function.andThen method is a powerful feature in Java's
functional programming toolkit. It allows chaining multiple functions
together to create complex transformations from simple operations.

This tutorial will explore andThen in depth with practical
examples. We'll cover basic usage, common patterns, and advanced
composition techniques. Understanding andThen is essential
for effective functional programming in Java.

## Function.andThen Basics

The andThen method is a default method in the
Function interface. It returns a composed function that
first applies the current function, then applies the after function.

default &lt;V&gt; Function&lt;T, V&gt; andThen(Function&lt;? super R, ? extends V&gt; after)

The method takes another Function as parameter. The input type of the
after function must match or be supertype of current function's output.
The result is a new Function that combines both operations.

## Simple String Transformation

This example demonstrates basic andThen usage with string
transformations. We chain uppercase conversion with substring extraction.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {
    public static void main(String[] args) {

        Function&lt;String, String&gt; toUpper = s -&gt; s.toUpperCase();
        Function&lt;String, String&gt; firstThree = s -&gt; s.substring(0, 3);
        
        Function&lt;String, String&gt; pipeline = toUpper.andThen(firstThree);
        
        System.out.println(pipeline.apply("hello"));    // Output: HEL
        System.out.println(pipeline.apply("world"));    // Output: WOR
    }
}

The code creates two simple functions and chains them with andThen.
First string is converted to uppercase, then first three characters are taken.
The pipeline function combines both operations into one transformation.

## Mathematical Operations Chaining

This example shows how to chain mathematical operations using
andThen. We create reusable function components.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {
    public static void main(String[] args) {

        Function&lt;Integer, Integer&gt; square = x -&gt; x * x;
        Function&lt;Integer, Integer&gt; increment = x -&gt; x + 1;
        Function&lt;Integer, Integer&gt; half = x -&gt; x / 2;
        
        Function&lt;Integer, Integer&gt; pipeline = square.andThen(increment).andThen(half);
        
        System.out.println(pipeline.apply(5));  // Output: 13 (5²=25, +1=26, /2=13)
        System.out.println(pipeline.apply(3));  // Output: 5 (3²=9, +1=10, /2=5)
    }
}

We define three mathematical operations as separate functions. Using
andThen, we create a pipeline that squares a number,
increments it, then halves the result. Each function is reusable in
other compositions.

## Type Transformation Pipeline

This example demonstrates changing types through a function pipeline.
We convert String to Integer, then Integer to Double.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {
    public static void main(String[] args) {

        Function&lt;String, Integer&gt; parse = Integer::parseInt;
        Function&lt;Integer, Double&gt; sqrt = Math::sqrt;
        
        Function&lt;String, Double&gt; pipeline = parse.andThen(sqrt);
        
        System.out.println(pipeline.apply("16"));  // Output: 4.0
        System.out.println(pipeline.apply("25"));  // Output: 5.0
    }
}

The pipeline first parses a String to Integer, then calculates square
root producing a Double. andThen handles the type
transformations automatically. Method references make the code concise.

## Combining with Stream.map

This example shows how to use andThen with Stream.map
for processing collections. We process a list of names.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {

        Function&lt;String, String&gt; trim = String::trim;
        Function&lt;String, String&gt; capitalize = s -&gt; 
            s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
            
        List&lt;String&gt; names = List.of("  john ", "  MARY  ", "  peter  ");
        
        List&lt;String&gt; processed = names.stream()
            .map(trim.andThen(capitalize))
            .collect(Collectors.toList());
            
        System.out.println(processed);  // Output: [John, Mary, Peter]
    }
}

We create a processing pipeline that first trims strings, then capitalizes
them. The composed function is used in Stream.map to process all elements.
This pattern is common in data processing applications.

## Conditional Processing with andThen

This example demonstrates conditional processing in a function pipeline.
We use andThen with a function that checks conditions.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {
    public static void main(String[] args) {

        Function&lt;Integer, Integer&gt; doubleVal = x -&gt; x * 2;
        Function&lt;Integer, String&gt; checkEven = x -&gt; 
            x % 2 == 0 ? "Even: " + x : "Odd: " + x;
            
        Function&lt;Integer, String&gt; pipeline = doubleVal.andThen(checkEven);
        
        System.out.println(pipeline.apply(3));  // Output: Even: 6
        System.out.println(pipeline.apply(4));  // Output: Even: 8
    }
}

The pipeline first doubles the input number, then checks if it's even.
The second function returns different strings based on the condition.
andThen enables this sequential processing pattern.

## Exception Handling in Pipeline

This example shows how to handle exceptions in function pipelines.
We create safe parsing functions that handle NumberFormatException.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {
    public static void main(String[] args) {

        Function&lt;String, Integer&gt; safeParse = s -&gt; {
            try {
                return Integer.parseInt(s);
            } catch (NumberFormatException e) {
                return 0;
            }
        };
        
        Function&lt;Integer, Integer&gt; square = x -&gt; x * x;
        
        Function&lt;String, Integer&gt; pipeline = safeParse.andThen(square);
        
        System.out.println(pipeline.apply("5"));  // Output: 25
        System.out.println(pipeline.apply("abc")); // Output: 0
    }
}

The safeParse function handles potential exceptions by returning a
default value. When chained with square using andThen,
the pipeline becomes robust against invalid inputs. This is useful
for data validation scenarios.

## Complex Object Transformation

This example demonstrates transforming complex objects through a
pipeline. We process a Person object through multiple steps.

Main.java
  

package com.zetcode;

import java.util.function.Function;

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    
    public static void main(String[] args) {

        Function&lt;Person, String&gt; getName = p -&gt; p.name;
        Function&lt;String, String&gt; reverse = s -&gt; new StringBuilder(s).reverse().toString();
        Function&lt;String, String&gt; upperCase = String::toUpperCase;
        
        Function&lt;Person, String&gt; pipeline = getName.andThen(reverse).andThen(upperCase);
        
        Person person = new Person("Alice", 30);
        System.out.println(pipeline.apply(person));  // Output: ECILA
    }
}

We create a pipeline that extracts a Person's name, reverses it, then
converts to uppercase. Each step is a simple function, but combined
they perform complex transformation. This showcases andThen's
power for object processing.

## Source

[Java Function.andThen Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html#andThen-java.util.function.Function-)

This tutorial covered the Function.andThen method with
practical examples. Function composition is a powerful technique for
creating reusable, maintainable transformation pipelines in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).