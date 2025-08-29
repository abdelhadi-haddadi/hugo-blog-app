+++
title = "Java Predicate"
date = 2025-08-29T20:00:07.482+01:00
draft = false
description = "Learn how to use Java Predicates effectively in functional programming. Explore examples showcasing Java Predicates for cleaner, more readable code in real-world applications."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Predicate

last modified May 28, 2025

 

In this article we show how to use predicates in Java. With predicates, we
can create code that is more clean and readable. Predicates also help to create
better tests.

## Predicate definition

Predicate in general meaning is a statement about something that is
either true or false. In programming, predicates represent single argument
functions that return a boolean value.

## The Predicate Interface

In Java, predicates are implemented using functional interfaces.  
The Predicate&lt;T&gt; interface is a generic functional interface
that represents a single-argument function returning a boolean value.  
Located in the java.util.function package, it includes the
test(T t) method, which evaluates the given argument against a
specified condition.

Unlike some programming languages, Java does not support standalone functions.  
Additionally, methods in Java are not first-class citizens—they cannot be stored
in collections or passed directly as parameters. To enable functional-style
programming, Java relies on interfaces, allowing objects to represent functions
and be passed to methods such as Iterables.filter. With Java lambda
expressions, working with predicates becomes significantly more concise and
intuitive.

## Java Predicate example

The following example creates a simple Java Predicate.

Main.java
  

class BiggerThanFive&lt;E&gt; implements Predicate&lt;Integer&gt; {

    @Override
    public boolean test(Integer v) {

        Integer five = 5;

        return v &gt; five;
    }
}

void main() {

    List&lt;Integer&gt; nums = List.of(2, 3, 1, 5, 6, 7, 8, 9, 12);

    BiggerThanFive&lt;Integer&gt; btf = new BiggerThanFive&lt;&gt;();
    nums.stream().filter(btf).forEach(System.out::println);
}

In the example, the predicate is used to filter integers.

class BiggerThanFive&lt;E&gt; implements Predicate&lt;Integer&gt; {

    @Override
    public boolean test(Integer v) {

        Integer five = 5;

        return v &gt; five;
    }
}

This is a Java class implementing the Predicate&lt;Integer&gt;
interface. Its test method returns true for values bigger
than five.

List&lt;Integer&gt; nums = List.of(2, 3, 1, 5, 6, 7, 8, 9, 12);

We have a list of integer values.

BiggerThanFive&lt;Integer&gt; btf = new BiggerThanFive&lt;&gt;();

A BiggerThanFive is instantiated.

nums.stream().filter(btf).forEach(System.out::println);

The predicate object is passed to the filter method
to get all values from the list that are bigger than five.

$ java Main.java
6
7
8
9
12

## Java Predicate with lambda

Java lambda expression simplifies the creation of
Java Predicates.

Main.java
  

void main() {

    List&lt;Integer&gt; nums = List.of(2, 3, 1, 5, 6, 7, 8, 9, 12);

    Predicate&lt;Integer&gt; btf = n -&gt; n &gt; 5;

    nums.stream().filter(btf).forEach(System.out::println);
}

The example filters integer values; this time we use Java lambda expression,
which makes the code much shorter.

Predicate&lt;Integer&gt; btf = n -&gt; n &gt; 5;

This is a one-liner that creates the predicate.

## The ArrayList removeIf method

The ArrayList's removeIf method removes all all
elements that satisfy the given predicate.

Main.java
  

void main() {

    var words = new ArrayList&lt;String&gt;();
    words.add("sky");
    words.add("warm");
    words.add("winter");
    words.add("cloud");
    words.add("pen");
    words.add("den");
    words.add("tree");
    words.add("sun");
    words.add("silk");

    Predicate&lt;String&gt; hasThreeChars = word -&gt; word.length() == 3;
    words.removeIf(hasThreeChars);

    System.out.println(words);
}

We have a list of words. We remove all words from the list that have three latin
characters.

$ java Main.java
[warm, winter, cloud, tree, silk]

## The Collectors.PartitioningBy method

The Collectors.PartitioningBy returns a Collector
which partitions the input elements according to a Predicate, and
organizes them into a Map&lt;Boolean, List&lt;T&gt;&gt;.

Main.java
  

void main() {

    var values = List.of(3, -1, 2, 4, -1, 1, 2, 3);

    Predicate&lt;Integer&gt; isPositive = e -&gt; e &gt; 0;

    Map&lt;Boolean, List&lt;Integer&gt;&gt; groups = values.stream()
            .collect(Collectors.partitioningBy(isPositive));

    System.out.println(groups.get(true));
    System.out.println(groups.get(false));

    List&lt;List&lt;Integer&gt;&gt; subSets = new ArrayList&lt;&gt;(groups.values());
    System.out.println(subSets);
}

We have a list of integers. The list is partitioned into two sublists: positive
values and negative values.

$ java Main.java
[4, 1, 2, 3]
[-3, -1, -2, -1]
[[-3, -1, -2, -1], [4, 1, 2, 3]]

## Pattern.asMatchPredicate

The Pattern.asMatchPredicate creates a predicate that tests if a
pattern matches the given input string.

Main.java
  

void main() {

    var words = List.of("book", "bookshelf", "bookworm",
            "bookcase", "bookish", "bookkeeper", "booklet", "bookmark");

    var pred = Pattern.compile("book(worm|mark|keeper)?").asMatchPredicate();
    words.stream().filter(pred).forEach(System.out::println);
}

We create predicate from a regex pattern with
Pattern.asMatchPredicate and apply it to the filter
method.

$ java Main.java
book
bookworm
bookkeeper
bookmark

## The Stream.allMatch predicate

The Stream.allMatch method returns a boolean value indicating
whether all elements of the stream match the provided predicate.

Main.java
  

void main() {

    var values1 = List.of(1, 5, 3, 2, 8, 6, 7);
    var values2 = List.of(1, 5, 3, -2, 8, 0, 9);

    Predicate&lt;Integer&gt; isPositive = e -&gt; e &gt; 0;

    var res1 = values1.stream().allMatch(isPositive);

    if (res1) {
        System.out.println("All values of collection values1 are positive");
    } else {
        System.out.println("All values of collection values1 are not positive");
    }

    var res2 = values2.stream().allMatch(isPositive);

    if (res2) {
        System.out.println("All values of collection values2 are positive");
    } else {
        System.out.println("All values of collection values2 are not positive");
    }
}

In the example, we check if all the values of two collections have only positive
values.

$ java Main.java
All values of collection values1 are positive
All values of collection values2 are not positive

## Pattern.asPredicate

The Pattern.asPredicate method creates a predicate that tests if
this pattern is found in a given input string. The Stream.AnyMatch
method returns a boolean value indicating whether any elements of the stream
match the provided predicate.

Main.java
  

void main() {

    var words = List.of("skylark", "trial", "water", "cloud", "curtain", "falcon");

    var pred = Pattern.compile("^...{3}$").asPredicate();
    var res = words.stream().anyMatch(pred);

    if (res) {
        System.out.println("There is a word which has three latin characters");
    } else {
        System.out.println("There is no word which has three latin characters");
    }
}

We have a list of words. We check if there is a word that has three latin
characters.

$ java Main.java
There is a word which has three latin characters

## The Stream.Iterate method

The Stream.Iterate method returns a sequential ordered stream
produced by iterative application of the given function to an initial element,
conditioned on satisfying the given predicate.

Main.java
  

void main() {

    Predicate&lt;Double&gt; pred = e -&gt; e &lt; 100;
    UnaryOperator&lt;Double&gt; op = e -&gt; e * 2;

    Stream.iterate(1d, pred, op).forEach(System.out::println);
}

With Stream.iterate, we generate a stream which applies the given
function to the previosly generated element. The stream terminates when the
predicate returns false; in our case, when the generated stream value  is
greater than 100.

$ java Main.java
1.0
2.0
4.0
8.0
16.0
32.0
64.0

## Predicate with multiple conditions

The next example uses a predicate with two conditions.

Main.java
  

void main() {

    var countries = List.of(
            new Country("Iran", 80840713),
            new Country("Hungary", 9845000),
            new Country("Poland", 38485000),
            new Country("India", 1342512000),
            new Country("Latvia", 1978000),
            new Country("Vietnam", 95261000),
            new Country("Sweden", 9967000),
            new Country("Iceland", 337600),
            new Country("Israel", 8622000));

    Predicate&lt;Country&gt; p1 = c -&gt; c.name().startsWith("I") &amp;&amp;
            c.population() &gt; 10000000;

    countries.stream().filter(p1).forEach(System.out::println);
}

record Country(String name, int population) {
}

In the example, we create a list of countries. We filter the list by
the country name and population.

Predicate&lt;Country&gt; p1 = c -&gt; c.name().startsWith("I") &amp;&amp;
    c.population() &gt; 10000000;

The predicate returns true for countries that start with 'I' and their
population is over ten million.

$ java Main.java
Country{name=Iran, population=80840713}
Country{name=India, population=1342512000}

Two countries from the list fulfill the conditions: Iran and India.

## The Predicate.isEqual method

The Predicate.isEqual returns a predicate that tests if two
arguments are equal according to Objects.equals.

Main.java
  

void main() {

    var users1 = List.of(new User("John Doe", "gardener"),
            new User("Roger Roe", "driver"), new User("Jane Doe", "teacher"));

    var users2 = List.of(new User("John Doe", "gardener"),
            new User("Roger Roe", "driver"), new User("Jane Doe", "teacher"));

    var users3 = List.of(new User("John Doe", "architect"),
            new User("Roger Roe", "driver"), new User("Jane Doe", "teacher"));

    Predicate&lt;List&lt;User&gt;&gt; pred = Predicate.isEqual(users1);

    if (pred.test(users2)) {
        System.out.println("users1 and user2 are equal");
    } else {
        System.out.println("users1 and user2 are not equal");
    }

    if (pred.test(users3)) {
        System.out.println("users1 and user3 are equal");
    } else {
        System.out.println("users1 and user3 are not equal");
    }
}

record User(String name, String occupation) {
}

The example checks if two lists of users are equal.

$ java Main.java
users1 and user2 are equal
users1 and user3 are not equal

## IntPredicate

IntPredicate represents a predicate of one int-valued argument.
This is the int-consuming primitive type specialization of
Predicate&lt;E&gt;.

Main.java
  

void main() {

    int[] nums = { 2, 3, 1, 5, 6, 7, 8, 9, 12 };
    IntPredicate p = n -&gt; n &gt; 5;

    Arrays.stream(nums).filter(p).forEach(System.out::println);
}

The example filters an array of int values with
filter and IntPredicate.

int nums[] = { 2, 3, 1, 5, 6, 7, 8, 9, 12 };

We define an array of integers.

IntPredicate p = n -&gt; n &gt; 5;

An IntPredicate is created; it returns true for int
values bigger than five.

Arrays.stream(nums).filter(p).forEach(System.out::println);

We create a stream from the array and filter the elemetnts. The
filter method receives the predicate as a parameter.

## BiPredicate

The BiPredicate is the two-arity specialization of
Predicate. It represents a predicate of two arguments.

Main.java
  

void main() {

    var words = List.of("sky", "water", "club", "spy", "silk", "summer",
            "war", "cup", "cloud", "coin", "small", "terse", "falcon",
            "snow", "snail", "see");

    BiPredicate&lt;String, Integer&gt; pred = (w, len) -&gt; w.length() == len;
    words.stream().filter(e -&gt; pred.test(e, 3)).forEach(System.out::println);

    System.out.println("---------------------");

    words.stream().filter(e -&gt; pred.test(e, 4)).forEach(System.out::println);
}

The BiPredicate is used to pick up words which have three and four
latin characters.

$ java Main.java
sky
spy
war
cup
see
---------------------
club
silk
coin
snow

## Composing predicates

With and and or methods we can compose predicates in
Java.

Main.java
  

void main() {

    int[] nums = {2, 3, 1, 5, 6, 7, 8, 9, 12};

    IntPredicate p1 = n -&gt; n &gt; 3;
    IntPredicate p2 = n -&gt; n &lt; 9;

    Arrays.stream(nums).filter(p1.and(p2)).forEach(System.out::println);

    System.out.println("-------------------");

    IntPredicate p3 = n -&gt; n == 6;
    IntPredicate p4 = n -&gt; n == 9;

    Arrays.stream(nums).filter(p3.or(p4)).forEach(System.out::println);
}

The example filters data using composition of IntPredicates.

IntPredicate p1 = n -&gt; n &gt; 3;
IntPredicate p2 = n -&gt; n &lt; 9;

Arrays.stream(nums).filter(p1.and(p2)).forEach(System.out::println);

We combine two predicates with the and method; we get integers that
are bigger than three and smaller than nine.

IntPredicate p3 = n -&gt; n == 6;
IntPredicate p4 = n -&gt; n == 9;

Arrays.stream(nums).filter(p3.or(p4)).forEach(System.out::println);

With the or method, we get values that are equal either to six or
nine.

$ java Main.java
5
6
7
8
-------------------
6
9

## Applying list of predicates

In the following example, we work with a list of predicates.

Main.java
  

void main() {

    var words = List.of("sky", "curtain", "sin", "shy", "way", "club",
            "spy", "silk", "summer", "war", "cup", "cloud", "coin", "small",
            "set", "terse", "tree", "sea", "sip", "snow", "snail", "sly",
            "six", "sod", "see", "sit", "sad", "wry", "why");

    Predicate&lt;String&gt; p1 = e -&gt; e.startsWith("s") || e.startsWith("w");
    Predicate&lt;String&gt; p2 = e -&gt; e.endsWith("y");
    Predicate&lt;String&gt; p3 = e -&gt; e.length() == 3;

    var prs = List.of(p1, p2, p3);

    var result = words.stream()
            .filter(prs.stream().reduce(x -&gt; true, Predicate::and))
            .collect(Collectors.toList());

    result.forEach(System.out::println);
}

With the help of the reduce method, we apply the list of predicates
to the list of words.

$ java Main.java
sky
shy
way
spy
sly
wry
why

## Predicate with a method reference

Predicates can be created easily with method references. These are created
with :: operator.

Main.java
  

void main() {

    var words = List.of("sky", "", "club", "spy", "silk", "summer",
            "war", "cup", "cloud", "coin", "small", "terse", "",
            "snow", "snail", "see");

    Predicate&lt;String&gt; pred = String::isEmpty;

    var res = words.stream().anyMatch(pred);

    if (res) {
        System.out.println("There is an empty string");
    } else {
        System.out.println("There is no empty string");
    }
}

The example checks if there is any empty string in the list.

## Negating predicates

The negate method returns a predicate that represents the logical
negation of the given predicate.

Main.java
  

void main() {

    int[] nums = {2, 3, 1, 5, 6, 7, 8, 9, 12};

    IntPredicate p = n -&gt; n &gt; 5;

    Arrays.stream(nums).filter(p).forEach(System.out::println);

    System.out.println("-----------------");

    Arrays.stream(nums).filter(p.negate()).forEach(System.out::println);
}

The example demonstrates the usage of the negate method.

IntPredicate p = n -&gt; n &gt; 5;

We have a predicate that returns true for values bigger than five.

Arrays.stream(nums).filter(p).forEach(System.out::println);

We filter all integers that are bigger than five.

Arrays.stream(nums).filter(p.negate()).forEach(System.out::println);

With the negate method, we get the opposite: values lower or equal
to four.

$ java Main.java
6
7
8
9
12
-----------------
2
3
1
5

Alternatively, we can use the Predicate.not method.

Main.java
  

void main() {

    var words = List.of("book", "cup", "tree", "town", "sky", "by",
            "call", "ten", "top", "smart", "park");

    Predicate&lt;String&gt; hasThreeChars = (String word) -&gt; word.length() == 3;

    var res = words.stream().filter(hasThreeChars).toList();
    System.out.println(res);

    var res2 = words.stream().filter(Predicate.not(hasThreeChars)).toList();
    System.out.println(res2);
}

In the program, we define a list of words. The defined predicate returns true 
for all words that contain three latin characters. The Predicate.not(hasThreeChars)
returns the opposite: all words that have less or more latin characters.

$ java Main.java
[cup, sky, ten, top]
[book, tree, town, call, smart, park]

## Predicate as a method parameter

Predicates can be passed as method parameters.

Main.java
  

void main() {

    List&lt;Integer&gt; list = List.of(1, 2, 3, 4, 5, 6, 7,
            8, 9, 10, 11, 12);

    List&lt;Integer&gt; all = eval(list, n -&gt; true);
    System.out.println(all);

    List&lt;Integer&gt; evenValues = eval(list, n -&gt; n % 2 == 0);
    System.out.println(evenValues);

    List&lt;Integer&gt; greaterThanSix = eval(list, n -&gt; n &gt; 6);
    System.out.println(greaterThanSix);
}

List&lt;Integer&gt; eval(List&lt;Integer&gt; values,
        Predicate&lt;Integer&gt; predicate) {
    return values.stream().filter(predicate)
            .collect(Collectors.toList());
}

In the example, we pass a predicate function as the second parameter to the
eval method.

## Source

[Java Predicate - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Predicate.html)

In this article we have shown how to use predicates in Java. We have
demonstrated how to create predicates, how to use them with streams, and how
to compose them. We have also shown how to use predicates with lambda
expressions and method references. Predicates are a powerful tool in Java
that can help us to write cleaner and more readable code. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).