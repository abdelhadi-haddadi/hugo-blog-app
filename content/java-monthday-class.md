+++
title = "Java MonthDay Class"
date = 2025-08-29T20:00:51.190+01:00
draft = false
description = "Complete Java MonthDay class tutorial covering all methods with examples. Learn about month-day handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MonthDay Class

Last modified: April 16, 2025

 

The java.time.MonthDay class represents a combination of month and
day without year or time. It is useful for representing recurring annual dates
like birthdays or holidays. MonthDay handles month and day values independently
of any year.

MonthDay is immutable and thread-safe. It validates day values
according to the month, accounting for leap years when necessary. The class
follows the ISO-8601 calendar system and provides methods for comparison,
formatting, and parsing.

## MonthDay Class Overview

MonthDay provides methods to create, parse, and manipulate month-day
combinations. Key operations include checking validity, comparing dates, and
combining with years. The class handles month lengths correctly including
February in leap years.

public final class MonthDay implements TemporalAccessor, TemporalAdjuster, 
    Comparable&lt;MonthDay&gt;, Serializable {
    public static MonthDay now();
    public static MonthDay now(ZoneId zone);
    public static MonthDay of(int month, int dayOfMonth);
    public static MonthDay of(Month month, int dayOfMonth);
    public static MonthDay parse(CharSequence text);
    public int getMonthValue();
    public Month getMonth();
    public int getDayOfMonth();
    public boolean isValidYear(int year);
    public boolean isAfter(MonthDay other);
    public boolean isBefore(MonthDay other);
    public String format(DateTimeFormatter formatter);
}

The code above shows key methods provided by MonthDay. These methods
allow creating, comparing, and formatting month-day combinations. The class
ensures day values are valid for their respective months.

## Creating MonthDay Objects

MonthDay objects can be created in several ways. The most common methods are
now for current month-day and factory methods for specific
combinations. Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.Month;
import java.time.MonthDay;

public class Main {

    public static void main(String[] args) {
        
        // Current month-day
        MonthDay current = MonthDay.now();
        System.out.println("Current month-day: " + current);
        
        // From month number and day
        MonthDay md1 = MonthDay.of(12, 25);
        System.out.println("Christmas: " + md1);
        
        // From Month enum and day
        MonthDay md2 = MonthDay.of(Month.FEBRUARY, 29);
        System.out.println("Leap day: " + md2);
        
        // From string
        MonthDay parsed = MonthDay.parse("--04-01");
        System.out.println("Parsed from string: " + parsed);
    }
}

This example demonstrates different ways to create MonthDay objects. The output
shows month-day combinations in ISO-8601 format (--MM-DD). Note that February 29
is valid even when created without a specific year context.

## Getting MonthDay Components

A MonthDay can be decomposed into its month and day components. The month can be
retrieved as either a numeric value or Month enum. These values are useful for
display or further calculations.

Main.java
  

package com.zetcode; 

import java.time.Month;
import java.time.MonthDay;

public class Main {

    public static void main(String[] args) {

        MonthDay monthDay = MonthDay.of(Month.NOVEMBER, 11);
        
        // Get month as number
        int monthValue = monthDay.getMonthValue();
        System.out.println("Month number: " + monthValue);
        
        // Get month as enum
        Month month = monthDay.getMonth();
        System.out.println("Month: " + month);
        
        // Get day of month
        int day = monthDay.getDayOfMonth();
        System.out.println("Day: " + day);
        
        // Check validity for a specific year
        boolean isValid2023 = monthDay.isValidYear(2023);
        System.out.println("Valid for 2023: " + isValid2023);
    }
}

This example shows how to extract components from a MonthDay. The
isValidYear method checks if the day exists in the specified year,
important for February 29th. All getter methods return immutable values.

## Comparing MonthDays

MonthDays can be compared to determine chronological order within a year. The
class provides isBefore, isAfter, and
compareTo methods. These comparisons are useful for sorting or
finding date ranges.

Main.java
  

package com.zetcode; 

import java.time.MonthDay;

public class Main {

    public static void main(String[] args) {

        MonthDay christmas = MonthDay.of(12, 25);
        MonthDay newYearsEve = MonthDay.of(12, 31);
        MonthDay independenceDay = MonthDay.of(7, 4);
        
        System.out.println("Christmas before New Year's Eve: " + 
            christmas.isBefore(newYearsEve));
        System.out.println("Independence Day after Christmas: " + 
            independenceDay.isAfter(christmas));
        System.out.println("Comparison result: " + 
            christmas.compareTo(independenceDay));
        
        // Equality check
        MonthDay anotherChristmas = MonthDay.parse("--12-25");
        System.out.println("Christmas equals: " + 
            christmas.equals(anotherChristmas));
    }
}

This example demonstrates various ways to compare MonthDay objects. The
comparison methods consider both month and day components. Note that equality
requires both month and day to match exactly.

## Combining with Year

MonthDay can be combined with a year to create a LocalDate. This is useful when
you need to work with a specific occurrence of an annual date. The class handles
leap years correctly when combining.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.MonthDay;
import java.time.Year;

public class Main {

    public static void main(String[] args) {

        MonthDay feb29 = MonthDay.of(2, 29);
        
        // Combine with specific year
        LocalDate leapDate = feb29.atYear(2020);
        System.out.println("Leap year date: " + leapDate);
        
        // Try non-leap year
        try {
            LocalDate invalidDate = feb29.atYear(2023);
            System.out.println("Non-leap year date: " + invalidDate);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Using Year class
        LocalDate date2024 = feb29.atYear(Year.of(2024).getValue());
        System.out.println("Next leap year: " + date2024);
    }
}

This example shows how to combine MonthDay with years to create LocalDate
objects. The atYear method throws an exception for invalid
combinations like February 29 in non-leap years. Always validate when working
with leap days.

## Formatting and Parsing

MonthDay supports formatting and parsing through DateTimeFormatter. This allows
custom display formats and parsing of various string representations. The ISO-8601
format is --MM-DD.

Main.java
  

package com.zetcode; 

import java.time.MonthDay;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        MonthDay monthDay = MonthDay.of(10, 31);
        
        // Default format
        String isoFormat = monthDay.toString();
        System.out.println("ISO format: " + isoFormat);
        
        // Custom format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd", Locale.US);
        String customFormat = monthDay.format(formatter);
        System.out.println("Custom format: " + customFormat);
        
        // Parse custom format
        MonthDay parsed = MonthDay.parse("Nov 11", 
            DateTimeFormatter.ofPattern("MMM dd", Locale.US));
        System.out.println("Parsed from custom format: " + parsed);
        
        // Parse with different pattern
        MonthDay parsed2 = MonthDay.parse("01/15", 
            DateTimeFormatter.ofPattern("MM/dd"));
        System.out.println("Parsed with slash: " + parsed2);
    }
}

This example demonstrates formatting and parsing MonthDay objects. The
format method creates formatted strings, while parse
can handle various input formats. Always specify Locale for locale-sensitive
patterns.

## Validating Dates

MonthDay automatically validates day values against their months. Additional
validation can check if a MonthDay is valid for a specific year. This is
particularly important for February 29th.

Main.java
  

package com.zetcode; 

import java.time.MonthDay;

public class Main {

    public static void main(String[] args) {

        MonthDay feb29 = MonthDay.of(2, 29);
        
        // Check validity for various years
        System.out.println("Valid in 2020 (leap year): " + feb29.isValidYear(2020));
        System.out.println("Valid in 2023: " + feb29.isValidYear(2023));
        System.out.println("Valid in 2024: " + feb29.isValidYear(2024));
        
        // Try creating invalid month-day
        try {
            MonthDay invalid = MonthDay.of(4, 31);
            System.out.println("Created invalid month-day: " + invalid);
        } catch (Exception e) {
            System.out.println("Error creating invalid date: " + e.getMessage());
        }
        
        // Check day existence in month
        MonthDay april30 = MonthDay.of(4, 30);
        System.out.println("April 30 exists: " + 
            (april30.getDayOfMonth() == 30));
    }
}

This example shows MonthDay validation features. The isValidYear
method checks February 29th against specific years. MonthDay construction
automatically rejects invalid day-month combinations like April 31st.

## Source

[Java MonthDay Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/MonthDay.html)

In this article, we've covered the essential methods and features of the Java
MonthDay class. Understanding these concepts is crucial for handling recurring
dates in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).