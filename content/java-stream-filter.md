+++
title = "Java Stream filter"
date = 2025-08-29T20:00:34.655+01:00
draft = false
description = "Java Stream filter tutorial provides a detailed guide on how to use the filter method to efficiently process and filter elements in Java streams. Learn about predicate functions, lambda expressions, and functional programming techniques to enhance stream filtering in Java 8 and beyond."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Stream filter

last modified May 25, 2025

 

In this article, we explore how to efficiently filter Java streams using
filtering operations. Filtering is a fundamental technique in functional
programming that helps refine datasets, extract relevant information, and
streamline data processing within Java streams.

A Java Stream represents a sequence of elements originating from
a data source, supporting various aggregate operations such as filtering,
mapping, reducing, and sorting. Unlike collections, streams do not store
elements permanently; instead, they process elements on demand, making them
highly efficient for large datasets. Java streams can operate on collections,
arrays, I/O resources, and other sources, providing a functional approach to
data manipulation.

Stream aggregate operations resemble SQL queries, allowing developers to
perform sophisticated data transformations with minimal code. Through
functional programming principles, streams enable operations such as:

  - **Filtering:** Selecting elements based on conditions.

  - **Mapping:** Transforming elements from one form to another.

  - **Reducing:** Aggregating elements to compute a summary result.

  - **Matching:** Checking if elements meet specific criteria.

  - **Sorting:** Ordering elements efficiently.

One of the key benefits of Java streams is their ability to chain multiple
operations, leading to concise, readable, and highly efficient code. Unlike
traditional collections, which rely on external iteration, Java streams
utilize internal iteration, delegating execution control to the runtime for
optimized processing.

## The filter Method

The Java Stream filter method is an intermediate operation,
designed to select elements that meet a specified condition. It takes a
predicate function, which evaluates each element and returns a boolean value
indicating whether the element should be included in the final stream.

This method is particularly useful when working with large datasets, allowing
developers to refine and extract relevant data without modifying the original
collection.

The filter method can be combined with other stream operations for
complex data processing, making Java streams a powerful tool for modern
application development.

## Filter by string length

The following example filters a list of strings.

Main.java
  

void main() {

    List&lt;String&gt; words = List.of("pen", "custom", "orphanage",
            "forest", "bubble", "butterfly");

    List&lt;String&gt; result = words.stream().filter(word -&gt; word.length() &gt; 5).toList();

    result.forEach(System.out::println);
}

We have a list of words. We filter the list to include only strings whose length
is bigger than five.

List&lt;String&gt; result = words.stream().filter(word -&gt; word.length() &gt; 5).toList();

With the stream method, we create a Java Stream from a list of
strings. On this stream, we apply the filter method. The
filter method accepts an anonymous functions that returns a boolean
true for all elements of the stream whose length is bigger that five. 

result.forEach(System.out::println);

We go through the result with the forEach method and print all its
elements to the console.

$ java Main.java
custom
orphanage
forest
bubble
butterfly

## Filter null values

The next example filters out null values.

Main.java
  

void main() {

    List&lt;String&gt; words = new ArrayList&lt;&gt;();
    words.add("cup");
    words.add(null);
    words.add("forest");
    words.add("sky");
    words.add("book");
    words.add(null);
    words.add("theatre");
    
    List&lt;String&gt; result = words.stream().filter(Objects::nonNull).toList();

    System.out.println(result);
}

We have a list of words. With the Stream filtering operation, we create a new
list with null values discarded. 

List&lt;String&gt; result = words.stream().filter(Objects::nonNull).toList();

In the body of the lambda expression, we check that the value is not
null. The toList method is a terminal operation that
creates a list from the filtered stream.

## Multiple filter operations

It is possible to apply multiple filter operations on a stream.

Main.java
  

void main() {

    int[] inums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 };
    
    IntConsumer icons = i -&gt; System.out.print(i + " ");
    
    Arrays.stream(inums).filter(e -&gt; e &lt; 6 || e &gt; 10)
            .filter(e -&gt; e % 2 == 0).forEach(icons);
}

In the example, we apply multiple filter operations on a stream of integers.

int[] inums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 };

We have an array of integer values.

IntConsumer icons = i -&gt; System.out.print(i + " ");

IntConsumer is a functional interface that accepts an integer
value and performs an action on it. In this case, it prints the integer value
to the console.

Arrays.stream(inums).filter(e -&gt; e &lt; 6 || e &gt; 10)
        .filter(e -&gt; e % 2 == 0).forEach(icons);

A stream is created from the array with the Arrays.stream method.
Multiple filtering operations are performed. 

## Filter objects

The next example shows how to filter objects.

Main.java
  

void main() {

    List&lt;User&gt; persons = List.of(
            new User("Jack", "jack234@gmail.com"),
            new User("Peter", "pete2@post.com"),
            new User("Lucy", "lucy17@gmail.com"),
            new User("Robert", "bob56@post.com"),
            new User("Martin", "mato4@imail.com")
    );

    List&lt;User&gt; result = persons.stream()
            .filter(person -&gt; person.email().matches(".*post\\.com"))
            .toList();

    result.forEach(p -&gt; System.out.println(p.name()));
}

record User(String name, String email) {
}

The example creates a stream of User objects. It filters those
which match a specific regular expression.

List&lt;User&gt; result = persons.stream()
        .filter(person -&gt; person.email().matches(".*post\\.com"))
        .toList();

In the filter predicate, we choose emails that match the
.*post\\.com pattern.

## Filtering users by age

The next example filters users by their age. We use the Period
class to calculate the age of a user based on their date of birth. 

Main.java

void main() {

    List&lt;User&gt; users = List.of(
            new User("John", "Doe", "1990-01-01"),
            new User("Jane", "Doe", "1985-05-15"),
            new User("Alice", "Smith", "2000-12-31"),
            new User("Paul", "Anka", "1965-11-04"),
            new User("Bob", "Brown", "1995-07-20"),
            new User("Charlie", "Johnson", "1980-03-10"),
            new User("Diana", "Prince", "1992-11-11")
    );

    users.stream()
            .filter(user -&gt; user.age() &gt; 40)
            .forEach(user -&gt; System.out.printf(
                    "%s %s is %d years old%n",
                    user.firstName(), user.lastName(), user.age()));
}

record User(String firstName, String lastName, String dateOfBirth) {

    int age() {
        return Period.between(
                LocalDate.parse(dateOfBirth), LocalDate.now()).getYears();
    }
}

The filter method is used to select users older than 40 years.

$ java Main.java
Paul Anka is 59 years old
Charlie Johnson is 45 years old

## Filter map by keys

In the following example, we filter a map by its keys. The key is retrived using
the getKey method of the Map.Entry interface.

Main.java
  

void main() {

    Map&lt;String, String&gt; hmap = new HashMap&lt;&gt;();
    
    hmap.put("de", "Germany");
    hmap.put("hu", "Hungary");
    hmap.put("sk", "Slovakia");
    hmap.put("si", "Slovenia");
    hmap.put("so", "Somalia");
    hmap.put("us", "United States");
    hmap.put("ru", "Russia");
    
    hmap.entrySet().stream().filter(map -&gt; map.getKey().startsWith("s"))
            .forEach(System.out::println);
}

The example filters domain names starting with s letter. We use the
getKey method to retrieve the key of the map entry and check if it
starts with the letter s using the startsWith
method.

## Filter map by values

In the following example, we filter a map by its values. The value is
retrieved using the getValue method of the Map.Entry
interface.

Main.java
  

void main() {

    Map&lt;String, String&gt; countries = new HashMap&lt;&gt;();

    countries.put("de", "Germany");
    countries.put("hu", "Hungary");
    countries.put("sk", "Slovakia");
    countries.put("si", "Slovenia");
    countries.put("so", "Somalia");
    countries.put("us", "United States");
    countries.put("ru", "Russia");

    countries.entrySet().stream().filter(country -&gt; country.getValue().equals("Slovakia")
                    || country.getValue().equals("Slovenia"))
            .forEach(System.out::println);
}

In the example, we filter out two countries from the map. We use the
getValue method to retrieve the value of the map entry and check if
it equals either "Slovakia" or "Slovenia" using the equals method.

## Source

[Java Stream documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

In this article we have have worked with Java Stream filtering operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).