+++
title = "Java ZoneOffsetTransitionRule Class"
date = 2025-08-29T20:00:57.879+01:00
draft = false
description = "Complete Java ZoneOffsetTransitionRule class tutorial covering all methods with examples. Learn about timezone transitions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ZoneOffsetTransitionRule Class

Last modified: April 16, 2025

 

The java.time.zone.ZoneOffsetTransitionRule class defines rules for
timezone transitions. It specifies how daylight saving time changes occur in a
specific timezone. The class is immutable and thread-safe.

ZoneOffsetTransitionRule works with other time classes to handle
timezone transitions. It defines when transitions happen and what offsets apply
before and after. The rules are typically used by ZoneRules.

## ZoneOffsetTransitionRule Class Overview

ZoneOffsetTransitionRule provides methods to create and query
transition rules. Key operations include getting transition details and
calculating exact transition dates. The class handles complex transition rules.

public final class ZoneOffsetTransitionRule implements Serializable {
    public static ZoneOffsetTransitionRule of(
        Month month, int dayOfMonthIndicator, DayOfWeek dayOfWeek,
        LocalTime time, boolean timeEndOfDay, TimeDefinition timeDefinition,
        ZoneOffset standardOffset, ZoneOffset offsetBefore,
        ZoneOffset offsetAfter);
    public ZoneOffsetTransition createTransition(int year);
    public Month getMonth();
    public int getDayOfMonthIndicator();
    public DayOfWeek getDayOfWeek();
    public LocalTime getLocalTime();
    public boolean isMidnightEndOfDay();
    public TimeDefinition getTimeDefinition();
    public ZoneOffset getStandardOffset();
    public ZoneOffset getOffsetBefore();
    public ZoneOffset getOffsetAfter();
}

The code above shows key methods provided by ZoneOffsetTransitionRule.
These methods allow creating and querying transition rules. The class handles
complex cases like last Sunday in March or first Sunday after a specific date.

## Creating a Basic Transition Rule

This example shows how to create a simple daylight saving transition rule. The
rule defines a transition that occurs on March 31st at 01:00 local time.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.MARCH, 31, null, 
            LocalTime.of(1, 0), false, 
            TimeDefinition.WALL,
            ZoneOffset.ofHours(1), 
            ZoneOffset.ofHours(1), 
            ZoneOffset.ofHours(2));
            
        System.out.println("Transition rule: " + rule);
        
        // Create transition for specific year
        ZoneOffsetTransition transition = rule.createTransition(2025);
        System.out.println("Transition in 2025: " + transition);
    }
}

This example creates a transition rule for March 31st at 1 AM. The time definition
is WALL, meaning local wall clock time. The offset changes from +01:00 to +02:00.

## Creating a Last Sunday Rule

This example demonstrates creating a rule for the last Sunday in a month. This
pattern is common for daylight saving time transitions in many countries.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.OCTOBER, -1, DayOfWeek.SUNDAY,
            LocalTime.of(2, 0), false,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(1),
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(1));
            
        System.out.println("Last Sunday rule: " + rule);
        
        // Calculate transition for 2025
        ZoneOffsetTransition transition = rule.createTransition(2025);
        System.out.println("Transition in 2025: " + transition);
        System.out.println("Transition date: " + transition.getDateTime());
    }
}

This rule specifies the last Sunday in October at 2 AM. The dayOfMonthIndicator
is -1, indicating the last occurrence. The offset changes from +02:00 back to +01:00.

## First Sunday After Specific Date

This example shows how to create a rule for the first Sunday after a specific
date. This pattern is used by some timezones for daylight saving transitions.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.MARCH, 8, DayOfWeek.SUNDAY,
            LocalTime.of(2, 0), false,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(-5),
            ZoneOffset.ofHours(-5),
            ZoneOffset.ofHours(-4));
            
        System.out.println("First Sunday after March 8 rule: " + rule);
        
        // Calculate transitions for multiple years
        for (int year = 2023; year &lt;= 2025; year++) {
            ZoneOffsetTransition transition = rule.createTransition(year);
            System.out.println(year + " transition: " + transition.getDateTime());
        }
    }
}

This rule defines the first Sunday after March 8th at 2 AM. The offset changes
from -05:00 to -04:00. The example shows transitions for multiple years.

## Using Different Time Definitions

This example demonstrates the three different time definition types: WALL, STANDARD,
and UTC. Each affects how the transition time is interpreted.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        // WALL time (local clock time)
        ZoneOffsetTransitionRule wallRule = ZoneOffsetTransitionRule.of(
            Month.APRIL, 1, null,
            LocalTime.of(1, 30), false,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(3));
            
        // STANDARD time (standard offset time)
        ZoneOffsetTransitionRule standardRule = ZoneOffsetTransitionRule.of(
            Month.APRIL, 1, null,
            LocalTime.of(1, 30), false,
            TimeDefinition.STANDARD,
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(3));
            
        // UTC time
        ZoneOffsetTransitionRule utcRule = ZoneOffsetTransitionRule.of(
            Month.APRIL, 1, null,
            LocalTime.of(1, 30), false,
            TimeDefinition.UTC,
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(2),
            ZoneOffset.ofHours(3));
            
        System.out.println("WALL transition: " + wallRule.createTransition(2025));
        System.out.println("STANDARD transition: " + standardRule.createTransition(2025));
        System.out.println("UTC transition: " + utcRule.createTransition(2025));
    }
}

This example shows how different time definitions affect the actual transition.
WALL uses local time, STANDARD uses standard offset time, and UTC uses UTC.

## Midnight End-of-Day Transition

This example demonstrates a transition that occurs at midnight at the end of a day.
This requires special handling as midnight can be ambiguous.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.DECEMBER, 31, null,
            LocalTime.MIDNIGHT, true,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(1),
            ZoneOffset.ofHours(1),
            ZoneOffset.ofHours(0));
            
        System.out.println("End-of-day rule: " + rule);
        
        ZoneOffsetTransition transition = rule.createTransition(2025);
        System.out.println("Transition: " + transition);
        System.out.println("Instant: " + transition.getInstant());
        System.out.println("DateTimeBefore: " + transition.getDateTimeBefore());
        System.out.println("DateTimeAfter: " + transition.getDateTimeAfter());
    }
}

This rule defines a transition at midnight at the end of December 31st. The
timeEndOfDay parameter is set to true. The offset changes from +01:00 to +00:00.

## Complex Transition Rule

This example combines multiple features to create a complex transition rule. It
uses day-of-week, time definition, and different offsets.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.MARCH, 15, DayOfWeek.SATURDAY,
            LocalTime.of(1, 30), false,
            TimeDefinition.STANDARD,
            ZoneOffset.ofHours(-8),
            ZoneOffset.ofHours(-8),
            ZoneOffset.ofHours(-7));
            
        System.out.println("Complex rule: " + rule);
        
        // Show transitions for next 5 years
        for (int year = 2025; year &lt;= 2029; year++) {
            ZoneOffsetTransition transition = rule.createTransition(year);
            System.out.printf("%d: %s (day %d)%n", 
                year, transition.getDateTime(), 
                transition.getDateTime().getDayOfMonth());
        }
    }
}

This rule defines a transition on the first Saturday after March 15th at 1:30 AM
standard time. The offset changes from -08:00 to -07:00. The example shows exact
dates for multiple years.

## Querying Transition Rule Properties

This example shows how to query various properties of a transition rule. All
components of the rule can be examined individually.

Main.java
  

package com.zetcode;

import java.time.*;
import java.time.zone.*;

public class Main {

    public static void main(String[] args) {
        
        ZoneOffsetTransitionRule rule = ZoneOffsetTransitionRule.of(
            Month.APRIL, 10, DayOfWeek.SUNDAY,
            LocalTime.of(2, 0), false,
            TimeDefinition.WALL,
            ZoneOffset.ofHours(3),
            ZoneOffset.ofHours(3),
            ZoneOffset.ofHours(4));
            
        System.out.println("Month: " + rule.getMonth());
        System.out.println("Day of month indicator: " + rule.getDayOfMonthIndicator());
        System.out.println("Day of week: " + rule.getDayOfWeek());
        System.out.println("Local time: " + rule.getLocalTime());
        System.out.println("Time definition: " + rule.getTimeDefinition());
        System.out.println("Standard offset: " + rule.getStandardOffset());
        System.out.println("Offset before: " + rule.getOffsetBefore());
        System.out.println("Offset after: " + rule.getOffsetAfter());
        System.out.println("Is midnight end of day: " + rule.isMidnightEndOfDay());
    }
}

This example demonstrates how to inspect all properties of a transition rule. Each
component of the rule can be accessed through getter methods. This is useful for
analyzing or displaying rule details.

## Source

[Java ZoneOffsetTransitionRule Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/zone/ZoneOffsetTransitionRule.html)

In this article, we've covered the essential methods and features of the Java
ZoneOffsetTransitionRule class. Understanding these concepts is crucial for
working with timezone transitions in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).