+++
title = "Java Stream map"
date = 2025-08-29T20:00:35.779+01:00
draft = false
description = "Java Stream map tutorial provides a comprehensive guide on how to apply the map method for transforming elements in Java streams. Learn how to efficiently modify data, leverage functional programming principles, and use lambda expressions to optimize stream operations in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Stream map

last modified May 25, 2025

 

In this article, we explore how to effectively perform map operations on Java
streams, leveraging functional programming principles to transform data
efficiently.

A Java Stream is a sequence of elements originating from a data
source that supports aggregate operations. Streams do not store
elements—instead, they compute results on demand, making them particularly
useful for handling large datasets. Elements can be consumed from sources such
as collections, arrays, or I/O resources, allowing developers to process data
dynamically.

Stream aggregate operations function similarly to SQL queries, enabling
developers to perform filtering, mapping, reducing, matching, searching, and
sorting directly on the data stream. By leveraging stream chaining, multiple
operations can be applied sequentially, enhancing code readability and
efficiency. Unlike traditional collections that rely on external iteration,
streams are designed to use internal iteration, optimizing execution control and
performance.

## Stream Map Operation

The map method is an intermediate operation in Java Streams that
allows transformation of stream elements into a new form without modifying the
original source. This method applies a function to each element, generating a
new stream with transformed values.

The map method takes a lambda function as an argument and processes
each element individually, applying the transformation defined within the
function. This makes it ideal for data conversion, such as:

  - Modifying object properties within a stream.

  - Extracting specific attributes from complex data structures.

  - Converting one data type to another (e.g., String to Integer).

The benefits of using the map method include:

  - Immutable Processing: Original data remains unchanged.

  - Functional Approach: Reduces boilerplate code for transformations.

  - Performance Optimization: Works efficiently on large datasets.

  - Seamless Integration: Can be combined with other stream operations like filter and reduce.

The map method is a powerful tool for applying transformations to data within
Java streams, making it essential for functional programming and modern Java
development.

## Mapping an arithmetic operation

In the first example, we map an arithmetic operation on a sequence of values.

Main.java
  

void main() {

    var nums = IntStream.of(1, 2, 3, 4, 5, 6, 7, 8);
    var squares = nums.map(e -&gt; e * e).toArray();

    System.out.println(Arrays.toString(squares));
}

In the example, we create a stream of integers. With the map
method we apply an arithmetic operation on the values and then transform
them into an array.

## Converting Strings to Users

The next example demonstrates how to convert a stream of strings into a
stream of custom objects. 

Main.java

void main() throws IOException {

    String data = """
            John,Doe
            Jane,Smith
            Alice,Johnson
            Bob,Brown
            """;

    var users = data.lines()
        .map(line -&gt; line.split(",", 2))
        .map(fields -&gt; new User(fields[0].trim(), fields[1].trim()))
        .toList();

    System.out.println(users);
}

record User(String firstName, String lastName) {
}

We create a User class and map the strings to instances of this
class. Each string is split into first and last names, which is then used to
create a new User object. This approach allows us to transform raw
data into structured objects for easier manipulation and processing within our
application.

## The mapToInt method

The mapToInt method is a specialized version of the map
method that specifically maps elements of a stream to primitive int
values. This method is particularly useful when working with streams of objects
that need to be converted to integers, such as when extracting numeric properties
from objects or performing arithmetic operations on stream elements.

Main.java
  

List&lt;Integer&gt; numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

int sumEvenNumbers = numbers.stream()
    .mapToInt(Integer::intValue) // Convert Integer objects to primitive int
    .filter(n -&gt; n % 2 == 0) // Keep only even numbers
    .sum(); // Compute sum

System.out.println("Sum of even numbers: " + sumEvenNumbers); 

The example demonstrates how to use the mapToInt method to convert
a stream of Integer objects into a stream of primitive int
values. This conversion allows for efficient arithmetic operations, such as
filtering even numbers and calculating their sum. The mapToInt
method is particularly useful when dealing with collections of objects that need
to be transformed into primitive types for numerical computations.

## Mapping a custom method

In the next example we map a custom method on a stream of strings.

Main.java
  

void main() {

    var words = Stream.of("cardinal", "pen", "coin", "globe");
    words.map(this::capitalize).forEach(System.out::println);
}

String capitalize(String word) {

    word = word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    return word;
}

The example capitalizes each of the words in the stream.

## Reading from CSV file

We can read values from a CSV file into a list using map methods.

numbers.csv
  

2,3,5,6,1,0
9,5,6,3,2,1

We have these values in the numbers.csv file.

Main.java
  

void main() throws IOException {

    int sum = Files.lines(Path.of("numbers.csv")) // Stream file lines directly
            .mapToInt(line -&gt; Arrays.stream(line.split(","))
                                    .mapToInt(Integer::parseInt)
                                    .sum()) // Convert and sum each line
        .sum(); // Total sum

    System.out.println("Total sum: " + sum);
}

First, we read the CSV file into a list of strings. Then we create a stream from
the list and apply mapping methods to get a list of integers in the end.

var lines = Files.readAllLines(Path.of("src/resources/numbers.csv"));

With Files.readAllLines, we read all lines of the file into a list
of strings.

int sum = Files.lines(Path.of("numbers.csv")) // Stream file lines directly
        .mapToInt(line -&gt; Arrays.stream(line.split(","))
                                .mapToInt(Integer::parseInt)
                                .sum()) // Convert and sum each line

We create a stream from the file lines. Each line is split by commas, and each
resulting string is converted to an integer using
Integer::parseInt. The mapToInt method is used to
convert the stream of strings into a stream of integers. The sum
method is then applied to calculate the sum of all integers in the stream. This
approach allows for efficient processing of the CSV data, transforming it into a
format suitable for further analysis or calculations.

$ java Main.java
[2, 3, 5, 6, 1, 0, 9, 5, 6, 3, 2, 1]

## Extracting specific attributes

The map method can also be used to extract specific attributes
from objects in a stream. This is particularly useful when dealing with
collections of complex objects, allowing you to focus on the relevant data
without needing to manipulate the entire object structure.

Main.java
  

void main() {

    var users = List.of(new User("Peter", "programmer"),
            new User("Jane", "accountant"), new User("Robert", "teacher"),
            new User("Milan", "programmer"), new User("Jane", "designer"));

    var userNames = users.stream().map(User::name).sorted().toList();
    System.out.println(userNames);

    var occupations = users.stream().map(User::occupation)
            .sorted(Comparator.reverseOrder()).distinct().toList();

    System.out.println(occupations);
}

record User(String name, String occupation) {
}

In this example, we have a list of User objects. We use the
map method to extract the name and occupation
attributes from each user. The sorted method is then applied to
the resulting streams to sort the names alphabetically and the occupations in
reverse order. The distinct method is used to ensure that only
unique occupations are included in the final list. Finally, we collect the
results into lists using the collect method.

$ java Main.java
[Jane, Jane, Milan, Peter, Robert]
[teacher, programmer, designer, accountant]

## Source

[Java Stream documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

In this article we have have worked with Java Stream mapping operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).