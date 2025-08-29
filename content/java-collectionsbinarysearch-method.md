+++
title = "Java Collections.binarySearch Method"
date = 2025-08-29T19:58:15.685+01:00
draft = false
description = "Complete Java Collections.binarySearch tutorial with examples. Learn how to use binary search in Java Collections Framework."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.binarySearch Method

Last modified: April 20, 2025

 

The Collections.binarySearch method is a utility for efficiently
searching sorted lists. It implements the binary search algorithm, which offers
O(log n) time complexity. The list must be sorted in ascending order for correct
results.

## Collections.binarySearch Overview

The Collections.binarySearch method is a utility for efficiently
searching sorted lists. It implements the binary search algorithm, which offers
O(log n) time complexity. The list must be sorted in ascending order for correct
results.

Binary search works by repeatedly dividing the search interval in half. It
compares the target value to the middle element of the array. Depending on the
comparison, it continues searching either the left or right half of the
list.

The binarySearch method has two main variants. One works with
natural ordering of elements, while the other allows for a custom comparator.
Both return the index of the search key if it is found within the list.

If the key is found in the list, the method returns its index, which represents
the position of the key within the sorted list.

If the key is not found, the method returns a negative value. This value is
calculated as -(insertionPoint) - 1, where the
insertionPoint is the index where the key would be inserted to
maintain the list's sorted order.

The returned negative value serves two purposes: it indicates that the key is
absent from the list and provides information about the position where it could
be added.

Additionally, the method will throw a ClassCastException if the
list elements are not mutually comparable based on the specified comparator or
natural ordering.

## Basic binarySearch Example

This example demonstrates the simplest use of binarySearch. We
create a sorted list of integers and search for a value. The list must be sorted
for binary search to work correctly.

BasicBinarySearch.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class BasicBinarySearch {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = List.of(1, 3, 5, 7, 9, 11, 13);

        // Search for existing value
        int index1 = Collections.binarySearch(numbers, 7);
        System.out.println("Index of 7: " + index1);

        // Search for non-existing value
        int index2 = Collections.binarySearch(numbers, 8);
        System.out.println("Index of 8: " + index2);

        // Calculate insertion point for 8
        if (index2 &lt; 0) {
            int insertionPoint = -index2 - 1;
            System.out.println("8 should be inserted at: " + insertionPoint);
        }
    }
}

This code shows basic binary search usage. We search for value 7 which exists,
and 8 which doesn't. For non-existent values, we calculate the insertion point.

The output shows the index of found values and the calculated insertion point
for missing values. This demonstrates binary search's behavior with both present
and absent elements.

## binarySearch with Strings

This example shows binarySearch with a list of strings. Strings
are compared lexicographically. The list must be sorted in ascending order.

StringBinarySearch.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class StringBinarySearch {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of("apple", "banana", "cherry",
                "date", "elderberry", "fig");

        // Search for existing string
        int index1 = Collections.binarySearch(words, "cherry");
        System.out.println("Index of 'cherry': " + index1);

        // Search for non-existing string
        int index2 = Collections.binarySearch(words, "grape");
        System.out.println("Index of 'grape': " + index2);

        // Case-sensitive search
        int index3 = Collections.binarySearch(words, "Cherry");
        System.out.println("Index of 'Cherry': " + index3);
    }
}

This example demonstrates string searching with binary search. Note that string
comparison is case-sensitive. 'Cherry' (with capital C) is not found because
the list contains lowercase strings.

The output shows successful and unsuccessful searches. The negative return value
for 'grape' indicates it's not present but would be inserted at the end.

## binarySearch with Custom Objects

This example demonstrates binarySearch with custom objects. The
objects must implement Comparable or we must provide a
Comparator. Here we use the natural ordering defined by
Comparable.

CustomObjectBinarySearch.java
  

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

public class CustomObjectBinarySearch {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Charlie", 22));
        people.add(new Person("David", 35));

        // List must be sorted by the same criteria used in compareTo
        Collections.sort(people);

        // Search by name (natural ordering)
        Person key = new Person("Charlie", 0);
        int index = Collections.binarySearch(people, key);

        if (index &gt;= 0) {
            System.out.println("Found: " + people.get(index));
        } else {
            System.out.println("Not found. Insertion point: " + (-index - 1));
        }
    }
}

This code shows binary search with custom Person objects. The
Person implements Comparable to define natural
ordering by name. We must sort the list before searching.

The output demonstrates successful search by name. The age in the search key
is irrelevant as only the name is used for comparison.

## binarySearch with Comparator

This example shows how to use binarySearch with a custom
Comparator. This is useful when we want to search by different
criteria than the natural ordering.

ComparatorBinarySearch.java
  

package com.zetcode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

record Product(String name, BigDecimal price) {}

public class ComparatorBinarySearch {

    public static void main(String[] args) {

        List&lt;Product&gt; products = new ArrayList&lt;&gt;();
        products.add(new Product("Laptop", new BigDecimal("999.99")));
        products.add(new Product("Phone", new BigDecimal("699.99")));
        products.add(new Product("Tablet", new BigDecimal("399.99")));
        products.add(new Product("Monitor", new BigDecimal("249.99")));

        // Sort by price using comparator
        Comparator&lt;Product&gt; priceComparator = Comparator.comparing(Product::price);
        products.sort(priceComparator);

        // Search by price
        Product searchKey = new Product("", new BigDecimal("399.99"));
        int index = Collections.binarySearch(products, searchKey, priceComparator);

        if (index &gt;= 0) {
            System.out.println("Found at index " + index + ": " + products.get(index));
        } else {
            System.out.println("Product with price $399.99 not found");
        }
    }
}

This example demonstrates searching by price using a custom comparator. The
products are sorted by price, allowing us to search by price range. The product
name in the search key is irrelevant.

The output shows successful search by price. The comparator ensures only price
values are compared during the binary search operation.

## binarySearch with Duplicates

When a list contains duplicates, binarySearch doesn't guarantee
which duplicate's index will be returned. This example shows behavior with
duplicate elements.

DuplicateBinarySearch.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class DuplicateBinarySearch {

    public static void main(String[] args) {

        List&lt;Integer&gt; numbers = List.of(1, 2, 2, 2, 3, 4, 5);

        // Search for duplicate value
        int index = Collections.binarySearch(numbers, 2);
        System.out.println("Index of 2: " + index);

        // The exact index among duplicates is not guaranteed
        System.out.println("All indices of 2:");
        for (int i = 0; i &lt; numbers.size(); i++) {
            if (numbers.get(i) == 2) {
                System.out.println(i);
            }
        }
    }
}

This code demonstrates binary search behavior with duplicates. The method may
return any index where the value appears. To find all occurrences, additional
processing is needed.

The output shows one possible index where the value was found, followed by all
indices where it appears. This highlights binary search's limitation with
duplicates.

## binarySearch Performance

This example compares the performance of binary search versus linear search.
Binary search's O(log n) complexity makes it much faster for large collections.

BinarySearchPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BinarySearchPerformance {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; 1000000; i++) {
            numbers.add(i);
        }
        
        // Binary search timing
        long startTime = System.nanoTime();
        int index1 = Collections.binarySearch(numbers, 999999);
        long endTime = System.nanoTime();
        System.out.println("Binary search time: " + (endTime - startTime) + " ns");
        
        // Linear search timing
        startTime = System.nanoTime();
        int index2 = -1;
        for (int i = 0; i &lt; numbers.size(); i++) {
            if (numbers.get(i) == 999999) {
                index2 = i;
                break;
            }
        }
        endTime = System.nanoTime();
        System.out.println("Linear search time: " + (endTime - startTime) + " ns");
    }
}

This example measures the time difference between binary and linear search. The
difference becomes more pronounced with larger collections. Binary search is
clearly superior for sorted data.

## Source

[Java Collections.binarySearch Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#binarySearch-java.util.List-T-)

In this article, we've explored the Java Collections.binarySearch
method in depth. We've covered basic usage, string searching, custom objects,
comparators, duplicates, and performance. Understanding binary search is
essential for efficient data retrieval in sorted collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).