+++
title = "Java LocalDateTime Class"
date = 2025-08-29T20:00:50.067+01:00
draft = false
description = "Complete Java LocalDateTime class tutorial covering all methods with examples. Learn about date-time handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LocalDateTime Class

Last modified: April 16, 2025

 

The java.time.LocalDateTime class represents a date-time without a
time zone in the ISO-8601 calendar system. It combines LocalDate and LocalTime
to represent a complete date and time. LocalDateTime is immutable and thread-safe.

LocalDateTime is commonly used for representing date and time when
time zone is not required. It stores date and time with nanosecond precision.
The class provides methods for date-time arithmetic and formatting.

## LocalDateTime Class Overview

LocalDateTime provides methods to create, parse, and manipulate
date-time values. Key operations include getting fields, performing calculations,
and converting to other types. The class handles dates from year -999,999,999
to +999,999,999.

public final class LocalDateTime implements Temporal, TemporalAdjuster, 
    ChronoLocalDateTime&lt;LocalDate&gt;, Serializable {
    public static LocalDateTime now();
    public static LocalDateTime of(int year, int month, int dayOfMonth, 
        int hour, int minute);
    public static LocalDateTime parse(CharSequence text);
    public int getYear();
    public int getMonthValue();
    public int getDayOfMonth();
    public int getHour();
    public int getMinute();
    public LocalDateTime plusDays(long days);
    public LocalDateTime minusHours(long hours);
    public boolean isBefore(ChronoLocalDateTime&lt;?&gt; other);
    public boolean isAfter(ChronoLocalDateTime&lt;?&gt; other);
}

The code above shows key methods provided by LocalDateTime. These
methods allow creating, comparing, and manipulating date-time values. The class
provides precision up to nanoseconds while maintaining simple API.

## Creating LocalDateTime Objects

LocalDateTime objects can be created in several ways. The most common methods
are now for current time and factory methods for specific date-time.
Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.LocalDateTime;

public class Main {

    public static void main(String[] args) {
        
        // Current date-time
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Current date-time: " + now);
        
        // Specific date-time
        LocalDateTime specific = LocalDateTime.of(2025, 5, 15, 14, 30);
        System.out.println("Specific date-time: " + specific);
        
        // From string
        LocalDateTime parsed = LocalDateTime.parse("2025-01-01T12:00:00");
        System.out.println("Parsed from string: " + parsed);
        
        // Combining LocalDate and LocalTime
        LocalDateTime combined = LocalDateTime.of(
            java.time.LocalDate.now(), 
            java.time.LocalTime.of(18, 30)
        );
        System.out.println("Combined date-time: " + combined);
    }
}

This example demonstrates different ways to create LocalDateTime objects. The
output shows date-time in ISO-8601 format. The now method captures
the current moment with nanosecond precision where available.

## Getting Date and Time Components

A LocalDateTime can be decomposed into its date and time components. These values
represent year, month, day, hour, minute, etc. The methods are useful for
extracting specific parts of a date-time.

Main.java
  

package com.zetcode; 

import java.time.LocalDateTime;
import java.time.Month;

public class Main {

    public static void main(String[] args) {

        LocalDateTime dateTime = LocalDateTime.now();
        
        // Date components
        int year = dateTime.getYear();
        Month month = dateTime.getMonth();
        int day = dateTime.getDayOfMonth();
        
        System.out.println("Date: " + year + "-" + month.getValue() + "-" + day);
        
        // Time components
        int hour = dateTime.getHour();
        int minute = dateTime.getMinute();
        int second = dateTime.getSecond();
        int nano = dateTime.getNano();
        
        System.out.println("Time: " + hour + ":" + minute + ":" + second);
        System.out.println("Nanoseconds: " + nano);
        
        // Day of week
        System.out.println("Day of week: " + dateTime.getDayOfWeek());
    }
}

This example shows how to extract components from a LocalDateTime. Note that
month can be retrieved as either Month enum or numeric value. All components
are available through simple getter methods.

## Comparing LocalDateTime

LocalDateTime objects can be compared to determine chronological order. The class
provides isBefore, isAfter, and compareTo
methods. These comparisons are essential for date-time based logic.

Main.java
  

package com.zetcode; 

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime later = now.plus(1, ChronoUnit.HOURS);
        LocalDateTime earlier = now.minus(30, ChronoUnit.MINUTES);
        
        System.out.println("Now is before later: " + now.isBefore(later));
        System.out.println("Now is after earlier: " + now.isAfter(earlier));
        System.out.println("Comparison result: " + now.compareTo(later));
        
        // Equality check
        LocalDateTime copy = LocalDateTime.of(
            now.getYear(), now.getMonthValue(), now.getDayOfMonth(),
            now.getHour(), now.getMinute(), now.getSecond(), now.getNano()
        );
        System.out.println("Now equals copy: " + now.equals(copy));
    }
}

This example demonstrates various ways to compare LocalDateTime objects. The
comparison methods consider all date and time components. Note that equality
requires all components to match exactly.

## Adding and Subtracting Time

LocalDateTime supports temporal arithmetic through plus and
minus methods. These operations are useful for calculating future
or past date-times. The class handles overflow between fields automatically.

Main.java
  

package com.zetcode; 

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        LocalDateTime now = LocalDateTime.now();
        
        // Add days
        LocalDateTime inOneWeek = now.plusDays(7);
        System.out.println("In one week: " + inOneWeek);
        
        // Subtract hours
        LocalDateTime twoHoursAgo = now.minusHours(2);
        System.out.println("Two hours ago: " + twoHoursAgo);
        
        // Add using ChronoUnit
        LocalDateTime nextMonth = now.plus(1, ChronoUnit.MONTHS);
        System.out.println("Next month: " + nextMonth);
        
        // Mixed operations
        LocalDateTime complex = now.plusDays(2)
                                 .minusHours(3)
                                 .plusMinutes(15);
        System.out.println("Complex operation result: " + complex);
    }
}

This example shows various ways to perform temporal arithmetic with LocalDateTime.
Operations can use specific unit methods or ChronoUnit constants. All calculations
are precise to nanoseconds and handle field overflow automatically.

## Converting Between Time Types

LocalDateTime can be converted to and from other temporal types like Instant or
ZonedDateTime. These conversions are essential when working with time zones or
timestamps.

Main.java
  

package com.zetcode; 

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.Instant;

public class Main {

    public static void main(String[] args) {

        LocalDateTime now = LocalDateTime.now();
        
        // Convert to ZonedDateTime
        ZonedDateTime zoned = now.atZone(ZoneId.of("Europe/Paris"));
        System.out.println("In Paris: " + zoned);
        
        // Convert to Instant (requires time zone)
        Instant instant = now.atZone(ZoneId.systemDefault()).toInstant();
        System.out.println("As instant: " + instant);
        
        // Convert from Instant
        LocalDateTime fromInstant = LocalDateTime.ofInstant(
            Instant.now(), ZoneId.of("America/New_York"));
        System.out.println("From instant: " + fromInstant);
        
        // Convert to LocalDate or LocalTime
        System.out.println("Date part: " + now.toLocalDate());
        System.out.println("Time part: " + now.toLocalTime());
    }
}

This example demonstrates conversions between LocalDateTime and other temporal
types. Note that conversion to Instant requires specifying a time zone. All
conversions preserve the exact date and time being represented.

## Formatting and Parsing

LocalDateTime supports formatting and parsing through DateTimeFormatter. This
allows flexible conversion between strings and date-time objects.

Main.java
  

package com.zetcode; 

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        LocalDateTime now = LocalDateTime.now();
        
        // Default format
        System.out.println("Default format: " + now);
        
        // Custom format
        DateTimeFormatter custom = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        System.out.println("Custom format: " + now.format(custom));
        
        // Localized format
        DateTimeFormatter localized = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.MEDIUM)
            .withLocale(Locale.FRENCH);
        System.out.println("French format: " + now.format(localized));
        
        // Parsing from custom format
        LocalDateTime parsed = LocalDateTime.parse(
            "2025/12/31 23:59:59", 
            DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")
        );
        System.out.println("Parsed custom: " + parsed);
    }
}

This example shows how to format and parse LocalDateTime using various patterns.
The DateTimeFormatter provides both predefined and custom formatting options.
Localized formatting adapts to different cultural conventions.

## Source

[Java LocalDateTime Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html)

In this article, we've covered the essential methods and features of the Java
LocalDateTime class. Understanding these concepts is crucial for date-time
handling in Java applications without time zone requirements.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).