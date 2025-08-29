+++
title = "Java LocalTime"
date = 2025-08-29T20:00:00.628+01:00
draft = false
description = "Java LocalTime tutorial shows how to work with LocalTime in Java. LocalTime is a time without a time-zone in the ISO-8601 calendar system."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LocalTime

last modified July 10, 2024

 

In this article we show how to work with LocalTime in Java. We compute the
current local time, parse local time, format local time, compare local time, and
do time arithmetics.

LocalTime is a time without a time-zone in the ISO-8601
calendar system. LocalTime is an immutable date-time object.

LocalTime does not store or represent a date or time-zone.
It is a description of the local time as seen on a wall clock.
Wall time, also called real-world time or wall-clock time,
refers to elapsed time as determined by a chronometer such as
a wristwatch or wall clock.

The equals method should be used for comparisons.

## Current time

The current time is retrived with LocalTime.now.

Main.java
  

import java.time.LocalTime;

void main() {

    LocalTime now = LocalTime.now();
    System.out.println(now);
}

The example prints the local current time.

$ java Main.java
11:43:02.229989200

## Creating LocalTime objects

The are several ways to create LocalTime in Java.

Main.java
  

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

void main() {

    // Current Time
    LocalTime time1 = LocalTime.now();
    System.out.println(time1);

    // Specific Time
    LocalTime time2 = LocalTime.of(7, 20, 45, 342123342);
    System.out.println(time2);

    // Specific Time
    LocalTime time3 = LocalTime.parse("12:32:22",
        DateTimeFormatter.ISO_TIME);
    System.out.println(time3);

    // Retrieving from LocalDateTime
    LocalTime time4 = LocalDateTime.now().toLocalTime();
    System.out.println(time4);
}

The example presents four methods

LocalTime time1 = LocalTime.now();

The LocalTime.now creates a current local time.

LocalTime time2 = LocalTime.of(7, 20, 45, 342123342);

With LocalTime.of, we can create a specific local time
from an hour, minute, second and nanosecond.

LocalTime time3 = LocalTime.parse("12:32:22",
            DateTimeFormatter.ISO_TIME);

With LocalTime.parse, we parse LocalTime
from a string.

LocalTime time4 = LocalDateTime.now().toLocalTime();

It is also possible to get LocalTime from
a LocalDateTime object.

$ java Main.java
18:18:12.135
07:20:45.342123342
12:32:22
18:18:12.186

## LocalTime hour, minute, second

The following example splits a local time into hour, minute, and second
parts.

Main.java
  

import java.time.LocalTime;

void main() {

    LocalTime time = LocalTime.now();

    System.out.printf("Hour: %s%n", time.getHour());
    System.out.printf("Minute: %s%n", time.getMinute());
    System.out.printf("Second: %s%n", time.getSecond());
}

The getHour gets the hour part, the getMinute
gets the minute part, and the getSecond the second part
of the LocalTime.

$ java Main.java
Hour: 11
Minute: 41
Second: 47

## LocalTime zones

We can compute a local time for a specific time zone. LocalTime,
however, does not store time zone information.

Main.java
  

import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

void main() {

    ZoneId zone1 = ZoneId.of("Europe/Bratislava");
    ZoneId zone2 = ZoneId.of("Europe/Moscow");

    LocalTime now1 = LocalTime.now(zone1);
    LocalTime now2 = LocalTime.now(zone2);

    System.out.printf("Bratislava time: %s%n", now1);
    System.out.printf("Moscow time: %s%n", now2);

    long hoursBetween = ChronoUnit.HOURS.between(now1, now2);
    long minutesBetween = ChronoUnit.MINUTES.between(now1, now2);

    System.out.println(hoursBetween);
    System.out.println(minutesBetween);
}

The example finds out current local time for Moscow and Bratislava.
We also compute the time difference between the two cities.

ZoneId zone1 = ZoneId.of("Europe/Bratislava");
ZoneId zone2 = ZoneId.of("Europe/Moscow");

We specify the time zones with ZoneId.of method.

LocalTime now1 = LocalTime.now(zone1);
LocalTime now2 = LocalTime.now(zone2);

To create local times, we pass the zones to the LocalTime.now.

long hoursBetween = ChronoUnit.HOURS.between(now1, now2);
long minutesBetween = ChronoUnit.MINUTES.between(now1, now2);

We compute the difference between the two cities in hours and minutes.

$ java Main.java
Bratislava time: 11:42:13.775138900
Moscow time: 12:42:13.777141
1
60

## LocalTime format

The time is formatted differently in various countries.
DateTimeFormatter helps us format the time.

Main.java
  

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

void main() {

    LocalTime now = LocalTime.now();

    DateTimeFormatter dtf = DateTimeFormatter.ISO_TIME;
    System.out.println(now.format(dtf));

    DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("hh:mm:ss");
    System.out.println(now.format(dtf2));

    DateTimeFormatter dtf3 = DateTimeFormatter.ofPattern("hh:mm:ss a");
    System.out.println(now.format(dtf3));
}

The example uses DateTimeFormatter to format time.

DateTimeFormatter dtf = DateTimeFormatter.ISO_TIME;
System.out.println(now.format(dtf));

We format the time to the ISO format time standart.

DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("hh:mm:ss");

We can choose a specific time format with DateTimeFormatter.ofPattern.
The documentation to DateTimeFormatter contains the description
of various formatting characters that we can use.

$ java Main.java
11:43:59.9144994
11:43:59
11:43:59 AM

## LocalTime arithmetic

Java LocalTime has methods for doing time arithmetics.

Main.java
  

import java.time.LocalTime;

void main() {

    LocalTime now = LocalTime.now();
    System.out.println("Current Time: " + now);

    // LocalTime addition
    System.out.println("Adding 3 hours: " + now.plusHours(3));
    System.out.println("Adding 30 minutes: " + now.plusMinutes(30));
    System.out.println("Adding 45 seconds: " + now.plusSeconds(45));
    System.out.println("Adding 40000 nanoseconds: " + now.plusNanos(40000));

    // LocalTime subtraction
    System.out.println("Subtracting 3 hours: " + now.minusHours(3));
    System.out.println("Subtracting 30 minutes: " + now.minusMinutes(30));
    System.out.println("Subtracting 45 seconds: " + now.minusSeconds(45));
    System.out.println("Subtracting 40000 nanoseconds: " + now.minusNanos(40000));
}

The example presents method for adding and subtracting time units.

System.out.println("Adding 3 hours: " + localTime.plusHours(3));

The plusHours adds three hours to the current local time.

System.out.println("Subtracting 3 hours: " + now.minusHours(3));

Likewise, the minusHours subtracts three hours from the current
local time.

$ java Main.java
Current Time: 11:44:32.932360500
Adding 3 hours: 14:44:32.932360500
Adding 30 minutes: 12:14:32.932360500
Adding 45 seconds: 11:45:17.932360500
Adding 40000 nanoseconds: 11:44:32.932400500
Subtracting 3 hours: 08:44:32.932360500
Subtracting 30 minutes: 11:14:32.932360500
Subtracting 45 seconds: 11:43:47.932360500
Subtracting 40000 nanoseconds: 11:44:32.932320500

## The LocalTime until method

With the until method, we can compute the time until another time
in terms of the specified unit.

Main.java
  

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

void main() {

    LocalTime now = LocalTime.now();
    LocalTime time = LocalTime.parse("22:15:30");

    System.out.printf("%s hours%n", now.until(time, ChronoUnit.HOURS));
    System.out.printf("%s minutes%n", now.until(time, ChronoUnit.MINUTES));
    System.out.printf("%s seconds%n", now.until(time, ChronoUnit.SECONDS));
}

The example calculates the time that has to elapse until another time
in hours, minutes and seconds.

System.out.printf("%s hours%n", now.until(time, ChronoUnit.HOURS));

With ChronoUnit.HOURS, we specify that we calculate the
the time difference in hours.

$ java Main.java
10 hours
630 minutes
37808 seconds

## Comparing LocalTime objects

The following example shows how to compare times.

Main.java
  

import java.time.LocalTime;

void main() {

    LocalTime time1 = LocalTime.of(4, 23, 12);
    LocalTime time2 = LocalTime.of(8, 03, 50);
    LocalTime time3 = LocalTime.of(12, 47, 35);

    if (time1.compareTo(time2) == 0) {
        System.out.println("time1 and time2 are equal");
    } else {
        System.out.println("time1 and time2 are not equal");
    }

    if (time2.isBefore(time3)) {
        System.out.println("time2 comes before time3");
    } else {
        System.out.println("time2 does not come before time3");
    }

    if (time3.isAfter(time1)) {
        System.out.println("time3 comes after time1");
    } else {
        System.out.println("time3 does not come after time1");
    }
}

The example compares times. We check if they are equal, if the come
before or after another time.

if (time1.compareTo(time2) == 0) {

The compareTo compares two local times.

if (time2.isBefore(time3)) {

The isBefore checks if a time comes before another
time.

if (time3.isAfter(time1)) {

The isAfter checks if a time comes after another time.

$ java Main.java
time1 and time2 are not equal
time2 comes before time3
time3 comes after time1

## The truncatedTo method

The LocalTime's truncatedTo method returns
a copy of a local time with the time truncated.

Main.java
  

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

void main() {

    LocalTime now = LocalTime.now();

    System.out.println(now);
    System.out.println(now.truncatedTo(ChronoUnit.HALF_DAYS));
    System.out.println(now.truncatedTo(ChronoUnit.HOURS));
    System.out.println(now.truncatedTo(ChronoUnit.MINUTES));
    System.out.println(now.truncatedTo(ChronoUnit.SECONDS));
    System.out.println(now.truncatedTo(ChronoUnit.MICROS));
}

The example uses truncatedTo to truncate time to
half days, hours, minutes, seconds, and micros.

$ java Main.java
11:46:46.017153200
00:00
11:00
11:46
11:46:46
11:46:46.017153

## Source

[Java LocalTime - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalTime.html)

In this article we have worked with Java LocalTime.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).