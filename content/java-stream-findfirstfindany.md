+++
title = "Java Stream findFirst/findAny"
date = 2025-08-29T20:00:34.661+01:00
draft = false
description = "Java Stream find tutorial provides a comprehensive guide on retrieving elements using findFirst and findAny methods in Java streams. Learn efficient techniques for searching streams, handling Optional results, and leveraging functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Stream findFirst/findAny

last modified May 25, 2025

 

In this article we shows how to find first or any element in Java streams.

## Java Stream

A Java Stream is a sequence of elements derived from a data source that
supports aggregate operations. Unlike collections, streams do not store
elements; instead, they process and compute elements on demand. Streams are
typically used to handle data from sources such as collections, arrays, or I/O
resources, enabling efficient processing and transformation.

The findFirst method retrieves the first element of a stream and
returns it wrapped in an Optional. If the stream is empty, it
returns an empty Optional. This method is useful when order
matters, ensuring that the first available item is selected.

The findAny method retrieves an arbitrary element from the
stream and returns it wrapped in an Optional. If the stream is
empty, it returns an empty Optional. This method is particularly
useful when working with parallel streams, as it allows retrieval of any
available element without guaranteeing order.

Both methods help safely extract elements from a stream without causing
exceptions when dealing with empty data sets, making them valuable for
functional programming approaches in Java.

## Java Stream findFirst example

In the next example we use the findFirst method.

Main.java
  

void main() {

    var words = List.of("war", "cup", "cloud", "alert", "be", "ocean", "book");
    var empty = List.of();

    var first = words.stream().findFirst().orElse("not found");
    System.out.println(first);

    var first2 = empty.stream().findFirst().orElse("not found");
    System.out.println(first2);
}

We find first elements of the list of words.

var words = List.of("war", "cup", "cloud", "alert", "be", "ocean", "book");
var empty = List.of();

We have two lists of strings. One has seven words, the other is empty.

var first = words.stream().findFirst().orElse("not found");

We find the first element of the list. If no element is found, we return "not
found" string.

$ java Main.java
war
not found

In the second example, we filter a list of words and then find its first 
matching element.

Main.java
  

void main() {

    var words = List.of("war", "cup", "cloud", "alert", "be",
            "water", "warm", "ocean", "book");

    var first = words.stream().filter(e -&gt; e.startsWith("w"))
            .findFirst().orElse("not found");
    System.out.println(first);
}

In the example, we find the first word that starts with "w".

$ java Main.java
war

## Java Stream findAny example

In the next example, we use the findAny method.

Main.java
  

void main() {

    var words = List.of(
            new User("John Doe", "gardener"),
            new User("Roger Roe", "driver"),
            new User("Jozef Kral", "shopkeeper"),
            new User("Boris Brezov", "musician"),
            new User("Lucia Novak", "teacher"));

    var res = words.stream().filter(u -&gt; u.occupation().equals("gardener"))
            .findAny();

    res.ifPresent(System.out::println);
}

record User(String name, String occupation) {
}

We have a list of users. We find out if there is any user who is a gardener. 

User[name=Roger Roe, occupation=driver]

## Source

[Java Stream documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

In this article we have have presented Java Stream findFirst and 
findAny methods.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).