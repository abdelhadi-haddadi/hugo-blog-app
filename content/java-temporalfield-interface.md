+++
title = "Java TemporalField Interface"
date = 2025-08-29T20:00:41.403+01:00
draft = false
description = "Complete Java TemporalField interface tutorial covering all methods with examples. Learn about temporal fields in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalField Interface

Last modified: April 16, 2025

 

The java.time.temporal.TemporalField interface represents a field of
date-time, such as month-of-year or hour-of-day. It provides access to date-time
fields in a generic way. TemporalField is a key interface in the Java Time API.

TemporalField defines methods to get and set field values on
temporal objects. It works with both date and time fields. The interface is
implemented by ChronoField enum and custom field implementations.

## TemporalField Interface Overview

TemporalField provides methods to access field values and perform
validations. Key operations include getting value ranges and checking support.
The interface enables generic field access across different temporal types.

public interface TemporalField {
    TemporalUnit getBaseUnit();
    TemporalUnit getRangeUnit();
    ValueRange range();
    boolean isDateBased();
    boolean isTimeBased();
    boolean isSupportedBy(TemporalAccessor temporal);
    ValueRange rangeRefinedBy(TemporalAccessor temporal);
    long getFrom(TemporalAccessor temporal);
    &lt;R extends Temporal&gt; R adjustInto(R temporal, long newValue);
}

The code above shows key methods of TemporalField. These methods
allow accessing and manipulating temporal fields generically. The interface
supports both date-based and time-based fields.

## Accessing Field Values

The getFrom method retrieves field values from temporal objects.
This works with any temporal type that supports the field. The method returns
the field value as a long.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 16);
        LocalTime time = LocalTime.of(14, 30);
        
        // Get day-of-month from date
        long dayOfMonth = ChronoField.DAY_OF_MONTH.getFrom(date);
        System.out.println("Day of month: " + dayOfMonth);
        
        // Get hour-of-day from time
        long hourOfDay = ChronoField.HOUR_OF_DAY.getFrom(time);
        System.out.println("Hour of day: " + hourOfDay);
        
        // Get month-of-year from date
        long monthOfYear = ChronoField.MONTH_OF_YEAR.getFrom(date);
        System.out.println("Month of year: " + monthOfYear);
    }
}

This example demonstrates getting field values using TemporalField.
We use ChronoField constants which implement the interface. The
method works consistently across different temporal types.

## Checking Field Support

Before accessing a field, we should check if it's supported by the temporal
object. The isSupportedBy method verifies field support. This
prevents runtime exceptions.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        
        // Check date field support
        System.out.println("DAY_OF_MONTH supported in date: " + 
            ChronoField.DAY_OF_MONTH.isSupportedBy(date));
        System.out.println("HOUR_OF_DAY supported in date: " + 
            ChronoField.HOUR_OF_DAY.isSupportedBy(date));
            
        // Check time field support
        System.out.println("HOUR_OF_DAY supported in time: " + 
            ChronoField.HOUR_OF_DAY.isSupportedBy(time));
        System.out.println("MONTH_OF_YEAR supported in time: " + 
            ChronoField.MONTH_OF_YEAR.isSupportedBy(time));
    }
}

This example checks field support before access. Date objects typically don't
support time fields and vice versa. The method helps write robust temporal
code that handles different types.

## Getting Field Value Ranges

Fields have valid value ranges that vary by context. The range
methods provide this information. They help validate values before setting.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ValueRange;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 2, 1); // February 2025 (not leap)
        
        // Get general range for day-of-month
        ValueRange generalRange = ChronoField.DAY_OF_MONTH.range();
        System.out.println("General day-of-month range: " + generalRange);
        
        // Get specific range for this date
        ValueRange specificRange = ChronoField.DAY_OF_MONTH.rangeRefinedBy(date);
        System.out.println("Specific day-of-month range: " + specificRange);
        
        // Get range for month-of-year
        ValueRange monthRange = ChronoField.MONTH_OF_YEAR.range();
        System.out.println("Month-of-year range: " + monthRange);
    }
}

This example shows field range access methods. The general range is fixed,
while refined range considers context like month length. Range information
is crucial for validation.

## Adjusting Temporal Objects

The adjustInto method modifies temporal objects by setting field
values. It returns a new adjusted object while keeping the original unchanged.
This follows the immutable pattern.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 16);
        LocalDateTime dateTime = LocalDateTime.of(2025, 4, 16, 14, 30);
        
        // Adjust day-of-month
        LocalDate adjustedDate = (LocalDate) ChronoField.DAY_OF_MONTH.adjustInto(date, 25);
        System.out.println("Adjusted date: " + adjustedDate);
        
        // Adjust hour-of-day
        LocalDateTime adjustedDateTime = (LocalDateTime) 
            ChronoField.HOUR_OF_DAY.adjustInto(dateTime, 18);
        System.out.println("Adjusted date-time: " + adjustedDateTime);
        
        // Chain adjustments
        LocalDateTime finalDateTime = (LocalDateTime) 
            ChronoField.MINUTE_OF_HOUR.adjustInto(
                ChronoField.HOUR_OF_DAY.adjustInto(dateTime, 9), 15);
        System.out.println("Final date-time: " + finalDateTime);
    }
}

This example demonstrates temporal adjustments using TemporalField.
The method requires casting to the specific temporal type. Multiple adjustments
can be chained for complex modifications.

## Working with Custom Temporal Fields

We can implement TemporalField for custom fields. This requires
defining field behavior and range rules. Custom fields integrate with the
Java Time API.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.TemporalField;
import java.time.temporal.ValueRange;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;

public class Main {

    static final TemporalField QUARTER_OF_YEAR = new TemporalField() {
        @Override
        public TemporalUnit getBaseUnit() {
            return ChronoUnit.MONTHS;
        }
        
        @Override
        public TemporalUnit getRangeUnit() {
            return ChronoUnit.YEARS;
        }
        
        @Override
        public ValueRange range() {
            return ValueRange.of(1, 4);
        }
        
        @Override
        public boolean isDateBased() {
            return true;
        }
        
        @Override
        public boolean isTimeBased() {
            return false;
        }
        
        @Override
        public boolean isSupportedBy(TemporalAccessor temporal) {
            return temporal.isSupported(ChronoField.MONTH_OF_YEAR);
        }
        
        @Override
        public ValueRange rangeRefinedBy(TemporalAccessor temporal) {
            return range();
        }
        
        @Override
        public long getFrom(TemporalAccessor temporal) {
            int month = temporal.get(ChronoField.MONTH_OF_YEAR);
            return (month - 1) / 3 + 1;
        }
        
        @Override
        public &lt;R extends Temporal&gt; R adjustInto(R temporal, long newValue) {
            int currentQuarter = getFrom(temporal);
            int monthChange = (int) ((newValue - currentQuarter) * 3);
            return (R) temporal.plus(monthChange, ChronoUnit.MONTHS);
        }
    };

    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2025, 6, 15);
        
        // Get quarter from custom field
        long quarter = QUARTER_OF_YEAR.getFrom(date);
        System.out.println("Quarter: " + quarter);
        
        // Adjust to different quarter
        LocalDate q4Date = (LocalDate) QUARTER_OF_YEAR.adjustInto(date, 4);
        System.out.println("Q4 date: " + q4Date);
    }
}

This example shows a custom quarter-of-year field implementation. The field
calculates quarters from months and allows adjustments. Custom fields must
properly implement all interface methods.

## Combining TemporalField with TemporalQueries

TemporalField can be used with TemporalQuery for
flexible temporal access. This combination enables powerful date-time
manipulations and queries.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalQuery;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime dateTime = LocalDateTime.of(2025, 4, 16, 14, 30);
        
        // Query for month value
        TemporalQuery&lt;Long&gt; monthQuery = ChronoField.MONTH_OF_YEAR::getFrom;
        Long month = dateTime.query(monthQuery);
        System.out.println("Month from query: " + month);
        
        // Query for hour value
        TemporalQuery&lt;Long&gt; hourQuery = ChronoField.HOUR_OF_DAY::getFrom;
        Long hour = dateTime.query(hourQuery);
        System.out.println("Hour from query: " + hour);
        
        // Combined query
        TemporalQuery&lt;String&gt; combinedQuery = temporal -&gt; {
            long y = temporal.get(ChronoField.YEAR);
            long m = temporal.get(ChronoField.MONTH_OF_YEAR);
            long d = temporal.get(ChronoField.DAY_OF_MONTH);
            return String.format("%d-%02d-%02d", y, m, d);
        };
        String formatted = dateTime.query(combinedQuery);
        System.out.println("Formatted date: " + formatted);
    }
}

This example demonstrates combining TemporalField with queries.
Field references can be used directly as queries. More complex queries can
combine multiple fields for custom results.

## Source

[Java TemporalField Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalField.html)

In this article, we've covered the essential methods and features of the Java
TemporalField interface. Understanding these concepts is crucial for working
with date and time fields in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).