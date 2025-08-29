+++
title = "Java Collections.checkedCollection Method"
date = 2025-08-29T19:58:15.690+01:00
draft = false
description = "Complete Java Collections.checkedCollection tutorial with examples. Learn how to use type-safe collections in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.checkedCollection Method

Last modified: April 20, 2025

 

The Collections.checkedCollection method provides runtime type safety
for Java collections. It returns a dynamically type-safe view of the specified
collection. Any attempt to insert an element of the wrong type will result in an
immediate ClassCastException.

This method is particularly useful when working with legacy code or APIs that
don't use generics. It helps catch type errors at the point of insertion rather
than later during element access. The checked collection wrapper enforces type
constraints at runtime.

## Collections.checkedCollection Overview

The checkedCollection method was introduced in Java 5 to address
type safety issues with generics. It wraps an existing collection and performs
runtime type checks on all insertions. The original collection remains
accessible through the wrapper.

The method signature is static &lt;E&gt; Collection&lt;E&gt; checkedCollection(Collection&lt;E&gt; c, Class&lt;E&gt; type).
It takes the collection to wrap and the Class object representing the element
type. All modifications to the returned collection are reflected in the original.

## Basic checkedCollection Usage

This example demonstrates the basic usage of Collections.checkedCollection.
We create a regular ArrayList and then wrap it with a type-checked version. The
example shows both valid and invalid operations.

BasicCheckedCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class BasicCheckedCollection {

    public static void main(String[] args) {
        
        Collection&lt;String&gt; names = new ArrayList&lt;&gt;();
        names.add("John");
        names.add("Alice");
        
        // Create type-safe checked collection
        Collection&lt;String&gt; checkedNames = 
            Collections.checkedCollection(names, String.class);
        
        // Valid operation
        checkedNames.add("Bob");
        System.out.println("Valid add: " + checkedNames);
        
        try {
            // Invalid operation - adding wrong type
            Collection rawCollection = checkedNames;
            rawCollection.add(42); // Should throw ClassCastException
        } catch (ClassCastException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This code first creates a regular ArrayList of Strings. We then wrap it with
checkedCollection, specifying String.class as the element type.
The wrapper allows valid String additions but rejects invalid types.

The example demonstrates how the checked collection catches type mismatches
immediately. Without the wrapper, the error might go unnoticed until much later,
making debugging more difficult.

## Working with Legacy Code

checkedCollection is particularly useful when interfacing with
legacy code that doesn't use generics. This example shows how to safely
integrate non-generic code with generic collections using runtime type checking.

LegacyCodeIntegration.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class LegacyCodeIntegration {

    public static void main(String[] args) {
        
        // Modern generic collection
        Collection&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        numbers.add(1);
        numbers.add(2);
        
        // Wrap with checked collection
        Collection&lt;Integer&gt; checkedNumbers = 
            Collections.checkedCollection(numbers, Integer.class);
        
        // Pass to legacy method
        processLegacyCollection(checkedNumbers);
        
        System.out.println("After legacy processing: " + numbers);
    }
    
    // Legacy method without generics
    private static void processLegacyCollection(Collection rawCollection) {
        rawCollection.add(3); // Valid
        try {
            rawCollection.add("Four"); // Invalid
        } catch (ClassCastException e) {
            System.out.println("Legacy code caught: " + e.getMessage());
        }
    }
}

This example demonstrates how checkedCollection can protect generic
collections when passed to legacy code. The wrapper ensures type safety even when
the receiving code doesn't use generics. The legacy method can still add valid
elements but gets immediate feedback for invalid ones.

The output shows that valid additions succeed while invalid ones are caught. This
approach helps gradually modernize legacy code while maintaining type safety.

## Checked Collection with Custom Objects

checkedCollection works with custom objects just as well as with
built-in types. This example demonstrates using it with a custom Person class to
ensure only Person objects can be added to the collection.

CustomObjectCheckedCollection.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return "Person{" + "name=" + name + '}';
    }
}

public class CustomObjectCheckedCollection {

    public static void main(String[] args) {
        
        Collection&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("John"));
        
        Collection&lt;Person&gt; checkedPeople = 
            Collections.checkedCollection(people, Person.class);
        
        // Valid addition
        checkedPeople.add(new Person("Alice"));
        System.out.println("Valid additions: " + checkedPeople);
        
        try {
            // Invalid addition
            checkedPeople.add("Not a person");
        } catch (ClassCastException e) {
            System.out.println("Caught invalid addition: " + e.getMessage());
        }
    }
}

This example creates a custom Person class and a collection to hold Person
objects. We wrap the collection with checkedCollection to ensure
only Person objects can be added. The wrapper successfully catches attempts to
add incompatible types.

The output shows that valid Person objects are added normally, while invalid
types trigger an immediate exception. This enforcement happens at runtime,
providing strong type safety guarantees.

## Performance Considerations

While checkedCollection provides valuable type safety, it does
incur a small performance overhead. This example demonstrates how to measure
the impact and when the trade-off is worthwhile.

CheckedCollectionPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class CheckedCollectionPerformance {

    private static final int ITERATIONS = 100000;

    public static void main(String[] args) {
        
        Collection&lt;Integer&gt; regular = new ArrayList&lt;&gt;();
        Collection&lt;Integer&gt; checked = 
            Collections.checkedCollection(new ArrayList&lt;&gt;(), Integer.class);
        
        // Test regular collection
        long start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            regular.add(i);
        }
        long regularTime = System.currentTimeMillis() - start;
        
        // Test checked collection
        start = System.currentTimeMillis();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            checked.add(i);
        }
        long checkedTime = System.currentTimeMillis() - start;
        
        System.out.println("Regular collection time: " + regularTime + "ms");
        System.out.println("Checked collection time: " + checkedTime + "ms");
        System.out.println("Overhead: " + 
            (100.0 * (checkedTime - regularTime) / regularTime) + "%");
    }
}

This performance test compares operations on a regular collection versus a
checked collection. We perform the same number of additions to both and measure
the time difference. The results show the runtime type checking overhead.

While the overhead is measurable, it's often negligible compared to the benefits
of early type error detection. The exact impact depends on the use case and
collection size. For most applications, the safety benefits outweigh the small
performance cost.

## Combining with Other Collection Wrappers

checkedCollection can be combined with other collection wrappers
like unmodifiableCollection for comprehensive protection. This
example shows how to create a collection that's both type-safe and immutable.

CombinedWrappers.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class CombinedWrappers {

    public static void main(String[] args) {
        
        Collection&lt;Double&gt; temperatures = new ArrayList&lt;&gt;();
        temperatures.add(23.5);
        temperatures.add(18.2);
        
        // Create checked and unmodifiable view
        Collection&lt;Double&gt; safeTemps = Collections.unmodifiableCollection(
            Collections.checkedCollection(temperatures, Double.class));
        
        System.out.println("Initial collection: " + safeTemps);
        
        try {
            // Attempt type violation
            Collection raw = safeTemps;
            raw.add("Hot");
        } catch (ClassCastException e) {
            System.out.println("Caught type violation: " + e.getMessage());
        }
        
        try {
            // Attempt modification
            safeTemps.add(25.0);
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught modification attempt: " + e.getMessage());
        }
    }
}

This example creates a collection that's protected against both type violations
and modifications. We first wrap with checkedCollection for type
safety, then with unmodifiableCollection to prevent changes. The
result is a fully protected view of the original collection.

The output demonstrates that both type violations and modification attempts are
caught immediately. This combination is useful when providing read-only access
to collections while maintaining type safety.

## Real-world Use Case: API Boundary Protection

A practical use for checkedCollection is protecting API boundaries.
This example shows how to use it when accepting collections from external code
to ensure they contain only the expected types.

ApiBoundaryProtection.java
  

package com.zetcode;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ApiBoundaryProtection {

    public static void main(String[] args) {
        
        // Simulate external input
        Set rawInput = new HashSet();
        rawInput.add("Valid");
        rawInput.add(42); // Oops, wrong type
        
        try {
            processUserData(rawInput);
        } catch (ClassCastException e) {
            System.out.println("API rejected invalid input: " + e.getMessage());
        }
    }
    
    public static void processUserData(Collection&lt;String&gt; userData) {
        // Wrap with checked collection at API boundary
        Collection&lt;String&gt; safeData = 
            Collections.checkedCollection(userData, String.class);
        
        System.out.println("Processing data: " + safeData);
        // Process the data...
    }
}

This example simulates an API method that accepts a collection of Strings from
external code. By wrapping the input with checkedCollection at the
API boundary, we ensure any invalid elements are detected immediately. The
wrapper catches the Integer mistakenly added to what should be a String
collection.

The output shows the API properly rejecting invalid input. This pattern is
especially valuable in public APIs where you can't control all calling code but
need to maintain type safety internally.

## Source

[Java Collections.checkedCollection Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#checkedCollection-java.util.Collection-java.lang.Class-)

In this tutorial, we've explored the Collections.checkedCollection
method in depth. We've covered basic usage, legacy code integration, performance,
and practical applications. This utility is invaluable for maintaining runtime
type safety in Java collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).