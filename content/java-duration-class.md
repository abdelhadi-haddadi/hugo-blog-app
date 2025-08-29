+++
title = "Java Duration Class"
date = 2025-08-29T20:00:47.846+01:00
draft = false
description = "Complete Java Duration class tutorial covering all methods with examples. Learn about time handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Duration Class

Last modified: April 16, 2025

 

The java.time.Duration class represents a time-based amount of time
in seconds and nanoseconds. It models a quantity or amount of time in terms of
seconds and nanoseconds. Duration is used to measure elapsed time between two
instants.

Duration is immutable and thread-safe. It is commonly used for
measuring time intervals, adding/subtracting time from temporal objects, and
calculating differences between temporal objects. Duration works with machine
time rather than calendar-based time.

## Duration Class Overview

Duration provides methods to create durations, perform calculations,
and convert between units. Key operations include adding to temporal objects,
comparing durations, and extracting components. The class handles time in
seconds and nanoseconds.

public final class Duration implements TemporalAmount, Comparable&lt;Duration&gt;, 
    Serializable {
    public static Duration ofDays(long days);
    public static Duration ofHours(long hours);
    public static Duration ofMinutes(long minutes);
    public static Duration ofSeconds(long seconds);
    public static Duration ofMillis(long millis);
    public static Duration ofNanos(long nanos);
    public static Duration between(Temporal startInclusive, Temporal endExclusive);
    public long getSeconds();
    public int getNano();
    public Duration plus(Duration duration);
    public Duration minus(Duration duration);
    public Duration multipliedBy(long multiplicand);
    public Duration dividedBy(long divisor);
    public long toDays();
    public long toHours();
    public long toMinutes();
    public long toMillis();
    public long toNanos();
}

The code above shows key methods provided by Duration. These methods
allow creating, comparing, and manipulating durations. The class provides
precision up to nanoseconds while supporting conversion to various time units.

## Creating Duration Objects

Duration objects can be created using factory methods for specific time units
or by calculating differences between temporal objects. The class supports
creating durations from days to nanoseconds.

Main.java
  

package com.zetcode; 

import java.time.Duration;
import java.time.Instant;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {
        
        // Create from hours
        Duration hours = Duration.ofHours(2);
        System.out.println("2 hours: " + hours);
        
        // Create from minutes
        Duration minutes = Duration.ofMinutes(30);
        System.out.println("30 minutes: " + minutes);
        
        // Create from seconds and nanos
        Duration seconds = Duration.ofSeconds(45, 500_000_000);
        System.out.println("45.5 seconds: " + seconds);
        
        // Create from between two temporals
        Instant start = Instant.now();
        Instant end = start.plusSeconds(60);
        Duration between = Duration.between(start, end);
        System.out.println("Between instants: " + between);
        
        // From LocalTime
        Duration timeDiff = Duration.between(
            LocalTime.of(9, 0), 
            LocalTime.of(17, 30)
        );
        System.out.println("Workday duration: " + timeDiff);
    }
}

This example demonstrates different ways to create Duration objects. The output
shows durations in ISO-8601 duration format (PTnHnMnS). Note that durations
created from between operations are exact differences between temporal objects.

## Getting Duration Components

A Duration can be decomposed into its seconds and nanoseconds components or
converted to various time units. These methods are useful for interoperability
with other APIs or for displaying durations in specific units.

Main.java
  

package com.zetcode; 

import java.time.Duration;

public class Main {

    public static void main(String[] args) {

        Duration duration = Duration.ofHours(2).plusMinutes(30).plusSeconds(15);
        
        // Get seconds and nanos
        long seconds = duration.getSeconds();
        int nanos = duration.getNano();
        System.out.println("Seconds: " + seconds);
        System.out.println("Nanoseconds: " + nanos);
        
        // Convert to various units
        System.out.println("To days: " + duration.toDays());
        System.out.println("To hours: " + duration.toHours());
        System.out.println("To minutes: " + duration.toMinutes());
        System.out.println("To milliseconds: " + duration.toMillis());
        System.out.println("To nanoseconds: " + duration.toNanos());
    }
}

This example shows how to extract components from a Duration. Note that
conversion methods like toHours return the total duration in
that unit, potentially losing precision. The seconds and nanoseconds together
provide full precision.

## Duration Arithmetic

Duration supports arithmetic operations like addition, subtraction,
multiplication, and division. These operations are useful for modifying
durations while maintaining precision. All operations return new Duration
objects.

Main.java
  

package com.zetcode; 

import java.time.Duration;

public class Main {

    public static void main(String[] args) {

        Duration duration1 = Duration.ofHours(2);
        Duration duration2 = Duration.ofMinutes(30);
        
        // Addition
        Duration sum = duration1.plus(duration2);
        System.out.println("Sum: " + sum);
        
        // Subtraction
        Duration diff = duration1.minus(duration2);
        System.out.println("Difference: " + diff);
        
        // Multiplication
        Duration multiplied = duration1.multipliedBy(3);
        System.out.println("Multiplied by 3: " + multiplied);
        
        // Division
        Duration divided = duration1.dividedBy(2);
        System.out.println("Divided by 2: " + divided);
        
        // Negation
        Duration negated = duration1.negated();
        System.out.println("Negated: " + negated);
    }
}

This example demonstrates various arithmetic operations with Duration objects.
All operations maintain nanosecond precision and handle overflow/underflow
automatically. Note that operations return new Duration instances as the
class is immutable.

## Comparing Durations

Durations can be compared to determine which is longer or if they are equal.
The class provides compareTo, equals, and
isZero methods. These comparisons are essential for time-based
logic in applications.

Main.java
  

package com.zetcode; 

import java.time.Duration;

public class Main {

    public static void main(String[] args) {

        Duration shortDur = Duration.ofMinutes(15);
        Duration mediumDur = Duration.ofHours(1);
        Duration longDur = Duration.ofHours(2);
        
        // Comparison
        System.out.println("short &lt; medium: " + 
            (shortDur.compareTo(mediumDur) &lt; 0));
        System.out.println("medium == 1 hour: " + 
            mediumDur.equals(Duration.ofHours(1)));
        System.out.println("long &gt; medium: " + 
            (longDur.compareTo(mediumDur) &gt; 0));
        
        // Zero check
        System.out.println("Is zero: " + Duration.ZERO.isZero());
        
        // Negative duration
        Duration negative = Duration.ofHours(-1);
        System.out.println("Is negative: " + (negative.getSeconds() &lt; 0));
    }
}

This example demonstrates various ways to compare Duration objects. The
comparison methods consider both seconds and nanoseconds components. Note
that equality requires both components to match exactly, while comparison
considers the total duration.

## Using Duration with Temporal Objects

Duration can be added to or subtracted from temporal objects like Instant
or LocalDateTime. This is useful for calculating future or past points in
time relative to a given temporal object.

Main.java
  

package com.zetcode; 

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {

        Instant now = Instant.now();
        Duration twoHours = Duration.ofHours(2);
        
        // Add to Instant
        Instant future = now.plus(twoHours);
        System.out.println("Now plus 2 hours: " + future);
        
        // Subtract from Instant
        Instant past = now.minus(twoHours);
        System.out.println("Now minus 2 hours: " + past);
        
        // With LocalDateTime
        LocalDateTime ldt = LocalDateTime.now();
        LocalDateTime ldtFuture = ldt.plus(twoHours);
        System.out.println("LocalDateTime plus 2 hours: " + ldtFuture);
        
        // Convert between time zones
        Instant utc = Instant.now();
        Instant est = utc.atZone(ZoneId.of("America/New_York")).toInstant();
        Duration zoneDiff = Duration.between(utc, est);
        System.out.println("UTC to EST difference: " + zoneDiff);
    }
}

This example shows how to use Duration with various temporal objects. The
operations maintain precision and handle time zone conversions when needed.
Note that Duration represents an exact amount of time, unaffected by time
zones or daylight saving.

## Formatting and Parsing Durations

Duration can be converted to and from strings using ISO-8601 format. The
toString method produces a string representation, while
parse creates a Duration from a string.

Main.java
  

package com.zetcode; 

import java.time.Duration;

public class Main {

    public static void main(String[] args) {

        // Formatting to string
        Duration duration = Duration.ofHours(2).plusMinutes(30).plusSeconds(15);
        String durationStr = duration.toString();
        System.out.println("Formatted: " + durationStr);
        
        // Parsing from string
        Duration parsed = Duration.parse("PT1H30M15S");
        System.out.println("Parsed: " + parsed);
        System.out.println("Hours in parsed: " + parsed.toHours());
        
        // Edge cases
        Duration zero = Duration.parse("PT0S");
        System.out.println("Zero duration: " + zero);
        
        Duration large = Duration.parse("P2DT3H4M");
        System.out.println("Large duration: " + large);
    }
}

This example demonstrates formatting and parsing of Duration objects. The
ISO-8601 format uses 'P' for period, 'T' for time, and letters for units
(H=hours, M=minutes, S=seconds). Note that parsing is strict and requires
proper format.

## Source

[Java Duration Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html)

In this article, we've covered the essential methods and features of the Java
Duration class. Understanding these concepts is crucial for accurate time
interval handling in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).