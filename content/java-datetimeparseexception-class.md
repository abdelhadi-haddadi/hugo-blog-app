+++
title = "Java DateTimeParseException Class"
date = 2025-08-29T19:58:44.223+01:00
draft = false
description = "Complete Java DateTimeParseException class tutorial covering all methods with examples. Learn about date parsing in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DateTimeParseException Class

Last modified: April 16, 2025

 

The java.time.format.DateTimeParseException is a runtime exception
thrown when an error occurs during parsing date-time strings. It extends
DateTimeException and indicates the input string doesn't match the
expected format pattern.

DateTimeParseException provides detailed information about parsing
failures. It includes the problematic string, index where error occurred, and
the format pattern being used. This helps in debugging date-time parsing issues.

## DateTimeParseException Overview

The exception is thrown by various parsing methods in java.time
package. It occurs when the text cannot be parsed according to the specified
format. The class provides methods to access parsing context information.

public class DateTimeParseException extends DateTimeException {
    public DateTimeParseException(String message, CharSequence parsedData, int errorIndex);
    public DateTimeParseException(String message, CharSequence parsedData, 
        int errorIndex, Throwable cause);
    public String getParsedString();
    public int getErrorIndex();
}

The code above shows the structure of DateTimeParseException. The
constructors require the error message, parsed text, and error position. Optional
cause can be specified for chained exceptions.

## Basic DateTimeParseException Example

This example demonstrates a simple case where DateTimeParseException
is thrown. We attempt to parse an invalid date string using
LocalDate.parse.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class Main {

    public static void main(String[] args) {
        
        try {
            LocalDate date = LocalDate.parse("2025-02-30");
            System.out.println("Parsed date: " + date);
        } catch (DateTimeParseException e) {
            System.out.println("Error parsing date: " + e.getMessage());
            System.out.println("Problematic value: " + e.getParsedString());
            System.out.println("Error index: " + e.getErrorIndex());
        }
    }
}

This code attempts to parse February 30th, which doesn't exist. The exception
provides details about the parsing failure. The error index points to the start
of the invalid day component in the string.

## Custom Format Parsing Exception

When using custom date formats with DateTimeFormatter, parsing
errors can occur if the input doesn't match. This example shows such a case.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        
        try {
            LocalDate date = LocalDate.parse("13/15/2025", formatter);
            System.out.println("Parsed date: " + date);
        } catch (DateTimeParseException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Expected format: MM/dd/yyyy");
            System.out.println("Invalid value: " + e.getParsedString());
        }
    }
}

Here we try to parse an invalid date with month 13 and day 15. The exception
message describes what went wrong. The formatter's pattern is shown for
comparison with the invalid input.

## Handling Time Parsing Errors

Time parsing can also fail if the input doesn't match expected patterns. This
example demonstrates a time parsing failure case.

Main.java
  

package com.zetcode;

import java.time.LocalTime;
import java.time.format.DateTimeParseException;

public class Main {

    public static void main(String[] args) {
        
        try {
            LocalTime time = LocalTime.parse("25:30:00");
            System.out.println("Parsed time: " + time);
        } catch (DateTimeParseException e) {
            System.out.println("Failed to parse time: " + e.getMessage());
            System.out.println("Invalid time value: " + e.getParsedString());
            System.out.println("Error occurred at index: " + e.getErrorIndex());
        }
    }
}

The code attempts to parse an invalid time value (25 hours). The exception
provides details about the parsing failure. The error index points to the
invalid hour component in the string.

## DateTimeParseException with ZonedDateTime

Parsing date-times with time zones can fail if the zone information is missing
or invalid. This example shows such a scenario.

Main.java
  

package com.zetcode;

import java.time.ZonedDateTime;
import java.time.format.DateTimeParseException;

public class Main {

    public static void main(String[] args) {
        
        try {
            ZonedDateTime zdt = ZonedDateTime.parse("2025-03-15T10:30:00");
            System.out.println("Parsed datetime: " + zdt);
        } catch (DateTimeParseException e) {
            System.out.println("Parsing failed: " + e.getMessage());
            System.out.println("Problem with: " + e.getParsedString());
            System.out.println("Missing timezone information");
        }
    }
}

This code fails because the input string lacks required timezone information.
The exception message indicates what's missing. For ZonedDateTime parsing, the
timezone must be specified in the input string.

## Parsing with Strict Mode

Using strict mode in DateTimeFormatter can cause parsing to fail
for invalid dates. This example demonstrates strict parsing behavior.

Main.java
  

package com.zetcode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

public class Main {

    public static void main(String[] args) {
        
        DateTimeFormatter strictFormatter = DateTimeFormatter
            .ofPattern("yyyy-MM-dd")
            .withResolverStyle(ResolverStyle.STRICT);
        
        try {
            LocalDate date = LocalDate.parse("2025-04-31", strictFormatter);
            System.out.println("Parsed date: " + date);
        } catch (DateTimeParseException e) {
            System.out.println("Strict parsing failed: " + e.getMessage());
            System.out.println("Invalid date: " + e.getParsedString());
        }
    }
}

The strict resolver style rejects invalid dates like April 31st. In lenient mode,
this might be adjusted automatically. The exception provides details about why
the parsing failed in strict mode.

## Chained Exceptions with DateTimeParseException

DateTimeParseException can be chained with other exceptions to
provide more context about the failure. This example shows how to handle such
cases.

Main.java
  

package com.zetcode;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Main {

    public static void main(String[] args) {
        
        try {
            parseDateTime("2025-12-25T25:30:00");
        } catch (DateTimeException e) {
            System.out.println("DateTimeException: " + e.getMessage());
            
            if (e.getCause() != null) {
                System.out.println("Root cause: " + e.getCause().getMessage());
            }
        }
    }
    
    private static void parseDateTime(String text) throws DateTimeException {
        try {
            LocalDateTime ldt = LocalDateTime.parse(text);
            System.out.println("Parsed datetime: " + ldt);
        } catch (DateTimeParseException e) {
            throw new DateTimeException("Failed to parse datetime", e);
        }
    }
}

This example wraps a DateTimeParseException in a more general
DateTimeException. The original exception is preserved as the
cause. This pattern is useful for creating custom exception hierarchies.

## Source

[Java DateTimeParseException Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeParseException.html)

In this article, we've covered the essential aspects of the Java
DateTimeParseException class. Understanding these concepts is
crucial for robust date-time handling in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).