+++
title = "Java DayOfWeek Enum"
date = 2025-08-29T20:00:47.856+01:00
draft = false
description = "Complete Java DayOfWeek enum tutorial covering all methods with examples. Learn about day handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DayOfWeek Enum

Last modified: April 16, 2025

 

The java.time.DayOfWeek enum represents the seven days of the week.
It is part of the Java 8 Date and Time API. Each enum constant has an int value
from 1 (Monday) to 7 (Sunday).

DayOfWeek is immutable and thread-safe. It provides methods to get
the day's name, numeric value, and perform calculations. The enum follows the
ISO-8601 standard where Monday is the first day of the week.

## DayOfWeek Enum Overview

DayOfWeek provides methods to work with days of the week. Key
operations include getting values, comparing days, and performing arithmetic.
The enum constants are self-descriptive and easy to use.

public enum DayOfWeek implements TemporalAccessor, TemporalAdjuster {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
    
    public int getValue();
    public String getDisplayName(TextStyle style, Locale locale);
    public DayOfWeek plus(long days);
    public DayOfWeek minus(long days);
    public static DayOfWeek of(int dayOfWeek);
    public static DayOfWeek from(TemporalAccessor temporal);
}

The code above shows key methods provided by DayOfWeek. These
methods allow creating, comparing, and manipulating days of the week. The enum
follows international standards for week representation.

## Getting DayOfWeek Constants

DayOfWeek constants can be accessed directly or created from numeric values.
Each constant corresponds to a specific day with Monday as 1 and Sunday as 7.
This matches the ISO-8601 standard.

Main.java
  

package com.zetcode; 

import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {
        
        // Access enum constants directly
        DayOfWeek monday = DayOfWeek.MONDAY;
        System.out.println("Monday: " + monday);
        
        // Create from numeric value (1-7)
        DayOfWeek friday = DayOfWeek.of(5);
        System.out.println("Friday: " + friday);
        
        // Get numeric value of a day
        int sundayValue = DayOfWeek.SUNDAY.getValue();
        System.out.println("Sunday value: " + sundayValue);
        
        // Get from LocalDate
        DayOfWeek today = java.time.LocalDate.now().getDayOfWeek();
        System.out.println("Today is: " + today);
    }
}

This example demonstrates different ways to get DayOfWeek constants. The output
shows both the enum name and its numeric value. The of method
throws an exception for values outside 1-7 range.

## Displaying Day Names

DayOfWeek provides localized display names through the getDisplayName
method. This is useful for user interfaces where localized day names are needed.
The style parameter controls abbreviation length.

Main.java
  

package com.zetcode; 

import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        DayOfWeek day = DayOfWeek.WEDNESDAY;
        
        // Full name in default locale
        String fullName = day.getDisplayName(TextStyle.FULL, Locale.getDefault());
        System.out.println("Full name: " + fullName);
        
        // Short name in English
        String shortName = day.getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
        System.out.println("Short name: " + shortName);
        
        // Narrow name in French
        String narrowName = day.getDisplayName(TextStyle.NARROW, Locale.FRENCH);
        System.out.println("Narrow name: " + narrowName);
        
        // All styles for Sunday in German
        DayOfWeek sunday = DayOfWeek.SUNDAY;
        System.out.println("German Sunday:");
        System.out.println("FULL: " + sunday.getDisplayName(TextStyle.FULL, Locale.GERMAN));
        System.out.println("SHORT: " + sunday.getDisplayName(TextStyle.SHORT, Locale.GERMAN));
        System.out.println("NARROW: " + sunday.getDisplayName(TextStyle.NARROW, Locale.GERMAN));
    }
}

This example shows how to display day names in different locales and styles.
TextStyle.FULL gives the complete name, SHORT gives abbreviation, and NARROW
gives minimal representation. The output varies by locale settings.

## Day Arithmetic

DayOfWeek supports arithmetic operations through plus and
minus methods. These operations wrap around when crossing week
boundaries. The methods are useful for calculating future or past days.

Main.java
  

package com.zetcode; 

import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {

        DayOfWeek wednesday = DayOfWeek.WEDNESDAY;
        
        // Add days (wraps around)
        DayOfWeek nextDay = wednesday.plus(1);
        System.out.println("Next day: " + nextDay);
        
        // Subtract days (wraps around)
        DayOfWeek previousDay = wednesday.minus(1);
        System.out.println("Previous day: " + previousDay);
        
        // Add multiple weeks (no change)
        DayOfWeek sameDay = wednesday.plus(14);
        System.out.println("Two weeks later: " + sameDay);
        
        // Complex calculation
        DayOfWeek result = wednesday.plus(3).minus(10);
        System.out.println("Complex calculation: " + result);
    }
}

This example demonstrates day arithmetic with DayOfWeek. Adding 1 day to Sunday
returns Monday, and subtracting 1 from Monday returns Sunday. Adding multiples
of 7 returns the same day of the week.

## Comparing Days

DayOfWeek implements Comparable, allowing days to be compared chronologically.
The comparison is based on their ISO-8601 order (Monday=1 to Sunday=7). This is
useful for sorting or determining day sequences.

Main.java
  

package com.zetcode; 

import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {

        DayOfWeek monday = DayOfWeek.MONDAY;
        DayOfWeek friday = DayOfWeek.FRIDAY;
        DayOfWeek sunday = DayOfWeek.SUNDAY;
        
        // Compare days
        System.out.println("Monday before Friday: " + (monday.compareTo(friday) &lt; 0));
        System.out.println("Friday after Sunday: " + (friday.compareTo(sunday) &gt; 0));
        
        // Using equals
        System.out.println("Monday equals Monday: " + monday.equals(DayOfWeek.MONDAY));
        
        // Using == (safe for enums)
        System.out.println("Friday is Friday: " + (friday == DayOfWeek.FRIDAY));
        
        // Between check
        DayOfWeek wednesday = DayOfWeek.WEDNESDAY;
        System.out.println("Wednesday between Monday and Friday: " + 
            (wednesday.compareTo(monday) &gt; 0 &amp;&amp;  wednesday.compareTo(friday) &lt; 0));
    }
}

This example shows various ways to compare DayOfWeek values. The compareTo
method returns negative, zero, or positive based on day order. For equality,
either equals or == can be used since enums are singletons.

## Using with TemporalAdjusters

DayOfWeek works with TemporalAdjusters for complex date calculations. This is
useful for finding specific days like "next Tuesday" or "last Friday of month".
The API provides several built-in adjusters.

Main.java
  

package com.zetcode; 

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

public class Main {

    public static void main(String[] args) {

        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);
        
        // Next Tuesday
        LocalDate nextTuesday = today.with(TemporalAdjusters.next(DayOfWeek.TUESDAY));
        System.out.println("Next Tuesday: " + nextTuesday);
        
        // Previous Friday
        LocalDate lastFriday = today.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
        System.out.println("Previous Friday: " + lastFriday);
        
        // First Monday of next month
        LocalDate firstMondayNextMonth = today.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY))
                                           .plusMonths(1);
        System.out.println("First Monday next month: " + firstMondayNextMonth);
        
        // Last day of current month
        LocalDate lastDay = today.with(TemporalAdjusters.lastDayOfMonth());
        DayOfWeek lastDayOfWeek = lastDay.getDayOfWeek();
        System.out.println("Last day of month is: " + lastDayOfWeek);
    }
}

This example demonstrates using DayOfWeek with TemporalAdjusters. The adjusters
provide powerful date manipulation capabilities. They can find specific days
relative to other dates while handling month boundaries correctly.

## Switch Statements with DayOfWeek

DayOfWeek works well with switch statements for day-specific logic. The enum
constants make the code more readable than using numeric values. This pattern
is common in business logic implementations.

Main.java
  

package com.zetcode; 

import java.time.DayOfWeek;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {

        DayOfWeek today = LocalDate.now().getDayOfWeek();
        
        // Switch on DayOfWeek
        switch (today) {
            case MONDAY:
                System.out.println("Start of work week");
                break;
            case FRIDAY:
                System.out.println("Almost weekend!");
                break;
            case SATURDAY: case SUNDAY:
                System.out.println("Weekend!");
                break;
            default:
                System.out.println("Midweek day");
        }
        
        // Enhanced switch (Java 12+)
        String message = switch (today) {
            case MONDAY -&gt; "Monday blues";
            case FRIDAY -&gt; "TGIF!";
            case SATURDAY, SUNDAY -&gt; "Weekend vibes";
            default -&gt; "Regular work day";
        };
        System.out.println("Message: " + message);
    }
}

This example shows two ways to use DayOfWeek in switch statements. The
traditional switch works in all Java versions, while the enhanced switch
requires Java 12+. The enum makes the code more expressive than numeric checks.

## Source

[Java DayOfWeek Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/DayOfWeek.html)

In this article, we've covered the essential methods and features of the Java
DayOfWeek enum. Understanding these concepts is crucial for working with dates
and weeks in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).