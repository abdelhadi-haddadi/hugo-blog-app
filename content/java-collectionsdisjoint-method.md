+++
title = "Java Collections.disjoint Method"
date = 2025-08-29T19:58:17.902+01:00
draft = false
description = "Complete Java Collections.disjoint method tutorial with examples. Learn how to check for common elements between collections."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.disjoint Method

Last modified: April 20, 2025

 

The Collections.disjoint method is a utility method in Java's
Collections Framework. It checks whether two specified collections have no
elements in common. This method is useful for determining if collections are
mutually exclusive.

The method returns true if the collections have no common elements.
It returns false if they share at least one element. The method is
optimized for performance with different collection types.

## Collections.disjoint Method Overview

The disjoint method is a static method in the java.util.Collections
class. It takes two collections as parameters and returns a boolean value. The
method signature is: public static boolean disjoint(Collection&lt;?&gt; c1, Collection&lt;?&gt; c2).

The method works with any Collection implementation. It handles null values
properly and is thread-safe for concurrent access. The time complexity depends
on the collection types provided.

## Basic disjoint Example with Lists

This example demonstrates the basic usage of Collections.disjoint
with two ArrayLists. We create two lists of strings and check if they have any
elements in common.

DisjointBasicExample.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DisjointBasicExample {

    public static void main(String[] args) {
        
        List&lt;String&gt; list1 = new ArrayList&lt;&gt;();
        list1.add("Apple");
        list1.add("Banana");
        list1.add("Cherry");
        
        List&lt;String&gt; list2 = new ArrayList&lt;&gt;();
        list2.add("Orange");
        list2.add("Lemon");
        list2.add("Lime");
        
        boolean areDisjoint = Collections.disjoint(list1, list2);
        System.out.println("Are lists disjoint? " + areDisjoint);
        
        list2.add("Apple");
        areDisjoint = Collections.disjoint(list1, list2);
        System.out.println("After adding Apple: " + areDisjoint);
    }
}

In this example, we first check two lists with no common elements. The method
returns true. Then we add "Apple" to the second list and check
again. Now the method returns false because both lists contain
"Apple".

The output shows how the method correctly identifies when collections share
elements. This is useful for validation or conditional logic based on collection
contents.

## disjoint with Sets

This example shows how Collections.disjoint works with Set
implementations. Sets are unordered collections that don't allow duplicates.
We'll use HashSet and TreeSet in this demonstration.

DisjointWithSets.java
  

package com.zetcode;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class DisjointWithSets {

    public static void main(String[] args) {
        
        Set&lt;Integer&gt; set1 = new HashSet&lt;&gt;();
        set1.add(1);
        set1.add(2);
        set1.add(3);
        
        Set&lt;Integer&gt; set2 = new TreeSet&lt;&gt;();
        set2.add(4);
        set2.add(5);
        set2.add(6);
        
        System.out.println("Disjoint initially: " + 
            Collections.disjoint(set1, set2));
            
        set2.add(3);
        System.out.println("After adding 3: " + 
            Collections.disjoint(set1, set2));
    }
}

This example demonstrates disjoint with different Set
implementations. Initially, the sets have no common elements, so the method
returns true. After adding element 3 to the second set, which
already exists in the first set, the method returns false.

The example shows that disjoint works consistently across
different Collection implementations. The method doesn't depend on the
collection's ordering or implementation details.

## disjoint with Mixed Collection Types

The Collections.disjoint method can work with different collection
types simultaneously. This example demonstrates checking disjointness between a
List and a Set.

DisjointMixedTypes.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DisjointMixedTypes {

    public static void main(String[] args) {
        
        List&lt;String&gt; list = new ArrayList&lt;&gt;();
        list.add("Red");
        list.add("Green");
        list.add("Blue");
        
        Set&lt;String&gt; set = new HashSet&lt;&gt;();
        set.add("Cyan");
        set.add("Magenta");
        set.add("Yellow");
        
        System.out.println("Disjoint initially: " + 
            Collections.disjoint(list, set));
            
        set.add("Green");
        System.out.println("After adding Green: " + 
            Collections.disjoint(list, set));
    }
}

This example shows that Collections.disjoint works seamlessly
between different collection types. We first check a List and Set with no
common elements, which returns true. After adding "Green" to the
Set, which exists in the List, the method returns false.

The method's ability to work across different collection types makes it
versatile. You can use it to compare any combination of Lists, Sets, Queues,
etc., without worrying about their specific implementations.

## disjoint with Empty Collections

This example explores how Collections.disjoint behaves with empty
collections. We'll test various combinations of empty and non-empty collections
to understand the edge cases.

DisjointEmptyCollections.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DisjointEmptyCollections {

    public static void main(String[] args) {
        
        List&lt;String&gt; emptyList1 = new ArrayList&lt;&gt;();
        List&lt;String&gt; emptyList2 = new ArrayList&lt;&gt;();
        List&lt;String&gt; nonEmptyList = new ArrayList&lt;&gt;();
        nonEmptyList.add("Item");
        
        System.out.println("Two empty lists: " + 
            Collections.disjoint(emptyList1, emptyList2));
            
        System.out.println("Empty and non-empty: " + 
            Collections.disjoint(emptyList1, nonEmptyList));
            
        System.out.println("Non-empty and empty: " + 
            Collections.disjoint(nonEmptyList, emptyList1));
    }
}

When both collections are empty, disjoint returns true
because they share no elements. When comparing an empty collection with a
non-empty one, it also returns true for the same reason.

These results demonstrate the method's logical consistency. Empty collections
are always disjoint with any other collection, including other empty collections.

## disjoint with Null Values

This example examines how Collections.disjoint handles null values
in collections. We'll test cases where one or both collections contain null,
and where collections themselves are null.

DisjointNullValues.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DisjointNullValues {

    public static void main(String[] args) {
        
        List&lt;String&gt; listWithNull = new ArrayList&lt;&gt;();
        listWithNull.add("A");
        listWithNull.add(null);
        listWithNull.add("B");
        
        List&lt;String&gt; listWithoutNull = new ArrayList&lt;&gt;();
        listWithoutNull.add("C");
        listWithoutNull.add("D");
        
        System.out.println("List with null vs without: " + 
            Collections.disjoint(listWithNull, listWithoutNull));
            
        List&lt;String&gt; anotherListWithNull = new ArrayList&lt;&gt;();
        anotherListWithNull.add(null);
        anotherListWithNull.add("E");
        
        System.out.println("Two lists with null: " + 
            Collections.disjoint(listWithNull, anotherListWithNull));
            
        try {
            Collections.disjoint(null, listWithoutNull);
        } catch (NullPointerException e) {
            System.out.println("Null collection error: " + e.getMessage());
        }
    }
}

When one collection contains null and the other doesn't, disjoint
works normally. When both collections contain null, the method returns
false because null is considered a common element.

Passing null as a collection parameter results in a
NullPointerException. The method requires both parameters to be
non-null collection instances.

## Source

[Java Collections.disjoint Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#disjoint-java.util.Collection-java.util.Collection-)

In this article, we've explored the Java Collections.disjoint
method in depth.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).