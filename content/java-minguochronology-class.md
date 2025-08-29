+++
title = "Java MinguoChronology Class"
date = 2025-08-29T19:58:12.345+01:00
draft = false
description = "Complete Java MinguoChronology class tutorial covering all methods with examples. Learn about Minguo calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MinguoChronology Class

Last modified: April 16, 2025

 

The java.time.chrono.MinguoChronology class implements the Minguo
calendar system used in Taiwan. It is an alternative chronology to ISO-8601.
The Minguo era starts from 1912, the year of the founding of the Republic of
China.

MinguoChronology is immutable and thread-safe. It follows the same
rules as ISO calendar but with year numbering offset by 1911. For example,
Minguo year 1 corresponds to 1912 CE. The class provides methods to convert
between Minguo and ISO dates.

## MinguoChronology Class Overview

MinguoChronology provides methods to create Minguo dates, perform
calculations, and convert between chronologies. Key operations include date
creation, field access, and chronological comparisons. The class handles
proleptic years before the Minguo era.

public final class MinguoChronology extends AbstractChronology {
    public static MinguoChronology INSTANCE;
    public MinguoDate date(int prolepticYear, int month, int dayOfMonth);
    public MinguoDate dateYearDay(int prolepticYear, int dayOfYear);
    public MinguoDate dateEpochDay(long epochDay);
    public MinguoDate dateNow();
    public MinguoDate dateNow(ZoneId zone);
    public MinguoDate dateNow(Clock clock);
    public MinguoDate date(TemporalAccessor temporal);
    public int prolepticYear(Era era, int yearOfEra);
    public MinguoEra eraOf(int eraValue);
    public List&lt;Era&gt; eras();
    public boolean isLeapYear(long prolepticYear);
    public int getCalendarType();
}

The code above shows key methods provided by MinguoChronology.
These methods allow creating Minguo dates, converting between eras, and checking
leap years. The class follows the same date rules as ISO but with different
year numbering.

## Creating Minguo Dates

Minguo dates can be created in several ways using the chronology instance.
The most common methods are date for specific dates and
dateNow for current dates. All dates are created in the Minguo
calendar system.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoChronology;
import java.time.chrono.MinguoDate;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Current Minguo date
        MinguoDate today = MinguoChronology.INSTANCE.dateNow();
        System.out.println("Today in Minguo: " + today);
        
        // Specific Minguo date (year 112 = 2023 CE)
        MinguoDate date1 = MinguoChronology.INSTANCE.date(112, 4, 15);
        System.out.println("Specific Minguo date: " + date1);
        
        // From ISO date
        MinguoDate fromIso = MinguoDate.from(LocalDate.of(2023, 4, 15));
        System.out.println("From ISO date: " + fromIso);
        
        // Year-day date
        MinguoDate yearDay = MinguoChronology.INSTANCE.dateYearDay(112, 105);
        System.out.println("Year-day date: " + yearDay);
    }
}

This example demonstrates different ways to create MinguoDate objects. Note that
Minguo years are offset by 1911 from ISO years. The output shows dates in
Minguo calendar format (year-month-day).

## Converting Between Minguo and ISO

Minguo dates can be converted to and from ISO dates. These conversions are
essential when working with systems that use different calendar systems.
The conversion preserves the same day in both calendars.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.chrono.MinguoDate;

public class Main {

    public static void main(String[] args) {

        // Convert ISO to Minguo
        LocalDate isoDate = LocalDate.of(2023, 4, 15);
        MinguoDate minguoDate = MinguoDate.from(isoDate);
        System.out.println("ISO 2023-04-15 → Minguo: " + minguoDate);
        
        // Convert Minguo to ISO
        LocalDate backToIso = LocalDate.from(minguoDate);
        System.out.println("Minguo " + minguoDate + " → ISO: " + backToIso);
        
        // Proleptic year conversion
        int minguoYear = minguoDate.getChronology().prolepticYear(
            minguoDate.getEra(), minguoDate.getYearOfEra());
        System.out.println("Proleptic year: " + minguoYear);
        
        // Year difference
        System.out.println("Minguo year 112 = ISO year " + (112 + 1911));
    }
}

This example shows conversions between Minguo and ISO dates. The year offset
is consistently applied in both directions. Note that proleptic years handle
dates before the Minguo era (before 1912 CE).

## Working with Minguo Date Fields

MinguoDate provides access to date fields similar to LocalDate. The fields
follow Minguo calendar rules but can be accessed using standard temporal
interfaces. This allows consistent date handling across calendar systems.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {

        MinguoDate date = MinguoDate.of(112, 4, 15);
        
        // Get date components
        System.out.println("Year: " + date.get(ChronoField.YEAR_OF_ERA));
        System.out.println("Month: " + date.getMonthValue());
        System.out.println("Day: " + date.getDayOfMonth());
        
        // Era information
        System.out.println("Era: " + date.getEra());
        System.out.println("Is leap year: " + date.isLeapYear());
        
        // Day of year/week
        System.out.println("Day of year: " + date.getDayOfYear());
        System.out.println("Day of week: " + date.getDayOfWeek());
    }
}

This example demonstrates accessing various fields of a MinguoDate. The fields
work similarly to LocalDate but reflect Minguo calendar values. Leap year
calculation follows the same rules as ISO calendar.

## Minguo Date Arithmetic

MinguoDate supports temporal arithmetic through plus and
minus methods. These operations follow Minguo calendar rules
while maintaining consistency with ISO date calculations.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        MinguoDate date = MinguoDate.of(112, 4, 15);
        
        // Add days
        MinguoDate plusDays = date.plusDays(10);
        System.out.println("Plus 10 days: " + plusDays);
        
        // Subtract months
        MinguoDate minusMonths = date.minusMonths(2);
        System.out.println("Minus 2 months: " + minusMonths);
        
        // Add years
        MinguoDate plusYears = date.plusYears(1);
        System.out.println("Plus 1 year: " + plusYears);
        
        // Using ChronoUnit
        MinguoDate plusWeeks = date.plus(2, ChronoUnit.WEEKS);
        System.out.println("Plus 2 weeks: " + plusWeeks);
    }
}

This example shows various temporal arithmetic operations on MinguoDate. The
calculations handle month lengths and leap years correctly according to Minguo
calendar rules. All operations return new immutable MinguoDate instances.

## Comparing Minguo Dates

MinguoDate implements Comparable and provides methods for date
comparisons. These operations are essential for date-based logic in
applications using the Minguo calendar system.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;

public class Main {

    public static void main(String[] args) {

        MinguoDate date1 = MinguoDate.of(112, 4, 15);
        MinguoDate date2 = MinguoDate.of(112, 5, 20);
        MinguoDate date3 = MinguoDate.of(111, 12, 31);
        
        // Comparison methods
        System.out.println("Is date1 before date2? " + date1.isBefore(date2));
        System.out.println("Is date1 after date3? " + date1.isAfter(date3));
        
        // CompareTo
        System.out.println("Compare date1 and date2: " + date1.compareTo(date2));
        
        // Equality
        MinguoDate sameDate = MinguoDate.of(112, 4, 15);
        System.out.println("Is date1 equal to sameDate? " + date1.equals(sameDate));
        
        // Between dates
        long daysBetween = date1.until(date2, java.time.temporal.ChronoUnit.DAYS);
        System.out.println("Days between date1 and date2: " + daysBetween);
    }
}

This example demonstrates various ways to compare MinguoDate objects. The
comparison methods consider year, month, and day components. The
until method calculates time between dates in specified units.

## Formatting and Parsing Minguo Dates

Minguo dates can be formatted and parsed using DateTimeFormatter. The formatter
can be configured to display Minguo-specific era and year information while
maintaining compatibility with standard date patterns.

Main.java
  

package com.zetcode; 

import java.time.chrono.MinguoDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        MinguoDate date = MinguoDate.of(112, 4, 15);
        
        // Default formatting
        System.out.println("Default format: " + date);
        
        // Localized formatting
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.FULL)
            .withLocale(Locale.TAIWAN);
        System.out.println("Taiwan locale: " + date.format(formatter));
        
        // Custom pattern
        DateTimeFormatter customFormatter = DateTimeFormatter
            .ofPattern("GGGG y年 M月 d日")
            .withChronology(MinguoChronology.INSTANCE);
        System.out.println("Custom format: " + date.format(customFormatter));
        
        // Parsing
        MinguoDate parsed = MinguoDate.parse("Minguo 112-04-15");
        System.out.println("Parsed date: " + parsed);
    }
}

This example shows formatting and parsing of Minguo dates. The formatters can
display era information and localized month names. Note that Taiwan locale
typically uses Minguo calendar for date display.

## Source

[Java MinguoChronology Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/MinguoChronology.html)

In this article, we've covered the essential methods and features of the Java
MinguoChronology class. Understanding these concepts is crucial for working
with dates in Taiwan's official calendar system.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).