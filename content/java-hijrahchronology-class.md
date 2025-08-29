+++
title = "Java HijrahChronology Class"
date = 2025-08-29T19:58:10.113+01:00
draft = false
description = "Complete Java HijrahChronology class tutorial covering all methods with examples. Learn about Islamic calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HijrahChronology Class

Last modified: April 16, 2025

 

The java.time.chrono.HijrahChronology class implements the Hijrah
(Islamic) calendar system. It is one of the chronology implementations in the
Java Date and Time API. The Hijrah calendar is a lunar calendar used in many
Muslim countries.

HijrahChronology is immutable and thread-safe. It provides methods
to create dates, perform calculations, and convert between Hijrah and other
calendar systems. The class supports different variants of the Islamic calendar.

## HijrahChronology Class Overview

HijrahChronology extends AbstractChronology and
implements the Islamic calendar rules. Key features include date creation,
conversion to/from ISO dates, and calendar-specific calculations. The class
handles the lunar nature of the Hijrah calendar.

public final class HijrahChronology extends AbstractChronology implements Serializable {
    public static HijrahChronology INSTANCE;
    public static HijrahDate now();
    public static HijrahDate now(Clock clock);
    public static HijrahDate now(ZoneId zone);
    public HijrahDate date(int prolepticYear, int month, int dayOfMonth);
    public HijrahDate dateEpochDay(long epochDay);
    public HijrahDate dateYearDay(int prolepticYear, int dayOfYear);
    public HijrahDate date(TemporalAccessor temporal);
    public long epochSecond(int year, int month, int dayOfMonth, 
        int hour, int minute, int second, ZoneOffset zoneOffset);
}

The code above shows key methods provided by HijrahChronology.
These methods allow creating Hijrah dates from various components and converting
between calendar systems. The class follows the standard chronology interface.

## Creating Hijrah Dates

Hijrah dates can be created using factory methods of HijrahChronology.
The class provides several ways to construct dates from year/month/day components
or from other temporal objects.

Main.java
  

package com.zetcode; 

import java.time.chrono.HijrahDate;
import java.time.chrono.HijrahChronology;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Current Hijrah date
        HijrahDate today = HijrahChronology.INSTANCE.dateNow();
        System.out.println("Today in Hijrah: " + today);
        
        // From year, month, day
        HijrahDate date1 = HijrahChronology.INSTANCE.date(1445, 9, 1);
        System.out.println("Specific date: " + date1);
        
        // From ISO date
        HijrahDate date2 = HijrahChronology.INSTANCE.date(LocalDate.of(2025, 4, 16));
        System.out.println("From ISO date: " + date2);
        
        // From epoch day
        HijrahDate date3 = HijrahChronology.INSTANCE.dateEpochDay(20000);
        System.out.println("From epoch day: " + date3);
    }
}

This example demonstrates different ways to create HijrahDate objects. The output
shows dates in the Hijrah calendar system. Note that month numbers start from 1
(Muharram) to 12 (Dhu al-Hijjah).

## Converting Between Calendars

HijrahChronology provides methods to convert between Hijrah and ISO
dates. These conversions are essential when working with multiple calendar
systems in an application.

Main.java
  

package com.zetcode; 

import java.time.chrono.HijrahDate;
import java.time.chrono.HijrahChronology;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Convert from Hijrah to ISO
        HijrahDate hijrahDate = HijrahChronology.INSTANCE.date(1445, 9, 1);
        LocalDate isoDate = LocalDate.from(hijrahDate);
        System.out.println("Hijrah to ISO: " + isoDate);
        
        // Convert from ISO to Hijrah
        LocalDate todayIso = LocalDate.now();
        HijrahDate todayHijrah = HijrahChronology.INSTANCE.date(todayIso);
        System.out.println("ISO to Hijrah: " + todayHijrah);
        
        // Using epoch day conversion
        long epochDay = hijrahDate.toEpochDay();
        System.out.println("Epoch day: " + epochDay);
        HijrahDate fromEpoch = HijrahChronology.INSTANCE.dateEpochDay(epochDay);
        System.out.println("From epoch day: " + fromEpoch);
    }
}

This example shows bidirectional conversion between Hijrah and ISO dates. The
toEpochDay method provides a common numerical representation that
can be used for calculations or storage. Conversions maintain the same point in
time across calendar systems.

## Working with Hijrah Date Fields

HijrahDate provides access to calendar-specific fields like year, month, and day.
These fields follow the Islamic calendar system and can be accessed or modified.

Main.java
  

package com.zetcode; 

import java.time.chrono.HijrahDate;
import java.time.chrono.HijrahChronology;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        HijrahDate date = HijrahChronology.INSTANCE.dateNow();
        
        // Get individual fields
        int year = date.get(ChronoField.YEAR);
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        int day = date.get(ChronoField.DAY_OF_MONTH);
        
        System.out.printf("Current Hijrah date: %04d-%02d-%02d%n", year, month, day);
        
        // Get day of year
        int dayOfYear = date.get(ChronoField.DAY_OF_YEAR);
        System.out.println("Day of year: " + dayOfYear);
        
        // Get era (always AH - After Hijra)
        System.out.println("Era: " + date.getEra());
    }
}

This example demonstrates accessing various fields of a HijrahDate. The
ChronoField constants provide access to standard date components.
Note that the era is always AH (After Hijra) in the Hijrah calendar system.

## Date Arithmetic with Hijrah Dates

HijrahDate supports temporal arithmetic through plus and
minus methods. These operations account for the lunar nature of
the Hijrah calendar, with months having 29 or 30 days.

Main.java
  

package com.zetcode; 

import java.time.chrono.HijrahDate;
import java.time.chrono.HijrahChronology;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        HijrahDate date = HijrahChronology.INSTANCE.date(1445, 1, 1);
        System.out.println("Start date: " + date);
        
        // Add days
        HijrahDate plusDays = date.plus(10, ChronoUnit.DAYS);
        System.out.println("Plus 10 days: " + plusDays);
        
        // Add months (lunar months)
        HijrahDate plusMonths = date.plus(2, ChronoUnit.MONTHS);
        System.out.println("Plus 2 months: " + plusMonths);
        
        // Add years
        HijrahDate plusYears = date.plus(1, ChronoUnit.YEARS);
        System.out.println("Plus 1 year: " + plusYears);
        
        // Subtract weeks
        HijrahDate minusWeeks = date.minus(3, ChronoUnit.WEEKS);
        System.out.println("Minus 3 weeks: " + minusWeeks);
    }
}

This example shows various temporal arithmetic operations with HijrahDate. Note
that adding months accounts for the varying length of lunar months. All
operations return new instances as HijrahDate is immutable.

## Comparing Hijrah Dates

HijrahDate implements Comparable and provides methods to compare
dates chronologically. These comparisons are essential for date-based logic in
applications using the Islamic calendar.

Main.java
  

package com.zetcode; 

import java.time.chrono.HijrahDate;
import java.time.chrono.HijrahChronology;

public class Main {

    public static void main(String[] args) {
        
        HijrahDate date1 = HijrahChronology.INSTANCE.date(1445, 1, 1);
        HijrahDate date2 = HijrahChronology.INSTANCE.date(1445, 2, 15);
        HijrahDate date3 = HijrahChronology.INSTANCE.date(1446, 1, 1);
        
        // Compare dates
        System.out.println("date1 before date2: " + date1.isBefore(date2));
        System.out.println("date2 after date1: " + date2.isAfter(date1));
        System.out.println("date1 compareTo date3: " + date1.compareTo(date3));
        
        // Equality check
        HijrahDate date1Copy = HijrahChronology.INSTANCE.date(1445, 1, 1);
        System.out.println("date1 equals copy: " + date1.equals(date1Copy));
    }
}

This example demonstrates various ways to compare HijrahDate objects. The
comparison methods consider the complete date including year, month, and day.
Note that equality requires all components to match exactly.

## Customizing Hijrah Calendar Variants

The Hijrah calendar has different variants based on regional observations.
Java allows loading custom calendar variants through configuration files.

Main.java
  

package com.zetcode; 

import java.time.chrono.HijrahDate;
import java.time.chrono.HijrahChronology;
import java.time.chrono.HijrahEra;
import java.util.Properties;

public class Main {

    public static void main(String[] args) {
        
        // Normally you would load from hijrah-config.properties file
        Properties props = new Properties();
        props.setProperty("id", "custom");
        props.setProperty("type", "islamic-umalqura");
        props.setProperty("version", "2.0");
        
        // In real usage, this would be configured before first use
        System.out.println("Custom calendar configuration:");
        props.forEach((k, v) -&gt; System.out.println(k + ": " + v));
        
        // Using the default INSTANCE (which may be configured)
        HijrahDate date = HijrahChronology.INSTANCE.date(HijrahEra.AH, 1445, 9, 1);
        System.out.println("Date using current configuration: " + date);
    }
}

This example demonstrates the concept of custom Hijrah calendar variants. In
practice, you would create a hijrah-config.properties file. The
configuration affects all HijrahDate instances created after configuration.

## Source

[Java HijrahChronology Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/HijrahChronology.html)

In this article, we've covered the essential methods and features of the Java
HijrahChronology class. Understanding these concepts is crucial for working
with Islamic dates in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).