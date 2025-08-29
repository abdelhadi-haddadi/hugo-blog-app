+++
title = "Java LocalDateTime"
date = 2025-08-29T19:59:59.508+01:00
draft = false
description = "Java LocalDateTime tutorial shows how to work with LocalDateTime in Java. LocalDateTime is an immutable date-time object that represents a date-time."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LocalDateTime

last modified July 10, 2024

 

In this article we show how to work with LocalDateTime in Java.

LocalDateTime is an immutable date-time object that represents a
date-time. It is a date-time without a time-zone in the ISO-8601 calendar
system.

LocalDateTime does not store or represent a time-zone. It cannot
represent an instant on the time-line without additional information such as an
offset or time-zone. Value 2022-10-27T11:01:19.031990446 is an example of a 
LocalDateTime.

## Current datetime

The current time is retrived with LocalDateTime.now.

Main.java
  

import java.time.LocalDateTime;

void main() {

    var now = LocalDateTime.now();
    System.out.println(now);
}

The example prints the current local datetime value.

$ java Main.java
2024-07-10T14:20:27.792280600

## Creating LocalDateTime objects

The are several ways to create LocalDateTime.

Main.java
  

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

void main() {

    var now = LocalDateTime.now();
    System.out.println(now);

    LocalDateTime dt1 = LocalDateTime.of(2022, 10, 27, 10, 40, 55);
    System.out.println(dt1);

    LocalDateTime dt2 = LocalDateTime.parse("2020-11-27T11:20:50", 
        DateTimeFormatter.ISO_LOCAL_DATE_TIME);

    System.out.println(dt2);
}

The program creates three datetime objects.

var now = LocalDateTime.now();

The current datetime is created with LocalDateTime.now.

LocalDateTime dt1 = LocalDateTime.of(2022, 10, 27, 10, 40, 55);

Here a localdatetime value is created with LocalDateTime.of. 
We specify the year, month, day, hour, and second parts.

LocalDateTime dt2 = LocalDateTime.parse("2020-11-27T11:20:50", 
    DateTimeFormatter.ISO_LOCAL_DATE_TIME);

A localdatetime value is parsed from a string. 

$ java Main.java 
2024-07-10T14:21:17.484172200
2022-10-27T10:40:55
2020-11-27T11:20:50

## LocalDateTime parts

In the next example, we get the current LocalDateTime value parts.

Main.java
  

import java.time.LocalDateTime;

void main() {

    LocalDateTime dt = LocalDateTime.now();

    System.out.printf("Year: %s%n", dt.getYear());
    System.out.printf("Month: %s%n", dt.getMonth());
    System.out.printf("Day of month: %s%n", dt.getDayOfMonth());
    System.out.printf("Hour: %s%n", dt.getHour());
    System.out.printf("Minute: %s%n", dt.getMinute());
    System.out.printf("Second: %s%n", dt.getSecond());
}

The getYear gets the year part, the getMonth the month 
part, the getDayOfMonth gets the day of the month.
The getHour gets the hour part, the getMinute
gets the minute part, and the getSecond the second part.

$ java Main.java
Year: 2024
Month: JULY
Day of month: 10
Hour: 14
Minute: 17
Second: 2

## LocalDateTime &amp; DateTimeFormatter

The datetime is formatted differently in various countries.
DateTimeFormatter helps us format the datetime.

Main.java
  

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

void main() {

    LocalDateTime now = LocalDateTime.now();

    DateTimeFormatter dtf = DateTimeFormatter.ISO_TIME;
    System.out.println(now.format(dtf));

    DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("EEEE, MMM dd, yyyy HH:mm:ss a");
    System.out.println(now.format(dtf2));

    DateTimeFormatter dtf3 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);
    System.out.println(now.format(dtf3));
}

The example uses DateTimeFormatter to format time.

DateTimeFormatter dtf = DateTimeFormatter.ISO_TIME;
System.out.println(now.format(dtf));

We format the time to the ISO format time standart.

DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("EEEE, MMM dd, yyyy HH:mm:ss a");

We can choose a specific time format with DateTimeFormatter.ofPattern.
The documentation to DateTimeFormatter contains the description
of various formatting characters that we can use.

DateTimeFormatter dtf3 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);

Here we use the FormatStyle.MEDIUM format.

$ java Main.java
14:17:39.5461673
streda, júl 10, 2024 14:17:39 PM
10. 7. 2024, 14:17:39

## LocalTime arithmetic

Java LocalDateTimeEx has methods for doing datetime arithmetics.

Main.java
  

import java.time.LocalDateTime;

void main() {

    LocalDateTime now = LocalDateTime.now();
    System.out.println(now);

    // LocalDateTime addition
    System.out.println("Adding 4 years: " + now.plusYears(4));
    System.out.println("Adding 11 months: " + now.plusMonths(11));
    System.out.println("Adding 54 days: " + now.plusDays(54));
    System.out.println("Adding 3 hours: " + now.plusHours(3));
    System.out.println("Adding 30 minutes: " + now.plusMinutes(30));
    System.out.println("Adding 45 seconds: " + now.plusSeconds(45));
    System.out.println("Adding 40000 nanoseconds: " + now.plusNanos(40000));

    System.out.println("-------------------------------------");

    // LocalDateTime subtraction
    System.out.println("Subtracting 4 years: " + now.minusYears(4));
    System.out.println("Subtracting 11 months: " + now.minusMonths(11));
    System.out.println("Subtracting 54 days: " + now.minusDays(54));
    System.out.println("Subtracting 3 hours: " + now.minusHours(3));
    System.out.println("Subtracting 30 minutes: " + now.minusMinutes(30));
    System.out.println("Subtracting 45 seconds: " + now.minusSeconds(45));
    System.out.println("Subtracting 40000 nanoseconds: " + now.minusNanos(40000));
}

The example presents method for adding and subtracting datetime units.

System.out.println("Adding 3 hours: " + localTime.plusHours(3));

The plusHours adds three hours to the current local time.

System.out.println("Subtracting 3 hours: " + now.minusHours(3));

Likewise, the minusHours subtracts three hours from the
current local time.

$ java Main.java
2024-07-10T14:18:29.986426300
Adding 4 years: 2028-07-10T14:18:29.986426300
Adding 11 months: 2025-06-10T14:18:29.986426300
Adding 54 days: 2024-09-02T14:18:29.986426300
Adding 3 hours: 2024-07-10T17:18:29.986426300
Adding 30 minutes: 2024-07-10T14:48:29.986426300
Adding 45 seconds: 2024-07-10T14:19:14.986426300
Adding 40000 nanoseconds: 2024-07-10T14:18:29.986466300
-------------------------------------
Subtracting 4 years: 2020-07-10T14:18:29.986426300
Subtracting 11 months: 2023-08-10T14:18:29.986426300
Subtracting 54 days: 2024-05-17T14:18:29.986426300
Subtracting 3 hours: 2024-07-10T11:18:29.986426300
Subtracting 30 minutes: 2024-07-10T13:48:29.986426300
Subtracting 45 seconds: 2024-07-10T14:17:44.986426300
Subtracting 40000 nanoseconds: 2024-07-10T14:18:29.986386300

## LocalTime until

With the until method, we can compute the time until another time
in terms of the specified unit.

Main.java
  

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

void main() {

    LocalDateTime now = LocalDateTime.now();
    LocalDateTime xmas = LocalDateTime.of(now.getYear(), 12, 24, 0, 0 ,0);

    System.out.println(now);
    System.out.println(xmas);

    System.out.printf("%s hours%n", now.until(xmas, ChronoUnit.HOURS));
    System.out.printf("%s minutes%n", now.until(xmas, ChronoUnit.MINUTES));
    System.out.printf("%s seconds%n", now.until(xmas, ChronoUnit.SECONDS));
}

The example calculates the time that has to elapse until another time
in hours, minutes and seconds.

System.out.printf("%s hours%n", now.until(time, ChronoUnit.HOURS));

With ChronoUnit.HOURS, we specify that we calculate the the time
difference in hours.

$ java Main.java
2024-07-10T14:19:00.847871600
2024-12-24T00:00
3993 hours
239620 minutes
14377259 seconds

## LocalTime isBefore/isAfter

We can check if a datetime value is before or after another datetime value with 
isBefore and isAfter.

Main.java
  

import java.time.LocalDateTime;

void main() {

    LocalDateTime now = LocalDateTime.now();
    LocalDateTime dt1 = now.plusYears(3);
    LocalDateTime dt2 = now.minusYears(3);

    if (dt1.isAfter(now)) {
        System.out.printf("%s is after %s%n", dt1, now);
    }

    if (dt2.isBefore(now)) {
        System.out.printf("%s is before %s%n", dt2, now);
    }
}

The program uses the isBefore and isAfter methods to 
check the current datetime value against two other datetimes.

$ java Main.java
2025-10-27T12:25:45.261416509 is after 2022-10-27T12:25:45.261416509
2019-10-27T12:25:45.261416509 is before 2022-10-27T12:25:45.261416509

## LocalDateTime truncate

The LocalDateTime's truncatedTo method returns a copy
of a local time with the time truncated. It returns a copy of the original
date-time with fields smaller than the specified unit set to zero.

Main.java
  

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

void main() {

    LocalDateTime now = LocalDateTime.now();

    System.out.println(now);
    System.out.println(now.truncatedTo(ChronoUnit.HALF_DAYS));
    System.out.println(now.truncatedTo(ChronoUnit.HOURS));
    System.out.println(now.truncatedTo(ChronoUnit.MINUTES));
    System.out.println(now.truncatedTo(ChronoUnit.SECONDS));
    System.out.println(now.truncatedTo(ChronoUnit.MICROS));
}

The example uses truncatedTo to truncate time to
half days, hours, minutes, seconds, and micros.

$ java Main.java
2024-07-10T14:19:49.389096800
2024-07-10T12:00
2024-07-10T14:00
2024-07-10T14:19
2024-07-10T14:19:49
2024-07-10T14:19:49.389096

## Source

[Java LocalDateTime - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDateTime.html)

In this article we have worked with Java LocalDateTime.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).