+++
title = "Java Collections.fill Method"
date = 2025-08-29T19:58:20.137+01:00
draft = false
description = "Complete Java Collections.fill tutorial with examples. Learn how to use Collections.fill method effectively."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.fill Method

Last modified: April 20, 2025

 

The Collections.fill method is a utility method in Java's
Collections Framework. It replaces all elements in a specified list with
a specified element. This method is part of the java.util.Collections
class.

The fill method is useful when you need to initialize or reset
all elements in a list to the same value. It works with any List implementation
and modifies the list in place. The method has a void return type.

## Collections.fill Method Overview

The Collections.fill method signature is:
public static &lt;T&gt; void fill(List&lt;? super T&gt; list, T obj).
It takes two parameters: the list to be filled and the element to fill it with.

The method throws UnsupportedOperationException if the list's
set operation is not supported. It replaces each element in the list with
the specified object. The list size remains unchanged.

## Basic Usage of Collections.fill

This example demonstrates the basic usage of Collections.fill.
We create an ArrayList of strings and fill it with a default value. The
example shows how all elements are replaced with the specified value.

CollectionsFillBasic.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsFillBasic {

    public static void main(String[] args) {
        
        List&lt;String&gt; colors = new ArrayList&lt;&gt;();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        
        System.out.println("Before fill: " + colors);
        
        // Fill the list with "Black"
        Collections.fill(colors, "Black");
        
        System.out.println("After fill: " + colors);
    }
}

In this example, we first create a list containing three color strings.
After printing the original list, we use Collections.fill to
replace all elements with "Black". The output shows the list before and
after the fill operation.

The fill operation modifies the existing list rather than creating a new one.
All original elements are replaced with the specified value.

## Filling a List of Integers

This example shows how to use Collections.fill with a list of
integers. We create a list with some initial values and then fill it with
a default number. The example demonstrates numeric filling.

CollectionsFillIntegers.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CollectionsFillIntegers {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        System.out.println("Original numbers: " + numbers);
        
        // Fill with zero
        Collections.fill(numbers, 0);
        
        System.out.println("After filling with zero: " + numbers);
    }
}

Here we use Arrays.asList to create a fixed-size list of integers.
We then fill the entire list with zeros using Collections.fill.
The output demonstrates the transformation of the list.

Note that Arrays.asList returns a fixed-size list backed by the
original array. While we can't add or remove elements, we can modify existing
ones using methods like fill.

## Filling a List with Custom Objects

This example demonstrates filling a list with custom objects. We create a
list of Person objects and fill it with a default Person instance. The
example shows object reference behavior.

CollectionsFillObjects.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

record Person(String name) {}

public class CollectionsFillObjects {

    public static void main(String[] args) {

        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("Alice"));
        people.add(new Person("Bob"));
        people.add(new Person("Charlie"));

        System.out.println("Before fill: " + people);

        // Fill with a default person
        Person defaultPerson = new Person("Unknown");
        Collections.fill(people, defaultPerson);

        System.out.println("After fill: " + people);
    }
}

This example creates a list of Person objects and fills it with a default
"Unknown" person. All elements in the list become references to the same
defaultPerson object after the fill operation.

When filling with objects, all list elements will reference the same object
instance. Any changes to this instance will be visible through all references.

## Filling a List with Null Values

This example shows how to fill a list with null values. We create a list
of strings and replace all elements with null. The example demonstrates
null handling in collections.

CollectionsFillNull.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsFillNull {

    public static void main(String[] args) {
        
        List&lt;String&gt; items = new ArrayList&lt;&gt;();
        items.add("Item1");
        items.add("Item2");
        items.add("Item3");
        
        System.out.println("Before fill: " + items);
        
        // Fill with null
        Collections.fill(items, null);
        
        System.out.println("After fill: " + items);
        
        // Check for null elements
        System.out.println("First element is null: " + (items.getFirst() == null));
    }
}

In this example, we fill a list with null values. After the operation, all
elements in the list become null. The example also demonstrates how to check
for null elements in the list.

Filling with null can be useful when you need to clear references or prepare
a list for new assignments. However, be cautious when working with null values
to avoid NullPointerException.

## Filling a Large List

This example demonstrates filling a large list with a default value. We create
a list with 1,000,000 elements and fill it with a default string. The example
shows performance considerations.

CollectionsFillLargeList.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class CollectionsFillLargeList {

    public static void main(String[] args) {
        
        // Create a large list with initial values
        List&lt;String&gt; bigList = IntStream.range(0, 1_000_000)
                .mapToObj(i -&gt; "Initial")
                .collect(Collectors.toList());
        
        System.out.println("List created with size: " + bigList.size());
        
        long startTime = System.currentTimeMillis();
        
        // Fill with default value
        Collections.fill(bigList, "Default");
        
        long endTime = System.currentTimeMillis();
        
        System.out.println("Filling took " + (endTime - startTime) + " ms");
        System.out.println("First element: " + bigList.getFirst());
        System.out.println("Last element: " + bigList.getLast());
    }
}

This example creates a large list using Java Streams and measures the time
taken to fill it. The Collections.fill operation is efficient
even for large lists as it simply iterates and sets each element.

The output shows the time taken for the fill operation and verifies that
both first and last elements were properly set to the default value.

## Filling a Sublist

This example shows how to fill only a portion of a list by using a sublist.
We create a list of numbers and fill only a specific range within it. The
example demonstrates partial list filling.

CollectionsFillSublist.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsFillSublist {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        for (int i = 1; i &lt;= 10; i++) {
            numbers.add(i);
        }
        
        System.out.println("Original list: " + numbers);
        
        // Fill only elements from index 3 to 7 (exclusive) with 0
        Collections.fill(numbers.subList(3, 7), 0);
        
        System.out.println("After partial fill: " + numbers);
    }
}

In this example, we use List.subList to create a view of a
portion of the original list. We then fill only this sublist with zeros,
leaving other elements unchanged. This technique allows for selective
modification of list sections.

The output shows the original list and the modified version where only
elements 4 through 6 (indices 3-6) were set to zero.

## Filling an Immutable List

This example demonstrates what happens when trying to fill an immutable
list. We create an unmodifiable list using Collections.unmodifiableList
and attempt to fill it. The example shows the expected exception.

CollectionsFillImmutable.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsFillImmutable {

    public static void main(String[] args) {
        
        List&lt;String&gt; mutable = new ArrayList&lt;&gt;();
        mutable.add("One");
        mutable.add("Two");
        mutable.add("Three");
        
        // Create unmodifiable list
        List&lt;String&gt; immutable = Collections.unmodifiableList(mutable);
        
        System.out.println("Original list: " + immutable);
        
        try {
            // Attempt to fill immutable list
            Collections.fill(immutable, "Zero");
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This example shows that Collections.fill cannot modify an
unmodifiable list. The operation throws an UnsupportedOperationException
when attempted on an immutable collection.

The output demonstrates the exception being caught and handled. This behavior
is consistent with other modification attempts on unmodifiable collections.

## Source

[Java Collections.fill Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#fill-java.util.List-T-)

In this article, we've explored the Java Collections.fill method
in depth. We've covered basic usage, filling with different types, performance
considerations, and edge cases. This method is a simple but powerful tool for
list manipulation.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).