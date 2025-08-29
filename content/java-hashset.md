+++
title = "Java HashSet"
date = 2025-08-29T19:59:02.057+01:00
draft = false
description = "Java HashSet tutorial shows how to use Java HashSet collection. HashSet is a collection that contains no duplicate elements."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HashSet

last modified March 6, 2024

 

In this article we show how to use Java HashSet collection.

HashSet is a collection that contains no duplicate elements.
This class offers constant time performance for the basic operations
(add, remove, contains, and size). HashSet does not provide ordering
of elements. HashSet does not have a get
method to retrieve elements.

HashSet implements the Set interface.
The Set is a collection with no duplicates.
This interface models the mathematical set abstraction.

## Example I

The following example creates a HashSet, determines its size, and
prints all elements to the console.

Main.java
  

import java.util.HashSet;
import java.util.Set;

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Wilson");
    brands.add("Nike");
    brands.add("Volvo");
    brands.add("IBM");
    brands.add("IBM");

    int nOfElements = brands.size();

    System.out.format("The set contains %d elements%n", nOfElements);
    System.out.println(brands);
}

In the code example, we have create a HashSet of brands. Each brand
must be unique. For instance, there cannot be two IBM companies registered.

brands.add("IBM");
brands.add("IBM");

Even thought we try to add a brand two times, a set contains only one IBM brand.

int nOfElements = brands.size();

We determine the size of the brands set.

System.out.println(brands);

All elements are printed to the console.

$ java Main.java
The set contains 4 elements
[Nike, Volvo, IBM, Wilson]

## Example II

In the following example, we present add,
remove, removeAll, and isEmpty
methods.

Main.java
  

import java.util.HashSet;
import java.util.Set;

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Wilson");
    brands.add("Nike");
    brands.add("Volvo");
    brands.add("Kia");
    brands.add("Lenovo");

    Set&lt;String&gt; brands2 = new HashSet&lt;&gt;();

    brands2.add("Wilson");
    brands2.add("Nike");
    brands2.add("Volvo");

    System.out.println(brands);

    brands.remove("Kia");
    brands.remove("Lenovo");

    System.out.println(brands);

    brands.removeAll(brands2);

    System.out.println(brands);

    if (brands.isEmpty()) {

        System.out.println("The brands set is empty");
    }
}

The example builds a HashSet of brands and removes elements from
it.

System.out.println(brands);

The initial HashSet is printed to the console.

brands.remove("Kia");
brands.remove("Lenovo");

System.out.println(brands);

We remove two elements with remove and print the
contents of brands to the console.

brands.removeAll(brands2);

System.out.println(brands);

Finally, we remove all elements contained in the second set
from the first set.

if (brands.isEmpty()) {

    System.out.println("The brands set is empty");
}

If the brands set is empty, we print a message to
the terminal.

$ java Main.java
[Nike, Lenovo, Kia, Volvo, Wilson]
[Nike, Volvo, Wilson]
[]
The brands set is empty

## Example III

In the following example, we use add, contains,
clear, and isEmpty methods.

Main.java
  

import java.util.HashSet;
import java.util.Set;

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Wilson");
    brands.add("Nike");
    brands.add("Volvo");
    brands.add("Kia");
    brands.add("Lenovo");

    if (brands.contains("Wilson")) {

        System.out.println("The set contains the Wilson element");
    } else {

        System.out.println("The set does not contain the Wilson element");
    }

    if (brands.contains("Apple")) {

        System.out.println("The set contains the Apple element");
    } else {

        System.out.println("The set does not contain the Apple element");
    }

    brands.clear();

    if (brands.isEmpty()) {

        System.out.println("The set does not contain any elements.");
    }
}

In the example, we check if two elements are present in the set.

if (brands.contains("Wilson")) {

    System.out.println("The set contains the Wilson element");
} else {

    System.out.println("The set does not contain the Wilson element");
}

We check if "Wilson" brand is present in the set and print a message
accordingly.

$ java Main.java
The set contains the Wilson element
The set does not contain the Apple element
The set does not contain any elements.

## HashSet iteration

We can use forEach method to iterate over the elements of the
HashSet. The forEach method performs the given action
for each element of the set until all elements have been processed or the action
throws an exception.

Main.java
  

import java.util.HashSet;
import java.util.Set;

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Wilson");
    brands.add("Nike");
    brands.add("Volvo");
    brands.add("Kia");
    brands.add("Lenovo");

    brands.forEach(e -&gt; System.out.println(e));
}

With forEach method, we iterate over the set and print its elements
to the console.

Iterator is an object used to iterate over a collection. The iterator is
retrieved with iterator.

Main.java
  

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Wilson");
    brands.add("Nike");
    brands.add("Volvo");
    brands.add("Kia");
    brands.add("Lenovo");

    Iterator&lt;String&gt; it = brands.iterator();

    while (it.hasNext()) {

        String element = it.next();
        System.out.println(element);
    }
}

The code example iterates over all elements of HashSet
and prints them to the console.

Enhanced for loop can be used to iterate over a HashSet.

Main.java
  

import java.util.HashSet;
import java.util.Set;

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Wilson");
    brands.add("Nike");
    brands.add("Volvo");
    brands.add("Kia");
    brands.add("Lenovo");

    for (String brand: brands) {

        System.out.println(brand);
    }
}

In the example, we iterate over a HashSet with enhanced for loop.

for (String brand: brands) {

    System.out.println(brand);
}

In each for cycle, a new element is assigned to the brand variable.

## Source

[Java HashSet - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashSet.html)

In this article we have presented the Java HashSet collection.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).