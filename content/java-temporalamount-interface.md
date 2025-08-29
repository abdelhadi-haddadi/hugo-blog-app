+++
title = "Java TemporalAmount Interface"
date = 2025-08-29T20:00:42.196+01:00
draft = false
description = "Complete Java TemporalAmount interface tutorial covering all methods with examples. Learn about time handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java TemporalAmount Interface

Last modified: April 16, 2025

 

The java.time.temporal.TemporalAmount interface represents an amount
of time. It can be used to define quantities like "2 hours" or "5 days". This
interface is implemented by classes like Duration and Period.

TemporalAmount provides methods to add or subtract time amounts from
temporal objects. It works with both date-based and time-based amounts. The
interface is part of Java's modern date-time API introduced in Java 8.

## TemporalAmount Interface Overview

The TemporalAmount interface defines methods for time manipulation.
Key implementations are Duration (time-based) and Period (date-based). The
interface enables flexible time calculations across different temporal types.

public interface TemporalAmount {
    long get(TemporalUnit unit);
    List&lt;TemporalUnit&gt; getUnits();
    Temporal addTo(Temporal temporal);
    Temporal subtractFrom(Temporal temporal);
}

The code above shows the methods defined by TemporalAmount. These
methods allow querying units, getting values, and performing temporal arithmetic.
Implementations must handle unit conversions and boundary conditions.

## Using Duration with TemporalAmount

Duration is a time-based implementation of TemporalAmount. It represents an
amount of time in seconds and nanoseconds. Duration is ideal for precise time
measurements.

Main.java
  

package com.zetcode;

import java.time.Duration;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {
        
        Duration duration = Duration.ofHours(2).plusMinutes(30);
        
        // Get units
        System.out.println("Units: " + duration.getUnits());
        
        // Get value in seconds
        System.out.println("Seconds: " + duration.getSeconds());
        
        // Add to temporal object
        LocalTime time = LocalTime.of(10, 0);
        LocalTime newTime = (LocalTime) duration.addTo(time);
        System.out.println("New time: " + newTime);
        
        // Subtract from temporal object
        LocalTime earlierTime = (LocalTime) duration.subtractFrom(time);
        System.out.println("Earlier time: " + earlierTime);
    }
}

This example demonstrates using Duration as a TemporalAmount. We create a duration
of 2.5 hours, then add and subtract it from a LocalTime. The getUnits() method
shows which time units the duration contains.

## Using Period with TemporalAmount

Period is a date-based implementation of TemporalAmount. It represents an amount
of time in years, months, and days. Period is useful for calendar-based date
calculations.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Period;

public class Main {

    public static void main(String[] args) {
        
        Period period = Period.ofYears(1).plusMonths(2).plusDays(3);
        
        // Get units
        System.out.println("Units: " + period.getUnits());
        
        // Get values
        System.out.println("Years: " + period.getYears());
        System.out.println("Months: " + period.getMonths());
        System.out.println("Days: " + period.getDays());
        
        // Add to temporal object
        LocalDate date = LocalDate.of(2025, 1, 1);
        LocalDate newDate = (LocalDate) period.addTo(date);
        System.out.println("New date: " + newDate);
    }
}

This example shows Period being used as a TemporalAmount. We create a period of
1 year, 2 months, and 3 days, then add it to a LocalDate. Period handles
calendar-aware date arithmetic automatically.

## Custom TemporalAmount Implementation

We can create custom implementations of TemporalAmount for specialized time
calculations. This example shows a simple implementation representing business
days only.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAmount;
import java.time.temporal.TemporalUnit;
import java.util.Collections;
import java.util.List;

public class Main {

    static class BusinessDays implements TemporalAmount {
        private final long days;

        public BusinessDays(long days) {
            this.days = days;
        }

        @Override
        public Temporal addTo(Temporal temporal) {
            LocalDate date = LocalDate.from(temporal);
            long added = 0;
            while (added &lt; days) {
                date = date.plus(1, ChronoUnit.DAYS);
                if (date.getDayOfWeek().getValue() &lt; 6) {
                    added++;
                }
            }
            return temporal.with(date);
        }

        @Override
        public Temporal subtractFrom(Temporal temporal) {
            return addTo(temporal).minus(days * 2, ChronoUnit.DAYS);
        }

        @Override
        public long get(TemporalUnit unit) {
            if (unit == ChronoUnit.DAYS) {
                return days;
            }
            throw new UnsupportedTemporalTypeException("Unsupported unit: " + unit);
        }

        @Override
        public List getUnits() {
            return Collections.singletonList(ChronoUnit.DAYS);
        }
    }

    public static void main(String[] args) {
        BusinessDays businessDays = new BusinessDays(5);
        LocalDate startDate = LocalDate.of(2025, 4, 1); // Tuesday
        
        LocalDate endDate = (LocalDate) businessDays.addTo(startDate);
        System.out.println("Start date: " + startDate);
        System.out.println("End date (5 business days later): " + endDate);
    }
}

This example demonstrates a custom TemporalAmount that skips weekends. The
BusinessDays class adds only weekdays when performing date arithmetic. This
shows how to create specialized time calculations for business applications.

## Combining TemporalAmount Implementations

We can combine different TemporalAmount implementations for complex time
calculations. This example mixes Period and Duration for a complete time span.

Main.java
  

package com.zetcode;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.temporal.TemporalAmount;

public class Main {

    public static void main(String[] args) {
        // Date-based amount
        Period period = Period.of(1, 2, 3); // 1 year, 2 months, 3 days
        
        // Time-based amount
        Duration duration = Duration.ofHours(4).plusMinutes(30);
        
        LocalDateTime dateTime = LocalDateTime.of(2025, 1, 1, 10, 0);
        System.out.println("Original: " + dateTime);
        
        // Apply period first (date-based)
        LocalDateTime afterPeriod = (LocalDateTime) period.addTo(dateTime);
        System.out.println("After period: " + afterPeriod);
        
        // Then apply duration (time-based)
        LocalDateTime afterBoth = (LocalDateTime) duration.addTo(afterPeriod);
        System.out.println("After both: " + afterBoth);
        
        // Combined operation
        LocalDateTime combined = dateTime
            .plus(period)
            .plus(duration);
        System.out.println("Combined result: " + combined);
    }
}

This example shows how to combine Period and Duration operations. We first add
a period (date-based) then a duration (time-based) to a LocalDateTime. The
result demonstrates complex temporal arithmetic using multiple TemporalAmounts.

## Querying TemporalAmount Values

The TemporalAmount interface provides methods to query its component values.
This example shows how to examine the units and values of different amounts.

Main.java
  

package com.zetcode;

import java.time.Duration;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAmount;
import java.time.temporal.TemporalUnit;

public class Main {

    public static void main(String[] args) {
        TemporalAmount[] amounts = {
            Period.of(1, 2, 3),
            Duration.ofHours(2).plusMinutes(30),
            Duration.ofDays(1).plusHours(6)
        };
        
        for (TemporalAmount amount : amounts) {
            System.out.println("\nAmount: " + amount);
            System.out.println("Units: " + amount.getUnits());
            
            for (TemporalUnit unit : amount.getUnits()) {
                System.out.println(unit + ": " + amount.get(unit));
            }
        }
        
        // Custom query for specific unit
        Duration duration = Duration.ofMinutes(90);
        long hours = duration.get(ChronoUnit.HOURS);
        long minutes = duration.get(ChronoUnit.MINUTES);
        System.out.println("\n90 minutes = " + hours + " hours " + 
            (minutes - hours * 60) + " minutes");
    }
}

This example demonstrates how to query the components of TemporalAmount objects.
We examine both Period and Duration instances, showing their units and values.
The get() method allows accessing specific unit values from the amount.

## Using TemporalAmount with TemporalAdjuster

TemporalAmount can be used with TemporalAdjuster for more complex date
manipulations. This example shows combining these interfaces for flexible
date calculations.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAmount;

public class Main {

    static class NextBusinessDayAdjuster implements TemporalAdjuster {
        private final TemporalAmount amount;
        
        public NextBusinessDayAdjuster(TemporalAmount amount) {
            this.amount = amount;
        }
        
        @Override
        public Temporal adjustInto(Temporal temporal) {
            Temporal adjusted = amount.addTo(temporal);
            LocalDate date = LocalDate.from(adjusted);
            
            // Adjust to next business day if needed
            while (date.getDayOfWeek().getValue() &gt;= 6) {
                date = date.plusDays(1);
            }
            return temporal.with(date);
        }
    }

    public static void main(String[] args) {
        TemporalAmount twoDays = Period.ofDays(2);
        TemporalAdjuster adjuster = new NextBusinessDayAdjuster(twoDays);
        
        LocalDate friday = LocalDate.of(2025, 4, 4); // Friday
        LocalDate nextBusinessDay = friday.with(adjuster);
        
        System.out.println("Friday: " + friday);
        System.out.println("Two business days later: " + nextBusinessDay);
        
        // Using with Period
        Period period = Period.ofWeeks(1);
        LocalDate inOneWeek = friday.with(new NextBusinessDayAdjuster(period));
        System.out.println("One business week later: " + inOneWeek);
    }
}

This example combines TemporalAmount with TemporalAdjuster to create business-day
aware date calculations. The adjuster ensures results land on business days,
even when adding standard time amounts. This demonstrates powerful temporal
manipulation.

## Source

[Java TemporalAmount Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAmount.html)

In this article, we've covered the essential methods and features of the Java
TemporalAmount interface. Understanding these concepts is crucial for flexible
time handling in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).