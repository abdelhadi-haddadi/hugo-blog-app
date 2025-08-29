+++
title = "Java Collections.copy Method"
date = 2025-08-29T19:58:17.908+01:00
draft = false
description = "Complete Java Collections.copy method tutorial with examples. Learn how to copy elements between lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.copy Method

Last modified: April 20, 2025

 

The Collections.copy method is a utility method in Java's
java.util.Collections class. It copies all elements from one
list into another. The destination list must be at least as long as the
source list.

This method is useful when you need to transfer elements between lists while
maintaining the destination list's capacity. It performs a shallow copy,
meaning object references are copied, not the objects themselves.

## Collections.copy Method Overview

The Collections.copy method signature is:
public static &lt;T&gt; void copy(List&lt;? super T&gt; dest, List&lt;? extends T&gt; src).
It throws IndexOutOfBoundsException if the destination list is
too small, and UnsupportedOperationException if the destination
is unmodifiable.

The method preserves the order of elements and overwrites existing elements
in the destination list. It's more efficient than manual copying for large
lists, as it uses native array copying internally.

## Basic Copy Operation

This example demonstrates the basic usage of Collections.copy.
We create two ArrayLists and copy elements from the source to the destination.
The destination list must have sufficient capacity to hold all elements.

BasicCopyExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicCopyExample {

    public static void main(String[] args) {
        
        // Source list
        List&lt;String&gt; source = new ArrayList&lt;&gt;();
        source.add("Apple");
        source.add("Banana");
        source.add("Cherry");
        
        // Destination list (must have same or larger size)
        List&lt;String&gt; destination = new ArrayList&lt;&gt;();
        destination.add("X");
        destination.add("Y");
        destination.add("Z");
        destination.add("W"); // Extra element
        
        System.out.println("Before copy:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);
        
        // Perform the copy
        Collections.copy(destination, source);
        
        System.out.println("\nAfter copy:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);
    }
}

This code shows the basic copy operation between two lists. The destination
list must have at least as many elements as the source list. The extra
element "W" remains in the destination list after copying.

The output demonstrates that elements are overwritten in the destination list
while maintaining order. The source list remains unchanged after the operation.

## Copying Between Different List Types

Collections.copy works with any List implementation.
This example copies from an ArrayList to a LinkedList.
The method is flexible with different list implementations as long as they
support the required operations.

DifferentListTypes.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class DifferentListTypes {

    public static void main(String[] args) {
        
        // ArrayList source
        List&lt;Integer&gt; arraySource = new ArrayList&lt;&gt;();
        arraySource.add(10);
        arraySource.add(20);
        arraySource.add(30);
        
        // LinkedList destination
        List&lt;Integer&gt; linkedDest = new LinkedList&lt;&gt;();
        linkedDest.add(0);
        linkedDest.add(0);
        linkedDest.add(0);
        
        System.out.println("Before copy:");
        System.out.println("Source: " + arraySource);
        System.out.println("Destination: " + linkedDest);
        
        Collections.copy(linkedDest, arraySource);
        
        System.out.println("\nAfter copy:");
        System.out.println("Source: " + arraySource);
        System.out.println("Destination: " + linkedDest);
    }
}

This example demonstrates interoperability between different List
implementations. The copy operation works the same way regardless of the
specific list implementations used.

The output shows that elements are successfully copied from the
ArrayList to the LinkedList. The destination list's
implementation doesn't affect the copying behavior.

## Handling IndexOutOfBoundsException

This example shows what happens when the destination list is too small for
the source list. Collections.copy throws an
IndexOutOfBoundsException in this case. Proper error handling
is important when working with this method.

CopyExceptionHandling.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CopyExceptionHandling {

    public static void main(String[] args) {
        
        List&lt;String&gt; source = new ArrayList&lt;&gt;();
        source.add("Red");
        source.add("Green");
        source.add("Blue");
        
        List&lt;String&gt; destination = new ArrayList&lt;&gt;();
        destination.add("One");
        destination.add("Two"); // Too small
        
        try {
            System.out.println("Attempting copy...");
            Collections.copy(destination, source);
            System.out.println("Copy succeeded");
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Destination list must be at least " + 
                source.size() + " elements long");
        }
    }
}

This code demonstrates the exception that occurs when the destination list is
too small. The error message clearly indicates the problem - the destination
list must be at least as large as the source list.

The output shows the exception handling in action. Always ensure the destination
list has sufficient capacity before calling Collections.copy.

## Copying with Custom Objects

Collections.copy works with custom objects just as it does with
built-in types. This example demonstrates copying a list of custom
Person objects. The copy is shallow - object references are copied,
not the objects themselves.

CustomObjectsCopy.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Person {
    String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

public class CustomObjectsCopy {

    public static void main(String[] args) {
        
        List&lt;Person&gt; source = new ArrayList&lt;&gt;();
        source.add(new Person("Alice", 25));
        source.add(new Person("Bob", 30));
        
        List&lt;Person&gt; destination = new ArrayList&lt;&gt;();
        destination.add(new Person("X", 0));
        destination.add(new Person("Y", 0));
        
        System.out.println("Before copy:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);
        
        Collections.copy(destination, source);
        
        System.out.println("\nAfter copy:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);
        
        source.getFirst().name = "Modified";
        System.out.println("\nAfter modification:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);
    }
}

This example shows that Collections.copy performs a shallow copy.
The Person objects in the destination list are the same objects as in the
source list. Modifying an object through one list affects both lists.

The output demonstrates that while the lists are separate, they contain
references to the same objects. This is an important consideration when
working with mutable objects.

## Copying to an Unmodifiable List

Attempting to copy to an unmodifiable list results in an
UnsupportedOperationException. This example demonstrates this
behavior and shows how to handle it properly.

UnmodifiableListCopy.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableListCopy {

    public static void main(String[] args) {
        
        List&lt;String&gt; source = new ArrayList&lt;&gt;();
        source.add("Java");
        source.add("Python");
        
        List&lt;String&gt; destination = Collections.unmodifiableList(
            new ArrayList&lt;&gt;(Collections.nCopies(2, "")));
        
        try {
            System.out.println("Attempting to copy to unmodifiable list...");
            Collections.copy(destination, source);
        } catch (UnsupportedOperationException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Cannot copy to an unmodifiable list");
        }
    }
}

This code attempts to copy to an unmodifiable list, which throws an exception.
The Collections.unmodifiableList wrapper prevents all modifications
to the list, including through the copy method.

## Source

[Java Collections.copy Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#copy-java.util.List-java.util.List-)

In this article, we've explored the Collections.copy method in
depth. We've covered basic usage, exception handling, and various practical
examples. Understanding this method helps when working with list operations in
Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).