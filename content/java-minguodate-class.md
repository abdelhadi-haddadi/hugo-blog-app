+++
title = "Java MinguoDate Class"
date = 2025-08-29T19:58:13.466+01:00
draft = false
description = "Complete Java MinguoDate class tutorial covering all methods with examples. Learn about Minguo calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MinguoDate Class

Last modified: April 16, 2025

 

The java.time.chrono.MinguoDate class represents a date in the
Minguo calendar system. This calendar is primarily used in Taiwan, where
years are counted from 1912 (the founding of the Republic of China).

MinguoDate is immutable and thread-safe. It follows the same
design principles as other Java time classes. The Minguo calendar is a
solar calendar with the same month structure as the Gregorian calendar.

## MinguoDate Class Overview

MinguoDate provides methods to create, manipulate, and format
dates in the Minguo system. Key operations include date arithmetic, field
access, and conversion to other calendar systems. The class handles dates
from year 1 onwards.

public final class MinguoDate implements ChronoLocalDate, Serializable {
    public static MinguoDate now();
    public static MinguoDate now(ZoneId zone);
    public static MinguoDate now(Clock clock);
    public static MinguoDate of(int prolepticYear, int month, int dayOfMonth);
    public static MinguoDate from(TemporalAccessor temporal);
    public static MinguoDate parse(CharSequence text);
    public int getChronology();
    public int getEra();
    public int getYear();
    public int getMonthValue();
    public int getDayOfMonth();
}

The code above shows key methods provided by MinguoDate. These
methods allow creating, accessing fields, and converting between calendar
systems. The class integrates with Java's standard date-time API.

## Creating MinguoDate Objects

MinguoDate objects can be created in several ways. The most common methods
are now for current date and factory methods for specific dates.
Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {
        
        // Current date
        MinguoDate today = MinguoDate.now();
        System.out.println("Today in Minguo: " + today);
        
        // Specific date
        MinguoDate founding = MinguoDate.of(1, 1, 1);
        System.out.println("Republic founding: " + founding);
        
        // From system clock with zone
        MinguoDate nowInTokyo = MinguoDate.now(ZoneId.of("Asia/Tokyo"));
        System.out.println("Now in Tokyo: " + nowInTokyo);
        
        // From string
        MinguoDate parsed = MinguoDate.parse("Minguo 112-04-16");
        System.out.println("Parsed date: " + parsed);
    }
}

This example demonstrates different ways to create MinguoDate objects. The
output shows dates in Minguo calendar format. Note that year 1 in Minguo
corresponds to 1912 in Gregorian calendar.

## Accessing Date Components

A MinguoDate can be decomposed into its year, month, and day components.
These values represent the date in the Minguo calendar system. The methods
are similar to other Java date classes.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.chrono.MinguoEra;

public class Main {

    public static void main(String[] args) {

        MinguoDate date = MinguoDate.now();
        
        // Get year (Minguo era)
        int year = date.getYear();
        System.out.println("Minguo year: " + year);
        
        // Get month (1-12)
        int month = date.getMonthValue();
        System.out.println("Month: " + month);
        
        // Get day of month
        int day = date.getDayOfMonth();
        System.out.println("Day: " + day);
        
        // Get era (BEFORE_ROC or ROC)
        MinguoEra era = date.getEra();
        System.out.println("Era: " + era);
    }
}

This example shows how to extract components from a MinguoDate. The era
can be either ROC (Republic of China) or BEFORE_ROC. Most dates will be
in the ROC era starting from year 1.

## Converting Between Calendars

MinguoDate can be converted to and from other calendar systems like
Gregorian. These conversions are essential when working with multiple
calendar systems in an application.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.chrono.MinguoDate;

public class Main {

    public static void main(String[] args) {

        MinguoDate minguoToday = MinguoDate.now();
        
        // Convert to LocalDate (Gregorian)
        LocalDate gregorianDate = LocalDate.from(minguoToday);
        System.out.println("Gregorian date: " + gregorianDate);
        
        // Convert back to MinguoDate
        MinguoDate backToMinguo = MinguoDate.from(gregorianDate);
        System.out.println("Back to Minguo: " + backToMinguo);
        
        // Specific conversion example
        MinguoDate minguoNewYear = MinguoDate.of(112, 1, 1);
        LocalDate gregorianNewYear = LocalDate.from(minguoNewYear);
        System.out.println("Minguo 112 New Year: " + gregorianNewYear);
    }
}

This example demonstrates conversions between MinguoDate and Gregorian
calendar dates. The conversion preserves the same absolute date while
changing the calendar system representation.

## Date Arithmetic

MinguoDate supports date arithmetic through plus and
minus methods. These operations are useful for calculating
future or past dates. The class handles month and year boundaries correctly.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        MinguoDate today = MinguoDate.now();
        
        // Add 1 week
        MinguoDate nextWeek = today.plus(1, ChronoUnit.WEEKS);
        System.out.println("Next week: " + nextWeek);
        
        // Subtract 3 months
        MinguoDate threeMonthsAgo = today.minus(3, ChronoUnit.MONTHS);
        System.out.println("Three months ago: " + threeMonthsAgo);
        
        // Add 2 years
        MinguoDate inTwoYears = today.plus(2, ChronoUnit.YEARS);
        System.out.println("In two years: " + inTwoYears);
        
        // Mixed operations
        MinguoDate complex = today.plus(1, ChronoUnit.MONTHS)
                                .minus(10, ChronoUnit.DAYS);
        System.out.println("Complex operation result: " + complex);
    }
}

This example shows various ways to perform date arithmetic with MinguoDate.
Operations can use ChronoUnit constants for different time units. All
calculations respect the calendar rules.

## Comparing Dates

MinguoDate objects can be compared to determine chronological order. The
class provides isBefore, isAfter, and
compareTo methods. These comparisons work the same as other
Java date classes.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        MinguoDate today = MinguoDate.now();
        MinguoDate tomorrow = today.plus(1, ChronoUnit.DAYS);
        MinguoDate yesterday = today.minus(1, ChronoUnit.DAYS);
        
        System.out.println("Today is before tomorrow: " + today.isBefore(tomorrow));
        System.out.println("Today is after yesterday: " + today.isAfter(yesterday));
        System.out.println("Comparison result: " + today.compareTo(tomorrow));
        
        // Equality check
        MinguoDate sameDate = MinguoDate.of(today.getYear(), 
            today.getMonthValue(), today.getDayOfMonth());
        System.out.println("Today equals sameDate: " + today.equals(sameDate));
    }
}

This example demonstrates various ways to compare MinguoDate objects. The
comparison methods consider the complete date value. Note that equality
requires all date components to match exactly.

## Formatting Minguo Dates

MinguoDate can be formatted using DateTimeFormatter. Special pattern
letters are available for Minguo-specific fields like era and year.
Formatting follows the same principles as other Java date classes.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        MinguoDate date = MinguoDate.now();
        
        // Default format
        String defaultFormat = date.toString();
        System.out.println("Default format: " + defaultFormat);
        
        // Custom format
        DateTimeFormatter formatter = DateTimeFormatter
            .ofPattern("GGGG y年M月d日", Locale.TAIWAN);
        String customFormat = date.format(formatter);
        System.out.println("Custom format: " + customFormat);
        
        // Alternative format
        DateTimeFormatter altFormatter = DateTimeFormatter
            .ofPattern("'民國' y年 MM月 dd日");
        String altFormat = date.format(altFormatter);
        System.out.println("Alternative format: " + altFormat);
        
        // ISO format
        String isoFormat = date.format(DateTimeFormatter.ISO_DATE);
        System.out.println("ISO format: " + isoFormat);
    }
}

This example shows different ways to format MinguoDate objects. The
formatters can use locale-specific patterns and text. Special pattern
letters handle Minguo calendar specifics.

## Source

[Java MinguoDate Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/MinguoDate.html)

In this article, we've covered the essential methods and features of the Java
MinguoDate class. Understanding these concepts is crucial for working with
dates in Taiwan's official calendar system.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).