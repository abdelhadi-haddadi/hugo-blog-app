+++
title = "Java Month Enum"
date = 2025-08-29T20:00:50.057+01:00
draft = false
description = "Complete Java Month enum tutorial covering all methods with examples. Learn about month handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Month Enum

Last modified: April 16, 2025

 

The java.time.Month enum represents the twelve months of the year.
It is part of the Java Date and Time API introduced in Java 8. Each enum constant
provides useful methods for working with months.

Month is immutable and thread-safe. It provides methods to get month
names, lengths, and values. The enum works seamlessly with other date-time
classes like LocalDate and YearMonth.

## Month Enum Overview

The Month enum contains twelve constants from JANUARY to DECEMBER.
Each constant has methods to query month properties and perform conversions.
The enum follows the ISO-8601 calendar system.

public enum Month implements TemporalAccessor, TemporalAdjuster {
    JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE,
    JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER;
    
    public int getValue();
    public String getDisplayName(TextStyle style, Locale locale);
    public int length(boolean leapYear);
    public int minLength();
    public int maxLength();
    public Month firstMonthOfQuarter();
    public Month plus(long months);
    public Month minus(long months);
}

The code above shows the structure and key methods of the Month
enum. These methods allow querying month properties and performing calculations.
The enum provides both numerical and textual representations of months.

## Getting Month Values

Each Month constant has a numerical value from 1 (January) to 12
(December). The getValue method returns this value. This is useful
for compatibility with older APIs that use month numbers.

Main.java
  

package com.zetcode; 

import java.time.Month;

public class Main {

    public static void main(String[] args) {
        
        // Get month values
        System.out.println("January value: " + Month.JANUARY.getValue());
        System.out.println("December value: " + Month.DECEMBER.getValue());
        
        // Get month from value
        Month month = Month.of(6);
        System.out.println("Month 6: " + month);
        
        // Get current month
        Month current = Month.from(java.time.LocalDate.now());
        System.out.println("Current month: " + current);
    }
}

This example demonstrates basic operations with Month values. The
of method creates a Month from its numerical value. The
from method extracts Month from other date-time objects.

## Displaying Month Names

The getDisplayName method provides localized month names in various
text styles. This is useful for user interfaces that need to display month names
in different formats and languages.

Main.java
  

package com.zetcode; 

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        // Full name in English
        String fullName = Month.AUGUST.getDisplayName(
            TextStyle.FULL, Locale.ENGLISH);
        System.out.println("Full name: " + fullName);
        
        // Short name in French
        String shortName = Month.AUGUST.getDisplayName(
            TextStyle.SHORT, Locale.FRENCH);
        System.out.println("Short name in French: " + shortName);
        
        // Narrow name in German
        String narrowName = Month.AUGUST.getDisplayName(
            TextStyle.NARROW, Locale.GERMAN);
        System.out.println("Narrow name in German: " + narrowName);
    }
}

This example shows different ways to display month names. The
TextStyle enum controls the name format (FULL, SHORT, NARROW).
The Locale parameter provides localization support.

## Working with Month Lengths

The Month enum provides methods to query month lengths. These
methods are essential for date calculations and validation. February's length
depends on whether it's a leap year.

Main.java
  

package com.zetcode; 

import java.time.Month;

public class Main {

    public static void main(String[] args) {
        
        // Regular month lengths
        System.out.println("January days: " + Month.JANUARY.length(false));
        System.out.println("April days: " + Month.APRIL.length(false));
        
        // February in leap year
        System.out.println("February in leap year: " + 
            Month.FEBRUARY.length(true));
            
        // Min and max lengths
        System.out.println("February min days: " + 
            Month.FEBRUARY.minLength());
        System.out.println("February max days: " + 
            Month.FEBRUARY.maxLength());
    }
}

This example demonstrates month length queries. Most months have fixed lengths,
but February varies. The minLength and maxLength
methods provide bounds for February's length.

## Month Arithmetic

The Month enum supports arithmetic operations through
plus and minus methods. These operations wrap around
at year boundaries, making them useful for month-based calculations.

Main.java
  

package com.zetcode; 

import java.time.Month;

public class Main {

    public static void main(String[] args) {
        
        // Basic arithmetic
        Month nextMonth = Month.JANUARY.plus(1);
        System.out.println("January + 1: " + nextMonth);
        
        Month prevMonth = Month.JANUARY.minus(1);
        System.out.println("January - 1: " + prevMonth);
        
        // Wrapping around year boundary
        Month decPlus2 = Month.DECEMBER.plus(2);
        System.out.println("December + 2: " + decPlus2);
        
        Month janMinus3 = Month.JANUARY.minus(3);
        System.out.println("January - 3: " + janMinus3);
        
        // Large values
        Month janPlus25 = Month.JANUARY.plus(25);
        System.out.println("January + 25: " + janPlus25);
    }
}

This example shows month arithmetic operations. The calculations automatically
wrap around at year boundaries. Adding 1 to December gives January, and
subtracting 1 from January gives December.

## Working with Quarters

The firstMonthOfQuarter method returns the first month of each
quarter. This is useful for financial and business applications that organize
time by quarters.

Main.java
  

package com.zetcode; 

import java.time.Month;

public class Main {

    public static void main(String[] args) {
        
        // Get first month of quarters
        System.out.println("Q1 starts with: " + 
            Month.JANUARY.firstMonthOfQuarter());
        System.out.println("Q2 starts with: " + 
            Month.APRIL.firstMonthOfQuarter());
        System.out.println("Q3 starts with: " + 
            Month.JULY.firstMonthOfQuarter());
        System.out.println("Q4 starts with: " + 
            Month.OCTOBER.firstMonthOfQuarter());
            
        // Any month in quarter returns same result
        System.out.println("May's quarter starts with: " + 
            Month.MAY.firstMonthOfQuarter());
    }
}

This example demonstrates quarter-related operations. Each quarter consists of
three months, and the method returns the first month regardless of which month
in the quarter is used to call it.

## Using Month with LocalDate

The Month enum works seamlessly with LocalDate.
This combination is powerful for date manipulation and querying. The examples
show common operations between these classes.

Main.java
  

package com.zetcode; 

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;

public class Main {

    public static void main(String[] args) {
        
        // Create date with Month enum
        LocalDate date1 = LocalDate.of(2025, Month.JANUARY, 15);
        System.out.println("Date with Month enum: " + date1);
        
        // Get month from date
        Month month = date1.getMonth();
        System.out.println("Month from date: " + month);
        
        // Create date at start of month
        LocalDate startOfMonth = Year.now().atMonth(Month.MARCH).atDay(1);
        System.out.println("Start of March: " + startOfMonth);
        
        // Check if month has 31 days
        boolean has31Days = month.maxLength() == 31;
        System.out.println(month + " has 31 days: " + has31Days);
    }
}

This example shows integration between Month and
LocalDate. The Month enum provides type safety when creating
dates. The example also demonstrates querying month properties from dates.

## Source

[Java Month Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/Month.html)

In this article, we've covered the essential methods and features of the Java
Month enum. Understanding these concepts is crucial for date handling in modern
Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).