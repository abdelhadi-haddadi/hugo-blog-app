+++
title = "Java DateTimeFormatterBuilder Class"
date = 2025-08-29T20:00:46.704+01:00
draft = false
description = "Complete Java DateTimeFormatterBuilder class tutorial with examples. Learn about custom date/time formatting in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DateTimeFormatterBuilder Class

Last modified: April 16, 2025

 

The java.time.format.DateTimeFormatterBuilder class provides a
flexible way to create custom date and time formatters. It allows precise
control over formatting patterns, text styles, and optional sections.

DateTimeFormatterBuilder is used when predefined formatters don't
meet requirements. It supports locale-sensitive formatting, padding, and
appending of literals. The builder pattern enables step-by-step formatter
construction.

## DateTimeFormatterBuilder Overview

The builder class provides methods to append various date/time components.
It can combine patterns, text styles, and literal values. The final formatter
is created by calling toFormatter().

public final class DateTimeFormatterBuilder {
    public DateTimeFormatterBuilder appendPattern(String pattern);
    public DateTimeFormatterBuilder appendValue(TemporalField field);
    public DateTimeFormatterBuilder appendText(TemporalField field, TextStyle style);
    public DateTimeFormatterBuilder appendLiteral(String literal);
    public DateTimeFormatterBuilder appendFraction(TemporalField field, 
        int minWidth, int maxWidth, boolean decimalPoint);
    public DateTimeFormatterBuilder optionalStart();
    public DateTimeFormatterBuilder optionalEnd();
    public DateTimeFormatter toFormatter();
}

The code shows key methods of DateTimeFormatterBuilder. These allow
building complex formatters from simple components. The builder can handle both
numeric and text representations of date/time fields.

## Basic Formatter Construction

This example demonstrates creating a simple formatter using the builder.
We'll combine different date components with literal text to create a custom
format. The formatter will display date in "Day, Month Year" format.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.TextStyle;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
            .appendText(java.time.temporal.ChronoField.DAY_OF_WEEK, TextStyle.FULL)
            .appendLiteral(", ")
            .appendText(java.time.temporal.ChronoField.MONTH_OF_YEAR, TextStyle.FULL)
            .appendLiteral(' ')
            .appendValue(java.time.temporal.ChronoField.YEAR)
            .toFormatter();
            
        LocalDate date = LocalDate.of(2025, 4, 16);
        String formatted = date.format(formatter);
        
        System.out.println("Formatted date: " + formatted);
    }
}

This code creates a formatter that produces output like "Wednesday, April 2025".
The builder appends full text for day and month, with literal commas and spaces.
The year is appended as a numeric value.

## Pattern-Based Formatting

The builder can incorporate pattern strings similar to SimpleDateFormat.
This example shows how to combine pattern-based formatting with builder methods.
We'll create a format with optional milliseconds.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
            .appendPattern("yyyy-MM-dd HH:mm:ss")
            .optionalStart()
            .appendLiteral('.')
            .appendFraction(java.time.temporal.ChronoField.MILLI_OF_SECOND, 3, 3, false)
            .optionalEnd()
            .toFormatter();
            
        LocalDateTime dateTime1 = LocalDateTime.of(2025, 4, 16, 14, 30, 45);
        LocalDateTime dateTime2 = LocalDateTime.of(2025, 4, 16, 14, 30, 45, 500_000_000);
        
        System.out.println("Without milliseconds: " + dateTime1.format(formatter));
        System.out.println("With milliseconds: " + dateTime2.format(formatter));
    }
}

This formatter handles both timestamps with and without milliseconds. The
optionalStart() and optionalEnd() methods make the
milliseconds section optional. The fraction is formatted with exactly 3 digits.

## Locale-Sensitive Formatting

This example demonstrates creating locale-specific formatters. We'll build a
formatter that displays month names according to the specified locale.
The same formatter will produce different output for different locales.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
            .appendValue(java.time.temporal.ChronoField.DAY_OF_MONTH)
            .appendLiteral(' ')
            .appendText(java.time.temporal.ChronoField.MONTH_OF_YEAR, TextStyle.FULL)
            .appendLiteral(' ')
            .appendValue(java.time.temporal.ChronoField.YEAR)
            .toFormatter();
            
        LocalDate date = LocalDate.of(2025, 4, 16);
        
        System.out.println("US format: " + 
            date.format(formatter.withLocale(Locale.US)));
        System.out.println("French format: " + 
            date.format(formatter.withLocale(Locale.FRENCH)));
        System.out.println("Japanese format: " + 
            date.format(formatter.withLocale(Locale.JAPANESE)));
    }
}

The output will show month names in different languages. For US locale it's
"16 April 2025", for French "16 avril 2025", and for Japanese "16 4月 2025".
The formatter automatically adapts to the specified locale.

## Padding and Alignment

The builder allows precise control over field padding and alignment.
This example shows how to create fixed-width numeric fields with padding.
We'll format a time with hours and minutes padded to 2 digits.

Main.java
  

package com.zetcode;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
            .appendValue(java.time.temporal.ChronoField.HOUR_OF_DAY, 2)
            .appendLiteral(':')
            .appendValue(java.time.temporal.ChronoField.MINUTE_OF_HOUR, 2)
            .toFormatter();
            
        LocalTime time1 = LocalTime.of(9, 5);
        LocalTime time2 = LocalTime.of(14, 30);
        
        System.out.println("Time 1: " + time1.format(formatter));
        System.out.println("Time 2: " + time2.format(formatter));
    }
}

The output will show times as "09:05" and "14:30" with consistent 2-digit
formatting. The second parameter to appendValue specifies the
minimum field width, with padding added as needed.

## Composite Formatters

This example demonstrates combining multiple formatters into one.
We'll create separate date and time formatters, then combine them with
a literal separator. This approach promotes reusability of formatter components.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter dateFormatter = new DateTimeFormatterBuilder()
            .appendPattern("MMM dd, yyyy")
            .toFormatter();
            
        DateTimeFormatter timeFormatter = new DateTimeFormatterBuilder()
            .appendPattern("hh:mm a")
            .toFormatter();
            
        DateTimeFormatter combinedFormatter = new DateTimeFormatterBuilder()
            .append(dateFormatter)
            .appendLiteral(" at ")
            .append(timeFormatter)
            .toFormatter();
            
        LocalDateTime dateTime = LocalDateTime.of(2025, 4, 16, 14, 30);
        System.out.println("Combined format: " + dateTime.format(combinedFormatter));
    }
}

The output will be in format like "Apr 16, 2025 at 02:30 PM". The example shows
how to build complex formatters from simpler components. Each sub-formatter can
be used independently or combined with others.

## Handling Different Calendars

This advanced example shows how to create a formatter for non-ISO calendars.
We'll build a formatter for the Japanese Imperial calendar system.
The formatter will display dates with Japanese era names.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.chrono.JapaneseDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
            .appendText(java.time.temporal.ChronoField.ERA, TextStyle.FULL)
            .appendLiteral(' ')
            .appendValue(java.time.temporal.ChronoField.YEAR_OF_ERA)
            .appendLiteral('年 ')
            .appendText(java.time.temporal.ChronoField.MONTH_OF_YEAR, TextStyle.FULL)
            .appendLiteral(' ')
            .appendValue(java.time.temporal.ChronoField.DAY_OF_MONTH)
            .appendLiteral('日')
            .toFormatter()
            .withLocale(Locale.JAPANESE);
            
        JapaneseDate japaneseDate = JapaneseDate.from(LocalDate.of(2025, 4, 16));
        System.out.println("Japanese date: " + japaneseDate.format(formatter));
    }
}

The output will show the date in Japanese format with era name. For 2025, this
would be "令和 7年 4月 16日". The formatter handles the Japanese calendar system
correctly, including proper era naming and ordering of components.

## Source

[Java DateTimeFormatterBuilder Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatterBuilder.html)

This tutorial covered the essential features of DateTimeFormatterBuilder.
With these techniques, you can create sophisticated date/time formatters tailored
to your specific requirements. The builder pattern provides flexibility beyond
standard formatting patterns.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).