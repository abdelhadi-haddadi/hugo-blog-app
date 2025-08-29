+++
title = "Java ResolverStyle Enum"
date = 2025-08-29T20:00:52.295+01:00
draft = false
description = "Complete Java ResolverStyle enum tutorial covering all methods with examples. Learn about date-time parsing in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ResolverStyle Enum

Last modified: April 16, 2025

 

The java.time.format.ResolverStyle enum controls how date and time
parsing handles conflicts and ambiguities. It is part of the Java 8 Date and Time
API. The enum defines three styles: STRICT, SMART, and LENIENT.

ResolverStyle determines how date-time parsing resolves fields into values. It
affects validation during parsing. The choice of style impacts whether invalid
dates are rejected or adjusted. This is crucial for robust date-time handling.

## ResolverStyle Enum Overview

The ResolverStyle enum provides three parsing strategies. STRICT follows exact
calendar rules. SMART makes sensible adjustments. LENIENT allows any value with
overflow handling. Each style serves different use cases in applications.

public enum ResolverStyle {
    STRICT,
    SMART,
    LENIENT
}

The code shows the simple enum definition. Despite its simplicity, it has
significant impact on parsing behavior. The style is typically set on a
DateTimeFormatter before parsing operations.

## STRICT ResolverStyle

STRICT mode validates all fields strictly against their valid ranges. It rejects
any values outside these ranges. This is useful when input must be exactly
correct according to calendar rules.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter strictFormatter = DateTimeFormatter.ofPattern("uuuu-MM-dd")
            .withResolverStyle(ResolverStyle.STRICT);
        
        // Valid date
        LocalDate validDate = LocalDate.parse("2023-02-28", strictFormatter);
        System.out.println("Valid date: " + validDate);
        
        try {
            // Invalid date (February 30 doesn't exist)
            LocalDate invalidDate = LocalDate.parse("2023-02-30", strictFormatter);
            System.out.println("This won't be printed");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

This example shows STRICT mode rejecting an invalid date. February 30th doesn't
exist, so parsing fails. The same input might be accepted with other resolver
styles. STRICT is ideal for validation scenarios.

## SMART ResolverStyle

SMART mode makes sensible adjustments to invalid values. It's the default style
in most cases. For example, February 30 becomes February 28 (or 29 in leap
years). This balances validation with usability.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter smartFormatter = DateTimeFormatter.ofPattern("uuuu-MM-dd")
            .withResolverStyle(ResolverStyle.SMART);
        
        // Adjusts February 30 to February 28 (2023 not a leap year)
        LocalDate adjustedDate = LocalDate.parse("2023-02-30", smartFormatter);
        System.out.println("Adjusted date: " + adjustedDate);
        
        // Leap year example (adjusts to February 29)
        LocalDate leapYearDate = LocalDate.parse("2024-02-30", smartFormatter);
        System.out.println("Leap year adjusted date: " + leapYearDate);
    }
}

This example demonstrates SMART mode's intelligent adjustments. Invalid dates are
mapped to the nearest valid date. The adjustment considers leap years and month
lengths. SMART provides a good balance for most applications.

## LENIENT ResolverStyle

LENIENT mode allows any value and handles overflow by rolling over to subsequent
units. This can create dates far in the future or past. It's useful for certain
calculations but dangerous for validation.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter lenientFormatter = DateTimeFormatter.ofPattern("uuuu-MM-dd")
            .withResolverStyle(ResolverStyle.LENIENT);
        
        // Rolls over extra days to next months
        LocalDate rolledDate = LocalDate.parse("2023-02-45", lenientFormatter);
        System.out.println("Lenient date: " + rolledDate); // 2023-03-17
        
        // Negative values roll backwards
        LocalDate negativeDate = LocalDate.parse("2023-02--10", lenientFormatter);
        System.out.println("Negative days: " + negativeDate); // 2023-01-21
    }
}

This example shows LENIENT mode's overflow handling. Days beyond month length
roll into subsequent months. Negative values roll backwards. This is powerful
for calculations but inappropriate for input validation.

## Comparing ResolverStyles

Different resolver styles produce different results for the same input. This
example demonstrates all three styles side-by-side. The comparison highlights
their distinct behaviors with problematic input.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;

public class Main {

    public static void main(String[] args) {
        
        String input = "2023-04-31"; // April has only 30 days
        
        DateTimeFormatter strict = DateTimeFormatter.ofPattern("uuuu-MM-dd")
            .withResolverStyle(ResolverStyle.STRICT);
        
        DateTimeFormatter smart = DateTimeFormatter.ofPattern("uuuu-MM-dd")
            .withResolverStyle(ResolverStyle.SMART);
        
        DateTimeFormatter lenient = DateTimeFormatter.ofPattern("uuuu-MM-dd")
            .withResolverStyle(ResolverStyle.LENIENT);
        
        try {
            System.out.println("STRICT: " + LocalDate.parse(input, strict));
        } catch (Exception e) {
            System.out.println("STRICT failed: " + e.getMessage());
        }
        
        System.out.println("SMART: " + LocalDate.parse(input, smart));
        System.out.println("LENIENT: " + LocalDate.parse(input, lenient));
    }
}

This example clearly shows the three behaviors. STRICT rejects invalid input.
SMART adjusts to the last valid day. LENIENT rolls over to the next month.
Understanding these differences helps choose the right style for each use case.

## ResolverStyle with DateTimeFormatterBuilder

ResolverStyle can be set when building custom formatters. This example shows
integration with DateTimeFormatterBuilder. The style affects parsing behavior
even in complex formatter configurations.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.ResolverStyle;
import java.time.format.SignStyle;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter customFormatter = new DateTimeFormatterBuilder()
            .appendValue(ChronoField.YEAR, 4, 4, SignStyle.EXCEEDS_PAD)
            .appendLiteral('-')
            .appendValue(ChronoField.MONTH_OF_YEAR, 2)
            .appendLiteral('-')
            .appendValue(ChronoField.DAY_OF_MONTH, 2)
            .appendLiteral(' ')
            .appendValue(ChronoField.HOUR_OF_DAY, 2)
            .appendLiteral(':')
            .appendValue(ChronoField.MINUTE_OF_HOUR, 2)
            .toFormatter()
            .withResolverStyle(ResolverStyle.STRICT);
        
        try {
            LocalDateTime dt = LocalDateTime.parse("2023-02-30 12:30", customFormatter);
            System.out.println("Parsed: " + dt);
        } catch (Exception e) {
            System.out.println("Failed with STRICT: " + e.getMessage());
        }
    }
}

This example builds a custom formatter with STRICT resolution. The invalid date
February 30th is rejected. The same builder could use SMART or LENIENT styles.
The style affects all parsing operations with the formatter.

## ResolverStyle with Year-Month Patterns

ResolverStyle affects year-month parsing differently than full dates. This
example shows behavior with year-month patterns. The style impacts how invalid
month values are handled.

Main.java
  

package com.zetcode;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter strict = DateTimeFormatter.ofPattern("uuuu-MM")
            .withResolverStyle(ResolverStyle.STRICT);
        
        DateTimeFormatter smart = DateTimeFormatter.ofPattern("uuuu-MM")
            .withResolverStyle(ResolverStyle.SMART);
        
        String input = "2023-13"; // Invalid month 13
        
        try {
            YearMonth.parse(input, strict);
        } catch (Exception e) {
            System.out.println("STRICT rejects month 13: " + e.getMessage());
        }
        
        try {
            YearMonth.parse(input, smart);
        } catch (Exception e) {
            System.out.println("SMART also rejects month 13: " + e.getMessage());
        }
        
        // LENIENT allows month overflow
        DateTimeFormatter lenient = DateTimeFormatter.ofPattern("uuuu-MM")
            .withResolverStyle(ResolverStyle.LENIENT);
        YearMonth lenientYm = YearMonth.parse("2023-13", lenient);
        System.out.println("LENIENT rolls over: " + lenientYm); // 2024-01
    }
}

This example reveals that SMART and STRICT both reject month 13. Only LENIENT
allows it by rolling over to the next year. This behavior differs from day
handling in full dates. Understanding these nuances prevents surprises.

## Source

[Java ResolverStyle Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/ResolverStyle.html)

In this article, we've thoroughly explored the ResolverStyle enum and its
impact on date-time parsing. Understanding these styles helps build robust
date-time handling in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).