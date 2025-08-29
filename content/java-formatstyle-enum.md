+++
title = "Java FormatStyle Enum"
date = 2025-08-29T20:00:48.969+01:00
draft = false
description = "Complete Java FormatStyle enum tutorial covering all values with examples. Learn about date and time formatting in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FormatStyle Enum

Last modified: April 16, 2025

 

The java.time.format.FormatStyle enum defines four formatting styles
for dates and times. These styles are used with DateTimeFormatter to
control how dates and times are displayed. The enum provides standardized
formatting options.

FormatStyle values represent different levels of detail in formatting.
They range from full (most detailed) to short (most compact). The enum is used
primarily with locale-sensitive formatting of dates and times.

## FormatStyle Enum Overview

The FormatStyle enum contains four constants: FULL,
LONG, MEDIUM, and SHORT. Each style
provides a different level of detail in the formatted output. The actual format
varies by locale.

public enum FormatStyle {
    FULL,
    LONG,
    MEDIUM,
    SHORT
}

The code above shows the simple structure of the FormatStyle enum.
Despite its simplicity, it plays a crucial role in date-time formatting. The
styles are designed to meet common formatting requirements in applications.

## FormatStyle.FULL Example

FULL provides the most detailed formatting, including weekday,
month, day, year, and time zone information. It's suitable for formal contexts
where maximum clarity is required.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.FULL)
            .withLocale(Locale.US);
            
        String formatted = now.format(formatter);
        System.out.println("FULL format: " + formatted);
    }
}

This example demonstrates FormatStyle.FULL with US locale. The
output includes all possible date and time components. The exact format varies
based on the specified locale.

## FormatStyle.LONG Example

LONG provides less detail than FULL but more than
MEDIUM. It typically includes month name, day, year, and time
with seconds. Time zone may or may not be included.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.LONG)
            .withLocale(Locale.FRANCE);
            
        String formatted = now.format(formatter);
        System.out.println("LONG format (France): " + formatted);
    }
}

This example shows FormatStyle.LONG with French locale. The output
is more compact than FULL but still quite readable. Notice the different date
order and month names in French.

## FormatStyle.MEDIUM Example

MEDIUM provides a balance between detail and compactness. It
typically shows abbreviated month names, numeric day and year, and time with
seconds. This is a common choice for many applications.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.MEDIUM)
            .withLocale(Locale.GERMANY);
            
        String formatted = now.format(formatter);
        System.out.println("MEDIUM format (Germany): " + formatted);
    }
}

This example demonstrates FormatStyle.MEDIUM with German locale.
The output is more compact than LONG but still includes key information. Note
the different date format and time separator used in Germany.

## FormatStyle.SHORT Example

SHORT provides the most compact formatting, using mostly numeric
values. It's suitable for situations where space is limited or exact precision
isn't critical.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.SHORT)
            .withLocale(Locale.JAPAN);
            
        String formatted = now.format(formatter);
        System.out.println("SHORT format (Japan): " + formatted);
    }
}

This example shows FormatStyle.SHORT with Japanese locale. The
output is very compact, using only numbers and minimal separators. Note the
different date order used in Japan (year/month/day).

## Formatting Dates Only

FormatStyle can be used to format dates without times. The
ofLocalizedDate method creates a formatter that ignores time
components.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDate today = LocalDate.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.LONG)
            .withLocale(Locale.UK);
            
        String formatted = today.format(formatter);
        System.out.println("Date only (UK): " + formatted);
    }
}

This example demonstrates date-only formatting with FormatStyle.LONG
and UK locale. The output includes the full month name but no time information.
The UK format uses day/month/year order.

## Formatting Times Only

Similarly, FormatStyle can format times without dates. The
ofLocalizedTime method creates a time-only formatter.

Main.java
  

package com.zetcode;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalTime now = LocalTime.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedTime(FormatStyle.MEDIUM)
            .withLocale(Locale.CANADA_FRENCH);
            
        String formatted = now.format(formatter);
        System.out.println("Time only (French Canada): " + formatted);
    }
}

This example shows time-only formatting with FormatStyle.MEDIUM and
French Canadian locale. The output includes hours, minutes, and seconds. Note
the 24-hour format used in French-speaking regions.

## Mixing FormatStyles

Different FormatStyle values can be used for date and time
components separately. This provides flexibility in creating custom formats.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        
        DateTimeFormatter formatter = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.SHORT, FormatStyle.LONG)
            .withLocale(Locale.ITALY);
            
        String formatted = now.format(formatter);
        System.out.println("Mixed styles (Italy): " + formatted);
    }
}

This example demonstrates mixing FormatStyle.SHORT for the date and
FormatStyle.LONG for the time with Italian locale. The result
combines a compact date with a detailed time format.

## Source

[Java FormatStyle Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/FormatStyle.html)

In this article, we've covered all aspects of the Java FormatStyle
enum. These formatting options provide flexible, locale-aware date and time
representation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).