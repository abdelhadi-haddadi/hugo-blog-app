+++
title = "Java BigDecimal"
date = 2025-08-29T19:58:06.682+01:00
draft = false
description = "Java BigDecimal tutorial shows how to perform high-precision calculation in Java with BigDecimal. BigDecimal represents an immutable, arbitrary-precision signed decimal number."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BigDecimal

last modified July 4, 2024

 

In this article we show how to perform high-precision calculations in Java with
BigDecimal. 

BigDecimal represents an immutable, arbitrary-precision signed
decimal number. It is used for high-precision arithmetic. BigDecimal
provides operations for arithmetic, scale manipulation, rounding, comparison, 
hashing, and format conversion.

BigDecimal consists of two parts:

    - unscaled value - an arbitrary precision integer

    scale - a 32-bit integer representing the number of digits to 
        the right of the decimal point

For instance, BigDecimal 2.18 has the unscaled value of 218 and 
the scale of 2.

BigDecimal is used in areas where high-precision is necessary;
for instance, financial or monetary calculations.
The arithmetic operations of BigDecimal values are done with 
methods such as add or subtract; the +, 
-, *, \ operators are not overloaded.

## BigDecimal basic arithmetic operations

The following example shows basic arithmetic operations with BigDecimal.

Main.java
  

import java.math.BigDecimal;
import java.math.RoundingMode;

void main() {

    var val1 = new BigDecimal("3.44");
    var val2 = new BigDecimal("2.74");

    BigDecimal res1 = val1.add(val2);
    System.out.println(res1);

    BigDecimal res2 = val1.subtract(val2);
    System.out.println(res2);

    BigDecimal res3 = val1.multiply(val2);
    System.out.println(res3);

    BigDecimal res4 = val1.divide(BigDecimal.TEN, RoundingMode.DOWN);
    System.out.println(res4);

    BigDecimal res5 = val1.divide(val2, 15, RoundingMode.HALF_UP);
    System.out.println(res5);
}

In the example, we have addition, subtraction, multiplication, and division 
operations.

var val1 = new BigDecimal("3.44");
var val2 = new BigDecimal("2.74");

We create two BigDecimal values. The numbers are passed as strings.

BigDecimal res1 = val1.add(val2);
System.out.println(res1);

Here we add two BigDecimal numbers. The addition operation is 
performed with the add method. 

BigDecimal res4 = val1.divide(BigDecimal.TEN, RoundingMode.DOWN);
System.out.println(res4);

When doing the division operation, we also need to specify the rounding mode.

$ java Main.java
6.18
0.70
9.4256
0.34
1.255474452554745

## BigDecimal precision

BigDecimal is used for high-precision arithmetic.

Main.java
  

import java.math.BigDecimal;

    void main() {

        double a = 0.1 + 0.1 + 0.1;
        double b = 0.3;

        System.out.println(a);
        System.out.println(b);
        System.out.println(a == b);

        var c = new BigDecimal("0.1").add(new BigDecimal("0.1"))
                .add(new BigDecimal("0.1"));
        var d = new BigDecimal("0.3");

        System.out.println(c);
        System.out.println(d);
        System.out.println(c.equals(d));
    }

In the example, we compare the precision of a double type with 
BigDecimal. We add three floating point values and compare it 
with the expected output.

$ java Main.java
0.30000000000000004
0.3
false
0.3
0.3
true

There is a small margin error for double; therefore, the operation 
is not precise. The BigDecimal gives the expected output.

## BigDecimal rounding mode

The BigDecimal class gives its user complete control over rounding
behavior. If no rounding mode is specified and the exact result cannot be
represented, an exception is thrown.

Main.java
  

import java.math.BigDecimal;
import java.math.RoundingMode;

void main() {

    var x = new BigDecimal("5.54");
    BigDecimal x2 = x.setScale(1, RoundingMode.FLOOR);
    System.out.println(x2);

    var y = new BigDecimal("5.94");
    BigDecimal y2 = y.setScale(1, RoundingMode.CEILING);
    System.out.println(y2);
}

In the example, we round two values in two different rounding modes.

var x = new BigDecimal("5.54");
BigDecimal x2 = x.setScale(1, RoundingMode.FLOOR);

With the setScale method, we provide the scale and the rounding 
mode. In our case, we round the value to one decimal place with a rounding 
mode RoundingMode.FLOOR, which rouds towards negative infinity.

$ java Main.java
5.5
6.0

## Java BigDecimal comparison

With the compareTo method, two BigDecimal objects 
that are equal in value but have a different scale (like 4.0 and 4.00) are 
considered equal by this method. 

Main.java
  

import java.math.BigDecimal;

void main() {

    var x = new BigDecimal("1.6");
    var y = new BigDecimal("1.60");

    System.out.println(x.equals(y));
    System.out.println(x.compareTo(y));

}

The example compares values 1.6 and 1.60 with equals and 
compareTo.

$ java Main.java
false
0

The compareTo returns 0 for values that are equal.

## BigDecimal practical example

The following example groups produts by category and calculates the total 
price of all products in the categories.

Main.java
  

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

record Product(String name, String category, BigDecimal price) {}

void main() {

    Map&lt;String, Map&lt;BigDecimal, List&lt;Product&gt;&gt;&gt; productsByCategories =
            products().stream().collect(
                    Collectors.groupingBy(Product::category,
                            Collectors.groupingBy(Product::price)));

    productsByCategories.forEach((k, v) -&gt; {

        System.out.printf("%s: ", k);

        var sum = new BigDecimal("0");

        var prices = v.keySet();
        for (var price: prices) {

            sum = sum.add(price);
        }

        System.out.println(sum);
    });
}

List&lt;Product&gt; products() {

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

We have various groceries in three categories: fruit, vegetables, and bakery. 
Our goal is to group the produts by their categories and calculate the sum 
of all prices in the respective categories.

Map&lt;String, Map&lt;BigDecimal, List&lt;Product&gt;&gt;&gt; productsByCategories =
products().stream().collect(
        Collectors.groupingBy(Product::category,
                Collectors.groupingBy(Product::price)));

Using Java streams, we group the products by their categories and then prices.

productsByCategories.forEach((k, v) -&gt; {

    System.out.printf("%s: ", k);

    var sum = new BigDecimal("0");

    var prices = v.keySet();
    for (var price: prices) {

        sum = sum.add(price);
    }

    System.out.println(sum);
});

In the forEach loop, we calculate the sum of all prices for each 
category.

$ java Main.java
bakery: 1.73
fruit: 8.26
vegetables: 7.67

## Source

[Java BigDecimal - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html)

In this article we have shown how to do high-precision arithmetic operations
in Java with BigDecimal.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).