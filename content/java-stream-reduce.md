+++
title = "Java Stream reduce"
date = 2025-08-29T20:00:35.783+01:00
draft = false
description = "Java Stream reduce tutorial provides an in-depth guide on how to perform reduction operations using Java streams. Learn about combining elements, aggregating results, and using different types of reduce operations to optimize functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Stream reduce

last modified May 24, 2025

 

This article explores how to perform reduction operations on Java streams,
enabling efficient data aggregation and computation.

A Java Stream represents a sequence of elements derived from a data
source, supporting powerful aggregate operations. Unlike collections, streams do
not store elements; instead, they process data on demand. Streams can consume
elements from various sources, such as collections, arrays, or I/O resources,
allowing for flexible data processing.

## Understanding Stream Reduction

A reduction is a terminal operation that processes a stream to
produce a single resulting value. The Java Stream API provides several built-in
reduction operations, including average, sum,
min, max, and count. These operations
efficiently aggregate stream elements, making them essential for computations
such as statistical analysis, data summarization, and numerical processing.

## The reduce method

Stream.reduce is a general-purpose method for generating our custom
reduction operations.

Optional&lt;T&gt; reduce(BinaryOperator&lt;T&gt; accumulator)

This method performs a reduction on the elements of this stream, using an
associative accumulation function. It returns an Optional
describing the reduced value, if any.

T reduce(T identity, BinaryOperator&lt;T&gt; accumulator)

This method takes two parameters: the identity and the accumulator. The identity
element is both the initial value of the reduction and the default result if
there are no elements in the stream. The accumulator function takes two
parameters: a partial result of the reduction and the next element of the
stream. It returns a new partial result. The Stream.reduce
method returns the result of the reduction.

T reduce(T identity, BiFunction&lt;T, T, T&gt; accumulator,
        BinaryOperator&lt;T&gt; combiner)

This method takes three parameters: the identity, the accumulator, and the
combiner function. The identity is the initial value of the reduction, the
accumulator function is used to combine the elements of the stream, and the
combiner function is used to combine partial results when the stream is
processed in parallel. It returns the result of the reduction.

## Built-in reductions

The following example uses predefined reduction operations.

Main.java
  

void main() {

    int vals[] = { 2, 4, 6, 8, 10, 12, 14, 16 };

    int sum = Arrays.stream(vals).sum();
    System.out.printf("The sum of values: %d%n", sum);

    long n = Arrays.stream(vals).count();
    System.out.printf("The number of values: %d%n", n);

    double avg = Arrays.stream(vals).average().orElse(0.0);
    System.out.printf("The average of values: %.2f%n", avg);

    OptionalInt max = Arrays.stream(vals).max();

    if (max.isPresent()) {
        System.out.printf("The maximum value: %d%n", max.getAsInt());
    } else {
        System.out.println("No maximum value found.");
    }

    OptionalInt min = Arrays.stream(vals).min();
    if (min.isPresent()) {
        System.out.printf("The minimum value: %d%n", min.getAsInt());
    } else {
        System.out.println("No minimum value found.");
    }
}

We have an array of integers. We create a stream from the array with
Arrays.stream and perform sum, count,
max and min reduction operations.

double avg = Arrays.stream(vals).average().orElse(0.0);
System.out.printf("The average of values: %.2f%n", avg);

We compute the average of the values. The average method returns
an OptionalDouble, which we convert to a double with the
orElse method, providing a default value of 0.0 if the stream is
empty.

OptionalInt max = Arrays.stream(vals).max();

if (max.isPresent()) {
    System.out.printf("The maximum value: %d%n", max.getAsInt());
} else {
    System.out.println("No maximum value found.");
}

The max method returns an OptionalInt. We check if
the maximum value is present using the isPresent method. If it is,
we print it to the console using the getAsInt method. If the stream
is empty, we print a message indicating that no maximum value was found.

## Working with Optional

The reduce method with one parameter returns an
Optional, which is a Java class for null safety.

Main.java
  

void main() {

    List&lt;Car&gt; persons = List.of(new Car("Skoda", 18544),
            new Car("Volvo", 22344),
            new Car("Fiat", 23650),
            new Car("Renault", 19700));

    Optional&lt;Car&gt; car = persons.stream().reduce((c1, c2)
            -&gt; c1.price() &gt; c2.price() ? c1 : c2);

    car.ifPresent(System.out::println);
}

record Car(String name, int price) {
}

The example creates a list of car objects. We compute the most expensive
car.

Optional&lt;Car&gt; car = persons.stream().reduce((c1, c2)
        -&gt; c1.price() &gt; c2.price() ? c1 : c2);

From the list, we create a stream; the accumulator of the reduce
method compares the prices of the cars and returns the more expensive one.

car.ifPresent(System.out::println);

If the returned reduction value is not null, we print it to the console.

Car{name=Fiat, price=23650}

The next example adds other use cases.

Main.java
  

void main() {

    IntStream.range(1, 10).reduce((x, y) -&gt; x + y)
            .ifPresent(System.out::println);
    IntStream.range(1, 10).reduce(Integer::sum)
            .ifPresent(System.out::println);
    IntStream.range(1, 10).reduce(MyUtil::add2Ints)
            .ifPresent(System.out::println);
}

class MyUtil {

    static int add2Ints(int num1, int num2) {
        return num1 + num2;
    }
}

We create three different accumulator functions to compute the sum of 1..10
values.

IntStream.range(1, 10).reduce((x, y) -&gt; x + y)
        .ifPresent(System.out::println);

In the first case, we have a lambda expression doing the addition.

IntStream.range(1, 10).reduce(Integer::sum)
        .ifPresent(System.out::println);

The second case uses a built in Integer::sum method.

IntStream.range(1, 10).reduce(MyUtil::add2Ints)
        .ifPresent(System.out::println);

Finally, we have a custom addition method.

## Java reduce with identity

As we have already mentioned, the identity is both the initial value of the
reduction and the default result if there are no elements in the stream.

Main.java
  

void main() {

    List&lt;User&gt; users = new ArrayList&lt;&gt;();

    users.add(new User("Frank", LocalDate.of(1979, 11, 23)));
    users.add(new User("Peter", LocalDate.of(1985, 1, 18)));
    users.add(new User("Lucy", LocalDate.of(2002, 5, 14)));
    users.add(new User("Albert", LocalDate.of(1996, 8, 30)));
    users.add(new User("Frank", LocalDate.of(1967, 10, 6)));

    int maxAge = users.stream().mapToInt(User::getAge).reduce(0, Math::max);

    System.out.printf("The oldest user's age: %s%n", maxAge);
}

record User(String name, LocalDate dateOfBirth) {
    public int getAge() {
        return dateOfBirth.until(IsoChronology.INSTANCE.dateNow()).getYears();
    }
}

In the example, we create a list of users. The example calculates the age of
the oldest user.

int maxAge = users.stream().mapToInt(User::getAge).reduce(0, Math::max);

From the list we create a Java stream. The stream is mapped to an
IntStream with a mapToInt method. Finally, the
reduce method provides an identity value (0) and an accumulator;
the accumulator compares the age values and returns the bigger one.

## Java Three-Argument Reduce

The reduce method can take three arguments: an identity
value, an **accumulator function**, and a combiner
function. This variant is useful for parallel stream operations, where
intermediate results need to be merged efficiently.

Main.java
  

void main() {

    List&lt;Car&gt; cars = List.of(new Car("Skoda", 18544),
            new Car("Volvo", 22344),
            new Car("Fiat", 23650),
            new Car("Renault", 19700));

    int totalPrice = cars.stream().reduce(0, 
            (sum, car) -&gt; sum + car.price(), 
            Integer::sum);

    System.out.println("Total price of all cars: " + totalPrice);
}

record Car(String name, int price) {
}

This example calculates the total price of all cars using the three-argument
reduce method. The sum variable serves as the identity value,
the accumulator function adds the price of each car to the current sum, and the
combiner function Integer::sum merges partial results when the
stream is processed in parallel.

## Summing Word Lengths in a Text Corpus

Java streams can be used to process text efficiently, including operations like
counting words, filtering sentences, or measuring total word length. In this
example, we use the reduce method with three arguments to calculate
the total length of all words in a list of sentences while leveraging parallel
stream processing for better efficiency.

Main.java
  

void main() {

    List&lt;String&gt; sentences = List.of(
        "Java streams are powerful.",
        "Reduction operations enable efficient computation.",
        "Functional programming is becoming more popular."
    );

    int totalWordLength = sentences.parallelStream() // Use parallelStream()
        .flatMap(sentence -&gt; Arrays.stream(sentence.replaceAll("\\.", "").split(" ")))
        .reduce(0, 
            (sum, word) -&gt; sum + word.length(), // Accumulator
            Integer::sum); // Combiner

    System.out.println("Total length of all words: " + totalWordLength);
}

This example demonstrates the three-argument reduce operation,
which consists of an identity value, an accumulator function, and a combiner
function. The identity value, 0, serves as the initial sum before
any computation begins.

The accumulator function takes two parameters: the current sum and the next
word. It returns the updated sum by adding the length of the current word to the
existing sum. The combiner function, Integer::sum, is critical for
parallel execution, ensuring that partial sums computed by different threads are
correctly merged into a single final result.

By using parallelStream, this implementation improves performance
on larger datasets while demonstrating how reduction operations work in
concurrent processing environments.

## Source

[Java Stream documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

In this article we have have worked with Java Stream reduction operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).