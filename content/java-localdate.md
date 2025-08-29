+++
title = "Java LocalDate"
date = 2025-08-29T19:59:59.517+01:00
draft = false
description = "Java LocalDate tutorial shows how to work with LocalDate in Java. LocalDate is a date without a time-zone in the ISO-8601 calendar system, such as 2021-05-22."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LocalDate

last modified July 10, 2024

 

In this article we show how to work with LocalDate in Java. We compute the
current local date, parse local date, format local date, compare local date, and
do date arithmetics.

LocalDate is a date without a time-zone in the ISO-8601 calendar
system, such as 2024-05-22. LocalDate is an immutable date-time
object.

LocalDate does not store or represent a time or time-zone.
It is a description of the local date as seen on a wall clock.

The equals method should be used for comparisons.

## Current date

The current date is retrived with LocalDate.now.

Main.java
  

import java.time.LocalDate;

void main() {

    LocalDate now = LocalDate.now();
    System.out.println(now);
}

The example prints the local current date.

$ java Main.java
2024-07-10

## Creating LocalDate objects

The are several ways to create LocalDate in Java.

Main.java
  

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

void main() {

    // Current date
    LocalDate date1 = LocalDate.now();
    System.out.println(date1);

    // Specific date
    LocalDate date2 = LocalDate.of(2021, 5, 20);
    System.out.println(date2);

    // Specific date
    LocalDate date3 = LocalDate.parse("2021-05-21", DateTimeFormatter.ISO_DATE);
    System.out.println(date3);

    // Retrieving from LocalDateTime
    LocalDate date4 = LocalDateTime.now().toLocalDate();
    System.out.println(date4);
}

The example presents four methods to generate a LocalDate.

LocalDate date1 = LocalDate.now();

The LocalDate.now creates a current local time.

LocalDate date2 = LocalDate.of(2021, 5, 20);

With LocalDate.of, we can create a specific local date
from an year, month, and date values.

LocalDate date3 = LocalDate.parse("2021-05-21", DateTimeFormatter.ISO_DATE);

With LocalDate.parse, we parse LocalDate from a
string.

LocalDate date4 = LocalDateTime.now().toLocalDate();

It is also possible to get LocalDate from a
LocalDateTime object using the toLocalDate method.

$ java Main.java
2024-07-10
2021-05-20
2021-05-21
2024-07-10

## LocalDate year, month, day

The following example splits a local date into year, month, and day parts.

Main.java
  

import java.time.LocalDate;

void main() {

    LocalDate date = LocalDate.now();

    System.out.printf("Year: %s%n", date.getYear());
    System.out.printf("Month: %s%n", date.getMonthValue());
    System.out.printf("Day: %s%n", date.getDayOfMonth());
}

The getYear gets the year, the getMonthValue gets the
month, and the getDayOfMonth the day of the date.

$ java Main.java
Year: 2024
Month: 7
Day: 10

## LocalDate day of year, month, week

In the following example, we get the day of year, month, and week.

Main.java
  

import java.time.LocalDate;

void main() {

    LocalDate now = LocalDate.now();

    System.out.println(now);

    System.out.printf("Day of year: %s%n", now.getDayOfYear());
    System.out.printf("Day of month: %s%n", now.getDayOfMonth());
    System.out.printf("Day of week: %s%n", now.getDayOfWeek());
}

To do the task, we use the getDayOfYear, getDayOfMonth, 
and getDayOfWeek methods.

$ java Main.java
2024-07-10
Day of year: 192
Day of month: 10
Day of week: WEDNESDAY

## LocalDate &amp; DateTimeFormatter

Different countries use different date formats. DateTimeFormatter
helps us format the date.

Main.java
  

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

void main() {

    LocalDate now = LocalDate.now();

    DateTimeFormatter df = DateTimeFormatter.ISO_DATE;
    System.out.println(now.format(df));

    DateTimeFormatter df2 = DateTimeFormatter.ISO_ORDINAL_DATE;
    System.out.println(now.format(df2));

    DateTimeFormatter df3 = DateTimeFormatter.ofPattern("dd LLLL yyyy");
    System.out.println(now.format(df3));

    DateTimeFormatter df4 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    System.out.println(now.format(df4));

    System.out.println("----------------------");

    LocalDate day = LocalDate.of(2020, 9, 20);

    System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL)
        .withLocale(Locale.FRENCH).format(day));
    System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG)
        .withLocale(Locale.FRENCH).format(day));
    System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)
        .withLocale(Locale.FRENCH).format(day));
    System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
        .withLocale(Locale.FRENCH).format(day));
}

The example uses DateTimeFormatter to format date.

DateTimeFormatter df = DateTimeFormatter.ISO_DATE;
System.out.println(now.format(df));

We format the time to the ISO_DATE format date standart.

DateTimeFormatter df3 = DateTimeFormatter.ofPattern("dd LLLL yyyy");
System.out.println(now.format(df3));

We can choose a custom date format with DateTimeFormatter.ofPattern.
The documentation to DateTimeFormatter contains the description
of various formatting characters that we can use.

System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL)
    .withLocale(Locale.FRENCH).format(day));

With the ofLocalizedDate method, we have a locale specific date
format.

$ java Main.java
2024-07-10
2024-192
10 júl 2024
10/07/2024
----------------------
dimanche 20 septembre 2020
20 septembre 2020
20 sept. 2020
20/09/2020

## LocalDate arithmetic

Java LocalDate has methods for doing date arithmetics.

Main.java
  

import java.time.LocalDate;

void main() {

    LocalDate now = LocalDate.now();
    System.out.println("Current date: " + now);

    // LocalDate addition
    System.out.println("Adding 3 days: " + now.plusDays(3));
    System.out.println("Adding 12 months: " + now.plusMonths(12));
    System.out.println("Adding 45 weeks: " + now.plusWeeks(45));
    System.out.println("Adding 4 years: " + now.plusYears(4));

    System.out.println("----------------------");

    // LocalDate subtraction
    System.out.println("Subtracting 3 days: " + now.minusDays(3));
    System.out.println("Subtracting 12 months: " + now.minusMonths(12));
    System.out.println("Subtracting 45 weeks: " + now.minusWeeks(45));
    System.out.println("Subtracting 4 years: " + now.minusYears(4));
}

The example presents method for adding and subtracting date units.

System.out.println("Adding 3 days: " + now.plusDays(3));

The plusDays adds three days to the current local date.

System.out.println("Subtracting 3 days: " + now.minusDays(3));

Likewise, the minusDays subtracts three days from the current
local date.

$ java Main.java
Current date: 2024-07-10
Adding 3 days: 2024-07-13
Adding 12 months: 2025-07-10
Adding 45 weeks: 2025-05-21
Adding 4 years: 2028-07-10
----------------------
Subtracting 3 days: 2024-07-07
Subtracting 12 months: 2023-07-10
Subtracting 45 weeks: 2023-08-30
Subtracting 4 years: 2020-07-10

## LocalDate until

With the until method, we can compute the date until another date
in terms of the specified unit.

Main.java
  

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

void main() {

    LocalDate d1 = LocalDate.of(2021, 5, 22);
    LocalDate d2 = LocalDate.parse("2021-12-25");

    System.out.printf("%s days%n", d1.until(d2, ChronoUnit.DAYS));
    System.out.printf("%s months%n", d1.until(d2, ChronoUnit.MONTHS));
    System.out.printf("%s years%n", d1.until(d2, ChronoUnit.YEARS));
}

The example calculates the date that has to elapse until another date 
in days, months and years.

System.out.printf("%s days%n", d1.until(d2, ChronoUnit.DAYS));

With ChronoUnit.DAYS, we specify that we calculate the the date
difference in days.

$ java Main.java
217 days
7 months
0 years

## Comparing LocalDate objects

The following example shows how to compare dates.

Main.java
  

import java.time.LocalDate;

void main() {

    LocalDate d1 = LocalDate.of(2020, 2, 12);
    LocalDate d2 = LocalDate.of(2021, 3, 15);
    LocalDate d3 = LocalDate.of(2021, 5, 22);

    if (d1.compareTo(d2) == 0) {
        System.out.println("date1 and date2 are equal");
    } else {
        System.out.println("date1 and date2 are not equal");
    }

    if (d2.isBefore(d3)) {
        System.out.println("date2 comes before date3");
    } else {
        System.out.println("date2 does not come before date3");
    }

    if (d3.isAfter(d1)) {
        System.out.println("date3 comes after date1");
    } else {
        System.out.println("date3 does not come after date1");
    }
}

The example compares dates. We check if they are equal, if the come
before or after another date.

if (d1.compareTo(d2) == 0) {

The compareTo compares two local dates.

if (d2.isBefore(d3)) {

The isBefore checks if a date comes before another date.

if (d3.isAfter(d1)) {

The isAfter checks if a date comes after another date.

$ java Main.java
date1 and date2 are not equal
date2 comes before date3
date3 comes after date1

## LocalDate datesUntil

The datesUntil method returns a sequential ordered stream of dates. 
The returned stream starts from start date (inclusive) and goes to end date 
(exclusive) by an incremental step of one day. 

Main.java
  

import java.time.LocalDate;

void main() {

    LocalDate start = LocalDate.of(2021, 4, 5);
    LocalDate end = LocalDate.of(2021, 5, 22);

    start.datesUntil(end).forEach(System.out::println);
}

In the example, we print all dates between two specified dates.

$ java Main.java
2021-04-05
2021-04-06
2021-04-07
2021-04-08
...
2021-05-20
2021-05-21

## LocalDate range

The range method gets the range of valid values for the specified
field. 

Main.java
  

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ValueRange;

void main () {

    LocalDate d = LocalDate.of(2021, 5, 22);

    ValueRange r = d.range(ChronoField.DAY_OF_MONTH);
    
    System.out.printf("DAY_OF_MONTH: %s%n", r);

    r = d.range(ChronoField.DAY_OF_WEEK);
    System.out.printf("DAY_OF_WEEK: %s%n", r);

    r = d.range(ChronoField.YEAR);
    System.out.printf("YEAR: %s%n", r);

    r = d.range(ChronoField.DAY_OF_YEAR);
    System.out.printf("DAY_OF_YEAR: %s%n", r);

    r = d.range(ChronoField.YEAR_OF_ERA);
    System.out.printf("YEAR_OF_ERA: %s%n", r);

    r = d.range(ChronoField.ERA);
    System.out.printf("ERA: %s%n", r);
}

We get the range for various fields including DAY_OF_MONTH, 
YEAR, and DAY_OF_YEAR.

$ java Main.java
DAY_OF_MONTH: 1 - 31
DAY_OF_WEEK: 1 - 7
YEAR: -999999999 - 999999999
DAY_OF_YEAR: 1 - 365
YEAR_OF_ERA: 1 - 999999999
ERA: 0 - 1

## LocalDate query

The query method  queries a date using the specified query. They 
are used for extracting information from temporal objects.

Main.java
  

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.time.temporal.TemporalQuery;
import java.util.List;

void main() {

    var dates = List.of(LocalDate.of(2020, 9, 1), LocalDate.of(2020, 1, 15),
        LocalDate.of(2020, 1, 1), LocalDate.of(2020, 11, 14), 
        LocalDate.of(2020, 12, 24), LocalDate.of(2020, 3, 6), 
        LocalDate.of(2020, 8, 8), LocalDate.of(2020, 12, 16),
        LocalDate.of(2020, 5, 8), LocalDate.of(2020, 10, 21));

    dates.forEach(d -&gt; {

        checkBirthday(d);
    });
}

void checkBirthday(LocalDate d) {

    Boolean isBirthday = d.query(new Birthdays());

    if (isBirthday.booleanValue()) {
        
        System.out.printf("%s is a family birthday%n", d);
    } else {

        System.out.printf("%s is not a family birthday%n", d);
    }
}

class Birthdays implements TemporalQuery&lt;Boolean&gt; {

    @Override
    public Boolean queryFrom(TemporalAccessor ta) {

        int month = ta.get(ChronoField.MONTH_OF_YEAR);
        int day = ta.get(ChronoField.DAY_OF_MONTH);

        if ((month == Month.JANUARY.getValue()) &amp;&amp; day == 15) {
            return Boolean.TRUE;
        }

        if ((month == Month.MARCH.getValue()) &amp;&amp; day == 6) {
            return Boolean.TRUE;
        }

        if ((month == Month.MAY.getValue()) &amp;&amp; day == 19) {
            return Boolean.TRUE;
        }

        if ((month == Month.AUGUST.getValue()) &amp;&amp; day == 8) {
            return Boolean.TRUE;
        }

        if ((month == Month.OCTOBER.getValue()) &amp;&amp; day == 21) {
            return Boolean.TRUE;
        }

        return Boolean.FALSE;
    }
}

In the example, we check if family members have birthdays in the specified
dates.

var dates = List.of(LocalDate.of(2020, 9, 1), LocalDate.of(2020, 9, 15),
    LocalDate.of(2020, 1, 1), LocalDate.of(2020, 11, 14), 
    LocalDate.of(2020, 12, 24), LocalDate.of(2020, 5, 1), 
    LocalDate.of(2020, 12, 17), LocalDate.of(2020, 12, 16),
    LocalDate.of(2020, 5, 8), LocalDate.of(2020, 6, 19));

We have a list of dates.

dates.forEach(d -&gt; {

    checkBirthday(d);
});

We go over the list and check if each element is a family birthday with
checkBirthday.

Boolean isBirthday = d.query(new Birthdays());

if (isBirthday.booleanValue()) {

    System.out.printf("%s is a holiday in Slovakia%n", d);
} else {

    System.out.printf("%s is not a holiday in Slovakia%n", d);
}

We query the current date with the query method; we pass the method 
a TemporalQuery.

class Birthdays implements TemporalQuery&lt;Boolean&gt; {

    @Override
    public Boolean queryFrom(TemporalAccessor ta) {

        int month = ta.get(ChronoField.MONTH_OF_YEAR);
        int day = ta.get(ChronoField.DAY_OF_MONTH);

        if ((month == Month.JANUARY.getValue()) &amp;&amp; day == 15) {
            return Boolean.TRUE;
        }

        ...

        return Boolean.FALSE;
    }
}

Inside the TemporalQuery's queryFrom method we specify 
the dates (birthdays), for which the method returns true. 

$ java Main.java
2020-09-01 is not a family birthday
2020-01-15 is a family birthday
2020-01-01 is not a family birthday
2020-11-14 is not a family birthday
2020-12-24 is not a family birthday
2020-03-06 is a family birthday
2020-08-08 is a family birthday
2020-12-16 is not a family birthday
2020-05-08 is not a family birthday
2020-10-21 is a family birthday

## Source

[Java LocalDate - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html)

In this article we have worked with Java LocalDate.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).