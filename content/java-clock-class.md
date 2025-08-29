+++
title = "Java Clock Class"
date = 2025-08-29T20:00:45.582+01:00
draft = false
description = "Complete Java Clock class tutorial covering all methods with examples. Learn about time handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Clock Class

Last modified: April 16, 2025

 

The java.time.Clock class provides access to the current instant,
date and time using a time-zone. It is designed to be used as a dependency
injection point for time-based services. Clock can be used instead of
System.currentTimeMillis().

Clock is abstract and immutable. It supports multiple time sources
including fixed clocks for testing. The class helps make code more testable by
allowing time to be controlled in unit tests.

## Clock Class Overview

Clock provides methods to get current time in various formats.
Key operations include getting instants, milliseconds, and time-zone aware
dates. The class supports both system and custom time sources.

public abstract class Clock {
    public static Clock systemUTC();
    public static Clock systemDefaultZone();
    public static Clock system(ZoneId zone);
    public static Clock fixed(Instant fixedInstant, ZoneId zone);
    public static Clock offset(Clock baseClock, Duration offsetDuration);
    public abstract ZoneId getZone();
    public abstract Clock withZone(ZoneId zone);
    public long millis();
    public abstract Instant instant();
    public boolean equals(Object obj);
    public int hashCode();
    public String toString();
}

The code above shows key methods provided by Clock. These methods
allow creating different clock implementations and accessing time values.
The class is designed for flexibility in time-sensitive applications.

## Creating Clock Objects

Clock objects can be created using various factory methods. The most common
are system clocks for different time zones and fixed clocks for testing.
Each clock type serves different use cases.

Main.java
  

package com.zetcode; 

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {
        
        // System clock in UTC
        Clock utcClock = Clock.systemUTC();
        System.out.println("UTC time: " + utcClock.instant());
        
        // System clock in default timezone
        Clock defaultClock = Clock.systemDefaultZone();
        System.out.println("Default zone time: " + defaultClock.instant());
        
        // System clock in specific timezone
        Clock parisClock = Clock.system(ZoneId.of("Europe/Paris"));
        System.out.println("Paris time: " + parisClock.instant());
        
        // Fixed clock for testing
        Clock fixedClock = Clock.fixed(Instant.now(), ZoneId.systemDefault());
        System.out.println("Fixed time: " + fixedClock.instant());
    }
}

This example demonstrates different ways to create Clock objects. The output
shows how each clock type provides time values. Fixed clocks are particularly
useful for testing time-sensitive code.

## Getting Current Time

Clock provides several methods to access current time values. These include
getting the instant, milliseconds, or time-zone specific dates. The methods
offer flexibility depending on the required precision.

Main.java
  

package com.zetcode; 

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {

    public static void main(String[] args) {

        Clock clock = Clock.systemDefaultZone();
        
        // Get current instant
        Instant instant = clock.instant();
        System.out.println("Current instant: " + instant);
        
        // Get milliseconds since epoch
        long millis = clock.millis();
        System.out.println("Milliseconds: " + millis);
        
        // Get zoned date time
        ZonedDateTime zdt = ZonedDateTime.now(clock);
        System.out.println("Zoned date time: " + zdt);
        
        // Get time zone
        ZoneId zone = clock.getZone();
        System.out.println("Time zone: " + zone);
    }
}

This example shows how to extract various time values from a Clock. The
instant() method provides the most precise time measurement.
Other methods offer convenience for different use cases.

## Using Fixed Clock for Testing

Fixed clocks are invaluable for testing time-dependent code. They allow
simulating specific points in time, making tests predictable and repeatable.
This is crucial for reliable unit testing.

Main.java
  

package com.zetcode; 

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.Duration;

public class Main {

    public static void main(String[] args) {

        // Create fixed clock for testing
        Instant testTime = Instant.parse("2025-01-01T00:00:00Z");
        Clock fixedClock = Clock.fixed(testTime, ZoneId.of("UTC"));
        
        System.out.println("Fixed time: " + fixedClock.instant());
        
        // Simulate time passing (won't actually change)
        System.out.println("After waiting: " + fixedClock.instant());
        
        // Create offset clock
        Clock offsetClock = Clock.offset(fixedClock, Duration.ofHours(2));
        System.out.println("Offset time: " + offsetClock.instant());
    }
}

This example demonstrates using fixed and offset clocks for testing scenarios.
The fixed clock always returns the same instant, while the offset clock
provides a consistent time difference. Both are useful for test cases.

## Clock with Different Time Zones

Clock can be configured with different time zones to provide localized time
values. This is useful for applications that need to display or process time
in multiple regions.

Main.java
  

package com.zetcode; 

import java.time.Clock;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {

    public static void main(String[] args) {

        // Clocks with different time zones
        Clock newYorkClock = Clock.system(ZoneId.of("America/New_York"));
        Clock tokyoClock = Clock.system(ZoneId.of("Asia/Tokyo"));
        Clock londonClock = Clock.system(ZoneId.of("Europe/London"));
        
        // Get zoned date times
        ZonedDateTime nyTime = ZonedDateTime.now(newYorkClock);
        ZonedDateTime tokyoTime = ZonedDateTime.now(tokyoClock);
        ZonedDateTime londonTime = ZonedDateTime.now(londonClock);
        
        System.out.println("New York: " + nyTime);
        System.out.println("Tokyo: " + tokyoTime);
        System.out.println("London: " + londonTime);
        
        // Change time zone of existing clock
        Clock adjustedClock = londonClock.withZone(ZoneId.of("Australia/Sydney"));
        System.out.println("Sydney: " + ZonedDateTime.now(adjustedClock));
    }
}

This example shows how Clock can provide time values for different time zones.
The withZone method creates a new clock with a different time zone.
This allows flexible time zone handling in applications.

## Comparing Clocks

Clocks can be compared for equality based on their configuration. This is
useful when verifying clock settings or ensuring consistent time sources
are used throughout an application.

Main.java
  

package com.zetcode; 

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;

public class Main {

    public static void main(String[] args) {

        Clock clock1 = Clock.systemUTC();
        Clock clock2 = Clock.system(ZoneId.of("UTC"));
        Clock clock3 = Clock.systemDefaultZone();
        Clock fixedClock = Clock.fixed(Instant.now(), ZoneId.of("UTC"));
        
        System.out.println("UTC clocks equal: " + clock1.equals(clock2));
        System.out.println("UTC vs default: " + clock1.equals(clock3));
        System.out.println("System vs fixed: " + clock1.equals(fixedClock));
        
        // Hash code comparison
        System.out.println("UTC clock hash: " + clock1.hashCode());
        System.out.println("Default clock hash: " + clock3.hashCode());
    }
}

This example demonstrates clock comparison operations. Note that clocks are
considered equal only if they have the same configuration. System clocks
with different time zones are not equal, even if they represent the same
instant.

## Using Clock in Time-Sensitive Code

Clock is designed to be injected into time-sensitive classes, making them
more testable. This pattern allows replacing the system clock with a fixed
clock during testing.

Main.java
  

package com.zetcode; 

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.Duration;

class EventLogger {
    private final Clock clock;
    
    public EventLogger(Clock clock) {
        this.clock = clock;
    }
    
    public void logEvent(String message) {
        System.out.println(clock.instant() + ": " + message);
    }
    
    public boolean isEventRecent(Instant eventTime) {
        return Duration.between(eventTime, clock.instant())
                      .compareTo(Duration.ofMinutes(5)) &lt;= 0;
    }
}

public class Main {

    public static void main(String[] args) {
        
        // Production use with system clock
        EventLogger productionLogger = new EventLogger(Clock.systemUTC());
        productionLogger.logEvent("System started");
        
        // Test use with fixed clock
        Instant testTime = Instant.parse("2025-01-01T12:00:00Z");
        Clock testClock = Clock.fixed(testTime, ZoneId.of("UTC"));
        EventLogger testLogger = new EventLogger(testClock);
        
        testLogger.logEvent("Test event");
        Instant recentEvent = Instant.parse("2025-01-01T11:55:00Z");
        System.out.println("Is event recent? " + 
            testLogger.isEventRecent(recentEvent));
    }
}

This example shows how Clock can be used to make time-sensitive code testable.
The EventLogger class accepts a Clock in its constructor, allowing tests to
use a fixed clock. This pattern is recommended for production code.

## Source

[Java Clock Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html)

In this article, we've covered the essential methods and features of the Java
Clock class. Understanding these concepts is crucial for writing testable,
time-sensitive code in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).