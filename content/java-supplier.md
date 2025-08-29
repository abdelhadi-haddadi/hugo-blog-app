+++
title = "Java Supplier"
date = 2025-08-29T20:00:38.048+01:00
draft = false
description = "Java Supplier tutorial shows how to work with the Supplier functional interface in Java. Supplier represents an operation that returns a result."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Supplier

last modified March 5, 2024

 

In this article we show how to work with the Supplier functional interface in
Java.

## Supplier

Java Supplier is a functional interface which represents an operation
that returns a result. Supplier does not take any arguments.

A Supplier&lt;T&gt; is designed to produce a value without taking
any explicit input parameters. It does this by calling a method or generating
a value internally.

@FunctionalInterface
public interface Supplier&lt;T&gt; {

    T get();
}

T is the type of results supplied by the supplier.

Supplier offers a concise and convenient way to represent
value-providing functions, promoting lazy evaluation, code clarity, and
compatibility with functional programming concepts in Java.

## Simple Supplier example

The following example creates a simple supplier. 

Main.java
  

void main() {

    var words = List.of("falcon", "cup", "fun", "cloud");

    var res = upperWords(words);
    System.out.println(res);
}

List&lt;String&gt; upperWords(List&lt;String&gt; words) {

    var uppered = new ArrayList&lt;String&gt;();

    for (var word : words) {

        Supplier&lt;String&gt; upperSupplier = word::toUpperCase;
        uppered.add(upperSupplier.get());
    }

    return uppered;
}

The program turns words into uppercase using upperSupplier.

Supplier&lt;String&gt; upperSupplier = word::toUpperCase;

The Supplier returns a string. It references the
toUpperCase method of the String type.
It may look like the supplier is taking an argument, but it is not; it is 
taking a reference to a method which itself takes the argument.

The expression word::toUpperCase refers to the bound method reference for the
toUpperCase method on the specific word instance. Since word is a
variable in the loop, a new Supplier&lt;String&gt; is created for
each word individually. The Supplier&lt;String&gt; method on the
Supplier simply invokes toUpperCase on that specific
captured instance.

$ java Main.java
[FALCON, CUP, FUN, CLOUD]

## Product supplier

The next example creates a function that returns products.

Main.java
  

Supplier&lt;List&lt;Product&gt;&gt; productSupplier = () -&gt; {

    return List.of(
        new Product(1, "Product A"),
        new Product(2, "Product B"),
        new Product(3, "Product C"),
        new Product(4, "Product D"),
        new Product(5, "Product E"));
};

void main() {

    productSupplier.get().stream().limit(3).forEach(System.out::println);
}

record Product(int id, String name) {
}

The defined supplier returns a list of products.

productSupplier.get().stream().limit(3).forEach(System.out::println);

We retrieve the list with get. We transform it into a stream and 
fetch the first three products from the list.

$ java Main.java
Product[id=1, name=Product A]
Product[id=2, name=Product B]
Product[id=3, name=Product C]

## IntSupplier

IntSupplier represents a supplier of int-valued results. This is
the int-producing primitive specialization of Supplier.

Main.java
  

void main() {

    IntSupplier randIntSupp = () -&gt; new Random().nextInt(40);

    System.out.println(randIntSupp.getAsInt());
    System.out.println(randIntSupp.getAsInt());

    System.out.println("--------------------");

    IntStream.generate(randIntSupp).limit(6).forEach(System.out::println);
}

The program creates a supplier of random integers.

IntSupplier randIntSupp = () -&gt; new Random().nextInt(40);

The IntSupplier returns a random integer in range [0,40).

System.out.println(randIntSupp.getAsInt());

We get a random integer with getAsInt.

IntStream.generate(randIntSupp).limit(6).forEach(System.out::println);

A stream of six random integers is generated.

$ java Main.java
4
35
--------------------
31
4
10
30
15
8

## Supplier of fibonacci values

The next example creates a supplier which generates a sequence of fibonacci 
values.

Main.java
  

Supplier&lt;Long&gt; fibonacciSupplier = new Supplier&lt;Long&gt;() {

    long a = 0, b = 1;

    public Long get() {

        long nextValue = a + b;
        a = b;
        b = nextValue;
        return a;
    }
};

void main() {

    Stream&lt;Long&gt; fibs = Stream.generate(fibonacciSupplier);
    fibs.limit(20).forEach(e -&gt; System.out.print(STR."\{e} "));
}

We create a stream from the fibonacci supplier and fetch first twenty values.

$ java Main.java
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 

## CompletableFuture.supplyAsync

The Supplier interface is used in various Java APIs. For instance,
the CompletableFuture.supplyAsync returns a
CompletableFuture that is asynchronously completed.

Main.java
  

void main() throws ExecutionException, InterruptedException {

    CompletableFuture&lt;Integer&gt; future = CompletableFuture.supplyAsync(() -&gt; {
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new IllegalStateException(e);
        }
        return new Random().nextInt(40);
    });

    System.out.println(future.get());
}

The program returns a random integer in range [0,40) in an async
operation.

In this article we have worked with Java Supplier interface.

CompletableFuture&lt;Integer&gt; future = CompletableFuture.supplyAsync(() -&gt; {
    try {
        TimeUnit.SECONDS.sleep(1);
    } catch (InterruptedException e) {
        throw new IllegalStateException(e);
    }
    return new Random().nextInt(40);
});

CompletableFuture takes a Supplier as a parameter.

## Source

[Java Supplier - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Supplier.html)

In this article we have worked with the Supplier Java interface.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).