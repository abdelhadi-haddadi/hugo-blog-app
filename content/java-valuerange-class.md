+++
title = "Java ValueRange Class"
date = 2025-08-29T20:00:43.322+01:00
draft = false
description = "Complete Java ValueRange class tutorial covering all methods with examples. Learn about range validation in Java temporal fields."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ValueRange Class

Last modified: April 16, 2025

 

The java.time.temporal.ValueRange class represents the valid range
of values for a temporal field. It stores minimum and maximum values along with
the smallest and largest valid values. This is used extensively in the Java
Time API for field validation.

ValueRange is immutable and thread-safe. It helps validate values
for temporal fields like day-of-month or hour-of-day. The class supports both
fixed and variable ranges, handling leap years and other calendar variations.

## ValueRange Class Overview

ValueRange provides methods to check value validity and get range
boundaries. Key operations include checking if values are within range and
querying minimum/maximum values. The class handles both inclusive and exclusive
range checks.

public final class ValueRange implements Serializable {
    public static ValueRange of(long min, long max);
    public static ValueRange of(long min, long maxSmallest, long maxLargest);
    public static ValueRange of(long min, long maxSmallest, long smallestMax, long largestMax);
    public boolean isValidValue(long value);
    public boolean isValidIntValue(long value);
    public long getMinimum();
    public long getMaximum();
    public long getLargestMinimum();
    public long getSmallestMaximum();
    public long checkValidValue(long value, TemporalField field);
    public int checkValidIntValue(long value, TemporalField field);
}

The code above shows key methods provided by ValueRange. These methods
allow creating ranges and validating values against them. The class supports
both fixed and variable ranges for different temporal scenarios.

## Creating ValueRange Objects

ValueRange objects can be created using static factory methods. The simplest
form takes just minimum and maximum values. More complex forms allow specifying
variable ranges for fields like day-of-month.

Main.java
  

package com.zetcode; 

import java.time.temporal.ValueRange;

public class Main {

    public static void main(String[] args) {
        
        // Fixed range (1-12 for months)
        ValueRange months = ValueRange.of(1, 12);
        System.out.println("Months range: " + months);
        
        // Variable range (1-28/29/30/31 for days)
        ValueRange days = ValueRange.of(1, 28, 31);
        System.out.println("Days range: " + days);
        
        // Full variable range (seconds in minute)
        ValueRange seconds = ValueRange.of(0, 59, 60);
        System.out.println("Seconds range: " + seconds);
        
        // Complex range (hours in day)
        ValueRange hours = ValueRange.of(0, 23, 24);
        System.out.println("Hours range: " + hours);
    }
}

This example demonstrates different ways to create ValueRange objects. The output
shows the ranges with their minimum and maximum values. Note how variable ranges
are represented with smallest and largest maximum values.

## Checking Value Validity

The primary use of ValueRange is to validate that values fall within acceptable
bounds. The isValidValue method checks if a value is within the
range. This is useful for input validation.

Main.java
  

package com.zetcode; 

import java.time.temporal.ValueRange;

public class Main {

    public static void main(String[] args) {

        ValueRange monthRange = ValueRange.of(1, 12);
        
        // Check valid values
        System.out.println("Is 5 valid? " + monthRange.isValidValue(5));
        System.out.println("Is 12 valid? " + monthRange.isValidValue(12));
        
        // Check invalid values
        System.out.println("Is 0 valid? " + monthRange.isValidValue(0));
        System.out.println("Is 13 valid? " + monthRange.isValidValue(13));
        
        // Check edge cases
        System.out.println("Is Integer.MAX_VALUE valid? " + 
            monthRange.isValidValue(Integer.MAX_VALUE));
    }
}

This example shows how to validate values against a range. The method returns
true for values within the range and false for those outside. Note that it
handles large numbers correctly.

## Getting Range Information

ValueRange provides methods to query its boundaries. These include getting
minimum, maximum, smallest maximum, and largest maximum values. This is useful
for understanding the range constraints.

Main.java
  

package com.zetcode; 

import java.time.temporal.ValueRange;

public class Main {

    public static void main(String[] args) {

        ValueRange dayRange = ValueRange.of(1, 28, 31);
        
        // Get range information
        System.out.println("Minimum: " + dayRange.getMinimum());
        System.out.println("Maximum: " + dayRange.getMaximum());
        System.out.println("Smallest maximum: " + dayRange.getSmallestMaximum());
        System.out.println("Largest maximum: " + dayRange.getLargestMaximum());
        
        // Check if range is fixed
        System.out.println("Is fixed range? " + 
            (dayRange.getMinimum() == dayRange.getLargestMinimum() &amp;&amp;
             dayRange.getMaximum() == dayRange.getSmallestMaximum()));
    }
}

This example demonstrates how to query range boundaries. For variable ranges,
different maximum values may be returned. The example also shows how to check
if a range is fixed (all boundaries equal).

## Validating Values with Exception

ValueRange can validate values and throw exceptions for invalid ones. The
checkValidValue method returns the value if valid or throws
DateTimeException. This is useful for strict validation.

Main.java
  

package com.zetcode; 

import java.time.temporal.ValueRange;
import java.time.DateTimeException;

public class Main {

    public static void main(String[] args) {

        ValueRange hourRange = ValueRange.of(0, 23);
        
        try {
            // Validate good value
            long validHour = hourRange.checkValidValue(15, null);
            System.out.println("Valid hour: " + validHour);
            
            // Validate bad value
            long invalidHour = hourRange.checkValidValue(25, null);
            System.out.println("This won't be printed");
            
        } catch (DateTimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

This example shows strict validation with exception handling. The method returns
the value if valid or throws DateTimeException for invalid values. The TemporalField
parameter can be used for better error messages.

## Working with Temporal Fields

ValueRange is often used with temporal fields to validate values. Many temporal
fields provide their valid value ranges. This example shows how to access and
use these ranges.

Main.java
  

package com.zetcode; 

import java.time.Month;
import java.time.temporal.ChronoField;
import java.time.temporal.ValueRange;

public class Main {

    public static void main(String[] args) {

        // Get range for day-of-month
        ValueRange dayRange = ChronoField.DAY_OF_MONTH.range();
        System.out.println("Day of month range: " + dayRange);
        
        // Get range for specific month
        ValueRange febDayRange = ChronoField.DAY_OF_MONTH.rangeRefinedBy(
            Month.FEBRUARY);
        System.out.println("February days range: " + febDayRange);
        
        // Check validity for month days
        System.out.println("Is 31 valid for February? " + 
            febDayRange.isValidValue(31));
            
        // Get hour range
        ValueRange hourRange = ChronoField.HOUR_OF_DAY.range();
        System.out.println("Hour range: " + hourRange);
    }
}

This example demonstrates how temporal fields provide their value ranges. The
rangeRefinedBy method adjusts the range for specific contexts
like months. This is how February's day range is properly handled.

## Integer Value Validation

ValueRange provides special methods for integer validation. The
isValidIntValue and checkValidIntValue methods
ensure values fit in an int. This is important for APIs requiring ints.

Main.java
  

package com.zetcode; 

import java.time.temporal.ValueRange;
import java.time.DateTimeException;

public class Main {

    public static void main(String[] args) {

        ValueRange smallRange = ValueRange.of(1, 100);
        ValueRange largeRange = ValueRange.of(1, Integer.MAX_VALUE + 1L);
        
        // Check int validity
        System.out.println("Is 50 valid int? " + smallRange.isValidIntValue(50));
        System.out.println("Is 2 billion valid int? " + 
            largeRange.isValidIntValue(2_000_000_000L));
            
        try {
            // Get valid int value
            int validInt = smallRange.checkValidIntValue(75, null);
            System.out.println("Valid int: " + validInt);
            
            // Try invalid long to int conversion
            int invalidInt = largeRange.checkValidIntValue(Integer.MAX_VALUE + 1L, null);
            System.out.println("This won't be printed");
            
        } catch (DateTimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

This example shows integer-specific validation. The methods ensure values fit
within int range (32-bit signed integer). This prevents overflow issues when
converting from long to int.

## Source

[Java ValueRange Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ValueRange.html)

In this article, we've covered the essential methods and features of the Java
ValueRange class. Understanding these concepts is crucial for proper temporal
field validation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).