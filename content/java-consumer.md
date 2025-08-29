+++
title = "Java Consumer"
date = 2025-08-29T19:58:30.438+01:00
draft = false
description = "Java Consumer tutorial shows how to work with the Consumer functional interface in Java. Consumer represents an operation that accepts a single input argument and returns no result."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Consumer

last modified February 24, 2024

 

In this article we show how to work with the Consumer functional interface in
Java.

## Consumer

Consumer is a Java functional interface which represents an operation
that accepts a single input argument and returns no result. Unlike most other
functional interfaces, Consumer is expected to operate via
side-effects. 

@FunctionalInterface
public interface Consumer&lt;T&gt; {
    void accept(T t);
}

The Consumer's functional method is accept(Object). It
can be used as the assignment target for a lambda expression or method
reference.

## Java Consumer example

The following example creates a simple consumer. 

Main.java
  

import java.util.function.Consumer;

void main() {

    Consumer&lt;String&gt; showThreeTimes = value -&gt; {

        System.out.println(value);
        System.out.println(value);
        System.out.println(value);
    };

    showThreeTimes.accept("blue sky");
    showThreeTimes.accept("old falcon");
}

The showThreeTimes consumer prints the input three times. 

$ java Main.java
blue sky
blue sky
blue sky
old falcon
old falcon
old falcon

## IntConsumer

IntConsumer represents an operation that accepts a single
int-valued argument and returns no result. This is the primitive type
specialization of Consumer for int.

Main.java
  

import java.util.function.Consumer;
import java.util.function.IntConsumer;

void main() {

    Consumer&lt;Integer&gt; printMultiplyBy100 = (val) -&gt; System.out.println(val * 100);

    printMultiplyBy100.accept(3);
    printMultiplyBy100.accept(4);
    printMultiplyBy100.accept(5);

    IntConsumer printMultiplyBy500 = a -&gt; System.out.println(a * 50);
    printMultiplyBy500.accept(1);
    printMultiplyBy500.accept(2);
    printMultiplyBy500.accept(3);
}

In the example, the consumers multiply the input value. 

$ java Main.java
300
400
500
50
100
150

## Consumer forEach

The forEach method accepts a Consumer as a parameter.
The consumer can be simplified with a lambda expression or a method reference.

Main.java
  

import java.util.List;
import java.util.function.Consumer;

void main() {

    var words = List.of("falcon", "wood", "rock", "forest",
            "river", "water");

    words.forEach(new Consumer&lt;String&gt;() {
        @Override
        public void accept(String s) {

            System.out.println(s);
        }
    });
}

In the example, we go over the elements of a list with forEach. 
The consumer simply prints each of the elements.

$ java Main.java
falcon
wood
rock
forest
river
water

## Consumer andThen

The andThen method returns a composed Consumer that 
performs, in sequence, this operation followed by the next operation.

Main.java
  

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

void main() {

    var vals = new ArrayList&lt;Integer&gt;();
    vals.add(2);
    vals.add(4);
    vals.add(6);
    vals.add(8);

    Consumer&lt;List&lt;Integer&gt;&gt; addTwo = list -&gt; {

        for (int i = 0; i &lt; list.size(); i++) {

            list.set(i, 2 + list.get(i));
        }
    };

    Consumer&lt;List&lt;Integer&gt;&gt; showList = list -&gt; 
        list.forEach(System.out::println);

    addTwo.andThen(showList).accept(vals);
}

In the example, we add value 2 to each of the elements in the list and then 
we print all the elements.

$ java Main.java
4
6
8
10

In the following example, we work with a list of products.

Main.java
  

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

final RoundingMode ROUNDING_MODE = RoundingMode.HALF_EVEN;
final int DECIMALS = 2;

void main() {

    List&lt;Product&gt; products = new ArrayList&lt;&gt;();
    products.add(new Product("A", new BigDecimal("2.54")));
    products.add(new Product("B", new BigDecimal("3.89")));
    products.add(new Product("C", new BigDecimal("5.99")));
    products.add(new Product("D", new BigDecimal("9.99")));

    Consumer&lt;Product&gt; incPrice = p -&gt; {
        p.setPrice(rounded(p.getPrice().multiply(new BigDecimal("1.1"))));
    };

    process(products, incPrice.andThen(System.out::println));
}

BigDecimal rounded(BigDecimal number){
    return number.setScale(DECIMALS, ROUNDING_MODE);
}

void process(List&lt;Product&gt; data, Consumer&lt;Product&gt; cons) {

    for (var e : data) {

        cons.accept(e);
    }
}

class Product {

    private String name;
    private BigDecimal price;

    public Product(String name, BigDecimal price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {

        var sb = new StringBuilder("Product{");
        sb.append("name='").append(name).append('\'');
        sb.append(", price=").append(price);
        sb.append('}');
        return sb.toString();
    }
}

This example increases the prices of products by 10%. 

Consumer&lt;Product&gt; incPrice = p -&gt; {
    p.setPrice(rounded(p.getPrice().multiply(new BigDecimal("1.1"))));
};

The consumer increases the product price by 10% and rounds the value.

process(products, incPrice.andThen(System.out::println));

We increase the prices and then print the modified products. 

void process(List&lt;Product&gt; data, Consumer&lt;Product&gt; cons) {

    for (var e : data) {

        cons.accept(e);
    }
}

The consumer is applied on each product of the list. 

$ java Main.java
Product{name='A', price=2.79}
Product{name='B', price=4.28}
Product{name='C', price=6.59}
Product{name='D', price=10.99}

## Consumer with a custom forEach

The following example creates a custom, generic forEach method.

Main.java
  

import java.util.List;
import java.util.function.Consumer;

void main() {

    var data = List.of(1, 2, 3, 4, 5, 6, 7);

    // Consumer&lt;Integer&gt; consumer = (Integer x) -&gt; System.out.println(x);
    Consumer&lt;Integer&gt; consumer = System.out::println;
    forEach(data, consumer);

    System.out.println("--------------------------");

    forEach(data, System.out::println);
}

&lt;T&gt; void forEach(List&lt;T&gt; data, Consumer&lt;T&gt; consumer) {

    for (T t : data) {

        consumer.accept(t);
    }
}

We have a list of integers. We print all the elements of the list with a 
custom forEach method.

$ java Main.java
1
2
3
4
5
6
7
--------------------------
1
2
3
4
5
6
7

## Source

[Java Consumer - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Consumer.html)

In this article we have worked with Java Consumer interface.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).