+++
title = "Java JapaneseEra Class"
date = 2025-08-29T19:58:12.349+01:00
draft = false
description = "Complete Java JapaneseEra class tutorial covering all methods with examples. Learn about Japanese calendar handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JapaneseEra Class

Last modified: April 16, 2025

 

The java.time.chrono.JapaneseEra class represents an era in the
Japanese imperial calendar system. Each era corresponds to the reign of an
emperor. The class is part of Java's modern date-time API introduced in Java 8.

JapaneseEra is immutable and thread-safe. It works with other
classes like JapaneseDate to provide complete Japanese calendar
support. The class defines constants for known eras and supports future eras.

## JapaneseEra Class Overview

JapaneseEra provides methods to get era information and convert
between eras. Key operations include getting the current era, finding eras by
value, and working with Japanese dates. The class handles era transitions.

public final class JapaneseEra implements Era, Serializable {
    public static JapaneseEra of(int japaneseEra);
    public static JapaneseEra valueOf(String japaneseEra);
    public static JapaneseEra[] values();
    public static JapaneseEra current();
    public int getValue();
    public String getDisplayName(TextStyle style, Locale locale);
}

The code above shows key methods provided by JapaneseEra. These
methods allow era lookup, conversion, and display. The class supports both
predefined and future Japanese eras.

## Getting Current Japanese Era

The current Japanese era can be obtained using the current method.
This is useful for applications that need to display dates in the Japanese
calendar system. The method returns the era based on system clock.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {
        
        JapaneseEra currentEra = JapaneseEra.current();
        System.out.println("Current Japanese era: " + currentEra);
        System.out.println("Era value: " + currentEra.getValue());
        System.out.println("Display name: " + 
            currentEra.getDisplayName(java.time.format.TextStyle.FULL, 
            java.util.Locale.ENGLISH));
    }
}

This example demonstrates how to get the current Japanese era. The output shows
the era object, its numeric value, and display name. The display name varies
based on locale and text style.

## Listing All Japanese Eras

All available Japanese eras can be retrieved using the values method.
This returns an array of all defined eras in chronological order. Each era has
a unique numeric value.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {
        
        JapaneseEra[] eras = JapaneseEra.values();
        
        System.out.println("Japanese eras:");
        for (JapaneseEra era : eras) {
            System.out.printf("%s (value: %d)%n", era, era.getValue());
        }
    }
}

This example lists all Japanese eras with their numeric values. The output shows
eras from Meiji (1868) to the current era. Future eras are also supported.

## Getting Japanese Era by Value

Specific eras can be retrieved using their numeric values with the of
method. Each era has a unique value assigned by the Japanese calendar system.
This allows precise era selection.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseEra;

public class Main {

    public static void main(String[] args) {
        
        // Get Heisei era (1989-2019)
        JapaneseEra heisei = JapaneseEra.of(JapaneseEra.HEISEI.getValue());
        System.out.println("Heisei era: " + heisei);
        
        // Get Showa era (1926-1989)
        JapaneseEra showa = JapaneseEra.of(2);
        System.out.println("Showa era: " + showa);
        
        // Get Meiji era (1868-1912)
        JapaneseEra meiji = JapaneseEra.of(-1);
        System.out.println("Meiji era: " + meiji);
    }
}

This example shows how to retrieve specific Japanese eras by their values. Note
that Meiji era has value -1, Taisho 0, Showa 2, etc. Constants are available
for recent eras.

## Creating JapaneseDate with JapaneseEra

JapaneseEra is often used with JapaneseDate to create
dates in the Japanese calendar system. This combination provides complete
Japanese date handling capabilities.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Current date in Japanese calendar
        JapaneseDate currentJapaneseDate = JapaneseDate.now();
        System.out.println("Current Japanese date: " + currentJapaneseDate);
        
        // Specific date in Showa era
        JapaneseDate showaDate = JapaneseDate.of(JapaneseEra.SHOWA, 64, 1, 7);
        System.out.println("Showa 64-1-7: " + showaDate);
        
        // Convert from LocalDate
        JapaneseDate convertedDate = JapaneseDate.from(LocalDate.of(2019, 4, 30));
        System.out.println("Converted date: " + convertedDate);
    }
}

This example demonstrates creating Japanese dates using eras. The output shows
dates in Japanese calendar format (era-year-month-day). Conversion from ISO dates
is also supported.

## Formatting JapaneseEra Names

The display name of a Japanese era can be formatted for different locales and
styles using getDisplayName. This is useful for localized user
interfaces showing Japanese dates.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseEra;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        JapaneseEra reiwa = JapaneseEra.current();
        
        System.out.println("Full name in English: " + 
            reiwa.getDisplayName(TextStyle.FULL, Locale.ENGLISH));
        System.out.println("Short name in English: " + 
            reiwa.getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
        System.out.println("Full name in Japanese: " + 
            reiwa.getDisplayName(TextStyle.FULL, Locale.JAPANESE));
        System.out.println("Short name in Japanese: " + 
            reiwa.getDisplayName(TextStyle.SHORT, Locale.JAPANESE));
    }
}

This example shows how to format era names differently based on locale and style.
The output varies from full names ("Reiwa") to abbreviations ("R") depending on
parameters.

## Working with Future Japanese Eras

The JapaneseEra class is designed to handle future eras that haven't
been defined yet. This ensures applications will continue to work when new eras
are introduced.

Main.java
  

package com.zetcode;

import java.time.chrono.JapaneseEra;
import java.time.chrono.JapaneseDate;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        
        // Hypothetical future era (value 6 would be next after Reiwa)
        JapaneseEra futureEra = JapaneseEra.of(6);
        System.out.println("Future era: " + futureEra);
        
        // Create date in future era
        JapaneseDate futureDate = JapaneseDate.of(futureEra, 3, 5, 10);
        System.out.println("Future date: " + futureDate);
        
        // Verify future era properties
        System.out.println("Future era value: " + futureEra.getValue());
        System.out.println("Future era name: " + 
            futureEra.getDisplayName(
                java.time.format.TextStyle.FULL, 
                java.util.Locale.ENGLISH));
    }
}

This example demonstrates handling of future Japanese eras. While the display
name may be generic, the class maintains all functionality for future eras.
Applications can safely use these eras before they're officially defined.

## Source

[Java JapaneseEra Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/JapaneseEra.html)

In this article, we've covered the essential methods and features of the Java
JapaneseEra class. Understanding these concepts is crucial for working with
Japanese calendar dates in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).