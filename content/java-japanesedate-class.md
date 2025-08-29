+++
title = "Java JapaneseDate Class"
date = 2025-08-29T19:58:12.354+01:00
draft = false
description = "Complete Java JapaneseDate class tutorial covering all methods with examples. Learn about Japanese calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JapaneseDate Class

Last modified: April 16, 2025

 

The java.time.chrono.JapaneseDate class represents a date in the
Japanese imperial calendar system. It implements the ChronoLocalDate
interface and follows Japanese era-based dating conventions.

JapaneseDate is immutable and thread-safe. It handles dates from
Meiji 6 (1873) onward when Japan adopted the Gregorian calendar. The class
supports all Japanese eras including Reiwa, Heisei, Showa, and Taisho.

## JapaneseDate Class Overview

JapaneseDate provides methods to work with Japanese calendar dates.
Key features include era-based date creation, conversion to/from other calendar
systems, and date arithmetic. The class handles Japanese era transitions.

public final class JapaneseDate implements ChronoLocalDate, Serializable {
    public static JapaneseDate now();
    public static JapaneseDate now(ZoneId zone);
    public static JapaneseDate of(int prolepticYear, int month, int day);
    public static JapaneseDate of(Era era, int yearOfEra, int month, int day);
    public static JapaneseDate from(TemporalAccessor temporal);
    public JapaneseEra getEra();
    public int lengthOfMonth();
    public JapaneseChronology getChronology();
    public long toEpochDay();
    public static JapaneseDate ofEpochDay(long epochDay);
}

The code above shows key methods provided by JapaneseDate. These
methods allow creating dates in Japanese eras, converting between calendar
systems, and performing date calculations. The class handles era transitions.

## Creating JapaneseDate Objects

JapaneseDate objects can be created in several ways. The most common methods
are now for current date and factory methods for specific dates.
Dates can be created using eras or proleptic years.

Main.java
  

package com.zetcode; 

import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {
        
        // Current date
        JapaneseDate now = JapaneseDate.now();
        System.out.println("Current Japanese date: " + now);
        
        // Specific date in Reiwa era
        JapaneseDate reiwaDate = JapaneseDate.of(JapaneseEra.REIWA, 3, 5, 1);
        System.out.println("Reiwa 3-5-1: " + reiwaDate);
        
        // Specific date using proleptic year
        JapaneseDate prolepticDate = JapaneseDate.of(2020, 5, 1);
        System.out.println("Proleptic 2020-5-1: " + prolepticDate);
        
        // From epoch day
        JapaneseDate epochDate = JapaneseDate.ofEpochDay(18765);
        System.out.println("From epoch day: " + epochDate);
    }
}

This example demonstrates different ways to create JapaneseDate objects. The
output shows dates in Japanese calendar format. The now method
captures the current date in the Japanese calendar system.

## Working with Japanese Eras

JapaneseDate provides methods to work with Japanese eras. The era system is
fundamental to the Japanese calendar. Each era starts with a new emperor's reign.

Main.java
  

package com.zetcode; 

import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {

        JapaneseDate date = JapaneseDate.now();
        
        // Get current era
        JapaneseEra era = date.getEra();
        System.out.println("Current era: " + era);
        
        // List all available eras
        System.out.println("\nAvailable Japanese eras:");
        for (JapaneseEra e : JapaneseEra.values()) {
            System.out.println(e + " (" + e.getValue() + ")");
        }
        
        // Create date in Showa era
        JapaneseDate showaDate = JapaneseDate.of(JapaneseEra.SHOWA, 50, 1, 1);
        System.out.println("\nShowa 50-1-1: " + showaDate);
    }
}

This example shows how to work with Japanese eras. The getEra
method returns the current era. All available eras can be listed using
JapaneseEra.values(). Dates can be created using specific eras.

## Converting Between Calendar Systems

JapaneseDate can be converted to and from other calendar systems. This is useful
when working with international dates or when interfacing with other Java date
APIs.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.chrono.JapaneseDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {

        // Convert from LocalDate
        LocalDate localDate = LocalDate.of(2020, 5, 1);
        JapaneseDate japaneseDate = JapaneseDate.from(localDate);
        System.out.println("From LocalDate: " + japaneseDate);
        
        // Convert to LocalDate
        LocalDate backToLocal = LocalDate.from(japaneseDate);
        System.out.println("Back to LocalDate: " + backToLocal);
        
        // Using epoch days for conversion
        long epochDay = japaneseDate.toEpochDay();
        JapaneseDate fromEpoch = JapaneseDate.ofEpochDay(epochDay);
        System.out.println("From epoch days: " + fromEpoch);
        
        // Accessing year components
        int prolepticYear = japaneseDate.get(ChronoField.YEAR);
        int eraYear = japaneseDate.get(ChronoField.YEAR_OF_ERA);
        System.out.println("Proleptic year: " + prolepticYear);
        System.out.println("Era year: " + eraYear);
    }
}

This example demonstrates conversions between JapaneseDate and other calendar
systems. The from and toEpochDay methods enable
seamless conversion. Year values can be accessed in both proleptic and era forms.

## Date Arithmetic with JapaneseDate

JapaneseDate supports date arithmetic through methods inherited from
ChronoLocalDate. These operations respect the Japanese calendar
rules and era transitions.

Main.java
  

package com.zetcode; 

import java.time.chrono.JapaneseDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        JapaneseDate date = JapaneseDate.of(JapaneseEra.REIWA, 2, 4, 29);
        System.out.println("Original date: " + date);
        
        // Add days
        JapaneseDate plusDays = date.plusDays(10);
        System.out.println("Plus 10 days: " + plusDays);
        
        // Subtract months
        JapaneseDate minusMonths = date.minusMonths(2);
        System.out.println("Minus 2 months: " + minusMonths);
        
        // Add years (may cross era boundaries)
        JapaneseDate plusYears = date.plus(1, ChronoUnit.YEARS);
        System.out.println("Plus 1 year: " + plusYears);
        
        // Using period-based arithmetic
        JapaneseDate complex = date.plus(1, ChronoUnit.YEARS)
                                 .minus(3, ChronoUnit.MONTHS)
                                 .plus(5, ChronoUnit.DAYS);
        System.out.println("Complex operation: " + complex);
    }
}

This example shows various date arithmetic operations with JapaneseDate. The
operations handle era transitions automatically. Methods support adding or
subtracting days, months, and years while maintaining calendar correctness.

## Comparing Japanese Dates

JapaneseDate implements Comparable and provides methods for date
comparison. These comparisons are era-aware and follow chronological order.

Main.java
  

package com.zetcode; 

import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {

        JapaneseDate date1 = JapaneseDate.of(JapaneseEra.HEISEI, 30, 4, 30);
        JapaneseDate date2 = JapaneseDate.of(JapaneseEra.REIWA, 1, 5, 1);
        JapaneseDate date3 = JapaneseDate.of(JapaneseEra.REIWA, 2, 1, 1);
        
        System.out.println("Date1: " + date1);
        System.out.println("Date2: " + date2);
        System.out.println("Date3: " + date3);
        
        // Comparison methods
        System.out.println("Date1 is before Date2: " + date1.isBefore(date2));
        System.out.println("Date2 is after Date1: " + date2.isAfter(date1));
        System.out.println("Date2 equals Date2: " + date2.equals(date2));
        
        // Compare across era boundaries
        System.out.println("Compare Date1 and Date2: " + date1.compareTo(date2));
        System.out.println("Compare Date2 and Date3: " + date2.compareTo(date3));
    }
}

This example demonstrates comparing JapaneseDate objects. The comparisons work
correctly across era boundaries. The compareTo method returns
negative, zero, or positive values indicating chronological order.

## Handling Era Transitions

JapaneseDate correctly handles transitions between Japanese eras. This is
particularly important for dates around era changes like Heisei to Reiwa.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {

        // Heisei era last day
        JapaneseDate heiseiLast = JapaneseDate.of(JapaneseEra.HEISEI, 31, 4, 30);
        System.out.println("Heisei last day: " + heiseiLast);
        
        // Reiwa era first day
        JapaneseDate reiwaFirst = heiseiLast.plusDays(1);
        System.out.println("Reiwa first day: " + reiwaFirst);
        
        // Verify era transition
        System.out.println("New era: " + reiwaFirst.getEra());
        System.out.println("Year in new era: " + 
            reiwaFirst.get(JapaneseDate.ERA_YEAR));
            
        // Conversion around era boundary
        LocalDate boundaryLocal = LocalDate.of(2019, 4, 30);
        JapaneseDate boundaryJapanese = JapaneseDate.from(boundaryLocal);
        System.out.println("Boundary date: " + boundaryJapanese);
    }
}

This example shows how JapaneseDate handles era transitions. The transition
from Heisei 31 to Reiwa 1 is handled correctly. Date arithmetic and conversions
work seamlessly across era boundaries.

## Source

[Java JapaneseDate Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/JapaneseDate.html)

In this article, we've covered the essential methods and features of the Java
JapaneseDate class. Understanding these concepts is crucial for working with
dates in the Japanese calendar system.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).