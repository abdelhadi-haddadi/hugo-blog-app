+++
title = "Java YearMonth Class"
date = 2025-08-29T20:00:53.392+01:00
draft = false
description = "Complete Java YearMonth class tutorial covering all methods with examples. Learn about year-month handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java YearMonth Class

Last modified: April 16, 2025

 

The java.time.YearMonth class represents a year and month combination
without day or time information. It is part of Java's modern date-time API
introduced in Java 8. YearMonth is immutable and thread-safe.

YearMonth is useful for representing credit card expiry dates,
subscription periods, or any scenario requiring year-month precision. It handles
month lengths and leap years automatically. The class follows ISO-8601 standards.

## YearMonth Class Overview

YearMonth provides methods to create, parse, and manipulate year-month
values. Key operations include getting month length, comparing values, and
formatting output. The class supports arithmetic operations on months and years.

public final class YearMonth implements Temporal, TemporalAdjuster, 
    Comparable&lt;YearMonth&gt;, Serializable {
    public static YearMonth now();
    public static YearMonth of(int year, Month month);
    public static YearMonth of(int year, int month);
    public static YearMonth parse(CharSequence text);
    public int getYear();
    public Month getMonth();
    public int lengthOfMonth();
    public boolean isLeapYear();
    public boolean isAfter(YearMonth other);
    public boolean isBefore(YearMonth other);
    public YearMonth plus(long amountToAdd, TemporalUnit unit);
    public YearMonth minus(long amountToSubtract, TemporalUnit unit);
}

The code above shows key methods provided by YearMonth. These methods
allow creating, comparing, and manipulating year-month values. The class handles
month-specific calculations like determining month length.

## Creating YearMonth Objects

YearMonth objects can be created in several ways. The most common methods are
now for current year-month and factory methods for specific values.
Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.Month;
import java.time.YearMonth;

public class Main {

    public static void main(String[] args) {
        
        // Current year-month
        YearMonth current = YearMonth.now();
        System.out.println("Current year-month: " + current);
        
        // From year and month enum
        YearMonth ym1 = YearMonth.of(2025, Month.JANUARY);
        System.out.println("From enum: " + ym1);
        
        // From year and month number
        YearMonth ym2 = YearMonth.of(2025, 2);
        System.out.println("From numbers: " + ym2);
        
        // From string
        YearMonth parsed = YearMonth.parse("2025-03");
        System.out.println("Parsed from string: " + parsed);
    }
}

This example demonstrates different ways to create YearMonth objects. The output
shows values in ISO-8601 format (yyyy-MM). The now method uses
the system clock and default time-zone.

## Getting YearMonth Components

A YearMonth can be decomposed into its year and month components. These values
can be retrieved as numbers or Month enum values. The class also provides
methods to check month length and leap years.

Main.java
  

package com.zetcode; 

import java.time.YearMonth;

public class Main {

    public static void main(String[] args) {

        YearMonth ym = YearMonth.of(2025, 2);
        
        // Get year
        int year = ym.getYear();
        System.out.println("Year: " + year);
        
        // Get month as enum
        System.out.println("Month: " + ym.getMonth());
        
        // Get month as number
        System.out.println("Month value: " + ym.getMonthValue());
        
        // Get month length
        System.out.println("Days in month: " + ym.lengthOfMonth());
        
        // Check leap year
        System.out.println("Is leap year: " + ym.isLeapYear());
    }
}

This example shows how to extract components from a YearMonth. Note that
lengthOfMonth accounts for leap years in February. The month can
be retrieved as either an enum or numeric value.

## Comparing YearMonth Values

YearMonth values can be compared to determine chronological order. The class
provides isBefore, isAfter, and compareTo
methods. These comparisons are useful for date range validations.

Main.java
  

package com.zetcode; 

import java.time.YearMonth;

public class Main {

    public static void main(String[] args) {

        YearMonth current = YearMonth.now();
        YearMonth future = current.plusMonths(3);
        YearMonth past = current.minusYears(1);
        
        System.out.println("Current is before future: " + current.isBefore(future));
        System.out.println("Current is after past: " + current.isAfter(past));
        System.out.println("Comparison result: " + current.compareTo(future));
        
        // Equality check
        YearMonth copy = YearMonth.of(current.getYear(), current.getMonthValue());
        System.out.println("Current equals copy: " + current.equals(copy));
    }
}

This example demonstrates various ways to compare YearMonth objects. The
comparison methods consider both year and month components. Note that equality
requires both components to match exactly.

## Adding and Subtracting Time

YearMonth supports temporal arithmetic through plus and
minus methods. These operations are useful for calculating future
or past year-month values. The class handles year and month boundaries correctly.

Main.java
  

package com.zetcode; 

import java.time.YearMonth;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        YearMonth ym = YearMonth.of(2025, 1);
        
        // Add months
        YearMonth nextMonth = ym.plusMonths(1);
        System.out.println("Next month: " + nextMonth);
        
        // Subtract years
        YearMonth lastYear = ym.minusYears(1);
        System.out.println("Last year: " + lastYear);
        
        // Add using ChronoUnit
        YearMonth inTwoMonths = ym.plus(2, ChronoUnit.MONTHS);
        System.out.println("In two months: " + inTwoMonths);
        
        // Complex operation
        YearMonth result = ym.plusYears(2).minusMonths(3);
        System.out.println("Complex operation result: " + result);
    }
}

This example shows various ways to perform temporal arithmetic with YearMonth.
Operations can use convenience methods or ChronoUnit constants. All calculations
handle year and month rollovers automatically.

## Converting to Other Date Types

YearMonth can be converted to other temporal types like LocalDate. These
conversions are essential when you need to work with specific dates within
the month or combine with other date components.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.YearMonth;

public class Main {

    public static void main(String[] args) {

        YearMonth ym = YearMonth.of(2025, 2);
        
        // Convert to LocalDate (first day of month)
        LocalDate firstDay = ym.atDay(1);
        System.out.println("First day: " + firstDay);
        
        // Convert to LocalDate (last day of month)
        LocalDate lastDay = ym.atEndOfMonth();
        System.out.println("Last day: " + lastDay);
        
        // Convert from LocalDate
        YearMonth fromDate = YearMonth.from(LocalDate.of(2025, 3, 15));
        System.out.println("From LocalDate: " + fromDate);
    }
}

This example demonstrates conversions between YearMonth and LocalDate. The
atDay and atEndOfMonth methods are particularly
useful. Conversion from LocalDate extracts just the year and month components.

## Formatting and Parsing

YearMonth supports formatting and parsing through the DateTimeFormatter class.
This allows flexible input/output formatting according to various patterns
and locales.

Main.java
  

package com.zetcode; 

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        YearMonth ym = YearMonth.of(2025, 4);
        
        // Default format (ISO)
        System.out.println("ISO format: " + ym);
        
        // Custom format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");
        System.out.println("Custom format: " + ym.format(formatter));
        
        // Localized format
        DateTimeFormatter frenchFormatter = 
            DateTimeFormatter.ofPattern("MMMM yyyy", Locale.FRENCH);
        System.out.println("French format: " + ym.format(frenchFormatter));
        
        // Parse custom format
        YearMonth parsed = YearMonth.parse("05-2025", 
            DateTimeFormatter.ofPattern("MM-yyyy"));
        System.out.println("Parsed custom format: " + parsed);
    }
}

This example shows how to format and parse YearMonth values using different
patterns and locales. The DateTimeFormatter provides extensive
formatting options. Parsing handles both standard and custom formats.

## Source

[Java YearMonth Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/YearMonth.html)

In this article, we've covered the essential methods and features of the Java
YearMonth class. Understanding these concepts is crucial for accurate year-month
handling in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).