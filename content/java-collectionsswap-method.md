+++
title = "Java Collections.swap Method"
date = 2025-08-29T19:58:24.721+01:00
draft = false
description = "Complete Java Collections.swap method tutorial with examples. Learn how to swap elements in Java Lists."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.swap Method

Last modified: April 20, 2025

 

The Collections.swap method is a utility method from Java's
Collections framework. It swaps elements at specified positions in a list.
This method is particularly useful when you need to reorder elements.

The method takes three parameters: the list and two indices. It throws
IndexOutOfBoundsException if either index is out of range. The swap operation
is performed in constant time for random access lists.

## Collections.swap Method Overview

The swap method is defined in the java.util.Collections
class. It is a static method that operates on any List implementation. The
method modifies the original list rather than returning a new one.

The method signature is: public static void swap(List&lt;?&gt; list, int i, int j).
Both indices must be non-negative and less than the list size. The method works
with any type of list elements.

## Basic Swap Operation

This example demonstrates the most basic usage of the Collections.swap
method. We create a simple list of strings and swap two elements. The example
shows the list before and after the swap operation.

BasicSwapExample.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BasicSwapExample {

    public static void main(String[] args) {
        
        List&lt;String&gt; colors = Arrays.asList("Red", "Green", "Blue", "Yellow");
        
        System.out.println("Before swap: " + colors);
        
        // Swap elements at positions 1 and 3
        Collections.swap(colors, 1, 3);
        
        System.out.println("After swap: " + colors);
    }
}

This code creates an immutable list of color names using Arrays.asList.
We then swap the elements at positions 1 ("Green") and 3 ("Yellow"). The output
shows the list before and after the swap operation.

Note that while the list is immutable in size (can't add/remove elements), we
can still modify existing elements. The swap operation changes the element
positions within the fixed-size list.

## Swapping Elements in ArrayList

This example shows how to use Collections.swap with an ArrayList.
ArrayLists are resizable and commonly used in Java applications. We'll swap
elements and demonstrate multiple swaps.

ArrayListSwapExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ArrayListSwapExample {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);
        numbers.add(50);
        
        System.out.println("Original list: " + numbers);
        
        // Swap first and last elements
        Collections.swap(numbers, 0, numbers.size() - 1);
        System.out.println("After first swap: " + numbers);
        
        // Swap middle elements
        Collections.swap(numbers, 1, 3);
        System.out.println("After second swap: " + numbers);
    }
}

This example demonstrates swapping elements in a mutable ArrayList. We first swap
the first and last elements, then swap elements at positions 1 and 3. Each swap
operation modifies the list in place.

The output shows the progressive changes to the list. ArrayLists are particularly
efficient for swap operations due to their random access nature. The time
complexity is O(1) for each swap.

## Swapping Custom Objects

The Collections.swap method works with any object type, including
custom classes. This example shows swapping objects of a custom Person
class. The method doesn't require any special implementation in the class.

CustomObjectSwapExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Person {
    private String name;
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

public class CustomObjectSwapExample {

    public static void main(String[] args) {
        
        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Charlie", 35));
        
        System.out.println("Before swap: " + people);
        
        // Swap first and last person
        Collections.swap(people, 0, people.size() - 1);
        
        System.out.println("After swap: " + people);
    }
}

This example creates a list of Person objects and swaps the first
and last elements. The Person class implements toString
for readable output. The swap operation works the same way as with primitive
types.

The output demonstrates that the object references are swapped in the list. The
actual objects remain unchanged - only their positions in the list are modified.
This is true for any object type in Java.

## Handling IndexOutOfBoundsException

This example demonstrates what happens when invalid indices are provided to the
Collections.swap method. We'll show proper error handling and
demonstrate the bounds checking behavior.

SwapExceptionHandling.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SwapExceptionHandling {

    public static void main(String[] args) {
        
        List&lt;String&gt; items = new ArrayList&lt;&gt;();
        items.add("Apple");
        items.add("Banana");
        items.add("Cherry");
        
        try {
            // Attempt to swap with invalid indices
            Collections.swap(items, -1, 2);
            System.out.println("Swap successful");
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        try {
            // Attempt to swap with index equal to size
            Collections.swap(items, 1, items.size());
            System.out.println("Swap successful");
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Valid swap after error handling
        Collections.swap(items, 0, 2);
        System.out.println("Final list: " + items);
    }
}

This example intentionally triggers IndexOutOfBoundsException by
using invalid indices. We demonstrate two cases: negative index and index equal
to list size. The exception messages help identify which index was invalid.

After handling the exceptions, we perform a valid swap operation. The output
shows the error messages and the final successful swap result. Proper error
handling is important when working with user-provided indices.

## Swapping in LinkedList

While Collections.swap works with any List implementation, its
performance varies. This example demonstrates swapping in a LinkedList, which
has different performance characteristics than ArrayList.

LinkedListSwapExample.java
  

package com.zetcode;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class LinkedListSwapExample {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new LinkedList&lt;&gt;();
        Collections.addAll(numbers, 1, 2, 3, 4, 5);
        
        System.out.println("Original list: " + numbers);
        
        // Swap elements far apart
        long startTime = System.nanoTime();
        Collections.swap(numbers, 0, numbers.size() - 1);
        long endTime = System.nanoTime();
        
        System.out.println("After swap: " + numbers);
        System.out.println("Swap time (ns): " + (endTime - startTime));
        
        // Compare with ArrayList
        List&lt;Integer&gt; arrayList = new java.util.ArrayList&lt;&gt;(numbers);
        
        startTime = System.nanoTime();
        Collections.swap(arrayList, 0, arrayList.size() - 1);
        endTime = System.nanoTime();
        
        System.out.println("ArrayList swap time (ns): " + (endTime - startTime));
    }
}

This example compares swap performance between LinkedList and ArrayList. While
both work correctly, ArrayList is generally faster for random access operations.
The example measures and displays the time taken for each swap operation.

The output shows that LinkedList swaps take longer because they require traversal
to the specified positions. ArrayList can access any position directly, making
it more efficient for frequent swap operations.

## Implementing a Shuffle Algorithm with swap

The Collections.swap method can be used to implement more complex
algorithms. This example demonstrates a simple shuffle algorithm using random
swaps. We'll compare it with the built-in Collections.shuffle.

CustomShuffleExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class CustomShuffleExample {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        for (int i = 1; i &lt;= 10; i++) {
            numbers.add(i);
        }
        
        System.out.println("Original list: " + numbers);
        
        // Custom shuffle using swap
        customShuffle(numbers);
        System.out.println("After custom shuffle: " + numbers);
        
        // Reset and use Collections.shuffle
        Collections.sort(numbers);
        Collections.shuffle(numbers);
        System.out.println("After Collections.shuffle: " + numbers);
    }
    
    private static void customShuffle(List&lt;?&gt; list) {
        Random random = new Random();
        for (int i = list.size() - 1; i &gt; 0; i--) {
            int j = random.nextInt(i + 1);
            Collections.swap(list, i, j);
        }
    }
}

This example implements the Fisher-Yates shuffle algorithm using
Collections.swap. We generate random indices and swap elements
from the end of the list to the beginning. The custom implementation is then
compared with Java's built-in shuffle.

Both methods produce randomly ordered lists, but the built-in version might
use a better random number generator. The example demonstrates how swap can
be used as a building block for more complex operations.

## Swapping in Nested Lists

This advanced example demonstrates swapping elements in nested list structures.
We'll show how to swap elements between different sublists and within the same
sublist. The example handles two-dimensional list structures.

NestedListSwapExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NestedListSwapExample {

    public static void main(String[] args) {
        
        List&lt;List&lt;String&gt;&gt; matrix = new ArrayList&lt;&gt;();
        matrix.add(new ArrayList&lt;&gt;(List.of("A", "B", "C")));
        matrix.add(new ArrayList&lt;&gt;(List.of("D", "E", "F")));
        matrix.add(new ArrayList&lt;&gt;(List.of("G", "H", "I")));
        
        System.out.println("Original matrix:");
        printMatrix(matrix);
        
        // Swap within the same sublist
        Collections.swap(matrix.get(1), 0, 2);
        System.out.println("\nAfter swapping in row 1:");
        printMatrix(matrix);
        
        // Swap between different sublists
        String temp = matrix.get(0).get(2);
        matrix.get(0).set(2, matrix.get(2).get(0));
        matrix.get(2).set(0, temp);
        
        System.out.println("\nAfter swapping between rows:");
        printMatrix(matrix);
    }
    
    private static void printMatrix(List&lt;List&lt;String&gt;&gt; matrix) {
        for (List&lt;String&gt; row : matrix) {
            System.out.println(row);
        }
    }
}

This example works with a 3x3 matrix represented as nested lists. First, we
swap elements within a single row using Collections.swap. Then,
we demonstrate swapping between different rows, which requires temporary
storage.

The output shows the matrix after each operation. This technique can be extended
to more complex data structures. The example highlights how swap can be used in
multidimensional scenarios.

## Source

[Java Collections.swap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#swap-java.util.List-int-int-)

In this article, we've explored the Java Collections.swap method
in depth. We've covered basic usage, different list types, exception handling,
and advanced applications. Understanding this method helps in efficient list
manipulation.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).