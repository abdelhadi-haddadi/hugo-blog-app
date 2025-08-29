+++
title = "Java sort list"
date = 2025-08-29T20:00:32.450+01:00
draft = false
description = "Java sort list tutorial shows how to sort lists in Java. Sorting is arranging elements in an ordered sequence."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java sort list

last modified July 4, 2024

 

In this article we show how to sort lists in Java.

## Sorting

Sorting is arranging elements in an ordered sequence. Over the years, several
algorithms were developed to perform sorting on data; for instance merge sort,
quick sort, selection sort, or bubble sort. (Another meaning of sorting is
categorizing: grouping elements with similar properties.) 

The opposite of sorting, rearranging a sequence of elements in a random or
meaningless order, is called shuffling.

Data can be sorted alphabetically or numerically. The sort key specifies the
criteria used to do the sorting. It is possible to sort objects by multiple
keys. For instance, when sorting users, the names of the users could be used as
primary sort key, and their salary as the secondary sort key. 

## Sorting order

A standard order is called the ascending order: a to z, 0 to 9. The reverse
order is called the descending order: z to a, 9 to 0. For dates and times,
ascending means that earlier values precede later ones e.g. 5/5/2020 will sort
ahead of 11/11/2021.

## Stable sort

A stable sort is one where the initial order of equal elements is preserved.
Some sorting algorithms are naturally stable, some are unstable. For instance,
the merge sort and the bubble sort are stable sorting algorithms. On the other
hand, heap sort and quick sort are examples of unstable sorting algorithms.

Consider the following values: 3715593. A stable
sorting produces the following: 1335579. The ordering
of the values 3 and 5 is kept. An unstable sorting may produce the following:
1335579. 

Java internally uses a stable sort algorithms.

## Java sort methods

In Java, we can sort a list in-place or we can return a new sorted list.

default void sort(Comparator&lt;? super E&gt; c)

The List.sort method sorts the list according to the order induced
by the specified Comparator. The sort is stable. The method 
modifies the list in-place.

Stream&lt;T&gt; sorted(Comparator&lt;? super T&gt; comparator)

The Stream.sorted method returns a stream consisting of the
elements of this stream, sorted according to the provided
Comparator. For ordered streams, the sort is stable. For unordered
streams, no stability guarantees are made. The method does not modify the
original list; it returns a new sorted stream/list.

## Java sort list of integers

In the following example, we sort a list of integers.

Main.java
  

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

void main() {

    List&lt;Integer&gt; vals = Arrays.asList(5, -4, 0, 2, -1, 4, 7, 6, 1, -1, 3, 8, -2);
    vals.sort(Comparator.naturalOrder());
    System.out.println(vals);

    vals.sort(Comparator.reverseOrder());
    System.out.println(vals);
}

The integers are sorted in ascending and descending orders. The data is sorted 
in-place; i.e. the original list is modified.

$ java Main.java
[-4, -2, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
[8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -1, -2, -4]

In the next example, we do not modify the original source of data.

Main.java
  

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

void main() {

    List&lt;Integer&gt; vals = Arrays.asList(5, -4, 0, 2, -1, 4, 7, 6, 1, -1, 3, 8, -2);

    System.out.println("Ascending order");

    var sorted1 = vals.stream().sorted().toList();
    System.out.println(sorted1);

    System.out.println("-------------------------------");

    System.out.println("Descending order");

    var sorted2 = vals.stream().sorted(Comparator.reverseOrder()).toList();
    System.out.println(sorted2);

    System.out.println("-------------------------------");

    System.out.println("Original order");
    System.out.println(vals);
}

We sort integers with Stream.sorted. The original source is intact.

$ java Main.java 
Ascending order
[-4, -2, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
-------------------------------
Descending order
[8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -1, -2, -4]
-------------------------------
Original order
[5, -4, 0, 2, -1, 4, 7, 6, 1, -1, 3, 8, -2]

## Java sort list of strings

The following example sorts strings.

Main.java
  

import java.util.Comparator;
import java.util.List;

void main() {

    var words = List.of("sky", "cloud", "atom", "club", "carpet", "wood", "water",
            "silk", "bike", "falcon", "owl", "mars");

    var sorted = words.stream().sorted().toList();
    System.out.println(sorted);

    var sorted2 = words.stream().sorted(Comparator.reverseOrder()).toList();
    System.out.println(sorted2);
}

We have a list of words. We sort them with Stream.sorted.

$ java Main.java
[atom, bike, carpet, cloud, club, falcon, mars, owl, silk, sky, water, wood]
[wood, water, sky, silk, owl, mars, falcon, club, cloud, carpet, bike, atom]

## Java case insensitive list sort

In the following example, we show how to sort strings in case-insensitive order.

Main.java
  

import java.util.Arrays;
import java.util.Comparator;

void main() {

    var words = Arrays.asList("world", "War", "abbot", "Caesar", "castle", "sky",
            "den", "forest", "ocean", "water", "falcon", "owl", "rain", "Earth");

    words.sort(Comparator.naturalOrder());
    System.out.println(words);

    words.sort(String::compareToIgnoreCase);
    System.out.println(words);
}

We sort a list of words in-place in natural order and later regardless of case.

$ java Main.java
[Caesar, Earth, War, abbot, castle, den, falcon, forest, ocean, owl, rain, sky, ...
[abbot, Caesar, castle, den, Earth, falcon, forest, ocean, owl, rain, sky, War, ...

## Java sort list of names by surname

The following example sorts full names by surname.

Main.java
  

import java.util.Arrays;
import java.util.Comparator;
import java.util.function.Function;

void main() {

    var names = Arrays.asList("John Doe", "Lucy Smith",
            "Benjamin Young", "Robert Brown", "Thomas Moore",
            "Linda Black", "Adam Smith", "Jane Smith");

    Function&lt;String, String&gt; fun = (String fullName) -&gt; fullName.split("\s")[1];
    names.sort(Comparator.comparing(fun).reversed());

    System.out.println(names);
}

We have a list of names. We wort the names by surnames, in reverse order. By
default, they would be sorted by first names, because they preced surnames.

Function&lt;String, String&gt; fun = (String fullName) -&gt; fullName.split("\s")[1];

We create a Function which is a key extractor. It extracts the 
surnmaes from the strings.

names.sort(Comparator.comparing(fun).reversed());

We pass the function to the Comparator.comparing method.

$ java Main.java
[Benjamin Young, Lucy Smith, Adam Smith, Jane Smith, Thomas Moore, John Doe, ...

## Java sort list by fields

We are going to sort a list of objects by their fields.

Main.java
  

import java.util.Arrays;
import java.util.Comparator;

void main() {

    var cars = Arrays.asList(new Car("Volvo", 23400),
            new Car("Mazda", 13700), new Car("Porsche", 353800),
            new Car("Skoda", 8900),  new Car("Volkswagen", 19900));

    cars.sort(Comparator.comparing(Car::price));
    System.out.println(cars);

    cars.sort(Comparator.comparing(Car::name));
    System.out.println(cars);
}

record Car(String name, int price) {}

We have a list of cars. We sort the cars by their price and later by their
name.

cars.sort(Comparator.comparing(Car::price));

We pass the reference of the price method to 
Comparator.comparing.

$ java Main.java
[Car[name=Skoda, price=8900], Car[name=Mazda, price=13700], Car[name=Volkswagen, ...
[Car[name=Mazda, price=13700], Car[name=Porsche, price=353800], Car[name=Skoda, ...

## Java sort list by multiple fields

The next example shows how to sort objects by multiple fields.

Main.java
  

import java.time.LocalDate;
import java.time.Period;
import java.util.Comparator;
import java.util.List;

void main() {

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

    var sorted = persons.stream().sorted(Comparator.comparing(Person::age)
            .thenComparing(Person::name).reversed());

    sorted.forEach(System.out::println);
}

record Person(String name, LocalDate dateOfBirth, String city) {

    public int age() {

        return Period.between(dateOfBirth(), LocalDate.now()).getYears();
    }
}

The list of persons is sorted by age and then by name.

var sorted = persons.stream().sorted(Comparator.comparing(Person::age)
    .thenComparing(Person::name).reversed());

The list is sorted by age by Comparator.comparing; the second
sorting is done by thenComparing.

$ java Main.java
Person[name=Sarah, dateOfBirth=1977-11-30, city=New York]
Person[name=Elisabeth, dateOfBirth=1985-07-12, city=New York]
Person[name=Sam, dateOfBirth=1986-06-17, city=Dallas]
Person[name=Lucy, dateOfBirth=1988-12-10, city=Toronto]
Person[name=Ruth, dateOfBirth=1994-04-28, city=New York]
Person[name=Peter, dateOfBirth=1998-05-11, city=New York]
Person[name=Sarah, dateOfBirth=2000-09-19, city=New York]
Person[name=Tom, dateOfBirth=2004-08-30, city=Toronto]
Person[name=Sarah, dateOfBirth=2008-08-21, city=Las Vegas]
Person[name=Robert, dateOfBirth=2008-11-01, city=San Diego]
Person[name=Lucy, dateOfBirth=2008-10-05, city=Los Angeles]

## Java sort list with custom comparator

We sort a list of objects by defining an external comparator object.

Main.java
  

import java.util.Comparator;
import java.util.List;

void main() {

    var cards = List.of(
            new Card(Rank.KING, Suit.DIAMONDS),
            new Card(Rank.FIVE, Suit.HEARTS),
            new Card(Rank.ACE, Suit.CLUBS),
            new Card(Rank.NINE, Suit.SPADES),
            new Card(Rank.JACK, Suit.SPADES),
            new Card(Rank.JACK, Suit.DIAMONDS));

    var sorted = cards.stream().sorted(CardComparator.build()).toList();
    sorted.forEach(System.out::println);
}

enum Rank {
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

enum Suit {
    CLUBS,
    DIAMONDS,
    HEARTS,
    SPADES
}

record Card(Rank rank, Suit suit) {
}

static class CardComparator implements Comparator&lt;Card&gt; {

    static CardComparator build() {
        return new CardComparator();
    }

    @Override
    public int compare(Card o1, Card o2) {
        return Comparator.comparing(Card::rank)
                .thenComparing(Card::suit)
                .compare(o1, o2);
    }
}

A deck of cards is sorted first by rank and in case of equal rank by suit.

static class CardComparator implements Comparator&lt;Card&gt; {

    static CardComparator build() {
        return new CardComparator();
    }

    @Override
    public int compare(Card o1, Card o2) {
        return Comparator.comparing(Card::rank)
                .thenComparing(Card::suit)
                .compare(o1, o2);
    }
}

We define an external comparator, which implements the Comparator
interface and defines the compare method.

$ java Main.java
Card[rank=FIVE, suit=HEARTS]
Card[rank=NINE, suit=SPADES]
Card[rank=JACK, suit=DIAMONDS]
Card[rank=JACK, suit=SPADES]
Card[rank=KING, suit=DIAMONDS]
Card[rank=ACE, suit=CLUBS]

## Java sort list with a Comparable object

Now we use Comparable interface to sort objects.

Main.java
  

import java.util.Comparator;
import java.util.List;

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

void main() {

    var cards = List.of(
            new Card(Card.Rank.KING, Card.Suit.DIAMONDS),
            new Card(Card.Rank.FIVE, Card.Suit.HEARTS),
            new Card(Card.Rank.ACE, Card.Suit.CLUBS),
            new Card(Card.Rank.NINE, Card.Suit.SPADES),
            new Card(Card.Rank.JACK, Card.Suit.SPADES),
            new Card(Card.Rank.JACK, Card.Suit.DIAMONDS));

    var sorted = cards.stream().sorted().toList();
    sorted.forEach(System.out::println);
}

The Comparable interface defines an internal compareTo
sorting method.

$ java Main.java 
Card{suit=HEARTS, rank=FIVE}
Card{suit=SPADES, rank=NINE}
Card{suit=DIAMONDS, rank=JACK}
Card{suit=SPADES, rank=JACK}
Card{suit=DIAMONDS, rank=KING}
Card{suit=CLUBS, rank=ACE}

## Java sort list final example

The final example summarizes several sorting techniques.

Main.java
  

import java.time.LocalDate;
import java.util.Comparator;
import java.util.function.Function;

void main() {

    var data = """
                John Doe, gardener, 1985-11-10
                Roger Roe, driver, 1998-09-11
                Lucia Smith, teacher, 1995-08-18
                Peter Black, programmer, 1997-04-04
                Roman Grant, programmer, 1987-07-14
                Michael Miller, programmer, 2002-05-14
            """;

    System.out.println("Sorted by date of birth");

    var users = data.lines().map(line -&gt; line.trim().split(",\s?"))
            .map(parts -&gt; new User(parts[0], parts[1], 
                LocalDate.parse(parts[2]))).toList();

    var sortedByDob = users.stream()
            .sorted(Comparator.comparing(User::dateOfBirth));
    sortedByDob.forEach(System.out::println);

    System.out.println("--------------------------------");

    System.out.println("Sorted by date of birth reversed");

    var sortedByDob2 = users.stream()
            .sorted(Comparator.comparing(User::dateOfBirth).reversed());
    sortedByDob2.forEach(System.out::println);

    System.out.println("--------------------------------");

    System.out.println("Sorted by last name");

    Function&lt;User, String&gt; byLastName = user -&gt; user.name.split("\s")[1];

    var sortedByLastName = users.stream()
            .sorted(Comparator.comparing(byLastName));
    sortedByLastName.forEach(System.out::println);

    System.out.println("--------------------------------");

    System.out.println("Sorted by occupation");

    var sortedByOccupation = users.stream()
            .sorted(Comparator.comparing(User::occupation));

    sortedByOccupation.forEach(System.out::println);

    System.out.println("--------------------------------");

    System.out.println("Sorted by occupation and date of birth reversed");

    var sortedByOccupationAndDateOfBirth = users.stream()
            .sorted(Comparator.comparing(User::occupation)
                    .thenComparing(User::dateOfBirth).reversed());

    sortedByOccupationAndDateOfBirth.forEach(System.out::println);

}

record User(String name, String occupation, LocalDate dateOfBirth) {}

We parse a multiline string to form a list of users. Then we sort the list by 
date of birth, last name, occupation, and occupation and reversed date of birth.

$ java Main.java
Sorted by date of birth
User[name="John Doe, occupation=gardener, dateOfBirth=1985-11-10]
User[name=Roman Grant, occupation=programmer, dateOfBirth=1987-07-14]
User[name=Lucia Smith, occupation=teacher, dateOfBirth=1995-08-18]
User[name=Peter Black, occupation=programmer, dateOfBirth=1997-04-04]
User[name=Roger Roe, occupation=driver, dateOfBirth=1998-09-11]
User[name=Michael Miller, occupation=programmer, dateOfBirth=2002-05-14]
--------------------------------
Sorted by date of birth reversed
User[name=Michael Miller, occupation=programmer, dateOfBirth=2002-05-14]
User[name=Roger Roe, occupation=driver, dateOfBirth=1998-09-11]
User[name=Peter Black, occupation=programmer, dateOfBirth=1997-04-04]
User[name=Lucia Smith, occupation=teacher, dateOfBirth=1995-08-18]
User[name=Roman Grant, occupation=programmer, dateOfBirth=1987-07-14]
User[name="John Doe, occupation=gardener, dateOfBirth=1985-11-10]
--------------------------------
Sorted by last name
User[name=Peter Black, occupation=programmer, dateOfBirth=1997-04-04]
User[name="John Doe, occupation=gardener, dateOfBirth=1985-11-10]
User[name=Roman Grant, occupation=programmer, dateOfBirth=1987-07-14]
User[name=Michael Miller, occupation=programmer, dateOfBirth=2002-05-14]
User[name=Roger Roe, occupation=driver, dateOfBirth=1998-09-11]
User[name=Lucia Smith, occupation=teacher, dateOfBirth=1995-08-18]
--------------------------------
Sorted by occupation
User[name=Roger Roe, occupation=driver, dateOfBirth=1998-09-11]
User[name="John Doe, occupation=gardener, dateOfBirth=1985-11-10]
User[name=Peter Black, occupation=programmer, dateOfBirth=1997-04-04]
User[name=Roman Grant, occupation=programmer, dateOfBirth=1987-07-14]
User[name=Michael Miller, occupation=programmer, dateOfBirth=2002-05-14]
User[name=Lucia Smith, occupation=teacher, dateOfBirth=1995-08-18]
--------------------------------
Sorted by occupation and date of birth reversed
User[name=Lucia Smith, occupation=teacher, dateOfBirth=1995-08-18]
User[name=Michael Miller, occupation=programmer, dateOfBirth=2002-05-14]
User[name=Peter Black, occupation=programmer, dateOfBirth=1997-04-04]
User[name=Roman Grant, occupation=programmer, dateOfBirth=1987-07-14]
User[name="John Doe, occupation=gardener, dateOfBirth=1985-11-10]
User[name=Roger Roe, occupation=driver, dateOfBirth=1998-09-11]

## Source

[Java ArrayList - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html)

In this article we have sorted lists in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).