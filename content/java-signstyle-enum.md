+++
title = "Java SignStyle Enum"
date = 2025-08-29T20:00:52.287+01:00
draft = false
description = "Complete Java SignStyle enum tutorial covering all values with examples. Learn about sign handling in Java DateTime formatting."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java SignStyle Enum

Last modified: April 16, 2025

 

The java.time.format.SignStyle enum controls how the sign is
output for formatted numbers. It is used with DateTimeFormatter
to specify sign handling for fields like year or offset. The enum provides
five distinct styles for sign representation.

SignStyle is part of the Java 8 Date and Time API. It helps
format numeric fields consistently. The styles range from always showing
signs to only showing negative signs when necessary.

## SignStyle Enum Overview

The SignStyle enum defines five constants that control sign
formatting behavior. These styles determine when positive and negative
signs appear in formatted output. The enum is used with field formatters.

public enum SignStyle {
    NORMAL,
    ALWAYS,
    NEVER,
    NOT_NEGATIVE,
    EXCEEDS_PAD
}

The code above shows the five constants of SignStyle. Each
constant represents a different strategy for handling signs during
formatting. The styles vary in strictness and use cases.

## NORMAL Style Example

SignStyle.NORMAL outputs the sign only for negative numbers.
This is the most common style for regular numeric formatting. It provides
clean output without unnecessary positive signs.

Main.java
  

import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu")
            .withSignStyle(SignStyle.NORMAL);
        
        System.out.println("Positive year: " + 
            formatter.format(Year.of(2025)));
        System.out.println("Negative year: " + 
            formatter.format(Year.of(-2025)));
        System.out.println("Zero year: " + 
            formatter.format(Year.of(0)));
    }
}

This example shows NORMAL sign style behavior. The positive
year and zero year have no sign, while the negative year shows a minus
sign. This matches typical numeric formatting conventions.

## ALWAYS Style Example

SignStyle.ALWAYS forces the sign to be shown for both positive
and negative numbers. This style is useful when explicit sign indication
is required, regardless of the number's value.

Main.java
  

import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu")
            .withSignStyle(SignStyle.ALWAYS);
        
        System.out.println("Positive year: " + 
            formatter.format(Year.of(2025)));
        System.out.println("Negative year: " + 
            formatter.format(Year.of(-2025)));
        System.out.println("Zero year: " + 
            formatter.format(Year.of(0)));
    }
}

This example demonstrates ALWAYS style behavior. All years
show their sign, including positive and zero values. The plus sign appears
for positive numbers, maintaining complete sign information.

## NEVER Style Example

SignStyle.NEVER prevents any sign from being shown, even for
negative numbers. This style is useful when signs are not desired in the
output, regardless of the value's sign.

Main.java
  

import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu")
            .withSignStyle(SignStyle.NEVER);
        
        System.out.println("Positive year: " + 
            formatter.format(Year.of(2025)));
        System.out.println("Negative year: " + 
            formatter.format(Year.of(-2025)));
        System.out.println("Zero year: " + 
            formatter.format(Year.of(0)));
    }
}

This example shows NEVER style behavior. No signs appear in
the output, even for negative years. The absolute value is displayed
without any sign indication.

## NOT_NEGATIVE Style Example

SignStyle.NOT_NEGATIVE throws an exception if the value is
negative. It only allows zero or positive values to be formatted. This
acts as a validation check during formatting.

Main.java
  

import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu")
            .withSignStyle(SignStyle.NOT_NEGATIVE);
        
        try {
            System.out.println("Positive year: " + 
                formatter.format(Year.of(2025)));
            System.out.println("Zero year: " + 
                formatter.format(Year.of(0)));
            System.out.println("Negative year: " + 
                formatter.format(Year.of(-2025)));
        } catch (Exception e) {
            System.out.println("Error formatting negative year: " + e);
        }
    }
}

This example demonstrates NOT_NEGATIVE style behavior. Positive
and zero years format normally, but negative years throw an exception. This
style enforces non-negative values in the formatted output.

## EXCEEDS_PAD Style Example

SignStyle.EXCEEDS_PAD only shows the sign when the number
exceeds the pad width. This style is used with padding and provides
compact output for smaller numbers.

Main.java
  

import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu")
            .withSignStyle(SignStyle.EXCEEDS_PAD);
        
        System.out.println("Year 999: " + 
            formatter.format(Year.of(999)));
        System.out.println("Year 1000: " + 
            formatter.format(Year.of(1000)));
        System.out.println("Year -100: " + 
            formatter.format(Year.of(-100)));
        System.out.println("Year -1000: " + 
            formatter.format(Year.of(-1000)));
    }
}

This example shows EXCEEDS_PAD style behavior. The sign only
appears when the number's digits exceed the format's width. For years with
4 digits, the default width is matched, so signs appear.

## Combining with Padding Example

SignStyle is often used with padding in format patterns. The
interaction between padding and sign styles affects the final output. This
example demonstrates the combination.

Main.java
  

import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("+uuuu")
            .withSignStyle(SignStyle.EXCEEDS_PAD);
        
        System.out.println("Padded year 25: " + 
            formatter.format(Year.of(25)));
        System.out.println("Padded year 2025: " + 
            formatter.format(Year.of(2025)));
        System.out.println("Padded negative year: " + 
            formatter.format(Year.of(-25)));
    }
}

This example combines padding with sign styles. The + in the
pattern indicates padding, while EXCEEDS_PAD controls sign
behavior. The output shows how signs interact with padded numbers.

## Using with Offset Fields Example

SignStyle is particularly useful when formatting offset fields.
Time zone offsets require consistent sign handling. This example shows
offset formatting with different sign styles.

Main.java
  

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.SignStyle;

public class Main {
    public static void main(String[] args) {
        DateTimeFormatter normalFormatter = DateTimeFormatter.ofPattern("xxx")
            .withSignStyle(SignStyle.NORMAL);
        DateTimeFormatter alwaysFormatter = DateTimeFormatter.ofPattern("xxx")
            .withSignStyle(SignStyle.ALWAYS);
        
        ZoneOffset utc = ZoneOffset.UTC;
        ZoneOffset plusFive = ZoneOffset.ofHours(5);
        ZoneOffset minusFive = ZoneOffset.ofHours(-5);
        
        System.out.println("UTC (normal): " + normalFormatter.format(utc));
        System.out.println("+05:00 (normal): " + normalFormatter.format(plusFive));
        System.out.println("-05:00 (normal): " + normalFormatter.format(minusFive));
        
        System.out.println("UTC (always): " + alwaysFormatter.format(utc));
        System.out.println("+05:00 (always): " + alwaysFormatter.format(plusFive));
        System.out.println("-05:00 (always): " + alwaysFormatter.format(minusFive));
    }
}

This example demonstrates sign styles with time zone offsets. UTC (zero offset)
shows different behavior based on the sign style. The ALWAYS
style forces a sign even for zero offsets.

## Source

[Java SignStyle Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/SignStyle.html)

In this article, we've covered all five constants of the Java
SignStyle enum. Understanding these styles is essential for
precise control over number formatting in date and time operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).