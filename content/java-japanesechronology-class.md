+++
title = "Java JapaneseChronology Class"
date = 2025-08-29T19:58:11.211+01:00
draft = false
description = "Complete Java JapaneseChronology class tutorial covering all methods with examples. Learn about Japanese calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JapaneseChronology Class

Last modified: April 16, 2025

 

The java.time.chrono.JapaneseChronology class implements the
Japanese imperial calendar system. It extends the AbstractChronology
class and follows the era-based calendar used in Japan.

This chronology is based on the Japanese era system where each emperor's reign
defines a new era. The current era is Reiwa, which began on May 1, 2019.
JapaneseChronology handles all era transitions automatically.

## JapaneseChronology Class Overview

JapaneseChronology provides methods to create dates, handle eras,
and perform calendar calculations. It supports all standard chronology operations
while implementing Japanese-specific rules. The class is immutable and
thread-safe.

public final class JapaneseChronology extends AbstractChronology {
    public static JapaneseChronology INSTANCE;
    public JapaneseDate date(int prolepticYear, int month, int dayOfMonth);
    public JapaneseDate date(Era era, int yearOfEra, int month, int dayOfMonth);
    public JapaneseDate dateNow();
    public JapaneseDate dateNow(ZoneId zone);
    public JapaneseDate dateNow(Clock clock);
    public JapaneseEra eraOf(int eraValue);
    public List&lt;Era&gt; eras();
    public String getCalendarType();
    public String getId();
    public boolean isLeapYear(long prolepticYear);
    public int prolepticYear(Era era, int yearOfEra);
    public ValueRange range(ChronoField field);
}

The code above shows key methods of JapaneseChronology. These methods
allow creating Japanese dates, handling eras, and performing calendar operations.
The class provides full support for the Japanese calendar system.

## Creating Japanese Dates

Japanese dates can be created using various factory methods. Dates can be
specified using either proleptic years or era-based years. The chronology
handles all era transitions automatically.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseChronology;
import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Current date in Japanese calendar
        JapaneseDate today = JapaneseChronology.INSTANCE.dateNow();
        System.out.println("Today in Japanese calendar: " + today);
        
        // Specific date using proleptic year
        JapaneseDate date1 = JapaneseChronology.INSTANCE.date(2025, 4, 16);
        System.out.println("Date using proleptic year: " + date1);
        
        // Specific date using era and year of era
        JapaneseDate date2 = JapaneseChronology.INSTANCE.date(
            JapaneseEra.REIWA, 7, 4, 16);
        System.out.println("Date using era: " + date2);
        
        // Convert from LocalDate
        JapaneseDate date3 = JapaneseDate.from(LocalDate.of(2025, 4, 16));
        System.out.println("Converted from LocalDate: " + date3);
    }
}

This example demonstrates different ways to create JapaneseDate objects. The output
shows dates in Japanese calendar format including the era. The chronology handles
all era calculations automatically.

## Working with Japanese Eras

The Japanese calendar system uses eras based on imperial reigns. The
JapaneseChronology provides methods to access and work with these
eras. Each era has a numeric value and a name.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseChronology;
import java.time.chrono.JapaneseEra;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        
        // Get all available eras
        List&lt;JapaneseEra&gt; eras = JapaneseChronology.INSTANCE.eras();
        System.out.println("Available Japanese eras:");
        eras.forEach(era -&gt; System.out.println(era + ": " + era.getValue()));
        
        // Get specific era by value
        JapaneseEra heisei = JapaneseChronology.INSTANCE.eraOf(JapaneseEra.HEISEI.getValue());
        System.out.println("Heisei era: " + heisei);
        
        // Current era
        JapaneseEra currentEra = JapaneseDate.now().getEra();
        System.out.println("Current era: " + currentEra);
        
        // Era display name
        System.out.println("Reiwa display name: " + JapaneseEra.REIWA.getDisplayName(
            java.time.format.TextStyle.FULL, java.util.Locale.ENGLISH));
    }
}

This example shows how to work with Japanese eras. The chronology provides access
to all historical eras. Each era has a numeric value and display name in
different text styles.

## Date Calculations in Japanese Calendar

JapaneseChronology supports standard date calculations adjusted for
the Japanese calendar system. Operations like adding days or months respect the
era boundaries and calendar rules.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {
        
        JapaneseDate date = JapaneseDate.of(JapaneseEra.REIWA, 5, 4, 16);
        System.out.println("Original date: " + date);
        
        // Add days
        JapaneseDate plusDays = date.plusDays(10);
        System.out.println("Plus 10 days: " + plusDays);
        
        // Add months (may cross era boundary)
        JapaneseDate plusMonths = date.plusMonths(15);
        System.out.println("Plus 15 months: " + plusMonths);
        
        // Add years (may cross era boundary)
        JapaneseDate plusYears = date.plusYears(3);
        System.out.println("Plus 3 years: " + plusYears);
        
        // Calculate days between dates
        JapaneseDate anotherDate = JapaneseDate.of(JapaneseEra.REIWA, 6, 1, 1);
        long daysBetween = ChronoUnit.DAYS.between(date, anotherDate);
        System.out.println("Days between: " + daysBetween);
    }
}

This example demonstrates date calculations in the Japanese calendar. Operations
respect era boundaries and Japanese calendar rules. The chronology handles all
special cases like era transitions automatically.

## Converting Between Calendars

Japanese dates can be converted to and from other calendar systems like ISO.
This is useful when working with international systems while maintaining
Japanese calendar representation.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.chrono.JapaneseDate;

public class Main {

    public static void main(String[] args) {
        
        // Convert from ISO to Japanese
        LocalDate isoDate = LocalDate.of(2025, 4, 16);
        JapaneseDate japaneseDate = JapaneseDate.from(isoDate);
        System.out.println("ISO to Japanese: " + japaneseDate);
        
        // Convert from Japanese to ISO
        JapaneseDate jDate = JapaneseDate.of(JapaneseEra.REIWA, 7, 4, 16);
        LocalDate isoDate2 = LocalDate.from(jDate);
        System.out.println("Japanese to ISO: " + isoDate2);
        
        // Conversion with era transition
        JapaneseDate heiseiDate = JapaneseDate.of(JapaneseEra.HEISEI, 31, 4, 30);
        LocalDate transitionDate = LocalDate.from(heiseiDate);
        System.out.println("Heisei to ISO: " + transitionDate);
        System.out.println("Converted back: " + JapaneseDate.from(transitionDate));
    }
}

This example shows conversions between Japanese and ISO calendar systems. The
conversions handle era transitions correctly. Note that May 1, 2019 was the
transition from Heisei to Reiwa era.

## Leap Years and Validation

The Japanese calendar uses the same leap year rules as the Gregorian calendar.
JapaneseChronology provides methods to check for leap years and
validate dates according to Japanese calendar rules.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseChronology;
import java.time.chrono.JapaneseDate;

public class Main {

    public static void main(String[] args) {
        
        // Check leap year
        boolean isLeap2020 = JapaneseChronology.INSTANCE.isLeapYear(2020);
        System.out.println("Is 2020 a leap year? " + isLeap2020);
        
        // Valid date check
        try {
            JapaneseDate validDate = JapaneseDate.of(JapaneseEra.REIWA, 5, 2, 29);
            System.out.println("Valid date created: " + validDate);
        } catch (Exception e) {
            System.out.println("Invalid date: " + e.getMessage());
        }
        
        // Invalid date check
        try {
            JapaneseDate invalidDate = JapaneseDate.of(JapaneseEra.REIWA, 5, 2, 30);
            System.out.println(invalidDate);
        } catch (Exception e) {
            System.out.println("Invalid date: " + e.getMessage());
        }
        
        // Date range validation
        System.out.println("Maximum month length: " + 
            JapaneseChronology.INSTANCE.range(java.time.temporal.ChronoField.DAY_OF_MONTH));
    }
}

This example demonstrates leap year checking and date validation in the Japanese
calendar. The chronology follows Gregorian leap year rules. Invalid dates throw
DateTimeException with appropriate messages.

## Formatting Japanese Dates

Japanese dates can be formatted using DateTimeFormatter with
Japanese chronology. The formatter can display dates with era names in full or
abbreviated forms.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        JapaneseDate date = JapaneseDate.of(JapaneseEra.REIWA, 5, 4, 16);
        
        // Default formatting
        System.out.println("Default format: " + date);
        
        // Custom formatting
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("GGGG y年 M月 d日")
            .withChronology(JapaneseChronology.INSTANCE);
        System.out.println("Custom format: " + formatter1.format(date));
        
        // Localized formatting
        DateTimeFormatter formatter2 = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.FULL)
            .withLocale(Locale.JAPAN)
            .withChronology(JapaneseChronology.INSTANCE);
        System.out.println("Japanese format: " + formatter2.format(date));
        
        // English formatting
        DateTimeFormatter formatter3 = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.LONG)
            .withLocale(Locale.ENGLISH)
            .withChronology(JapaneseChronology.INSTANCE);
        System.out.println("English format: " + formatter3.format(date));
    }
}

This example shows different ways to format Japanese dates. The formatter can
display dates in various styles and locales. Japanese era names are automatically
handled according to the specified locale.

## Source

[Java JapaneseChronology Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/JapaneseChronology.html)

In this article, we've covered the essential methods and features of the Java
JapaneseChronology class. Understanding these concepts is crucial for working
with Japanese calendar dates in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).