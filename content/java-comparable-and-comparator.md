+++
title = "Java Comparable & Comparator"
date = 2025-08-29T19:58:29.265+01:00
draft = false
description = "Java Comparable Comparator tutorial shows how to compare objects in Java with Comparable and Comparator."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Comparable &amp; Comparator

last modified January 27, 2024

 

Java Comparable and Comparator tutorial shows how to compare objects in Java
with Comparable and Comparator interfaces. Comparing two objects is essential
when doing sorting.

When working with custom Java objects to perform comparisons, we can use 
Comparable or Comparator interfaces.

## Java Comparable

The Comparable interface imposes a total ordering on the objects of 
each class that implements it. This ordering is referred to as the class's 
natural ordering. The class's compareTo method has to be 
implemented to provide the natural comparison.

## Java Comparator

The Comparator interface imposes a total ordering on some collection 
of objects. Comparators can be passed to a sort method 
(such as Collections.sort or Arrays.sort) to allow 
precise control over the sort order. Comparators can also be used to control the 
order of certain data structures (such as sorted sets or sorted maps), or to 
provide an ordering for collections of objects that don't have a natural ordering.

## Comparable vs Comparator

The following two lists summarize the differences between the two interfaces.

### Java Comparable

    - must define o1.compareTo(o2)

    - used to implement natural ordering of objects

    - we must modify the class whose instances we want to sort

    - it's in the same class

    - only one implementation 

    - implemented frequently in the API by: String, Wrapper classes, Date, Calendar

### Java Comparator

   
    - must define compare(o1, o2)

    multiple ways of comparing two instances of a type - e.g. compare 
        people by age, name
    - we can provide comparators for classes that we do not control

    - we can have multiple implementations of comparators

    - meant to be implemented to sort instances of third-party classes

## Java built-in Comparator example

Java language offers some built-int Comparators.

com/zetcode/JavaBuiltInComparatorEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class JavaBuiltInComparatorEx {

    public static void main(String[] args) {

        List&lt;String&gt; words = new ArrayList&lt;&gt;();

        words.add("dog");
        words.add("pen");
        words.add("sky");
        words.add("rock");
        words.add("den");
        words.add("fountain");

        words.sort(Comparator.naturalOrder());
        words.forEach(System.out::println);

        words.sort(Comparator.reverseOrder());
        words.forEach(System.out::println);
    }
}

In the example, we sort an array of words in ascending and descending orders. 

words.sort(Comparator.naturalOrder());

The Comparator.naturalOrder returns a built-in natural order
Comparator. 

words.sort(Comparator.reverseOrder());

The Comparator.reverseOrder returns a comparator that imposes the
reverse of the natural ordering.

## Comparator.comparingInt

The Comparator.comparingInt method extracts the int sort key from
the provided type and compares by that key.

com/zetcode/JavaBuiltInComparatorEx2.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Period;
import java.util.Comparator;
import java.util.List;

public class JavaBuiltInComparatorEx2 {

    public static void main(String[] args) {

        var p1 = new Person("Robert", LocalDate.of(2008, 8, 21));
        var p2 = new Person("Monika", LocalDate.of(2008, 10, 5));
        var p3 = new Person("Tom", LocalDate.of(1977, 11, 30));
        var p4 = new Person("Elisabeth", LocalDate.of(2004, 8, 30));

        var persons = List.of(p1, p2, p3, p4 );

        var sorted = persons.stream()
                .sorted(Comparator.comparingInt(Person::age));
        sorted.forEach(System.out::println);
    }

    record Person(String name, LocalDate dateOfBirth) {

        public int age() {

            return Period.between(dateOfBirth(), LocalDate.now()).getYears();
        }

        @Override
        public String toString() {
            final StringBuilder sb = new StringBuilder("Person{");
            sb.append("name='").append(name()).append('\'');
            sb.append(", age=").append(age());
            sb.append('}');
            return sb.toString();
        }
    }
}

In the example, we compare Person objects by their age utilizing
Comparator.comparingInt method.

Person{name='Robert', age=12}
Person{name='Monika', age=12}
Person{name='Elisabeth', age=16}
Person{name='Tom', age=43}

The objects are sorted by age.

## Multiple Comparators

With Comparator.thenComparing method, we can use multiple
comparators when sorting objects.

com/zetcode/JavaMultipleComparatorsEx.java
  

package com.zetcode;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

// Comparing list of objects by multiple object fields

public class JavaMultipleComparatorsEx {

    public static void main(String[] args) {

        var persons = List.of(
                new Person("Peter", LocalDate.of(1998, 5, 11), "New York"),
                new Person("Sarah", LocalDate.of(2008, 8, 21), "Las Vegas"),
                new Person("Lucy", LocalDate.of(1988, 12, 10), "Toronto"),
                new Person("Sarah", LocalDate.of(2000, 9, 19), "New York"),
                new Person("Tom", LocalDate.of(2004, 8, 30), "Toronto"),
                new Person("Robert", LocalDate.of(2008, 11, 1), "San Diego"),
                new Person("Lucy", LocalDate.of(2008, 10, 5), "Los Angeles"),
                new Person("Sam", LocalDate.of(1986, 6, 17), "Dallas"),
                new Person("Elisabeth", LocalDate.of(1985, 7, 12), "New York"),
                new Person("Ruth", LocalDate.of(1994, 4, 28), "New York"),
                new Person("Sarah", LocalDate.of(1977, 11, 30), "New York")
        );

        var sorted = persons.stream()
                .sorted(Comparator.comparing(Person::name)
                .thenComparing(Person::city)
                .thenComparing(Person::dateOfBirth));

        sorted.forEach(System.out::println);
    }

    record Person(String name, LocalDate dateOfBirth, String city) {

    }
}

We have a list of Person objects. We compare the objects by their
name, then by their city and finally by their age.

var sorted = persons.stream()
    .sorted(Comparator.comparing(Person::name)
    .thenComparing(Person::city)
    .thenComparing(Person::dateOfBirth));

The Comparator.thenComparing method allows us to apply multiply
comparators to the sorting operation.

Person[name=Elisabeth, dateOfBirth=1985-07-12, city=New York]
Person[name=Lucy, dateOfBirth=2008-10-05, city=Los Angeles]
Person[name=Lucy, dateOfBirth=1988-12-10, city=Toronto]
Person[name=Peter, dateOfBirth=1998-05-11, city=New York]
Person[name=Robert, dateOfBirth=2008-11-01, city=San Diego]
Person[name=Ruth, dateOfBirth=1994-04-28, city=New York]
Person[name=Sam, dateOfBirth=1986-06-17, city=Dallas]
Person[name=Sarah, dateOfBirth=2008-08-21, city=Las Vegas]
Person[name=Sarah, dateOfBirth=1977-11-30, city=New York]
Person[name=Sarah, dateOfBirth=2000-09-19, city=New York]
Person[name=Tom, dateOfBirth=2004-08-30, city=Toronto]

## Java custom Comparator

In the next example, we create a custom Comparator.

com/zetcode/JavaCustomComparator.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.List;

public class JavaCustomComparatorEx {

    public static void main(String[] args) {

        List&lt;String&gt; words = Arrays.asList("pen", "blue", "atom", "to",
                "ecclesiastical", "abbey", "car", "ten", "desk", "slim",
                "journey", "forest", "landscape", "achievement", "Antarctica");

        words.sort((e1, e2) -&gt; e1.length() - e2.length());

        words.forEach(System.out::println);

        words.sort((e1, e2) -&gt; e2.length() - e1.length());

        words.forEach(System.out::println);
    }
}

We have a list of words. This time we compare the words by their length.

words.sort((e1, e2) -&gt; e1.length() - e2.length());

This custom comparator is used to sort the words by their size in ascending
order.

words.sort((e1, e2) -&gt; e2.length() - e1.length() );

In the second case, the words are sorted in descending order.

to
pen
car
ten
blue
atom
desk
slim
abbey
forest
journey
landscape
Antarctica
achievement
ecclesiastical
ecclesiastical
achievement
Antarctica
landscape
journey
forest
abbey
blue
atom
desk
slim
pen
car
ten
to

## Java custom Comparator II

In the following example, we create two custom comparators.

com/zetcode/JavaCustomComparatorEx2.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Comparator;

// Comparing objects with Comparator in array

public class JavaCustomComparatorEx2 {

    public static void main(String[] args) {

        Car[] cars = {
                new Car("Volvo", 23400), new Car("Mazda", 13700),
                new Car("Porsche", 353800), new Car("Skoda", 8900),
                new Car("Volkswagen", 19900)
        };

        System.out.println("Comparison by price:");

        Arrays.sort(cars, new CompareByPrice());

        for (Car car : cars) {

            System.out.println(car);
        }

        System.out.println();

        System.out.println("Comparison by name:");

        Arrays.sort(cars, new CompareByName());

        for (Car car : cars) {

            System.out.println(car);
        }
    }
}

record Car(String name, int price) {}

class CompareByPrice implements Comparator&lt;Car&gt; {

    @Override
    public int compare(Car c1, Car c2) {

        return c1.price() - c2.price();
    }
}

class CompareByName implements Comparator&lt;Car&gt; {

    @Override
    public int compare(Car c1, Car c2) {

        return c1.name().compareTo(c2.name());
    }
}

We have an array of Car objects. We create two custom comparators
to compare the objects by their name and by their price.

class CompareByPrice implements Comparator&lt;Car&gt; {

    @Override
    public int compare(Car c1, Car c2) {

        return c1.price() - c2.price();
    }
}

The custom CompareByPrice comparator implements the Comparator
interface; forcing us to implement the compare method. 
Our implementation compares the car objects by their price.

class CompareByName implements Comparator&lt;Car&gt; {

    @Override
    public int compare(Car c1, Car c2) {

        return c1.name().compareTo(c2.name());
    }
}

In the second case, we are comparing car objects by their name. 

Comparison by price:
Car{name='Skoda', price=8900}
Car{name='Mazda', price=13700}
Car{name='Volkswagen', price=19900}
Car{name='Volvo', price=23400}
Car{name='Porsche', price=353800}

Comparison by name:
Car{name='Mazda', price=13700}
Car{name='Porsche', price=353800}
Car{name='Skoda', price=8900}
Car{name='Volkswagen', price=19900}
Car{name='Volvo', price=23400}

## Java Comparable example

In the following example, we compare objects with Comparable.

com/zetcode/JavaComparableEx.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Comparator;

class Card implements Comparable&lt;Card&gt; {

    @Override
    public int compareTo(Card o) {

        return Comparator.comparing(Card::getRank)
                .thenComparing(Card::getSuit)
                .compare(this, o);
    }

    public enum Suit {
        CLUBS,
        DIAMONDS,
        HEARTS,
        SPADES
    }

    public enum Rank {
        TWO,
        THREE,
        FOUR,
        FIVE,
        SIX,
        SEVEN,
        EIGHT,
        NINE,
        TEN,
        JACK,
        QUEEN,
        KING,
        ACE,
    }

    private Suit suit;
    private Rank rank;

    public Card(Rank rank, Suit suit) {

        this.rank = rank;
        this.suit = suit;
    }

    public Rank getRank() {
        return rank;
    }

    public Suit getSuit() {
        return suit;
    }

    public void showCard() {

        rank = getRank();
        suit = getSuit();

        System.out.println(rank + " of " + suit);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Card{");
        sb.append("suit=").append(suit);
        sb.append(", rank=").append(rank);
        sb.append('}');
        return sb.toString();
    }
}

public class JavaComparableEx {

    public static void main(String[] args) {

        Card[] cards = {
                new Card(Card.Rank.KING, Card.Suit.DIAMONDS),
                new Card(Card.Rank.FIVE, Card.Suit.HEARTS),
                new Card(Card.Rank.ACE, Card.Suit.CLUBS),
                new Card(Card.Rank.NINE, Card.Suit.SPADES),
                new Card(Card.Rank.JACK, Card.Suit.SPADES),
                new Card(Card.Rank.JACK, Card.Suit.DIAMONDS)};

        Arrays.sort(cards);

        for (Card card: cards) {

            System.out.println(card);
        }
    }
}

We have a list of Card objects. Each card has a value and belongs
to a suit. We implement to Comparable interface to provide
some natural ordering to the objects of Card class.

@Override
public int compareTo(Card o) {

    return Comparator.comparing(Card::getValue)
            .thenComparing(Card::getSuit)
            .compare(this, o);
}

We implement the compareTo method. We compare the cards first by
their value and then by their suit.

Card{suit=HEARTS, rank=FIVE}
Card{suit=SPADES, rank=NINE}
Card{suit=DIAMONDS, rank=JACK}
Card{suit=SPADES, rank=JACK}
Card{suit=DIAMONDS, rank=KING}
Card{suit=CLUBS, rank=ACE}

The cards are sorted from the lowest ranked to the highest ranked.

## Source

[Java Comparator - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html)

In this article we have shown how to compare objects in Java using
Comparable and Comparator.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).