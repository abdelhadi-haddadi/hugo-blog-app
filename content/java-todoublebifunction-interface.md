+++
title = "Java ToDoubleBiFunction Interface"
date = 2025-08-29T19:58:56.531+01:00
draft = false
description = "Complete Java ToDoubleBiFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ToDoubleBiFunction Interface

Last modified: April 16, 2025

 

The java.util.function.ToDoubleBiFunction interface represents a
function that accepts two arguments and produces a double-valued result. It is a
functional interface with a single abstract method applyAsDouble.

ToDoubleBiFunction is part of Java's functional programming
utilities added in Java 8. It is specialized for primitive double output to
avoid boxing overhead. The interface is useful for numeric calculations.

## ToDoubleBiFunction Interface Overview

ToDoubleBiFunction interface contains one abstract method that
takes two arguments and returns a double. It is parameterized with two generic
types for the input parameters.

@FunctionalInterface
public interface ToDoubleBiFunction&lt;T, U&gt; {
    double applyAsDouble(T t, U u);
}

The code above shows the structure of ToDoubleBiFunction. It uses
generics where T and U are input types. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic ToDoubleBiFunction Usage

The simplest way to use ToDoubleBiFunction is with lambda expressions. We define
how to process two inputs to produce a double result. The example calculates
product prices.

Main.java
  

package com.zetcode;

import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // Calculate total price (quantity * unitPrice)
        ToDoubleBiFunction&lt;Integer, Double&gt; calculateTotal = 
            (quantity, unitPrice) -&gt; quantity * unitPrice;
        
        double total1 = calculateTotal.applyAsDouble(5, 12.99);
        double total2 = calculateTotal.applyAsDouble(3, 8.50);
        
        System.out.println("Total 1: " + total1);
        System.out.println("Total 2: " + total2);
    }
}

This example demonstrates basic ToDoubleBiFunction usage. The lambda takes
Integer quantity and Double unitPrice, returning their product. We avoid
boxing/unboxing overhead by working with primitive double directly.

## Calculating Euclidean Distance

ToDoubleBiFunction is ideal for mathematical operations requiring two inputs.
This example calculates Euclidean distance between 2D points.

Main.java
  

package com.zetcode;

import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // Calculate distance between two points (x1,y1) and (x2,y2)
        ToDoubleBiFunction&lt;Point, Point&gt; distanceCalculator = 
            (p1, p2) -&gt; Math.sqrt(Math.pow(p2.x - p1.x, 2) + 
                                  Math.pow(p2.y - p1.y, 2));
        
        Point pointA = new Point(1, 2);
        Point pointB = new Point(4, 6);
        
        double distance = distanceCalculator.applyAsDouble(pointA, pointB);
        System.out.printf("Distance between points: %.2f%n", distance);
    }
}

class Point {
    double x, y;
    
    Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
}

This example shows ToDoubleBiFunction with custom objects. The lambda calculates
distance using the standard formula. The result is returned as primitive double
for better performance in numeric operations.

## Weighted Average Calculation

ToDoubleBiFunction can process collections of values. This example calculates
weighted average from two arrays of values and weights.

Main.java
  

package com.zetcode;

import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // Calculate weighted average
        ToDoubleBiFunction&lt;double[], double[]&gt; weightedAverage = 
            (values, weights) -&gt; {
                if (values.length != weights.length) {
                    throw new IllegalArgumentException("Arrays must be same length");
                }
                
                double sum = 0;
                double weightSum = 0;
                
                for (int i = 0; i &lt; values.length; i++) {
                    sum += values[i] * weights[i];
                    weightSum += weights[i];
                }
                
                return sum / weightSum;
            };
        
        double[] scores = {90, 85, 78};
        double[] weights = {0.3, 0.4, 0.3};
        
        double average = weightedAverage.applyAsDouble(scores, weights);
        System.out.printf("Weighted average: %.2f%n", average);
    }
}

This example demonstrates complex calculation with ToDoubleBiFunction. The lambda
takes two double arrays and computes their weighted average. Input validation
ensures arrays have matching lengths before processing.

## Using with Collections

ToDoubleBiFunction works well with Java collections. This example processes
two maps to find correlation between their values.

Main.java
  

package com.zetcode;

import java.util.Map;
import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // Calculate correlation between two maps' values
        ToDoubleBiFunction&lt;Map&lt;String, Double&gt;, Map&lt;String, Double&gt;&gt; correlation = 
            (map1, map2) -&gt; {
                double sumX = 0, sumY = 0, sumXY = 0;
                double sumX2 = 0, sumY2 = 0;
                int n = 0;
                
                for (String key : map1.keySet()) {
                    if (map2.containsKey(key)) {
                        double x = map1.get(key);
                        double y = map2.get(key);
                        
                        sumX += x;
                        sumY += y;
                        sumXY += x * y;
                        sumX2 += x * x;
                        sumY2 += y * y;
                        n++;
                    }
                }
                
                if (n == 0) return 0;
                
                double numerator = sumXY - (sumX * sumY) / n;
                double denominator = Math.sqrt(
                    (sumX2 - (sumX * sumX) / n) * 
                    (sumY2 - (sumY * sumY) / n);
                
                return numerator / denominator;
            };
        
        Map&lt;String, Double&gt; testScores = Map.of(
            "Alice", 85.0, "Bob", 72.0, "Charlie", 90.0);
            
        Map&lt;String, Double&gt; studyHours = Map.of(
            "Alice", 12.5, "Bob", 8.0, "Charlie", 15.0);
            
        double corr = correlation.applyAsDouble(testScores, studyHours);
        System.out.printf("Correlation coefficient: %.2f%n", corr);
    }
}

This advanced example shows ToDoubleBiFunction processing two maps. It calculates
Pearson correlation coefficient between matching values. The implementation
handles all mathematical operations using primitive doubles for efficiency.

## Combining with Other Functional Interfaces

ToDoubleBiFunction can be combined with other functional interfaces. This
example shows composition with Function for more complex transformations.

Main.java
  

package com.zetcode;

import java.util.function.Function;
import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // Convert string pairs to similarity score (0-1)
        ToDoubleBiFunction&lt;String, String&gt; stringSimilarity = 
            (s1, s2) -&gt; {
                int matches = 0;
                int length = Math.min(s1.length(), s2.length());
                
                for (int i = 0; i &lt; length; i++) {
                    if (s1.charAt(i) == s2.charAt(i)) {
                        matches++;
                    }
                }
                
                return (double) matches / Math.max(s1.length(), s2.length());
            };
        
        // Format similarity score as percentage
        Function&lt;Double, String&gt; toPercent = 
            score -&gt; String.format("%.0f%%", score * 100);
        
        double similarity = stringSimilarity.applyAsDouble("hello", "hallo");
        String percentage = toPercent.apply(similarity);
        
        System.out.println("String similarity: " + percentage);
    }
}

This example combines ToDoubleBiFunction with Function. The first calculates
string similarity as double, the second formats it as percentage. This shows
how functional interfaces can work together in processing pipelines.

## Using in Stream Operations

ToDoubleBiFunction can be used in stream processing. This example calculates
average price per unit across product pairs.

Main.java
  

package com.zetcode;

import java.util.List;
import java.util.function.ToDoubleBiFunction;

public class Main {

    public static void main(String[] args) {

        // Calculate average price per unit for two products
        ToDoubleBiFunction&lt;Product, Product&gt; avgPricePerUnit = 
            (p1, p2) -&gt; (p1.price / p1.quantity + p2.price / p2.quantity) / 2;
        
        List&lt;Product&gt; products = List.of(
            new Product(5, 25.0), // 5 units for $25
            new Product(3, 21.0), // 3 units for $21
            new Product(10, 45.0)  // 10 units for $45
        );
        
        // Compare each pair of products
        for (int i = 0; i &lt; products.size(); i++) {
            for (int j = i + 1; j &lt; products.size(); j++) {
                double avg = avgPricePerUnit.applyAsDouble(
                    products.get(i), products.get(j));
                
                System.out.printf("Avg price for pair %d-%d: $%.2f%n", 
                    i+1, j+1, avg);
            }
        }
    }
}

class Product {
    int quantity;
    double price;
    
    Product(int quantity, double price) {
        this.quantity = quantity;
        this.price = price;
    }
}

This example demonstrates ToDoubleBiFunction in a nested loop processing product
pairs. The function calculates average unit price efficiently using primitive
double arithmetic. Results are formatted for display.

## Specialized Primitive Variants

Java provides specialized versions of ToDoubleBiFunction for primitive inputs.
These avoid boxing overhead when working with primitive data types.

Main.java
  

package com.zetcode;

import java.util.function.IntToDoubleFunction;
import java.util.function.ToDoubleBiFunction;
import java.util.function.ToIntBiFunction;

public class Main {

    public static void main(String[] args) {

        // Standard ToDoubleBiFunction with Integer objects
        ToDoubleBiFunction&lt;Integer, Integer&gt; objCalc = 
            (a, b) -&gt; Math.sqrt(a * a + b * b);
        
        // Primitive specialized version (hypot is more accurate)
        ToDoubleBiFunction&lt;Integer, Integer&gt; primCalc = 
            (a, b) -&gt; Math.hypot(a, b);
        
        System.out.println("Object version result: " + objCalc.applyAsDouble(3, 4));
        System.out.println("Primitive version result: " + primCalc.applyAsDouble(3, 4));
        
        // Note: Java doesn't have IntIntToDoubleFunction, but hypot is optimized
    }
}

This example compares standard and primitive-optimized approaches. While Java
doesn't have IntIntToDoubleFunction, methods like Math.hypot are optimized
for primitives. The example shows how to maximize performance with numeric
operations.

## Source

[Java ToDoubleBiFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ToDoubleBiFunction.html)

In this article, we've covered the essential methods and features of the Java
ToDoubleBiFunction interface. Understanding these concepts is crucial for
efficient numeric processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).