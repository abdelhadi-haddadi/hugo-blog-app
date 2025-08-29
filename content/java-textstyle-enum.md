+++
title = "Java TextStyle Enum"
date = 2025-08-29T20:00:53.388+01:00
draft = false
description = "Complete Java TextStyle enum tutorial covering all values with examples. Learn about text style formatting in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TextStyle Enum

Last modified: April 16, 2025

 

The java.time.format.TextStyle enum defines text styles for
formatting and parsing date-time text. It is used with DateTimeFormatter
to control how text is displayed. The enum provides several formatting options.

TextStyle is immutable and thread-safe. It is commonly used when
formatting dates, times, or date-time values to strings. The styles range from
full names to short abbreviations. The enum works with locale-sensitive text.

## TextStyle Enum Overview

TextStyle provides constants for different text formatting styles.
Key styles include full, short, and narrow representations. The enum is used
with DateTimeFormatterBuilder to customize output formats.

public enum TextStyle {
    FULL,
    FULL_STANDALONE,
    SHORT,
    SHORT_STANDALONE,
    NARROW,
    NARROW_STANDALONE
}

The code above shows all constants provided by TextStyle. These
values control how text is formatted in date-time strings. STANDALONE variants
are used when the text appears alone rather than in a complete date.

## Basic TextStyle Usage

The simplest way to use TextStyle is with DateTimeFormatter. Each style produces
different output for the same temporal field. The example shows month formatting.

Main.java
  

package com.zetcode;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        Month month = Month.JANUARY;
        Locale locale = Locale.US;
        
        System.out.println("FULL: " + 
            month.getDisplayName(TextStyle.FULL, locale));
        System.out.println("SHORT: " + 
            month.getDisplayName(TextStyle.SHORT, locale));
        System.out.println("NARROW: " + 
            month.getDisplayName(TextStyle.NARROW, locale));
    }
}

This example demonstrates basic TextStyle usage with Month enum. The output shows
different text representations for January. FULL gives complete name, SHORT gives
abbreviation, and NARROW gives minimal representation.

## Standalone vs Regular Styles

TextStyle provides standalone variants for use when text appears alone rather
than in a complete date. Some languages have different forms for these cases.

Main.java
  

package com.zetcode;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        Month month = Month.JANUARY;
        Locale russian = new Locale("ru", "RU");
        
        System.out.println("FULL: " + 
            month.getDisplayName(TextStyle.FULL, russian));
        System.out.println("FULL_STANDALONE: " + 
            month.getDisplayName(TextStyle.FULL_STANDALONE, russian));
            
        System.out.println("SHORT: " + 
            month.getDisplayName(TextStyle.SHORT, russian));
        System.out.println("SHORT_STANDALONE: " + 
            month.getDisplayName(TextStyle.SHORT_STANDALONE, russian));
    }
}

This example shows differences between regular and standalone styles in Russian.
Some languages like Russian have different grammatical forms for standalone use.
The output demonstrates these variations for January.

## Week Day Formatting

TextStyle can format days of week with different styles. The example shows
formatting for Tuesday in various styles and locales.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        DayOfWeek tuesday = DayOfWeek.TUESDAY;
        
        System.out.println("English FULL: " + 
            tuesday.getDisplayName(TextStyle.FULL, Locale.US));
        System.out.println("English SHORT: " + 
            tuesday.getDisplayName(TextStyle.SHORT, Locale.US));
            
        System.out.println("French FULL: " + 
            tuesday.getDisplayName(TextStyle.FULL, Locale.FRANCE));
        System.out.println("French NARROW: " + 
            tuesday.getDisplayName(TextStyle.NARROW, Locale.FRANCE));
    }
}

This example demonstrates day of week formatting with TextStyle. The output shows
Tuesday in different styles and languages. Note how NARROW style in French uses
single character while English uses two.

## With DateTimeFormatter

TextStyle is often used with DateTimeFormatter to customize date formatting.
The example shows building a formatter with specific text styles.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 15);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy", Locale.US)
            .withTextStyle(TextStyle.FULL);
            
        System.out.println("Full style: " + date.format(formatter));
        
        DateTimeFormatter shortFormatter = DateTimeFormatter.ofPattern("MMM dd, yyyy", Locale.US)
            .withTextStyle(TextStyle.SHORT);
            
        System.out.println("Short style: " + date.format(shortFormatter));
    }
}

This example shows TextStyle used with DateTimeFormatter. The formatter is
configured to use either FULL or SHORT style for month names. The output
demonstrates the difference in formatting.

## Locale-Sensitive Formatting

TextStyle produces different output based on locale. The example shows how
month names vary across languages using the same text style.

Main.java
  

package com.zetcode;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        Month april = Month.APRIL;
        
        System.out.println("English: " + 
            april.getDisplayName(TextStyle.FULL, Locale.US));
        System.out.println("German: " + 
            april.getDisplayName(TextStyle.FULL, Locale.GERMANY));
        System.out.println("Japanese: " + 
            april.getDisplayName(TextStyle.FULL, Locale.JAPAN));
        System.out.println("Chinese: " + 
            april.getDisplayName(TextStyle.FULL, Locale.CHINA));
    }
}

This example demonstrates locale-sensitive month formatting with TextStyle. The
output shows "April" in different languages. Each locale may have completely
different text representations for the same month.

## Combining TextStyles

Different TextStyles can be used for different parts of a date format. The
example shows a custom format with mixed styles.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 15);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy", Locale.US)
            .withTextStyle(TextStyle.FULL);
            
        System.out.println("Mixed styles: " + date.format(formatter));
        
        DateTimeFormatter shortDayFormatter = DateTimeFormatter.ofPattern("E, MMMM dd, yyyy", Locale.US)
            .withTextStyle(TextStyle.SHORT);
            
        System.out.println("Short day style: " + date.format(shortDayFormatter));
    }
}

This example shows combining different text styles in one formatter. The pattern
uses EEEE for full weekday name and MMMM for full month name. The second
formatter uses E for abbreviated weekday name.

## Source

[Java TextStyle Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/TextStyle.html)

In this article, we've covered the essential values and features of the Java
TextStyle enum. Understanding these concepts is crucial for proper date-time
text formatting in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).