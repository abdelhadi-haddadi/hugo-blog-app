+++
title = "Java Function"
date = 2025-08-29T19:58:44.219+01:00
draft = false
description = "Java Function tutorial shows how to work with the Function interface in Java. Function represents a function that accepts one argument and produces a result."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Function

last modified July 7, 2024

 

In this article we show how to work with the Function interface in Java. The
interface is located in the java.util.function package.

## Function definition

Function is a Java functional interface which represents a function
that accepts one argument and produces a result. It is an interface with a
single abstract method that takes input(s), performs a specific task, and
optionally returns an output.

Since Java does not support plain functions, the interface was introduced in
order to overcome this limitation. In fact, the compiler creates behind the
scenes an object from each Function.

The Function is used to create small plain functions outside a
class and anomymous expressions, especially in the functional programming
paradigm.

## Simple Function example

The following is a simple example that uses Function.

Main.java
  

import java.util.function.Function;
import java.util.List;

Function&lt;Integer, Integer&gt; doubleNum = n -&gt; n * 2;

void main() {

    var vals = List.of(1, 2, 3, 4, 5 );

    for (var e: vals) {

        int res = doubleNum.apply(e);
        System.out.println(res);
    }
}

We define a function that multiplies a value by two.

Function&lt;Integer, Integer&gt; doubleNum = n -&gt; n * 2;

The function declares two types. The first is the type of the input to the
function and the second is the type of the result of the function. The variable
following the equals character is the input variable. The result of the
expression after -&gt; is the function return value. Note that we 
have defined a function outside of a class. 

var vals = List.of(1, 2, 3, 4, 5 );

for (var e: vals) {

    int res = doubleNum.apply(e);
    System.out.println(res);
}

We go over the list of integers and apply the function on each element.

$ java Main.java
2
4
6
8
10

In the next example, we use Function to define a greeter. 

Main.java
  

import java.util.List;
import java.util.function.Function;

Function&lt;String, String&gt; greet = name -&gt; String.format("Hello %s!", name);

void main() {

    var names = List.of("Peter", "Lucia", "Jozef", "Martin");

    for (var name : names) {

        String greeting = greet.apply(name);
        System.out.println(greeting);
    }
}

The function in the example takes a name as a parameter and returns a greeting. 

Function&lt;String, String&gt; greet = name -&gt; String.format("Hello %s!", name);

We use template string to construct the greeting from the "Hello" literal and 
the name input variable.

$ java Main.java
Hello Peter!
Hello Lucia!
Hello Jozef!
Hello Martin!

## Removing duplicates

In the next example, we remove duplicates from a list of integers.

Main.java
  

import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.List;

Function&lt;List&lt;Integer&gt;, List&lt;Integer&gt;&gt; remDup = vals -&gt; vals.stream()
        .distinct()
        .collect(Collectors.toList());

void main() {

    var nums = List.of(1, 2, 1, 2, 3, 4, 5, 1, 0, -1 );
    var nums2 = remDup.apply(nums);

    System.out.println(nums2);
}

We have a list of integers. We define the remDup function to remove 
the duplicate values.

Function&lt;List&lt;Integer&gt;, List&lt;Integer&gt;&gt; remDup = vals -&gt; vals.stream()
    .distinct()
    .collect(Collectors.toList());

The function takes a list of integers as input and retuns a list of integers.
In its body it uses the distinct method to do the job.

$ java Main.java
[1, 2, 3, 4, 5, 0, -1]

## Function in a filter

The stream filter method expects a predicate function. 
We have a special type of a function called Predicate. But 
we can also use Function.

Main.java
  

import java.util.function.Function;
import java.util.List;

Function&lt;Integer, Boolean&gt; isEven = n -&gt; n % 2 == 0; 

void main() {

    var vals = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    vals.stream().filter(isEven::apply).forEach(System.out::println);
}

We define the isEven function which returns true if the number is 
an even number. 

vals.stream().filter(isEven::apply).forEach(System.out::println);

We pass the reference to the function's apply method. 

$ java Main.java
2
4
6
8

The predicate function would be defined as follows:

Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;

## Calculating age

The following example uses a function to calculate the age of a user.

Main.java
  

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

Function&lt;LocalDate, Integer&gt; findAge = dob -&gt; Period.between(dob,
        LocalDate.now()).getYears();

Consumer&lt;User&gt; action = u -&gt; System.out.printf("%s is %d years old%n", 
    u.name, findAge.apply(u.dob));

void main() {

    List&lt;User&gt; users = List.of(
            User.of("John Doe", "gardener", LocalDate.of(1956, 11, 12)),
            User.of("Roger Roe", "driver", LocalDate.of(1976, 11, 12)),
            User.of("John Doe", "teacher", LocalDate.of(1967, 1, 7)),
            User.of("John Doe", "gardener", LocalDate.of(1998, 5, 22)));

    users.forEach(action);
}

record User(String name, String occupation, LocalDate dob) {
    static User of(String name, String occupation, LocalDate dob) {
        return new User(name, occupation, dob);
    }
}

We have a list of users. Each user has a date of birth as a field. We calculate 
the user's age in a function from this field.

Function&lt;LocalDate, Integer&gt; findAge = dob -&gt; Period.between(dob,
    LocalDate.now()).getYears();

The function uses a simple expression in which the age is calculated using 
Period.between method.

Consumer&lt;User&gt; action = u -&gt; System.out.printf("%s is %d years old%n", 
    u.name, findAge.apply(u.dob));

We define a consumer that prints the message for each element.

$ java Main.java
John Doe is67 years old
Roger Roe is47 years old
John Doe is57 years old
John Doe is25 years old

## Categorizing age

The next example uses a function with a switch expression.

Main.java
  

import java.util.function.Function;
import java.util.function.Consumer;
import java.util.List;

Function&lt;Integer, String&gt; ageCategory = age -&gt; switch (age) {
    case Integer n when n &lt; 18 &amp;&amp; n &gt; 0 -&gt; "minor";
    case Integer n when n &gt;= 18 &amp;&amp; n &lt; 64 -&gt; "adult";
    case Integer n when n &gt; 64 -&gt; "senior";
    default -&gt; "n/a";
};

Consumer&lt;String&gt; action = System.out::println;

void main() {

    List&lt;Integer&gt; ages = List.of(11, 18, 17, 19, 21, 55, 86, 99, 43, 65, 63);
    ages.stream().map(age -&gt; ageCategory.apply(age)).forEach(action);
}

We have a list of age values. We put each of the values into a category: minor, 
adult, and senior. 

$ java Main.java
minor
adult
minor
adult
adult
adult
senior
senior
adult
senior
adult

## Key extractor Function

We define a function that serves as a key extractor for a comparator. 

Main.java
  

import java.util.function.Function;
import java.util.Comparator;
import java.util.List;

Function&lt;String, Integer&gt; strLen = String::length;

void main() {

    var words = List.of("peculiar", "up", "blue", "atom", "by", "nice",
            "storm", "edible", "sky", "bookworm", "stronghold");

    words.forEach(System.out::println);

    System.out.println("----------------------");

    var sorted = words.stream().sorted(Comparator.comparing(strLen)).toList();

    sorted.forEach(System.out::println);
}

We have a list of words. We sort the words by their length.

Function&lt;String, Integer&gt; strLen = String::length;

The function returns the string length of the passed value. It serves as a key 
for the comparator object.

var sorted = words.stream().sorted(Comparator.comparing(strLen)).toList();

We pass our key-extractor function to Comparator.comparing, which 
generates a comparator for the sorted method.

$ java Main.java
peculiar
up
blue
atom
by
nice
storm
edible
sky
bookworm
stronghold
----------------------
up
by
sky
blue
atom
nice
storm
edible
peculiar
bookworm
stronghold

## Function composition

Functions can be composed with the compose and andThen
methods. The difference is the order in which the functions are called.

Main.java
  

import java.util.function.Function;

void main() {

    Function&lt;String, String&gt; upperFun = String::toUpperCase;
    Function&lt;String, String&gt; reverseFun = val -&gt; new StringBuilder(val).reverse().toString();

    var res = upperFun.compose(reverseFun).apply("falcon");
    System.out.println(res);
}

The compose function aplies the reverseFun and the
upperFun on the parameter.

$ java Main.java
NOCLAF

Sometimes, the order in which the functions are composed matters.

Main.java
  

import java.util.function.Function;

void main() {

    Function&lt;Double, Double&gt; half = a -&gt; a / 2;
    Function&lt;Double, Double&gt; square = a -&gt; a * a;
    
    Function&lt;Double, Double&gt; squareAndThenHalf = square.andThen(half);
    Double res1 = squareAndThenHalf.apply(3d);
    
    System.out.println(res1);

    Function&lt;Double, Double&gt; squareComposeHalf = square.compose(half);
    Double res2 = squareComposeHalf.apply(3d);
    System.out.println(res2);
}

We have two methods half and square.

Function&lt;Double, Double&gt; squareAndThenHalf = square.andThen(half);
Double res1 = squareAndThenHalf.apply(3d);  

The andThen method first squares and then halves.

Function&lt;Double, Double&gt; squareComposeHalf = square.compose(half);
Double res2 = squareComposeHalf.apply(3d);

The compose method first halves and then squares.

$ java Main.java
4.5
2.25

In the next example, we combine three functions.

Main.java
  

import java.util.function.Function;

Function&lt;Integer, Integer&gt; fn1 = n -&gt; n + 1;
Function&lt;Integer, Integer&gt; fn2 = n -&gt; n * 2;
Function&lt;Integer, Integer&gt; fn3 = n -&gt; n * n;

Function&lt;Integer, Integer&gt; cfn1 = fn1.andThen(fn2).andThen(fn3);
Function&lt;Integer, Integer&gt; cfn2 = fn1.compose(fn2).compose(fn3);

void main() {

    Integer res = cfn1.apply(10);
    System.out.println(res);

    Integer res2 = cfn2.apply(10);
    System.out.println(res2);
}

First, we compose the three functions with andThen and then with 
compose.

$ java Main.java
484
201

## Passing Function as a parameter

In the following example, we pass the defined Function to another 
function as a parameter.

Main.java
  

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

void main() {

    List&lt;String&gt; words = List.of("coin", "pen", "Monday", "NASA", "Moscow",
            "cup", "notebook", "class");

    Function&lt;String, String&gt; uf = String::toUpperCase;
    Function&lt;String, String&gt; lf = String::toLowerCase;

    var res = modify(words, uf);
    System.out.println(res);

    var res2 = modify(words, lf);
    System.out.println(res2);
}

List&lt;String&gt; modify(List&lt;String&gt; data, Function&lt;String, String&gt; f) {
    var uppered = new ArrayList&lt;String&gt;();

    for (var e : data) {
        uppered.add(f.apply(e));
    }

    return uppered;
}

In the program we have a list of words. We define the modify method
which takes a function as a parameter. The function transforms the array
elements and returns a new list of modified strings.

Function&lt;String, String&gt; uf = String::toUpperCase;
Function&lt;String, String&gt; lf = String::toLowerCase;

We have two functions. They uppercase and lowercase the passed word.

List&lt;String&gt; modify(List&lt;String&gt; data, Function&lt;String, String&gt; f) {

The modify function takes a function as the second parameter.

$ java Main.java
[COIN, PEN, MONDAY, NASA, MOSCOW, CUP, NOTEBOOK, CLASS]
[coin, pen, monday, nasa, moscow, cup, notebook, class]

## Source

[Java Function - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Function.html)

In this article we have worked with Java Function interface.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).