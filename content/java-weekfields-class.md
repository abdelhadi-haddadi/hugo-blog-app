+++
title = "Java WeekFields Class"
date = 2025-08-29T20:00:44.464+01:00
draft = false
description = "Complete Java WeekFields class tutorial covering all methods with examples. Learn about week handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java WeekFields Class

Last modified: April 16, 2025

 

The java.time.temporal.WeekFields class defines the rules for
week-based calculations. It specifies how weeks are counted and how week-based
fields like week-of-year are determined. WeekFields is essential for locale-
specific week handling.

WeekFields is immutable and thread-safe. It provides access to
week-related temporal fields like week-of-month and week-of-year. The class
handles variations in week definitions across different regions and standards.

## WeekFields Class Overview

WeekFields provides methods to access week-based temporal fields.
Key components include the first day of week and minimal days in first week.
These settings affect week numbering in date calculations.

public final class WeekFields implements Serializable {
    public static WeekFields of(Locale locale);
    public static WeekFields of(DayOfWeek firstDayOfWeek, int minimalDays);
    public DayOfWeek getFirstDayOfWeek();
    public int getMinimalDaysInFirstWeek();
    public TemporalField dayOfWeek();
    public TemporalField weekOfMonth();
    public TemporalField weekOfYear();
    public TemporalField weekOfWeekBasedYear();
}

The code above shows key methods provided by WeekFields. These
methods allow creating week definitions and accessing week-related fields.
The class supports both ISO and locale-specific week definitions.

## Creating WeekFields Objects

WeekFields objects can be created using locale or explicit parameters. The
locale-based approach automatically uses regional week conventions. Explicit
creation allows custom week definitions.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        // Using locale (US starts week on Sunday)
        WeekFields usWeekFields = WeekFields.of(Locale.US);
        System.out.println("US first day: " + 
            usWeekFields.getFirstDayOfWeek());
        
        // Using ISO standard (Monday)
        WeekFields isoWeekFields = WeekFields.ISO;
        System.out.println("ISO first day: " + 
            isoWeekFields.getFirstDayOfWeek());
        
        // Custom week definition
        WeekFields customWeekFields = WeekFields.of(
            DayOfWeek.TUESDAY, 4);
        System.out.println("Custom first day: " + 
            customWeekFields.getFirstDayOfWeek());
    }
}

This example demonstrates different ways to create WeekFields objects. The US
locale uses Sunday as first day, while ISO uses Monday. Custom definitions
allow any day with specified minimal days in first week.

## Getting Week-Based Fields

WeekFields provides access to several week-related temporal fields. These fields
can be used with temporal objects to get week numbers. The fields include
week-of-year and week-of-month.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 1, 15);
        WeekFields weekFields = WeekFields.of(Locale.US);
        
        // Get week-based fields
        int weekOfYear = date.get(weekFields.weekOfYear());
        int weekOfMonth = date.get(weekFields.weekOfMonth());
        int dayOfWeek = date.get(weekFields.dayOfWeek());
        
        System.out.println("Week of year: " + weekOfYear);
        System.out.println("Week of month: " + weekOfMonth);
        System.out.println("Day of week: " + dayOfWeek);
    }
}

This example shows how to get week-based values from a LocalDate. The week
numbering depends on the WeekFields configuration. Day of week returns a
number from 1 to 7 based on first day of week.

## Comparing Week Definitions

Different locales and standards have varying week definitions. WeekFields makes
it easy to compare these differences. The same date can have different week
numbers under different systems.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 1, 1);
        
        // US week fields
        WeekFields usFields = WeekFields.of(Locale.US);
        int usWeek = date.get(usFields.weekOfYear());
        
        // ISO week fields
        WeekFields isoFields = WeekFields.ISO;
        int isoWeek = date.get(isoFields.weekOfYear());
        
        System.out.println("US week of year: " + usWeek);
        System.out.println("ISO week of year: " + isoWeek);
        
        // France uses Monday as first day
        WeekFields frFields = WeekFields.of(Locale.FRANCE);
        int frWeek = date.get(frFields.weekOfYear());
        System.out.println("France week of year: " + frWeek);
    }
}

This example compares week numbering between US, ISO, and French systems. The
same date (January 1, 2025) falls in different weeks depending on the definition.
ISO week numbers range from 1 to 53.

## Working With Week-Based Years

WeekFields supports week-based year calculations. A week-based year differs from
a standard calendar year. It's useful for applications that need week-based
reporting periods.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 1, 1);
        WeekFields weekFields = WeekFields.ISO;
        
        // Get week-based year
        int weekBasedYear = date.get(weekFields.weekBasedYear());
        int weekOfWeekBasedYear = date.get(
            weekFields.weekOfWeekBasedYear());
        
        System.out.println("Week-based year: " + weekBasedYear);
        System.out.println("Week of week-based year: " + 
            weekOfWeekBasedYear);
        
        // Edge case where dates belong to different week-based years
        LocalDate edgeDate = LocalDate.of(2024, 12, 31);
        int edgeYear = edgeDate.get(weekFields.weekBasedYear());
        System.out.println("Dec 31, 2024 week-based year: " + edgeYear);
    }
}

This example demonstrates week-based year calculations. The week-based year may
differ from the calendar year for dates in late December or early January. ISO
week-based years have either 52 or 53 weeks.

## Custom Week Definitions

WeekFields allows creating custom week definitions. This is useful for business
applications with non-standard week configurations. Custom definitions specify
first day and minimal days in first week.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.WeekFields;

public class Main {

    public static void main(String[] args) {
        
        // Custom week starting Wednesday with 5 days in first week
        WeekFields customFields = WeekFields.of(
            DayOfWeek.WEDNESDAY, 5);
        
        LocalDate date = LocalDate.of(2025, 1, 1);
        
        System.out.println("Custom week of year: " + 
            date.get(customFields.weekOfYear()));
        System.out.println("Custom day of week: " + 
            date.get(customFields.dayOfWeek()));
        
        // First week must have at least 5 days in this year
        LocalDate firstWeekDate = LocalDate.of(2025, 1, 7);
        System.out.println("Jan 7 week of year: " + 
            firstWeekDate.get(customFields.weekOfYear()));
    }
}

This example shows a custom week definition starting on Wednesday. The minimal
days parameter affects when the first week of the year begins. Custom week
definitions are useful for specialized business requirements.

## WeekFields With TemporalAdjusters

WeekFields can be combined with temporal adjusters for advanced date
manipulations. This allows operations like finding the first/last day of
week or jumping to specific weeks.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        WeekFields weekFields = WeekFields.of(Locale.US);
        LocalDate date = LocalDate.of(2025, 1, 15);
        
        // Adjust to first day of week (Sunday in US)
        LocalDate firstDay = date.with(
            TemporalAdjusters.previousOrSame(
                weekFields.getFirstDayOfWeek()));
        System.out.println("First day of week: " + firstDay);
        
        // Adjust to last day of week (Saturday in US)
        LocalDate lastDay = date.with(
            TemporalAdjusters.nextOrSame(
                DayOfWeek.SATURDAY));
        System.out.println("Last day of week: " + lastDay);
        
        // Jump to same week in next year
        int weekNumber = date.get(weekFields.weekOfYear());
        LocalDate nextYearSameWeek = date.plusYears(1)
            .with(weekFields.weekOfYear(), weekNumber);
        System.out.println("Same week next year: " + nextYearSameWeek);
    }
}

This example demonstrates combining WeekFields with temporal adjusters. The
operations include finding week boundaries and maintaining week numbers across
years. These techniques are useful for calendar applications and reporting.

## Source

[Java WeekFields Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/WeekFields.html)

In this article, we've covered the essential methods and features of the Java
WeekFields class. Understanding these concepts is crucial for accurate week
handling in internationalized Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).