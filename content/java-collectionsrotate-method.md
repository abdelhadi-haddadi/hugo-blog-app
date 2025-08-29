+++
title = "Java Collections.rotate Method"
date = 2025-08-29T19:58:22.430+01:00
draft = false
description = "Complete Java Collections.rotate tutorial with examples. Learn how to rotate elements in Java Lists."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Collections.rotate Method

Last modified: April 20, 2025

 

The Collections.rotate method is a utility for rotating elements
in a List. Rotation moves elements forward or backward in the list by a
specified distance. This operation is useful for circular shifts and
rearrangements.

The method is part of Java's Collections Framework. It works with any List
implementation. The rotation can be performed in-place without creating a new
list. Negative distances rotate backward while positive rotate forward.

## Collections.rotate Overview

The rotate method takes a List and a distance parameter. It
rotates elements by moving each element to the position (index + distance) %
list.size(). The operation is efficient, typically running in linear time.

Key characteristics include support for both forward and backward rotation.
The method modifies the original list rather than returning a new one. It
works with any List implementation including ArrayList and LinkedList.

## Basic Forward Rotation

This example demonstrates a basic forward rotation of a list. We create an
ArrayList of integers and rotate it by 2 positions. The rotation moves
elements to higher indices, wrapping around to the start when needed.

BasicForwardRotation.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicForwardRotation {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        Collections.addAll(numbers, 1, 2, 3, 4, 5);
        
        System.out.println("Original list: " + numbers);
        
        // Rotate forward by 2 positions
        Collections.rotate(numbers, 2);
        
        System.out.println("After rotation: " + numbers);
    }
}

This code shows a simple forward rotation. The original list [1, 2, 3, 4, 5]
becomes [4, 5, 1, 2, 3] after rotation. Elements wrap around to the beginning
when they reach the end of the list.

The rotation distance (2) determines how many positions each element moves
forward. The operation is performed in-place, modifying the original list.

## Basic Backward Rotation

This example demonstrates backward rotation using a negative distance. We
rotate a list of strings backward by 1 position. Negative distances move
elements toward lower indices.

BasicBackwardRotation.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BasicBackwardRotation {

    public static void main(String[] args) {
        
        List&lt;String&gt; colors = Arrays.asList("Red", "Green", "Blue", "Yellow");
        
        System.out.println("Original list: " + colors);
        
        // Rotate backward by 1 position
        Collections.rotate(colors, -1);
        
        System.out.println("After rotation: " + colors);
    }
}

This code rotates the list backward by 1 position. The original list [Red,
Green, Blue, Yellow] becomes [Green, Blue, Yellow, Red]. The first element
wraps around to the end.

Negative rotation distances work similarly to positive ones but in the opposite
direction. The absolute value determines how many positions to move.

## Rotation Distance Larger Than List Size

When the rotation distance exceeds the list size, it's effectively reduced
modulo the size. This example shows rotation by a distance larger than the
list length. The result is equivalent to rotating by the remainder.

LargeRotationDistance.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LargeRotationDistance {

    public static void main(String[] args) {
        
        List&lt;Character&gt; letters = new ArrayList&lt;&gt;();
        Collections.addAll(letters, 'A', 'B', 'C', 'D');
        
        System.out.println("Original list: " + letters);
        
        // Rotate by distance larger than list size
        Collections.rotate(letters, 5);
        
        System.out.println("After rotation: " + letters);
    }
}

This example rotates a 4-element list by 5 positions. Since 5 mod 4 is 1, the
result is equivalent to rotating by 1. The list [A, B, C, D] becomes [D, A, B,
C].

The modulo operation ensures the distance is always within bounds. This makes
the method safe to use with any integer distance value.

## Rotating a Sublist

The rotate method can be used with subList views to rotate only
part of a list. This example demonstrates rotating a 3-element segment within
a larger list. The rest of the list remains unchanged.

SublistRotation.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SublistRotation {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();
        Collections.addAll(numbers, 1, 2, 3, 4, 5, 6, 7);
        
        System.out.println("Original list: " + numbers);
        
        // Rotate elements 2-4 (inclusive) by 1 position
        Collections.rotate(numbers.subList(2, 5), 1);
        
        System.out.println("After sublist rotation: " + numbers);
    }
}

This code rotates elements at indices 2-4 (3, 4, 5) by 1 position. The original
list [1, 2, 3, 4, 5, 6, 7] becomes [1, 2, 5, 3, 4, 6, 7]. Only the specified
sublist is affected.

Sublist rotation is useful for manipulating segments of larger lists. The
operation maintains the relative order of elements outside the sublist.

## Rotating a LinkedList

The rotate method works with different List implementations. This
example demonstrates rotating a LinkedList. LinkedLists can be rotated more
efficiently than ArrayLists for certain operations.

LinkedListRotation.java
  

package com.zetcode;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class LinkedListRotation {

    public static void main(String[] args) {
        
        List&lt;String&gt; words = new LinkedList&lt;&gt;();
        Collections.addAll(words, "apple", "banana", "cherry", "date");
        
        System.out.println("Original list: " + words);
        
        // Rotate LinkedList by 3 positions
        Collections.rotate(words, 3);
        
        System.out.println("After rotation: " + words);
    }
}

This example rotates a LinkedList of strings by 3 positions. The original list
[apple, banana, cherry, date] becomes [banana, cherry, date, apple]. The
operation works the same regardless of List implementation.

LinkedList rotation may have different performance characteristics than
ArrayList rotation. The method automatically adapts to the list type.

## Multiple Rotations

Multiple rotations can be chained to achieve complex rearrangements. This
example shows how sequential rotations affect a list. Each rotation is
applied to the current state of the list.

MultipleRotations.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MultipleRotations {

    public static void main(String[] args) {
        
        List&lt;Integer&gt; nums = new ArrayList&lt;&gt;();
        Collections.addAll(nums, 1, 2, 3, 4, 5, 6);
        
        System.out.println("Original list: " + nums);
        
        // First rotation
        Collections.rotate(nums, 2);
        System.out.println("After first rotation: " + nums);
        
        // Second rotation
        Collections.rotate(nums, -3);
        System.out.println("After second rotation: " + nums);
        
        // Third rotation
        Collections.rotate(nums, 4);
        System.out.println("After third rotation: " + nums);
    }
}

This example performs three rotations on a list of integers. The first rotates
forward by 2, the second backward by 3, and the third forward by 4. Each
rotation builds on the previous result.

The output shows the list's state after each rotation. Multiple rotations can
be combined to achieve specific element arrangements.

## Practical Use Case: Rotating a Deck of Cards

This example demonstrates a practical application of rotation - simulating a
card deck shuffle. We rotate a deck of cards to bring certain cards to the
top. This mimics real-world card handling techniques.

CardDeckRotation.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CardDeckRotation {

    public static void main(String[] args) {
        
        List&lt;String&gt; deck = new ArrayList&lt;&gt;();
        Collections.addAll(deck, "A♠", "K♠", "Q♠", "J♠", "10♠", "9♠",
                          "A♥", "K♥", "Q♥", "J♥", "10♥", "9♥");
        
        System.out.println("Original deck: " + deck);
        
        // Simulate cutting the deck at position 5
        Collections.rotate(deck, -5);
        System.out.println("After cut: " + deck);
        
        // Bring the top card to the middle
        Collections.rotate(deck, deck.size()/2);
        System.out.println("After middle rotation: " + deck);
    }
}

This example models card deck manipulations using rotation. First, we "cut" the
deck by rotating backward by 5 positions. Then we rotate half the deck size to
move the top card to the middle.

Rotation is ideal for such circular arrangements. The example shows how
Collections.rotate can model real-world rotation scenarios.

## Source

[Java Collections.rotate Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#rotate-java.util.List-int-)

In this article, we've explored the Java Collections.rotate method in depth.
We've covered basic rotations, sublist rotations, and practical applications.
Understanding rotation is valuable for many list manipulation tasks.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).