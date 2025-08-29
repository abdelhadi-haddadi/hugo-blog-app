+++
title = "Java Instant"
date = 2025-08-29T19:59:06.200+01:00
draft = false
description = "Java Instant tutorial shows how to use Instant to define moments in time in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Instant

last modified July 10, 2024

 

In this article we show how to use Instant to define moments in time in Java.

Instant represents a specific moment in time on the timeline. It's
akin to a single point on a never-ending line. Unlike other date and time
classes, Instant doesn't inherently include time zone information.
Instead, it measures time as the number of seconds and nanoseconds elapsed since
a specific point in time, known as the epoch.

The epoch is January 1st, 1970, at 00:00:00 Coordinated Universal Time (UTC).
Positive Instant values represent times after the epoch, while negative values
indicate times before.

Common use cases for Instant include:

    - Recording timestamps for events within an application.

    - Storing timestamps in databases where UTC is the preferred time format.

    Performing calculations based on the number of seconds or nanoseconds elapsed
        since a specific point in time.

## Current timestamp

We get the current timestamp with Instant.now.

Main.java
  

import java.time.Instant;

void main() {

    var timestamp = Instant.now();
    System.out.println("The current timestamp: " + timestamp);
}

The example prints the current timestamp.

$ java Main.java
The current timestamp: 2024-07-10T14:37:39.890616200Z

## Unix time

Unix time (also known as POSIX time or epoch time) is a system for describing a
point in time, defined as the number of seconds that have elapsed since 00:00:00
Coordinated Universal Time (UTC), Thursday, 1 January 1970, minus the number of
leap seconds that have taken place since then.

Main.java
  

import java.time.Instant;

void main() {

    Instant now = Instant.now();
    
    long unixTime = now.toEpochMilli();
    System.out.println(unixTime);
}

We compute the current Unix time in milliseconds. 

$ java Main.java
1720623471356

## The plus/minus methods

The plus/minus methods can be used to add datetime 
units to the instant. 

Main.java
  

import java.time.Instant;
import java.time.temporal.ChronoUnit;

void main() {

    var timestamp = Instant.now();

    var res = timestamp.plus(5, ChronoUnit.DAYS);
    System.out.println(res);

    res = timestamp.plusSeconds(78566);
    System.out.println(res);

    res = timestamp.minus(57, ChronoUnit.HOURS);
    System.out.println(res);
}

The example gets the current instant and adds 5 days, 78566 seconds, and 
subtracts 57 hours. 

$ java Main.java
2024-07-15T14:42:46.830593700Z
2024-07-11T12:32:12.830593700Z
2024-07-08T05:42:46.830593700Z

## Formatting Instant

We use DateTimeFormatter to format instants.

Main.java
  

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

void main() {

    var timestamp = Instant.now();
    System.out.println(timestamp);

    DateTimeFormatter df1 = DateTimeFormatter.ISO_DATE_TIME.withZone(ZoneId.of("UTC"));
    System.out.println(df1.format(timestamp));

    DateTimeFormatter df2 = DateTimeFormatter.RFC_1123_DATE_TIME.withZone(ZoneId.of("UTC"));;

    System.out.println(df2.format(timestamp));
}

Since Instant does not include date or time components, only
represents a point in time, we add the zone with
withZone(ZoneId.of("UTC")).

$ java Main.java
2024-07-10T14:51:09.957078500Z
2024-07-10T14:51:09.9570785Z[UTC]
Wed, 10 Jul 2024 14:51:09 GMT

## Converting to LocalDateTime

In the following example we show how to convert an Instnt to 
LocalDateTime.

Main.java
  

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

void main() {

    Instant now = Instant.now();

    LocalDateTime localDateTimePST = LocalDateTime.ofInstant(now, ZoneId.of("Europe/Bratislava"));
    System.out.println("Current time in Bratislava: " + localDateTimePST);
}

In the example we convert the Instant to LocalDateTime 
for a specific time zone (Europe/Bratislava).

$ java Main.java
Current time in Bratislava: 2024-07-10T16:54:46.319805200

## Source

[Java Instant - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Instant.html)

In this article we have used Java Instant to define moments in time.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).