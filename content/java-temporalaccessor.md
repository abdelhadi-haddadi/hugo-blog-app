+++
title = "Java TemporalAccessor"
date = 2025-08-29T20:00:44.468+01:00
draft = false
description = "Java TemporalAccessor tutorial shows how to work with TemporalAccessor in Java. It's a base interface for temporal objects."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalAccessor

last modified March 6, 2025

 

In this article, we explore the TemporalAccessor interface in Java.
We'll access temporal fields, check supported fields, and use it with
LocalTime as an example implementation.

TemporalAccessor is a foundational interface in the ISO-8601 calendar
system's java.time package. It provides read-only access to
temporal objects like time or date.

TemporalAccessor is implemented by classes such as
LocalTime and LocalDate. It's immutable and
focuses on querying temporal fields without modification.

## Accessing Temporal Fields

Use TemporalAccessor to query fields like hour or minute via
ChronoField.

Main.java
  

import java.time.LocalTime;
import java.time.temporal.ChronoField;

void main() {
    LocalTime time = LocalTime.now();
    int hour = time.get(ChronoField.HOUR_OF_DAY);
    System.out.println("Hour: " + hour);
}

This retrieves the current hour.

The code creates a LocalTime object with the current time using
LocalTime.now. It then uses get with
ChronoField.HOUR_OF_DAY to extract and print the hour.

## Checking Supported Fields

isSupported verifies if a field is available in a
TemporalAccessor.

Main.java
  

import java.time.LocalTime;
import java.time.temporal.ChronoField;

void main() {
    LocalTime time = LocalTime.of(15, 30);
    if (time.isSupported(ChronoField.MINUTE_OF_HOUR)) {
        int minute = time.get(ChronoField.MINUTE_OF_HOUR);
        System.out.println("Minute: " + minute);
    }
}

This checks and retrieves the minute.

Here, LocalTime.of(15, 30) sets a specific time. The
isSupported method checks if MINUTE_OF_HOUR is
valid before get retrieves and prints the minute.

if (time.isSupported(ChronoField.MINUTE_OF_HOUR)) {

isSupported ensures the field exists before access.

## TemporalAccessor with LocalTime

LocalTime implements TemporalAccessor. Compare
their usage:

Main.java
  

import java.time.LocalTime;
import java.time.temporal.TemporalAccessor;
import java.time.temporal.ChronoField;

void main() {
    TemporalAccessor time = LocalTime.of(7, 20);
    int hour = time.get(ChronoField.HOUR_OF_DAY);
    System.out.println("Hour: " + hour);
}

This uses TemporalAccessor generically.

This example declares time as a TemporalAccessor,
showing its interface usage. LocalTime.of(7, 20) sets the time,
and get extracts the hour using ChronoField.

## Common Temporal Fields

LocalTime as a TemporalAccessor supports fields
like:

- HOUR_OF_DAY: 0-23

- MINUTE_OF_HOUR: 0-59

- SECOND_OF_MINUTE: 0-59

Main.java
  

import java.time.LocalTime;
import java.time.temporal.ChronoField;

void main() {
    LocalTime time = LocalTime.now();
    System.out.printf("Hour: %d%n", time.get(ChronoField.HOUR_OF_DAY));
    System.out.printf("Minute: %d%n", time.get(ChronoField.MINUTE_OF_HOUR));
    System.out.printf("Second: %d%n", time.get(ChronoField.SECOND_OF_MINUTE));
}

This splits time into components.

The code uses LocalTime.now to get the current time. It then
extracts hour, minute, and second using ChronoField constants
and prints them with formatted output via printf.

## Limitations

TemporalAccessor is read-only. For adjustments, use
Temporal:

Main.java
  

import java.time.LocalTime;

void main() {
    LocalTime time = LocalTime.now();
    LocalTime later = time.plusHours(3); // Requires Temporal
    System.out.println("Now: " + time);
    System.out.println("Later: " + later);
}

This demonstrates a limitation of TemporalAccessor. While it
can query fields, modification like adding hours via
plusHours requires the Temporal interface,
which LocalTime also implements.

## Source

[Java TemporalAccessor - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/TemporalAccessor.html)

In this article, we have explored Java TemporalAccessor.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).