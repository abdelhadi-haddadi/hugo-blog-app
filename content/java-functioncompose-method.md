+++
title = "Java Function.compose Method"
date = 2025-08-29T19:58:58.699+01:00
draft = false
description = "Complete Java Function.compose tutorial with examples. Learn function composition in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Function.compose Method

Last modified: April 16, 2025

 

The compose method in Java's Function interface allows
function composition. It creates a new function by combining existing functions.
The composed function executes the parameter function first, then the original.

Function composition is a fundamental concept in functional programming. It
enables building complex operations from simple functions. The compose
method provides this capability in Java's functional interfaces.

## Function.compose Basics

The compose method signature is:
default &lt;V&gt; Function&lt;V, R&gt; compose(Function&lt;? super V, ? extends T&gt; before).
It takes a function that converts type V to type T. The result is a new function
that converts V to R.

Function&lt;Integer, String&gt; intToString = Object::toString;
Function&lt;String, Integer&gt; stringLength = String::length;

// Composed function: get length of string representation of integer
Function&lt;Integer, Integer&gt; composed = stringLength.compose(intToString);

// Equivalent to: stringLength(intToString(x))

This example shows basic composition. The composed function first converts an
integer to string, then gets the string's length. The execution order is
right-to-left in the composition chain.

## Simple Composition Example

This example demonstrates basic function composition with compose.
We create two simple functions and combine them to form a new operation.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Function to add 10 to a number
        Function&lt;Integer, Integer&gt; addTen = x -&gt; x + 10;
        
        // Function to multiply by 2
        Function&lt;Integer, Integer&gt; timesTwo = x -&gt; x * 2;
        
        // Compose: first addTen, then timesTwo
        Function&lt;Integer, Integer&gt; addThenMultiply = timesTwo.compose(addTen);
        
        System.out.println("Add then multiply 5: " + addThenMultiply.apply(5));
        
        // Compare with andThen
        Function&lt;Integer, Integer&gt; multiplyThenAdd = timesTwo.andThen(addTen);
        System.out.println("Multiply then add 5: " + multiplyThenAdd.apply(5));
    }
}

The example shows the difference between compose and andThen.
With compose, addTen executes first, then timesTwo. With andThen, timesTwo executes
first, then addTen. The results are different (30 vs 20 for input 5).

## String Transformation Composition

This example composes multiple string transformation functions. We create reusable
string operations and combine them in different ways.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Basic string transformations
        Function&lt;String, String&gt; trim = String::trim;
        Function&lt;String, String&gt; toUpper = String::toUpperCase;
        Function&lt;String, String&gt; addExclamation = s -&gt; s + "!";
        
        // Compose transformations
        Function&lt;String, String&gt; cleanAndExcite = 
            addExclamation.compose(toUpper).compose(trim);
            
        String input = "  hello world  ";
        System.out.println("Original: '" + input + "'");
        System.out.println("Transformed: '" + cleanAndExcite.apply(input) + "'");
        
        // Different composition order
        Function&lt;String, String&gt; exciteThenUpper = 
            toUpper.compose(addExclamation).compose(trim);
        System.out.println("Different order: '" + exciteThenUpper.apply(input) + "'");
    }
}

The example shows how to build complex string processing from simple functions.
The composition order matters - trim always happens first in both cases, but
exclamation and uppercase change order. The results are different.

## Composing Multiple Functions

We can chain multiple compose calls to create complex transformation
pipelines. This example shows a mathematical processing pipeline.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Mathematical operations
        Function&lt;Integer, Integer&gt; square = x -&gt; x * x;
        Function&lt;Integer, Integer&gt; half = x -&gt; x / 2;
        Function&lt;Integer, Integer&gt; increment = x -&gt; x + 1;
        Function&lt;Integer, String&gt; toString = Object::toString;
        
        // Create processing pipeline
        Function&lt;Integer, String&gt; processNumber = 
            toString.compose(half).compose(increment).compose(square);
            
        System.out.println("Process 4: " + processNumber.apply(4));
        System.out.println("Process 5: " + processNumber.apply(5));
        
        // Breakdown of operations for input 4:
        // 1. square(4) = 16
        // 2. increment(16) = 17
        // 3. half(17) = 8 (integer division)
        // 4. toString(8) = "8"
    }
}

This example demonstrates a multi-step processing pipeline. The operations execute
in reverse order of composition - square first, then increment, then half, finally
toString. The comments show the step-by-step execution for input 4.

## Composing Different Types

compose can combine functions with different input/output types.
This example shows type transformation through function composition.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Function chain with different types
        Function&lt;String, Integer&gt; parseInteger = Integer::parseInt;
        Function&lt;Integer, Double&gt; intToDouble = Integer::doubleValue;
        Function&lt;Double, String&gt; formatDouble = d -&gt; String.format("%.2f", d);
        
        // Compose the functions
        Function&lt;String, String&gt; stringProcessor = 
            formatDouble.compose(intToDouble).compose(parseInteger);
            
        System.out.println("Process '42': " + stringProcessor.apply("42"));
        System.out.println("Process '100': " + stringProcessor.apply("100"));
        
        // The processing flow:
        // String -&gt; Integer -&gt; Double -&gt; String
    }
}

This example shows type transformation through composition. We start with a String,
parse it to Integer, convert to Double, then format back to String. The type
conversions happen automatically through the function chain.

## Composing with Method References

Method references work well with compose. This example uses class
methods to build a processing pipeline for product data.

Main.java
  

package com.zetcode;

import java.util.function.Function;

class Product {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    public String getName() { return name; }
    public double getPrice() { return price; }
    public double getDiscountedPrice() { return price * 0.9; }
}

public class Main {

    public static void main(String[] args) {

        // Method references for product processing
        Function&lt;Product, Double&gt; getPrice = Product::getPrice;
        Function&lt;Double, String&gt; formatPrice = p -&gt; String.format("$%.2f", p);
        
        // Composed function to get formatted price
        Function&lt;Product, String&gt; getFormattedPrice = formatPrice.compose(getPrice);
        
        Product laptop = new Product("Laptop", 999.99);
        System.out.println("Price: " + getFormattedPrice.apply(laptop));
        
        // Alternative composition with discounted price
        Function&lt;Product, String&gt; getFormattedDiscountedPrice = 
            formatPrice.compose(Product::getDiscountedPrice);
        System.out.println("Discounted: " + getFormattedDiscountedPrice.apply(laptop));
    }
}

The example shows clean composition using method references. We process Product
objects to get formatted price strings. The second example shows direct method
reference composition for discounted price formatting.

## Practical Use Case: Data Validation

This practical example shows how compose can help build data
validation pipelines. We validate user input through a series of checks.

Main.java
  

package com.zetcode;

import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        // Validation functions
        Function&lt;String, String&gt; trimInput = String::trim;
        Function&lt;String, String&gt; checkEmpty = s -&gt; 
            s.isEmpty() ? "EMPTY" : s;
        Function&lt;String, String&gt; validateLength = s -&gt; 
            s.length() &gt; 10 ? "TOO_LONG" : s;
        Function&lt;String, String&gt; sanitize = s -&gt; 
            s.replaceAll("[^a-zA-Z0-9]", "");
            
        // Compose validation pipeline
        Function&lt;String, String&gt; validateInput = 
            sanitize.compose(validateLength).compose(checkEmpty).compose(trimInput);
            
        System.out.println("Valid ' hello ': " + validateInput.apply(" hello "));
        System.out.println("Valid '': " + validateInput.apply(""));
        System.out.println("Long input: " + validateInput.apply("12345678901"));
        System.out.println("With symbols: " + validateInput.apply("user@name"));
    }
}

This example shows a practical validation pipeline. Input goes through trimming,
empty check, length validation, and sanitization. Each function handles one
specific validation aspect. The composition creates a complete validation process.

## Source

[Java Function Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html)

The compose method is a powerful tool for function composition in
Java. It enables building complex operations from simple, reusable functions.
Understanding composition is key to effective functional programming in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).