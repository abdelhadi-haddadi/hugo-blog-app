+++
title = "Java IsoFields Class"
date = 2025-08-29T20:00:39.179+01:00
draft = false
description = "Complete Java IsoFields class tutorial covering all methods with examples. Learn about ISO week-based fields in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IsoFields Class

Last modified: April 16, 2025

 

The java.time.temporal.IsoFields class provides fields for the
ISO-8601 calendar system. It implements week-based fields like week-of-year
and quarter-of-year. These fields follow the ISO standard definitions.

IsoFields is a utility class with static fields and methods. It
works with temporal objects like LocalDate and LocalDateTime. The class helps
handle week-based and quarter-based date calculations.

## IsoFields Class Overview

IsoFields defines several constants representing ISO fields. These
include week-of-year, quarter-of-year, and day-of-quarter. The class provides
methods to access and manipulate these fields.

public final class IsoFields {
    public static final TemporalField WEEK_OF_WEEK_BASED_YEAR;
    public static final TemporalField WEEK_BASED_YEAR;
    public static final TemporalField QUARTER_OF_YEAR;
    public static final TemporalField DAY_OF_QUARTER;
    
    public static TemporalUnit WEEK_BASED_YEARS;
    public static TemporalUnit QUARTER_YEARS;
}

The code shows key fields and units defined in IsoFields. These
enable working with ISO week dates and quarters. The fields can be used with
various temporal objects in the java.time API.

## Getting Week of Year

ISO week-of-year differs from standard week numbering. Weeks start on Monday
and week 1 contains the first Thursday of the year. This example shows how to
get the ISO week number.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.IsoFields;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 1, 1);
        
        int weekOfYear = date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        int weekBasedYear = date.get(IsoFields.WEEK_BASED_YEAR);
        
        System.out.println("Date: " + date);
        System.out.println("ISO Week of Year: " + weekOfYear);
        System.out.println("ISO Week-Based Year: " + weekBasedYear);
        
        // Edge case - date in different ISO year
        LocalDate edgeDate = LocalDate.of(2024, 12, 31);
        System.out.println("\nEdge case - Dec 31, 2024:");
        System.out.println("ISO Week of Year: " + 
            edgeDate.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        System.out.println("ISO Week-Based Year: " + 
            edgeDate.get(IsoFields.WEEK_BASED_YEAR));
    }
}

This example demonstrates ISO week numbering. Note how January 1, 2025 might
belong to week 52 or 53 of the previous ISO year. The output shows the correct
ISO week and year values.

## Working with Quarters

IsoFields provides quarter-related fields. Quarters are numbered
1 through 4, each containing 3 months. This example shows quarter operations.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.IsoFields;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 5, 15);
        
        int quarter = date.get(IsoFields.QUARTER_OF_YEAR);
        long dayOfQuarter = date.get(IsoFields.DAY_OF_QUARTER);
        
        System.out.println("Date: " + date);
        System.out.println("Quarter: " + quarter);
        System.out.println("Day of Quarter: " + dayOfQuarter);
        
        // Calculate quarter start and end
        LocalDate quarterStart = date.with(IsoFields.DAY_OF_QUARTER, 1);
        LocalDate quarterEnd = quarterStart.plus(2, IsoFields.QUARTER_YEARS)
                                         .minusDays(1);
        
        System.out.println("Quarter starts: " + quarterStart);
        System.out.println("Quarter ends: " + quarterEnd);
    }
}

The example shows quarter information for a specific date. It calculates the
quarter's start and end dates. Note how QUARTER_YEARS unit is
used for temporal arithmetic.

## Adding and Subtracting Weeks

ISO week-based years can be used for temporal calculations. This example shows
how to add and subtract weeks while maintaining ISO week numbering.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.IsoFields;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 1, 1);
        System.out.println("Original date: " + date);
        
        // Add 2 weeks
        LocalDate plusWeeks = date.plus(2, IsoFields.WEEK_BASED_YEARS);
        System.out.println("After adding 2 weeks: " + plusWeeks);
        
        // Subtract 1 week
        LocalDate minusWeeks = date.minus(1, IsoFields.WEEK_BASED_YEARS);
        System.out.println("After subtracting 1 week: " + minusWeeks);
        
        // Week-based year difference
        LocalDate nextYear = LocalDate.of(2026, 1, 1);
        long weeksBetween = IsoFields.WEEK_BASED_YEARS.between(date, nextYear);
        System.out.println("Week-based years between: " + weeksBetween);
    }
}

This example demonstrates week-based calculations. The operations maintain
proper ISO week numbering across year boundaries. The between
method calculates differences in week-based years.

## Parsing Dates with ISO Fields

ISO fields can be used in date parsing and formatting. This example shows how
to create a formatter with ISO week fields.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.IsoFields;

public class Main {

    public static void main(String[] args) {
        
        // Formatter with ISO week fields
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(
            "YYYY-'W'ww-e");
        
        LocalDate date = LocalDate.of(2025, 1, 1);
        String formatted = date.format(formatter);
        System.out.println("Formatted date: " + formatted);
        
        // Parsing back
        LocalDate parsed = LocalDate.parse("2025-W01-3", formatter);
        System.out.println("Parsed date: " + parsed);
        
        // Verify fields
        System.out.println("ISO Week: " + 
            parsed.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        System.out.println("Day of Week: " + parsed.getDayOfWeek());
    }
}

The example formats and parses dates using ISO week patterns. The pattern
'YYYY-'W'ww-e' represents ISO year, week number, and day of week. Note
the uppercase 'W' for literal and lowercase 'w' for week number.

## Calculating Quarter Dates

This example demonstrates advanced quarter calculations using IsoFields.
It shows how to find quarter boundaries and perform quarter-based arithmetic.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.IsoFields;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 8, 15);
        int currentQuarter = date.get(IsoFields.QUARTER_OF_YEAR);
        
        System.out.println("Current quarter: Q" + currentQuarter);
        
        // First day of quarter
        LocalDate quarterStart = date.with(IsoFields.DAY_OF_QUARTER, 1);
        System.out.println("Quarter starts: " + quarterStart);
        
        // Last day of quarter
        LocalDate nextQuarterStart = quarterStart.plus(1, IsoFields.QUARTER_YEARS);
        LocalDate quarterEnd = nextQuarterStart.minusDays(1);
        System.out.println("Quarter ends: " + quarterEnd);
        
        // Days remaining in quarter
        long daysRemaining = quarterEnd.toEpochDay() - date.toEpochDay();
        System.out.println("Days remaining in quarter: " + daysRemaining);
        
        // Add two quarters
        LocalDate futureDate = date.plus(2, IsoFields.QUARTER_YEARS);
        System.out.println("Date after two quarters: " + futureDate);
    }
}

The example shows comprehensive quarter calculations. It finds quarter
boundaries, calculates remaining days, and performs quarter-based arithmetic.
The QUARTER_YEARS unit ensures proper quarter transitions.

## Combining ISO Fields with Other Temporal Fields

ISO fields can be combined with standard temporal fields for complex queries.
This example shows mixed field usage.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 12, 31);
        
        // Mixed field access
        int year = date.get(ChronoField.YEAR);
        int isoWeekYear = date.get(IsoFields.WEEK_BASED_YEAR);
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        int quarter = date.get(IsoFields.QUARTER_OF_YEAR);
        
        System.out.println("Date: " + date);
        System.out.println("Standard year: " + year);
        System.out.println("ISO week year: " + isoWeekYear);
        System.out.println("Month: " + month);
        System.out.println("Quarter: " + quarter);
        
        // Adjust date using mixed fields
        LocalDate adjusted = date.with(IsoFields.QUARTER_OF_YEAR, 2)
                               .with(ChronoField.DAY_OF_MONTH, 15);
        System.out.println("Adjusted date: " + adjusted);
        
        // Complex query
        boolean isLastWeekOfQuarter = 
            date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR) % 13 == 0;
        System.out.println("Is last week of quarter: " + isLastWeekOfQuarter);
    }
}

This example combines ISO fields with standard temporal fields. It demonstrates
how to mix different field types in queries and adjustments. The complex query
shows practical usage of multiple fields together.

## Source

[Java IsoFields Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/IsoFields.html)

In this article, we've covered the essential methods and features of the Java
IsoFields class. Understanding these concepts is crucial for working with
ISO week dates and quarters in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).