+++
title = "Java Stream collect"
date = 2025-08-29T20:00:34.650+01:00
draft = false
description = "Learn how to perform reduction operations using Java Stream API's collect method. This tutorial covers efficient data processing techniques for functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Stream collect

last modified May 28, 2025

 

In this article we show how to do reduction operations using collectors.

Java Stream is a sequence of elements from a source that supports
aggregate operations. Streams do not store elements; the elements are computed
on demand. Elements are consumed from data sources such as collections, arrays,
or I/O resources. 

## The collect method

Java Stream collect is a terminal stream operation. It performs a
mutable reduction operation on the elements of the stream. Reduction operations
can be performed either sequentially or in parallel. 

## Collectors

The Collectors class contains predefined collectors to perform
common mutable reduction tasks. The collectors accumulate elements into
collections, reduce elements into a single value (such as min, max, count, or
sum), or group elements by a criteria.

Set&lt;String&gt; uniqueVals = vals.collect(Collectors.toSet());

The toSet method returns a Collector that accumulates
the input elements into a new Set.

// can be replaced with min()
Optional&lt;Integer&gt; min = vals.stream().collect(Collectors.minBy(Integer::compareTo));

The minBy returns a Collector that produces the
minimal element according to a given Comparator.

Map&lt;Boolean, List&lt;User&gt;&gt; usersByStatus =
    users().stream().collect(Collectors.groupingBy(User::isSingle));

With groupingBy we select users who have single status into a group.

Map&lt;Boolean, List&lt;User&gt;&gt; statuses =
    users().stream().collect(Collectors.partitioningBy(User::isSingle));

With partitioningBy we separate the users into two groups based 
on their status attribute.

## Collector

The Collector interface defines a set of methods used during the
reduction process.  
Below is its interface signature, which declares five essential methods:

public interface Collector&lt;T,A,R&gt; {

    Supplier&lt;A&gt; supplier();
    BiConsumer&lt;A,T&gt; accumulator();
    BinaryOperator&lt;A&gt; combiner();
    Function&lt;A,R&gt; finisher();
    Set&lt;Characteristics&gt; characteristics();
}

A Collector is specified by four functions that work together to  
accumulate entries into a mutable result container, optionally performing a
final transform on the result.  

The T represents the type of elements being collected from the stream.  
The A is the type of the accumulator—the intermediate result holder.  
The R is the type of the final result returned by the collector.  

The *supplier* provides a function that creates a new result container.  
The *accumulator* returns a function that performs the reduction operation.  
It accepts two arguments: the first is the mutable result container (accumulator),  
and the second is the stream element being folded into it.  

For parallel collection, the *combiner* merges two accumulators.  
The *finisher* transforms the intermediate result into its final output
of type R. When no transformation is needed, the finisher returns
an identity function.  

**Note:** In mathematics, an identity function outputs its input unchanged.  
In Java, Function.identity provides a function that returns its
argument as-is.

The characteristics method returns an immutable set of collector
characteristics that define its behavior. If the set includes
CONCURRENT, collection can be performed in parallel  
for optimization.  

## Collectors.toList

The Collectors.toList returns a collector that accumulates the
input elements into a new list.

Main.java
  

void main() {

    var words = List.of("marble", "coin", "forest", "falcon",
            "sky", "cloud", "eagle", "lion");

    // filter all four character words into a list
    var words4 = words.stream().filter(word -&gt; word.length() == 4)
            .collect(Collectors.toList());

    System.out.println(words4);
}

The example filters a list of strings and transforms the stream into a list. We
filter the list to include only strings whose length is equal to four.

var words4 = words.stream().filter(word -&gt; word.length() == 4)
    .collect(Collectors.toList());

With the stream method, we create a Java Stream from a list of
strings. On this stream, we apply the filter method. The
filter method accepts an anonymous function that returns a boolean
true for all elements of the stream whose length is four. We create a list back
from the stream with the collect method.

$ java Main.java
[coin, lion]

These two words have four characters.

## Collectors.joining

The Collectors.joining returns a Collector that 
concatenates the input elements into a string, in encounter order.

Main.java
  

void main() {

    var words = List.of("marble", "coin", "forest", "falcon",
            "sky", "cloud", "eagle", "lion");

    // can be replaced with String.join
    var joined = words.stream().collect(Collectors.joining(","));

    System.out.printf("Joined string: %s", joined);
}

We have a list of words. We transform the list into a string where the words 
are separated with comma.

$ java Main.java
Joined string: marble,coin,forest,falcon,sky,cloud,eagle,lion

## Collectors.counting

The Collectors.counting retuns a Collector that counts 
the number of elements in the stream.

Main.java
  

void main() {

    var vals = List.of(1, 2, 3, 4, 5);

    // can be replaced with count
    var n = vals.stream().collect(Collectors.counting());

    System.out.println(n);
}

The example counts the number of elements in the list.

## Collectors.summintInt

The Collectors.summintInt returns a Collector that
produces the sum of a integer-valued function applied to the input elements.

Main.java
  

void main() {

    var cats = List.of(
            new Cat("Bella", 4),
            new Cat("Othello", 2),
            new Cat("Coco", 6)
    );

    // can be replaced with mapToInt().sum()
    var ageSum = cats.stream().collect(Collectors.summingInt(cat -&gt; cat.age()));

    System.out.printf("Sum of cat ages: %d%n", ageSum);
}

record Cat(String name, int age) {
}

The example sums the age of the cats.

var ageSum = cats.stream().collect(Collectors.summingInt(cat -&gt; cat.getAge()));

The parameter of the summingInt method is a mapper function which 
extracts the property to be summed.

## Collectors.collectingAndThen

The Collectors.collectingAndThen adapts a Collector to 
perform an additional finishing transformation.

Main.java
  

void main() {

    var vals = List.of(230, 210, 120, 250, 300);

    var avgPrice = vals.stream().collect(Collectors.collectingAndThen(
            Collectors.averagingInt(Integer::intValue),
            avg -&gt; {
                var nf = NumberFormat.getCurrencyInstance(Locale.of("en", "US"));
                return nf.format(avg);
            })
    );

    System.out.printf("The average price is %s%n", avgPrice);
}

The example calculates an average price and then formats it.

$ java Main.java
The average price is $222.00

## Collector.of

The Collector.of returns a new Collector described by
the given supplier, accumulator, combiner, and finisher functions.

In the following example, we create a custom collector.

Main.java
  

void main() {

    List&lt;User&gt; persons = List.of(
            new User("Robert", 28),
            new User("Peter", 37),
            new User("Lucy", 23),
            new User("David", 28));

    Collector&lt;User, StringJoiner, String&gt; personNameCollector =
            Collector.of(
                    () -&gt; new StringJoiner(" | "), // supplier
            (j, p) -&gt; j.add(p.name()),  // accumulator
            (j1, j2) -&gt; j1.merge(j2),      // combiner
            StringJoiner::toString);       // finisher

    String names = persons
            .stream()
            .collect(personNameCollector);

    System.out.println(names);
}

record User(String name, int age) {}

In the example, we collect the names from the list of user objects.

Collector&lt;User, StringJoiner, String&gt; personNameCollector =
...

The Collector&lt;User, StringJoiner, String&gt; has three types.
The first is the type of input elements for the new collector. The second 
is the type for the intermediate result and the third for the final result.

Collector.of(
        () -&gt; new StringJoiner(" | "), // supplier
        (j, p) -&gt; j.add(p.getName()),  // accumulator
        (j1, j2) -&gt; j1.merge(j2),      // combiner
        StringJoiner::toString);       // finisher

We create our custom collector. First, we build an initial result container. In
our case it is a StringJoiner. The accumulator simply adds the name
from the current user object to the StringJoiner. The combiner
merges two partial results in case of parallel processing. Finally, the finisher
turns the StringJoiner into a plain string.

$ java Main.java
Robert | Peter | Lucy | David

## Collectors.groupingBy

With the Collectors.groupingBy method we can separate the stream 
elements into groups based on the specified criterion.

Main.java
  

void main() {

    Map&lt;String, List&lt;Product&gt;&gt; productsByCategories =
            products().stream().collect(
                    Collectors.groupingBy(Product::category));

    productsByCategories.forEach((k, v) -&gt; {

        System.out.println(k);

        for (var name : v) {
            System.out.println(name);
        }
    });
}

private List&lt;Product&gt; products() {

    return List.of(
            new Product("apple", "fruit", new BigDecimal("4.50")),
            new Product("banana", "fruit", new BigDecimal("3.76")),
            new Product("carrot", "vegetables", new BigDecimal("2.98")),
            new Product("potato", "vegetables", new BigDecimal("0.92")),
            new Product("garlic", "vegetables", new BigDecimal("1.32")),
            new Product("ginger", "vegetables", new BigDecimal("2.45")),
            new Product("white bread", "bakery", new BigDecimal("1.50")),
            new Product("roll", "bakery", new BigDecimal("0.08")),
            new Product("bagel", "bakery", new BigDecimal("0.15"))
    );
}

record Product(String name, String category, BigDecimal price) {
}

We have a list of products. With the Collectors.groupingBy, 
we separate the products into groups based on their category.

$ java Main.java
bakery
Product{name='white bread', category='bakery', price=1.50}
Product{name='roll', category='bakery', price=0.08}
Product{name='bagel', category='bakery', price=0.15}
fruit
Product{name='apple', category='fruit', price=4.50}
Product{name='banana', category='fruit', price=3.76}
vegetables
Product{name='carrot', category='vegetables', price=2.98}
Product{name='potato', category='vegetables', price=0.92}
Product{name='garlic', category='vegetables', price=1.32}
Product{name='ginger', category='vegetables', price=2.45}

## Collectors.partitioningBy

Partitioning is a special case of grouping. Partitioning operation divides the
stream into two groups based on the given predicate function.

Main.java
  

void main() {

    Map&lt;Boolean, List&lt;User&gt;&gt; statuses =
            users().stream().collect(
                    Collectors.partitioningBy(User::single));

    statuses.forEach((k, v) -&gt; {

        if (k) {

            System.out.println("Single: ");
        } else {

            System.out.println("In a relationship:");
        }

        v.forEach(System.out::println);
    });
}

private List&lt;User&gt; users() {

    return List.of(
            new User("Julia", false),
            new User("Jake", false),
            new User("Mike", false),
            new User("Robert", true),
            new User("Maria", false),
            new User("Peter", true)
    );
}

record User(String name, boolean single) {
}

In the example, we partition the stream into two groups based on the single 
attribute. 

Map&lt;Boolean, List&lt;User&gt;&gt; statuses =
    users().stream().collect(Collectors.partitioningBy(User::single));

The Collectors.partitioningBy takes the single
predicate, which returns a boolean value indicating the status of the user.

$ java Main.java
In a relationship:
User{name='Julia', single=false}
User{name='Jake', single=false}
User{name='Mike', single=false}
User{name='Maria', single=false}
Single: 
User{name='Robert', single=true}
User{name='Peter', single=true}

## Source

[Java Stream documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

In this article we have have worked with Java Stream predefined and custom 
collectors.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).