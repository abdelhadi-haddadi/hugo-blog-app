+++
title = "Java TemporalAccessor Interface"
date = 2025-08-29T20:00:40.297+01:00
draft = false
description = "Complete Java TemporalAccessor interface tutorial covering all methods with examples. Learn about temporal handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalAccessor Interface

Last modified: April 16, 2025

 

The java.time.temporal.TemporalAccessor interface provides read-only
access to temporal objects. It is the base interface for all date-time classes
in the java.time package. TemporalAccessor allows querying temporal objects.

TemporalAccessor defines methods to examine date-time values. It
supports getting fields and querying temporal information. Many classes like
LocalDate and ZonedDateTime implement this interface.

## TemporalAccessor Interface Overview

The interface provides methods to access temporal information. Key operations
include checking field support and getting field values. It works with
TemporalField and TemporalUnit for flexible time handling.

public interface TemporalAccessor {
    boolean isSupported(TemporalField field);
    long getLong(TemporalField field);
    default int get(TemporalField field);
    default &lt;R&gt; R query(TemporalQuery&lt;R&gt; query);
}

The code above shows the methods of TemporalAccessor. These methods
allow examining temporal objects without modifying them. The interface forms
the foundation for read-only temporal operations in Java.

## Checking Supported Fields

The isSupported method checks if a field is available in the
temporal object. Different temporal classes support different fields. This check
is essential before attempting to access field values.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.now();
        
        // Check supported fields
        System.out.println("Year supported: " + 
            date.isSupported(ChronoField.YEAR));
        System.out.println("Hour supported: " + 
            date.isSupported(ChronoField.HOUR_OF_DAY));
        System.out.println("Era supported: " + 
            date.isSupported(ChronoField.ERA));
        
        // Alternative check
        System.out.println("Month supported: " + 
            date.isSupported(ChronoField.MONTH_OF_YEAR));
    }
}

This example demonstrates checking field support in a LocalDate object. Date-based
classes typically don't support time-related fields. Always verify support before
accessing fields to avoid exceptions.

## Getting Field Values

The getLong method retrieves field values as long numbers. For
smaller ranges, get provides int values. These methods throw
exceptions for unsupported fields.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime dateTime = LocalDateTime.now();
        
        // Get field values
        long year = dateTime.getLong(ChronoField.YEAR);
        int month = dateTime.get(ChronoField.MONTH_OF_YEAR);
        int day = dateTime.get(ChronoField.DAY_OF_MONTH);
        
        System.out.println("Year: " + year);
        System.out.println("Month: " + month);
        System.out.println("Day: " + day);
        
        // Get time values
        int hour = dateTime.get(ChronoField.HOUR_OF_DAY);
        int minute = dateTime.get(ChronoField.MINUTE_OF_HOUR);
        
        System.out.println("Hour: " + hour);
        System.out.println("Minute: " + minute);
    }
}

This example shows how to retrieve various field values from a LocalDateTime.
The getLong method is used for large ranges like years. The
get method works for smaller ranges like hours and minutes.

## Using TemporalQuery

The query method allows complex temporal queries. It uses
TemporalQuery implementations to extract information. This provides more
flexibility than direct field access.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalQueries;

public class Main {

    public static void main(String[] args) {
        
        ZonedDateTime zdt = ZonedDateTime.now();
        
        // Query for local date
        LocalDate date = zdt.query(TemporalQueries.localDate());
        System.out.println("Local date: " + date);
        
        // Query for time zone
        System.out.println("Zone: " + 
            zdt.query(TemporalQueries.zone()));
        
        // Query for precision
        System.out.println("Precision: " + 
            zdt.query(TemporalQueries.precision()));
        
        // Custom query
        String quarter = zdt.query(temporal -&gt; {
            int month = temporal.get(ChronoField.MONTH_OF_YEAR);
            return "Q" + ((month - 1) / 3 + 1);
        });
        System.out.println("Quarter: " + quarter);
    }
}

This example demonstrates various temporal queries. Built-in queries from
TemporalQueries provide common operations. The custom query shows how to
implement business logic like quarter calculation.

## Working with Different Temporal Types

TemporalAccessor works uniformly across different temporal types. The same
methods can be used with LocalDate, LocalTime, and other implementations.
This provides consistent access to temporal information.

Main.java
  

package com.zetcode;

import java.time.Instant;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        // With LocalTime
        LocalTime time = LocalTime.now();
        System.out.println("Hour: " + time.get(ChronoField.HOUR_OF_DAY));
        
        // With Instant
        Instant instant = Instant.now();
        System.out.println("Epoch second: " + 
            instant.getLong(ChronoField.INSTANT_SECONDS));
        
        // With YearMonth
        YearMonth yearMonth = YearMonth.now();
        System.out.println("Month: " + 
            yearMonth.get(ChronoField.MONTH_OF_YEAR));
        
        // Common interface usage
        printTemporalInfo(time);
        printTemporalInfo(instant);
        printTemporalInfo(yearMonth);
    }
    
    private static void printTemporalInfo(TemporalAccessor temporal) {
        if (temporal.isSupported(ChronoField.YEAR)) {
            System.out.println("Year: " + 
                temporal.getLong(ChronoField.YEAR));
        }
    }
}

This example shows TemporalAccessor working with different temporal types.
The printTemporalInfo method demonstrates polymorphic behavior.
Note the field support check before accessing year values.

## Extracting Partial Information

TemporalAccessor can extract partial information from temporal objects. This is
useful when only specific fields are needed. The interface provides flexible
access to temporal data.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime ldt = LocalDateTime.now();
        
        // Extract date part
        System.out.println("Date: " + 
            ldt.get(ChronoField.YEAR) + "-" +
            ldt.get(ChronoField.MONTH_OF_YEAR) + "-" +
            ldt.get(ChronoField.DAY_OF_MONTH));
        
        // Extract time part
        System.out.println("Time: " + 
            ldt.get(ChronoField.HOUR_OF_DAY) + ":" +
            ldt.get(ChronoField.MINUTE_OF_HOUR) + ":" +
            ldt.get(ChronoField.SECOND_OF_MINUTE));
        
        // Extract day of week
        System.out.println("Day of week: " + 
            ldt.get(ChronoField.DAY_OF_WEEK));
        
        // Extract week of year
        System.out.println("Week of year: " + 
            ldt.get(ChronoField.ALIGNED_WEEK_OF_YEAR));
    }
}

This example demonstrates extracting specific fields from a LocalDateTime. The
code shows how to build custom string representations. Various date and time
components can be accessed independently.

## Handling Unsupported Fields

When working with TemporalAccessor, some fields may be unsupported. Proper
error handling is essential. The isSupported check should precede
field access.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.UnsupportedTemporalTypeException;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.now();
        
        try {
            // Attempt to access unsupported field
            int hour = date.get(ChronoField.HOUR_OF_DAY);
            System.out.println("Hour: " + hour);
        } catch (UnsupportedTemporalTypeException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Safe field access
        if (date.isSupported(ChronoField.DAY_OF_YEAR)) {
            System.out.println("Day of year: " + 
                date.get(ChronoField.DAY_OF_YEAR));
        } else {
            System.out.println("Day of year not supported");
        }
    }
}

This example shows proper handling of unsupported fields. The first attempt
throws an exception for an unsupported time field. The second approach safely
checks support before access.

## Source

[Java TemporalAccessor Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAccessor.html)

In this article, we've covered the essential methods and features of the Java
TemporalAccessor interface. Understanding these concepts is crucial for working
with temporal objects in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).