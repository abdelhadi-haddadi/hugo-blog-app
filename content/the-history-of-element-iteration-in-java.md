+++
title = "The history of element iteration in Java"
date = 2025-08-29T19:48:36.926+01:00
draft = false
description = "In this tutorial we look at the history of element iteration in Java. From the early days of Java until Java 8."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# The history of element iteration in Java

last modified July 15, 2022

In this tutorial we look at the history of element iteration in Java.

On of the most common tasks in programming is to iterate over a collection of
data. This tutorial shows how element iteration evolved with Java language over
the course of time.

## Enumeration

In the early days of Java, Enumeration was used to iterate over
elements of data. The Enumeration interface defines the methods by
which we can enumerate (obtain one element at a time) the elements in a
collection of objects. The two primary collection classes were
Vector and Hashtable.

Today, Enumeration, Vector, and Hashtable
are considered obsolete. They are not deprecated, however.

com/zetcode/EnumerationEx.java
  

package com.zetcode;

import java.util.Enumeration;
import java.util.Vector;

public class EnumerationEx {

    public static void main(String[] args) {

        Vector items = new Vector();

        items.add("coin");
        items.add("pen");
        items.add("chair");
        items.add("lamp");
        items.add("cup");
        items.add("spoon");
        
        Enumeration itemsEn = items.elements();

        while (itemsEn.hasMoreElements()) {
            System.out.println(itemsEn.nextElement());
        }
    }
}

We have a vector of strings. We use the Enumeration to 
loop over the elements of the vector.

Enumeration itemsEn = items.elements();

The elements method returns the the Enumeration
of the vector.

while (itemsEn.hasMoreElements()) {

    System.out.println(itemsEn.nextElement());
}

The elements are traversed in a while loop. The hasMoreElements 
returns true while there are still more elements to extract, 
and false when all the elements have been enumerated.

## Iterator

Java 1.2 introduced the standard collection classes (List, Set, 
Map), and the Iterator. Iterator brings the 
*Iterator design pattern*, which is a common behavioral pattern used to
access the elements of a collection object in sequential manner without any need
to know its underlying representation.

com/zetcode/IteratorEx.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class IteratorEx {

    public static void main(String[] args) {
        
        List&lt;String&gt; items = Arrays.asList("coin", "ball", "lamp", "spoon");
        
        Iterator it = items.iterator();
        
        while (it.hasNext()) {
            
            System.out.println(it.next());
        }
    }
}

In the example, we loop over a list of elements with Iterator.

List&lt;String&gt; items = Arrays.asList("coin", "ball", "lamp", "spoon");

We use the Arrays.asList method to define a list in one line.

Iterator it = items.iterator();

We get the iterator from the list using the iterator method.

while (it.hasNext()) {
    
    System.out.println(it.next());
}

We go through the list of elements in a while loop. We use the hasNext
and next methods of iterator.

## Iterable and enhanced for loop

Java 5 introduced generics, Iterable, and the enhanced for loop.
The Iterable interface allows an object to be the target of the
enhanced for loop statement. An Iterable is an object that contains
a series of elements that can be iterated over. It has one method that produces
an Iterator.

com/zetcode/EnhancedForLoop.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;

public class EnhancedForLoop {

    public static void main(String[] args) {
        
        List&lt;String&gt; items = Arrays.asList("coin", "ball", "lamp", "spoon");
        
        for (String item: items) {
            
            System.out.println(item);
        }
    }
}

The example uses an enhanced for loop to traverse list elements. The creation of
the iterator and calls to the hasNext and next methods
are not explicit, but they still take place behind the scenes. 

## Java 8 forEach method

The forEach method performs the given action for each element of
the Iterable until all elements have been processed or the action
throws an exception. The forEach method uses an *internal*
iterator, while previous methods used an *external* iterator.

com/zetcode/ForEachEx.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;

public class ForEachEx {

    public static void main(String[] args) {

        List&lt;String&gt; items = Arrays.asList("coin", "ball", "lamp", "spoon");
        
        items.forEach(System.out::println);
    }
}

In the example, we loop over the elements with the forEach method.

In this tutorial, we have looked at the brief history of element iteration
in Java.