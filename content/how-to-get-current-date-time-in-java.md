+++
title = "How to get current date time in Java"
date = 2025-08-27T23:20:45.296+01:00
draft = false
description = "Java current date time tutorial shows how to use 
various Java classes to get current date and time in Java."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# How to get current date time in Java

last modified July 13, 2020 

Java current date time tutorial presents various Java classes 
to get current date time in Java.

There are several ways to get current date and time in Java. Java programmers can use 
modern date and time API introduced in Java 8 (java.time), the classic, outdated API (java.util), 
and the third-party Joda library.

## Current date and time in Java with java.time

The java.time package contains the main API for dates, times, 
instants, and durations. It is a modern replacement of the outdated 
java.util date and time API.

### Getting current date and time with Instant

java.time.Instant models a single instantaneous point on the time-line. 
This might be used to record event time-stamps in the application.

com/zetcode/JavaCurrentDateInstant.java
  

package com.zetcode;

import java.time.Instant;

public class JavaCurrentDateInstant {

    public static void main(String[] args) {
        
        Instant instant = Instant.now();
        System.out.println(instant);
    }
}

The code example uses java.time.Instant to get the 
current date and time.

Instant instant = Instant.now();

The Instant.now method obtains the current instant 
from the system clock.

### Getting current date and time with LocalDateTime

java.time.LocalDateTime creates a date-time without a time-zone.

com/zetcode/JavaCurrentDateLocalDateTime.java
  

package com.zetcode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class JavaCurrentDateLocalDateTime {

    public static void main(String[] args) {
        
        LocalDateTime now = LocalDateTime.now();
        
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        System.out.println(dtf.format(now));
    }
}

The example uses java.time.LocalDateTime to get the current date
time and formats it with java.time.format.DateTimeFormatter.

LocalDateTime now = LocalDateTime.now();

The LocalDateTime.now method obtains the current date-time 
from the system clock in the default time-zone.

### Getting current date and time with ZonedDateTime

java.time.ZonedDateTime is an immutable representation of a date-time with a time-zone.

com/zetcode/JavaCurrentDateTimeZonedDateTime.java
  

package com.zetcode;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class JavaCurrentDateTimeZonedDateTime {

    public static void main(String[] args) {

        ZonedDateTime now = ZonedDateTime.now();
        
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        System.out.println(dtf.format(now));        
    }
}

The example uses java.time.ZonedDateTime to get the current date
time and formats it with java.time.format.DateTimeFormatter.

ZonedDateTime now = ZonedDateTime.now();

The ZonedDateTime.now method 
obtains the current date-time from the system clock in the default time-zone.

### Getting current date and time with Clock

java.time.Clock provides access to the current instant, date and time using a time-zone.

com/zetcode/JavaCurrentDateTimeClock.java
  

package com.zetcode;

import java.time.Clock;
import java.time.Instant;

public class JavaCurrentDateTimeClock {

    public static void main(String[] args) {

        Clock clock = Clock.systemDefaultZone();

        Instant now = clock.instant();
        System.out.println(now);
    }
}

The example uses java.time.Clock to get the current date
time.

Clock clock = Clock.systemDefaultZone();

The Clock.systemDefaultZone method obtains a clock that returns 
the current instant using the best available system clock, converting to date 
and time using the default time-zone.

## Current date and time in Java with java.util

The classes available in java.util (Date and Calendar) 
are considered obsolete. This is the original Java date and time API.

### Getting current date and time with Date

java.util.Date represents a specific instant in time, with millisecond precision.

com/zetcode/JavaCurrentDateTimeDate.java
  

package com.zetcode;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class JavaCurrentDateTimeDate {

    public static void main(String[] args) {

        Date now = new Date();

        DateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        System.out.println(df.format(now));
    }
}

The example uses java.util.Date to get the current date
time and formats it with java.text.SimpleDateFormat.

### Getting current date and time with Calendar

java.util.Calendar represents a specific instant in time, with millisecond precision.

com/zetcode/JavaCurrentDateTimeCalendar.java
  

package com.zetcode;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class JavaCurrentDateTimeCalendar {

    public static void main(String[] args) {

        Date now = Calendar.getInstance().getTime(); 
        
        DateFormat df = new SimpleDateFormat("yyyy-MM-d HH:mm:ss");
        
        System.out.println(df.format(now));
    }
}

The example uses java.util.Calendar to get the current date
time and formats it with java.text.SimpleDateFormat.

## Current date and time in Java with Joda time

Joda time is a third-party Date and time library to replace the outdated 
JDK date time API.

&lt;dependency&gt;
    &lt;groupId&gt;joda-time&lt;/groupId&gt;
    &lt;artifactId&gt;joda-time&lt;/artifactId&gt;
    &lt;version&gt;2.9.9&lt;/version&gt;
&lt;/dependency&gt;

We need joda-time dependency.

### Getting current date and time with Joda LocalDateTime

org.joda.time.LocalDateTime is an unmodifiable datetime class 
representing a datetime without a time zone.

com/zetcode/JavaCurrentDateTimeJoda.java
  

package com.zetcode;

import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class JavaCurrentDateTimeJoda {

    public static void main(String[] args) {

        LocalDateTime ldt = new LocalDateTime();

        DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy, MMMM dd, HH:mm:ss");
        String str = fmt.print(ldt);

        System.out.println(str);
    }
}

The example uses org.joda.time.LocalDateTime to get the current date
time and formats it with org.joda.time.format.DateTimeFormatter.

### Getting current date and time with Joda DateTime

org.joda.time.DateTime is the standard implementation of an unmodifiable datetime class.

com/zetcode/JavaCurrentDateTimeJoda2.java
  

package com.zetcode;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class JavaCurrentDateTimeJoda2 {

    public static void main(String[] args) {

        DateTime dt = DateTime.now();

        DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy, MMMM dd, HH:mm:ss");
        String str = fmt.print(dt);

        System.out.println(str);
    }
}

The example uses org.joda.time.DateTime to get the current date
time and formats it with org.joda.time.format.DateTimeFormatter.

In this tutorial, we have shown how to get current date and time in Java.