+++
title = "Java Period Class"
date = 2025-08-29T20:00:52.281+01:00
draft = false
description = "Complete Java Period class tutorial covering all methods with examples. Learn about date periods in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Period Class

Last modified: April 16, 2025

 

The java.time.Period class represents a date-based amount of time
in years, months and days. It models a quantity or amount of time in terms of
calendar fields. Period is used to modify or calculate differences between dates.

Period is immutable and thread-safe. It is commonly used for
date-based calculations like adding months to a date or finding age. The class
handles daylight saving time and other calendar irregularities automatically.

## Period Class Overview

Period provides methods to create periods, parse strings, and
perform calculations. Key operations include adding to dates, comparing periods,
and extracting components. The class handles years, months and days separately.

public final class Period implements ChronoPeriod, Serializable {
    public static Period of(int years, int months, int days);
    public static Period ofYears(int years);
    public static Period ofMonths(int months);
    public static Period ofDays(int days);
    public static Period between(LocalDate start, LocalDate end);
    public static Period parse(CharSequence text);
    public int getYears();
    public int getMonths();
    public int getDays();
    public boolean isZero();
    public boolean isNegative();
    public Period plus(Period amountToAdd);
    public Period minus(Period amountToSubtract);
    public Period normalized();
}

The code above shows key methods provided by Period. These methods
allow creating, comparing, and manipulating periods. The class handles date-based
calculations while accounting for varying month lengths and leap years.

## Creating Period Objects

Period objects can be created in several ways. The most common methods are
factory methods for specific durations and parsing from strings. The
between method calculates periods between dates.

Main.java
  

package com.zetcode; 

import java.time.Period;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Using factory methods
        Period oneYear = Period.ofYears(1);
        System.out.println("One year: " + oneYear);
        
        Period twoMonths = Period.ofMonths(2);
        System.out.println("Two months: " + twoMonths);
        
        Period threeDays = Period.ofDays(3);
        System.out.println("Three days: " + threeDays);
        
        // Combined period
        Period complex = Period.of(1, 2, 3);
        System.out.println("1 year, 2 months, 3 days: " + complex);
        
        // From dates
        LocalDate start = LocalDate.of(2025, 1, 1);
        LocalDate end = LocalDate.of(2026, 3, 15);
        Period between = Period.between(start, end);
        System.out.println("Between dates: " + between);
        
        // From string
        Period parsed = Period.parse("P1Y2M3D");
        System.out.println("Parsed from string: " + parsed);
    }
}

This example demonstrates different ways to create Period objects. The output
shows periods in ISO-8601 format (P1Y2M3D). The between method
calculates the exact period between two dates.

## Getting Period Components

A Period can be decomposed into its years, months and days components. These
values represent the separate parts of the period. The methods are useful for
displaying or further calculations with specific components.

Main.java
  

package com.zetcode; 

import java.time.Period;

public class Main {

    public static void main(String[] args) {

        Period period = Period.of(2, 5, 10);
        
        // Get individual components
        int years = period.getYears();
        int months = period.getMonths();
        int days = period.getDays();
        
        System.out.println("Years: " + years);
        System.out.println("Months: " + months);
        System.out.println("Days: " + days);
        
        // Check if zero or negative
        System.out.println("Is zero: " + period.isZero());
        System.out.println("Is negative: " + period.isNegative());
        
        // Normalized form
        Period normalized = period.normalized();
        System.out.println("Normalized: " + normalized);
    }
}

This example shows how to extract components from a Period. The
normalized method ensures months are between 0-11 by converting
excess months to years. Negative periods indicate time moving backward.

## Adding and Subtracting Periods

Periods can be added to or subtracted from dates using the plus
and minus methods. These operations account for varying month
lengths and leap years. The calculations are calendar-aware.

Main.java
  

package com.zetcode; 

import java.time.Period;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {

        LocalDate date = LocalDate.of(2025, 1, 15);
        Period period = Period.of(1, 2, 3);
        
        // Add period to date
        LocalDate future = date.plus(period);
        System.out.println("Future date: " + future);
        
        // Subtract period from date
        LocalDate past = date.minus(period);
        System.out.println("Past date: " + past);
        
        // Add periods together
        Period another = Period.of(0, 3, 10);
        Period combined = period.plus(another);
        System.out.println("Combined period: " + combined);
        
        // Subtract periods
        Period difference = period.minus(another);
        System.out.println("Difference: " + difference);
    }
}

This example demonstrates various ways to perform arithmetic with Periods. When
added to dates, periods handle month length variations automatically. Period
arithmetic preserves each component separately.

## Comparing Periods

Periods can be compared for equality or checked for zero/negative values. Note
that comparison methods don't convert between components (1 month ≠ 30 days).
The class provides methods for basic period analysis.

Main.java
  

package com.zetcode; 

import java.time.Period;

public class Main {

    public static void main(String[] args) {

        Period period1 = Period.of(1, 2, 3);
        Period period2 = Period.of(0, 14, 3);
        Period period3 = Period.of(1, 2, 3);
        
        // Equality checks
        System.out.println("Period1 equals period2: " + period1.equals(period2));
        System.out.println("Period1 equals period3: " + period1.equals(period3));
        
        // Zero and negative checks
        System.out.println("Period1 is zero: " + period1.isZero());
        System.out.println("Period1 is negative: " + period1.isNegative());
        
        // Normalized comparison
        System.out.println("Normalized equals: " + 
            period1.normalized().equals(period2.normalized()));
    }
}

This example shows various ways to compare Period objects. Note that 14 months
is not considered equal to 1 year and 2 months unless normalized. Negative
periods indicate time moving backward.

## Calculating Age

A common use of Period is calculating age or time spans between dates. The
between method provides precise calculations in years, months
and days. This is useful for birthday calculations.

Main.java
  

package com.zetcode; 

import java.time.Period;
import java.time.LocalDate;
import java.time.Month;

public class Main {

    public static void main(String[] args) {

        LocalDate birthDate = LocalDate.of(1990, Month.MAY, 15);
        LocalDate currentDate = LocalDate.now();
        
        // Calculate age
        Period age = Period.between(birthDate, currentDate);
        System.out.printf("Age: %d years, %d months, %d days%n",
            age.getYears(), age.getMonths(), age.getDays());
        
        // Future date calculation
        LocalDate futureDate = currentDate.plus(Period.ofYears(5));
        Period untilFuture = Period.between(currentDate, futureDate);
        System.out.println("Until future date: " + untilFuture);
        
        // Specific event calculation
        LocalDate eventDate = LocalDate.of(2025, Month.DECEMBER, 25);
        Period untilEvent = Period.between(currentDate, eventDate);
        System.out.println("Until event: " + untilEvent);
    }
}

This example demonstrates calculating age and time spans between dates. The
between method provides precise results accounting for leap
years and varying month lengths. The output shows human-readable durations.

## Period Parsing and Formatting

Period supports ISO-8601 format for parsing and can be converted to strings.
The format is PnYnMnD where n is the number of years, months or days. This
is useful for serialization and configuration.

Main.java
  

package com.zetcode; 

import java.time.Period;

public class Main {

    public static void main(String[] args) {

        // Parsing ISO-8601 format
        Period p1 = Period.parse("P1Y");
        System.out.println("1 year: " + p1);
        
        Period p2 = Period.parse("P2M");
        System.out.println("2 months: " + p2);
        
        Period p3 = Period.parse("P3D");
        System.out.println("3 days: " + p3);
        
        Period p4 = Period.parse("P1Y2M3D");
        System.out.println("1Y2M3D: " + p4);
        
        Period p5 = Period.parse("P-1Y2M");
        System.out.println("Negative 1Y2M: " + p5);
        
        // Converting to string
        String periodStr = p4.toString();
        System.out.println("As string: " + periodStr);
    }
}

This example shows parsing Periods from strings and converting them back. The
ISO-8601 format is strict - components must be in order (years, months, days).
Negative values are supported for each component.

## Source

[Java Period Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html)

In this article, we've covered the essential methods and features of the Java
Period class. Understanding these concepts is crucial for accurate date-based
calculations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).