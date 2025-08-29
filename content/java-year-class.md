+++
title = "Java Year Class"
date = 2025-08-29T20:00:53.396+01:00
draft = false
description = "Complete Java Year class tutorial covering all methods with examples. Learn about year handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Year Class

Last modified: April 16, 2025

 

The java.time.Year class represents a year in the ISO-8601 calendar
system. It is part of the Java 8 Date and Time API and provides methods to work
with years without day or time information. Year is immutable and thread-safe.

Year is useful when you need to work with just the year component
of a date. It supports years from -999,999,999 to +999,999,999. The class
provides methods to check leap years, compare years, and perform arithmetic.

## Year Class Overview

Year provides static factory methods to create instances and various
methods to query and manipulate years. Key operations include checking validity,
comparing years, and converting to other temporal types.

public final class Year implements Temporal, TemporalAdjuster, 
    Comparable&lt;Year&gt;, Serializable {
    public static Year now();
    public static Year of(int isoYear);
    public static Year parse(CharSequence text);
    public int getValue();
    public boolean isLeap();
    public boolean isValidMonthDay(MonthDay monthDay);
    public boolean isAfter(Year otherYear);
    public boolean isBefore(Year otherYear);
    public Year plusYears(long yearsToAdd);
    public Year minusYears(long yearsToSubtract);
}

The code above shows key methods provided by Year. These methods
allow creating, comparing, and manipulating year values. The class provides
validation and leap year calculations following ISO-8601 rules.

## Creating Year Objects

Year objects can be created in several ways. The most common methods are
now for current year and of for specific years.
Parsing from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.Year;

public class Main {

    public static void main(String[] args) {
        
        // Current year
        Year currentYear = Year.now();
        System.out.println("Current year: " + currentYear);
        
        // Specific year
        Year year2025 = Year.of(2025);
        System.out.println("Year 2025: " + year2025);
        
        // Parse from string
        Year parsedYear = Year.parse("2030");
        System.out.println("Parsed year: " + parsedYear);
        
        // From system clock with specific zone
        Year yearInTokyo = Year.now(ZoneId.of("Asia/Tokyo"));
        System.out.println("Current year in Tokyo: " + yearInTokyo);
    }
}

This example demonstrates different ways to create Year objects. The output
shows the year values in YYYY format. The now method can use
either the system default time zone or a specified one.

## Getting Year Information

A Year object provides methods to get its value and check properties like
whether it's a leap year. These methods are essential for year-based logic
in applications.

Main.java
  

package com.zetcode; 

import java.time.Year;

public class Main {

    public static void main(String[] args) {

        Year year = Year.of(2024);
        
        // Get year value
        int yearValue = year.getValue();
        System.out.println("Year value: " + yearValue);
        
        // Check if leap year
        boolean isLeap = year.isLeap();
        System.out.println("Is leap year: " + isLeap);
        
        // Check validity of month-day
        boolean isValid = year.isValidMonthDay(MonthDay.of(2, 29));
        System.out.println("Is Feb 29 valid: " + isValid);
        
        // Length of year
        int length = year.length();
        System.out.println("Days in year: " + length);
    }
}

This example shows how to get information from a Year object. The leap year
check follows ISO-8601 rules. The isValidMonthDay method is
particularly useful for validating dates without creating full date objects.

## Comparing Years

Years can be compared to determine chronological order. The class provides
isBefore, isAfter, and compareTo methods.
These comparisons are useful for sorting and conditional logic.

Main.java
  

package com.zetcode; 

import java.time.Year;

public class Main {

    public static void main(String[] args) {

        Year current = Year.now();
        Year nextYear = current.plusYears(1);
        Year lastYear = current.minusYears(1);
        
        System.out.println("Current is before next: " + current.isBefore(nextYear));
        System.out.println("Current is after last: " + current.isAfter(lastYear));
        System.out.println("Comparison result: " + current.compareTo(nextYear));
        
        // Equality check
        Year sameYear = Year.of(current.getValue());
        System.out.println("Current equals same year: " + current.equals(sameYear));
    }
}

This example demonstrates various ways to compare Year objects. The comparison
methods consider only the year value. Note that equality requires the exact
same year value.

## Adding and Subtracting Years

Year supports arithmetic operations through plusYears and
minusYears methods. These operations are useful for calculating
future or past years. The class handles year roll-over automatically.

Main.java
  

package com.zetcode; 

import java.time.Year;

public class Main {

    public static void main(String[] args) {

        Year year = Year.of(2025);
        
        // Add years
        Year future = year.plusYears(5);
        System.out.println("Five years later: " + future);
        
        // Subtract years
        Year past = year.minusYears(10);
        System.out.println("Ten years ago: " + past);
        
        // Leap year calculation
        Year leapYear = year.plusYears(4);
        System.out.println("Next leap year: " + leapYear + 
            " (" + leapYear.isLeap() + ")");
        
        // Large year changes
        Year distantFuture = year.plusYears(1000);
        System.out.println("Year 3025: " + distantFuture);
    }
}

This example shows how to perform arithmetic with Year objects. Operations can
span large year ranges and automatically maintain leap year properties. The
results are always valid Year objects.

## Converting Between Temporal Types

Year can be converted to and from other temporal types like LocalDate.
These conversions are essential when working with more complete date
representations.

Main.java
  

package com.zetcode; 

import java.time.Year;
import java.time.LocalDate;
import java.time.Month;

public class Main {

    public static void main(String[] args) {

        Year year = Year.of(2025);
        
        // Convert to LocalDate (first day of year)
        LocalDate date = year.atDay(1);
        System.out.println("First day of year: " + date);
        
        // Convert with specific month-day
        LocalDate christmas = year.atMonthDay(MonthDay.of(Month.DECEMBER, 25));
        System.out.println("Christmas: " + christmas);
        
        // Convert from LocalDate
        Year fromDate = Year.from(LocalDate.of(2030, 6, 15));
        System.out.println("Year from date: " + fromDate);
        
        // Convert to YearMonth
        YearMonth june = year.atMonth(Month.JUNE);
        System.out.println("June of year: " + june);
    }
}

This example demonstrates conversions between Year and other temporal types.
The atDay and atMonthDay methods are particularly
useful for creating complete dates. All conversions maintain temporal accuracy.

## Validating Dates

Year provides methods to validate month-day combinations without creating
full date objects. This is useful for checking if specific dates exist in
a given year.

Main.java
  

package com.zetcode; 

import java.time.Year;
import java.time.Month;
import java.time.MonthDay;

public class Main {

    public static void main(String[] args) {

        Year leapYear = Year.of(2024);
        Year nonLeapYear = Year.of(2025);
        
        // Check February 29
        MonthDay feb29 = MonthDay.of(Month.FEBRUARY, 29);
        System.out.println("Feb 29 in 2024: " + leapYear.isValidMonthDay(feb29));
        System.out.println("Feb 29 in 2025: " + nonLeapYear.isValidMonthDay(feb29));
        
        // Check April 31
        MonthDay apr31 = MonthDay.of(Month.APRIL, 31);
        System.out.println("Apr 31 in any year: " + Year.of(2000).isValidMonthDay(apr31));
        
        // Check December 32
        MonthDay dec32 = MonthDay.of(Month.DECEMBER, 32);
        System.out.println("Dec 32 in any year: " + Year.of(2000).isValidMonthDay(dec32));
    }
}

This example shows how to validate month-day combinations against specific
years. The isValidMonthDay method checks both the month length
and special cases like February 29 in leap years.

## Source

[Java Year Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/Year.html)

In this article, we've covered the essential methods and features of the Java
Year class. Understanding these concepts is crucial for working with year-based
data in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).