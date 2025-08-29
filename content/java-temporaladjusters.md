+++
title = "Java TemporalAdjusters"
date = 2025-08-29T20:00:44.449+01:00
draft = false
description = "Java TemporalAdjusters tutorial shows how to modify Temporal objects in Java with TemporalAdjusters."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalAdjusters

last modified July 10, 2024

 

In this article we show how to modify Temporal objects in Java with
TemporalAdjusters.

*Temporal* is the base interface type for date, time and offset 
objects, including LocalDate, LocalTime, 
LocalDateTime, and Instant.

TemporalAdjusters are used for modifying temporal objects. They allow to 
find the first or last day of the week, month, or year; the next or previous
day of week and so on.

## TemporalAdjusters example

The following example uses built-in TemporalAdjusters methods.

Main.java
  

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

void main() {

    var localDate = LocalDate.now();
    System.out.printf("today: %s%n", localDate);

    var date1 = localDate.with(TemporalAdjusters.firstDayOfMonth());
    System.out.printf("first day of month: %s%n", date1);

    var date2 = localDate.with(TemporalAdjusters.lastDayOfMonth());
    System.out.printf("last day of month: %s%n", date2);

    var date3 = localDate.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
    System.out.printf("next Monday: %s%n", date3);

    var date4 = localDate.with(TemporalAdjusters.firstDayOfNextMonth());
    System.out.printf("first day of next month: %s%n", date4);

    var date5 = localDate.with(TemporalAdjusters.lastDayOfYear());
    System.out.printf("last day of year: %s%n", date5);

    var date6 = localDate.with(TemporalAdjusters.firstDayOfYear());
    System.out.printf("first day of year: %s%n", date6);

    var date7 = localDate.with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY));
    System.out.printf("last Sunday of month: %s%n", date7);
}

The example presents seven temporal adjusters.

var localDate = LocalDate.now();

We calculate the current local date with LocalDate.now.

var date1 = localDate.with(TemporalAdjusters.firstDayOfMonth());

With firstDayOfMonth we find the first day of the month.

var date2 = localDate.with(TemporalAdjusters.lastDayOfMonth());

With lastDayOfMonth we find the last day of the month.

var date3 = localDate.with(TemporalAdjusters.next(DayOfWeek.MONDAY));

With next and DayOfWeek.MONDAY we find the 
next Monday.

var date4 = localDate.with(TemporalAdjusters.firstDayOfNextMonth());

With firstDayOfNextMonth we find the first day of the 
next month.

var date5 = localDate.with(TemporalAdjusters.lastDayOfYear());

With lastDayOfYear we find the last day of the year.

var date6 = localDate.with(TemporalAdjusters.firstDayOfYear());

With firstDayOfYear we find the first day of the year.

var date7 = localDate.with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY));

With lastInMonth and DayOfWeek.SUNDAY we find
the last Sunday in the month.

$ java Main.java
today: 2024-07-10
first day of month: 2024-07-01
last day of month: 2024-07-31
next Monday: 2024-07-15
first day of next month: 2024-08-01
last day of year: 2024-12-31
first day of year: 2024-01-01
last Sunday of month: 2024-07-28

## Custom TemporalAdjuster

We can create our custom temporal adjusters.

Main.java
  

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.TemporalAdjuster;

void main() {

    var localDate = LocalDate.of(2024, 7, 10);

    TemporalAdjuster taj = t -&gt; t.plus(Period.ofDays(14));
    var result = localDate.with(taj);

    System.out.printf("Adding 14 days to %s gives %s", 
        localDate, result);
}

The example creates a date with LocalDate.of. It adds
fourteen days to the date and prints the result.

TemporalAdjuster taj = t -&gt; t.plus(Period.ofDays(14));

This is a lambda expression that creates a TemporalAdjuster
which adds fourteen days to the created date object.

var result = localDate.with(taj);

We get the result.

$ java Main.java
Adding 14 days to 2024-07-10 gives 2024-07-24

We can create a temporal adjuster by implementing the TemporalAdjuster
interface.

Main.java
  

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAdjuster;

class NextChristmas implements TemporalAdjuster {

    @Override
    public Temporal adjustInto(Temporal temporal) {

        return temporal.with(ChronoField.MONTH_OF_YEAR, 12)
                .with(ChronoField.DAY_OF_MONTH, 25);

    }
}

void main() {

    var now = LocalDate.now();
    System.out.println("Today: " + now);

    var xmas = now.with(new NextChristmas());
    System.out.println("Next XMas: " + xmas);
}

In the example, the custom TemporalAdjuster calculates
the date of the next XMas.

@Override
public Temporal adjustInto(Temporal temporal) {

    return temporal.with(ChronoField.MONTH_OF_YEAR, 12)
            .with(ChronoField.DAY_OF_MONTH, 25);
}

We implement the adjustInto method, which returns the
Temporal object for the XMas to which the date calling the method
should adjust.

$ java Main.java
Today: 2024-07-10
Next XMas: 2024-12-25

## Source

[Java TemporalAdjuster - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/temporal/TemporalAdjuster.html)

In this article we have done date and time modifications with 
Java TemporalAdjusters.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).