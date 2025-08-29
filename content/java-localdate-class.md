+++
title = "Java LocalDate Class"
date = 2025-08-29T20:00:48.961+01:00
draft = false
description = "Complete Java LocalDate class tutorial covering all methods with examples. Learn about date handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LocalDate Class

Last modified: April 16, 2025

 

The java.time.LocalDate class represents a date without time or
timezone in ISO-8601 format (yyyy-MM-dd). It is used to represent dates like
birthdays, holidays, or any date-specific information.

LocalDate is immutable and thread-safe. It provides methods to
get, manipulate, and calculate dates. The class handles dates from year
-999,999,999 to +999,999,999 with precision to the day.

## LocalDate Class Overview

LocalDate provides methods to create dates, parse strings, and
perform calculations. Key operations include date arithmetic, comparisons,
and field access. The class follows the ISO calendar system.

public final class LocalDate implements Temporal, TemporalAdjuster, 
    ChronoLocalDate, Serializable {
    public static LocalDate now();
    public static LocalDate of(int year, int month, int dayOfMonth);
    public static LocalDate parse(CharSequence text);
    public int getYear();
    public Month getMonth();
    public int getDayOfMonth();
    public DayOfWeek getDayOfWeek();
    public boolean isLeapYear();
    public boolean isAfter(ChronoLocalDate other);
    public boolean isBefore(ChronoLocalDate other);
    public LocalDate plusDays(long daysToAdd);
    public LocalDate minusMonths(long monthsToSubtract);
}

The code above shows key methods provided by LocalDate. These
methods allow creating, comparing, and manipulating dates. The class provides
various ways to access date components and perform calculations.

## Creating LocalDate Objects

LocalDate objects can be created in several ways. The most common methods are
now for current date and factory methods for specific dates.
Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.Month;

public class Main {

    public static void main(String[] args) {
        
        // Current date
        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);
        
        // Specific date
        LocalDate date1 = LocalDate.of(2025, 5, 15);
        System.out.println("Specific date: " + date1);
        
        // Using Month enum
        LocalDate date2 = LocalDate.of(2025, Month.JUNE, 20);
        System.out.println("Using Month enum: " + date2);
        
        // From string
        LocalDate parsed = LocalDate.parse("2025-07-04");
        System.out.println("Parsed from string: " + parsed);
    }
}

This example demonstrates different ways to create LocalDate objects. The output
shows dates in ISO-8601 format. The now method uses the system
clock and default time-zone.

## Getting Date Components

A LocalDate can be decomposed into its year, month, and day components. These
values can be accessed using various getter methods. The class provides both
numeric and enum-based access.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.Month;
import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {

        LocalDate date = LocalDate.of(2025, 8, 12);
        
        // Get year
        int year = date.getYear();
        System.out.println("Year: " + year);
        
        // Get month (enum)
        Month month = date.getMonth();
        System.out.println("Month: " + month);
        
        // Get day of month
        int day = date.getDayOfMonth();
        System.out.println("Day: " + day);
        
        // Get day of week
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        System.out.println("Day of week: " + dayOfWeek);
        
        // Check leap year
        boolean isLeap = date.isLeapYear();
        System.out.println("Is leap year: " + isLeap);
    }
}

This example shows how to extract components from a LocalDate. The Month and
DayOfWeek enums provide more readable alternatives to numeric values. The
leap year check is useful for date validation.

## Comparing Dates

LocalDate objects can be compared to determine chronological order. The class
provides isBefore, isAfter, and compareTo
methods. These comparisons are essential for date-based logic.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {

        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        LocalDate yesterday = today.minusDays(1);
        
        System.out.println("Today is before tomorrow: " + today.isBefore(tomorrow));
        System.out.println("Today is after yesterday: " + today.isAfter(yesterday));
        System.out.println("Comparison result: " + today.compareTo(tomorrow));
        
        // Equality check
        LocalDate sameDate = LocalDate.of(today.getYear(), today.getMonth(), today.getDayOfMonth());
        System.out.println("Today equals sameDate: " + today.equals(sameDate));
    }
}

This example demonstrates various ways to compare LocalDate objects. The
comparison methods consider all date components. Note that equality requires
all components to match exactly.

## Adding and Subtracting Time

LocalDate supports date arithmetic through plus and
minus methods. These operations are useful for calculating future
or past dates. The class handles month and year boundaries correctly.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        LocalDate date = LocalDate.of(2025, 1, 15);
        
        // Add days
        LocalDate nextWeek = date.plusDays(7);
        System.out.println("Next week: " + nextWeek);
        
        // Subtract months
        LocalDate lastMonth = date.minusMonths(1);
        System.out.println("Last month: " + lastMonth);
        
        // Add using Period
        LocalDate nextYear = date.plus(Period.ofYears(1));
        System.out.println("Next year: " + nextYear);
        
        // Add using ChronoUnit
        LocalDate decadeLater = date.plus(10, ChronoUnit.YEARS);
        System.out.println("Decade later: " + decadeLater);
    }
}

This example shows various ways to perform date arithmetic with LocalDate.
Operations can use specific units or Period objects. All calculations handle
month length variations and leap years automatically.

## Calculating Date Differences

LocalDate can be used with Period to calculate differences between dates.
This is useful for determining age, durations, or time spans between events.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        LocalDate birthDate = LocalDate.of(1990, 5, 15);
        LocalDate today = LocalDate.now();
        
        // Calculate period between dates
        Period age = Period.between(birthDate, today);
        System.out.printf("Age: %d years, %d months, %d days%n",
            age.getYears(), age.getMonths(), age.getDays());
        
        // Calculate total days between dates
        long totalDays = ChronoUnit.DAYS.between(birthDate, today);
        System.out.println("Total days: " + totalDays);
        
        // Calculate months between dates
        long totalMonths = ChronoUnit.MONTHS.between(birthDate, today);
        System.out.println("Total months: " + totalMonths);
    }
}

This example demonstrates calculating differences between dates. Period provides
human-readable components, while ChronoUnit gives precise totals in specific
units. Both approaches are useful for different scenarios.

## Date Adjustments

LocalDate supports date adjustments using with methods and
TemporalAdjusters. These allow setting specific date fields or finding
relative dates like first/last day of month.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

public class Main {

    public static void main(String[] args) {

        LocalDate date = LocalDate.of(2025, 8, 15);
        
        // Set specific field
        LocalDate yearChanged = date.withYear(2030);
        System.out.println("Year changed: " + yearChanged);
        
        // First day of month
        LocalDate firstDay = date.with(TemporalAdjusters.firstDayOfMonth());
        System.out.println("First day of month: " + firstDay);
        
        // Last day of year
        LocalDate lastDay = date.with(TemporalAdjusters.lastDayOfYear());
        System.out.println("Last day of year: " + lastDay);
        
        // Next Monday
        LocalDate nextMonday = date.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        System.out.println("Next Monday: " + nextMonday);
    }
}

This example shows various date adjustment operations. TemporalAdjusters provide
common operations for working with dates. The with methods allow
precise control over date fields.

## Source

[Java LocalDate Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)

In this article, we've covered the essential methods and features of the Java
LocalDate class. Understanding these concepts is crucial for accurate date
handling in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).