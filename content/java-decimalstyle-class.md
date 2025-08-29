+++
title = "Java DecimalStyle Class"
date = 2025-08-29T20:00:47.850+01:00
draft = false
description = "Complete Java DecimalStyle class tutorial covering all methods with examples. Learn about number formatting in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DecimalStyle Class

Last modified: April 16, 2025

 

The java.time.format.DecimalStyle class provides symbols and styles
for formatting and parsing numbers. It defines decimal digits, signs, and other
symbols used in number representation. DecimalStyle is immutable and thread-safe.

DecimalStyle is used by number formatters like DecimalFormat
and date-time formatters. It supports locale-specific symbols while maintaining
consistency. The class handles digits, decimal separators, and other formatting
elements.

## DecimalStyle Class Overview

DecimalStyle provides methods to get and customize number symbols.
Key operations include getting default styles, modifying symbols, and checking
validity. The class works with both standard and localized number formats.

public final class DecimalStyle {
    public static final DecimalStyle STANDARD;
    public static DecimalStyle ofDefaultLocale();
    public static DecimalStyle of(Locale locale);
    public char getZeroDigit();
    public char getDecimalSeparator();
    public char getNegativeSign();
    public char getPositiveSign();
    public DecimalStyle withZeroDigit(char zeroDigit);
    public DecimalStyle withDecimalSeparator(char decimalSeparator);
}

The code above shows key methods provided by DecimalStyle. These
methods allow accessing and modifying number formatting symbols. The class
provides both standard and locale-specific implementations.

## Getting Default DecimalStyle

DecimalStyle objects can be obtained in several ways. The standard instance uses
ASCII digits and symbols. Locale-specific instances adapt to regional conventions.

Main.java
  

package com.zetcode; 

import java.time.format.DecimalStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        // Standard style (ASCII digits)
        DecimalStyle standard = DecimalStyle.STANDARD;
        System.out.println("Standard zero digit: " + standard.getZeroDigit());
        
        // Default locale style
        DecimalStyle defaultLocale = DecimalStyle.ofDefaultLocale();
        System.out.println("Default locale decimal separator: " + 
            defaultLocale.getDecimalSeparator());
        
        // Specific locale style
        DecimalStyle french = DecimalStyle.of(Locale.FRENCH);
        System.out.println("French decimal separator: " + 
            french.getDecimalSeparator());
    }
}

This example demonstrates different ways to get DecimalStyle instances. The output
shows how symbols vary between standard and locale-specific styles. The French
locale typically uses comma as decimal separator.

## Accessing DecimalStyle Symbols

A DecimalStyle can be queried for its formatting symbols. These include digits,
signs, and separators. The symbols define how numbers are formatted and parsed.

Main.java
  

package com.zetcode; 

import java.time.format.DecimalStyle;

public class Main {

    public static void main(String[] args) {

        DecimalStyle style = DecimalStyle.ofDefaultLocale();
        
        // Get zero digit character
        char zero = style.getZeroDigit();
        System.out.println("Zero digit: " + zero);
        
        // Get decimal separator
        char separator = style.getDecimalSeparator();
        System.out.println("Decimal separator: " + separator);
        
        // Get negative sign
        char negative = style.getNegativeSign();
        System.out.println("Negative sign: " + negative);
        
        // Get positive sign
        char positive = style.getPositiveSign();
        System.out.println("Positive sign: " + positive);
    }
}

This example shows how to access various symbols from a DecimalStyle. The symbols
are locale-dependent and affect number formatting. Most locales use '-' for
negative and '+' for positive signs.

## Creating Custom DecimalStyle

DecimalStyle supports creating modified instances with custom symbols. The
with methods return new instances with changed symbols. Original
instance remains unchanged.

Main.java
  

package com.zetcode; 

import java.time.format.DecimalStyle;

public class Main {

    public static void main(String[] args) {

        DecimalStyle standard = DecimalStyle.STANDARD;
        
        // Create style with custom zero digit
        DecimalStyle customZero = standard.withZeroDigit('〇');
        System.out.println("Custom zero: " + customZero.getZeroDigit());
        
        // Create style with custom separator
        DecimalStyle customSep = standard.withDecimalSeparator('|');
        System.out.println("Custom separator: " + customSep.getDecimalSeparator());
        
        // Chain modifications
        DecimalStyle fullCustom = standard.withZeroDigit('A')
                                        .withDecimalSeparator('@')
                                        .withNegativeSign('~');
        System.out.println("Fully custom style: " + 
            fullCustom.getZeroDigit() + " " + 
            fullCustom.getDecimalSeparator() + " " + 
            fullCustom.getNegativeSign());
    }
}

This example demonstrates creating custom DecimalStyle instances. Each
with method returns a new instance. The original STANDARD instance
remains unchanged due to immutability.

## Using DecimalStyle with NumberFormat

DecimalStyle can be used with number formatters to customize formatting. While
typically used internally, we can adapt formatters to use custom styles.

Main.java
  

package com.zetcode; 

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.format.DecimalStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        DecimalStyle style = DecimalStyle.of(Locale.GERMAN);
        
        // Create DecimalFormatSymbols from DecimalStyle
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.GERMAN);
        symbols.setZeroDigit(style.getZeroDigit());
        symbols.setDecimalSeparator(style.getDecimalSeparator());
        symbols.setMinusSign(style.getNegativeSign());
        
        // Create formatter with custom symbols
        DecimalFormat format = new DecimalFormat("#,##0.00", symbols);
        String formatted = format.format(-1234.56);
        System.out.println("Formatted number: " + formatted);
    }
}

This example shows how to adapt a DecimalFormat to use symbols from DecimalStyle.
The German locale typically uses comma as decimal separator. The formatted output
reflects the locale's conventions.

## DecimalStyle in DateTimeFormat

DecimalStyle is used internally by date-time formatters for number handling.
We can examine how it affects date and time formatting patterns.

Main.java
  

package com.zetcode; 

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DecimalStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        LocalTime time = LocalTime.of(9, 5, 30);
        
        // Standard formatting
        DateTimeFormatter standardFmt = DateTimeFormatter.ofPattern("hh:mm:ss");
        System.out.println("Standard format: " + standardFmt.format(time));
        
        // With Arabic digits
        DecimalStyle arabicStyle = DecimalStyle.STANDARD.withZeroDigit('٠');
        DateTimeFormatter arabicFmt = standardFmt.withDecimalStyle(arabicStyle);
        System.out.println("Arabic digits: " + arabicFmt.format(time));
    }
}

This example demonstrates DecimalStyle's effect on date-time formatting. The
second formatter uses Eastern Arabic numerals. The same time is displayed with
different digit characters.

## Validating DecimalStyle Symbols

When creating custom DecimalStyle instances, symbol validation is important.
Invalid symbols can cause formatting and parsing issues.

Main.java
  

package com.zetcode; 

import java.time.format.DecimalStyle;

public class Main {

    public static void main(String[] args) {

        try {
            // Valid zero digit
            DecimalStyle valid = DecimalStyle.STANDARD.withZeroDigit('A');
            System.out.println("Valid zero digit: " + valid.getZeroDigit());
            
            // Invalid zero digit (non-digit character)
            DecimalStyle invalid = DecimalStyle.STANDARD.withZeroDigit('!');
            System.out.println("This won't be printed");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

This example shows symbol validation in DecimalStyle. While the API doesn't
explicitly validate in all cases, using inappropriate symbols may cause issues.
The zero digit should be a valid digit character.

## Source

[Java DecimalStyle Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/DecimalStyle.html)

In this article, we've covered the essential methods and features of the Java
DecimalStyle class. Understanding these concepts is crucial for number formatting
in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).