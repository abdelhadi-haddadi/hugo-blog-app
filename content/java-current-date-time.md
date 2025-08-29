+++
title = "Java current date time"
date = 2025-08-29T19:58:32.685+01:00
draft = false
description = "Java current date time tutorial shows how to use various Java classes to get current date and time in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java current date time

last modified July 10, 2024

 

In this article we present various Java classes to get current date time in
Java.

There are several ways to get current date and time in Java. Java programmers
can use modern date and time API introduced in Java 8 (java.time), the classic,
outdated API (java.util), and the third-party Joda library.

## The java.time package

The java.time package contains the main API for dates, times,
instants, and durations. It is a modern replacement of the outdated
java.util date and time API.

## Getting current date and time with Instant

java.time.Instant models a single instantaneous point on the
time-line. This might be used to record event time-stamps in the application.

Main.java
  

import java.time.Instant;

    void main() {

        Instant instant = Instant.now();
        System.out.println(instant);
    }

The code example uses java.time.Instant to get the
current date and time.

Instant instant = Instant.now();

The Instant.now method obtains the current instant
from the system clock.

### Current date and time with LocalDateTime

java.time.LocalDateTime creates a date-time without a time-zone.

Main.java
  

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

void main() {

    LocalDateTime now = LocalDateTime.now();

    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    System.out.println(dtf.format(now));
}

The example uses java.time.LocalDateTime to get the current date
time and formats it with java.time.format.DateTimeFormatter.

LocalDateTime now = LocalDateTime.now();

The LocalDateTime.now method obtains the current date-time
from the system clock in the default time-zone.

DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

We format the datetime with DateTimeFormatter; we use custom
pattern.

## Current datetime with ZonedDateTime

java.time.ZonedDateTime is an immutable representation of
a date-time with a time-zone.

Main.java
  

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

void main() {

    ZonedDateTime now = ZonedDateTime.now();

    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    System.out.println(dtf.format(now));
}

The example uses java.time.ZonedDateTime to get the current date
time and formats it with java.time.format.DateTimeFormatter.

ZonedDateTime now = ZonedDateTime.now();

The ZonedDateTime.now method
obtains the current date-time from the system clock in the default time-zone.

## Current date and time with Clock

java.time.Clock provides access to the current instant, date 
and time using a time-zone.

Main.java
  

import java.time.Clock;
import java.time.Instant;

void main() {

    Clock clock = Clock.systemDefaultZone();

    Instant now = clock.instant();
    System.out.println(now);
}

The example uses java.time.Clock to get the current date
time.

Clock clock = Clock.systemDefaultZone();

The Clock.systemDefaultZone method obtains a clock that returns
the current instant using the best available system clock, converting to date
and time using the default time-zone.

## The java.util package

**Note: ** The classes available in java.util
(Date and Calendar) are obsolete. This is the original
Java date and time API.

## Current datetime with Date

java.util.Date represents a specific instant in time, with
millisecond precision.

Main.java
  

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

void main() {

    Date now = new Date();

    DateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    System.out.println(df.format(now));
}

The example uses java.util.Date to get the current date time and
formats it with java.text.SimpleDateFormat.

## Current datetime with Calendar

java.util.Calendar represents a specific instant in time, with
millisecond precision.

Main.java
  

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

void main() {

    Date now = Calendar.getInstance().getTime();

    DateFormat df = new SimpleDateFormat("yyyy-MM-d HH:mm:ss");

    System.out.println(df.format(now));
}

The example uses java.util.Calendar to get the current date time
and formats it with java.text.SimpleDateFormat.

## Current datetime with Joda time

Joda time is a third-party Date and time library to replace the outdated JDK
date time API.

implementation 'joda-time:joda-time:2.12.7'

We need joda-time dependency.

org.joda.time.LocalDateTime is an unmodifiable datetime class
representing a datetime without a time zone.

Main.java
  

import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

void main() {

    LocalDateTime ldt = new LocalDateTime();

    DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy, MMMM dd, HH:mm:ss");
    String str = fmt.print(ldt);

    System.out.println(str);
}

The example uses org.joda.time.LocalDateTime to get the current
date time and formats it with org.joda.time.format.DateTimeFormatter.

org.joda.time.DateTime is the standard implementation of an
unmodifiable datetime class.

Main.java
  

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

void main() {

    DateTime dt = DateTime.now();

    DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy, MMMM dd, HH:mm:ss");
    String str = fmt.print(dt);

    System.out.println(str);
}

The example uses org.joda.time.DateTime to get the current date
time and formats it with org.joda.time.format.DateTimeFormatter.

## Source

[Java time - language refernce](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html)

In this article we have shown how to get current date and time in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).