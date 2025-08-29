+++
title = "Java Collections.min Method"
date = 2025-08-29T19:58:21.285+01:00
draft = false
description = "Complete Java Collections.min method tutorial with examples. Learn how to find minimum elements in collections."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.min Method

Last modified: April 20, 2025

 

The Collections.min method is a utility method from Java's
java.util.Collections class. It returns the minimum element of
a given collection according to natural ordering. The collection must implement
the Comparable interface.

There are two overloaded versions of this method. One uses natural ordering,
while the other accepts a Comparator for custom ordering. Both
throw exceptions if the collection is empty.

## Collections.min Method Overview

The min method scans the entire collection to find the smallest
element. For natural ordering, elements must implement Comparable.
The method throws NoSuchElementException if the collection is empty.

The version with a Comparator allows custom ordering logic. This
is useful when elements don't implement Comparable or when you
need different ordering than natural. Both methods have linear time complexity.

## Basic Usage with Numbers

This example demonstrates the simplest usage of Collections.min
with a list of numbers. Numbers implement Comparable, so they
can be compared naturally. The example shows finding the minimum in a list.

MinWithNumbers.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class MinWithNumbers {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = List.of(34, 12, 56, 7, 23, 89);

        Integer min = Collections.min(numbers);

        System.out.println("Numbers: " + numbers);
        System.out.println("Minimum number: " + min);
    }
}

This code creates a list of integers and finds the smallest one using
Collections.min. The natural ordering of integers is used,
so 7 is correctly identified as the minimum. The output shows both the
original list and the found minimum.

The example demonstrates the most straightforward case where elements
implement Comparable and natural ordering is sufficient.

## Finding Minimum String

Strings also implement Comparable, allowing natural ordering
based on lexicographical comparison. This example finds the alphabetically
first string in a collection. The comparison is case-sensitive.

MinWithStrings.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MinWithStrings {

    public static void main(String[] args) {
        
        List&lt;String&gt; words = new ArrayList&lt;&gt;();
        words.add("zebra");
        words.add("apple");
        words.add("banana");
        words.add("cherry");
        
        String minWord = Collections.min(words);
        
        System.out.println("Words: " + words);
        System.out.println("First word alphabetically: " + minWord);
    }
}

The code creates a list of strings and finds the lexicographically smallest
one. "apple" is returned as it comes first in dictionary order. String
comparison is based on Unicode values of characters.

Note that uppercase letters have lower Unicode values than lowercase. For
case-insensitive comparison, we would need a custom Comparator.

## Using Custom Comparator

This example shows how to use Collections.min with a custom
Comparator. We find the shortest string in a list by comparing
string lengths. The comparator defines the ordering logic.

MinWithComparator.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MinWithComparator {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of(
                "elephant", "cat", "giraffe", "dog", "hippopotamus");

        // Comparator comparing by string length
        Comparator&lt;String&gt; byLength = Comparator.comparingInt(String::length);

        String shortest = Collections.min(words, byLength);

        System.out.println("Words: " + words);
        System.out.println("Shortest word: " + shortest);
    }
}

Here we use a Comparator that compares strings by their length.
The min method uses this comparator to find the shortest string.
"cat" and "dog" are both shortest, but "cat" appears first in the list.

This demonstrates how to customize the comparison logic when natural
ordering isn't appropriate. The comparator can implement any comparison
rules needed.

## Finding Minimum Custom Object

For custom objects, we can either implement Comparable or
provide a Comparator. This example shows both approaches
with a simple Person record. We find the youngest person.

MinWithCustomObjects.java
  

package com.zetcode;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

record Person(String name, int age) implements Comparable&lt;Person&gt; {
    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
}

public class MinWithCustomObjects {

    public static void main(String[] args) {

        List&lt;Person&gt; people = List.of(
                new Person("Alice", 25),
                new Person("Bob", 20),
                new Person("Charlie", 30)
        );

        // Using natural ordering (Comparable)
        Person youngestNatural = Collections.min(people);
        System.out.println("Youngest (natural): " + youngestNatural);

        // Using custom Comparator
        Person youngestComparator = Collections.min(people,
                Comparator.comparingInt(Person::age));
        System.out.println("Youngest (comparator): " + youngestComparator);
    }
}

The Person record implements Comparable based on age,
enabling natural ordering. We demonstrate finding the youngest person using
both natural ordering and a custom comparator. Both approaches yield the same
result in this case.

This example shows how to work with custom objects when using
Collections.min. The choice between Comparable
and Comparator depends on design requirements.

## Handling Empty Collection

Collections.min throws NoSuchElementException when
called on an empty collection. This example demonstrates proper error handling
to prevent crashes when collections might be empty.

MinWithEmptyCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

public class MinWithEmptyCollection {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        
        try {
            Integer min = Collections.min(numbers);
            System.out.println("Minimum: " + min);
        } catch (NoSuchElementException e) {
            System.out.println("Cannot find minimum in empty collection");
            System.out.println("Error: " + e.getMessage());
        }
        
        // Safe alternative with Optional
        numbers.add(42); // Add an element
        numbers.stream().min(Integer::compareTo)
            .ifPresentOrElse(
                min -&gt; System.out.println("Minimum: " + min),
                () -&gt; System.out.println("Collection is empty")
            );
    }
}

The example first attempts to find the minimum in an empty list, which throws
an exception. We catch and handle this gracefully. Then we show a modern
alternative using Stream and Optional that avoids
exceptions.

Proper error handling is crucial when working with Collections.min
as empty collections are common in real-world applications. The stream approach
provides a more functional alternative.

## Source

[Java Collections.min Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#min-java.util.Collection-)

In this article, we've explored the Java Collections.min method in
depth. We've covered basic usage with numbers and strings, custom comparators,
and error handling. This method is a powerful tool for finding minimum elements
in collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).