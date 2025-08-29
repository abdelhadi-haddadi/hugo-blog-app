+++
title = "Java Collections.checkedSet Method"
date = 2025-08-29T19:58:16.781+01:00
draft = false
description = "Complete Java Collections.checkedSet tutorial with examples. Learn how to use type-safe sets in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.checkedSet Method

Last modified: April 20, 2025

 

The Collections.checkedSet method returns a dynamically type-safe
view of the specified set. This wrapper ensures that only elements of the
specified type can be added to the set. It helps catch type mismatches at
runtime rather than allowing them to cause problems later.

This method is particularly useful when working with legacy code or when you
need to enforce type safety in collections that might be accessed by
untrusted code. The checked set will throw a ClassCastException
immediately if an attempt is made to insert an element of the wrong type.

## Collections.checkedSet Overview

The checkedSet method is part of the java.util.Collections
utility class. It takes a Set and a Class object as parameters and returns a
new Set that enforces type checking. The returned set is backed by the original
set, so changes to one are reflected in the other.

The primary purpose is to provide runtime type safety. While generics provide
compile-time type checking, they are erased at runtime. checkedSet
adds runtime checking to catch cases where raw types or unchecked casts might
otherwise allow incorrect elements to be added.

## Basic checkedSet Usage

This example demonstrates the basic usage of Collections.checkedSet.
We create a regular HashSet and then wrap it with a checked set that enforces
String elements. The example shows both valid and invalid operations.

BasicCheckedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class BasicCheckedSet {

    public static void main(String[] args) {
        
        Set&lt;String&gt; regularSet = new HashSet&lt;&gt;();
        Set&lt;String&gt; checkedSet = Collections.checkedSet(regularSet, String.class);
        
        // Valid operation - adding a String
        checkedSet.add("Hello");
        checkedSet.add("World");
        System.out.println("Checked set: " + checkedSet);
        
        // Invalid operation - trying to add non-String
        try {
            checkedSet.add(42); // This will throw ClassCastException
        } catch (ClassCastException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This code creates a type-safe view of a Set that only accepts String elements.
The first addition works fine, but attempting to add an Integer throws a
ClassCastException. The exception occurs immediately when the
wrong type is added, making debugging easier.

The output shows the successful addition of Strings and the caught exception
when trying to add an Integer. This demonstrates the runtime type checking
provided by checkedSet.

## Checked Set with Legacy Code

This example shows how checkedSet can help when working with
legacy code that doesn't use generics. We create a raw Set and then wrap it
with a checked set to enforce type safety.

LegacyCodeCheckedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class LegacyCodeCheckedSet {

    public static void main(String[] args) {
        
        // Legacy code using raw type
        Set rawSet = new HashSet();
        rawSet.add("First");
        rawSet.add("Second");
        
        // Wrap with checked set
        Set&lt;String&gt; checkedSet = Collections.checkedSet(rawSet, String.class);
        
        // Valid operation
        checkedSet.add("Third");
        System.out.println("Checked set contents: " + checkedSet);
        
        // Attempt to bypass type safety
        try {
            rawSet.add(123); // This will throw ClassCastException
        } catch (ClassCastException e) {
            System.out.println("Caught exception from raw set: " + e.getMessage());
        }
    }
}

This example demonstrates how checkedSet can enforce type safety
even when working with raw types. The checked set monitors all additions to
the underlying set, whether through the checked view or directly through the
raw set reference.

The output shows that attempting to add an Integer through the raw set
reference still triggers the type checking. This makes checkedSet
valuable for gradually introducing type safety to legacy code.

## Checked Set with Different Types

This example demonstrates using checkedSet with different element
types. We create checked sets for different classes and show how they enforce
their respective type constraints.

DifferentTypeCheckedSets.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class DifferentTypeCheckedSets {

    public static void main(String[] args) {
        
        // String checked set
        Set&lt;String&gt; stringSet = Collections.checkedSet(new HashSet&lt;&gt;(), String.class);
        stringSet.add("Text");
        // stringSet.add(123); // Compile-time error
        
        // Integer checked set
        Set&lt;Integer&gt; intSet = Collections.checkedSet(new HashSet&lt;&gt;(), Integer.class);
        intSet.add(123);
        // intSet.add("Text"); // Compile-time error
        
        // Custom class checked set
        Set&lt;Person&gt; personSet = Collections.checkedSet(new HashSet&lt;&gt;(), Person.class);
        personSet.add(new Person("Alice"));
        
        System.out.println("String set: " + stringSet);
        System.out.println("Integer set: " + intSet);
        System.out.println("Person set: " + personSet);
    }
    
    static class Person {
        String name;
        
        Person(String name) {
            this.name = name;
        }
        
        @Override
        public String toString() {
            return name;
        }
    }
}

This example shows checkedSet working with different types:
Strings, Integers, and a custom Person class. Each checked set enforces its
specific type constraint, preventing incorrect elements from being added.

The commented lines show attempts to add wrong types that would cause
compile-time errors with generics. The runtime checking provided by
checkedSet adds an additional layer of protection against
type violations.

## Checked Set Performance Considerations

This example explores the performance impact of using checkedSet.
We compare operations on a regular Set versus a checked Set to understand the
overhead of runtime type checking.

CheckedSetPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class CheckedSetPerformance {

    public static void main(String[] args) {
        
        final int ELEMENT_COUNT = 100000;
        
        Set&lt;Integer&gt; regularSet = new HashSet&lt;&gt;();
        Set&lt;Integer&gt; checkedSet = Collections.checkedSet(new HashSet&lt;&gt;(), Integer.class);
        
        // Measure regular set add performance
        long start = System.nanoTime();
        for (int i = 0; i &lt; ELEMENT_COUNT; i++) {
            regularSet.add(i);
        }
        long regularTime = System.nanoTime() - start;
        
        // Measure checked set add performance
        start = System.nanoTime();
        for (int i = 0; i &lt; ELEMENT_COUNT; i++) {
            checkedSet.add(i);
        }
        long checkedTime = System.nanoTime() - start;
        
        System.out.println("Regular set add time: " + regularTime / 1_000_000 + " ms");
        System.out.println("Checked set add time: " + checkedTime / 1_000_000 + " ms");
        System.out.println("Overhead: " + 
            (100 * (checkedTime - regularTime) / regularTime) + "%");
    }
}

This code measures the performance difference between adding elements to a
regular Set and a checked Set. The type checking in checkedSet
adds some overhead to each operation, which this example quantifies.

The output shows the time taken for each operation and calculates the
percentage overhead. While there is some performance cost, it's often
worthwhile for the added type safety in critical code paths.

## Checked Set in Multithreaded Environment

This example demonstrates how checkedSet behaves in a multithreaded
environment. The checked set wrapper itself doesn't provide thread safety, but
it can be combined with synchronized wrappers for complete protection.

ThreadSafeCheckedSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ThreadSafeCheckedSet {

    public static void main(String[] args) throws InterruptedException {
        
        Set&lt;String&gt; baseSet = new HashSet&lt;&gt;();
        Set&lt;String&gt; safeSet = Collections.synchronizedSet(
            Collections.checkedSet(baseSet, String.class));
        
        Runnable task = () -&gt; {
            for (int i = 0; i &lt; 1000; i++) {
                safeSet.add(Thread.currentThread().getName() + "-" + i);
            }
        };
        
        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        
        t1.start();
        t2.start();
        
        t1.join();
        t2.join();
        
        System.out.println("Set size: " + safeSet.size());
    }
}

This example combines checkedSet with synchronizedSet
to create a Set that is both type-safe and thread-safe. Multiple threads can
safely add elements to the set without causing type violations or data
corruption.

The output shows the final size of the set after both threads have completed.
The combination of synchronization and type checking provides comprehensive
protection for concurrent access scenarios.

## Checked Set with Null Elements

This example explores how checkedSet handles null elements. The
type checking behavior differs slightly when dealing with null values compared
to regular elements.

CheckedSetWithNulls.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class CheckedSetWithNulls {

    public static void main(String[] args) {
        
        Set&lt;String&gt; checkedSet = Collections.checkedSet(new HashSet&lt;&gt;(), String.class);
        
        // Adding null to a checked set
        checkedSet.add(null);
        System.out.println("Set with null: " + checkedSet);
        
        // Removing null
        checkedSet.remove(null);
        System.out.println("Set after null removal: " + checkedSet);
        
        // Checking contains null
        System.out.println("Contains null? " + checkedSet.contains(null));
        
        // Trying with non-null values
        checkedSet.add("NotNull");
        System.out.println("Set with non-null: " + checkedSet);
    }
}

This example demonstrates that checkedSet allows null elements
regardless of the specified type. The type checking is only applied to non-null
elements, as null doesn't have a runtime type that can be checked.

The output shows that null can be added, removed, and checked for presence in
the set just like with a regular Set. This behavior is consistent with Java's
general handling of null in collections.

## Checked Set with Inheritance

This final example examines how checkedSet works with class
inheritance. We create a checked set using a superclass type and attempt to
add both superclass and subclass instances.

CheckedSetInheritance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class CheckedSetInheritance {

    public static void main(String[] args) {
        
        Set&lt;Number&gt; numberSet = Collections.checkedSet(new HashSet&lt;&gt;(), Number.class);
        
        // Adding various Number subclasses
        numberSet.add(Integer.valueOf(42));
        numberSet.add(Double.valueOf(3.14));
        numberSet.add(Float.valueOf(1.618f));
        
        System.out.println("Number set: " + numberSet);
        
        // Trying to add non-Number
        try {
            numberSet.add("Not a number");
        } catch (ClassCastException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This example shows that checkedSet respects Java's inheritance
rules. A checked set declared with a superclass type (Number) can accept
instances of any subclass (Integer, Double, Float), but rejects unrelated
types (String).

The output demonstrates successful addition of various Number subclasses and
the caught exception when attempting to add a String. This behavior matches
Java's standard polymorphism rules.

## Source

[Java Collections.checkedSet Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#checkedSet-java.util.Set-java.lang.Class-)

In this article, we've explored the Java Collections.checkedSet
method in depth. We've covered basic usage, legacy code integration, different
types, performance, threading, null handling, and inheritance. Understanding
checkedSet is valuable for creating more robust, type-safe
applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).