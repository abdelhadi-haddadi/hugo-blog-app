+++
title = "Java OffsetDateTime Class"
date = 2025-08-29T20:00:51.180+01:00
draft = false
description = "Complete Java OffsetDateTime class tutorial covering all methods with examples. Learn about time handling with offsets in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java OffsetDateTime Class

Last modified: April 16, 2025

 

The java.time.OffsetDateTime class represents a date-time with an
offset from UTC/Greenwich. It stores all date and time fields with precision
to nanoseconds and an offset from UTC.

OffsetDateTime is immutable and thread-safe. It is useful for
storing timestamps in databases or representing fixed-offset times. The class
combines LocalDateTime with ZoneOffset to provide a complete timestamp.

## OffsetDateTime Class Overview

OffsetDateTime provides methods to create, parse, and manipulate
date-time values with offsets. Key operations include adjusting the offset,
comparing values, and converting to other temporal types.

public final class OffsetDateTime implements Temporal, TemporalAdjuster, 
    Comparable&lt;OffsetDateTime&gt;, Serializable {
    public static OffsetDateTime now();
    public static OffsetDateTime of(LocalDateTime dateTime, ZoneOffset offset);
    public static OffsetDateTime parse(CharSequence text);
    public LocalDateTime toLocalDateTime();
    public ZoneOffset getOffset();
    public OffsetDateTime withOffsetSameLocal(ZoneOffset offset);
    public boolean isAfter(OffsetDateTime other);
    public boolean isBefore(OffsetDateTime other);
    public OffsetDateTime plus(long amountToAdd, TemporalUnit unit);
    public OffsetDateTime minus(long amountToSubtract, TemporalUnit unit);
}

The code above shows key methods provided by OffsetDateTime. These
methods allow creating, comparing, and manipulating date-time values with
offsets. The class provides nanosecond precision while maintaining offset
information.

## Creating OffsetDateTime Objects

OffsetDateTime objects can be created in several ways. The most common methods
are now for current time and factory methods for specific points.
Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.LocalDateTime;

public class Main {

    public static void main(String[] args) {
        
        // Current offset date-time
        OffsetDateTime now = OffsetDateTime.now();
        System.out.println("Current offset date-time: " + now);
        
        // From LocalDateTime and ZoneOffset
        LocalDateTime ldt = LocalDateTime.of(2025, 6, 15, 14, 30);
        ZoneOffset offset = ZoneOffset.ofHours(2);
        OffsetDateTime odt = OffsetDateTime.of(ldt, offset);
        System.out.println("From LocalDateTime: " + odt);
        
        // From string
        OffsetDateTime parsed = OffsetDateTime.parse("2025-01-01T12:00:00+01:00");
        System.out.println("Parsed from string: " + parsed);
        
        // With specific offset
        OffsetDateTime withOffset = now.withOffsetSameLocal(ZoneOffset.of("-05:00"));
        System.out.println("With -05:00 offset: " + withOffset);
    }
}

This example demonstrates different ways to create OffsetDateTime objects. The
output shows date-time values in ISO-8601 format with offsets. The
now method uses the system default offset.

## Accessing Date-Time Components

An OffsetDateTime can be decomposed into its date, time, and offset components.
These values can be accessed individually for processing or display purposes.

Main.java
  

package com.zetcode; 

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class Main {

    public static void main(String[] args) {

        OffsetDateTime odt = OffsetDateTime.now();
        
        // Get date components
        System.out.println("Year: " + odt.getYear());
        System.out.println("Month: " + odt.getMonth());
        System.out.println("Day: " + odt.getDayOfMonth());
        
        // Get time components
        System.out.println("Hour: " + odt.getHour());
        System.out.println("Minute: " + odt.getMinute());
        System.out.println("Second: " + odt.getSecond());
        System.out.println("Nano: " + odt.getNano());
        
        // Get offset
        ZoneOffset offset = odt.getOffset();
        System.out.println("Offset: " + offset);
        
        // Get LocalDateTime part
        System.out.println("Local date-time: " + odt.toLocalDateTime());
    }
}

This example shows how to extract components from an OffsetDateTime. The class
provides methods to access all date and time fields separately. The offset
represents the time difference from UTC.

## Comparing OffsetDateTime Values

OffsetDateTime values can be compared to determine chronological order. The class
provides isBefore, isAfter, and compareTo
methods. Comparisons consider both the instant and local date-time.

Main.java
  

package com.zetcode; 

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        OffsetDateTime now = OffsetDateTime.now();
        OffsetDateTime later = now.plus(1, ChronoUnit.HOURS);
        OffsetDateTime earlier = now.minus(30, ChronoUnit.MINUTES);
        
        System.out.println("Now is before later: " + now.isBefore(later));
        System.out.println("Now is after earlier: " + now.isAfter(earlier));
        System.out.println("Comparison result: " + now.compareTo(later));
        
        // Different offsets same instant
        OffsetDateTime nyTime = now.withOffsetSameInstant(ZoneOffset.of("-05:00"));
        System.out.println("Same instant different offset: " + now.isEqual(nyTime));
    }
}

This example demonstrates various ways to compare OffsetDateTime objects. The
comparison methods consider both the instant and local date-time. Note that
isEqual compares the instant while ignoring the offset.

## Adjusting the Offset

OffsetDateTime provides methods to adjust the offset while keeping either the
local date-time or instant the same. These operations are useful when converting
between different offset representations.

Main.java
  

package com.zetcode; 

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class Main {

    public static void main(String[] args) {

        OffsetDateTime now = OffsetDateTime.now();
        System.out.println("Original: " + now);
        
        // Keep local time, change offset
        OffsetDateTime sameLocal = now.withOffsetSameLocal(ZoneOffset.of("+05:30"));
        System.out.println("Same local, new offset: " + sameLocal);
        
        // Keep instant, change offset (adjusts local time)
        OffsetDateTime sameInstant = now.withOffsetSameInstant(ZoneOffset.of("-08:00"));
        System.out.println("Same instant, new offset: " + sameInstant);
        
        // Convert to UTC
        OffsetDateTime utc = now.withOffsetSameInstant(ZoneOffset.UTC);
        System.out.println("UTC equivalent: " + utc);
    }
}

This example shows how to adjust the offset while maintaining either the local
date-time or the instant. The withOffsetSameLocal changes the
offset without changing the local time. withOffsetSameInstant
adjusts the local time to maintain the same instant.

## Date-Time Arithmetic

OffsetDateTime supports temporal arithmetic through plus and
minus methods. These operations are useful for calculating future
or past points in time while maintaining the offset.

Main.java
  

package com.zetcode; 

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        OffsetDateTime now = OffsetDateTime.now();
        
        // Add days
        OffsetDateTime in5Days = now.plusDays(5);
        System.out.println("In 5 days: " + in5Days);
        
        // Subtract hours
        OffsetDateTime twoHoursAgo = now.minusHours(2);
        System.out.println("Two hours ago: " + twoHoursAgo);
        
        // Add using Duration
        OffsetDateTime in30Mins = now.plus(Duration.ofMinutes(30));
        System.out.println("In 30 minutes: " + in30Mins);
        
        // Complex operation
        OffsetDateTime complex = now.plus(1, ChronoUnit.WEEKS)
                                  .minus(3, ChronoUnit.DAYS)
                                  .plusHours(6);
        System.out.println("Complex operation result: " + complex);
    }
}

This example shows various ways to perform temporal arithmetic with OffsetDateTime.
Operations can use specific units or Duration objects. All calculations maintain
the original offset unless explicitly changed.

## Converting Between Time Types

OffsetDateTime can be converted to and from other temporal types like ZonedDateTime
and Instant. These conversions are essential when working with different time
representations.

Main.java
  

package com.zetcode; 

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.Instant;

public class Main {

    public static void main(String[] args) {

        OffsetDateTime odt = OffsetDateTime.now();
        
        // Convert to Instant
        Instant instant = odt.toInstant();
        System.out.println("As Instant: " + instant);
        
        // Convert to ZonedDateTime
        ZonedDateTime zdt = odt.atZoneSameInstant(ZoneId.of("Europe/Paris"));
        System.out.println("In Paris: " + zdt);
        
        // Convert from Instant
        OffsetDateTime fromInstant = Instant.now().atOffset(ZoneOffset.ofHours(3));
        System.out.println("From Instant: " + fromInstant);
        
        // Convert from ZonedDateTime
        OffsetDateTime fromZdt = ZonedDateTime.now().toOffsetDateTime();
        System.out.println("From ZonedDateTime: " + fromZdt);
    }
}

This example demonstrates conversions between OffsetDateTime and other temporal
types. Note that converting to ZonedDateTime requires a time zone, while
OffsetDateTime only stores an offset. All conversions preserve the exact moment
in time being represented.

## Source

[Java OffsetDateTime Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/OffsetDateTime.html)

In this article, we've covered the essential methods and features of the Java
OffsetDateTime class. Understanding these concepts is crucial for accurate time
handling with offsets in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).