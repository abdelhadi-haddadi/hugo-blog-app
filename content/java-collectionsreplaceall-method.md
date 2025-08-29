+++
title = "Java Collections.replaceAll Method"
date = 2025-08-29T19:58:21.296+01:00
draft = false
description = "Complete Java Collections.replaceAll tutorial with examples. Learn how to replace elements in Java Lists."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.replaceAll Method

Last modified: April 20, 2025

 

The Collections.replaceAll method is a utility method in Java's
Collections framework. It replaces all occurrences of a specified value in a
List with another value. This method provides a convenient way to perform bulk
replacements in lists.

The method is defined in the java.util.Collections class. It works
with any List implementation and performs the replacement in linear time. The
method returns true if at least one replacement was made.

## Collections.replaceAll Overview

The replaceAll method signature is:
public static &lt;T&gt; boolean replaceAll(List&lt;T&gt; list, T oldVal, T newVal).
It takes three parameters: the list to modify, the value to replace, and the new
value.

The method scans the list from beginning to end. For each element that equals
oldVal (using equals ), it replaces it with newVal. The replacement
is done in-place, modifying the original list.

## Basic replaceAll Example

This example demonstrates the basic usage of Collections.replaceAll.
We create a list of strings and replace all occurrences of "Apple" with "Orange".
The example shows both the list before and after replacement.

BasicReplaceAll.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BasicReplaceAll {

    public static void main(String[] args) {
        
        List&lt;String&gt; fruits = Arrays.asList(
            "Apple", "Banana", "Apple", "Cherry", "Apple");
        
        System.out.println("Original list: " + fruits);
        
        boolean changed = Collections.replaceAll(fruits, "Apple", "Orange");
        
        System.out.println("Modified list: " + fruits);
        System.out.println("Replacements made: " + changed);
    }
}

In this code, we start with a list containing three "Apple" elements. After
calling replaceAll, all "Apple" elements are replaced with "Orange".
The method returns true since replacements occurred.

The output shows the list transformation. This is the simplest use case for
replaceAll, demonstrating its basic functionality.

## replaceAll with Integer List

This example shows Collections.replaceAll working with a List of
Integers. We replace all occurrences of the number 5 with 50. The example also
demonstrates the return value when no replacements occur.

IntegerReplaceAll.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class IntegerReplaceAll {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        Collections.addAll(numbers, 1, 5, 3, 5, 7, 5);
        
        System.out.println("Original numbers: " + numbers);
        
        // Replace 5 with 50
        boolean changed1 = Collections.replaceAll(numbers, 5, 50);
        System.out.println("After first replacement: " + numbers);
        System.out.println("Replacements made: " + changed1);
        
        // Try replacing 99 (not present)
        boolean changed2 = Collections.replaceAll(numbers, 99, 100);
        System.out.println("After second replacement: " + numbers);
        System.out.println("Replacements made: " + changed2);
    }
}

This example demonstrates replaceAll with numeric values. The first
call successfully replaces all 5s with 50s. The second call attempts to replace
99, which isn't in the list, so no changes occur.

The output shows how the method behaves in both scenarios. The return value
indicates whether any replacements were performed.

## replaceAll with Custom Objects

This example demonstrates using Collections.replaceAll with custom
objects. We create a simple Person class and replace all instances of one Person
with another. The example highlights the importance of proper
equals implementation.

CustomObjectReplaceAll.java
  

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
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age &amp;&amp; name.equals(person.name);
    }
    
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

public class CustomObjectReplaceAll {

    public static void main(String[] args) {
        
        List&lt;Person&gt; people = new ArrayList&lt;&gt;();
        Collections.addAll(people,
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Alice", 25),
            new Person("Charlie", 35)
        );
        
        System.out.println("Original list: " + people);
        
        Person oldPerson = new Person("Alice", 25);
        Person newPerson = new Person("Alex", 26);
        
        boolean changed = Collections.replaceAll(people, oldPerson, newPerson);
        
        System.out.println("Modified list: " + people);
        System.out.println("Replacements made: " + changed);
    }
}

This example shows that replaceAll works with custom objects when
they properly implement equals. We replace all Alice (25) instances
with Alex (26). The equals method compares both name and age
fields.

The output demonstrates the replacement of Person objects. Without a proper
equals implementation, the method wouldn't find matches to replace.

## replaceAll with Null Values

This example explores how Collections.replaceAll handles null
values. We create a list containing null elements and demonstrate replacing
them with non-null values and vice versa.

NullReplaceAll.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NullReplaceAll {

    public static void main(String[] args) {
        
        List&lt;String&gt; items = new ArrayList&lt;&gt;();
        Collections.addAll(items, "A", null, "B", null, "C");
        
        System.out.println("Original list: " + items);
        
        // Replace null with "X"
        boolean changed1 = Collections.replaceAll(items, null, "X");
        System.out.println("After replacing null with X: " + items);
        System.out.println("Replacements made: " + changed1);
        
        // Replace "B" with null
        boolean changed2 = Collections.replaceAll(items, "B", null);
        System.out.println("After replacing B with null: " + items);
        System.out.println("Replacements made: " + changed2);
    }
}

This example shows that replaceAll can handle null values as both
the oldVal and newVal parameters. We first replace all nulls with "X", then
replace "B" with null.

The output demonstrates that null handling works as expected. The method can
both remove nulls by replacing them and introduce nulls as replacements.

## Case-Insensitive replaceAll

This example demonstrates a case-insensitive replacement using
Collections.replaceAll. Since the method uses equals
for comparison, we need a workaround for case-insensitive matching.

CaseInsensitiveReplaceAll.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CaseInsensitiveReplaceAll {

    public static void main(String[] args) {
        
        List&lt;String&gt; words = new ArrayList&lt;&gt;();
        Collections.addAll(words, "Apple", "apple", "APPLE", "banana");
        
        System.out.println("Original list: " + words);
        
        // Traditional replaceAll is case-sensitive
        boolean changed1 = Collections.replaceAll(words, "apple", "orange");
        System.out.println("After case-sensitive replacement: " + words);
        System.out.println("Replacements made: " + changed1);
        
        // Case-insensitive replacement
        String target = "apple";
        String replacement = "orange";
        words.replaceAll(s -&gt; s.equalsIgnoreCase(target) ? replacement : s);
        
        System.out.println("After case-insensitive replacement: " + words);
    }
}

This example shows two approaches. First, the standard replaceAll
which is case-sensitive. Then, we use List.replaceAll with a
lambda for case-insensitive matching.

The output demonstrates the difference between the approaches. For case-insensitive
operations, the lambda approach is more flexible than Collections.replaceAll.

## replaceAll vs List.replaceAll

This example compares Collections.replaceAll with Java 8's
List.replaceAll. While similar, they have different capabilities.
The example demonstrates both methods side by side.

ReplaceAllComparison.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReplaceAllComparison {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        Collections.addAll(numbers, 1, 2, 3, 4, 5);
        
        System.out.println("Original list: " + numbers);
        
        // Collections.replaceAll - replace specific value
        Collections.replaceAll(numbers, 3, 30);
        System.out.println("After Collections.replaceAll: " + numbers);
        
        // List.replaceAll - transform all elements
        numbers.replaceAll(n -&gt; n * 10);
        System.out.println("After List.replaceAll: " + numbers);
    }
}

This example highlights the key differences between the two methods.
Collections.replaceAll replaces specific values, while
List.replaceAll can transform all elements via a UnaryOperator.

The output shows how each method modifies the list differently. Choose
Collections.replaceAll for simple value replacement and
List.replaceAll for more complex transformations.

## Performance Considerations

This example examines the performance characteristics of
Collections.replaceAll. We create a large list and measure the time
taken for replacements. The example demonstrates its linear time complexity.

ReplaceAllPerformance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReplaceAllPerformance {

    public static void main(String[] args) {
        
        final int SIZE = 1_000_000;
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;(SIZE);
        
        // Fill the list with 1s, with a 5 at the end
        for (int i = 0; i &lt; SIZE - 1; i++) {
            numbers.add(1);
        }
        numbers.add(5);
        
        long startTime = System.nanoTime();
        Collections.replaceAll(numbers, 1, 10);
        long endTime = System.nanoTime();
        
        System.out.println("Time taken: " + 
            (endTime - startTime) / 1_000_000 + " ms");
        System.out.println("Last element (unchanged): " + 
            numbers.get(numbers.size() - 1));
    }
}

This example creates a large list and measures the time to replace all 1s with
10s. Despite the list size, the operation completes quickly, demonstrating
replaceAll's O(n) time complexity.

The output shows the operation time and confirms the last element (5) remains
unchanged. This test helps understand the method's performance characteristics.

## Source

[Java Collections.replaceAll Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#replaceAll-java.util.List-T-T-)

In this article, we've explored the Java Collections.replaceAll
method in depth. We've covered basic usage, custom objects, null handling, and
performance considerations. Understanding this method helps with efficient list
modifications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).