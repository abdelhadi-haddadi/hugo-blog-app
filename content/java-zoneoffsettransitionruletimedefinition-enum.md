+++
title = "Java ZoneOffsetTransitionRule.TimeDefinition Enum"
date = 2025-08-29T20:00:57.908+01:00
draft = false
description = "Complete Java ZoneOffsetTransitionRule.TimeDefinition enum tutorial with examples. Learn about time zone transition rules in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ZoneOffsetTransitionRule.TimeDefinition Enum

Last modified: April 16, 2025

 

The ZoneOffsetTransitionRule.TimeDefinition enum defines how local
time is interpreted during time zone transitions. It's part of the
java.time.zone package and used in daylight saving transitions.

This enum specifies whether local time should be interpreted as UTC, wall time,
or standard time during transitions. It helps determine the exact moment when
a time zone offset change occurs. The enum is used internally by the Java time
API.

## TimeDefinition Enum Overview

The TimeDefinition enum has three possible values that define how
to interpret local time during transitions. Each value provides different
behavior for converting between local time and UTC during transitions.

public enum TimeDefinition {
    UTC,
    WALL,
    STANDARD;
    
    public abstract OffsetDateTime createDateTime(
        LocalDateTime dateTime,
        ZoneOffset standardOffset,
        ZoneOffset wallOffset);
}

The code above shows the enum declaration and its values. Each value defines
a different way to interpret local time during zone offset transitions. The
createDateTime method implements the specific conversion logic.

## UTC Time Definition

The UTC value means local time should be interpreted as UTC during
the transition. This is the simplest case where local time matches UTC exactly.
No offset adjustments are applied.

Main.java
  

import java.time.*;
import java.time.zone.*;

public class Main {
    public static void main(String[] args) {
        LocalDateTime localTime = LocalDateTime.of(2025, 3, 10, 2, 0);
        ZoneOffset standardOffset = ZoneOffset.ofHours(-5);
        ZoneOffset wallOffset = ZoneOffset.ofHours(-4);
        
        OffsetDateTime result = TimeDefinition.UTC.createDateTime(
            localTime, standardOffset, wallOffset);
            
        System.out.println("UTC interpretation: " + result);
    }
}

This example shows how UTC interpretation works. The local time is treated as
UTC, so the resulting OffsetDateTime has no additional offset applied. This
is useful when transition times are specified in UTC.

## WALL Time Definition

The WALL value means local time should be interpreted as wall clock
time during the transition. This is the most common case for daylight saving
changes where the local clock moves forward or backward.

Main.java
  

import java.time.*;
import java.time.zone.*;

public class Main {
    public static void main(String[] args) {
        LocalDateTime localTime = LocalDateTime.of(2025, 3, 10, 2, 0);
        ZoneOffset standardOffset = ZoneOffset.ofHours(-5);
        ZoneOffset wallOffset = ZoneOffset.ofHours(-4);
        
        OffsetDateTime result = TimeDefinition.WALL.createDateTime(
            localTime, standardOffset, wallOffset);
            
        System.out.println("WALL interpretation: " + result);
    }
}

This example demonstrates WALL time interpretation. The local time is treated as
wall clock time, so the wall offset (-4 hours) is applied. This represents the
actual time shown on clocks during daylight saving time.

## STANDARD Time Definition

The STANDARD value means local time should be interpreted as
standard time during the transition. This uses the standard offset without
daylight saving adjustments.

Main.java
  

import java.time.*;
import java.time.zone.*;

public class Main {
    public static void main(String[] args) {
        LocalDateTime localTime = LocalDateTime.of(2025, 3, 10, 2, 0);
        ZoneOffset standardOffset = ZoneOffset.ofHours(-5);
        ZoneOffset wallOffset = ZoneOffset.ofHours(-4);
        
        OffsetDateTime result = TimeDefinition.STANDARD.createDateTime(
            localTime, standardOffset, wallOffset);
            
        System.out.println("STANDARD interpretation: " + result);
    }
}

This example shows STANDARD time interpretation. The local time is treated as
standard time, so the standard offset (-5 hours) is applied. This represents
the time without daylight saving adjustments.

## Creating Transition Rules

The TimeDefinition is used when creating zone offset transition
rules. These rules define how and when time zone offsets change throughout
the year.

Main.java
  

import java.time.*;
import java.time.zone.*;

public class Main {
    public static void main(String[] args) {
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.MARCH, 10, DayOfWeek.SUNDAY, 
            LocalTime.of(2, 0), false,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(-5), 
            ZoneOffset.ofHours(-5), 
            ZoneOffset.ofHours(-4));
            
        System.out.println("Transition rule: " + rule);
    }
}

This example creates a transition rule using WALL time definition. The rule
specifies a daylight saving transition on the second Sunday of March at 2 AM.
The time is interpreted as wall clock time during the transition.

## Comparing Time Definitions

Different time definitions can produce different results for the same local time.
This example compares all three definitions with the same input parameters.

Main.java
  

import java.time.*;
import java.time.zone.*;

public class Main {
    public static void main(String[] args) {
        LocalDateTime localTime = LocalDateTime.of(2025, 11, 3, 1, 30);
        ZoneOffset standardOffset = ZoneOffset.ofHours(-5);
        ZoneOffset wallOffset = ZoneOffset.ofHours(-4);
        
        System.out.println("UTC: " + 
            TimeDefinition.UTC.createDateTime(localTime, standardOffset, wallOffset));
        System.out.println("WALL: " + 
            TimeDefinition.WALL.createDateTime(localTime, standardOffset, wallOffset));
        System.out.println("STANDARD: " + 
            TimeDefinition.STANDARD.createDateTime(localTime, standardOffset, wallOffset));
    }
}

This example clearly shows how each time definition interprets the same local
time differently. UTC treats it as UTC time, WALL applies the wall offset,
and STANDARD uses the standard offset.

## Real-world Transition Example

This example demonstrates a real-world daylight saving transition using the
WALL time definition, which is typical for most time zones.

Main.java
  

import java.time.*;
import java.time.zone.*;

public class Main {
    public static void main(String[] args) {
        // New York DST transition in 2025 (spring forward)
        ZoneOffsetTransitionRule springRule = ZoneOffsetTransitionRule.of(
            Month.MARCH, 10, DayOfWeek.SUNDAY, 
            LocalTime.of(2, 0), false,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(-5), 
            ZoneOffset.ofHours(-5), 
            ZoneOffset.ofHours(-4));
            
        // Apply the transition
        LocalDateTime beforeTransition = LocalDateTime.of(2025, 3, 10, 1, 59);
        LocalDateTime transitionTime = LocalDateTime.of(2025, 3, 10, 2, 0);
        LocalDateTime afterTransition = LocalDateTime.of(2025, 3, 10, 3, 0);
        
        System.out.println("Before: " + springRule.createDateTime(beforeTransition, 
            ZoneOffset.ofHours(-5), ZoneOffset.ofHours(-5)));
        System.out.println("At transition: " + springRule.createDateTime(transitionTime, 
            ZoneOffset.ofHours(-5), ZoneOffset.ofHours(-4)));
        System.out.println("After: " + springRule.createDateTime(afterTransition, 
            ZoneOffset.ofHours(-5), ZoneOffset.ofHours(-4)));
    }
}

This example models a daylight saving time transition in New York. At 2 AM
wall clock time, the offset changes from -5 to -4 hours. The WALL definition
ensures the transition happens at the correct local time.

## Source

[Java TimeDefinition Enum Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/zone/ZoneOffsetTransitionRule.TimeDefinition.html)

In this article, we've covered the TimeDefinition enum and its role in time
zone transitions. Understanding these concepts is crucial for working with
time zones and daylight saving changes in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).