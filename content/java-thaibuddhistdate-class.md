+++
title = "Java ThaiBuddhistDate Class"
date = 2025-08-29T19:58:13.462+01:00
draft = false
description = "Complete Java ThaiBuddhistDate class tutorial covering all methods with examples. Learn about Thai Buddhist calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ThaiBuddhistDate Class

Last modified: April 16, 2025

 

The java.time.chrono.ThaiBuddhistDate class represents a date in
the Thai Buddhist calendar system. This calendar is 543 years ahead of the
Gregorian calendar. It's commonly used in Thailand.

ThaiBuddhistDate is immutable and thread-safe. It implements the
ChronoLocalDate interface. The class provides methods to handle
dates according to Thai Buddhist chronology.

## ThaiBuddhistDate Class Overview

ThaiBuddhistDate provides methods to create, manipulate and format
dates. Key operations include date arithmetic, field access, and conversion to
other calendar systems. The class handles dates from year 1 onwards.

public final class ThaiBuddhistDate implements ChronoLocalDate, Serializable {
    public static ThaiBuddhistDate now();
    public static ThaiBuddhistDate now(ZoneId zone);
    public static ThaiBuddhistDate of(int prolepticYear, int month, int dayOfMonth);
    public static ThaiBuddhistDate from(TemporalAccessor temporal);
    public int getEraValue();
    public ThaiBuddhistEra getEra();
    public int lengthOfMonth();
    public ThaiBuddhistDate plus(long amountToAdd, TemporalUnit unit);
    public ThaiBuddhistDate minus(long amountToSubtract, TemporalUnit unit);
}

The code above shows key methods provided by ThaiBuddhistDate.
These methods allow creating, manipulating and querying dates in the Thai
Buddhist calendar system.

## Creating ThaiBuddhistDate Objects

ThaiBuddhistDate objects can be created in several ways. The most common methods
are now for current date and factory methods for specific dates.
Conversion from other date types is also supported.

Main.java
  

package com.zetcode;

import java.time.chrono.ThaiBuddhistDate;
import java.time.LocalDate;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {
        
        // Current date
        ThaiBuddhistDate now = ThaiBuddhistDate.now();
        System.out.println("Current Thai date: " + now);
        
        // Specific date
        ThaiBuddhistDate date1 = ThaiBuddhistDate.of(2565, 4, 15);
        System.out.println("Specific Thai date: " + date1);
        
        // From LocalDate
        ThaiBuddhistDate date2 = ThaiBuddhistDate.from(LocalDate.of(2022, 4, 15));
        System.out.println("Converted from LocalDate: " + date2);
        
        // With time zone
        ThaiBuddhistDate date3 = ThaiBuddhistDate.now(ZoneId.of("Asia/Bangkok"));
        System.out.println("Current date in Bangkok: " + date3);
    }
}

This example demonstrates different ways to create ThaiBuddhistDate objects.
The output shows dates in Thai Buddhist chronology. Note the year difference
compared to Gregorian dates.

## Accessing Date Components

A ThaiBuddhistDate can be decomposed into its year, month, and day components.
These values follow the Thai Buddhist calendar system. The era can also be
accessed.

Main.java
  

package com.zetcode;

import java.time.chrono.ThaiBuddhistDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate date = ThaiBuddhistDate.now();
        
        // Get year (Buddhist era)
        int year = date.get(ChronoField.YEAR);
        System.out.println("Year: " + year);
        
        // Get month
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        System.out.println("Month: " + month);
        
        // Get day
        int day = date.get(ChronoField.DAY_OF_MONTH);
        System.out.println("Day: " + day);
        
        // Get era
        System.out.println("Era: " + date.getEra());
    }
}

This example shows how to extract components from a ThaiBuddhistDate. The year
is 543 years ahead of the Gregorian calendar. The month and day values match
the Gregorian calendar.

## Date Arithmetic

ThaiBuddhistDate supports date arithmetic through plus and
minus methods. These operations are useful for calculating future
or past dates. The class handles month and year boundaries correctly.

Main.java
  

package com.zetcode;

import java.time.chrono.ThaiBuddhistDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate date = ThaiBuddhistDate.of(2565, 4, 15);
        
        // Add days
        ThaiBuddhistDate plusDays = date.plus(10, ChronoUnit.DAYS);
        System.out.println("10 days later: " + plusDays);
        
        // Subtract months
        ThaiBuddhistDate minusMonths = date.minus(2, ChronoUnit.MONTHS);
        System.out.println("2 months earlier: " + minusMonths);
        
        // Add years
        ThaiBuddhistDate plusYears = date.plus(1, ChronoUnit.YEARS);
        System.out.println("1 year later: " + plusYears);
        
        // Complex operation
        ThaiBuddhistDate complex = date.plus(3, ChronoUnit.MONTHS)
                                     .minus(15, ChronoUnit.DAYS);
        System.out.println("Complex operation result: " + complex);
    }
}

This example shows various ways to perform date arithmetic with ThaiBuddhistDate.
Operations can use ChronoUnit constants for different time units. All calculations
respect the Thai Buddhist calendar rules.

## Comparing Dates

ThaiBuddhistDate objects can be compared to determine chronological order.
The class provides isAfter, isBefore, and
compareTo methods. These comparisons follow Thai Buddhist chronology.

Main.java
  

package com.zetcode;

import java.time.chrono.ThaiBuddhistDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate today = ThaiBuddhistDate.now();
        ThaiBuddhistDate tomorrow = today.plus(1, ChronoUnit.DAYS);
        ThaiBuddhistDate yesterday = today.minus(1, ChronoUnit.DAYS);
        
        System.out.println("Today is before tomorrow: " + today.isBefore(tomorrow));
        System.out.println("Today is after yesterday: " + today.isAfter(yesterday));
        System.out.println("Comparison result: " + today.compareTo(tomorrow));
        
        // Equality check
        ThaiBuddhistDate sameDate = ThaiBuddhistDate.of(
            today.get(ChronoField.YEAR),
            today.get(ChronoField.MONTH_OF_YEAR),
            today.get(ChronoField.DAY_OF_MONTH));
        System.out.println("Today equals sameDate: " + today.equals(sameDate));
    }
}

This example demonstrates various ways to compare ThaiBuddhistDate objects.
The comparison methods consider the full date including year, month and day.
Note that equality requires all components to match exactly.

## Converting Between Calendar Systems

ThaiBuddhistDate can be converted to and from other calendar systems like
Gregorian. These conversions are essential when working with multiple calendar
systems in an application.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.chrono.ThaiBuddhistDate;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate thaiDate = ThaiBuddhistDate.now();
        
        // Convert to LocalDate (Gregorian)
        LocalDate gregorianDate = LocalDate.from(thaiDate);
        System.out.println("Gregorian date: " + gregorianDate);
        
        // Convert back to ThaiBuddhistDate
        ThaiBuddhistDate backToThai = ThaiBuddhistDate.from(gregorianDate);
        System.out.println("Back to Thai: " + backToThai);
        
        // Formatting
        DateTimeFormatter formatter = DateTimeFormatter
            .ofPattern("dd MMM yyyy GG");
        System.out.println("Formatted: " + formatter.format(thaiDate));
    }
}

This example demonstrates conversions between ThaiBuddhistDate and Gregorian
dates. The formatter shows how to display dates with the Buddhist era marker.
All conversions preserve the same day in different calendar systems.

## Working with Date Fields

ThaiBuddhistDate provides methods to query various date fields. These include
day-of-week, day-of-year, and month length. The values follow Thai Buddhist
calendar rules.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.chrono.ThaiBuddhistDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate date = ThaiBuddhistDate.of(2565, 4, 15);
        
        // Day of week
        DayOfWeek dow = DayOfWeek.from(date);
        System.out.println("Day of week: " + dow);
        
        // Day of year
        int doy = date.get(ChronoField.DAY_OF_YEAR);
        System.out.println("Day of year: " + doy);
        
        // Month length
        int monthLength = date.lengthOfMonth();
        System.out.println("Days in month: " + monthLength);
        
        // Year length
        int yearLength = date.lengthOfYear();
        System.out.println("Days in year: " + yearLength);
        
        // Leap year
        System.out.println("Is leap year: " + date.isLeapYear());
    }
}

This example shows how to query various date fields from a ThaiBuddhistDate.
The day-of-week values match the ISO calendar. Month and year lengths follow
the same rules as the Gregorian calendar.

## Source

[Java ThaiBuddhistDate Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/ThaiBuddhistDate.html)

In this article, we've covered the essential methods and features of the Java
ThaiBuddhistDate class. Understanding these concepts is crucial for working
with Thai Buddhist calendar dates in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).