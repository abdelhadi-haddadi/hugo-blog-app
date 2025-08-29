+++
title = "Java ToIntBiFunction Interface"
date = 2025-08-29T19:58:56.527+01:00
draft = false
description = "Complete Java ToIntBiFunction interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ToIntBiFunction Interface

Last modified: April 16, 2025

 

The java.util.function.ToIntBiFunction interface represents a
function that accepts two arguments and produces an int-valued result. It is a
functional interface with a single abstract method applyAsInt.

ToIntBiFunction is part of Java's functional programming utilities
added in Java 8. It is specialized to avoid boxing when working with primitive
ints. The interface is useful for operations that combine two values into an int.

## ToIntBiFunction Interface Overview

ToIntBiFunction interface contains one abstract method that must
be implemented. The method takes two arguments of specified types and returns
a primitive int value.

@FunctionalInterface
public interface ToIntBiFunction&lt;T, U&gt; {
    int applyAsInt(T t, U u);
}

The code above shows the structure of ToIntBiFunction. It uses
generics where T and U are input types. The interface is annotated with
@FunctionalInterface to indicate its single abstract method nature.

## Basic ToIntBiFunction Usage

The simplest way to use ToIntBiFunction is with lambda expressions. We define
how to combine two inputs into an int result. The example calculates string
length differences.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;

public class Main {

    public static void main(String[] args) {

        // Define function to calculate length difference
        ToIntBiFunction&lt;String, String&gt; lengthDiff = 
            (s1, s2) -&gt; s1.length() - s2.length();
        
        // Apply the function
        System.out.println("Difference: " + lengthDiff.applyAsInt("hello", "world"));
        System.out.println("Difference: " + lengthDiff.applyAsInt("longer", "short"));
    }
}

This example demonstrates basic ToIntBiFunction usage. The lengthDiff function
takes two strings and returns the difference in their lengths as an int. We
apply it to different string pairs using applyAsInt method.

## Calculating Product of Numbers

ToIntBiFunction can perform mathematical operations on its inputs. This example
shows multiplication of two numbers, demonstrating primitive specialization.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;

public class Main {

    public static void main(String[] args) {

        // Multiply two integers
        ToIntBiFunction&lt;Integer, Integer&gt; multiplier = 
            (a, b) -&gt; a * b;
        
        System.out.println("Product: " + multiplier.applyAsInt(5, 7));
        System.out.println("Product: " + multiplier.applyAsInt(12, 3));
        
        // Using method reference with parseInt
        ToIntBiFunction&lt;String, String&gt; sumStrings = 
            (s1, s2) -&gt; Integer.parseInt(s1) + Integer.parseInt(s2);
            
        System.out.println("Sum: " + sumStrings.applyAsInt("10", "20"));
    }
}

This example shows mathematical operations with ToIntBiFunction. The multiplier
function returns the product of two integers. The sumStrings function parses
strings to integers before adding them, showing type conversion.

## Comparing Objects with ToIntBiFunction

ToIntBiFunction can implement comparison logic between objects. This is useful
for custom sorting or equality checks. The example compares Person objects by age.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;

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

        // Compare ages of two Person objects
        ToIntBiFunction&lt;Person, Person&gt; ageComparator = 
            (p1, p2) -&gt; p1.age - p2.age;
            
        Person alice = new Person("Alice", 30);
        Person bob = new Person("Bob", 25);
        
        System.out.println("Age difference: " + 
            ageComparator.applyAsInt(alice, bob));
            
        // Using in sorting
        Person[] people = {alice, bob, new Person("Charlie", 20)};
        java.util.Arrays.sort(people, 
            (p1, p2) -&gt; ageComparator.applyAsInt(p1, p2));
            
        System.out.println("Sorted by age: " + 
            java.util.Arrays.toString(people));
    }
}

This example demonstrates object comparison. The ageComparator function returns
the age difference between two Person objects. We use it directly and within
a sorting operation, showing practical application.

## String Operations with ToIntBiFunction

ToIntBiFunction can perform various string operations. This example counts
common characters between two strings, showing more complex logic.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;

public class Main {

    public static void main(String[] args) {

        // Count common characters between two strings
        ToIntBiFunction&lt;String, String&gt; commonChars = (s1, s2) -&gt; {
            int count = 0;
            for (char c : s1.toCharArray()) {
                if (s2.indexOf(c) != -1) {
                    count++;
                }
            }
            return count;
        };
        
        System.out.println("Common chars: " + 
            commonChars.applyAsInt("hello", "world"));
        System.out.println("Common chars: " + 
            commonChars.applyAsInt("apple", "pear"));
    }
}

This example shows a more complex ToIntBiFunction implementation. The
commonChars function iterates through characters of the first string and
counts matches in the second string. The result is the count of common
characters.

## Using ToIntBiFunction with Collections

ToIntBiFunction can process collections. This example calculates total
age difference between corresponding persons in two lists.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List&lt;Integer&gt; list1 = List.of(10, 20, 30);
        List&lt;Integer&gt; list2 = List.of(5, 15, 25);
        
        // Sum of element-wise differences
        ToIntBiFunction&lt;List&lt;Integer&gt;, List&lt;Integer&gt;&gt; sumDiffs = (l1, l2) -&gt; {
            int sum = 0;
            for (int i = 0; i &lt; Math.min(l1.size(), l2.size()); i++) {
                sum += l1.get(i) - l2.get(i);
            }
            return sum;
        };
        
        System.out.println("Total difference: " + 
            sumDiffs.applyAsInt(list1, list2));
            
        // Using with custom objects
        record Point(int x, int y) {}
        
        ToIntBiFunction&lt;Point, Point&gt; distanceSquared = 
            (p1, p2) -&gt; (p1.x - p2.x) * (p1.x - p2.x) + 
                        (p1.y - p2.y) * (p1.y - p2.y);
                        
        System.out.println("Distance squared: " + 
            distanceSquared.applyAsInt(new Point(0, 0), new Point(3, 4)));
    }
}

This example processes collections with ToIntBiFunction. The sumDiffs function
calculates total differences between corresponding list elements. The
distanceSquared function shows a mathematical calculation with custom objects.

## Combining ToIntBiFunction with Other Functional Interfaces

ToIntBiFunction can be combined with other functional interfaces for more
complex operations. This example shows composition with Predicate.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;
import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        // Function to count matches based on predicate
        ToIntBiFunction&lt;List&lt;String&gt;, Predicate&lt;String&gt;&gt; countMatches = 
            (list, predicate) -&gt; {
                int count = 0;
                for (String s : list) {
                    if (predicate.test(s)) {
                        count++;
                    }
                }
                return count;
            };
            
        List&lt;String&gt; words = List.of("apple", "banana", "cherry", "date");
        System.out.println("Count of a's: " + 
            countMatches.applyAsInt(words, s -&gt; s.startsWith("a")));
        System.out.println("Count long words: " + 
            countMatches.applyAsInt(words, s -&gt; s.length() &gt; 5));
    }
}

This example combines ToIntBiFunction with Predicate. The countMatches function
takes a list and predicate, returning count of elements satisfying the condition.
This shows how functional interfaces can work together for flexible solutions.

## Real-world Example: Employee Analysis

ToIntBiFunction can solve real-world business problems. This example analyzes
employee data to calculate bonus points based on performance and tenure.

Main.java
  

package com.zetcode;

import java.util.function.ToIntBiFunction;

record Employee(String name, int performanceScore, int yearsOfService) {}

public class Main {

    public static void main(String[] args) {

        // Calculate bonus points for employees
        ToIntBiFunction&lt;Employee, Integer&gt; bonusCalculator = (emp, basePoints) -&gt; {
            int performanceMultiplier = emp.performanceScore() / 10;
            int tenureBonus = emp.yearsOfService() * 5;
            return basePoints * performanceMultiplier + tenureBonus;
        };
        
        Employee emp1 = new Employee("Alice", 85, 3);
        Employee emp2 = new Employee("Bob", 92, 7);
        
        System.out.println("Alice's bonus: " + 
            bonusCalculator.applyAsInt(emp1, 100));
        System.out.println("Bob's bonus: " + 
            bonusCalculator.applyAsInt(emp2, 100));
            
        // Using with stream
        var employees = List.of(emp1, emp2);
        int totalBonus = employees.stream()
            .mapToInt(emp -&gt; bonusCalculator.applyAsInt(emp, 100))
            .sum();
            
        System.out.println("Total bonus pool: " + totalBonus);
    }
}

This practical example shows ToIntBiFunction in a business context. The
bonusCalculator computes employee bonuses based on multiple factors. We also
demonstrate usage with streams to process collections of employees.

## Source

[Java ToIntBiFunction Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/ToIntBiFunction.html)

In this article, we've covered the essential methods and features of the Java
ToIntBiFunction interface. Understanding these concepts is crucial for functional
programming with two-argument operations returning primitive ints in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).