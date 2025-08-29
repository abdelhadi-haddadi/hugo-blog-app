+++
title = "Java Collections.sort Method"
date = 2025-08-29T19:58:24.706+01:00
draft = false
description = "Complete Java Collections.sort tutorial with examples. Learn how to sort lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.sort Method

Last modified: April 20, 2025

 

The Collections.sort method is a utility method in Java's
java.util.Collections class. It provides functionality to sort
elements in a List. The method comes in two variants: one that sorts according
to natural ordering and one that uses a Comparator.

Sorting is a fundamental operation in programming. The Collections.sort method
offers efficient sorting algorithms for Lists. It uses a modified mergesort
algorithm that offers n log(n) performance.

## Collections.sort Overview

The Collections.sort method sorts the specified list into ascending order.
The elements must implement the Comparable interface for natural ordering.
Alternatively, you can provide a Comparator for custom ordering.

The sort is stable, meaning equal elements won't be reordered. The method
operates in-place, modifying the original list. For immutable lists, it throws
an UnsupportedOperationException.

## Basic Sorting with Collections.sort

This example demonstrates the simplest use of Collections.sort. We create a
List of Strings and sort them in natural order. Strings implement Comparable,
so no additional configuration is needed.

BasicSortExample.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BasicSortExample {

    public static void main(String[] args) {
        
        List&lt;String&gt; names = Arrays.asList(
            "John", "Adam", "Jane", "Peter", "Mary"
        );
        
        System.out.println("Before sorting: " + names);
        
        Collections.sort(names);
        
        System.out.println("After sorting: " + names);
    }
}

This code creates a List of names and sorts them alphabetically. The output
shows the list before and after sorting. The sort is case-sensitive as it uses
String's natural ordering.

The Collections.sort method modifies the original list. If you need to preserve
the original order, create a copy before sorting.

## Sorting Custom Objects

To sort custom objects in Java, you can either implement the
Comparable interface for natural ordering or provide a custom
Comparator for specific sorting logic. This example demonstrates
the Person record implementing Comparable to define a
natural order based on the name field.

CustomObjectSort.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

record Person(String name, int age) implements Comparable&lt;Person&gt; {
    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}

public class CustomObjectSort {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("John", 25));
        people.add(new Person("Adam", 30));
        people.add(new Person("Jane", 22));

        System.out.println("Before sorting: " + people);
        Collections.sort(people);
        System.out.println("After sorting: " + people);
    }
}

The Person record overrides the compareTo method,
delegating to String's compareTo method to order names
alphabetically. The Collections.sort method uses this natural
ordering to arrange the Person objects in ascending order by name.

The output displays the list sorted alphabetically by name, as defined by the
natural ordering. Implementing the Comparable interface is a clear
and efficient approach when objects have an inherent or "default" sorting order,
making the code easier to understand and maintain.

## Sorting with Comparator

When you can't modify a class or need different sorting orders, use a
Comparator. This example shows how to sort Persons by age using a
Comparator.

ComparatorSort.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

record Person(String name, int age) {}

public class ComparatorSort {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("John", 25));
        people.add(new Person("Adam", 30));
        people.add(new Person("Jane", 22));

        System.out.println("Original order: " + people);

        // Sort by age using Comparator
        Collections.sort(people, Comparator.comparingInt(Person::age));

        System.out.println("Sorted by age: " + people);
    }
}

This example uses a comparator to sort by age, created with the method reference
Comparator.comparingInt(Person::age). Unlike an anonymous
implementation, this approach leverages modern Java functional programming for
concise and readable code. By referencing the age field directly,
the comparison is streamlined and avoids manual implementation of the
compare method.

    

The output displays the list sorted by age in ascending order. This demonstrates
the flexibility of comparators, which are particularly useful for customizing
sorting logic, including handling multiple criteria or dynamic ordering. 

## Lambda Expressions for Sorting

Lambda expressions simplify Comparator creation. This example shows
how to use lambdas with Collections.sor for concise code.

LambdaSort.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

record Person(String name, int age) {}

public class LambdaSort {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("John", 25));
        people.add(new Person("Adam", 30));
        people.add(new Person("Jane", 22));

        System.out.println("Original order: " + people);

        // Sort by name using lambda
        Collections.sort(people, Comparator.comparing(Person::name));
        System.out.println("Sorted by name: " + people);

        // Sort by age using lambda
        Collections.sort(people, Comparator.comparingInt(Person::age));
        System.out.println("Sorted by age: " + people);
    }
}

Lambda expressions make Comparator code much cleaner. The first
sort uses a lambda to compare names. The second sort compares ages, both in one
line each.

The output demonstrates both sorting orders. Lambdas are especially useful when
you need multiple sorting criteria in different parts of your application.

## Reverse Order Sorting

Collections.sort can sort in reverse order using
Comparator.reverseOrder or
Collections.reverseOrder. This example shows both approaches.

ReverseSort.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ReverseSort {

    public static void main(String[] args) {

        List&lt;String&gt; names = Arrays.asList(
                "John", "Adam", "Jane", "Peter", "Mary"
        );

        System.out.println("Original order: " + names);

        // Natural order sort
        Collections.sort(names);
        System.out.println("Natural order: " + names);

        // Reverse order using reverseOrder()
        Collections.sort(names, Collections.reverseOrder());
        System.out.println("Reverse order: " + names);

        // Alternative reverse sort
        names.sort(Comparator.reverseOrder());
        System.out.println("Alternative reverse: " + names);
    }
}

This example first sorts names in natural order, then reverses the order.
Collections.reverseOrder returns a Comparator that
reverses natural ordering. The alternative uses List's sort method directly.

The output shows each sorting step. Reverse sorting is useful for displaying
data in descending order, like showing highest scores first.

## Sorting with Multiple Criteria

For complex sorting with multiple fields, use Comparator chaining. This example
sorts Persons by name then age using thenComparing.

MultiCriteriaSort.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

record Person(String name, int age) {
}

public class MultiCriteriaSort {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("John", 25));
        people.add(new Person("Adam", 30));
        people.add(new Person("Jane", 22));
        people.add(new Person("Adam", 25));

        System.out.println("Original order: " + people);

        // Sort by name then age
        Collections.sort(people, Comparator
                .comparing(Person::name)
                .thenComparingInt(Person::age)
        );

        System.out.println("Sorted by name then age: " + people);
    }
}

This example uses Java 8's Comparator.comparing and thenComparing methods.
First, it sorts by name, then by age for people with the same name. The
method references make the code very readable.

The output shows the list sorted primarily by name and secondarily by age.
This technique is essential when dealing with complex sorting requirements.

## Case-Insensitive Sorting

For case-insensitive string sorting, use String.CASE_INSENSITIVE_ORDER or a
custom Comparator. This example demonstrates both approaches.

CaseInsensitiveSort.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CaseInsensitiveSort {

    public static void main(String[] args) {
        
        List&lt;String&gt; words = Arrays.asList(
            "apple", "Orange", "banana", "PEAR", "Grape"
        );
        
        System.out.println("Original order: " + words);
        
        // Case-sensitive sort (natural order)
        Collections.sort(words);
        System.out.println("Case-sensitive sort: " + words);
        
        // Case-insensitive sort using String.CASE_INSENSITIVE_ORDER
        Collections.sort(words, String.CASE_INSENSITIVE_ORDER);
        System.out.println("Case-insensitive sort: " + words);
        
        // Alternative using lambda
        Collections.sort(words, String::compareToIgnoreCase);
        System.out.println("Lambda case-insensitive: " + words);
    }
}

The example first shows case-sensitive sorting where uppercase letters sort
before lowercase. Then it demonstrates case-insensitive sorting using both
String's built-in Comparator and a lambda with compareToIgnoreCase.

The output clearly shows the difference between case-sensitive and insensitive
sorting. Case-insensitive sorting is often what users expect in applications.

## Source

[Java Collections.sort Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#sort-java.util.List-)

In this article, we've explored Java's Collections.sort method in depth. We've
covered basic sorting, custom objects, Comparators, lambdas, reverse sorting,
multi-criteria sorting, and case sensitivity. Mastering these techniques is
essential for effective Java development.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).