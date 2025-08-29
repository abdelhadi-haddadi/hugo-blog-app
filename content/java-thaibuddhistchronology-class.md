+++
title = "Java ThaiBuddhistChronology Class"
date = 2025-08-29T19:58:13.469+01:00
draft = false
description = "Complete Java ThaiBuddhistChronology class tutorial covering all methods with examples. Learn about Thai Buddhist calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ThaiBuddhistChronology Class

Last modified: April 16, 2025

 

The java.time.chrono.ThaiBuddhistChronology class implements the
Thai Buddhist calendar system. This chronology is primarily used in Thailand.
It is a solar calendar with years counted since the birth of Buddha.

In the Thai Buddhist calendar, the year 2025 CE corresponds to 2568 BE
(Buddhist Era). The calendar shares the same month and day structure as
the ISO calendar but differs in year numbering.

## ThaiBuddhistChronology Class Overview

ThaiBuddhistChronology provides methods to create dates and times
according to the Thai Buddhist calendar. It implements the Chronology
interface and follows the same patterns as other chronology implementations.

public final class ThaiBuddhistChronology extends AbstractChronology {
    public static ThaiBuddhistChronology INSTANCE;
    public static ThaiBuddhistDate now();
    public static ThaiBuddhistDate now(ZoneId zone);
    public static ThaiBuddhistDate of(int prolepticYear, int month, int dayOfMonth);
    public static ThaiBuddhistDate from(TemporalAccessor temporal);
    public static ThaiBuddhistDate dateEpochDay(long epochDay);
    public int prolepticYear(Era era, int yearOfEra);
    public ThaiBuddhistEra eraOf(int eraValue);
    public List&lt;Era&gt; eras();
}

The code above shows key methods provided by ThaiBuddhistChronology.
These methods allow creating and converting dates in the Thai Buddhist calendar.
The chronology follows the same patterns as other Java time classes.

## Creating ThaiBuddhistDate Objects

Thai Buddhist dates can be created in several ways. The most common methods are
now for current date and factory methods for specific dates.
Conversion from ISO dates is also supported.

Main.java
  

package com.zetcode; 

import java.time.chrono.ThaiBuddhistDate;
import java.time.LocalDate;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {
        
        // Current date
        ThaiBuddhistDate now = ThaiBuddhistDate.now();
        System.out.println("Current Thai date: " + now);
        
        // Specific date
        ThaiBuddhistDate date = ThaiBuddhistDate.of(2568, 4, 16);
        System.out.println("Specific Thai date: " + date);
        
        // From ISO date
        ThaiBuddhistDate fromIso = ThaiBuddhistDate.from(LocalDate.now());
        System.out.println("From ISO date: " + fromIso);
        
        // With timezone
        ThaiBuddhistDate zoned = ThaiBuddhistDate.now(ZoneId.of("Asia/Bangkok"));
        System.out.println("In Bangkok: " + zoned);
    }
}

This example demonstrates different ways to create ThaiBuddhistDate objects.
The output shows dates in Thai Buddhist format. The year is 543 years ahead
of the ISO calendar year.

## Converting Between Calendars

Dates can be converted between Thai Buddhist and ISO calendars. This is useful
when working with systems that use different calendar systems.

Main.java
  

package com.zetcode; 

import java.time.chrono.ThaiBuddhistDate;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate thaiDate = ThaiBuddhistDate.now();
        System.out.println("Thai Buddhist date: " + thaiDate);
        
        // Convert to ISO
        LocalDate isoDate = LocalDate.from(thaiDate);
        System.out.println("ISO date: " + isoDate);
        
        // Convert back to Thai
        ThaiBuddhistDate backToThai = ThaiBuddhistDate.from(isoDate);
        System.out.println("Back to Thai: " + backToThai);
        
        // Compare years
        System.out.println("Thai year: " + thaiDate.get(ThaiBuddhistDate.YEAR));
        System.out.println("ISO year: " + isoDate.getYear());
    }
}

This example shows conversions between Thai Buddhist and ISO calendars.
The same day is represented in both systems with different year numbers.
The month and day components remain the same in both calendars.

## Working with Eras

The Thai Buddhist calendar has one era: BE (Buddhist Era). The
ThaiBuddhistEra enum represents this era. Era-related methods
are available for compatibility with other chronology implementations.

Main.java
  

package com.zetcode; 

import java.time.chrono.ThaiBuddhistDate;
import java.time.chrono.ThaiBuddhistEra;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate date = ThaiBuddhistDate.now();
        
        // Get era
        ThaiBuddhistEra era = date.getEra();
        System.out.println("Era: " + era);
        
        // Check era
        System.out.println("Is BE: " + (era == ThaiBuddhistEra.BE));
        
        // Create date with era
        ThaiBuddhistDate eraDate = ThaiBuddhistDate.of(era, 2568, 4, 16);
        System.out.println("Date with era: " + eraDate);
        
        // List available eras
        System.out.println("Available eras: " + 
            ThaiBuddhistChronology.INSTANCE.eras());
    }
}

This example demonstrates working with eras in the Thai Buddhist calendar.
The BE era is the only era in this system. Era methods are provided for
consistency with other chronology implementations.

## Date Arithmetic

Thai Buddhist dates support temporal arithmetic operations. These operations
work similarly to the ISO calendar but maintain the Thai Buddhist year count.

Main.java
  

package com.zetcode; 

import java.time.chrono.ThaiBuddhistDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate today = ThaiBuddhistDate.now();
        System.out.println("Today: " + today);
        
        // Add days
        ThaiBuddhistDate tomorrow = today.plus(1, ChronoUnit.DAYS);
        System.out.println("Tomorrow: " + tomorrow);
        
        // Add months
        ThaiBuddhistDate nextMonth = today.plus(1, ChronoUnit.MONTHS);
        System.out.println("Next month: " + nextMonth);
        
        // Add years
        ThaiBuddhistDate nextYear = today.plus(1, ChronoUnit.YEARS);
        System.out.println("Next year: " + nextYear);
        
        // Subtract weeks
        ThaiBuddhistDate lastWeek = today.minus(1, ChronoUnit.WEEKS);
        System.out.println("Last week: " + lastWeek);
    }
}

This example shows various temporal arithmetic operations with Thai Buddhist dates.
The operations maintain the Thai Buddhist year count while adjusting the date.
All standard temporal units are supported.

## Formatting and Parsing

Thai Buddhist dates can be formatted and parsed using DateTimeFormatter.
The formatter can be configured to display dates according to Thai conventions.

Main.java
  

package com.zetcode; 

import java.time.chrono.ThaiBuddhistDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate date = ThaiBuddhistDate.now();
        
        // Default format
        System.out.println("Default format: " + date);
        
        // Format with pattern
        DateTimeFormatter patternFormat = 
            DateTimeFormatter.ofPattern("G yyyy-MM-dd");
        System.out.println("Pattern format: " + date.format(patternFormat));
        
        // Localized format
        DateTimeFormatter thaiFormat = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.FULL)
            .withLocale(new Locale("th", "TH"))
            .withChronology(ThaiBuddhistChronology.INSTANCE);
        System.out.println("Thai format: " + date.format(thaiFormat));
        
        // Parse from string
        ThaiBuddhistDate parsed = ThaiBuddhistDate.parse("BE 2568-04-16");
        System.out.println("Parsed date: " + parsed);
    }
}

This example demonstrates formatting and parsing Thai Buddhist dates.
Localized formatting shows the date in Thai language and conventions.
The parser can read dates in various formats.

## Comparing Dates

Thai Buddhist dates can be compared using standard comparison methods.
The comparison considers the complete date including year, month, and day.

Main.java
  

package com.zetcode; 

import java.time.chrono.ThaiBuddhistDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        ThaiBuddhistDate today = ThaiBuddhistDate.now();
        ThaiBuddhistDate tomorrow = today.plus(1, ChronoUnit.DAYS);
        ThaiBuddhistDate yesterday = today.minus(1, ChronoUnit.DAYS);
        
        // Comparison methods
        System.out.println("Is today before tomorrow? " + today.isBefore(tomorrow));
        System.out.println("Is today after yesterday? " + today.isAfter(yesterday));
        System.out.println("Compare today and tomorrow: " + today.compareTo(tomorrow));
        
        // Equality check
        System.out.println("Is today equal to now? " + 
            today.equals(ThaiBuddhistDate.now()));
    }
}

This example shows various ways to compare Thai Buddhist dates.
The comparison methods work similarly to other Java time classes.
Equality requires all date components to match exactly.

## Source

[Java ThaiBuddhistChronology Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/ThaiBuddhistChronology.html)

In this article, we've covered the essential methods and features of the Java
ThaiBuddhistChronology class. Understanding these concepts is crucial for
working with dates in Thailand and other regions using this calendar system.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).