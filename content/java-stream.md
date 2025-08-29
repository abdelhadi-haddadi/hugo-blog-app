+++
title = "Java Stream"
date = 2025-08-29T20:00:33.563+01:00
draft = false
description = "Learn how to efficiently process data in Java using the powerful Stream API. This tutorial covers creating streams from various sources and applying essential operations to enhance performance and readability in Java programming."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Stream

Last modified May 23, 2025

 

This article explores how Java Streams enable efficient data processing. You
will learn how to create streams from various sources and apply essential
operations to improve performance and readability in Java programs.

## Java stream definition

Stream is a sequence of elements from a source that supports
sequential and parallel aggregate operations. Common aggregate operations
include filter, map, reduce, find, match, and sort. The source can be a
collection, IO operation, or array, which provides data to the stream.

A Java collection is an in-memory data structure containing all elements, while
a stream computes elements on demand. Unlike collections, which require explicit
(external) iteration, streams handle iteration internally. Since Java 8,
collections have a stream method that returns a stream from the
collection.

The Stream interface is defined in the
java.util.stream package.

Stream operations produce results without modifying their source.

## Characteristics of a stream

Streams do not store data; they provide data from a source such as a
collection, array, or IO channel.
Streams do not modify the data source. They transform data into a new
stream, for example, when filtering.
Many stream operations are lazily evaluated, allowing for automatic
optimizations and short-circuiting.
Streams can be infinite. Methods such as limit allow you to
retrieve results from infinite streams.
Stream elements can be accessed only once during the stream's lifetime. Like
an Iterator, you must generate a new stream to revisit the same
elements.
Streams provide methods such as forEach and
forEachOrdered for internal iteration.
Streams support SQL-like and common functional operations, such as filter,
map, reduce, find, match, and sorted.

## Stream pipeline

A stream pipeline consists of a source, intermediate operations, and a terminal
operation. Intermediate operations return a new, modified stream, allowing you
to chain multiple operations. Terminal operations return a value or void. After
a terminal operation, the stream cannot be used further. Short-circuiting a
terminal operation means the stream may terminate before processing all values,
which is useful for infinite streams.

Intermediate operations are lazy; they are not invoked until a terminal
operation is executed. This improves performance when processing large data
streams.

## Creating streams

Streams can be created from collections, arrays, strings, IO resources, or
generators.

Main.java
  

void main() {

    List&lt;String&gt; words = List.of("pen", "coin", "desk", "chair");

    String word = words.stream().findFirst().get();
    System.out.println(word);

    Stream&lt;String&gt; letters = Arrays.stream(new String[]{"a", "b", "c"});
    System.out.printf("There are %d letters%n", letters.count());

    String day = "Sunday";
    IntStream istr = day.codePoints();

    String s = istr.filter(e -&gt; e != 'n').collect(StringBuilder::new,
            StringBuilder::appendCodePoint, StringBuilder::append).toString();
    System.out.println(s);
}

This example demonstrates working with streams created from a list, an array,
and a string.

List&lt;String&gt; words = List.of("pen", "coin", "desk", "chair");

A list of strings is created.

String word = words.stream().findFirst().get();

We use the stream method to create a stream from a list. The
findFirst method returns the first element as an
Optional, from which we retrieve the value using get.

Stream&lt;String&gt; letters = Arrays.stream(new String[]{ "a", "b", "c"});
System.out.printf("There are %d letters%n", letters.count());

We create a stream from an array. The count method returns the
number of elements in the stream.

String day = "Sunday";
IntStream istr = day.codePoints();

String s = istr.filter(e -&gt; e != 'n').collect(StringBuilder::new,
        StringBuilder::appendCodePoint, StringBuilder::append).toString();
System.out.println(s);

Here, we create a stream from a string, filter its characters, and build a new
string from the filtered characters.

$ java Main.java
pen
There are 3 letters
Suday

There are three Stream specializations: IntStream,
DoubleStream, and LongStream.

Main.java
  

void main() {

    IntStream integers = IntStream.rangeClosed(1, 16);
    var res = integers.average();

    if (res.isPresent()) {
        System.out.println(res.getAsDouble());
    }

    DoubleStream doubles = DoubleStream.of(2.3, 33.1, 45.3);
    doubles.forEachOrdered(System.out::println);

    LongStream longs = LongStream.range(6, 25);
    System.out.println(longs.count());
}

This example demonstrates the use of the three stream specializations.

IntStream integers = IntStream.rangeClosed(1, 16);
System.out.println(integers.average().getAsDouble());

A stream of integers is created with the IntStream.rangeClosed method.

if (res.isPresent()) {
    System.out.println(res.getAsDouble());
}

If the value is present, we print the average to the console.

DoubleStream doubles = DoubleStream.of(2.3, 33.1, 45.3);
doubles.forEachOrdered(System.out::println);

A stream of double values is created with the DoubleStream.of
method. The forEachOrdered method prints the elements in order.

LongStream longs = LongStream.range(6, 25);
System.out.println(longs.count());

A stream of long integers is created with the LongStream.range
method. We print the count of elements using the count method.

$ java Main.java
8.5
2.3
33.1
45.3
19

The Stream.of method creates a sequential, ordered stream
containing the specified values.

Main.java
  

void main() {

    Stream&lt;String&gt; colours = Stream.of("red", "green", "blue");
    Optional&lt;String&gt; col = colours.skip(2).findFirst();

    col.ifPresent(System.out::println);

    Stream&lt;Integer&gt; nums = Stream.of(3, 4, 5, 6, 7);
    Optional&lt;Integer&gt; maxVal = nums.max(Comparator.naturalOrder());

    maxVal.ifPresent(System.out::println);
}

This example shows how to use Stream.of to create two different
streams.

Stream&lt;String&gt; colours = Stream.of("red", "green", "blue");

A stream of three strings is created.

Optional&lt;String&gt; col = colours.skip(2).findFirst();

Using the skip method, we skip two elements and find the next one
with findFirst. The findFirst method returns an
Optional&lt;String&gt;.

col.ifPresent(System.out::println);

We print the value if it is present.

Stream&lt;Integer&gt; nums = Stream.of(3, 4, 5, 6, 7);
Optional&lt;Integer&gt; maxVal = nums.max(Comparator.naturalOrder());

maxVal.ifPresent(System.out::println);

We create a stream of integers and find its maximum value.

$ java Main.java
blue
7

Other ways to create streams include Stream.iterate and
Stream.generate.

Main.java
  

void main() {

    Stream&lt;Integer&gt; s1 = Stream.iterate(5, n -&gt; n * 2).limit(10);
    s1.forEach(System.out::println);

    Stream.generate(new Random()::nextDouble)
            .map(e -&gt; (e * 10))
            .limit(5)
            .forEach(System.out::println);
}

This example creates two streams using Stream.iterate and
Stream.generate.

Stream&lt;Integer&gt; s1 = Stream.iterate(5, n -&gt; n * 2).limit(10);
s1.forEach(System.out::println);

The Stream.iterate method returns an infinite, sequential, ordered
stream produced by iterative application of a function to an initial element
(the seed). Each subsequent element is generated by applying the function to the
previous element.

Stream.generate(new Random()::nextDouble)
        .map(e -&gt; (e * 10))
        .limit(5)
        .forEach(System.out::println);

A stream of five random doubles is created with Stream.generate.
Each element is multiplied by ten, and the results are printed to the console.

$ java Main.java
5
10
20
40
80
160
320
640
1280
2560
8.704675577530493
5.732011478196306
3.8978402578067515
3.6986033299500933
6.0976417139147205

You can also create a stream from a file.

Main.java
  

void main() throws IOException {

    Path path = Paths.get("/home/janbodnar/myfile.txt");

    try (Stream&lt;String&gt; stream = Files.lines(path)) {

        stream.forEach(System.out::println);
    }
}

This example reads a file and prints its contents using streams.

Path path = Paths.get("/home/janbodnar/myfile.txt");

A Path object is created with Paths.get. A
Path object locates a file in the file system.

try (Stream&lt;String&gt; stream = Files.lines(path)) {
    ...
}

From the path, we create a stream using Files.lines; each element
of the stream is a line from the file.

stream.forEach(System.out::println);

We iterate through the stream and print each line to the console.

## Internal and external iteration

Depending on who controls the iteration process, we distinguish between
*external* and *internal* iteration. External iteration, also
known as explicit iteration, is handled by the programmer and was the only type
available before Java 8. For external iteration, we use for and while loops.
Internal iteration, also called implicit iteration, is controlled by the
iterator itself and is available in Java streams.

Main.java
  

void main() {

    var words = List.of("pen", "coin", "desk", "eye", "bottle");

    Iterator&lt;String&gt; it = words.iterator();

    while (it.hasNext()) {

        System.out.println(it.next());
    }
}

In this code example, we retrieve an iterator from a list of strings. Using the
iterator's hasNext and next methods in a while loop,
we iterate over the list elements.

In the following example, we iterate over the same list using internal
iteration.

Main.java
  

void main() {

    var words = List.of("pen", "coin", "desk", "eye", "bottle");
    words.stream().forEach(System.out::println);
}

Here, we create a stream from a list and use the stream's forEach
method to iterate over its elements internally.

words.stream().forEach(System.out::println);

This can be shortened to words.forEach(System.out::println);.

## Stream filtering

Filtering data is one of the most important features of streams. The
filter method is an intermediate operation that returns a stream
containing only elements that match the given predicate. A predicate is a method
that returns a boolean value.

Main.java
  

void main() {

    IntStream nums = IntStream.rangeClosed(0, 25);
    int[] vals = nums.filter(e -&gt; e &gt; 15).toArray();

    System.out.println(Arrays.toString(vals));
}

This code example creates a stream of integers and filters it to contain only
values greater than fifteen.

IntStream nums = IntStream.rangeClosed(0, 25);

With IntStream, a stream of twenty-six integers is created. The
rangeClosed method creates a stream of integers from a start to an
end value, both inclusive.

int[] vals = nums.filter(e -&gt; e &gt; 15).toArray();

We pass a lambda expression (e -&gt; e &gt; 15) to the
filter function; it returns true for values greater than 15. The
toArray method is a terminal operation that transforms the stream
into an array of integers.

System.out.println(Arrays.toString(vals));

The array is printed to the console.

$ java Main.java
[16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

The next example produces a list of even numbers.

Main.java
  

void main() {

    IntStream nums = IntStream.rangeClosed(0, 30);
    nums.filter(this::isEven).forEach(System.out::println);
}

boolean isEven(int e) {

    return e % 2 == 0;
}

To get even numbers from a stream, we pass an isEven method
reference to the filter method.

nums.filter(this::isEven).forEach(System.out::println);

The double colon (::) operator is used to pass a method reference. The
forEach method is a terminal operation that iterates over the
stream elements and takes a method reference to System.out.println.

## Skipping and limiting elements

The skip(n) method skips the first n elements of the stream, and
the limit(m) method limits the number of elements in the stream to
m.

Main.java
  

void main() {

    IntStream s = IntStream.range(0, 15);
    s.skip(3).limit(5).forEach(System.out::println);
}

This example creates a stream of fifteen integers, skips the first three
elements with skip, and limits the number of elements to five with
limit.

$ java Main.java
3
4
5
6
7

## Sorting elements

The sorted method sorts the elements of the stream according to the
provided Comparator.

Main.java
  

void main() {

    IntStream nums = IntStream.of(4, 3, 2, 1, 8, 6, 7, 5);
    int[] sorted = nums.sorted().toArray();

    System.out.println("Sorted: " + Arrays.toString(sorted));
}

This example sorts integer elements in descending order. The boxed
method converts an IntStream to a
Stream&lt;Integer&gt;.

$ java Main.java
8
7
6
5
4
3
2
1

The next example shows how to sort a stream of objects.

Main.java
  

record Car(String name, int price) {
}

void main() {

    List&lt;Car&gt; cars = List.of(new Car("Citroen", 23000),
            new Car("Porsche", 65000), new Car("Skoda", 18000),
            new Car("Volkswagen", 33000), new Car("Volvo", 47000));

    cars.stream().sorted(Comparator.comparing(Car::price))
            .forEach(System.out::println);
}

The example sorts cars by their price.

List&lt;Car&gt; cars = List.of(new Car("Citroen", 23000),
    new Car("Porsche", 65000), new Car("Skoda", 18000),
    new Car("Volkswagen", 33000), new Car("Volvo", 47000));

A list of cars is created.

cars.stream().sorted(Comparator.comparing(Car::price))
    .forEach(System.out::println);

A stream is generated from the list using the stream method. We
pass a reference to the price method of Car, which is
used for comparison.

$ java Main.java
Car{name=Skoda, price=18000}
Car{name=Citroen, price=23000}
Car{name=Volkswagen, price=33000}
Car{name=Volvo, price=47000}
Car{name=Porsche, price=65000}

## Unique values

The distinct method returns a stream consisting of unique elements.

Main.java
  

void main() {

    IntStream nums = IntStream.of(1, 1, 3, 4, 4, 6, 7, 7);
    int[] a = nums.distinct().toArray();

    System.out.println(Arrays.toString(a));
}

This example removes duplicate values from a stream of integers.

IntStream nums = IntStream.of(1, 1, 3, 4, 4, 6, 7, 7);

There are three duplicate values in the stream.

int[] a = nums.distinct().toArray();

We remove the duplicates with the distinct method.

$ java Main.java
[1, 3, 4, 6, 7]

## Mapping operations

It is possible to transform elements into a new stream; the original source is
not modified. The map method returns a stream consisting of the
results of applying a given function to the elements of a stream.
map is an intermediate operation.

Main.java
  

void main() {

    IntStream nums = IntStream.of(1, 2, 3, 4, 5, 6, 7, 8);
    int[] squares = nums.map(e -&gt; e * e).toArray();

    System.out.println(Arrays.toString(squares));
}

We map a transformation function onto each element of the stream.

int[] squares = nums.map(e -&gt; e * e).toArray();

We apply a lambda expression (e -&gt; e * e) to the stream: each
element is squared. A new stream is created and transformed into an array with
the toArray method.

$ java Main.java
[1, 4, 9, 16, 25, 36, 49, 64]

In the next example, we transform a stream of strings.

Main.java
  

void main() {

    Stream&lt;String&gt; words = Stream.of("cardinal", "pen", "coin", "globe");
    words.map(this::capitalize).forEach(System.out::println);
}

String capitalize(String word) {

    word = word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    return word;
}

We have a stream of strings and capitalize each string in the stream.

words.map(this::capitalize).forEach(System.out::println);

We pass a reference to the capitalize method to the
map method.

$ java Main.java
Cardinal
Pen
Coin
Globe

## Stream reductions

A reduction is a terminal operation that aggregates a stream into a
single value or primitive.

Main.java
  

void main() {

    IntStream nums = IntStream.of(1, 2, 3, 4, 5, 6, 7, 8);
    OptionalInt maxValue = nums.max();

    if (maxValue.isPresent()) {
        System.out.printf("The maximum value is: %d%n", maxValue.getAsInt());
    }
}

This example demonstrates a reduction operation that finds the maximum value in
a stream of integers.

OptionalInt maxValue = nums.max();

With the max method, we get the maximum element of the stream. The
method returns an OptionalInt, from which we retrieve the integer
using getAsInt.

if (maxValue.isPresent()) {
    System.out.printf("The maximum value is: %d%n", maxValue.getAsInt());
}

We print the value if it is present.

$ java Main.java
The maximum value is: 8

A custom reduction can be created with the reduce method.

Main.java
  

void main() {

    IntStream nums = IntStream.of(1, 2, 3, 4, 5, 6, 7, 8);
    OptionalInt product = nums.reduce((a, b) -&gt; a * b);
    
    if (product.isPresent()) {
        System.out.printf("The product is: %d%n", product.getAsInt());

    }
}

This example returns the product of the integer elements in the stream.

$ java Main.java
The product is: 40320

## Collection operations

A collection is a terminal reduction operation that reduces elements
of a stream into a Java collection, string, value, or specific grouping.

Main.java
  

record Car(String name, int price) {
}

void main() {

    List&lt;Car&gt; cars = List.of(new Car("Citroen", 23000),
            new Car("Porsche", 65000), new Car("Skoda", 18000),
            new Car("Volkswagen", 33000), new Car("Volvo", 47000));

    List&lt;String&gt; names = cars.stream().map(Car::name)
            .filter(name -&gt; name.startsWith("Vo"))
            .collect(Collectors.toList());

    for (String name : names) {
        
        System.out.println(name);
    }
}

This example creates a stream from a list of car objects, filters the cars by
their name, and returns a list of matching car names.

List&lt;String&gt; names = cars.stream().map(Car::name)
    .filter(name -&gt; name.startsWith("Vo"))
    .collect(Collectors.toList());

At the end of the pipeline, we use the collect method to transform
the stream into a list.

$ java Main.java
Volkswagen
Volvo

In the next example, we use the collect method to group data.

Main.java
  

void main() {

    List&lt;String&gt; items = List.of("pen", "book", "pen", "coin",
            "book", "desk", "book", "pen", "book", "coin");

    Map&lt;String, Long&gt; result = items.stream().collect(
            Collectors.groupingBy(
                    Function.identity(), Collectors.counting()
            ));

    for (Map.Entry&lt;String, Long&gt; entry : result.entrySet()) {

        String key = entry.getKey();
        Long value = entry.getValue();

        System.out.format("%s: %d%n", key, value);
    }
}

This code example groups elements by their occurrence in a stream.

Map&lt;String, Long&gt; result = items.stream().collect(
        Collectors.groupingBy(
                Function.identity(), Collectors.counting()
        ));

With the Collectors.groupingBy method, we count the occurrences of
elements in the stream. The operation returns a map.

for (Map.Entry&lt;String, Long&gt; entry : result.entrySet()) {

    String key = entry.getKey();
    Long value = entry.getValue();

    System.out.format("%s: %d%n", key, value);
}

We iterate through the map and print its key/value pairs.

$ java Main.java
desk: 1
book: 4
pen: 3
coin: 2

## Source

[Java Stream documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

In this article we have learned how to create and use Java streams. We have 
seen how to create streams from collections, arrays, strings, and IO
resources. We have also learned how to filter, sort, and map streams.
We have learned how to perform reductions and collect results into
Java collections. We have also learned how to use the Stream
API to perform various operations on streams, such as filtering,
mapping, and reducing. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).