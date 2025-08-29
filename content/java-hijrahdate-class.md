+++
title = "Java HijrahDate Class"
date = 2025-08-29T19:58:11.228+01:00
draft = false
description = "Complete Java HijrahDate class tutorial covering all methods with examples. Learn about Islamic calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HijrahDate Class

Last modified: April 16, 2025

 

The java.time.chrono.HijrahDate class represents dates in the Islamic
Hijri calendar system. This calendar is used in many Muslim countries for
religious purposes. It is a lunar calendar with 12 months in a year.

HijrahDate is immutable and thread-safe. It implements the
ChronoLocalDate interface. The class supports conversion to and from
ISO dates. The Hijri calendar has years that are about 11 days shorter than
Gregorian years.

## HijrahDate Class Overview

HijrahDate provides methods to create, manipulate, and format
Islamic dates. It supports date arithmetic and comparison operations. The class
uses the Umm al-Qura variant of the Hijri calendar by default.

public final class HijrahDate implements ChronoLocalDate, Serializable {
    public static HijrahDate now();
    public static HijrahDate of(int prolepticYear, int month, int dayOfMonth);
    public static HijrahDate from(TemporalAccessor temporal);
    public static HijrahDate now(ZoneId zone);
    public int lengthOfMonth();
    public int lengthOfYear();
    public HijrahDate plus(long amountToAdd, TemporalUnit unit);
    public HijrahDate minus(long amountToSubtract, TemporalUnit unit);
    public long until(Temporal endExclusive, TemporalUnit unit);
}

The code above shows key methods of HijrahDate. These methods allow
creating, comparing, and manipulating Islamic dates. The class provides
conversion between Hijri and other calendar systems.

## Creating HijrahDate Objects

HijrahDate objects can be created in several ways. The most common methods are
now for current date and factory methods for specific dates.
Conversion from other date types is also supported.

Main.java
  

package com.zetcode;

import java.time.chrono.HijrahDate;
import java.time.LocalDate;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {
        
        // Current Hijri date
        HijrahDate now = HijrahDate.now();
        System.out.println("Current Hijri date: " + now);
        
        // Specific Hijri date
        HijrahDate date1 = HijrahDate.of(1445, 9, 1);
        System.out.println("Specific Hijri date: " + date1);
        
        // From LocalDate
        HijrahDate date2 = HijrahDate.from(LocalDate.now());
        System.out.println("From LocalDate: " + date2);
        
        // With timezone
        HijrahDate date3 = HijrahDate.now(ZoneId.of("Asia/Riyadh"));
        System.out.println("With timezone: " + date3);
    }
}

This example demonstrates different ways to create HijrahDate objects. The output
shows dates in ISO-like format with the Hijrah era. The now method
uses the system default time zone.

## Getting Date Components

A HijrahDate can be decomposed into its year, month, and day components. These
values represent the Islamic date. The methods are useful for displaying dates
in custom formats.

Main.java
  

package com.zetcode;

import java.time.chrono.HijrahDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {

        HijrahDate hijrahDate = HijrahDate.now();
        
        // Get year
        int year = hijrahDate.get(ChronoField.YEAR);
        System.out.println("Hijri year: " + year);
        
        // Get month
        int month = hijrahDate.get(ChronoField.MONTH_OF_YEAR);
        System.out.println("Hijri month: " + month);
        
        // Get day
        int day = hijrahDate.get(ChronoField.DAY_OF_MONTH);
        System.out.println("Hijri day: " + day);
        
        // Get era
        String era = hijrahDate.getEra().toString();
        System.out.println("Era: " + era);
    }
}

This example shows how to extract components from a HijrahDate. The
ChronoField constants are used to access date parts. The era is
always AH (Anno Hegirae) in the Hijri calendar.

## Comparing HijrahDates

HijrahDates can be compared to determine chronological order. The class provides
isBefore, isAfter, and compareTo methods.
These comparisons work the same as with other date types.

Main.java
  

package com.zetcode;

import java.time.chrono.HijrahDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        HijrahDate today = HijrahDate.now();
        HijrahDate tomorrow = today.plus(1, ChronoUnit.DAYS);
        HijrahDate yesterday = today.minus(1, ChronoUnit.DAYS);
        
        System.out.println("Today is before tomorrow: " + today.isBefore(tomorrow));
        System.out.println("Today is after yesterday: " + today.isAfter(yesterday));
        System.out.println("Comparison result: " + today.compareTo(tomorrow));
        
        // Equality check
        HijrahDate sameDate = HijrahDate.of(today.get(ChronoField.YEAR),
                                         today.get(ChronoField.MONTH_OF_YEAR),
                                         today.get(ChronoField.DAY_OF_MONTH));
        System.out.println("Today equals sameDate: " + today.equals(sameDate));
    }
}

This example demonstrates various ways to compare HijrahDate objects. The
comparison methods consider the complete date. Note that equality requires all
date components to match exactly.

## Adding and Subtracting Time

HijrahDate supports temporal arithmetic through plus and
minus methods. These operations account for the variable month
lengths in the Islamic calendar. The class handles month and year boundaries.

Main.java
  

package com.zetcode;

import java.time.chrono.HijrahDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        HijrahDate today = HijrahDate.now();
        
        // Add days
        HijrahDate in10Days = today.plus(10, ChronoUnit.DAYS);
        System.out.println("In 10 days: " + in10Days);
        
        // Add months
        HijrahDate in2Months = today.plus(2, ChronoUnit.MONTHS);
        System.out.println("In 2 months: " + in2Months);
        
        // Add years
        HijrahDate nextYear = today.plus(1, ChronoUnit.YEARS);
        System.out.println("Next year: " + nextYear);
        
        // Subtract weeks
        HijrahDate twoWeeksAgo = today.minus(2, ChronoUnit.WEEKS);
        System.out.println("Two weeks ago: " + twoWeeksAgo);
    }
}

This example shows various ways to perform date arithmetic with HijrahDate.
Operations account for the Islamic calendar's characteristics. Month lengths vary
between 29 and 30 days in the Hijri calendar.

## Converting Between Calendar Systems

HijrahDate can be converted to and from other calendar systems like Gregorian.
These conversions are essential when working with multiple calendar systems.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.chrono.HijrahDate;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        HijrahDate hijrahDate = HijrahDate.now();
        
        // Convert to LocalDate
        LocalDate gregorianDate = LocalDate.from(hijrahDate);
        System.out.println("Gregorian date: " + gregorianDate);
        
        // Convert back to HijrahDate
        HijrahDate backToHijri = HijrahDate.from(gregorianDate);
        System.out.println("Back to Hijri: " + backToHijri);
        
        // Formatting
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy G");
        String formatted = hijrahDate.format(formatter);
        System.out.println("Formatted: " + formatted);
    }
}

This example demonstrates conversions between HijrahDate and LocalDate. The
formatting example shows how to display the date in a custom pattern. All
conversions maintain the same point in time.

## Working with Month Lengths

The Hijri calendar has months with varying lengths. The lengthOfMonth
and lengthOfYear methods help work with these variations.

Main.java
  

package com.zetcode;

import java.time.chrono.HijrahDate;

public class Main {

    public static void main(String[] args) {

        HijrahDate date1 = HijrahDate.of(1445, 1, 1);
        System.out.println("Month length for 1445-1: " + date1.lengthOfMonth());
        
        HijrahDate date2 = HijrahDate.of(1445, 2, 1);
        System.out.println("Month length for 1445-2: " + date2.lengthOfMonth());
        
        HijrahDate date3 = HijrahDate.of(1445, 12, 1);
        System.out.println("Month length for 1445-12: " + date3.lengthOfMonth());
        
        System.out.println("Year length for 1445: " + date1.lengthOfYear());
        
        // Check if year is leap (Hijri calendar doesn't have leap years)
        System.out.println("Is leap year: " + date1.isLeapYear());
    }
}

This example shows how to work with month and year lengths in the Hijri calendar.
Unlike the Gregorian calendar, the Islamic calendar doesn't have leap years.
Month lengths are determined by lunar cycles.

## Source

[Java HijrahDate Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/HijrahDate.html)

In this article, we've covered the essential methods and features of the Java
HijrahDate class. Understanding these concepts is crucial for working with
Islamic dates in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).