+++
title = "Java Collections.unmodifiableSet Method"
date = 2025-08-29T19:58:28.080+01:00
draft = false
description = "Complete Java Collections.unmodifiableSet tutorial with examples. Learn how to create immutable Set views in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.unmodifiableSet Method

Last modified: April 20, 2025

 

The Collections.unmodifiableSet method is part of Java's Collections
Framework. It returns an unmodifiable view of the specified set. This view
prevents modification operations while allowing read access to the set's elements.

Unmodifiable collections are useful when you need to provide read-only access to
data. They help enforce immutability and prevent accidental modifications. The
original set can still be modified if you maintain a reference to it.

## Basic Definitions

An **unmodifiable set** is a wrapper around an existing set that
blocks all modification attempts. It throws UnsupportedOperationException
for operations like add, remove, and clear.

The Collections.unmodifiableSet method is a static factory method
in the java.util.Collections class. It takes a Set as parameter
and returns an unmodifiable view of that Set.

## Creating an Unmodifiable Set

This example demonstrates the basic usage of Collections.unmodifiableSet.
We create a regular HashSet, then obtain an unmodifiable view of it. The example
shows both successful read operations and failed modification attempts.

BasicUnmodifiableSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class BasicUnmodifiableSet {

    public static void main(String[] args) {
        
        Set&lt;String&gt; colors = new HashSet&lt;&gt;();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        
        Set&lt;String&gt; unmodifiableColors = Collections.unmodifiableSet(colors);
        
        // Read operations work
        System.out.println("Set contains Red: " + unmodifiableColors.contains("Red"));
        System.out.println("Set size: " + unmodifiableColors.size());
        
        try {
            // Modification attempt throws exception
            unmodifiableColors.add("Yellow");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify unmodifiable set: " + e.getMessage());
        }
    }
}

In this example, we first create a mutable HashSet of colors. We then create an
unmodifiable view using Collections.unmodifiableSet. The example
shows that read operations like contains and size
work normally.

When we attempt to modify the set by adding a new color, an
UnsupportedOperationException is thrown. This demonstrates the
immutable nature of the returned view.

## Unmodifiable Set vs Original Set

This example illustrates the relationship between an unmodifiable set and its
backing set. Changes to the original set are reflected in the unmodifiable view,
but the view itself cannot be modified.

UnmodifiableSetRelationship.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class UnmodifiableSetRelationship {

    public static void main(String[] args) {
        
        Set&lt;Integer&gt; numbers = new HashSet&lt;&gt;();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        
        Set&lt;Integer&gt; unmodifiableNumbers = Collections.unmodifiableSet(numbers);
        
        System.out.println("Original set: " + numbers);
        System.out.println("Unmodifiable view: " + unmodifiableNumbers);
        
        // Modify original set
        numbers.add(4);
        System.out.println("After adding to original:");
        System.out.println("Original set: " + numbers);
        System.out.println("Unmodifiable view: " + unmodifiableNumbers);
        
        try {
            // Attempt to modify unmodifiable view
            unmodifiableNumbers.add(5);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify unmodifiable view");
        }
    }
}

This example shows that the unmodifiable set is a view of the original set. When
we add an element to the original set, the change is visible in the unmodifiable
view. However, we cannot modify the set through the unmodifiable view.

This behavior is important to understand when working with unmodifiable
collections. The immutability guarantee applies only to the view, not necessarily
to the underlying collection.

## Creating Truly Immutable Sets

To create a completely immutable set where neither the view nor the original can
be modified, we can use Java 9+'s Set.of or wrap a copy of the
original set. This example demonstrates both approaches.

TrulyImmutableSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class TrulyImmutableSet {

    public static void main(String[] args) {
        
        // Approach 1: Using Set.of (Java 9+)
        Set&lt;String&gt; immutableSet1 = Set.of("Apple", "Banana", "Cherry");
        
        // Approach 2: Wrapping a copy of the original set
        Set&lt;String&gt; original = new HashSet&lt;&gt;();
        original.add("Dog");
        original.add("Cat");
        original.add("Bird");
        
        Set&lt;String&gt; immutableSet2 = Collections.unmodifiableSet(new HashSet&lt;&gt;(original));
        
        System.out.println("Immutable Set 1: " + immutableSet1);
        System.out.println("Immutable Set 2: " + immutableSet2);
        
        try {
            immutableSet1.add("Orange");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify Set.of created set");
        }
        
        try {
            immutableSet2.add("Fish");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify wrapped copy set");
        }
        
        // Original can still be modified in approach 2
        original.add("Fish");
        System.out.println("Original modified: " + original);
        System.out.println("Immutable Set 2 remains unchanged: " + immutableSet2);
    }
}

This example demonstrates two ways to create truly immutable sets. The first
approach uses Java 9's Set.of which creates a completely immutable
set. The second approach creates an unmodifiable view of a copy of the original
set.

The key difference is that with the second approach, the original set can still
be modified, but these changes won't affect the immutable view since it's based
on a copy. Both approaches prevent modification through the returned set.

## Unmodifiable Set with Custom Objects

This example shows how Collections.unmodifiableSet works with custom
objects. The immutability applies only to the set structure, not to the objects
themselves. Objects in the set can still be modified if they're mutable.

UnmodifiableSetWithObjects.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return name;
    }
}

public class UnmodifiableSetWithObjects {

    public static void main(String[] args) {
        
        Set&lt;Person&gt; people = new HashSet&lt;&gt;();
        people.add(new Person("Alice"));
        people.add(new Person("Bob"));
        
        Set&lt;Person&gt; unmodifiablePeople = Collections.unmodifiableSet(people);
        
        System.out.println("Original set: " + people);
        System.out.println("Unmodifiable view: " + unmodifiablePeople);
        
        // Can't add or remove from unmodifiable set
        try {
            unmodifiablePeople.add(new Person("Charlie"));
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add to unmodifiable set");
        }
        
        // Can modify objects in the set
        for (Person p : unmodifiablePeople) {
            if (p.toString().equals("Alice")) {
                p.setName("Alicia");
            }
        }
        
        System.out.println("After modifying objects:");
        System.out.println("Original set: " + people);
        System.out.println("Unmodifiable view: " + unmodifiablePeople);
    }
}

This example demonstrates that while the set structure is immutable (you can't
add or remove elements), the objects contained in the set can still be modified
if they're mutable. We create a set of Person objects and make it unmodifiable.

While we can't add new Person objects to the set, we can modify the existing
Person objects. This shows that Collections.unmodifiableSet only
provides shallow immutability. For deep immutability, the objects themselves
must be immutable.

## Performance Considerations

Unmodifiable sets have minimal performance overhead as they're just wrappers
around existing sets. This example demonstrates the performance characteristics
of unmodifiable sets compared to regular sets.

UnmodifiableSetPerformance.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class UnmodifiableSetPerformance {

    public static void main(String[] args) {
        
        Set&lt;Integer&gt; largeSet = new HashSet&lt;&gt;();
        for (int i = 0; i &lt; 1000000; i++) {
            largeSet.add(i);
        }
        
        Set&lt;Integer&gt; unmodifiableSet = Collections.unmodifiableSet(largeSet);
        
        // Measure contains operation
        long start = System.nanoTime();
        boolean contains = unmodifiableSet.contains(999999);
        long end = System.nanoTime();
        System.out.println("Unmodifiable set contains: " + (end - start) + " ns");
        
        start = System.nanoTime();
        contains = largeSet.contains(999999);
        end = System.nanoTime();
        System.out.println("Regular set contains: " + (end - start) + " ns");
        
        // Measure iteration
        start = System.nanoTime();
        for (int num : unmodifiableSet) {
            // Just iterate
        }
        end = System.nanoTime();
        System.out.println("Unmodifiable set iteration: " + (end - start) + " ns");
        
        start = System.nanoTime();
        for (int num : largeSet) {
            // Just iterate
        }
        end = System.nanoTime();
        System.out.println("Regular set iteration: " + (end - start) + " ns");
    }
}

This example compares the performance of read operations between a regular
HashSet and its unmodifiable view. We measure both contains checks and full
set iteration. The results show that the performance overhead is negligible.

The unmodifiable wrapper adds minimal overhead to read operations since it's just
delegating to the underlying set. The main cost is the additional method call
overhead, which is insignificant for most use cases.

## Using Unmodifiable Sets in APIs

Unmodifiable sets are particularly useful when designing APIs where you want to
return a set but prevent callers from modifying it. This example demonstrates
this pattern.

ApiWithUnmodifiableSet.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

class Configuration {
    private Set&lt;String&gt; allowedDomains = new HashSet&lt;&gt;();
    
    public Configuration() {
        allowedDomains.add("example.com");
        allowedDomains.add("test.com");
        allowedDomains.add("demo.org");
    }
    
    public Set&lt;String&gt; getAllowedDomains() {
        return Collections.unmodifiableSet(allowedDomains);
    }
    
    public void addDomain(String domain) {
        allowedDomains.add(domain);
    }
}

public class ApiWithUnmodifiableSet {

    public static void main(String[] args) {
        
        Configuration config = new Configuration();
        
        Set&lt;String&gt; domains = config.getAllowedDomains();
        System.out.println("Allowed domains: " + domains);
        
        try {
            domains.add("hacker.com");
        } catch (UnsupportedOperationException e) {
            System.out.println("API prevents unauthorized domain addition");
        }
        
        // Proper way to add a domain
        config.addDomain("newdomain.com");
        System.out.println("Updated domains: " + config.getAllowedDomains());
    }
}

This example shows a Configuration class that maintains a set of allowed domains.
Instead of returning the mutable set directly, it returns an unmodifiable view.
This prevents unauthorized modifications while still allowing read access.

The class provides a controlled method (addDomain) for modifying the
set. This pattern is common in API design where you want to encapsulate the
modification logic while providing read access to collection data.

## Unmodifiable Set with Null Values

This example explores how Collections.unmodifiableSet handles null
values. The behavior depends on the underlying set implementation's support for
null values.

UnmodifiableSetWithNulls.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class UnmodifiableSetWithNulls {

    public static void main(String[] args) {
        
        // HashSet allows null
        Set&lt;String&gt; hashSet = new HashSet&lt;&gt;();
        hashSet.add(null);
        hashSet.add("Hello");
        
        Set&lt;String&gt; unmodifiableHashSet = Collections.unmodifiableSet(hashSet);
        System.out.println("HashSet with null: " + unmodifiableHashSet);
        
        // TreeSet doesn't allow null
        Set&lt;String&gt; treeSet = new TreeSet&lt;&gt;();
        try {
            treeSet.add(null);
        } catch (NullPointerException e) {
            System.out.println("TreeSet does not allow null values");
        }
        
        treeSet.add("World");
        Set&lt;String&gt; unmodifiableTreeSet = Collections.unmodifiableSet(treeSet);
        System.out.println("TreeSet without null: " + unmodifiableTreeSet);
    }
}

This example demonstrates that the behavior of an unmodifiable set with respect to
null values depends on the underlying set implementation. A HashSet
allows null values, so its unmodifiable view also contains null. A
TreeSet, however, does not allow null values due to its sorting
requirements, and attempting to add null results in a
NullPointerException.

When working with unmodifiable sets, ensure the underlying set implementation
supports the data you need to store, especially regarding null values.

## Source

[Java Collections.unmodifiableSet Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableSet-java.util.Set-)

In this tutorial, we've explored the Java Collections.unmodifiableSet
method in depth. We've covered basic usage, the relationship with the original set,
creating truly immutable sets, working with custom objects, performance
considerations, API design patterns, and handling null values. This method is
valuable for providing read-only access to set data while maintaining flexibility
to modify the underlying set when needed.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).