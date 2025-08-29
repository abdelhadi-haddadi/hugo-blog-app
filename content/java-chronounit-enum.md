+++
title = "Java ChronoUnit Enum"
date = 2025-08-29T20:00:39.183+01:00
draft = false
description = "Complete Java ChronoUnit enum tutorial covering all methods with examples. Learn about time units handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ChronoUnit Enum

Last modified: April 16, 2025

 

The java.time.temporal.ChronoUnit enum represents standard units of
time measurement. It provides units from nanoseconds to centuries for use with
the Java Time API. ChronoUnit implements the TemporalUnit interface.

ChronoUnit is used for temporal arithmetic and date-time calculations.
It works with classes like Instant, LocalDate, and
ZonedDateTime. The enum provides both time-based and date-based units.

## ChronoUnit Enum Overview

ChronoUnit contains constants for various time units. Each unit has
a duration and methods for temporal calculations. The enum handles both small
time units and large date-based units consistently.

public enum ChronoUnit implements TemporalUnit {
    NANOS, MICROS, MILLIS, SECONDS, MINUTES, HOURS, HALF_DAYS,
    DAYS, WEEKS, MONTHS, YEARS, DECADES, CENTURIES, MILLENNIA, ERAS,
    FOREVER;
    
    public boolean isDateBased();
    public boolean isTimeBased();
    public Duration getDuration();
    public boolean isSupportedBy(Temporal temporal);
    public &lt;R extends Temporal&gt; R addTo(R temporal, long amount);
}

The code above shows key methods and constants in ChronoUnit. The
enum provides units ranging from nanoseconds to millennia. Each unit can be used
for adding/subtracting time from temporal objects.

## Basic ChronoUnit Usage

ChronoUnit constants can be used directly for temporal calculations. The simplest
usage involves adding or subtracting units from temporal objects. This provides
precise control over date-time manipulations.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Current time: " + now);
        
        // Add 5 hours
        LocalDateTime later = now.plus(5, ChronoUnit.HOURS);
        System.out.println("5 hours later: " + later);
        
        // Subtract 3 days
        LocalDateTime earlier = now.minus(3, ChronoUnit.DAYS);
        System.out.println("3 days earlier: " + earlier);
        
        // Add 30 minutes
        LocalDateTime soon = now.plus(30, ChronoUnit.MINUTES);
        System.out.println("30 minutes later: " + soon);
    }
}

This example demonstrates basic arithmetic with ChronoUnit. We add and subtract
different time units from the current date-time. The operations maintain all
date-time fields correctly, handling overflow automatically.

## Calculating Time Differences

ChronoUnit can calculate differences between temporal objects. The
between method returns the amount of time in the specified unit.
This is useful for measuring durations between events.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date1 = LocalDate.of(2025, 1, 1);
        LocalDate date2 = LocalDate.of(2025, 12, 31);
        
        // Days between dates
        long daysBetween = ChronoUnit.DAYS.between(date1, date2);
        System.out.println("Days between: " + daysBetween);
        
        // Months between dates
        long monthsBetween = ChronoUnit.MONTHS.between(date1, date2);
        System.out.println("Months between: " + monthsBetween);
        
        LocalTime time1 = LocalTime.of(8, 30);
        LocalTime time2 = LocalTime.of(17, 45);
        
        // Hours between times
        long hoursBetween = ChronoUnit.HOURS.between(time1, time2);
        System.out.println("Hours between: " + hoursBetween);
        
        // Minutes between times
        long minsBetween = ChronoUnit.MINUTES.between(time1, time2);
        System.out.println("Minutes between: " + minsBetween);
    }
}

This example shows how to calculate differences between dates and times using
various ChronoUnit values. The method returns the complete count of the
specified unit between the two temporal objects.

## Checking Unit Support

Not all temporal objects support all ChronoUnit values. The
isSupportedBy method checks if a unit can be used with a specific
temporal object. This prevents unsupported operations at runtime.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        
        // Check date-based units
        System.out.println("DAYS supported by date: " + 
            ChronoUnit.DAYS.isSupportedBy(date));
        System.out.println("HOURS supported by date: " + 
            ChronoUnit.HOURS.isSupportedBy(date));
            
        // Check time-based units
        System.out.println("HOURS supported by time: " + 
            ChronoUnit.HOURS.isSupportedBy(time));
        System.out.println("MONTHS supported by time: " + 
            ChronoUnit.MONTHS.isSupportedBy(time));
            
        // Check mixed units
        System.out.println("WEEKS supported by date: " + 
            ChronoUnit.WEEKS.isSupportedBy(date));
        System.out.println("NANOS supported by time: " + 
            ChronoUnit.NANOS.isSupportedBy(time));
    }
}

This example demonstrates checking unit support for different temporal types.
Date-based objects typically don't support time units and vice versa. The method
helps write robust code that handles temporal operations safely.

## Working with Instant

ChronoUnit works particularly well with Instant for precise time calculations.
Instant supports all time-based units but not date-based units. This makes it
ideal for machine-time operations.

Main.java
  

package com.zetcode;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        
        Instant start = Instant.now();
        Thread.sleep(1500); // Simulate work
        Instant end = Instant.now();
        
        // Calculate duration in various units
        System.out.println("Nanos between: " + 
            ChronoUnit.NANOS.between(start, end));
        System.out.println("Millis between: " + 
            ChronoUnit.MILLIS.between(start, end));
        System.out.println("Seconds between: " + 
            ChronoUnit.SECONDS.between(start, end));
            
        // Add time to instant
        Instant future = start.plus(2, ChronoUnit.HOURS)
                             .plus(30, ChronoUnit.MINUTES);
        System.out.println("Future time: " + future);
    }
}

This example shows ChronoUnit usage with Instant. We measure time intervals in
different precision units and perform temporal arithmetic. Instant provides
nanosecond precision where available.

## Date-Based Calculations

For date-based calculations, ChronoUnit provides units like days, weeks, and
months. These units account for calendar rules like varying month lengths. The
calculations maintain calendar correctness.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);
        
        // Add weeks
        LocalDate nextWeek = today.plus(1, ChronoUnit.WEEKS);
        System.out.println("Next week: " + nextWeek);
        
        // Subtract months
        LocalDate lastMonth = today.minus(1, ChronoUnit.MONTHS);
        System.out.println("Last month: " + lastMonth);
        
        // Complex calculation
        LocalDate futureDate = today.plus(2, ChronoUnit.YEARS)
                                   .minus(3, ChronoUnit.MONTHS);
        System.out.println("Future date: " + futureDate);
        
        // Days in February 2024 (leap year)
        LocalDate feb1 = LocalDate.of(2024, Month.FEBRUARY, 1);
        long daysInFeb = ChronoUnit.DAYS.between(feb1, 
            feb1.plus(1, ChronoUnit.MONTHS));
        System.out.println("Days in Feb 2024: " + daysInFeb);
    }
}

This example demonstrates date-based calculations with ChronoUnit. The operations
respect calendar rules, including leap years and varying month lengths. The
results are always calendar-correct.

## Combining Time and Date Units

ChronoUnit allows combining time and date units in calculations. This is useful
for complex temporal operations. The operations are applied sequentially with
proper unit conversion.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Now: " + now);
        
        // Mixed unit calculation
        LocalDateTime complex = now.plus(2, ChronoUnit.DAYS)
                                  .plus(3, ChronoUnit.HOURS)
                                  .minus(45, ChronoUnit.MINUTES);
        System.out.println("Complex result: " + complex);
        
        // Calculate weeks between dates
        LocalDateTime future = now.plus(10, ChronoUnit.WEEKS);
        long weeksBetween = ChronoUnit.WEEKS.between(now, future);
        System.out.println("Weeks between: " + weeksBetween);
        
        // Check if unit is time or date based
        System.out.println("HOURS is time-based: " + 
            ChronoUnit.HOURS.isTimeBased());
        System.out.println("MONTHS is date-based: " + 
            ChronoUnit.MONTHS.isDateBased());
    }
}

This example shows combining time and date units in calculations. We also check
whether units are time-based or date-based. The operations maintain temporal
consistency across different unit types.

## Source

[Java ChronoUnit Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoUnit.html)

In this article, we've covered the essential methods and features of the Java
ChronoUnit enum. Understanding these concepts is crucial for precise time and
date calculations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).