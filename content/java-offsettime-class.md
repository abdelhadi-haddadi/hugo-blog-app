+++
title = "Java OffsetTime Class"
date = 2025-08-29T20:00:51.176+01:00
draft = false
description = "Complete Java OffsetTime class tutorial covering all methods with examples. Learn about time handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java OffsetTime Class

Last modified: April 16, 2025

 

The java.time.OffsetTime class represents a time with an offset from
UTC/Greenwich. It stores time to nanosecond precision along with a zone offset.
This is useful for representing times in different time zones.

OffsetTime is immutable and thread-safe. It combines a LocalTime with
a ZoneOffset. The class is ideal for applications that need to record times with
their UTC offset but without a full timezone ID.

## OffsetTime Class Overview

OffsetTime provides methods to create, parse, and manipulate times
with offsets. Key operations include time comparison, time arithmetic, and
formatting. The class handles time precision up to nanoseconds.

public final class OffsetTime implements Temporal, TemporalAdjuster, 
    Comparable&lt;OffsetTime&gt;, Serializable {
    public static OffsetTime now();
    public static OffsetTime now(ZoneId zone);
    public static OffsetTime of(LocalTime time, ZoneOffset offset);
    public static OffsetTime parse(CharSequence text);
    public LocalTime toLocalTime();
    public ZoneOffset getOffset();
    public int getHour();
    public int getMinute();
    public int getSecond();
    public int getNano();
    public boolean isBefore(OffsetTime other);
    public boolean isAfter(OffsetTime other);
    public OffsetTime plusHours(long hours);
    public OffsetTime minusMinutes(long minutes);
}

The code above shows key methods provided by OffsetTime. These
methods allow creating, comparing, and manipulating times with offsets. The
class provides precision up to nanoseconds while maintaining timezone awareness.

## Creating OffsetTime Objects

OffsetTime objects can be created in several ways. The most common methods are
now for current time and factory methods for specific times. Parsing
from strings is also supported.

Main.java
  

package com.zetcode; 

import java.time.OffsetTime;
import java.time.ZoneOffset;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {
        
        // Current offset time
        OffsetTime now = OffsetTime.now();
        System.out.println("Current offset time: " + now);
        
        // From LocalTime and ZoneOffset
        OffsetTime specific = OffsetTime.of(
            LocalTime.of(14, 30), 
            ZoneOffset.ofHours(2)
        );
        System.out.println("Specific offset time: " + specific);
        
        // From string
        OffsetTime parsed = OffsetTime.parse("10:15:30+01:00");
        System.out.println("Parsed from string: " + parsed);
        
        // With specific zone
        OffsetTime inZone = OffsetTime.now(ZoneOffset.of("-05:00"));
        System.out.println("Time in -05:00 offset: " + inZone);
    }
}

This example demonstrates different ways to create OffsetTime objects. The output
shows times in ISO-8601 format with their offsets. The now method
uses the system default offset where available.

## Getting OffsetTime Components

An OffsetTime can be decomposed into its time components and offset. These values
represent the local time and its UTC offset. The methods are useful for
displaying or processing time parts separately.

Main.java
  

package com.zetcode; 

import java.time.OffsetTime;

public class Main {

    public static void main(String[] args) {

        OffsetTime offsetTime = OffsetTime.parse("15:45:30.123456789+02:00");
        
        // Get time components
        System.out.println("Hour: " + offsetTime.getHour());
        System.out.println("Minute: " + offsetTime.getMinute());
        System.out.println("Second: " + offsetTime.getSecond());
        System.out.println("Nano: " + offsetTime.getNano());
        
        // Get offset
        System.out.println("Offset: " + offsetTime.getOffset());
        
        // Get LocalTime part
        System.out.println("Local time: " + offsetTime.toLocalTime());
    }
}

This example shows how to extract components from an OffsetTime. The time parts
are relative to the local time, not UTC. The offset represents the difference
from UTC/Greenwich.

## Comparing OffsetTimes

OffsetTimes can be compared to determine chronological order. The class provides
isBefore, isAfter, and compareTo methods.
Comparisons consider both the time and offset components.

Main.java
  

package com.zetcode; 

import java.time.OffsetTime;
import java.time.ZoneOffset;

public class Main {

    public static void main(String[] args) {

        OffsetTime time1 = OffsetTime.parse("10:00:00+01:00");
        OffsetTime time2 = OffsetTime.parse("11:00:00+02:00");
        OffsetTime time3 = OffsetTime.parse("09:00:00+00:00");
        
        System.out.println("time1 is before time2: " + time1.isBefore(time2));
        System.out.println("time1 is after time3: " + time1.isAfter(time3));
        System.out.println("Comparison time1 vs time2: " + time1.compareTo(time2));
        
        // Equality check
        OffsetTime sameTime = OffsetTime.of(time1.toLocalTime(), time1.getOffset());
        System.out.println("time1 equals sameTime: " + time1.equals(sameTime));
    }
}

This example demonstrates various ways to compare OffsetTime objects. The
comparison methods consider both the local time and offset. Note that equality
requires both components to match exactly.

## Adding and Subtracting Time

OffsetTime supports temporal arithmetic through plus and
minus methods. These operations are useful for calculating future
or past times. The offset remains unchanged during these operations.

Main.java
  

package com.zetcode; 

import java.time.OffsetTime;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void main(String[] args) {

        OffsetTime now = OffsetTime.now();
        
        // Add hours
        OffsetTime inTwoHours = now.plusHours(2);
        System.out.println("In two hours: " + inTwoHours);
        
        // Subtract minutes
        OffsetTime thirtyMinsAgo = now.minusMinutes(30);
        System.out.println("Thirty minutes ago: " + thirtyMinsAgo);
        
        // Add using ChronoUnit
        OffsetTime in90Secs = now.plus(90, ChronoUnit.SECONDS);
        System.out.println("In 90 seconds: " + in90Secs);
        
        // Complex operation
        OffsetTime modified = now.plusHours(3).minusMinutes(15);
        System.out.println("Modified time: " + modified);
    }
}

This example shows various ways to perform temporal arithmetic with OffsetTime.
Operations can use specific unit methods or ChronoUnit. All calculations affect
only the time component while preserving the original offset.

## Converting Between Time Types

OffsetTime can be converted to and from other temporal types like LocalTime.
These conversions are essential when working with different time representations.

Main.java
  

package com.zetcode; 

import java.time.OffsetTime;
import java.time.LocalTime;
import java.time.ZoneOffset;

public class Main {

    public static void main(String[] args) {

        OffsetTime offsetTime = OffsetTime.parse("14:30:15+03:00");
        
        // Convert to LocalTime
        LocalTime localTime = offsetTime.toLocalTime();
        System.out.println("Local time: " + localTime);
        
        // Convert back to OffsetTime
        OffsetTime back = OffsetTime.of(localTime, ZoneOffset.ofHours(2));
        System.out.println("New offset time: " + back);
        
        // With different offset
        OffsetTime sameTimeDiffOffset = offsetTime.withOffsetSameLocal(
            ZoneOffset.ofHours(-5)
        );
        System.out.println("Same local time, different offset: " + 
            sameTimeDiffOffset);
    }
}

This example demonstrates conversions between OffsetTime and other temporal types.
Note that converting to LocalTime loses the offset information. The
withOffsetSameLocal method changes just the offset.

## Formatting and Parsing

OffsetTime supports formatting and parsing through DateTimeFormatter. This allows
custom string representations of times with offsets.

Main.java
  

package com.zetcode; 

import java.time.OffsetTime;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        OffsetTime time = OffsetTime.parse("16:45:30+02:00");
        
        // Predefined formatters
        DateTimeFormatter isoFormatter = DateTimeFormatter.ISO_OFFSET_TIME;
        System.out.println("ISO format: " + isoFormatter.format(time));
        
        // Custom formatter
        DateTimeFormatter customFormatter = DateTimeFormatter
            .ofPattern("hh:mm a xxx");
        String formatted = customFormatter.format(time);
        System.out.println("Custom format: " + formatted);
        
        // Parsing with custom format
        OffsetTime parsed = OffsetTime.parse("09:30 PM +0000", 
            DateTimeFormatter.ofPattern("hh:mm a xx"));
        System.out.println("Parsed custom format: " + parsed);
    }
}

This example shows how to format and parse OffsetTime objects. The
DateTimeFormatter provides flexible pattern-based formatting. Both predefined
and custom patterns are supported for parsing and formatting.

## Source

[Java OffsetTime Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/OffsetTime.html)

In this article, we've covered the essential methods and features of the Java
OffsetTime class. Understanding these concepts is crucial for accurate time
handling with offsets in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).