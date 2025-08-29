+++
title = "Java TemporalQuery Interface"
date = 2025-08-29T20:00:43.363+01:00
draft = false
description = "Complete Java TemporalQuery interface tutorial covering all methods with examples. Learn about temporal queries in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalQuery Interface

Last modified: April 16, 2025

 

The java.time.temporal.TemporalQuery interface provides a way to
query temporal objects for information. It represents a function that extracts
information from temporal objects like LocalDate or ZonedDateTime.

TemporalQuery is a functional interface with a single abstract
method queryFrom. It is used throughout the Java Time API for
flexible temporal queries. The interface enables type-safe temporal operations.

## TemporalQuery Interface Overview

The TemporalQuery interface defines one method that takes a
TemporalAccessor and returns a result. The result type is
determined by the query implementation. Queries can extract any temporal
information.

@FunctionalInterface
public interface TemporalQuery&lt;R&gt; {
    R queryFrom(TemporalAccessor temporal);
}

The code above shows the simple structure of the TemporalQuery
interface. The generic type parameter R specifies the return type.
Implementations can query any aspect of temporal objects.

## Basic TemporalQuery Example

This example demonstrates creating a simple TemporalQuery that
extracts the day of week from a temporal object. The query is implemented as
a lambda expression.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalQuery;

public class Main {

    public static void main(String[] args) {
        
        TemporalQuery&lt;DayOfWeek&gt; dayOfWeekQuery = temporal -&gt; 
            DayOfWeek.from(temporal);
            
        LocalDate date = LocalDate.of(2025, 4, 16);
        DayOfWeek day = date.query(dayOfWeekQuery);
        
        System.out.println("Day of week: " + day);
    }
}

This example creates a query that extracts the day of week from any temporal
object that supports this information. The query method applies
the query to the temporal object. The result is printed to the console.

## Querying for Specific Information

This example shows how to create a query that checks if a date is a weekend.
The query returns a boolean value indicating whether the date falls on Saturday
or Sunday.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalQuery;

public class Main {

    public static void main(String[] args) {
        
        TemporalQuery&lt;Boolean&gt; isWeekendQuery = temporal -&gt; {
            DayOfWeek day = DayOfWeek.from(temporal);
            return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
        };
        
        LocalDate weekday = LocalDate.of(2025, 4, 16);
        LocalDate weekend = LocalDate.of(2025, 4, 19);
        
        System.out.println("Is weekday weekend? " + weekday.query(isWeekendQuery));
        System.out.println("Is weekend day weekend? " + weekend.query(isWeekendQuery));
    }
}

The example defines a query that checks for weekend days. The query extracts
the day of week and returns true if it's Saturday or Sunday. Two dates are
tested to demonstrate the query's functionality.

## Using Predefined TemporalQueries

The Java Time API provides several predefined queries in the
TemporalQueries class. These queries can be used directly without
creating custom implementations.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalQueries;

public class Main {

    public static void main(String[] args) {
        
        ZonedDateTime zdt = ZonedDateTime.now();
        
        // Query for local date
        LocalDate date = zdt.query(TemporalQueries.localDate());
        System.out.println("Local date: " + date);
        
        // Query for local time
        LocalTime time = zdt.query(TemporalQueries.localTime());
        System.out.println("Local time: " + time);
        
        // Query for zone
        ZoneId zone = zdt.query(TemporalQueries.zone());
        System.out.println("Zone: " + zone);
        
        // Query for precision
        System.out.println("Precision: " + zdt.query(TemporalQueries.precision()));
    }
}

This example demonstrates using predefined queries from TemporalQueries.
The queries extract different aspects of a ZonedDateTime object.
Each query returns a specific type of temporal information.

## Chaining TemporalQueries

Temporal queries can be chained to perform complex temporal operations. This
example shows how to combine multiple queries to extract specific information.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalQuery;

public class Main {

    public static void main(String[] args) {
        
        TemporalQuery&lt;Boolean&gt; isSummerQuery = temporal -&gt; {
            LocalDate date = LocalDate.from(temporal);
            return date.getMonth() == Month.JUNE 
                || date.getMonth() == Month.JULY 
                || date.getMonth() == Month.AUGUST;
        };
        
        TemporalQuery&lt;Boolean&gt; isWeekendInSummerQuery = temporal -&gt; {
            boolean isSummer = temporal.query(isSummerQuery);
            boolean isWeekend = temporal.query(t -&gt; {
                var day = java.time.DayOfWeek.from(t);
                return day == java.time.DayOfWeek.SATURDAY 
                    || day == java.time.DayOfWeek.SUNDAY;
            });
            return isSummer &amp;&amp;  isWeekend;
        };
        
        LocalDate summerWeekend = LocalDate.of(2025, 7, 19);
        LocalDate winterWeekend = LocalDate.of(2025, 1, 18);
        
        System.out.println("Is summer weekend? " + 
            summerWeekend.query(isWeekendInSummerQuery));
        System.out.println("Is winter weekend? " + 
            winterWeekend.query(isWeekendInSummerQuery));
    }
}

This example creates a complex query that checks if a date is both a weekend day
and in summer. The query combines two simpler queries to achieve this. The
result demonstrates how queries can be composed for more complex conditions.

## Querying for Custom Business Logic

Temporal queries can encapsulate business rules about dates and times. This
example shows a query that checks if a datetime is during business hours.

Main.java
  

package com.zetcode;

import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalQuery;

public class Main {

    public static void main(String[] args) {
        
        TemporalQuery&lt;Boolean&gt; isBusinessHoursQuery = temporal -&gt; {
            ZonedDateTime zdt = ZonedDateTime.from(temporal);
            LocalTime time = zdt.toLocalTime();
            DayOfWeek day = zdt.getDayOfWeek();
            
            // Business hours: 9AM-5PM, Monday-Friday
            return !(day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY)
                &amp;&amp;  time.isAfter(LocalTime.of(8, 59))
                &amp;&amp;  time.isBefore(LocalTime.of(17, 1));
        };
        
        ZonedDateTime businessTime = ZonedDateTime.of(
            2025, 4, 16, 10, 30, 0, 0, ZoneId.of("America/New_York"));
        ZonedDateTime nonBusinessTime = ZonedDateTime.of(
            2025, 4, 19, 11, 0, 0, 0, ZoneId.of("America/New_York"));
        
        System.out.println("Is business time? " + 
            businessTime.query(isBusinessHoursQuery));
        System.out.println("Is non-business time? " + 
            nonBusinessTime.query(isBusinessHoursQuery));
    }
}

This example implements business logic about working hours in a temporal query.
The query checks both the day of week and time of day. The results demonstrate
how the query correctly identifies business hours according to the defined rules.

## Using Method References as TemporalQueries

Method references can be used as concise implementations of TemporalQuery. This
example shows how to use existing methods as queries for temporal objects.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalQueries;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 16);
        
        // Using method references as queries
        Month month = date.query(LocalDate::getMonth);
        int year = date.query(LocalDate::getYear);
        int day = date.query(LocalDate::getDayOfMonth);
        
        System.out.println("Year: " + year);
        System.out.println("Month: " + month);
        System.out.println("Day: " + day);
        
        // Alternative using predefined queries
        System.out.println("Month (predefined): " + 
            date.query(TemporalQueries.localDate()).getMonth());
    }
}

This example demonstrates using method references as temporal queries. The
query method accepts method references that match the
TemporalQuery functional interface. The example shows both direct
method references and predefined queries for comparison.

## Combining TemporalQuery with TemporalAdjuster

Temporal queries can be combined with adjusters to create powerful temporal
operations. This example finds the next business day after a given date.

Main.java
  

package com.zetcode;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalQuery;

public class Main {

    public static void main(String[] args) {
        
        TemporalQuery&lt;Boolean&gt; isBusinessDayQuery = temporal -&gt; {
            DayOfWeek day = DayOfWeek.from(temporal);
            return day != DayOfWeek.SATURDAY &amp;&amp;  day != DayOfWeek.SUNDAY;
        };
        
        TemporalAdjuster nextBusinessDay = temporal -&gt; {
            LocalDate date = LocalDate.from(temporal);
            do {
                date = date.plusDays(1);
            } while (!date.query(isBusinessDayQuery));
            return date;
        };
        
        LocalDate friday = LocalDate.of(2025, 4, 18);
        LocalDate nextBusiness = friday.with(nextBusinessDay);
        
        System.out.println("Friday: " + friday);
        System.out.println("Next business day: " + nextBusiness);
    }
}

This example combines a temporal query with a temporal adjuster. The query
identifies business days, and the adjuster finds the next one. The result
demonstrates skipping weekend days to find the next working day.

## Source

[Java TemporalQuery Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQuery.html)

In this article, we've covered the essential methods and features of the Java
TemporalQuery interface. Understanding these concepts is crucial for flexible
temporal operations in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).