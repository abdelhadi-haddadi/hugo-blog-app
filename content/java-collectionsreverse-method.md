+++
title = "Java Collections.reverse Method"
date = 2025-08-29T19:58:22.426+01:00
draft = false
description = "Complete Java Collections.reverse tutorial with examples. Learn how to reverse lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.reverse Method

Last modified: April 20, 2025

 

The Collections.reverse method is a utility function in Java's
Collections framework. It reverses the order of elements in a specified list.
This operation is performed in-place, modifying the original list.

The method is part of the java.util.Collections class. It works
with any List implementation. The time complexity is linear (O(n)) where n is
the list size. It's a convenient way to reverse element order without manual
looping.

## Collections.reverse Overview

The reverse method takes a single parameter - the list to be
reversed. It doesn't return anything as it modifies the list in place. The
method throws UnsupportedOperationException if the list is
unmodifiable.

The method works by swapping elements from both ends moving toward the center.
It's efficient for random-access lists like ArrayList. For linked lists, it's
less efficient due to sequential access nature.

## Basic List Reversal

This example demonstrates the basic usage of Collections.reverse.
We create an ArrayList of strings and reverse its order. The example shows the
list before and after reversal.

BasicReverseExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicReverseExample {

    public static void main(String[] args) {
        
        List&lt;String&gt; colors = new ArrayList&lt;&gt;();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        colors.add("Yellow");
        
        System.out.println("Original list: " + colors);
        
        Collections.reverse(colors);
        
        System.out.println("Reversed list: " + colors);
    }
}

This code creates a list of colors and prints it. Then it reverses the list
using Collections.reverse and prints again. The output shows the
order of elements before and after reversal.

The method modifies the original list rather than returning a new reversed list.
This is important to remember when working with shared list references.

## Reversing Different List Types

Collections.reverse works with any List implementation. This
example demonstrates reversing an ArrayList and a LinkedList. Both show the
same behavior despite different internal implementations.

DifferentListTypes.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class DifferentListTypes {

    public static void main(String[] args) {
        
        // ArrayList example
        List&lt;Integer&gt; arrayList = new ArrayList&lt;&gt;();
        arrayList.add(1);
        arrayList.add(2);
        arrayList.add(3);
        
        System.out.println("ArrayList before: " + arrayList);
        Collections.reverse(arrayList);
        System.out.println("ArrayList after: " + arrayList);
        
        // LinkedList example
        List&lt;Integer&gt; linkedList = new LinkedList&lt;&gt;();
        linkedList.add(10);
        linkedList.add(20);
        linkedList.add(30);
        
        System.out.println("\nLinkedList before: " + linkedList);
        Collections.reverse(linkedList);
        System.out.println("LinkedList after: " + linkedList);
    }
}

This example shows that Collections.reverse works consistently
across different List implementations. Both ArrayList and LinkedList are
reversed in the same way, despite their different internal structures.

The output demonstrates that the method behaves identically for both list types.
The reversal operation is transparent to the list's implementation details.

## Reversing a Sublist

We can reverse a portion of a list by first obtaining a sublist view. This
example shows how to reverse only part of a list. The sublist is backed by the
original list, so changes affect it.

ReverseSublistExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReverseSublistExample {

    public static void main(String[] args) {
        
        List&lt;String&gt; fruits = new ArrayList&lt;&gt;();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Date");
        fruits.add("Elderberry");
        
        System.out.println("Original list: " + fruits);
        
        // Reverse elements from index 1 to 3 (exclusive)
        List&lt;String&gt; sublist = fruits.subList(1, 4);
        Collections.reverse(sublist);
        
        System.out.println("After reversing sublist: " + fruits);
    }
}

This example demonstrates reversing a portion of a list. We create a sublist
from index 1 to 3 (inclusive start, exclusive end) and reverse it. The original
list reflects these changes.

The output shows that only the specified portion of the list was reversed. This
technique is useful when you need to reverse only part of a larger collection.

## Reversing an Unmodifiable List

Attempting to reverse an unmodifiable list throws an exception. This example
shows what happens when trying to reverse a list created with
Collections.unmodifiableList.

UnmodifiableListReverse.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableListReverse {

    public static void main(String[] args) {
        
        List&lt;String&gt; original = new ArrayList&lt;&gt;();
        original.add("One");
        original.add("Two");
        original.add("Three");
        
        List&lt;String&gt; unmodifiable = 
            Collections.unmodifiableList(original);
        
        System.out.println("Original: " + original);
        System.out.println("Unmodifiable: " + unmodifiable);
        
        try {
            Collections.reverse(unmodifiable);
        } catch (UnsupportedOperationException e) {
            System.out.println("\nException caught: " + e.getMessage());
        }
    }
}

This example demonstrates that unmodifiable lists cannot be reversed. We create
an unmodifiable view of a list and attempt to reverse it. This throws an
UnsupportedOperationException.

The output shows the exception message. To reverse such lists, you'd need to
create a new modifiable copy first. This is a safety feature of unmodifiable
collections.

## Performance Considerations

This example compares the performance of reversing different list types. ArrayList
typically performs better than LinkedList for reversal due to random access.

ReversePerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class ReversePerformance {

    public static void main(String[] args) {
        
        final int SIZE = 100000;
        
        // ArrayList test
        List&lt;Integer&gt; arrayList = new ArrayList&lt;&gt;(SIZE);
        for (int i = 0; i &lt; SIZE; i++) {
            arrayList.add(i);
        }
        
        long start = System.currentTimeMillis();
        Collections.reverse(arrayList);
        long duration = System.currentTimeMillis() - start;
        System.out.println("ArrayList reverse time: " + duration + "ms");
        
        // LinkedList test
        List&lt;Integer&gt; linkedList = new LinkedList&lt;&gt;();
        for (int i = 0; i &lt; SIZE; i++) {
            linkedList.add(i);
        }
        
        start = System.currentTimeMillis();
        Collections.reverse(linkedList);
        duration = System.currentTimeMillis() - start;
        System.out.println("LinkedList reverse time: " + duration + "ms");
    }
}

This example measures the time taken to reverse large ArrayList and
LinkedList instances. ArrayList generally performs
better due to its random-access capability.

The output shows the time difference between reversing the two list types. For
most applications, the difference is negligible, but it's good to be aware of
the performance characteristics.

## Reversing a List of Custom Objects

Collections.reverse works with lists containing any object type.
This example demonstrates reversing a list of custom Person objects.

CustomObjectReverse.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

record Person(String name, int age) {}

public class CustomObjectReverse {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Charlie", 35));

        System.out.println("Original order:");
        people.forEach(System.out::println);

        Collections.reverse(people);

        System.out.println("\nReversed order:");
        people.forEach(System.out::println);
    }
}

This example shows that Collections.reverse works with custom
objects just as it does with primitive wrappers or strings. We create a list
of Person objects and reverse it.

The output demonstrates that the order of Person objects in the list is
reversed. The method doesn't care about object contents, only their positions.

## Combining reverse with Other Operations

This example shows how Collections.reverse can be combined with
other list operations. We sort a list and then reverse it to get descending
order.

ReverseWithSort.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReverseWithSort {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        numbers.add(5);
        numbers.add(2);
        numbers.add(8);
        numbers.add(1);
        numbers.add(9);
        
        System.out.println("Original: " + numbers);
        
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);
        
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);
    }
}

This example demonstrates a common pattern: sorting followed by reversal to
get descending order. First we sort the list in natural order, then reverse it.

The output shows the transformation from original to sorted to reversed order.
This technique is often more efficient than using a custom comparator for
descending sort.

## Source

[Java Collections.reverse Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#reverse-java.util.List-)

In this article, we've explored the Java Collections.reverse method
in depth. We've covered basic usage, different list types, performance, and
combining with other operations. This method is a powerful tool for list
manipulation.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).