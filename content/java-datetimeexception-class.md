+++
title = "Java DateTimeException Class"
date = 2025-08-29T20:00:46.740+01:00
draft = false
description = "Complete Java DateTimeException class tutorial covering all methods with examples. Learn about date-time error handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DateTimeException Class

Last modified: April 16, 2025

 

The java.time.DateTimeException is a runtime exception thrown when
date-time operations fail. It indicates invalid date, time, or time-zone data.
This exception is unchecked, meaning it doesn't need to be declared in throws.

DateTimeException extends RuntimeException. It's used
throughout the java.time package. Common cases include invalid date values,
unsupported fields, and parsing errors. The exception provides detailed messages.

## DateTimeException Class Overview

DateTimeException is thrown by methods in the java.time API. It
replaces the older IllegalArgumentException for date-time issues.
The class helps identify specific problems with temporal data.

public class DateTimeException extends RuntimeException {
    public DateTimeException(String message);
    public DateTimeException(String message, Throwable cause);
}

The code shows the DateTimeException class structure. It provides standard
exception constructors. The message describes the error, while cause tracks
underlying exceptions. This helps with debugging temporal problems.

## Invalid Date Example

This example demonstrates DateTimeException when creating an invalid date. The
LocalDate class throws it when day exceeds month's maximum days.

Main.java
  

package com.zetcode;

import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        try {
            // February 30 doesn't exist
            LocalDate invalidDate = LocalDate.of(2025, 2, 30);
            System.out.println("Created date: " + invalidDate);
        } catch (DateTimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

The code attempts to create February 30, which is invalid. DateTimeException
is thrown with a message about invalid value for day. The catch block handles
the exception gracefully.

## Invalid Time Example

This example shows DateTimeException for invalid time values. LocalTime throws
it when hour exceeds 23 or minute exceeds 59.

Main.java
  

package com.zetcode;

import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {
        try {
            // 25:00 is not a valid time
            LocalTime invalidTime = LocalTime.of(25, 0);
            System.out.println("Created time: " + invalidTime);
        } catch (DateTimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

The code tries to create a time of 25:00 which doesn't exist. DateTimeException
is thrown with details about invalid hour value. The exception prevents creation
of invalid time objects.

## Parsing Error Example

DateTimeException occurs when parsing malformed date-time strings. The parse
methods throw it when input doesn't match expected format.

Main.java
  

package com.zetcode;

import java.time.LocalDateTime;

public class Main {

    public static void main(String[] args) {
        try {
            // Missing time component
            LocalDateTime parsed = LocalDateTime.parse("2025-04-16");
            System.out.println("Parsed datetime: " + parsed);
        } catch (DateTimeException e) {
            System.out.println("Parse error: " + e.getMessage());
        }
    }
}

The code attempts to parse an incomplete date-time string. DateTimeException
is thrown because the string lacks required time information. The message
indicates text couldn't be parsed.

## Unsupported Field Example

DateTimeException is thrown when using unsupported temporal fields. Each date-time
class supports specific fields only.

Main.java
  

package com.zetcode;

import java.time.LocalTime;
import java.time.temporal.ChronoField;

public class Main {

    public static void main(String[] args) {
        try {
            LocalTime time = LocalTime.now();
            // DayOfMonth not supported for LocalTime
            int day = time.get(ChronoField.DAY_OF_MONTH);
            System.out.println("Day: " + day);
        } catch (DateTimeException e) {
            System.out.println("Field error: " + e.getMessage());
        }
    }
}

The code tries to get day-of-month from a LocalTime object. DateTimeException
is thrown because time objects don't support date fields. The message indicates
unsupported field.

## Time Zone Example

DateTimeException occurs with invalid time zone operations. This example shows
it when using invalid zone offset values.

Main.java
  

package com.zetcode;

import java.time.ZoneOffset;

public class Main {

    public static void main(String[] args) {
        try {
            // Offset exceeds maximum (+18:00)
            ZoneOffset invalidOffset = ZoneOffset.ofHours(20);
            System.out.println("Offset: " + invalidOffset);
        } catch (DateTimeException e) {
            System.out.println("Zone error: " + e.getMessage());
        }
    }
}

The code attempts to create a zone offset of +20 hours. DateTimeException is
thrown because offsets must be between -18 and +18. The message explains the
valid range.

## Duration Calculation Example

DateTimeException can occur during duration calculations. This happens when
operations exceed supported ranges.

Main.java
  

package com.zetcode;

import java.time.Duration;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {
        try {
            LocalTime start = LocalTime.of(23, 0);
            LocalTime end = LocalTime.of(1, 0);
            // Fails because duration would cross midnight
            Duration duration = Duration.between(start, end);
            System.out.println("Duration: " + duration);
        } catch (DateTimeException e) {
            System.out.println("Duration error: " + e.getMessage());
        }
    }
}

The code calculates duration between times crossing midnight. DateTimeException
is thrown because LocalTime can't represent durations over 24 hours. The message
indicates the calculation limitation.

## Custom DateTimeException Example

This example shows how to throw DateTimeException in custom date-time logic.
It's useful for validating business rules.

Main.java
  

package com.zetcode;

import java.time.DateTimeException;
import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {
        try {
            validateFutureDate(LocalDate.of(2020, 1, 1));
        } catch (DateTimeException e) {
            System.out.println("Validation failed: " + e.getMessage());
        }
    }

    static void validateFutureDate(LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            throw new DateTimeException("Date must be in the future");
        }
        System.out.println("Valid future date: " + date);
    }
}

The code validates that dates are in the future. It throws DateTimeException
for past dates. This demonstrates custom use of the exception for business rules.

## Source

[Java DateTimeException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/DateTimeException.html)

This tutorial covered DateTimeException with practical examples. The exception
helps handle date-time errors consistently. Understanding it is key for robust
temporal operations in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).