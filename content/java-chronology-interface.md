+++
title = "Java Chronology Interface"
date = 2025-08-29T19:58:08.925+01:00
draft = false
description = "Complete Java Chronology interface tutorial covering all methods with examples. Learn about calendar systems in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Chronology Interface

Last modified: April 16, 2025

 

The java.time.chrono.Chronology interface represents a calendar system
used to organize and identify dates. It provides rules for calculating dates in
different calendar systems beyond the standard ISO-8601 calendar.

Chronology is implemented by various calendar systems like ThaiBuddhist,
Hijrah, and Japanese. It allows working with dates in non-Gregorian calendars.
The interface provides methods to create dates and query calendar properties.

## Chronology Interface Overview

Chronology defines methods to create date objects, determine calendar
properties, and convert between calendar systems. It serves as the abstract base
for all calendar systems in the Java time API.

public interface Chronology extends Comparable&lt;Chronology&gt; {
    String getId();
    String getCalendarType();
    ChronoLocalDate date(int prolepticYear, int month, int dayOfMonth);
    ChronoLocalDate dateEpochDay(long epochDay);
    ChronoLocalDate dateNow();
    boolean isLeapYear(long prolepticYear);
    int prolepticYear(Era era, int yearOfEra);
    Era eraOf(int eraValue);
    List&lt;Era&gt; eras();
    ValueRange range(ChronoField field);
}

The code above shows key methods of the Chronology interface. These
methods allow creating dates, checking leap years, and accessing calendar eras.
Each calendar system provides its own implementation of these methods.

## Getting Available Chronologies

Java provides several built-in chronology implementations. We can list all
available chronologies using the getAvailableChronologies method.
This helps discover supported calendar systems.

Main.java
  

package com.zetcode;

import java.time.chrono.Chronology;
import java.util.Set;

public class Main {

    public static void main(String[] args) {
        
        // Get all available chronologies
        Set&lt;Chronology&gt; chronologies = Chronology.getAvailableChronologies();
        
        System.out.println("Available calendar systems:");
        for (Chronology chrono : chronologies) {
            System.out.println(chrono.getId() + " - " + chrono.getCalendarType());
        }
        
        // Get default ISO chronology
        Chronology iso = Chronology.of("ISO");
        System.out.println("\nDefault chronology: " + iso.getId());
    }
}

This example lists all available calendar systems in the JVM. The output typically
includes ISO, ThaiBuddhist, Hijrah, and Japanese calendars. The ISO chronology
is the default Gregorian calendar system.

## Creating Dates in Different Calendars

Each chronology can create date objects specific to its calendar system. The
date method creates dates using year, month, and day values.
Dates can also be created from epoch days.

Main.java
  

package com.zetcode;

import java.time.chrono.Chronology;
import java.time.chrono.JapaneseDate;
import java.time.chrono.ThaiBuddhistDate;

public class Main {

    public static void main(String[] args) {
        
        // Create ISO date
        Chronology iso = Chronology.of("ISO");
        var isoDate = iso.date(2025, 4, 15);
        System.out.println("ISO date: " + isoDate);
        
        // Create Japanese date
        Chronology japanese = Chronology.of("Japanese");
        var japaneseDate = japanese.date(2025, 4, 15);
        System.out.println("Japanese date: " + japaneseDate);
        
        // Create Thai Buddhist date
        var thaiDate = ThaiBuddhistDate.now();
        System.out.println("Thai Buddhist date: " + thaiDate);
        
        // Create date from epoch day
        var epochDate = iso.dateEpochDay(10000);
        System.out.println("Date from epoch day: " + epochDate);
    }
}

This example demonstrates creating dates in different calendar systems. Note how
the same year/month/day values produce different dates in different calendars.
The dateEpochDay method creates dates from days since 1970-01-01.

## Working with Calendar Eras

Many calendar systems use eras to divide time into periods. The Chronology
interface provides methods to work with these eras. Each calendar defines its own
era system.

Main.java
  

package com.zetcode;

import java.time.chrono.Chronology;
import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;
import java.time.chrono.ThaiBuddhistDate;

public class Main {

    public static void main(String[] args) {
        
        // Get eras for Japanese calendar
        Chronology japanese = Chronology.of("Japanese");
        System.out.println("Japanese eras:");
        japanese.eras().forEach(era -&gt; System.out.println(era));
        
        // Create date in specific era
        JapaneseDate jdate = JapaneseDate.of(JapaneseEra.HEISEI, 30, 4, 15);
        System.out.println("\nHeisei era date: " + jdate);
        
        // Convert between era year and proleptic year
        int prolepticYear = japanese.prolepticYear(JapaneseEra.HEISEI, 30);
        System.out.println("Proleptic year: " + prolepticYear);
        
        // Get era of a date
        var thaiDate = ThaiBuddhistDate.now();
        System.out.println("\nThai Buddhist era: " + thaiDate.getEra());
    }
}

This example shows how to work with calendar eras. The Japanese calendar has
multiple eras representing imperial reigns. The prolepticYear
method converts between era years and continuous year counts.

## Checking Leap Years

Different calendar systems have different rules for leap years. The
isLeapYear method checks if a year is a leap year according to
the chronology's rules.

Main.java
  

package com.zetcode;

import java.time.chrono.Chronology;
import java.time.chrono.HijrahChronology;
import java.time.chrono.ThaiBuddhistChronology;

public class Main {

    public static void main(String[] args) {
        
        // Check leap years in different calendars
        Chronology iso = Chronology.of("ISO");
        System.out.println("ISO 2024 is leap: " + iso.isLeapYear(2024));
        
        Chronology thai = ThaiBuddhistChronology.INSTANCE;
        System.out.println("Thai 2567 is leap: " + thai.isLeapYear(2567));
        
        Chronology hijrah = HijrahChronology.INSTANCE;
        System.out.println("Hijrah 1445 is leap: " + hijrah.isLeapYear(1445));
        
        // Range of valid years
        System.out.println("\nISO year range: " + iso.range(ChronoField.YEAR));
    }
}

This example demonstrates leap year checks in different calendar systems. Note
that the same year may be a leap year in one calendar but not in another. The
range method shows valid year values for each calendar.

## Converting Between Calendars

Dates can be converted between different calendar systems. This is useful for
displaying dates in multiple calendar formats or working with legacy systems.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.JapaneseDate;
import java.time.chrono.ThaiBuddhistDate;

public class Main {

    public static void main(String[] args) {
        
        // Convert ISO to other calendars
        LocalDate isoDate = LocalDate.of(2025, 4, 15);
        System.out.println("ISO date: " + isoDate);
        
        JapaneseDate japaneseDate = JapaneseDate.from(isoDate);
        System.out.println("Japanese date: " + japaneseDate);
        
        ThaiBuddhistDate thaiDate = ThaiBuddhistDate.from(isoDate);
        System.out.println("Thai Buddhist date: " + thaiDate);
        
        // Convert back to ISO
        LocalDate backFromJapanese = LocalDate.from(japaneseDate);
        System.out.println("\nBack to ISO from Japanese: " + backFromJapanese);
        
        // ChronoLocalDate operations
        ChronoLocalDate chronoDate = thaiDate;
        System.out.println("Day of week: " + chronoDate.get(ChronoField.DAY_OF_WEEK));
    }
}

This example shows conversions between ISO and other calendar systems. The
from method performs the conversion, while ChronoLocalDate
provides common operations. All conversions maintain the same point in time.

## Formatting Chronology Dates

Dates from different chronologies can be formatted using DateTimeFormatter.
The formatter can use chronology-specific patterns and locale settings.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseDate;
import java.time.chrono.ThaiBuddhistDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        // Format Japanese date
        JapaneseDate jdate = JapaneseDate.now();
        DateTimeFormatter jformatter = DateTimeFormatter
            .ofPattern("GGGG y年 M月 d日")
            .withLocale(Locale.JAPANESE);
        System.out.println("Japanese formatted: " + jformatter.format(jdate));
        
        // Format Thai Buddhist date
        ThaiBuddhistDate tdate = ThaiBuddhistDate.now();
        DateTimeFormatter tformatter = DateTimeFormatter
            .ofPattern("G y年 M月 d日")
            .withLocale(new Locale("th", "TH"));
        System.out.println("Thai formatted: " + tformatter.format(tdate));
        
        // Parse date in different chronology
        String text = "令和 7年 4月 15日";
        JapaneseDate parsed = JapaneseDate.parse(text, jformatter);
        System.out.println("\nParsed Japanese date: " + parsed);
    }
}

This example demonstrates formatting and parsing dates in different calendar
systems. The formatter uses locale-specific patterns and era names. Note the
use of GGGG for full era names in Japanese dates.

## Source

[Java Chronology Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/Chronology.html)

In this article, we've covered the essential methods and features of the Java
Chronology interface. Understanding these concepts is crucial for working with
multiple calendar systems in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).