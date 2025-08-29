+++
title = "Java Collections.unmodifiableList"
date = 2025-08-29T19:58:28.100+01:00
draft = false
description = "Complete Java Collections.unmodifiableList tutorial with examples. Learn how to create immutable lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.unmodifiableList

Last modified: April 20, 2025

 

The Collections.unmodifiableList method is part of Java's
Collections Framework. It provides a way to create immutable (unmodifiable)
views of lists. This is useful when you need to share a list but prevent
modifications.

An unmodifiable list is a wrapper around an existing list that throws
UnsupportedOperationException on modification attempts. The
original list can still be modified, and changes will be visible through
the unmodifiable view.

## Basic Definitions

An unmodifiable list is a read-only view of a list that cannot be modified
structurally. Structural modifications include adding, removing, or replacing
elements. The list's contents can still be accessed and iterated over normally.

The Collections.unmodifiableList method takes a List
as input and returns an unmodifiable view of that list. The returned list
implements all list operations but throws exceptions on modification attempts.

## Creating an Unmodifiable List

This example demonstrates the basic usage of Collections.unmodifiableList.
We create a mutable ArrayList, then obtain an unmodifiable view of it. The
example shows both successful read operations and failed modification attempts.

BasicUnmodifiableList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicUnmodifiableList {

    public static void main(String[] args) {
        
        List&lt;String&gt; mutableList = new ArrayList&lt;&gt;();
        mutableList.add("Apple");
        mutableList.add("Banana");
        mutableList.add("Cherry");
        
        // Create unmodifiable view
        List&lt;String&gt; unmodifiableList = 
            Collections.unmodifiableList(mutableList);
        
        // Can read elements
        System.out.println("First element: " + unmodifiableList.get(0));
        System.out.println("Size: " + unmodifiableList.size());
        
        try {
            // Attempt to modify
            unmodifiableList.add("Orange");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify: " + e.getMessage());
        }
        
        // Original can still be modified
        mutableList.add("Orange");
        System.out.println("Updated view: " + unmodifiableList);
    }
}

This code shows how to create and use an unmodifiable list. We first create a
mutable list and populate it with elements. Then we create an unmodifiable view
using Collections.unmodifiableList.

The example demonstrates that while we can't modify the unmodifiable view
directly, changes to the original list are reflected in the view. This makes
unmodifiable lists ideal for providing read-only access to internal data.

## Defensive Copy vs Unmodifiable View

This example compares creating a defensive copy of a list versus using an
unmodifiable view. A defensive copy creates a new independent list, while an
unmodifiable view is just a wrapper around the original.

CopyVsUnmodifiable.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CopyVsUnmodifiable {

    public static void main(String[] args) {
        
        List&lt;String&gt; original = new ArrayList&lt;&gt;();
        original.add("One");
        original.add("Two");
        
        // Defensive copy
        List&lt;String&gt; copy = new ArrayList&lt;&gt;(original);
        
        // Unmodifiable view
        List&lt;String&gt; unmodifiable = Collections.unmodifiableList(original);
        
        // Modify original
        original.add("Three");
        
        System.out.println("Original: " + original);
        System.out.println("Copy: " + copy);
        System.out.println("Unmodifiable view: " + unmodifiable);
    }
}

This example highlights the difference between a defensive copy and an
unmodifiable view. The defensive copy is completely independent of the original
list, while the unmodifiable view reflects changes to the original list.

The output shows that adding "Three" to the original list doesn't affect the
copy but is visible in the unmodifiable view. Choose between these approaches
based on whether you need isolation or just read-only access.

## Nested Unmodifiable Lists

When working with nested lists, creating an unmodifiable outer list doesn't
make the inner lists unmodifiable. This example demonstrates this behavior
and shows how to create a deeply unmodifiable structure.

NestedUnmodifiableLists.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NestedUnmodifiableLists {

    public static void main(String[] args) {
        
        List nested = new ArrayList&lt;&gt;();
        nested.add(new ArrayList&lt;&gt;(List.of("A", "B")));
        nested.add(new ArrayList&lt;&gt;(List.of("C", "D")));
        
        // Create unmodifiable view of outer list
        List unmodifiableOuter = 
            Collections.unmodifiableList(nested);
        
        // Can't modify outer list
        try {
            unmodifiableOuter.add(new ArrayList&lt;&gt;());
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify outer list");
        }
        
        // Can still modify inner lists
        unmodifiableOuter.get(0).add("X");
        System.out.println("Modified inner list: " + unmodifiableOuter);
        
        // Create deeply unmodifiable structure
        List deeplyUnmodifiable = nested.stream()
            .map(Collections::unmodifiableList)
            .toList();
        
        try {
            deeplyUnmodifiable.get(0).add("Y");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify inner lists either");
        }
    }
}

This example shows that Collections.unmodifiableList only makes
the outer list unmodifiable. The inner lists remain mutable unless explicitly
made unmodifiable. We demonstrate both scenarios.

The solution for creating a deeply unmodifiable structure uses Java streams
to apply unmodifiableList to each inner list, then collects them
into an immutable outer list. This provides complete immutability.

## Unmodifiable List from Java 9 List.of

Java 9 introduced the List.of factory methods that create
truly immutable lists. This example compares them with
Collections.unmodifiableList and shows their differences.

ListOfVsUnmodifiable.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ListOfVsUnmodifiable {

    public static void main(String[] args) {
        
        // Java 9+ immutable list
        List&lt;String&gt; listOf = List.of("Red", "Green", "Blue");
        
        // Traditional unmodifiable view
        List&lt;String&gt; mutable = new ArrayList&lt;&gt;();
        mutable.add("Red");
        mutable.add("Green");
        mutable.add("Blue");
        List&lt;String&gt; unmodifiable = Collections.unmodifiableList(mutable);
        
        // Both throw UnsupportedOperationException on modification
        try {
            listOf.add("Yellow");
        } catch (UnsupportedOperationException e) {
            System.out.println("listOf is immutable");
        }
        
        try {
            unmodifiable.add("Yellow");
        } catch (UnsupportedOperationException e) {
            System.out.println("unmodifiable is unmodifiable");
        }
        
        // Difference: listOf is truly immutable
        try {
            listOf.set(0, "Pink");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify listOf at all");
        }
        
        // unmodifiable reflects changes to original
        mutable.set(0, "Pink");
        System.out.println("unmodifiable shows changes: " + unmodifiable);
    }
}

This example highlights key differences between List.of and
Collections.unmodifiableList. While both prevent modifications,
List.of creates a truly immutable list with no backing mutable
source.

The Collections.unmodifiableList is just a view that reflects
changes to the original list. List.of is generally preferred for
creating immutable lists when the data is fixed and known upfront.

## Performance Considerations

This example examines the performance characteristics of unmodifiable lists
compared to regular lists. We measure the time taken for various operations
to understand the overhead.

UnmodifiableListPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableListPerformance {

    public static void main(String[] args) {
        
        final int SIZE = 1_000_000;
        List&lt;Integer&gt; mutable = new ArrayList&lt;&gt;(SIZE);
        for (int i = 0; i &lt; SIZE; i++) {
            mutable.add(i);
        }
        
        // Create unmodifiable view
        List&lt;Integer&gt; unmodifiable = Collections.unmodifiableList(mutable);
        
        // Measure iteration time
        long start = System.nanoTime();
        for (int num : unmodifiable) {
            // Just iterate
        }
        long end = System.nanoTime();
        System.out.printf("Iteration time: %d ms%n", (end - start) / 1_000_000);
        
        // Measure get operation
        start = System.nanoTime();
        for (int i = 0; i &lt; 1000; i++) {
            unmodifiable.get(i);
        }
        end = System.nanoTime();
        System.out.printf("Get operations: %d ns per get%n", (end - start) / 1000);
        
        // Measure size operation
        start = System.nanoTime();
        for (int i = 0; i &lt; 1000; i++) {
            unmodifiable.size();
        }
        end = System.nanoTime();
        System.out.printf("Size operations: %d ns per size%n", (end - start) / 1000);
    }
}

This performance test shows that unmodifiable lists have minimal overhead for
read operations. The wrapper delegates all read operations to the underlying
list, so performance is nearly identical to the original mutable list.

The measurements demonstrate that iteration, element access, and size checking
are just as fast with unmodifiable lists. The only performance impact comes
from the additional method call indirection, which is negligible in most cases.

## Thread Safety with Unmodifiable Lists

While unmodifiable lists prevent modification through the view, they don't
automatically make the list thread-safe. This example demonstrates thread
safety considerations when using unmodifiable lists.

UnmodifiableListThreadSafety.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableListThreadSafety {

    public static void main(String[] args) throws InterruptedException {
        
        List&lt;String&gt; sharedList = new ArrayList&lt;&gt;();
        sharedList.add("Initial");
        
        // Create unmodifiable view
        List&lt;String&gt; unmodifiable = Collections.unmodifiableList(sharedList);
        
        // Thread that reads from unmodifiable view
        Thread reader = new Thread(() -&gt; {
            for (int i = 0; i &lt; 5; i++) {
                System.out.println("Reader sees: " + unmodifiable);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        // Thread that modifies original list
        Thread writer = new Thread(() -&gt; {
            for (int i = 1; i &lt;= 3; i++) {
                sharedList.add("Update " + i);
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        reader.start();
        writer.start();
        
        reader.join();
        writer.join();
        
        System.out.println("Final state: " + unmodifiable);
    }
}

This example demonstrates that while the unmodifiable view itself is thread-safe
for reading, the underlying list may still be modified by other threads. The
reader thread sees the changes made by the writer thread through the
unmodifiable view.

If true thread safety is required, consider using CopyOnWriteArrayList
or synchronizing access to the original list. The unmodifiable wrapper only
prevents modification through that specific reference, not through other
references to the original list.

## Real-world Use Case: API Design

This example shows a practical use of Collections.unmodifiableList
in API design, where we want to expose internal data without allowing
modifications.

UnmodifiableListAPI.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableListAPI {

    private final List&lt;String&gt; internalData = new ArrayList&lt;&gt;();
    
    public UnmodifiableListAPI() {
        internalData.add("Data1");
        internalData.add("Data2");
    }
    
    /**
     * Returns an unmodifiable view of the internal data.
     * Clients can read but not modify the list.
     */
    public List&lt;String&gt; getData() {
        return Collections.unmodifiableList(internalData);
    }
    
    // Internal method to modify the data
    public void addData(String item) {
        internalData.add(item);
    }
    
    public static void main(String[] args) {
        UnmodifiableListAPI api = new UnmodifiableListAPI();
        
        // Get unmodifiable view
        List&lt;String&gt; data = api.getData();
        System.out.println("Initial data: " + data);
        
        // Try to modify (will fail)
        try {
            data.add("Data3");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify returned list");
        }
        
        // Modify through internal method
        api.addData("Data3");
        System.out.println("Updated data: " + api.getData());
    }
}

This example demonstrates using Collections.unmodifiableList in a
class that exposes internal data through a public API. The getData
method returns an unmodifiable view, preventing clients from modifying the
internal list directly.

The example shows that attempts to modify the returned list fail, but the class
can still update its internal data through its own methods. This pattern is
common in API design to protect internal state while allowing read access.

## Source

[Java Collections.unmodifiableList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableList-java.util.List-)

In this tutorial, we've explored Collections.unmodifiableList in depth.
We've covered basic usage, defensive copies versus unmodifiable views, handling
nested lists, comparisons with Java 9's List.of, performance
considerations, thread safety, and a practical API design use case. This method
is valuable for creating read-only views of lists, particularly in scenarios
where data needs to be shared safely.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).