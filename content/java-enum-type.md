+++
title = "Java enum type"
date = 2025-08-29T19:58:36.324+01:00
draft = false
description = "Java enum type tutorial shows how to work with enumerations in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java enum type

last modified March 6, 2024

 

In this article we show how to work with enum type in Java.

An enum type is built-in Java data type that defines a fixed set of
named constants. The set of constants cannot be changed afterwards. Variables
having an enum type can be assigned any of the enumerators as a value. 

The enum type provides a more robust and readable way to handle constant values
compared to using primitive data types like integers. Enemerations enforce type
safety by guaranteeing that the variable can only hold one of the predefined
values.

We should use enum types any time we need to represent a fixed set of constants.
There are many natural enum types such as the planets in our solar system,
seasons, or days of week. These are data sets where we know all possible values
at compile time.

public enum Size {
    SMALL, MEDIUM, LARGE
}

We use the enum keyword to define an enumeration in Java. It is 
a good programming practice to name the constants with uppercase letters.

## Simple example

We have a simple code example with an enumeration.

Main.java
  

enum Day {

    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

void main() {

    Day day = Day.MONDAY;

    if (day == Day.MONDAY) {

        System.out.println("It is Monday");
    }

    System.out.println(day);

    for (Day d : Day.values()) {

        System.out.println(d);
    }
}

We define the Day enum that represents a fixed set of seven 
day names. 

enum Day {

    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

An enum type is created with the enum keyword. By convention,
constants are written in uppercase letters.

Day day = Day.MONDAY;

We have a variable called day which is of enumerated type Day. It
is initialized to Day.Monday.

for (Day d : Day.values()) {

    System.out.println(d);
}

This loop prints all days to the console. The values method returns
an array containing the constants of this enum type, in the order they are
declared. This method may be used to iterate over the constants with the
enhanced for statement. The enhanced for goes through the array, element by
element, and prints them to the terminal.

$ java Main.java
It is Monday
MONDAY
MONDAY
TUESDAY
WEDNESDAY
THURSDAY
FRIDAY
SATURDAY
SUNDAY

## Providing values to enum constants

We can explicitly provide some values to the enumeration constants.

Main.java
  

enum Season {

    SPRING(10),
    SUMMER(20),
    AUTUMN(30),
    WINTER(40);

    private int value;

    private Season(int value) {
        this.value = value;
    }

    public int getValue() {

        return value;
    }
}

void main() {

    for (Season season : Season.values()) {

        System.out.println(STR."\{season} \{season.getValue()}");
    }
}

The example contains a Season enumeration which has four constants.

SPRING(10),
SUMMER(20),
AUTUMN(30),
WINTER(40);

Here we define four constants of the enum. The constants are given specific values.

$ java Main.java
SPRING 10
SUMMER 20
AUTUMN 30
WINTER 40

## Toss a coin

Enumeration is a type of a class. We can define our own methods.

Main.java
  

import java.util.Random;

public enum Coin {
    HEADS,
    TAILS;

    public static Coin toss() {

        var rand = new Random();
        int rdx = rand.nextInt(Coin.values().length);
        return Coin.values()[rdx];
    }
}

void main() {

    for (int i = 1; i &lt;= 15; i++) {

        System.out.print(STR."\{Coin.toss()} ");
    }
}

The example defines the toss method, which randomly chooses one 
of the constants: HEADS or TAILS. Later in the for loop 
we call toss fifteen times.

$ java Main.java
HEADS TAILS HEADS TAILS HEADS HEADS TAILS HEADS HEADS HEADS TAILS TAILS HEADS TAILS TAILS 

## Enum type with switch expressions

Enums can be effectively used with switch expressions.

Main.java
  

import java.util.Random;

void main() {

    Season season = Season.randomSeason();

    String msg = switch (season) {

        case Season.SPRING -&gt; "Spring";
        case Season.SUMMER -&gt; "Summer";
        case Season.AUTUMN -&gt; "Autumn";
        case Season.WINTER -&gt; "Winter";
    };

    System.out.println(msg);
}

enum Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER;

    public static Season randomSeason() {
        
        var random = new Random();
        int ridx = random.nextInt(Season.values().length);
        return Season.values()[ridx];
    }
}

We define a Season enumeration. The enumeration contains a
randomSeason method which creates a Season value
randomly. Depending on the chosen value, we print a message.

var msg = switch (season) {

    case Season.Spring -&gt; "Spring";
    case Season.Summer -&gt; "Summer";
    case Season.Autumn -&gt; "Autumn";
    case Season.Winter -&gt; "Winter";
};

System.out.println(msg);

We check the value against the switch expression. The expression returns the
string representation of the enum. Since the compiler knows all the possible
constants beforehand, the switch expression is exhaustive, that is, we do not
have to define the default arm.

## Source

[Enum Types - language reference](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

In this article we have worked with enumerations in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).