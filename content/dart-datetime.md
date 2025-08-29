+++
title = "Dart DateTime"
date = 2025-08-29T19:51:43.469+01:00
draft = false
description = "Dart DateTime tutorial shows how to work with date and time in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart DateTime

last modified June 4, 2025

This tutorial demonstrates how to manage date and time in the Dart
programming language using the DateTime class.

A DateTime object represents a specific moment in time,
capable of handling dates from April 20, -271821 to September 13,
275760, spanning ±100,000,000 days from the Unix epoch (January 1,
1970 UTC). This class is essential for tasks like scheduling,
timestamp calculations, and formatting dates.

## Dart today's date

This example retrieves the current date and time using the
DateTime class.

main.dart
  

void main() {

  var now = DateTime.now();
  print(now);
}

The DateTime.now method returns the current date and time
in the local time zone, providing a snapshot of the present moment.

$ dart main.dart
2025-06-04 10:59:00.123456

## Dart DateTime parts

The DateTime class offers properties to access individual
components of a date and time, such as year, month, day, hour,
minute, and second.

main.dart
  

void main() {

  var now = DateTime.now();

  print("Year is ${now.year}");
  print("Month is ${now.month}");
  print("Day is ${now.day}");
  print("Hour is ${now.hour}");
  print("Minutes is ${now.minute}");
  print("Second is ${now.second}");
}

This program extracts and prints the year, month, day, hour, minute,
and second from the current date and time, demonstrating how to
access specific components of a DateTime object.

$ dart main.dart
Year is 2025
Month is 6
Day is 4
Hour is 10
Minutes is 59
Second is 0

## Dart UTC time

Coordinated Universal Time (UTC) is the global standard for time,
used in fields like aviation, weather forecasting, and computing.
Unlike local time, UTC remains consistent across seasons and regions,
making it ideal for standardized timestamps.

main.dart
  

void main() {

  var now = DateTime.now();
  print(now);
  print(now.isUtc);

  print('---------------------');

  var utc = now.toUtc();
  print(utc);
}

The toUtc method converts a DateTime object
to UTC, while isUtc checks if the object is in UTC.
This example shows the local time, confirms it is not UTC, and then
displays the UTC equivalent.

$ dart main.dart
2025-06-04 10:59:00.123456
false
---------------------
2025-06-04 08:59:00.123456Z

## Dart Unix time

Unix time represents the number of seconds (or smaller units) since
the Unix epoch (January 1, 1970, 00:00:00 UTC). It is widely used in
computing for timestamp storage and calculations due to its
simplicity and consistency.

main.dart
  

void main() {

  var now = DateTime.now();
  print(now.microsecondsSinceEpoch);
}

The microsecondsSinceEpoch property returns the number
of microseconds since the Unix epoch, offering a precise way to
represent time as a single numeric value.

$ dart main.dart
1749027998477607

## Dart DateTime parse

The parse method creates a DateTime object
from a string, supporting a subset of ISO 8601 formats, such as
"YYYY-MM-DD" or "YYYYMMDDThhmmss".

main.dart
  

void main() {

  var pattern = "2021-10-07";

  DateTime dt = DateTime.parse(pattern);
  print(dt);
}

This example parses a string in "YYYY-MM-DD" format into a
DateTime object, demonstrating how to convert textual
date representations into usable objects.

## Dart format DateTime

The intl package provides tools for formatting
DateTime objects into human-readable strings, supporting
various patterns and locales for customized output.

$ dart pub add intl

This command adds the intl package to the project for
date and time formatting.

main.dart
  

import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() {

  var now = DateTime.now();
  print(now);

  String pattern = 'yyyy-MM-dd';
  String formatted = DateFormat(pattern).format(now);
  print(formatted);

  print(DateFormat.yMMMMd('en_US').format(now));

  initializeDateFormatting('sk_SK', null)
      .then((_) =&gt; print(DateFormat.yMMMMd('sk_SK').format(now)));
}

This program formats the current date and time using the
intl package. It applies a custom pattern
("yyyy-MM-dd") and locale-specific formats for English (US) and
Slovak (SK).

String pattern = 'yyyy-MM-dd';
String formatted = DateFormat(pattern).format(now);
print(formatted);

The DateFormat class formats a DateTime
object into a string based on the specified pattern, such as
"yyyy-MM-dd" for year-month-day.

initializeDateFormatting('sk_SK', null)
    .then((_) =&gt; print(DateFormat.yMMMMd('sk_SK').format(now)));

The initializeDateFormatting method enables locale-specific
formatting, allowing culturally appropriate date representations, such
as "27. júna 2025" for Slovak.

$ dart main.dart
2025-06-04 10:59:00.123456
2025-06-04
June 4, 2025
4. júna 2025

## Dart add and subtract DateTime

The DateTime class supports arithmetic operations
through methods like add and subtract,
which adjust timestamps using Duration objects.

main.dart
  

void main() {
  
  DateTime dt = DateTime(2019, 2, 22, 14, 0, 0);

  var dt1 = dt.add(Duration(days: 5));
  var dt2 = dt.add(Duration(days: 5, hours: 23, seconds: 54));
  var dt3 = dt.subtract(Duration(days: 56));

  print(dt1);
  print(dt2);
  print(dt3);
}

This program demonstrates adding and subtracting durations from a
DateTime object, creating new timestamps for future and
past dates.

$ dart main.dart
2019-02-27 14:00:00.000
2019-02-28 13:00:54.000
2018-12-28 14:00:00.000

## The Borodino Battle

The difference method calculates the time interval
between two DateTime objects, returning a
Duration object.

main.dart
  

void main() {
  
  var now = DateTime.now();
  var borodino_battle = DateTime(1812, 9, 7);

  var diff = now.difference(borodino_battle).inDays;

  print("$diff days have passed since the Battle of Borodino");
}

This example computes the number of days since the Battle of Borodino
(September 7, 1812) by finding the difference between the current date
and the historical event.

$ dart borodino.dart
77702 days have passed since the Battle of Borodino

## Dart DateTime Comparison

The DateTime class supports comparison operations using
standard operators like &lt;, &gt;,
==, &lt;=, and &gt;=, as well as the
compareTo method, to determine the relative order of
timestamps.

datetime_comparison.dart
  

void main() {
  
  var date1 = DateTime(2025, 6, 4);
  var date2 = DateTime(2025, 6, 5);
  var date3 = DateTime(2025, 6, 4);

  print('date1 == date2: ${date1 == date2}');
  print('date1 &lt; date2: ${date1 &lt; date2}');
  print('date1 &gt; date2: ${date1 &gt; date2}');
  print('date1 &lt;= date3: ${date1 &lt;= date3}');
  print('date2 &gt;= date1: ${date2 &gt;= date1}');
  print('date1.compareTo(date2): ${date1.compareTo(date2)}');
  print('date1.compareTo(date3): ${date1.compareTo(date3)}');
}

This example compares DateTime objects using standard
operators and the compareTo method, which returns -1, 0,
or 1 for less than, equal to, or greater than, respectively.

## Calculating Age for a List of Users

You can use the DateTime class to calculate the age of users based
on their date of birth. In this example, we define a record type for users,
store the date of birth as a string, and compute the age for each user by
parsing the date and comparing it to the current date.

user_age.dart
  

void main() {
  
  var users = [
    (name: 'Alice', dateOfBirth: '1990-05-12'),
    (name: 'Bob', dateOfBirth: '1985-11-23'),
    (name: 'Charlie', dateOfBirth: '2000-01-01'),
  ];

  var now = DateTime.now();

  for (var user in users) {
    var dob = DateTime.parse(user.dateOfBirth);
    var age = now.year - dob.year;
    if (now.month &lt; dob.month || (now.month == dob.month &amp;&amp; now.day &lt; dob.day)) {
      age--;
    }
    print('${user.name} is $age years old.');
  }
}

This example defines a list of users as records, each with a name and a date of
birth string. The program parses each date of birth, calculates the age by
comparing it to the current date, and prints the result for each user.

## Dart DateTime with Time Zones

The DateTime class supports time zone operations,
allowing conversions between local and UTC time or specifying custom
time zones using third-party packages like timezone.

datetime_timezone.dart
  

void main() {

  var now = DateTime.now();
  var utcNow = DateTime.now().toUtc();

  print('Local time: $now');
  print('UTC time: $utcNow');
  print('Is UTC: ${utcNow.isUtc}');

  // Create DateTime in a specific time zone (UTC)
  var utcDate = DateTime.utc(2025, 6, 4, 10, 59);
  print('Custom UTC date: $utcDate');
}

This example demonstrates creating a UTC DateTime using
DateTime.utc and converting local time to UTC with
toUtc, highlighting time zone handling in Dart.

$ dart datetime_timezone.dart
Local time: 2025-06-04 10:59:00.123456
UTC time: 2025-06-04 08:59:00.123456Z
Is UTC: true
Custom UTC date: 2025-06-04 10:59:00.000Z

## Source

[DateTime - language reference](https://api.dart.dev/stable/3.2.6/dart-core/DateTime-class.html)

This tutorial explored working with date and time in Dart using the
DateTime class, covering creation, manipulation,
formatting, and comparisons.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since
2007. To date, I have authored over 1,400 articles and 8 e-books. I
possess more than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).