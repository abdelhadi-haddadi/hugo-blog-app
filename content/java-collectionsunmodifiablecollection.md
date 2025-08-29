+++
title = "Java Collections.unmodifiableCollection"
date = 2025-08-29T19:58:26.956+01:00
draft = false
description = "Complete Java Collections.unmodifiableCollection tutorial with examples. Learn how to create unmodifiable collections in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.unmodifiableCollection

Last modified: April 20, 2025

 

The Collections.unmodifiableCollection method is a utility method
in Java's Collections Framework. It returns an unmodifiable view of the
specified collection. This view prevents modifications to the underlying
collection.

Unmodifiable collections are useful when you need to provide read-only access
to data. They help enforce immutability and prevent accidental modifications.
The original collection can still be modified if you maintain a reference to it.

## Collections.unmodifiableCollection Overview

The unmodifiableCollection method is part of the
java.util.Collections class. It takes a collection as input and
returns an unmodifiable view of that collection. Any attempt to modify the
returned collection will throw an UnsupportedOperationException.

This method is one of several unmodifiable collection wrappers in the
Collections class. Similar methods exist for List, Set, Map, and other
collection types. The returned view is live - changes to the original
collection are visible through it.

## Basic unmodifiableCollection Example

This example demonstrates the basic usage of
Collections.unmodifiableCollection. We create a modifiable
ArrayList and then obtain an unmodifiable view of it. We show that the
original can still be modified but the view cannot.

BasicUnmodifiableCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class BasicUnmodifiableCollection {

    public static void main(String[] args) {
        
        Collection&lt;String&gt; modifiable = new ArrayList&lt;&gt;();
        modifiable.add("Apple");
        modifiable.add("Banana");
        
        Collection&lt;String&gt; unmodifiable = 
            Collections.unmodifiableCollection(modifiable);
        
        System.out.println("Original collection: " + modifiable);
        System.out.println("Unmodifiable view: " + unmodifiable);
        
        // Modify original - change is visible in unmodifiable view
        modifiable.add("Cherry");
        System.out.println("After adding to original: " + unmodifiable);
        
        try {
            // Attempt to modify unmodifiable view
            unmodifiable.add("Date");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify unmodifiable collection: " + e);
        }
    }
}

This code shows the fundamental behavior of unmodifiable collections. The
original collection remains modifiable, while the unmodifiable view throws
an exception on modification attempts. Changes to the original are reflected
in the view.

The output demonstrates that adding to the original collection affects the
unmodifiable view. However, attempting to modify the view directly results
in an exception. This is the expected behavior.

## Unmodifiable Collection with Different Types

The unmodifiableCollection method works with any Collection
implementation. This example shows it being used with different collection
types: ArrayList, HashSet, and LinkedList. The behavior is consistent
across all implementations.

DifferentCollectionTypes.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;

public class DifferentCollectionTypes {

    public static void main(String[] args) {
        
        // ArrayList example
        Collection&lt;String&gt; arrayList = new ArrayList&lt;&gt;();
        arrayList.add("Red");
        arrayList.add("Green");
        Collection&lt;String&gt; unmodArrayList = 
            Collections.unmodifiableCollection(arrayList);
        System.out.println("ArrayList unmodifiable: " + unmodArrayList);
        
        // HashSet example
        Collection&lt;Integer&gt; hashSet = new HashSet&lt;&gt;();
        hashSet.add(10);
        hashSet.add(20);
        Collection&lt;Integer&gt; unmodHashSet = 
            Collections.unmodifiableCollection(hashSet);
        System.out.println("HashSet unmodifiable: " + unmodHashSet);
        
        // LinkedList example
        Collection&lt;Double&gt; linkedList = new LinkedList&lt;&gt;();
        linkedList.add(3.14);
        linkedList.add(2.71);
        Collection&lt;Double&gt; unmodLinkedList = 
            Collections.unmodifiableCollection(linkedList);
        System.out.println("LinkedList unmodifiable: " + unmodLinkedList);
        
        // All throw UnsupportedOperationException on modification
        try {
            unmodArrayList.add("Blue");
        } catch (UnsupportedOperationException e) {
            System.out.println("ArrayList modification failed as expected");
        }
    }
}

This example demonstrates that unmodifiableCollection works
uniformly across different Collection implementations. The method doesn't
care about the specific implementation - it works with any Collection.

The output shows that regardless of whether the underlying collection is
an ArrayList, HashSet, or LinkedList, the unmodifiable view behaves the
same way. All modification attempts result in exceptions.

## Defensive Copy vs Unmodifiable View

This example compares two approaches to protecting collections from
modification: creating a defensive copy versus using an unmodifiable view.
Each approach has different characteristics and use cases.

DefensiveCopyVsUnmodifiable.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class DefensiveCopyVsUnmodifiable {

    public static void main(String[] args) {
        
        Collection&lt;String&gt; original = new ArrayList&lt;&gt;();
        original.add("One");
        original.add("Two");
        
        // Approach 1: Defensive copy
        Collection&lt;String&gt; defensiveCopy = new ArrayList&lt;&gt;(original);
        
        // Approach 2: Unmodifiable view
        Collection&lt;String&gt; unmodifiableView = 
            Collections.unmodifiableCollection(original);
        
        System.out.println("Original: " + original);
        System.out.println("Defensive copy: " + defensiveCopy);
        System.out.println("Unmodifiable view: " + unmodifiableView);
        
        // Modify original
        original.add("Three");
        
        System.out.println("\nAfter modifying original:");
        System.out.println("Original: " + original);
        System.out.println("Defensive copy unchanged: " + defensiveCopy);
        System.out.println("Unmodifiable view reflects change: " + unmodifiableView);
    }
}

This code highlights the key difference between defensive copies and
unmodifiable views. A defensive copy is a completely separate collection
that doesn't reflect changes to the original. An unmodifiable view is
a live view that shows changes to the original collection.

The output demonstrates that the defensive copy remains unchanged when
the original is modified, while the unmodifiable view shows the new
elements. Choose based on whether you want isolation or live updates.

## Unmodifiable Collection in Method Return

A common use case for unmodifiable collections is returning them from
methods. This example shows how to safely expose internal collections
without allowing external modification. The technique helps maintain
encapsulation.

MethodReturnExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

class Team {
    private Collection&lt;String&gt; members = new ArrayList&lt;&gt;();
    
    public Team() {
        members.add("Alice");
        members.add("Bob");
        members.add("Charlie");
    }
    
    // Safe way to expose the collection
    public Collection&lt;String&gt; getMembers() {
        return Collections.unmodifiableCollection(members);
    }
    
    // Controlled modification
    public void addMember(String name) {
        members.add(name);
    }
}

public class MethodReturnExample {

    public static void main(String[] args) {
        Team team = new Team();
        
        Collection&lt;String&gt; teamMembers = team.getMembers();
        System.out.println("Team members: " + teamMembers);
        
        // Attempt to modify - will throw exception
        try {
            teamMembers.add("Diana");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify team members directly");
        }
        
        // Proper way to add a member
        team.addMember("Diana");
        System.out.println("After proper addition: " + team.getMembers());
    }
}

This example demonstrates a good practice for exposing collections from
classes. Instead of returning the internal collection directly, we return
an unmodifiable view. This prevents external code from modifying our
internal state directly.

The output shows that attempts to modify the returned collection fail,
while proper modification through the class's methods works. This maintains
control over the collection's state.

## Nested Unmodifiable Collections

This example explores what happens when working with nested collections.
Making the outer collection unmodifiable doesn't automatically make
contained collections unmodifiable. We need to handle nesting carefully.

NestedCollections.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class NestedCollections {

    public static void main(String[] args) {
        
        Collection&lt;Collection&lt;String&gt;&gt; nested = new ArrayList&lt;&gt;();
        
        Collection&lt;String&gt; inner1 = new ArrayList&lt;&gt;();
        inner1.add("A");
        inner1.add("B");
        
        Collection&lt;String&gt; inner2 = new ArrayList&lt;&gt;();
        inner2.add("X");
        inner2.add("Y");
        
        nested.add(inner1);
        nested.add(inner2);
        
        Collection&lt;Collection&lt;String&gt;&gt; unmodifiableNested = 
            Collections.unmodifiableCollection(nested);
        
        System.out.println("Original nested: " + nested);
        System.out.println("Unmodifiable nested: " + unmodifiableNested);
        
        // Can't modify outer collection
        try {
            unmodifiableNested.add(new ArrayList&lt;&gt;());
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify outer collection");
        }
        
        // But can modify inner collections!
        inner1.add("C");
        System.out.println("After inner modification: " + unmodifiableNested);
    }
}

This code demonstrates that unmodifiable collections only protect one
level of the collection structure. While we can't add or remove inner
collections from the outer collection, we can still modify the inner
collections themselves.

The output shows that changes to the inner collections are reflected in
the unmodifiable view. For complete immutability, all nested collections
would need to be made unmodifiable as well.

## Performance Considerations

This example examines the performance characteristics of unmodifiable
collections. We compare operations on regular collections versus their
unmodifiable views. The overhead is minimal for read operations.

PerformanceComparison.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class PerformanceComparison {

    public static void main(String[] args) {
        final int SIZE = 1_000_000;
        final int ITERATIONS = 100;
        
        Collection&lt;Integer&gt; largeList = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; SIZE; i++) {
            largeList.add(i);
        }
        
        Collection&lt;Integer&gt; unmodifiable = 
            Collections.unmodifiableCollection(largeList);
        
        // Test iteration performance
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            for (Integer num : largeList) {
                // Just iterate
            }
        }
        long end = System.currentTimeMillis();
        System.out.println("Regular collection iteration: " + (end - start) + "ms");
        
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            for (Integer num : unmodifiable) {
                // Just iterate
            }
        }
        end = System.currentTimeMillis();
        System.out.println("Unmodifiable iteration: " + (end - start) + "ms");
        
        // Test contains performance
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            largeList.contains(SIZE / 2);
        }
        end = System.currentTimeMillis();
        System.out.println("Regular contains: " + (end - start) + "ms");
        
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            unmodifiable.contains(SIZE / 2);
        }
        end = System.currentTimeMillis();
        System.out.println("Unmodifiable contains: " + (end - start) + "ms");
    }
}

This performance test shows that read operations on unmodifiable
collections have negligible overhead compared to regular collections.
The unmodifiable wrapper doesn't add significant performance costs
for operations like iteration or contains checks.

The output demonstrates that iteration and search times are nearly
identical between the regular and unmodifiable collections. The
unmodifiable wrapper is a lightweight view that doesn't copy data.

## Source

[Java Collections.unmodifiableCollection Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableCollection-java.util.Collection-)

In this article, we've explored the Collections.unmodifiableCollection
method in depth. We've covered basic usage, different collection types,
performance characteristics, and common patterns. Understanding unmodifiable
collections is essential for writing robust Java code.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).