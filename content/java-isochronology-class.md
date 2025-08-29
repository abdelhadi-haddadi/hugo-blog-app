+++
title = "Java IsoChronology Class"
date = 2025-08-29T19:58:11.233+01:00
draft = false
description = "Complete Java IsoChronology class tutorial covering all methods with examples. Learn about ISO chronology in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IsoChronology Class

Last modified: April 16, 2025

 

The java.time.chrono.IsoChronology class implements the ISO calendar
system. This is the default chronology used in the Java Date and Time API. It
follows the rules of the ISO-8601 standard.

IsoChronology is immutable and thread-safe. It defines the rules
for the modern Gregorian calendar system. The chronology handles leap years and
other calendar calculations according to ISO standards.

## IsoChronology Class Overview

IsoChronology provides methods to create dates, check calendar
rules, and perform conversions. It serves as the foundation for most date
operations in Java. The class handles all date calculations according to ISO.

public final class IsoChronology extends AbstractChronology {
    public static IsoChronology INSTANCE;
    public static boolean isLeapYear(long prolepticYear);
    public LocalDate date(int prolepticYear, int month, int dayOfMonth);
    public LocalDate dateYearDay(int prolepticYear, int dayOfYear);
    public LocalDate dateEpochDay(long epochDay);
    public LocalDate date(TemporalAccessor temporal);
    public int prolepticYear(Era era, int yearOfEra);
    public Era eraOf(int eraValue);
    public List&lt;Era&gt; eras();
}

The code above shows key methods provided by IsoChronology. These
methods allow date creation, leap year checks, and era handling. The class
follows ISO-8601 rules for all calendar calculations.

## Getting the ISO Chronology Instance

The IsoChronology is a singleton accessed via its INSTANCE
field. This instance is used for all ISO calendar operations. It's also available
through various date objects.

Main.java
  

package com.zetcode;

import java.time.chrono.IsoChronology;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Get the ISO chronology instance
        IsoChronology isoChrono = IsoChronology.INSTANCE;
        System.out.println("ISO Chronology: " + isoChrono);
        
        // Get chronology from a date
        IsoChronology fromDate = LocalDate.now().getChronology();
        System.out.println("From LocalDate: " + fromDate);
        
        // Compare chronologies
        System.out.println("Same instance: " + 
            (isoChrono == fromDate));
    }
}

This example demonstrates how to access the IsoChronology instance.
The output confirms it's the same instance whether accessed directly or through
a date object. The ISO chronology is the default for most Java date types.

## Creating Dates with IsoChronology

IsoChronology provides several factory methods to create dates.
These methods allow creating dates from different components like year-month-day
or year-day combinations.

Main.java
  

package com.zetcode;

import java.time.chrono.IsoChronology;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        IsoChronology iso = IsoChronology.INSTANCE;
        
        // Create date from year, month, day
        LocalDate date1 = iso.date(2025, 4, 15);
        System.out.println("Date from YMD: " + date1);
        
        // Create date from year and day of year
        LocalDate date2 = iso.dateYearDay(2025, 105);
        System.out.println("Date from year day: " + date2);
        
        // Create date from epoch day
        LocalDate date3 = iso.dateEpochDay(19000);
        System.out.println("Date from epoch day: " + date3);
        
        // Create from another temporal object
        LocalDate date4 = iso.date(date1);
        System.out.println("Date from temporal: " + date4);
    }
}

This example shows different ways to create dates using IsoChronology.
The methods provide flexibility in date creation while ensuring all dates follow
ISO rules. The chronology validates all date components.

## Checking Leap Years

The isLeapYear method checks if a year is a leap year according to
ISO rules. This is useful for calendar calculations and date validation. The
method follows the standard Gregorian leap year rules.

Main.java
  

package com.zetcode;

import java.time.chrono.IsoChronology;

public class Main {

    public static void main(String[] args) {
        
        IsoChronology iso = IsoChronology.INSTANCE;
        
        // Check some leap years
        System.out.println("2000 is leap: " + iso.isLeapYear(2000));
        System.out.println("2020 is leap: " + iso.isLeapYear(2020));
        System.out.println("2025 is leap: " + iso.isLeapYear(2025));
        
        // Check edge cases
        System.out.println("1900 is leap: " + iso.isLeapYear(1900));
        System.out.println("2100 is leap: " + iso.isLeapYear(2100));
    }
}

This example demonstrates leap year checking with IsoChronology.
The output shows how years divisible by 100 are not leap years unless they're
also divisible by 400. This matches the Gregorian calendar rules.

## Working with Eras

The ISO chronology supports two eras: BCE (Before Current Era) and CE (Current
Era). These methods allow conversion between eras and proleptic years. Era
handling is rarely needed in modern applications.

Main.java
  

package com.zetcode;

import java.time.chrono.IsoChronology;
import java.time.chrono.Era;

public class Main {

    public static void main(String[] args) {
        
        IsoChronology iso = IsoChronology.INSTANCE;
        
        // Get all eras
        System.out.println("Available eras:");
        for (Era era : iso.eras()) {
            System.out.println(era);
        }
        
        // Get era by value
        Era ce = iso.eraOf(1);
        System.out.println("Era of 1: " + ce);
        
        // Convert between eras and proleptic years
        int prolepticYear = iso.prolepticYear(ce, 2025);
        System.out.println("Proleptic year: " + prolepticYear);
    }
}

This example shows era handling in IsoChronology. The ISO system
uses a simple two-era model. Most modern applications can ignore eras and work
directly with proleptic years.

## Comparing with Other Chronologies

IsoChronology can be compared with other chronology implementations.
This is useful when working with multiple calendar systems. The comparison
includes checking chronology IDs and rules.

Main.java
  

package com.zetcode;

import java.time.chrono.IsoChronology;
import java.time.chrono.JapaneseChronology;
import java.time.chrono.HijrahChronology;

public class Main {

    public static void main(String[] args) {
        
        IsoChronology iso = IsoChronology.INSTANCE;
        
        // Compare with other chronologies
        System.out.println("ISO vs Japanese: " + 
            iso.equals(JapaneseChronology.INSTANCE));
            
        System.out.println("ISO vs Hijrah: " + 
            iso.equals(HijrahChronology.INSTANCE));
            
        // Check chronology ID
        System.out.println("ISO ID: " + iso.getId());
        System.out.println("Japanese ID: " + 
            JapaneseChronology.INSTANCE.getId());
    }
}

This example compares IsoChronology with other calendar systems.
The output shows how different chronologies have unique IDs and rules. The ISO
chronology is the default in most Java applications.

## Date Calculations with IsoChronology

IsoChronology provides methods for advanced date calculations.
These include range checks, length of month, and other calendar-specific
operations. All calculations follow ISO rules.

Main.java
  

package com.zetcode;

import java.time.chrono.IsoChronology;
import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        IsoChronology iso = IsoChronology.INSTANCE;
        LocalDate date = iso.date(2025, 2, 15);
        
        // Get month length
        System.out.println("Days in month: " + 
            iso.range(ChronoField.DAY_OF_MONTH).getMaximum());
            
        // Get year length
        System.out.println("Days in year: " + 
            iso.range(ChronoField.DAY_OF_YEAR).getMaximum());
            
        // Check date validity
        System.out.println("Is valid year: " + 
            iso.isValidYear(2025));
        System.out.println("Is valid date: " + 
            iso.isValidYearDay(2025, 366));
    }
}

This example demonstrates date calculations with IsoChronology.
The methods provide information about date ranges and validity. These are useful
for building calendar applications or performing date validations.

## Source

[Java IsoChronology Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/IsoChronology.html)

In this article, we've covered the essential methods and features of the Java
IsoChronology class. Understanding these concepts is crucial for working with
dates in the ISO calendar system.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).