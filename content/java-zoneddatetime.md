+++
title = "Java ZonedDateTime"
date = 2025-08-29T20:00:59.002+01:00
draft = false
description = "Java ZonedDateTime tutorial shows how to work with ZonedDateTime in Java. ZonedDateTime is an immutable datetime object that represents a datetime with zone information."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ZonedDateTime

last modified July 13, 2024

 

In this article we show how to work with ZonedDateTime in Java.

 
ZonedDateTime represents a date and time along with its time zone
information. It provides a more robust and flexible way to handle date and time
compared to older date and time classes.

A time zone is a geographic region within which the same standard time is used.
It helps synchronize clocks across different locations, ensuring that people in
the same area follow a consistent time.

Key Features of ZonedDateTime include:

    
        Immutable: ZonedDateTime objects are immutable, meaning their state
        cannot be changed after creation. This ensures thread safety and
        simplifies reasoning about your code.
    
    
        Time Zone Awareness: It stores the date and time along with the time
        zone identifier (like "Europe/Bratislava") and the zone offset
        (difference from UTC). This allows you to represent and manipulate dates
        and times considering different time zones.
    
    
        Precision: ZonedDateTime can handle dates and times with nanosecond
        precision.
    
    
        Calendar System: It uses the ISO-8601 calendar system, a widely accepted
        international standard for representing dates and times.
    

## Default TimeZone

The defautl TimeZone is determined with TimeZone.getDefault.

Main.java
  

import java.util.TimeZone;

void main() {

    TimeZone def = TimeZone.getDefault();

    System.out.println(def.getDisplayName());
    System.out.println(def.toZoneId());
}

The program determines our TimeZone. We print its display name and Zone Id.

$ java Main.java
Central European Standard Time
Europe/Bratislava

## Current datetime in default timezone

The ZonedDateTime.now method obtains the current datetime from the
system clock in the default timezone.

Main.java
  

import java.time.ZonedDateTime;

void main() {

    var now = ZonedDateTime.now();
    System.out.println(now);
}

The example prints the current datetime int he default timezone.

$ java Main.java
2024-07-13T18:04:01.552994900+02:00[Europe/Bratislava]

## Parsing ZonedDateTime from string

The parse method obtains an instance of ZonedDateTime from a text
string such as 2007-12-03T10:15:30+01:00[Europe/Paris]. The string must
represent a valid datetime and is parsed using
DateTimeFormatter.ISO_ZONED_DATE_TIME.

Main.java
  

import java.time.ZonedDateTime;

void main() {

    var dt1 = "2024-07-13T18:04:01.552994900+02:00[Europe/Bratislava]";
    var dt2 = "2024-07-13T18:04:01.552994900+03:00[Europe/Moscow]";

    var zdt1 = ZonedDateTime.parse(dt1);
    System.out.println(zdt1);

    var zdt2 = ZonedDateTime.parse(dt2);
    System.out.println(zdt2);
}

The example parses two datetime strings with ZonedDateTime.parse.

## DateTimeFormatter

We use DateTimeFormatter to format ZonedDateTime.

Main.java
  

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

void main() {

    var now = ZonedDateTime.now();

    DateTimeFormatter formatter = DateTimeFormatter.RFC_1123_DATE_TIME;
    String nowf = now.format(formatter);

    System.out.println(nowf);
}

The example formats the current datetime in the default timezone using 
RFC_1123_DATE_TIME format.

## Flight arrival example

We are travelling from Bratislava to Moscow. We want to determine the time of 
arrival in Moscow time. 

Main.java
  

import java.time.ZoneId;
import java.time.ZonedDateTime;

void main() {

    ZoneId baZone = ZoneId.of("Europe/Bratislava");

    // Set the expected arrival time in Bratislava (local time)
    ZonedDateTime expectedArrival = ZonedDateTime.of(2024, 7, 13,
            23, 0, 0, 0, baZone);

    // Convert to Moscow time zone (UTC+3)
    ZoneId moscowZone = ZoneId.of("Europe/Moscow");
    ZonedDateTime arrivalInMoscow = expectedArrival.withZoneSameInstant(moscowZone);

    System.out.println("Expected arrival in Bratislava: " + expectedArrival);
    System.out.println("Arrival in Moscow time: " + arrivalInMoscow);
}

The example sets the arrival time in *Europe/Bratislava* timezone. Using
withZoneSameInstant, we convert it to the *Europe/Moscow*
timezone.

$ java Main.java
Expected arrival in Bratislava: 2024-07-13T23:00+02:00[Europe/Bratislava]
Arrival in Moscow time: 2024-07-14T00:00+03:00[Europe/Moscow]

## Source

[Java ZonedDateTime - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/ZonedDateTime.html)

In this article we have worked with Java ZonedDateTime.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).