+++
title = "Filtering a list in Java"
date = 2025-08-29T19:58:41.949+01:00
draft = false
description = "Learn how to filter lists in Java using built-in tools, Stream API, and Eclipse Collections. This tutorial provides practical examples and best practices for efficient filtering."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Filtering a list in Java

last modified June 1, 2025

 

In this article, we explore different techniques for filtering a list in Java
efficiently and effectively.

Filtering a list is a common operation in programming, allowing developers to
narrow down a collection of elements based on specific criteria. In Java, this
can be achieved using various methods, including traditional loops, the Stream
API, and third-party libraries like Eclipse Collections. Each approach has its
own advantages and use cases, making it essential to understand the best
practices for filtering lists in Java.

## Filter a list of integers

In the first example, we filter a list of integers.

Main.java
  

void main() {

    var vals = List.of(-3, 0, 1, -1, 2, 5, 12, 8, -7, -2, 11);
    var res = new ArrayList&lt;Integer&gt;();

    for (int e: vals) {

        if (e &gt; 0) {
            res.add(e);
        }
    }

    System.out.println(res);
}

The example filters all positive values to a new list.

for (int e: vals) {

    if (e &gt; 0) {
        res.add(e);
    }
}

If the value satisfies the condition, it is added to the res list 
with add method.

The next code example uses the filter method.

Main.java
  

void main() {

    var vals = List.of(-3, 0, 1, -1, 2, 5, 12, 8, -7, -2, 11);
    var res = vals.stream().filter(e -&gt; e &gt; 0).toList();

    System.out.println(res);
}

We turn the list into a stream and apply the filter method.
The condition is specified with the e -&gt; e &gt; 0 lambda 
expression.

## Filter a list of words

Next we filter a list of latin words.

Main.java
  

void main() {

    var words = List.of("war", "water", "cup", "cloud",
         "spy", "sky", "terrain", "book", "forest");

    List&lt;String&gt; res = new ArrayList&lt;&gt;();

    for (var word: words) {
        if (word.startsWith("w") || word.startsWith("c")) {
            res.add(word);
        }
    }

    System.out.println(res);
}

We have a list of words. We include all words into the new list that either 
start with w or c.

Now we filter the words with filter method.

Main.java
  

void main() {

    var words = List.of("war", "water", "cup", "cloud",
            "spy", "sky", "terrain", "book", "forest");

    var res = words.stream()
            .filter(word -&gt; word.startsWith("w") || word.startsWith("c"))
            .toList();

    System.out.println(res);
}

## Filter a list of objects

In the next example we filter a list of user objects.

Main.java
  

void main() {

    var p1 = new User("Michael", 2300, Gender.MALE);
    var p2 = new User("Jane", 2400, Gender.FEMALE);
    var p3 = new User("John", 4400, Gender.MALE);
    var p4 = new User("Peter", 5400, Gender.MALE);
    var p5 = new User("Lucy", 3500, Gender.FEMALE);

    var users = List.of(p1, p2, p3, p4, p5);
    var res = new ArrayList&lt;User&gt;();

    for (User user : users) {
        if (user.salary() &gt; 3000) {
            res.add(user);
        }
    }

    System.out.println(res);
}

enum Gender {
    MALE, FEMALE
}

record User(String name, int salary, Gender gender) {
}

The program filter out all users that are older than thirty.

The next program filters out all females. 

Main.java
  

void main() {

    var p1 = new User("Michael", 2300, Gender.MALE);
    var p2 = new User("Jane", 2400, Gender.FEMALE);
    var p3 = new User("John", 4400, Gender.MALE);
    var p4 = new User("Peter", 5400, Gender.MALE);
    var p5 = new User("Lucy", 3500, Gender.FEMALE);

    var users = List.of(p1, p2, p3, p4, p5);
    var res = users.stream().filter(u -&gt; u.gender == Gender.FEMALE).toList();

    res.forEach(System.out::println);
}

enum Gender {
    MALE, FEMALE
}

record User(String name, int salary, Gender gender) {
}

We pass the u -&gt; u.gender == Gender.FEMALE lambda expression to 
filter all females from a group of users.

## Filtering by age

In the next example, we filter a list of persons by age.

Main.java

record User(String firstName, String lastName, String dateOfBirth) {
}

void main() {

    List&lt;User&gt; users = List.of(

            new User("John", "Doe", "2002-11-09"),
            new User("Alice", "Smith", "1995-07-15"),
            new User("Bob", "Johnson", "1988-03-22"),
            new User("Robert", "Patrick", "1964-01-02"),
            new User("Emily", "Clark", "1990-05-30"),
            new User("Michael", "Brown", "1985-08-17"),
            new User("Sophia", "Garcia", "1999-12-04"),
            new User("David", "Martinez", "1977-06-22"),
            new User("Jessica", "Lopez", "1993-09-15"),
            new User("Daniel", "Wilson", "2001-03-19"),
            new User("Olivia", "Taylor", "1989-07-11"),
            new User("Ethan", "Anderson", "2005-02-25"),
            new User("Charlotte", "Thomas", "1996-10-08"),
            new User("James", "Harris", "1982-04-29")
    );

    users.stream().filter(user -&gt; getAge(user.dateOfBirth()) &gt; 40)
            .forEach(System.out::println);
}

int getAge(String dateOfBirth) {

    return LocalDate.parse(dateOfBirth).until(LocalDate.now()).getYears();

}

In the example, we filter users who are older than 40 years. The
getAge method calculates the age of a user based on their date of
birth. It uses the LocalDate class to parse the date and
calculate the difference in years between the user's date of birth and the
current date.

Using a classic for loop, the example would look like this:

Main.java
  

record User(String firstName, String lastName, String dateOfBirth) {
}

void main() {

    List&lt;User&gt; users = List.of(
            
            new User("John", "Doe", "2002-11-09"),
            new User("Alice", "Smith", "1995-07-15"),
            new User("Bob", "Johnson", "1988-03-22"),
            new User("Robert", "Patrick", "1964-01-02"),
            new User("Emily", "Clark", "1990-05-30"),
            new User("Michael", "Brown", "1985-08-17"),
            new User("Sophia", "Garcia", "1999-12-04"),
            new User("David", "Martinez", "1977-06-22"),
            new User("Jessica", "Lopez", "1993-09-15"),
            new User("Daniel", "Wilson", "2001-03-19"),
            new User("Olivia", "Taylor", "1989-07-11"),
            new User("Ethan", "Anderson", "2005-02-25"),
            new User("Charlotte", "Thomas", "1996-10-08"),
            new User("James", "Harris", "1982-04-29")
    );

    List&lt;User&gt; users_40plus = new ArrayList&lt;&gt;();

    for (int i = 0; i &lt; users.size(); i++) {

        User user = users.get(i);

        if (getAge(user.dateOfBirth()) &gt; 40) {
            users_40plus.add(user);
        }
    }

    System.out.println(users_40plus);
}

int getAge(String dateOfBirth) {

    return LocalDate.parse(dateOfBirth).until(LocalDate.now()).getYears();

}

In this version, we use a classic for loop to iterate through the list of users.
If a user's age is greater than 40, we add them to the users_40plus
list. This approach is straightforward but less concise than using the Stream
API.

## Filtering a list with Eclipse Collections

In the following example, we are going to filter a list with Eclipse Collections.

*Eclipse Collections* is a collections framework for Java. It has
JDK-compatible List, Set and Map implementations with
a rich API, additional types not found in the JDK like Bags, Multimaps
and set of utility classes that work with any JDK compatible Collections,
Arrays, Maps or Strings.

&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.eclipse.collections&lt;/groupId&gt;
        &lt;artifactId&gt;eclipse-collections-api&lt;/artifactId&gt;
        &lt;version&gt;11.1.0&lt;/version&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
        &lt;groupId&gt;org.eclipse.collections&lt;/groupId&gt;
        &lt;artifactId&gt;eclipse-collections&lt;/artifactId&gt;
        &lt;version&gt;11.1.0&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;

For the program, we use these two Maven dependencies.

Main.java
  

package com.zetcode;

import org.eclipse.collections.api.block.predicate.Predicate;
import org.eclipse.collections.api.factory.Lists;
import org.eclipse.collections.impl.utility.Iterate;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        var persons = Lists.immutable.of(

                new User("Michael", 34, Gender.MALE),
                new User("Jane", 17, Gender.FEMALE),
                new User("John", 28, Gender.MALE),
                new User("Peter", 47, Gender.MALE),
                new User("Lucy", 27, Gender.FEMALE)
        );

        Predicate&lt;User&gt; lessThan30 = person -&gt; person.age() &lt; 30;
        List&lt;User&gt; res = (List&lt;User&gt;) Iterate.select(persons, lessThan30);
        System.out.println(res);
    }
}

enum Gender {
    MALE,
    FEMALE
}

record User(String name, int age, Gender gender) {
}

The code example creates a filtered list containing persons younger than thirty.

Predicate&lt;User&gt; lessThan30 = person -&gt; person.age() &lt; 30;

A predicate is created to accept elements whose age is lower than thirty.

List&lt;User&gt; res = (List&lt;User&gt;) Iterate.select(persons, lessThan30);

The Iterate.select returns a new collection with only the elements
that evaluated to true for the specified predicate.

## Source

[Java ArrayList - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html)

In this article we have showed how to filter a list in Java. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).