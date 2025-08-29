+++
title = "Java Collections.emptyList Method"
date = 2025-08-29T19:58:19.029+01:00
draft = false
description = "Complete Java Collections.emptyList tutorial with examples. Learn how to use empty immutable lists in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.emptyList Method

Last modified: April 20, 2025

 

The Collections.emptyList method returns an immutable empty list.
This is a singleton instance that saves memory when you need an empty list. It's
part of Java's Collections utility class since Java 1.5.

Empty lists are useful as return values, default values, or placeholders. The
returned list is type-safe and serializable. It cannot be modified, throwing
UnsupportedOperationException on modification attempts.

## Collections.emptyList Overview

Collections.emptyList provides a shared immutable empty list
instance. It's more efficient than creating new empty ArrayList instances. The
method is generic and returns a properly typed List&lt;T&gt;.

The returned list implements all optional List operations. However, all
mutator methods throw UnsupportedOperationException. It's
thread-safe as it cannot be modified after creation.

## Basic emptyList Usage

This example demonstrates the most basic usage of emptyList. We
get an empty list and verify its properties. The list is truly empty and
immutable.

EmptyListBasic.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class EmptyListBasic {

    public static void main(String[] args) {
        
        // Get empty list
        List&lt;String&gt; empty = Collections.emptyList();
        
        // Verify properties
        System.out.println("Size: " + empty.size());
        System.out.println("Is empty: " + empty.isEmpty());
        
        try {
            // Attempt modification
            empty.add("Item");
        } catch (UnsupportedOperationException e) {
            System.out.println("Expected exception: " + e.getMessage());
        }
    }
}

This code shows the fundamental characteristics of emptyList. We
verify the list is empty and cannot be modified. The attempt to add an item
throws an exception as expected.

Using emptyList is preferable to new ArrayList
when you need an immutable empty list. It's more memory efficient and clearly
communicates immutability.

## Returning emptyList from Methods

A common use case for emptyList is as a method return value.
This example shows a method that returns an empty list when no results are
found. This avoids returning null and follows better API design practices.

EmptyListReturn.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class EmptyListReturn {

    public static List&lt;String&gt; findItems(String query) {
        // Simulate no results found
        if (query.isEmpty()) {
            return Collections.emptyList();
        }
        
        // In real code, return actual results
        return List.of("Result1", "Result2");
    }
    
    public static void main(String[] args) {
        List&lt;String&gt; results = findItems("");
        
        System.out.println("Results size: " + results.size());
        System.out.println("Results: " + results);
        
        // Safe to iterate (won't throw NPE)
        for (String item : results) {
            System.out.println(item);
        }
    }
}

This example demonstrates using emptyList as a method return
value. The method returns an empty list when no results match the query. This
is better than returning null as it prevents NullPointerException.

Clients can safely call methods on the returned list without null checks. The
code is cleaner and less error-prone. This pattern is widely used in Java
libraries and frameworks.

## emptyList as Default Value

emptyList can serve as a default value for list fields or
variables. This example shows using it to initialize a field that might
otherwise be null. The field is always guaranteed to be a valid List instance.

EmptyListDefault.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class EmptyListDefault {

    private List&lt;String&gt; items = Collections.emptyList();
    
    public void setItems(List&lt;String&gt; newItems) {
        this.items = newItems != null ? newItems : Collections.emptyList();
    }
    
    public List&lt;String&gt; getItems() {
        return items;
    }
    
    public static void main(String[] args) {
        EmptyListDefault example = new EmptyListDefault();
        
        // Default empty list
        System.out.println("Initial items: " + example.getItems());
        
        // Set to null - becomes empty list
        example.setItems(null);
        System.out.println("After null set: " + example.getItems());
        
        // Set to actual list
        example.setItems(List.of("A", "B", "C"));
        System.out.println("After real set: " + example.getItems());
    }
}

This code shows using emptyList for default values. The field
starts as an empty list and converts null assignments to empty lists. This
ensures the field is never null.

This technique eliminates null checks throughout the code. Methods can safely
call operations on the list field. It's a defensive programming practice that
makes code more robust.

## emptyList with Generic Methods

emptyList works well with generic methods that return lists.
This example shows a generic method that returns an empty list with the correct
type parameter. The compiler infers the type from context.

EmptyListGeneric.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class EmptyListGeneric {

    public static &lt;T&gt; List&lt;T&gt; createEmptyList() {
        return Collections.emptyList();
    }

    public static void main(String[] args) {
        // Type inferred from context
        List&lt;String&gt; strings = createEmptyList();
        List&lt;Integer&gt; numbers = createEmptyList();

        System.out.println("String list type: " + strings.getClass());
        System.out.println("Integer list type: " + numbers.getClass());

        // To compare the instances, use raw object references
        System.out.println("Same instance: " + (strings == (Object) numbers));
    }
}

This code demonstrates generic usage of emptyList. The method
returns a properly typed empty list without needing casts. The same immutable
instance is reused regardless of type parameter.

The output shows that while the lists have different generic types, they're
the same instance at runtime. This is safe because the list cannot be modified
to violate type safety.

## emptyList in Java Streams

emptyList works well with Java Streams as a source or result.
This example shows using it in stream operations. The empty list produces an
empty stream, which can be processed safely.

EmptyListStreams.java
  

package com.zetcode;

import java.util.Collections;
import java.util.List;

public class EmptyListStreams {

    public static void main(String[] args) {
        // Create stream from empty list
        List&lt;String&gt; empty = Collections.emptyList();
        long count = empty.stream().count();
        System.out.println("Stream count: " + count);
        
        // Use empty list as stream result
        List&lt;String&gt; result = empty.stream()
            .filter(s -&gt; s.startsWith("A"))
            .toList();
        
        System.out.println("Filtered result: " + result);
        
        // Safe to call stream operations
        boolean anyMatch = empty.stream().anyMatch(s -&gt; s.length() &gt; 5);
        System.out.println("Any match: " + anyMatch);
    }
}

This code demonstrates emptyList with Java Streams. The empty
list produces a stream with no elements. All stream operations work correctly
without special cases for empty inputs.

Stream operations on empty lists return appropriate empty or false results.
This behavior is often desirable and matches mathematical set operations on
empty sets.

## Source

[Java Collections.emptyList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#emptyList--)

In this article, we've explored Java's Collections.emptyList in
depth. We've covered basic usage, return values, default values, and
comparisons with other approaches. Understanding emptyList helps write cleaner,
more efficient Java code.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).