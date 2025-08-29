+++
title = "Java TemporalAdjuster Interface"
date = 2025-08-29T20:00:41.410+01:00
draft = false
description = "Complete Java TemporalAdjuster interface tutorial covering all methods with examples. Learn about date adjustments in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalAdjuster Interface

Last modified: April 16, 2025

 

The java.time.temporal.TemporalAdjuster interface provides
flexible date adjustments. It allows complex date manipulations beyond simple
plus/minus operations. Implementations can find the next or previous day of week.

TemporalAdjuster is a functional interface with a single method.
It works with all temporal types in the java.time package. Common adjustments
are provided by the TemporalAdjusters utility class.

## TemporalAdjuster Interface Overview

The interface defines one method adjustInto that takes a temporal
object and returns an adjusted version. The TemporalAdjusters class
provides many predefined adjusters. Custom adjusters can implement complex logic.

public interface TemporalAdjuster {
    Temporal adjustInto(Temporal temporal);
}

public final class TemporalAdjusters {
    public static TemporalAdjuster firstDayOfMonth();
    public static TemporalAdjuster lastDayOfMonth();
    public static TemporalAdjuster firstDayOfNextMonth();
    public static TemporalAdjuster firstDayOfYear();
    public static TemporalAdjuster lastDayOfYear();
    public static TemporalAdjuster firstDayOfNextYear();
    public static TemporalAdjuster next(DayOfWeek dayOfWeek);
    public static TemporalAdjuster nextOrSame(DayOfWeek dayOfWeek);
    public static TemporalAdjuster previous(DayOfWeek dayOfWeek);
    public static TemporalAdjuster previousOrSame(DayOfWeek dayOfWeek);
}

The code shows the interface and key methods from TemporalAdjusters.
These provide common date adjustments like finding month boundaries or specific
weekdays. The adjusters are thread-safe and immutable.

## Using Predefined Adjusters

The TemporalAdjusters class provides many useful adjusters. These
handle common cases like finding month boundaries or specific weekdays. They can
be used with any temporal type that supports the adjustment.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, Month.APRIL, 15);
        
        // First day of month
        LocalDate firstDay = date.with(TemporalAdjusters.firstDayOfMonth());
        System.out.println("First day of month: " + firstDay);
        
        // Last day of month
        LocalDate lastDay = date.with(TemporalAdjusters.lastDayOfMonth());
        System.out.println("Last day of month: " + lastDay);
        
        // Next Tuesday
        LocalDate nextTuesday = date.with(TemporalAdjusters.next(DayOfWeek.TUESDAY));
        System.out.println("Next Tuesday: " + nextTuesday);
        
        // First day of next year
        LocalDate firstNextYear = date.with(TemporalAdjusters.firstDayOfNextYear());
        System.out.println("First day of next year: " + firstNextYear);
    }
}

This example demonstrates several predefined adjusters. Each adjustment creates
a new date object without modifying the original. The adjusters handle edge cases
like month length variations automatically.

## Finding Weekdays

TemporalAdjusters provides methods to find specific weekdays relative to a date.
These include next, previous, and same-day variants. They are useful for
scheduling recurring events.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, Month.APRIL, 15); // Tuesday
        
        // Next Friday
        LocalDate nextFriday = date.with(TemporalAdjusters.next(DayOfWeek.FRIDAY));
        System.out.println("Next Friday: " + nextFriday);
        
        // Previous Monday
        LocalDate prevMonday = date.with(TemporalAdjusters.previous(DayOfWeek.MONDAY));
        System.out.println("Previous Monday: " + prevMonday);
        
        // Next or same Wednesday
        LocalDate nextOrSameWed = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.WEDNESDAY));
        System.out.println("Next or same Wednesday: " + nextOrSameWed);
        
        // Previous or same Friday
        LocalDate prevOrSameFri = date.with(TemporalAdjusters.previousOrSame(DayOfWeek.FRIDAY));
        System.out.println("Previous or same Friday: " + prevOrSameFri);
    }
}

This example shows weekday-related adjusters. The "next" and "previous" methods
exclude the current day if it matches. The "OrSame" variants include the current
day when it matches the target weekday.

## Custom Temporal Adjuster

Custom adjusters can implement complex date logic. They are created by
implementing the interface or using lambda expressions. This provides flexibility
for business-specific date rules.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAdjuster;

public class Main {

    static class NextPaydayAdjuster implements TemporalAdjuster {
        @Override
        public Temporal adjustInto(Temporal temporal) {
            LocalDate date = LocalDate.from(temporal);
            int day = date.getDayOfMonth();
            
            if (day &lt; 15) {
                return date.withDayOfMonth(15);
            } else {
                return date.withDayOfMonth(date.lengthOfMonth());
            }
        }
    }

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, Month.APRIL, 10);
        TemporalAdjuster paydayAdjuster = new NextPaydayAdjuster();
        
        // Using class implementation
        LocalDate nextPayday = date.with(paydayAdjuster);
        System.out.println("Next payday: " + nextPayday);
        
        // Using lambda expression
        TemporalAdjuster taxDayAdjuster = t -&gt; {
            LocalDate d = LocalDate.from(t);
            return d.withMonth(4).withDayOfMonth(15);
        };
        
        LocalDate taxDay = date.with(taxDayAdjuster);
        System.out.println("Tax day: " + taxDay);
    }
}

This example shows two ways to create custom adjusters. The first uses a class
implementing the interface. The second uses a lambda expression. Both approaches
can implement any date calculation logic needed.

## Combining Adjusters

Adjusters can be combined to perform multiple operations in sequence. Each
adjustment is applied to the result of the previous one. This allows building
complex date calculations from simple steps.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, Month.APRIL, 15);
        
        // First go to first of month, then find next Friday
        LocalDate result = date.with(TemporalAdjusters.firstDayOfMonth())
                              .with(TemporalAdjusters.next(DayOfWeek.FRIDAY));
        System.out.println("First Friday of month: " + result);
        
        // First find next Monday, then go to end of that month
        LocalDate result2 = date.with(TemporalAdjusters.next(DayOfWeek.MONDAY))
                               .with(TemporalAdjusters.lastDayOfMonth());
        System.out.println("Last day of month containing next Monday: " + result2);
        
        // Custom combined adjuster
        TemporalAdjuster combined = t -&gt; {
            Temporal temp = TemporalAdjusters.firstDayOfMonth().adjustInto(t);
            return TemporalAdjusters.next(DayOfWeek.WEDNESDAY).adjustInto(temp);
        };
        
        LocalDate result3 = date.with(combined);
        System.out.println("First Wednesday of month: " + result3);
    }
}

This example demonstrates combining adjusters in different ways. The first two
examples chain adjustments directly. The third creates a combined adjuster as
a lambda. All approaches achieve the same goal of sequential adjustments.

## Adjusting Time Objects

While commonly used with dates, TemporalAdjusters work with time objects too.
They can adjust LocalDateTime, ZonedDateTime, and other temporal types. The
adjustment logic must be compatible with the temporal type.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;

public class Main {

    public static void main(String[] args) {
        
        LocalDateTime dateTime = LocalDateTime.of(2025, 4, 15, 10, 30);
        
        // Adjust LocalDateTime
        LocalDateTime nextMonday = dateTime.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        System.out.println("Next Monday at same time: " + nextMonday);
        
        // Adjust ZonedDateTime
        ZonedDateTime zoned = ZonedDateTime.now(ZoneId.of("America/New_York"));
        ZonedDateTime lastDay = zoned.with(TemporalAdjusters.lastDayOfMonth());
        System.out.println("Last day of month in NY: " + lastDay);
        
        // Custom time adjuster
        TemporalAdjuster toNoon = t -&gt; {
            if (t.isSupported(ChronoField.HOUR_OF_DAY)) {
                return t.with(ChronoField.HOUR_OF_DAY, 12)
                       .with(ChronoField.MINUTE_OF_HOUR, 0)
                       .with(ChronoField.SECOND_OF_MINUTE, 0);
            }
            return t;
        };
        
        LocalDateTime noon = dateTime.with(toNoon);
        System.out.println("Adjusted to noon: " + noon);
    }
}

This example shows adjusters working with different temporal types. The custom
time adjuster demonstrates handling time fields specifically. Note the check for
field support before attempting adjustment.

## Business Day Adjuster

A common use case is adjusting dates to business days. This requires skipping
weekends and potentially holidays. The example shows a basic business day
adjuster implementation.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.ChronoUnit;

public class Main {

    static class BusinessDaysAdjuster implements TemporalAdjuster {
        private final int days;
        
        public BusinessDaysAdjuster(int days) {
            this.days = days;
        }
        
        @Override
        public Temporal adjustInto(Temporal temporal) {
            LocalDate date = LocalDate.from(temporal);
            int remaining = days;
            int step = Integer.signum(remaining);
            
            while (remaining != 0) {
                date = date.plus(step, ChronoUnit.DAYS);
                if (date.getDayOfWeek() != DayOfWeek.SATURDAY &amp;&amp;
                    date.getDayOfWeek() != DayOfWeek.SUNDAY) {
                    remaining -= step;
                }
            }
            return temporal.with(date);
        }
    }

    public static void main(String[] args) {
        
        LocalDate date = LocalDate.of(2025, 4, 15); // Tuesday
        TemporalAdjuster add5BusinessDays = new BusinessDaysAdjuster(5);
        TemporalAdjuster subtract3BusinessDays = new BusinessDaysAdjuster(-3);
        
        LocalDate in5Days = date.with(add5BusinessDays);
        System.out.println("5 business days later: " + in5Days);
        
        LocalDate before3Days = date.with(subtract3BusinessDays);
        System.out.println("3 business days before: " + before3Days);
    }
}

This example implements a business day adjuster that skips weekends. The adjuster
works for both forward and backward adjustments. More complex versions could
incorporate holiday calendars for complete business date calculations.

## Source

[Java TemporalAdjuster Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAdjuster.html)

In this article, we've covered the essential methods and features of the Java
TemporalAdjuster interface. Understanding these concepts is crucial for complex
date manipulations in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).