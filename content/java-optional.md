+++
title = "Java Optional"
date = 2025-08-29T20:00:05.188+01:00
draft = false
description = "Java Optional tutorial shows how to work with Optional type in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Optional

last modified July 7, 2024

 

In this article we work with Optional type in Java.

Optional is a container object which may or may not contain a value.
We can check if a value is present with isPresent and then retrive
it with get. If the container does not contain a value it is then
called empty.

The goal of the Optional type is to avoid null references and all
the problems that are caused by them.

The Optional was inspired by similar types found in Haskell and
Scala. Other languages, such as C# or Groovy, use null-safe operators
.? for the same purpose.

Optional&lt;String&gt; empty = Optional.empty();

We create an empty Optional with Optional.empty.
It is used insted of null references.

Optional&lt;String&gt; word = Optional.of("falcon");

Optional.of is used when we are certain that the parameter will not 
be null.

Optional&lt;String&gt; word = Optional.ofNullable(value);

Optional.ofNullable is used when we don't know if there will be 
null.

## Simple example

In the following example, we have a simple example with Optional
type.

Main.java
  

import java.util.Arrays;
import java.util.Optional;

void main() {

    var words = Arrays.asList("rock", null, "mountain",
            null, "falcon", "sky");

    for (int i = 0; i &lt; 5; i++) {

        Optional&lt;String&gt; word = Optional.ofNullable(words.get(i));
        word.ifPresent(System.out::println);
    }
}

We have a list of words; the list also contains null values. We go through the
list and print the elements.

Optional&lt;String&gt; word = Optional.ofNullable(words.get(i));

We know that we can get a null value from the list; therefore, we wrap the
element into Optional with Optional.ofNullable.

word.ifPresent(System.out::println);

We check if there is some value in the Optional with
ifPresent. If case there is one, we print it.

In the following example, we have three methods that return an
Optional type.

Main.java
  

import java.util.Optional;

void main() {

    if (getNullMessage().isPresent()) {
        System.out.println(getNullMessage().get());
    } else {
        System.out.println("n/a");
    }

    if (getEmptyMessage().isPresent()) {
        System.out.println(getEmptyMessage().get());
    } else {
        System.out.println("n/a");
    }

    if (getCustomMessage().isPresent()) {
        System.out.println(getCustomMessage().get());
    } else {
        System.out.println("n/a");
    }
}

Optional&lt;String&gt; getNullMessage() {
    return Optional.ofNullable(null);
}

Optional&lt;String&gt; getEmptyMessage() {
    return Optional.empty();
}

Optional&lt;String&gt; getCustomMessage() {
    return Optional.of("Hello there!");
}

The three methods return a null message, an empty message and a real message.

if (getNullMessage().isPresent()) {
    System.out.println(getNullMessage().get());
} else {
    System.out.println("n/a");
}

First, we check if the value returned by the method contains a value with
isPresent. If true, we get the value with get.
Otherwise we print "n/a" message.

## Optional ifEmpty

The ifEmpty returns true, if the value is not present. 

 

Main.java
  

import java.util.Arrays;
import java.util.Optional;

void main() {

    var words = Arrays.asList("rock", null, "mountain",
            null, "falcon", "sky");

    for (int i = 0; i &lt; 5; i++) {

        Optional&lt;String&gt; word = Optional.ofNullable(words.get(i));

        if (word.isEmpty()) {

            System.out.println("n/a");
        }

        word.ifPresent(System.out::println);
    }
}

In the example, we print all valid values with ifPresent. All empty 
values are recognized via isEmpty.

## Optional orElse

The orElse method allows us to quickly return a value if it is not
present.

Main.java
  

import java.util.Optional;

void main() {

    System.out.println(getNullMessage().orElse("n/a"));
    System.out.println(getEmptyMessage().orElse("n/a"));
    System.out.println(getCustomMessage().orElse("n/a"));
}

Optional&lt;String&gt; getNullMessage() {
    return Optional.ofNullable(null);
}

Optional&lt;String&gt; getEmptyMessage() {
    return Optional.empty();
}

Optional&lt;String&gt; getCustomMessage() {
    return Optional.of("Hello there!");
}

We managed to shorten the example a bit with orElse method.

In this article we covered the Optional type in Java.

## Optional flatMap

The flatMap method applies the provided  mapping function to a
value if it is present. It returns that result or otherwise an empty
Optional. If the result is already an Optional,
flatMap does not wrap it within an additional
Optional.

Main.java
  

import java.util.Arrays;
import java.util.Optional;
import java.util.function.Function;

void main() {

    Function&lt;String, Optional&lt;String&gt;&gt; upperCase = s -&gt; Optional.of(s.toUpperCase());

    var words = Arrays.asList("rock", null, "mountain",
            null, "falcon", "sky");

    for (int i = 0; i &lt; 5; i++) {

        Optional&lt;String&gt; word = Optional.ofNullable(words.get(i));

        var res = word.flatMap(upperCase);
        res.ifPresent(System.out::println);
    }
}

## JSoup example

In the following example, we use JSoup library to parse and modify an HTML
document. 

For the project, we need the jsoup artifact. 

Main.java
  

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;

import java.util.Optional;

void main() {

    String htmlString = """
            &lt;html&gt;
            &lt;head&gt;
            &lt;title&gt;My title&lt;/title&gt;
            &lt;/head&gt;
            &lt;body&gt;
            &lt;main&gt;&lt;/main&gt;
            &lt;/body&gt;
            &lt;/html&gt;
            """;

    var doc = Jsoup.parse(htmlString);
    Optional&lt;Element&gt; mainEl = Optional.ofNullable(doc.select("main").first());

    mainEl.ifPresent(e -&gt; {
        e.append("&lt;p&gt;hello there!&lt;/p&gt;");
        e.prepend("&lt;h1&gt;Heading&lt;/h1&gt;");
    });

    System.out.println(doc);
}

We parse an HTML string and look for the main tag. If it is
present, we append p and h1 tags to the document.

var doc = Jsoup.parse(htmlString);
Optional&lt;Element&gt; mainEl = Optional.ofNullable(doc.select("main").first());

The main tag might not be present and the first method 
in this case will return null. Therefore, we use the 
Optional.ofNullable method. 

mainEl.ifPresent(e -&gt; {
    e.append("&lt;p&gt;hello there!&lt;/p&gt;");
    e.prepend("&lt;h1&gt;Heading&lt;/h1&gt;");
});

We only call append and prepend methods if the 
Optional contains the main tag.

## Jdbi example

The findOne method returns the only row in the result set, if any.  
It returns Optional.empty() if zero rows are returned, or if the  
row itself is null.  

For the example, we need the jdbi3-core and the
postgresql artifacts.

Main.java
  

import org.jdbi.v3.core.Jdbi;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    int id = 3;

    String query = "SELECT name FROM cars WHERE id = ?";
    Optional&lt;String&gt; res = jdbi.withHandle(handle -&gt; handle.select(query, id)
            .mapTo(String.class)
            .findOne());

    res.ifPresentOrElse(System.out::println, () -&gt; System.out.println("N/A"));
}

In the example, we select a single cell from a row in a table. We print the data  
if it is present or N/A if not.

## Source

[Java Optional - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html)

In the example, we apply the upperCase function on the list of
words.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).