+++
title = "Java ChronoField Enum"
date = 2025-08-29T20:00:39.174+01:00
draft = false
description = "Complete Java ChronoField enum tutorial covering all fields with examples. Learn about temporal fields in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ChronoField Enum

Last modified: April 16, 2025

 

The java.time.temporal.ChronoField enum implements TemporalField
and represents standard fields for date and time. It provides units like year,
month, day, hour, minute, and second. Each field has a range of valid values.

ChronoField is used with temporal objects like LocalDate,
LocalTime, and ZonedDateTime. It enables access to
specific components of date-time objects. The enum contains both date and time
related fields.

## ChronoField Enum Overview

ChronoField provides constants for all standard date-time fields.
Each field has methods to get its range and base unit. The enum implements
TemporalField interface for temporal access and adjustment.

public enum ChronoField implements TemporalField {
    NANO_OF_SECOND, NANO_OF_DAY,
    MICRO_OF_SECOND, MICRO_OF_DAY,
    MILLI_OF_SECOND, MILLI_OF_DAY,
    SECOND_OF_MINUTE, SECOND_OF_DAY,
    MINUTE_OF_HOUR, MINUTE_OF_DAY,
    HOUR_OF_AMPM, HOUR_OF_DAY,
    AMPM_OF_DAY,
    DAY_OF_WEEK, DAY_OF_MONTH, DAY_OF_YEAR,
    EPOCH_DAY,
    ALIGNED_WEEK_OF_MONTH, ALIGNED_WEEK_OF_YEAR,
    ALIGNED_DAY_OF_WEEK_IN_MONTH, ALIGNED_DAY_OF_WEEK_IN_YEAR,
    MONTH_OF_YEAR, PROLEPTIC_MONTH,
    YEAR_OF_ERA, YEAR,
    ERA,
    INSTANT_SECONDS, OFFSET_SECONDS;
    
    // Methods
    public ValueRange range();
    public boolean isDateBased();
    public boolean isTimeBased();
    public TemporalUnit getBaseUnit();
    public TemporalUnit getRangeUnit();
}

The code above shows the enum constants and key methods. Fields are categorized
as date-based or time-based. Each field has a defined range of valid values
accessible via range() method.

## Accessing Date Components

ChronoField can extract date components like year, month, and day.
Date-based fields work with temporal objects that contain date information.
The example shows common date field operations.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 15);
        
        // Get year
        int year = date.get(ChronoField.YEAR);
        System.out.println("Year: " + year);
        
        // Get month
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        System.out.println("Month: " + month);
        
        // Get day of month
        int day = date.get(ChronoField.DAY_OF_MONTH);
        System.out.println("Day: " + day);
        
        // Get day of year
        int dayOfYear = date.get(ChronoField.DAY_OF_YEAR);
        System.out.println("Day of year: " + dayOfYear);
        
        // Check if field is supported
        boolean supported = date.isSupported(ChronoField.ERA);
        System.out.println("ERA supported: " + supported);
    }
}

This example demonstrates accessing date components using ChronoField.
The get() method retrieves field values from temporal objects.
isSupported() checks if a field is available for the temporal type.

## Accessing Time Components

Time-based fields provide access to hour, minute, second, and nanosecond values.
These fields work with temporal objects containing time information.
The example shows common time field operations.

Main.java
  

package com.zetcode;

import java.time.LocalTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalTime time = LocalTime.of(14, 30, 45, 500_000);
        
        // Get hour
        int hour = time.get(ChronoField.HOUR_OF_DAY);
        System.out.println("Hour: " + hour);
        
        // Get minute
        int minute = time.get(ChronoField.MINUTE_OF_HOUR);
        System.out.println("Minute: " + minute);
        
        // Get second
        int second = time.get(ChronoField.SECOND_OF_MINUTE);
        System.out.println("Second: " + second);
        
        // Get nano
        int nano = time.get(ChronoField.NANO_OF_SECOND);
        System.out.println("Nanosecond: " + nano);
        
        // Check AM/PM
        int ampm = time.get(ChronoField.AMPM_OF_DAY);
        System.out.println("AMPM: " + (ampm == 0 ? "AM" : "PM"));
    }
}

This example shows how to access time components using ChronoField.
The HOUR_OF_DAY provides 24-hour format while AMPM_OF_DAY
distinguishes between morning and afternoon. All time fields have defined ranges.

## Working with Date-Time Objects

ChronoField works with complete date-time objects like
LocalDateTime and ZonedDateTime. Both date and time
fields can be accessed from these objects.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime ldt = LocalDateTime.now();
        System.out.println("Current date-time: " + ldt);
        
        // Get combined fields
        int year = ldt.get(ChronoField.YEAR);
        int hour = ldt.get(ChronoField.HOUR_OF_DAY);
        System.out.printf("Year: %d, Hour: %d%n", year, hour);
        
        ZonedDateTime zdt = ZonedDateTime.now();
        System.out.println("Zoned date-time: " + zdt);
        
        // Get day of week (1-7)
        int dow = zdt.get(ChronoField.DAY_OF_WEEK);
        System.out.println("Day of week: " + dow);
        
        // Get epoch day
        long epochDay = zdt.getLong(ChronoField.EPOCH_DAY);
        System.out.println("Epoch day: " + epochDay);
    }
}

This example demonstrates using ChronoField with date-time objects.
Both date and time fields are accessible from the same object. Some fields like
EPOCH_DAY return long values instead of integers.

## Field Validation and Ranges

Each ChronoField has defined valid value ranges. These ranges can
be checked before accessing fields. The range() method provides
minimum and maximum values.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ValueRange;

public class Main {

    public static void main(String[] args) {
        
        // Get range for day of month
        ValueRange dayRange = ChronoField.DAY_OF_MONTH.range();
        System.out.println("Day of month range: " + dayRange);
        
        // Get range for month
        ValueRange monthRange = ChronoField.MONTH_OF_YEAR.range();
        System.out.println("Month range: " + monthRange);
        
        // Check if value is valid
        LocalDate date = LocalDate.of(2025, 2, 1);
        boolean valid = date.isSupported(ChronoField.DAY_OF_MONTH) &amp;&amp; 
                      date.range(ChronoField.DAY_OF_MONTH).isValidValue(30);
        System.out.println("Is 30 valid for February: " + valid);
        
        // Check hour range
        ValueRange hourRange = ChronoField.HOUR_OF_DAY.range();
        System.out.println("Hour range: " + hourRange);
    }
}

This example shows how to work with field ranges and validation. The
range() method returns minimum and maximum valid values.
isValidValue() checks if a specific value is valid for the field.

## Adjusting Temporal Objects

ChronoField can be used to adjust temporal objects. The
with() method creates a new object with the modified field.
This is useful for date-time manipulation.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 15);
        System.out.println("Original date: " + date);
        
        // Change year
        LocalDate newYear = date.with(ChronoField.YEAR, 2026);
        System.out.println("New year: " + newYear);
        
        // Change month
        LocalDate newMonth = date.with(ChronoField.MONTH_OF_YEAR, 12);
        System.out.println("New month: " + newMonth);
        
        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println("Original date-time: " + dateTime);
        
        // Change hour
        LocalDateTime newHour = dateTime.with(ChronoField.HOUR_OF_DAY, 23);
        System.out.println("New hour: " + newHour);
        
        // Change minute
        LocalDateTime newMinute = dateTime.with(ChronoField.MINUTE_OF_HOUR, 0);
        System.out.println("New minute: " + newMinute);
    }
}

This example demonstrates adjusting temporal objects using ChronoField.
The with() method returns a new object with the specified field
changed. Original objects remain immutable as per Java Time API design.

## Special Fields and Conversions

ChronoField includes special fields like EPOCH_DAY and
INSTANT_SECONDS for conversions. These fields enable working with
different time representations.

Main.java
  

package com.zetcode;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        // EPOCH_DAY example
        LocalDate date = LocalDate.of(2025, 1, 1);
        long epochDay = date.getLong(ChronoField.EPOCH_DAY);
        System.out.println("Epoch day: " + epochDay);
        
        // Convert back from epoch day
        LocalDate fromEpoch = LocalDate.ofEpochDay(epochDay);
        System.out.println("From epoch day: " + fromEpoch);
        
        // INSTANT_SECONDS example
        ZonedDateTime zdt = ZonedDateTime.now();
        long instantSeconds = zdt.getLong(ChronoField.INSTANT_SECONDS);
        System.out.println("Instant seconds: " + instantSeconds);
        
        // Convert back from instant seconds
        Instant instant = Instant.ofEpochSecond(instantSeconds);
        System.out.println("From instant seconds: " + instant);
    }
}

This example shows special fields for time conversions. EPOCH_DAY
represents days since 1970-01-01, while INSTANT_SECONDS represents
seconds since the same epoch. These fields enable interoperability between
different time representations.

## Source

[Java ChronoField Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoField.html)

In this article, we've covered the essential fields and features of the Java
ChronoField enum. Understanding these concepts is crucial for working with
date and time components in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).